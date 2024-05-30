export const getCurrentFieldPermission = (field: any, objectName: string, p: any, changes: any) => {
   if (changes[p.fileName] && changes[p.fileName].fieldPermissions) {
      let currentPermission = changes[p.fileName].fieldPermissions.find((perm: any) => {
         return perm.field === objectName + "." + field.name;
      });
      if (currentPermission) {
         return currentPermission;
      }
   }
   if (p.fieldPermissions) {
      let currentPermission = p.fieldPermissions.find((perm: any) => {
         return perm.field === objectName + "." + field.name;
      });
      if (currentPermission) {
         return currentPermission;
      }
   }
   return { editable: false, readable: false, field: `${objectName}.${field.name}` };
};
export const hasFieldChanges = (p: any, currentPermission: any) => {
   if (p.fieldPermissions) {
      let foundPermission = p.fieldPermissions.find((perm: any) => {
         return perm.field === currentPermission.field;
      });
      if (foundPermission) {
         return {
            editable: foundPermission.editable !== currentPermission.editable,
            readable: foundPermission.readable !== currentPermission.readable,
         };
      }
   }
   return currentPermission;
};
