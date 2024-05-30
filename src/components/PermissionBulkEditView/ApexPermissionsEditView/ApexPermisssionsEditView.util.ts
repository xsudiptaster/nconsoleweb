import { handleApi } from '../../../utils/utils';

export const getAllApexClasses = async () => {
  let response = await handleApi('toolingQuery', { query: 'SELECT id,Name,ManageableState from ApexClass ' });
  if (response.records) {
    return response.records
      .filter((apexClass: any) => {
        return apexClass.ManageableState !== 'installed';
      })
      .sort((a: any, b: any) => {
        return a.Name.toUpperCase() > b.Name.toUpperCase() ? 1 : -1;
      });
  }
  return [];
};
export const getApexClassPermission = (apexClassName: string, p: any, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].classAccesses) {
    let foundPermission = changes[p.fileName].classAccesses.find((perm: any) => {
      return perm.apexClass === apexClassName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.classAccesses) {
    let savedPermission = p.classAccesses.find((perm: any) => {
      return perm.apexClass === apexClassName;
    });
    if (savedPermission) {
      return savedPermission;
    }
  }
  return { apexClass: apexClassName, enabled: false };
};
export const hasApexClassChanges = (p: any, permission: any) => {
  if (p.classAccesses) {
    let foundPermission = p.classAccesses.find((perm: any) => {
      return perm.apexClass === permission.apexClass;
    });
    if (foundPermission) {
      return {
        enabled: foundPermission.enabled !== permission.enabled,
      };
    }
  }
  return permission;
};
