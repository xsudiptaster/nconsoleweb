import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getUserPermission, hasChangesUserPermission } from '../UserPermissionsEditView.util';

interface IUserPermissionEditViewProps {
  children?: React.ReactNode;
  p: any;
  userPermissionName: string;
}

const UserPermissionEditView: React.FC<IUserPermissionEditViewProps> = (props) => {
  const { p, userPermissionName } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let permission = React.useMemo(() => {
    return getUserPermission(p, userPermissionName, trackChanges);
  }, [p, trackChanges, userPermissionName]);
  const anyChanges = React.useMemo(() => {
    return hasChangesUserPermission(p, permission);
  }, [p, permission]);
  const onChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.enabled = e.target.checked;
    let changes = updateChanges(p, 'userPermissions', tempPermission, 'name', trackChanges);
    setTrackChanges(changes);
  };
  return (
    <>
      <CustomCheckBox
        checked={permission.enabled}
        style={{ backgroundColor: anyChanges.enabled ? 'red' : '' }}
        onChange={onChange}
      />
    </>
  );
};

export default UserPermissionEditView;
