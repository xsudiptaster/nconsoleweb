import { Avatar, Space } from "antd";
import React from "react";

interface IProfileCardViewProps {
  children?: React.ReactNode;
  loginInfo: any;
}

const ProfileCardView: React.FC<IProfileCardViewProps> = (props) => {
  const { loginInfo } = props;
  return (
    <div style={{ maxWidth: "300px" }}>
      <Space>
        <Space.Compact direction="vertical">
          <Space>
            <Avatar src={loginInfo?.photos?.picture} />
            {loginInfo?.display_name}
          </Space>
          <>{loginInfo?.username}</>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default ProfileCardView;
