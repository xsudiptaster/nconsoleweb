import { Card, Checkbox, Col, Input, Popover, Row, Space, Typography } from "antd";
import React from "react";
import { checkObjectPermission } from "./ObjectPermissionAssignedView.util";

interface IObjectPermissionAssignedViewProps {
   children?: React.ReactNode;
   objectPermissionList: string[];
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const ObjectView = React.memo((props: any) => {
   const { object, permissionMap, profileMap } = props;
   let permission = React.useMemo(() => {
      return checkObjectPermission(object, permissionMap);
   }, [object, permissionMap]);
   return (
      <Card title={object} size="small">
         <Space direction="vertical">
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.allowCreate.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.allowCreate.value}>
                  <Link>Create</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.allowRead.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.allowRead.value}>
                  <Link>Read</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.allowEdit.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.allowEdit.value}>
                  <Link>Edit</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.allowDelete.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.allowDelete.value}>
                  <Link>Delete</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.viewAllrecords.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.viewAllrecords.value}>
                  <Link>View All</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.modifyAllRecords.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td>{profileMap[id].type}</td>
                                 <td>{profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.modifyAllRecords.value}>
                  <Link>Modify All</Link>
               </Checkbox>
            </Popover>
         </Space>
      </Card>
   );
});
const ObjectPermissionAssignedView: React.FC<IObjectPermissionAssignedViewProps> = (props) => {
   const { objectPermissionList, permissionMap, profileMap } = props;
   const [searchString, setSearchString] = React.useState("");
   return (
      <Card
         size="small"
         title={
            <Input
               placeholder="Search Object"
               size="small"
               bordered={false}
               onChange={(event) => {
                  setSearchString(event?.target.value);
               }}
            />
         }
         bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
         <Row>
            {objectPermissionList
               .filter((object) => {
                  return searchString === "" ? true : object.toUpperCase().includes(searchString.toUpperCase());
               })
               .map((object) => {
                  return (
                     <Col span={3} key={object}>
                        <ObjectView object={object} permissionMap={permissionMap} profileMap={profileMap} />
                     </Col>
                  );
               })}
         </Row>
      </Card>
   );
};

export default ObjectPermissionAssignedView;
