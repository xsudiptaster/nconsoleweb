import { Avatar, Card, Select, Space, Tabs } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import ApexClassPermissionAssignedView from "./ApexClassPermissionAssignedView";
import ApexPagePermissionAssignedView from "./ApexPagePermissionAssignedView";
import FieldPermissionAssignedView from "./FieldPermissionAssignedView";
import ObjectPermissionAssignedView from "./ObjectPermissionAssignedView";
import RecordTypePermissionAssignedView from "./RecordTypePermissionAssignedView";
import { handleLoad, handleUserSelection } from "./UserPermissionAnalysisView.util";
import UserPermissionAssignedView from "./UserPermissionAssignedView";

interface IUserPermissionAnalysisViewProps {
   children?: React.ReactNode;
}

const UserPermissionAnalysisView: React.FC<IUserPermissionAnalysisViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [userOptions, setUserOptions] = React.useState([]);
   const [selectedUser, setSelectedUser] = React.useState<any>({});
   const [permissionMap, setPermissionMap] = React.useState({});
   const [profileMap, setProfileMap] = React.useState({});
   const [permissionList, setPermissionList] = React.useState<any>({});
   const [fetchCompleted, setFetchCompleted] = React.useState(false);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setUserOptions(response);
      };
      onload();
   }, []);
   const onUserChange = async (option: any) => {
      setFetchCompleted(false);
      setLoading(true);
      setSelectedUser(option);
      let response = await handleUserSelection(option);
      console.log("🚀 ~ file: UserPermissionAnalysisView.tsx:29 ~ onUserChange ~ response:", response);
      setPermissionMap(response.permissionMap);
      setPermissionList(response.permissionList);
      setProfileMap(response.profileMap);
      setLoading(false);
      setFetchCompleted(true);
   };
   return (
      <>
         <Card
            size="small"
            title={
               <Select
                  placeholder="Select User"
                  style={{ width: 300 }}
                  onChange={(value, valueOption) => {
                     onUserChange(valueOption);
                  }}
                  showSearch
                  options={userOptions}
                  size="small"
                  bordered={false}
                  filterOption={(inputValue, option: any) => {
                     return option?.label.toUpperCase().includes(inputValue.toUpperCase());
                  }}
               />
            }
            extra={
               <Space>
                  <Avatar src={selectedUser?.FullPhotoUrl} size="small" />
                  {selectedUser.Username}
               </Space>
            }
         >
            <RenderIf renderIf={fetchCompleted}>
               <Tabs
                  items={[
                     {
                        key: "fieldPermissions",
                        label: "Field Permissions",
                        children: (
                           <FieldPermissionAssignedView
                              fieldPermissionList={permissionList?.fieldPermissionList ? permissionList?.fieldPermissionList : []}
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                     {
                        key: "objectPermissions",
                        label: "Object Permissions",
                        children: (
                           <ObjectPermissionAssignedView
                              objectPermissionList={
                                 permissionList?.objectPermissionList ? permissionList?.objectPermissionList : []
                              }
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                     {
                        key: "recordTypePermissions",
                        label: "RecordType Permissions",
                        children: (
                           <RecordTypePermissionAssignedView
                              recordTypePermissionList={
                                 permissionList?.recordTypePermissionList ? permissionList?.recordTypePermissionList : []
                              }
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                     {
                        key: "userPermissions",
                        label: "User Permissions",
                        children: (
                           <UserPermissionAssignedView
                              userPermissionList={permissionList?.userPermissionList ? permissionList?.userPermissionList : []}
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                     {
                        key: "apexPagePermissions",
                        label: "Apex Page Permissions",
                        children: (
                           <ApexPagePermissionAssignedView
                              apexPagePermissionList={
                                 permissionList?.apexPagePermissionList ? permissionList?.apexPagePermissionList : []
                              }
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                     {
                        key: "apexClassPermissions",
                        label: "Apex Class Permissions",
                        children: (
                           <ApexClassPermissionAssignedView
                              apexClassPermissionList={
                                 permissionList?.apexClassPermissionList ? permissionList?.apexClassPermissionList : []
                              }
                              permissionMap={permissionMap}
                              profileMap={profileMap}
                           />
                        ),
                     },
                  ]}
                  tabPosition="left"
               />
            </RenderIf>
         </Card>
      </>
   );
};

export default UserPermissionAnalysisView;
