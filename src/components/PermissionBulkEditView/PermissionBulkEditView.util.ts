import { handleApi } from '../../utils/utils';
export const handleGetProfilesAndPermissionSets = async () => {
  var types = [
    { type: 'Profile', folder: null },
    { type: 'PermissionSet', folder: null },
  ];
  let response = await handleApi('metadataList', { types: types });
  let profiles = response
    .filter((profile: any) => {
      return profile.type === 'Profile';
    })
    .sort((a: any, b: any) => {
      return a.fullName > b.fullName ? 1 : -1;
    })
    .map((profile: any) => {
      return { label: profile.fullName, value: profile.fullName, ...profile };
    });
  let permissionSets = response
    .filter((permissionSet: any) => {
      return permissionSet.type === 'PermissionSet';
    })
    .sort((a: any, b: any) => {
      return a.fullName > b.fullName ? 1 : -1;
    })
    .map((permissionSet: any) => {
      return { label: permissionSet.fullName, value: permissionSet.fullName, ...permissionSet };
    });
  return { profiles, permissionSets };
};
const cleanPermission = (p: any) => {
  if (typeof p === 'string') {
    return p === 'true';
  }
  return p;
};
const cleanUpProfilesOrPermissionSets = (p: any) => {
  if (p.classAccesses && !Array.isArray(p.classAccesses)) {
    p.classAccesses = [p.classAccesses];
  }
  if (p.fieldPermissions && !Array.isArray(p.fieldPermissions)) {
    p.fieldPermissions = [p.fieldPermissions];
  }
  if (p.flowAccesses && !Array.isArray(p.flowAccesses)) {
    p.flowAccesses = [p.flowAccesses];
  }
  if (p.objectPermissions && !Array.isArray(p.objectPermissions)) {
    p.objectPermissions = [p.objectPermissions];
  }
  if (p.pageAccesses && !Array.isArray(p.pageAccesses)) {
    p.pageAccesses = [p.pageAccesses];
  }
  if (p.recordTypeVisibilities && !Array.isArray(p.recordTypeVisibilities)) {
    p.recordTypeVisibilities = [p.recordTypeVisibilities];
  }
  if (p.tabVisibilities && !Array.isArray(p.tabVisibilities)) {
    p.tabVisibilities = [p.tabVisibilities];
  }
  if (p.userPermissions && !Array.isArray(p.userPermissions)) {
    p.userPermissions = [p.userPermissions];
  }
  if (p.classAccesses) {
    p.classAccesses = p.classAccesses.map((perm: any) => {
      return {
        apexClass: perm.apexClass,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.fieldPermissions) {
    p.fieldPermissions = p.fieldPermissions.map((perm: any) => {
      console.log('THE PERMISSION TYPE', typeof perm.editable);
      return {
        field: perm.field,
        editable: cleanPermission(perm.editable),
        readable: cleanPermission(perm.readable),
      };
    });
  }
  if (p.objectPermissions) {
    p.objectPermissions = p.objectPermissions.map((perm: any) => {
      return {
        object: perm.object,
        allowCreate: cleanPermission(perm.allowCreate),
        allowDelete: cleanPermission(perm.allowDelete),
        allowEdit: cleanPermission(perm.allowEdit),
        allowRead: cleanPermission(perm.allowRead),
        modifyAllRecords: cleanPermission(perm.modifyAllRecords),
        viewAllRecords: cleanPermission(perm.viewAllRecords),
      };
    });
  }
  if (p.flowAccesses) {
    p.flowAccesses = p.flowAccesses.map((perm: any) => {
      return {
        flow: perm.flow,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.pageAccesses) {
    p.pageAccesses = p.pageAccesses.map((perm: any) => {
      return {
        apexPage: perm.apexPage,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.recordTypeVisibilities) {
    p.recordTypeVisibilities = p.recordTypeVisibilities.map((perm: any) => {
      return {
        recordType: perm.recordType,
        default: cleanPermission(perm.default),
        visible: cleanPermission(perm.visible),
      };
    });
  }
  if (p.tabVisibilities) {
    p.tabVisibilities = p.tabVisibilities.map((perm: any) => {
      return {
        tab: perm.tab,
        visibility: cleanPermission(perm.visibility),
      };
    });
  }
  if (p.userPermissions) {
    p.userPermissions = p.userPermissions.map((perm: any) => {
      return {
        name: perm.name,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  return p;
};
const getUserPermissions = (pList: any[]) => {
  let userPermissions: any[] = [];
  pList.forEach((p: any) => {
    if (p && p.userPermissions && p.userPermissions.length > 0) {
      userPermissions = [...userPermissions, ...p.userPermissions];
    }
  });
  return userPermissions;
};
export const handleGetPermissions = async (profiles: any[], permissionSets: any[]) => {
  let responseProfiles =
    profiles.length > 0 ? await handleApi('metadataRead', { objectName: 'Profile', types: profiles }) : [];
  let responsePermissionSets =
    permissionSets.length > 0
      ? await handleApi('metadataRead', { objectName: 'PermissionSet', types: permissionSets })
      : [];

  if (!Array.isArray(responseProfiles)) {
    responseProfiles = [responseProfiles];
  }
  if (!Array.isArray(responsePermissionSets)) {
    responsePermissionSets = [responsePermissionSets];
  }
  responseProfiles = responseProfiles.map((p: any) => {
    return cleanUpProfilesOrPermissionSets({ ...JSON.parse(JSON.stringify(p)), fileName: 'profile/' + p.fullName });
  });
  responsePermissionSets = responsePermissionSets.map((p: any) => {
    return cleanUpProfilesOrPermissionSets({
      ...JSON.parse(JSON.stringify(p)),
      fileName: 'permissionSet/' + p.fullName,
    });
  });
  let userPermissions = [...getUserPermissions(responseProfiles), ...getUserPermissions(responsePermissionSets)];
  return { responseProfiles, responsePermissionSets, userPermissions };
};
export const updateChanges = (p: any, permissionType: string, permission: any, compareTag: string, oldChanges: any) => {
  let changes = JSON.parse(JSON.stringify(oldChanges));
  if (changes && changes[p.fileName]) {
    if (changes[p.fileName][permissionType]) {
      let permissions = changes[p.fileName][permissionType].filter((perm: any) => {
        return perm[compareTag] !== permission[compareTag];
      });
      permissions.push(permission);
      changes[p.fileName][permissionType] = permissions;
    } else {
      changes[p.fileName][permissionType] = [];
      changes[p.fileName][permissionType].push(permission);
    }
  } else {
    changes[p.fileName] = {};
    changes[p.fileName].fullName = p.fullName;
    if (p.label) {
      changes[p.fileName].label = p.label;
    }
    changes[p.fileName][permissionType] = [];
    changes[p.fileName][permissionType].push(permission);
  }
  return changes;
};
