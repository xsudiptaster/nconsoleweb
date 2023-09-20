import { Card, Col, Input, Popover, Row, Typography } from "antd";
import React from "react";
import { checkUserPermission } from "./UserPermissionAssignedView.util";

interface IUserPermissionAssignedViewProps {
   children?: React.ReactNode;
   userPermissionList: string[];
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const UserPermissionView = React.memo((props: any) => {
   const { userPermission, permissionMap, profileMap } = props;
   let profiles = React.useMemo(() => {
      return checkUserPermission(userPermission, permissionMap);
   }, [permissionMap, userPermission]);
   return (
      <Popover
         placement="topRight"
         content={
            <table>
               <tbody>
                  {profiles.map((id) => {
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
         <Link>{userPermission}</Link>
      </Popover>
   );
});
const UserPermissionAssignedView: React.FC<IUserPermissionAssignedViewProps> = (props) => {
   const { userPermissionList, permissionMap, profileMap } = props;
   const [searchString, setSearchString] = React.useState("");
   return (
      <Card
         title={
            <Input
               placeholder="Search Permission"
               size="small"
               bordered={false}
               onChange={(event) => {
                  setSearchString(event?.target.value);
               }}
            />
         }
         size="small"
      >
         <Row>
            {userPermissionList
               .filter((userPermission) => {
                  return searchString === "" ? true : userPermission.toUpperCase().includes(searchString.toUpperCase());
               })
               .map((userPermission) => {
                  return (
                     <Col span={3} key={userPermission}>
                        <UserPermissionView
                           userPermission={userPermission}
                           permissionMap={permissionMap}
                           profileMap={profileMap}
                        />
                     </Col>
                  );
               })}
         </Row>
      </Card>
   );
};

export default UserPermissionAssignedView;
