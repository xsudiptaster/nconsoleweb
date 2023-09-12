import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { recordTypePermissionsCompareAtom } from "../../../../atoms/atom";
import { setChangeRecordTypePermissions } from "../RecordTypePermissionsCompareView.util";

interface IGetPermissionsRecordTypeCompareViewProps {
  children?: React.ReactNode;
  prof: any;
  obj: any;
  r: any;
  perm: any;
}

const GetPermissionsRecordTypeCompareView: React.FC<IGetPermissionsRecordTypeCompareViewProps> = (props) => {
  const { prof, obj, r, perm } = props;
  const [recordTypePermissions, setRecordTypePermissions] = useRecoilState(recordTypePermissionsCompareAtom);

  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    const onload = () => {
      if (
        recordTypePermissions &&
        recordTypePermissions[prof] &&
        recordTypePermissions[prof][obj] &&
        recordTypePermissions[prof][obj][r] &&
        recordTypePermissions[prof][obj][r][perm] &&
        recordTypePermissions[prof][obj][r][perm] === "true"
      ) {
        setValue(true);
      }
    };
    onload();
  }, [obj, perm, prof, r, recordTypePermissions]);
  const handleChange = (event: any) => {
    setValue(event.target.checked);
    let response = setChangeRecordTypePermissions(recordTypePermissions, prof, obj, r, perm, value);
    setRecordTypePermissions(response);
  };
  return (
    <>
      <Checkbox defaultChecked={value} onChange={handleChange} />
    </>
  );
};

export default GetPermissionsRecordTypeCompareView;
