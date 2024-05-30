import { Button, Card, Modal, Select, Space, Tabs } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loadingAtom, trackChangesPermissionEditAtom } from '../../atoms/atom';
import RenderIf from '../../utils/RenderIf';
import ApexPageEditView from './ApexPageEditView';
import ApexPermissionsEditView from './ApexPermissionsEditView';
import DisplayChangesView from './DisplayChangesView';
import FlowPermissionView from './FlowPermissionView';
import ObjectPermissionView from './ObjectPermissionView';
import { handleGetPermissions, handleGetProfilesAndPermissionSets } from './PermissionBulkEditView.util';
import TabPermissionsView from './TabPermissionsView';
import UserPermissionsView from './UserPermissionsView';

interface IPermissionBulkEditViewProps {
  children?: React.ReactNode;
}

const PermissionBulkEditView: React.FC<IPermissionBulkEditViewProps> = (props) => {
  const [, setLoading] = useRecoilState(loadingAtom);
  const [, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [profileList, setProfileList] = React.useState([]);
  const [permissionSetList, setPermissionSetList] = React.useState([]);
  const [selectedProfiles, setSelectedProfiles] = React.useState([]);
  const [selectedPermissionSets, setSelectedPermissionSets] = React.useState([]);
  const [profilePermissions, setProfilePermissions] = React.useState([]);
  const [permissionSetPermissions, setPermissionSetPermissions] = React.useState([]);
  const [userPermissions, setUserPermissions] = React.useState<any[]>([]);
  const [deployModal, setDeployModal] = React.useState(false);
  React.useEffect(() => {
    const onload = async () => {
      let response = await handleGetProfilesAndPermissionSets();
      setProfileList(response.profiles);
      setPermissionSetList(response.permissionSets);
    };
    onload();
  }, []);
  const onGetPermissions = async () => {
    setLoading(true);
    setTrackChanges({});
    setProfilePermissions([]);
    setPermissionSetPermissions([]);
    let response = await handleGetPermissions(selectedProfiles, selectedPermissionSets);
    console.log('🚀 ~ onGetPermissions ~ response:', response);
    setProfilePermissions(response.responseProfiles);
    setPermissionSetPermissions(response.responsePermissionSets);
    setUserPermissions(response.userPermissions);
    setLoading(false);
  };
  return (
    <>
      <Card
        size="small"
        title={
          <Space>
            <Select
              mode="multiple"
              variant="borderless"
              size="small"
              allowClear
              options={profileList}
              style={{ width: '30dvw' }}
              onChange={(v) => {
                setSelectedProfiles(v);
              }}
              placeholder="Please select a Profiles"
            />
            <Select
              mode="multiple"
              variant="borderless"
              size="small"
              allowClear
              options={permissionSetList}
              style={{ width: '30dvw' }}
              onChange={(v) => {
                setSelectedPermissionSets(v);
              }}
              placeholder="Please select a Permission Sets"
            />
            <Button size="small" onClick={onGetPermissions}>
              Get Permissions
            </Button>
          </Space>
        }
        extra={
          <Button
            size="small"
            onClick={() => {
              setDeployModal(true);
            }}
          >
            Save/Deploy
          </Button>
        }
      >
        <RenderIf renderIf={profilePermissions.length > 0 || permissionSetPermissions.length > 0}>
          <Tabs
            size="small"
            items={[
              {
                key: 'objectPermissions',
                label: 'Object Permissions',
                children: (
                  <ObjectPermissionView profiles={profilePermissions} permissionSets={permissionSetPermissions} />
                ),
              },
              {
                key: 'apexPermissions',
                label: 'Apex Permissions',
                children: (
                  <ApexPermissionsEditView profiles={profilePermissions} permissionSets={permissionSetPermissions} />
                ),
              },
              {
                key: 'apexPagePermissions',
                label: 'Apex Page Permissions',
                children: <ApexPageEditView profiles={profilePermissions} permissionSets={permissionSetPermissions} />,
              },
              {
                key: 'flowPermissions',
                label: 'Flow Permissions',
                children: (
                  <FlowPermissionView profiles={profilePermissions} permissionSets={permissionSetPermissions} />
                ),
              },
              {
                key: 'tabPermissions',
                label: 'Tab Permissions',
                children: (
                  <TabPermissionsView profiles={profilePermissions} permissionSets={permissionSetPermissions} />
                ),
              },
              {
                key: 'userPermissions',
                label: 'User Permissions',
                children: (
                  <UserPermissionsView
                    profiles={profilePermissions}
                    permissionSets={permissionSetPermissions}
                    userPermissions={userPermissions}
                  />
                ),
              },
            ]}
          />
        </RenderIf>
      </Card>
      <Modal
        title="Changes"
        open={deployModal}
        footer={null}
        onOk={() => {}}
        style={{ width: '100%' }}
        onCancel={() => {
          setDeployModal(false);
        }}
      >
        <DisplayChangesView
          setDeployModal={setDeployModal}
          profilePermissions={profilePermissions}
          permissionSetPermissions={permissionSetPermissions}
        />
      </Modal>
    </>
  );
};

export default PermissionBulkEditView;
