const versionInt = require("./config.js");
const jsforce = require("jsforce");

const metadataRead = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.metadata.read(data.objectName, data.types);
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = metadataRead;
