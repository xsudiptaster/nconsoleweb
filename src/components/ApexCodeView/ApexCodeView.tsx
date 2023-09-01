import { CopyOutlined, UploadOutlined } from "@ant-design/icons";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { App, Button, Card, Col, InputNumber, Radio, Row, Space, Upload } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import DisplayExcelSheetView from "../../utils/DisplayExcelSheetView";
import RenderIf from "../../utils/RenderIf";
import { readFileData } from "../../utils/utils";
import { handleExecute } from "./ApexCodeView.util";

interface IApexCodeViewProps {
   children?: React.ReactNode;
}

const ApexCodeView: React.FC<IApexCodeViewProps> = (props) => {
   const { message } = App.useApp();
   const [runType, setRunType] = React.useState("loop");
   const [, setLoading] = useRecoilState(loadingAtom);
   const [loopCount, setLoopCount] = React.useState<number>(1);
   const [jsonData, setJsonData] = React.useState<any[]>([]);
   const [code, setCode] = React.useState("");
   const onUpload = async (file: any) => {
      let response = await readFileData(file);
      setJsonData(response);
      return false;
   };
   const onCopy = (value: string) => {
      navigator.clipboard.writeText(value);
      message.info("Copied!");
   };
   const executeCode = async () => {
      setLoading(true);
      if (code === "") {
         message.error("Please Enter Some Code!!");
         return;
      }
      if (runType === "sheet" && jsonData.length === 0) {
         message.error("Please select a sheet!!");
         return;
      }
      let response: any = await handleExecute(code, runType, jsonData, loopCount);
      if (response.success) {
         console.log("🚀 ~ file: ApexCodeView.tsx:46 ~ executeCode ~ response:", response.data);
         message.success("Process Completed!!");
         setJsonData(response.data);
      }
      setLoading(false);
   };

   return (
      <Card
         title={
            <Space>
               <div>
                  Run Type
                  <br />
                  <Radio.Group
                     buttonStyle="solid"
                     size="small"
                     onChange={(event) => {
                        setRunType(event.target.value);
                     }}
                     value={runType}
                  >
                     <Radio value={"loop"}>Loop</Radio>
                     <Radio value={"sheet"}>Sheet</Radio>
                  </Radio.Group>
               </div>
               <RenderIf renderIf={runType === "loop"}>
                  Loop Count <br />
                  <InputNumber
                     size="small"
                     min={1}
                     defaultValue={1}
                     onChange={(value: any) => {
                        setLoopCount(value);
                     }}
                  />
               </RenderIf>
               <RenderIf renderIf={runType === "sheet"}>
                  <Upload beforeUpload={onUpload} accept=".xlsx,.xls,.xlsb">
                     <Button icon={<UploadOutlined />} size="small">
                        Upload Sheet
                     </Button>
                  </Upload>
               </RenderIf>
            </Space>
         }
         size="small"
         extra={
            <>
               <Button size="small" onClick={executeCode}>
                  Execute Code
               </Button>
            </>
         }
      >
         <Row gutter={10}>
            <Col span={8} style={{ maxHeight: "80vh", overflow: "auto" }}>
               <Row>
                  {jsonData.length > 0
                     ? Object.keys(jsonData[0]).map((key) => {
                          return (
                             <Col span={3} key={key}>
                                <div style={{ wordBreak: "break-all" }}>{("pv_" + key).replaceAll(" ", "")}</div>
                                <Button
                                   size="small"
                                   type="link"
                                   icon={<CopyOutlined />}
                                   onClick={() => {
                                      onCopy(("pv_" + key).replaceAll(" ", ""));
                                   }}
                                />
                             </Col>
                          );
                       })
                     : ""}
               </Row>
               <CodeMirror value={code} height="75vh" theme={vscodeDark} onChange={setCode} />
            </Col>
            <Col span={16} style={{ maxHeight: "80vh", overflow: "auto" }}>
               <RenderIf renderIf={jsonData.length > 0}>
                  <DisplayExcelSheetView data={jsonData} showDownload />
               </RenderIf>
            </Col>
         </Row>
      </Card>
   );
};

export default ApexCodeView;
