import { Button, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IQueryDescriptionViewProps {
  children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const QueryDescriptionView: React.FC<IQueryDescriptionViewProps> = (props) => {
  const [, setCurrent] = useRecoilState(selectedAppAtom);
  const [showDetail, setShowDetail] = React.useState(false);
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Title>
          Introducing "ExcelQuery Pro" - Empowering Data-Driven Insights
          <Button
            type="link"
            size="small"
            onClick={() => {
              setCurrent("query");
            }}
          >
            Goto App
          </Button>
        </Title>
        <Paragraph>
          "ExcelQuery Pro" is a powerful and user-friendly application designed to transform the way you interact with your data.
          With seamless integration of Excel sheets, custom queries, and intuitive result visualization, this app is a must-have
          for professionals seeking deeper insights and analysis.
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
                <Link>Excel Sheet Integration:</Link> ExcelQuery Pro allows users to effortlessly upload Excel sheets. The columns
                within the sheet automatically become variables that can be referenced in user-provided queries. This dynamic
                connection empowers you to harness your data directly from your spreadsheets.
              </li>
              <li>
                <Link>Custom Queries:</Link> Users can input their own queries using a familiar query language. By utilizing the
                columns as variables, users can create tailored queries that pull specific data based on the row content. This
                enables intricate data manipulations without the need for complex coding.
              </li>
              <li>
                <Link>Instant Query Execution:</Link> Once a query is provided, ExcelQuery Pro processes the query against the
                uploaded Excel data and presents the results in a separate tab. The query engine seamlessly integrates the row
                data, replacing variables with actual values to generate real-time results.
              </li>
              <li>
                <Link>Results Tab:</Link> The application presents the results in a dedicated tab, showcasing the output of your
                custom queries. Each result row is labeled with the index of the source row from the Excel sheet, facilitating
                traceability and enhancing your understanding of the data's origin.
              </li>
              <li>
                <Link>Flexible Display Options:</Link> ExcelQuery Pro offers the flexibility to customize the display. Users can
                select which columns they want to see in the results table, enhancing data visibility and streamlining analysis.
              </li>
              <li>
                <Link>Sorting and Filtering:</Link> The app provides built-in sorting and filtering capabilities, allowing users
                to organize and refine their data. This aids in identifying trends, outliers, and patterns quickly and
                efficiently.
              </li>
              <li>
                <Link>Downloadable Results:</Link> Users can easily export the query results to Excel format. This feature ensures
                that insights gained through the app can be shared, integrated into reports, or used for further analysis beyond
                the application.
              </li>
            </ul>
            <Text strong>Experience the Power of Data-Driven Insights:</Text>
            ExcelQuery Pro bridges the gap between raw data and actionable insights. With a user-friendly interface that
            integrates your Excel sheets, powerful query capabilities, and robust visualization options, the app empowers users to
            turn data into meaningful decisions. By offering both flexibility and precision, ExcelQuery Pro becomes an
            indispensable tool for professionals across various fields.
            <br />
            <Text strong>
              Unleash the potential of your data like never before with ExcelQuery Pro – where your data meets your insights, and
              your decisions are driven by knowledge.
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

export default QueryDescriptionView;
