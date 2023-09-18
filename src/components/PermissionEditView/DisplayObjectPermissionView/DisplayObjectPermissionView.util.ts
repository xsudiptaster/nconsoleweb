import { updateTrackChanges } from "../DisplayFieldPermissionView/DisplayFieldPermissionView.util";
export const handleTrackChanges = (trackCanges: any, fetchedProfiles: any[], newPermission: any) => {
   let tempTrackChanges = { ...JSON.parse(JSON.stringify(trackCanges)) };
   for (let i = 0; i < fetchedProfiles.length; i++) {
      tempTrackChanges = updateTrackChanges(tempTrackChanges, fetchedProfiles[i], newPermission);
   }
   return tempTrackChanges;
};
