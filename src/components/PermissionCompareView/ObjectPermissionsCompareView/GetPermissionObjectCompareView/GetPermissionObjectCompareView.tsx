import { Checkbox } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { objectPermissionsCompareAtom } from "../../../../atoms/atom";
import { setChangeObjectPermissions } from "../ObjectPermissionsCompareView.util";

interface IGetPermissionObjectCompareViewProps {
   children?: React.ReactNode;
   p: any;
   k: any;
   option: any;
}

const GetPermissionObjectCompareView: React.FC<IGetPermissionObjectCompareViewProps> = React.memo((props) => {
   const { p, k, option } = props;
   const [objectPermissions, setObjectPermissions] = useRecoilState(objectPermissionsCompareAtom);
   const [value, setValue] = React.useState(false);
   React.useMemo(() => {
      const onload = () => {
         if (objectPermissions[option][k] && objectPermissions[option][k][p] && objectPermissions[option][k][p] === "true") {
            setValue(true);
         } else {
            setValue(false);
         }
      };
      onload();
   }, [k, objectPermissions, option, p]);
   const handleChange = (event: any) => {
      setValue(event.target.checked);
      let response = setChangeObjectPermissions(objectPermissions, option, k, p, event.target.checked);
      setObjectPermissions(response);
   };

   return (
      <>
         <Checkbox checked={value} onChange={handleChange} />
      </>
   );
});

export default GetPermissionObjectCompareView;
