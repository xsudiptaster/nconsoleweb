import { Modal, Spin } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";

interface ILoadingScreenViewProps {
   children?: React.ReactNode;
}

const LoadingScreenView: React.FC<ILoadingScreenViewProps> = (props) => {
   const [loading] = useRecoilState(loadingAtom);
   return (
      <>
         <Modal
            title={null}
            footer={null}
            open={loading}
            closable={false}
            style={{ opacity: 0, textAlign: "center" }}
            bodyStyle={{ opacity: "100" }}
         >
            <Spin tip="Loading..." size="large" />
         </Modal>
      </>
   );
};

export default LoadingScreenView;
