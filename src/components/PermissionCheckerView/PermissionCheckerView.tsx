import { Button, Card, Col, Divider, Row, Select, Space, Tooltip } from "antd";
import React from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom } from "../../atoms/atom";
import RenderIf from "./../../utils/RenderIf/RenderIf";
import ApexClassPermissionChecker from "./ApexClassPermissionChecker";
import ApexPagePermissionChecker from "./ApexPagePermissionChecker";
import FieldPermissionChecker from "./FieldPermissionChecker";
import ObjectPermissionChecker from "./ObjectPermissionChecker";
import style from "./PermissionCheckerView.module.css";
import { getSelectedUsers, handleAnalysis, handleLoad } from "./PermissionCheckerView.util";

import RecordTypePermissionChecker from "./RecordTypePermissionChecker";
import UserPermissionChecker from "./UserPermissionChecker";

interface IPermissionCheckerViewProps {
   children?: React.ReactNode;
}

const PermissionCheckerView: React.FC<IPermissionCheckerViewProps> = (props) => {
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [analysisData, setAnalysisData] = React.useState<any>({});
   const [selectedPermissions, setSelectedPermissions] = React.useState("");
   const [selected, setSelected] = React.useState<any>({ selectedProfiles: [], selectedPermissionSets: [] });
   const [options, setOptions] = React.useState<any>({ listProfiles: [], listPermissionSets: [] });
   const [selectedProfiles, setSelectedProfiles] = React.useState<any[]>([]);
   const [selectedPermissionSets, setSelectedPermissionSets] = React.useState<any[]>([]);
   const [analysisCompleted, setAnalysisCompleted] = React.useState(false);
   const [userMap, setUserMap] = React.useState<any>({});

   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setSelectedProfiles(response.listProfiles);
         setSelectedPermissionSets(response.listPermissionSets);
         setOptions(response);
      };
      onload();
   }, []);
   const onClickAnalysis = async () => {
      setLoading(true);
      let response = await handleAnalysis(selectedProfiles, selectedPermissionSets);
      setAnalysisCompleted(true);
      setAnalysisData(response);
      setLoading(false);
   };
   const getFilteredData = (data: any) => {
      setSelected(data);
      setUserMap({});
   };
   const getUsers = async () => {
      setLoading(true);
      let response = await getSelectedUsers(selected);
      setUserMap(response);
      setLoading(false);
   };
   return (
      <>
         <Card
            bodyStyle={{ height: "80vh", overflow: "auto" }}
            size="small"
            title={
               <Space>
                  <Select
                     size="small"
                     placeholder="Select Profiles"
                     maxTagCount="responsive"
                     mode="multiple"
                     style={{ width: 400 }}
                     value={selectedProfiles.map((ele) => {
                        return ele.fullName;
                     })}
                     bordered={false}
                     onChange={(values, valuesOptions: any) => {
                        setSelectedProfiles(valuesOptions);
                     }}
                     options={options.listProfiles
                        .sort((a: any, b: any) => {
                           return a.fullName > b.fullName ? 1 : -1;
                        })
                        .map((ele: any) => {
                           return { label: ele.fullName, value: ele.fullName, ...ele };
                        })}
                     dropdownRender={(menu) => (
                        <>
                           <div style={{ textAlign: "center", top: "50%" }}>
                              <RenderIf renderIf={options.listProfiles.length !== selectedProfiles.length}>
                                 <Button
                                    size="small"
                                    style={{ width: "100%" }}
                                    type="text"
                                    onClick={() => {
                                       setSelectedProfiles(options.listProfiles);
                                    }}
                                 >
                                    Select All
                                 </Button>
                              </RenderIf>
                              <RenderIf renderIf={options.listProfiles.length === selectedProfiles.length}>
                                 <Button
                                    size="small"
                                    style={{ width: "100%" }}
                                    type="text"
                                    onClick={() => {
                                       setSelectedProfiles([]);
                                    }}
                                 >
                                    DeSelect All
                                 </Button>
                              </RenderIf>
                           </div>
                           <Divider style={{ margin: "8px 0" }} />
                           {menu}
                        </>
                     )}
                  />
                  <Select
                     size="small"
                     placeholder="Select Permission Sets"
                     maxTagCount="responsive"
                     value={selectedPermissionSets.map((ele) => {
                        return ele.fullName;
                     })}
                     mode="multiple"
                     onChange={(values, valuesOptions: any) => {
                        setSelectedPermissionSets(valuesOptions);
                     }}
                     style={{ width: 400 }}
                     bordered={false}
                     options={options.listPermissionSets
                        .sort((a: any, b: any) => {
                           return a.fullName > b.fullName ? 1 : -1;
                        })
                        .map((ele: any) => {
                           return { label: ele.fullName, value: ele.fullName, ...ele };
                        })}
                     dropdownRender={(menu) => (
                        <>
                           <div style={{ textAlign: "center", top: "50%" }}>
                              <RenderIf renderIf={options.listPermissionSets.length !== selectedPermissionSets.length}>
                                 <Button
                                    size="small"
                                    style={{ width: "100%" }}
                                    type="text"
                                    onClick={() => {
                                       setSelectedPermissionSets(options.listPermissionSets);
                                    }}
                                 >
                                    Select All
                                 </Button>
                              </RenderIf>
                              <RenderIf renderIf={options.listPermissionSets.length === selectedPermissionSets.length}>
                                 <Button
                                    size="small"
                                    style={{ width: "100%" }}
                                    type="text"
                                    onClick={() => {
                                       setSelectedPermissionSets([]);
                                    }}
                                 >
                                    DeSelect All
                                 </Button>
                              </RenderIf>
                           </div>
                           <Divider style={{ margin: "8px 0" }} />
                           {menu}
                        </>
                     )}
                  />
                  <Button size="small" onClick={onClickAnalysis}>
                     Start Analysis
                  </Button>
               </Space>
            }
            extra={
               <Space size="small">
                  <RenderIf renderIf={analysisCompleted}>
                     <Select
                        size="small"
                        style={{ width: 200 }}
                        bordered={false}
                        placeholder="Select Permission Category"
                        onChange={(value) => {
                           setSelectedPermissions(value);
                        }}
                        optionFilterProp="children"
                        options={[
                           {
                              label: "Field Permission",
                              value: "fieldPermissions",
                           },
                           {
                              label: "Object Permission",
                              value: "objectPermissions",
                           },
                           {
                              label: "Record Type Permission",
                              value: "recordTypePermissions",
                           },
                           {
                              label: "Apex Class Permission",
                              value: "apexClassPermissions",
                           },
                           {
                              label: "Apex Page Permission",
                              value: "apexPagePermissions",
                           },
                           {
                              label: "User Permission",
                              value: "userPermissions",
                           },
                        ]}
                     />
                     <RenderIf renderIf={selectedPermissions === "objectPermissions"}>
                        <ObjectPermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "fieldPermissions"}>
                        <FieldPermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "recordTypePermissions"}>
                        <RecordTypePermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "apexClassPermissions"}>
                        <ApexClassPermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "apexPagePermissions"}>
                        <ApexPagePermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "userPermissions"}>
                        <UserPermissionChecker analysisData={analysisData} setSelected={getFilteredData} />
                     </RenderIf>
                  </RenderIf>
               </Space>
            }
         >
            <RenderIf renderIf={analysisCompleted}>
               <RenderIf renderIf={selectedProfiles.length > 0}>
                  <Divider plain>Profiles</Divider>
                  <Row>
                     {selected?.selectedProfiles
                        ? selected?.selectedProfiles.map((current: any) => {
                             return (
                                <Col key={current.name} span={2}>
                                   <div className={style.displayDiv}>
                                      <Space>
                                         <div style={{ wordBreak: "break-all" }}> {current.name}</div>
                                         <div style={{ float: "right" }}>
                                            <Tooltip title={<>Open in Salesforce</>} trigger="hover">
                                               <Button
                                                  size="small"
                                                  style={{ float: "right" }}
                                                  type="text"
                                                  icon={<MdOutlineOpenInNew />}
                                                  onClick={() => {
                                                     window.open(loginInfo.instanceUrl + current.id);
                                                  }}
                                               />
                                            </Tooltip>
                                         </div>
                                      </Space>
                                   </div>
                                </Col>
                             );
                          })
                        : ""}
                  </Row>
               </RenderIf>
               <RenderIf renderIf={selectedPermissionSets.length > 0}>
                  <Divider plain>Permission Sets</Divider>
                  <Row>
                     {selected?.selectedPermissionSets
                        ? selected?.selectedPermissionSets.map((current: any) => {
                             return (
                                <Col key={current.id} span={2}>
                                   <div className={style.displayDiv}>
                                      <Space>
                                         <div style={{ wordBreak: "break-all" }}> {current.name}</div>
                                         <div style={{ float: "right" }}>
                                            <Tooltip title={<>Open in Salesforce</>} trigger="hover">
                                               <Button
                                                  size="small"
                                                  style={{ float: "right" }}
                                                  type="text"
                                                  icon={<MdOutlineOpenInNew />}
                                                  onClick={() => {
                                                     window.open(loginInfo.instanceUrl + current.id);
                                                  }}
                                               />
                                            </Tooltip>
                                         </div>
                                      </Space>
                                   </div>
                                </Col>
                             );
                          })
                        : ""}
                  </Row>
               </RenderIf>
               <Divider plain>
                  <Button size="small" onClick={getUsers}>
                     Get Users
                  </Button>
               </Divider>
               <RenderIf renderIf={userMap && Object.keys(userMap).length > 0}>
                  <Row>
                     {userMap && Object.keys(userMap).length > 0
                        ? Object.keys(userMap).map((userId: any) => {
                             return (
                                <Col key={userId} span={2}>
                                   <div className={style.displayDiv}>
                                      <Space>
                                         <div style={{ wordBreak: "break-all" }}> {userMap[userId].Name}</div>
                                         <div style={{ float: "right" }}>
                                            <Tooltip title={<>Open in Salesforce</>} trigger="hover">
                                               <Button
                                                  size="small"
                                                  style={{ float: "right" }}
                                                  type="text"
                                                  icon={<MdOutlineOpenInNew />}
                                                  onClick={() => {
                                                     window.open(loginInfo.instanceUrl + userId);
                                                  }}
                                               />
                                            </Tooltip>
                                         </div>
                                      </Space>
                                   </div>
                                </Col>
                             );
                          })
                        : ""}
                  </Row>
               </RenderIf>
            </RenderIf>
         </Card>
      </>
   );
};

export default PermissionCheckerView;
