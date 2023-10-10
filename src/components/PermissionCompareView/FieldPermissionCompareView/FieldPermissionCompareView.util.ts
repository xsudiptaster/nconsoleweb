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
