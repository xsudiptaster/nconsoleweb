import version from "./config";

const getDatasetDetails = async (data) => {
   try {
      const response = await fetch(`${data.instanceUrl}/services/data/${version}/wave/datasets/${data.datasetId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
         },
      });
      const result = await response.json();
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};

export default getDatasetDetails;
