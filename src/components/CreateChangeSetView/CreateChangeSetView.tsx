import { App, Button, Divider, Input, Modal, Space } from "antd";

import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom } from "../../atoms/atom";
import DeploymentStatusView from "../../utils/DeploymentStatusView";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import OrgSwitchView from "../../utils/OrgSwitchView";
import RenderIf from "../../utils/RenderIf";
import { getChangeSet, handleCreateChangeSet, handleValidation } from "./CreateChangeSetView.util";

interface ICreateChangeSetViewProps {
   children?: React.ReactNode;
}

const CreateChangeSetView: React.FC<ICreateChangeSetViewProps> = (props) => {
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [open, setOpen] = React.useState(false);
   const [initialMetadataList, setInitialMetadataList] = React.useState<any[]>([]);
   const [changeSetName, setChangeSetName] = React.useState("");
   const [isConfirmed, setIsConfirmed] = React.useState(false);
   const [secondLoginInfo, setSetSecondLoginInfo] = React.useState(loginInfo);
   const [deploymentResult, setDeploymentResult] = React.useState<any>({});
   const [openResult, setOpenResult] = React.useState(false);

   const onExecute = async (selectedMetadatas: any[]) => {
      setLoading(true);
      if (changeSetName === undefined || changeSetName === "") {
         message.error("Please Enter a Change Set Name");
         return;
      }
      let response = await handleCreateChangeSet(selectedMetadatas, initialMetadataList, changeSetName);
      if (response.success) {
         message.success("Change Set Updated!");
         setInitialMetadataList(selectedMetadatas);
      } else {
         message.error("Change Set Update Failed!");
      }
      await onGetChangeSet();
      setLoading(false);
   };

   const onGetChangeSet = async () => {
      if (changeSetName === "") {
         message.error("Please Enter a Change Set Name!!");
         return;
      }
      setLoading(true);
      let response = await getChangeSet(changeSetName);
      if (!response.success) {
         message.error("Invalid Change Set Name!!");
      } else if (response.selectedMetadatas) {
         setInitialMetadataList(response.selectedMetadatas);
         setIsConfirmed(true);
      }
      setLoading(false);
   };
   const onValidate = async () => {
      setOpen(false);
      setLoading(true);
      let response = await handleValidation(initialMetadataList, secondLoginInfo);
      setDeploymentResult(response);
      setOpenResult(true);
      if (response.success) {
         message.success("The Validation Was Successfull !!");
      } else {
         message.error("The Validation Failed !!");
      }
      setLoading(false);
   };
   return (
      <>
         <Divider>
            <Space>
               <Input
                  placeholder="Enter Change Set Name"
                  style={{ minWidth: "300px" }}
                  disabled={isConfirmed}
                  size="small"
                  onChange={(event) => {
                     setChangeSetName(event?.target.value.replaceAll(" ", ""));
                  }}
               />
               <RenderIf renderIf={!isConfirmed}>
                  <Button size="small" onClick={onGetChangeSet}>
                     Confirm
                  </Button>
               </RenderIf>
               <RenderIf renderIf={isConfirmed}>
                  <Space>
                     <Button
                        size="small"
                        onClick={() => {
                           setIsConfirmed(false);
                        }}
                     >
                        Change
                     </Button>
                     <Button
                        size="small"
                        onClick={() => {
                           setOpen(true);
                        }}
                     >
                        Validate
                     </Button>
                  </Space>
               </RenderIf>
               <RenderIf renderIf={deploymentResult?.status !== undefined}>
                  <Button
                     size="small"
                     onClick={() => {
                        setOpenResult(true);
                     }}
                  >
                     Show Previous Result
                  </Button>
               </RenderIf>
            </Space>
         </Divider>
         <RenderIf renderIf={isConfirmed}>
            <DisplaySelectMetadataView execute={onExecute} preSelectedMetadatas={initialMetadataList} />
         </RenderIf>
         <Modal
            open={open}
            onOk={onValidate}
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

export default CreateChangeSetView;
