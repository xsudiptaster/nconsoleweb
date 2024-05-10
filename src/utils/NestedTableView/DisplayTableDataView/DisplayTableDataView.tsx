import { Button, Modal, Tooltip } from "antd";
import React from "react";
import { AiOutlineTable } from "react-icons/ai";
import { FaObjectUngroup } from "react-icons/fa";
import RenderIf from "../../RenderIf";
import NestedTableView from "../NestedTableView";

interface IDisplayTableDataViewProps {
   children?: React.ReactNode;
   data: any;
   record?: any;
   index?: number;
}

const DisplayTableDataView: React.FC<IDisplayTableDataViewProps> = (props) => {
   const { data, index } = props;
   const [nestedTableOpen, setNestedTableOpen] = React.useState(false);
   const [nestedObjectOpen, setNestedObjectOpen] = React.useState(false);

   return (
      <div style={{ textAlign: "center" }}>
         <RenderIf renderIf={data !== undefined && data !== null}>
            <RenderIf renderIf={typeof data !== "object"}>
               <Tooltip title={data ? data.toString() : ""}>{data ? data.toString() : ""}</Tooltip>
            </RenderIf>
            <RenderIf renderIf={typeof data === "object" && Array.isArray(data)}>
               <Button
                  size="small"
                  type="link"
                  icon={<AiOutlineTable />}
                  onClick={() => {
                     setNestedTableOpen(true);
                  }}
               ></Button>
               <Modal open={nestedTableOpen} onCancel={() => setNestedTableOpen(false)} footer={null}>
                  <NestedTableView data={data} />
               </Modal>
            </RenderIf>
            <RenderIf renderIf={typeof data === "object" && !Array.isArray(data)}>
               <Button
                  size="small"
                  type="link"
                  icon={<FaObjectUngroup />}
                  onClick={() => {
                     setNestedObjectOpen(true);
                  }}
               ></Button>
               <Modal open={nestedObjectOpen} onCancel={() => setNestedObjectOpen(false)} footer={null}>
                  <table>
                     <tbody>
                        {data ? (
                           Object.keys(data).map((key, i) => {
                              return (
                                 <tr key={key + index + i}>
                                    <td>{key}</td>
                                    <td>
                                       <DisplayTableDataView data={data[key]} />
                                    </td>
                                 </tr>
                              );
                           })
                        ) : (
                           <tr />
                        )}
                     </tbody>
                  </table>
               </Modal>
            </RenderIf>
         </RenderIf>
      </div>
   );
};

export default DisplayTableDataView;
