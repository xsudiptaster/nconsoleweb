import { Button, Divider, Form, Input, Result } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import RenderIf from "../../utils/RenderIf";
import { handleApi } from "../../utils/utils";

interface IContactUsFormViewProps {
   children?: React.ReactNode;
}

const ContactUsFormView: React.FC<IContactUsFormViewProps> = (props) => {
   const [form] = Form.useForm();
   const [sentEmail, setSetEmail] = React.useState(false);
   const onSendEmail = async () => {
      console.log(form.getFieldValue("email"));
      let response = await handleApi("sendEmail", {
         email: form.getFieldValue("email"),
         body: form.getFieldValue("body"),
      });
      setSetEmail(true);
   };
   return (
      <>
         <Divider>Report Problem</Divider>
         <RenderIf renderIf={!sentEmail}>
            <Form
               labelCol={{ span: 4 }}
               layout="horizontal"
               size="small"
               form={form}
               onFinish={onSendEmail}
               style={{ height: "200px" }}
            >
               <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                  <Input type="email" />
               </Form.Item>
               <Form.Item label="Body" required name="body">
                  <TextArea rows={4} />
               </Form.Item>
               <Form.Item style={{ float: "right" }}>
                  <Button htmlType="submit" size="small">
                     Send Email
                  </Button>
               </Form.Item>
            </Form>
         </RenderIf>
         <RenderIf renderIf={sentEmail}>
            <Result status="success" title="Successfully Reported Issue!!" />
         </RenderIf>
      </>
   );
};

export default ContactUsFormView;
