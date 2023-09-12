import { handleApiSecond } from "../utils";

export const handleConfirm = async (loginInfo: any) => {
  let response = await handleApiSecond("identity", loginInfo, {});
  if (response.success === false) {
    return {};
  }
  return response;
};
