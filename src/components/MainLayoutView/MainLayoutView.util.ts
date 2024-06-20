import Cookies from 'js-cookie';

import { handleApi } from '../../utils/utils';

export const checkLogin = async () => {
  const oAuth_Token = Cookies.get('access_token');
  if (oAuth_Token) {
    let response = await handleApi('identity', {});
    console.log('🚀 ~ checkLogin ~ response:', response);
    if (response.error === 'Session expired or invalid') {
      Cookies.remove('access_token');
      Cookies.remove('instance_url');
      return {};
    }
    if (response?.success === false) {
      return {};
    }
    return { ...response, instance_url: Cookies.get('instance_url'), access_token: Cookies.get('access_token') };
  }
  return {};
};
export const handleLogout = async () => {
  let response = await handleApi('logOut', {});
  Cookies.remove('access_token');
  Cookies.remove('instance_url');
  return response;
};
