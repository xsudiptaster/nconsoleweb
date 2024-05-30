import { Card, Input, Space } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../atoms/atom';
import CustomCheckBox from '../../../utils/CustomCheckBox';
import { updateChanges } from '../PermissionBulkEditView.util';
import UserPermissionEditView from './UserPermissionEditView';
import style from './UserPermissionsView.module.css';

interface IUserPermissionsViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
  userPermissions: any[];
}

const UserPermissionsView: React.FC<IUserPermissionsViewProps> = (props) => {
  const { profiles, permissionSets, userPermissions } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [searchString, setSearchString] = React.useState('');
  let dvSearchString = React.useDeferredValue(searchString);
  let displayList = React.useMemo(() => {
    return userPermissions
      .filter((dl: any) => {
        return dvSearchString !== '' ? dl.name.toUpperCase().includes(dvSearchString.toUpperCase()) : true;
      })
      .sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
      });
  }, [dvSearchString, userPermissions]);
  const onPermissionChangeAll = (e: any, oUserPerm: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    profiles.forEach((p: any) => {
      let tempPermission = { name: oUserPerm.name, enabled: e.target.checked };
      changes = updateChanges(p, 'userPermissions', tempPermission, 'name', changes);
    });
    permissionSets.forEach((p: any) => {
      let tempPermission = { name: oUserPerm.name, enabled: e.target.checked };
      changes = updateChanges(p, 'userPermissions', tempPermission, 'name', changes);
    });
    setTrackChanges(changes);
  };
  const onProfileChangeAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    userPermissions.forEach((oUserPerm: any) => {
      let tempPermission = { name: oUserPerm.name, enabled: e.target.checked };
      changes = updateChanges(p, 'userPermissions', tempPermission, 'name', changes);
    });
    setTrackChanges(changes);
  };
  return (
    <>
      <Card
        size="small"
        title={
          <Input
            size="small"
            placeholder="Search User Permission"
            variant="borderless"
            addonAfter={<AiOutlineSearch />}
            onChange={(e) => setSearchString(e.target.value)}
          />
        }
      >
        <div className={style.contextTable}>
          <table className={style.permissionedittable}>
            <thead>
              <tr>
                <th>Permission Name/Profiles or Permission Sets</th>
                {profiles.map((p: any) => {
                  return (
                    <th key={p.fileName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox
                          onChange={(e: any) => {
                            onProfileChangeAll(e, p);
                          }}
                        />
                      </Space>
                    </th>
                  );
                })}
                {permissionSets.map((p: any) => {
                  return (
                    <th key={p.fileName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox
                          onChange={(e: any) => {
                            onProfileChangeAll(e, p);
                          }}
                        />
                      </Space>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {displayList.map((oUserPerm: any) => {
                return (
                  <tr key={oUserPerm.name}>
                    <td>
                      {oUserPerm.name}
                      <div style={{ float: 'right' }}>
                        <CustomCheckBox onChange={(e: any) => onPermissionChangeAll(e, oUserPerm)} />
                      </div>
                    </td>
                    {profiles.map((p: any) => {
                      return (
                        <td key={p.fileName}>
                          <UserPermissionEditView p={p} userPermissionName={oUserPerm.name} />
                        </td>
                      );
                    })}
                    {permissionSets.map((p: any) => {
                      return (
                        <td key={p.fileName}>
                          <UserPermissionEditView p={p} userPermissionName={oUserPerm.name} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default UserPermissionsView;
