import { Renderer, SnappableProps, SnappableState, Guideline, ScalableProps, RotatableProps, RectInfo, DraggableProps, MoveableManagerInterface, BoundType, SnapBoundInfo, MoveableGroupInterface } from "../types";
interface DirectionSnapType<T> {
    vertical: T;
    horizontal: T;
}
export declare function snapStart(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
export declare function hasGuidelines(moveable: MoveableManagerInterface<any, any>, ableName: string): moveable is MoveableManagerInterface<SnappableProps, SnappableState>;
export declare function checkSnapBoundsKeepRatio(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, startPos: number[], endPos: number[], isRequest: boolean): DirectionSnapType<SnapBoundInfo>;
export declare function checkMoveableSnapBounds(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, isRequest: boolean, poses: number[][], boundPoses?: number[][]): DirectionSnapType<Required<SnapBoundInfo>>;
export declare function checkSnapBounds(guideines: Guideline[], bounds: BoundType | undefined | false, posesX: number[], posesY: number[], options?: {
    isRequest?: boolean;
    snapThreshold?: number;
    snapCenter?: boolean;
    snapElement?: boolean;
}): DirectionSnapType<Required<SnapBoundInfo>>;
export declare function normalized(value: number): number;
export declare function checkMaxBounds(moveable: MoveableManagerInterface<SnappableProps>, poses: number[][], direction: number[], fixedPosition: number[], datas: any): {
    maxWidth: number;
    maxHeight: number;
};
export declare function getCheckSnapDirections(direction: number[], keepRatio: boolean): number[][][];
export declare function getSizeOffsetInfo(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, poses: number[][], direction: number[], keepRatio: boolean, isRequest: boolean, datas: any): {
    width: {
        isBound: boolean;
        offset: number;
    };
    height: {
        isBound: boolean;
        offset: number;
    };
};
export declare function recheckSizeByTwoDirection(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, poses: number[][], width: number, height: number, maxWidth: number, maxHeight: number, direction: number[], isRequest: boolean, datas: any): number[];
export declare function checkSizeDist(moveable: MoveableManagerInterface<any, any>, getNextPoses: (widthOffset: number, heightOffset: number) => number[][], width: number, height: number, direction: number[], fixedPosition: number[], isRequest: boolean, datas: any): number[];
export declare function checkSnapRotate(moveable: MoveableManagerInterface<SnappableProps & RotatableProps, any>, rect: RectInfo, origin: number[], rotation: number): number;
export declare function checkSnapSize(moveable: MoveableManagerInterface<{}, {}>, width: number, height: number, direction: number[], fixedPosition: number[], isRequest: boolean, datas: any): number[];
export declare function checkSnapScale(moveable: MoveableManagerInterface<ScalableProps, any>, scale: number[], direction: number[], isRequest: boolean, datas: any): number[];
export declare function solveEquation(pos1: number[], pos2: number[], snapOffset: number, isVertical: boolean): number[];
export declare function startCheckSnapDrag(moveable: MoveableManagerInterface<any, any>, datas: any): void;
export declare function checkThrottleDragRotate(throttleDragRotate: number, [distX, distY]: number[], [isVerticalBound, isHorizontalBound]: boolean[], [isVerticalSnap, isHorizontalSnap]: boolean[], [verticalOffset, horizontalOffset]: number[]): number[];
export declare function checkSnapDrag(moveable: MoveableManagerInterface<SnappableProps & DraggableProps, any>, distX: number, distY: number, throttleDragRotate: number, isRequest: boolean, datas: any): {
    isSnap: boolean;
    isBound: boolean;
    offset: number;
}[];
declare const _default: {
    name: string;
    props: {
        readonly snappable: readonly [BooleanConstructor, ArrayConstructor];
        readonly snapCenter: BooleanConstructor;
        readonly snapHorizontal: BooleanConstructor;
        readonly snapVertical: BooleanConstructor;
        readonly snapElement: BooleanConstructor;
        readonly snapGap: BooleanConstructor;
        readonly isDisplaySnapDigit: BooleanConstructor;
        readonly snapDigit: NumberConstructor;
        readonly snapThreshold: NumberConstructor;
        readonly horizontalGuidelines: ArrayConstructor;
        readonly verticalGuidelines: ArrayConstructor;
        readonly elementGuidelines: ArrayConstructor;
        readonly bounds: ObjectConstructor;
        readonly innerBounds: ObjectConstructor;
        readonly snapDistFormat: FunctionConstructor;
    };
    events: {
        readonly onSnap: "snap";
    };
    css: string[];
    render(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, React: Renderer): any[];
    dragStart(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, e: any): void;
    drag(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    pinchStart(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragEnd(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragControlCondition(e: any, moveable: MoveableManagerInterface): boolean | undefined;
    dragControlStart(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragControl(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragControlEnd(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragGroupStart(moveable: any, e: any): void;
    dragGroup(moveable: MoveableGroupInterface<SnappableProps, SnappableState>): void;
    dragGroupEnd(moveable: MoveableGroupInterface<SnappableProps, SnappableState>): void;
    dragGroupControlStart(moveable: MoveableGroupInterface<SnappableProps, SnappableState>): void;
    dragGroupControl(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): void;
    dragGroupControlEnd(moveable: MoveableGroupInterface<SnappableProps, SnappableState>): void;
    unset(moveable: any): void;
};
export default _default;
