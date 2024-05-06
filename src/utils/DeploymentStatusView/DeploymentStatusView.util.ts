export const cleanDeploymentStatus = (deploymentResponse: any) => {
   let obj: any = {
      failures: [],
      successes: [],
      runTest: {
         numFailures: 0,
         numTestsRun: 0,
         totalTime: 0,
         codeCoverage: [],
         flowCoverage: [],
         failures: [],
         successes: [],
      },
   };
   if (deploymentResponse?.details?.componentFailures && Array.isArray(deploymentResponse?.details?.componentFailures)) {
      obj.failures = deploymentResponse?.details?.componentFailures;
   } else if (deploymentResponse?.details?.componentFailures) {
      obj.failures.push(deploymentResponse?.details?.componentFailures);
   }
   if (deploymentResponse?.details?.componentSuccesses && Array.isArray(deploymentResponse?.details?.componentSuccesses)) {
      obj.successes = deploymentResponse?.details?.componentSuccesses;
   } else if (deploymentResponse?.details?.componentSuccesses) {
      obj.successes.push(deploymentResponse?.details?.componentSuccesses);
   }
   if (deploymentResponse?.details?.runTestResult.numFailures) {
      obj.runTest.numFailures = parseInt(deploymentResponse?.details?.runTestResult.numFailures);
   }
   if (deploymentResponse?.details?.runTestResult?.numTestsRun) {
      obj.runTest.numTestsRun = parseInt(deploymentResponse?.details?.runTestResult.numTestsRun);
   }
   if (deploymentResponse?.details?.runTestResult?.totalTime) {
      obj.runTest.totalTime = parseInt(deploymentResponse?.details?.runTestResult.totalTime);
   }
   if (
      deploymentResponse?.details?.runTestResult?.codeCoverage &&
      Array.isArray(deploymentResponse?.details?.runTestResult?.codeCoverage)
   ) {
      obj.runTest.codeCoverage = deploymentResponse?.details?.runTestResult?.codeCoverage.map((cov: any) => {
         delete cov.locationsNotCovered;
         delete cov.namespace;
         return cov;
      });
   } else if (deploymentResponse?.details?.runTestResult?.codeCoverage) {
      let tempObj = { ...deploymentResponse?.details?.runTestResult?.codeCoverage };
      delete tempObj.locationsNotCovered;
      delete tempObj.namespace;
      obj.runTest.codeCoverage.push(tempObj);
   }
   if (
      deploymentResponse?.details?.runTestResult?.flowCoverage &&
      Array.isArray(deploymentResponse?.details?.runTestResult?.flowCoverage)
   ) {
      obj.runTest.flowCoverage = deploymentResponse?.details?.runTestResult?.flowCoverage.map((cov: any) => {
         delete cov.flowNamespace;
         return cov;
      });
   } else if (deploymentResponse?.details?.runTestResult?.flowCoverage) {
      let tempObj = { ...deploymentResponse?.details?.runTestResult?.flowCoverage };
      delete tempObj.flowNamespace;
      obj.runTest.flowCoverage.push(tempObj);
   }
   if (
      deploymentResponse?.details?.runTestResult?.failures &&
      Array.isArray(deploymentResponse?.details?.runTestResult?.failures)
   ) {
      obj.runTest.failures = deploymentResponse?.details?.runTestResult?.failures.map((cov: any) => {
         delete cov.namespace;
         return cov;
      });
   } else if (deploymentResponse?.details?.runTestResult?.failures) {
      let tempObj = { ...deploymentResponse?.details?.runTestResult?.failures };
      delete tempObj.namespace;
      obj.runTest.failures.push(tempObj);
   }
   if (
      deploymentResponse?.details?.runTestResult?.successes &&
      Array.isArray(deploymentResponse?.details?.runTestResult?.successes)
   ) {
      obj.runTest.successes = deploymentResponse?.details?.runTestResult?.successes.map((cov: any) => {
         delete cov.namespace;
         return cov;
      });
   } else if (deploymentResponse?.details?.runTestResult?.successes) {
      let tempObj = { ...deploymentResponse?.details?.runTestResult?.successes };
      delete tempObj.namespace;
      obj.runTest.successes.push(tempObj);
   }
   return obj;
};
