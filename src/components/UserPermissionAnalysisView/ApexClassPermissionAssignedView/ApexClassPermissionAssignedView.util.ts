export const checkApexClassPermission = (apexClass: string, permissionMap: any) => {
   let profiles = [];
   for (let key in permissionMap) {
      if (
         permissionMap[key]?.apexClassPermissionMap &&
         permissionMap[key]?.apexClassPermissionMap[apexClass] &&
         permissionMap[key]?.apexClassPermissionMap[apexClass].enabled === "true"
      ) {
         profiles.push(key);
      }
   }
   return profiles;
};
