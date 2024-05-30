export const getCurrentObjectPermission = (p: any, objectName: string, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].objectPermissions) {
    let foundPermission = changes[p.fileName].objectPermissions.find((perm: any) => {
      return perm.object === objectName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.objectPermissions) {
    let currentPermission = p.objectPermissions.find((perm: any) => {
      return perm.object === objectName;
    });
    if (currentPermission) {
      return currentPermission;
    }
  }
  return {
    allowRead: false,
    allowCreate: false,
    allowEdit: false,
    allowDelete: false,
    viewAllRecords: false,
    modifyAllRecords: false,
    object: objectName,
  };
};
export const hasObjectChanges = (p: any, currentPermission: any) => {
  if (p?.fieldPermissions) {
    let foundPermission = p.objectPermissions.find((perm: any) => {
      return perm.object === currentPermission.object;
    });
    if (foundPermission) {
      return {
        allowRead: foundPermission.allowRead !== currentPermission.allowRead,
        allowCreate: foundPermission.allowCreate !== currentPermission.allowCreate,
        allowEdit: foundPermission.allowEdit !== currentPermission.allowEdit,
        allowDelete: foundPermission.allowDelete !== currentPermission.allowDelete,
        viewAllRecords: foundPermission.viewAllRecords !== currentPermission.viewAllRecords,
        modifyAllRecords: foundPermission.modifyAllRecords !== currentPermission.modifyAllRecords,
      };
    }
  }
  return currentPermission;
};
export const getRecordTypePermission = (p: any, object: any, recordType: any, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].recordTypeVisibilities) {
    let foundPermission = changes[p.fileName].recordTypeVisibilities.find((oPerm: any) => {
      return oPerm.recordType === object.name + '.' + recordType.developerName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.recordTypeVisibilities && Array.isArray(p.recordTypeVisibilities)) {
    let savedPermission = p.recordTypeVisibilities.find((oPerm: any) => {
      return oPerm.recordType === object.name + '.' + recordType.developerName;
    });
    if (savedPermission) {
      return savedPermission;
    }
  } else if (
    p.recordTypeVisibilities &&
    p.recordTypeVisibilities.recordType === object.name + '.' + recordType.developerName
  ) {
    return p.recordTypeVisibilities;
  }
  return { default: false, visible: false, recordType: object.name + '.' + recordType.developerName };
};
export const hasRecordTypeChanges = (p: any, currentPermission: any) => {
  if (p?.recordTypeVisibilities && Array.isArray(p?.recordTypeVisibilities)) {
    let foundPermission = p.recordTypeVisibilities.find((perm: any) => {
      return perm.recordType === currentPermission.recordType;
    });
    if (foundPermission) {
      return {
        visible: foundPermission.visible !== currentPermission.visible,
        default: foundPermission.default !== currentPermission.default,
      };
    }
  }
  return currentPermission;
};
