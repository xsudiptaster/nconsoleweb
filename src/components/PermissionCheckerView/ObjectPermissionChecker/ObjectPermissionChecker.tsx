import { Button, Select } from "antd";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../atoms/atom";
import { handleFiltering } from "./ObjectPermissionChecker.util";

interface IObjectPermissionCheckerProps {
   children?: React.ReactNode;
   analysisData: any;
   setSelected: any;
}

const ObjectPermissionChecker: React.FC<IObjectPermissionCheckerProps> = (props) => {
   const { analysisData, setSelected } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [objectName, setObjectName] = React.useState("");
   const [permissionName, setPermissionName] = React.useState("");
   const onFind = () => {
      setLoading(true);
      let response = handleFiltering(objectName, permissionName, analysisData);
      setSelected(response);
      setLoading(false);
   };
   return (
      <>
         <Select
            style={{ width: 200 }}
            placeholder="Select Object"
            onChange={(value: any) => {
               setObjectName(value);
            }}
            size="small"
            showSearch
            bordered={false}
            options={analysisData?.permissionList?.objectPermissionList
               .sort((a: string, b: string) => {
                  return a > b ? 1 : -1;
               })
               .map((object: any) => {
                  return { label: object, value: object };
               })}
         ></Select>
         <Select
            style={{ width: 200 }}
            placeholder="Select Permission"
            onChange={(value: any) => {
               setPermissionName(value);
            }}
            size="small"
            bordered={false}
            options={[
               {
                  label: "Create",
                  value: "allowCreate",
               },
               {
                  label: "Read",
                  value: "allowRead",
               },
               {
                  label: "Edit",
                  value: "allowEdit",
               },
               {
                  label: "Delete",
                  value: "allowDelete",
               },
               {
                  label: "View All",
                  value: "viewAllRecords",
               },
               {
                  label: "Edit All",
                  value: "modifyAllRecords",
               },
            ]}
         />
         <Button size="small" icon={<AiOutlineFileSearch />} onClick={onFind}>
            Find
         </Button>
      </>
   );
};

export default ObjectPermissionChecker;
