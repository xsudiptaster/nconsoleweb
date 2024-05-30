import { Card, Input, Space } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../atoms/atom';
import CustomCheckBox from '../../../utils/CustomCheckBox';
import { updateChanges } from '../PermissionBulkEditView.util';
import style from './ApexPageEditView.module.css';
import { handleGetApexPage } from './ApexPageEditView.util';
import ApexPagePermissionEditView from './ApexPagePermissionEditView';
interface IApexPageEditViewProps {
  children?: React.ReactNode;
  profiles: any;
  permissionSets: any;
}

const ApexPageEditView: React.FC<IApexPageEditViewProps> = (props) => {
  const { profiles, permissionSets } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [apexPages, setApesPages] = React.useState([]);
  const [searchString, setSearchString] = React.useState('');
  React.useEffect(() => {
    const onload = async () => {
      let response = await handleGetApexPage();
      setApesPages(response);
    };
    onload();
  }, []);
  const onProfileChangeAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    apexPages.forEach((page: any) => {
      let tempPermission = { apexPage: page.Name, enabled: e.target.checked };
      changes = updateChanges(p, 'pageAccesses', tempPermission, 'apexPage', changes);
    });
    setTrackChanges(changes);
  };
  const onApexPageChangeAll = (e: any, apexPageName: string) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    profiles.forEach((p: any) => {
      let tempPermission = { apexPage: apexPageName, enabled: e.target.checked };
      changes = updateChanges(p, 'pageAccesses', tempPermission, 'apexPage', changes);
    });
    permissionSets.forEach((p: any) => {
      let tempPermission = { apexPage: apexPageName, enabled: e.target.checked };
      changes = updateChanges(p, 'pageAccesses', tempPermission, 'apexPage', changes);
    });
    setTrackChanges(changes);
  };
  return (
    <>
      <Card
        size="small"
        title={
          <Input
            size="small"
            placeholder="Search Page"
            variant="borderless"
            addonAfter={<AiOutlineSearch />}
            onChange={(e) => setSearchString(e.target.value)}
          />
        }
      >
        <div className={style.contextTable}>
          <table className={style.permissionedittable}>
            <thead>
              <tr>
                <th>Apex Page/Profiles Or Permission Sets</th>
                {profiles.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox onChange={(e: any) => onProfileChangeAll(e, p)} />
                      </Space>
                    </th>
                  );
                })}
                {permissionSets.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox onChange={(e: any) => onProfileChangeAll(e, p)} />
                      </Space>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {apexPages
                .filter((apexPage: any) => {
                  return searchString !== '' ? apexPage.Name.toUpperCase().includes(searchString.toUpperCase()) : true;
                })
                .map((apexPage: any) => {
                  return (
                    <tr key={apexPage.Id}>
                      <td>
                        {apexPage.Name}
                        <div style={{ float: 'right' }}>
                          <CustomCheckBox onChange={(e: any) => onApexPageChangeAll(e, apexPage.Name)} />
                        </div>
                      </td>
                      {profiles.map((p: any) => {
                        return (
                          <td key={p.fullName}>
                            <ApexPagePermissionEditView p={p} apexPageName={apexPage.Name} />
                          </td>
                        );
                      })}
                      {permissionSets.map((p: any) => {
                        return (
                          <td key={p.fullName}>
                            <ApexPagePermissionEditView p={p} apexPageName={apexPage.Name} />
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
    </>
  );
};

export default ApexPageEditView;
