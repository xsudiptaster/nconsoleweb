export const removeSection = (selectedReportType: any, sectionIndex: any) => {
   let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
   reportTypeDescribe.sections.splice(sectionIndex, 1);
   return reportTypeDescribe;
};
export const addNewSection = (selectedReportType: any) => {
   let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
   reportTypeDescribe.sections.push({ columns: [], masterLabel: "New Section" });
   return reportTypeDescribe;
};
