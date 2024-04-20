export const handleLoad = (permissions: any) => {
   let tempKey: string[] = [];
   if (permissions?.A) {
      tempKey = Object.keys(permissions.A);
   }
   if (permissions.B) {
      tempKey = [...tempKey, ...Object.keys(permissions.B)];
   }
   let tempSet = new Set(tempKey);
   tempKey = Array.from(tempSet.values()).sort((a, b) => {
      return a > b ? 1 : -1;
   });
   return tempKey;
};
const getObjectPermissions = (permissionMap: any, objectName: string) => {
   if (permissionMap[objectName]) {
      return permissionMap[objectName];
   } else {
      return {
         object: objectName,
         allowCreate: "false",
         allowDelete: "false",
         allowEdit: "false",
         allowRead: "false",
         modifyAllRecords: "false",
         viewAllRecords: "false",
      };
   }
};
export const createCompareMap = (permissions: any, keys: any[]) => {
   let oMap: any = {};
   keys.forEach((key) => {
      oMap[key] = handleComparision(permissions, key);
   });
   return oMap;
};
const handleComparision = (permissions: any, k: string) => {
   let permissionA = getObjectPermissions(permissions.A, k);
   let permissionB = getObjectPermissions(permissions.B, k);
   if (
      permissionA.allowCreate === permissionB.allowCreate &&
      permissionA.allowRead === permissionB.allowRead &&
      permissionA.allowEdit === permissionB.allowEdit &&
      permissionA.allowDelete === permissionB.allowDelete &&
      permissionA.viewAllRecords === permissionB.viewAllRecords &&
      permissionA.modifyAllRecords === permissionB.modifyAllRecords
   ) {
      return true;
   }
   return false;
};
export const setChangeObjectPermissions = (
   permissions: any,
   option: string,
   objectName: string,
   permissionName: string,
   value: boolean
) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (tempPermissions[option] && tempPermissions[option][objectName]) {
      tempPermissions[option][objectName][permissionName] = value.toString();
   } else {
      tempPermissions[option][objectName] = {
         object: objectName,
         allowCreate: "false",
         allowDelete: "false",
         allowEdit: "false",
         allowRead: "false",
         modifyAllRecords: "false",
         viewAllRecords: "false",
      };
      tempPermissions[option][objectName][permissionName] = value.toString();
   }
   return tempPermissions;
};
export const moveObjectPermissions = (
   permissions: any,
   direction: string,
   listObjectNames: any[] | undefined,
   objectName: string
) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (objectName) {
      tempPermissions = moveObjectPermission(tempPermissions, direction, objectName);
   } else if (listObjectNames) {
      tempPermissions = moveAllObjectPermissions(tempPermissions, direction, listObjectNames);
   }

   return tempPermissions;
};
const moveAllObjectPermissions = (permissions: any, direction: string, listObjectNames: string[]) => {
   if (direction === "left") {
      permissions.A = loopAllObjects(permissions.B, listObjectNames);
   } else {
      permissions.B = loopAllObjects(permissions.A, listObjectNames);
   }
   return permissions;
};
const moveObjectPermission = (permissions: any, direction: string, objectName: string) => {
   if (direction === "left") {
      permissions.A[objectName] = getObjectPermissions(permissions.B, objectName);
   } else {
      permissions.B[objectName] = getObjectPermissions(permissions.A, objectName);
   }
   return permissions;
};
const loopAllObjects = (permissionMap: any, listObjectNames: string[]) => {
   let newPermissionMap: any = {};
   listObjectNames.forEach((object) => {
      newPermissionMap[object] = getObjectPermissions(permissionMap, object);
   });
   return newPermissionMap;
};
