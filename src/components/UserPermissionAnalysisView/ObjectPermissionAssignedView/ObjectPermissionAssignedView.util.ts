export const checkObjectPermission = (object: string, permissionMap: any) => {
   let permission: any = {};
   permission.allowCreate = {
      value: false,
      profiles: [],
   };
   permission.allowRead = {
      value: false,
      profiles: [],
   };
   permission.allowEdit = {
      value: false,
      profiles: [],
   };
   permission.allowDelete = {
      value: false,
      profiles: [],
   };
   permission.viewAllrecords = {
      value: false,
      profiles: [],
   };
   permission.modifyAllRecords = {
      value: false,
      profiles: [],
   };
   for (let key in permissionMap) {
      let objectPermissionsMap = permissionMap[key].objectPermissionMap;
      if (objectPermissionsMap[object]) {
         if (objectPermissionsMap[object].allowCreate === "true") {
            permission.allowCreate.value = true;
            permission.allowCreate.profiles.push(key);
         }
         if (objectPermissionsMap[object].allowRead === "true") {
            permission.allowRead.value = true;
            permission.allowRead.profiles.push(key);
         }
         if (objectPermissionsMap[object].allowEdit === "true") {
            permission.allowEdit.value = true;
            permission.allowEdit.profiles.push(key);
         }
         if (objectPermissionsMap[object].allowDelete === "true") {
            permission.allowDelete.value = true;
            permission.allowDelete.profiles.push(key);
         }
         if (objectPermissionsMap[object].viewAllrecords === "true") {
            permission.viewAllrecords.value = true;
            permission.viewAllrecords.profiles.push(key);
         }
         if (objectPermissionsMap[object].modifyAllRecords === "true") {
            permission.modifyAllRecords.value = true;
            permission.modifyAllRecords.profiles.push(key);
         }
      }
   }
   return permission;
};
