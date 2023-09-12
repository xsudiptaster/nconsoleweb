import { Card, Col, Row } from "antd";

import React from "react";
import ApexCodeDescriptionView from "./ApexCodeDescriptionView";
import CountryPicklistDescriptionView from "./CountryPicklistDescriptionView";
import CustomMetadataDescriptionView from "./CustomMetadataDescriptionView";
import DashboardFolderDescriptionView from "./DashboardFolderDescriptionView";
import DiagramDescriptionView from "./DiagramDescriptionView";
import QueryDescriptionView from "./QueryDescriptionView";
import ReportFolderDescriptionView from "./ReportFolderDescriptionView";
import ReportTypeDescriptionView from "./ReportTypeDescriptionView";

interface IHomePageViewProps {
  children?: React.ReactNode;
}

const HomePageView: React.FC<IHomePageViewProps> = (props) => {
  return (
    <Card size="small" bodyStyle={{ maxHeight: "85vh", overflow: "auto" }}>
      <Row gutter={[16, 16]}>
        <Col
          span={6}
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
          span={6}
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
          span={6}
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
          span={6}
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
          span={6}
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
          span={6}
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
          span={6}
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
          span={6}
          style={{
            alignContent: "center",
            borderRadius: "30px",
            background: " #212121",
            boxShadow: "15px 15px 30px rgb(25, 25, 25),-15px -15px 30px rgb(60, 60, 60)",
          }}
        >
          <CustomMetadataDescriptionView />
        </Col>
      </Row>
    </Card>
  );
};

export default HomePageView;
