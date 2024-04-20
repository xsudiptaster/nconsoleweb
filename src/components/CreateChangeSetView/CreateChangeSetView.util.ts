import { XMLBuilder, XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { handleApi, handleApiSecond } from "../../utils/utils";

const getTypesFromMetadataList = (metadataList: any[]) => {
   let mapSelectedMetadata = metadataList.reduce((oMap, metadata) => {
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
   return types;
};
export const handleCreateChangeSet = async (selectedMetadatas: any[], initialMetadatas: any[], changeSetName: string) => {
   let types: any = getTypesFromMetadataList(selectedMetadatas);

   const options = {
      ignoreAttributes: false,
   };
   const parser = new XMLParser(options);
   const builder = new XMLBuilder(options);
   let retrieveResponse = await handleApi("metadataRetrieve", { types });
   const zipFileLoaded: any = await JSZip.loadAsync(retrieveResponse.zipFile, { base64: true });
   const xmlData = await zipFileLoaded.files["package.xml"].async("text");
   const packageData = parser.parse(xmlData);
   packageData.Package.fullName = changeSetName;
   const xmlDataRevised = builder.build(packageData);
   zipFileLoaded.file("package.xml", xmlDataRevised);
   const base64File = await zipFileLoaded.generateAsync({ type: "base64" });
   let response = await handleApi("metadataDeploy", { zipFile: base64File });
   return response;
};
const getMetadataList = async (type: string) => {
   let response = await handleApi("metadataList", { types: [{ type: type, folder: "" }] });
   if (response && response[0]) {
      return response.sort((a: any, b: any) => {
         return new Date(a.lastModifiedDate) > new Date(b.lastModifiedDate) ? -1 : 1;
      });
   }
   return [];
};
export const getChangeSet = async (changeSetName: string) => {
   const options = {
      ignoreAttributes: false,
   };
   let response = await handleApi("metadataRetrieve", { packageNames: [changeSetName] });
   if (response.success === "false") {
      return { success: false };
   }
   const zipFileLoaded = await JSZip.loadAsync(response.zipFile, { base64: true });
   const xmlData = await zipFileLoaded.files[changeSetName + "/package.xml"].async("text");
   const parser = new XMLParser(options);
   const packageData = parser.parse(xmlData);
   let selectedMetadatas: any[] = [];
   if (packageData?.Package?.types) {
      if (packageData?.Package?.types[0]) {
         for (let i = 0; i < packageData?.Package?.types.length; i++) {
            let type = packageData?.Package?.types[i];
            let response = await getMetadataList(type.name);
            let filteredMetadata = response.filter((metadata: any) => {
               return type.members.includes(metadata.fullName);
            });
            selectedMetadatas = [...selectedMetadatas, ...filteredMetadata];
         }
      } else {
         let type = packageData?.Package?.types;
         let response = await getMetadataList(type.name);
         let filteredMetadata = response.filter((metadata: any) => {
            return type.members.includes(metadata.fullName);
         });
         selectedMetadatas = [...selectedMetadatas, ...filteredMetadata];
      }
   }
   return {
      selectedMetadatas,
      success: true,
   };
};
export const handleValidation = async (selectedMetadatas: any[], currentLoginInfo: any) => {
   let types: any = getTypesFromMetadataList(selectedMetadatas);
   let retrieveResponse = await handleApi("metadataRetrieve", { types });
   let deployResponse = await handleApiSecond("metadataDeploy", currentLoginInfo, {
      zipFile: retrieveResponse.zipFile,
      checkOnly: true,
   });

   return deployResponse;
};
