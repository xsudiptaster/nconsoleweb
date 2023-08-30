import { handleApi, sendMessage } from "../../utils/utils";

const replaceCode = (record: any, code: string) => {
   let tempCode = code;
   let keys = Object.keys(record);
   for (let i = 0; i < keys.length; i++) {
      let replacekey = ("pv_" + keys[i]).replaceAll(" ", "");
      tempCode = tempCode.replaceAll(replacekey, record[keys[i]]);
   }
   return tempCode;
};
const handleLoopRun = async (code: string, loopCount: number) => {
   let tempResponse: any[] = [];
   for (let i = 0; i < loopCount; i++) {
      let response = await handleApi("apexCode", { code });
      if (response.compiled === false) {
         return {
            success: false,
            error: JSON.stringify(response.compileProblem),
         };
      }
      sendMessage({ current: i, total: loopCount });
      tempResponse = [...tempResponse, response];
   }
   return { success: true, data: tempResponse };
};
const handleJsondata = async (code: string, data: any[]) => {
   let tempResponse: any[] = [];
   for (let i = 0; i < data.length; i++) {
      let tempCode = replaceCode(data[i], code);
      let response = await handleApi("apexCode", { code: tempCode, jsonData: data[i] });
      if (response.compiled === false) {
         return {
            success: false,
            error: JSON.stringify(response.compileProblem),
         };
      }
      sendMessage({ current: i, total: data.length });
      tempResponse = [...tempResponse, response];
   }
   return { success: true, data: tempResponse };
};
export const handleExecute = async (code: string, runType: string, data: any[], loopCount: number) => {
   if (runType === "loop") {
      let response = await handleLoopRun(code, loopCount);
      return response;
   } else {
      let response = await handleJsondata(code, data);
      return response;
   }
};
