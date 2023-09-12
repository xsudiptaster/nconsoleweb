export const handleLoad = (permissions: any) => {
  let tempKey: string[] = [];
  if (permissions?.A) {
    tempKey = [...tempKey, ...Object.keys(permissions?.A)];
  }
  if (permissions?.B) {
    tempKey = [...tempKey, ...Object.keys(permissions?.B)];
  }
  tempKey = Array.from(new Set(tempKey)).sort((a: any, b: any) => {
    return a > b ? 1 : -1;
  });
  return tempKey;
};
export const handleComparision = (permissions: any, permissionName: string) => {
  if (permissions?.A && permissions?.B && permissions?.A[permissionName]?.enabled === permissions?.B[permissionName]?.enabled) {
    return true;
  }
  return false;
};
export const setChangeFlowPermissions = (permissions: any, option: string, permissionName: string, value: boolean) => {
  let tempPermissions = JSON.parse(JSON.stringify(permissions));
  if (tempPermissions[option] && tempPermissions[option][permissionName]) {
    tempPermissions[option][permissionName].enabled = value.toString();
  } else {
    tempPermissions[option][permissionName] = {
      name: permissionName,
      enabled: "false",
    };
    tempPermissions[option][permissionName].enabled = value.toString();
  }
  return tempPermissions;
};
