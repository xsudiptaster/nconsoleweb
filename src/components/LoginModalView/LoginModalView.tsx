import { Button, Card, Col, Divider, Modal, Row, Typography } from "antd";
import React from "react";
import "../../nconsoleimg_edge.png";
import RenderIf from "../../utils/RenderIf";
import ContactUsFormView from "../ContactUsFormView";
import ApexCodeDescriptionView from "../HomePageView/ApexCodeDescriptionView";
import AuditTrackingDescriptionView from "../HomePageView/AuditTrackingDescriptionView";
import CountryPicklistDescriptionView from "../HomePageView/CountryPicklistDescriptionView";
import CreateChangeSetDescriptionView from "../HomePageView/CreateChangeSetDescriptionView";
import CustomMetadataDescriptionView from "../HomePageView/CustomMetadataDescriptionView";
import DashboardFolderDescriptionView from "../HomePageView/DashboardFolderDescriptionView";
import DeleteMetadataDescriptionView from "../HomePageView/DeleteMetadataDescriptionView";
import DeployMetadataDescriptionView from "../HomePageView/DeployMetadataDescriptionView";
import DiagramDescriptionView from "../HomePageView/DiagramDescriptionView";
import PermissionCheckerDescriptionView from "../HomePageView/PermissionCheckerDescriptionView";
import PermissionEditDescriptionView from "../HomePageView/PermissionEditDescriptionView";
import PermissionsCompareDescriptionView from "../HomePageView/PermissionsCompareDescriptionView";
import QueryDescriptionView from "../HomePageView/QueryDescriptionView";
import ReportFolderDescriptionView from "../HomePageView/ReportFolderDescriptionView";
import ReportTypeDescriptionView from "../HomePageView/ReportTypeDescriptionView";
import ToolingQueryDescriptionView from "../HomePageView/ToolingQueryDescriptionView";
import UserPermissionDescriptionView from "../HomePageView/UserPermissionDescriptionView";
import style from "./LoginModalView.module.css";
import { handleLoad, handleProdLogin, handleTestLogin } from "./LoginModalView.util";
import MiniInfoCardView from "./MiniInfoCardView";
interface ILoginModalViewProps {
   children?: React.ReactNode;
}
const { Title } = Typography;
const LoginModalView: React.FC<ILoginModalViewProps> = (props) => {
   const [state, setState] = React.useState<any>("");
   const [showContactUs, setShowContactUs] = React.useState(false);
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
            className={style.loginFadeIn}
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
         <RenderIf renderIf={state === null}>
            <Card
               bordered={false}
               size="small"
               title={<Title level={3}>Features:</Title>}
               extra={
                  <Button
                     size="small"
                     type="link"
                     onClick={() => {
                        setShowContactUs(true);
                     }}
                  >
                     Report Problem
                  </Button>
               }
            >
               <Row justify="space-evenly" className="gutter-row">
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Diagram"
                        title="Ultimate Entity Relationship Diagram Solution!"
                        fullDescription={<DiagramDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Custom Report Editor Pro"
                        title="Revolutionizing Salesforce Custom Report Types!"
                        fullDescription={<ReportTypeDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Report Tree View"
                        title="Your Ultimate Salesforce Report Management App"
                        fullDescription={<ReportFolderDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Dashboard Tree View"
                        title="Elevate Your Data Insights with Dynamic Dashboard Management"
                        fullDescription={<DashboardFolderDescriptionView />}
                     />
                  </Col>
               </Row>
               <Divider></Divider>
               <Row justify="space-evenly" className="gutter-row">
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="ApexLogic Runner"
                        title=" Your Ultimate Salesforce Customization App!"
                        fullDescription={<ApexCodeDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="ExcelQuery Pro"
                        title="Empowering Data-Driven Insights!"
                        fullDescription={<QueryDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="GeoData Manager"
                        title="Your Salesforce Country & State Picklist Management Solution!"
                        fullDescription={<CountryPicklistDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="MetaModify Pro"
                        title="Your Salesforce Custom Metadata Bulk Editor"
                        fullDescription={<CustomMetadataDescriptionView />}
                     />
                  </Col>
               </Row>
               <Divider></Divider>
               <Row justify="space-evenly" className="gutter-row">
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Profile & Permission Set Comparator"
                        title="Your Ultimate Salesforce Security Review & Management Tool!"
                        fullDescription={<PermissionsCompareDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="ProfilePro Bulk Editor"
                        title="Your Comprehensive Salesforce Profile and Permission Set Management Solution!"
                        fullDescription={<PermissionEditDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="UserPermissions Insight"
                        title="Your Salesforce User Permission Visualization Tool!"
                        fullDescription={<UserPermissionDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Permission Detective Pro"
                        title="Your Comprehensive Salesforce Permission Analysis Companion!"
                        fullDescription={<PermissionCheckerDescriptionView />}
                     />
                  </Col>
               </Row>
               <Divider></Divider>
               <Row justify="space-evenly" className="gutter-row">
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Audit Trail Analyzer"
                        title=" Your Salesforce Change Tracking and Analysis Companion!"
                        fullDescription={<AuditTrackingDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Metadata Delete Manager"
                        title="Your Salesforce Metadata Cleanup and Organization Tool!"
                        fullDescription={<DeleteMetadataDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Metadata Deploy Manager"
                        title="Your Salesforce Metadata Deployment Tool!"
                        fullDescription={<DeployMetadataDescriptionView />}
                     />
                  </Col>
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Change Set Manager Pro"
                        title="Your Ultimate Salesforce Change Set Management Solution!"
                        fullDescription={<CreateChangeSetDescriptionView />}
                     />
                  </Col>
               </Row>
               <Divider></Divider>
               <Row justify="space-evenly" className="gutter-row">
                  <Col span={4} xs={24} md={6} xl={4}>
                     <MiniInfoCardView
                        appName="Salesforce Tooling Explorer"
                        title="Your Ultimate Companion for Navigating Tooling Objects with Ease!"
                        fullDescription={<ToolingQueryDescriptionView />}
                     />
                  </Col>
               </Row>
            </Card>
         </RenderIf>
         <Modal
            destroyOnClose
            width={600}
            open={showContactUs}
            footer={null}
            onCancel={() => {
               setShowContactUs(false);
            }}
         >
            <ContactUsFormView />
         </Modal>
      </>
   );
};

export default LoginModalView;
