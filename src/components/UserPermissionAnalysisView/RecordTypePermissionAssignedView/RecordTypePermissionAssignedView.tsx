import { Badge, Card, Checkbox, Col, Collapse, Input, Popover, Row, Typography } from "antd";
import React from "react";
import { checkRecordTypePermission } from "./RecordTypePermissionAssignedView.util";

interface IRecordTypePermissionAssignedViewProps {
   children?: React.ReactNode;
   recordTypePermissionList: any;
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const RecordTypePermissionAssignedView: React.FC<IRecordTypePermissionAssignedViewProps> = (props) => {
   const { recordTypePermissionList, permissionMap, profileMap } = props;
   const [searchString, setSearchString] = React.useState("");
   const RecordTypeView = (props: any) => {
      const { recordType, profileMap } = props;
      const permission: any = checkRecordTypePermission(recordType, permissionMap);
      return (
         <Card title={recordType.split(".")[1]} size="small">
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.visible.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td> {profileMap[id].type} :</td>
                                 <td> {profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.visible.value}>
                  <Link> Visible</Link>
               </Checkbox>
            </Popover>
            <Popover
               placement="topLeft"
               content={
                  <table>
                     <tbody>
                        {permission.default.profiles.map((id: string) => {
                           return (
                              <tr key={id}>
                                 <td> {profileMap[id].type} :</td>
                                 <td> {profileMap[id].name}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               }
            >
               <Checkbox disabled checked={permission.default.value}>
                  <Link> Default</Link>
               </Checkbox>
            </Popover>
         </Card>
      );
   };
   const RecordTypeListView = (props: any) => {
      const { recordTypeList } = props;
      return (
         <Row>
            {recordTypeList
               .filter((recordType: string) => {
                  return searchString === ""
                     ? true
                     : recordType.split(".")[1].toUpperCase().includes(searchString.toUpperCase())
                     ? true
                     : false;
               })
               .map((recordType: string) => {
                  return (
                     <Col span={4} key={recordType}>
                        <RecordTypeView recordType={recordType} permissionMap={permissionMap} profileMap={profileMap} />
                     </Col>
                  );
               })}
         </Row>
      );
   };
   const LabelView = (props: any) => {
      const { object, searchString, recordTypes } = props;
      let count = React.useMemo(() => {
         return recordTypes.reduce((total: number, current: string) => {
            total =
               total +
               (searchString === "" ? 0 : current.split(".")[1].toUpperCase().includes(searchString.toUpperCase()) ? 1 : 0);
            return total;
         }, 0);
      }, [recordTypes, searchString]);
      return <Badge count={count}>{object}</Badge>;
   };
   return (
      <>
         <Card
            bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
            size="small"
            title={
               <Input
                  size="small"
                  bordered={false}
                  placeholder="Search Field"
                  onChange={(event) => {
                     setSearchString(event?.target.value);
                  }}
               />
            }
         >
            <Collapse
               accordion
               bordered={false}
               size="small"
               items={Object.keys(recordTypePermissionList).map((object: string) => {
                  return {
                     key: object,
                     label: (
                        <LabelView object={object} searchString={searchString} recordTypes={recordTypePermissionList[object]} />
                     ),
                     children: (
                        <RecordTypeListView
                           recordTypeList={recordTypePermissionList[object]}
                           permissionMap={permissionMap}
                           profileMap={profileMap}
                        />
                     ),
                  };
               })}
            ></Collapse>
         </Card>
      </>
   );
};

export default RecordTypePermissionAssignedView;
