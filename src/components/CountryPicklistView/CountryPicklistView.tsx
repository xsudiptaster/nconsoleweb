import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Tabs, Upload } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import DisplayExcelSheetView from "../../utils/DisplayExcelSheetView";
import { deployCountries, download, handleLoad, upload } from "./CountryPicklistView.util";

interface ICountryPicklistViewProps {
  children?: React.ReactNode;
}

const CountryPicklistView: React.FC<ICountryPicklistViewProps> = (props) => {
  const [, setLoading] = useRecoilState(loadingAtom);
  const [countries, setCountries] = React.useState<any[]>([]);
  const [searchString, setSearchString] = React.useState("");
  React.useEffect(() => {
    const onload = async () => {
      setLoading(true);
      let response = await handleLoad();
      setCountries(response);
      setLoading(false);
    };
    onload();
  }, [setLoading]);
  const onDownload = () => {
    download(countries);
  };
  const onUpload = async (file: any) => {
    let response = await upload(file);
    setCountries(response);
    return false;
  };
  const onUpdate = async () => {
    setLoading(true);
    let response = await deployCountries(countries);
    console.log("🚀 ~ file: CountryPicklistView.tsx:37 ~ onUpdate ~ response:", response);
    setLoading(false);
  };
  return (
    <Card
      title={
        <Space>
          <div>Country Picklist :</div>
          <Input
            size="small"
            placeholder="Filter Country"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </Space>
      }
      size="small"
      bodyStyle={{ maxHeight: "85vh", overflow: "auto" }}
      extra={
        <Space>
          <Button size="small" onClick={onDownload}>
            Download
          </Button>
          <Upload beforeUpload={onUpload} accept=".xlsx,.xls,.xlsb">
            <Button icon={<UploadOutlined />} size="small">
              Upload
            </Button>
          </Upload>
          <Button size="small" onClick={onUpdate}>
            Update
          </Button>
        </Space>
      }
    >
      <Tabs
        tabPosition="left"
        renderTabBar={(props, DefaultTabBar: any) => {
          return <DefaultTabBar {...props} style={{ maxHeight: "80vh", overflow: "auto" }} />;
        }}
        items={countries
          .filter((country: any) => {
            return searchString === ""
              ? true
              : country.label.toUpperCase().includes(searchString.toUpperCase()) ||
                  country.integrationValue.toUpperCase().includes(searchString.toUpperCase());
          })
          .map((country: any) => {
            return {
              label: country.label,
              key: country.isoCode,
              children: (
                <DisplayExcelSheetView
                  showDownload={false}
                  data={country.states ? (country?.states[0] ? country?.states : [country?.states]) : []}
                />
              ),
            };
          })}
      />
    </Card>
  );
};

export default CountryPicklistView;
