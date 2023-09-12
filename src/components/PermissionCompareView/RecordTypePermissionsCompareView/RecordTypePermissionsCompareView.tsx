import { TrademarkOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loginInfoAtom, recordTypePermissionsCompareAtom } from "../../../atoms/atom";
import { handleComparision, handleLoad } from "./RecordTypePermissionsCompareView.util";
import "./style.css";
import GetPermissionsRecordTypeCompareView from "./GetPermissionsRecordTypeCompareView";
interface IRecordTypePermissionsCompareViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const RecordTypePermissionsCompareView: React.FC<IRecordTypePermissionsCompareViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [recordTypePermissions] = useRecoilState(recordTypePermissionsCompareAtom);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [keys, setKeys] = React.useState<any[]>([]);
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(recordTypePermissions);

      setKeys(response);
    };
    onload();
  }, [recordTypePermissions]);

  return (
    <Card
      bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      title={
        <Space>
          <TrademarkOutlined rev={undefined} />
          Record Type Permissions
          <Input
            placeholder="Record Type Name"
            size="small"
            value={searchString}
            onChange={(event) => {
              setSearchString(event?.target.value);
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
            <th rowSpan={2}>Report Type Name</th>
            <th colSpan={2} style={{ borderLeft: "2px black solid" }}>
              {firstOption.fullName} ({loginInfo?.username})
            </th>
            <th
              colSpan={2}
              style={{
                borderLeft: "2px black solid",
                borderRight: "2px black solid",
              }}
            >
              {secondOption.fullName} ({secondLoginInfo?.username})
            </th>
          </tr>
          <tr>
            <th style={{ borderLeft: "2px black solid" }}>Visible</th>
            <th>Default</th>
            <th
              style={{
                borderLeft: "2px black solid",
              }}
            >
              Visible
            </th>
            <th style={{ borderRight: "2px black solid" }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => {
            return (
              <React.Fragment key={key.recordTypeName}>
                <tr
                  key={key}
                  style={{
                    backgroundColor: "#000000",
                    position: "sticky",
                    top: "40px",
                    zIndex: "2",
                    borderLeft: "2px black solid",
                    borderRight: "2px black solid",
                  }}
                >
                  <td colSpan={6} style={{ textAlign: "center", alignItems: "center" }}>
                    {key.recordTypeName}
                  </td>
                </tr>
                {key.recordTypes
                  .filter((recordType: string) => {
                    return selectedFilter === "All"
                      ? true
                      : selectedFilter === "Same"
                      ? handleComparision(recordTypePermissions, key.recordTypeName, recordType)
                      : !handleComparision(recordTypePermissions, key.recordTypeName, recordType);
                  })
                  .filter((recordType: string) => {
                    return searchString === undefined && searchString === ""
                      ? true
                      : recordType.toLowerCase().includes(searchString.toLowerCase());
                  })
                  .map((recordType: string) => {
                    return (
                      <tr
                        key={recordType}
                        style={{
                          color: handleComparision(recordTypePermissions, key.recordTypeName, recordType) ? "green" : "#BF0000",
                        }}
                      >
                        <td>{recordType}</td>
                        <td style={{ borderLeft: "2px black solid" }}>
                          <GetPermissionsRecordTypeCompareView prof="A" obj={key.recordTypeName} r={recordType} perm="visible" />
                        </td>
                        <td>
                          <GetPermissionsRecordTypeCompareView prof="A" obj={key.recordTypeName} r={recordType} perm="default" />
                        </td>
                        <td style={{ borderLeft: "2px black solid" }}>
                          <GetPermissionsRecordTypeCompareView prof="B" obj={key.recordTypeName} r={recordType} perm="visible" />
                        </td>
                        <td style={{ borderRight: "2px black solid" }}>
                          <GetPermissionsRecordTypeCompareView prof="B" obj={key.recordTypeName} r={recordType} perm="default" />
                        </td>
                      </tr>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default RecordTypePermissionsCompareView;
