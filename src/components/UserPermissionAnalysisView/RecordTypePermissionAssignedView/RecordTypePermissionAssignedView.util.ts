export const checkRecordTypePermission = (recordType: string, permissionMap: any) => {
   let permission: any = {};
   permission.visible = {
      value: false,
      profiles: [],
   };
   permission.default = {
      value: false,
      profiles: [],
   };
   for (let key in permissionMap) {
      let recordTypePermissions = permissionMap[key].recordTypePermissionMap;
      let object = recordType.split(".")[0];
      if (recordTypePermissions[object] && recordTypePermissions[object][recordType]) {
         if (recordTypePermissions[object][recordType].visible === "true") {
            permission.visible.value = true;
            permission.visible.profiles.push(key);
         }
         if (recordTypePermissions[object][recordType].default === "true") {
            permission.default.value = true;
            permission.default.profiles.push(key);
         }
      }
   }
   return permission;
};
