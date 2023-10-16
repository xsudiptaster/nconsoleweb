import { SwapOutlined } from "@ant-design/icons";
import { Button, Popover, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { objectPermissionsCompareAtom } from "../../../../atoms/atom";
import { moveObjectPermissions } from "../ObjectPermissionsCompareView.util";

interface IMoveObjectPermissionViewProps {
   children?: React.ReactNode;
   listObjectNames?: any[];
   objectName?: any;
}

const MoveObjectPermissionView: React.FC<IMoveObjectPermissionViewProps> = (props) => {
   const { objectName, listObjectNames } = props;
   const [selectedOption, setSelectedOption] = React.useState("left");
   const [objectPermissions, setObjectPermissions] = useRecoilState(objectPermissionsCompareAtom);
   const options = [
      { label: "Move Left", value: "left" },
      { label: "Move Right", value: "right" },
   ];
   const onConfirm = () => {
      let response = moveObjectPermissions(objectPermissions, selectedOption, listObjectNames, objectName);
      setObjectPermissions(JSON.parse(JSON.stringify(response)));
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

export default MoveObjectPermissionView;
