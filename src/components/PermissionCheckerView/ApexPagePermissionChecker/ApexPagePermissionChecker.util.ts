export const apexPagePermissionChecker = (apexPageName: string, analysisData: any) => {
   let selectedProfiles = searchMetadata(apexPageName, analysisData.profileMetadatas);
   let selectedPermissionSets = searchMetadata(apexPageName, analysisData.permissionSetMetadatas);
   return {
      selectedProfiles,
      selectedPermissionSets,
   };
};

const searchMetadata = (apexPageName: string, metadatas: any[]) => {
   let selected = [];
   for (let i = 0; i < metadatas.length; i++) {
      let found = searchProfile(apexPageName, metadatas[i]);
      if (found) {
         selected.push({ name: metadatas[i].fullName, id: metadatas[i].id });
      }
   }
   return selected;
};
const searchProfile = (apexPageName: string, profile: any) => {
   let found = false;
   if (profile?.pageAccesses && profile?.pageAccesses[0]) {
      for (let i = 0; i < profile.pageAccesses.length; i++) {
         let permission = profile.pageAccesses[i];
         if (permission.apexPage === apexPageName && permission.enabled === "true") {
            found = true;
         }
      }
   } else if (profile?.pageAccesses) {
      let permission = profile.pageAccesses;
      if (permission.apexPage === apexPageName && permission.enabled === "true") {
         found = true;
      }
   }
   return found;
};
