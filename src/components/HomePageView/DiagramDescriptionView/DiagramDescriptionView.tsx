import { Button, Typography } from "antd";

import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IDiagramDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link } = Typography;
const DiagramDescriptionView: React.FC<IDiagramDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Typography>
               <Title>
                  Introducing "Diagram" – Your Ultimate Entity Relationship Diagram Solution!{" "}
                  <Button
                     type="link"
                     size="small"
                     onClick={() => {
                        setCurrent("diagram");
                     }}
                  >
                     Goto App
                  </Button>
               </Title>
               <Paragraph>
                  Unveil the power of your Salesforce data architecture with the ERD Builder app. Seamlessly transforming
                  intricate Salesforce object structures into visually appealing Entity Relationship Diagrams (ERDs), this app
                  offers a revolutionary way to understand, analyze, and optimize your data relationships. Whether you're a
                  seasoned Salesforce administrator or a data enthusiast, ERD Builder simplifies the complexities of your data
                  model, enabling you to harness your CRM potential like never before.
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
                           <Link href="#">Effortless ERD Creation:</Link> With ERD Builder, generating ERDs from your Salesforce
                           object structure is as simple as a few clicks. Instantly visualize your data relationships and gain a
                           holistic view of how your objects interconnect.
                        </li>
                        <li>
                           <Link href="#">Intelligent Link Generation:</Link>Save time and eliminate manual effort with the app's
                           intelligent link generation feature. When selecting reference fields, ERD Builder automatically
                           establishes the appropriate relationships between entities, giving you accurate representations of your
                           data flow.
                        </li>
                        <li>
                           <Link href="#"> Customizable Display:</Link> Tailor your diagram to your exact needs. Handpick the
                           fields you want to display and control the level of detail shown on each entity. Highlight critical
                           information and minimize clutter for a comprehensive yet focused view.
                        </li>
                        <li>
                           <Link href="#"> Dynamic Styling Options: </Link> ERD Builder empowers you to design diagrams that
                           resonate with your unique style. Customize link styles, color palettes, line types, and more, ensuring
                           your ERDs are not just informative, but also visually engaging.
                        </li>
                        <li>
                           <Link href="#"> Seamless Integration:</Link> ERD Builder seamlessly integrates with your Salesforce
                           environment, accessing your object structures directly. No more exporting data or dealing with complex
                           integrations – the app streamlines the process for you.
                        </li>
                        <li>
                           <Link href="#">User-friendly Interface:</Link> Whether you're an ERD novice or an expert, the intuitive
                           interface caters to all skill levels. ERD Builder's user-friendly design makes data modeling accessible
                           and enjoyable.
                        </li>
                     </ul>
                  </Paragraph>
                  Experience the future of data visualization today.
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
            </Typography>
         </div>
      </>
   );
};

export default DiagramDescriptionView;
