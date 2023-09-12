import { UserAddOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { handleComparision, handleLoad } from "./UserPermissionCompareView.util";

import { loginInfoAtom, userPermissionsCompareAtom } from "../../../atoms/atom";
import GetPermissionsUserCompareView from "./GetPermissionsUserCompareView";
import "./styles.css";

interface IUserPermissionCompareViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const UserPermissionCompareView: React.FC<IUserPermissionCompareViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [userPermissions] = useRecoilState(userPermissionsCompareAtom);
  const [keys, setKeys] = React.useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [searchString, setSearchString] = React.useState("");

  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(userPermissions);
      setKeys(response);
    };
    onload();
  }, [userPermissions]);

  return (
    <Card
      bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      title={
        <Space size="small">
          <UserAddOutlined rev={undefined} />
          User Permissions
          <Input
            size="small"
            placeholder="Permission Name"
            value={searchString}
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
            <th>Permission Name</th>
            <th style={{ borderLeft: "2px black solid" }}>
              {firstOption.fullName} ({loginInfo?.username})
            </th>
            <th
              style={{
                borderLeft: "2px black solid",
                borderRight: "2px black solid",
              }}
            >
              {secondOption.fullName} ({secondLoginInfo?.username})
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
                ? handleComparision(userPermissions, key)
                : !handleComparision(userPermissions, key);
            })
            .map((key) => {
              return (
                <tr
                  key={key}
                  style={{
                    color: handleComparision(userPermissions, key) ? "green" : "#BF0000",
                  }}
                >
                  <td>{key}</td>
                  <td style={{ borderLeft: "2px black solid" }}>
                    <GetPermissionsUserCompareView prof="A" perm={key} />
                  </td>
                  <td
                    style={{
                      borderLeft: "2px black solid",
                      borderRight: "2px black solid",
                    }}
                  >
                    <GetPermissionsUserCompareView prof="B" perm={key} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Card>
  );
};

export default UserPermissionCompareView;
