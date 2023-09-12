const versionInt = require("./config.js");
const jsforce = require("jsforce");

const metadataList = async (data) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.metadata.list(data.types, versionInt.toString());
    return result;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};
module.exports= metadataList;
