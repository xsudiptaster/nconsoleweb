import { FieldBinaryOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Select, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { fieldPermissionsCompareAtom, loginInfoAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { handleComparisionFieldLevel, handleLoad } from "./FieldPermissionCompareView.util";
import "./style.css";
import GetPermissionsFieldCompareView from "./GetPermissionsFieldCompareView";
interface IFieldPermissionCompareViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const FieldPermissionCompareView: React.FC<IFieldPermissionCompareViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [fieldPermissions] = useRecoilState(fieldPermissionsCompareAtom);
  const [keys, setKeys] = React.useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [selectedObjects, setSelectedObjects] = React.useState<string[]>([]);
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(fieldPermissions);
      setKeys(response);
    };
    onload();
  }, [fieldPermissions]);
  return (
    <Card
      size="small"
      bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      title={
        <Space>
          <FieldBinaryOutlined rev={undefined} />
          Field Permissions
          <Select
            mode="multiple"
            size="small"
            allowClear
            style={{ minWidth: "20vw" }}
            value={selectedObjects}
            placeholder="Please select Object"
            onChange={(values) => {
              setSelectedObjects(values);
            }}
            options={keys.map((key) => {
              return {
                label: key.objectName,
                value: key.objectName,
              };
            })}
          />
          <Input
            size="small"
            placeholder="Field Name"
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
        </Space>
      }
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
      <RenderIf renderIf={keys.length > 0 && selectedObjects.length > 0}>
        <table className="styled-table">
          <thead>
            <tr>
              <th rowSpan={2}>Field Name</th>
              <th
                colSpan={2}
                style={{
                  borderLeft: "2px black solid",
                }}
              >
                {firstOption?.fullName} ({loginInfo?.username})
              </th>
              <th
                style={{
                  borderLeft: "2px black solid",
                  borderRight: "2px black solid",
                }}
                colSpan={2}
              >
                {secondOption.fullName} ({secondLoginInfo?.username})
              </th>
            </tr>
            <tr>
              <th
                style={{
                  borderLeft: "2px black solid",
                }}
              >
                Read
              </th>
              <th>Edit</th>
              <th
                style={{
                  borderLeft: "2px black solid",
                }}
              >
                Read
              </th>
              <th
                style={{
                  borderRight: "2px black solid",
                }}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {keys
              .filter((key) => {
                return selectedObjects.includes(key.objectName);
              })
              .map((key) => {
                return (
                  <React.Fragment key={key.objectName}>
                    <tr
                      style={{
                        backgroundColor: "#000000",
                        position: "sticky",
                        top: "40px",
                        zIndex: "2",
                      }}
                    >
                      <td style={{ textAlign: "center", alignItems: "center" }} colSpan={6}>
                        {key.objectName}
                      </td>
                    </tr>
                    {key.fields
                      .filter((f: string) => {
                        return searchString === undefined || searchString === ""
                          ? true
                          : f.toLowerCase().includes(searchString.toLowerCase());
                      })
                      .filter((f: string) => {
                        return selectedFilter === "All"
                          ? true
                          : selectedFilter === "Same"
                          ? handleComparisionFieldLevel(fieldPermissions, key.objectName, f)
                          : !handleComparisionFieldLevel(fieldPermissions, key.objectName, f);
                      })
                      .map((f: any) => {
                        return (
                          <tr
                            key={f}
                            style={{
                              color: handleComparisionFieldLevel(fieldPermissions, key.objectName, f) ? "green" : "#BF0000",
                            }}
                          >
                            <td>{f}</td>
                            <td
                              style={{
                                borderLeft: "2px black solid",
                              }}
                            >
                              <GetPermissionsFieldCompareView perm="readable" prof="A" obj={key.objectName} field={f} />
                            </td>
                            <td>
                              <GetPermissionsFieldCompareView perm="editable" prof="A" obj={key.objectName} field={f} />
                            </td>
                            <td
                              style={{
                                borderLeft: "2px black solid",
                              }}
                            >
                              <GetPermissionsFieldCompareView perm="readable" prof="B" obj={key.objectName} field={f} />
                            </td>
                            <td
                              style={{
                                borderRight: "2px black solid",
                              }}
                            >
                              <GetPermissionsFieldCompareView perm="editable" prof="B" obj={key.objectName} field={f} />
                            </td>
                          </tr>
                        );
                      })}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </RenderIf>
    </Card>
  );
};

export default FieldPermissionCompareView;
