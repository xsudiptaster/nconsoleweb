import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IQueryExplorerDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const QueryExplorerDescriptionView: React.FC<IQueryExplorerDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "20px" }}>
            <Title>
               Introducing "Salesforce Object Explorer Plus" – Your Ultimate Salesforce Data Navigation and Query Tool!
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     setCurrent("apexCode");
                  }}
               >
                  Go to App
               </Button>
            </Title>
            <Paragraph>
               Discover the full potential of your Salesforce data architecture with Salesforce Object Explorer Plus. This
               cutting-edge app revolutionizes the way you interact with Salesforce objects, empowering users to effortlessly
               navigate object hierarchies, generate complex queries, and visualize data relationships with unprecedented ease and
               efficiency. Whether you're a Salesforce administrator, developer, or business analyst, Salesforce Object Explorer
               Plus is your go-to solution for unlocking actionable insights and maximizing the value of your Salesforce data.
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
                        <Link>Intuitive Object Selection:</Link> Say goodbye to cumbersome navigation menus. Salesforce Object
                        Explorer Plus presents Salesforce objects as intuitive picklists, allowing users to quickly locate and
                        select the objects they need for query building and exploration.
                     </li>
                     <li>
                        <Link>Dynamic Field Display:</Link> Explore the fields of selected objects effortlessly. The app
                        dynamically displays related fields and child objects, enabling users to seamlessly navigate up and down
                        the hierarchy of fields and child objects to select the exact data points they require.
                     </li>
                     <li>
                        <Link>Hierarchical Navigation:</Link> Dive deeper into your data hierarchy with ease. Navigate up and down
                        the hierarchy of fields and child objects, gaining a comprehensive understanding of data relationships and
                        dependencies.
                     </li>
                     <li>
                        <Link>Query Generation Assistance:</Link> Streamline your query creation process with built-in query
                        generation assistance. Salesforce Object Explorer Plus guides users through the query building process,
                        ensuring accurate syntax and optimal performance.
                     </li>
                     <li>
                        <Link>Nested Object Visualization:</Link> Visualize complex data relationships with ease. Query results
                        are displayed in a tabular format that supports nested objects and related records, providing a
                        comprehensive view of your data landscape.
                     </li>
                     <li>
                        <Link>Inner Query Creation:</Link> Take your querying capabilities to the next level with inner query
                        creation. Users can drill down to child queries within the main query, allowing for the retrieval of
                        nested data sets and deeper insights into data relationships.
                     </li>
                     <li>
                        <Link>Real-time Query Execution:</Link> Execute your generated queries against your Salesforce environment
                        directly from the app. Interact with query results in real time, viewing, editing, and manipulating
                        records within the app for immediate action based on insights gained.
                     </li>
                     <li>
                        <Link>Advanced Filtering and Sorting:</Link> Refine your query results with advanced filtering and sorting
                        options. Customize data views to extract meaningful insights, sort data according to preferences, and
                        filter records based on specific criteria.
                     </li>
                     <li>
                        <Link>Secure Access:</Link> Rest assured that your data is handled with the utmost security. Salesforce
                        Object Explorer Plus leverages Salesforce's robust security measures, ensuring that only authorized users
                        can access and interact with sensitive data.
                     </li>
                     <li>
                        <Link>User-Friendly Interface:</Link> Designed for usability, Salesforce Object Explorer Plus features an
                        intuitive interface suitable for users of all skill levels. Enjoy a seamless experience from object
                        exploration to query execution, with comprehensive documentation and support available to maximize
                        utilization.
                     </li>
                  </ul>
                  Unlock the full potential of your Salesforce data with Salesforce Object Explorer Plus. Empower your team to
                  navigate object hierarchies, build complex queries, and visualize data relationships with unprecedented ease and
                  efficiency.
                  <Text strong>
                     Start Exploring with Salesforce Object Explorer Plus and elevate your Salesforce data exploration and
                     querying capabilities to new heights. Experience the future of Salesforce data navigation today.
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

export default QueryExplorerDescriptionView;
