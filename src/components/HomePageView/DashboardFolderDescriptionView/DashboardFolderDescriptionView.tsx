import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IDashboardFolderDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const DashboardFolderDescriptionView: React.FC<IDashboardFolderDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);

   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing Dashboard Tree View: Elevate Your Data Insights with Dynamic Dashboard Management
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("reportFolders");
                  }}
               >
                  Goto App
               </Button>
            </Title>
            <Paragraph>
               Welcome to Dashboard Tree View, the cutting-edge app that redefines the way you interact with Salesforce Dashboards
               and Dashboard folders. Experience a new realm of organized data visualization that empowers you to effortlessly
               manage, customize, and analyze your business intelligence.
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
                        <Link>Dynamic Dashboard Hierarchy:</Link> Dashboard Tree View presents your Salesforce Dashboards and
                        Dashboard folders in a dynamic tree structure. This user-friendly layout offers a clear overview of your
                        data landscape and allows you to quickly access and manipulate your dashboards.
                     </li>
                     <li>
                        Flexible Naming and Editing: Tired of standardized dashboard names? Customize dashboard and folder names
                        according to your preferences. Edit and fine-tune titles effortlessly to match your evolving business
                        requirements.
                     </li>
                     <li>
                        <Link>Seamless Folder Creation:</Link> Create new Dashboard folders on the fly to categorize and classify
                        your data. Organize dashboards based on teams, projects, or themes, and adapt your structure to your
                        workflow.
                     </li>
                     <li>
                        <Link>Effortless Rearrangement:</Link> Move dashboards seamlessly between folders using the intuitive
                        cut-paste functionality. Maintain a structured hierarchy that reflects your data's importance and
                        relevance.
                     </li>
                     <li>
                        <Link>Efficient Copy-Paste:</Link> Duplicate dashboards with ease using the copy-paste feature. Whether
                        you want to replicate dashboards within a folder or across different folders, Dashboard Tree View ensures
                        a seamless copying experience.
                     </li>
                     <li>
                        <Link>Mirror Mode Mastery:</Link> Dashboard Tree View's mirror mode offers a mirrored perspective of your
                        dashboard tree, simplifying the process of moving items from the top to the bottom or vice versa.
                        Intuitive drag-and-drop actions enhance your productivity.
                     </li>
                     <li>
                        <Link>Deep Search Expertise:</Link> Searching for specific dashboards within complex folder structures is
                        a breeze with our robust search feature. Locate deeply nested dashboards effortlessly, saving you time and
                        frustration.
                     </li>
                     <li>
                        <Link>Confident Deletions:</Link> When it's time to declutter, Dashboard Tree View allows you to delete
                        dashboards and folders confidently. With well-guided deletion processes, you can declutter your workspace
                        without hesitation.
                     </li>
                  </ul>
                  <Title level={2}>Benefits:</Title>
                  <ul>
                     <li>
                        <Link>Enhanced Data Exploration:</Link> Navigating your Salesforce Dashboards and folders becomes a
                        seamless and efficient process, allowing you to focus on insights rather than navigation.
                     </li>
                     <li>
                        <Link>Personalized Business Intelligence:</Link> Tailor your dashboards and folder organization to your
                        business context, resulting in a workspace that speaks your language and supports your analysis.
                     </li>
                     <li>
                        <Link>Reduced Errors, Enhanced Insights:</Link> Enjoy a smoother dashboard management process with
                        built-in features that minimize errors, ensuring you're always working with the right data.
                     </li>
                     <li>
                        <Link>Data-Driven Excellence:</Link> Access the insights you need when you need them, enabling you to make
                        informed decisions that drive business success.
                     </li>
                  </ul>
               </Paragraph>
               <Text strong>
                  Embark on your journey with Dashboard Tree View and transform the way you manage your Salesforce Dashboards and
                  Dashboard folders. Revolutionize your workflow, master your data presentation, and unlock unparalleled
                  productivity. Get ready to visualize your data like never before.
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
            </RenderIf>
         </div>
      </>
   );
};

export default DashboardFolderDescriptionView;
