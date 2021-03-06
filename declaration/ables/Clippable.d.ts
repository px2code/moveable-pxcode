import { Renderer, ClippableProps, ClippableState, MoveableManagerInterface } from "../types";
declare const _default: {
    name: string;
    props: {
        readonly clippable: BooleanConstructor;
        readonly defaultClipPath: StringConstructor;
        readonly customClipPath: StringConstructor;
        readonly clipRelative: BooleanConstructor;
        readonly clipArea: BooleanConstructor;
        readonly dragWithClip: BooleanConstructor;
        readonly clipTargetBounds: BooleanConstructor;
        readonly clipVerticalGuidelines: ArrayConstructor;
        readonly clipHorizontalGuidelines: ArrayConstructor;
        readonly clipSnapThreshold: BooleanConstructor;
    };
    events: {
        readonly onClipStart: "clipStart";
        readonly onClip: "clip";
        readonly onClipEnd: "clipEnd";
    };
    css: string[];
    render(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, React: Renderer): any[];
    dragControlCondition(e: any): boolean;
    dragStart(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): boolean;
    drag(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): boolean;
    dragEnd(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): any;
    dragControlStart(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): boolean;
    dragControl(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): boolean;
    dragControlEnd(moveable: MoveableManagerInterface<ClippableProps, ClippableState>, e: any): any;
    unset(moveable: MoveableManagerInterface<ClippableProps, ClippableState>): void;
};
export default _default;
