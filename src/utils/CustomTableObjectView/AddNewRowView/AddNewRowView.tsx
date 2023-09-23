import { Button, Descriptions, Modal } from "antd";
import React from "react";
import DisplayFieldView from "../DisplayFieldView";

interface IAddNewRowViewProps {
   children?: React.ReactNode;
   showAddView: boolean;
   setShowAddView: any;
   fieldMap: any;
   onSave: any;
}

const AddNewRowView: React.FC<IAddNewRowViewProps> = (props) => {
   const { showAddView, setShowAddView, fieldMap, onSave } = props;
   const [currentRow, setCurrentRow] = React.useState<any>({});
   const handleOk = async () => {
      let response = await onSave(currentRow);
      if (response.success) {
         setShowAddView(false);
      }
   };
   const handleCancel = () => {
      setShowAddView(false);
   };
   const onFieldChange = (key: any, value: any) => {
      let tempRow: any = { ...currentRow };
      tempRow[key] = value;
      setCurrentRow(tempRow);
   };

   return (
      <>
         <Modal
            open={showAddView}
            title="Add Custom Metadata"
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ minWidth: "60vw" }}
            footer={[
               <Button key="back" onClick={handleCancel}>
                  Cancel
               </Button>,
               <Button key="submit" type="primary" onClick={handleOk}>
                  Save
               </Button>,
            ]}
         >
            <Descriptions bordered size="small">
               {Object.keys(fieldMap).map((oField) => {
                  return (
                     <Descriptions.Item key={oField} label={fieldMap[oField].label}>
                        <DisplayFieldView
                           field={fieldMap[oField]}
                           value={currentRow[oField] ? currentRow[oField] : ""}
                           edit={true}
                           onChange={onFieldChange}
                        />
                     </Descriptions.Item>
                  );
               })}
            </Descriptions>
         </Modal>
      </>
   );
};

export default AddNewRowView;
