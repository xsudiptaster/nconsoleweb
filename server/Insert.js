import { versionInt } from "./config";

import jsforce from "jsforce";

const insert = async (data: any) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.sobject(data.objectName).create(data.records, { allOrNone: false, allowRecursive: true });
      return result;
   } catch (err: any) {
      return {
         success: false,
         error: err.message,
      };
   }
};
export default insert;
