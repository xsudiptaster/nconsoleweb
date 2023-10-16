import { ConfigProvider, theme } from "antd";
import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import LoginModalView from "./components/LoginModalView";
import MainLayoutView from "./components/MainLayoutView";
import SaveTokenView from "./components/SaveTokenView";
import TermsAndConditionsView from "./components/TermsAndConditionsView";
import ErrorBoundary from "./utils/ErrorBoundary";
const router = createBrowserRouter([
   {
      path: "/",
      element: <LoginModalView />,
   },
   {
      path: "/?state=second",
      element: <LoginModalView />,
   },
   {
      path: "/callback",
      element: <SaveTokenView />,
   },
   {
      path: "/home",
      element: <MainLayoutView />,
   },
]);
function App() {
   React.useEffect(() => {});
   return (
      <React.StrictMode>
         <ConfigProvider
            theme={{
               algorithm: [theme.darkAlgorithm],
               token: {
                  wireframe: false,
                  fontSize: 12,
                  lineHeight: 1.6,
                  marginXXS: 0,
                  paddingXXS: 0,
                  marginXS: 4,
                  marginSM: 6,
                  margin: 10,
                  marginMD: 16,
                  marginLG: 18,
                  marginXL: 26,
                  marginXXL: 28,
                  paddingXS: 4,
                  paddingSM: 8,
                  padding: 12,
                  paddingMD: 18,
                  paddingLG: 20,
                  paddingXL: 28,
                  borderRadius: 4,
                  colorPrimary: "#5c5c5c",
                  colorSuccess: "#747971",
               },
            }}
         >
            <RecoilRoot>
               <ErrorBoundary>
                  <RouterProvider router={router} />
                  <TermsAndConditionsView />
               </ErrorBoundary>
            </RecoilRoot>
         </ConfigProvider>
      </React.StrictMode>
   );
}

export default App;
