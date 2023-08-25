import { getCookie, removeCookie } from "tiny-cookie";
import { handleApi } from "../../utils/utils";

export const checkLogin = async () => {
   const oAuth_Token = getCookie("access_token");
   if (oAuth_Token) {
      let response = await handleApi("identity", {});
      if (response.error === "Session expired or invalid") {
         removeCookie("access_token");
         removeCookie("instance_url");
         window.open("/", "_self");
      }
      if (response?.success === false) {
         window.open("/", "_self");
      }
   }
};
export const handleLogout = async () => {
   let response = await handleApi("logOut", {});
   removeCookie("access_token");
   removeCookie("instance_url");
   return response;
};
