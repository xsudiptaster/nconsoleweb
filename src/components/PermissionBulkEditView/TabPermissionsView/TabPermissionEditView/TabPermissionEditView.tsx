import { Radio } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import RenderIf from '../../../../utils/RenderIf';
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
    return response;
  }, [p, tab.Name, trackChanges]);
  let anyChanges = React.useMemo(() => {
    let response = hasTabPermissionChanges(p, permission);
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
      <RenderIf renderIf={p.type === 'profile'}>
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
      </RenderIf>
      <RenderIf renderIf={p.type === 'permissionSet'}>
        <Radio.Group
          style={{ backgroundColor: anyChanges.visibility ? 'red' : '' }}
          options={[
            { label: 'Available', value: 'Available' },
            { label: 'Visible', value: 'Visible' },
          ]}
          size="small"
          onChange={onChange}
          value={permission.visibility}
        />
      </RenderIf>
    </>
  );
};

export default TabPermissionEditView;
