import {
   BoxPlotOutlined,
   DeploymentUnitOutlined,
   ExperimentOutlined,
   FileImageOutlined,
   HomeOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import { App, Avatar, Button, Layout, Menu, MenuProps, Modal, Popover, Space, Spin } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFiletypeXml, BsFillSendFill } from "react-icons/bs";
import { SiAdobeaudition } from "react-icons/si";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom, selectedAppAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import ApexCodeView from "../ApexCodeView";
import AuditTrackingView from "../AuditTrackingView";
import ContactUsFormView from "../ContactUsFormView";
import CountryPicklistView from "../CountryPicklistView";
import CreateChangeSetView from "../CreateChangeSetView";
import CustomMetadataEditView from "../CustomMetadataEditView";
import DashBoardFoldersView from "../DashBoardFoldersView";
import DeleteMetadataView from "../DeleteMetadataView";
import DeployMetaDataView from "../DeployMetaDataView";
import DiagramView from "../DiagramView";
import HomePageView from "../HomePageView";
import PermissionCheckerView from "../PermissionCheckerView";
import PermissionCompareView from "../PermissionCompareView";
import PermissionEditView from "../PermissionEditView";
import QuerySheetView from "../QuerySheetView";
import ReportFoldersView from "../ReportFoldersView";
import ReportTypeView from "../ReportTypeView";
import StatusModalView from "../StatusModalView";
import UserPermissionAnalysisView from "../UserPermissionAnalysisView";
import { checkLogin, handleLogout } from "./MainLayoutView.util";
import TagLogoView from "./TagLogoView";
interface IMainLayoutViewProps {
   children?: React.ReactNode;
}

const MainLayoutView: React.FC<IMainLayoutViewProps> = (props) => {
   const [loading, setLoading] = useRecoilState(loadingAtom);
   const [current, setCurrent] = useRecoilState(selectedAppAtom);
   const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom);
   const [showContactUs, setShowContactUs] = React.useState(false);
   const [load, setLoad] = React.useState(true);
   React.useEffect(() => {
      const onload = async () => {
         if (load) {
            let response = await checkLogin();
            if (response.access_token) {
               let tempLoginInfo = { ...response, ...loginInfo };
               setLoginInfo(tempLoginInfo);
            } else {
               window.open("/", "_self");
            }
            window.addEventListener("offline", () => {
               window.open("/", "_self");
            });
            setLoad(false);
         }
      };
      onload();
   }, [load, loginInfo, setLoginInfo]);
   const onClick: MenuProps["onClick"] = (e) => {
      setCurrent(e.key);
   };
   const onLogout = async () => {
      setLoading(true);
      await handleLogout();
      setLoading(false);
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
               label: <TagLogoView tagName="CRE" labelName="Custom Report Editor Pro" />,
               key: "reportType",
            },
            {
               label: <TagLogoView tagName="RTV" labelName="Report Tree View" />,
               key: "reportFolders",
            },
            {
               label: <TagLogoView tagName="DTV" labelName="Dashboard Tree View" />,
               key: "dashboardFolders",
            },
         ],
      },
      {
         label: "Data Manipulation",
         key: "Data",
         icon: <BoxPlotOutlined />,
         children: [
            {
               label: <TagLogoView tagName="AR" labelName="ApexLogic Runner" />,
               key: "apexCode",
            },
            {
               label: <TagLogoView tagName="EQ" labelName="ExcelQuery Pro" />,
               key: "query",
            },
         ],
      },
      {
         label: "Custom Metadata and Address",
         key: "metadataEdit",
         icon: <DeploymentUnitOutlined />,
         children: [
            {
               label: <TagLogoView tagName="MM" labelName="MetaModify Pro" />,
               key: "customMetadata",
            },
            {
               label: <TagLogoView tagName="GDM" labelName="GeoData Manager" />,
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
               label: <TagLogoView tagName="PBE" labelName="ProfilePro Bulk Editor" />,
               key: "permissionEdit",
            },
            {
               label: <TagLogoView tagName="P&PSC" labelName="Profile & Permission Set Comparator" />,
               key: "permisionCompare",
            },
            {
               label: <TagLogoView tagName="UPI" labelName="UserPermissions Insight" />,
               key: "userPermission",
            },
            {
               label: <TagLogoView tagName="PDP" labelName="Permission Detective Pro" />,
               key: "permissionChecker",
            },
         ],
      },
      {
         icon: <SiAdobeaudition />,
         label: "Audit Trail Analyzer",
         key: "auditTracker",
      },
      {
         icon: <BsFiletypeXml />,
         label: "Metadata",
         key: "metadata",
         children: [
            {
               label: <TagLogoView tagName="MDLM" labelName="Metadata Delete Manager" />,
               key: "deleteMetadata",
            },
            {
               label: <TagLogoView tagName="MDM" labelName="Metadata Deploy Manager" />,
               key: "deployMetadata",
            },
            {
               label: <TagLogoView tagName="CSM" labelName="Change Set Manager Pro" />,
               key: "createChangeSet",
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
                        <Popover
                           placement="top"
                           title={loginInfo?.display_name}
                           content={
                              <Space>
                                 <Space.Compact direction="vertical">
                                    {loginInfo?.username}
                                    <Space>
                                       <Button
                                          type="link"
                                          size="small"
                                          onClick={() => {
                                             setShowContactUs(true);
                                          }}
                                       >
                                          Report Problem
                                       </Button>
                                       <Button
                                          icon={<BsFillSendFill />}
                                          size="small"
                                          type="text"
                                          onClick={() => {
                                             window.open(loginInfo.urls.custom_domain, "_blank");
                                          }}
                                       >
                                          Open
                                       </Button>
                                       <Button icon={<AiOutlineLogout />} size="small" type="text" onClick={onLogout}>
                                          Logout
                                       </Button>
                                    </Space>
                                 </Space.Compact>
                              </Space>
                           }
                           trigger="hover"
                        >
                           <Avatar size="small" src={loginInfo?.photos?.picture} />
                        </Popover>
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
                        <RenderIf renderIf={current === "permisionCompare"}>
                           <PermissionCompareView />
                        </RenderIf>
                        <RenderIf renderIf={current === "permissionEdit"}>
                           <PermissionEditView />
                        </RenderIf>
                        <RenderIf renderIf={current === "userPermission"}>
                           <UserPermissionAnalysisView />
                        </RenderIf>
                        <RenderIf renderIf={current === "permissionChecker"}>
                           <PermissionCheckerView />
                        </RenderIf>
                        <RenderIf renderIf={current === "auditTracker"}>
                           <AuditTrackingView />
                        </RenderIf>
                        <RenderIf renderIf={current === "deleteMetadata"}>
                           <DeleteMetadataView />
                        </RenderIf>
                        <RenderIf renderIf={current === "deployMetadata"}>
                           <DeployMetaDataView />
                        </RenderIf>
                        <RenderIf renderIf={current === "createChangeSet"}>
                           <CreateChangeSetView />
                        </RenderIf>
                     </Content>
                  </Layout>
                  <Footer style={{ textAlign: "center", maxHeight: "20px" }}>NConsole ©2023 Created by Sudipta Karmakar</Footer>
               </Layout>
            </Spin>
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
         </App>
      </>
   );
};

export default MainLayoutView;
