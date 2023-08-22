import { handleApi } from "../../utils/utils";

export const handleProdLogin = async () => {
   let instance = "https://login.salesforce.com";
   let response = await handleApi("login", {});
   let url = `${instance}/services/oauth2/authorize?client_id=${response.CLIENT_ID}&redirect_uri=${response.CALLBACK}&response_type=token`;
   window.open(url, "_self");
};
export const handleTestLogin = async () => {
   let instance = "https://test.salesforce.com";
   let response = await handleApi("login", {});
   let url = `${instance}/services/oauth2/authorize?client_id=${response.CLIENT_ID}&redirect_uri=${response.CALLBACK}&response_type=token`;
   window.open(url, "_self");
};
