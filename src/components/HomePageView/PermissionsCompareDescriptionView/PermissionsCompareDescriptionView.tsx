import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IPermissionsCompareDescriptionViewProps {
  children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const PermissionsCompareDescriptionView: React.FC<IPermissionsCompareDescriptionViewProps> = (props) => {
  const [, setCurrent] = useRecoilState(selectedAppAtom);
  const [showDetail, setShowDetail] = React.useState(false);
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Title>
          Introducing "Profile & Permission Set Comparator" - Your Ultimate Salesforce Security Review & Management Tool
          <Button
            type="link"
            size="small"
            onClick={() => {
              setCurrent("permisionCompare");
            }}
          >
            Goto App
          </Button>
        </Title>
        <Paragraph>
          The "Profile & Permission Set Comparator" is a sophisticated application designed to simplify the process of comparing
          and managing profiles and permission sets within Salesforce. This powerful tool empowers administrators and developers
          to effortlessly analyze, identify similarities and differences, and make necessary changes to security settings across
          profiles and permission sets, whether they are within the same org or different orgs.
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
                <Link>Profile vs. Profile, Permission Set vs. Permission Set, Profile vs. Permission Set Comparison:</Link> The
                app provides the flexibility to compare two profiles, two permission sets, or a profile against a permission set,
                accommodating various use cases for security analysis and synchronization.
              </li>
              <li>
                <Link>Comprehensive Object Permissions:</Link> Users can easily view and compare object-level permissions,
                including read, write, delete, and create permissions. Object permissions are presented in a clear and organized
                tabular format, making it easy to identify differences and similarities.
              </li>
              <li>
                <Link>Detailed Apex Class Permissions:</Link> The application allows for a detailed examination of Apex class
                permissions, helping users pinpoint disparities in class accessibility between profiles and permission sets.
              </li>
              <li>
                <Link>Field-Level Permissions:</Link> Field-level security is made transparent through the app. Users can analyze
                and compare field-level permissions for various objects, ensuring data security is upheld consistently.
              </li>
              <li>
                <Link>Flow Permissions:</Link> Flow permissions are presented for comparison, ensuring that automated processes
                and business logic are managed consistently across profiles and permission sets.
              </li>
              <li>
                <Link>Page Layout Assignments:</Link> The app provides a visual representation of page layout assignments,
                enabling users to identify where layouts differ and ensuring uniform user experiences.
              </li>
              <li>
                <Link>Record Type Permissions:</Link> Users can easily compare record type permissions, guaranteeing that access
                to different record types is aligned appropriately.
              </li>
              <li>
                <Link>User Permissions:</Link> User permissions are compared and displayed, allowing for a comprehensive review of
                user-level access settings within profiles and permission sets.
              </li>
              <li>
                <Link>Editable Comparison Results:</Link> The app not only identifies differences and similarities but also allows
                users to make changes and edits directly within the application. These changes can be reviewed and saved back to
                their respective profiles or permission sets.
              </li>
              <li>
                <Link>Org Sync Capability:</Link> For users comparing profiles or permission sets from different orgs, the app
                supports synchronization of security settings to align them. This feature streamlines the process of keeping
                multiple orgs consistent.
              </li>
            </ul>
            <Text strong> Effortless Security Management:</Text> The "Profile & Permission Set Comparator" redefines how
            administrators and developers handle security settings in Salesforce. Whether it's identifying discrepancies, making
            changes, or ensuring uniformity across multiple orgs, this app streamlines the process and empowers users to manage
            their Salesforce security settings with ease.
            <br />
            <Text strong>
              Experience the power of streamlined security management with the "Profile & Permission Set Comparator" – where
              security consistency is ensured, compliance is maintained, and your workflows become more efficient.
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

export default PermissionsCompareDescriptionView;
