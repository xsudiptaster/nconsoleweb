import { Card, Input, Space } from 'antd';
import React, { Suspense } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../atoms/atom';
import CustomCheckBox from '../../../utils/CustomCheckBox';
import LoadingScreenView from '../../../utils/LoadingScreenView';
import { updateChanges } from '../PermissionBulkEditView.util';
import ApexClassEditView from './ApexClassEditView';
import style from './ApexPermissionsEditView.module.css';
import { getAllApexClasses } from './ApexPermisssionsEditView.util';

interface IApexPermissionsEditViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
}

const ApexPermissionsEditView: React.FC<IApexPermissionsEditViewProps> = (props) => {
  const { profiles, permissionSets } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [apexClasses, setApexClasses] = React.useState([]);
  const [searchString, setSearchString] = React.useState('');
  React.useEffect(() => {
    const onload = async () => {
      let response = await getAllApexClasses();
      setApexClasses(response);
    };
    onload();
  }, []);
  const dvSearchString = React.useDeferredValue(searchString);
  const onChangeAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    apexClasses.forEach((apexClass: any) => {
      let tempPermission = { apexClass: apexClass.Name, enabled: e.target.checked };
      changes = updateChanges(p, 'classAccesses', tempPermission, 'apexClass', changes);
    });
    setTrackChanges(changes);
  };
  const onChangeForApexClass = (e: any, apexClassName: string) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    profiles.forEach((p: any) => {
      let tempPermission = { apexClass: apexClassName, enabled: e.target.checked };
      changes = updateChanges(p, 'classAccesses', tempPermission, 'apexClass', changes);
    });
    permissionSets.forEach((p: any) => {
      let tempPermission = { apexClass: apexClassName, enabled: e.target.checked };
      changes = updateChanges(p, 'classAccesses', tempPermission, 'apexClass', changes);
    });
    setTrackChanges(changes);
  };
  return (
    <>
      <Suspense fallback={<LoadingScreenView />}>
        <Card
          size="small"
          title={
            <Input
              size="small"
              placeholder="Search Class"
              onChange={(e) => setSearchString(e.target.value)}
              variant="borderless"
              addonAfter={<AiOutlineSearch />}
            />
          }
        >
          <div className={style.contextTable}>
            <table className={style.permissionedittable}>
              <thead>
                <tr>
                  <th>Apex Class/Profile or Permission Set</th>
                  {profiles.map((p: any) => {
                    return (
                      <th key={p.fullName}>
                        <Space size="small" direction="vertical">
                          {p.fullName}
                          <CustomCheckBox onChange={(e: any) => onChangeAll(e, p)} />
                        </Space>
                      </th>
                    );
                  })}
                  {permissionSets.map((p: any) => {
                    return (
                      <th key={p.fullName}>
                        <Space size="small" direction="vertical">
                          {p.fullName}
                          <CustomCheckBox onChange={(e: any) => onChangeAll(e, p)} />
                        </Space>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {apexClasses
                  .filter((apexClass: any) => {
                    return dvSearchString !== ''
                      ? apexClass.Name.toUpperCase().includes(dvSearchString.toUpperCase())
                      : true;
                  })
                  .map((apexClass: any) => {
                    return (
                      <tr key={apexClass.Name}>
                        <td>
                          {apexClass.Name}
                          <div style={{ float: 'right' }}>
                            <CustomCheckBox onChange={(e: any) => onChangeForApexClass(e, apexClass.Name)} />
                          </div>
                        </td>
                        {profiles.map((p: any) => {
                          return (
                            <td key={p.fullName}>
                              <ApexClassEditView p={p} ApexClassName={apexClass.Name} />
                            </td>
                          );
                        })}
                        {permissionSets.map((p: any) => {
                          return (
                            <td key={p.fullName}>
                              <ApexClassEditView p={p} ApexClassName={apexClass.Name} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>
      </Suspense>
    </>
  );
};

export default ApexPermissionsEditView;
