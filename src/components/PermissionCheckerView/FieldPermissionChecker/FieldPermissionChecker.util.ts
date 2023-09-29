export const handleFieldPermissionCheck = (fieldName: string, permissionName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(fieldName, permissionName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(fieldName, permissionName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};
const searchMetadata = (fieldName: string, permissionName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(fieldName, permissionName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (fieldName: string, permissionName: string, profile: any) => {
   let fullFieldName = fieldName;
   let found = false;
   if (profile?.fieldPermissions && profile?.fieldPermissions[0]) {
      for (let i = 0; i < profile.fieldPermissions.length; i++) {
         let permission = profile.fieldPermissions[i];
         if (permission.field === fullFieldName && permission[permissionName] === "true") {
            found = true;
         }
      }
   } else if (profile?.fieldPermissions) {
      let permission = profile.fieldPermissions;
      if (permission.field === fullFieldName && permission[permissionName] === "true") {
         found = true;
      }
   }
   return found;
};
