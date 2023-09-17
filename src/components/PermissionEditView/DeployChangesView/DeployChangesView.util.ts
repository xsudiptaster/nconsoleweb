import { handleApiSecond } from "../../../utils/utils";

const createProfile = (currentProfile: any, trackChanges: any) => {
   console.log("🚀 ~ file: DeployChangesView.util.ts:4 ~ createProfile ~ currentProfile:", currentProfile);
   let profile: any = {
      fullName: currentProfile.fullName,
   };
   let fileName = currentProfile.fileName;
   if (currentProfile.type === "PermissionSet") {
      profile.label = currentProfile.label;
   }
   let hasChange = false;
   if (trackChanges[fileName]?.fieldPermissions) {
      profile.fieldPermissions = trackChanges[fileName].fieldPermissions;
      hasChange = true;
   }
   if (trackChanges[fileName]?.objectPermissions) {
      profile.objectPermissions = trackChanges[fileName].objectPermissions;
      hasChange = true;
   }
   if (trackChanges[fileName]?.recordTypeVisibilities) {
      let recordTypeVisibilities = trackChanges[fileName].recordTypeVisibilities;
      if (currentProfile.type === "PermissionSet") {
         recordTypeVisibilities = recordTypeVisibilities.map((oRecordType: any) => {
            return { visible: oRecordType.visible, recordType: oRecordType.recordType };
         });
      }
      profile.recordTypeVisibilities = recordTypeVisibilities;
      hasChange = true;
   }
   return { profile, hasChange };
};
export const deployChanges = async (fetchedProfiles: any[], trackChanges: any, currentLoginInfo: any) => {
   let errors: string[] = [];
   for (let i = 0; i < fetchedProfiles.length; i++) {
      let currentProfile: any = fetchedProfiles[i];
      let response = createProfile(currentProfile, trackChanges);
      if (response.hasChange) {
         let result = await handleApiSecond("metadataUpsert", currentLoginInfo, {
            metadataType: currentProfile.type,
            records: [response.profile],
         });
         if (!result?.success) {
            errors.push(result.error);
         }
      }
   }
   if (errors.length > 0) {
      return { success: false, message: errors.join(",") };
   }
   return { success: true, message: "Saved Successfully!!" };
};