import { toPng } from "html-to-image";
import { MarkerType, getRectOfNodes, getTransformForBounds } from "reactflow";
import { handleApi } from "../../utils/utils";

export const handleLoad = async () => {
   let response = await handleApi("describeGlobal", {});
   if (response.sobjects) {
      let objectList = response?.sobjects
         .filter((object: any) => {
            return object.createable && object.customSetting === false && object.isInterface === false;
         })
         .sort((a: any, b: any) => {
            return a.label > b.label ? 1 : -1;
         });
      return objectList;
   }
   return [];
};
export const handleAddNode = async (nodes: any, draggedObject: any, position: any) => {
   let response = await handleApi("objectDescribe", { objectName: draggedObject.name });
   let tempNodes = JSON.parse(JSON.stringify(nodes));
   tempNodes.push({
      id: draggedObject.name,
      type: "object",
      label: draggedObject.label,
      data: { ...draggedObject, fields: response.fields, selectedFields: [] },
      position: position,
   });
   return tempNodes;
};

const getSourceAndDestinationPosition = (nodes: any[], sourceNodeId: string, destinationNodeId: string) => {
   const mapNodeById = nodes.reduce((m, node) => {
      m[node.id] = node;
      return m;
   }, {});
   try {
      const sourcePosition = mapNodeById[sourceNodeId].position.x > mapNodeById[destinationNodeId].position.x ? "left" : "right";
      const destinationPosition =
         mapNodeById[sourceNodeId].position.y > mapNodeById[destinationNodeId].position.y ? "bottom" : "top";
      return { sourcePosition, destinationPosition };
   } catch (e) {
      return { sourcePosition: "left", destinationPosition: "bottom" };
   }
};
export const createEdges = (nodes: any[], edges: any[]) => {
   let tempEdges: any[] = [];
   const mapEdgeById = edges.reduce((m, edge) => {
      m[edge.id] = edge;
      return m;
   }, {});
   nodes.forEach((node) => {
      node.data.selectedFields.forEach((ofield: any) => {
         if (ofield.type === "reference") {
            const positions = getSourceAndDestinationPosition(nodes, node.id, ofield.referenceTo[0]);
            let Id = "edge-" + node.data.name + ofield.name + ofield.referenceTo[0];
            tempEdges.push({
               id: Id,
               type: mapEdgeById[Id] ? mapEdgeById[Id].type : "default",
               animated: false,
               label: mapEdgeById[Id] ? mapEdgeById[Id].label : "",
               style: mapEdgeById[Id] ? mapEdgeById[Id].style : {},
               source: node.id,
               sourceHandle: positions.sourcePosition + "-" + node.data.name + ofield.name,
               target: ofield.referenceTo[0],
               targetHandle: positions.destinationPosition + "-" + ofield.referenceTo[0],
               markerStart: {
                  type: MarkerType.Arrow,
                  style: { color: "white" },
                  width: 15,
                  height: 15,
               },
            });
         }
      });
   });
   return tempEdges;
};
const downloadImage = (dataUrl: any) => {
   const a = document.createElement("a");
   a.setAttribute("download", "erd-diagram.png");
   a.setAttribute("href", dataUrl);
   a.click();
};
export const onImageDownload = (nodes: any[]) => {
   const imageWidth = 1024;
   const imageHeight = 768;
   const nodesBounds = getRectOfNodes(nodes);
   const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
   const elementHTML: any = document.querySelector(".react-flow__viewport");
   if (elementHTML) {
      toPng(elementHTML, {
         backgroundColor: "#1a365d",
         width: imageWidth,
         height: imageHeight,
         style: {
            width: imageWidth.toString(),
            height: imageHeight.toString(),
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
         },
      })
         .then(downloadImage)
         .catch((e) => {
            console.log(e);
         });
   }
};
