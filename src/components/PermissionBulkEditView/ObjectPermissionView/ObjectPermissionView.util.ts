import { handleApi } from "../../../utils/utils";

export const handleGetObject = async () => {
   let response = await handleApi("describeGlobal", {});
   let objectList = response.sobjects
      .filter((object: any) => {
         return object.layoutable;
      })
      .map((object: any) => {
         return { ...object, value: object.name };
      })
      .sort((a: any, b: any) => {
         return a.label > b.label ? 1 : -1;
      });
   return objectList;
};
export const handleGetObjectDetails = async (selectedObjects: any[]) => {
   let objectList = [];
   for (let i = 0; i < selectedObjects.length; i++) {
      let response = await handleApi("objectDescribe", { objectName: selectedObjects[i] });
      objectList.push(response);
   }
   return objectList;
};
