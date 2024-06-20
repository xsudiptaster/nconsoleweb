import { handleApiSecond, sendMessage } from '../../../utils/utils';

const concatPermissions = (array1: any[], array2: any[], compareTag: string) => {
  if (array1 && array2) {
    const mergedArray = array1.reduce((accumulator, item2) => {
      if (!accumulator.some((item1: any) => item1[compareTag] === item2[compareTag])) {
        accumulator.push(item2);
      }
      return accumulator;
    }, array2);
    return mergedArray;
  }
  if (array2) {
    return array2;
  }
  return [];
};

const cleanPermissions = (p: any, oldP: any) => {
  //  p.classAccesses = concatPermissions(p.classAccesses, oldP.classAccesses, 'apexClass');
  //  p.fieldPermissions = concatPermissions(p.fieldPermissions, oldP.fieldPermissions, 'field');
  //  p.flowAccesses = concatPermissions(p.flowAccesses, oldP.flowAccesses, 'flow');
  //  p.objectPermissions = concatPermissions(p.objectPermissions, oldP.objectPermissions, 'object');
  //  p.recordTypeVisibilities = concatPermissions(p.recordTypeVisibilities, oldP.recordTypeVisibilities, 'recordType');
  //  p.tabVisibilities = concatPermissions(p.tabVisibilities, oldP.tabVisibilities, 'tab');
  p.userPermissions = concatPermissions(p.userPermissions, oldP.userPermissions, 'name');
  return p;
};
const makeUpdate = async (pList: any[], trackChanges: any, currentLoginInfo: any, type: string, total: number) => {
  let results: any[] = [];
  for (let i = 0; i < pList.length; i++) {
    if (trackChanges[pList[i].fileName]) {
      let p = JSON.parse(JSON.stringify(trackChanges[pList[i].fileName]));
      p = cleanPermissions(p, pList[i]);
      delete p.fileName;
      if (p.type === 'permissionSet') {
        p.tabSettings = p.tabVisibilities;
        delete p.tabVisibilities;
      }
      delete p.type;
      console.log('🚀 ~ makeUpdate ~ p:', p);
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
