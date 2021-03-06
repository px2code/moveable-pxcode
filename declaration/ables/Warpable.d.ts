import { WarpableProps, ScalableProps, ResizableProps, Renderer, SnappableProps, SnappableState, MoveableManagerInterface } from "../types";
declare const _default: {
    name: string;
    ableGroup: string;
    props: {
        readonly warpable: BooleanConstructor;
        readonly renderDirections: ArrayConstructor;
    };
    events: {
        readonly onWarpStart: "warpStart";
        readonly onWarp: "warp";
        readonly onWarpEnd: "warpEnd";
    };
    render(moveable: MoveableManagerInterface<ResizableProps & ScalableProps & WarpableProps>, React: Renderer): any[];
    dragControlCondition(e: any): boolean;
    dragControlStart(moveable: MoveableManagerInterface<WarpableProps, SnappableState>, e: any): any;
    dragControl(moveable: MoveableManagerInterface<WarpableProps & SnappableProps, SnappableState>, e: any): boolean;
    dragControlEnd(moveable: MoveableManagerInterface<WarpableProps>, e: any): any;
};
export default _default;
