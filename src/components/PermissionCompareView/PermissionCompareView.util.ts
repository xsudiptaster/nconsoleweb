import { handleApi, handleApiSecond } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("metadataList", {
      types: [
         { type: "Profile", folder: null },
         { type: "PermissionSet", folder: null },
      ],
   });
   let options = response
      .sort((a: any, b: any) => {
         return a.fullName > b.fullName ? 1 : -1;
      })
      .map((oProfile: any) => {
         return { label: oProfile.fullName, value: oProfile.fileName, ...oProfile };
      });
   return options;
};
export const handleSecondOptions = async (secondLoginInfo: any) => {
   let response = await handleApiSecond("metadataList", secondLoginInfo, {
      types: [
         { type: "Profile", folder: null },
         { type: "PermissionSet", folder: null },
      ],
   });
   let options = response
      .sort((a: any, b: any) => {
         return a.fullName > b.fullName ? 1 : -1;
      })
      .map((oProfile: any) => {
         return { label: oProfile.fullName, value: oProfile.fileName, ...oProfile };
      });
   return options;
};
export const handleCompare = async (firstLoginInfo: any, secondLoginInfo: any, firstOption: any, secondOption: any) => {
   let promises = await Promise.all([getXmlProfile(firstLoginInfo, firstOption), getXmlProfile(secondLoginInfo, secondOption)]);
   let firstJSON = promises[0];
   let secondJSON = promises[1];
   let result: any = {};
   result.A = firstJSON;
   result.B = secondJSON;
   return result;
};

const getXmlProfile = async (currentLogin: any, option: any) => {
   let jsonBody = await handleApiSecond("metadataRead", currentLogin, { objectName: option.type, types: [option.fullName] });

   let objectPermissions = getObjectPermissionMap(jsonBody);
   let fieldPermissions = getFieldPermissionMap(jsonBody);
   let apexPermissions = getApexClassPermissionMap(jsonBody);
   let recordTypePermissions = getRecordTypePermissionMap(jsonBody);
   let userPermissions = getUserPermissionMap(jsonBody);
   let flowPermissions = getFlowPermissionMap(jsonBody);
   let pageLayoutPermissions = getPageLayoutPermissionMap(jsonBody);
   return {
      objectPermissions,
      fieldPermissions,
      apexPermissions,
      recordTypePermissions,
      userPermissions,
      flowPermissions,
      pageLayoutPermissions,
   };
};
const getObjectPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON.objectPermissions) {
      if (oJSON.objectPermissions[0]) {
         oJSON.objectPermissions.forEach((opt: any) => {
            permission[opt.object] = opt;
         });
      } else {
         permission[oJSON.objectPermissions.object] = oJSON.objectPermissions;
      }
   }
   return permission;
};

const getFieldPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.fieldPermissions) {
      if (oJSON?.fieldPermissions[0]) {
         oJSON?.fieldPermissions.forEach((opt: any) => {
            let splitField = opt.field.split(".");
            if (permission[splitField[0]]) {
               permission[splitField[0]][opt.field] = opt;
            } else {
               permission[splitField[0]] = {};
               permission[splitField[0]][opt.field] = opt;
            }
         });
      } else {
         let splitField = oJSON?.fieldPermissions.field.split(".");
         permission[splitField[0]] = {};
         permission[splitField[0]][oJSON?.fieldPermissions.field] = oJSON?.fieldPermissions;
      }
   }
   return permission;
};
const getApexClassPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.classAccesses) {
      if (oJSON?.classAccesses[0]) {
         oJSON?.classAccesses.forEach((opt: any) => {
            permission[opt.apexClass] = opt;
         });
      } else {
         permission[oJSON?.classAccesses.apexClass] = oJSON?.classAccesses;
      }
   }
   return permission;
};

const getRecordTypePermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.recordTypeVisibilities) {
      if (oJSON?.recordTypeVisibilities[0]) {
         oJSON?.recordTypeVisibilities.forEach((opt: any) => {
            let splitField = opt.recordType.split(".");
            if (permission[splitField[0]]) {
               permission[splitField[0]][opt.recordType] = opt;
            } else {
               permission[splitField[0]] = {};
               permission[splitField[0]][opt.recordType] = opt;
            }
         });
      } else {
         let splitField = oJSON?.recordTypeVisibilities.recordType.split(".");
         permission[splitField[0]] = {};
         permission[splitField[0]][oJSON?.recordTypeVisibilities.recordType] = oJSON?.recordTypeVisibilities;
      }
   }
   return permission;
};
const getUserPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.userPermissions) {
      if (oJSON?.userPermissions[0]) {
         oJSON?.userPermissions.forEach((opt: any) => {
            permission[opt.name] = opt;
         });
      } else {
         permission[oJSON?.userPermissions.name] = oJSON?.userPermissions;
      }
   }
   return permission;
};
const getFlowPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.flowAccesses) {
      if (oJSON?.flowAccesses[0]) {
         oJSON?.flowAccesses.forEach((opt: any) => {
            permission[opt.flow] = opt;
         });
      } else {
         permission[oJSON?.flowAccesses.flow] = oJSON?.flowAccesses;
      }
   }
   return permission;
};
const getPageLayoutPermissionMap = (oJSON: any) => {
   let permission: any = {};
   if (oJSON?.layoutAssignments) {
      if (oJSON?.layoutAssignments[0]) {
         oJSON?.layoutAssignments.forEach((opt: any) => {
            if (opt.recordType) {
               let splitField = opt.recordType.split(".");
               if (permission[splitField[0]]) {
                  permission[splitField[0]][opt.recordType] = opt;
               } else {
                  permission[splitField[0]] = {};
                  permission[splitField[0]][opt.recordType] = opt;
               }
            }
         });
      } else {
         if (oJSON?.layoutAssignments.recordType) {
            let splitField = oJSON?.layoutAssignments.recordType.split(".");
            permission[splitField[0]] = {};
            permission[splitField[0]][oJSON?.layoutAssignments.recordType] = oJSON?.layoutAssignments;
         }
      }
   }
   return permission;
};
export const handleSave = async (
   apexPermissions: any,
   fieldPermissions: any,
   objectPermissions: any,
   recordTypePermissions: any,
   userPermissions: any,
   flowPermissions: any,
   option: string,
   profileOption: any,
   loginInfo: any
) => {
   let packageJSON = await createProfile(
      apexPermissions,
      fieldPermissions,
      objectPermissions,
      recordTypePermissions,
      userPermissions,
      flowPermissions,
      option,
      profileOption
   );
   let response = await handleApiSecond("metadataUpsert", loginInfo, {
      metadataType: profileOption.type,
      records: [packageJSON],
   });
   return response;
};
const createProfile = async (
   apexPermissions: any,
   fieldPermissions: any,
   objectPermissions: any,
   recordTypePermissions: any,
   userPermissions: any,
   flowPermissions: any,
   option: string,
   profileOption: any
) => {
   let profile: any = {
      classAccesses: createClassAccess(apexPermissions, option),
      objectPermissions: createObjectPermissions(objectPermissions, option),
      userPermissions: createUserPermissions(userPermissions, option),
      fieldPermissions: createFieldPermissions(fieldPermissions, option),
      recordTypeVisibilities: createRecordTypePermissions(recordTypePermissions, option),
      flowAccesses: createFlowPermissions(flowPermissions, option),
      fullName: profileOption.fullName,
   };
   if (profileOption.type === "PermissionSet") {
      profile.label = profileOption.label;
   }
   return profile;
};
const createClassAccess = (permissions: any, option: string) => {
   let classAccesses: any = [];
   for (let key in permissions[option]) {
      classAccesses.push(permissions[option][key]);
   }
   return classAccesses;
};
const createObjectPermissions = (permissions: any, option: string) => {
   let objectPermissions = [];
   for (let key in permissions[option]) {
      objectPermissions.push(permissions[option][key]);
   }
   return objectPermissions;
};
const createUserPermissions = (permissions: any, option: string) => {
   let userPermissions = [];
   for (let key in permissions[option]) {
      userPermissions.push(permissions[option][key]);
   }
   return userPermissions;
};
const createFieldPermissions = (permissions: any, option: string) => {
   let fieldPermissions = [];
   for (let objKey in permissions[option]) {
      for (let key in permissions[option][objKey]) {
         fieldPermissions.push(permissions[option][objKey][key]);
      }
   }
   return fieldPermissions;
};
const createRecordTypePermissions = (permissions: any, option: string) => {
   let recordTypePermissions = [];
   for (let objKey in permissions[option]) {
      for (let key in permissions[option][objKey]) {
         recordTypePermissions.push(permissions[option][objKey][key]);
      }
   }
   return recordTypePermissions;
};
const createFlowPermissions = (permissions: any, option: string) => {
   let flowAccesses = [];
   for (let key in permissions[option]) {
      flowAccesses.push(permissions[option][key]);
   }
   return flowAccesses;
};
