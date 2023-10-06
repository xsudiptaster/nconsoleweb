import { Button, Card, Col, Input, Row, Select, Space, Table } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import { getMetaDataTypeList, handleLoad } from "./DisplatSelectMetadataView.util";
import DisplaySelectedMetadataView from "./DisplaySelectedMetadataView";

interface IDisplaySelectMetadataViewProps {
   children?: React.ReactNode;
   execute: any;
}

const DisplaySelectMetadataView: React.FC<IDisplaySelectMetadataViewProps> = (props) => {
   const { execute } = props;
   const [, setLoading] = useRecoilState(loadingAtom);
   const [metaDataOptions, setMetaDataOptions] = React.useState<any[]>([]);
   const [metaDataList, setMetaDataList] = React.useState<any[]>([]);
   const [selectedMetaDatas, setSelectedMetaDatas] = React.useState<any[]>([]);
   const [searhString, setSearchString] = React.useState("");
   const columns = [
      {
         title: "Created By",
         dataIndex: "createdByName",
         sorter: (a: any, b: any) => (a.createdByName > b.createdByName ? 1 : -1),
      },
      {
         title: "Created Date",
         dataIndex: "createdDate",
         sorter: (a: any, b: any) => (new Date(a.createdDate) > new Date(b.createdDate) ? 1 : -1),
         filterSearch: true,
      },
      {
         title: "Last Modified By",
         dataIndex: "lastModifiedByName",
         sorter: (a: any, b: any) => (a.lastModifiedByName > b.lastModifiedByName ? 1 : -1),
         filterSearch: true,
      },
      {
         title: "Last Modified Date",
         dataIndex: "lastModifiedDate",
         sorter: (a: any, b: any) => (new Date(a.lastModifiedDate) > new Date(b.lastModifiedDate) ? 1 : -1),
         filterSearch: true,
      },
      {
         title: "Full Name",
         dataIndex: "fullName",
         sorter: (a: any, b: any) => (a.fullName > b.fullName ? 1 : -1),
         filterSearch: true,
      },
      {
         title: "Managable",
         dataIndex: "manageableState",
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
   const onMetaDataTypeChange = async (value: string) => {
      setLoading(true);
      let response = await getMetaDataTypeList(value);
      setMetaDataList(response);
      setLoading(false);
   };
   const onSelection = (selections: any, selectionMetadatas: any) => {
      let tempSelected = selectedMetaDatas.filter((metadata) => {
         return metadata.type !== metaDataList[0].type;
      });
      tempSelected = [...tempSelected, ...selectionMetadatas];
      setSelectedMetaDatas(tempSelected);
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
                     placeholder="Search Metadata Element"
                     onChange={(event) => {
                        setSearchString(event?.target.value);
                     }}
                  />
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
                     style={{ maxHeight: "80vh", height: "80vh" }}
                     sticky
                     tableLayout="fixed"
                     scroll={{ y: "75vh" }}
                     showHeader
                     size="small"
                     columns={columns}
                     dataSource={
                        searhString === ""
                           ? metaDataList
                           : metaDataList.filter((metadata) => {
                                return metadata.fileName.toUpperCase().includes(searhString.toUpperCase());
                             })
                     }
                     rowSelection={{
                        onChange: onSelection,
                        selectedRowKeys: selectedMetaDatas.map((metadata: any) => {
                           return metadata.id;
                        }),
                     }}
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
