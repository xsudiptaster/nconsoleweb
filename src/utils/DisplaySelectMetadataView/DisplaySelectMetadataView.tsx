import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Input, Row, Select, Space, Table } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loadingAtom } from '../../atoms/atom';
import { getMetaDataTypeList, handleLoad } from './DisplatSelectMetadataView.util';
import DisplaySelectedMetadataView from './DisplaySelectedMetadataView';

interface IDisplaySelectMetadataViewProps {
  children?: React.ReactNode;
  execute: any;
  preSelectedMetadatas: any[];
}

const DisplaySelectMetadataView: React.FC<IDisplaySelectMetadataViewProps> = (props) => {
  const { execute, preSelectedMetadatas } = props;
  const [, setLoading] = useRecoilState(loadingAtom);
  const [metaDataOptions, setMetaDataOptions] = React.useState<any[]>([]);
  const [metaDataList, setMetaDataList] = React.useState<any[]>([]);
  const [selectedMetaDatas, setSelectedMetaDatas] = React.useState<any[]>(preSelectedMetadatas);
  const [searhString, setSearchString] = React.useState('');
  const [removeInstalled, setRemoveInstalled] = React.useState(false);
  const columns: any[] = [
    {
      title: 'Action',
      key: 'action',
      width: '60px',
      render: (_: any, record: any) => (
        <Button
          type="link"
          shape="circle"
          icon={<PlusCircleOutlined />}
          onClick={(e: any) => {
            onAdd(record);
          }}
        />
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdByName',
      sorter: (a: any, b: any) => (a.createdByName > b.createdByName ? 1 : -1),
      onFilter: (value: string, record: any) => record.createdByName === value,
      filters: Array.from(
        new Set(
          metaDataList.map((metaData) => {
            return metaData.createdByName;
          })
        )
      ).map((opt) => {
        return { text: opt, value: opt };
      }),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      sorter: (a: any, b: any) => (new Date(a.createdDate) > new Date(b.createdDate) ? 1 : -1),
      filterSearch: true,
    },
    {
      title: 'Last Modified By',
      dataIndex: 'lastModifiedByName',
      sorter: (a: any, b: any) => (a.lastModifiedByName > b.lastModifiedByName ? 1 : -1),
      onFilter: (value: string, record: any) => record.lastModifiedByName === value,
      filters: Array.from(
        new Set(
          metaDataList.map((metaData) => {
            return metaData.lastModifiedByName;
          })
        )
      ).map((opt) => {
        return { text: opt, value: opt };
      }),
      filterSearch: true,
    },
    {
      title: 'Last Modified Date',
      dataIndex: 'lastModifiedDate',
      sorter: (a: any, b: any) =>
        new Date(a.lastModifiedDate).getTime() > new Date(b.lastModifiedDate).getTime() ? 1 : -1,
      filterSearch: true,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      sorter: (a: any, b: any) => (a.fullName > b.fullName ? 1 : -1),
      filterSearch: true,
    },
    {
      title: 'Managable',
      dataIndex: 'manageableState',
      sorter: (a: any, b: any) => (a.manageableState > b.manageableState ? 1 : -1),
      filterSearch: true,
    },
  ];
  React.useEffect(() => {
    const onload = async () => {
      setLoading(true);
      let response = await handleLoad();
      setMetaDataOptions(response);
      setLoading(false);
    };
    onload();
  }, [setLoading]);
  React.useEffect(() => {
    const onload = () => {
      if (preSelectedMetadatas.length > 0) {
        setSelectedMetaDatas(preSelectedMetadatas);
      }
    };
    onload();
  }, [preSelectedMetadatas]);
  const onMetaDataTypeChange = async (value: string) => {
    setMetaDataList([]);
    setLoading(true);
    let response = await getMetaDataTypeList(value);
    setMetaDataList(response);
    setLoading(false);
  };
  const handleExecute = async (selectedMetaDatas: any[]) => {
    let response = await execute(selectedMetaDatas);
    if (response) {
      setMetaDataOptions([]);
      setLoading(true);
      let response = await handleLoad();
      setSelectedMetaDatas([]);
      setMetaDataOptions(response);
      setLoading(false);
    }
  };
  const onAdd = (record: any) => {
    let tempSelected = [...selectedMetaDatas];
    tempSelected = [record, ...tempSelected];
    setSelectedMetaDatas(tempSelected);
  };
  const filterMetadata = () => {
    let tempMedataList = [...metaDataList];
    let selectedIds = new Set(
      selectedMetaDatas.map((metadata: any) => {
        return metadata.id;
      })
    );
    tempMedataList = tempMedataList.filter((metadata) => {
      return !selectedIds.has(metadata.id);
    });
    if (removeInstalled) {
      tempMedataList = tempMedataList.filter((metadata) => {
        return metadata.manageableState !== 'installedEditable';
      });
    }
    return searhString === ''
      ? tempMedataList
      : tempMedataList.filter((metadata) => {
          return (
            (metadata?.fileName && metadata.fileName.toUpperCase().includes(searhString.toUpperCase())) ||
            (metadata?.fullName && metadata.fullName.toUpperCase().includes(searhString.toUpperCase()))
          );
        });
  };
  return (
    <>
      <Card
        size="small"
        title={
          <Space>
            <Select
              size="small"
              style={{ width: 400 }}
              bordered={false}
              showSearch
              placeholder="Select a Metadata Type"
              options={metaDataOptions}
              onChange={onMetaDataTypeChange}
            />
            <Input
              size="small"
              bordered={false}
              style={{ minWidth: '300px' }}
              placeholder="Search Metadata Element...."
              onChange={(event) => {
                setSearchString(event?.target.value);
              }}
            />
            <Checkbox
              onChange={(e) => {
                setRemoveInstalled(e.target.checked);
              }}
              checked={removeInstalled}
            >
              Remove Installed Editable
            </Checkbox>
          </Space>
        }
        extra={
          <>
            <Button
              size="small"
              onClick={() => {
                handleExecute(selectedMetaDatas);
              }}
            >
              Execute
            </Button>
          </>
        }
      >
        <Row>
          <Col span={15}>
            <Table
              style={{ maxHeight: '80vh', height: '80vh' }}
              sticky
              tableLayout="fixed"
              scroll={{ y: '75vh' }}
              pagination={{ pageSize: 20 }}
              showHeader
              size="small"
              columns={columns}
              dataSource={filterMetadata()}
              rowKey="id"
            />
          </Col>
          <Col span={9}>
            <DisplaySelectedMetadataView
              selectedMetaDatas={selectedMetaDatas}
              setSelectedMetaDatas={setSelectedMetaDatas}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DisplaySelectMetadataView;
