import Cookies from "js-cookie";
import { handleApiSecond } from "../../utils/utils";
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
      const response = await handleApiSecond("identity", sessionInfo, {});
      if (sessionInfo.state === "initial") {
         for (let key in sessionInfo) {
            Cookies.set(key, sessionInfo[key]);
         }
      }
      let result = { ...response, ...sessionInfo };
      let currentState = localStorage.getItem("loginInfo");
      if (currentState === null) {
         let loginInfo: any = {};
         loginInfo[result.username] = {};
         loginInfo[result.username] = result;
         localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      } else {
         let loginInfo = JSON.parse(currentState);
         loginInfo[result.username] = result;
         localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      }
      return result;
   } else {
      window.open("/", "_top");
   }
};
