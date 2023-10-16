import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IPermissionEditDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const PermissionEditDescriptionView: React.FC<IPermissionEditDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         {" "}
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "ProfilePro Bulk Editor" - Your Comprehensive Salesforce Profile and Permission Set Management Solution
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("permissionEdit");
                  }}
               >
                  Go to App
               </Button>
            </Title>
            <Paragraph>
               "ProfilePro Bulk Editor" is an innovative application designed to streamline and simplify the management of
               Salesforce profiles and permission sets. This powerful tool empowers administrators and developers to efficiently
               edit multiple profiles and permission sets across multiple objects, all within a single user-friendly interface.
               With advanced tracking and deployment features, it ensures your Salesforce security is consistent and compliant.
               <RenderIf renderIf={!showDetail}>
                  <Button
                     type="link"
                     size="small"
                     onClick={() => {
                        setShowDetail(true);
                     }}
                  >
                     More..
                  </Button>
               </RenderIf>
            </Paragraph>
            <RenderIf renderIf={showDetail}>
               <Title level={2}>Key Features:</Title>
               <Paragraph>
                  <ul>
                     <li>
                        <Link>Multi-Object, Multi-Profile, and Multi-Permission Set Editing:</Link> ProfilePro Bulk Editor allows
                        users to select multiple objects, profiles, and permission sets, consolidating them into a single unified
                        layout for streamlined management.
                     </li>
                     <li>
                        <Link>Unified Editing Layout:</Link> All selected objects, profiles, and permission sets are presented in
                        a single, intuitive layout, making it easy to view and modify object permissions, field permissions, and
                        record type selections across the board.
                     </li>
                     <li>
                        <Link>Object Permissions Management:</Link> Users can efficiently modify object-level permissions for
                        various profiles and permission sets, ensuring consistent access control across multiple objects in one
                        go.
                     </li>
                     <li>
                        <Link>Field Permissions Configuration:</Link> Field-level security is made transparent. Users can easily
                        edit field-level permissions across the selected profiles and permission sets to maintain data security
                        standards.
                     </li>
                     <li>
                        <Link>Record Type Selection:</Link> The application allows for simple and efficient modification of record
                        type selections for selected profiles and permission sets, ensuring data access aligns with your
                        organizational needs.
                     </li>
                     <li>
                        <Link>Comprehensive Change Tracking:</Link> All changes made to object permissions, field permissions, and
                        record type selections are tracked and displayed in a tabular format. This provides an audit trail for
                        review before deployment.
                     </li>
                     <li>
                        <Link>Deployment Flexibility:</Link> Users can choose to deploy their changes back to the same org or
                        select a different org for deployment. This flexibility is particularly useful for maintaining consistent
                        security settings across multiple Salesforce instances.
                     </li>
                  </ul>
                  <Text strong>Efficient Profile and Permission Set Management:</Text>
                  "ProfilePro Bulk Editor" redefines how administrators and developers manage profiles and permission sets in
                  Salesforce. Whether it's updating object permissions, field permissions, or record type selections, this app
                  simplifies the process and empowers users to ensure data security and access control remain consistent across
                  their Salesforce instances.
                  <br />
                  <Text strong>
                     Experience the power of streamlined profile and permission set management with "ProfilePro Bulk Editor" –
                     where consistency is maintained, compliance is ensured, and your workflows become more efficient.
                     <Button
                        type="link"
                        size="small"
                        onClick={() => {
                           setShowDetail(false);
                        }}
                     >
                        Hide Details
                     </Button>
                  </Text>
               </Paragraph>
            </RenderIf>
         </div>
      </>
   );
};

export default PermissionEditDescriptionView;
