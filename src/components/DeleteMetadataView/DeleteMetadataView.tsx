import { App, Divider } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../atoms/atom";
import DisplaySelectMetadataView from "../../utils/DisplaySelectMetadataView";
import { hadleExecute } from "./DeleteMetadataView.util";

interface IDeleteMetadataViewProps {
   children?: React.ReactNode;
}

const DeleteMetadataView: React.FC<IDeleteMetadataViewProps> = (props) => {
   const { message } = App.useApp();
   const [, setLoading] = useRecoilState(loadingAtom);
   const execute = async (selectedmetadatas: any[]) => {
      setLoading(true);
      let response = await hadleExecute(selectedmetadatas);
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
         <DisplaySelectMetadataView execute={execute} />
      </>
   );
};

export default DeleteMetadataView;
