import React from "react";
import RenderIf from "../../../../utils/RenderIf";
import ContextMenuDashboardView from "../ContextMenuDashboardView";
import ContextMenuFolderView from "../ContextMenuFolderView";

interface IContextMenuViewProps {
   children?: React.ReactNode;
   nodeData: any;
}

const ContextMenuView: React.FC<IContextMenuViewProps> = (props) => {
   const { nodeData } = props;
   return (
      <>
         <RenderIf renderIf={nodeData.isLeaf}>
            <ContextMenuDashboardView nodeData={nodeData} />
         </RenderIf>
         <RenderIf renderIf={!nodeData.isLeaf}>
            <ContextMenuFolderView nodeData={nodeData} />
         </RenderIf>
      </>
   );
};

export default ContextMenuView;
