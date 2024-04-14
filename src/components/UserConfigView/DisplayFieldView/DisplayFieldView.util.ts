import { handleApi } from "../../../utils/utils";
export const getReferenceObjectValues = async (objectName: string) => {
   let response = await handleApi("objectDescribe", { objectName: objectName });
   let field = response.fields.find((field: any) => {
      return field.nameField;
   });
   let query = "SELECT id," + field.name + " FROM " + objectName;
   let responseRecords = await handleApi("query", { query });
   let records = responseRecords.records.map((record: any) => {
      return {
         label: record[field.name],
         value: record.Id,
      };
   });
   return records;
};
