import { Space } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../../atoms/atom';
import CustomCheckBox from '../../../../../utils/CustomCheckBox';
import { updateChanges } from '../../../PermissionBulkEditView.util';
import { getRecordTypePermission, hasRecordTypeChanges } from '../ObjectPermissionPopOverView.util';

interface IObjectRecordTypePermissionViewProps {
  children?: React.ReactNode;
  recordType: any;
  object: any;
  p: any;
}

const ObjectRecordTypePermissionView: React.FC<IObjectRecordTypePermissionViewProps> = (props) => {
  const { recordType, object, p } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const permission = React.useMemo(() => {
    return getRecordTypePermission(p, object, recordType, trackChanges);
  }, [object, p, recordType, trackChanges]);
  let anyChanges = React.useMemo(() => {
    return hasRecordTypeChanges(p, permission);
  }, [p, permission]);
  const onVisibleChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.visible = e.target.checked;
    let changes = updateChanges(p, 'recordTypeVisibilities', tempPermission, 'recordType', trackChanges);
    setTrackChanges(changes);
  };
  const onDefaultChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.default = e.target.checked;
    let changes = updateChanges(p, 'recordTypeVisibilities', tempPermission, 'recordType', trackChanges);
    setTrackChanges(changes);
  };
  return (
    <>
      <Space direction="vertical" size="small" key={recordType.developerName} style={{ textAlign: 'left' }}>
        {recordType.name}
        <CustomCheckBox
          checked={permission.visible}
          onChange={onVisibleChange}
          style={{ backgroundColor: anyChanges.visible ? 'red' : '' }}
        >
          Active
        </CustomCheckBox>
        <CustomCheckBox
          checked={permission.default}
          onChange={onDefaultChange}
          style={{ backgroundColor: anyChanges.default ? 'red' : '' }}
        >
          Default
        </CustomCheckBox>
      </Space>
    </>
  );
};

export default ObjectRecordTypePermissionView;
