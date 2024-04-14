import { Card, Select, Tabs } from "antd";
import React from "react";
import { handleLoad } from "./UserConfigView.util";
import UserDetailsView from "./UserDetailsView";

interface IUserConfigViewProps {
   children?: React.ReactNode;
}

const UserConfigView: React.FC<IUserConfigViewProps> = (props) => {
   const [userList, setUserList] = React.useState<{ value: string; label: string }[]>([]);
   const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);
   const [userDescribe, setUserDescribe] = React.useState({});
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setUserList(response.usersList);
         setUserDescribe(response.userObject);
      };
      onload();
   }, []);
   const onUserSelect = async (values: string[]) => {
      let setValues = new Set(values);
      setSelectedUsers(
         userList.filter((user) => {
            return setValues.has(user.value);
         })
      );
   };
   return (
      <>
         <Card
            size="small"
            title={
               <Select
                  mode="multiple"
                  size="small"
                  variant="borderless"
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select Users"
                  onChange={onUserSelect}
                  options={userList}
                  filterOption={(inputValue: string, option: any) => {
                     return option?.label.toLowerCase().includes(inputValue.toLowerCase());
                  }}
               />
            }
         >
            <Tabs
               size="small"
               defaultActiveKey="2"
               items={selectedUsers.map((user: any) => {
                  return {
                     key: user.value,
                     label: user.label,
                     children: <UserDetailsView id={user.value} userDescribe={userDescribe} />,
                  };
               })}
            />
         </Card>
      </>
   );
};

export default UserConfigView;
