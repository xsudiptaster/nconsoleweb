export const handleLoad = (permissions: any) => {
   let tempKey: string[] = [];
   if (permissions?.A) {
      tempKey = [...tempKey, ...Object.keys(permissions?.A)];
   }
   if (permissions?.B) {
      tempKey = [...tempKey, ...Object.keys(permissions?.B)];
   }
   tempKey = Array.from(new Set(tempKey)).sort((a: any, b: any) => {
      return a > b ? 1 : -1;
   });
   return tempKey;
};
export const handleComparision = (permissions: any, apexClassName: string) => {
   if (permissions?.A && permissions?.B && permissions?.A[apexClassName]?.enabled === permissions?.B[apexClassName]?.enabled) {
      return true;
   }
   return false;
};
export const setApexClassPermissions = (permissions: any, option: string, apexClassName: string, value: boolean) => {
   let tempPermissions = JSON.parse(JSON.stringify(permissions));
   if (tempPermissions[option][apexClassName]) {
      tempPermissions[option][apexClassName].enabled = value.toString();
   } else {
      tempPermissions[option][apexClassName] = {};
      tempPermissions[option][apexClassName] = {
         apexClass: apexClassName,
         enabled: value.toString(),
      };
   }
   return tempPermissions;
};
