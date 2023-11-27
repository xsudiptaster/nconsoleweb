import { UploadOutlined } from "@ant-design/icons";
import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core";
import { Button, Card, Input, List, Space, Upload } from "antd";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import { readFileAsBuffer } from "../../utils/utils";

interface IFileReaderViewProps {
   children?: React.ReactNode;
}

const FileReaderView: React.FC<IFileReaderViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [passage, setPassage] = React.useState("");
   const [question, setQuestion] = React.useState("");
   const [answers, setAnswers] = React.useState<any>([]);
   const onUpload = async (file: any) => {
      let arrayData: any = await readFileAsBuffer(file);
      var zip = new PizZip(arrayData);
      var doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      var text = doc.getFullText();
      setPassage(text);
      return false;
   };
   const getAnswers = async () => {
      setLoading(true);
      const model = await qna.load();
      // Finding the answers
      const ans = await model.findAnswers(question, passage);
      let objextAns: any = {};
      objextAns.id = "q" + new Date().getTime();
      objextAns.question = question;
      objextAns.answers = ans;
      let tempAnswers = [...answers];
      tempAnswers.push(objextAns);
      setAnswers(tempAnswers);
      setLoading(false);
   };
   return (
      <>
         <Card size="small">
            <Space>
               <Upload beforeUpload={onUpload} accept=".docx">
                  <Button icon={<UploadOutlined />} size="small">
                     Upload Sheet
                  </Button>
               </Upload>
               <Space>
                  <Input
                     placeholder="Enter Your Questions"
                     size="small"
                     width={300}
                     style={{ width: "100%" }}
                     onChange={(event) => {
                        setQuestion(event.target.value);
                     }}
                  />
                  <Button size="small" onClick={getAnswers}>
                     Send
                  </Button>
               </Space>
            </Space>
            <br />
            <div style={{ maxHeight: "300px", overflow: "auto" }}>{passage}</div>
            <br />
            {answers.map((q: any) => {
               return (
                  <div key={q.id}>
                     <List
                        size="small"
                        header={<div>{q.question}</div>}
                        bordered
                        dataSource={q.answers}
                        renderItem={(item: any) => <List.Item>{item?.text}</List.Item>}
                     />
                  </div>
               );
            })}
         </Card>
      </>
   );
};

export default FileReaderView;
