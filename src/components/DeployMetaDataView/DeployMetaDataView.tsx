import { App, Divider, Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom } from "../../atoms/atom";
import DeploymentStatusView from "../../utils/DeploymentStatusView";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import OrgSwitchView from "../../utils/OrgSwitchView";
import { handleDeploy } from "./DeployMetaDataView.util";

interface IDeployMetaDataViewProps {
   children?: React.ReactNode;
}

const DeployMetaDataView: React.FC<IDeployMetaDataViewProps> = (props) => {
   const { message } = App.useApp();
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [secondLoginInfo, setSetSecondLoginInfo] = React.useState(loginInfo);
   const [open, setOpen] = React.useState(false);
   const [metadataList, setMetadataList] = React.useState<any[]>([]);
   const [deploymentResult, setDeploymentResult] = React.useState({});
   const [openResult, setOpenResult] = React.useState(false);
   const execute = async (selectedMetadata: any[]) => {
      setMetadataList(selectedMetadata);
      setOpen(true);
   };
   const deploy = async () => {
      setOpen(false);
      setLoading(true);
      let response = await handleDeploy(metadataList, secondLoginInfo);
      setDeploymentResult(response);
      setOpenResult(true);
      if (response.success) {
         message.success("Deployment Successfull");
      } else {
         message.error("Deployment Failed");
      }
      setLoading(false);
      return response.success;
   };
   return (
      <>
         <Divider>Deploy Metadata</Divider>
         <DisplaySelectMetadataView execute={execute} preSelectedMetadatas={[]} />
         <Modal
            open={open}
            title="Deploy Changes"
            onOk={deploy}
            onCancel={() => {
               setOpen(false);
            }}
         >
            <OrgSwitchView
               defaultUserName={secondLoginInfo.username}
               onConfirm={(value: any) => {
                  setSetSecondLoginInfo(value);
               }}
            />
         </Modal>
         <DeploymentStatusView displayResult={deploymentResult} open={openResult} setOpen={setOpenResult} />
      </>
   );
};

export default DeployMetaDataView;
