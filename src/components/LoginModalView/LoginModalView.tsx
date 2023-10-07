import { Button, Card, Col, Divider, Row, Typography } from "antd";
import React from "react";
import "../../nconsoleimg_edge.png";
import style from "./LoginModalView.module.css";
import { handleLoad, handleProdLogin, handleTestLogin } from "./LoginModalView.util";
import MiniInfoCardView from "./MiniInfoCardView";
interface ILoginModalViewProps {
   children?: React.ReactNode;
}
const { Title } = Typography;
const LoginModalView: React.FC<ILoginModalViewProps> = (props) => {
   const [state, setState] = React.useState<any>("");
   React.useEffect(() => {
      const onload = () => {
         let response = handleLoad();
         setState(response);
      };
      onload();
   }, []);
   return (
      <>
         <div
            style={{
               backgroundImage: "../../nconsoleimg_edge.png",
            }}
         >
            <div className={style.logindiv}>
               <Card
                  className={style.logincard}
                  title={<div style={{ textAlign: "center" }}>Login</div>}
                  style={{ width: "500px" }}
               >
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleProdLogin(state);
                     }}
                  >
                     Production
                  </Button>
                  <Divider />
                  <Button
                     block
                     size="large"
                     onClick={() => {
                        handleTestLogin(state);
                     }}
                  >
                     Sandbox
                  </Button>
               </Card>
            </div>
            <div className={style.footerDiv}></div>
         </div>
         <br />
         <Card size="small">
            <Row justify="space-evenly">
               <Col span={4}>
                  <MiniInfoCardView appName="Diagram" title="Ultimate Entity Relationship Diagram Solution!" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView appName="Custom Report Editor Pro" title="Revolutionizing Salesforce Custom Report Types!" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView appName="Report Tree View" title="Your Ultimate Salesforce Report Management App" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Dashboard Tree View"
                     title="Elevate Your Data Insights with Dynamic Dashboard Management"
                  />
               </Col>
            </Row>
            <Divider></Divider>
            <Row justify="space-evenly">
               <Col span={4}>
                  <MiniInfoCardView appName="ApexLogic Runner" title=" Your Ultimate Salesforce Customization App!" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView appName="ExcelQuery Pro" title="Empowering Data-Driven Insights!" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="GeoData Manager"
                     title="Your Salesforce Country & State Picklist Management Solution!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView appName="MetaModify Pro" title="Your Salesforce Custom Metadata Bulk Editor" />
               </Col>
            </Row>
            <Divider></Divider>
            <Row justify="space-evenly">
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Profile & Permission Set Comparator"
                     title="Your Ultimate Salesforce Security Review & Management Tool!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="ProfilePro Bulk Editor"
                     title="Your Comprehensive Salesforce Profile and Permission Set Management Solution!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="UserPermissions Insight"
                     title="Your Salesforce User Permission Visualization Tool!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Permission Detective Pro"
                     title="Your Comprehensive Salesforce Permission Analysis Companion!"
                  />
               </Col>
            </Row>
            <Divider></Divider>
            <Row justify="space-evenly">
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Audit Trail Analyzer"
                     title=" Your Salesforce Change Tracking and Analysis Companion!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Metadata Delete Manager"
                     title="Your Salesforce Metadata Cleanup and Organization Tool!"
                  />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView appName="Metadata Deploy Manager" title="Your Salesforce Metadata Deployment Tool!" />
               </Col>
               <Col span={4}>
                  <MiniInfoCardView
                     appName="Change Set Manager Pro"
                     title="Your Ultimate Salesforce Change Set Management Solution!"
                  />
               </Col>
            </Row>
         </Card>
      </>
   );
};

export default LoginModalView;
