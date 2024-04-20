const versionInt = require("./config.js");
const jsforce = require("jsforce");

const toolingGlobalDescribe = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.tooling.describeGlobal();
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = toolingGlobalDescribe;
