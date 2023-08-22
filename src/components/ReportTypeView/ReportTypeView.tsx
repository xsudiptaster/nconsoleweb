import { SaveOutlined } from "@ant-design/icons";
import { App, Button, Card, Col, Row, Select, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportFieldTreeDataAtom, selectedReportTypeAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import ReportTypeFieldView from "./ReportTypeFieldView";
import { handleLoad, handleSave, loadReportType } from "./ReportTypeView.util";

interface IReportTypeViewProps {
   children?: React.ReactNode;
}

const ReportTypeView: React.FC<IReportTypeViewProps> = (props) => {
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [, setObjectFields] = useRecoilState(reportFieldTreeDataAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const { message } = App.useApp();
   const [reportTypeList, setReportTypeList] = React.useState<any[]>([]);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setReportTypeList(response);
      };
      onload();
   }, []);
   const onChange = async (value: any) => {
      setLoading(true);
      let response = await loadReportType(value);
      setSelectedReportType(response.reportDescribe);
      setObjectFields(response.objectFields);
      setLoading(false);
   };
   const onSave = async () => {
      setLoading(true);
      let response = await handleSave(selectedReportType);
      console.log("🚀 ~ file: ReportTypeView.tsx:36 ~ onSave ~ response:", response);
      if (response.success) {
         message.success("Saved Successfully!");
      } else {
         message.error("Error While Saving");
      }
      setLoading(false);
   };
   return (
      <>
         <Card
            size="small"
            bodyStyle={{ minHeight: "87vh", overflow: "auto" }}
            title={
               <Row>
                  <Col span={6}>
                     <Select showSearch style={{ width: "100%" }} options={reportTypeList} size="small" onChange={onChange} />
                  </Col>
                  <Col span={18}>
                     <Row>
                        <Col span={24}>
                           <RenderIf renderIf={selectedReportType.label}>
                              <Space style={{ paddingLeft: "20px" }} size="large">
                                 <div>
                                    <u>Name:</u>&nbsp; {selectedReportType?.label}
                                 </div>
                                 <div>
                                    <u>Descriptions:</u>&nbsp; {selectedReportType?.description}
                                 </div>
                                 <div>
                                    <u>BaseObject:</u>&nbsp; {selectedReportType?.baseObject}
                                 </div>
                                 {selectedReportType?.join?.relationship ? (
                                    <div>
                                       <u>Second Object:</u>&nbsp; {selectedReportType?.join?.relationship}
                                    </div>
                                 ) : (
                                    ""
                                 )}
                                 {selectedReportType?.join?.join?.relationship ? (
                                    <div>
                                       <u>Third Object:</u>&nbsp; {selectedReportType?.join?.join?.relationship}
                                    </div>
                                 ) : (
                                    ""
                                 )}
                                 {selectedReportType?.join?.join?.join?.relationship ? (
                                    <div>
                                       <u>Fourth Object:</u>&nbsp; {selectedReportType?.join?.join?.join?.relationship}
                                    </div>
                                 ) : (
                                    ""
                                 )}
                              </Space>
                           </RenderIf>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            }
            extra={
               <Space>
                  <Button icon={<SaveOutlined />} onClick={onSave} size="small">
                     Save
                  </Button>
               </Space>
            }
         >
            <RenderIf renderIf={selectedReportType.label}>
               <ReportTypeFieldView />
            </RenderIf>
         </Card>
      </>
   );
};

export default ReportTypeView;
