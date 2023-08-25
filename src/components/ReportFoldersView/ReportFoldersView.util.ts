import { handleApi, version } from "../../utils/utils";

export const createFolderNodes = (folder: any) => {
   return {
      title: folder.Name,
      key: folder.Id,
      parentId: folder.ParentId,
      isLeaf: false,
      data: folder,
   };
};
const createReportNodes = (report: any) => {
   return {
      title: report.Name,
      key: report.Id,
      parentId: report.OwnerId,
      isLeaf: true,
      data: report,
   };
};
const sortNodes = (nodes: any) => {
   return nodes.sort((a: any, b: any) => {
      return a.title > b.title ? 1 : -1;
   });
};
const createTree = (parentNodes: any[], folders: any[], reports: any[]) => {
   parentNodes = parentNodes.map((node) => {
      node.children = [];
      let childFolders = folders
         .filter((folder) => {
            return folder.ParentId === node.key;
         })
         .map((folder) => {
            return createFolderNodes(folder);
         });
      if (childFolders.length > 0) {
         childFolders = createTree(childFolders, folders, reports);
      }
      let childReports = reports
         .filter((report) => {
            return report.OwnerId === node.key;
         })
         .map((report) => {
            return createReportNodes(report);
         });
      node.children = sortNodes([...childReports, ...childFolders]);
      return node;
   });
   return parentNodes;
};
export const handleLoad = async () => {
   let folderQuery =
      "select Id,Name,DeveloperName,ParentId,CreatedBy.Name from Folder where Type ='Report' And DeveloperName !=''";
   let reportQuery = "Select id,Name,DeveloperName,OwnerId from Report";
   let responseFolders = await handleApi("query", { query: folderQuery });
   let responseReports = await handleApi("query", { query: reportQuery });
   let parentNodes = sortNodes(
      responseFolders.records
         .filter((folder: any) => {
            return folder.ParentId == null || folder.ParentId === "" || folder.ParentId === undefined;
         })
         .map((folder: any) => {
            return createFolderNodes(folder);
         })
   );

   return createTree(parentNodes, responseFolders.records, responseReports.records);
};
export const addNode = (treeNodes: any, parentId: string, newNode: any) => {
   let tempNodes = JSON.parse(JSON.stringify(treeNodes));
   tempNodes = tempNodes.map((node: any) => {
      if (node.key === parentId) {
         if (node.children) {
            node.children = [...node.children, newNode];
         } else {
            node.children = [];
            node.children.push(newNode);
         }
      } else if (node.children) {
         node.children = addNode(node.children, parentId, node);
      }
      return node;
   });
   return tempNodes;
};
export const removeNode = (treeNodes: any[], currentNode: any) => {
   let tempNodes = JSON.parse(JSON.stringify(treeNodes));
   tempNodes = tempNodes.filter((node: any) => {
      if (node.key === currentNode.key) {
         return false;
      }
      if (node.children) {
         node.children = removeNode(node.children, currentNode);
      }
      return true;
   });
   return tempNodes;
};
const updateNode = (treeNodes: any[], newNode: any) => {
   treeNodes = treeNodes.map((node) => {
      if (node.key === newNode.key) {
         node.title = newNode.title;
      } else if (node.children) {
         node.children = updateNode(node.children, newNode);
      }
      return node;
   });
   return treeNodes;
};
const updateFolder = async (currentNode: any, value: string) => {
   let response = await handleApi("update", { objectName: "Folder", records: [{ Id: currentNode.key, Name: value }] });
   return response;
};
const updateReportLabel = async (currentNode: any, value: string) => {
   const url = `/services/data/v${version}/analytics/reports/${currentNode.key}`;
   let response = await handleApi("fetch", { method: "patch", url, body: { reportMetadata: { name: value } } });
   return response;
};
export const updateRecord = async (treeData: any, currentNode: any, value: string) => {
   let response;
   if (currentNode.isLeaf) {
      response = await updateReportLabel(currentNode, value);
      if (response.reportExtendedMetadata) {
         let newNode = { ...currentNode };
         newNode.title = value;
         let treeNodes = JSON.parse(JSON.stringify(treeData));
         treeNodes = updateNode(treeNodes, newNode);
         return {
            success: true,
            treeNodes,
         };
      }
   } else {
      response = await updateFolder(currentNode, value);
      if (response[0].success) {
         let newNode = { ...currentNode };
         newNode.title = value;
         let treeNodes = JSON.parse(JSON.stringify(treeData));
         treeNodes = updateNode(treeNodes, newNode);
         return {
            success: true,
            treeNodes,
         };
      }
   }
   return { success: false, error: JSON.stringify(response) };
};
