import { App, Divider } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import DeploymentStatusView from "../../utils/DeploymentStatusView";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import { hadleExecute } from "./DeleteMetadataView.util";

interface IDeleteMetadataViewProps {
   children?: React.ReactNode;
}

const DeleteMetadataView: React.FC<IDeleteMetadataViewProps> = (props) => {
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);
   const [deploymentResult, setDeploymentResult] = React.useState({});
   const [openResult, setOpenResult] = React.useState(false);
   const execute = async (selectedmetadatas: any[]) => {
      setLoading(true);
      let response = await hadleExecute(selectedmetadatas);
      setDeploymentResult(response);
      setOpenResult(true);
      if (response.success) {
         message.success("Deletion Successfull");
      } else {
         message.error("Deletion Failed");
      }
      setLoading(false);
      return response.success;
   };
   return (
      <>
         <Divider>Delete Metadata</Divider>
         <DisplaySelectMetadataView execute={execute} preSelectedMetadatas={[]} />
         <DeploymentStatusView displayResult={deploymentResult} open={openResult} setOpen={setOpenResult} />
      </>
   );
};

export default DeleteMetadataView;
