import { IObject } from "@daybrush/utils";
import { RotatableProps, OnRotateGroup, Renderer, OnRotateStart, OnRotate, SnappableProps, SnappableState, MoveableManagerInterface, MoveableGroupInterface, DraggableProps } from "../types";
export declare function getReversePositionX(dir: string): string;
export declare function getReversePositionY(dir: string): string;
export declare function getRotationPositions(rotationPosition: RotatableProps["rotationPosition"], [pos1, pos2, pos3, pos4]: number[][], direction: number): readonly [number[], number] | undefined;
export declare function dragControlCondition(e: any, moveable: MoveableManagerInterface<RotatableProps>): boolean;
declare const _default: {
    name: string;
    canPinch: boolean;
    props: {
        readonly rotatable: BooleanConstructor;
        readonly rotationPosition: StringConstructor;
        readonly throttleRotate: NumberConstructor;
        readonly renderDirections: ObjectConstructor;
        readonly rotationTarget: ObjectConstructor;
    };
    events: {
        readonly onRotateStart: "rotateStart";
        readonly onRotate: "rotate";
        readonly onRotateEnd: "rotateEnd";
        readonly onRotateGroupStart: "rotateGroupStart";
        readonly onRotateGroup: "rotateGroup";
        readonly onRotateGroupEnd: "rotateGroupEnd";
    };
    css: string[];
    render(moveable: MoveableManagerInterface<RotatableProps>, React: Renderer): any;
    dragControlCondition: typeof dragControlCondition;
    dragControlStart(moveable: MoveableManagerInterface<RotatableProps & SnappableProps & DraggableProps, SnappableState>, e: any): false | OnRotateStart;
    dragControl(moveable: MoveableManagerInterface<RotatableProps & DraggableProps>, e: any): OnRotate | undefined;
    dragControlEnd(moveable: MoveableManagerInterface<RotatableProps>, e: any): any;
    dragGroupControlCondition: typeof dragControlCondition;
    dragGroupControlStart(moveable: MoveableGroupInterface<any, any>, e: any): false | OnRotateStart;
    dragGroupControl(moveable: MoveableGroupInterface<any, any>, e: any): OnRotateGroup | undefined;
    dragGroupControlEnd(moveable: MoveableGroupInterface<any, any>, e: any): any;
    request(moveable: MoveableManagerInterface<RotatableProps>): {
        isControl: boolean;
        requestStart(): {
            datas: {};
        };
        request(e: IObject<any>): {
            datas: {};
            parentDist: number;
        };
        requestEnd(): {
            datas: {};
            isDrag: boolean;
        };
    };
};
export default _default;
