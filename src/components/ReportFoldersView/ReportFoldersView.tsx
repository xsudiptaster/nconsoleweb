import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, Switch } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportFolderNodeAtom, reportFolderTreeAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import { addNode, handleLoad } from "./ReportFoldersView.util";
import ReportTreeNodeView from "./ReportTreeNodeView";

interface IReportFoldersViewProps {
   children?: React.ReactNode;
}

const ReportFoldersView: React.FC<IReportFoldersViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [treeData, setTreeData] = useRecoilState(reportFolderTreeAtom);
   const [nodeMove, setNodeMove] = useRecoilState(reportFolderNodeAtom);
   const [searchString, setSearchString] = React.useState("");
   const [displayMirror, setDisplayMirror] = React.useState(false);
   React.useEffect(() => {
      const onload = async () => {
         setLoading(true);
         let response = await handleLoad();
         setTreeData(response);
         setLoading(false);
      };
      onload();
   }, [setLoading, setTreeData]);
   const onCancelPaste = () => {
      if (nodeMove.method === "cut") {
         let response = addNode(treeData, nodeMove.node.parentId, nodeMove.node);
         setTreeData(response);
      }
      setNodeMove({});
   };
   return (
      <Card
         size="small"
         title={
            <Space size="small" style={{ minWidth: "50vw" }}>
               Report Folders
               <RenderIf renderIf={nodeMove.method}>
                  <Space style={{ paddingLeft: "200px" }}>
                     ClipBoard : &nbsp;&nbsp;{nodeMove?.node?.title}
                     <Button size="small" type="text" icon={<CloseCircleOutlined />} onClick={onCancelPaste}>
                        Clear Clipboard
                     </Button>
                  </Space>
               </RenderIf>
            </Space>
         }
         extra={
            <Space>
               <Switch
                  checkedChildren="Hide Mirror Display"
                  defaultChecked={displayMirror}
                  unCheckedChildren="Show Mirror Display"
                  onChange={setDisplayMirror}
               />
               <Input
                  size="small"
                  placeholder="Search.."
                  onChange={(e) => {
                     setSearchString(e.target.value);
                  }}
               />
            </Space>
         }
      >
         <Row>
            <Col span={12}>
               <DirectoryTree
                  multiple
                  blockNode
                  showLine
                  virtual
                  height={800}
                  treeData={treeData}
                  onRightClick={({ event, node }: any) => {
                     event.preventDefault();
                     event.stopPropagation();
                  }}
                  titleRender={(nodeData) => {
                     return <ReportTreeNodeView nodeData={nodeData} searchString={searchString} />;
                  }}
               />
            </Col>
            <Col span={12}>
               <RenderIf renderIf={displayMirror}>
                  <DirectoryTree
                     multiple
                     blockNode
                     showLine
                     virtual
                     height={800}
                     treeData={treeData}
                     titleRender={(nodeData) => {
                        return <ReportTreeNodeView nodeData={nodeData} searchString={searchString} />;
                     }}
                  />
               </RenderIf>
            </Col>
         </Row>
      </Card>
   );
};

export default ReportFoldersView;
