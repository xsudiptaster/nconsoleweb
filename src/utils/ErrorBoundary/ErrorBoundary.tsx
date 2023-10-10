import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { handleApi } from "../utils";

interface IErrorBoundaryProps {
   children?: React.ReactNode;
}

const ErrorBoundary: React.FC<IErrorBoundaryProps> = (props) => {
   const { children } = props;
   const [hasError, setHasError] = useState(false);

   useEffect(() => {
      const errorHandler = (event: any) => {
         // You can log the error here or send it to a logging service
         handleApi("sendEmail", { email: "capture@nconsole.com", body: JSON.stringify(event) });
         console.error("Error caught by ErrorBoundary:", JSON.stringify(event));
         setHasError(true);
      };

      // Assign the error handler to the window to catch unhandled errors in child components
      window.addEventListener("error", errorHandler);

      return () => {
         window.removeEventListener("error", errorHandler);
      };
   }, []);

   useEffect(() => {
      if (hasError) {
         // Perform any cleanup or additional actions when an error occurs
         // For example, you can clear any resources or reset the component's state
      }
   }, [hasError]);

   if (hasError) {
      // Fallback UI when an error occurs
      return (
         <div>
            <Result
               status="500"
               title="500"
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
   }

   return <>{children}</>;
};

export default ErrorBoundary;
