import { handleApi } from "../../utils/utils";

export const createFolderNodes = (folder: any) => {
   return {
      title: folder.Name,
      key: folder.Id,
      parentId: folder.ParentId,
      isLeaf: false,
      data: folder,
   };
};
const createDashboardNodes = (dashboard: any) => {
   return {
      title: dashboard.Title,
      key: dashboard.Id,
      parentId: dashboard.FolderId,
      isLeaf: true,
      data: dashboard,
   };
};
const sortNodes = (nodes: any) => {
   return nodes.sort((a: any, b: any) => {
      return a.title > b.title ? 1 : -1;
   });
};
const createTree = (parentNodes: any[], folders: any[], dashboards: any[]) => {
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
         childFolders = createTree(childFolders, folders, dashboards);
      }
      let childDashboards = dashboards
         .filter((dashboard) => {
            return dashboard.FolderId === node.key;
         })
         .map((dashboard) => {
            return createDashboardNodes(dashboard);
         });
      node.children = sortNodes([...childDashboards, ...childFolders]);
      return node;
   });
   return parentNodes;
};
export const handleLoad = async () => {
   let folderQuery =
      "select Id,Name,DeveloperName,ParentId,CreatedBy.Name from Folder where Type ='Dashboard' And DeveloperName !=''";
   let dashboardQuery = "Select id,FolderId,DeveloperName,Description,FolderName,Title from Dashboard";
   let responseFolders = await handleApi("query", { query: folderQuery });
   let responseDashboards = await handleApi("query", { query: dashboardQuery });
   let parentNodes = sortNodes(
      responseFolders.records
         .filter((folder: any) => {
            return folder.ParentId == null || folder.ParentId === "" || folder.ParentId === undefined;
         })
         .map((folder: any) => {
            return createFolderNodes(folder);
         })
   );
   return createTree(parentNodes, responseFolders.records, responseDashboards.records);
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
