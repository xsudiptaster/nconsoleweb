import { XMLBuilder, XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { handleApi } from "../../utils/utils";
export const handleCreateChangeSet = async (selectedMetadatas: any[], changeSetName: string, changeSetDescription: string) => {
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
   const options = {
      ignoreAttributes: false,
   };
   const parser = new XMLParser(options);
   const builder = new XMLBuilder(options);
   let retrieveResponse = await handleApi("metadataRetrieve", { types });
   const zipFileLoaded = await JSZip.loadAsync(retrieveResponse.zipFile, { base64: true });
   const xmlData = await zipFileLoaded.files["package.xml"].async("text");
   const packageData = parser.parse(xmlData);
   console.log("🚀 ~ file: CreateChangeSetView.util.ts:29 ~ handleCreateChangeSet ~ packageData:", packageData);
   packageData.Package.fullName = changeSetName;
   packageData.Package.description = changeSetDescription;
   const xmlDataRevised = builder.build(packageData);
   /**  let basefile = await createBaseFile(files);*/
   const zip = new JSZip();
   for (const key in zipFileLoaded.files) {
      if (key === "package.xml") {
         zip.file(key, xmlDataRevised);
      } else {
         let xmlVal = await zipFileLoaded.files[key].async("text");
         zip.file(key, xmlVal);
      }
   }
   const base64File = await zip.generateAsync({ type: "base64" });
   let response = await handleApi("metadataDeploy", { zipFile: base64File });
   console.log("🚀 ~ file: CreateChangeSetView.util.ts:34 ~ handleCreateChangeSet ~ response:", response);

   return response;
};
export const getChangeSet = async () => {};
