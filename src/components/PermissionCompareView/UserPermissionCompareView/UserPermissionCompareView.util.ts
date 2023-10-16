export const handleLoad = (permissions: any) => {
   let tempKey: string[] = [];
   if (permissions?.A) {
      tempKey = [...tempKey, ...Object.keys(permissions?.A)];
   }
   if (permissions?.B) {
      tempKey = [...tempKey, ...Object.keys(permissions?.B)];
   }
   tempKey = Array.from(new Set(tempKey)).sort((a: any, b: any) => {
      return a > b ? 1 : -1;
   });
   return tempKey;
};
export const handleComparision = (permissions: any, permissionName: string) => {
   let permissionA = getPermission(permissions.A, permissionName);
   let permissionB = getPermission(permissions.B, permissionName);
   if (permissionA[permissionName]?.enabled === permissionB[permissionName]?.enabled) {
      return true;
   }
   return false;
};
export const setChangeUserPermissions = (permissions: any, option: string, permissionName: string, value: boolean) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (tempPermissions[option] && tempPermissions[option][permissionName]) {
      tempPermissions[option][permissionName].enabled = value.toString();
   } else {
      tempPermissions[option][permissionName] = {
         name: permissionName,
         enabled: "false",
      };
      tempPermissions[option][permissionName].enabled = value.toString();
   }
   return tempPermissions;
};
const loopAllPermissions = (listPermissions: any[], permissionMap: any) => {
   let newPermissionMap: any = {};
   listPermissions.forEach((permission) => {
      newPermissionMap[permission] = getPermission(permissionMap, permission);
   });
   return newPermissionMap;
};
export const moveUserPermissions = (permissions: any, direction: string, listPermissions: any) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (direction === "left") {
      tempPermissions.A = loopAllPermissions(listPermissions, tempPermissions.B);
   } else {
      tempPermissions.B = loopAllPermissions(listPermissions, tempPermissions.A);
   }
   return tempPermissions;
};
const getPermission = (permissionMap: any, permission: string) => {
   if (permissionMap[permission]) {
      return permissionMap[permission];
   } else {
      return {
         name: permission,
         enabled: "false",
      };
   }
};
