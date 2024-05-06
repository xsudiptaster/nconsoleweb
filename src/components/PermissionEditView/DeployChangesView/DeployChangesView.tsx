import { App, Card, Checkbox, Modal, Tabs } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom, loginInfoAtom, trackChangesPermissionEditAtom } from "../../../atoms/atom";
import OrgSwitchView from "../../../utils/OrgSwitchView";
import RenderIf from "../../../utils/RenderIf";
import { deployChanges } from "./DeployChangesView.util";

interface IDeployChangesViewProps {
   children?: React.ReactNode;
   deploy: boolean;
   setDeploy: any;
   fetchedProfiles: any[];
}

const DeployChangesView: React.FC<IDeployChangesViewProps> = (props) => {
   const { deploy, setDeploy, fetchedProfiles } = props;
   const { message } = App.useApp();
   const [loginInfo] = useRecoilState(loginInfoAtom);
   const [trackChanges] = useRecoilState(trackChangesPermissionEditAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [currentLoginInfo, setCurrentLoginInfo] = React.useState<any>({});
   React.useEffect(() => {
      const onload = () => {
         setCurrentLoginInfo(loginInfo);
      };
      onload();
   }, [loginInfo]);
   const onOk = async () => {
      setDeploy(false);
      setLoading(true);
      let response = await deployChanges(fetchedProfiles, trackChanges, currentLoginInfo);

      setLoading(false);
      if (response.success) {
         message.success(response.message);
      } else {
         message.error(response.message);
      }
   };
   const onCancel = async () => {
      setDeploy(false);
   };
   const onConfirm = (value: any) => {
      setCurrentLoginInfo(value);
   };
   return (
      <>
         <Modal title="Confirm Changes" open={deploy} onOk={onOk} onCancel={onCancel} style={{ top: 20 }}>
            <Tabs
               items={Object.keys(trackChanges).map((fileName) => {
                  return {
                     key: fileName,
                     label: fileName,
                     children: (
                        <>
                           <RenderIf renderIf={trackChanges[fileName]?.fieldPermissions}>
                              <Card title="Field Permissions Changes" size="small">
                                 <table style={{ width: "100%" }}>
                                    <thead>
                                       <tr>
                                          <th>Field Name</th>
                                          <th>Read</th>
                                          <th>Edit</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {trackChanges[fileName]?.fieldPermissions ? (
                                          trackChanges[fileName].fieldPermissions.map((permission: any) => {
                                             return (
                                                <tr key={permission.field}>
                                                   <td>{permission.field}</td>
                                                   <td>
                                                      <Checkbox checked={permission.readable} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.editable} disabled />
                                                   </td>
                                                </tr>
                                             );
                                          })
                                       ) : (
                                          <td></td>
                                       )}
                                    </tbody>
                                 </table>
                              </Card>
                           </RenderIf>
                           <RenderIf renderIf={trackChanges[fileName]?.objectPermissions}>
                              <Card title="Object Permission Changes" size="small">
                                 <table style={{ width: "100%" }}>
                                    <thead>
                                       <tr>
                                          <th>Object Name</th>
                                          <th>Read</th>
                                          <th>Create</th>
                                          <th>Edit</th>
                                          <th>Delete</th>
                                          <th>View All</th>
                                          <th>Modify All</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {trackChanges[fileName]?.objectPermissions ? (
                                          trackChanges[fileName]?.objectPermissions.map((permission: any) => {
                                             return (
                                                <tr key={permission.object}>
                                                   <td>{permission.object}</td>
                                                   <td>
                                                      <Checkbox checked={permission.allowRead} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.allowCreate} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.allowEdit} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.allowDelete} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.viewAllRecords} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.modifyAllRecords} disabled />
                                                   </td>
                                                </tr>
                                             );
                                          })
                                       ) : (
                                          <td></td>
                                       )}
                                    </tbody>
                                 </table>
                              </Card>
                           </RenderIf>
                           <RenderIf renderIf={trackChanges[fileName]?.recordTypeVisibilities}>
                              <Card title="Record Type Changes" size="small">
                                 <table style={{ width: "100%" }}>
                                    <thead>
                                       <tr>
                                          <th>Record Type</th>
                                          <th>Active</th>
                                          <th>Default</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {trackChanges[fileName]?.recordTypeVisibilities ? (
                                          trackChanges[fileName].recordTypeVisibilities.map((permission: any) => {
                                             return (
                                                <tr key={permission.recordType}>
                                                   <td>{permission.recordType}</td>
                                                   <td>
                                                      <Checkbox checked={permission.visible} disabled />
                                                   </td>
                                                   <td>
                                                      <Checkbox checked={permission.default} disabled />
                                                   </td>
                                                </tr>
                                             );
                                          })
                                       ) : (
                                          <td></td>
                                       )}
                                    </tbody>
                                 </table>
                              </Card>
                           </RenderIf>
                        </>
                     ),
                  };
               })}
            />
            <Card title="Save / Deploy to" size="small">
               <OrgSwitchView defaultUserName={currentLoginInfo.username} onConfirm={onConfirm} />
            </Card>
         </Modal>
      </>
   );
};

export default DeployChangesView;
