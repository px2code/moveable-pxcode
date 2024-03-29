import * as React from "react";
import { Able, GroupableProps, IndividualGroupableProps, MoveableDefaultProps, MoveableInterface, MoveableManagerInterface } from "./types";
import MoveableManager from "./MoveableManager";
import MoveableGroup from "./MoveableGroup";
import { IObject } from "@daybrush/utils";
import MoveableIndividualGroup from "./MoveableIndividualGroup";
export declare class InitialMoveable<T = {}> extends React.PureComponent<MoveableDefaultProps & GroupableProps & IndividualGroupableProps & T> {
    static defaultAbles: Able[];
    static customStyledMap: Record<string, any>;
    static defaultStyled: any;
    static makeStyled(iframeSelector: string): void;
    static getTotalAbles(): Able[];
    moveable: MoveableManager | MoveableGroup | MoveableIndividualGroup;
    refTargets: Array<HTMLElement | SVGElement | string | undefined | null>;
    selectorMap: IObject<Array<HTMLElement | SVGElement>>;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateRefs(isReset?: boolean): void;
    getManager(): MoveableManagerInterface<any, any>;
}
export interface InitialMoveable<T = {}> extends React.PureComponent<MoveableDefaultProps & GroupableProps & IndividualGroupableProps & T>, MoveableInterface {
    setState(state: any, callback?: () => any): any;
}
