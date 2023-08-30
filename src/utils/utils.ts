import axios from "axios";
import { getCookie } from "tiny-cookie";
import * as XLSX from "xlsx";
export const version = "57.0";
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
export const readFileAsBuffer = async (file: any) => {
   const result = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsArrayBuffer(file);
   });
   return result;
};
export const readFileWithXLSX = async (oArrayBuff: any) => {
   const workbook = await XLSX.readFile(oArrayBuff, {
      type: "array",
      cellDates: true,
   });
   return workbook;
};
export const readFirstSheet = (workbook: any) => {
   return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      defval: "",
   });
};
export const readFileData = async (fileData: any) => {
   const resultFile = await readFileAsBuffer(fileData);
   const workbook = await readFileWithXLSX(resultFile);
   const data = await readFirstSheet(workbook);
   return data;
};
export const sendMessage = async ({ current, total }: any) => {
   window.postMessage({ current, total });
};

export const writeFileWithXLSX = (processedData: any[], fileName: string) => {
   const wb = XLSX.utils.book_new();
   const ws = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(processedData)));
   XLSX.utils.book_append_sheet(wb, ws, "Output");
   XLSX.writeFile(wb, `${fileName}.xlsx`);
   return wb;
};
