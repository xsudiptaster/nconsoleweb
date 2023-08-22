export const updateColumn = (selectedReportType: any, oColumn: any) => {
   let reportTypeDescribe = { ...selectedReportType };
   reportTypeDescribe.sections = reportTypeDescribe.sections.map((section: any) => {
      let tempSection = { ...section };
      tempSection.columns = tempSection.columns.map((column: any) => {
         let tempColumn = { ...column };
         if (tempColumn.table === oColumn.table && tempColumn.field === oColumn.field) {
            tempColumn = oColumn;
         }
         return tempColumn;
      });
      return tempSection;
   });
   return reportTypeDescribe;
};
const addNewFieldOnSection = (selectedReportType: any, sectionIndex: number, dragField: any) => {
   let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
   reportTypeDescribe.sections[sectionIndex].columns.push(dragField.column);
   return reportTypeDescribe;
};
const addNewFieldOnColumn = (selectedReportType: any, column: any, dragField: any) => {
   let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
   let sectionIndex = null;
   let columnIndex = null;
   reportTypeDescribe.sections.forEach((section: any, i: number) => {
      section.columns.forEach((col: any, j: number) => {
         if (col.field === column.field && col.table === column.table) {
            sectionIndex = i;
            columnIndex = j;
         }
      });
   });
   if (sectionIndex !== null && columnIndex !== null) {
      reportTypeDescribe.sections[sectionIndex].columns.splice(columnIndex, 0, dragField.column);
   }
   return reportTypeDescribe;
};
export const removeColumn = (selectedReportType: any, dragField: any) => {
   let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
   let sectionIndex: any = null;
   let columnIndex: any = null;
   reportTypeDescribe.sections.forEach((section: any, i: number) => {
      section.columns.forEach((col: any, j: number) => {
         if (col.field === dragField.column.field && col.table === dragField.column.table) {
            sectionIndex = i;
            columnIndex = j;
         }
      });
   });
   if (sectionIndex !== null && columnIndex !== null) {
      reportTypeDescribe.sections[sectionIndex].columns.splice(columnIndex, 1);
   }
   return reportTypeDescribe;
};

const moveFieldOnSection = (selectedReportType: any, sectionIndex: number, dragField: any) => {
   let reportTypeDescribe = removeColumn(selectedReportType, dragField);
   reportTypeDescribe = addNewFieldOnSection(reportTypeDescribe, sectionIndex, dragField);
   return reportTypeDescribe;
};
const moveFieldOnColumn = (selectedReportType: any, column: any, dragField: any) => {
   let reportTypeDescribe = removeColumn(selectedReportType, dragField);
   reportTypeDescribe = addNewFieldOnColumn(reportTypeDescribe, column, dragField);
   return reportTypeDescribe;
};
export const onDropSection = (selectedReportType: any, sectionIndex: number, dragField: any) => {
   if (dragField.new) {
      let response = addNewFieldOnSection(selectedReportType, sectionIndex, dragField);
      return response;
   } else {
      let response = moveFieldOnSection(selectedReportType, sectionIndex, dragField);
      return response;
   }
};
export const onDropColumn = (selectedReportType: any, column: any, dragField: any) => {
   if (dragField.new) {
      let response = addNewFieldOnColumn(selectedReportType, column, dragField);
      return response;
   } else {
      let response = moveFieldOnColumn(selectedReportType, column, dragField);
      return response;
   }
};
