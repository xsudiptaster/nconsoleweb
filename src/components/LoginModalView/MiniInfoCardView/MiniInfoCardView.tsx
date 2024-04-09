import { Button, Modal } from "antd";
import React from "react";
import style from "./MiniInfoCardView.module.css";

interface IMiniInfoCardViewProps {
   children?: React.ReactNode;
   appName: string;
   title: string;
   fullDescription: any;
}

const MiniInfoCardView: React.FC<IMiniInfoCardViewProps> = (props) => {
   const { appName, title, fullDescription } = props;
   const [isOpen, setIsOpen] = React.useState(false);
   return (
      <>
         <div className={style.notification}>
            <div className={style.notiglow}></div>
            <div className={style.notiborderglow}></div>
            <div className={style.notititle}>
               <Button
                  type="link"
                  onClick={() => {
                     setIsOpen(true);
                  }}
               >
                  {appName}
               </Button>
            </div>
            <div className={style.notibody}>{title}</div>
         </div>
         <Modal
            centered
            width={1000}
            open={isOpen}
            footer={null}
            onCancel={() => {
               setIsOpen(false);
            }}
         >
            {fullDescription}
         </Modal>
      </>
   );
};

export default MiniInfoCardView;
