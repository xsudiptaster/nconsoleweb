export const handleLoad = (fields: any[]) => {
   let result = fields.reduce((map, field) => {
      return (map[field.name] = field);
   }, {});
   return result;
};
