import { FormOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

import { createCompareMap, handleLoad } from "./ObjectPermissionsCompareView.util";

import { loginInfoAtom, objectPermissionsCompareAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import GetPermissionObjectCompareView from "./GetPermissionObjectCompareView";
import MoveObjectPermissionView from "./MoveObjectPermissionView";
import "./style.css";

interface IObjectPermissionsCompareViewProps {
   firstOption: any;
   secondOption: any;
   secondLoginInfo: any;
}

const ObjectPermissionsCompareView: React.FC<IObjectPermissionsCompareViewProps> = (props) => {
   const { firstOption, secondOption, secondLoginInfo } = props;
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [objectPermissions] = useRecoilState(objectPermissionsCompareAtom);
   const [keys, setKeys] = React.useState<string[]>([]);
   const [selectedFilter, setSelectedFilter] = React.useState("All");
   const [searchString, setSearchString] = React.useState("");
   const compareMap = React.useMemo(() => {
      let oMap: any = createCompareMap(objectPermissions, keys);
      return oMap;
   }, [keys, objectPermissions]);
   React.useEffect(() => {
      const onload = () => {
         let response = handleLoad(objectPermissions);
         setKeys(response);
      };
      onload();
   }, [firstOption.fullName, objectPermissions, secondOption.fullName]);

   return (
      <>
         <Card
            bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
            title={
               <Space>
                  <FormOutlined rev={undefined} />
                  Object Permissions
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
            <RenderIf renderIf={keys.length > 0}>
               <table className="styled-table">
                  <thead>
                     <tr>
                        <th rowSpan={2}>Object Name</th>
                        <th colSpan={6} style={{ borderLeft: "2px black solid", borderRight: "2px black solid" }}>
                           {firstOption?.fullName} ({loginInfo?.username})
                        </th>
                        <th>Move</th>
                        <th
                           colSpan={6}
                           style={{
                              borderLeft: "2px black solid",
                              borderRight: "2px black solid",
                           }}
                        >
                           {secondOption?.fullName} ({secondLoginInfo?.username})
                        </th>
                     </tr>
                     <tr>
                        <th style={{ borderLeft: "2px black solid" }}>Create</th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View All</th>
                        <th style={{ borderRight: "2px black solid" }}>Edit All</th>
                        <th>
                           <MoveObjectPermissionView listObjectNames={keys} />
                        </th>
                        <th
                           style={{
                              borderLeft: "2px black solid",
                           }}
                        >
                           Create
                        </th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View All</th>
                        <th
                           style={{
                              borderRight: "2px black solid",
                           }}
                        >
                           Edit All
                        </th>
                     </tr>
                  </thead>
                  <tbody style={{ maxHeight: "10vh" }}>
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
                              ? compareMap[key]
                              : !compareMap[key];
                        })
                        .map((key: string) => {
                           return (
                              <tr
                                 key={key}
                                 style={{
                                    color: compareMap[key] ? "green" : "#BF0000",
                                 }}
                              >
                                 <td>{key}</td>
                                 <td
                                    style={{
                                       borderLeft: "2px black solid",
                                    }}
                                 >
                                    <GetPermissionObjectCompareView p="allowCreate" option={"A"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowRead" option={"A"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowEdit" option={"A"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowDelete" option={"A"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="viewAllRecords" option={"A"} k={key} />
                                 </td>
                                 <td style={{ borderRight: "2px black solid" }}>
                                    <GetPermissionObjectCompareView p="modifyAllRecords" option={"A"} k={key} />
                                 </td>
                                 <td>
                                    <MoveObjectPermissionView objectName={key} />
                                 </td>
                                 <td
                                    style={{
                                       borderLeft: "2px black solid",
                                    }}
                                 >
                                    <GetPermissionObjectCompareView p="allowCreate" option={"B"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowRead" option={"B"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowEdit" option={"B"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="allowDelete" option={"B"} k={key} />
                                 </td>
                                 <td>
                                    <GetPermissionObjectCompareView p="viewAllRecords" option={"B"} k={key} />
                                 </td>
                                 <td
                                    style={{
                                       borderRight: "2px black solid",
                                    }}
                                 >
                                    <GetPermissionObjectCompareView p="modifyAllRecords" option={"B"} k={key} />
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </RenderIf>
         </Card>
      </>
   );
};

export default ObjectPermissionsCompareView;
