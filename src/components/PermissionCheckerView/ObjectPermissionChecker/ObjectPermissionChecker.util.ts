export const handleFiltering = (objectName: any, permissionName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(objectName, permissionName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(objectName, permissionName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};
const searchMetadata = (objectName: string, permissionName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(objectName, permissionName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (objectName: string, permissionName: string, profile: any) => {
   let found = false;
   if (profile?.objectPermissions && profile?.objectPermissions[0]) {
      for (let i = 0; i < profile.objectPermissions.length; i++) {
         let permission = profile.objectPermissions[i];
         if (permission.object === objectName && permission[permissionName] === "true") {
            found = true;
         }
      }
   } else if (profile?.objectPermissions) {
      let permission = profile.objectPermissions;
      if (permission.object === objectName && permission[permissionName] === "true") {
         found = true;
      }
   }
   return found;
};
