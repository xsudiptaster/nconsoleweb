import { Card, Checkbox, ColorPicker, Descriptions, Input, InputNumber, Select } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { edgesAtom, selectedEdgeAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";

interface IEdgeConfigViewProps {
   children?: React.ReactNode;
}
const linkTypes = [
   { label: "Default", value: "default" },
   { label: "Straight", value: "straight" },
   { label: "Step", value: "step" },
   { label: "Smooth Step", value: "smoothstep" },
   { label: "Simple Bezier", value: "simplebezier" },
];
const EdgeConfigView: React.FC<IEdgeConfigViewProps> = (props) => {
   const [selectedEdge] = useRecoilState(selectedEdgeAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const onLabelChange = (value: string) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.label = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onLinkChange = (value: string) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.type = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onAnimatedChange = (value: boolean) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.animated = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onStrokeWidthChange = (value: any) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.style.strokeWidth = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onDashesChange = (value: any) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.style.strokeDasharray = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onColorChange = (value: any) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge: any) => {
         if (edge.id === selectedEdge.id) {
            edge.style.stroke = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   return (
      <>
         <RenderIf renderIf={selectedEdge.id !== undefined}>
            <Card
               size="small"
               style={{ width: 500 }}
               onClick={(e) => {
                  e.stopPropagation();
               }}
            >
               <Descriptions title="User Info" size="small" layout="vertical" bordered>
                  <Descriptions.Item label="Label">
                     <Input
                        size="small"
                        defaultValue={selectedEdge.label}
                        onChange={(e) => {
                           onLabelChange(e.target.value);
                        }}
                     />
                  </Descriptions.Item>
                  <Descriptions.Item label="Type">
                     <Select
                        size="small"
                        defaultValue={selectedEdge.type}
                        onChange={(value) => {
                           onLinkChange(value);
                        }}
                        style={{ width: 200 }}
                        options={linkTypes}
                     />
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                     <ColorPicker
                        size="small"
                        defaultValue={selectedEdge.style?.stroke}
                        onChange={(value, hexval) => {
                           onColorChange(hexval);
                        }}
                     />
                  </Descriptions.Item>
                  <Descriptions.Item label="Edge Width">
                     <InputNumber
                        size="small"
                        min={1}
                        max={100000}
                        onChange={onStrokeWidthChange}
                        defaultValue={selectedEdge.style?.strokeWidth}
                     />
                  </Descriptions.Item>
                  <Descriptions.Item label="Edge Dashes">
                     <InputNumber
                        size="small"
                        min={0}
                        max={100000}
                        defaultValue={selectedEdge.style?.strokeDasharray}
                        onChange={(value) => {
                           onDashesChange(value);
                        }}
                     />
                  </Descriptions.Item>
                  <Descriptions.Item label="Animated">
                     <Checkbox
                        defaultChecked={selectedEdge.animated}
                        onChange={(e) => {
                           onAnimatedChange(e.target.checked);
                        }}
                     />
                  </Descriptions.Item>
               </Descriptions>
            </Card>
         </RenderIf>
      </>
   );
};

export default EdgeConfigView;
