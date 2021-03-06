import getAgent from "@egjs/agent";
import { IObject } from "@daybrush/utils";
import { MoveableInterface } from "./types";

function getSVGCursor(scale: number, degree: number) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * scale}px" height="${32 * scale}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${degree}deg);transform-origin: 16px 16px"></path></svg>`;
}

function getCursorCSS(degree: number) {
  const x1 = getSVGCursor(1, degree);
  const x2 = getSVGCursor(2, degree);
  const degree45 = (Math.round(degree / 45) * 45) % 180;
  let defaultCursor = "ns-resize";

  if (degree45 === 135) {
    defaultCursor = "nwse-resize";
  } else if (degree45 === 45) {
    defaultCursor = "nesw-resize";
  } else if (degree45 === 90) {
    defaultCursor = "ew-resize";
  }

  // tslint:disable-next-line: max-line-length
  return `cursor:${defaultCursor};cursor: url('${x1}') 16 16, ${defaultCursor};cursor: -webkit-image-set(url('${x1}') 1x, url('${x2}') 2x) 16 16, ${defaultCursor};`;
}

export const agent = getAgent();
export const IS_WEBKIT = agent.browser.webkit;
export const IS_WEBKIT605 = IS_WEBKIT && (() => {
  const res = /applewebkit\/([^\s]+)/g.exec(navigator.userAgent.toLowerCase());

  return res ? parseFloat(res[1]) < 605 : false;
})();
export const PREFIX = "moveable-";
export const MOVEABLE_CSS = `
{
	position: absolute;
	width: 1px;
	height: 1px;
	left: 0;
	top: 0;
    z-index: 3000;
    --moveable-color: #d66;
    --zoom: 1;
    --zoompx: 1px;
    will-change: transform;
}
.control-box {
    z-index: 0;
}
.line, .control {
    position: absolute;
	left: 0;
    top: 0;
    will-change: transform;
}
.control {
	width: 10px;
	height: 10px;
	box-sizing: border-box;
    background: #fff;
	margin-top: -5px;
    margin-left: -5px;
    border: 2px solid var(--moveable-color);
    z-index: 10;
}
.padding {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100px;
    height: 100px;
    transform-origin: 0 0;
}
.line {
	width: 1px;
    height: 1px;
    background: #d66;
    background: var(--moveable-color);
	transform-origin: 0px 50%;
}
.line.dashed {
    box-sizing: border-box;
    background: transparent;
}
.line.dashed.horizontal {
    border-top: 1px dashed #d66;
    border-top-color: #d66;
    border-top-color: var(--moveable-color);
}
.line.dashed.vertical {
    border-left: 1px dashed #d66;
    border-left-color: #d66;
    border-left-color: var(--moveable-color);
}
.line.vertical {
    transform: translateX(-50%);
}
.line.horizontal {
    transform: translateY(-50%);
}
.line.vertical.bold {
    width: 2px;
}
.line.horizontal.bold {
    height: 2px;
}

.control.origin {
	border-color: #f55;
	background: #fff;
	width: 12px;
	height: 12px;
	margin-top: -6px;
  margin-left: -6px;
  border-radius: 6px;
	pointer-events: none;
}
${[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(degree => `
.direction[data-rotation="${degree}"] {
	${getCursorCSS(degree)}
}
`).join("\n")}
.group {
    z-index: -1;
}
.area {
    position: absolute;
}
.area-pieces {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
}
.area.avoid, .area.pass {
    pointer-events: none;
}
.area.avoid+.area-pieces {
    display: block;
}
.area-piece {
    position: absolute;
}

${IS_WEBKIT605 ? `:global svg *:before {
	content:"";
	transform-origin: inherit;
}` : ""}
`;
export const DRAGGER_EVENTS = ["dragstart", "drag", "dragend", "pinchstart", "pinch", "pinchend"];

export const NEARBY_POS = [
  [0, 1, 2],
  [1, 0, 3],
  [2, 0, 3],
  [3, 1, 2],
];

export const TINY_NUM = 0.0000001;
export const MIN_SCALE = 0.000000001;
export const MAX_NUM = Math.pow(10, 10);
export const MIN_NUM = -MAX_NUM;

export const DIRECTIONS = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];

export const DIRECTION_INDEXES: IObject<number[]> = {
  n: [0, 1],
  s: [2, 3],
  w: [2, 0],
  e: [1, 3],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3],
};
export const DIRECTION_ROTATIONS: IObject<number> = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135,
};

export const MOVEABLE_METHODS: Array<keyof MoveableInterface> = [
  "isMoveableElement",
  "updateRect",
  "updateTarget",
  "destroy",
  "dragStart",
  "isInside",
  "hitTest",
  "setState",
  "getRect",
  "request",
  "isDragging",
  "getManager",
];
