const getAllColumns = (recodTypeDescribe: any) => {
   let columns: any[] = [];
   recodTypeDescribe.sections.forEach((section: any) => {
      columns = [...columns, ...section.columns];
   });
   return columns;
};
const checkField = (field: any, fieldPrefix: string, tableName: string, columns: any[]) => {
   let selected = columns.some((column) => {
      let fullField =
         fieldPrefix !== "" ? fieldPrefix + "." + (field.type === "reference" ? field.relationshipName : field.name) : field.name;
      if (column.table === tableName && column.field === fullField) {
         return true;
      } else {
         return false;
      }
   });
   return selected;
};
export const seggrateFields = (recodTypeDescribe: any, fields: any, tableName: string, fieldPrefix: any) => {
   console.log("🚀 ~ seggrateFields ~ fields:", fields);
   let columns = getAllColumns(recodTypeDescribe);
   let displayFields: any = [];
   if (fields) {
      fields.forEach((field: any) => {
         let selected = checkField(field, fieldPrefix, tableName, columns);
         displayFields.push({ ...field, selected });
      });
      return displayFields.sort((a: any, b: any) => {
         return a.label > b.label ? 1 : -1;
      });
   }
   return [];
};
