import { Card, Checkbox, Col, Divider, Row, Select, Tooltip } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { edgesAtom, nodesAtom, selectedNodeAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { createEdges } from "../DiagramView.util";
import { selectField } from "./ObjectConfigView.util";

interface IObjectConfigViewProps {
   children?: React.ReactNode;
}

const ObjectConfigView: React.FC<IObjectConfigViewProps> = (props) => {
   const [selectedNode] = useRecoilState(selectedNodeAtom);
   const [nodes, setNodes] = useRecoilState(nodesAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const [mapFields, setMapFields] = React.useState<any>({});
   const [selectedKeys, setSelectedKeys] = React.useState([]);
   React.useEffect(() => {
      const onload = () => {
         if (selectedNode?.data?.fields) {
            let obj: any = {};
            selectedNode?.data.fields?.forEach((field: any) => {
               if (obj[field.type]) {
                  obj[field.type].push(field);
               } else {
                  obj[field.type] = [];
                  obj[field.type].push(field);
               }
            });
            setMapFields(obj);
         }
      };
      onload();
   }, [selectedNode]);
   const onChange = (e: any, field: any) => {
      let response = selectField(nodes, selectedNode, field, e.target.checked);
      setNodes(response);
      let tempEdges = createEdges(response, edges);
      setEdges(tempEdges);
   };
   return (
      <RenderIf renderIf={selectedNode.id !== undefined}>
         <Card
            title={selectedNode?.data?.label}
            onClick={(e) => {
               e.stopPropagation();
            }}
            size="small"
            extra={
               <Select
                  mode="multiple"
                  allowClear
                  size="small"
                  style={{ width: 300 }}
                  placeholder="Please select field type"
                  defaultValue={selectedKeys}
                  options={Object.keys(mapFields).map((key) => {
                     return { label: key.toUpperCase(), value: key };
                  })}
                  onChange={setSelectedKeys}
               />
            }
         >
            {selectedKeys.map((key: string) => {
               return (
                  <React.Fragment>
                     <Divider plain dashed>
                        {key.toUpperCase()}
                     </Divider>
                     <Row style={{ width: "20vw" }}>
                        {mapFields && mapFields[key]
                           ? mapFields[key].map((field: any) => {
                                return (
                                   <Col span={12}>
                                      <Tooltip placement="top" title={field.name}>
                                         <Checkbox
                                            defaultChecked={
                                               selectedNode && selectedNode?.data?.selectedFields
                                                  ? selectedNode?.data?.selectedFields.some((ofield: any) => {
                                                       return field.name === ofield.name;
                                                    })
                                                  : false
                                            }
                                            onChange={(e) => {
                                               onChange(e, field);
                                            }}
                                         >
                                            {field.label}
                                         </Checkbox>
                                      </Tooltip>
                                   </Col>
                                );
                             })
                           : ""}
                     </Row>
                  </React.Fragment>
               );
            })}
         </Card>
      </RenderIf>
   );
};

export default ObjectConfigView;
