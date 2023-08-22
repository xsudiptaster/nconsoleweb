export const selectField = (nodes: any[], oNode: any, field: any, value: boolean) => {
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   tempNodes = tempNodes.map((node: any) => {
      if (node.id === oNode.id) {
         if (value) {
            node.data.selectedFields.push(field);
         } else {
            node.data.selectedFields = node.data.selectedFields.filter((ofield: any) => {
               return ofield.name !== field.name;
            });
         }
      }
      return node;
   });
   return tempNodes;
};
