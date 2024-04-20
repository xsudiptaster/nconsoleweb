import { composeQuery, parseQuery } from "soql-parser-js";
import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("toolingGlobalDescribe", {});
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
const updateTreeData = (treeData: any[], currentNode: any, children: any[]) => {
   let tempData = [...treeData];
   tempData = tempData.map((node) => {
      if (node.key === currentNode.key) {
         return {
            ...node,
            children,
         };
      }
      if (node.children) {
         return {
            ...node,
            children: updateTreeData(node.children, currentNode, children),
         };
      }
      return node;
   });
   return tempData;
};
export const handleTreeCreate = async (objectName: any) => {
   let response = await handleApi("toolingObjectDescribe", {
      objectName,
   });
   let treeNodes = response.fields
      .map((field: any) => {
         return {
            title: field.label,
            key: field.name,
            type: "field",
            data: field,
            isLeaf: field.type !== "reference",
         };
      })
      .sort((a: any, b: any) => {
         return a.label - b.label ? -1 : 1;
      });
   return treeNodes;
};
export const handleExpandTree = async (treeData: any[], node: any) => {
   if (node.type === "dummy") {
      return treeData;
   }
   let response = await handleApi("toolingObjectDescribe", {
      objectName: node.type === "field" ? node.data.referenceTo[0] : node.data.childSObject,
   });

   let children = response.fields
      .map((field: any) => {
         return {
            title: field.label,
            key: `${node.key}-${field.name}`,
            type: "field",
            data: field,
            isLeaf: field.type !== "reference",
         };
      })
      .sort((a: any, b: any) => {
         return a.label - b.label ? -1 : 1;
      });
   if (response.childRelationships.length > 0 && node.type !== "field") {
      let childNodes = response.childRelationships
         .filter((child: any) => {
            return child.relationshipName !== null;
         })
         .map((child: any) => {
            return {
               title: child.relationshipName,
               key: `${node.key}-${child.relationshipName}`,
               type: "child",
               data: { ...child, name: child.field },
               isLeaf: false,
            };
         });
      let childRelationships = {
         title: "Child Relationships",
         key: `${node.key}-child_relationships`,
         type: "dummy",
         isLeaf: false,
         children: childNodes,
      };
      children = [...children, childRelationships];
   }
   let tempTreeData = updateTreeData(treeData, node, children);
   return tempTreeData;
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
export const handleCheck = (treeNodes: any[], keys: any[], selectedObject: string) => {
   let keyset = new Set(keys);
   let oQuery = createQuery(treeNodes, keyset, selectedObject);
   return composeQuery(parseQuery(oQuery), { format: true });
};
const createQuery = (nodes: any[], keyset: any, objectName: string) => {
   let oQuery = "SELECT " + getFields(nodes, keyset, []).join(",") + " FROM " + objectName;
   return oQuery;
};
const makeField = ({ field, relationships }: any) => {
   if (relationships.length > 0) {
      return relationships.join(".") + "." + field;
   } else {
      return field;
   }
};
const getFields = (treeNodes: any[], keyset: any, relations: string[]) => {
   let fields: any[] = [];
   treeNodes.forEach((node) => {
      if (node.type === "field") {
         if (keyset.has(node.key)) {
            fields.push(makeField({ field: node.data.name, relationships: relations }));
         }
         if (node.children) {
            relations = [...relations, node.data.relationshipName];
            fields = [...fields, ...getFields(node.children, keyset, relations)];
         }
      }
      if (node.type === "dummy" && keyset.has(node.key)) {
         if (node.children) {
            fields = [...fields, ...createSubQueries(node.children, keyset)];
         }
      }
   });
   return fields;
};
const createSubQueries = (nodes: any[], keyset: any) => {
   let subQueries: any[] = [];
   nodes.forEach((node: any) => {
      if (keyset.has(node.key)) {
         subQueries.push(`(${createQuery(node.children, keyset, node.data.relationshipName)})`);
      }
   });
   return subQueries;
};
export const handleExecute = async (query: string) => {
   let response = await handleApi("toolingQuery", {
      query: query,
   });
   return response;
};
