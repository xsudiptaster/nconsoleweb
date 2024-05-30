import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';

import { Button, Popover, Space } from 'antd';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../../atoms/atom';
import CustomCheckBox from '../../../../utils/CustomCheckBox';
import { updateChanges } from '../../PermissionBulkEditView.util';
import ObjectPermissionPopOverView from '../ObjectPermissionPopOverView';
import DisplayFieldPermissionView from './DisplayFieldPermissionView';
import { getCurrentFieldPermission } from './DisplayFieldPermissionView/DisplayFieldPermissionView.util';
import style from './ObjectPermissionTableView.module.css';
interface IObjectPermissionTableViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
  object: any;
  searchString: string;
}

const ObjectPermissionTableView: React.FC<IObjectPermissionTableViewProps> = (props) => {
  const { profiles, permissionSets, object, searchString } = props;
  const [trackCanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  let dvSearchString = React.useDeferredValue(searchString);
  let displayList = React.useMemo(() => {
    return object.fields
      .sort((a: any, b: any) => {
        return a.label > b.label ? 1 : -1;
      })
      .filter((field: any) => {
        return field.compoundFieldName === null && field.permissionable;
      })
      .filter((field: any) => {
        return dvSearchString === ''
          ? true
          : field.label.toUpperCase().includes(dvSearchString.toUpperCase()) ||
              field.name.toUpperCase().includes(dvSearchString.toUpperCase());
      });
  }, [dvSearchString, object.fields]);
  const onReadAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackCanges));
    let fields = object.fields.filter((field: any) => {
      return field.compoundFieldName === null && field.permissionable;
    });
    fields.forEach((field: any) => {
      let tempPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      tempPermission.readable = e.target.checked;
      if (e.target.checked === false) {
        tempPermission.editable = false;
      }
      changes = updateChanges(p, 'fieldPermissions', tempPermission, 'field', changes);
    });
    console.log('🚀 ~ fields.forEach ~ changes:', changes);
    setTrackChanges(changes);
  };
  const onEditAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackCanges));
    let fields = object.fields.filter((field: any) => {
      return field.compoundFieldName === null && field.permissionable && field.calculated === false;
    });
    fields.forEach((field: any) => {
      let tempPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      tempPermission.editable = e.target.checked;
      if (e.target.checked === true) {
        tempPermission.readable = true;
      }
      changes = updateChanges(p, 'fieldPermissions', tempPermission, 'field', changes);
    });
    console.log('🚀 ~ fields.forEach ~ changes:', changes);
    setTrackChanges(changes);
  };
  const onFieldReadAll = (e: any, field: any) => {
    let changes = JSON.parse(JSON.stringify(trackCanges));
    profiles.forEach((p: any) => {
      let currentPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      currentPermission.readable = e.target.checked;
      changes = updateChanges(p, 'fieldPermissions', currentPermission, 'field', changes);
    });
    permissionSets.forEach((p: any) => {
      let currentPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      currentPermission.readable = e.target.checked;
      changes = updateChanges(p, 'fieldPermissions', currentPermission, 'field', changes);
    });
    setTrackChanges(changes);
  };
  const onFieldEditAll = (e: any, field: any) => {
    let changes = JSON.parse(JSON.stringify(trackCanges));
    profiles.forEach((p: any) => {
      let currentPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      currentPermission.editable = e.target.checked;
      if (e.target.checked === true) {
        currentPermission.readable = true;
      }
      changes = updateChanges(p, 'fieldPermissions', currentPermission, 'field', changes);
    });
    permissionSets.forEach((p: any) => {
      let currentPermission = { ...getCurrentFieldPermission(field, object.name, p, changes) };
      currentPermission.editable = e.target.checked;
      if (e.target.checked === true) {
        currentPermission.readable = true;
      }
      changes = updateChanges(p, 'fieldPermissions', currentPermission, 'field', changes);
    });
    setTrackChanges(changes);
  };
  return (
    <>
      <div className={style.contextTable}>
        <table className={style.permissionedittable}>
          <thead>
            <tr>
              <th>Object/Profiles & Permission Sets</th>
              {profiles.map((p: any) => {
                return (
                  <th key={p.fileName}>
                    <Space size="small" direction="vertical">
                      <Space size="small">
                        {p.fullName}
                        <Popover
                          placement="topRight"
                          title={'Object Config'}
                          content={<ObjectPermissionPopOverView object={object} p={p} />}
                          trigger="click"
                        >
                          <Button size="small" type="link" shape="circle" icon={<AiOutlineSetting />} />
                        </Popover>
                      </Space>
                      <Space size="small">
                        <CustomCheckBox onChange={(e: any) => onReadAll(e, p)}>Read All</CustomCheckBox>
                        <CustomCheckBox onChange={(e: any) => onEditAll(e, p)}>Edit All</CustomCheckBox>
                      </Space>
                    </Space>
                  </th>
                );
              })}
              {permissionSets.map((p: any) => {
                return (
                  <th key={p.fileName}>
                    <Space size="small" direction="vertical">
                      <Space size="small">
                        {p.fullName}
                        <Popover
                          placement="topRight"
                          title={'Object Config'}
                          content={<ObjectPermissionPopOverView object={object} p={p} />}
                          trigger="click"
                        >
                          <Button size="small" type="link" shape="circle" icon={<AiOutlineSetting />} />
                        </Popover>
                      </Space>
                      <Space size="small">
                        <CustomCheckBox onChange={(e: any) => onReadAll(e, p)}>Read All</CustomCheckBox>
                        <CustomCheckBox onChange={(e: any) => onEditAll(e, p)}>Edit All</CustomCheckBox>
                      </Space>
                    </Space>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayList.map((field: any) => {
              return (
                <tr key={field.name}>
                  <td>
                    {field.label}
                    <div style={{ float: 'right', right: '0px' }}>
                      <sub>{field.name} </sub>
                      <Space size="small" direction="vertical" align="start">
                        <CustomCheckBox onChange={(e: any) => onFieldReadAll(e, field)}>Read All</CustomCheckBox>
                        <CustomCheckBox onChange={(e: any) => onFieldEditAll(e, field)}>Edit All</CustomCheckBox>
                      </Space>
                    </div>
                  </td>
                  {profiles.map((p: any) => {
                    return (
                      <td key={p.fileName}>
                        <DisplayFieldPermissionView objectName={object.name} p={p} field={field} />
                      </td>
                    );
                  })}
                  {permissionSets.map((p: any) => {
                    return (
                      <td key={p.fileName}>
                        <DisplayFieldPermissionView objectName={object.name} p={p} field={field} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ObjectPermissionTableView;
