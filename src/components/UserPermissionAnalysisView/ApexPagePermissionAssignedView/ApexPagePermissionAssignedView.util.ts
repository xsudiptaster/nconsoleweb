export const checkApexPagePermission = (apexPage: string, permissionMap: any) => {
   let profiles = [];
   for (let key in permissionMap) {
      if (
         permissionMap[key]?.apexPagePermissionMap &&
         permissionMap[key]?.apexPagePermissionMap[apexPage] &&
         permissionMap[key]?.apexPagePermissionMap[apexPage].enabled === "true"
      ) {
         profiles.push(key);
      }
   }
   return profiles;
};
