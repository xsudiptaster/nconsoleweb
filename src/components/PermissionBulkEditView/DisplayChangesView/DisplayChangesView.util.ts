import { handleApiSecond, sendMessage } from '../../../utils/utils';
const makeUpdate = async (pList: any[], trackChanges: any, currentLoginInfo: any, type: string, total: number) => {
  let results: any[] = [];
  for (let i = 0; i < pList.length; i++) {
    if (trackChanges[pList[i].fileName]) {
      let p = trackChanges[pList[i].fileName];
      delete p.fileName;
      let result = await handleApiSecond('metadataUpsert', currentLoginInfo, {
        metadataType: type,
        records: [p],
      });

      results.push(result);
      sendMessage({ current: i, total });
    }
  }

  return results;
};
export const deployChanges = async (
  profilePermissions: any[],
  permissionSetPermissions: any[],
  trackChanges: any,
  currentLoginInfo: any
) => {
  let total = profilePermissions.length + permissionSetPermissions.length;
  let profileResults = makeUpdate(profilePermissions, trackChanges, currentLoginInfo, 'Profile', total);
  let permissionResults = makeUpdate(permissionSetPermissions, trackChanges, currentLoginInfo, 'PermissionSet', total);
  return { success: true, message: JSON.stringify(profileResults) + JSON.stringify(permissionResults) };
};
