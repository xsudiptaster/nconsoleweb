import { Checkbox, DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import RenderIf from "../../../utils/RenderIf";
import { getReferenceObjectValues } from "./DisplayFieldView.util";

interface IDisplayFieldViewProps {
   children?: React.ReactNode;
   edit: boolean;
   field: any;
   value: any;
}
dayjs.extend(customParseFormat);
const dateTimeFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";
const dateFormat = "YYYY-MM-DD";
const DisplayFieldView: React.FC<IDisplayFieldViewProps> = (props) => {
   const { field, value, edit } = props;
   const [refrenceValues, setRefrenceValues] = React.useState<any[]>([]);
   React.useEffect(() => {
      const onload = async () => {
         if (field.type === "reference") {
            let response = await getReferenceObjectValues(field.referenceTo[0]);
            setRefrenceValues(response);
         }
         if (field.type === "datetime") {
            console.log("🚀 ~ DisplayFieldView ~ onload ~ value:", value);
         }
      };
      onload();
   }, [field?.referenceTo, field.type]);
   return (
      <>
         <RenderIf renderIf={field.type === "string"}>
            <Input value={value} disabled={!edit} type="text" size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "email"}>
            <Input value={value} disabled={!edit} type="email" size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "encryptedstring"}>
            <Input value={value} disabled={!edit} type="email" size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "phone"}>
            <Input value={value} disabled={!edit} type="phone" size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "date"}>
            <DatePicker defaultValue={dayjs(value, dateFormat)} disabled={!edit} size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "datetime"}>
            <DatePicker defaultValue={dayjs(value, dateTimeFormat)} showTime disabled={!edit} size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "boolean"}>
            <Checkbox defaultChecked={value} disabled={!edit} />
         </RenderIf>
         <RenderIf renderIf={field.type === "reference"}>
            <Select
               showSearch
               placeholder="Select a Value"
               size="small"
               style={{ width: "100%" }}
               value={value}
               options={refrenceValues}
               filterOption={(input: string, option: any) => {
                  return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
               }}
               disabled={!edit}
            />
         </RenderIf>
         <RenderIf renderIf={field.type === "textarea"}>
            <Input.TextArea rows={2} value={value} disabled={!edit} size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "number"}>
            <Input value={value} disabled={!edit} type="number" size="small" />
         </RenderIf>
         <RenderIf renderIf={field.type === "picklist"}>
            <Select
               showSearch
               placeholder="Select a Value"
               size="small"
               style={{ width: "100%" }}
               value={value}
               options={field.picklistValues}
               filterOption={(input: string, option: any) => {
                  return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
               }}
               disabled={!edit}
            />
         </RenderIf>
         <RenderIf renderIf={field.type === "multipicklist"}>
            <Select
               showSearch
               mode="multiple"
               placeholder="Select a Value"
               size="small"
               style={{ width: "100%" }}
               value={value}
               options={field.picklistValues}
               filterOption={(input: string, option: any) => {
                  return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
               }}
               disabled={!edit}
            />
         </RenderIf>
      </>
   );
};

export default DisplayFieldView;
