import { DraggableProps, OnDrag, OnDragGroup, OnDragStart, DraggableState, Renderer, MoveableManagerInterface, MoveableGroupInterface } from "../types";
import { IObject } from "@daybrush/utils";
declare const _default: {
    name: string;
    props: {
        readonly draggable: BooleanConstructor;
        readonly throttleDrag: NumberConstructor;
        readonly throttleDragRotate: NumberConstructor;
        readonly startDragRotate: NumberConstructor;
        readonly edgeDraggable: BooleanConstructor;
    };
    events: {
        readonly onDragStart: "dragStart";
        readonly onDrag: "drag";
        readonly onDragEnd: "dragEnd";
        readonly onDragGroupStart: "dragGroupStart";
        readonly onDragGroup: "dragGroup";
        readonly onDragGroupEnd: "dragGroupEnd";
    };
    render(moveable: MoveableManagerInterface<DraggableProps, DraggableState>, React: Renderer): any[];
    dragStart(moveable: MoveableManagerInterface<DraggableProps, any>, e: any): false | OnDragStart;
    drag(moveable: MoveableManagerInterface<DraggableProps, any>, e: any): OnDrag | undefined;
    dragEnd(moveable: MoveableManagerInterface<DraggableProps, DraggableState>, e: any): any;
    dragGroupStart(moveable: MoveableGroupInterface<any, any>, e: any): false | OnDragStart;
    dragGroup(moveable: MoveableGroupInterface<any, any>, e: any): OnDragGroup | undefined;
    dragGroupEnd(moveable: MoveableGroupInterface<any, any>, e: any): any;
    request(moveable: MoveableManagerInterface<any, any>): {
        isControl: boolean;
        requestStart(): {
            datas: {};
        };
        request(e: IObject<any>): {
            datas: {};
            distX: number;
            distY: number;
        };
        requestEnd(): {
            datas: {};
            isDrag: boolean;
        };
    };
    unset(moveable: any): void;
};
export default _default;
