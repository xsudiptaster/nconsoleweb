import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IAuditTrackingDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const AuditTrackingDescriptionView: React.FC<IAuditTrackingDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Audit Trail Analyzer" - Your Salesforce Change Tracking and Analysis Companion
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("auditTracker");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               "Audit Trail Analyzer" is a powerful application designed to simplify and enhance the way Salesforce administrators
               and users view and understand changes within their Salesforce organization. This versatile tool presents the
               Salesforce audit tracking data in a user-friendly table format, allowing users to filter and sort data based on any
               column. Users can easily track changes and filter them by the user who made the modifications.
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
                        <Link>Comprehensive Audit Trail Table:</Link> "Audit Trail Analyzer" displays Salesforce audit tracking
                        data as a comprehensive table. This table includes columns for various attributes, such as Date and Time
                        of Change, User, Object, Field, Old Value, and New Value.
                     </li>
                     <li>
                        <Link>Dynamic Filtering:</Link> Users can filter the audit trail data based on any column, enabling them
                        to focus on specific changes, users, objects, or dates. This functionality streamlines the process of
                        identifying relevant changes.
                     </li>
                     <li>
                        <Link>Column Sorting:</Link> The app allows users to sort data in ascending or descending order based on
                        any column. This feature enhances data organization and simplifies the process of tracking changes
                        chronologically or by other criteria.
                     </li>
                     <li>
                        <Link>User-Specific Changes:</Link> Users can easily filter audit trail data to display changes made by
                        specific users. This is invaluable for understanding individual user actions and ensuring accountability.
                     </li>
                     <li>
                        <Link>Detailed Change Information:</Link> Audit Trail Analyzer provides detailed information about each
                        change, including the before (Old Value) and after (New Value) states of the data. This helps users
                        understand the specific modifications made.
                     </li>
                     <li>
                        <Link>Date and Time Stamps:</Link> The app records the date and time of each change, facilitating precise
                        tracking of when modifications occurred.
                     </li>
                     <li>
                        <Link>Search Functionality:</Link> Users can perform quick searches to find specific changes by keyword,
                        user, object, or any other criteria. This simplifies the process of locating specific changes within the
                        audit trail.
                     </li>
                     <li>
                        <Link>Export Capabilities:</Link> Audit Trail Analyzer enables users to export the audit trail data for
                        further analysis or reporting purposes. This feature enhances data portability and supports documentation
                        needs.
                     </li>
                  </ul>
                  <Text strong>Empowering Change Tracking and Analysis:</Text>
                  <br />
                  "Audit Trail Analyzer" revolutionizes how Salesforce users and administrators track and analyze changes within
                  their organization. Whether it's identifying specific changes, understanding who made them, or sorting changes
                  based on various criteria, this app simplifies the process and empowers users to maintain transparency and
                  accountability.
                  <Text strong>
                     Experience the power of streamlined change tracking and analysis with "Audit Trail Analyzer" – where changes
                     become transparent, accountability is ensured, and your workflows become more efficient.
                  </Text>
               </Paragraph>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setShowDetail(false);
                  }}
               >
                  Hide Details
               </Button>
            </RenderIf>
         </div>
      </>
   );
};

export default AuditTrackingDescriptionView;
