import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Divider, Select, Space } from "antd";
import React from "react";
import { FcCancel } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { useCrossTabState } from "../../utils/hooks";
import ProfileCardView from "../ProfileCardView";
import RenderIf from "../RenderIf";
import { handleConfirm } from "./OrgSwitchView.util";

interface IOrgSwitchViewProps {
  children?: React.ReactNode;
  defaultUserName: string;
  onConfirm: any;
}

const OrgSwitchView: React.FC<IOrgSwitchViewProps> = (props) => {
  const { defaultUserName, onConfirm } = props;
  const { message } = App.useApp();
  const [allLoginInfos, setAllLoginInfos] = useCrossTabState("loginInfo", {});
  const [edit, setEdit] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const onConfirmCall = async () => {
    let currentLoginInfo = allLoginInfos[selectedValue];
    let response = await handleConfirm(currentLoginInfo);
    if (response.active) {
      onConfirm(allLoginInfos[selectedValue]);
      setEdit(false);
    } else {
      message.error("Login expired !!");
      let tempAppLogins = { ...allLoginInfos };
      delete tempAppLogins[selectedValue];
      setAllLoginInfos(tempAppLogins);
    }
  };
  return (
    <Space>
      <RenderIf renderIf={edit === false}>
        <Space>
          <ProfileCardView loginInfo={allLoginInfos[defaultUserName]} />
          <Button
            size="small"
            onClick={() => {
              setEdit(true);
            }}
          >
            Change
          </Button>
        </Space>
      </RenderIf>
      <RenderIf renderIf={edit}>
        <Space size="small">
          <Select
            size="small"
            style={{ width: 250 }}
            defaultValue={defaultUserName}
            onChange={(value) => {
              setSelectedValue(value);
            }}
            options={Object.keys(allLoginInfos).map((username) => {
              return { label: username, value: username };
            })}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ padding: "1px" }} />
                <Button
                  type="text"
                  style={{ width: "100%" }}
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    window.open("/?state=second", "_blank");
                  }}
                >
                  Add Org
                </Button>
              </>
            )}
          />
          <Button size="small" icon={<GiConfirmed />} type="text" onClick={onConfirmCall}>
            Confirm
          </Button>
          <Button
            size="small"
            icon={<FcCancel />}
            type="text"
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
        </Space>
      </RenderIf>
    </Space>
  );
};

export default OrgSwitchView;
