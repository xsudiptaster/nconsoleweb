import { handleApi, sendMessage } from "../../utils/utils";

const replaceQuery = (record: any, query: string) => {
   let keys = Object.keys(record);
   let tempQuery = query;
   for (let i = 0; i < keys.length; i++) {
      let tempKey = ("pv_" + keys[i]).replaceAll(" ", "");
      tempQuery = tempQuery.replaceAll(tempKey, record[keys[i]]);
   }
   return tempQuery;
};
export const handleQuery = async (query: string, data: any[]) => {
   let tempResponse: any[] = [];
   for (let i = 0; i < data.length; i++) {
      let tempCode = replaceQuery(data[i], query);
      let response = await handleApi("query", { query: tempCode });
      if (response.success === false) {
         return {
            success: false,
            error: JSON.stringify(response),
         };
      }
      let records = response.records.map((record: any) => {
         return { pvRowIndex: i, ...record };
      });
      sendMessage({ current: i, total: data.length });
      tempResponse = [...tempResponse, ...records];
   }
   return { success: true, data: tempResponse };
};
