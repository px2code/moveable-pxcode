import { Able, MoveableGroupInterface, MoveableManagerInterface } from "./types";
export declare function fillChildEvents(moveable: MoveableGroupInterface, name: string, e: any): any[];
export declare function triggerChildGesto(moveable: MoveableGroupInterface<any, any>, able: Able, type: string, delta: number[], e: any, isConvert: boolean): any[];
export declare function triggerChildAble<T extends Able>(moveable: MoveableGroupInterface<any, any>, able: T, type: keyof T & string, e: any, eachEvent?: (movebale: MoveableManagerInterface<any, any>, ev: any) => any, callback?: (moveable: MoveableManagerInterface<any, any>, ev: any, result: any, index: number) => any): any[];
