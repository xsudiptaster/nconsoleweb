const versionInt = require("./config.js");
const jsforce = require("jsforce");

const apexCode = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.tooling.executeAnonymous(data.code);
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = apexCode;
