import { Badge, Card, Checkbox, Col, Collapse, Input, Popover, Row, Typography } from "antd";
import React from "react";
import { checkPermission } from "./FieldPermissionAssignedView.util";

interface IFieldPermissionAssignedViewProps {
   children?: React.ReactNode;
   fieldPermissionList: any;
   permissionMap: any;
   profileMap: any;
}
const { Link } = Typography;
const FieldView = React.memo((props: any) => {
   const { field, permissionMap, profileMap } = props;
   let permission = React.useMemo(() => {
      return checkPermission(field, permissionMap);
   }, [field, permissionMap]);
   return (
      <Card size="small" bodyStyle={{ wordBreak: "break-all" }} title={field.split(".")[1]}>
         <Popover
            placement="topLeft"
            content={
               <table>
                  <tbody>
                     {permission.readable.profiles.map((id: string) => {
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
            <Checkbox disabled checked={permission.readable.value}>
               <Link> Read</Link>
            </Checkbox>
         </Popover>
         <Popover
            placement="topLeft"
            content={
               <table>
                  <tbody>
                     {permission.editable.profiles.map((id: string) => {
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
            <Checkbox disabled checked={permission.editable.value}>
               <Link>Edit</Link>
            </Checkbox>
         </Popover>
      </Card>
   );
});
const FieldListView = React.memo((props: any) => {
   const { fieldList, searchString, permissionMap, profileMap } = props;
   return (
      <Row>
         {fieldList
            .filter((field: string) => {
               return searchString === ""
                  ? true
                  : field.split(".")[1].toUpperCase().includes(searchString.toUpperCase())
                  ? true
                  : false;
            })
            .map((field: string) => {
               return (
                  <Col span={4} key={field}>
                     <FieldView field={field} permissionMap={permissionMap} profileMap={profileMap} />
                  </Col>
               );
            })}
      </Row>
   );
});
const LabelView = (props: any) => {
   const { object, searchString, fields } = props;
   let count = React.useMemo(() => {
      return fields.reduce((total: number, current: string) => {
         total =
            total + (searchString === "" ? 0 : current.split(".")[1].toUpperCase().includes(searchString.toUpperCase()) ? 1 : 0);
         return total;
      }, 0);
   }, [fields, searchString]);
   return <Badge count={count}>{object}</Badge>;
};
const FieldPermissionAssignedView: React.FC<IFieldPermissionAssignedViewProps> = (props) => {
   const { fieldPermissionList, permissionMap, profileMap } = props;
   const [searchString, setSearchString] = React.useState("");
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
               items={Object.keys(fieldPermissionList).map((object) => {
                  return {
                     key: object,
                     label: <LabelView object={object} searchString={searchString} fields={fieldPermissionList[object]} />,
                     children: (
                        <FieldListView
                           fieldList={fieldPermissionList[object]}
                           searchString={searchString}
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

export default FieldPermissionAssignedView;
