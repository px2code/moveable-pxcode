import { DraggableProps, MoveableGroupInterface, MoveableManagerInterface } from "../types";
declare const _default: {
    readonly name: "edgeDraggable";
    readonly props: {
        readonly edgeDraggable: BooleanConstructor;
    };
    readonly events: {};
    readonly dragControlCondition: (e: any, moveable: MoveableManagerInterface<DraggableProps>) => boolean;
    readonly dragControlStart: (moveable: MoveableManagerInterface<DraggableProps>, e: any) => false | import("../types").OnDragStart;
    readonly dragControl: (moveable: MoveableManagerInterface<DraggableProps>, e: any) => import("../types").OnDrag | undefined;
    readonly dragControlEnd: (moveable: MoveableManagerInterface<DraggableProps, any>, e: any) => any;
    readonly dragGroupControlCondition: (e: any, moveable: MoveableGroupInterface<DraggableProps>) => boolean;
    readonly dragGroupControlStart: (moveable: MoveableGroupInterface<DraggableProps>, e: any) => false | import("../types").OnDragStart;
    readonly dragGroupControl: (moveable: MoveableGroupInterface<DraggableProps>, e: any) => import("../types").OnDragGroup | undefined;
    readonly dragGroupControlEnd: (moveable: MoveableGroupInterface<DraggableProps, any>, e: any) => any;
    readonly unset: (moveable: any) => void;
};
export default _default;
