import { Button, Collapse } from "antd";
import React from "react";
import styles from "./DisplaySelectedMetadataView.module.css";
import { handleLoad } from "./DisplaySelectedMetadataView.util";
interface IDisplaySelectedMetadataViewProps {
   children?: React.ReactNode;
   selectedMetaDatas: any[];
   setSelectedMetaDatas: any;
}
const DisplayChildren = ({ childrens, selectedMetaDatas, setSelectedMetaDatas }: any) => {
   const onRemove = (idvalue: string) => {
      let tempselected = selectedMetaDatas.filter((metadata: any) => {
         return metadata.id !== idvalue;
      });
      setSelectedMetaDatas(tempselected);
   };
   const onRemoveAll = () => {
      let tempselected = [...selectedMetaDatas];
      childrens.forEach((child: any) => {
         tempselected = tempselected.filter((metadata) => {
            return child.id !== metadata.id;
         });
      });
      setSelectedMetaDatas(tempselected);
   };
   return (
      <table className={styles.tablecss}>
         <thead>
            <tr>
               <th>
                  <Button type="link" size="small" onClick={onRemoveAll}>
                     Remove All
                  </Button>
               </th>
               <th>Field Name</th>
               <th>File Name</th>
               <th>Created By</th>
               <th>LastModified By</th>
            </tr>
         </thead>
         <tbody>
            {childrens.map((child: any) => {
               return (
                  <tr key={child.id}>
                     <td>
                        <Button
                           type="link"
                           onClick={() => {
                              onRemove(child.id);
                           }}
                        >
                           Remove
                        </Button>
                     </td>
                     <td>{child.fullName}</td>
                     <td>{child.fileName}</td>
                     <td>{child.createdByName}</td>
                     <td>{child.lastModifiedByName}</td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
};
const DisplaySelectedMetadataView: React.FC<IDisplaySelectedMetadataViewProps> = (props) => {
   const { selectedMetaDatas, setSelectedMetaDatas } = props;
   const [displayMetadata, setDisplayMetadata] = React.useState<any>({});
   React.useEffect(() => {
      const onload = () => {
         let response = handleLoad(selectedMetaDatas);
         setDisplayMetadata(response);
      };
      onload();
   }, [selectedMetaDatas]);
   return (
      <div style={{ maxHeight: "75vh", overflow: "auto" }}>
         <div className={styles.displayHeader}> Selected Metadata</div>
         <Collapse
            size="small"
            accordion
            style={{ overflow: "auto" }}
            items={Object.keys(displayMetadata).map((type) => {
               return {
                  key: type,
                  label: type.toUpperCase(),
                  children: (
                     <DisplayChildren
                        childrens={displayMetadata[type]}
                        setSelectedMetaDatas={setSelectedMetaDatas}
                        selectedMetaDatas={selectedMetaDatas}
                     />
                  ),
               };
            })}
         />
      </div>
   );
};

export default DisplaySelectedMetadataView;
