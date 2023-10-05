import { createBaseFile, handleApi, version } from "../../utils/utils";

export const hadleExecute = async (selectedMetadatas: any[]) => {
   let files: any = {};
   let mapSelectedMetadata = selectedMetadatas.reduce((oMap, metadata) => {
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
   files["package.xml"] = {
      Package: {
         types,
         version: version,
      },
   };
   files["destructiveChanges.xml"] = {
      Package: {
         types,
         version: version,
      },
   };
   let basefile = await createBaseFile(files);
   let response = await handleApi("metadataDeploy", { zipFile: basefile });
   console.log("🚀 ~ file: DeleteMetadataView.util.ts:37 ~ hadleExecute ~ response:", response);
   return response;
};
