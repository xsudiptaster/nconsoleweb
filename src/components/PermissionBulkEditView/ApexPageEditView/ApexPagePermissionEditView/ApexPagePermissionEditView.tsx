import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getApexPagePermission, hasApexPagePermissionChange } from '../ApexPageEditView.util';

interface IApexPagePermissionEditViewProps {
  children?: React.ReactNode;
  p: any;
  apexPageName: string;
}

const ApexPagePermissionEditView: React.FC<IApexPagePermissionEditViewProps> = (props) => {
  const { p, apexPageName } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let permission = React.useMemo(() => {
    return getApexPagePermission(apexPageName, p, trackChanges);
  }, [apexPageName, p, trackChanges]);
  let anyChanges = React.useMemo(() => {
    return hasApexPagePermissionChange(p, permission);
  }, [p, permission]);
  const onChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.enabled = e.target.checked;
    let changes = updateChanges(p, 'pageAccesses', tempPermission, 'apexPage', trackChanges);
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

export default ApexPagePermissionEditView;
