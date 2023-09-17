export const getRecordTypePermission = (trackChanges: any, profile: any, object: any) => {
   let permissionMap: any = {};
   if (object?.recordTypeInfos[0]) {
      for (let i = 0; i < object.recordTypeInfos.length; i++) {
         if (object.recordTypeInfos[i].developerName !== "Master") {
            permissionMap[object.recordTypeInfos[i].developerName] = getOldPermission(
               profile,
               object.name + "." + object.recordTypeInfos[i].developerName
            );
         }
      }
   }
   if (trackChanges[profile.fileName]?.recordTypeVisibilities) {
      if (object?.recordTypeInfos[0]) {
         for (let i = 0; i < object.recordTypeInfos.length; i++) {
            if (object.recordTypeInfos[i].developerName !== "Master") {
               let recordTypeName = object.name + "." + object.recordTypeInfos[i].developerName;
               let permissions = trackChanges[profile.fileName]?.recordTypeVisibilities.filter((permission: any) => {
                  return permission.recordType === recordTypeName;
               });
               if (permissions[0]) {
                  permissionMap[object.recordTypeInfos[i].developerName] = permissions[0];
               }
            }
         }
      }
   }

   return permissionMap;
};
const getOldPermission = (profile: any, recordTypeName: string) => {
   if (profile.metadata?.recordTypeVisibilities) {
      let permissions = [];
      if (profile.metadata?.recordTypeVisibilities[0]) {
         permissions = profile.metadata.recordTypeVisibilities.filter((permission: any) => {
            return permission.recordType === recordTypeName;
         });
      } else {
         permissions =
            profile.metadata.recordTypeVisibilities.recordType === recordTypeName
               ? [profile.metadata.recordTypeVisibilities]
               : [];
      }
      return permissions[0] ? permissions[0] : { default: false, visible: false, recordType: recordTypeName };
   }
   return { default: false, visible: false, recordType: recordTypeName };
};
export const handlePermissionChange = (permissionMap: any, recordTypeName: string, permission: string, value: boolean) => {
   let newPermissionMap = { ...JSON.parse(JSON.stringify(permissionMap)) };
   if (permission === "default") {
      for (let key in newPermissionMap) {
         if (recordTypeName !== key) {
            newPermissionMap[key].default = false;
         } else {
            newPermissionMap[key].default = value;
            if (value) {
               newPermissionMap[key].visible = true;
            }
         }
      }
   } else {
      newPermissionMap[recordTypeName][permission] = value;
   }
   return newPermissionMap;
};
export const updateTrackChanges = (trackChanges: any, profile: any, permissionMap: any) => {
   let tempTrackChanges = { ...JSON.parse(JSON.stringify(trackChanges)) };
   for (let key in permissionMap) {
      let recordTypePermission = permissionMap[key];
      if (tempTrackChanges[profile.fileName]?.recordTypeVisibilities) {
         let tempRecordTypeVisibilities = tempTrackChanges[profile.fileName]?.recordTypeVisibilities.filter((permission: any) => {
            return permission.recordType !== recordTypePermission.recordType;
         });
         tempRecordTypeVisibilities.push(recordTypePermission);
         tempTrackChanges[profile.fileName].recordTypeVisibilities = tempRecordTypeVisibilities;
      } else if (tempTrackChanges[profile.fileName]) {
         tempTrackChanges[profile.fileName].recordTypeVisibilities = [];
         tempTrackChanges[profile.fileName].recordTypeVisibilities.push(recordTypePermission);
      } else {
         tempTrackChanges[profile.fileName] = {};
         tempTrackChanges[profile.fileName].recordTypeVisibilities = [];
         tempTrackChanges[profile.fileName].recordTypeVisibilities.push(recordTypePermission);
      }
   }
   return tempTrackChanges;
};
export const hasChange = (permissionMap: any, profile: any, object: any) => {
   let changes: any = {};
   if (object?.recordTypeInfos[0]) {
      for (let i = 0; i < object.recordTypeInfos.length; i++) {
         if (object.recordTypeInfos[i].developerName !== "Master") {
            let recordTypeName = object.name + "." + object.recordTypeInfos[i].developerName;
            let oldPermission = getOldPermission(profile, recordTypeName);
            changes[object.recordTypeInfos[i].developerName] = {
               default: oldPermission.default !== permissionMap[object.recordTypeInfos[i].developerName].default,
               visible: oldPermission.visible !== permissionMap[object.recordTypeInfos[i].developerName].visible,
            };
         }
      }
   }
   return changes;
};
