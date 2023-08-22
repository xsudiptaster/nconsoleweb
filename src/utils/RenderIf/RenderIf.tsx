import React from "react";

interface IRenderIfProps {
   children?: React.ReactNode;
   renderIf: boolean;
}

const RenderIf: React.FC<IRenderIfProps> = (props) => {
   const { renderIf, children } = props;
   return <React.Fragment>{renderIf ? children : ""}</React.Fragment>;
};

export default RenderIf;
