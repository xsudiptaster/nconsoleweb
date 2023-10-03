import { getChunks, handleApi } from "../../utils/utils";
export const handleLoad = async () => {
   var types = [
      { type: "Profile", folder: null },
      { type: "PermissionSet", folder: null },
   ];
   let response = await handleApi("metadataList", { types: types });

   let listProfiles = response.filter((profile: any) => {
      return profile.type === "Profile";
   });
   let listPermissionSets = response.filter((permissionSet: any) => {
      return permissionSet.type === "PermissionSet";
   });
   return { listProfiles, listPermissionSets };
};
const getAllMetadata = async (fullList: any[], type: string) => {
   let profileMetadatas: any[] = [];
   let mapProfile = fullList.reduce((oMap, current) => {
      oMap[current.fullName] = current;
      return oMap;
   }, {});
   let chunkedProfiles = getChunks(fullList, 10);
   let promisses = [];
   for (let i = 0; i < chunkedProfiles.length; i++) {
      promisses.push(
         handleApi("metadataRead", {
            objectName: type,
            types: chunkedProfiles[i].map((profile: any) => {
               return profile.fullName;
            }),
         })
      );
   }
   let results = await Promise.all(promisses);
   for (let i = 0; i < results.length; i++) {
      if (results[i][0]) {
         profileMetadatas = [...profileMetadatas, ...results[i]];
      } else {
         profileMetadatas = [...profileMetadatas, results[i]];
      }
   }
   profileMetadatas = profileMetadatas.map((current) => {
      return { ...current, ...mapProfile[current.fullName] };
   });
   return profileMetadatas;
};

export const handleAnalysis = async (listProfiles: any[], listPermissionSets: any[]) => {
   let promisesList = [];
   let promise1 = getAllMetadata(listProfiles, "Profile");
   let promise2 = getAllMetadata(listPermissionSets, "PermissionSet");
   promisesList.push(promise1);
   promisesList.push(promise2);
   let allResults = await Promise.all(promisesList);
   let profileMetadatas = allResults[0];
   let permissionSetMetadatas = allResults[1];
   let permissionList: any = {};
   permissionList.fieldPermissionList = {};
   permissionList.objectPermissionList = [];
   permissionList.recordTypePermissionList = {};
   permissionList.apexClassPermissionList = [];
   permissionList.apexPagePermissionList = [];
   permissionList.userPermissionList = [];
   for (let i = 0; i < profileMetadatas.length; i++) {
      permissionList.fieldPermissionList = getFieldPermissionList(profileMetadatas[i], permissionList.fieldPermissionList);
      permissionList.objectPermissionList = getObjectPermissionList(profileMetadatas[i], permissionList.objectPermissionList);
      permissionList.recordTypePermissionList = getRecordTypePermissionsList(
         profileMetadatas[i],
         permissionList.recordTypePermissionList
      );
      permissionList.apexClassPermissionList = getApexClassPermissionList(
         profileMetadatas[i],
         permissionList.apexClassPermissionList
      );
      permissionList.apexPagePermissionList = getApexPagePermissionList(
         profileMetadatas[i],
         permissionList.apexPagePermissionList
      );
      permissionList.userPermissionList = getUserPermissionList(profileMetadatas[i], permissionList.userPermissionList);
   }
   for (let i = 0; i < permissionSetMetadatas.length; i++) {
      permissionList.fieldPermissionList = getFieldPermissionList(permissionSetMetadatas[i], permissionList.fieldPermissionList);
      permissionList.objectPermissionList = getObjectPermissionList(
         permissionSetMetadatas[i],
         permissionList.objectPermissionList
      );
      permissionList.recordTypePermissionList = getRecordTypePermissionsList(
         permissionSetMetadatas[i],
         permissionList.recordTypePermissionList
      );
      permissionList.apexClassPermissionList = getApexClassPermissionList(
         permissionSetMetadatas[i],
         permissionList.apexClassPermissionList
      );
      permissionList.apexPagePermissionList = getApexPagePermissionList(
         permissionSetMetadatas[i],
         permissionList.apexPagePermissionList
      );
      permissionList.userPermissionList = getUserPermissionList(permissionSetMetadatas[i], permissionList.userPermissionList);
   }
   let result = {
      permissionList,
      profileMetadatas,
      permissionSetMetadatas,
   };
   return result;
};
const getFieldPermissionList = (profile: any, fieldPermissionList: any) => {
   if (profile.fieldPermissions && profile.fieldPermissions[0]) {
      for (let i = 0; i < profile.fieldPermissions.length; i++) {
         let permission = profile.fieldPermissions[i];
         let object = permission.field.split(".")[0];
         if (fieldPermissionList[object]) {
            fieldPermissionList[object].push(permission.field);
         } else {
            fieldPermissionList[object] = [];
            fieldPermissionList[object].push(permission.field);
         }
      }
   } else if (profile.fieldPermissionList) {
      let permission = profile.fieldPermissions;
      let object = permission.field.split(".")[0];
      if (fieldPermissionList[object]) {
         fieldPermissionList[object].push(permission.field);
      } else {
         fieldPermissionList[object] = [];
         fieldPermissionList[object].push(permission.field);
      }
   }
   for (let object in fieldPermissionList) {
      fieldPermissionList[object] = Array.from(new Set(fieldPermissionList[object]));
   }
   return fieldPermissionList;
};
const getObjectPermissionList = (profile: any, objectPermissionList: any[]) => {
   if (profile.objectPermissions && profile.objectPermissions[0]) {
      for (let i = 0; i < profile.objectPermissions.length; i++) {
         let permission = profile.objectPermissions[i];
         objectPermissionList.push(permission.object);
      }
   } else if (profile?.objectPermissions) {
      let permission = profile.objectPermissions;
      objectPermissionList.push(permission.object);
   }
   return Array.from(new Set(objectPermissionList));
};
const getRecordTypePermissionsList = (profile: any, recordTypePermissionList: any[]) => {
   if (profile.recordTypeVisibilities && profile.recordTypeVisibilities[0]) {
      for (let i = 0; i < profile.recordTypeVisibilities.length; i++) {
         let permission = profile.recordTypeVisibilities[i];
         let object = permission.recordType.split(".")[0];
         if (recordTypePermissionList[object]) {
            recordTypePermissionList[object].push(permission.recordType);
         } else {
            recordTypePermissionList[object] = [];
            recordTypePermissionList[object].push(permission.recordType);
         }
      }
   } else if (profile.recordTypeVisibilities) {
      let permission = profile.recordTypeVisibilities;
      let object = permission.recordType.split(".")[0];
      if (recordTypePermissionList[object]) {
         recordTypePermissionList[object].push(permission.recordType);
      } else {
         recordTypePermissionList[object] = [];
         recordTypePermissionList[object].push(permission.recordType);
      }
   }
   for (let object in recordTypePermissionList) {
      recordTypePermissionList[object] = Array.from(new Set(recordTypePermissionList[object]));
   }
   return recordTypePermissionList;
};
const getApexClassPermissionList = (profile: any, apexClassPermissionList: any[]) => {
   if (profile.classAccesses && profile.classAccesses[0]) {
      for (let i = 0; i < profile.classAccesses.length; i++) {
         let permission = profile.classAccesses[i];
         apexClassPermissionList.push(permission.apexClass);
      }
   } else if (profile?.classAccesses) {
      let permission = profile.classAccesses;
      apexClassPermissionList.push(permission.apexClass);
   }
   return Array.from(new Set(apexClassPermissionList));
};
const getApexPagePermissionList = (profile: any, apexPagePermissionList: any[]) => {
   if (profile.pageAccesses && profile.pageAccesses[0]) {
      for (let i = 0; i < profile.pageAccesses.length; i++) {
         let permission = profile.pageAccesses[i];
         apexPagePermissionList.push(permission.apexPage);
      }
   } else if (profile?.pageAccesses) {
      let permission = profile.pageAccesses;
      apexPagePermissionList.push(permission.apexPage);
   }
   return Array.from(new Set(apexPagePermissionList));
};
const getUserPermissionList = (profile: any, userPermissionList: any[]) => {
   if (profile.userPermissions && profile.userPermissions[0]) {
      for (let i = 0; i < profile.userPermissions.length; i++) {
         let permission = profile.userPermissions[i];
         userPermissionList.push(permission.name);
      }
   } else if (profile?.pageAccesses) {
      let permission = profile.pageAccesses;
      userPermissionList.push(permission.apexPage);
   }
   return Array.from(new Set(userPermissionList));
};

