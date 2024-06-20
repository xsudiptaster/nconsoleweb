import { handleApiSecond } from '../utils';

export const handleConfirm = async (loginInfo: any) => {
  if (loginInfo) {
    console.log('🚀 ~ handleConfirm ~ loginInfo:', loginInfo);
    let response = await handleApiSecond('identity', loginInfo, {});
    if (response.success === false) {
      let refreshResponse = await handleApiSecond('refresh', loginInfo, {});
      console.log('🚀 ~ handleConfirm ~ refreshResponse:', refreshResponse);
      if (refreshResponse.accessToken) {
      }
      return {};
    }
    return response;
  }
  return {};
};
