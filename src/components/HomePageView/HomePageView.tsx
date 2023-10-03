import { Card, Col, Row, Typography } from "antd";
import React from "react";
import ApexCodeDescriptionView from "./ApexCodeDescriptionView";
import AuditTrackingDescriptionView from "./AuditTrackingDescriptionView";
import CountryPicklistDescriptionView from "./CountryPicklistDescriptionView";
import CustomMetadataDescriptionView from "./CustomMetadataDescriptionView";
import DashboardFolderDescriptionView from "./DashboardFolderDescriptionView";
import DiagramDescriptionView from "./DiagramDescriptionView";
import style from "./HomePageView.module.css";
import PermissionCheckerDescriptionView from "./PermissionCheckerDescriptionView";
import PermissionEditDescriptionView from "./PermissionEditDescriptionView";
import PermissionsCompareDescriptionView from "./PermissionsCompareDescriptionView";
import QueryDescriptionView from "./QueryDescriptionView";
import ReportFolderDescriptionView from "./ReportFolderDescriptionView";
import ReportTypeDescriptionView from "./ReportTypeDescriptionView";
import UserPermissionDescriptionView from "./UserPermissionDescriptionView";
interface IHomePageViewProps {
   children?: React.ReactNode;
}
const { Title, Text } = Typography;
const HomePageView: React.FC<IHomePageViewProps> = (props) => {
   return (
      <Card size="small" bodyStyle={{ maxHeight: "85vh", overflow: "auto", backgroundImage: "../../nconsoleimg_edge.png" }}>
         <div className={style.contentDiv}>
            <Title>NConsole</Title>
            <Text strong>Making Salesforce Administration Easier</Text>
            <br />
            <img width={500} src="../../nconsoleimg.png" alt="logo.png" />
         </div>
         <div className={style.contentDiv}>
            <Title>Features</Title>
         </div>
         <Row gutter={[16, 16]}>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <DiagramDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <ReportTypeDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <ReportFolderDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <DashboardFolderDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <ApexCodeDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <QueryDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <CountryPicklistDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <CustomMetadataDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <PermissionsCompareDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <PermissionEditDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <UserPermissionDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <PermissionCheckerDescriptionView />
            </Col>
            <Col
               span={24}
               style={{
                  alignContent: "center",
                  borderRadius: "30px",
                  background: " #212121",
                  boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
               }}
            >
               <AuditTrackingDescriptionView />
            </Col>
         </Row>
      </Card>
   );
};

export default HomePageView;
