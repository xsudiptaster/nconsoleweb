import { Button, Checkbox, Col, Popover, Row, Space } from "antd";
import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { trackChangesPermissionEditAtom } from "../../../atoms/atom";
import DisplayFieldPermissionView from "../DisplayFieldPermissionView";
import ObjectConfigView from "../ObjectConfigView";
import style from "./DisplayObjectPermissionView.module.css";
import { handleTrackChanges } from "./DisplayObjectPermissionView.util";
interface IDisplayObjectPermissionViewProps {
   children?: React.ReactNode;
   object: any;
   fetchedProfiles: any[];
   searchString: string;
}

const DisplayObjectPermissionView: React.FC<IDisplayObjectPermissionViewProps> = (props) => {
   const { object, fetchedProfiles, searchString } = props;
   const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);

   const onReadAll = (event: any, field: any) => {
      let tempPermisson = { field: object.name + "." + field.name, readable: event.target.checked, editable: false };
      if (event.target.checked === false) {
         tempPermisson.editable = false;
      }
      let tempChanges = handleTrackChanges(trackChanges, fetchedProfiles, tempPermisson);
      setTrackChanges(tempChanges);
   };
   const onEditAll = (event: any, field: any) => {
      let tempPermisson = { field: object.name + "." + field.name, editable: event.target.checked, readable: false };
      if (event.target.checked === true) {
         tempPermisson.readable = true;
      }
      let tempChanges = handleTrackChanges(trackChanges, fetchedProfiles, tempPermisson);
      setTrackChanges(tempChanges);
   };
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
                        return field.compoundFieldName === null && field.permissionable;
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
                                 <Row>
                                    <Col span={12}>
                                       <div>
                                          {field.label}
                                          <br />
                                          <div style={{ fontSize: "9px" }}>({field.name})</div>
                                       </div>
                                    </Col>
                                    <Col span={12}>
                                       <div style={{ float: "right", right: "0%" }}>
                                          <Space direction="vertical">
                                             <Checkbox
                                                onChange={(event: any) => {
                                                   onReadAll(event, field);
                                                }}
                                             >
                                                Read All
                                             </Checkbox>
                                             <Checkbox
                                                disabled={field.calculated}
                                                onChange={(event: any) => {
                                                   onEditAll(event, field);
                                                }}
                                             >
                                                Edit All
                                             </Checkbox>
                                          </Space>
                                       </div>
                                    </Col>
                                 </Row>
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
