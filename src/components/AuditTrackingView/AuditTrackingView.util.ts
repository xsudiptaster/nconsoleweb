import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let query =
      "SELECT Section , Action , CreatedDate , CreatedById , Display , DelegateUser , ResponsibleNamespacePrefix , CreatedByContext , CreatedByIssuer ," +
      "Id , CreatedBy.UserName , CreatedBy.Name FROM SetupAuditTrail";
   let response = await handleApi("query", { query });
   let cleanData = response.records.map((record: any) => {
      return {
         Section: record.Section,
         CreatedDate: new Date(record.CreatedDate).toISOString(),
         Action: record.Action,
         CreatedByContext: record.CreatedByContext,
         CreatedBy: record.CreatedBy?.Name,
         CreatedByUserName: record.CreatedBy?.Username,
         CreatedByIssuer: record.CreatedByIssuer,
      };
   });
   return cleanData;
};
