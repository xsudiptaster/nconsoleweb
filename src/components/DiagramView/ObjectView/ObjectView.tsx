import { Col, Input, Row, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { draggedObjectAtom } from "../../../atoms/atom";
import AccordinView from "../../../utils/AccordinView";

interface IObjectViewProps {
   children?: React.ReactNode;
   objectList: any[];
}

const ObjectView: React.FC<IObjectViewProps> = (props) => {
   const { objectList } = props;
   const [, setDraggedObject] = useRecoilState(draggedObjectAtom);
   const [searchString, setSearchString] = React.useState("");
   return (
      <>
         <AccordinView
            title={
               <Space>
                  Object
                  <div style={{ float: "right", paddingLeft: "30px" }}>
                     <Input
                        placeholder="Search Object"
                        size="small"
                        onChange={(e) => {
                           setSearchString(e.target.value);
                        }}
                     />
                  </div>
               </Space>
            }
            style={{ width: 400 }}
         >
            <div style={{ maxHeight: "70vh", overflow: "auto" }}>
               <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {objectList
                     .filter((object) => {
                        return searchString === ""
                           ? true
                           : object.label.toUpperCase().includes(searchString.toUpperCase()) ||
                                object.name.toUpperCase().includes(searchString.toUpperCase());
                     })
                     .map((object) => {
                        return (
                           <Col
                              className="gutter-row"
                              key={object.name}
                              span={24}
                              style={{ border: ".1em solid #565657", cursor: "grab" }}
                              draggable
                              onDragStart={() => {
                                 setDraggedObject(object);
                              }}
                           >
                              {object.label}
                              <div style={{ float: "right" }}>
                                 <sub>{object.name}</sub>
                              </div>
                           </Col>
                        );
                     })}
               </Row>
            </div>
         </AccordinView>
      </>
   );
};

export default ObjectView;
