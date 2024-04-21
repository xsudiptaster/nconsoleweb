import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IReportTypeDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const ReportTypeDescriptionView: React.FC<IReportTypeDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Custom Report Editor Pro" – Revolutionizing Salesforce Custom Report Types!
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("reportType");
                  }}
               >
                  Go to App
               </Button>
            </Title>
            <Paragraph>
               Elevate your reporting capabilities with the Custom Report Editor Pro app. This innovative tool empowers Salesforce
               users to take full control of their custom report types, enabling effortless customization, seamless field
               management, and dynamic section creation. Whether you're a seasoned Salesforce admin or a business analyst, Custom
               Report Editor Pro transforms the way you interact with data, putting the power of report customization at your
               fingertips.
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
                        <Link>Intuitive Customization:</Link> With Custom Report Editor Pro, tailoring your custom report types
                        has never been easier. Effortlessly adjust the display of report fields to match your unique needs,
                        ensuring your reports present the exact insights you require.{" "}
                     </li>
                     <li>
                        <Link>Default Field Management:</Link> Streamline your report creation process by designating default
                        fields. Choose which fields are pre-selected when users generate new reports, ensuring consistency and
                        saving valuable time.
                     </li>
                     <li>
                        <Link>Drag-and-Drop Field Tree:</Link> Experience the convenience of drag-and-drop field selection. The
                        app's interactive field tree empowers you to effortlessly add new fields to your reports. Simply drag the
                        desired fields to your report layout and let the app handle the rest.
                     </li>
                     <li>
                        <Link>Efficient Field Search:</Link> Navigate through even the most extensive field lists with ease. The
                        advanced search functionality lets you quickly locate specific fields, enhancing your productivity and
                        reducing the time spent on manual searching.
                     </li>
                     <li>
                        <Link>Dynamic Section Creation:</Link> Structure your reports for optimal clarity and readability. Create
                        new report sections on the fly, ensuring that your data is presented in a logical and organized manner
                        that resonates with your audience.
                     </li>
                     <li>
                        <Link>Real-time Preview:</Link> Visualize your changes in real time as you customize your custom report
                        types. No more guesswork – instantly see how your modifications impact the final report layout.
                     </li>
                     <li>
                        <Link>Seamless Integration:</Link> Custom Report Editor Pro seamlessly integrates into your Salesforce
                        environment. Access your custom report types directly, without the need for complex external tools or data
                        exports.
                     </li>
                     <li>
                        <Link>User-Friendly Interface:</Link> Designed with usability in mind, Custom Report Editor Pro boasts an
                        intuitive interface suitable for users of all levels. Whether you're new to custom report types or an
                        experienced pro, the app guides you through the customization process effortlessly. Elevate your reporting
                        game with Custom Report Editor Pro. Gain the flexibility, efficiency, and insights you need to transform
                        your Salesforce custom report types into powerful tools for data-driven success.
                     </li>
                  </ul>
               </Paragraph>
               <Text strong>Get Started with Custom Report Editor Pro</Text> and redefine how you craft, customize, and convey
               your data stories. Experience the future of Salesforce reporting today. <br />
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

export default ReportTypeDescriptionView;
