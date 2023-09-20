export const checkPermission = (field: string, permissionMap: any) => {
   let permission: any = {};
   permission.editable = {
      value: false,
      profiles: [],
   };
   permission.readable = {
      value: false,
      profiles: [],
   };
   for (let key in permissionMap) {
      let fieldPermissionsMap = permissionMap[key].fieldPermissionMap;
      let object = field.split(".")[0];
      if (fieldPermissionsMap[object] && fieldPermissionsMap[object][field]) {
         if (fieldPermissionsMap[object][field].editable === "true") {
            permission.editable.value = true;
            permission.editable.profiles.push(key);
         }
         if (fieldPermissionsMap[object][field].readable === "true") {
            permission.readable.value = true;
            permission.readable.profiles.push(key);
         }
      }
   }
   return permission;
};
