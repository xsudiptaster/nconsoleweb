const versionInt = require("./config.js");
const jsforce = require("jsforce");

const toolingObjectDescribe = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.tooling.sobject(data.objectName).describe();
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = toolingObjectDescribe;
