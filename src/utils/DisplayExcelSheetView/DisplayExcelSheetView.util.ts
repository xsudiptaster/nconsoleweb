const getFilteredValues = (data: any[], col: any) => {
   let values = data
      .map((record) => {
         return record[col];
      })
      .sort((a, b) => {
         return a > b ? 1 : 1;
      });
   let setValues = Array.from(new Set(values));
   return setValues.map((val) => {
      return { text: val, value: val };
   });
};
export const createDisplayColumns = (tempColumns: any[], data: any[]) => {
   if (tempColumns.length > 0) {
      let columns = tempColumns.map((col) => {
         return {
            title: col.toUpperCase(),
            dataIndex: col,
            key: col,
            ellipsis: true,
            filters: getFilteredValues(data, col),
            onFilter: (value: string, record: any) => {
               return record[col] ? record[col] === value : true;
            },
            sorter: (a: any, b: any) => (a[col] > b[col] ? 1 : -1),
            filterSearch: true,
         };
      });
      return columns;
   }
   return [];
};
