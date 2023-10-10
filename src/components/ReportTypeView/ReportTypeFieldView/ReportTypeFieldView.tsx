import { Badge, Col, Input, Modal, Row, Tabs } from "antd";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { reportFieldTreeDataAtom, selectedReportTypeAtom } from "../../../atoms/atom";
import FieldDisplayPanelView from "../FieldDisplayPanelView";
import ReportFieldDisplayView from "./ReportFieldDisplayView";
import { addNewSection, countField, removeSection } from "./ReportTypeFieldView.util";
import TabHeaderView from "./TabHeaderView";

interface IReportTypeFieldViewProps {
   children?: React.ReactNode;
}

const ReportTypeFieldView: React.FC<IReportTypeFieldViewProps> = (props) => {
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [objectFields] = useRecoilState(reportFieldTreeDataAtom);
   const [searchStringField, setSearchStringField] = React.useState("");
   const [searchString, setSearchString] = React.useState("");
   const { confirm } = Modal;
   const onEditClick = async (tabId: any, method: any) => {
      if (method === "remove") {
         confirm({
            content: "Are you sure you want to delete the section?",
            onOk() {
               let response = removeSection(selectedReportType, tabId);
               setSelectedReportType(response);
            },
            onCancel() {},
         });
      } else {
         let response = addNewSection(selectedReportType);
         setSelectedReportType(response);
      }
   };
   return (
      <>
         <Row>
            <Col span={17}>
               <Input
                  placeholder="Seach Field"
                  size="small"
                  onChange={(e) => {
                     setSearchString(e.target.value);
                  }}
                  addonAfter={<BiSearch />}
               />
               <Tabs
                  style={{ paddingTop: "10px" }}
                  type="editable-card"
                  tabBarGutter={1}
                  tabPosition="right"
                  destroyInactiveTabPane={true}
                  size="small"
                  animated
                  onEdit={(e, p) => {
                     onEditClick(e, p);
                  }}
                  items={
                     selectedReportType?.sections
                        ? selectedReportType?.sections.map((section: any, index: number) => {
                             return {
                                label: (
                                   <Badge count={countField(section, searchString)}>
                                      <TabHeaderView section={section} index={index} />
                                   </Badge>
                                ),
                                key: index,
                                children: <ReportFieldDisplayView section={section} searchString={searchString} index={index} />,
                             };
                          })
                        : []
                  }
               />
            </Col>
            <Col span={7}>
               <Tabs
                  size="small"
                  style={{ paddingLeft: "20px" }}
                  destroyInactiveTabPane={true}
                  items={objectFields.map((reportObject) => {
                     return {
                        label: reportObject.tableName,
                        key: reportObject.tableName,
                        children: <FieldDisplayPanelView reportObject={reportObject} searchStringField={searchStringField} />,
                     };
                  })}
                  tabBarExtraContent={
                     <>
                        <Input
                           size="small"
                           placeholder="Search Field"
                           onChange={(e) => {
                              setSearchStringField(e.target.value);
                           }}
                        />
                     </>
                  }
               />
            </Col>
         </Row>
      </>
   );
};

export default ReportTypeFieldView;
