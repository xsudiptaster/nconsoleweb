export const createDisplayFields = (fields: any) => {
   let types = Array.from(
      new Set(
         fields.map((field: any) => {
            return field.type;
         })
      )
   );
   const display = types.map((oType: any) => {
      return {
         title: oType.toUpperCase(),
         value: oType,
         selectable: false,
         children: fields
            .filter((field: any) => {
               return field.type === oType;
            })
            .map((field: any) => {
               return {
                  title: field.label,
                  value: field.name,
               };
            })
            .sort((a: any, b: any) => {
               return a.label > b.label ? 1 : -1;
            }),
      };
   });
   return display;
};
export const selectField = (nodes: any[], oNode: any, fields: any) => {
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   let fieldsSet = new Set(fields);
   tempNodes = tempNodes.map((node: any) => {
      if (node.id === oNode.id) {
         node.data.selectedFields = node.data.fields.filter((field: any) => {
            return fieldsSet.has(field.name);
         });
      }
      return node;
   });
   return tempNodes;
};
