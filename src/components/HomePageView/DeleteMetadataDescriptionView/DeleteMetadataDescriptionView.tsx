import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IDeleteMetadataDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const DeleteMetadataDescriptionView: React.FC<IDeleteMetadataDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Metadata Delete Manager" - Your Salesforce Metadata Cleanup and Organization Tool
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("deleteMetadata");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               "Metadata Delete Manager" is a powerful application designed to simplify the process of managing and deleting
               metadata in your Salesforce organization. This intuitive tool empowers users to select specific metadata types,
               review their metadata items, sort them based on various criteria, and delete unwanted metadata swiftly and
               efficiently.{" "}
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
                        <Link>Metadata Type Selection:</Link> Users can select the metadata types they want to manage and delete
                        from a list of available options. This flexible feature ensures that users can focus on specific metadata
                        areas.
                     </li>
                     <li>
                        <Link>Metadata List Sorting:</Link> The app presents the selected metadata items in a clear and organized
                        list. Users can sort this list based on various criteria such as when it was last modified, when it was
                        created, who created it, and who last modified it.
                     </li>
                     <li>
                        <Link>Detailed Metadata Information:</Link> Users can view detailed information about each metadata item,
                        including its creation date, last modification date, creator, and last modifier. This allows for informed
                        decisions when selecting items for deletion.
                     </li>
                     <li>
                        <Link>Selection Review:</Link> "Metadata Delete Manager" provides a summary of the selected metadata
                        items. Users can review their selections and remove any items they want to exclude from the deletion
                        process.
                     </li>
                     <li>
                        <Link>One-Click Deletion:</Link> With a single click of a button, users can initiate the deletion process
                        for the selected metadata items. The app ensures that users confirm their action to prevent accidental
                        deletions.
                     </li>
                  </ul>
                  <Text strong>Efficient Metadata Cleanup:</Text>
                  <br />
                  "Metadata Delete Manager" streamlines the process of managing and deleting unwanted metadata in your Salesforce
                  organization. Whether it's organizing your metadata, sorting based on various criteria, or ensuring efficient
                  deletion, this app simplifies the process and empowers users to keep their Salesforce environment clean and
                  organized.
                  <Text strong>
                     Experience the power of streamlined metadata cleanup with "Metadata Delete Manager" – where metadata
                     management is efficient, data security is maintained, and your workflows become more organized.
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

export default DeleteMetadataDescriptionView;
