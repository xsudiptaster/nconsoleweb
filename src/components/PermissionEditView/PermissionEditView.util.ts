import { handleApi, processZip } from "../../utils/utils";

export const handleLoad = async () => {
   var types = [
      { type: "Profile", folder: null },
      { type: "PermissionSet", folder: null },
      { type: "CustomObject", folder: null },
   ];
   let response = await handleApi("metadataList", { types: types });
   let profiles = response
      .filter((profile: any) => {
         return profile.type === "Profile";
      })
      .sort((a: any, b: any) => {
         return a.fullName > b.fullName ? 1 : -1;
      })
      .map((profile: any) => {
         return { label: profile.fullName, value: profile.fileName, ...profile };
      });
   let permissionSets = response
      .filter((permissionSet: any) => {
         return permissionSet.type === "PermissionSet";
      })
      .sort((a: any, b: any) => {
         return a.fullName > b.fullName ? 1 : -1;
      })
      .map((permissionSet: any) => {
         return { label: permissionSet.fullName, value: permissionSet.fileName, ...permissionSet };
      });
   let customObjects = response
      .filter((object: any) => {
         return object.type === "CustomObject" && !object.fullName.includes("__mdt") && !object.fullName.includes("__e");
      })
      .sort((a: any, b: any) => {
         return a.fullName > b.fullName ? 1 : -1;
      })
      .map((object: any) => {
         return { label: object.fullName, value: object.fileName, ...object };
      });
   let result = {
      profilesOptions: [
         {
            label: "Profiles",
            options: profiles,
         },
         {
            label: "Permission Sets",
            options: permissionSets,
         },
      ],
      objectOptions: customObjects,
   };
   return result;
};
export const retrievePermissions = async (selectedProfiles: any[], selectedObjects: any[]) => {
   let profiles = selectedProfiles.filter((profile) => {
      return profile.type === "Profile";
   });
   let permissionSets = selectedProfiles.filter((permissionSet) => {
      return permissionSet.type === "PermissionSet";
   });
   let types = [];
   if (profiles.length > 0) {
      const metaData: any = {};
      metaData.name = "Profile";
      metaData.members = [];
      metaData.members.push(
         profiles.map((profile: any) => {
            return profile.fullName;
         })
      );
      types.push(metaData);
   }
   if (permissionSets.length > 0) {
      const metaData: any = {};
      metaData.name = "PermissionSet";
      metaData.members = [];
      metaData.members.push(
         permissionSets.map((profile: any) => {
            return profile.fullName;
         })
      );
      types.push(metaData);
   }
   if (selectedObjects.length > 0) {
      const metaData: any = {};
      metaData.name = "CustomObject";
      metaData.members = [];
      metaData.members.push(
         selectedObjects.map((object: any) => {
            return object.fullName;
         })
      );
      types.push(metaData);
   }
   let responseObjects: any[] = [];
   for (let i = 0; i < selectedObjects.length; i++) {
      let object = await handleApi("objectDescribe", { objectName: selectedObjects[i].fullName });
      responseObjects.push(object);
   }
   let response = await handleApi("metadataRetrieve", { types });
   console.log("🚀 ~ file: PermissionEditView.util.ts:102 ~ retrievePermissions ~ response:", response);
   let proccessedZip = await processZip(response.zipFile);
   let responseProfiles = [];
   for (let i = 0; i < selectedProfiles.length; i++) {
      let metadata = proccessedZip[selectedProfiles[i].fileName][selectedProfiles[i].type];
      let profile = { ...selectedProfiles[i], metadata };
      responseProfiles.push(profile);
   }
   return {
      responseObjects,
      responseProfiles,
   };
};
