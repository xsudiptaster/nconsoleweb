import { handleApi, version } from "../../../../utils/utils";
import { addNode, createFolderNodes, removeNode } from "../../ReportFoldersView.util";

export const handleFolderAdd = async (treeData: any[], parentId: any, name: string) => {
   let response = await handleApi("insert", {
      objectName: "Folder",
      records: [
         {
            ParentId: parentId,
            Name: name,
            Type: "Report",
            DeveloperName: name.replaceAll(" ", ""),
            AccessType: "Hidden",
         },
      ],
   });
   if (response[0].success) {
      let node = createFolderNodes({ Name: name, Id: response[0].id, ParentId: parentId });
      let treeNodes = addNode(treeData, parentId, node);
      return { success: true, treeNodes };
   }
   return { success: false, error: JSON.stringify(response) };
};
export const handleDeleteFolder = async (treeData: any[], currentNode: any) => {
   let response = await handleApi("delete", {
      objectName: "Folder",
      records: [{ Id: currentNode.key }],
   });
   if (response[0].success) {
      let treeNodes = removeNode(treeData, currentNode);
      return {
         success: true,
         treeNodes,
      };
   }
   return { success: false, error: JSON.stringify(response) };
};
const cloneReport = async (node: any, parentId: any) => {
   const url = `/services/data/v${version}/analytics/reports?cloneId=${node.key}`;
   const body = {
      reportMetadata: {
         name: `Copy of ${node.title}`,
         folderId: parentId,
      },
   };
   let response = await handleApi("fetch", { method: "post", body, url });
   return response;
};
const moveReport = async (node: any, parentId: string) => {
   const url = `/services/data/v${version}/analytics/reports/${node.key}`;
   let response = await handleApi("fetch", { method: "patch", url, body: { reportMetadata: { folderId: parentId } } });
   return response;
};
const copyFolder = async (node: any, parentId: string) => {
   const response = await handleApi("insert", {
      objectName: "Folder",
      records: [
         {
            Name: "Copy of " + node.title,
            DeveloperName: ("Copy of" + node.title).replace(" ", ""),
            ParentId: parentId,
            AccessType: "Hidden",
            Type: "Report",
         },
      ],
   });
   return response;
};
export const handlePaste = async (treeData: any[], nodeMove: any, parentId: string) => {
   let newNode: any = {};
   let grabError = "";
   if (nodeMove.node.isLeaf) {
      newNode = { ...nodeMove.node };
      let response: any = {};
      if (nodeMove.method === "cut") {
         response = await moveReport(nodeMove.node, parentId);
         grabError = JSON.stringify(response);
      } else {
         response = await cloneReport(nodeMove.node, parentId);
         grabError = JSON.stringify(response);
      }
      if (response.reportMetadata) {
         newNode.title = response.reportMetadata.name;
         newNode.key = response.reportMetadata.id;
         newNode.parentId = parentId;
         let treeNodes = addNode(treeData, parentId, newNode);
         return { success: true, treeNodes };
      }
   } else {
      let response = await copyFolder(nodeMove.node, parentId);
      grabError = JSON.stringify(response);
      if (response[0].success) {
         newNode = { ...nodeMove.node };
         newNode.title = "Copy of" + nodeMove.node.title;
         newNode.key = response[0].id;
         newNode.children = [];
         newNode.parentId = parentId;
         let treeNodes = addNode(treeData, parentId, newNode);
         return { success: true, treeNodes };
      }
   }
   return { success: false, error: grabError };
};
