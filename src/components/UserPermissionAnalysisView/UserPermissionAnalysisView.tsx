import { Avatar, Card, Select, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import { handleLoad, handleUserSelection } from "./UserPermissionAnalysisView.util";
import UserPermissionView from "./UserPermissionView";

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
               <UserPermissionView permissionList={permissionList} permissionMap={permissionMap} profileMap={profileMap} />
            </RenderIf>
         </Card>
      </>
   );
};

export default UserPermissionAnalysisView;
