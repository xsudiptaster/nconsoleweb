import React from "react";
import RenderIf from "../../../../utils/RenderIf";
import ContextMenuFolderView from "../ContextMenuFolderView";
import ContextMenuReportView from "../ContextMenuReportView";

interface IContextMenuViewProps {
   children?: React.ReactNode;
   nodeData: any;
}

const ContextMenuView: React.FC<IContextMenuViewProps> = (props) => {
   const { nodeData } = props;
   return (
      <>
         <RenderIf renderIf={!nodeData.isLeaf}>
            <ContextMenuFolderView nodeData={nodeData} />
         </RenderIf>
         <RenderIf renderIf={nodeData.isLeaf}>
            <ContextMenuReportView nodeData={nodeData} />
         </RenderIf>
      </>
   );
};

export default ContextMenuView;
