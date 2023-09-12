import { CodeOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

import { apexClassPermissionsCompareAtom, loginInfoAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { handleComparision, handleLoad } from "./ApexClassPermissionView.util";
import GetPermissionApexClassCompareView from "./GetPermissionApexClassCompareView";
import "./style.css";
interface IApexClassPermissionViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const ApexClassPermissionView: React.FC<IApexClassPermissionViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [apexPermissions] = useRecoilState(apexClassPermissionsCompareAtom);
  const [keys, setKeys] = React.useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(apexPermissions);
      setKeys(response);
    };
    onload();
  }, [apexPermissions]);
  return (
    <Card
      bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      title={
        <Space>
          <CodeOutlined rev={undefined} />
          Apex Class Permissions
          <Input
            size="small"
            placeholder="Apex Class Name"
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
      <RenderIf renderIf={keys.length > 0}>
        <table className="styled-table">
          <thead>
            <tr>
              <th rowSpan={2}>Apex Class Name</th>
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
            <tr>
              <th style={{ borderLeft: "2px black solid" }}>Enabled</th>
              <th
                style={{
                  borderLeft: "2px black solid",
                  borderRight: "2px black solid",
                }}
              >
                Enabled
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
                  ? handleComparision(apexPermissions, key)
                  : !handleComparision(apexPermissions, key);
              })
              .map((key) => {
                return (
                  <tr
                    key={key}
                    style={{
                      color: handleComparision(apexPermissions, key) ? "green" : "#BF0000",
                    }}
                  >
                    <td>{key}</td>
                    <td style={{ borderLeft: "2px black solid" }}>
                      <GetPermissionApexClassCompareView prof="A" k={key} />
                    </td>
                    <td
                      style={{
                        borderLeft: "2px black solid",
                        borderRight: "2px black solid",
                      }}
                    >
                      <GetPermissionApexClassCompareView prof="B" k={key} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </RenderIf>
    </Card>
  );
};

export default ApexClassPermissionView;
