import { App, Divider, Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom } from "../../atoms/atom";
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
   const execute = async (selectedMetadata: any[]) => {
      setMetadataList(selectedMetadata);
      setOpen(true);
   };
   const deploy = async () => {
      setOpen(false);
      setLoading(true);
      let response = await handleDeploy(metadataList, secondLoginInfo);
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
         <DisplaySelectMetadataView execute={execute} />
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
      </>
   );
};

export default DeployMetaDataView;
