import { Button, Card, Divider } from "antd";
import React from "react";
import "../../nconsoleimg_edge.png";
import style from "./LoginModalView.module.css";
import { handleLoad, handleProdLogin, handleTestLogin } from "./LoginModalView.util";
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
         <div
            style={{
               backgroundImage: "../../nconsoleimg_edge.png",
            }}
         >
            <div className={style.logindiv}>
               <Card
                  className={style.logincard}
                  title={<div style={{ textAlign: "center" }}>Login</div>}
                  style={{ width: "500px" }}
               >
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleProdLogin(state);
                     }}
                  >
                     Production
                  </Button>
                  <Divider />
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleTestLogin(state);
                     }}
                  >
                     Sandbox
                  </Button>
               </Card>
            </div>
            <div className={style.footerDiv}></div>
         </div>
         <br />
      </>
   );
};

export default LoginModalView;
