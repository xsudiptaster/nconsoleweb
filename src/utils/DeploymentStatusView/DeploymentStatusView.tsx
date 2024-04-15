import { Col, Modal, Row, Statistic, Tabs } from "antd";
import React from "react";
import DisplayExcelSheetView from "../DisplayExcelSheetView";
import RenderIf from "../RenderIf";

interface IDeploymentStatusViewProps {
   children?: React.ReactNode;
   displayResult: any;
   open: boolean;
   setOpen: any;
}

const DeploymentStatusView: React.FC<IDeploymentStatusViewProps> = (props) => {
   const { displayResult, open, setOpen } = props;

   return (
      <>
         <Modal
            title="Basic Modal"
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
                     children: (
                        <DisplayExcelSheetView
                           data={displayResult?.details?.componentFailures ? displayResult?.details?.componentFailures : []}
                           showDownload
                        />
                     ),
                  },
                  {
                     key: "componentSuccesses",
                     label: "Component Successes",
                     children: (
                        <DisplayExcelSheetView
                           data={displayResult?.details?.componentSuccesses ? displayResult?.details?.componentSuccesses : []}
                           showDownload
                        />
                     ),
                  },
                  {
                     key: "runTestResult",
                     label: "Test Failure",
                     children: (
                        <>
                           <RenderIf renderIf={displayResult?.details?.runTestResult !== undefined}>
                              <Row gutter={16}>
                                 <Col span={12}>
                                    <Statistic
                                       title="Failures"
                                       value={
                                          displayResult?.details?.runTestResult.numFailures
                                             ? parseInt(displayResult?.details?.runTestResult.numFailures)
                                             : 0
                                       }
                                    />
                                 </Col>
                                 <Col span={12}>
                                    <Statistic
                                       title="Test Runs"
                                       value={
                                          displayResult?.details?.runTestResult?.numTestsRun
                                             ? parseInt(displayResult?.details?.runTestResult?.numTestsRun)
                                             : 0
                                       }
                                    />
                                 </Col>
                                 <Col span={12}>
                                    <Statistic
                                       title="Total Time"
                                       value={
                                          displayResult?.details?.runTestResult?.totalTime
                                             ? parseInt(displayResult?.details?.runTestResult?.totalTime)
                                             : 0
                                       }
                                    />
                                 </Col>
                                 <Col span={24}>
                                    <RenderIf renderIf={displayResult?.details?.runTestResult?.codeCoverage !== undefined}>
                                       <Tabs
                                          items={[
                                             {
                                                key: "codeCoverage",
                                                label: "Code Coverage",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={
                                                         displayResult?.details?.runTestResult?.codeCoverage
                                                            ? displayResult?.details?.runTestResult?.codeCoverage.map(
                                                                 (cov: any) => {
                                                                    delete cov.locationsNotCovered;
                                                                    delete cov.namespace;
                                                                    return cov;
                                                                 }
                                                              )
                                                            : []
                                                      }
                                                      showDownload
                                                   />
                                                ),
                                             },
                                             {
                                                key: "flowCoverage",
                                                label: "Flow Coverage",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={
                                                         displayResult?.details?.runTestResult?.flowCoverage
                                                            ? displayResult?.details?.runTestResult?.flowCoverage.map(
                                                                 (cov: any) => {
                                                                    delete cov.flowNamespace;
                                                                    return cov;
                                                                 }
                                                              )
                                                            : []
                                                      }
                                                      showDownload
                                                   />
                                                ),
                                             },
                                             {
                                                key: "failures",
                                                label: "Failures",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={
                                                         displayResult?.details?.runTestResult?.failures
                                                            ? displayResult?.details?.runTestResult?.failures.map((cov: any) => {
                                                                 delete cov.namespace;
                                                                 return cov;
                                                              })
                                                            : []
                                                      }
                                                      showDownload
                                                   />
                                                ),
                                             },

                                             {
                                                key: "successes",
                                                label: "Successes",
                                                children: (
                                                   <DisplayExcelSheetView
                                                      data={
                                                         displayResult?.details?.runTestResult?.successes
                                                            ? displayResult?.details?.runTestResult?.successes.map((cov: any) => {
                                                                 delete cov.namespace;
                                                                 return cov;
                                                              })
                                                            : []
                                                      }
                                                      showDownload
                                                   />
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
