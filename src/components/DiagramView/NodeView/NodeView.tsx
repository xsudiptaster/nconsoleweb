import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Col, List, Modal, Row, Space, TreeSelect } from "antd";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { edgesAtom, nodesAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { createEdges } from "../DiagramView.util";
import { createDisplayFields, moveFieldDown, moveFieldUp, selectField } from "./NodeView.util";

interface INodeViewProps {
   children?: React.ReactNode;
   data: any;
}

const NodeView: React.FC<INodeViewProps> = (props) => {
   const { data } = props;
   const [nodes, setNodes] = useRecoilState(nodesAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const [isModalOpen, setIsModalOpen] = React.useState(false);
   const displayFields = React.useMemo(() => {
      return createDisplayFields(data.fields);
   }, [data.fields]);
   const onSelect = (treeValues: any) => {
      let tempNodes = selectField(nodes, props, treeValues);
      setNodes(tempNodes);
      let tempEdges = createEdges(tempNodes, edges);
      setEdges(tempEdges);
   };
   const goUp = (fieldName: string) => {
      let tempNodes = moveFieldUp(nodes, props, fieldName);
      setNodes(tempNodes);
   };
   const goDown = (fieldName: string) => {
      let tempNodes = moveFieldDown(nodes, props, fieldName);
      setNodes(tempNodes);
   };
   return (
      <>
         <List
            style={{ backgroundColor: "black" }}
            bordered
            dataSource={data.selectedFields}
            size="small"
            header={
               <>
                  <Handle type="target" id={"top-" + data.name} position={Position.Top} />
                  <Handle type="target" id={"bottom-" + data.name} position={Position.Bottom} />
                  {data.label}
               </>
            }
            renderItem={(field: any, index: number) => {
               return (
                  <>
                     <Row gutter={[8, 8]} style={{ textAlign: "left", justifyContent: "baseline" }}>
                        <Col span={1}>
                           <Handle
                              type="source"
                              id={"left-" + data.name + field.name}
                              position={Position.Left}
                              style={{ position: "absolute", left: 0 }}
                           />
                        </Col>
                        <Col span={2}>
                           <Space size="small">
                              <RenderIf renderIf={index > 0}>
                                 <Button
                                    type="text"
                                    size="small"
                                    onClick={() => {
                                       goUp(field.name);
                                    }}
                                    style={{ height: "5px", width: "5px", padding: "0", margin: "0" }}
                                    icon={<CaretUpOutlined />}
                                 ></Button>
                              </RenderIf>
                              <RenderIf renderIf={index < data.selectedFields.length - 1}>
                                 <Button
                                    type="text"
                                    onClick={() => {
                                       goDown(field.name);
                                    }}
                                    style={{ height: "5px", width: "5px", padding: "0", margin: "0" }}
                                    size="small"
                                    icon={<CaretDownOutlined />}
                                 ></Button>
                              </RenderIf>
                           </Space>
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
                              style={{ position: "absolute", right: "0" }}
                           />
                        </Col>
                     </Row>
                  </>
               );
            }}
            footer={
               <div style={{ textAlign: "center" }}>
                  <Button
                     icon={<AiFillPlusCircle />}
                     size="small"
                     type="link"
                     onClick={() => {
                        setIsModalOpen(true);
                     }}
                  >
                     Add Fields
                  </Button>
               </div>
            }
         />
         <Modal
            title={data.label}
            open={isModalOpen}
            footer={null}
            onCancel={() => {
               setIsModalOpen(false);
            }}
         >
            <TreeSelect style={{ width: "400px" }} treeData={displayFields} size="small" treeCheckable onChange={onSelect} />
         </Modal>
      </>
   );
};

export default NodeView;
