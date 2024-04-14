import { handleApi } from "../../../utils/utils";

export const getUserDetils = async (id: string) => {
   let query = "Select FIELDS(ALL) from User where id='" + id + "'";
   let response = await handleApi("query", { query });
   return response.records[0];
};
export const standardFields: any[] = [
   {
      key: "FirstName",
      label: "First Name",
   },
   {
      key: "MiddleName",
      label: "Middle Name",
   },
   {
      key: "LastName",
      label: "Last Name",
   },
   {
      key: "Email",
      label: "Email",
   },
   {
      key: "Username",
      label: "User Name",
   },
   {
      key: "IsActive",
      label: "Active",
   },
   {
      key: "ProfileId",
      label: "Profile",
   },
   {
      key: "UserRoleId",
      label: "Role",
   },
   {
      key: "Alias",
      label: "Alias",
   },

   {
      key: "ManagerId",
      label: "Manager",
   },
   {
      key: "AboutMe",
      label: "About Me",
   },
];
export const getCustomFields = (fields: any) => {
   return fields
      .filter((field: any) => {
         return field.custom;
      })
      .map((field: any) => {
         return {
            key: field.name,
            label: field.label,
         };
      });
};
export const getStandardFields = (fields: any) => {
   let setStandardFields = new Set(
      standardFields.map((field) => {
         return field.key;
      })
   );
   return fields
      .filter((field: any) => {
         return !field.custom && !setStandardFields.has(field.name);
      })
      .map((field: any) => {
         return {
            key: field.name,
            label: field.label,
         };
      });
};
