import { Table } from "antd";
import React from "react";
import DisplayTableDataView from "./DisplayTableDataView";
import { createColumns } from "./NestedTableView.util";

interface INestedTableViewProps {
   children?: React.ReactNode;
   data: any[];
}

const NestedTableView: React.FC<INestedTableViewProps> = (props) => {
   const { data } = props;
   const columns: any[] = React.useMemo(() => {
      let columns = createColumns(data);
      console.log("🚀 ~ constcolumns:any[]=React.useMemo ~ columns:", columns);
      return columns.map((column) => {
         return {
            ...column,
            render: (data: any, record: any, index: number) => {
               return <DisplayTableDataView data={data} record={record} index={index} />;
            },
         };
      });
   }, [data]);
   return (
      <>
         <Table dataSource={data} columns={columns} size="small" sticky style={{ height: "60vh", overflow: "scroll" }} />
      </>
   );
};

export default NestedTableView;
