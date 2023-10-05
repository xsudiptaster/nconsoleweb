import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IDeployMetadataDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const DeployMetadataDescriptionView: React.FC<IDeployMetadataDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Metadata Deploy Manager" - Your Salesforce Metadata Deployment Tool
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("deployMetadata");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               "Metadata Deploy Manager" is a robust application designed to streamline and simplify the process of deploying
               metadata in your Salesforce organization. This intuitive tool empowers users to select specific metadata types,
               review, sort, and customize their selections, choose the target org for deployment, and even sign in to a new org
               for deployment if needed.
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
                        <Link>Metadata Type Selection:</Link> Users can choose from a list of available metadata types, allowing
                        them to focus on specific areas of metadata they want to deploy.
                     </li>
                     <li>
                        <Link>Metadata List Sorting:</Link> The app presents selected metadata items in a user-friendly list,
                        which can be sorted based on various criteria such as creation date, last modification date, creator, and
                        last modifier.
                     </li>
                     <li>
                        <Link>Detailed Metadata Information:</Link> Users can access comprehensive details about each metadata
                        item, including its creation date, last modification date, creator, and last modifier. This information
                        aids in making informed deployment decisions.
                     </li>
                     <li>
                        <Link>Customizable Selections:</Link> The app provides a summary of the selected metadata items, allowing
                        users to review their choices. Users can easily remove any items they want to exclude from the deployment.
                     </li>
                     <li>
                        <Link>Deployment Target Selection:</Link> Users can select the target org for deployment directly within
                        the app. If the desired org is not present, users can initiate a new sign-in to connect to the target org
                        seamlessly.
                     </li>
                     <li>
                        <Link>User Authentication:</Link> The app supports secure user authentication, ensuring that users can
                        sign in to their Salesforce orgs safely. This feature enhances data security and compliance.
                     </li>
                     <li>
                        <Link>One-Click Deployment:</Link> With a single click of a button, users can initiate the deployment
                        process to the selected target org. The app ensures that users confirm their action before deploying to
                        prevent accidental deployments.
                     </li>
                  </ul>
                  <Text strong>Efficient Metadata Deployment:</Text>
                  <br />
                  "Metadata Deploy Manager" simplifies the process of deploying metadata in your Salesforce organization. Whether
                  it's selecting, customizing, and organizing metadata for deployment or choosing the target org, this app
                  streamlines the process and empowers users to manage their metadata deployment efficiently.
                  <Text strong>
                     Experience the power of streamlined metadata deployment with "Metadata Deploy Manager" – where deployment is
                     efficient, secure, and hassle-free, ensuring your workflows remain streamlined and organized.
                  </Text>
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

export default DeployMetadataDescriptionView;
