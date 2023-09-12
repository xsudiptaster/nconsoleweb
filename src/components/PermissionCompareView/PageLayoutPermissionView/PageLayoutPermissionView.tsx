import { FieldBinaryOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

import { loginInfoAtom, pagelayoutPermissionCompareAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { handleLoad, handlePageLayoutComparision } from "./PageLayoutPermissionView.util";

interface IPageLayoutPernissionViewProps {
  firstOption: any;
  secondOption: any;
  secondLoginInfo: any;
}

const PageLayoutPermissionView: React.FC<IPageLayoutPernissionViewProps> = (props) => {
  const { firstOption, secondOption, secondLoginInfo } = props;
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [pageLayoutPermissions] = useRecoilState(pagelayoutPermissionCompareAtom);
  const [keys, setKeys] = React.useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = () => {
      let response = handleLoad(pageLayoutPermissions);
      setKeys(response);
    };
    onload();
  }, [pageLayoutPermissions]);
  const GetPermission = ({ prof, objectName, recordType }: any) => {
    if (
      pageLayoutPermissions[prof] &&
      pageLayoutPermissions[prof][objectName] &&
      pageLayoutPermissions[prof][objectName][recordType] &&
      pageLayoutPermissions[prof][objectName][recordType].layout
    ) {
      return pageLayoutPermissions[prof][objectName][recordType].layout;
    }
    return "No Assignment";
  };
  return (
    <>
      <Card
        size="small"
        bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
        title={
          <Space>
            <FieldBinaryOutlined rev={undefined} />
            Page Layout Assignment
            <Input
              size="small"
              placeholder="Record Type Name"
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
        <RenderIf renderIf={keys.length > 0}>
          <table className="styled-table">
            <thead>
              <tr>
                <th rowSpan={2}>Field Name</th>
                <th
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
                  Assigned
                </th>

                <th
                  style={{
                    borderLeft: "2px black solid",
                    borderRight: "2px black solid",
                  }}
                >
                  Assigned
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
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
                          ? handlePageLayoutComparision(pageLayoutPermissions, key.objectName, f)
                          : !handlePageLayoutComparision(pageLayoutPermissions, key.objectName, f);
                      })
                      .map((f: any) => {
                        return (
                          <tr
                            key={f}
                            style={{
                              color: handlePageLayoutComparision(pageLayoutPermissions, key.objectName, f) ? "green" : "#BF0000",
                            }}
                          >
                            <td>{f}</td>
                            <td
                              style={{
                                borderLeft: "2px black solid",
                              }}
                            >
                              <GetPermission prof={"A"} objectName={key.objectName} recordType={f} />
                            </td>

                            <td
                              style={{
                                borderLeft: "2px black solid",
                                borderRight: "2px black solid",
                              }}
                            >
                              <GetPermission prof={"B"} objectName={key.objectName} recordType={f} />
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
    </>
  );
};

export default PageLayoutPermissionView;
