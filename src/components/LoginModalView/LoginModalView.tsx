import { Button, Modal, Space } from "antd";
import React from "react";
import { handleProdLogin, handleTestLogin } from "./LoginModalView.util";
import "./style.css";
interface ILoginModalViewProps {
   children?: React.ReactNode;
}

const LoginModalView: React.FC<ILoginModalViewProps> = (props) => {
   return (
      <>
         <Modal
            className="modalGlass"
            open={true}
            footer={null}
            closable={false}
            title={<div style={{ textAlign: "center" }}>Login</div>}
         >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
               <Button block size="large" onClick={handleProdLogin}>
                  Production
               </Button>
               <Button block size="large" onClick={handleTestLogin}>
                  Sandbox
               </Button>
            </Space>
         </Modal>
      </>
   );
};

export default LoginModalView;
