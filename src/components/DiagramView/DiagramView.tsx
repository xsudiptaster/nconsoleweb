import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import React from "react";
import ReactFlow, {
   Background,
   Controls,
   EdgeChange,
   MiniMap,
   NodeChange,
   Panel,
   applyEdgeChanges,
   applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useRecoilState } from "recoil";
import { draggedObjectAtom, edgesAtom, loadingAtom, nodesAtom, selectedEdgeAtom, selectedNodeAtom } from "../../atoms/atom";
import { download, readFileAsText } from "../../utils/utils";
import { createEdges, handleAddNode, handleLoad, onImageDownload } from "./DiagramView.util";
import EdgeConfigView from "./EdgeConfigView";
import NodeView from "./NodeView";
import ObjectConfigView from "./ObjectConfigView";
import ObjectView from "./ObjectView";

interface IDiagramViewProps {
   children?: React.ReactNode;
}

const nodeTypes = { object: NodeView };
const DiagramView: React.FC<IDiagramViewProps> = (props) => {
   const reactFlowWrapper = React.useRef<any | null>(null);
   const [nodes, setNodes] = useRecoilState(nodesAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const [dragObject, setDragObject] = useRecoilState(draggedObjectAtom);
   const [, setLoading] = useRecoilState(loadingAtom);
   const [, setSelectedNode] = useRecoilState(selectedNodeAtom);
   const [, setSelectedEdge] = useRecoilState(selectedEdgeAtom);
   const [objectList, setObjectList] = React.useState([]);
   const [reactFlowInstance, setReactFlowInstance] = React.useState<any | null>(null);
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setObjectList(response);
      };
      onload();
   }, []);
   const onNodesChange = React.useCallback(
      (changes: NodeChange[]) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
      [setNodes]
   );
   const onEdgesChange = React.useCallback(
      (changes: EdgeChange[]) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
      [setEdges]
   );

   const onDragOver = React.useCallback((event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
   }, []);
   const onDrop = async (event: any) => {
      setLoading(true);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
         x: event.clientX - reactFlowBounds.left,
         y: event.clientY - reactFlowBounds.top,
      });
      if (dragObject.name) {
         let response = await handleAddNode(nodes, dragObject, position);
         setNodes(response);
         setDragObject({});
      }
      setLoading(false);
   };
   const onDrag = () => {
      let response = createEdges(nodes, edges);
      setEdges(response);
   };
   const onDownload = () => {
      download("ERD.json", JSON.stringify({ nodes, edges }));
   };
   const onImage = () => {
      onImageDownload(nodes);
   };
   const onFileUpload = async (payload: any) => {
      let text: any = await readFileAsText(payload);
      let jsonData = JSON.parse(text);
      setNodes(jsonData?.nodes);
      setEdges(jsonData?.edges);
   };
   return (
      <>
         <div style={{ height: "87vh" }} ref={reactFlowWrapper}>
            <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onInit={setReactFlowInstance}
               onDrop={onDrop}
               onDragOver={onDragOver}
               onNodeDragStop={onDrag}
               onNodeClick={(e, node) => {
                  setSelectedNode(node);
                  setSelectedEdge({});
                  e.stopPropagation();
               }}
               onEdgeClick={(e, edge) => {
                  setSelectedEdge(edge);
                  setSelectedNode({});
                  e.stopPropagation();
               }}
               onClick={() => {
                  setSelectedNode({});
                  setSelectedEdge({});
               }}
               nodeTypes={nodeTypes}
            >
               <Background />
               <MiniMap />
               <Controls />
               <Panel position="top-right">
                  <ObjectView objectList={objectList} />
               </Panel>
               <Panel position="top-left">
                  <Space wrap>
                     <Upload
                        accept=".json, .text"
                        beforeUpload={(file: any) => {
                           onFileUpload(file);
                           return false;
                        }}
                     >
                        <Button size="small" icon={<UploadOutlined />}>
                           Click to Upload
                        </Button>
                     </Upload>
                     <Button size="small" onClick={onDownload}>
                        Download
                     </Button>
                     <Button size="small" onClick={onImage}>
                        Image
                     </Button>
                  </Space>
                  <ObjectConfigView />
                  <EdgeConfigView />
               </Panel>
            </ReactFlow>
         </div>
      </>
   );
};

export default DiagramView;
