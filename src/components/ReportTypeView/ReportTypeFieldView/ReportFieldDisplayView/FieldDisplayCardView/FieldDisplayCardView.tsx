import { Button, Checkbox, Input, Space } from "antd";

import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, reportTypeDragFieldAtom, selectedReportTypeAtom } from "../../../../../atoms/atom";
import RenderIf from "../../../../../utils/RenderIf";
import { onDropColumn, updateColumn } from "../ReportFieldDisplayView.util";

interface IFieldDisplayCardViewProps {
   children?: React.ReactNode;
   column: any;
}

const FieldDisplayCardView: React.FC<IFieldDisplayCardViewProps> = (props) => {
   const { column } = props;
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [dragField, setDragField] = useRecoilState(reportTypeDragFieldAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [inLineEdit, setInLineEdit] = React.useState(false);
   const [label, setLabel] = React.useState("");
   React.useEffect(() => {
      const onload = () => {
         setLabel(column.displayNameOverride);
      };
      onload();
   }, [column.displayNameOverride]);
   const onLableChange = () => {
      let col = { ...column };
      col.displayNameOverride = label;
      let response = updateColumn(selectedReportType, col);
      setSelectedReportType(response);
      setInLineEdit(false);
   };
   const onDefaultChange = (value: boolean) => {
      setLoading(true);
      let col = { ...column };
      col.checkedByDefault = value;
      let response = updateColumn(selectedReportType, col);
      setSelectedReportType(response);
      setLoading(false);
   };

   return (
      <div
         style={{ cursor: "grab", height: "100%" }}
         onDragOver={(e) => {
            e.preventDefault();
         }}
         onDragEnter={(e) => {
            e.preventDefault();
         }}
         onDrop={(e) => {
            let response = onDropColumn(selectedReportType, column, dragField);
            setSelectedReportType(response);
            setDragField({});
            e.stopPropagation();
         }}
         onDragStart={() => {
            setDragField({ column: column, new: false });
         }}
         draggable
      >
         <div style={{ padding: "5px", border: "1px solid #4d4c4c", borderRadius: "5px", height: "100%" }}>
            <Space.Compact direction="vertical">
               <div style={{ wordBreak: "break-all" }}>{column.field}</div>
               <RenderIf renderIf={!inLineEdit}>
                  <div
                     onClick={() => {
                        setInLineEdit(true);
                     }}
                  >
                     {column?.displayNameOverride ? (
                        column?.displayNameOverride
                     ) : (
                        <div style={{ opacity: 0.3 }}>Override Label...</div>
                     )}
                  </div>
               </RenderIf>
               <RenderIf renderIf={inLineEdit}>
                  <Input
                     size="small"
                     placeholder="Override label"
                     defaultValue={label}
                     onChange={(e) => {
                        setLabel(e.target.value);
                     }}
                     addonAfter={
                        <Space size="small">
                           <Button size="small" type="text" shape="circle" icon={<SaveOutlined />} onClick={onLableChange} />
                           <Button
                              size="small"
                              type="text"
                              shape="circle"
                              icon={<CloseOutlined />}
                              onClick={() => {
                                 setInLineEdit(false);
                              }}
                           />
                        </Space>
                     }
                  />
               </RenderIf>
               <Checkbox
                  defaultChecked={column?.checkedByDefault === true ? true : false}
                  style={{ color: "lightgray", fontSize: "10px" }}
                  onChange={(e) => {
                     onDefaultChange(e.target.checked);
                  }}
               >
                  Default
               </Checkbox>
               <div style={{ wordBreak: "break-all", fontSize: "9px" }}>{column.table}</div>
            </Space.Compact>
         </div>
      </div>
   );
};

export default FieldDisplayCardView;
