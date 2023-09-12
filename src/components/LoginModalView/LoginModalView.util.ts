import { handleApi } from "../../utils/utils";

export const handleLoad = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const state = urlParams.get("state");
  return state;
};
export const handleProdLogin = async (state: any) => {
  let instance = "https://login.salesforce.com";
  let response = await handleApi("login", {});
  let url = `${instance}/services/oauth2/authorize?state=${state ? state : "initial"}&client_id=${
    response.CLIENT_ID
  }&redirect_uri=${response.CALLBACK}&response_type=token`;
  window.open(url, "_self");
};
export const handleTestLogin = async (state: any) => {
  let instance = "https://test.salesforce.com";
  let response = await handleApi("login", {});
  let url = `${instance}/services/oauth2/authorize?state=${state ? state : "initial"}&client_id=${
    response.CLIENT_ID
  }&redirect_uri=${response.CALLBACK}&response_type=token`;
  window.open(url, "_self");
};
