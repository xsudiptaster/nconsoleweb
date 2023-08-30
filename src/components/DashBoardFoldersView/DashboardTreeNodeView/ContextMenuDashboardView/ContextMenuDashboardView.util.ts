import { handleApi, version } from "../../../../utils/utils";
import { removeNode } from "../../../ReportFoldersView/ReportFoldersView.util";
export const handleDashboardDelete = async (treeData: any[], currentNode: any) => {
   let url = "/services/data/v" + version + "/analytics/dashboards/" + currentNode.key;
   let response = await handleApi("fetch", { method: "delete", url });
   if (response.success) {
      let treeNodes = removeNode(treeData, currentNode);
      return { success: true, treeNodes };
   }
   return { success: false, error: JSON.stringify(response) };
};
