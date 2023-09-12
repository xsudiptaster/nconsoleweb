export const handleLoad = (permissions: any) => {
  let tempParentKeys: string[] = [];
  let tempKey: any[] = [];
  if (permissions?.A) {
    tempParentKeys = Object.keys(permissions.A);
  }
  if (permissions.B) {
    tempParentKeys = [...tempParentKeys, ...Object.keys(permissions.B)];
  }
  let tempSet = new Set(tempParentKeys);
  tempParentKeys = Array.from(tempSet.values()).sort((a, b) => {
    return a > b ? 1 : -1;
  });
  tempParentKeys.forEach((objectName) => {
    let obj: any = {};
    obj.objectName = objectName;
    obj.fields = [];
    if (permissions?.A[objectName]) {
      obj.fields = [...obj.fields, ...Object.keys(permissions?.A[objectName])];
    }
    if (permissions?.B[objectName]) {
      obj.fields = [...obj.fields, ...Object.keys(permissions?.B[objectName])];
    }
    obj.fields = Array.from(new Set(obj.fields)).sort((a: any, b: any) => {
      return a > b ? 1 : -1;
    });
    tempKey.push(obj);
  });
  return tempKey;
};
export const handlePageLayoutComparision = (
  permissions: any,
  objectName: string,
  recordType: string
) => {
  if (
    permissions.A[objectName] &&
    permissions.B[objectName] &&
    permissions.A[objectName][recordType] &&
    permissions.B[objectName][recordType] &&
    permissions.A[objectName][recordType].layout ===
      permissions.B[objectName][recordType].layout
  ) {
    return true;
  }
  return false;
};
