export const getObjectPermission = (trackChanges: any, object: any, profile: any) => {
   if (trackChanges[profile.fileName]?.objectPermissions) {
      let permissions = trackChanges[profile.fileName].objectPermissions.filter((perm: any) => {
         return perm.object === object.name;
      });
      if (permissions[0]) {
         return permissions[0];
      }
   }
   return getOldPermission(profile, object.name);
};
const getOldPermission = (profile: any, objectName: string) => {
   if (profile.metadata?.objectPermissions) {
      let permissons = [];
      if (profile.metadata.objectPermissions[0]) {
         permissons = profile.metadata.objectPermissions.filter((perm: any) => {
            return perm.object === objectName;
         });
      } else {
         permissons = profile.metadata.objectPermissions.object === objectName ? [profile.metadata.objectPermissions] : [];
      }
      return permissons[0]
         ? permissons[0]
         : {
              allowCreate: false,
              allowDelete: false,
              allowEdit: false,
              allowRead: false,
              modifyAllRecords: false,
              object: objectName,
              viewAllRecords: false,
           };
   }
   return {
      allowCreate: false,
      allowDelete: false,
      allowEdit: false,
      allowRead: false,
      modifyAllRecords: false,
      object: objectName,
      viewAllRecords: false,
   };
};
export const hasChange = (profile: any, newPermission: any) => {
   let oldPermission = getOldPermission(profile, newPermission.object);
   if (oldPermission) {
      return {
         allowCreate: oldPermission.allowCreate !== newPermission.allowCreate,
         allowDelete: oldPermission.allowDelete !== newPermission.allowDelete,
         allowEdit: oldPermission.allowEdit !== newPermission.allowEdit,
         allowRead: oldPermission.allowRead !== newPermission.allowRead,
         modifyAllRecords: oldPermission.modifyAllRecords !== newPermission.modifyAllRecords,
         viewAllRecords: oldPermission.viewAllRecords !== newPermission.viewAllRecords,
      };
   }
   return {
      allowCreate: false,
      allowDelete: false,
      allowEdit: false,
      allowRead: false,
      modifyAllRecords: false,
      object: newPermission.object,
      viewAllRecords: false,
   };
};
export const updateTrackChanges = (trackChanges: any, profile: any, newPermission: any) => {
   console.log("🚀 ~ updateTrackChanges ~ trackChanges:", trackChanges);
   let tempTrackChanges = JSON.parse(JSON.stringify(trackChanges));
   if (tempTrackChanges[profile.fileName] && tempTrackChanges[profile.fileName].objectPermissions) {
      let tempFilteredPermissions = tempTrackChanges[profile.fileName].objectPermissions.filter((permission: any) => {
         return permission.object !== newPermission.object;
      });
      let change = hasChange(profile, newPermission);
      if (
         change.allowCreate ||
         change.allowDelete ||
         change.allowEdit ||
         change.allowRead ||
         change.modifyAllRecords ||
         change.viewAllRecords
      ) {
         tempFilteredPermissions.push(newPermission);
      }
      tempTrackChanges[profile.fileName].objectPermissions = tempFilteredPermissions;
   } else if (tempTrackChanges[profile.fileName]) {
      tempTrackChanges[profile.fileName].objectPermissions = [];
      tempTrackChanges[profile.fileName].objectPermissions.push(newPermission);
   } else if (tempTrackChanges) {
      tempTrackChanges[profile.fileName] = {};
      tempTrackChanges[profile.fileName].objectPermissions = [];
      tempTrackChanges[profile.fileName].objectPermissions.push(newPermission);
   } else {
      tempTrackChanges = {};
      tempTrackChanges[profile.fileName] = {};
      tempTrackChanges[profile.fileName].objectPermissions = [];
      tempTrackChanges[profile.fileName].objectPermissions.push(newPermission);
   }
   return tempTrackChanges;
};
