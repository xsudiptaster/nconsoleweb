import { Button, Select } from "antd";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../atoms/atom";
import { userPermissionChecker } from "./UserPermissionChecker.util";

interface IUserPermissionCheckerProps {
   children?: React.ReactNode;
   analysisData: any;
   setSelected: any;
}

const UserPermissionChecker: React.FC<IUserPermissionCheckerProps> = (props) => {
   const { analysisData, setSelected } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [userPermissionName, setUserPermissionName] = React.useState("");
   const onFind = () => {
      setLoading(true);
      let response = userPermissionChecker(userPermissionName, analysisData);
      setSelected(response);
      setLoading(false);
   };
   return (
      <>
         <Select
            style={{ width: 300 }}
            placeholder="Select User Permission Name"
            onChange={(value: any) => {
               setUserPermissionName(value);
            }}
            size="small"
            showSearch
            bordered={false}
            options={analysisData?.permissionList?.userPermissionList
               .sort((a: string, b: string) => {
                  return a > b ? 1 : -1;
               })
               .map((object: any) => {
                  return { label: object, value: object };
               })}
         ></Select>
         <Button size="small" icon={<AiOutlineFileSearch />} onClick={onFind}>
            Find
         </Button>
      </>
   );
};

export default UserPermissionChecker;
