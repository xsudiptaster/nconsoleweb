import { Checkbox, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { trackChangesPermissionEditAtom } from "../../../atoms/atom";
import { getFieldPermission, hasChange, updateTrackChanges } from "./DisplayFieldPermissionView.util";

interface IDisplayFieldPermissionViewProps {
   children?: React.ReactNode;
   object: any;
   field: any;
   profile: any;
}

const DisplayFieldPermissionView: React.FC<IDisplayFieldPermissionViewProps> = React.memo((props) => {
   const { object, field, profile } = props;
   const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
   const [permission, setPermission] = React.useState<any>({});
   const [change, setChange] = React.useState<any>({});
   React.useMemo(() => {
      const onload = () => {
         let response = getFieldPermission(trackChanges, object, field, profile);
         let tempChange = hasChange(profile, response);
         setChange(tempChange);
         setPermission(response);
      };
      onload();
   }, [field, object, profile, trackChanges]);

   const onReadChange = (event: any) => {
      let tempPermisson = { ...permission, readable: event.target.checked };
      if (event.target.checked === false) {
         tempPermisson.editable = false;
      }
      let response = updateTrackChanges(trackChanges, profile, tempPermisson);
      setTrackChanges(response);
   };
   const onEditChange = (event: any) => {
      let tempPermisson = { ...permission, editable: event.target.checked };
      if (event.target.checked === true) {
         tempPermisson.readable = true;
      }
      let response = updateTrackChanges(trackChanges, profile, tempPermisson);
      setTrackChanges(response);
   };

   return (
      <>
         <Space size="small">
            <Checkbox
               checked={permission.readable}
               onChange={onReadChange}
               style={{ backgroundColor: change.readable ? "red" : "" }}
            >
               Read
            </Checkbox>
            <Checkbox
               checked={permission.editable}
               disabled={field.calculated}
               onChange={onEditChange}
               style={{ backgroundColor: change.editable ? "red" : "" }}
            >
               Edit
            </Checkbox>
         </Space>
      </>
   );
});

export default DisplayFieldPermissionView;
