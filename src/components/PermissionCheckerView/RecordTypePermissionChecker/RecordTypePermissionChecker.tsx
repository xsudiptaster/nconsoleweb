import { Button, Select } from "antd";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../atoms/atom";
import { handleRecordTypeChecker } from "./RecordTypePermissionChecker.util";

interface IRecordTypePermissionCheckerProps {
   children?: React.ReactNode;
   analysisData: any;
   setSelected: any;
}

const RecordTypePermissionChecker: React.FC<IRecordTypePermissionCheckerProps> = (props) => {
   const { analysisData, setSelected } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [objectName, setObjectName] = React.useState("");
   const [recordTypeName, setRecordTypeName] = React.useState("");
   const [permissionName, setPermissionName] = React.useState("");
   const onFind = () => {
      setLoading(true);
      let response = handleRecordTypeChecker(recordTypeName, permissionName, analysisData);
      setLoading(false);
      setSelected(response);
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
            options={Object.keys(analysisData?.permissionList?.recordTypePermissionList)
               .sort((a: string, b: string) => {
                  return a > b ? 1 : -1;
               })
               .map((object: any) => {
                  return { label: object, value: object };
               })}
         ></Select>
         <Select
            style={{ width: 200 }}
            placeholder="Select Record Type Name"
            onChange={(value: any) => {
               setRecordTypeName(value);
            }}
            size="small"
            showSearch
            bordered={false}
            options={
               analysisData?.permissionList?.recordTypePermissionList[objectName]
                  ? analysisData?.permissionList?.recordTypePermissionList[objectName]
                       .sort((a: string, b: string) => {
                          return a > b ? 1 : -1;
                       })
                       .map((object: any) => {
                          return { label: object, value: object };
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
                  label: "Visible",
                  value: "visible",
               },
               {
                  label: "Default",
                  value: "default",
               },
            ]}
         />
         <Button size="small" icon={<AiOutlineFileSearch />} onClick={onFind}>
            Find
         </Button>
      </>
   );
};

export default RecordTypePermissionChecker;
