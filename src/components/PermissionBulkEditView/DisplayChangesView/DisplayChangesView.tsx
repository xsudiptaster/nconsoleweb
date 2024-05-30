import { App, Button, Card, Tabs } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loadingAtom, loginInfoAtom, trackChangesPermissionEditAtom } from '../../../atoms/atom';
import CustomCheckBox from '../../../utils/CustomCheckBox';
import OrgSwitchView from '../../../utils/OrgSwitchView';
import RenderIf from '../../../utils/RenderIf';
import style from './DisplayChangesView.module.css';
import { deployChanges } from './DisplayChangesView.util';
interface IDisplayChangesViewProps {
  children?: React.ReactNode;
  setDeployModal: any;
  profilePermissions: any[];
  permissionSetPermissions: any[];
}

const ObjectChanges = (props: any) => {
  const { objectPermissions } = props;
  return (
    <Card size="small" title="Object Changes" bordered={false}>
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Object Name</th>
            <th>Create</th>
            <th>Read</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View All</th>
            <th>Modify All</th>
          </tr>
        </thead>
        <tbody>
          {objectPermissions.map((permission: any) => (
            <tr key={permission.object}>
              <td>{permission.object}</td>
              <td>
                <CustomCheckBox checked={permission.allowCreate} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.allowRead} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.allowEdit} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.allowDelete} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.viewAllRecords} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.modifyAllRecords} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const FieldChanges = (props: any) => {
  const { fieldPermissions } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Read</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {fieldPermissions.map((permission: any) => (
            <tr key={permission.field}>
              <td>{permission.field}</td>
              <td>
                <CustomCheckBox checked={permission.readable} disabled />
              </td>
              <td>
                <CustomCheckBox checked={permission.editable} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const ApexClassChanges = (props: any) => {
  const { classAccesses } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {classAccesses.map((access: any) => (
            <tr key={access.apexClass}>
              <td>{access.apexClass}</td>
              <td>
                <CustomCheckBox checked={access.enabled} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const ApexPageChanges = (props: any) => {
  const { pageAccesses } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Apex Page Name</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {pageAccesses.map((access: any) => (
            <tr key={access.apexPage}>
              <td>{access.apexPage}</td>
              <td>
                <CustomCheckBox checked={access.enabled} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const FlowChanges = (props: any) => {
  const { flowAccesses } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Flow Name</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {flowAccesses.map((access: any) => (
            <tr key={access.flow}>
              <td>{access.flow}</td>
              <td>
                <CustomCheckBox checked={access.enabled} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const TabChanges = (props: any) => {
  const { tabVisibilities } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th>Tab Name</th> <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {tabVisibilities.map((access: any) => (
            <tr key={access.tab}>
              <td>{access.tab}</td>
              <td>
                <CustomCheckBox checked={access.visibility} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const UserPermissionChanges = (props: any) => {
  const { userPermissions } = props;
  return (
    <Card size="small">
      <table className={style.objectTable}>
        <thead>
          <tr>
            <th> Permission Name</th>
            <th> Permission</th>
          </tr>
        </thead>
        <tbody>
          {userPermissions.map((access: any) => (
            <tr key={access.name}>
              <td>{access.name}</td>
              <td>
                <CustomCheckBox checked={access.enabled} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
const DisplayChangesView: React.FC<IDisplayChangesViewProps> = (props) => {
  const { setDeployModal, profilePermissions, permissionSetPermissions } = props;
  const { message } = App.useApp();
  const [trackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [loginInfo] = useRecoilState(loginInfoAtom);
  const [, setLoading] = useRecoilState(loadingAtom);
  const [currentLoginInfo, setCurrentLoginInfo] = React.useState<any>({});
  React.useEffect(() => {
    const onload = () => {
      setCurrentLoginInfo(loginInfo);
    };
    onload();
  }, [loginInfo]);
  const onConfirm = (value: any) => {
    setCurrentLoginInfo(value);
  };
  const deploy = async () => {
    setLoading(true);
    setDeployModal(false);
    let response = await deployChanges(profilePermissions, permissionSetPermissions, trackChanges, currentLoginInfo);
    console.log('🚀 ~ deploy ~ response:', response);
    setLoading(false);
    if (response.success) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };
  return (
    <Card size="small">
      <div className={style.displayHeader}>
        <Tabs
          size="small"
          items={Object.keys(trackChanges).map((ch: any) => {
            return {
              label: trackChanges[ch].fullName,
              key: ch,
              children: (
                <>
                  <RenderIf renderIf={trackChanges[ch].objectPermissions}>
                    <ObjectChanges objectPermissions={trackChanges[ch].objectPermissions} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].fieldPermissions}>
                    <FieldChanges fieldPermissions={trackChanges[ch].fieldPermissions} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].classAccesses}>
                    <ApexClassChanges classAccesses={trackChanges[ch].classAccesses} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].pageAccesses}>
                    <ApexPageChanges pageAccesses={trackChanges[ch].pageAccesses} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].flowAccesses}>
                    <FlowChanges flowAccesses={trackChanges[ch].flowAccesses} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].tabVisibilities}>
                    <TabChanges tabVisibilities={trackChanges[ch].tabVisibilities} />
                  </RenderIf>
                  <RenderIf renderIf={trackChanges[ch].userPermissions}>
                    <UserPermissionChanges userPermissions={trackChanges[ch].userPermissions} />
                  </RenderIf>
                </>
              ),
            };
          })}
        />
      </div>
      <Card title="Save / Deploy to" size="small">
        <OrgSwitchView defaultUserName={currentLoginInfo.username} onConfirm={onConfirm} />
        <div style={{ float: 'right', textAlign: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <Button size="small" onClick={deploy}>
            Deploy/Save
          </Button>
        </div>
      </Card>
    </Card>
  );
};

export default DisplayChangesView;
