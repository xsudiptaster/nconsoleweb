import { Button, Card, Input, Select, Space, Tabs } from "antd";
import React from "react";
import { AiFillSave } from "react-icons/ai";
import { FcDownload } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { loadingAtom, trackChangesPermissionEditAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import DeployChangesView from "./DeployChangesView";
import DisplayObjectPermissionView from "./DisplayObjectPermissionView";
import { handleLoad, retrievePermissions } from "./PermissionEditView.util";

interface IPermissionEditViewProps {
   children?: React.ReactNode;
}

const PermissionEditView: React.FC<IPermissionEditViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [, setTrackChanges] = useRecoilState(trackChangesPermissionEditAtom);
   const [profileOptions, setProfileOptions] = React.useState<any[]>([]);
   const [objectOptions, setObjectOptions] = React.useState<any[]>([]);
   const [selectedProfiles, setSelectedProfiles] = React.useState([]);
   const [selectedObjects, setSelectedObjects] = React.useState([]);
   const [fetchedObjects, setSelectedFetchedObjects] = React.useState<any[]>([]);
   const [fetchedProfiles, setFetchedProfiles] = React.useState<any[]>([]);
   const [searchString, setSearchString] = React.useState("");
   const [deploy, setDeploy] = React.useState(false);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setProfileOptions(response.profilesOptions);
         setObjectOptions(response.objectOptions);
      };
      onload();
   }, []);
   const onRetrievePermissions = async () => {
      setLoading(true);
      setTrackChanges([]);
      setFetchedProfiles([]);
      setSelectedFetchedObjects([]);
      let response = await retrievePermissions(selectedProfiles, selectedObjects);
      setSelectedFetchedObjects(response.responseObjects);
      setFetchedProfiles(response.responseProfiles);
      setLoading(false);
   };
   return (
      <>
         <Card
            size="small"
            title={
               <Space>
                  <Select
                     size="small"
                     mode="multiple"
                     showSearch
                     onChange={(values, valuesOptions) => {
                        setSelectedProfiles(valuesOptions);
                     }}
                     bordered={false}
                     style={{ minWidth: 300 }}
                     options={profileOptions}
                     placeholder="Select Profiles or Permission Sets..."
                  />
                  <Select
                     size="small"
                     mode="multiple"
                     showSearch
                     onChange={(values, valuesOptions) => {
                        setSelectedObjects(valuesOptions);
                     }}
                     bordered={false}
                     style={{ minWidth: 300 }}
                     options={objectOptions}
                     placeholder="Select Objects.."
                  />
                  <Button size="small" icon={<FcDownload />} onClick={onRetrievePermissions}>
                     Get Permissions
                  </Button>
               </Space>
            }
            extra={
               <Button
                  size="small"
                  icon={<AiFillSave />}
                  onClick={() => {
                     setDeploy(true);
                  }}
               >
                  Save/Deploy
               </Button>
            }
         >
            <RenderIf renderIf={fetchedObjects.length > 0 && fetchedProfiles.length > 0}>
               <Tabs
                  size="small"
                  items={fetchedObjects.map((object) => {
                     return {
                        key: object.name,
                        label: object.label,
                        children: (
                           <DisplayObjectPermissionView
                              object={object}
                              fetchedProfiles={fetchedProfiles}
                              searchString={searchString}
                           />
                        ),
                     };
                  })}
                  tabBarExtraContent={
                     <Input
                        placeholder="Search Field"
                        size="small"
                        onChange={(event) => {
                           setSearchString(event?.target.value);
                        }}
                     />
                  }
               />
            </RenderIf>
            <DeployChangesView deploy={deploy} setDeploy={setDeploy} fetchedProfiles={fetchedProfiles} />
         </Card>
      </>
   );
};

export default PermissionEditView;
