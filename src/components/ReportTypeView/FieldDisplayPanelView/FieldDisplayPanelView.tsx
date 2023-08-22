import { LoginOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Row, Tooltip } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportTypeDragFieldAtom, selectedReportTypeAtom } from "../../../atoms/atom";
import { removeColumn } from "../ReportTypeFieldView/ReportFieldDisplayView/ReportFieldDisplayView.util";
import { getObject } from "../ReportTypeView.util";
import { seggrateFields } from "./FieldDisplayPanelView.util";
interface IFieldDisplayPanelViewProps {
   children?: React.ReactNode;
   reportObject: any;
   searchStringField: string;
}

const FieldDisplayPanelView: React.FC<IFieldDisplayPanelViewProps> = (props) => {
   const { reportObject, searchStringField } = props;
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [dragField, setDragField] = useRecoilState(reportTypeDragFieldAtom);
   const [fields, setFields] = React.useState(reportObject.fields);
   const [tablePrefixes, setTablePrefixes] = React.useState<string[]>([]);
   React.useEffect(() => {
      const onload = () => {
         setFields(reportObject.fields);
      };
      onload();
   }, [reportObject]);
   let displayFields = React.useMemo(() => {
      return seggrateFields(
         selectedReportType,
         fields,
         reportObject.tableName,
         tablePrefixes
            .map((field: any) => {
               if (field.name.includes("__c")) {
                  return field.name;
               } else {
                  return field.relationshipName;
               }
            })
            .join(".")
      );
   }, [fields, reportObject.tableName, selectedReportType, tablePrefixes]);
   const onClick = async (field: any) => {
      setLoading(true);
      let objectName = field.referenceTo[0];
      let objectDescribe = await getObject(objectName);
      setTablePrefixes([...tablePrefixes, field]);
      setFields(objectDescribe.fields);
      setLoading(false);
   };
   const onLinkClick = async (field: any, path: any) => {
      setLoading(true);
      if (field.referenceTo) {
         let objectName = field.referenceTo[0];
         let objectDescribe = await getObject(objectName);
         let tempList = [...tablePrefixes];
         tempList.splice(path);
         setTablePrefixes(tempList);
         setFields(objectDescribe.fields);
      } else {
         setTablePrefixes([]);
         let objectDescribe = await getObject(field.name);
         setFields(objectDescribe.fields);
      }
      setLoading(false);
   };
   const onDrag = (field: any) => {
      let value = field.type === "reference" && !field.name.includes("__c") ? field.relationshipName : field.name;
      let prefix = tablePrefixes
         .map((field: any) => {
            if (field.name.includes("__c")) {
               return field.name;
            } else {
               return field.relationshipName;
            }
         })
         .join(".");
      setDragField({
         column: {
            field: prefix !== "" ? prefix + "." + value : value,
            table: reportObject.tableName,
            checkedByDefault: false,
            displayNameOverride: "",
         },
         new: true,
      });
   };
   return (
      <div
         onDragOver={(e) => {
            e.preventDefault();
         }}
         onDragEnter={(e) => {
            e.preventDefault();
         }}
         onDrop={(e) => {
            let response = removeColumn(selectedReportType, dragField);
            setSelectedReportType(response);
            setDragField({});
         }}
      >
         <Breadcrumb
            separator="//"
            items={[{ name: reportObject.tableName }, ...tablePrefixes].map((item: any, index: any) => {
               return {
                  title: item?.name,
                  path: "#",
                  onClick: () => {
                     onLinkClick(item, index);
                  },
               };
            })}
         />
         <Divider />
         <Row gutter={16} style={{ maxHeight: "73vh", overflow: "auto" }}>
            {displayFields
               .filter((field: any) => {
                  return searchStringField === ""
                     ? true
                     : field.name.toUpperCase().includes(searchStringField.toUpperCase()) ||
                          field.label.toUpperCase().includes(searchStringField.toUpperCase());
               })
               .map((field: any) => {
                  return (
                     <React.Fragment key={reportObject.tableName + "." + field.name}>
                        <Col
                           span={12}
                           draggable={!field.selected}
                           onDragStart={() => {
                              onDrag(field);
                           }}
                           style={{
                              wordBreak: "break-all",
                              backgroundColor: field.selected ? "#1f1f1f" : "",
                              cursor: !field.selected ? "grab" : "",
                           }}
                        >
                           <Tooltip title={field.label}>
                              <div className="rowHover">
                                 {field.name}
                                 {field.type === "reference" ? (
                                    <Button
                                       style={{ float: "right" }}
                                       icon={<LoginOutlined />}
                                       size="small"
                                       type="link"
                                       onClick={() => {
                                          onClick(field);
                                       }}
                                    />
                                 ) : (
                                    ""
                                 )}
                              </div>
                           </Tooltip>
                        </Col>
                     </React.Fragment>
                  );
               })}
         </Row>
      </div>
   );
};

export default FieldDisplayPanelView;
