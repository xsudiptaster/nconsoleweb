import { Card, Input, Radio, Select, Space } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../atoms/atom';
import { updateChanges } from '../PermissionBulkEditView.util';
import TabPermissionEditView from './TabPermissionEditView';
import style from './TabPermissionsView.module.css';
import { getAllTabsList } from './TabPermissionsView.util';
interface ITabPermissionsViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
}

const TabPermissionsView: React.FC<ITabPermissionsViewProps> = (props) => {
  const { profiles, permissionSets } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [tablist, setTablist] = React.useState([]);
  const [searchString, setSearchString] = React.useState('');
  React.useEffect(() => {
    const onload = async () => {
      let response = await getAllTabsList();
      setTablist(response);
    };
    onload();
  }, []);
  let dvSearchString = React.useDeferredValue(searchString);
  let displayList = React.useMemo(() => {
    return tablist
      .filter((dl: any) => {
        return dvSearchString !== '' ? dl.Label.toUpperCase().includes(dvSearchString.toUpperCase()) : true;
      })
      .sort((a: any, b: any) => {
        return a.tab > b.tab ? 1 : -1;
      });
  }, [dvSearchString, tablist]);

  const onProfileChangeAll = ({ target: { value } }: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    tablist.forEach((tab: any) => {
      let tempPermission = { tab: tab.Name, visibility: value };
      changes = updateChanges(p, 'tabVisibilities', tempPermission, 'tab', changes);
    });
    setTrackChanges(changes);
  };
  const onTabChangeAll = (value: any, tab: any) => {
    console.log('🚀 ~ onTabChangeAll ~ value:', value);
    let changes = JSON.parse(JSON.stringify(trackChanges));
    let tempPermissionProfile = { tab: tab.Name, visibility: value };
    profiles.forEach((p: any) => {
      changes = updateChanges(p, 'tabVisibilities', tempPermissionProfile, 'tab', changes);
    });
    if (value !== 'Hidden') {
      let tempPermissionPermissionSet = {
        tab: tab.Name,
        visibility: value.toString() === 'DefaultOff' ? 'Available' : 'Visible',
      };
      permissionSets.forEach((p: any) => {
        changes = updateChanges(p, 'tabVisibilities', tempPermissionPermissionSet, 'tab', changes);
      });
    }
    setTrackChanges(changes);
  };
  return (
    <>
      <Card
        size="small"
        title={
          <Input
            size="small"
            placeholder="Search Tab"
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
                <th>Tab /Profiles or Permission Sets</th>
                {profiles.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <Radio.Group
                          options={[
                            { label: 'Default Off', value: 'DefaultOff' },
                            { label: 'Default On', value: 'DefaultOn' },
                            { label: 'Hidden', value: 'Hidden' },
                          ]}
                          size="small"
                          onChange={(e: any) => onProfileChangeAll(e, p)}
                        />
                      </Space>
                    </th>
                  );
                })}
                {permissionSets.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <Radio.Group
                          options={[
                            { label: 'Available', value: 'Available' },
                            { label: 'Visible', value: 'Visible' },
                          ]}
                          size="small"
                          onChange={(e: any) => onProfileChangeAll(e, p)}
                        />
                      </Space>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {displayList.map((tab: any) => {
                return (
                  <tr key={tab.Name}>
                    <td>
                      {tab.Label}
                      <div style={{ float: 'right' }}>
                        <Select
                          popupMatchSelectWidth
                          size="small"
                          onChange={(value: any) => onTabChangeAll(value, tab)}
                          showSearch
                          placeholder="Select a permission"
                          optionFilterProp="children"
                          options={[
                            {
                              value: 'DefaultOff',
                              label: 'Default Off/Available',
                            },
                            {
                              value: 'DefaultOn',
                              label: 'Default On/Visible',
                            },
                            {
                              value: 'Hidden',
                              label: 'Hidden',
                            },
                          ]}
                        />
                      </div>
                    </td>
                    {profiles.map((p: any) => {
                      return (
                        <td key={p.fullName}>
                          <TabPermissionEditView p={p} tab={tab} />
                        </td>
                      );
                    })}
                    {permissionSets.map((p: any) => {
                      return (
                        <td key={p.fullName}>
                          <TabPermissionEditView p={p} tab={tab} />
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

export default TabPermissionsView;
