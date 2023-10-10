import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("metadataDescribe", {});
   let options: any[] = [];
   for (let i = 0; i < response?.metadataObjects.length; i++) {
      let metaData = response.metadataObjects[i];
      options.push({ label: metaData.xmlName, value: metaData.xmlName });
      if (metaData.childXmlNames) {
         metaData.childXmlNames.forEach((child: string) => {
            options.push({ label: child, value: child });
         });
      }
   }
   return options.sort((a: any, b: any) => {
      return a.label > b.label ? 1 : -1;
   });
};
export const getMetaDataTypeList = async (metaDataType: string) => {
   let response = await handleApi("metadataList", { types: [{ type: metaDataType, folder: "" }] });
   if (response && response[0]) {
      return response.sort((a: any, b: any) => {
         return new Date(a.lastModifiedDate) > new Date(b.lastModifiedDate) ? -1 : 1;
      });
   }
   return [];
};
