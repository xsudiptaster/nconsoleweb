export const userPermissionChecker = (userPermissionName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(userPermissionName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(userPermissionName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};
const searchMetadata = (userPermissionName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(userPermissionName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (userPermissionName: string, profile: any) => {
   let found = false;
   if (profile?.userPermissions && profile?.userPermissions[0]) {
      for (let i = 0; i < profile.userPermissions.length; i++) {
         let permission = profile.userPermissions[i];
         if (permission.name === userPermissionName && permission.enabled === "true") {
            found = true;
         }
      }
   } else if (profile?.userPermissions) {
      let permission = profile.userPermissions;
      if (permission.name === userPermissionName && permission.enabled === "true") {
         found = true;
      }
   }
   return found;
};
