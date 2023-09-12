export const handleLoad = (permissions: any) => {
  let tempKey: string[] = [];
  if (permissions?.A) {
    tempKey = Object.keys(permissions.A);
  }
  if (permissions.B) {
    tempKey = [...tempKey, ...Object.keys(permissions.B)];
  }
  let tempSet = new Set(tempKey);
  tempKey = Array.from(tempSet.values()).sort((a, b) => {
    return a > b ? 1 : -1;
  });
  return tempKey;
};
export const handleComparision = (permissions: any, k: string) => {
  if (
    permissions?.A[k] !== undefined &&
    permissions?.B[k] !== undefined &&
    permissions?.A[k].allowCreate === permissions?.B[k].allowCreate &&
    permissions?.A[k].allowRead === permissions?.B[k].allowRead &&
    permissions?.A[k].allowEdit === permissions?.B[k].allowEdit &&
    permissions?.A[k].allowDelete === permissions?.B[k].allowDelete &&
    permissions?.A[k].viewAllRecords === permissions?.B[k].viewAllRecords &&
    permissions?.A[k].modifyAllRecords === permissions?.B[k].modifyAllRecords
  ) {
    return true;
  }
  return false;
};
export const setChangeObjectPermissions = (
  permissions: any,
  option: string,
  objectName: string,
  permissionName: string,
  value: boolean
) => {
  let tempPermissions = JSON.parse(JSON.stringify(permissions));
  if (tempPermissions[option] && tempPermissions[option][objectName]) {
    tempPermissions[option][objectName][permissionName] = value.toString();
  } else {
    tempPermissions[option][objectName] = {
      object: objectName,
      allowCreate: "false",
      allowDelete: "false",
      allowEdit: "false",
      allowRead: "false",
      modifyAllRecords: "false",
      viewAllRecords: "false",
    };
    tempPermissions[option][objectName][permissionName] = value;
  }
  return tempPermissions;
};
