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
    let response = getTabPermissions(p, tab.Name, trackChanges);
    console.log('🚀 ~ permission ~ response:', response);
    return response;
  }, [p, tab.Name, trackChanges]);
  let anyChanges = React.useMemo(() => {
    let response = hasTabPermissionChanges(p, permission);
    console.log('🚀 ~ anyChanges ~ response:', response);
    return response;
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
