import { composeQuery, parseQuery } from "soql-parser-js";
import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("describeGlobal", {});
   let objectList = response.sobjects
      .filter((object: any) => {
         return object.queryable;
      })
      .map((sobject: any) => {
         return {
            label: sobject.label,
            value: sobject.name,
            data: sobject,
         };
      })
      .sort((a: any, b: any) => {
         return a.label - b.label ? -1 : 1;
      });
   return objectList;
};
const createNodes = (objectDetails: any, isChild: boolean, keyPrefix: string) => {
   let nodes: any[] = [];
   if (objectDetails.fields) {
      objectDetails.fields.forEach((field: any) => {
         nodes.push({
            title: field.label,
            key: keyPrefix !== undefined && keyPrefix !== "" ? keyPrefix + "." + field.name : field.name,
            isLeaf: field.type === "reference" ? false : true,
            data: field,
         });
      });
   }
   nodes = nodes.sort((a: any, b: any) => {
      return a.title > b.title ? 1 : -1;
   });
   if (objectDetails.childRelationships && isChild) {
      objectDetails.childRelationships
         .filter((child: any) => {
            return child.relationshipName !== null;
         })
         .forEach((child: any) => {
            nodes.push({
               title: child.relationshipName,
               key:
                  keyPrefix !== undefined && keyPrefix !== "" ? keyPrefix + "." + child.relationshipName : child.relationshipName,
               isLeaf: false,
               isChildObject: true,
               data: { ...child, name: child.field },
            });
         });
   }
   return nodes;
};
const getObjectDetails = async (objectName: string) => {
   let response = await handleApi("objectDescribe", { objectName });
   return response;
};
export const createTreeNodes = async (objectName: string) => {
   let response = await getObjectDetails(objectName);
   return createNodes(response, true, "");
};
const addNodes = (nodes: any[], currentNode: any, childNodes: any[]) => {
   let tempNodes = [...nodes];
   tempNodes = tempNodes.map((node) => {
      if (node.key === currentNode.key) {
         node.children = childNodes;
      } else if (node.children) {
         node.children = addNodes(node.children, currentNode, childNodes);
      }
      return node;
   });
   return tempNodes;
};
export const handleExpandNode = async (treeNodes: any[], node: any) => {
   if (node.children) {
      return treeNodes;
   }
   let response = await getObjectDetails(node.data.childSObject ? node.data.childSObject : node.data.referenceTo[0]);
   console.log("🚀 ~ handleExpandNode ~ response:", response);
   let childNodes = createNodes(response, node.isChildObject, node.key);
   return addNodes(treeNodes, node, childNodes);
};
export const handleFilter = (treeNodes: any, searchString: string) => {
   let tempData = [...treeNodes];
   tempData = tempData.filter((node) => {
      let childrens: any[] = [];
      if (node.children) {
         childrens = handleFilter(node.children, searchString);
      }
      if (childrens.length > 0) {
         return true;
      }
      if (
         node.title.toLowerCase().includes(searchString.toLowerCase()) ||
         node.key.toLowerCase().includes(searchString.toLowerCase())
      ) {
         return true;
      }
      return false;
   });
   return tempData;
};
const getFields = (nodes: any[], keys: any, keyPrefix: string) => {
   let fields: string[] = [];
   nodes.forEach((node: any) => {
      if (keys.has(node.key)) {
         if (node.isChildObject) {
            fields.push(`(${createQuery(node.children, keys, node.data.relationshipName)})`);
         } else {
            fields.push(keyPrefix && keyPrefix !== "" ? `${keyPrefix}.${node.data.name}` : node.data.name);
            if (node.children) {
               let tempKeyPrefix =
                  keyPrefix && keyPrefix !== "" ? `${keyPrefix}.${node.data.relationshipName}` : node.data.relationshipName;
               fields = [...fields, ...getFields(node.children, keys, tempKeyPrefix)];
            }
         }
      }
   });
   return fields;
};
const createQuery = (nodes: any[], keys: any, objectName: string) => {
   let query = "SELECT " + getFields(nodes, keys, "") + " FROM " + objectName;
   return query;
};
export const handleCheck = (treeNodes: any[], checkedKeys: string[], selectedObject: string) => {
   let keys = new Set(checkedKeys);
   let oQuery = createQuery(treeNodes, keys, selectedObject);
   console.log("🚀 ~ handleCheck ~ oQuery:", oQuery);
   return composeQuery(parseQuery(oQuery), { format: true });
};
export const handleExecute = async (query: string) => {
   let response = await handleApi("query", {
      query: query,
   });
   return response;
};
