import { Button, Card, Col, Image, Row, Space, Steps, Typography } from "antd";
import React from "react";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import RenderIf from "../../utils/RenderIf";
import style from "./WalkThroughView.module.css";
interface IWalkThroughViewProps {
   children?: React.ReactNode;
   items: any[];
}
const { Title, Paragraph, Text, Link } = Typography;
const WalkThroughView: React.FC<IWalkThroughViewProps> = (props) => {
   const { items } = props;
   const [step, setStep] = React.useState(0);
   const goNext = () => {
      let change = step + 1;
      setStep(change);
   };
   const goBack = () => {
      let change = step - 1;
      setStep(change);
   };
   return (
      <>
         <Card
            title={<Steps size="small" progressDot current={step} items={items} />}
            extra={
               <Space>
                  <Button size="small" icon={<FaBackward />} onClick={goBack} disabled={step === 0}>
                     Previous
                  </Button>
                  <Button size="small" icon={<TbPlayerTrackNextFilled />} onClick={goNext} disabled={step === 4}>
                     Next
                  </Button>
               </Space>
            }
         >
            {items.map((oItem) => {
               return (
                  <Row>
                     <Col span={6} />
                     <Col span={12} style={{ textAlign: "center" }}>
                        <div className={style.wrapperDiv}>
                           <div className={style.contentDiv}>
                              <div>
                                 <Title>{oItem.content}</Title>
                              </div>
                              <RenderIf renderIf={oItem.image !== ""}>
                                 <Image className={style.imageCss} src={oItem.image} alt="Step 0" width={500} height={500} />
                              </RenderIf>
                              <br />
                              {oItem.contentDescription}
                           </div>
                        </div>
                     </Col>
                     <Col span={6} />
                  </Row>
               );
            })}
            <Row>
               <Col span={6} />
               <Col span={12} style={{ textAlign: "center" }}>
                  <Space>
                     <Button size="small" icon={<FaBackward />} onClick={goBack} disabled={step === 0}>
                        Previous
                     </Button>
                     <Button
                        size="small"
                        icon={<TbPlayerTrackNextFilled />}
                        onClick={goNext}
                        disabled={step === items.length - 1}
                     >
                        Next
                     </Button>
                  </Space>
               </Col>
               <Col span={6} />
            </Row>
         </Card>
      </>
   );
};

export default WalkThroughView;
