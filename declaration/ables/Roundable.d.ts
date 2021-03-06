import { Renderer, RoundableProps, RoundableState, MoveableManagerInterface } from "../types";
declare const _default: {
    name: string;
    props: {
        readonly roundable: BooleanConstructor;
        readonly roundRelative: BooleanConstructor;
        readonly minRoundControls: ArrayConstructor;
        readonly maxRoundControls: ArrayConstructor;
        readonly roundClickable: BooleanConstructor;
    };
    events: {
        readonly onRoundStart: "roundStart";
        readonly onRound: "round";
        readonly onRoundEnd: "roundEnd";
    };
    css: string[];
    render(moveable: MoveableManagerInterface<RoundableProps, RoundableState>, React: Renderer): any;
    dragControlCondition(e: any): boolean;
    dragControlStart(moveable: MoveableManagerInterface<RoundableProps, RoundableState>, e: any): boolean;
    dragControl(moveable: MoveableManagerInterface<RoundableProps, RoundableState>, e: any): boolean;
    dragControlEnd(moveable: MoveableManagerInterface<RoundableProps, RoundableState>, e: any): boolean;
    unset(moveable: MoveableManagerInterface<RoundableProps, RoundableState>): void;
};
export default _default;
