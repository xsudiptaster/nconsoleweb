import { Button }       from "antd";
import React            from "react";
import RenderIf         from "../../RenderIf";
import DisplayFieldView from "../DisplayFieldView";

interface IDisplayRowViewProps {
  children?: React.ReactNode;
  fieldMap: any;
  rowIndex: number;
  row: any;
  onSave?: any;
  onDelete?: any;
}

const DisplayRowView: React.FC<IDisplayRowViewProps> = (props) => {
  const { row, fieldMap, onSave, onDelete } = props;
  const [currentRow, setCurrentRow] = React.useState<any>({});
  const [keys, setKeys] = React.useState<string[]>([]);
  const [edit, setEdit] = React.useState(false);
  React.useEffect(() => {
    const onload = () => {
      setKeys(Object.keys(row));
      setCurrentRow({ ...row });
    };
    onload();
  }, [row]);
  const onFieldChange = (key: any, value: any) => {
    let tempRow = { ...currentRow };
    tempRow[key] = value;
    setCurrentRow(tempRow);
  };
  const handleSave = async () => {
    let response = await onSave(currentRow);
    if (response.success) {
      setEdit(false);
    }
  };
  const handleDelete = async () => {
    let response = await onDelete(currentRow);
    if (response.success) {
      setEdit(false);
    }
  };
  return (
    <tr>
      <td>
        <RenderIf renderIf={!edit}>
          <Button
            type="link"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        </RenderIf>
        <RenderIf renderIf={edit}>
          <Button type="link" onClick={handleSave}>
            Save
          </Button>
          <Button
            type="link"
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
        </RenderIf>
      </td>
      {keys.map((key) => {
        return (
          <td key={key}>
            <DisplayFieldView field={fieldMap[key]} value={currentRow[key]} edit={edit} onChange={onFieldChange} />
          </td>
        );
      })}
    </tr>
  );
};

export default DisplayRowView;
