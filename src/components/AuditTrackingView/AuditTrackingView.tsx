import React from "react";
import DisplayExcelSheetView from "../../utils/DisplayExcelSheetView";
import { handleLoad } from "./AuditTrackingView.util";

interface IAuditTrackingViewProps {
   children?: React.ReactNode;
}

const AuditTrackingView: React.FC<IAuditTrackingViewProps> = (props) => {
   const [auditData, setAuditData] = React.useState([]);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setAuditData(response);
      };
      onload();
   }, []);
   return (
      <>
         <DisplayExcelSheetView data={auditData} showDownload={true} />
      </>
   );
};

export default AuditTrackingView;
