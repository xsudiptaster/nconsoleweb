import { CloseOutlined, RiseOutlined, SaveOutlined } from "@ant-design/icons";
import { App, Badge, Button, Input, Popover, Space } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useRecoilState } from "recoil";
import { dashboardFolderTreeAtom, loadingAtom } from "../../../atoms/atom";
import { countFinder } from "../../ReportFoldersView/ReportFoldersView.util";
import ContextMenuView from "./ContextMenuView";
import { saveNodeUpdate } from "./DashboardTreeNodeView.util";

interface IDashboardTreeNodeViewProps {
  children?: React.ReactNode;
  nodeData: any;
  searchString: string;
}

const DashboardTreeNodeView: React.FC<IDashboardTreeNodeViewProps> = (props) => {
  const { nodeData, searchString } = props;
  const { message } = App.useApp();
  const [, setLoading] = useRecoilState(loadingAtom);
  const [treeData, setTreeData] = useRecoilState(dashboardFolderTreeAtom);
  const [edit, setEdit] = React.useState(false);
  const [updateLabel, setUpdateLabel] = React.useState(nodeData.title);
  const onSaveClick = async () => {
    setLoading(true);
    let response: any = await saveNodeUpdate(treeData, nodeData, updateLabel);
    if (response.success) {
      message.success("Saved Successfully");
      setTreeData(response.treeNodes);
      setEdit(false);
    } else {
      message.error(response.error);
      setUpdateLabel(nodeData.title);
    }
    setLoading(false);
  };
  const count = React.useMemo(() => countFinder([nodeData], searchString), [nodeData, searchString]);
  return (
    <>
      <Popover
        content={<ContextMenuView nodeData={nodeData} />}
        title={
          <>
            <> {(nodeData.isLeaf ? "Dashboard" : "Folder") + " - " + nodeData.title}</>
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

export default DashboardTreeNodeView;
