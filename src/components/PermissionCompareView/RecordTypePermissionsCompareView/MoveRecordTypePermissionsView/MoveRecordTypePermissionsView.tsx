import { SwapOutlined } from "@ant-design/icons";
import { Button, Popover, Radio, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { recordTypePermissionsCompareAtom } from "../../../../atoms/atom";
import { moveRecordTypePermissions } from "../RecordTypePermissionsCompareView.util";

interface IMoveRecordTypePermissionsViewProps {
   children?: React.ReactNode;
   recordTypeName?: string;
}

const MoveRecordTypePermissionsView: React.FC<IMoveRecordTypePermissionsViewProps> = (props) => {
   const { recordTypeName } = props;
   const [recordTypePermissions, setRecordTypePermissions] = useRecoilState(recordTypePermissionsCompareAtom);
   const options = [
      { label: "Move Left", value: "left" },
      { label: "Move Right", value: "right" },
   ];
   const [selectedOption, setSelectedOption] = React.useState("left");
   const onConfirm = () => {
      let response = moveRecordTypePermissions(recordTypePermissions, selectedOption, recordTypeName);
      setRecordTypePermissions(response);
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

export default MoveRecordTypePermissionsView;
