import axios from "axios";
import { getCookie } from "tiny-cookie";
export const version = "58.0";
export const handleApi = async (api: string, data: any) => {
   let instanceUrl = getCookie("instance_url");
   let accessToken = getCookie("access_token");
   let refreshToken = getCookie("refresh_token");
   let body = {
      ...data,
      instanceUrl,
      accessToken,
      refreshToken,
   };
   let response = await axios.post("/api/" + api, body);
   return response.data;
};
export const download = (filename: string, text: string) => {
   const element = document.createElement("a");
   element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
   element.setAttribute("download", filename);
   element.style.display = "none";
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
};
export const readFileAsText = async (file: any) => {
   const result = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(file);
   });
   return result;
};
