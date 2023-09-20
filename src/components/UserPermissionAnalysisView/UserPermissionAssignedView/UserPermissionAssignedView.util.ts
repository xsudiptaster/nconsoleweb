export const checkUserPermission = (userPermission: string, permissionMap: any) => {
   let profiles = [];
   for (let key in permissionMap) {
      if (
         permissionMap[key]?.userPermissionMap &&
         permissionMap[key]?.userPermissionMap[userPermission] &&
         permissionMap[key]?.userPermissionMap[userPermission].enabled === "true"
      ) {
         profiles.push(key);
      }
   }
   return profiles;
};
