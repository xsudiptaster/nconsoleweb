export const handleLoad = (fields: any[]) => {
  let result = fields.reduce((map, field) => {
    map[field.name] = field;
    return map;
  }, {});
  return result;
};
export const sortByField = (sortField: any, data: any[]) => {
  if (sortField.order === "asc") {
    return data.sort((a: any, b: any) => {
      return a[sortField.field] > b[sortField.field] ? 1 : -1;
    });
  } else {
    return data.sort((a: any, b: any) => {
      return a[sortField.field] > b[sortField.field] ? -1 : 1;
    });
  }
};
export const handleFilterOption = (field: string, data: any[]) => {
  let listFields = data.map((row) => {
    return row[field];
  });
  let setFields = new Set(listFields);
  let options = Array.from(setFields).map((val) => {
    return { label: val, value: val };
  });
  return options;
};
export const handleFilter = (filteredFields: any, fullData: any[]) => {
  let tempData = [...fullData];
  Object.keys(filteredFields).forEach((field) => {
    tempData = tempData.filter((row) => {
      return filteredFields[field].includes(row[field]);
    });
  });
  return tempData;
};
