import { Button, Modal, Space } from "antd";
import React from "react";
import "../../nconsoleimg_edge.png";
import { handleLoad, handleProdLogin, handleTestLogin } from "./LoginModalView.util";
import "./style.css";
interface ILoginModalViewProps {
   children?: React.ReactNode;
}

const LoginModalView: React.FC<ILoginModalViewProps> = (props) => {
   const [state, setState] = React.useState<any>("");
   React.useEffect(() => {
      const onload = () => {
         let response = handleLoad();
         setState(response);
      };
      onload();
   }, []);
   return (
      <>
         <div style={{ backgroundImage: "../../nconsoleimg_edge.png" }}>
            <Modal
               className="modalGlass"
               open={true}
               footer={null}
               closable={false}
               title={<div style={{ textAlign: "center" }}>Login</div>}
            >
               <Space direction="vertical" style={{ width: "100%" }} size="large">
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleProdLogin(state);
                     }}
                  >
                     Production
                  </Button>
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleTestLogin(state);
                     }}
                  >
                     Sandbox
                  </Button>
               </Space>
            </Modal>
         </div>
      </>
   );
};

export default LoginModalView;
