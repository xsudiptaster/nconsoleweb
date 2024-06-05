import { handleApi } from '../../../utils/utils';

export const getAllTabsList = async () => {
  let response = await handleApi('toolingQuery', { query: 'SELECT id,Name,Label from TabDefinition' });
  if (response.records) {
    return response.records.sort((a: any, b: any) => {
      return a.Label > b.Label ? 1 : -1;
    });
  }
  return [];
};
export const getTabPermissions = (p: any, tabName: string, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].tabVisibilities) {
    let foundPermission = changes[p.fileName].tabVisibilities.find((perm: any) => {
      return perm.tab === tabName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.tabVisibilities) {
    let savedPermission = p.tabVisibilities.find((perm: any) => {
      return perm.tab === tabName;
    });
    if (savedPermission) {
      return savedPermission;
    }
  }
  return { tab: tabName, visibility: 'Hidden' };
};
export const hasTabPermissionChanges = (p: any, permission: any) => {
  if (p.tabVisibilities) {
    let foundPermission = p.tabVisibilities.find((perm: any) => {
      return perm.tab === permission.tab;
    });
    if (foundPermission) {
      return { visibility: foundPermission.visibility !== permission.visibility };
    }
  }
  return permission;
};
