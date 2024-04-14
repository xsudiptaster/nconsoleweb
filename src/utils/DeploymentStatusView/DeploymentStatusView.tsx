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
   const diplayItems = React.useMemo(() => {
      if (displayResult?.details) {
         console.log("🚀 ~ diplayItems ~ displayResult:", displayResult);
         let tabs = Object.keys(displayResult.details);
         let items = tabs.map((tab) => {
            return {
               key: tab,
               label: tab.toUpperCase(),
               children: <DisplayExcelSheetView data={displayResult.details[tab]} showDownload />,
            };
         });

         return items;
      }
      return [];
   }, [displayResult.details]);
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
