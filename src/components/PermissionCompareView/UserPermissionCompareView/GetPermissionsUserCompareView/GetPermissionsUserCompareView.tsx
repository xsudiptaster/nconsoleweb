import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { userPermissionsCompareAtom } from "../../../../atoms/atom";
import { setChangeUserPermissions } from "../UserPermissionCompareView.util";

interface IGetPermissionsUserCompareViewProps {
  children?: React.ReactNode;
  prof: any;
  perm: any;
}

const GetPermissionsUserCompareView: React.FC<IGetPermissionsUserCompareViewProps> = React.memo((props) => {
  const { prof, perm } = props;
  const [userPermissions, setUserPermissions] = useRecoilState(userPermissionsCompareAtom);
  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    const onload = () => {
      if (userPermissions[prof] && userPermissions[prof][perm]?.enabled && userPermissions[prof][perm]?.enabled === "true") {
        setValue(true);
      }
    };
    onload();
  }, [perm, prof, userPermissions]);
  const handleChange = (event: any) => {
    setValue(event.target.checked);
    let response = setChangeUserPermissions(userPermissions, prof, perm, event.target.checked);
    setUserPermissions(response);
  };
  return (
    <>
      <Checkbox defaultChecked={value} onChange={handleChange} />
    </>
  );
});

export default GetPermissionsUserCompareView;
