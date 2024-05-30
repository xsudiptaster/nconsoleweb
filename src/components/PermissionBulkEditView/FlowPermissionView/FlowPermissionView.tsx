import { Card, Input, Space } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { trackChangesPermissionEditAtom } from '../../../atoms/atom';
import CustomCheckBox from '../../../utils/CustomCheckBox';
import { updateChanges } from '../PermissionBulkEditView.util';
import FlowPermissionEditView from './FlowPermissionEditView';
import style from './FlowPermissionView.module.css';
import { getFlowNames } from './FlowPermissionView.util';
interface IFlowPermissionViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
}

const FlowPermissionView: React.FC<IFlowPermissionViewProps> = (props) => {
  const { profiles, permissionSets } = props;
  const [trackChanges, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
  const [flowList, setFlowList] = React.useState([]);
  React.useEffect(() => {
    const onload = async () => {
      let response = await getFlowNames();
      setFlowList(response);
    };
    onload();
  }, []);
  const onChangeFlowAll = (e: any, flowName: string) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    profiles.forEach((p: any) => {
      let tempPermission = { flow: flowName, enabled: e.target.checked };
      changes = updateChanges(p, 'flowAccesses', tempPermission, 'flow', changes);
    });
    permissionSets.forEach((p: any) => {
      let tempPermission = { flow: flowName, enabled: e.target.checked };
      changes = updateChanges(p, 'flowAccesses', tempPermission, 'flow', changes);
    });
    setTrackChanges(changes);
  };
  const onChangeProfileAll = (e: any, p: any) => {
    let changes = JSON.parse(JSON.stringify(trackChanges));
    flowList.forEach((flow: any) => {
      let tempPermission = { flow: flow.DeveloperName, enabled: e.target.checked };
      changes = updateChanges(p, 'flowAccesses', tempPermission, 'flow', changes);
    });
    setTrackChanges(changes);
  };
  return (
    <>
      <Card
        size="small"
        title={<Input size="small" placeholder="Search Flow" variant="borderless" addonAfter={<AiOutlineSearch />} />}
      >
        <div className={style.contextTable}>
          <table className={style.permissionedittable}>
            <thead>
              <tr>
                <th>Flow Name/Profile or Permission Set</th>
                {profiles.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox onChange={(e: any) => onChangeProfileAll(e, p)} />
                      </Space>
                    </th>
                  );
                })}
                {permissionSets.map((p: any) => {
                  return (
                    <th key={p.fullName}>
                      <Space size="small" direction="vertical">
                        {p.fullName}
                        <CustomCheckBox onChange={(e: any) => onChangeProfileAll(e, p)} />
                      </Space>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {flowList.map((flow: any) => {
                return (
                  <tr key={flow.Id}>
                    <td>
                      {flow.DeveloperName}
                      <div style={{ float: 'right' }}>
                        <CustomCheckBox onChange={(e: any) => onChangeFlowAll(e, flow.DeveloperName)} />
                      </div>
                    </td>
                    {profiles.map((p: any) => {
                      return (
                        <td key={p.fullName}>
                          <FlowPermissionEditView p={p} flowName={flow.DeveloperName} />
                        </td>
                      );
                    })}
                    {permissionSets.map((p: any) => {
                      return (
                        <td key={p.fullName}>
                          <FlowPermissionEditView p={p} flowName={flow.DeveloperName} />
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

export default FlowPermissionView;
