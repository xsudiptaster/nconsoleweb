import { Col, Modal, Row, Statistic, Tabs } from "antd";
import React from "react";
import DisplayExcelSheetView from "../DisplayExcelSheetView";
import RenderIf from "../RenderIf";
import { cleanDeploymentStatus } from "./DeploymentStatusView.util";

interface IDeploymentStatusViewProps {
   children?: React.ReactNode;
   displayResult: any;
   open: boolean;
   setOpen: any;
}

const DeploymentStatusView: React.FC<IDeploymentStatusViewProps> = (props) => {
   const { displayResult, open, setOpen } = props;
   const cleanedResult = React.useMemo(() => {
      return cleanDeploymentStatus(displayResult);
   }, [displayResult]);
   return (
      <>
         <Modal
            title="Deployment Status"
            style={{ width: 1000 }}
            width={1000}
            open={open}
            footer={null}
            onCancel={() => {
               setOpen(false);
            }}
         >
            <Tabs
               size="small"
               items={[
                  {
                     key: "componentFailures",
                     label: "Component Failures",
                     children: <DisplayExcelSheetView data={cleanedResult.failures} showDownload />,
                  },
                  {
                     key: "componentSuccesses",
                     label: "Component Successes",
                     children: <DisplayExcelSheetView data={cleanedResult.successes} showDownload />,
                  },
                  {
                     key: "runTestResult",
                     label: "Test Failure",
                     children: (
                        <>
                           <RenderIf renderIf={cleanedResult.runTest}>
                              <Row gutter={16}>
                                 <Col span={12}>
                                    <Statistic title="Failures" value={cleanedResult.runTest.numFailures} />
                                 </Col>
                                 <Col span={12}>
                                    <Statistic title="Test Runs" value={cleanedResult.runTest.numTestsRun} />
                                 </Col>
                                 <Col span={12}>
                                    <Statistic title="Total Time" value={cleanedResult.runTest.totalTime} />
                                 </Col>
                                 <Col span={24}>
                                    <RenderIf renderIf={cleanedResult.runTest.codeCoverage !== undefined}>
                                       <Tabs
                                          items={[
                                             {
                                                key: "codeCoverage",
                                                label: "Code Coverage",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={cleanedResult.runTest.codeCoverage}
                                                      showDownload
                                                   />
                                                ),
                                             },
                                             {
                                                key: "flowCoverage",
                                                label: "Flow Coverage",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={cleanedResult.runTest.flowCoverage}
                                                      showDownload
                                                   />
                                                ),
                                             },
                                             {
                                                key: "failures",
                                                label: "Failures",
                                                children: (
                                                   <DisplayExcelSheetView data={cleanedResult.runTest.failures} showDownload />
                                                ),
                                             },

                                             {
                                                key: "successes",
                                                label: "Successes",
                                                children: (
                                                   <DisplayExcelSheetView data={cleanedResult.runTest.successes} showDownload />
                                                ),
                                             },
                                          ]}
                                          size="small"
                                       />
                                    </RenderIf>
                                 </Col>
                              </Row>
                           </RenderIf>
                        </>
                     ),
                  },
               ]}
            />
         </Modal>
      </>
   );
};

export default DeploymentStatusView;
