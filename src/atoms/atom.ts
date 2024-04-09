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
export const loginInfoAtom = atom({
   key: "loginInfoAtom",
   default: {} as any,
});

export const apexClassPermissionsCompareAtom = atom({
   key: "apexClassPermissionsCompareAtom",
   default: {} as any,
});
export const fieldPermissionsCompareAtom = atom({
   key: "fieldPermissionsCompareAtom",
   default: {} as any,
});
export const objectPermissionsCompareAtom = atom({
   key: "objectPermissionsCompareAtom",
   default: {} as any,
});
export const recordTypePermissionsCompareAtom = atom({
   key: "recordTypePermissionsCompareAtom",
   default: {} as any,
});
export const userPermissionsCompareAtom = atom({
   key: "userPermissionsCompareAtom",
   default: {} as any,
});
export const flowPermissionCompareAtom = atom({
   key: "flowPermissionCompareAtom",
   default: {} as any,
});
export const pagelayoutPermissionCompareAtom = atom({
   key: "pagelayoutPermissionCompareAtom",
   default: {} as any,
});
export const trackChangesPermissionEditAtom = atom({
   key: "trackChangesPermissionEditAtom",
   default: {} as any,
});
export const takeATourAtom = atom({
   key: "takeATourAtom",
   default: {
      appName: "",
      state: false,
   },
});
