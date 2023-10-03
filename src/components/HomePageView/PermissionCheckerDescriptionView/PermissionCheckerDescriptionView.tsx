import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IPermissionCheckerDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const PermissionCheckerDescriptionView: React.FC<IPermissionCheckerDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Permission Detective Pro" - Your Comprehensive Salesforce Permission Analysis Companion
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("permissionChecker");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               "Permission Detective Pro" is a powerful application designed to provide Salesforce administrators and users with a
               deep dive into the permissions within their Salesforce instance. This versatile tool empowers users to select a
               specific permission from various categories, including field permissions, object permissions, record type
               permissions, Apex class permissions, Apex page permissions, and user permissions, and instantly identify all the
               profiles, permission sets, and users who possess that particular permission.
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
                        <Link>Comprehensive Permission Categories:</Link> "Permission Detective Pro" categorizes permissions into
                        distinct categories, making it easy to explore and understand access control in Salesforce. These
                        categories include Field Permissions, Object Permissions, Record Type Permissions, Apex Class Permissions,
                        Apex Page Permissions, and User Permissions.
                     </li>
                     <li>
                        <Link>Profile Selection:</Link> Users can easily select partifular profiles to be analyzed or select all
                        profiles in a click of a button.
                     </li>
                     <li>
                        <Link>Permission Set Selection:</Link> Users can easily select partifular permission set to be analyzed or
                        select all permission sets in a click of a button.
                     </li>
                     <li>
                        <Link>Permission Selection:</Link> Users can easily select a specific permission from any of the
                        categories listed above. This feature allows users to focus on the exact permission they want to
                        investigate.
                     </li>
                     <li>
                        <Link>Profile and Permission Set Identification:</Link> For the selected permission, the app displays a
                        comprehensive list of all profiles and permission sets within your Salesforce instance that grant that
                        particular permission. This provides a clear view of where the permission is assigned.
                     </li>
                     <li>
                        <Link>User Identification:</Link> The app also identifies all users who have been assigned the selected
                        permission. This information is crucial for pinpointing individuals with specific access rights.
                     </li>

                     <li>
                        <Link>Search Functionality:</Link> Users can quickly search for a specific permission by name or keyword.
                        This is especially useful for Salesforce instances with numerous permissions.
                     </li>
                     <li>
                        <Link>Clear and Intuitive Interface:</Link> The app provides a user-friendly interface that is easy to
                        navigate. It simplifies the process of exploring and understanding permissions within Salesforce.
                     </li>
                  </ul>
                  <Text strong>Empowering Permission Exploration:</Text>
                  <br />
                  "Permission Detective Pro" transforms how Salesforce users and administrators explore and understand
                  permissions. Whether it's reviewing the distribution of a specific permission across profiles, permission sets,
                  or identifying individual users with that permission, this app simplifies the process and empowers users to
                  ensure access control aligns with their organizational needs.
                  <Text strong>
                     Experience the power of streamlined permission exploration with "Permission Detective Pro" – where
                     permissions become transparent, access control is managed effectively, and your workflows become more
                     efficient.
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

export default PermissionCheckerDescriptionView;
