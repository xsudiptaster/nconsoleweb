import { Button, Select } from "antd";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../atoms/atom";
import { handleFieldPermissionCheck } from "./FieldPermissionChecker.util";

interface IFieldPermissionCheckerProps {
   children?: React.ReactNode;
   analysisData: any;
   setSelected: any;
}

const FieldPermissionChecker: React.FC<IFieldPermissionCheckerProps> = (props) => {
   const { analysisData, setSelected } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [objectName, setObjectName] = React.useState("");
   const [fieldName, setFieldName] = React.useState("");
   const [permissionName, setPermissionName] = React.useState("");
   const onFind = () => {
      setLoading(true);
      let response = handleFieldPermissionCheck(fieldName, permissionName, analysisData);
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
            options={Object.keys(analysisData?.permissionList?.fieldPermissionList)
               .sort((a: string, b: string) => {
                  return a > b ? 1 : -1;
               })
               .map((object: any) => {
                  return { label: object, value: object };
               })}
         ></Select>
         <Select
            style={{ width: 200 }}
            placeholder="Select Field"
            onChange={(value: any) => {
               setFieldName(value);
            }}
            size="small"
            showSearch
            bordered={false}
            options={
               analysisData?.permissionList?.fieldPermissionList[objectName]
                  ? analysisData?.permissionList?.fieldPermissionList[objectName]
                       .sort((a: string, b: string) => {
                          return a > b ? 1 : -1;
                       })
                       .map((fieldName: any) => {
                          return { label: fieldName.split(".")[1], value: fieldName };
                       })
                  : []
            }
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
                  label: "Read",
                  value: "readable",
               },
               {
                  label: "Edit",
                  value: "editable",
               },
            ]}
         />
         <Button size="small" icon={<AiOutlineFileSearch />} onClick={onFind}>
            Find
         </Button>
      </>
   );
};

export default FieldPermissionChecker;
