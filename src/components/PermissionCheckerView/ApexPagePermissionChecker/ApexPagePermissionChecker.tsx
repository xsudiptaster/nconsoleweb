import { Button, Select } from "antd";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../atoms/atom";
import { apexPagePermissionChecker } from "./ApexPagePermissionChecker.util";

interface IApexPagePermissionCheckerProps {
   children?: React.ReactNode;
   analysisData: any;
   setSelected: any;
}

const ApexPagePermissionChecker: React.FC<IApexPagePermissionCheckerProps> = (props) => {
   const { analysisData, setSelected } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [apexPageName, setApexPageName] = React.useState("");
   const onFind = () => {
      setLoading(true);
      let response = apexPagePermissionChecker(apexPageName, analysisData);
      setLoading(false);
      setSelected(response);
   };
   return (
      <>
         <Select
            style={{ width: 300 }}
            placeholder="Select Apex Class Name"
            onChange={(value: any) => {
               setApexPageName(value);
            }}
            size="small"
            showSearch
            bordered={false}
            options={analysisData?.permissionList?.apexPagePermissionList
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

export default ApexPagePermissionChecker;
