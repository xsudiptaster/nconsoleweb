import { Button, Select, Table } from "antd";
import React from "react";
import RenderIf from "../RenderIf";
import { writeFileWithXLSX } from "../utils";
import { createDisplayColumns } from "./DisplayExcelSheetView.util";

interface IDisplayExcelSheetViewProps {
   children?: React.ReactNode;
   data: any[];
   showDownload: boolean;
}

const DisplayExcelSheetView: React.FC<IDisplayExcelSheetViewProps> = (props) => {
   const { data, showDownload } = props;
   const [columns, setColumns] = React.useState<any[]>([]);
   React.useEffect(() => {
      const onload = () => {
         setColumns(data.length > 0 ? Object.keys(data[0]) : []);
      };
      onload();
   }, [data]);
   const displayColumns: any[] = createDisplayColumns(columns, data);
   return (
      <div style={{ overflow: "auto" }}>
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
            footer={() => {
               return (
                  <RenderIf renderIf={showDownload === true}>
                     <Button
                        size="small"
                        onClick={() => {
                           writeFileWithXLSX(data, "Log-" + new Date().getTime());
                        }}
                     >
                        Download
                     </Button>
                  </RenderIf>
               );
            }}
         />
      </div>
   );
};

export default DisplayExcelSheetView;