const getUsersForProfile = async (profiles: any) => {
   let userMap = {};
   for (let i = 0; i < profiles.length; i++) {
      let response = await handleApi("query", {
         query: "Select id,Name,UserName From User where ProfileId='" + profiles[i].id + "'",
      });
      if (response.records) {
         let tempUsers = response.records.reduce((m: any, user: any) => {
            m[user.Id] = user;
            return m;
         }, {});
         userMap = { ...userMap, ...tempUsers };
      }
   }
   return userMap;
};
const getUserFromPermissionSets = async (permissionSets: any[]) => {
   let userMap = {};
   for (let i = 0; i < permissionSets.length; i++) {
      let response = await handleApi(
         "query",
         "SELECT Assignee.Name , Assignee.Username , Assignee.Id ,AssigneeId, PermissionSetId FROM PermissionSetAssignment where PermissionSetId='" +
            permissionSets[i].id +
            "'"
      );
      if (response.records) {
         let tempUsers = response.records.reduce((m: any, user: any) => {
            m[user.AssigneeId] = user.Assignee;
            return m;
         }, {});
         userMap = { ...userMap, ...tempUsers };
      }
   }
   return userMap;
};
export const getSelectedUsers = async (selectedData: any) => {
   let userMap = {};

   userMap = { ...userMap, ...(await getUsersForProfile(selectedData.selectedProfiles)) };
   userMap = { ...userMap, ...(await getUserFromPermissionSets(selectedData.selectedPermissionSets)) };
   console.log("🚀 ~ file: PermissionCheckerView.util.ts:231 ~ getSelectedUsers ~ userMap:", userMap);
   return userMap;
};
