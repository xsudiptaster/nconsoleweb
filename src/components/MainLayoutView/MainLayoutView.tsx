import {
   BoxPlotOutlined,
   DeploymentUnitOutlined,
   ExperimentOutlined,
   FileImageOutlined,
   HomeOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import { App, Layout, Menu, MenuProps, Spin, Switch } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, selectedAppAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import ApexCodeView from "../ApexCodeView";
import CountryPicklistView from "../CountryPicklistView";
import CustomMetadataEditView from "../CustomMetadataEditView";
import DashBoardFoldersView from "../DashBoardFoldersView";
import DiagramView from "../DiagramView";
import HomePageView from "../HomePageView";
import QuerySheetView from "../QuerySheetView";
import ReportFoldersView from "../ReportFoldersView";
import ReportTypeView from "../ReportTypeView";
import StatusModalView from "../StatusModalView";
import { checkLogin, handleLogout } from "./MainLayoutView.util";
interface IMainLayoutViewProps {
   children?: React.ReactNode;
}

const MainLayoutView: React.FC<IMainLayoutViewProps> = (props) => {
   const [loading] = useRecoilState(loadingAtom);
   const [current, setCurrent] = useRecoilState(selectedAppAtom);
   React.useEffect(() => {
      const onload = async () => {
         await checkLogin();
      };
      onload();
   }, []);
   const onClick: MenuProps["onClick"] = (e) => {
      setCurrent(e.key);
   };
   const onLogout = async () => {
      await handleLogout();
      window.open("/", "_self");
   };
   const items: MenuProps["items"] = [
      {
         label: "Home",
         key: "home",
         icon: <HomeOutlined />,
      },
      {
         label: "Diagram",
         key: "diagram",
         icon: <FileImageOutlined />,
      },
      {
         label: "Analytics",
         key: "analytics",
         icon: <SettingOutlined />,
         children: [
            {
               type: "group",
               label: "Salesforce",
               children: [
                  {
                     label: "Custom Report Editor Pro",
                     key: "reportType",
                  },
                  {
                     label: "Report Tree View",
                     key: "reportFolders",
                  },
                  {
                     label: "Dashboard Tree View",
                     key: "dashboardFolders",
                  },
               ],
            },
         ],
      },
      {
         label: "Data Manipulation",
         key: "Data",
         icon: <BoxPlotOutlined />,
         children: [
            {
               label: "ApexLogic Runner",
               key: "apexCode",
            },
            {
               label: "ExcelQuery Pro",
               key: "query",
            },
         ],
      },
      {
         label: "Metadata Edit",
         key: "metadataEdit",
         icon: <DeploymentUnitOutlined />,
         children: [
            {
               label: "Custom Metadata",
               key: "customMetadata",
            },
            {
               label: "GeoData Manager",
               key: "addressUpdate",
            },
         ],
      },
      {
         label: "Permissions",
         key: "permissions",
         icon: <ExperimentOutlined />,
         children: [
            {
               label: "Permission Edit",
               key: "permissionEdit",
            },
            {
               label: "Permission Compare",
               key: "permisionCompare",
            },
         ],
      },
   ];
   return (
      <>
         <App>
            <Spin spinning={loading} tip={<StatusModalView />} delay={500} size="large">
               <Layout>
                  <Header style={{ width: "100%", backgroundColor: "#141414" }}>
                     <div style={{ float: "right" }}>
                        <Switch checkedChildren="Log Out" defaultChecked={true} unCheckedChildren="Log In" onChange={onLogout} />
                     </div>
                     <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        style={{ width: "90%", backgroundColor: "#fffff" }}
                     />
                  </Header>
                  <Layout>
                     <Content style={{ minHeight: "87vh", overflow: "auto" }}>
                        <RenderIf renderIf={current === "home"}>
                           <HomePageView />
                        </RenderIf>
                        <RenderIf renderIf={current === "diagram"}>
                           <DiagramView />
                        </RenderIf>
                        <RenderIf renderIf={current === "reportType"}>
                           <ReportTypeView />
                        </RenderIf>
                        <RenderIf renderIf={current === "reportFolders"}>
                           <ReportFoldersView />
                        </RenderIf>
                        <RenderIf renderIf={current === "dashboardFolders"}>
                           <DashBoardFoldersView />
                        </RenderIf>
                        <RenderIf renderIf={current === "apexCode"}>
                           <ApexCodeView />
                        </RenderIf>
                        <RenderIf renderIf={current === "query"}>
                           <QuerySheetView />
                        </RenderIf>
                        <RenderIf renderIf={current === "addressUpdate"}>
                           <CountryPicklistView />
                        </RenderIf>
                        <RenderIf renderIf={current === "customMetadata"}>
                           <CustomMetadataEditView />
                        </RenderIf>
                     </Content>
                  </Layout>
                  <Footer style={{ textAlign: "center", maxHeight: "20px" }}>NConsole ©2023 Created by Sudipta Karmakar</Footer>
               </Layout>
            </Spin>
         </App>
      </>
   );
};

export default MainLayoutView;
