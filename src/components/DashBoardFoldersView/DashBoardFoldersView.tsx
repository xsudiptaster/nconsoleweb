import { CloseCircleOutlined }                                           from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, Switch }                  from "antd";
import DirectoryTree                                                     from "antd/es/tree/DirectoryTree";
import React                                                             from "react";
import { useRecoilState }                                                from "recoil";
import { dashboardFolderNodeAtom, dashboardFolderTreeAtom, loadingAtom } from "../../atoms/atom";
import RenderIf                                                          from "../../utils/RenderIf";
import { addNode, handleLoad }                                           from "./DashBoardFoldersView.util";
import DashboardTreeNodeView                                             from "./DashboardTreeNodeView";

interface IDashBoardFoldersViewProps {
  children?: React.ReactNode;
}

const DashBoardFoldersView: React.FC<IDashBoardFoldersViewProps> = (props) => {
  const [treeData, setTreeData] = useRecoilState(dashboardFolderTreeAtom);
  const [, setLoading] = useRecoilState(loadingAtom);
  const [nodeMove, setNodeMove] = useRecoilState(dashboardFolderNodeAtom);
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
    <>
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                return <DashboardTreeNodeView nodeData={nodeData} searchString={searchString} />;
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
                onRightClick={({ event, node }: any) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            </RenderIf>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashBoardFoldersView;
