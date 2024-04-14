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
const moveUp = (index: number, arr: any[]) => {
   if (index > 0) {
      let el = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = el;
   }
   return arr;
};
const moveDown = (index: number, arr: any[]) => {
   if (index !== -1 && index < arr.length - 1) {
      let el = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = el;
   }
   return arr;
};
export const moveFieldUp = (nodes: any[], oNode: any, fieldName: string) => {
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   tempNodes = tempNodes.map((node: any) => {
      if (node.id === oNode.id) {
         let currentIndex = node.data.selectedFields.findIndex((field: any) => {
            return field.name === fieldName;
         });
         node.data.selectedFields = moveUp(currentIndex, node.data.selectedFields);
      }
      return node;
   });
   return tempNodes;
};
export const moveFieldDown = (nodes: any[], oNode: any, fieldName: string) => {
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   tempNodes = tempNodes.map((node: any) => {
      if (node.id === oNode.id) {
         let currentIndex = node.data.selectedFields.findIndex((field: any) => {
            return field.name === fieldName;
         });
         node.data.selectedFields = moveDown(currentIndex, node.data.selectedFields);
      }
      return node;
   });
   return tempNodes;
};
export const handleDeleteField = (nodes: any[], oNode: any, fieldName: string) => {
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   tempNodes = tempNodes.map((node: any) => {
      if (node.id === oNode.id) {
         node.data.selectedFields = node.data.selectedFields.filter((field: any) => field.name !== fieldName);
      }
      return node;
   });
   return tempNodes;
};
