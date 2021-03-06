import { directionCondition } from "../utils";
import { ResizableProps, OnResizeGroup, Renderer, DraggableProps, OnResizeStart, SnappableState, OnResize, MoveableManagerInterface, MoveableGroupInterface, SnappableProps } from "../types";
import { IObject } from "@daybrush/utils";
declare const _default: {
    name: string;
    ableGroup: string;
    updateRect: boolean;
    canPinch: boolean;
    props: {
        readonly resizable: BooleanConstructor;
        readonly throttleResize: NumberConstructor;
        readonly renderDirections: ArrayConstructor;
        readonly keepRatio: BooleanConstructor;
    };
    events: {
        readonly onResizeStart: "resizeStart";
        readonly onResize: "resize";
        readonly onResizeEnd: "resizeEnd";
        readonly onResizeGroupStart: "resizeGroupStart";
        readonly onResizeGroup: "resizeGroup";
        readonly onResizeGroupEnd: "resizeGroupEnd";
    };
    render(moveable: MoveableManagerInterface<Partial<ResizableProps>>, React: Renderer): any[] | undefined;
    dragControlCondition: typeof directionCondition;
    dragControlStart(moveable: MoveableManagerInterface<ResizableProps & DraggableProps, SnappableState>, e: any): false | OnResizeStart;
    dragControl(moveable: MoveableManagerInterface<ResizableProps & DraggableProps & SnappableProps>, e: any): OnResize | undefined;
    dragControlAfter(moveable: MoveableManagerInterface<ResizableProps & DraggableProps>, e: any): true | undefined;
    dragControlEnd(moveable: MoveableManagerInterface<ResizableProps & DraggableProps>, e: any): any;
    dragGroupControlCondition: typeof directionCondition;
    dragGroupControlStart(moveable: MoveableGroupInterface<any, any>, e: any): false | OnResizeStart;
    dragGroupControl(moveable: MoveableGroupInterface<any, any>, e: any): OnResizeGroup | undefined;
    dragGroupControlEnd(moveable: MoveableGroupInterface<any, any>, e: any): any;
    request(moveable: MoveableManagerInterface<any>): {
        isControl: boolean;
        requestStart(e: IObject<any>): {
            datas: {};
            parentDirection: any;
        };
        request(e: IObject<any>): {
            datas: {};
            parentDist: number[];
        };
        requestEnd(): {
            datas: {};
            isDrag: boolean;
        };
    };
};
export default _default;
