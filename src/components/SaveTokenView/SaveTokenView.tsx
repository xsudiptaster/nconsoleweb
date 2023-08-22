import React from "react";
import { handleLoad } from "./SaveTokenView.util";

interface ISaveTokenViewProps {
   children?: React.ReactNode;
}

const SaveTokenView: React.FC<ISaveTokenViewProps> = (props) => {
   React.useEffect(() => {
      const onload = () => {
         handleLoad();
      };
      onload();
   }, []);
   return <></>;
};

export default SaveTokenView;
