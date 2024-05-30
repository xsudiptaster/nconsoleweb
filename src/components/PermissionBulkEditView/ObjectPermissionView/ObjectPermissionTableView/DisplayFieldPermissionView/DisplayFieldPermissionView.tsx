import { Space } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../../atoms/atom';
import CustomCheckBox from '../../../../../utils/CustomCheckBox';
import { updateChanges } from '../../../PermissionBulkEditView.util';
import { getCurrentFieldPermission, hasFieldChanges } from './DisplayFieldPermissionView.util';

interface IDisplayFieldPermissionViewProps {
  children?: React.ReactNode;
  field: any;
  p: any;
  objectName: any;
}

const DisplayFieldPermissionView: React.FC<IDisplayFieldPermissionViewProps> = (props) => {
  const { field, p, objectName } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const permission = React.useMemo(() => {
    return getCurrentFieldPermission(field, objectName, p, trackChanges);
  }, [field, objectName, p, trackChanges]);
  const anyChanges = React.useMemo(() => {
    return hasFieldChanges(p, permission);
  }, [p, permission]);
  const onReadChange = async (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.readable = e.target.checked;
    if (e.target.checked === false) {
      tempPermission.editable = false;
    }
    let response = updateChanges(p, 'fieldPermissions', tempPermission, 'field', trackChanges);
    setTrackChanges(response);
  };
  const onEditChange = async (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.editable = e.target.checked;
    if (e.target.checked === true) {
      tempPermission.readable = true;
    }
    let response = updateChanges(p, 'fieldPermissions', tempPermission, 'field', trackChanges);
    setTrackChanges(response);
  };
  return (
    <>
      <Space size="small">
        <CustomCheckBox
          style={{ backgroundColor: anyChanges.readable ? 'red' : '' }}
          onChange={(event: any) => {
            onReadChange(event);
          }}
          checked={permission.readable}
        >
          Read
        </CustomCheckBox>
        <CustomCheckBox
          style={{ backgroundColor: anyChanges.editable ? 'red' : '' }}
          disabled={field.calculated}
          onChange={(event: any) => {
            onEditChange(event);
          }}
          checked={permission.editable}
        >
          Edit
        </CustomCheckBox>
      </Space>
    </>
  );
};

export default DisplayFieldPermissionView;
