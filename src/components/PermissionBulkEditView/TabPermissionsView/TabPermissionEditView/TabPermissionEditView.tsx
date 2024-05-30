import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getTabPermissions, hasTabPermissionChanges } from '../TabPermissionsView.util';

interface ITabPermissionEditViewProps {
  children?: React.ReactNode;
  p: any;
  tab: any;
}

const TabPermissionEditView: React.FC<ITabPermissionEditViewProps> = (props) => {
  const { p, tab } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let permission = React.useMemo(() => {
    return getTabPermissions(p, tab.Name, trackChanges);
  }, [p, tab.Name, trackChanges]);
  let anyChanges = React.useMemo(() => {
    return hasTabPermissionChanges(p, permission);
  }, [p, permission]);
  const onChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.visibility = e.target.checked;
    let changes = updateChanges(p, 'tabVisibilities', tempPermission, 'tab', trackChanges);
    setTrackChanges(changes);
  };
  return (
    <>
      <CustomCheckBox
        checked={permission.visibility}
        onChange={onChange}
        style={{ backgroundColor: anyChanges.visibility ? 'red' : '' }}
      />
    </>
  );
};

export default TabPermissionEditView;
