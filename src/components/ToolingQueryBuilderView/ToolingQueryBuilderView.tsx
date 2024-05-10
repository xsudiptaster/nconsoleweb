import { Button, Card, Col, Flex, Input, Row, Select, Tree } from "antd";
import React, { useDeferredValue } from "react";
import { isQueryValid } from "soql-parser-js";

import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import NestedTableView from "../../utils/NestedTableView";
import RenderIf from "../../utils/RenderIf";
import {
   handleCheck,
   handleExecute,
   handleExpandTree,
   handleFilter,
   handleLoad,
   handleTreeCreate,
} from "./ToolingQueryBuilderView.util";

interface IToolingQueryBuilderViewProps {
   children?: React.ReactNode;
}
const { Search } = Input;
const ToolingQueryBuilderView: React.FC<IToolingQueryBuilderViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [objectList, setObjectList] = React.useState<any[]>([]);
   const [selectedObject, setSelectedObject] = React.useState("");
   const [treeData, setTreeData] = React.useState<any[]>([]);
   const [searchString, setSearchString] = React.useState<string>("");
   const [query, setQuery] = React.useState("");
   const [result, setResult] = React.useState<any>({});
   const defferedString = useDeferredValue(searchString);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setObjectList(response);
      };
      onload();
   }, []);
   const onObjectSelect = async (value: string) => {
      setLoading(true);
      setTreeData([]);
      setQuery("");
      setSelectedObject(value);
      let response = await handleTreeCreate(value);
      setTreeData(response);
      setLoading(false);
   };
   const onLoad = async (node: any) => {
      let tempTreeNode = await handleExpandTree(treeData, node);
      setTreeData(tempTreeNode);
      return tempTreeNode;
   };

   const filteredTreeNodes: any[] = React.useMemo(() => {
      if (defferedString !== "") {
         return handleFilter(treeData, defferedString);
      } else {
         return treeData;
      }
   }, [defferedString, treeData]);
   const queryError = React.useMemo(() => {
      if (query !== "") {
         let response = isQueryValid(query);
         return response ? "" : "Invalid SOQL Query";
      } else {
         return "";
      }
   }, [query]);
   const onCheck = async (checkedKeys: any, data: any) => {
      setLoading(true);
      const { halfCheckedKeys } = data;
      let selectedKeys = [...checkedKeys, ...halfCheckedKeys];
      let response = handleCheck(treeData, selectedKeys, selectedObject);
      setQuery(response);
      setLoading(false);
   };
   const onExecute = async () => {
      setLoading(true);
      let response = await handleExecute(query);
      setResult(response);
      setLoading(false);
   };
   return (
      <>
         <Card
            bordered
            size="small"
            title={
               <Select
                  size="small"
                  variant="borderless"
                  style={{ width: "50%" }}
                  showSearch
                  options={objectList}
                  placeholder="Select Tooling Object"
                  onSelect={onObjectSelect}
                  filterOption={(input: any, option: any) => {
                     return (
                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                     );
                  }}
                  optionRender={(option: any) => {
                     return (
                        <div style={{ width: "100%" }}>
                           <Row>
                              <Col span={12}> {option.label}</Col>
                              <Col span={12}>
                                 <div style={{ float: "right", right: "0px", paddingLeft: "20px" }}>
                                    <sub>{option.value}</sub>
                                 </div>
                              </Col>
                           </Row>
                        </div>
                     );
                  }}
               />
            }
            extra={
               <Button size="small" onClick={onExecute}>
                  Execute Query
               </Button>
            }
         >
            <div style={{ height: "80vh" }}>
               <Row>
                  <Col span={8}>
                     <Search
                        placeholder="Search...."
                        size="small"
                        variant="borderless"
                        onChange={(e) => {
                           setSearchString(e.target.value);
                        }}
                     />
                     <Tree
                        checkable
                        showLine
                        treeData={filteredTreeNodes}
                        style={{ height: "75vh", overflow: "auto" }}
                        titleRender={(node) => {
                           return (
                              <Flex gap="middle" align="flex-start" style={{ width: "100%" }}>
                                 {node.title}
                                 <div style={{ float: "right", right: "0" }}>
                                    <sub>({node?.data?.name})</sub>
                                 </div>
                              </Flex>
                           );
                        }}
                        onCheck={onCheck}
                        loadData={onLoad}
                     />
                  </Col>
                  <Col span={16}>
                     <Input.TextArea
                        variant="borderless"
                        autoSize
                        style={{ backgroundColor: "#464749" }}
                        rows={10}
                        value={query}
                        onChange={(e) => {
                           setQuery(e.target.value);
                        }}
                     />
                     <div>
                        {queryError}
                        <RenderIf renderIf={result.success === false}>{result?.error}</RenderIf>
                     </div>
                     <RenderIf renderIf={result.success === true}>
                        <NestedTableView data={result.records} />
                     </RenderIf>
                  </Col>
               </Row>
            </div>
         </Card>
      </>
   );
};

export default ToolingQueryBuilderView;
