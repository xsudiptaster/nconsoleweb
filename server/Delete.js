const versionInt = require("./config.js");
const jsforce = require("jsforce");

const deleteMethod = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.sobject(data.objectName).del(
         data.records.map((oRow) => {
            return oRow.Id;
         }),
         { allOrNone: false, allowRecursive: true }
      );
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = deleteMethod;
