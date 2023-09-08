import { ArrowDownOutlined, ArrowUpOutlined }                        from "@ant-design/icons";
import { Button, Popover, Select }                                   from "antd";
import React                                                         from "react";
import { AiOutlineFilter, AiTwotoneFilter }                          from "react-icons/ai";
import { FaSort }                                                    from "react-icons/fa";
import RenderIf                                                      from "./../RenderIf/RenderIf";
import style                                                         from "./CustomTableObjectView.module.css";
import { handleFilter, handleFilterOption, handleLoad, sortByField } from "./CustomTableObjectView.util";
import DisplayRowView                                                from "./DisplayRowView";
import { writeFileWithXLSX }                                         from "../utils";

interface ICustomTableObjectViewProps {
  children?: React.ReactNode;
  data: any[];
  fields: any[];
  onSave?: any;
  onDelete?: any;
}

const CustomTableObjectView: React.FC<ICustomTableObjectViewProps> = (props) => {
  const { data, fields, onSave, onDelete } = props;
  const [fieldMap, setFieldMap] = React.useState<any>({});
  const [displayData, setDisplayData] = React.useState<any[]>([]);
  const [sortInfo, setSortInfo] = React.useState({ order: "asc", field: "" });
  const [filteredFields, setFilteredFields] = React.useState<any>({});
  React.useEffect(() => {
    const onload = () => {
      let result = handleLoad(fields);
      setFieldMap(result);
      setDisplayData(data);
    };
    onload();
  }, [data, fields]);
  const onSort = (field: string) => {
    let tempSort = { ...sortInfo };
    tempSort.field = field;
    tempSort.order = tempSort.order === "asc" ? "desc" : "asc";
    setSortInfo(tempSort);
    let response = sortByField(tempSort, displayData);
    setDisplayData(response);
  };
  const onFilter = (field: string, values: any[]) => {
    let tempfilterFields = { ...filteredFields };
    if (values.length === 0 && tempfilterFields[field]) {
      delete tempfilterFields[field];
    } else {
      tempfilterFields[field] = values;
    }
    setFilteredFields(tempfilterFields);
    let response = handleFilter(tempfilterFields, data);
    setDisplayData(response);
  };
  const onAddRow = () => {
    let newObj: any = {};
    Object.keys(data[0]).forEach((key) => {
      newObj[key] = "";
    });
    setDisplayData([newObj, ...displayData]);
  };
  return (
    <RenderIf renderIf={data && data.length > 0}>
      <div className={style.container}>
        <div className={style.buttonHolder}>
          <Button size="small" onClick={onAddRow}>
            Add Row
          </Button>
          <Button
            size="small"
            onClick={() => {
              writeFileWithXLSX(data, "CustomMetadat-" + new Date().toISOString() + ".xlsx");
            }}
          >
            Download
          </Button>
        </div>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Operations</th>
              {data && data.length > 0 ? (
                Object.keys(data[0]).map((key, keyIndex) => {
                  return (
                    <th key={keyIndex}>
                      {key}
                      <Button
                        type="text"
                        size="small"
                        icon={
                          sortInfo?.field === key ? (
                            sortInfo.order === "asc" ? (
                              <ArrowUpOutlined />
                            ) : (
                              <ArrowDownOutlined />
                            )
                          ) : (
                            <FaSort />
                          )
                        }
                        onClick={() => {
                          onSort(key);
                        }}
                      />
                      <Popover
                        content={
                          <>
                            <Select
                              mode="multiple"
                              size="small"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                              options={handleFilterOption(key, data)}
                              onChange={(values) => {
                                onFilter(key, values);
                              }}
                            />
                          </>
                        }
                        title="Filter"
                        trigger="click"
                      >
                        <Button icon={filteredFields[key] ? <AiTwotoneFilter /> : <AiOutlineFilter />} type="text" size="small" />
                      </Popover>
                    </th>
                  );
                })
              ) : (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody style={{ maxHeight: "70vh", overflow: "auto" }}>
            {displayData && displayData.length > 0 ? (
              displayData.map((row, rowIndex) => {
                return (
                  <DisplayRowView
                    key={rowIndex}
                    rowIndex={rowIndex}
                    row={row}
                    fieldMap={fieldMap}
                    onSave={onSave}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </RenderIf>
  );
};

export default CustomTableObjectView;
