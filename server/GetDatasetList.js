import version from "./config";

const queryMore = async (data, url) => {
   const response = await fetch(`${data.instanceUrl}${url}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${data.accessToken}`,
      },
   });
   const result = await response.json();
   let records = [...result.datasets];
   if (result.nextPageUrl !== undefined && result.nextPageUrl !== null) {
      records = [...records, ...(await queryMore(data, result.nextPageUrl))];
   }
   return records;
};

const getDatasetList = async (data) => {
   try {
      const response = await fetch(`${data.instanceUrl}/services/data/${version}/wave/datasets`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
         },
      });
      const result = await response.json();
      if (result.nextPageUrl !== undefined && result.nextPageUrl !== null) {
         result.datasets = [...result.datasets, ...(await queryMore(data, result.nextPageUrl))];
      }
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};

export default getDatasetList;
