import { CopyOutlined, UploadOutlined } from "@ant-design/icons";
import { App, Button, Card, Input, Space, Tabs, Upload } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { isQueryValid } from "soql-parser-js";
import { loadingAtom } from "../../atoms/atom";
import DisplayExcelSheetView from "../../utils/DisplayExcelSheetView";
import RenderIf from "../../utils/RenderIf";
import { readFileData } from "../../utils/utils";
import { handleQuery } from "./QuerySheetView.util";

interface IQuerySheetViewProps {
   children?: React.ReactNode;
}

const QuerySheetView: React.FC<IQuerySheetViewProps> = (props) => {
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);

   const [jsonData, setJsonData] = React.useState<any[]>([]);
   const [query, setQuery] = React.useState("");
   const [result, setResult] = React.useState([]);
   const onUpload = async (file: any) => {
      let response = await readFileData(file);
      setJsonData(response);
      return false;
   };
   const onCopy = (value: string) => {
      navigator.clipboard.writeText(value);
      message.info("Copied!");
   };
   const onExecute = async () => {
      if (!isQueryValid(query)) {
         message.error("Please Enter a Valid Query!!");
         return;
      }
      if (jsonData.length === 0) {
         message.error("Please enter a Spread Sheet!!");
         return;
      }
      setLoading(true);
      let response: any = await handleQuery(query, jsonData);
      if (response.success) {
         setResult(response.data);
         message.success("Query Completed!!");
      } else {
         message.error(response.error);
      }
      setLoading(false);
   };
   return (
      <Card
         title={
            <Upload beforeUpload={onUpload} accept=".xlsx,.xls,.xlsb">
               <Button icon={<UploadOutlined />} size="small">
                  Upload Sheet
               </Button>
            </Upload>
         }
         extra={
            <Space>
               <RenderIf renderIf={jsonData.length > 0}>
                  {jsonData.length > 0
                     ? Object.keys(jsonData[0]).map((key) => {
                          return (
                             <Button
                                icon={<CopyOutlined />}
                                size="small"
                                type="link"
                                key={key}
                                onClick={() => {
                                   onCopy(("pv_" + key).replaceAll(" ", ""));
                                }}
                             >
                                {("pv_" + key).replaceAll(" ", "")}
                             </Button>
                          );
                       })
                     : ""}
               </RenderIf>
            </Space>
         }
      >
         <Space>
            <Input
               placeholder="Write Query : Select id from Account "
               size="small"
               style={{ width: "90vw" }}
               onChange={(e) => {
                  setQuery(e.target.value);
               }}
               addonAfter={
                  <Button size="small" type="text" onClick={onExecute}>
                     Execute
                  </Button>
               }
               bordered
            />
         </Space>
         <RenderIf renderIf={jsonData.length > 0}>
            <Tabs
               defaultActiveKey="1"
               centered
               items={[
                  {
                     label: "Original Data",
                     key: "1",
                     children: <DisplayExcelSheetView data={jsonData} showDownload />,
                  },
                  {
                     label: "Result",
                     key: "2",
                     children: <DisplayExcelSheetView data={result} showDownload />,
                  },
               ]}
            />
         </RenderIf>
      </Card>
   );
};

export default QuerySheetView;
