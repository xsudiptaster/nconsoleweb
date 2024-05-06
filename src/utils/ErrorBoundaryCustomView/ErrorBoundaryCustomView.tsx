import { Button, Result } from "antd";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface IErrorBoundaryCustomViewProps {
   children?: React.ReactNode;
}

const ErrorBoundaryCustomView: React.FC<IErrorBoundaryCustomViewProps> = (props) => {
   let { children } = props;
   const fallbackRender = ({ error, resetErrorBoundary }: any) => {
      // Call resetErrorBoundary() to reset the error boundary and retry the render.

      return (
         <div>
            <Result
               status="500"
               title={error?.message}
               subTitle="Sorry, something went wrong."
               extra={
                  <Button
                     type="primary"
                     onClick={() => {
                        window.open("/", "_self");
                     }}
                  >
                     Back Login
                  </Button>
               }
            />
         </div>
      );
   };
   return (
      <>
         <ErrorBoundary fallbackRender={fallbackRender}>
            <>{children}</>;
         </ErrorBoundary>
      </>
   );
};

export default ErrorBoundaryCustomView;
