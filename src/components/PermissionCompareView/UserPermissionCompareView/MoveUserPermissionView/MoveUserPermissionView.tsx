import { SwapOutlined } from "@ant-design/icons";
import { Button, Popover, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { userPermissionsCompareAtom } from "../../../../atoms/atom";
import { moveUserPermissions } from "../UserPermissionCompareView.util";

interface IMoveUserPermissionViewProps {
   children?: React.ReactNode;
   listPermissions: any[];
}

const MoveUserPermissionView: React.FC<IMoveUserPermissionViewProps> = (props) => {
   const { listPermissions } = props;
   const [userPermissions, setUserPermissions] = useRecoilState(userPermissionsCompareAtom);
   const [selectedOption, setSelectedOption] = React.useState("left");

   const options = [
      { label: "Move Left", value: "left" },
      { label: "Move Right", value: "right" },
   ];
   const onConfirm = () => {
      let response = moveUserPermissions(userPermissions, selectedOption, listPermissions);
      setUserPermissions(response);
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

export default MoveUserPermissionView;
