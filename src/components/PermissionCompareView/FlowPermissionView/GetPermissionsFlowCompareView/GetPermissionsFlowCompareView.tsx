import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { flowPermissionCompareAtom } from "../../../../atoms/atom";
import { setChangeFlowPermissions } from "../FlowPermisssionView.util";

interface IGetPermissionsFlowCompareViewProps {
  children?: React.ReactNode;
  prof: any;
  perm: any;
}

const GetPermissionsFlowCompareView: React.FC<IGetPermissionsFlowCompareViewProps> = React.memo((props) => {
  const { prof, perm } = props;
  const [flowPermissions, setFlowPermissions] = useRecoilState(flowPermissionCompareAtom);
  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    const onload = () => {
      if (flowPermissions[prof] && flowPermissions[prof][perm]?.enabled && flowPermissions[prof][perm]?.enabled === "true") {
        setValue(true);
      }
    };
    onload();
  }, [flowPermissions, perm, prof]);
  const handleChange = (event: any) => {
    setValue(event.target.checked);
    let response = setChangeFlowPermissions(flowPermissions, prof, perm, event.target.checked);
    setFlowPermissions(response);
  };
  return (
    <>
      <Checkbox defaultChecked={value} onChange={handleChange} />
    </>
  );
});

export default GetPermissionsFlowCompareView;
