import { Renderer, GroupableProps, DragAreaProps, MoveableManagerInterface, MoveableGroupInterface } from "../types";
declare const _default: {
    name: string;
    props: {
        readonly dragArea: BooleanConstructor;
        readonly passDragArea: BooleanConstructor;
    };
    events: {
        readonly onClick: "click";
        readonly onClickGroup: "clickGroup";
    };
    render(moveable: MoveableManagerInterface<GroupableProps>, React: Renderer): any[];
    dragStart(moveable: MoveableManagerInterface, { datas, clientX, clientY, inputEvent }: any): false | undefined;
    drag(moveable: MoveableManagerInterface, { datas, inputEvent }: any): false | undefined;
    dragEnd(moveable: MoveableManagerInterface<DragAreaProps>, e: any): false | undefined;
    dragGroupStart(moveable: MoveableGroupInterface, e: any): false | undefined;
    dragGroup(moveable: MoveableGroupInterface, e: any): false | undefined;
    dragGroupEnd(moveable: MoveableGroupInterface<DragAreaProps>, e: any): false | undefined;
    unset(moveable: MoveableManagerInterface<DragAreaProps>): void;
};
export default _default;
