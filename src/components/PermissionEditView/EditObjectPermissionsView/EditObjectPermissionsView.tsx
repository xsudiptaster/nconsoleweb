import { Card, Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { trackChangesPermissionEditAtom } from "../../../atoms/atom";
import style from "../DisplayObjectPermissionView/DisplayObjectPermissionView.module.css";
import { getObjectPermission, hasChange, updateTrackChanges } from "./EditObjectPermissionsView.util";

interface IEditObjectPermissionsViewProps {
   children?: React.ReactNode;
   object: any;
   profile: any;
}

const EditObjectPermissionsView: React.FC<IEditObjectPermissionsViewProps> = (props) => {
   const { object, profile } = props;
   const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
   const [permission, setPermission] = React.useState<any>({});
   const [change, setChange] = React.useState<any>({});
   React.useMemo(() => {
      const onload = () => {
         let response = getObjectPermission(trackChanges, object, profile);
         setPermission(response);
         let tempChange = hasChange(profile, response);
         setChange(tempChange);
      };
      onload();
   }, [object, profile, trackChanges]);
   const onReadChange = (event: any) => {
      let newPermission = { ...permission, allowRead: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   const onCreateChange = (event: any) => {
      let newPermission = { ...permission, allowCreate: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   const onEditChange = (event: any) => {
      let newPermission = { ...permission, allowEdit: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   const onDeleteChange = (event: any) => {
      let newPermission = { ...permission, allowDelete: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   const onViewAllChange = (event: any) => {
      let newPermission = { ...permission, viewAllRecords: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   const onModifyAllChange = (event: any) => {
      let newPermission = { ...permission, modifyAllRecords: event?.target.checked };
      let response = updateTrackChanges(trackChanges, profile, newPermission);
      setTrackChanges(response);
   };
   return (
      <Card title="Object Permissions" size="small">
         <div className={style.objectpermissionDiv}>
            <Checkbox
               checked={permission.allowRead}
               onChange={onReadChange}
               style={{ backgroundColor: change.allowRead ? "red" : "" }}
            >
               Read
            </Checkbox>
            <Checkbox
               checked={permission.allowCreate}
               onChange={onCreateChange}
               style={{ backgroundColor: change.allowCreate ? "red" : "" }}
            >
               Create
            </Checkbox>
            <Checkbox
               checked={permission.allowEdit}
               onChange={onEditChange}
               style={{ backgroundColor: change.allowEdit ? "red" : "" }}
            >
               Edit
            </Checkbox>
            <Checkbox
               checked={permission.allowDelete}
               onChange={onDeleteChange}
               style={{ backgroundColor: change.allowDelete ? "red" : "" }}
            >
               Delete
            </Checkbox>
            <Checkbox
               checked={permission.viewAllRecords}
               onChange={onViewAllChange}
               style={{ backgroundColor: change.viewAllRecords ? "red" : "" }}
            >
               View All
            </Checkbox>
            <Checkbox
               checked={permission.modifyAllRecords}
               onChange={onModifyAllChange}
               style={{ backgroundColor: change.modifyAllRecords ? "red" : "" }}
            >
               Modify All
            </Checkbox>
         </div>
      </Card>
   );
};

export default EditObjectPermissionsView;
