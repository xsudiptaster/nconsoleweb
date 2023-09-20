import { Card, Col, Input, Popover, Row, Typography } from "antd";
import React from "react";
import { checkApexClassPermission } from "./ApexClassPermissionAssignedView.util";

interface IApexClassPermissionAssignedViewProps {
   children?: React.ReactNode;
   apexClassPermissionList: string[];
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const ApexClassView = (props: any) => {
   const { apexClass, permissionMap, profileMap } = props;
   const profiles = React.useMemo(() => {
      return checkApexClassPermission(apexClass, permissionMap);
   }, [apexClass, permissionMap]);
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
         <Link>{apexClass}</Link>
      </Popover>
   );
};
const ApexClassPermissionAssignedView: React.FC<IApexClassPermissionAssignedViewProps> = (props) => {
   const { apexClassPermissionList, permissionMap, profileMap } = props;
   const [searchString, setSearchString] = React.useState("");
   return (
      <Card
         title={
            <Input
               placeholder="Search Apex Class"
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
            {apexClassPermissionList
               .filter((apexClass) => {
                  return searchString === "" ? true : apexClass.toUpperCase().includes(searchString.toUpperCase());
               })
               .map((apexClass) => {
                  return (
                     <Col span={4} key={apexClass}>
                        <ApexClassView apexClass={apexClass} permissionMap={permissionMap} profileMap={profileMap} />
                     </Col>
                  );
               })}
         </Row>
      </Card>
   );
};

export default ApexClassPermissionAssignedView;
