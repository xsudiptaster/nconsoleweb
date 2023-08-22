import { Card, Col, Row } from "antd";
import React from "react";
import { Handle, Position } from "reactflow";

interface INodeViewProps {
   children?: React.ReactNode;
   data: any;
}

const NodeView: React.FC<INodeViewProps> = (props) => {
   const { data } = props;
   console.log("🚀 ---------------------------------------🚀");
   console.log("🚀 ~ file: NodeView.tsx:12 ~ data:", data);
   console.log("🚀 ---------------------------------------🚀");
   return (
      <>
         <Card title={data.label} size="small" extra={<sub>&nbsp;&nbsp;{data.name}</sub>}>
            <Handle type="target" id={"top-" + data.name} position={Position.Top} />
            <Handle type="target" id={"bottom-" + data.name} position={Position.Bottom} />
            {data.selectedFields.map((field: any) => {
               return (
                  <>
                     <Row gutter={[8, 8]}>
                        <Col span={1}>
                           <Handle
                              type="source"
                              id={"left-" + data.name + field.name}
                              position={Position.Left}
                              style={{ position: "absolute", left: 0 }}
                           />
                        </Col>
                        <Col span={10}>{field.label}</Col>
                        <Col span={10}>
                           <sub>{field.name}</sub>
                        </Col>
                        <Col span={1} style={{ float: "right", textAlign: "right" }}>
                           <Handle
                              type="source"
                              id={"right-" + data.name + field.name}
                              position={Position.Right}
                              style={{ position: "absolute", left: "100%" }}
                           />
                        </Col>
                     </Row>
                  </>
               );
            })}
         </Card>
      </>
   );
};

export default NodeView;
