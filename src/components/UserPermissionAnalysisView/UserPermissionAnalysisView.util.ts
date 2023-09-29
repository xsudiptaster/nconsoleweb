import { handleApi, sendMessage } from "../../utils/utils";

export const handleLoad = async () => {
   let userQuery =
      "SELECT Id , Username , Profile.Name , ProfileId ,Name, (SELECT Id,PermissionSetId,PermissionSetGroupId FROM PermissionSetAssignments) FROM User where IsActive =true And ProfileId!=''";
   let response = await handleApi("query", { query: userQuery });
   console.log("🚀 ~ file: UserPermissionAnalysisView.util.ts:7 ~ handleLoad ~ response:", response);
   let options = response.records
      .sort((a: any, b: any) => {
         return a.Name > b.Name ? 1 : -1;
      })
      .map((user: any) => {
         return { ...user, label: user.Name, value: user.Id };
      });
   return options;
};
export const handleUserSelection = async (user: any) => {
   let profileQuery = "Select id,Name,FullName   from Profile where id='" + user.ProfileId + "'";
   let response = await handleApi("toolingQuery", { query: profileQuery });
   let profileResponse = await handleApi("metadataRead", { objectName: "Profile", types: [response.records[0].FullName] });
   let permissionMap: any = {};
   let profileMap: any = {};
   profileMap[user.ProfileId] = {
      type: "Profile",
      name: response.records[0].Name,
   };
   permissionMap[user.ProfileId] = {
      fieldPermissionMap: getFieldPermissionsMap(profileResponse),
      objectPermissionMap: getObjectPermissionMap(profileResponse),
      userPermissionMap: getUserPermissionMap(profileResponse),
      apexPagePermissionMap: getApexPagePermissionMap(profileResponse),
      apexClassPermissionMap: getApexClassPermissionMap(profileResponse),
      recordTypePermissionMap: getRecordTypePermissionsMap(profileResponse),
   };
   console.log("🚀 ~ file: UserPermissionAnalysisView.util.ts:53 ~ handleUserSelection ~ permissionMap:PROFILE", permissionMap);
   if (user.PermissionSetAssignments.records) {
      for (let i = 0; i < user.PermissionSetAssignments.records.length; i++) {
         let record = user.PermissionSetAssignments.records[i];
         if (record.PermissionSetId !== null) {
            let permissionSetQuery = "select id,Name from PermissionSet where id='" + record.PermissionSetId + "'";
            let permissionSetResponse = await handleApi("toolingQuery", { query: permissionSetQuery });
            profileMap[record.PermissionSetId] = {
               type: "Permission Set",
               name: permissionSetResponse.records[0].Name,
            };
            let permissionSetMetadata = await handleApi("metadataRead", {
               objectName: "PermissionSet",
               types: [permissionSetResponse.records[0].Name],
            });
            permissionMap[record.PermissionSetId] = {
               fieldPermissionMap: getFieldPermissionsMap(permissionSetMetadata),
               objectPermissionMap: getObjectPermissionMap(permissionSetMetadata),
               userPermissionMap: getUserPermissionMap(permissionSetMetadata),
               apexPagePermissionMap: getApexPagePermissionMap(permissionSetMetadata),
               apexClassPermissionMap: getApexClassPermissionMap(permissionSetMetadata),
               recordTypePermissionMap: getRecordTypePermissionsMap(permissionSetMetadata),
            };
         }
         sendMessage({ current: i, total: user.PermissionSetAssignments.records.length });
      }
   }
   let fieldPermissionList = {};
   let objectPermissionList: string[] = [];
   let userPermissionList: string[] = [];
   let apexPagePermissionList: string[] = [];
   let apexClassPermissionList: string[] = [];
   let recordTypePermissionList = {};
   for (let key in permissionMap) {
      fieldPermissionList = getFieldPermissionList(permissionMap[key].fieldPermissionMap, fieldPermissionList);
      objectPermissionList = getObjectPermissionList(permissionMap[key].fieldPermissionMap, objectPermissionList);
      userPermissionList = getUserPermissionList(permissionMap[key].userPermissionMap, userPermissionList);
      apexPagePermissionList = getApexPagePermissionList(permissionMap[key].apexPagePermissionMap, apexPagePermissionList);
      apexClassPermissionList = getApexClassPermissionList(permissionMap[key].apexClassPermissionMap, apexClassPermissionList);
      recordTypePermissionList = getRecordTypePermissionList(
         permissionMap[key].recordTypePermissionMap,
         recordTypePermissionList
      );
   }
   let permissionList = {
      fieldPermissionList,
      objectPermissionList,
      userPermissionList,
      apexPagePermissionList,
      apexClassPermissionList,
      recordTypePermissionList,
   };
   let result = {
      permissionMap,
      profileMap,
      permissionList,
   };
   return result;
};
const getFieldPermissionsMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.fieldPermissions && profile?.fieldPermissions[0]) {
      for (let i = 0; i < profile.fieldPermissions.length; i++) {
         let permission = profile.fieldPermissions[i];
         let object = permission.field.split(".")[0];
         let field = permission.field;
         if (permissionMap[object]) {
            permissionMap[object][field] = permission;
         } else {
            permissionMap[object] = {};
            permissionMap[object][field] = permission;
         }
      }
   } else if (profile?.fieldPermissions) {
      let permission = profile.fieldPermissions;
      let object = permission.field.split(".")[0];
      let field = permission.field;
      permissionMap[object] = {};
      permissionMap[object][field] = permission;
   }
   return permissionMap;
};
const getFieldPermissionList = (fieldPermissonMap: any, fieldPermissionList: any) => {
   for (let key in fieldPermissonMap) {
      if (fieldPermissionList[key]) {
         fieldPermissionList[key] = [...Object.keys(fieldPermissonMap[key]), ...fieldPermissionList[key]];
      } else {
         fieldPermissionList[key] = Object.keys(fieldPermissonMap[key]);
      }
      fieldPermissionList[key] = Array.from(new Set(fieldPermissionList[key]));
   }
   return fieldPermissionList;
};
const getObjectPermissionMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.objectPermissions && profile?.objectPermissions[0]) {
      for (let i = 0; i < profile.objectPermissions.length; i++) {
         let permission = profile.objectPermissions[i];
         permissionMap[permission.object] = permission;
      }
   } else if (profile?.objectPermissions) {
      permissionMap[profile.objectPermissions.object] = profile.objectPermissions;
   }
   return permissionMap;
};
const getObjectPermissionList = (objectPermissionMap: any, objectPermissionList: string[]) => {
   objectPermissionList = [...Object.keys(objectPermissionMap), ...objectPermissionList];
   objectPermissionList = Array.from(new Set(objectPermissionList));
   return objectPermissionList;
};
const getUserPermissionMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.userPermissions && profile?.userPermissions[0]) {
      for (let i = 0; i < profile.userPermissions.length; i++) {
         let permission = profile.userPermissions[i];
         permissionMap[permission.name] = permission;
      }
   } else if (profile?.userPermissions) {
      permissionMap[profile.userPermissions.name] = profile.userPermissions;
   }
   return permissionMap;
};
const getUserPermissionList = (userPermissionMap: any, userPermissionList: string[]) => {
   userPermissionList = [...Object.keys(userPermissionMap), ...userPermissionList];
   userPermissionList = Array.from(new Set(userPermissionList));
   return userPermissionList;
};
const getApexPagePermissionMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.pageAccesses && profile?.pageAccesses[0]) {
      for (let i = 0; i < profile.pageAccesses.length; i++) {
         let permission = profile.pageAccesses[i];
         permissionMap[permission.apexPage] = permission;
      }
   } else if (profile?.pageAccesses) {
      permissionMap[profile.pageAccesses.apexPage] = profile.pageAccesses;
   }
   return permissionMap;
};
const getApexPagePermissionList = (apexPagePermissionMap: any, apexPagePermissionList: string[]) => {
   apexPagePermissionList = [...Object.keys(apexPagePermissionMap), ...apexPagePermissionList];
   apexPagePermissionList = Array.from(new Set(apexPagePermissionList));
   return apexPagePermissionList;
};
const getApexClassPermissionMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.classAccesses && profile?.classAccesses[0]) {
      for (let i = 0; i < profile.classAccesses.length; i++) {
         let permission = profile.classAccesses[i];
         permissionMap[permission.apexClass] = permission;
      }
   } else if (profile?.classAccesses) {
      permissionMap[profile.classAccesses.apexClass] = profile.classAccesses;
   }
   return permissionMap;
};
const getApexClassPermissionList = (apexClassPermissionMap: any, apexClassPermissionList: string[]) => {
   apexClassPermissionList = [...Object.keys(apexClassPermissionMap), ...apexClassPermissionList];
   apexClassPermissionList = Array.from(new Set(apexClassPermissionList));
   return apexClassPermissionList;
};
const getRecordTypePermissionsMap = (profile: any) => {
   let permissionMap: any = {};
   if (profile?.recordTypeVisibilities && profile?.recordTypeVisibilities[0]) {
      for (let i = 0; i < profile.recordTypeVisibilities.length; i++) {
         let permission = profile.recordTypeVisibilities[i];
         let object = permission.recordType.split(".")[0];
         let recordType = permission.recordType;
         if (permissionMap[object]) {
            permissionMap[object][recordType] = permission;
         } else {
            permissionMap[object] = {};
            permissionMap[object][recordType] = permission;
         }
      }
   } else if (profile?.recordTypeVisibilities) {
      let permission = profile.recordTypeVisibilities;
      let object = permission.recordType.split(".")[0];
      let recordType = permission.recordType;
      permissionMap[object] = {};
      permissionMap[object][recordType] = permission;
   }
   console.log("🚀 ~ file: UserPermissionAnalysisView.util.ts:221 ~ getRecordTypePermissionsMap ~ permissionMap:", permissionMap);
   return permissionMap;
};
const getRecordTypePermissionList = (recordTypePermissionMap: any, recordTypePermissionList: any) => {
   for (let key in recordTypePermissionMap) {
      if (recordTypePermissionList[key]) {
         recordTypePermissionList[key] = [...Object.keys(recordTypePermissionMap[key]), ...recordTypePermissionList[key]];
      } else {
         recordTypePermissionList[key] = Object.keys(recordTypePermissionMap[key]);
      }
      recordTypePermissionList[key] = Array.from(new Set(recordTypePermissionList[key]));
   }
   return recordTypePermissionList;
};
