import { Button, Col, Divider, Flex, Row } from "antd";
import React from "react";
import AccordinView from "../../../utils/AccordinView";
import DisplayFieldView from "../DisplayFieldView";
import { getCustomFields, getStandardFields, getUserDetils, standardFields } from "./UserDetailsView.util";

interface IUserDetailsViewProps {
   children?: React.ReactNode;
   id: string;

   userDescribe: any;
}

const UserDetailsView: React.FC<IUserDetailsViewProps> = (props) => {
   const { id, userDescribe } = props;
   const [displayDetails, setDisplayDetails] = React.useState<any>({});
   const [edit, setEdit] = React.useState(false);
   React.useEffect(() => {
      const onload = async () => {
         let response = await getUserDetils(id);
         setDisplayDetails(response);
      };
      onload();
   }, [id]);
   const customFields = React.useMemo(() => {
      return getCustomFields(userDescribe.fields);
   }, [userDescribe.fields]);
   const otherStandardFields = React.useMemo(() => {
      return getStandardFields(userDescribe.fields);
   }, [userDescribe.fields]);
   return (
      <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
         <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
               size="small"
               onClick={() => {
                  setEdit(true);
               }}
            >
               Edit
            </Button>{" "}
            <Button
               size="small"
               onClick={() => {
                  setEdit(true);
               }}
            >
               Save
            </Button>
            <Button
               size="small"
               onClick={() => {
                  setEdit(true);
               }}
            >
               Cancel
            </Button>
            <Button
               size="small"
               onClick={() => {
                  setEdit(true);
               }}
            >
               Reset Password
            </Button>
            <Button
               size="small"
               onClick={() => {
                  setEdit(true);
               }}
            >
               Set Password
            </Button>
         </div>
         <Divider />
         <Flex wrap="wrap" gap="small">
            {standardFields.map((item: any) => {
               return (
                  <Row gutter={10} key={item.key} style={{ paddingLeft: "20px" }}>
                     <Col className="gutter-row" span={12}>
                        <div style={{ minWidth: "200px" }}>{item.label}</div>
                     </Col>
                     <Col className="gutter-row" span={12}>
                        <div style={{ minWidth: "200px" }}>
                           <DisplayFieldView
                              value={displayDetails[item.key]}
                              edit={edit}
                              field={userDescribe.fieldsMap[item.key]}
                           />
                        </div>
                     </Col>
                  </Row>
               );
            })}
         </Flex>
         <AccordinView title="Other Fields">
            <Flex wrap="wrap" gap="small">
               {otherStandardFields.map((item: any) => {
                  return (
                     <Row gutter={10} key={item.key} style={{ paddingLeft: "20px" }}>
                        <Col className="gutter-row" span={12}>
                           <div>{item.label}</div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                           <div style={{ minWidth: "200px", maxWidth: "200px" }}>
                              <DisplayFieldView
                                 value={displayDetails[item.key]}
                                 edit={edit}
                                 field={userDescribe.fieldsMap[item.key]}
                              />
                           </div>
                        </Col>
                     </Row>
                  );
               })}
            </Flex>
         </AccordinView>
         <Divider>Custom Fields</Divider>
         <Flex wrap="wrap" gap="small">
            {customFields.map((item: any) => {
               return (
                  <Row gutter={10} key={item.key} style={{ paddingLeft: "20px" }}>
                     <Col className="gutter-row" span={12}>
                        <div style={{ minWidth: "200px" }}>{item.label}</div>
                     </Col>
                     <Col className="gutter-row" span={12}>
                        <div style={{ minWidth: "200px" }}>
                           <DisplayFieldView
                              value={displayDetails[item.key]}
                              edit={edit}
                              field={userDescribe.fieldsMap[item.key]}
                           />
                        </div>
                     </Col>
                  </Row>
               );
            })}
         </Flex>
      </div>
   );
};

export default UserDetailsView;
