import { Radio } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
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
  const onChange = ({ target: { value } }: any) => {
    let tempPermission = { ...permission };
    tempPermission.visibility = value;
    let changes = updateChanges(p, 'tabVisibilities', tempPermission, 'tab', trackChanges);
    setTrackChanges(changes);
  };
  return (
    <>
      <Radio.Group
        style={{ backgroundColor: anyChanges.visibility ? 'red' : '' }}
        options={[
          { label: 'Default Off', value: 'DefaultOff' },
          { label: 'Default On', value: 'DefaultOn' },
          { label: 'Hidden', value: 'Hidden' },
        ]}
        size="small"
        onChange={onChange}
        value={permission.visibility}
      />
    </>
  );
};

export default TabPermissionEditView;
