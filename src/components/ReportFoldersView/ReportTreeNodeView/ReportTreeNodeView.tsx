import { CloseOutlined, RiseOutlined, SaveOutlined } from "@ant-design/icons";
import { App, Badge, Button, Input, Popover, Space } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useRecoilState } from "recoil";
import { reportFolderTreeAtom } from "../../../atoms/atom";
import { countFinder, updateRecord } from "../ReportFoldersView.util";
import ContextMenuView from "./ContextMenuView";

interface IReportTreeNodeViewProps {
   children?: React.ReactNode;
   nodeData: any;
   searchString: string;
}

const ReportTreeNodeView: React.FC<IReportTreeNodeViewProps> = (props) => {
   const { nodeData, searchString } = props;
   const { message } = App.useApp();
   const [treeData, setTreeData] = useRecoilState(reportFolderTreeAtom);

   const [edit, setEdit] = React.useState(false);
   const [updateLabel, setUpdateLabel] = React.useState(nodeData.title);
   const onSaveClick = async () => {
      let response = await updateRecord(treeData, nodeData, updateLabel);
      if (!response.success) {
         message.error(response.error);
      } else {
         setTreeData(response.treeNodes);
         message.success("Successfully Updated");
         setEdit(false);
      }
   };
   const count = React.useMemo(() => countFinder([nodeData], searchString), [nodeData, searchString]);
   return (
      <>
         <Popover
            content={<ContextMenuView nodeData={nodeData} />}
            title={
               <>
                  <> {(nodeData.isLeaf ? "Report" : "Folder") + " - " + nodeData.title}</>
                  <div style={{ float: "right" }}>
                     <Button
                        size="small"
                        type="text"
                        icon={<RiseOutlined />}
                        onClick={() => {
                           window.open(Cookies.get("instance_url") + "/" + nodeData.key);
                        }}
                     >
                        Open
                     </Button>
                  </div>
               </>
            }
            trigger="contextMenu"
            placement="bottomRight"
         >
            <Space
               size="small"
               style={{
                  backgroundColor:
                     searchString !== "" && nodeData.title.toUpperCase().includes(searchString.toUpperCase()) ? "green" : "",
               }}
               onDoubleClick={() => {
                  setEdit(true);
               }}
            >
               {edit ? (
                  <Input
                     size="small"
                     defaultValue={updateLabel}
                     onChange={(e) => {
                        e.stopPropagation();
                        setUpdateLabel(e.target.value);
                     }}
                     addonAfter={
                        <>
                           <Button size="small" type="text" icon={<SaveOutlined />} onClick={onSaveClick} />
                           <Button
                              size="small"
                              type="text"
                              icon={<CloseOutlined />}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setUpdateLabel(nodeData.title);
                                 setEdit(false);
                              }}
                           />
                        </>
                     }
                  />
               ) : (
                  <Badge count={count ? count : 0}>{nodeData.title}</Badge>
               )}
            </Space>
         </Popover>
      </>
   );
};

export default ReportTreeNodeView;
