import { handleApi } from '../../../utils/utils';

export const handleGetApexPage = async () => {
  const response = await handleApi('toolingQuery', { query: 'SELECT id,Name,ManageableState from ApexPage ' });
  if (response.records) {
    return response.records
      .filter((apexPage: any) => {
        return apexPage !== 'installed';
      })
      .sort((a: any, b: any) => {
        return a.Name > b.Name ? 1 : -1;
      });
  }
  return [];
};
export const getApexPagePermission = (apexPageName: string, p: any, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].pageAccesses) {
    let foundPermission = changes[p.fileName].pageAccesses.find((perm: any) => {
      return perm.apexPage === apexPageName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.pageAccesses) {
    let changedPermission = p.pageAccesses.find((perm: any) => {
      return perm.apexPage === apexPageName;
    });
    if (changedPermission) {
      return changedPermission;
    }
  }
  return { apexPage: apexPageName, enabled: false };
};
export const hasApexPagePermissionChange = (p: any, permission: any) => {
  if (p.pageAccesses) {
    let foundPermission = p.pageAccesses.find((perm: any) => {
      return perm.apexPage === permission.apexPage;
    });
    if (foundPermission) {
      return { enabled: foundPermission.enabled !== permission.enabled };
    }
  }
  return permission;
};
