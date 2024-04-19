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
const changeReportTypeName = (metaDataType: string) => {
   if (metaDataType === "Report") {
      return "ReportFolder";
   }
   return metaDataType;
};
export const getMetaDataTypeList = async (metaDataType: string) => {
   let response: any[] = [];
   if (metaDataType === "Report") {
      let reponseReportFolders = await handleApi("metadataList", { types: [{ type: "ReportFolder", folder: "" }] });
      console.log("🚀 ~ getMetaDataTypeList ~ reponseReportFolders:", reponseReportFolders);
      for (let i = 0; i < reponseReportFolders.length; i++) {
         let tempResponse = await handleApi("metadataList", {
            types: [{ type: "Report", folder: reponseReportFolders[i].fullName }],
         });
         if (tempResponse[0]) {
            response = [...response, ...tempResponse];
         } else {
            response.push(tempResponse);
         }
      }
   } else {
      response = await handleApi("metadataList", { types: [{ type: metaDataType, folder: "" }] });
   }
   console.log(response);
   if (typeof response == "string") {
      return [];
   }
   if (response && response[0]) {
      let managedFiltered = response.filter((metadata: any) => {
         return metadata.manageableState !== "installed";
      });
      return managedFiltered.sort((a: any, b: any) => {
         return new Date(a.lastModifiedDate) > new Date(b.lastModifiedDate) ? -1 : 1;
      });
   } else {
      return [];
   }
};
