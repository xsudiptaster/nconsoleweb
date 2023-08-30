import { handleApi, version } from "../../../utils/utils";

const updateFolder = async (currentNode: any, value: string) => {
   let response = await handleApi("update", { objectName: "Folder", records: [{ Id: currentNode.key, Name: value }] });
   return response;
};
const updateDashboardLabel = async (currentNode: any, value: string) => {
   const url = `/services/data/v${version}/analytics/dashboards/${currentNode.key}`;
   let response = await handleApi("fetch", {
      method: "patch",
      url,
      body: JSON.stringify({
         name: value,
      }),
   });
   return response;
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
export const saveNodeUpdate = async (treeData: any, nodeData: any, value: string) => {
   if (nodeData.isLeaf) {
      let response = await updateDashboardLabel(nodeData, value);
      if (response.runningUser) {
         let newNode = { ...nodeData };
         newNode.title = value;
         let treeNodes = JSON.parse(JSON.stringify(treeData));
         treeNodes = updateNode(treeNodes, newNode);
         return { success: true, treeNodes };
      } else {
         return { success: false, error: JSON.stringify(response) };
      }
   } else {
      let response = await updateFolder(nodeData, value);
      if (response[0].success) {
         let newNode = { ...nodeData };
         newNode.title = value;
         let treeNodes = JSON.parse(JSON.stringify(treeData));
         treeNodes = updateNode(treeNodes, newNode);
         return { success: true, treeNodes };
      } else {
         return { success: false, error: JSON.stringify(response) };
      }
   }
};
export const countFinder = (nodes: any[], searchString: string) => {
   if (nodes && nodes.length > 0 && searchString && searchString !== "") {
      let count = 0;
      nodes.forEach((node) => {
         if (node.title.toUpperCase().includes(searchString.toUpperCase())) {
            count++;
         }
         if (node.children) {
            count = count + countFinder(node.children, searchString);
         }
      });
      return count;
   }
   return 0;
};
