import { SwapOutlined } from "@ant-design/icons";
import { Button, Popover, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { apexClassPermissionsCompareAtom } from "../../../../atoms/atom";
import { moverApexClassPermissions } from "../ApexClassPermissionView.util";

interface IMoveApexClassPermissionViewProps {
   children?: React.ReactNode;
}

const MoveApexClassPermissionView: React.FC<IMoveApexClassPermissionViewProps> = (props) => {
   const [apexPermissions, setApexClassPermissions] = useRecoilState(apexClassPermissionsCompareAtom);

   const options = [
      { label: "Move Left", value: "left" },
      { label: "Move Right", value: "right" },
   ];
   const [selectedOption, setSelectedOption] = React.useState("left");
   const onConfirm = () => {
      let response = moverApexClassPermissions(apexPermissions, selectedOption);
      setApexClassPermissions(response);
   };
   return (
      <>
         <Popover
            placement="top"
            content={
               <Space.Compact block direction="vertical">
                  <div style={{ textAlign: "center" }}>
                     <Radio.Group
                        size="small"
                        options={options}
                        value={selectedOption}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(event) => {
                           setSelectedOption(event.target.value);
                        }}
                     />
                  </div>
                  <Button size="small" onClick={onConfirm}>
                     Confirm
                  </Button>
               </Space.Compact>
            }
            title={"Copy Permission"}
            trigger={"click"}
         >
            <Button size="small" type="text" icon={<SwapOutlined />}></Button>
         </Popover>
      </>
   );
};

export default MoveApexClassPermissionView;
