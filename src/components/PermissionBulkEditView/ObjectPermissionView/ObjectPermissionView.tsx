import { Button, Card, Input, Select, Space, Tabs } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { loadingAtom } from '../../../atoms/atom';
import ObjectPermissionTableView from './ObjectPermissionTableView';
import { handleGetObject, handleGetObjectDetails } from './ObjectPermissionView.util';

interface IObjectPermissionViewProps {
  children?: React.ReactNode;
  profiles: any[];
  permissionSets: any[];
}

const ObjectPermissionView: React.FC<IObjectPermissionViewProps> = (props) => {
  const { profiles, permissionSets } = props;
  const [, setLoading] = useRecoilState(loadingAtom);
  const [objectList, setObjectList] = React.useState([]);
  const [selectedObjects, setSelectedObjects] = React.useState([]);
  const [selectecObjectDetails, setSelectecObjectDetails] = React.useState<any[]>([]);
  const [searchString, setSearchString] = React.useState('');

  React.useEffect(() => {
    const onload = async () => {
      let response = await handleGetObject();
      setObjectList(response);
    };
    onload();
  }, []);

  const getObjects = async () => {
    setLoading(true);
    let response = await handleGetObjectDetails(selectedObjects);
    setSelectecObjectDetails(response);
    setLoading(false);
  };
  return (
    <>
      <Card
        size="small"
        bordered={false}
        title={
          <Space>
            <Select
              mode="multiple"
              variant="borderless"
              size="small"
              allowClear
              options={objectList}
              style={{ width: '30dvw' }}
              onChange={(v) => {
                setSelectedObjects(v);
              }}
              placeholder="Please select a Objects"
            />
            <Button size="small" onClick={getObjects}>
              Get Object
            </Button>
          </Space>
        }
      >
        <Tabs
          size="small"
          items={selectecObjectDetails.map((object) => {
            return {
              key: object.name,
              label: object.label,
              children: (
                <>
                  <ObjectPermissionTableView
                    profiles={profiles}
                    permissionSets={permissionSets}
                    object={object}
                    searchString={searchString}
                  />
                </>
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
              variant="borderless"
              addonAfter={<AiOutlineSearch />}
            />
          }
        />
      </Card>
    </>
  );
};

export default ObjectPermissionView;
