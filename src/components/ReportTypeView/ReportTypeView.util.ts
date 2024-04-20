import { handleApi, version } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("fetch", { method: "get", url: "/services/data/v" + version + "/analytics/reportTypes" });
   let reportTypes: any[] = [];
   response.forEach((group: any) => {
      let opt: any = {};
      opt.label = group.label;
      opt.options = [];
      group.reportTypes.forEach((reportType: any) => {
         if (reportType.isCustomReportType === true) {
            opt.options.push({
               value: reportType.type,
               label: reportType.label,
               data: reportType,
            });
         }
      });
      reportTypes.push(opt);
   });
   return reportTypes;
};
const cleanSectionsAndColumns = (reportDescribe: any) => {
   let tempReportType = JSON.parse(JSON.stringify(reportDescribe));
   let tempSections = [];
   if (tempReportType.sections[0]) {
      tempSections = [...tempReportType.sections];
   } else {
      tempSections = [tempReportType.sections];
   }
   tempSections = tempSections.map((section) => {
      if (section.columns[0]) {
         section.columns = [...section.columns];
      } else {
         section.columns = [section.columns];
      }
      return section;
   });
   tempReportType.sections = tempSections;
   return tempReportType;
};

export const loadReportType = async (reportType: string) => {
   let response = await handleApi("metadataRead", { objectName: "ReportType", types: [reportType.replace("__c", "")] });
   let objectFields = await getFieldsFromObjects(response);
   let reportDescribe = cleanSectionsAndColumns(response);
   return {
      objectFields,
      reportDescribe,
   };
};

export const getObject = async (objectName: string) => {
   let response = await handleApi("objectDescribe", { objectName: objectName });
   return response;
};

const getFieldsFromObjects = async (reportTypeDescribe: any) => {
   let baseObject = reportTypeDescribe.baseObject;
   let objectFields = [];
   let baseObjectDescribe = await getObject(baseObject);
   objectFields.push({
      objectName: reportTypeDescribe.baseObject,
      tableName: reportTypeDescribe.baseObject,
      fields: baseObjectDescribe.fields,
   });
   if (reportTypeDescribe.join) {
      const child1: any = baseObjectDescribe.childRelationships.filter((child: any) => {
         return reportTypeDescribe.join.relationship === child.relationshipName;
      })[0];
      if (child1 && child1.childSObject) {
         const firstChild = await getObject(child1.childSObject);
         objectFields.push({
            objectName: firstChild.name,
            tableName: reportTypeDescribe.baseObject + "." + reportTypeDescribe.join.relationship,
            fields: firstChild.fields,
         });
         if (reportTypeDescribe.join.join) {
            const child2: any = firstChild.childRelationships.filter((child: any) => {
               return reportTypeDescribe.join.join.relationship === child.relationshipName;
            })[0];
            const secondChild = await getObject(child2.childSObject);
            objectFields.push({
               objectName: secondChild.name,
               tableName:
                  reportTypeDescribe.baseObject +
                  "." +
                  reportTypeDescribe.join.relationship +
                  "." +
                  reportTypeDescribe.join.join.relationship,
               fields: secondChild.fields,
            });
            if (reportTypeDescribe.join.join.join) {
               const child3: any = secondChild.childRelationships.filter((child: any) => {
                  return reportTypeDescribe.join.join.join.relationship === child.relationshipName;
               })[0];
               const thirdChild = await getObject(child3.childSObject);
               objectFields.push({
                  objectName: thirdChild.name,
                  tableName:
                     reportTypeDescribe.baseObject +
                     "." +
                     reportTypeDescribe.join.relationship +
                     "." +
                     reportTypeDescribe.join.join.relationship +
                     "." +
                     reportTypeDescribe.join.join.join.relationship,
                  fields: thirdChild.fields,
               });
            }
         }
      }
   }
   return objectFields;
};

export const handleSave = async (selectedReportType: any) => {
   let records = [selectedReportType];
   let response = await handleApi("metadataUpsert", { records: records, metadataType: "ReportType" });
   return response;
};
