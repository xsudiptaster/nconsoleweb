import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";
import RenderIf from "../RenderIf";

interface IAccordinViewProps {
   children?: React.ReactNode;
   title: any;
   style?: any;
}

const AccordinView: React.FC<IAccordinViewProps> = (props) => {
   const { title, children, style } = props;
   const [open, setOpen] = React.useState(true);
   return (
      <>
         <Card
            size="small"
            title={title}
            extra={
               <Button
                  type="text"
                  size="small"
                  onClick={() => {
                     setOpen(!open);
                  }}
                  icon={open ? <CaretDownOutlined /> : <CaretRightOutlined />}
               />
            }
            style={style}
         >
            <RenderIf renderIf={open}>{children}</RenderIf>
         </Card>
      </>
   );
};

export default AccordinView;
