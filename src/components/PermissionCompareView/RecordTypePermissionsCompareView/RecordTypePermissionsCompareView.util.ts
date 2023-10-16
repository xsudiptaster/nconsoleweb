export const handleLoad = (permissions: any) => {
   let tempParentKeys: string[] = [];
   let tempKey: any[] = [];
   if (permissions?.A) {
      tempParentKeys = Object.keys(permissions.A);
   }
   if (permissions.B) {
      tempParentKeys = [...tempParentKeys, ...Object.keys(permissions.B)];
   }
   let tempSet = new Set(tempParentKeys);
   tempParentKeys = Array.from(tempSet.values()).sort((a, b) => {
      return a > b ? 1 : -1;
   });
   tempParentKeys.forEach((recordTypeName) => {
      let obj: any = {};
      obj.recordTypeName = recordTypeName;
      obj.recordTypes = [];
      if (permissions?.A[recordTypeName]) {
         obj.recordTypes = [...obj.recordTypes, ...Object.keys(permissions?.A[recordTypeName])];
      }
      if (permissions?.B[recordTypeName]) {
         obj.recordTypes = [...obj.recordTypes, ...Object.keys(permissions?.B[recordTypeName])];
      }
      obj.recordTypes = Array.from(new Set(obj.recordTypes)).sort((a: any, b: any) => {
         return a > b ? 1 : -1;
      });
      tempKey.push(obj);
   });
   return tempKey;
};
export const handleComparision = (permissions: any, objectName: string, recordTypeName: string) => {
   if (
      permissions?.A[objectName] &&
      permissions?.B[objectName] &&
      permissions?.A[objectName][recordTypeName] &&
      permissions?.B[objectName][recordTypeName] &&
      permissions?.A[objectName][recordTypeName]?.default === permissions?.B[objectName][recordTypeName].default &&
      permissions?.A[objectName][recordTypeName]?.visible === permissions?.B[objectName][recordTypeName].visible
   ) {
      return true;
   }
   return false;
};
export const setChangeRecordTypePermissions = (
   permissions: any,
   option: string,
   objectName: string,
   recordTypeName: string,
   permissionName: string,
   value: boolean
) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (tempPermissions[option] && tempPermissions[option][objectName] && tempPermissions[option][objectName][recordTypeName]) {
      tempPermissions[option][objectName][recordTypeName][permissionName] = value.toString();
   } else if (tempPermissions[option][objectName]) {
      tempPermissions[option][objectName][recordTypeName] = {
         recordType: recordTypeName,
         default: "false",
         visible: "false",
      };
      tempPermissions[option][objectName][recordTypeName][permissionName] = value.toString();
   } else {
      tempPermissions[option][objectName] = {};
      tempPermissions[option][objectName][recordTypeName] = {
         recordType: recordTypeName,
         default: "false",
         visible: "false",
      };
      tempPermissions[option][objectName][recordTypeName][permissionName] = value.toString();
   }
   return tempPermissions;
};
export const moveRecordTypePermissions = (permissions: any, direction: string, recordTypeName: any) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (recordTypeName) {
      tempPermissions = moveOneRecordTypePermission(tempPermissions, direction, recordTypeName);
   } else {
      tempPermissions = moveAllRecordTypePermissions(tempPermissions, direction);
   }
   return tempPermissions;
};
const moveAllRecordTypePermissions = (permissions: any, direction: string) => {
   if (direction === "left") {
      permissions.A = JSON.parse(JSON.stringify(permissions.B));
   } else {
      permissions.B = JSON.parse(JSON.stringify(permissions.A));
   }
   return permissions;
};
const moveOneRecordTypePermission = (permissions: any, direction: string, recordTypeName: string) => {
   let objectName = recordTypeName.split(".")[0];
   if (direction === "left") {
      permissions.A[objectName][recordTypeName] = JSON.parse(JSON.stringify(permissions.B[objectName][recordTypeName]));
   } else {
      permissions.B[objectName][recordTypeName] = JSON.parse(JSON.stringify(permissions.A[objectName][recordTypeName]));
   }
   return permissions;
};
