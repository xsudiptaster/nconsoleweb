import { App, Button, Divider } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import DeploymentStatusView from "../../utils/DeploymentStatusView";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import RenderIf from "../../utils/RenderIf";
import { hadleExecute } from "./DeleteMetadataView.util";

interface IDeleteMetadataViewProps {
   children?: React.ReactNode;
}

const DeleteMetadataView: React.FC<IDeleteMetadataViewProps> = (props) => {
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);
   const [deploymentResult, setDeploymentResult] = React.useState<any>({});
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
         <Divider>
            Delete Metadata
            <RenderIf renderIf={deploymentResult?.status !== undefined}>
               <Button
                  size="small"
                  onClick={() => {
                     setOpenResult(true);
                  }}
               >
                  Show Previous Result
               </Button>
            </RenderIf>
         </Divider>
         <DisplaySelectMetadataView execute={execute} preSelectedMetadatas={[]} />
         <DeploymentStatusView displayResult={deploymentResult} open={openResult} setOpen={setOpenResult} />
      </>
   );
};

export default DeleteMetadataView;
