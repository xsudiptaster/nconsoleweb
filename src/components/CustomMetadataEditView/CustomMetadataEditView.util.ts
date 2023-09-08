import { flattenJson, handleApi } from "../../utils/utils";

export const handleLoad = async () => {
  let response = await handleApi("describeGlobal", {});
  let objects = response.sobjects
    .filter((object: any) => {
      return object.name.includes("__mdt");
    })
    .sort((a: any, b: any) => {
      return a.label > b.label ? 1 : -1;
    })
    .map((object: any) => {
      return { ...object, value: object.name };
    });
  return objects;
};
const filterFields = (record: any) => {
  let recordObject: any = {};
  Object.keys(record).forEach((key) => {
    if (key === "DeveloperName" || key === "Label" || key.includes("__c")) {
      recordObject[key] = record[key];
    }
  });
  return recordObject;
};
export const handleObjectSelection = async (objectName: any) => {
  let response = await handleApi("objectDescribe", { objectName });
  let query = "SELECT ";
  let fields: any[] = [];
  response.fields.forEach((field: any) => {
    fields.push(field.name);
  });
  query = query + fields.join(",");
  query = query + " FROM " + objectName;
  let result = await handleApi("query", { query });
  console.log("🚀 ~ file: CustomMetadataEditView.util.ts:37 ~ handleObjectSelection ~ result:", result);
  let records = result.records.map((record: any) => {
    return flattenJson(filterFields(record));
  });

  return { records: records, fields: response.fields };
};
const createMetadataRecord = (record: any, objectName: string) => {
  const obj: any = {};
  obj.fullName = `${objectName.replace("__mdt", "")}.${record.DeveloperName}`;
  obj.label = record.Label;
  obj.protected = "false";
  obj.values = [];
  for (const key in record) {
    if (key.toLowerCase().includes("__c")) {
      const val: any = {};
      val.field = key;
      val.value = record[key] ? record[key] : "";
      obj.values.push(val);
    }
  }
  return obj;
};
export const saveCustomeMetadata = async (selectedMetadata: string, row: any) => {
  if (selectedMetadata !== null) {
    let record = createMetadataRecord(row, selectedMetadata);
    console.log("🚀 ~ file: CustomMetadataEditView.util.ts:63 ~ saveCustomeMetadata ~ record:", record);
    let response = await handleApi("metadataUpsert", {
      records: [record],
      metadataType: `CustomMetadata`,
    });
    return response;
  }
  return { success: false, message: "Save Failed!!" };
};
export const deleteCustomMetadata = async (selectedMetadata: string, row: any) => {
  if (selectedMetadata !== null) {
    let response = await handleApi("metadataDelete", {
      records: [`${selectedMetadata.replace("__mdt", "")}.${row.DeveloperName}`],
      metadataType: `CustomMetadata`,
    });
    return response;
  }
  return { success: false, message: "Delete Failed!!" };
};
