import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { apexClassPermissionsCompareAtom } from "../../../../atoms/atom";
import { setApexClassPermissions } from "../ApexClassPermissionView.util";

interface IGetPermissionApexClassCompareViewProps {
  children?: React.ReactNode;
  prof: any;
  k: any;
}

const GetPermissionApexClassCompareView: React.FC<IGetPermissionApexClassCompareViewProps> = React.memo((props) => {
  const { prof, k } = props;
  const [apexPermissions, setApexPermissions] = useRecoilState(apexClassPermissionsCompareAtom);
  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    const onload = () => {
      if (apexPermissions[prof] && apexPermissions[prof][k]?.enabled && apexPermissions[prof][k]?.enabled === "true") {
        setValue(true);
      }
    };
    onload();
  }, [apexPermissions, k, prof]);
  const handleChange = (event: any) => {
    setValue(event.target.checked);
    let response = setApexClassPermissions(apexPermissions, prof, k, event.target.checked);
    setApexPermissions(response);
  };
  return (
    <>
      <Checkbox defaultChecked={value} onChange={handleChange} />
    </>
  );
});

export default GetPermissionApexClassCompareView;
