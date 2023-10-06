import { App, Button, Divider, Input, Modal } from "antd";
import React from "react";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import { handleCreateChangeSet } from "./CreateChangeSetView.util";

interface ICreateChangeSetViewProps {
   children?: React.ReactNode;
}

const CreateChangeSetView: React.FC<ICreateChangeSetViewProps> = (props) => {
   const { message } = App.useApp();
   const [open, setOpen] = React.useState(false);
   const [metadataList, setMetadataList] = React.useState<any[]>([]);
   const [changeSetName, setChangeSetName] = React.useState("");
   const [changeSetDescription, setChangeSetDescription] = React.useState("");
   const onExecute = async (selectedMetadatas: any[]) => {
      setMetadataList(selectedMetadatas);
      setOpen(true);
   };
   const onCreateChangeset = async () => {
      if (changeSetName === undefined || changeSetName === "") {
         message.error("Please Enter a Change Set Name");
         return;
      }
      let response = await handleCreateChangeSet(metadataList, changeSetName, changeSetDescription);
   };
   return (
      <>
         <Divider>Create Change Set</Divider>
         <Input
            placeholder="Change Set Name"
            size="small"
            onChange={(event) => {
               setChangeSetName(event?.target.value.replaceAll(" ", ""));
            }}
         ></Input>
         <Button>Get Change Set</Button>
         <DisplaySelectMetadataView execute={onExecute} />
         <Modal
            open={open}
            title="Deploy Changes"
            onOk={onCreateChangeset}
            onCancel={() => {
               setOpen(false);
            }}
         >
            <Input
               placeholder="Enter Change Set Name"
               size="small"
               onChange={(event) => {
                  setChangeSetName(event?.target.value.replaceAll(" ", ""));
               }}
            />
            <Input
               placeholder="Enter Change Set Description"
               size="small"
               onChange={(event) => {
                  setChangeSetDescription(event?.target.value);
               }}
            />
         </Modal>
      </>
   );
};

export default CreateChangeSetView;
