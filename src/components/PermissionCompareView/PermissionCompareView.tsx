import { App, Button, Card, Divider, Select, Space, Tabs } from "antd";
import React from "react";
import { AiFillSave } from "react-icons/ai";
import { MdCompareArrows } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
   apexClassPermissionsCompareAtom,
   fieldPermissionsCompareAtom,
   flowPermissionCompareAtom,
   loadingAtom,
   loginInfoAtom,
   objectPermissionsCompareAtom,
   pagelayoutPermissionCompareAtom,
   recordTypePermissionsCompareAtom,
   userPermissionsCompareAtom,
} from "../../atoms/atom";
import OrgSwitchView from "../../utils/OrgSwitchView";
import ProfileCardView from "../../utils/ProfileCardView";
import ApexClassPermissionView from "./ApexClassPermissionView";
import FieldPermissionCompareView from "./FieldPermissionCompareView";
import FlowPermissionView from "./FlowPermissionView";
import ObjectPermissionsCompareView from "./ObjectPermissionsCompareView";
import PageLayoutPermissionView from "./PageLayoutPermissionView";
import style from "./PermissionCompareView.module.css";
import { handleCompare, handleLoad, handleSave, handleSecondOptions } from "./PermissionCompareView.util";
import RecordTypePermissionsCompareView from "./RecordTypePermissionsCompareView";
import UserPermissionCompareView from "./UserPermissionCompareView";
interface IPermissionCompareViewProps {
   children?: React.ReactNode;
}

