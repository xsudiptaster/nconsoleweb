import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space, TreeSelect } from "antd";
import React from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { edgesAtom, nodesAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { createEdges } from "../DiagramView.util";
import { createDisplayFields, handleDeleteField, moveFieldDown, moveFieldUp, selectField } from "./NodeView.util";

interface INodeViewProps {
   children?: React.ReactNode;
   data: any;
   id: string;
}

const NodeView: React.FC<INodeViewProps> = (props) => {
   const { data, id } = props;
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
      let tempEdges = createEdges(tempNodes, edges);
      setEdges(tempEdges);
   };
   const goDown = (fieldName: string) => {
      let tempNodes = moveFieldDown(nodes, props, fieldName);
      setNodes(tempNodes);
      let tempEdges = createEdges(tempNodes, edges);
      setEdges(tempEdges);
   };
   const onDelete = () => {
      let tempNodes = nodes.filter((node) => node.id !== id);
      setNodes(tempNodes);
   };
   const onFieldDelete = (fieldName: string) => {
      let tempNodes = handleDeleteField(nodes, props, fieldName);
      setNodes(tempNodes);
      let tempEdges = createEdges(tempNodes, edges);
      setEdges(tempEdges);
   };
   return (
      <>
         <Card
            hoverable
            size="small"
            title={
               <>
                  <Handle type="target" id={"top-" + data.name} position={Position.Top} />
                  <Handle type="target" id={"bottom-" + data.name} position={Position.Bottom} />
                  {data.label}
                  <div style={{ float: "right", paddingLeft: "10px" }}>
                     <sub>{data.name}</sub>
                  </div>
               </>
            }
            extra={
               <sup>
                  <Button size="small" icon={<AiFillDelete />} type="link" onClick={onDelete}></Button>
               </sup>
            }
            actions={[
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
               </div>,
            ]}
         >
            <table style={{ width: "100%" }}>
               <tbody style={{ position: "relative" }}>
                  {data.selectedFields.map((field: any, index: number) => {
                     return (
                        <tr key={field.name} style={{ position: "relative" }}>
                           <td>
                              <Handle
                                 type="source"
                                 id={"left-" + data.name + field.name}
                                 position={Position.Left}
                                 style={{ position: "absolute", left: "-5%" }}
                              />
                           </td>
                           <td style={{ display: "none" }}>
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
                           </td>
                           <td>{field.label}</td>
                           <td>
                              <sub>{field.name}</sub>
                           </td>
                           <td>
                              <Button
                                 size="small"
                                 icon={<AiFillDelete />}
                                 type="link"
                                 onClick={() => {
                                    onFieldDelete(field.name);
                                 }}
                              ></Button>
                           </td>
                           <td>
                              <Handle
                                 type="source"
                                 id={"right-" + data.name + field.name}
                                 position={Position.Right}
                                 style={{ position: "absolute", right: "-5%" }}
                              />
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </Card>
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
