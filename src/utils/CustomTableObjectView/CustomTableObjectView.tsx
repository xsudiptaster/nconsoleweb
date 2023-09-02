import React from "react";
import RenderIf from "./../RenderIf/RenderIf";
import { handleLoad } from "./CustomTableObjectView.util";
import DisplayFieldView from "./DisplayFieldView";

interface ICustomTableObjectViewProps {
   children?: React.ReactNode;
   data: any[];
   fields: any[];
}

const CustomTableObjectView: React.FC<ICustomTableObjectViewProps> = (props) => {
   const { data, fields } = props;
   const [fieldMap, setFieldMap] = React.useState<any>({});
   React.useEffect(() => {
      const onload = () => {
         let result = handleLoad(fields);
         setFieldMap(result);
      };
      onload();
   }, [fields]);
   return (
      <RenderIf renderIf={data && data.length > 0}>
         <table>
            <thead>
               <tr>
                  {data && data.length > 0 ? (
                     Object.keys(data[0]).map((key, keyIndex) => {
                        return <th key={keyIndex}>{key}</th>;
                     })
                  ) : (
                     <th></th>
                  )}
               </tr>
            </thead>
            <tbody>
               {data && data.length > 0 ? (
                  data.map((row, rowIndex) => {
                     return (
                        <tr key={rowIndex}>
                           {Object.keys(data[0]).map((key: any, dataIndex) => {
                              return (
                                 <td key={rowIndex + "-" + dataIndex}>
                                    <DisplayFieldView value={data[key]} field={fieldMap[key]} />
                                 </td>
                              );
                           })}
                        </tr>
                     );
                  })
               ) : (
                  <td></td>
               )}
            </tbody>
         </table>
      </RenderIf>
   );
};

export default CustomTableObjectView;
