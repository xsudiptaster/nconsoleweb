import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { fieldPermissionsCompareAtom } from "../../../../atoms/atom";
import { setChangeFieldPermissions } from "../FieldPermissionCompareView.util";

interface IGetPermissionsFieldCompareViewProps {
  children?: React.ReactNode;
  perm: any;
  prof: any;
  obj: any;
  field: any;
}

const GetPermissionsFieldCompareView: React.FC<IGetPermissionsFieldCompareViewProps> = React.memo((props) => {
  const { perm, prof, obj, field } = props;
  const [fieldPermissions, setFieldPermissions] = useRecoilState(fieldPermissionsCompareAtom);
  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    const onload = () => {
      if (
        fieldPermissions[prof] &&
        fieldPermissions[prof][obj] &&
        fieldPermissions[prof][obj][field] &&
        fieldPermissions[prof][obj][field][perm] &&
        fieldPermissions[prof][obj][field][perm] === "true"
      ) {
        setValue(true);
      }
    };
    onload();
  }, [field, fieldPermissions, obj, perm, prof]);
  const handleChange = (event: any) => {
    setValue(event.target.value);
    let response = setChangeFieldPermissions(fieldPermissions, prof, obj, field, perm, value);
    setFieldPermissions(response);
  };
  return (
    <>
      <Checkbox defaultChecked={value} onChange={handleChange} />
    </>
  );
});

export default GetPermissionsFieldCompareView;
