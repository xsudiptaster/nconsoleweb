import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IReportFolderDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const ReportFolderDescriptionView: React.FC<IReportFolderDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               {" "}
               Introducing Report Tree View: Your Ultimate Salesforce Report Management App
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
               Unleash the power of organized data visualization with Report Tree View, the innovative app designed to transform
               the way you interact with Salesforce reports and report folders. Say goodbye to the complexities of navigating
               through numerous folders and reports, and say hello to a streamlined, efficient, and user-friendly experience that
               empowers you to take control of your Salesforce data.
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
                        <Link>Intuitive Tree Structure:</Link> Report Tree View revolutionizes your data visualization experience
                        by presenting your Salesforce reports and report folders in a hierarchical tree structure. Easily navigate
                        through your data with an intuitive layout that mirrors your organization's hierarchy.
                     </li>
                     <li>
                        <Link>Edit with Ease:</Link> Tired of searching for that one report in a sea of folders? With Report Tree
                        View, you can edit the names of folders and reports effortlessly. Rename reports and folders to suit your
                        preferences, making data management a breeze.
                     </li>
                     <li>
                        <Link>Effortless Organization:</Link> Create new folders on the fly to categorize your reports according
                        to your workflow. Move reports seamlessly between folders using the cut-paste functionality, ensuring that
                        your data is always in the right place.
                     </li>
                     <li>
                        <Link>Copy and Paste Magic:</Link> Need to replicate reports or folders? Utilize the copy-paste
                        functionality to duplicate reports within the same folder or across different folders. Maintain data
                        consistency without the hassle.
                     </li>
                     <li>
                        <Link>Mirror View Convenience:</Link> Report Tree View provides a mirror view of your tree structure,
                        making it simple to move items from the top to the lower end of the tree and vice versa.
                     </li>
                     <li>
                        <Link>Deep Search Capability:</Link> Digging deep for that hidden report? Our app comes equipped with a
                        robust search feature that helps you find reports saved within deeply nested folder trees. No more endless
                        scrolling – find what you need in seconds.
                     </li>
                     <li>
                        <Link>Delete with Confidence:</Link> When it's time to clean up, rest easy knowing you can delete folders
                        and reports with confidence. Our app ensures that deletions are smooth, and you won't accidentally remove
                        the wrong data.
                     </li>
                     <Title level={2}>Benefits:</Title>
                     <ul>
                        <li>
                           <Link>Enhanced Productivity:</Link> Navigate your Salesforce reports and folders with unprecedented
                           speed and efficiency, freeing up valuable time for more strategic tasks.
                        </li>
                        <li>
                           <Link>Intelligent Data Management:</Link> Edit, organize, and manipulate your data seamlessly, allowing
                           you to tailor your Salesforce workspace to match your specific needs.
                        </li>
                        <li>
                           <Link>Reduced Errors:</Link> Cut down on human errors with intuitive copy-paste options and visual cues
                           that guide your actions.
                        </li>
                        <li>
                           <Link>Better Decision-Making:</Link> Access the data you need when you need it, resulting in
                           well-informed decisions that drive business growth.
                        </li>
                     </ul>
                     <Text strong>
                        Experience Report Tree View today and revolutionize the way you manage your Salesforce reports and report
                        folders. Streamline your workflow, optimize your data management, and achieve new levels of productivity.
                        Get ready to take control like never before.{" "}
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
                  </ul>
               </Paragraph>
            </RenderIf>
         </div>
      </>
   );
};

export default ReportFolderDescriptionView;
