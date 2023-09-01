import { Progress } from "antd";
import React from "react";
import RenderIf from "../../utils/RenderIf";

interface IStatusModalViewProps {
   children?: React.ReactNode;
}

const StatusModalView: React.FC<IStatusModalViewProps> = (props) => {
   const [total, setTotal] = React.useState(0);
   const [current, setCurrent] = React.useState(0);
   const handleStateUpdate = (event: any) => {
      setCurrent(event.data.current);
      setTotal(event.data.total);
   };
   React.useEffect(() => {
      window.addEventListener("message", handleStateUpdate);
      return () => {
         window.removeEventListener("message", handleStateUpdate);
         setTotal(0);
      };
   }, []);
   return (
      <>
         <RenderIf renderIf={total === 0}>Loading.....</RenderIf>
         <RenderIf renderIf={total !== 0 && current !== 0}>
            <Progress type="circle" percent={Math.round((current / total) * 100)} />
         </RenderIf>
      </>
   );
};

export default StatusModalView;
