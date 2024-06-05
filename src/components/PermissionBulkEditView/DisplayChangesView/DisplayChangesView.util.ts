import { handleApiSecond, sendMessage } from '../../../utils/utils';
const makeUpdate = async (pList: any[], trackChanges: any, currentLoginInfo: any, type: string, total: number) => {
  let results: any[] = [];
  for (let i = 0; i < pList.length; i++) {
    if (trackChanges[pList[i].fileName]) {
      let p = trackChanges[pList[i].fileName];
      console.log('🚀 ~ makeUpdate ~ p:', p);
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
  if (profilePermissions.length > 0) {
    await makeUpdate(profilePermissions, trackChanges, currentLoginInfo, 'Profile', total);
  }
  if (permissionSetPermissions.length > 0) {
    await makeUpdate(permissionSetPermissions, trackChanges, currentLoginInfo, 'PermissionSet', total);
  }

  return { success: true, message: 'Saved Successfully !!' };
};
