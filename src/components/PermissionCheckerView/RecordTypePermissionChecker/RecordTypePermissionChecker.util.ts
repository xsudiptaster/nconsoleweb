export const handleRecordTypeChecker = (recordTypeName: string, permissionName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(recordTypeName, permissionName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(recordTypeName, permissionName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};
const searchMetadata = (recordTypeName: string, permissionName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(recordTypeName, permissionName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (recordTypeName: string, permissionName: string, profile: any) => {
   let found = false;
   if (profile?.recordTypeVisibilities && profile?.recordTypeVisibilities[0]) {
      for (let i = 0; i < profile.recordTypeVisibilities.length; i++) {
         let permission = profile.recordTypeVisibilities[i];
         if (permission.field === recordTypeName && permission[permissionName] === "true") {
            found = true;
         }
      }
   } else if (profile?.recordTypeVisibilities) {
      let permission = profile.recordTypeVisibilities;
      if (permission.field === recordTypeName && permission[permissionName] === "true") {
         found = true;
      }
   }
   return found;
};
