import { Card, Checkbox, Space } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { trackChangesPermissionEditAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
import { getRecordTypePermission, handlePermissionChange, hasChange, updateTrackChanges } from "./RecordTypePermissionView.util";

interface IRecordTypePermissionViewProps {
   children?: React.ReactNode;
   object: any;
   profile: any;
}

const RecordTypePermissionView: React.FC<IRecordTypePermissionViewProps> = (props) => {
   const { profile, object } = props;
   const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
   const [permissionMap, setPermissionMap] = React.useState<any>({});
   const [changes, setChanges] = React.useState<any>({});
   React.useMemo(() => {
      const onload = () => {
         let response = getRecordTypePermission(trackChanges, profile, object);
         let tempChanges = hasChange(response, profile, object);
         setChanges(tempChanges);
         setPermissionMap(response);
      };
      onload();
   }, [object, profile, trackChanges]);
   const onChange = (recordTypeName: string, permission: string, value: boolean) => {
      let newPermissionsMap = handlePermissionChange(permissionMap, recordTypeName, permission, value);
      let response = updateTrackChanges(trackChanges, profile, newPermissionsMap);
      setTrackChanges(response);
   };
   return (
      <Card title="Record Type Permissions" size="small">
         <Space size="small">
            {object?.recordTypeInfos
               ? object?.recordTypeInfos
                    .filter((recordType: any) => {
                       return recordType.developerName !== "Master";
                    })
                    .map((recordType: any) => {
                       return (
                          <Space direction="vertical" key={recordType.developerName}>
                             <>{recordType.name}</>
                             <Checkbox
                                checked={permissionMap[recordType.developerName]?.visible}
                                style={{ backgroundColor: changes[recordType.developerName]?.visible ? "red" : "" }}
                                onChange={(event: any) => {
                                   onChange(recordType.developerName, "visible", event?.target.checked);
                                }}
                             >
                                Activate
                             </Checkbox>
                             <RenderIf renderIf={profile.type === "Profile"}>
                                <Checkbox
                                   checked={permissionMap[recordType.developerName]?.default}
                                   style={{ backgroundColor: changes[recordType.developerName]?.default ? "red" : "" }}
                                   onChange={(event: any) => {
                                      onChange(recordType.developerName, "default", event?.target.checked);
                                   }}
                                >
                                   Default
                                </Checkbox>
                             </RenderIf>
                          </Space>
                       );
                    })
               : ""}
         </Space>
      </Card>
   );
};

export default RecordTypePermissionView;
