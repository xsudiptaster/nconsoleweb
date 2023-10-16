import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface ICreateChangeSetDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const CreateChangeSetDescriptionView: React.FC<ICreateChangeSetDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Change Set Manager Pro" - Your Ultimate Salesforce Change Set Management Solution
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("createChangeSet");
                  }}
               >
                  Go to App
               </Button>
            </Title>
            <Paragraph>
               "Change Set Manager Pro" is a powerful application designed to simplify and enhance the management of change sets
               in your Salesforce organization. This versatile tool empowers users to select specific metadata types, review,
               sort, customize their selections, and add metadata to an existing change set. Additionally, it enables users to
               validate their change set against another org before deployment for maximum confidence in changes.{" "}
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
                        <Link>Change Set Selection:</Link> Users can choose an existing change set created by a user within their
                        Salesforce organization, making it easy to focus on updating specific changes.
                     </li>
                     <li>
                        <Link>Metadata Type Selection:</Link> The app allows users to select metadata types from a list of
                        available options, ensuring that they can focus on the exact metadata areas they want to update within the
                        change set.
                     </li>
                     <li>
                        <Link>Metadata List Sorting:</Link> "Change Set Manager Pro" presents the selected metadata items in a
                        clear and organized list. Users can sort this list based on various criteria such as when it was last
                        modified, when it was created, creator, and last modifier.
                     </li>
                     <li>
                        <Link>Detailed Metadata Information:</Link> Users can view comprehensive details about each metadata item
                        within the change set, including creation date, last modification date, creator, and last modifier. This
                        information assists in making informed decisions about what to include or exclude.
                     </li>
                     <li>
                        <Link>Customizable Selections:</Link> The app provides a summary of the selected metadata items to be
                        added or removed from the change set. Users can easily adjust their selections based on their
                        requirements.
                     </li>
                     <li>
                        <Link>Adding Metadata to Change Set:</Link> With a single click of a button, users can add the selected
                        metadata items to the existing change set, streamlining the process of updating and enhancing the change
                        set's content.
                     </li>
                     <li>
                        <Link>Validation Against Another Org:</Link> "Change Set Manager Pro" offers a validation feature that
                        allows users to compare the change set against another Salesforce org. This pre-deployment validation
                        helps identify any potential issues or conflicts before the actual deployment process.
                     </li>
                     <li>
                        <Link>Deployment Confidence:</Link> Users can confidently review and validate their changes, ensuring that
                        the change set contains the desired modifications and will deploy successfully.
                     </li>
                  </ul>
                  <Text strong>Efficient Change Set Management:</Text>
                  <br />
                  "Change Set Manager Pro" simplifies the process of updating and managing change sets in your Salesforce
                  organization. Whether it's selecting, customizing, or validating changes, this app streamlines the process and
                  empowers users to manage change sets with confidence and efficiency.
                  <Text strong>
                     Experience the power of streamlined change set management with "Change Set Manager Pro" – where changes are
                     organized, validated, and deployment-ready, ensuring your workflows remain efficient and error-free.
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

export default CreateChangeSetDescriptionView;
