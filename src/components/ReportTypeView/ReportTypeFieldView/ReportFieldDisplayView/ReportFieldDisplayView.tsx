import { Col, Row } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { reportTypeDragFieldAtom, selectedReportTypeAtom } from "../../../../atoms/atom";
import FieldDisplayCardView from "./FieldDisplayCardView";
import { onDropSection } from "./ReportFieldDisplayView.util";

interface IReportFieldDisplayViewProps {
   children?: React.ReactNode;
   section: any;
   searchString: string;
   index: number;
}

const ReportFieldDisplayView: React.FC<IReportFieldDisplayViewProps> = (props) => {
   const { section, searchString, index } = props;
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [dragField, setDragField] = useRecoilState(reportTypeDragFieldAtom);
   return (
      <div
         onDragOver={(e) => {
            e.preventDefault();
         }}
         onDragEnter={(e) => {
            e.preventDefault();
         }}
         onDrop={(e) => {
            let response = onDropSection(selectedReportType, index, dragField);
            setSelectedReportType(response);
            setDragField({});
         }}
      >
         <Row gutter={[12, 12]} style={{ maxHeight: "80vh", minHeight: "80vh", overflow: "auto" }}>
            {section.columns
               .filter((column: any) => {
                  return searchString === "" ? true : column.field.toUpperCase().includes(searchString.toUpperCase());
               })
               .map((column: any) => {
                  return (
                     <Col span={6} key={column.table + "." + column.field}>
                        <FieldDisplayCardView column={column} />
                     </Col>
                  );
               })}
         </Row>
      </div>
   );
};

export default ReportFieldDisplayView;
