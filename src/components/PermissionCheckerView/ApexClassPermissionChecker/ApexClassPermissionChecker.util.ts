export const apexClassPermissionChecker = (apexClassName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(apexClassName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(apexClassName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};
const searchMetadata = (apexClassName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(apexClassName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (apexClassName: string, profile: any) => {
   let found = false;
   if (profile?.classAccesses && profile?.classAccesses[0]) {
      for (let i = 0; i < profile.classAccesses.length; i++) {
         let permission = profile.classAccesses[i];
         if (permission.apexClass === apexClassName && permission.enabled === "true") {
            found = true;
         }
      }
   } else if (profile?.classAccesses) {
      let permission = profile.classAccesses;
      if (permission.apexClass === apexClassName && permission.enabled === "true") {
         found = true;
      }
   }
   return found;
};
