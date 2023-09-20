import { Card, Col, Input, Popover, Row, Typography } from "antd";
import React from "react";
import { checkApexPagePermission } from "./ApexPagePermissionAssignedView.util";

interface IApexPagePermissionAssignedViewProps {
   children?: React.ReactNode;
   apexPagePermissionList: string[];
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const ApexPageView = React.memo((props: any) => {
   const { apexPage, permissionMap, profileMap } = props;
   const profiles = React.useMemo(() => {
      return checkApexPagePermission(apexPage, permissionMap);
   }, [apexPage, permissionMap]);
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
         <Link>{apexPage}</Link>
      </Popover>
   );
});
const ApexPagePermissionAssignedView: React.FC<IApexPagePermissionAssignedViewProps> = (props) => {
   const { apexPagePermissionList, permissionMap, profileMap } = props;
   return (
      <Card title={<Input size="small" placeholder="Search Apex Page" bordered={false} />} size="small">
         <Row>
            {apexPagePermissionList.map((apexPage) => {
               return (
                  <Col span={3} key={apexPage}>
                     <ApexPageView apexPage={apexPage} permissionMap={permissionMap} profileMap={profileMap} />
                  </Col>
               );
            })}
         </Row>
      </Card>
   );
};

export default ApexPagePermissionAssignedView;
