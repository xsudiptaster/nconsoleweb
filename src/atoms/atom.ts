import { atom } from "recoil";
export const loadingAtom = atom({
   key: "loadingAtom",
   default: false,
});
export const statusModalAtom = atom({
   key: "statusModalAtom",
   default: {},
});
export const selectedAppAtom = atom({
   key: "selectedAppAtom",
   default: "home",
});
export const nodesAtom = atom({
   key: "nodesAtom",
   default: [] as any[],
});
export const edgesAtom = atom({
   key: "edgesAtom",
   default: [] as any[],
});
export const draggedObjectAtom = atom({
   key: "draggedObjectAtom",
   default: {} as any,
});
export const selectedNodeAtom = atom({
   key: "selectedNodeAtom",
   default: {} as any,
});
export const selectedEdgeAtom = atom({
   key: "selectedEdgeAtom",
   default: {} as any,
});
export const selectedReportTypeAtom = atom({
   key: "selectedReportTypeAtom",
   default: {} as any,
});
export const reportFieldTreeDataAtom = atom({
   key: "reportFieldTreeDataAtom",
   default: [] as any[],
});
export const reportTypeDragFieldAtom = atom({
   key: "reportTypeDragFieldAtom",
   default: {},
});
export const reportFolderTreeAtom = atom({
   key: "reportFolderTreeAtom",
   default: [] as any[],
});
export const reportFolderNodeAtom = atom({
   key: "reportFolderNodeAtom",
   default: {} as any,
});
export const dashboardFolderTreeAtom = atom({
   key: "",
   default: [] as any[],
});
export const dashboardFolderNodeAtom = atom({
   key: "dashboardFolderNodeAtom",
   default: {} as any,
});
