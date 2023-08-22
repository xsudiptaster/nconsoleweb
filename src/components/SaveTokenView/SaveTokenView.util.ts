import { setCookie } from "tiny-cookie";
const parseHash = (fragment: any) => {
   const map: any = {};
   let strhash = decodeURIComponent(fragment.substring(1));
   let hashes = strhash.split("&");
   for (let i = 0; i < hashes.length; i++) {
      let keyVal = hashes[i].split("=");
      map[keyVal[0]] = keyVal[1];
   }
   return map;
};
export const handleLoad = async () => {
   const oUrl = new URL(window.location.href);
   const sessionInfo = parseHash(oUrl.hash);
   if (sessionInfo.access_token) {
      for (let key in sessionInfo) {
         setCookie(key, sessionInfo[key]);
      }
      console.log("GOT OT ");
      window.open("/home", "_self");
   } else {
      window.open("/", "_self");
   }
};
