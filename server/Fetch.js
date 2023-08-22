const fetchPatch = async (payloadData) => {
   const response = await fetch(payloadData.instanceUrl + payloadData.url, {
      method: "PATCH",
      body: payloadData.body,
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   });
   return response.json();
};
const fetchPost = async (payloadData) => {
   const response = await fetch(payloadData.instanceUrl + payloadData.url, {
      method: "POST",
      body: payloadData.body,
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   });
   return response.json();
};
const fetchJSON = async (payloadData) => {
   const response = await fetch(payloadData.instanceUrl + payloadData.url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${payloadData.accessToken}`,
      },
   });
   return response.json();
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
