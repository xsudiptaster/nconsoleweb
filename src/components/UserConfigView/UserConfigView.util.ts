import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   return {
      usersList: await getAllUsers(),
      userObject: await getUserDescribe(),
   };
};
const getAllUsers = async () => {
   let query = "Select id, Name,Email,UserName from User";
   let response = await handleApi("query", { query });

   return response.records
      .map((user: any) => {
         return {
            label: user.Name,
            value: user.Id,
            user,
         };
      })
      .sort((a: any, b: any) => {
         return a.label > b.label ? 1 : -1;
      });
};

const getUserDescribe = async () => {
   let response = await handleApi("objectDescribe", { objectName: "User" });
   response.fieldsMap = response.fields.reduce((acc: any, field: any) => {
      acc[field.name] = field;
      return acc;
   }, {});

   return response;
};
