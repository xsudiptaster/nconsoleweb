import { Card, Divider, Space } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import RenderIf from '../../../../utils/RenderIf';
import { updateChanges } from '../../PermissionBulkEditView.util';
import { getCurrentObjectPermission, hasObjectChanges } from './ObjectPermissionPopOverView.util';
import ObjectRecordTypePermissionView from './ObjectRecordTypePermissionView';

interface IObjectPermissionPopOverViewProps {
  children?: React.ReactNode;
  object: any;
  p: any;
}

const ObjectPermissionPopOverView: React.FC<IObjectPermissionPopOverViewProps> = (props) => {
  const { p, object } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const permission: any = React.useMemo(() => {
    return getCurrentObjectPermission(p, object.name, trackChanges);
  }, [object.name, p, trackChanges]);
  const anyChanges: any = React.useMemo(() => {
    return hasObjectChanges(p, permission);
  }, [p, permission]);
  const onReadChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.allowRead = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  const onCreateChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.allowCreate = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  const onEditChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.allowEdit = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  const onDeleteChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.allowDelete = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  const onViewAllChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.viewAllRecords = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  const onModifyAllChange = (e: any) => {
    let tempPermission = { ...permission };
    tempPermission.modifyAllRecords = e.target.checked;
    let changes = updateChanges(p, 'objectPermissions', tempPermission, 'object', trackChanges);
    setTrackChanges(changes);
  };
  return (
    <>
      <Card title="Object Permissions" size="small">
        <Space size="small">
          <CustomCheckBox
            checked={permission.allowRead}
            onChange={onReadChange}
            style={{ backgroundColor: anyChanges.allowRead ? 'red' : '' }}
          >
            Read
          </CustomCheckBox>
          <CustomCheckBox
            checked={permission.allowCreate}
            onChange={onCreateChange}
            style={{ backgroundColor: anyChanges.allowCreate ? 'red' : '' }}
          >
            Create
          </CustomCheckBox>
          <CustomCheckBox
            checked={permission.allowEdit}
            onChange={onEditChange}
            style={{ backgroundColor: anyChanges.allowEdit ? 'red' : '' }}
          >
            Edit
          </CustomCheckBox>
          <CustomCheckBox
            checked={permission.allowDelete}
            onChange={onDeleteChange}
            style={{ backgroundColor: anyChanges.allowDelete ? 'red' : '' }}
          >
            Delete
          </CustomCheckBox>
          <CustomCheckBox
            checked={permission.viewAllRecords}
            onChange={onViewAllChange}
            style={{ backgroundColor: anyChanges.viewAllRecords ? 'red' : '' }}
          >
            View All
          </CustomCheckBox>
          <CustomCheckBox
            checked={permission.modifyAllRecords}
            onChange={onModifyAllChange}
            style={{ backgroundColor: anyChanges.modifyAllRecords ? 'red' : '' }}
          >
            Modify All
          </CustomCheckBox>
        </Space>

        <RenderIf renderIf={object.recordTypeInfos}>
          <Divider>Record Types</Divider>
          <Space size="small">
            {object.recordTypeInfos.map((recordType: any) => {
              return (
                <ObjectRecordTypePermissionView
                  recordType={recordType}
                  object={object}
                  p={p}
                  key={recordType.developerName}
                />
              );
            })}
          </Space>
        </RenderIf>
      </Card>
    </>
  );
};

export default ObjectPermissionPopOverView;
