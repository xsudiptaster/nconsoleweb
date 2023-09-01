import React from "react";

interface ICustomTableObjectViewProps {
   children?: React.ReactNode;
   data: any[];
   fields: any[];
}

const CustomTableObjectView: React.FC<ICustomTableObjectViewProps> = (props) => {
   const { data } = props;
   return (
      <>
         <table>
            <thead>
               <tr>
                  {data && data.length > 0
                     ? Object.keys(data[0]).map((key, keyIndex) => {
                          return <th key={keyIndex}>{key}</th>;
                       })
                     : ""}
               </tr>
            </thead>
            <tbody>
               {data && data.length > 0
                  ? data.map((row, rowIndex) => {
                       return (
                          <tr key={rowIndex}>
                             {Object.keys(data[0]).map((key: any, dataIndex) => {
                                return <td key={rowIndex + "-" + dataIndex}> {row[key] ? row[key].toString() : ""}</td>;
                             })}
                          </tr>
                       );
                    })
                  : ""}
            </tbody>
         </table>
      </>
   );
};

export default CustomTableObjectView;
