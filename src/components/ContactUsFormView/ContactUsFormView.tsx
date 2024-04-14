import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Result, Spin, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import RenderIf from "../../utils/RenderIf";
import { getBase64, handleApi } from "../../utils/utils";

interface IContactUsFormViewProps {
   children?: React.ReactNode;
}

const ContactUsFormView: React.FC<IContactUsFormViewProps> = (props) => {
   const [form] = Form.useForm();
   const [sentEmail, setSetEmail] = React.useState(false);
   const [fileList, setFileList] = React.useState<any>({});
   const [sendEmailStarted, setSendEmailStarted] = React.useState(false);
   const onSendEmail = async (values: any) => {
      setSendEmailStarted(true);
      let attachments: any[] = [];
      for (let key in fileList) {
         attachments.push({ filename: fileList[key].name, content: fileList[key].content.split(",")[1], encoding: "base64" });
      }
      await handleApi("sendEmail", {
         email: form.getFieldValue("email"),
         body: form.getFieldValue("body"),
         attachments: attachments,
      });
      setSetEmail(true);
   };
   const normFile = (e: any) => {
      if (Array.isArray(e)) {
         return e;
      }
      return e?.fileList;
   };
   const onChange = async (event: any) => {
      let tempfileList: any = { ...fileList };
      for (let i = 0; i < event.fileList.length; i++) {
         let file = event.fileList[i];
         if (tempfileList[file.uid] === undefined) {
            tempfileList[file.uid] = { uid: file.uid, name: file.name, content: await getBase64(file.originFileObj) };
         }
      }
      setFileList(tempfileList);
   };
   return (
      <>
         <Divider>Report Problem</Divider>
         <RenderIf renderIf={!sentEmail}>
            <Spin spinning={sendEmailStarted}>
               <Form
                  labelCol={{ span: 5 }}
                  layout="horizontal"
                  size="small"
                  form={form}
                  onFinish={onSendEmail}
                  style={{ height: "300px" }}
               >
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                     <Input type="email" />
                  </Form.Item>
                  <Form.Item label="Body" required name="body">
                     <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item label="Error Img" valuePropName="fileList" getValueFromEvent={normFile}>
                     <Upload
                        hasControlInside={false}
                        listType="picture-card"
                        accept=".jpg,.png,.jpeg"
                        beforeUpload={() => {
                           return false;
                        }}
                        onChange={onChange}
                     >
                        <div>
                           <PlusOutlined />
                           <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                     </Upload>
                  </Form.Item>
                  <Form.Item style={{ float: "right" }}>
                     <Button htmlType="submit" size="small">
                        Send Email
                     </Button>
                  </Form.Item>
               </Form>
            </Spin>
         </RenderIf>
         <RenderIf renderIf={sentEmail}>
            <Result status="success" title="Successfully Reported Issue!!" />
         </RenderIf>
      </>
   );
};

export default ContactUsFormView;
