import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IApexCodeDescriptionViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const ApexCodeDescriptionView: React.FC<IApexCodeDescriptionViewProps> = (props) => {
   const [, setCurrent] = useRecoilState(selectedAppAtom);
   const [showDetail, setShowDetail] = React.useState(false);
   return (
      <>
         <div style={{ padding: "20px" }}>
            <Title>
               Introducing "ApexLogic Runner" - Your Ultimate Salesforce Customization App
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
               The ApexLogic Runner is a cutting-edge application designed to empower Salesforce administrators and developers
               with the ability to seamlessly integrate custom logic into their Salesforce instances. This versatile app offers a
               unique blend of data manipulation, automation, and control, enabling users to execute Apex code on specific
               records, based on either a user-provided Excel sheet or a specified loop count.
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
                        <Link>Dynamic Logic Integration:</Link> ApexLogic Runner allows users to input their custom Apex code
                        snippets directly through an intuitive interface. This empowers users to create tailor-made logic to apply
                        on Salesforce records.
                     </li>
                     <li>
                        <Link>Excel Sheet Integration:</Link> Users can upload an Excel sheet containing data, and the app
                        automatically maps the columns as variables in the Apex code. The code execution will replace specific
                        placeholders with the values from the sheet rows, facilitating dynamic data-driven processes.
                     </li>
                     <li>
                        <Link>Loop Count Option:</Link> If an Excel sheet is not required, users can choose to specify a loop
                        count. The provided Apex code will be executed the designated number of times on the Salesforce instance,
                        allowing for efficient batch processing.
                     </li>
                     <li>
                        <Link>Real-time Execution:</Link> The app instantly executes the provided Apex code on the logged-in
                        Salesforce instance, providing immediate results. Users can view the execution status and any error
                        messages for debugging purposes.
                     </li>
                     <li>
                        <Link>Execution Result Table:</Link> Upon successful execution, the app displays the result of the code
                        execution in a tabular format. This table is conveniently integrated with the original Excel sheet data
                        (if used), providing a comprehensive overview of data changes.
                     </li>
                     <li>
                        <Link>Custom Column Display:</Link> Users can select the specific columns they want to display in the
                        execution result table, enhancing data visualization. This feature allows users to focus on relevant
                        information and make informed decisions.
                     </li>
                     <li>
                        <Link>Sorting and Filtering:</Link> ApexLogic Runner offers sorting and filtering functionalities,
                        enabling users to organize and analyze execution results according to their preferences. This enhances the
                        app's usability and assists in identifying patterns.
                     </li>
                     <li>
                        <Link>Downloadable Results:</Link> Users can download the execution result table for further analysis or
                        reporting purposes. This enhances data portability and supports documentation needs.
                     </li>
                  </ul>
                  ApexLogic Runner aims to bridge the gap between data manipulation and code execution within the Salesforce
                  environment. Whether it's a one-time data transformation task or a repetitive automation requirement, this app
                  empowers users to harness the full potential of their Salesforce instance while maintaining control over the
                  execution process.
                  <Text strong>
                     Experience the future of Salesforce customization with ApexLogic Runner – where data meets code, and
                     innovation meets efficiency.
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

export default ApexCodeDescriptionView;
