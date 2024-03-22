const versionInt = require("./config.js");
const jsforce = require("jsforce");

async function checkDeployStatus(conn, id) {
   let status = await conn.metadata.checkDeployStatus(id);
   if (!status.done) {
      status = await checkDeployStatus(conn, id);
   } else {
      return status;
   }
   return status;
}
const metadataDeploy = async (data) => {
   const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
   });
   const Options = {};
   Options.rollbackOnError = true;
   Options.singlePackage = true;
   Options.allowMissingFiles = true;
   Options.autoUpdatePackage = true;
   Options.checkOnly = data?.checkOnly ? data?.checkOnly : false;
   try {
      const deployRequest = await conn.metadata.deploy(data.zipFile, Options);
      const deployStatus = await checkDeployStatus(conn, deployRequest.id);
      return deployStatus;
   } catch (err) {
      const response = {
         success: false,
         message: err.message,
      };
      return response;
   }
};
module.exports = metadataDeploy;
