import React from "react";
import RenderIf from "../../../utils/RenderIf";
import EditObjectPermissionsView from "../EditObjectPermissionsView";
import RecordTypePermissionView from "../RecordTypePermissionView";

interface IObjectConfigViewProps {
   children?: React.ReactNode;
   object: any;
   profile: any;
}

const ObjectConfigView: React.FC<IObjectConfigViewProps> = (props) => {
   const { object, profile } = props;

   return (
      <>
         <EditObjectPermissionsView object={object} profile={profile} />
         <RenderIf renderIf={object?.recordTypeInfos && object.recordTypeInfos.length > 0}>
            <RecordTypePermissionView object={object} profile={profile} />
         </RenderIf>
      </>
   );
};

export default ObjectConfigView;
