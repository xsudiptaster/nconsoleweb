import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface ICountryPicklistDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const CountryPicklistDescriptionView: React.FC<ICountryPicklistDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);

   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               {" "}
               Introducing "GeoData Manager" - Your Salesforce Country & State Picklist Management Solution
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("apexCode");
                  }}
               >
                  Go to App
               </Button>
            </Title>
            <Paragraph>
               "GeoData Manager" is a revolutionary app designed to simplify and enhance the management of country and state
               picklists within your Salesforce organization. With its intuitive interface and powerful features, GeoData Manager
               empowers users to efficiently work with and update geographic data, ensuring accuracy and compliance.
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
                        <Link> Picklist Overview:</Link> GeoData Manager connects directly to your logged-in Salesforce org and
                        provides a comprehensive overview of your country and state picklists. Users can quickly visualize the
                        existing configurations and understand the structure.
                     </li>
                     <li>
                        <Link>Filter and Sort:</Link> Users can easily filter and sort the country picklist entries for a clear
                        and organized view. This feature simplifies the process of finding specific countries or states,
                        especially in organizations with extensive geographic data.
                     </li>
                     <li>
                        <Link>Download and Modification:</Link> GeoData Manager offers the ability to download the entire country
                        and state picklist, making it accessible in a convenient format. Users can then make necessary
                        modifications to country codes or other relevant information outside of Salesforce.
                     </li>
                     <li>
                        <Link>Bulk Upload:</Link> After making modifications, users can seamlessly upload the modified picklist
                        data back into GeoData Manager. The app ensures data integrity by validating entries and preserving the
                        relationships between countries and states.
                     </li>
                     <li>
                        <Link>Salesforce Integration:</Link> Once the modified data is uploaded and validated, GeoData Manager
                        syncs with your Salesforce org, updating the country and state picklists with the new information. This
                        ensures that your Salesforce instance remains up-to-date and accurate.
                     </li>
                     <li>
                        <Link>Data Verification:</Link> To maintain data quality, GeoData Manager performs data verification
                        checks before updating Salesforce. This includes checking for duplicates, ensuring data consistency, and
                        validating entries against Salesforce rules.
                     </li>
                     <li>
                        <Link>Role-Based Access:</Link> The app offers role-based access control, allowing administrators to
                        define who can view, modify, and upload picklist data. This ensures data security and compliance with
                        organizational policies.
                     </li>
                  </ul>
                  Streamline Your GeoData Management: GeoData Manager is your go-to solution for maintaining accurate and
                  up-to-date geographic data in Salesforce. Whether it's making bulk modifications, ensuring data accuracy, or
                  adhering to Salesforce best practices, this app simplifies the process.
                  <Text strong>
                     Experience the power of effortless country and state picklist management with GeoData Manager – where your
                     data remains accurate, your Salesforce org remains compliant, and your users stay productive.
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

export default CountryPicklistDescriptionView;
