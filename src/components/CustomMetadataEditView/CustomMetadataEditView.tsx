import { Card, Select } from "antd";
import React from "react";
import CustomTableObjectView from "../../utils/CustomTableObjectView";
import { handleLoad, handleObjectSelection } from "./CustomMetadataEditView.util";

interface ICustomMetadataEditViewProps {
   children?: React.ReactNode;
}

const CustomMetadataEditView: React.FC<ICustomMetadataEditViewProps> = (props) => {
   const [objects, setObjects] = React.useState([]);
   const [selectedObject, setSelectedObject] = React.useState([]);
   const [records, setRecords] = React.useState([]);
   const [fields, setFields] = React.useState([]);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setObjects(response);
      };
      onload();
   }, []);
   const onChange = async (value: any) => {
      setSelectedObject(value);
      let response = await handleObjectSelection(value);
      setRecords(response.records);
      setFields(response.fields);
   };
   return (
      <Card
         size="small"
         title={
            <Select
               showSearch
               size="small"
               bordered={false}
               onChange={onChange}
               value={selectedObject}
               style={{ width: 300 }}
               placeholder="Select a Custom Metadata"
               optionFilterProp="children"
               filterOption={(input: any, option: any) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
               options={objects}
            />
         }
      >
         <CustomTableObjectView data={records} fields={fields} />
      </Card>
   );
};

export default CustomMetadataEditView;
