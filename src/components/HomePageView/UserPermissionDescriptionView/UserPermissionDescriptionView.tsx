import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IUserPermissionDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const UserPermissionDescriptionView: React.FC<IUserPermissionDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "UserPermissions Insight" - Your Salesforce User Permission Visualization Tool
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("userPermission");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               "UserPermissions Insight" is a game-changing application designed to provide administrators and Salesforce users
               with unprecedented visibility into the permissions assigned to a specific user. With its user-friendly interface
               and comprehensive features, this app empowers users to easily examine and understand all the permissions a user
               has, including object, field, Apex Class, Apex Page, and user permissions, along with clear indications of the
               source of these permissions (profile or permission set).
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
               <Paragraph>
                  <Title level={2}>Key Features:</Title>
                  <ul>
                     <li>
                        <Link>User-Centric View:</Link> "UserPermissions Insight" takes a user-centric approach. Users can select
                        a specific Salesforce user, and the app will display all the permissions that this user has been granted,
                        simplifying the process of understanding a user's access rights.
                     </li>
                     <li>
                        <Link>Permission Source Identification:</Link> For each permission displayed, the app clearly indicates
                        whether it's derived from a profile or a permission set. This transparency helps users understand the
                        source of each permission and its origin.
                     </li>
                     <li>
                        <Link>Comprehensive Permission Categories:</Link> The app categorizes permissions into distinct
                        categories, including Object Permissions, Field Permissions, Apex Class Permissions, Apex Page
                        Permissions, and User Permissions. This categorization simplifies the process of filtering and searching
                        for specific permissions.
                     </li>
                     <li>
                        <Link>Filter and Search Functionality:</Link> Users can filter permissions by category, making it easy to
                        focus on specific types of permissions. Additionally, a search feature allows users to quickly find and
                        view particular permissions of interest.
                     </li>
                     <li>
                        <Link>Object-Level Field Permissions:</Link> Field permissions are segmented by the objects they belong
                        to. This granularity ensures that users can see precisely which fields are accessible to the selected user
                        within each object.
                     </li>
                     <li>
                        <Link>Clear and Intuitive Interface:</Link> The app provides a clean and intuitive interface, making it
                        easy for users to navigate and understand the displayed permissions. This design promotes ease of use for
                        administrators and users alike.
                     </li>
                  </ul>
                  <Text strong>Empowering User Permissions Understanding:</Text>
                  <br />
                  "UserPermissions Insight" revolutionizes the way Salesforce users and administrators understand and visualize
                  permissions. Whether it's reviewing a user's access rights, identifying the source of permissions, or searching
                  for specific permissions, this app simplifies the process and empowers users to ensure that access control
                  aligns with organizational needs.
                  <Text strong>
                     Experience the power of streamlined permission visualization with "UserPermissions Insight" – where
                     permissions become transparent, access control is managed effectively, and your workflows become more
                     efficient.
                  </Text>{" "}
                  <Button
                     type="link"
                     size="small"
                     onClick={() => {
                        setShowDetail(false);
                     }}
                  >
                     Hide Details
                  </Button>
               </Paragraph>
            </RenderIf>
         </div>
      </>
   );
};

export default UserPermissionDescriptionView;
