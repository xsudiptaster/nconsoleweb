import { Button, Card, Col, Flex, Input, Row, Select, Tree } from "antd";
import React, { useDeferredValue } from "react";
import { useRecoilState } from "recoil";
import { isQueryValid } from "soql-parser-js";
import { loadingAtom } from "../../atoms/atom";
import NestedTableView from "../../utils/NestedTableView";
import RenderIf from "../../utils/RenderIf";
import { createTreeNodes, handleCheck, handleExecute, handleExpandNode, handleFilter, handleLoad } from "./QueryBuilderView.util";

interface IQueryBuilderViewProps {
   children?: React.ReactNode;
}
const { Search } = Input;
const QueryBuilderView: React.FC<IQueryBuilderViewProps> = (props) => {
   const [, setLoading] = useRecoilState(loadingAtom);
   const [objectList, setObjectList] = React.useState([]);
   const [treeData, setTreeData] = React.useState<any[]>([]);
   const [searchString, setSearchString] = React.useState("");
   const [selectedObject, setSelectedObject] = React.useState("");
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
      let response = await createTreeNodes(value);
      setSelectedObject(value);
      setTreeData(response);
      setLoading(false);
   };
   const onExpand = async (expandedKeys: string[], { expanded, node }: any) => {
      console.log("🚀 ~ onLoad ~ node:", node);
      if (expanded) {
         setLoading(true);
         let response = await handleExpandNode(treeData, node);
         setTreeData(response);
         setLoading(false);
      }
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
   const onCheck = (checkedKeys: any, { checked: boolean, checkedNodes, node, event, halfCheckedKeys }: any) => {
      let keys = Array.from(new Set([...checkedKeys, ...halfCheckedKeys]));
      let oQuery = handleCheck(treeData, keys, selectedObject);
      setQuery(oQuery);
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
                  placeholder="Select Object"
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
            <Row>
               <Col span={8}>
                  <Search
                     placeholder="Search...."
                     size="small"
                     onChange={(e: any) => {
                        setSearchString(e.target.value);
                     }}
                  />
                  <Tree
                     checkable
                     showLine
                     treeData={filteredTreeNodes}
                     style={{ height: "85vh", overflow: "auto" }}
                     onExpand={(expandedKeys: any[], { expanded, node }: any) => {
                        onExpand(expandedKeys, { expanded, node });
                     }}
                     titleRender={(node) => {
                        return (
                           <Flex gap="middle" align="flex-start" style={{ width: "100%" }}>
                              <div style={{ color: node.isChildObject ? "#00A8FC" : "lightgrey" }}> {node.title} </div>
                              <div style={{ float: "right", right: "0" }}>
                                 <sub>({node?.data?.name})</sub>
                              </div>
                           </Flex>
                        );
                     }}
                     onCheck={(checkedKeys, { checked: boolean, checkedNodes, node, event, halfCheckedKeys }: any) => {
                        onCheck(checkedKeys, { checked: boolean, checkedNodes, node, event, halfCheckedKeys });
                     }}
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
         </Card>
      </>
   );
};

export default QueryBuilderView;
