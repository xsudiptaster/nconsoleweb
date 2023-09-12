import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface ICustomMetadataDescriptionViewProps {
  children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const CustomMetadataDescriptionView: React.FC<ICustomMetadataDescriptionViewProps> = (props) => {
  const [, setCurrent] = useRecoilState(selectedAppAtom);
  const [showDetail, setShowDetail] = React.useState(false);
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Title>
          {" "}
          Introducing "MetaModify Pro" - Your Salesforce Custom Metadata Bulk Editor
          <Button
            type="link"
            size="small"
            onClick={() => {
              setCurrent("customMetadata");
            }}
          >
            Goto App
          </Button>
        </Title>
        <Paragraph>
          "MetaModify Pro" is a powerful application designed to streamline the management of custom metadata in Salesforce. With
          its user-friendly interface and comprehensive features, MetaModify Pro empowers administrators and developers to
          efficiently edit, organize, and export custom metadata records in bulk.{" "}
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
                <Link> Selective Metadata Editing:</Link> MetaModify Pro allows users to select specific custom metadata types
                they want to edit. This targeted approach ensures that users can focus on the precise metadata they need to
                modify.
              </li>
              <li>
                <Link>Comprehensive Record Viewing:</Link> The app provides a comprehensive view of all current custom metadata
                records within the selected type. Users can quickly assess the existing data, making informed decisions about
                necessary changes.
              </li>
              <li>
                <Link>Sorting and Filtering:</Link> Users can easily sort and filter metadata records based on various criteria,
                such as name, label, or other custom fields. This simplifies the process of identifying and working with specific
                records.
              </li>
              <li>
                <Link>Bulk Editing:</Link> MetaModify Pro supports bulk editing of custom metadata records. Users can modify
                multiple records simultaneously, saving valuable time and effort. Customizable templates for updates ensure data
                consistency.
              </li>
              <li>
                <Link>Add, Edit, or Delete Records:</Link> Users have the flexibility to add new records, edit existing ones, or
                delete records as needed. This functionality streamlines the process of managing custom metadata, whether for
                updates, expansions, or deletions.
              </li>
              <li>
                <Link>Data Validation:</Link> The app includes data validation checks to ensure that changes adhere to Salesforce
                metadata rules and guidelines, preventing data integrity issues.
              </li>
              <li>
                <Link>Export to Excel:</Link> MetaModify Pro allows users to export the edited custom metadata records, or even
                the entire type, as an Excel file. This feature ensures that users have easy access to a backup and a convenient
                way to share or archive data.
              </li>
            </ul>
            <Text strong> Efficient Custom Metadata Management:</Text> MetaModify Pro revolutionizes the way custom metadata is
            managed in Salesforce. Whether it's updating multiple records, maintaining data accuracy, or exporting for external
            analysis, this app simplifies the process and empowers Salesforce professionals to work more efficiently.
            <Text strong>
              Experience the power of streamlined custom metadata management with MetaModify Pro – where your custom metadata
              stays up-to-date, your Salesforce organization remains compliant, and your workflows become more efficient.
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

export default CustomMetadataDescriptionView;
