import { getCookie, removeCookie } from "tiny-cookie";
import { handleApi } from "../../utils/utils";

export const checkLogin = async () => {
   const oAuth_Token = getCookie("access_token");
   if (oAuth_Token) {
      let response = await handleApi("identity", {});
      console.log("🚀 ~ file: MainLayoutView.util.ts:9 ~ checkLogin ~ response:", response);
      if (response.error === "Session expired or invalid") {
         removeCookie("access_token");
         removeCookie("instance_url");
         window.open("/", "_self");
      }
   }
};
