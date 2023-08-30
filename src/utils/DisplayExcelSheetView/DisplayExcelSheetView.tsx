import { Button, Select, Table } from "antd";
import React from "react";
import { writeFileWithXLSX } from "../utils";
import { createDisplayColumns } from "./DisplayExcelSheetView.util";

interface IDisplayExcelSheetViewProps {
   children?: React.ReactNode;
   data: any[];
}

const DisplayExcelSheetView: React.FC<IDisplayExcelSheetViewProps> = (props) => {
   const { data } = props;
   const [columns, setColumns] = React.useState<any[]>([]);
   React.useEffect(() => {
      const onload = () => {
         setColumns(data.length > 0 ? Object.keys(data[0]) : []);
      };
      onload();
   }, [data]);
   const displayColumns: any[] = createDisplayColumns(columns, data);
   return (
      <div style={{ maxWidth: "60vw", overflow: "auto" }}>
         <Select
            mode="multiple"
            size="small"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select columns"
            defaultValue={columns}
            value={columns}
            onChange={setColumns}
            options={
               data.length > 0
                  ? Object.keys(data[0]).map((key) => {
                       return { value: key, label: key };
                    })
                  : []
            }
         />
         <Table
            dataSource={data}
            size="small"
            columns={displayColumns}
            sticky
            showSorterTooltip
            tableLayout="auto"
            footer={() => {
               return (
                  <Button
                     size="small"
                     onClick={() => {
                        writeFileWithXLSX(data, "Log-" + new Date().getTime());
                     }}
                  >
                     Download
                  </Button>
               );
            }}
         />
      </div>
   );
};

export default DisplayExcelSheetView;
