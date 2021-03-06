import { IObject } from "@daybrush/utils";
import Gesto, * as GestoTypes from "gesto";
import CustomGesto from "./gesto/CustomGesto";
import { MOVEABLE_EVENTS_MAP, MOVEABLE_PROPS_MAP } from "./ables/consts";
export interface MoveableClientRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    clientLeft?: number;
    clientTop?: number;
    clientWidth?: number;
    clientHeight?: number;
    scrollWidth?: number;
    scrollHeight?: number;
    overflow?: boolean;
}
export declare type MoveableManagerProps<T = {}> = {
    cssStyled: any;
    customStyledMap: Record<string, any>;
    wrapperMoveable?: MoveableManagerInterface | null;
    parentMoveable?: MoveableManagerInterface | null;
    parentPosition?: {
        left: number;
        top: number;
    } | null;
    groupable?: boolean;
} & MoveableDefaultOptions & (unknown extends T ? IObject<any> : T);
export declare type AnyObject<T> = (unknown extends T ? IObject<any> : T);
export interface DefaultOptions {
    target?: SVGElement | HTMLElement | null;
    dragTarget?: SVGElement | HTMLElement | null;
    container?: SVGElement | HTMLElement | null;
    portalContainer?: HTMLElement | null;
    rootContainer?: HTMLElement | null;
    zoom?: number;
    transformOrigin?: Array<string | number> | string | "";
    edge?: boolean;
    ables?: Able[];
    className?: string;
    iframeSelector: string;
    pinchThreshold?: number;
    pinchOutside?: boolean;
    triggerAblesSimultaneously?: boolean;
    checkInput?: boolean;
    cspNonce?: string;
    translateZ?: number | string;
    props?: Record<string, any>;
}
export interface MoveableDefaultOptions extends DefaultOptions, DragAreaOptions, OriginOptions, PaddingOptions {
}
export declare type MoveableManagerState<T = {}> = {
    container: SVGElement | HTMLElement | null | undefined;
    target: SVGElement | HTMLElement | null | undefined;
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    beforeMatrix: number[];
    allMatrix: number[];
    targetTransform: string;
    rootMatrix: number[];
    targetMatrix: number[];
    offsetMatrix: number[];
    is3d: boolean;
    transformOrigin: number[];
    targetOrigin: number[];
    beforeOrigin: number[];
    origin: number[];
    originalBeforeOrigin: number[];
    beforeDirection: number;
    direction: number;
    renderPoses: number[][];
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
    gesto: Gesto | CustomGesto | null;
    targetClientRect: MoveableClientRect;
    containerClientRect: MoveableClientRect;
    moveableClientRect: MoveableClientRect;
    rotation: number;
} & T;
export interface PaddingBox {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
export interface Renderer {
    createElement(type: any, props?: any, ...children: any[]): any;
}
export interface Guideline {
    type: "horizontal" | "vertical";
    element?: Element | null;
    center?: boolean;
    pos: number[];
    size: number;
    className?: string;
    sizes?: number[];
    gap?: number;
    gapGuidelines?: Guideline[];
}
export interface SnapBoundInfo {
    isBound: boolean;
    isSnap: boolean;
    offset: number;
    dist: number;
    snapIndex?: number;
    bounds?: BoundInfo[];
    snap?: SnapInfo;
}
export interface BoundInfo {
    isBound: boolean;
    offset: number;
    pos: number;
}
export interface SnapOffsetInfo {
    isSnap: boolean;
    offset: number;
    pos: number;
}
export interface SnapInfo {
    isSnap: boolean;
    index: number;
    posInfos: SnapPosInfo[];
}
export interface SnapPosInfo {
    pos: number;
    index: number;
    guidelineInfos: SnapGuidelineInfo[];
}
export interface SnapGuidelineInfo {
    dist: number;
    offset: number;
    guideline: Guideline;
}
export interface RenderGuidelineInfo {
    key?: string;
    direction: string;
    classNames: string[];
    size: string;
    pos: string[];
    sizeValue: number;
    posValue: number[];
    zoom: number;
}
export interface RenderGuidelineInnerInfo {
    key?: string;
    direction: string;
    classNames: Array<string | undefined>;
    size?: string;
    pos?: string[];
    sizeValue: number;
    posValue: number[];
    zoom: number;
}
export declare type ExcludeKeys<T extends IObject<any>, U> = Pick<T, Exclude<keyof T, U>>;
export interface MoveableProps extends MoveableDefaultProps, DraggableProps, DragAreaProps, OriginDraggableProps, RotatableProps, ResizableProps, ScalableProps, WarpableProps, PinchableProps, ExcludeKeys<GroupableProps, "targets" | "updateGroup">, IndividualGroupableProps, SnappableProps, ScrollableProps, ClippableProps, RoundableProps, BeforeRenderableProps, ClickableProps, RenderableProps {
}
export interface MoveableDefaultProps extends ExcludeKeys<MoveableDefaultOptions, "target"> {
    target?: MoveableRefType | ArrayFormat<MoveableRefType>;
}
export declare type MoveableRefType<T extends HTMLElement | SVGElement = HTMLElement | SVGElement> = string | (() => T) | MoveableRefObject<T> | T | null | undefined;
export interface MoveableRefObject<T extends HTMLElement | SVGElement = HTMLElement | SVGElement> {
    current: T | undefined | null;
}
export interface MoveableOptions extends MoveableDefaultProps, DraggableOptions, DragAreaOptions, OriginDraggableOptions, RotatableOptions, ResizableOptions, ScalableOptions, WarpableOptions, PinchableOptions, GroupableOptions, IndividualGroupableOptions, SnappableOptions, ScrollableOptions, ClippableOptions, RoundableOptions {
}
export declare type MoveableState = MoveableManagerState;
export interface Able<Props extends IObject<any> = IObject<any>, Events extends IObject<any> = IObject<any>> {
    name: string;
    props: {
        [key in keyof Props]: any;
    };
    events: {
        [key in keyof Events]: string;
    };
    always?: boolean;
    ableGroup?: string;
    updateRect?: boolean;
    canPinch?: boolean;
    css?: string[];
    unset?: (moveable: any) => any;
    render?: (moveable: any, renderer: Renderer) => any;
    dragStart?: (moveable: any, e: GestoTypes.OnDragStart) => any;
    drag?: (moveable: any, e: GestoTypes.OnDrag) => any;
    dragEnd?: (moveable: any, e: GestoTypes.OnDragEnd) => any;
    pinchStart?: (moveable: any, e: GestoTypes.OnPinchStart) => any;
    pinch?: (moveable: any, e: GestoTypes.OnPinch) => any;
    pinchEnd?: (moveable: any, e: GestoTypes.OnPinchEnd) => any;
    dragControlCondition?: (e: any, moveable: any) => boolean;
    dragControlStart?: (moveable: any, e: GestoTypes.OnDragStart) => any;
    dragControl?: (moveable: any, e: GestoTypes.OnDrag) => any;
    dragControlEnd?: (moveable: any, e: GestoTypes.OnDragEnd) => any;
    dragGroupCondition?: (e: any, moveable: any) => boolean;
    dragGroupStart?: (moveable: any, e: GestoTypes.OnDragStart) => any;
    dragGroup?: (moveable: any, e: GestoTypes.OnDrag) => any;
    dragGroupEnd?: (moveable: any, e: GestoTypes.OnDragEnd) => any;
    pinchGroupStart?: (moveable: any, e: GestoTypes.OnPinchStart) => any;
    pinchGroup?: (moveable: any, e: GestoTypes.OnPinch) => any;
    pinchGroupEnd?: (moveable: any, e: GestoTypes.OnPinchEnd) => any;
    dragGroupControlCondition?: (e: any, moveable: any) => boolean;
    dragGroupControlStart?: (moveable: any, e: GestoTypes.OnDragStart) => any;
    dragGroupControl?: (moveable: any, e: GestoTypes.OnDragStart) => any;
    dragGroupControlEnd?: (moveable: any, e: GestoTypes.OnDragEnd) => any;
    mouseEnter?: (e: any, moveable: any) => any;
    mouseLeave?: (e: any, moveable: any) => any;
    request?: (moveable: any) => AbleRequester;
}
export interface OnEvent {
    currentTarget: MoveableManagerInterface<any, any>;
    moveable: MoveableManagerInterface<any, any>;
    target: HTMLElement | SVGElement;
    clientX: number;
    clientY: number;
    datas: IObject<any>;
    inputEvent: any;
}
export interface OnEndEvent extends OnEvent {
    lastEvent: any | undefined;
    isDrag: boolean;
    isDouble: boolean;
}
export interface OnTransformStartEvent {
    setTransform(transform: string | string[], index?: number): void;
    setTransformIndex(transformIndex: number): void;
}
export interface OnTransformEvent {
    transform: string;
    drag: OnDrag;
}
export interface AbleRequestParam {
    isInstant?: boolean;
    [key: string]: any;
}
export interface Requester {
    request(param: IObject<any>): this;
    requestEnd(): this;
}
export interface AbleRequester {
    isControl: boolean;
    requestStart(param: IObject<any>): IObject<any>;
    request(param: IObject<any>): IObject<any>;
    requestEnd(): IObject<any>;
}
export interface OnPinchStart extends OnEvent {
}
export interface OnPinch extends OnEvent {
}
export interface OnPinchEnd extends OnEndEvent {
}
export interface OnDragStart extends OnEvent, OnTransformStartEvent {
    set: (translate: number[]) => void;
}
export interface OnDrag extends OnEvent {
    beforeDelta: number[];
    beforeDist: number[];
    beforeTranslate: number[];
    delta: number[];
    dist: number[];
    translate: number[];
    transform: string;
    left: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
    right: number;
    isPinch: boolean;
}
export interface OnDragEnd extends OnEndEvent {
}
export interface OnDragOriginStart extends OnEvent {
    dragStart: OnDragStart | false;
}
export interface OnDragOrigin extends OnEvent {
    width: number;
    height: number;
    delta: number[];
    dist: number[];
    origin: number[];
    transformOrigin: string;
    drag: OnDrag;
}
export interface OnDragOriginEnd extends OnEndEvent {
}
export interface OnRoundStart extends OnEvent {
}
export interface OnRound extends OnEvent {
    width: number;
    height: number;
    delta: number[];
    dist: number[];
    horizontals: number[];
    verticals: number[];
    borderRadius: string;
}
export interface OnRoundEnd extends OnEndEvent {
}
export interface OnScaleStart extends OnEvent, OnTransformStartEvent {
    direction: number[];
    dragStart: OnDragStart | false;
    set: (scale: number[]) => void;
    setFixedDirection: (fixedDirection: number[]) => void;
    setRatio: (ratio: number) => any;
}
export interface OnScale extends OnEvent, OnTransformEvent {
    direction: number[];
    offsetWidth: number;
    offsetHeight: number;
    scale: number[];
    dist: number[];
    delta: number[];
    isPinch: boolean;
}
export interface OnScaleEnd extends OnEndEvent {
}
export interface OnResizeStart extends OnEvent {
    direction: number[];
    dragStart: OnDragStart | false;
    set: (size: number[]) => any;
    setMin: (minSize: number[]) => any;
    setMax: (maxSize: number[]) => any;
    setOrigin: (origin: Array<string | number>) => any;
    setFixedDirection: (startDirecition: number[]) => any;
    setRatio: (ratio: number) => any;
}
export interface OnResize extends OnEvent {
    direction: number[];
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
    dist: number[];
    delta: number[];
    isPinch: boolean;
    drag: OnDrag;
}
export interface OnResizeEnd extends OnEndEvent {
}
export interface OnRotateStart extends OnEvent, OnTransformStartEvent {
    set: (rotate: number) => void;
    dragStart: OnDragStart | false;
}
export interface OnRotate extends OnEvent {
    beforeDist: number;
    beforeDelta: number;
    beforeRotate: number;
    dist: number;
    delta: number;
    rotate: number;
    absoluteDist: number;
    absoluteDelta: number;
    absoluteRotate: number;
    transform: string;
    isPinch: boolean;
    drag: OnDrag;
}
export interface OnRotateEnd extends OnEndEvent {
}
export interface OnWarpStart extends OnEvent, OnTransformStartEvent {
    set: (matrix: number[]) => any;
}
export interface OnWarp extends OnEvent {
    transform: string;
    delta: number[];
    dist: number[];
    matrix: number[];
    multiply: (matrix1: number[], matrix2: number[], n?: number) => number[];
}
export interface OnWarpEnd extends OnEndEvent {
}
export interface OnDragGroupStart extends OnDragStart {
    targets: Array<HTMLElement | SVGElement>;
    events: OnDragStart[];
}
export interface OnDragGroup extends OnDrag {
    targets: Array<HTMLElement | SVGElement>;
    events: OnDrag[];
}
export interface OnDragGroupEnd extends OnDragEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnRotateGroupStart extends OnRotateStart {
    targets: Array<HTMLElement | SVGElement>;
    events: Array<OnRotateStart & {
        dragStart: OnDragStart | false;
    }>;
}
export interface OnRotateGroup extends OnRotate {
    targets: Array<HTMLElement | SVGElement>;
    events: Array<OnRotate & {
        drag: OnDrag;
    }>;
    set: (rotation: number) => any;
}
export interface OnRotateGroupEnd extends OnRotateEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnResizeGroupStart extends OnResizeStart {
    targets: Array<HTMLElement | SVGElement>;
    events: OnResizeStart[];
}
export interface OnResizeGroup extends OnResize {
    targets: Array<HTMLElement | SVGElement>;
    events: Array<OnResize & {
        drag: OnDrag;
    }>;
}
export interface OnResizeGroupEnd extends OnResizeEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnScaleGroupStart extends OnScaleStart {
    targets: Array<HTMLElement | SVGElement>;
    events: OnScaleStart[];
}
export interface OnScaleGroup extends OnScale {
    targets: Array<HTMLElement | SVGElement>;
    events: OnScale[];
}
export interface OnScaleGroupEnd extends OnScaleEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnPinchGroupStart extends OnPinchStart {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnPinchGroup extends OnPinch {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnPinchGroupEnd extends OnPinchEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnClick extends OnEvent {
    inputTarget: Element;
    isTarget: boolean;
    containsTarget: boolean;
    isDouble: boolean;
}
export interface OnClickGroup extends OnEvent {
    targets: Element[];
    inputTarget: Element;
    isTarget: boolean;
    containsTarget: boolean;
    targetIndex: number;
    isDouble: boolean;
}
export interface OnBeforeRenderStart extends OnEvent {
    isPinch: boolean;
    setTransform(transform: string | string[]): any;
}
export interface OnBeforeRender extends OnEvent {
    isPinch: boolean;
}
export interface OnBeforeRenderEnd extends OnEvent {
    isPinch: boolean;
    isDrag: boolean;
}
export interface OnBeforeRenderGroupStart extends OnBeforeRenderStart {
    targets: Array<HTMLElement | SVGElement>;
    events: OnBeforeRenderStart[];
}
export interface OnBeforeRenderGroup extends OnBeforeRender {
    targets: Array<HTMLElement | SVGElement>;
    events: OnBeforeRender[];
}
export interface OnBeforeRenderGroupEnd extends OnBeforeRenderEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnRenderStart extends OnEvent {
    isPinch: boolean;
}
export interface OnRender extends OnEvent {
    isPinch: boolean;
}
export interface OnRenderEnd extends OnEvent {
    isPinch: boolean;
    isDrag: boolean;
}
export declare type EventInterface<T extends IObject<any> = {}> = {
    [key in keyof T]?: (e: T[key]) => any;
};
export interface OnScroll extends OnEvent {
    scrollContainer: HTMLElement;
    direction: number[];
}
export interface OnScrollGroup extends OnScroll {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnRenderGroupStart extends OnRenderStart {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnRenderGroup extends OnRender {
    targets: Array<HTMLElement | SVGElement>;
}
export interface OnRenderGroupEnd extends OnRenderEnd {
    targets: Array<HTMLElement | SVGElement>;
}
export interface DraggableOptions {
    draggable?: boolean;
    throttleDrag?: number;
    throttleDragRotate?: number;
    startDragRotate?: number;
    edgeDraggable?: boolean;
}
export interface DraggableEvents {
    onDragStart: OnDragStart;
    onDrag: OnDrag;
    onDragEnd: OnDragEnd;
    onDragGroupStart: OnDragGroupStart;
    onDragGroup: OnDragGroup;
    onDragGroupEnd: OnDragGroupEnd;
}
export interface DraggableProps extends DraggableOptions, EventInterface<DraggableEvents> {
}
export interface DraggableState {
    dragInfo: {
        startRect: RectInfo;
        dist: number[];
    } | null;
}
export interface PaddingOptions {
    padding?: PaddingBox;
}
export interface OriginOptions {
    origin?: boolean;
}
export interface OriginDraggableOptions {
    originDraggable?: boolean;
    originRelative?: boolean;
}
export interface OriginDraggableEvents {
    onDragOriginStart: OnDragOriginStart;
    onDragOrigin: OnDragOrigin;
    onDragOriginEnd: OnDragOriginEnd;
}
export interface OriginDraggableProps extends OriginDraggableOptions, EventInterface<OriginDraggableEvents> {
}
export interface RoundableOptions {
    roundable?: boolean;
    roundRelative?: boolean;
    minRoundControls?: number[];
    maxRoundControls?: number[];
    roundClickable?: boolean;
}
export interface RoundableEvents {
    onRoundStart: OnRoundStart;
    onRound: OnRound;
    onRoundEnd: OnRoundEnd;
}
export interface RoundableProps extends RoundableOptions, EventInterface<RoundableEvents> {
}
export interface RoundableState {
    borderRadiusState?: string;
}
export interface ResizableOptions extends RenderDirections {
    resizable?: boolean;
    throttleResize?: number;
    keepRatio?: boolean;
}
export interface ResizableEvents {
    onResizeStart: OnResizeStart;
    onResize: OnResize;
    onResizeEnd: OnResizeEnd;
    onResizeGroupStart: OnResizeGroupStart;
    onResizeGroup: OnResizeGroup;
    onResizeGroupEnd: OnResizeGroupEnd;
}
export interface ResizableProps extends ResizableOptions, EventInterface<ResizableEvents> {
}
export interface ScalableOptions extends RenderDirections {
    scalable?: boolean;
    throttleScale?: number;
    keepRatio?: boolean;
}
export interface ScalableEvents {
    onScaleStart: OnScaleStart;
    onScale: OnScale;
    onScaleEnd: OnScaleEnd;
    onScaleGroupStart: OnScaleGroupStart;
    onScaleGroup: OnScaleGroup;
    onScaleGroupEnd: OnScaleGroupEnd;
}
export interface ScalableProps extends ScalableOptions, EventInterface<ScalableEvents> {
}
export interface GapGuideline extends Guideline {
    renderPos: number[];
}
export interface RenderDirections {
    renderDirections?: boolean | string[];
}
export interface RotatableOptions extends RenderDirections {
    rotatable?: boolean;
    rotationPosition?: "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "left-top" | "left-bottom" | "right-top" | "right-bottom" | "none";
    throttleRotate?: number;
    rotationTarget?: MoveableRefType | ArrayFormat<MoveableRefType> | false;
}
export interface RotatableEvents {
    onRotateStart: OnRotateStart;
    onRotate: OnRotate;
    onRotateEnd: OnRotateEnd;
    onRotateGroupStart: OnRotateGroupStart;
    onRotateGroup: OnRotateGroup;
    onRotateGroupEnd: OnRotateGroupEnd;
}
export interface RotatableProps extends RotatableOptions, EventInterface<RotatableEvents> {
}
export interface WarpableOptions {
    warpable?: boolean;
    renderDirections?: boolean | string[];
}
export interface WarpableEvents {
    onWarpStart: OnWarpStart;
    onWarp: OnWarp;
    onWarpEnd: OnWarpEnd;
}
export interface WarpableProps extends WarpableOptions, EventInterface<WarpableEvents> {
}
export interface PinchableOptions {
    pinchable?: boolean | Array<"rotatable" | "resizable" | "scalable">;
}
export interface PinchableEvents {
    onPinchStart: OnPinchStart;
    onPinch: OnPinch;
    onPinchEnd: OnPinchEnd;
    onPinchGroupStart: OnPinchGroupStart;
    onPinchGroup: OnPinchGroup;
    onPinchGroupEnd: OnPinchGroupEnd;
}
export interface PinchableProps extends PinchableOptions, ResizableProps, ScalableProps, RotatableProps, EventInterface<PinchableEvents> {
}
export interface GroupableOptions {
    defaultGroupRotate?: number;
    defaultGroupOrigin?: string;
    groupable?: boolean;
}
export interface IndividualGroupableOptions {
    individualGroupable?: boolean;
}
export interface IndividualGroupableProps extends IndividualGroupableOptions {
}
export interface GroupableProps extends GroupableOptions {
    targets?: Array<HTMLElement | SVGElement>;
    updateGroup?: boolean;
}
export interface SnappableOptions {
    snappable?: boolean | string[];
    snapCenter?: boolean;
    snapHorizontal?: boolean;
    snapVertical?: boolean;
    snapElement?: boolean;
    snapGap?: boolean;
    snapThreshold?: number;
    snapDigit?: number;
    isDisplaySnapDigit?: boolean;
    horizontalGuidelines?: number[];
    verticalGuidelines?: number[];
    elementGuidelines?: Array<ElementGuidelineValue | Element>;
    bounds?: BoundType;
    innerBounds?: InnerBoundType;
    snapDistFormat?: (distance: number) => number | string;
}
export interface ElementGuidelineValue {
    element: Element;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    refresh?: boolean;
    className?: string;
}
export interface SnappableEvents {
    onSnap: OnSnap;
}
export interface SnappableProps extends SnappableOptions, EventInterface<SnappableEvents> {
    onSnap?: (e: OnSnap) => any;
}
export interface OnSnap {
    guidelines: Guideline[];
    elements: Guideline[][];
    gaps: GapGuideline[];
}
export interface InnerBoundType {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface BoundType {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
export interface SnappableState {
    staticGuidelines: Guideline[];
    elementGuidelineValues: ElementGuidelineValue[];
    guidelines: Guideline[];
    snapRenderInfo?: SnapRenderInfo | null;
    enableSnap: boolean;
}
export interface SnapRenderInfo {
    direction?: number[];
    snap?: boolean;
    center?: boolean;
    request?: boolean;
    externalPoses?: number[][];
    externalBounds?: BoundType | false | null;
}
export interface ScrollableOptions {
    scrollable?: boolean;
    scrollContainer?: MoveableRefType<HTMLElement>;
    scrollThreshold?: number;
    getScrollPosition?: (e: {
        scrollContainer: HTMLElement;
        direction: number[];
    }) => number[];
}
export interface ScrollableEvents {
    onScroll: OnScroll;
    onScrollGroup: OnScrollGroup;
}
export interface ScrollableProps extends ScrollableOptions, EventInterface<ScrollableEvents> {
}
export interface DragAreaOptions {
    dragArea?: boolean;
    passDragArea?: boolean;
}
export interface DragAreaProps extends DragAreaOptions {
}
export interface ClickableEvents {
    onClick: OnClick;
    onClickGroup: OnClickGroup;
}
export interface ArrayFormat<T = any> {
    length: number;
    [key: number]: T;
}
export interface ClickableProps extends EventInterface<ClickableEvents> {
}
export interface BeforeRenderableEvents {
    onBeforeRenderStart: OnBeforeRenderStart;
    onBeforeRender: OnBeforeRender;
    onBeforeRenderEnd: OnBeforeRenderEnd;
    onBeforeRenderGroupStart: OnBeforeRenderGroupStart;
    onBeforeRenderGroup: OnBeforeRenderGroup;
    onBeforeRenderGroupEnd: OnBeforeRenderGroupEnd;
}
export interface BeforeRenderableProps extends EventInterface<BeforeRenderableEvents> {
}
export interface RenderableEvents {
    onRenderStart: OnRenderStart;
    onRender: OnRender;
    onRenderEnd: OnRenderEnd;
    onRenderGroupStart: OnRenderGroupStart;
    onRenderGroup: OnRenderGroup;
    onRenderGroupEnd: OnRenderGroupEnd;
}
export interface RenderableProps extends EventInterface<RenderableEvents> {
}
export interface ClippableOptions {
    clippable?: boolean;
    customClipPath?: string;
    defaultClipPath?: string;
    clipRelative?: boolean;
    dragWithClip?: boolean;
    clipArea?: boolean;
    clipTargetBounds?: boolean;
    clipVerticalGuidelines?: Array<string | number>;
    clipHorizontalGuidelines?: Array<string | number>;
    clipSnapThreshold?: number;
}
export interface ClippableEvents {
    onClipStart: OnClipStart;
    onClip: OnClip;
    onClipEnd: OnClipEnd;
}
export interface ClippableProps extends ClippableOptions, EventInterface<ClippableEvents> {
}
export interface ClippableState {
    clipPathState?: string;
    snapBoundInfos?: {
        vertical: Required<SnapBoundInfo>;
        horizontal: Required<SnapBoundInfo>;
    } | null;
}
export interface OnClipStart extends OnEvent {
    clipType: "polygon" | "circle" | "ellipse" | "inset" | "rect";
    poses: number[][];
    clipStyle: string;
}
export interface OnClip extends OnEvent {
    clipType: "polygon" | "circle" | "ellipse" | "inset" | "rect";
    clipEventType: "added" | "changed" | "removed";
    poses: number[][];
    distX: number;
    distY: number;
    clipStyle: string;
    clipStyles: string[];
}
export interface OnClipEnd extends OnEndEvent {
}
export interface OnCustomDrag extends GestoTypes.Position {
    type: string;
    inputEvent: any;
    isDrag: boolean;
    datas: IObject<any>;
    originalDatas: IObject<any>;
    parentEvent: boolean;
    parentGesto: CustomGesto;
}
export interface RectInfo {
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
    left: number;
    top: number;
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
    origin: number[];
    beforeOrigin: number[];
    transformOrigin: number[];
    rotation: number;
    children?: RectInfo[];
}
export interface HitRect {
    top: number;
    left: number;
    width?: number;
    height?: number;
}
export interface MoveableManagerInterface<T = {}, U = {}> extends MoveableInterface {
    moveables?: MoveableManagerInterface[];
    props: MoveableManagerProps<T>;
    state: MoveableManagerState<U>;
    rotation: number;
    scale: number[];
    controlGesto: Gesto;
    targetGesto: Gesto;
    enabledAbles: Able[];
    controlAbles: Able[];
    targetAbles: Able[];
    areaElement: HTMLElement;
    controlBox: {
        getElement(): HTMLElement;
    };
    isUnmounted: boolean;
    useCSS(tag: string, css: string): any;
    getContainer(): HTMLElement | SVGElement;
    getRotation(): number;
    forceUpdate(): any;
}
export interface MoveableGroupInterface<T = {}, U = {}> extends MoveableManagerInterface<T, U> {
    moveables: MoveableManagerInterface[];
    props: MoveableManagerProps<T> & {
        targets: Array<HTMLElement | SVGElement>;
    };
    transformOrigin: string;
}
export interface MoveableInterface {
    getManager(): MoveableManagerInterface<any, any>;
    getRect(): RectInfo;
    isMoveableElement(target: Element): boolean;
    updateRect(type?: "Start" | "" | "End", isTarget?: boolean, isSetState?: boolean): void;
    updateTarget(): void;
    request(ableName: string, params?: IObject<any>, isInstant?: boolean): Requester;
    destroy(): void;
    dragStart(e: MouseEvent | TouchEvent): void;
    isInside(clientX: number, clientY: number): boolean;
    isDragging(): boolean;
    hitTest(el: Element | HitRect): number;
    setState(state: any, callback?: () => any): any;
}
export interface ControlPose {
    vertical: number;
    horizontal: number;
    pos: number[];
    sub?: boolean;
    raw?: number;
    direction?: "n" | "e" | "s" | "w" | "nw" | "ne" | "sw" | "se" | "nesw";
}
export declare type AnyProps<T extends IObject<any>> = Required<{
    [key in keyof T]: any;
}>;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export declare type MoveableEvents = {
    [key in keyof typeof MOVEABLE_EVENTS_MAP]: Parameters<Required<MoveableProps>[typeof MOVEABLE_EVENTS_MAP[key]]>[0];
};
export declare type MoveableProperties = {
    -readonly [key in keyof typeof MOVEABLE_PROPS_MAP]: MoveableProps[key];
};
export interface SnappableRenderType {
    type: "snap" | "bounds";
    pos: number;
}
