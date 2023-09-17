export const getFieldPermission = (trackChanges: any, object: any, field: any, profile: any) => {
   if (trackChanges[profile.fileName]?.fieldPermissions) {
      let permissions = trackChanges[profile.fileName]?.fieldPermissions.filter((perm: any) => {
         return perm.field === object.name + "." + field.name;
      });
      if (permissions[0]) {
         return permissions[0];
      }
   }
   return getOldPermission(profile, object.name + "." + field.name);
};
export const updateTrackChanges = (trackChanges: any, profile: any, newPermission: any) => {
   let tempTrackChanges = { ...JSON.parse(JSON.stringify(trackChanges)) };
   if (tempTrackChanges[profile.fileName]?.fieldPermissions) {
      let tempFilteredPermissions = tempTrackChanges[profile.fileName]?.fieldPermissions.filter((permission: any) => {
         return permission.field !== newPermission.field;
      });
      let change = hasChange(profile, newPermission);
      if (change.editable || change.readable) {
         tempFilteredPermissions.push(newPermission);
      }
      tempTrackChanges[profile.fileName].fieldPermissions = tempFilteredPermissions;
   } else if (tempTrackChanges[profile.fileName]) {
      tempTrackChanges[profile.fileName].fieldPermissions = [];
      tempTrackChanges[profile.fileName].fieldPermissions.push(newPermission);
   } else {
      tempTrackChanges[profile.fileName] = {};
      tempTrackChanges[profile.fileName].fieldPermissions = [];
      tempTrackChanges[profile.fileName].fieldPermissions.push(newPermission);
   }
   return tempTrackChanges;
};
const getOldPermission = (profile: any, fieldName: string) => {
   if (profile.metadata?.fieldPermissions) {
      let permissions = [];
      if (profile.metadata?.fieldPermissions[0]) {
         permissions = profile.metadata?.fieldPermissions.filter((perm: any) => {
            return perm.field === fieldName;
         });
      } else {
         permissions = profile.metadata?.fieldPermissions.field === fieldName ? [profile.metadata?.fieldPermissions] : [];
      }
      return permissions[0] ? permissions[0] : { editable: false, field: fieldName, readable: false };
   }
   return { editable: false, field: fieldName, readable: false };
};
export const hasChange = (profile: any, newPermission: any) => {
   let oldPermission = getOldPermission(profile, newPermission.field);
   if (oldPermission) {
      return {
         editable: oldPermission.editable !== newPermission.editable,
         readable: oldPermission.readable !== newPermission.readable,
      };
   }
   return { editable: false, readable: false };
};
