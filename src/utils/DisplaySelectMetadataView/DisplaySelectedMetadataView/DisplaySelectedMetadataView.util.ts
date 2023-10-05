export const handleLoad = (selectedMetadatas: any[]) => {
   return selectedMetadatas.reduce((oMap: any, metaData: any) => {
      if (oMap[metaData.type]) {
         oMap[metaData.type].push(metaData);
      } else {
         oMap[metaData.type] = [];
         oMap[metaData.type].push(metaData);
      }
      return oMap;
   }, {});
};
