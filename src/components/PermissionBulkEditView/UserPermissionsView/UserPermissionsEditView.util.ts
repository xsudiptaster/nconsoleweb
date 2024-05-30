export const getUserPermission = (p: any, permissionName: string, changes: any) => {
  if (changes[p.fileName] && changes[p.fileName].userPermissions) {
    let foundPermission = changes[p.fileName].userPermissions.find((perm: any) => {
      return perm.name === permissionName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.userPermissions) {
    let savedPermission = p.userPermissions.find((perm: any) => {
      return perm.name === permissionName;
    });
    if (savedPermission) {
      return savedPermission;
    }
  }
  return { name: permissionName, enabled: false };
};
export const hasChangesUserPermission = (p: any, permission: any) => {
  if (p.userPermissions) {
    let foundPermission = p.userPermissions.find((perm: any) => {
      return perm.name === permission.name;
    });
    if (foundPermission) {
      return { enabled: foundPermission.enabled !== permission.enabled };
    }
  }
  return permission;
};
