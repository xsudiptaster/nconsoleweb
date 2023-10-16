import { SwapOutlined } from "@ant-design/icons";
import { Button, Popover, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { fieldPermissionsCompareAtom } from "../../../../atoms/atom";
import { moveFieldPermissions } from "../FieldPermissionCompareView.util";

interface IMoveFieldPermissionViewProps {
   children?: React.ReactNode;
   selectedObjects: any[];
   field?: string;
}

const MoveFieldPermissionView: React.FC<IMoveFieldPermissionViewProps> = (props) => {
   const { selectedObjects, field } = props;
   const [fieldPermissions, setFieldPermissions] = useRecoilState(fieldPermissionsCompareAtom);
   const [selectedOption, setSelectedOption] = React.useState("left");
   const options = [
      { label: "Move Left", value: "left" },
      { label: "Move Right", value: "right" },
   ];
   const onConfirm = () => {
      let response = moveFieldPermissions(fieldPermissions, selectedOption, selectedObjects, field);
      setFieldPermissions(response);
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

export default MoveFieldPermissionView;
