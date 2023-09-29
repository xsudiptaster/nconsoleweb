import { Button, Card, Col, Divider, Row, Select, Space } from "antd";
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
import { handleLoad } from "./PermissionCheckerView.util";
import RecordTypePermissionChecker from "./RecordTypePermissionChecker";
import UserPermissionChecker from "./UserPermissionChecker";

interface IPermissionCheckerViewProps {
   children?: React.ReactNode;
}

const PermissionCheckerView: React.FC<IPermissionCheckerViewProps> = (props) => {
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [startAnalysis, setStartAlalysis] = React.useState(false);
   const [analysisData, setAnalysisData] = React.useState<any>({});
   const [selectedPermissions, setSelectedPermissions] = React.useState("");
   const [selected, setSelected] = React.useState<any>({});
   const onClickAnalysis = async () => {
      setLoading(true);
      let response = await handleLoad();
      console.log("🚀 ~ file: PermissionCheckerView.tsx:23 ~ onClickAnalysis ~ response:", response);
      setAnalysisData(response);
      setStartAlalysis(true);
      setLoading(false);
   };
   return (
      <>
         <RenderIf renderIf={!startAnalysis}>
            <Card bodyStyle={{ height: "80vh" }}>
               <div className={style.analysisButton}>
                  <Button className={style.button} onClick={onClickAnalysis}>
                     Start Analysis
                  </Button>
               </div>
            </Card>
         </RenderIf>
         <RenderIf renderIf={startAnalysis}>
            <Card
               title={
                  <Space size="small">
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
                  </Space>
               }
               extra={
                  <>
                     <RenderIf renderIf={selectedPermissions === "objectPermissions"}>
                        <ObjectPermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "fieldPermissions"}>
                        <FieldPermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "recordTypePermissions"}>
                        <RecordTypePermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "apexClassPermissions"}>
                        <ApexClassPermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "apexPagePermissions"}>
                        <ApexPagePermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                     <RenderIf renderIf={selectedPermissions === "userPermissions"}>
                        <UserPermissionChecker analysisData={analysisData} setSelected={setSelected} />
                     </RenderIf>
                  </>
               }
            >
               <Divider plain>Profiles</Divider>
               <Row>
                  {selected?.selectedProfiles
                     ? selected?.selectedProfiles.map((current: any) => {
                          return (
                             <Col key={current.name} span={2}>
                                <div className={style.displayDiv}>
                                   <Space>
                                      {current.name}
                                      <div style={{ float: "right" }}>
                                         <Button
                                            size="small"
                                            style={{ float: "right" }}
                                            type="text"
                                            icon={<MdOutlineOpenInNew />}
                                            onClick={() => {
                                               window.open(loginInfo.instanceUrl + current.id);
                                            }}
                                         />
                                      </div>
                                   </Space>
                                </div>
                             </Col>
                          );
                       })
                     : ""}
               </Row>
               <Divider plain>Permission Sets</Divider>
               <Row>
                  {selected?.selectedPermissionSets
                     ? selected?.selectedPermissionSets.map((current: any) => {
                          return (
                             <Col key={current.id} span={2}>
                                <div className={style.displayDiv}>
                                   <Button
                                      size="small"
                                      style={{ float: "right" }}
                                      type="text"
                                      icon={<MdOutlineOpenInNew />}
                                      onClick={() => {
                                         window.open(loginInfo.instanceUrl + current.id);
                                      }}
                                   />
                                </div>
                             </Col>
                          );
                       })
                     : ""}
               </Row>
            </Card>
         </RenderIf>
      </>
   );
};

export default PermissionCheckerView;
