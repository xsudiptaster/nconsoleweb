import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getApexClassPermission, hasApexClassChanges } from '../ApexPermisssionsEditView.util';

interface IApexClassEditViewProps {
  children?: React.ReactNode;
  p: any;
  ApexClassName: string;
}

const ApexClassEditView: React.FC<IApexClassEditViewProps> = (props) => {
  const { p, ApexClassName } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let permission = React.useMemo(() => {
    return getApexClassPermission(ApexClassName, p, trackChanges);
  }, [ApexClassName, p, trackChanges]);
  let anyChanges = React.useMemo(() => {
    return hasApexClassChanges(p, permission);
  }, [p, permission]);
  const onChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.enabled = e.target.checked;
    let changes = updateChanges(p, 'classAccesses', tempPermission, 'apexClass', trackChanges);
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

export default ApexClassEditView;
