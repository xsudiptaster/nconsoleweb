import { FormOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

import { flowPermissionCompareAtom, loginInfoAtom } from "../../../atoms/atom";
import { handleComparision, handleLoad } from "./FlowPermisssionView.util";
import GetPermissionsFlowCompareView from "./GetPermissionsFlowCompareView";

interface IFlowPermissionViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const FlowPermissionView: React.FC<IFlowPermissionViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [flowPermissions] = useRecoilState(flowPermissionCompareAtom);
  const [keys, setKeys] = React.useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(flowPermissions);
      setKeys(response);
    };
    onload();
  }, [flowPermissions]);

  return (
    <Card
      bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      title={
        <Space>
          <FormOutlined rev={undefined} />
          Flow Permissions
          <Input
            size="small"
            placeholder="Search Object"
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
        </Space>
      }
      size="small"
      extra={
        <Space>
          <Radio.Group
            options={["All", "Same", "Diff"]}
            onChange={(event) => {
              setSelectedFilter(event.target.value);
            }}
            value={selectedFilter}
          />
        </Space>
      }
    >
      <table className="styled-table">
        <thead>
          <tr>
            <th>Flow Name</th>
            <th style={{ borderLeft: "2px black solid" }}>
              {firstOption?.fullName} ({loginInfo?.username})
            </th>
            <th
              style={{
                borderLeft: "2px black solid",
                borderRight: "2px black solid",
              }}
            >
              {secondOption?.fullName} ({secondLoginInfo?.username})
            </th>
          </tr>
        </thead>
        <tbody>
          {keys
            .filter((key) => {
              return searchString === undefined || searchString === ""
                ? true
                : key.toLowerCase().includes(searchString.toLowerCase());
            })
            .filter((key) => {
              return selectedFilter === "All"
                ? true
                : selectedFilter === "Same"
                ? handleComparision(flowPermissions, key)
                : !handleComparision(flowPermissions, key);
            })
            .map((key) => {
              return (
                <tr
                  key={key}
                  style={{
                    color: handleComparision(flowPermissions, key) ? "green" : "#BF0000",
                  }}
                >
                  <td>{key}</td>
                  <td style={{ borderLeft: "2px black solid" }}>
                    <GetPermissionsFlowCompareView prof="A" perm={key} />
                  </td>
                  <td
                    style={{
                      borderLeft: "2px black solid",
                      borderRight: "2px black solid",
                    }}
                  >
                    <GetPermissionsFlowCompareView prof="B" perm={key} />
                  </td>
                </tr>
              );
            })}
          <tr></tr>
        </tbody>
      </table>
    </Card>
  );
};

export default FlowPermissionView;
