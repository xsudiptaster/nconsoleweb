import { Input, Select } from "antd";
import TextArea          from "antd/es/input/TextArea";
import React             from "react";
import RenderIf          from "../../RenderIf";

interface IDisplayFieldViewProps {
  children?: React.ReactNode;
  field: any;
  value: any;
  onChange?: any;
  edit: boolean;
}

const DisplayFieldView: React.FC<IDisplayFieldViewProps> = (props) => {
  const { value, field, onChange, edit } = props;
  return (
    <div style={{ width: 200 }}>
      <RenderIf renderIf={edit}>
        <RenderIf renderIf={field?.type === "string"}>
          <Input
            size="small"
            value={value}
            onChange={(e) => {
              onChange(field.name, e.target.value);
            }}
          />
        </RenderIf>
        <RenderIf renderIf={field?.type === "textarea"}>
          <TextArea
            rows={4}
            size="small"
            value={value}
            onChange={(e) => {
              onChange(field.name, e.target.value);
            }}
          />
        </RenderIf>
        <RenderIf renderIf={field?.type === "picklist"}>
          <Select
            options={field?.picklistValues ? field?.picklistValues : []}
            size="small"
            style={{ width: 200 }}
            value={value}
            onChange={(value) => {
              onChange(field.name, value);
            }}
          />
        </RenderIf>
        <RenderIf renderIf={field?.type === "datetime"}>
          <Input
            type="date"
            size="small"
            value={new Date().toISOString().substring(0, 10)}
            onChange={(e) => {
              onChange(field.name, e.target.value);
            }}
          />
        </RenderIf>
        <RenderIf renderIf={field?.type === "double"}>
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              onChange(field.name, e.target.value);
            }}
          />
        </RenderIf>
        <RenderIf renderIf={field?.type === "id"}>{value}</RenderIf>
        <RenderIf renderIf={field === undefined}>{value}</RenderIf>
      </RenderIf>
      <RenderIf renderIf={!edit}>{value}</RenderIf>
    </div>
  );
};

export default DisplayFieldView;
