import { CopyOutlined, DeleteOutlined, ScissorOutlined } from "@ant-design/icons";
import { App, Button, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportFolderNodeAtom, reportFolderTreeAtom } from "../../../../atoms/atom";
import RenderIf from "../../../../utils/RenderIf";
import { removeNode } from "../../ReportFoldersView.util";
import { handleReportDelete } from "./ContextMenuReportView.util";

interface IContextMenuReportViewProps {
   children?: React.ReactNode;
   nodeData: any;
}

const ContextMenuReportView: React.FC<IContextMenuReportViewProps> = (props) => {
   const { nodeData } = props;
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);

   const [nodeMove, setNodeMove] = useRecoilState(reportFolderNodeAtom);
   const [treeData, setTreeData] = useRecoilState(reportFolderTreeAtom);

   const onCut = () => {
      let response = removeNode(treeData, nodeData);
      setTreeData(response);
      setNodeMove({
         method: "cut",
         node: nodeData,
      });
   };
   const onCopy = () => {
      setNodeMove({
         method: "copy",
         node: nodeData,
      });
   };
   const onDelete = async () => {
      setLoading(true);
      let response = await handleReportDelete(treeData, nodeData);
      if (!response.success) {
         message.error(response.error);
      } else {
         setTreeData(response.treeNodes);
         message.success("Successfully Completed");
      }
      setLoading(false);
   };
   return (
      <Space size="small">
         <RenderIf renderIf={!nodeMove.method}>
            <Button
               size="small"
               type="link"
               icon={<ScissorOutlined />}
               onClick={(e) => {
                  e.stopPropagation();
                  onCut();
               }}
            >
               Cut
            </Button>
            <Button
               size="small"
               type="link"
               icon={<CopyOutlined />}
               onClick={(e) => {
                  e.stopPropagation();
                  onCopy();
               }}
            >
               Copy
            </Button>
         </RenderIf>
         <Button
            size="small"
            type="link"
            icon={<DeleteOutlined />}
            onClick={(e) => {
               e.stopPropagation();
               onDelete();
            }}
         >
            Delete
         </Button>
      </Space>
   );
};

export default ContextMenuReportView;
