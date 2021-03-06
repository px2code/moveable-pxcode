import { OnDragOriginStart, OnDragOrigin, MoveableManagerInterface, DraggableProps, OriginDraggableProps, MoveableGroupInterface } from "../types";
import { IObject } from "@daybrush/utils";
declare const _default: {
    name: string;
    props: {
        readonly originDraggable: BooleanConstructor;
        readonly originRelative: BooleanConstructor;
    };
    events: {
        readonly onDragOriginStart: "dragOriginStart";
        readonly onDragOrigin: "dragOrigin";
        readonly onDragOriginEnd: "dragOriginEnd";
    };
    css: string[];
    dragControlCondition(e: any): boolean;
    dragControlStart(moveable: MoveableManagerInterface<OriginDraggableProps & DraggableProps>, e: any): false | OnDragOriginStart;
    dragControl(moveable: MoveableManagerInterface<OriginDraggableProps & DraggableProps>, e: any): false | OnDragOrigin;
    dragControlEnd(moveable: MoveableManagerInterface<OriginDraggableProps>, e: any): boolean;
    dragGroupControlCondition(e: any): boolean;
    dragGroupControlStart(moveable: MoveableGroupInterface<OriginDraggableProps>, e: any): boolean;
    dragGroupControl(moveable: MoveableGroupInterface<OriginDraggableProps>, e: any): boolean;
    request(moveable: MoveableManagerInterface<any, any>): {
        isControl: boolean;
        requestStart(): {
            datas: {};
        };
        request(e: IObject<any>): {
            datas: {};
            distX: number;
            distY: number;
            distOrigin: number[];
        };
        requestEnd(): {
            datas: {};
            isDrag: boolean;
        };
    };
};
export default _default;
