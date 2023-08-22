import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { reportTypeDragFieldAtom, selectedReportTypeAtom } from "../../../../atoms/atom";
import { onDropSection } from "../ReportFieldDisplayView/ReportFieldDisplayView.util";

interface ITabHeaderViewProps {
   children?: React.ReactNode;
   index: number;
   section: any;
}

const TabHeaderView: React.FC<ITabHeaderViewProps> = (props) => {
   const { section, index } = props;
   const [selectedReportType, setSelectedReportType] = useRecoilState(selectedReportTypeAtom);
   const [dragField, setDragField] = useRecoilState(reportTypeDragFieldAtom);
   const [editClick, setEditClick] = React.useState(false);
   const [label, setLabel] = React.useState(section.masterLabel);
   const saveLabel = (e: any) => {
      e.stopPropagation();
      let reportTypeDescribe = JSON.parse(JSON.stringify(selectedReportType));
      reportTypeDescribe.sections[index].masterLabel = label;
      setSelectedReportType(reportTypeDescribe);
      setEditClick(false);
   };
   return (
      <div
         style={{ width: "100%" }}
         onDragOver={(e: any) => {
            e.target.style.backgroundColor = "red";
            e.preventDefault();
         }}
         onDragLeave={(e: any) => {
            e.target.style.backgroundColor = "";
            e.preventDefault();
         }}
         onDrop={(e: any) => {
            e.target.style.backgroundColor = "";
            let response = onDropSection(selectedReportType, index, dragField);
            setSelectedReportType(response);
            setDragField({});
         }}
      >
         <Space>
            {editClick ? (
               <Input
                  size="small"
                  defaultValue={label}
                  onChange={(e) => {
                     setLabel(e.target.value);
                  }}
                  addonAfter={
                     <Space size="small">
                        <Button size="small" type="text" shape="circle" icon={<SaveOutlined />} onClick={saveLabel} />
                        <Button
                           size="small"
                           type="text"
                           shape="circle"
                           icon={<CloseOutlined />}
                           onClick={(e) => {
                              e.stopPropagation();
                              setEditClick(false);
                           }}
                        />
                     </Space>
                  }
               />
            ) : (
               <>
                  {section.masterLabel}
                  <Button
                     size="small"
                     type="text"
                     icon={<EditOutlined />}
                     onClick={(e) => {
                        e.stopPropagation();
                        setEditClick(true);
                     }}
                  />
               </>
            )}
         </Space>
      </div>
   );
};

export default TabHeaderView;
