import { handleApi, handleApiSecond } from "../../utils/utils";

export const handleDeploy = async (selectedMetadatas: any, currentLoginInfo: any) => {
   let mapSelectedMetadata = selectedMetadatas.reduce((oMap: any, metadata: any) => {
      if (oMap[metadata.type]) {
         oMap[metadata.type].push(metadata);
      } else {
         oMap[metadata.type] = [];
         oMap[metadata.type].push(metadata);
      }
      return oMap;
   }, {});
   let types: any = [];
   for (let i = 0; i < Object.keys(mapSelectedMetadata).length; i++) {
      let type = Object.keys(mapSelectedMetadata)[i];
      let oType: any = {};
      oType.name = type;
      oType.members = [];
      oType.members = mapSelectedMetadata[type].map((metadata: any) => {
         return metadata.fullName;
      });
      types.push(oType);
   }
   let retrieveResponse = await handleApi("metadataRetrieve", { types });
   let deployResponse = await handleApiSecond("metadataDeploy", currentLoginInfo, { zipFile: retrieveResponse.zipFile });
   return deployResponse;
};
