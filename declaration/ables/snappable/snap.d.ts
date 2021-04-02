import { SnapInfo, SnappableProps, SnappableState, Guideline, ResizableProps, ScalableProps, SnapOffsetInfo, MoveableManagerInterface, MoveableClientRect, ElementGuidelineValue } from "../../types";
export declare function calculateContainerPos(rootMatrix: number[], containerRect: MoveableClientRect, n: number): number[];
export declare function getGapGuidelines(guidelines: Guideline[], type: "vertical" | "horizontal", snapThreshold: number, index: number, [start, end]: number[], [otherStart, otherEnd]: number[]): Guideline[];
export declare function addGuidelines(totalGuidelines: Guideline[], width: number, height: number, horizontalGuidelines?: number[] | false, verticalGuidelines?: number[] | false, clientLeft?: number, clientTop?: number): Guideline[];
export declare function caculateElementGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, values: ElementGuidelineValue[]): Guideline[];
export declare function getElementGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, isRefresh: boolean, prevGuidelines?: Guideline[]): Guideline[];
export declare function getTotalGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): Guideline[];
export declare function checkMoveableSnapPoses(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, posesX: number[], posesY: number[], snapCenter?: boolean, customSnapThreshold?: number): {
    vertical: SnapInfo;
    horizontal: SnapInfo;
};
export declare function checkSnapPoses(guidelines: Guideline[], posesX: number[], posesY: number[], options: {
    snapThreshold?: number;
    snapCenter?: boolean;
    snapElement?: boolean;
}): {
    vertical: SnapInfo;
    horizontal: SnapInfo;
};
export declare function checkSnapKeepRatio(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, startPos: number[], endPos: number[]): {
    vertical: SnapOffsetInfo;
    horizontal: SnapOffsetInfo;
};
export declare function checkSnaps(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, rect: {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
    center?: number;
    middle?: number;
}, isCenter: boolean, customSnapThreshold?: number): {
    vertical: SnapInfo;
    horizontal: SnapInfo;
};
export declare function getNearestSnapGuidelineInfo(snapInfo: SnapInfo): {
    isSnap: boolean;
    offset: number;
    dist: number;
    pos: number;
    guideline: null;
} | {
    isSnap: true;
    offset: number;
    dist: number;
    pos: number;
    guideline: Guideline;
};
export declare function getSnapInfosByDirection(moveable: MoveableManagerInterface<SnappableProps & (ResizableProps | ScalableProps), SnappableState>, poses: number[][], snapDirection: number[]): {
    vertical: SnapInfo;
    horizontal: SnapInfo;
};
export declare function checkSnapBoundPriority(a: {
    isBound: boolean;
    isSnap: boolean;
    offset: number;
}, b: {
    isBound: boolean;
    isSnap: boolean;
    offset: number;
}): number;
export declare function getNearOffsetInfo<T extends {
    offset: number[];
    isBound: boolean;
    isSnap: boolean;
    sign: number[];
}>(offsets: T[], index: number): T;
