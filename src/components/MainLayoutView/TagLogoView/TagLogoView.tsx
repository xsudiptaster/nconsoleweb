import { Space, Tag } from "antd";
import React from "react";

interface ITagLogoViewProps {
   children?: React.ReactNode;
   tagName: string;
   labelName: string;
}

const TagLogoView: React.FC<ITagLogoViewProps> = React.memo((props) => {
   const { tagName, labelName } = props;
   return (
      <>
         <Space>
            <Tag color="#141414">{tagName}</Tag>
            {labelName}
         </Space>
      </>
   );
});

export default TagLogoView;
