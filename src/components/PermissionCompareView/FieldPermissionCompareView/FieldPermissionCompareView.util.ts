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
   tempParentKeys.forEach((objectName) => {
      let obj: any = {};
      obj.objectName = objectName;
      obj.fields = [];
      if (permissions?.A[objectName]) {
         obj.fields = [...obj.fields, ...Object.keys(permissions?.A[objectName])];
      }
      if (permissions?.B[objectName]) {
         obj.fields = [...obj.fields, ...Object.keys(permissions?.B[objectName])];
      }
      obj.fields = Array.from(new Set(obj.fields)).sort((a: any, b: any) => {
         return a > b ? 1 : -1;
      });
      tempKey.push(obj);
   });
   return tempKey;
};
export const createCompareMap = (permissions: any, keys: any) => {};
export const handleComparisionFieldLevel = (permissions: any, objectName: string, fieldName: string) => {
   if (
      permissions.A[objectName] &&
      permissions.B[objectName] &&
      permissions.A[objectName][fieldName] &&
      permissions.B[objectName][fieldName] &&
      permissions.A[objectName][fieldName].editable === permissions.B[objectName][fieldName].editable &&
      permissions.A[objectName][fieldName].readable === permissions.B[objectName][fieldName].readable
   ) {
      return true;
   }
   return false;
};
export const setChangeFieldPermissions = (
   permissions: any,
   option: string,
   objectName: string,
   fieldName: string,
   permissionName: string,
   value: boolean
) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (tempPermissions[option] && tempPermissions[option][objectName] && tempPermissions[option][objectName][fieldName]) {
      tempPermissions[option][objectName][fieldName][permissionName] = value.toString();
   } else if (tempPermissions && tempPermissions[option] && tempPermissions[option][objectName]) {
      tempPermissions[option][objectName][fieldName] = {
         field: fieldName,
         editable: "false",
         readable: "false",
      };
      tempPermissions[option][objectName][fieldName][permissionName] = value.toString();
   } else {
      tempPermissions[option][objectName] = {};
      tempPermissions[option][objectName][fieldName] = {
         field: fieldName,
         editable: "false",
         readable: "false",
      };
      tempPermissions[option][objectName][fieldName][permissionName] = value.toString();
   }
   return tempPermissions;
};
export const moveFieldPermissions = (permissions: any, direction: string, selectedObjects: any[], fieldName: any) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (fieldName) {
      tempPermissions = moveOneFieldPermissions(tempPermissions, direction, selectedObjects, fieldName);
   } else {
      tempPermissions = moveAllFieldsPermisssons(tempPermissions, direction, selectedObjects);
   }
   return tempPermissions;
};
const moveAllFieldsPermisssons = (permissions: any, direction: string, selectedObjects: any[]) => {
   if (direction === "left") {
      selectedObjects.forEach((object) => {
         permissions.A[object] = JSON.parse(JSON.stringify(permissions.B[object]));
      });
   } else {
      selectedObjects.forEach((object) => {
         permissions.B[object] = JSON.parse(JSON.stringify(permissions.A[object]));
      });
   }
   return permissions;
};
const moveOneFieldPermissions = (permissions: any, direction: string, selectedObjects: any[], fieldName: string) => {
   if (direction === "left") {
      selectedObjects.forEach((object) => {
         if (permissions.B[object][fieldName] !== undefined) {
            permissions.A[object][fieldName] = JSON.parse(JSON.stringify(permissions.B[object][fieldName]));
         }
      });
   } else {
      selectedObjects.forEach((object) => {
         if (permissions.A[object][fieldName] !== undefined) {
            permissions.B[object][fieldName] = JSON.parse(JSON.stringify(permissions.A[object][fieldName]));
         }
      });
   }
   return permissions;
};
