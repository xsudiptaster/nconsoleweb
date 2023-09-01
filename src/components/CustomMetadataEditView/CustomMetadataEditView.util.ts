import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("describeGlobal", {});
   let objects = response.sobjects
      .filter((object: any) => {
         return object.name.includes("__mdt");
      })
      .sort((a: any, b: any) => {
         return a.label > b.label ? 1 : -1;
      })
      .map((object: any) => {
         return { ...object, value: object.name };
      });
   return objects;
};
export const handleObjectSelection = async (objectName: any) => {
   let response = await handleApi("objectDescribe", { objectName });
   let query = "SELECT ";
   let fields: any[] = [];
   response.fields.forEach((field: any) => {
      fields.push(field.name);
   });
   query = query + fields.join(",");
   query = query + " FROM " + objectName;
   let result = await handleApi("query", { query });
   return { records: result.records, fields: response.fields };
};
