import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getFlowPermission, hasAnyFlowPermissionChanges } from '../FlowPermissionView.util';

interface IFlowPermissionEditViewProps {
  children?: React.ReactNode;
  p: any;
  flowName: string;
}

const FlowPermissionEditView: React.FC<IFlowPermissionEditViewProps> = (props) => {
  const { flowName, p } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let permission = React.useMemo(() => {
    return getFlowPermission(flowName, p, trackChanges);
  }, [flowName, p, trackChanges]);
  let anyChanges = React.useMemo(() => {
    return hasAnyFlowPermissionChanges(p, permission);
  }, [p, permission]);
  const onChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.enabled = e.target.checked;
    let changes = updateChanges(p, 'flowAccesses', tempPermission, 'flow', trackChanges);
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

export default FlowPermissionEditView;