const PermissionCompareView: React.FC<IPermissionCompareViewProps> = (props) => {
   const { message } = App.useApp();
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [apexPermissions, setApexPermissions] = useRecoilState(apexClassPermissionsCompareAtom);
   const [fieldPermissions, setFieldPermissions] = useRecoilState(fieldPermissionsCompareAtom);
   const [objectPermissions, setObjectPermissions] = useRecoilState(objectPermissionsCompareAtom);
   const [recordTypePermissions, setRecordTypePermissions] = useRecoilState(recordTypePermissionsCompareAtom);
   const [userPermissions, setUserPermissions] = useRecoilState(userPermissionsCompareAtom);
   const [flowPermissions, setFlowPermissions] = useRecoilState(flowPermissionCompareAtom);
   const [, setPageLayoutPermissions] = useRecoilState(pagelayoutPermissionCompareAtom);
   const [firstFilter, setFirstFilter] = React.useState("Profile");
   const [firstOptions, setFirstOptions] = React.useState([]);
   const [selectedFirstOption, setSelectedFirstOption] = React.useState<any>({});
   const [secondLoginInfo, setSetSecondLoginInfo] = React.useState(loginInfo);
   const [secondOptions, setSecondOptions] = React.useState([]);
   const [secondFilter, setSecondFilter] = React.useState("Profile");
   const [selectedSecondOption, setSelectedSecondOption] = React.useState<any>({});

   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setFirstOptions(response);
      };
      onload();
   }, []);
   React.useMemo(() => {
      const onOption = async () => {
         let response = await handleSecondOptions(secondLoginInfo);
         setSecondOptions(response);
      };
      onOption();
   }, [secondLoginInfo]);
   const onCompareClick = async () => {
      setLoading(true);
      setApexPermissions({ A: {}, B: {} });
      setFieldPermissions({ A: {}, B: {} });
      setObjectPermissions({ A: {}, B: {} });
      setRecordTypePermissions({ A: {}, B: {} });
      setUserPermissions({ A: {}, B: {} });
      setFlowPermissions({ A: {}, B: {} });
      setPageLayoutPermissions({ A: {}, B: {} });
      let response = await handleCompare(loginInfo, secondLoginInfo, selectedFirstOption, selectedSecondOption);

      setApexPermissions({
         A: response.A.apexPermissions,
         B: response.B.apexPermissions,
      });
      setFieldPermissions({
         A: response.A.fieldPermissions,
         B: response.B.fieldPermissions,
      });
      setObjectPermissions({
         A: response.A.objectPermissions,
         B: response.B.objectPermissions,
      });
      setRecordTypePermissions({
         A: response.A.recordTypePermissions,
         B: response.B.recordTypePermissions,
      });
      setUserPermissions({
         A: response.A.userPermissions,
         B: response.B.userPermissions,
      });
      setFlowPermissions({
         A: response.A.flowPermissions,
         B: response.B.flowPermissions,
      });
      setPageLayoutPermissions({
         A: response.A.pageLayoutPermissions,
         B: response.B.pageLayoutPermissions,
      });
      setLoading(false);
   };
   const onSaveClick = async (option: string, profileObj: any, currentLoginInfo: any) => {
      setLoading(true);
      let response: any = await handleSave(
         apexPermissions,
         fieldPermissions,
         objectPermissions,
         recordTypePermissions,
         userPermissions,
         flowPermissions,
         option,
         profileObj,
         currentLoginInfo
      );
      if (response.success) {
         message.success("Saved Successfully!!!");
      } else {
         message.error(
            response?.error ? JSON.stringify(response?.error) : "" + response?.errors ? JSON.stringify(response?.errors) : ""
         );
      }
      setLoading(false);
      await onCompareClick();
   };
   return (
      <Card size="small">
         <table className={style.tableClass}>
            <thead>
               <tr>
                  <th>
                     <Space>
                        <Space.Compact direction="vertical">
                           <ProfileCardView loginInfo={loginInfo} />
                           <Space>
                              <Select
                                 size="small"
                                 defaultValue={firstFilter}
                                 bordered={false}
                                 style={{ width: 150 }}
                                 options={[
                                    { label: "Profile", value: "Profile" },
                                    { label: "Permission Set", value: "PermissionSet" },
                                 ]}
                                 onChange={(val) => {
                                    setFirstFilter(val);
                                 }}
                              />
                              <Select
                                 size="small"
                                 showSearch
                                 bordered={false}
                                 placeholder="Select Profile/Permission Set"
                                 style={{ width: 200 }}
                                 options={firstOptions.filter((option: any) => {
                                    return option.type === firstFilter;
                                 })}
                                 onChange={(val, valOption) => {
                                    setSelectedFirstOption(valOption);
                                 }}
                              />
                           </Space>
                           <Button
                              size="small"
                              icon={<AiFillSave />}
                              onClick={() => {
                                 onSaveClick("A", selectedFirstOption, loginInfo);
                              }}
                           >
                              Save
                           </Button>
                        </Space.Compact>
                     </Space>
                  </th>
                  <th>
                     <Button
                        size="small"
                        icon={<MdCompareArrows />}
                        disabled={selectedFirstOption.fullName && selectedSecondOption.fullName ? false : true}
                        onClick={onCompareClick}
                     >
                        Compare
                     </Button>
                  </th>
                  <th>
                     <Space>
                        <Space.Compact direction="vertical">
                           <OrgSwitchView
                              defaultUserName={secondLoginInfo.username}
                              onConfirm={(value: any) => {
                                 setSetSecondLoginInfo(value);
                              }}
                           />
                           <Space>
                              <Select
                                 size="small"
                                 defaultValue={secondFilter}
                                 bordered={false}
                                 style={{ width: 150 }}
                                 options={[
                                    { label: "Profile", value: "Profile" },
                                    { label: "Permission Set", value: "PermissionSet" },
                                 ]}
                                 onChange={(val) => {
                                    setSecondFilter(val);
                                 }}
                              />
                              <Select
                                 size="small"
                                 bordered={false}
                                 placeholder="Select Profile/Permission Set"
                                 showSearch
                                 style={{ width: 200 }}
                                 options={secondOptions.filter((option: any) => {
                                    return option.type === secondFilter;
                                 })}
                                 onChange={(val, valOption) => {
                                    setSelectedSecondOption(valOption);
                                 }}
                              />
                           </Space>
                           <Button
                              size="small"
                              icon={<AiFillSave />}
                              onClick={() => {
                                 onSaveClick("B", selectedSecondOption, secondLoginInfo);
                              }}
                           >
                              Save
                           </Button>
                        </Space.Compact>
                     </Space>
                  </th>
               </tr>
            </thead>
         </table>
         <Divider />
         <Tabs
            defaultActiveKey="objectpermissions"
            destroyInactiveTabPane
            type="card"
            size={"small"}
            items={[
               {
                  key: "objectpermissions",
                  label: "Object Permissions",
                  children: (
                     <ObjectPermissionsCompareView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "fieldpermissions",
                  label: "Field Permissions",
                  children: (
                     <FieldPermissionCompareView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "apexpermissions",
                  label: "Apex Class Permissions",
                  children: (
                     <ApexClassPermissionView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "recordtypepermissions",
                  label: "Record Type Permissions",
                  children: (
                     <RecordTypePermissionsCompareView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "userpermissions",
                  label: "User Permissions",
                  children: (
                     <UserPermissionCompareView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "flowpermissions",
                  label: "Flow Permissions",
                  children: (
                     <FlowPermissionView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
               {
                  key: "pagelayoutpermissions",
                  label: "Page Layout Permissions",
                  disabled: selectedFirstOption.type === "Profile" && selectedSecondOption.type === "Profile" ? false : true,
                  children: (
                     <PageLayoutPermissionView
                        firstOption={selectedFirstOption}
                        secondOption={selectedSecondOption}
                        secondLoginInfo={secondLoginInfo}
                     />
                  ),
               },
            ]}
         />
      </Card>
   );
};

export default PermissionCompareView;
