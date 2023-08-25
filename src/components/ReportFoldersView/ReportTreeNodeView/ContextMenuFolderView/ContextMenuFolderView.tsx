import {
   CloseOutlined,
   CopyOutlined,
   DeleteOutlined,
   DeliveredProcedureOutlined,
   PlusCircleOutlined,
   SaveOutlined,
} from "@ant-design/icons";
import { App, Button, Input, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportFolderNodeAtom, reportFolderTreeAtom } from "../../../../atoms/atom";
import RenderIf from "../../../../utils/RenderIf";
import { addNode } from "../../ReportFoldersView.util";
import { handleDeleteFolder, handleFolderAdd, handlePaste } from "./ContextMenuFolderView.util";

interface IContextMenuFolderViewProps {
   children?: React.ReactNode;
   nodeData: any;
}

const ContextMenuFolderView: React.FC<IContextMenuFolderViewProps> = (props) => {
   const { nodeData } = props;
   const { message } = App.useApp();
   const [treeData, setTreeData] = useRecoilState(reportFolderTreeAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [nodeMove, setNodeMove] = useRecoilState(reportFolderNodeAtom);
   const [add, setAdd] = React.useState(false);
   const [newFolderName, setNewFolderName] = React.useState("");
   const handleResponse = (response: any) => {
      if (!response.success) {
         message.error(response.error);
      } else {
         setTreeData(response.treeNodes);
         setNodeMove({});
         message.success("Successfully Completed");
      }
      setAdd(false);
      setNewFolderName("");
   };
   const onCreateNewFolder = async () => {
      setLoading(true);
      if (newFolderName === "") {
         message.error("Please Enter A Folder Name");
         return;
      }
      let response = await handleFolderAdd(treeData, nodeData.key, newFolderName);
      handleResponse(response);
      setLoading(false);
   };
   const onDeleteFolder = async () => {
      setLoading(true);
      let response = await handleDeleteFolder(treeData, nodeData);
      handleResponse(response);
      setLoading(false);
   };
   const onCancelPaste = () => {
      if (nodeMove.method === "cut") {
         let response = addNode(treeData, nodeMove.node.parentId, nodeMove.node);
         setTreeData(response);
      }
      setNodeMove({});
   };
   const onPaste = async () => {
      setLoading(true);
      let response = await handlePaste(treeData, nodeMove, nodeData.key);
      handleResponse(response);
      setLoading(false);
   };
   const onCopy = () => {
      setNodeMove({
         method: "copy",
         node: nodeData,
      });
   };
   return (
      <>
         <Space size="small">
            <RenderIf renderIf={add}>
               <Input
                  size="small"
                  placeholder="New Folder Name"
                  onChange={(e) => {
                     e.stopPropagation();
                     setNewFolderName(e.target.value);
                  }}
                  addonAfter={
                     <>
                        <Button
                           size="small"
                           icon={<SaveOutlined />}
                           type="text"
                           onClick={(e) => {
                              e.stopPropagation();
                              onCreateNewFolder();
                           }}
                        />
                        <Button
                           size="small"
                           type="text"
                           icon={<CloseOutlined />}
                           onClick={(e) => {
                              e.stopPropagation();
                              setAdd(false);
                           }}
                        />
                     </>
                  }
               />
            </RenderIf>
            <RenderIf renderIf={!add}>
               <Button
                  size="small"
                  type="link"
                  icon={<PlusCircleOutlined />}
                  onClick={(e) => {
                     e.stopPropagation();
                     setAdd(true);
                  }}
               >
                  Folder
               </Button>
               <RenderIf renderIf={!nodeMove.method}>
                  <Button size="small" type="link" icon={<CopyOutlined />} onClick={onCopy}>
                     Copy
                  </Button>
               </RenderIf>
               <RenderIf renderIf={nodeMove.method}>
                  <Button size="small" type="link" icon={<DeliveredProcedureOutlined />} onClick={onPaste}>
                     Paste
                  </Button>
                  <Button
                     size="small"
                     type="link"
                     icon={<DeliveredProcedureOutlined />}
                     onClick={(e) => {
                        e.stopPropagation();
                        onCancelPaste();
                     }}
                  >
                     Cancel Paste
                  </Button>
               </RenderIf>
               <Button
                  size="small"
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                     e.stopPropagation();
                     onDeleteFolder();
                  }}
               >
                  Delete
               </Button>
            </RenderIf>
         </Space>
      </>
   );
};

export default ContextMenuFolderView;
