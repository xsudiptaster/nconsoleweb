import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IToolingQueryDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Text, Link } = Typography;
const ToolingQueryDescriptionView: React.FC<IToolingQueryDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "30px" }}>
            <Title>
               Introducing "Salesforce Tooling Explorer" – Your Ultimate Companion for Navigating Tooling Objects with Ease!
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
               Unleash the power of Salesforce Tooling Objects like never before with the Salesforce Tooling Explorer app.
               Designed to streamline your development workflow, this innovative tool empowers users to effortlessly explore,
               query, and visualize Tooling Objects and their related fields. Whether you're a seasoned Salesforce developer or
               just starting your journey, Salesforce Tooling Explorer simplifies the complexities of Salesforce development,
               allowing you to navigate your data hierarchy with confidence and efficiency.
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
                        <Link>Intuitive Tooling Object Picklists:</Link> Say goodbye to manual navigation through Salesforce
                        Tooling Objects. With Salesforce Tooling Explorer, access Tooling Objects effortlessly through intuitive
                        picklists, enabling you to quickly locate the objects you need without the hassle of searching through
                        documentation.
                     </li>
                     <li>
                        <Link>Dynamic Field Selection:</Link> Effortlessly select related fields and traverse the hierarchy of
                        Tooling Objects with ease. The app dynamically displays related fields and child objects, allowing you to
                        explore and select the exact data points you require for your queries.
                     </li>
                     <li>
                        <Link>Hierarchical Field Navigation:</Link> Navigate up and down the hierarchy of fields and child objects
                        seamlessly. Whether you need to access parent fields or explore nested child objects, Salesforce Tooling
                        Explorer provides a user-friendly interface for efficient navigation.
                     </li>
                     <li>
                        <Link>Query Generation Assistance:</Link> Generate SOQL queries effortlessly with the help of Salesforce
                        Tooling Explorer. The app guides you through the query creation process, ensuring accurate syntax and
                        optimal performance.
                     </li>
                     <li>
                        <Link>Query Execution and Visualization:</Link> Execute your generated queries against your Salesforce
                        environment directly from the app. Visualize the results in a tabular format, with support for nested
                        objects and related records, providing a comprehensive view of your data landscape.
                     </li>
                     <li>
                        <Link>Advanced Filtering and Sorting:</Link> Refine your query results with advanced filtering and sorting
                        options. Drill down into specific records, sort data according to your preferences, and extract meaningful
                        insights with ease.
                     </li>
                     <li>
                        <Link>User-Friendly Interface:</Link> Designed with usability in mind, Salesforce Tooling Explorer
                        features an intuitive interface that caters to users of all skill levels. Whether you're a Salesforce
                        novice or an experienced developer, the app provides a seamless experience from exploration to query
                        execution.
                     </li>
                  </ul>
                  <Text>
                     Streamline your Salesforce development process with Salesforce Tooling Explorer. Explore, query, and
                     visualize Tooling Objects with unparalleled ease and efficiency, and unlock the full potential of your
                     Salesforce environment. Start Exploring with Salesforce Tooling Explorer and experience a new era of
                     Salesforce development productivity. Revolutionize your development workflow today.
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

export default ToolingQueryDescriptionView;
