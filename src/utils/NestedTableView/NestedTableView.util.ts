const getKeys = (data: any[]) => {
   let colArray: string[] = [];
   data.forEach((item: any) => {
      colArray = [...colArray, ...Object.keys(item)];
   });
   return Array.from(new Set(colArray));
};
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
export const createColumns = (data: any[]) => {
   let keys = getKeys(data);
   let columns = keys.map((jsonKey, index) => {
      let col: any = {
         title: jsonKey,
         dataIndex: jsonKey,
         key: jsonKey + "-" + index,
         ellipsis: true,
         filters: getFilteredValues(data, jsonKey),
         onFilter: (value: string, record: any) => {
            return record[col] ? record[col] === value : true;
         },
         sorter: (a: any, b: any) => (a[col] > b[col] ? 1 : -1),
         filterSearch: true,
      };
      return col;
   });
   return columns;
};
