const axios = require("axios");
const fetchPatch = async (payloadData) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   };
   const response = await axios.patch(payloadData.instanceUrl + payloadData.url, payloadData.body, config);
   return response.data;
};
const fetchPost = async (payloadData) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   };
   const response = await axios.post(payloadData.instanceUrl + payloadData.url, payloadData.body, config);
   return response.data;
};
const fetchJSON = async (payloadData) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   };
   const response = await axios.get(payloadData.instanceUrl + payloadData.url, config);
   return response.data;
};

const fetchCall = async (payloadData) => {
   switch (payloadData.method) {
      case "patch":
         return fetchPatch(payloadData);
      case "get":
         return fetchJSON(payloadData);
      case "post":
         return fetchPost(payloadData);
      default:
         return null;
   }
};

module.exports = fetchCall;
