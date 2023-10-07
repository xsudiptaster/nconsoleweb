import React from "react";
import style from "./MiniInfoCardView.module.css";

interface IMiniInfoCardViewProps {
   children?: React.ReactNode;
   appName: string;
   title: string;
}

const MiniInfoCardView: React.FC<IMiniInfoCardViewProps> = (props) => {
   const { appName, title } = props;
   return (
      <>
         <div className={style.notification}>
            <div className={style.notiglow}></div>
            <div className={style.notiborderglow}></div>
            <div className={style.notititle}>{appName}</div>
            <div className={style.notibody}>{title}</div>
         </div>
      </>
   );
};

export default MiniInfoCardView;
