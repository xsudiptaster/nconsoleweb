import { App, Card, Select }                                                            from "antd";
import React                                                                            from "react";
import { useRecoilState }                                                               from "recoil";
import { loadingAtom }                                                                  from "../../atoms/atom";
import CustomTableObjectView                                                            from "../../utils/CustomTableObjectView";
import { deleteCustomMetadata, handleLoad, handleObjectSelection, saveCustomeMetadata } from "./CustomMetadataEditView.util";

interface ICustomMetadataEditViewProps {
  children?: React.ReactNode;
}

const CustomMetadataEditView: React.FC<ICustomMetadataEditViewProps> = (props) => {
  const { message } = App.useApp();
  const [, setLoading] = useRecoilState(loadingAtom);
  const [objects, setObjects] = React.useState([]);
  const [selectedObject, setSelectedObject] = React.useState("");
  const [records, setRecords] = React.useState<any[]>([]);
  const [fields, setFields] = React.useState([]);
  React.useEffect(() => {
    const onload = async () => {
      let response = await handleLoad();
      setObjects(response);
    };
    onload();
  }, []);
  const onChange = async (value: any) => {
    setLoading(true);
    setSelectedObject(value);
    let response = await handleObjectSelection(value);
    setRecords(response.records);
    setFields(response.fields);
    setLoading(false);
  };
  const onSave = async (row: any) => {
    setLoading(true);
    if (row.Label === "") {
      message.error("Label cannot be empty");
      return { success: false };
    }
    if (row.DeveloperName === "") {
      message.error("Developer Name cannot be empty");
      return { success: false };
    }
    let response = await saveCustomeMetadata(selectedObject, row);
    setLoading(false);
    if (response.success === false) {
      message.success(JSON.stringify(response));
      return { success: false };
    }
    let tempData = [...records];
    tempData = tempData.filter((item: any) => item.DeveloperName !== row.DeveloperName);
    tempData = [row, ...tempData];
    setRecords(tempData);
    message.success("Saved Successfully");
    return response;
  };
  const onDelete = async (row: any) => {
    if (row.DeveloperName === "") {
      return { success: false, error: "Delete Failed No Developer Name!!" };
    }
    let response = await deleteCustomMetadata(selectedObject, row);
    if (response.success === false) {
      message.success(JSON.stringify(response));
      return { success: false };
    }
    let tempData = [...records];
    tempData = tempData.filter((item: any) => item.DeveloperName !== row.DeveloperName);
    setRecords(tempData);
    message.success("Deleted Successfully");
    return response;
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
      <CustomTableObjectView data={records} fields={fields} onSave={onSave} onDelete={onDelete} />
    </Card>
  );
};

export default CustomMetadataEditView;
