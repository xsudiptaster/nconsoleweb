import { Tabs } from "antd";
import React from "react";
import ApexClassPermissionAssignedView from "../ApexClassPermissionAssignedView";
import ApexPagePermissionAssignedView from "../ApexPagePermissionAssignedView";
import FieldPermissionAssignedView from "../FieldPermissionAssignedView";
import ObjectPermissionAssignedView from "../ObjectPermissionAssignedView";
import RecordTypePermissionAssignedView from "../RecordTypePermissionAssignedView";
import UserPermissionAssignedView from "../UserPermissionAssignedView";

interface IUserPermissionViewProps {
   children?: React.ReactNode;
   permissionList: any;
   permissionMap: any;
   profileMap: any;
}

const UserPermissionView: React.FC<IUserPermissionViewProps> = (props) => {
   const { permissionList, permissionMap, profileMap } = props;
   return (
      <>
         <Tabs
            items={[
               {
                  key: "fieldPermissions",
                  label: "Field Permissions",
                  children: (
                     <FieldPermissionAssignedView
                        fieldPermissionList={permissionList?.fieldPermissionList ? permissionList?.fieldPermissionList : []}
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
               {
                  key: "objectPermissions",
                  label: "Object Permissions",
                  children: (
                     <ObjectPermissionAssignedView
                        objectPermissionList={permissionList?.objectPermissionList ? permissionList?.objectPermissionList : []}
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
               {
                  key: "recordTypePermissions",
                  label: "RecordType Permissions",
                  children: (
                     <RecordTypePermissionAssignedView
                        recordTypePermissionList={
                           permissionList?.recordTypePermissionList ? permissionList?.recordTypePermissionList : []
                        }
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
               {
                  key: "userPermissions",
                  label: "User Permissions",
                  children: (
                     <UserPermissionAssignedView
                        userPermissionList={permissionList?.userPermissionList ? permissionList?.userPermissionList : []}
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
               {
                  key: "apexPagePermissions",
                  label: "Apex Page Permissions",
                  children: (
                     <ApexPagePermissionAssignedView
                        apexPagePermissionList={
                           permissionList?.apexPagePermissionList ? permissionList?.apexPagePermissionList : []
                        }
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
               {
                  key: "apexClassPermissions",
                  label: "Apex Class Permissions",
                  children: (
                     <ApexClassPermissionAssignedView
                        apexClassPermissionList={
                           permissionList?.apexClassPermissionList ? permissionList?.apexClassPermissionList : []
                        }
                        permissionMap={permissionMap}
                        profileMap={profileMap}
                     />
                  ),
               },
            ]}
            tabPosition="left"
         />
      </>
   );
};

export default UserPermissionView;
