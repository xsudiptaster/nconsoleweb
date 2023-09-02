import React from "react";

interface IDisplayFieldViewProps {
   children?: React.ReactNode;
   field: any;
   value: any;
}

const DisplayFieldView: React.FC<IDisplayFieldViewProps> = (props) => {
   const { value, field } = props;
   console.log("🚀 ~ file: DisplayFieldView.tsx:11 ~ field:", field);
   return <>{value}</>;
};

export default DisplayFieldView;
