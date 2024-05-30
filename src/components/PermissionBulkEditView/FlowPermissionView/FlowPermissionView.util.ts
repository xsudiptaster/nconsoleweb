import { handleApi } from '../../../utils/utils';

export const getFlowNames = async () => {
  const response = await handleApi('toolingQuery', {
    query: 'SELECT id,DeveloperName,ManageableState from FlowDefinition  ',
  });
  if (response.records) {
    return response.records
      .filter((flow: any) => {
        return flow.ManageableState !== 'installed';
      })
      .sort((a: any, b: any) => {
        return a.DeveloperName > b.DeveloperName ? 1 : -1;
      });
  }
  return [];
};
export const getFlowPermission = (flowName: string, p: any, changes: any) => {
  if (changes && changes[p.fileName] && changes[p.fileName].flowAccesses) {
    let foundPermission = changes[p.fileName].flowAccesses.find((perm: any) => {
      return perm.flow === flowName;
    });
    if (foundPermission) {
      return foundPermission;
    }
  }
  if (p.flowAccesses) {
    let savedPermission = p.flowAccesses.find((perm: any) => {
      return perm.flow === flowName;
    });
    if (savedPermission) {
      return savedPermission;
    }
  }
  return { flow: flowName, enabled: false };
};
export const hasAnyFlowPermissionChanges = (p: any, currentPermission: any) => {
  if (p.flowAccesses) {
    let foundPermission = p.flowAccesses.map((perm: any) => {
      return perm.flow === currentPermission.flow;
    });
    if (foundPermission) {
      return { enabled: foundPermission.enabled !== currentPermission.enabled };
    }
  }
  return currentPermission;
};
