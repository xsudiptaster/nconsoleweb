import React from "react";
import { useRecoilState } from "recoil";
import { loginInfoAtom } from "../../atoms/atom";
import { handleLoad } from "./SaveTokenView.util";
interface ISaveTokenViewProps {
   children?: React.ReactNode;
}

const SaveTokenView: React.FC<ISaveTokenViewProps> = (props) => {
   const [, setLoginInfo] = useRecoilState(loginInfoAtom);
   const [load, setLoad] = React.useState(true);
   React.useEffect(() => {
      const onload = async () => {
         if (load) {
            let response = await handleLoad();
            setLoad(false);
            if (response.state === "initial") {
               setLoginInfo(response);
               window.open("/home", "_top");
            } else {
               window.close();
            }
         }
      };
      onload();
   }, [load, setLoginInfo]);
   return <></>;
};

export default SaveTokenView;
