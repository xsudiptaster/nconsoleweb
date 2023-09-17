import { Button, Popover } from "antd";
import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import DisplayFieldPermissionView from "../DisplayFieldPermissionView";
import ObjectConfigView from "../ObjectConfigView";
import style from "./DisplayObjectPermissionView.module.css";
interface IDisplayObjectPermissionViewProps {
   children?: React.ReactNode;
   object: any;
   fetchedProfiles: any[];
   searchString: string;
}

const DisplayObjectPermissionView: React.FC<IDisplayObjectPermissionViewProps> = (props) => {
   const { object, fetchedProfiles, searchString } = props;
   return (
      <>
         <div className={style.contextTable}>
            <table className={style.permissionedittable}>
               <thead>
                  <tr>
                     <th>Object/Profiles</th>
                     {fetchedProfiles.map((profile) => {
                        return (
                           <th key={profile.fileName}>
                              {profile.fullName}
                              <Popover
                                 placement="topRight"
                                 title={"Object Config"}
                                 content={<ObjectConfigView object={object} profile={profile} />}
                                 trigger="click"
                              >
                                 <Button size="small" type="text" icon={<BsFillGearFill />}></Button>
                              </Popover>
                           </th>
                        );
                     })}
                  </tr>
               </thead>
               <tbody>
                  {object.fields
                     .sort((a: any, b: any) => {
                        return a.label > b.label ? 1 : -1;
                     })
                     .filter((field: any) => {
                        return field.permissionable && field.compoundFieldName === null;
                     })
                     .filter((field: any) => {
                        return searchString === ""
                           ? true
                           : field.label.toUpperCase().includes(searchString.toUpperCase()) ||
                                field.name.toUpperCase().includes(searchString.toUpperCase());
                     })
                     .map((field: any) => {
                        return (
                           <tr key={object.name + field.name}>
                              <td>
                                 {field.label}
                                 <br />
                                 <div style={{ fontSize: "9px" }}>({field.name})</div>
                              </td>
                              {fetchedProfiles.map((profile) => {
                                 return (
                                    <td key={profile.fileName} className={profile.fileName}>
                                       <DisplayFieldPermissionView field={field} profile={profile} object={object} />
                                    </td>
                                 );
                              })}
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default DisplayObjectPermissionView;
