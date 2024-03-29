/*
Copyright (c) 2019 Daybrush
name: react-moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/react-moveable
version: 0.27.5
*/
import getAgent from '@egjs/agent';
import { prefixNames, ref, refs, withMethods, prefixCSS } from 'framework-utils';
import { getShapeDirection, getRad, document, hasClass, isUndefined, isObject, isString, isFunction, isArray, splitBracket, splitUnit, splitSpace, average, find, findIndex, convertUnitSize, calculateBoundSize, getDist as getDist$1, dot, addClass, removeClass, splitComma, getKeys } from '@daybrush/utils';
import { plus, calculate, convertPositionMatrix, convertMatrixtoCSS, invert, createIdentityMatrix, multiplies, createOriginMatrix, minus, convertDimension, multiply, ignoreDimension, getOrigin, convertCSStoMatrix, createScaleMatrix, fromTranslation, rotate, createRotateMatrix, createWarpMatrix } from '@scena/matrix';
import { toMat, parse, parseMat } from 'css-to-mat';
import { getMinMaxs, fitPoints, getOverlapSize, getAreaSize, isInside } from 'overlap-area';
import ChildrenDiffer, { diff } from '@egjs/children-differ';
import DragScroll from '@scena/dragscroll';
import { createElement, PureComponent } from 'react';
import Gesto from 'gesto';
import styled from 'react-css-styled';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function getSVGCursor(scale, degree) {
  return "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + 32 * scale + "px\" height=\"" + 32 * scale + "px\" viewBox=\"0 0 32 32\" ><path d=\"M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z\" stroke-linejoin=\"round\" stroke-width=\"1.2\" fill=\"black\" stroke=\"white\" style=\"transform:rotate(" + degree + "deg);transform-origin: 16px 16px\"></path></svg>";
}

function getCursorCSS(degree) {
  var x1 = getSVGCursor(1, degree);
  var x2 = getSVGCursor(2, degree);
  var degree45 = Math.round(degree / 45) * 45 % 180;
  var defaultCursor = "ns-resize";

  if (degree45 === 135) {
    defaultCursor = "nwse-resize";
  } else if (degree45 === 45) {
    defaultCursor = "nesw-resize";
  } else if (degree45 === 90) {
    defaultCursor = "ew-resize";
  } // tslint:disable-next-line: max-line-length


  return "cursor:" + defaultCursor + ";cursor: url('" + x1 + "') 16 16, " + defaultCursor + ";cursor: -webkit-image-set(url('" + x1 + "') 1x, url('" + x2 + "') 2x) 16 16, " + defaultCursor + ";";
}

var agent = getAgent();
var IS_WEBKIT = agent.browser.webkit;
var IS_WEBKIT605 = IS_WEBKIT && function () {
  var res = /applewebkit\/([^\s]+)/g.exec(navigator.userAgent.toLowerCase());
  return res ? parseFloat(res[1]) < 605 : false;
}();
var PREFIX = "moveable-";
var MOVEABLE_CSS = "\n{\n\tposition: absolute;\n\twidth: 1px;\n\theight: 1px;\n\tleft: 0;\n\ttop: 0;\n    z-index: 3000;\n    --moveable-color: #d66;\n    --zoom: 1;\n    --zoompx: 1px;\n    will-change: transform;\n}\n.control-box {\n    z-index: 0;\n}\n.line, .control {\n    position: absolute;\n\tleft: 0;\n    top: 0;\n    will-change: transform;\n}\n.control {\n\twidth: 10px;\n\theight: 10px;\n\tbox-sizing: border-box;\n    background: #fff;\n\tmargin-top: -5px;\n    margin-left: -5px;\n    border: 2px solid var(--moveable-color);\n    z-index: 10;\n}\n.padding {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100px;\n    height: 100px;\n    transform-origin: 0 0;\n}\n.line {\n\twidth: 1px;\n    height: 1px;\n    background: #d66;\n    background: var(--moveable-color);\n\ttransform-origin: 0px 50%;\n}\n.line.dashed {\n    box-sizing: border-box;\n    background: transparent;\n}\n.line.dashed.horizontal {\n    border-top: 1px dashed #d66;\n    border-top-color: #d66;\n    border-top-color: var(--moveable-color);\n}\n.line.dashed.vertical {\n    border-left: 1px dashed #d66;\n    border-left-color: #d66;\n    border-left-color: var(--moveable-color);\n}\n.line.vertical {\n    transform: translateX(-50%);\n}\n.line.horizontal {\n    transform: translateY(-50%);\n}\n.line.vertical.bold {\n    width: 2px;\n}\n.line.horizontal.bold {\n    height: 2px;\n}\n\n.control.origin {\n\tborder-color: #f55;\n\tbackground: #fff;\n\twidth: 12px;\n\theight: 12px;\n\tmargin-top: -6px;\n  margin-left: -6px;\n  border-radius: 6px;\n\tpointer-events: none;\n}\n" + [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(function (degree) {
  return "\n.direction[data-rotation=\"" + degree + "\"] {\n\t" + getCursorCSS(degree) + "\n}\n";
}).join("\n") + "\n.group {\n    z-index: -1;\n}\n.area {\n    position: absolute;\n}\n.area-pieces {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: none;\n}\n.area.avoid, .area.pass {\n    pointer-events: none;\n}\n.area.avoid+.area-pieces {\n    display: block;\n}\n.area-piece {\n    position: absolute;\n}\n\n" + (IS_WEBKIT605 ? ":global svg *:before {\n\tcontent:\"\";\n\ttransform-origin: inherit;\n}" : "") + "\n";
var NEARBY_POS = [[0, 1, 2], [1, 0, 3], [2, 0, 3], [3, 1, 2]];
var TINY_NUM = 0.0000001;
var MIN_SCALE = 0.000000001;
var MAX_NUM = Math.pow(10, 10);
var MIN_NUM = -MAX_NUM;
var DIRECTIONS = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
var DIRECTION_INDEXES = {
  n: [0, 1],
  s: [2, 3],
  w: [2, 0],
  e: [1, 3],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3]
};
var DIRECTION_ROTATIONS = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135
};
var MOVEABLE_METHODS = ["isMoveableElement", "updateRect", "updateTarget", "destroy", "dragStart", "isInside", "hitTest", "setState", "getRect", "request", "isDragging", "getManager"];

function multiply2(pos1, pos2) {
  return [pos1[0] * pos2[0], pos1[1] * pos2[1]];
}
function prefix() {
  var classNames = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    classNames[_i] = arguments[_i];
  }

  return prefixNames.apply(void 0, __spreadArrays([PREFIX], classNames));
}
function getTransformMatrix(transform) {
  if (!transform || transform === "none") {
    return [1, 0, 0, 1, 0, 0];
  }

  if (isObject(transform)) {
    return transform;
  }

  var value = splitBracket(transform).value;
  return value.split(/s*,\s*/g).map(function (v) {
    return parseFloat(v);
  });
}
function getAbsoluteMatrix(matrix, n, origin) {
  return multiplies(n, createOriginMatrix(origin, n), matrix, createOriginMatrix(origin.map(function (a) {
    return -a;
  }), n));
}
function measureSVGSize(el, unit, isHorizontal) {
  if (unit === "%") {
    var viewBox = getSVGViewBox(el.ownerSVGElement);
    return viewBox[isHorizontal ? "width" : "height"] / 100;
  }

  return 1;
}
function getBeforeTransformOrigin(el, iframeSelector) {
  var relativeOrigin = getTransformOrigin(getComputedStyle$1(el, ":before", iframeSelector));
  return relativeOrigin.map(function (o, i) {
    var _a = splitUnit(o),
        value = _a.value,
        unit = _a.unit;

    return value * measureSVGSize(el, unit, i === 0);
  });
}
function getTransformOrigin(style) {
  var transformOrigin = style.transformOrigin;
  return transformOrigin ? transformOrigin.split(" ") : ["0", "0"];
}
function getOffsetInfo(el, lastParent, iframeSelector, isParent) {
  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentDocument = iframe ? iframe.contentDocument : document;
  var body = contentDocument.body;
  var target = !el || isParent ? el : el.parentElement;
  var isEnd = el === lastParent || target === lastParent;
  var position = "relative";

  while (target && target !== body) {
    if (lastParent === target) {
      isEnd = true;
    }

    var style = getComputedStyle$1(target, iframeSelector);
    var transform = style.transform;
    position = style.position;

    if (target.tagName.toLowerCase() === "svg" || position !== "static" || transform && transform !== "none") {
      break;
    }

    target = target.parentElement;
    position = "relative";
  }

  return {
    isStatic: position === "static",
    isEnd: isEnd || !target || target === body,
    offsetParent: target || body
  };
}
function getOffsetPosInfo(el, container, style, isFixed, iframeSelector) {
  var _a;

  var tagName = el.tagName.toLowerCase();
  var offsetLeft = el.offsetLeft;
  var offsetTop = el.offsetTop;

  if (isFixed) {
    var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
    var contentDocument = iframe ? iframe.contentDocument : document;
    var containerClientRect = (container || contentDocument.documentElement).getBoundingClientRect();
    offsetLeft -= containerClientRect.left;
    offsetTop -= containerClientRect.top;
  } // svg


  var isSVG = isUndefined(offsetLeft);
  var hasOffset = !isSVG;
  var origin;
  var targetOrigin; // inner svg element

  if (!hasOffset && tagName !== "svg") {
    origin = IS_WEBKIT605 ? getBeforeTransformOrigin(el, iframeSelector) : getTransformOrigin(style).map(function (pos) {
      return parseFloat(pos);
    });
    targetOrigin = origin.slice();
    hasOffset = true;
    _a = getSVGGraphicsOffset(el, origin), offsetLeft = _a[0], offsetTop = _a[1], origin[0] = _a[2], origin[1] = _a[3];
  } else {
    origin = getTransformOrigin(style).map(function (pos) {
      return parseFloat(pos);
    });
    targetOrigin = origin.slice();
  }

  return {
    tagName: tagName,
    isSVG: isSVG,
    hasOffset: hasOffset,
    offset: [offsetLeft || 0, offsetTop || 0],
    origin: origin,
    targetOrigin: targetOrigin
  };
}
function getBodyOffset(el, iframeSelector, isSVG, style) {
  if (style === void 0) {
    style = getComputedStyle$1(el, iframeSelector);
  }

  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentDocument = iframe ? iframe.contentDocument : document;
  var bodyStyle = getComputedStyle$1(contentDocument.body, iframeSelector);
  var bodyPosition = bodyStyle.position;

  if (!isSVG && (!bodyPosition || bodyPosition === "static")) {
    return [0, 0];
  }

  var marginLeft = parseInt("" + bodyStyle.marginLeft, 10);
  var marginTop = parseInt("" + bodyStyle.marginTop, 10);

  if (style.position === "absolute") {
    if (style.top !== "auto" || style.bottom !== "auto") {
      marginTop = 0;
    }

    if (style.left !== "auto" || style.right !== "auto") {
      marginLeft = 0;
    }
  }

  return [marginLeft, marginTop];
}
function getMatrixStackInfo(target, iframeSelector, container) {
  var el = target;
  var matrixes = [];
  var isEnd = false;
  var is3d = false;
  var n = 3;
  var transformOrigin;
  var targetTransformOrigin;
  var targetMatrix;
  var offsetContainer = getOffsetInfo(container, container, iframeSelector).offsetParent; // if (prevMatrix) {
  //     isEnd = target === container;
  //     if (prevMatrix.length > 10) {
  //         is3d = true;
  //         n = 4;
  //     }
  //     container = target.parentElement;
  // }

  while (el && !isEnd) {
    var style = getComputedStyle$1(el, iframeSelector);
    var position = style.position;
    var isFixed = position === "fixed";
    var matrix = convertCSStoMatrix(getTransformMatrix(style.transform)); // convert 3 to 4

    var length = matrix.length;

    if (!is3d && length === 16) {
      is3d = true;
      n = 4;
      var matrixesLength = matrixes.length;

      for (var i = 0; i < matrixesLength; ++i) {
        matrixes[i] = convertDimension(matrixes[i], 3, 4);
      }
    }

    if (is3d && length === 9) {
      matrix = convertDimension(matrix, 3, 4);
    }

    var _a = getOffsetPosInfo(el, container, style, isFixed, iframeSelector),
        tagName = _a.tagName,
        hasOffset = _a.hasOffset,
        isSVG = _a.isSVG,
        origin = _a.origin,
        targetOrigin = _a.targetOrigin,
        offsetPos = _a.offset;

    var offsetLeft = offsetPos[0],
        offsetTop = offsetPos[1];

    if (tagName === "svg" && targetMatrix) {
      matrixes.push( // scale matrix for svg's SVGElements.
      getSVGMatrix(el, n), createIdentityMatrix(n));
    } else if (tagName === "g" && target !== el) {
      offsetLeft = 0;
      offsetTop = 0;
    }

    var _b = getOffsetInfo(el, container, iframeSelector),
        offsetParent = _b.offsetParent,
        isOffsetEnd = _b.isEnd,
        isStatic = _b.isStatic;

    if (IS_WEBKIT && hasOffset && !isSVG && isStatic && (position === "relative" || position === "static")) {
      offsetLeft -= offsetParent.offsetLeft;
      offsetTop -= offsetParent.offsetTop;
      isEnd = isEnd || isOffsetEnd;
    }

    var parentClientLeft = 0;
    var parentClientTop = 0;

    if (hasOffset && offsetContainer !== offsetParent) {
      // border
      parentClientLeft = offsetParent.clientLeft;
      parentClientTop = offsetParent.clientTop;
    }

    var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
    var contentDocument = iframe ? iframe.contentDocument : document;

    if (hasOffset && offsetParent === contentDocument.body) {
      var margin = getBodyOffset(el, iframeSelector, false, style);
      offsetLeft += margin[0];
      offsetTop += margin[1];
    }

    matrixes.push( // absolute matrix
    getAbsoluteMatrix(matrix, n, origin), // offset matrix (offsetPos + clientPos(border))
    createOriginMatrix(hasOffset ? [offsetLeft - el.scrollLeft + parentClientLeft, offsetTop - el.scrollTop + parentClientTop] : [el, origin], n));

    if (!targetMatrix) {
      targetMatrix = matrix;
    }

    if (!transformOrigin) {
      transformOrigin = origin;
    }

    if (!targetTransformOrigin) {
      targetTransformOrigin = targetOrigin;
    }

    if (isEnd || isFixed) {
      break;
    } else {
      el = offsetParent;
      isEnd = isOffsetEnd;
    }
  }

  if (!targetMatrix) {
    targetMatrix = createIdentityMatrix(n);
  }

  if (!transformOrigin) {
    transformOrigin = [0, 0];
  }

  if (!targetTransformOrigin) {
    targetTransformOrigin = [0, 0];
  }

  return {
    offsetContainer: offsetContainer,
    matrixes: matrixes,
    targetMatrix: targetMatrix,
    transformOrigin: transformOrigin,
    targetOrigin: targetTransformOrigin,
    is3d: is3d
  };
}
function calculateElementInfo(iframeSelector, target, container, rootContainer, isAbsolute3d) {
  var _a;

  if (rootContainer === void 0) {
    rootContainer = container;
  } // const prevMatrix = state ? state.beforeMatrix : undefined;
  // const prevRootMatrix = state ? state.rootMatrix : undefined;
  // const prevN = state ? (state.is3d ? 4 : 3) : undefined;


  var width = 0;
  var height = 0;
  var rotation = 0;
  var allResult = {};

  if (target) {
    var style = getComputedStyle$1(target, iframeSelector);
    width = target.offsetWidth;
    height = target.offsetHeight;

    if (isUndefined(width)) {
      _a = getSize(target, iframeSelector, style, true), width = _a[0], height = _a[1];
    }
  }

  if (target) {
    var result = calculateMatrixStack(target, iframeSelector, container, rootContainer, isAbsolute3d // prevMatrix, prevRootMatrix, prevN,
    );
    var position = calculateMoveablePosition(result.allMatrix, result.transformOrigin, width, height);
    allResult = __assign(__assign({}, result), position);
    var rotationPosition = calculateMoveablePosition(result.allMatrix, [50, 50], 100, 100);
    rotation = getRotationRad([rotationPosition.pos1, rotationPosition.pos2], rotationPosition.direction);
  }

  var n = isAbsolute3d ? 4 : 3;
  return __assign({
    width: width,
    height: height,
    rotation: rotation,
    // rootMatrix: number[];
    // beforeMatrix: number[];
    // offsetMatrix: number[];
    // allMatrix: number[];
    // targetMatrix: number[];
    // targetTransform: string;
    // transformOrigin: number[];
    // targetOrigin: number[];
    // is3d: boolean;
    rootMatrix: createIdentityMatrix(n),
    beforeMatrix: createIdentityMatrix(n),
    offsetMatrix: createIdentityMatrix(n),
    allMatrix: createIdentityMatrix(n),
    targetMatrix: createIdentityMatrix(n),
    targetTransform: "",
    transformOrigin: [0, 0],
    targetOrigin: [0, 0],
    is3d: !!isAbsolute3d,
    // left: number;
    // top: number;
    // right: number;
    // bottom: number;
    // origin: number[];
    // pos1: number[];
    // pos2: number[];
    // pos3: number[];
    // pos4: number[];
    // direction: 1 | -1;
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    origin: [0, 0],
    pos1: [0, 0],
    pos2: [0, 0],
    pos3: [0, 0],
    pos4: [0, 0],
    direction: 1
  }, allResult);
}
function getElementInfo(target, iframeSelector, container, rootContainer) {
  if (rootContainer === void 0) {
    rootContainer = container;
  }

  return calculateElementInfo(iframeSelector, target, container, rootContainer, true);
}
function calculateMatrixStack(target, iframeSelector, container, rootContainer, isAbsolute3d) {
  if (rootContainer === void 0) {
    rootContainer = container;
  }

  var _a = getMatrixStackInfo(target, iframeSelector, container),
      matrixes = _a.matrixes,
      is3d = _a.is3d,
      prevTargetMatrix = _a.targetMatrix,
      transformOrigin = _a.transformOrigin,
      targetOrigin = _a.targetOrigin,
      offsetContainer = _a.offsetContainer; // prevMatrix


  var _b = getMatrixStackInfo(offsetContainer, iframeSelector, rootContainer),
      rootMatrixes = _b.matrixes,
      isRoot3d = _b.is3d; // prevRootMatrix


  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentDocument = iframe ? iframe.contentDocument : document; // if (rootContainer === contentDocument!.body) {
  //     console.log(offsetContainer, rootContainer, rootMatrixes);
  // }

  var isNext3d = isAbsolute3d || isRoot3d || is3d;
  var n = isNext3d ? 4 : 3;
  var isSVGGraphicElement = target.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in target;
  var originalContainer = container || contentDocument.body;
  var targetMatrix = prevTargetMatrix; // let allMatrix = prevMatrix ? convertDimension(prevMatrix, prevN!, n) : createIdentityMatrix(n);
  // let rootMatrix = prevRootMatrix ? convertDimension(prevRootMatrix, prevN!, n) : createIdentityMatrix(n);
  // let beforeMatrix = prevMatrix ? convertDimension(prevMatrix, prevN!, n) : createIdentityMatrix(n);

  var allMatrix = createIdentityMatrix(n);
  var rootMatrix = createIdentityMatrix(n);
  var beforeMatrix = createIdentityMatrix(n);
  var offsetMatrix = createIdentityMatrix(n);
  var length = matrixes.length;
  var endContainer = getOffsetInfo(originalContainer, originalContainer, iframeSelector).offsetParent;
  rootMatrixes.reverse();
  matrixes.reverse();

  if (!is3d && isNext3d) {
    targetMatrix = convertDimension(targetMatrix, 3, 4);
    matrixes.forEach(function (matrix, i) {
      matrixes[i] = convertDimension(matrix, 3, 4);
    });
  }

  if (!isRoot3d && isNext3d) {
    rootMatrixes.forEach(function (matrix, i) {
      rootMatrixes[i] = convertDimension(matrix, 3, 4);
    });
  } // rootMatrix = (...) -> container -> offset -> absolute -> offset -> absolute(targetMatrix)
  // beforeMatrix = (... -> container -> offset -> absolute) -> offset -> absolute(targetMatrix)
  // offsetMatrix = (... -> container -> offset -> absolute -> offset) -> absolute(targetMatrix)
  // if (!prevRootMatrix) {


  rootMatrixes.forEach(function (matrix) {
    rootMatrix = multiply(rootMatrix, matrix, n);
  }); // }

  matrixes.forEach(function (matrix, i) {
    var _a;

    if (length - 2 === i) {
      // length - 3
      beforeMatrix = allMatrix.slice();
    }

    if (length - 1 === i) {
      // length - 2
      offsetMatrix = allMatrix.slice();
    } // calculate for SVGElement


    if (isObject(matrix[n * (n - 1)])) {
      _a = getSVGOffset(matrix[n * (n - 1)], endContainer, n, matrix[n * (n - 1) + 1], allMatrix, matrixes[i + 1], iframeSelector), matrix[n * (n - 1)] = _a[0], matrix[n * (n - 1) + 1] = _a[1];
    }

    allMatrix = multiply(allMatrix, matrix, n);
  });
  var isMatrix3d = !isSVGGraphicElement && is3d;

  if (!targetMatrix) {
    targetMatrix = createIdentityMatrix(isMatrix3d ? 4 : 3);
  }

  var targetTransform = makeMatrixCSS(isSVGGraphicElement && targetMatrix.length === 16 ? convertDimension(targetMatrix, 4, 3) : targetMatrix, isMatrix3d);
  rootMatrix = ignoreDimension(rootMatrix, n, n);
  return {
    rootMatrix: rootMatrix,
    beforeMatrix: beforeMatrix,
    offsetMatrix: offsetMatrix,
    allMatrix: allMatrix,
    targetMatrix: targetMatrix,
    targetTransform: targetTransform,
    transformOrigin: transformOrigin,
    targetOrigin: targetOrigin,
    is3d: isNext3d
  };
}
function makeMatrixCSS(matrix, is3d) {
  if (is3d === void 0) {
    is3d = matrix.length > 9;
  }

  return (is3d ? "matrix3d" : "matrix") + "(" + convertMatrixtoCSS(matrix, !is3d).join(",") + ")";
}
function getSVGViewBox(el) {
  var clientWidth = el.clientWidth;
  var clientHeight = el.clientHeight;

  if (!el) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      clientWidth: clientWidth,
      clientHeight: clientHeight
    };
  }

  var viewBox = el.viewBox;
  var baseVal = viewBox && viewBox.baseVal || {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  return {
    x: baseVal.x,
    y: baseVal.y,
    width: baseVal.width || clientWidth,
    height: baseVal.height || clientHeight,
    clientWidth: clientWidth,
    clientHeight: clientHeight
  };
}
function getSVGMatrix(el, n) {
  var _a = getSVGViewBox(el),
      viewBoxWidth = _a.width,
      viewBoxHeight = _a.height,
      clientWidth = _a.clientWidth,
      clientHeight = _a.clientHeight;

  var scaleX = clientWidth / viewBoxWidth;
  var scaleY = clientHeight / viewBoxHeight;
  var preserveAspectRatio = el.preserveAspectRatio.baseVal; // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio

  var align = preserveAspectRatio.align; // 1 : meet 2: slice

  var meetOrSlice = preserveAspectRatio.meetOrSlice;
  var svgOrigin = [0, 0];
  var scale = [scaleX, scaleY];
  var translate = [0, 0];

  if (align !== 1) {
    var xAlign = (align - 2) % 3;
    var yAlign = Math.floor((align - 2) / 3);
    svgOrigin[0] = viewBoxWidth * xAlign / 2;
    svgOrigin[1] = viewBoxHeight * yAlign / 2;
    var scaleDimension = meetOrSlice === 2 ? Math.max(scaleY, scaleX) : Math.min(scaleX, scaleY);
    scale[0] = scaleDimension;
    scale[1] = scaleDimension;
    translate[0] = (clientWidth - viewBoxWidth) / 2 * xAlign;
    translate[1] = (clientHeight - viewBoxHeight) / 2 * yAlign;
  }

  var scaleMatrix = createScaleMatrix(scale, n);
  scaleMatrix[n * (n - 1)] = translate[0], scaleMatrix[n * (n - 1) + 1] = translate[1];
  return getAbsoluteMatrix(scaleMatrix, n, svgOrigin);
}
function getSVGGraphicsOffset(el, origin) {
  if (!el.getBBox) {
    return [0, 0];
  }

  var bbox = el.getBBox();
  var viewBox = getSVGViewBox(el.ownerSVGElement);
  var left = bbox.x - viewBox.x;
  var top = bbox.y - viewBox.y;
  return [left, top, origin[0] - left, origin[1] - top];
}
function calculatePosition(matrix, pos, n) {
  return calculate(matrix, convertPositionMatrix(pos, n), n);
}
function calculatePoses(matrix, width, height, n) {
  return [[0, 0], [width, 0], [0, height], [width, height]].map(function (pos) {
    return calculatePosition(matrix, pos, n);
  });
}
function getRect(poses) {
  var posesX = poses.map(function (pos) {
    return pos[0];
  });
  var posesY = poses.map(function (pos) {
    return pos[1];
  });
  var left = Math.min.apply(Math, posesX);
  var top = Math.min.apply(Math, posesY);
  var right = Math.max.apply(Math, posesX);
  var bottom = Math.max.apply(Math, posesY);
  var rectWidth = right - left;
  var rectHeight = bottom - top;
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    width: rectWidth,
    height: rectHeight
  };
}
function calculateRect(matrix, width, height, n) {
  var poses = calculatePoses(matrix, width, height, n);
  return getRect(poses);
}
function getSVGOffset(el, container, n, origin, beforeMatrix, absoluteMatrix, iframeSelector) {
  var _a;

  var _b = getSize(el, iframeSelector, undefined, true),
      width = _b[0],
      height = _b[1];

  var containerClientRect = container.getBoundingClientRect();
  var margin = [0, 0];
  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentDocument = iframe ? iframe.contentDocument : document;

  if (container === contentDocument.body) {
    margin = getBodyOffset(el, iframeSelector, true);
  }

  var rect = el.getBoundingClientRect();
  var rectLeft = rect.left - containerClientRect.left + container.scrollLeft - (container.clientLeft || 0) + margin[0];
  var rectTop = rect.top - containerClientRect.top + container.scrollTop - (container.clientTop || 0) + margin[1];
  var rectWidth = rect.width;
  var rectHeight = rect.height;
  var mat = multiplies(n, beforeMatrix, absoluteMatrix);

  var _c = calculateRect(mat, width, height, n),
      prevLeft = _c.left,
      prevTop = _c.top,
      prevWidth = _c.width,
      prevHeight = _c.height;

  var posOrigin = calculatePosition(mat, origin, n);
  var prevOrigin = minus(posOrigin, [prevLeft, prevTop]);
  var rectOrigin = [rectLeft + prevOrigin[0] * rectWidth / prevWidth, rectTop + prevOrigin[1] * rectHeight / prevHeight];
  var offset = [0, 0];
  var count = 0;

  while (++count < 10) {
    var inverseBeforeMatrix = invert(beforeMatrix, n);
    _a = minus(calculatePosition(inverseBeforeMatrix, rectOrigin, n), calculatePosition(inverseBeforeMatrix, posOrigin, n)), offset[0] = _a[0], offset[1] = _a[1];
    var mat2 = multiplies(n, beforeMatrix, createOriginMatrix(offset, n), absoluteMatrix);

    var _d = calculateRect(mat2, width, height, n),
        nextLeft = _d.left,
        nextTop = _d.top;

    var distLeft = nextLeft - rectLeft;
    var distTop = nextTop - rectTop;

    if (Math.abs(distLeft) < 2 && Math.abs(distTop) < 2) {
      break;
    }

    rectOrigin[0] -= distLeft;
    rectOrigin[1] -= distTop;
  }

  return offset.map(function (p) {
    return Math.round(p);
  });
}
function calculateMoveablePosition(matrix, origin, width, height) {
  var is3d = matrix.length === 16;
  var n = is3d ? 4 : 3;
  var poses = calculatePoses(matrix, width, height, n);
  var _a = poses[0],
      x1 = _a[0],
      y1 = _a[1],
      _b = poses[1],
      x2 = _b[0],
      y2 = _b[1],
      _c = poses[2],
      x3 = _c[0],
      y3 = _c[1],
      _d = poses[3],
      x4 = _d[0],
      y4 = _d[1];

  var _e = calculatePosition(matrix, origin, n),
      originX = _e[0],
      originY = _e[1];

  var left = Math.min(x1, x2, x3, x4);
  var top = Math.min(y1, y2, y3, y4);
  var right = Math.max(x1, x2, x3, x4);
  var bottom = Math.max(y1, y2, y3, y4);
  x1 = x1 - left || 0;
  x2 = x2 - left || 0;
  x3 = x3 - left || 0;
  x4 = x4 - left || 0;
  y1 = y1 - top || 0;
  y2 = y2 - top || 0;
  y3 = y3 - top || 0;
  y4 = y4 - top || 0;
  originX = originX - left || 0;
  originY = originY - top || 0;
  var direction = getShapeDirection(poses);
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    origin: [originX, originY],
    pos1: [x1, y1],
    pos2: [x2, y2],
    pos3: [x3, y3],
    pos4: [x4, y4],
    direction: direction
  };
}
function getDistSize(vec) {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
}
function getDiagonalSize(pos1, pos2) {
  return getDistSize([pos2[0] - pos1[0], pos2[1] - pos1[1]]);
}
function getLineStyle(pos1, pos2, zoom, rad) {
  if (zoom === void 0) {
    zoom = 1;
  }

  if (rad === void 0) {
    rad = getRad(pos1, pos2);
  }

  var width = getDiagonalSize(pos1, pos2);
  return {
    transform: "translateY(-50%) translate(" + pos1[0] + "px, " + pos1[1] + "px) rotate(" + rad + "rad) scaleY(" + zoom + ")",
    width: width + "px"
  };
}
function getControlTransform(rotation, zoom) {
  var poses = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    poses[_i - 2] = arguments[_i];
  }

  var length = poses.length;
  var x = poses.reduce(function (prev, pos) {
    return prev + pos[0];
  }, 0) / length;
  var y = poses.reduce(function (prev, pos) {
    return prev + pos[1];
  }, 0) / length;
  return {
    transform: "translateZ(0px) translate(" + x + "px, " + y + "px) rotate(" + rotation + "rad) scale(" + zoom + ")"
  };
}
function getCSSSize(target, iframeSelector) {
  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentWindow = iframe ? iframe.contentWindow : window;
  var style = contentWindow.getComputedStyle(target);
  return [parseFloat(style.width), parseFloat(style.height)];
}
function getSize(target, iframeSelector, style, isOffset, isBoxSizing) {
  if (style === void 0) {
    style = getComputedStyle$1(target, iframeSelector);
  }

  if (isBoxSizing === void 0) {
    isBoxSizing = isOffset || style.boxSizing === "border-box";
  }

  var width = target.offsetWidth;
  var height = target.offsetHeight;
  var hasOffset = !isUndefined(width);

  if ((isOffset || isBoxSizing) && hasOffset) {
    return [width, height];
  }

  if (!hasOffset && target.tagName.toLowerCase() !== "svg") {
    var bbox = target.getBBox();
    return [bbox.width, bbox.height];
  }

  width = target.clientWidth;
  height = target.clientHeight;

  if (isOffset || isBoxSizing) {
    var borderLeft = parseFloat(style.borderLeftWidth) || 0;
    var borderRight = parseFloat(style.borderRightWidth) || 0;
    var borderTop = parseFloat(style.borderTopWidth) || 0;
    var borderBottom = parseFloat(style.borderBottomWidth) || 0;
    return [width + borderLeft + borderRight, height + borderTop + borderBottom];
  } else {
    var paddingLeft = parseFloat(style.paddingLeft) || 0;
    var paddingRight = parseFloat(style.paddingRight) || 0;
    var paddingTop = parseFloat(style.paddingTop) || 0;
    var paddingBottom = parseFloat(style.paddingBottom) || 0;
    return [width - paddingLeft - paddingRight, height - paddingTop - paddingBottom];
  }
}
function getRotationRad(poses, direction) {
  return getRad(direction > 0 ? poses[0] : poses[1], direction > 0 ? poses[1] : poses[0]);
}
function getTargetInfo(iframeSelector, moveableElement, target, container, parentContainer, rootContainer) {
  var beforeDirection = 1;
  var beforeOrigin = [0, 0];
  var targetClientRect = resetClientRect();
  var containerClientRect = resetClientRect();
  var moveableClientRect = resetClientRect();
  var result = calculateElementInfo(iframeSelector, target, container, rootContainer, false // state,
  );

  if (target) {
    var n = result.is3d ? 4 : 3;
    var beforePosition = calculateMoveablePosition(result.offsetMatrix, plus(result.transformOrigin, getOrigin(result.targetMatrix, n)), result.width, result.height);
    beforeDirection = beforePosition.direction;
    beforeOrigin = plus(beforePosition.origin, [beforePosition.left - result.left, beforePosition.top - result.top]);
    targetClientRect = getClientRect(target, iframeSelector);
    var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
    var contentDocument = iframe ? iframe.contentDocument : document;
    containerClientRect = getClientRect(getOffsetInfo(parentContainer, parentContainer, iframeSelector).offsetParent || contentDocument.body, iframeSelector, true);

    if (moveableElement) {
      moveableClientRect = getClientRect(moveableElement, iframeSelector);
    }
  }

  return __assign({
    targetClientRect: targetClientRect,
    containerClientRect: containerClientRect,
    moveableClientRect: moveableClientRect,
    beforeDirection: beforeDirection,
    beforeOrigin: beforeOrigin,
    originalBeforeOrigin: beforeOrigin,
    target: target
  }, result);
}
function resetClientRect() {
  return {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    clientLeft: 0,
    clientTop: 0,
    clientWidth: 0,
    clientHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0
  };
}
function getClientRect(el, iframeSelector, isExtends) {
  var left = 0;
  var top = 0;
  var width = 0;
  var height = 0;
  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentDocument = iframe ? iframe.contentDocument : document;
  var contentWindow = iframe ? iframe.contentWindow : window;

  if (el === contentDocument.body || el === contentDocument.documentElement) {
    width = contentWindow.innerWidth;
    height = contentWindow.innerHeight;
    left = -(contentDocument.documentElement.scrollLeft || contentDocument.body.scrollLeft);
    top = -(contentDocument.documentElement.scrollTop || contentDocument.body.scrollTop);
  } else {
    var clientRect = el.getBoundingClientRect();
    left = clientRect.left;
    top = clientRect.top;
    width = clientRect.width;
    height = clientRect.height;
  }

  var rect = {
    left: left,
    right: left + width,
    top: top,
    bottom: top + height,
    width: width,
    height: height
  };

  if (isExtends) {
    rect.clientLeft = el.clientLeft;
    rect.clientTop = el.clientTop;
    rect.clientWidth = el.clientWidth;
    rect.clientHeight = el.clientHeight;
    rect.scrollWidth = el.scrollWidth;
    rect.scrollHeight = el.scrollHeight;
    rect.overflow = getComputedStyle$1(el, iframeSelector).overflow !== "visible";
  }

  return rect;
}
function getDirection(target) {
  if (!target) {
    return;
  }

  var direciton = target.getAttribute("data-direction");

  if (!direciton) {
    return;
  }

  var dir = [0, 0];
  direciton.indexOf("w") > -1 && (dir[0] = -1);
  direciton.indexOf("e") > -1 && (dir[0] = 1);
  direciton.indexOf("n") > -1 && (dir[1] = -1);
  direciton.indexOf("s") > -1 && (dir[1] = 1);
  return dir;
}
function getAbsolutePoses(poses, dist) {
  return [plus(dist, poses[0]), plus(dist, poses[1]), plus(dist, poses[2]), plus(dist, poses[3])];
}
function getAbsolutePosesByState(_a) {
  var left = _a.left,
      top = _a.top,
      pos1 = _a.pos1,
      pos2 = _a.pos2,
      pos3 = _a.pos3,
      pos4 = _a.pos4;
  return getAbsolutePoses([pos1, pos2, pos3, pos4], [left, top]);
}
function roundSign(num) {
  return Math.round(num % 1 === -0.5 ? num - 1 : num);
}
function throttle(num, unit) {
  if (!unit) {
    return num;
  }

  return Math.round(num / unit) * unit;
}
function throttleArray(nums, unit) {
  nums.forEach(function (_, i) {
    nums[i] = throttle(nums[i], unit);
  });
  return nums;
}
function unset(self, name) {
  if (self[name]) {
    self[name].unset();
    self[name] = null;
  }
}
function fillParams(moveable, e, params) {
  var datas = e.datas;

  if (!datas.datas) {
    datas.datas = {};
  }

  var nextParams = __assign(__assign({}, params), {
    target: moveable.state.target,
    clientX: e.clientX,
    clientY: e.clientY,
    inputEvent: e.inputEvent,
    currentTarget: moveable,
    moveable: moveable,
    datas: datas.datas
  });

  if (datas.isStartEvent) {
    datas.lastEvent = nextParams;
  } else {
    datas.isStartEvent = true;
  }

  return nextParams;
}
function fillEndParams(moveable, e, params) {
  var datas = e.datas;
  var isDrag = "isDrag" in params ? params.isDrag : e.isDrag;

  if (!datas.datas) {
    datas.datas = {};
  }

  return __assign(__assign({
    isDrag: isDrag
  }, params), {
    moveable: moveable,
    target: moveable.state.target,
    clientX: e.clientX,
    clientY: e.clientY,
    inputEvent: e.inputEvent,
    currentTarget: moveable,
    lastEvent: datas.lastEvent,
    isDouble: e.isDouble,
    datas: datas.datas
  });
}
function triggerEvent(moveable, name, params, isManager) {
  return moveable.triggerEvent(name, params, isManager);
}
function getComputedStyle$1(el, iframeSelector, pseudoElt) {
  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentWindow = iframe ? iframe.contentWindow : window;
  return contentWindow.getComputedStyle(el, pseudoElt);
}
function filterAbles(ables, methods, triggerAblesSimultaneously) {
  var enabledAbles = {};
  var ableGroups = {};
  return ables.filter(function (able) {
    var name = able.name;

    if (enabledAbles[name] || !methods.some(function (method) {
      return able[method];
    })) {
      return false;
    }

    if (!triggerAblesSimultaneously && able.ableGroup) {
      if (ableGroups[able.ableGroup]) {
        return false;
      }

      ableGroups[able.ableGroup] = true;
    }

    enabledAbles[name] = true;
    return true;
  });
}
function equals(a1, a2) {
  return a1 === a2 || a1 == null && a2 == null;
}
function selectValue() {
  var values = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }

  var length = values.length - 1;

  for (var i = 0; i < length; ++i) {
    var value = values[i];

    if (!isUndefined(value)) {
      return value;
    }
  }

  return values[length];
}
function groupBy(arr, func) {
  var groups = [];
  var groupKeys = [];
  arr.forEach(function (el, index) {
    var groupKey = func(el, index, arr);
    var keyIndex = groupKeys.indexOf(groupKey);
    var group = groups[keyIndex] || [];

    if (keyIndex === -1) {
      groupKeys.push(groupKey);
      groups.push(group);
    }

    group.push(el);
  });
  return groups;
}
function groupByMap(arr, func) {
  var groups = [];
  var groupKeys = {};
  arr.forEach(function (el, index) {
    var groupKey = func(el, index, arr);
    var group = groupKeys[groupKey];

    if (!group) {
      group = [];
      groupKeys[groupKey] = group;
      groups.push(group);
    }

    group.push(el);
  });
  return groups;
}
function flat(arr) {
  return arr.reduce(function (prev, cur) {
    return prev.concat(cur);
  }, []);
}
function maxOffset() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  args.sort(function (a, b) {
    return Math.abs(b) - Math.abs(a);
  });
  return args[0];
}
function minOffset() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  args.sort(function (a, b) {
    return Math.abs(a) - Math.abs(b);
  });
  return args[0];
}
function calculateInversePosition(matrix, pos, n) {
  return calculate(invert(matrix, n), convertPositionMatrix(pos, n), n);
}
function convertDragDist(state, e) {
  var _a;

  var is3d = state.is3d,
      rootMatrix = state.rootMatrix;
  var n = is3d ? 4 : 3;
  _a = calculateInversePosition(rootMatrix, [e.distX, e.distY], n), e.distX = _a[0], e.distY = _a[1];
  return e;
}
function calculatePadding(matrix, pos, transformOrigin, origin, n) {
  return minus(calculatePosition(matrix, plus(transformOrigin, pos), n), origin);
}
function convertCSSSize(value, size, isRelative) {
  return isRelative ? value / size * 100 + "%" : value + "px";
}
function moveControlPos(controlPoses, index, dist, isRect) {
  var _a = controlPoses[index],
      direction = _a.direction,
      sub = _a.sub;
  var dists = controlPoses.map(function () {
    return [0, 0];
  });
  var directions = direction ? direction.split("") : [];

  if (isRect && index < 8) {
    var verticalDirection_1 = directions.filter(function (dir) {
      return dir === "w" || dir === "e";
    })[0];
    var horizontalDirection_1 = directions.filter(function (dir) {
      return dir === "n" || dir === "s";
    })[0];
    dists[index] = dist;
    controlPoses.forEach(function (controlPose, i) {
      var controlDir = controlPose.direction;

      if (!controlDir) {
        return;
      }

      if (controlDir.indexOf(verticalDirection_1) > -1) {
        dists[i][0] = dist[0];
      }

      if (controlDir.indexOf(horizontalDirection_1) > -1) {
        dists[i][1] = dist[1];
      }
    });

    if (verticalDirection_1) {
      dists[1][0] = dist[0] / 2;
      dists[5][0] = dist[0] / 2;
    }

    if (horizontalDirection_1) {
      dists[3][1] = dist[1] / 2;
      dists[7][1] = dist[1] / 2;
    }
  } else if (direction && !sub) {
    directions.forEach(function (dir) {
      var isVertical = dir === "n" || dir === "s";
      controlPoses.forEach(function (controlPose, i) {
        var dirDir = controlPose.direction,
            dirHorizontal = controlPose.horizontal,
            dirVertical = controlPose.vertical;

        if (!dirDir || dirDir.indexOf(dir) === -1) {
          return;
        }

        dists[i] = [isVertical || !dirHorizontal ? 0 : dist[0], !isVertical || !dirVertical ? 0 : dist[1]];
      });
    });
  } else {
    dists[index] = dist;
  }

  return dists;
}
function getTinyDist(v) {
  return Math.abs(v) <= TINY_NUM ? 0 : v;
}
function directionCondition(e) {
  if (e.isRequest) {
    if (e.requestAble === "resizable" || e.requestAble === "scalable") {
      return e.parentDirection;
    } else {
      return false;
    }
  }

  return hasClass(e.inputEvent.target, prefix("direction"));
}
function invertObject(obj) {
  var nextObj = {};

  for (var name in obj) {
    nextObj[obj[name]] = name;
  }

  return nextObj;
}
function getTransform(transforms, index) {
  var beforeFunctionTexts = transforms.slice(0, index < 0 ? undefined : index);
  var beforeFunctionTexts2 = transforms.slice(0, index < 0 ? undefined : index + 1);
  var targetFunctionText = transforms[index] || "";
  var afterFunctionTexts = index < 0 ? [] : transforms.slice(index);
  var afterFunctionTexts2 = index < 0 ? [] : transforms.slice(index + 1);
  var beforeFunctions = parse(beforeFunctionTexts);
  var beforeFunctions2 = parse(beforeFunctionTexts2);
  var targetFunctions = parse([targetFunctionText]);
  var afterFunctions = parse(afterFunctionTexts);
  var afterFunctions2 = parse(afterFunctionTexts2);
  var beforeFunctionMatrix = toMat(beforeFunctions);
  var beforeFunctionMatrix2 = toMat(beforeFunctions2);
  var afterFunctionMatrix = toMat(afterFunctions);
  var afterFunctionMatrix2 = toMat(afterFunctions2);
  var allFunctionMatrix = multiply(beforeFunctionMatrix, afterFunctionMatrix, 4);
  return {
    transforms: transforms,
    beforeFunctionMatrix: beforeFunctionMatrix,
    beforeFunctionMatrix2: beforeFunctionMatrix2,
    targetFunctionMatrix: toMat(targetFunctions),
    afterFunctionMatrix: afterFunctionMatrix,
    afterFunctionMatrix2: afterFunctionMatrix2,
    allFunctionMatrix: allFunctionMatrix,
    beforeFunctions: beforeFunctions,
    beforeFunctions2: beforeFunctions2,
    targetFunction: targetFunctions[0],
    afterFunctions: afterFunctions,
    afterFunctions2: afterFunctions2,
    beforeFunctionTexts: beforeFunctionTexts,
    beforeFunctionTexts2: beforeFunctionTexts2,
    targetFunctionText: targetFunctionText,
    afterFunctionTexts: afterFunctionTexts,
    afterFunctionTexts2: afterFunctionTexts2
  };
}
function isArrayFormat(arr) {
  if (!arr || !isObject(arr)) {
    return false;
  }

  return isArray(arr) || "length" in arr;
}
function getRefTarget(target, iframeSelector, isSelector) {
  if (!target) {
    return null;
  }

  if (isString(target)) {
    if (isSelector) {
      var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
      var contentDocument = iframe ? iframe.contentDocument : document;
      return contentDocument.querySelector(target);
    }

    return target;
  }

  if (isFunction(target)) {
    return target();
  }

  if ("current" in target) {
    return target.current;
  }

  return target;
}
function getRefTargets(targets, iframeSelector, isSelector) {
  if (!targets) {
    return [];
  }

  var userTargets = isArrayFormat(targets) ? [].slice.call(targets) : [targets];
  return userTargets.reduce(function (prev, target) {
    if (isString(target) && isSelector) {
      var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
      var contentDocument = iframe ? iframe.contentDocument : document;
      return __spreadArrays(prev, [].slice.call(contentDocument.querySelectorAll(target)));
    }

    prev.push(getRefTarget(target, iframeSelector, isSelector));
    return prev;
  }, []);
}
function getElementTargets(targets, selectorMap) {
  var elementTargets = [];
  targets.forEach(function (target) {
    if (!target) {
      return;
    }

    if (isString(target)) {
      if (selectorMap[target]) {
        elementTargets.push.apply(elementTargets, selectorMap[target]);
      }

      return;
    }

    elementTargets.push(target);
  });
  return elementTargets;
}
function getAbsoluteRotation(pos1, pos2, direction) {
  var deg = getRad(pos1, pos2) / Math.PI * 180;
  deg = direction >= 0 ? deg : 180 - deg;
  deg = deg >= 0 ? deg : 360 + deg;
  return deg;
}
function renderGuideline(info, React) {
  var _a;

  var direction = info.direction,
      classNames = info.classNames,
      size = info.size,
      pos = info.pos,
      zoom = info.zoom,
      key = info.key;
  var isHorizontal = direction === "horizontal";
  var scaleDirection = isHorizontal ? "Y" : "X"; // const scaleDirection2 = isHorizontal ? "Y" : "X";

  return React.createElement("div", {
    key: key,
    className: classNames.join(" "),
    style: (_a = {}, _a[isHorizontal ? "width" : "height"] = "" + size, _a.transform = "translate(" + pos[0] + ", " + pos[1] + ") translate" + scaleDirection + "(-50%) scale" + scaleDirection + "(" + zoom + ")", _a)
  });
}
function renderInnerGuideline(info, React) {
  return renderGuideline(__assign(__assign({}, info), {
    classNames: __spreadArrays([prefix("line", "guideline", info.direction)], info.classNames).filter(function (className) {
      return className;
    }),
    size: info.size || info.sizeValue + "px",
    pos: info.pos || info.posValue.map(function (v) {
      return v + "px";
    })
  }), React);
}

/**
 * @namespace Moveable.Pinchable
 * @description Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
 */

var Pinchable = {
  name: "pinchable",
  updateRect: true,
  props: {
    pinchable: Boolean
  },
  events: {
    onPinchStart: "pinchStart",
    onPinch: "pinch",
    onPinchEnd: "pinchEnd",
    onPinchGroupStart: "pinchGroupStart",
    onPinchGroup: "pinchGroup",
    onPinchGroupEnd: "pinchGroupEnd"
  },
  dragStart: function () {
    return true;
  },
  pinchStart: function (moveable, e) {
    var datas = e.datas,
        targets = e.targets,
        angle = e.angle,
        originalDatas = e.originalDatas;
    var _a = moveable.props,
        pinchable = _a.pinchable,
        ables = _a.ables;

    if (!pinchable) {
      return false;
    }

    var eventName = "onPinch" + (targets ? "Group" : "") + "Start";
    var controlEventName = "drag" + (targets ? "Group" : "") + "ControlStart";
    var pinchAbles = (pinchable === true ? moveable.controlAbles : ables.filter(function (able) {
      return pinchable.indexOf(able.name) > -1;
    })).filter(function (able) {
      return able.canPinch && able[controlEventName];
    });
    var params = fillParams(moveable, e, {});

    if (targets) {
      params.targets = targets;
    }

    var result = triggerEvent(moveable, eventName, params);
    datas.isPinch = result !== false;
    datas.ables = pinchAbles;
    var isPinch = datas.isPinch;

    if (!isPinch) {
      return false;
    }

    pinchAbles.forEach(function (able) {
      originalDatas[able.name] = originalDatas[able.name] || {};

      if (!able[controlEventName]) {
        return;
      }

      var ableEvent = __assign(__assign({}, e), {
        datas: originalDatas[able.name],
        parentRotate: angle,
        isPinch: true
      });

      able[controlEventName](moveable, ableEvent);
    });
    moveable.state.snapRenderInfo = {
      request: e.isRequest,
      direction: [0, 0]
    };
    return isPinch;
  },
  pinch: function (moveable, e) {
    var datas = e.datas,
        pinchScale = e.scale,
        distance = e.distance,
        originalDatas = e.originalDatas,
        inputEvent = e.inputEvent,
        targets = e.targets,
        angle = e.angle;

    if (!datas.isPinch) {
      return;
    }

    var parentDistance = distance * (1 - 1 / pinchScale);
    var params = fillParams(moveable, e, {});

    if (targets) {
      params.targets = targets;
    }

    var eventName = "onPinch" + (targets ? "Group" : "");
    triggerEvent(moveable, eventName, params);
    var ables = datas.ables;
    var controlEventName = "drag" + (targets ? "Group" : "") + "Control";
    ables.forEach(function (able) {
      if (!able[controlEventName]) {
        return;
      }

      able[controlEventName](moveable, __assign(__assign({}, e), {
        datas: originalDatas[able.name],
        inputEvent: inputEvent,
        parentDistance: parentDistance,
        parentRotate: angle,
        isPinch: true
      }));
    });
    return params;
  },
  pinchEnd: function (moveable, e) {
    var datas = e.datas,
        isPinch = e.isPinch,
        inputEvent = e.inputEvent,
        targets = e.targets,
        originalDatas = e.originalDatas;

    if (!datas.isPinch) {
      return;
    }

    var eventName = "onPinch" + (targets ? "Group" : "") + "End";
    var params = fillEndParams(moveable, e, {
      isDrag: isPinch
    });

    if (targets) {
      params.targets = targets;
    }

    triggerEvent(moveable, eventName, params);
    var ables = datas.ables;
    var controlEventName = "drag" + (targets ? "Group" : "") + "ControlEnd";
    ables.forEach(function (able) {
      if (!able[controlEventName]) {
        return;
      }

      able[controlEventName](moveable, __assign(__assign({}, e), {
        isDrag: isPinch,
        datas: originalDatas[able.name],
        inputEvent: inputEvent,
        isPinch: true
      }));
    });
    return isPinch;
  },
  pinchGroupStart: function (moveable, e) {
    return this.pinchStart(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  pinchGroup: function (moveable, e) {
    return this.pinch(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  pinchGroupEnd: function (moveable, e) {
    return this.pinchEnd(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  }
};
/**
 * Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
 * @name Moveable.Pinchable#pinchable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.pinchable = true;
 */

/**
 * When the pinch starts, the pinchStart event is called with part of scaleStart, rotateStart, resizeStart
 * @memberof Moveable.Pinchable
 * @event pinchStart
 * @param {Moveable.Pinchable.OnPinchStart} - Parameters for the pinchStart event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     rotatable: true,
 *     scalable: true,
 *     pinchable: true, // ["rotatable", "scalable"]
 * });
 * moveable.on("pinchStart", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("rotateStart", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("scaleStart", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When pinching, the pinch event is called with part of scale, rotate, resize
 * @memberof Moveable.Pinchable
 * @event pinch
 * @param {Moveable.Pinchable.OnPinch} - Parameters for the pinch event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     rotatable: true,
 *     scalable: true,
 *     pinchable: true, // ["rotatable", "scalable"]
 * });
 * moveable.on("pinch", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("rotate", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("scale", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When the pinch finishes, the pinchEnd event is called.
 * @memberof Moveable.Pinchable
 * @event pinchEnd
 * @param {Moveable.Pinchable.OnPinchEnd} - Parameters for the pinchEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     rotatable: true,
 *     scalable: true,
 *     pinchable: true, // ["rotatable", "scalable"]
 * });
 * moveable.on("pinchEnd", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("rotateEnd", ({ target }) => {
 *     console.log(target);
 * });
 * moveable.on("scaleEnd", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When the group pinch starts, the `pinchGroupStart` event is called.
 * @memberof Moveable.Pinchable
 * @event pinchGroupStart
 * @param {Moveable.Pinchable.OnPinchGroupStart} - Parameters for the `pinchGroupStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     pinchable: true
 * });
 * moveable.on("pinchGroupStart", ({ targets }) => {
 *     console.log("onPinchGroupStart", targets);
 * });
 */

/**
 * When the group pinch, the `pinchGroup` event is called.
 * @memberof Moveable.Pinchable
 * @event pinchGroup
 * @param {Moveable.Pinchable.OnPinchGroup} - Parameters for the `pinchGroup` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     pinchable: true
 * });
 * moveable.on("pinchGroup", ({ targets, events }) => {
 *     console.log("onPinchGroup", targets);
 * });
 */

/**
 * When the group pinch finishes, the `pinchGroupEnd` event is called.
 * @memberof Moveable.Pinchable
 * @event pinchGroupEnd
 * @param {Moveable.Pinchable.OnPinchGroupEnd} - Parameters for the `pinchGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     pinchable: true
 * });
 * moveable.on("pinchGroupEnd", ({ targets, isDrag }) => {
 *     console.log("onPinchGroupEnd", targets, isDrag);
 * });
 */

function setCustomDrag(e, state, delta, isPinch, isConvert) {
  var result = state.gesto.move(delta, e.inputEvent);
  var datas = result.originalDatas || result.datas;
  var draggableDatas = datas.draggable || (datas.draggable = {});
  return __assign(__assign({}, isConvert ? convertDragDist(state, result) : result), {
    isDrag: true,
    isPinch: !!isPinch,
    parentEvent: true,
    datas: draggableDatas,
    originalDatas: e.originalDatas
  });
}

var CustomGesto = function () {
  function CustomGesto() {
    this.prevX = 0;
    this.prevY = 0;
    this.startX = 0;
    this.startY = 0;
    this.isDrag = false;
    this.isFlag = false;
    this.datas = {
      draggable: {}
    };
  }

  var __proto = CustomGesto.prototype;

  __proto.dragStart = function (client, e) {
    this.isDrag = false;
    this.isFlag = false;
    var originalDatas = e.originalDatas;
    this.datas = originalDatas;

    if (!originalDatas.draggable) {
      originalDatas.draggable = {};
    }

    return __assign(__assign({}, this.move(client, e.inputEvent)), {
      type: "dragstart"
    });
  };

  __proto.drag = function (client, inputEvent) {
    return this.move([client[0] - this.prevX, client[1] - this.prevY], inputEvent);
  };

  __proto.move = function (delta, inputEvent) {
    var clientX;
    var clientY;

    if (!this.isFlag) {
      this.prevX = delta[0];
      this.prevY = delta[1];
      this.startX = delta[0];
      this.startY = delta[1];
      clientX = delta[0];
      clientY = delta[1];
      this.isFlag = true;
    } else {
      clientX = this.prevX + delta[0];
      clientY = this.prevY + delta[1];
      this.isDrag = true;
    }

    this.prevX = clientX;
    this.prevY = clientY;
    return {
      type: "drag",
      clientX: clientX,
      clientY: clientY,
      inputEvent: inputEvent,
      isDrag: this.isDrag,
      distX: clientX - this.startX,
      distY: clientY - this.startY,
      deltaX: delta[0],
      deltaY: delta[1],
      datas: this.datas.draggable,
      originalDatas: this.datas,
      parentEvent: true,
      parentGesto: this
    };
  };

  return CustomGesto;
}();

function fillChildEvents(moveable, name, e) {
  var datas = e.originalDatas;
  datas.groupable = datas.groupable || {};
  var groupableDatas = datas.groupable;
  groupableDatas.childDatas = groupableDatas.childDatas || [];
  var childDatas = groupableDatas.childDatas;
  return moveable.moveables.map(function (_, i) {
    childDatas[i] = childDatas[i] || {};
    childDatas[i][name] = childDatas[i][name] || {};
    return __assign(__assign({}, e), {
      datas: childDatas[i][name],
      originalDatas: childDatas[i]
    });
  });
}
function triggerChildGesto(moveable, able, type, delta, e, isConvert) {
  var isStart = !!type.match(/Start$/g);
  var isEnd = !!type.match(/End$/g);
  var isPinch = e.isPinch;
  var datas = e.datas;
  var events = fillChildEvents(moveable, able.name, e);
  var moveables = moveable.moveables;
  var childs = events.map(function (ev, i) {
    var childMoveable = moveables[i];
    var childEvent = ev;

    if (isStart) {
      childEvent = new CustomGesto().dragStart(delta, ev);
    } else {
      if (!childMoveable.state.gesto) {
        childMoveable.state.gesto = datas.childGestos[i];
      }

      childEvent = setCustomDrag(ev, childMoveable.state, delta, isPinch, isConvert);
    }

    var result = able[type](childMoveable, __assign(__assign({}, childEvent), {
      parentFlag: true
    }));

    if (isEnd) {
      childMoveable.state.gesto = null;
    }

    return result;
  });

  if (isStart) {
    datas.childGestos = moveables.map(function (child) {
      return child.state.gesto;
    });
  }

  return childs;
}
function triggerChildAble(moveable, able, type, e, eachEvent, callback) {
  if (eachEvent === void 0) {
    eachEvent = function (_, ev) {
      return ev;
    };
  }

  var isEnd = !!type.match(/End$/g);
  var events = fillChildEvents(moveable, able.name, e);
  var moveables = moveable.moveables;
  var childs = events.map(function (ev, i) {
    var childMoveable = moveables[i];
    var childEvent = ev;
    childEvent = eachEvent(childMoveable, ev);
    var result = able[type](childMoveable, __assign(__assign({}, childEvent), {
      parentFlag: true
    }));
    result && callback && callback(childMoveable, ev, result, i);

    if (isEnd) {
      childMoveable.state.gesto = null;
    }

    return result;
  });
  return childs;
}

function calculatePointerDist(moveable, e) {
  var clientX = e.clientX,
      clientY = e.clientY,
      datas = e.datas;
  var _a = moveable.state,
      moveableClientRect = _a.moveableClientRect,
      rootMatrix = _a.rootMatrix,
      is3d = _a.is3d,
      pos1 = _a.pos1;
  var left = moveableClientRect.left,
      top = moveableClientRect.top;
  var n = is3d ? 4 : 3;

  var _b = minus(calculateInversePosition(rootMatrix, [clientX - left, clientY - top], n), pos1),
      posX = _b[0],
      posY = _b[1];

  var _c = getDragDist({
    datas: datas,
    distX: posX,
    distY: posY
  }),
      distX = _c[0],
      distY = _c[1];

  return [distX, distY];
}
function setDragStart(moveable, _a) {
  var datas = _a.datas;
  var _b = moveable.state,
      allMatrix = _b.allMatrix,
      beforeMatrix = _b.beforeMatrix,
      is3d = _b.is3d,
      left = _b.left,
      top = _b.top,
      origin = _b.origin,
      offsetMatrix = _b.offsetMatrix,
      targetMatrix = _b.targetMatrix,
      transformOrigin = _b.transformOrigin;
  var n = is3d ? 4 : 3;
  datas.is3d = is3d;
  datas.matrix = allMatrix;
  datas.targetMatrix = targetMatrix;
  datas.beforeMatrix = beforeMatrix;
  datas.offsetMatrix = offsetMatrix;
  datas.transformOrigin = transformOrigin;
  datas.inverseMatrix = invert(allMatrix, n);
  datas.inverseBeforeMatrix = invert(beforeMatrix, n);
  datas.absoluteOrigin = convertPositionMatrix(plus([left, top], origin), n);
  datas.startDragBeforeDist = calculate(datas.inverseBeforeMatrix, datas.absoluteOrigin, n);
  datas.startDragDist = calculate(datas.inverseMatrix, datas.absoluteOrigin, n);
}
function getTransformDirection(e) {
  return calculateMoveablePosition(e.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function resolveTransformEvent(event, functionName) {
  var datas = event.datas,
      originalDatas = event.originalDatas.beforeRenderable;
  var index = datas.transformIndex;
  var nextTransforms = originalDatas.nextTransforms;
  var nextTransformAppendedIndexes = originalDatas.nextTransformAppendedIndexes;
  var nextIndex = index === -1 ? nextTransforms.length : index + nextTransformAppendedIndexes.filter(function (i) {
    return i < index;
  }).length;
  var result = getTransform(nextTransforms, nextIndex);
  var targetFunction = result.targetFunction;
  var matFunctionName = functionName === "rotate" ? "rotateZ" : functionName;
  datas.beforeFunctionTexts = result.beforeFunctionTexts;
  datas.afterFunctionTexts = result.afterFunctionTexts;
  datas.beforeTransform = result.beforeFunctionMatrix;
  datas.beforeTransform2 = result.beforeFunctionMatrix2;
  datas.targetTansform = result.targetFunctionMatrix;
  datas.afterTransform = result.afterFunctionMatrix;
  datas.afterTransform2 = result.afterFunctionMatrix2;
  datas.targetAllTransform = result.allFunctionMatrix;

  if (targetFunction.functionName === matFunctionName) {
    datas.afterFunctionTexts.splice(0, 1);
    datas.isAppendTransform = false;
  } else {
    datas.isAppendTransform = true;
    originalDatas.nextTransformAppendedIndexes = __spreadArrays(nextTransformAppendedIndexes, [nextIndex]);
  }
}
function convertTransformFormat(datas, value, dist) {
  return datas.beforeFunctionTexts.join(" ") + " " + (datas.isAppendTransform ? dist : value) + " " + datas.afterFunctionTexts.join(" ");
}
function getTransformDist(_a) {
  var datas = _a.datas,
      distX = _a.distX,
      distY = _a.distY;

  var _b = getBeforeDragDist({
    datas: datas,
    distX: distX,
    distY: distY
  }),
      bx = _b[0],
      by = _b[1]; // B * [tx, ty] * A = [bx, by] * targetMatrix;
  // [tx, ty] = B-1 * [bx, by] * targetMatrix * A-1 * [0, 0];


  var res = getTransfromMatrix(datas, fromTranslation([bx, by], 4));
  return calculate(res, convertPositionMatrix([0, 0, 0], 4), 4);
}
function getTransfromMatrix(datas, targetMatrix, isAfter) {
  var beforeTransform = datas.beforeTransform,
      afterTransform = datas.afterTransform,
      beforeTransform2 = datas.beforeTransform2,
      afterTransform2 = datas.afterTransform2,
      targetAllTransform = datas.targetAllTransform; // B * afterTargetMatrix * A = (targetMatrix * targetAllTransform)
  // afterTargetMatrix = B-1 * targetMatrix * targetAllTransform * A-1
  // nextTargetMatrix = (targetMatrix * targetAllTransform)

  var nextTargetMatrix = isAfter ? multiply(targetAllTransform, targetMatrix, 4) : multiply(targetMatrix, targetAllTransform, 4); // res1 = B-1 * nextTargetMatrix

  var res1 = multiply(invert(isAfter ? beforeTransform2 : beforeTransform, 4), nextTargetMatrix, 4); // res3 = res2 * A-1

  var afterTargetMatrix = multiply(res1, invert(isAfter ? afterTransform2 : afterTransform, 4), 4);
  return afterTargetMatrix;
}
function getBeforeDragDist(_a) {
  var datas = _a.datas,
      distX = _a.distX,
      distY = _a.distY; // TT = BT

  var inverseBeforeMatrix = datas.inverseBeforeMatrix,
      is3d = datas.is3d,
      startDragBeforeDist = datas.startDragBeforeDist,
      absoluteOrigin = datas.absoluteOrigin;
  var n = is3d ? 4 : 3; // ABS_ORIGIN * [distX, distY] = BM * (ORIGIN + [tx, ty])
  // BM -1 * ABS_ORIGIN * [distX, distY] - ORIGIN = [tx, ty]

  return minus(calculate(inverseBeforeMatrix, plus(absoluteOrigin, [distX, distY]), n), startDragBeforeDist);
}
function getDragDist(_a, isBefore) {
  var datas = _a.datas,
      distX = _a.distX,
      distY = _a.distY;
  var inverseBeforeMatrix = datas.inverseBeforeMatrix,
      inverseMatrix = datas.inverseMatrix,
      is3d = datas.is3d,
      startDragBeforeDist = datas.startDragBeforeDist,
      startDragDist = datas.startDragDist,
      absoluteOrigin = datas.absoluteOrigin;
  var n = is3d ? 4 : 3;
  return minus(calculate(isBefore ? inverseBeforeMatrix : inverseMatrix, plus(absoluteOrigin, [distX, distY]), n), isBefore ? startDragBeforeDist : startDragDist);
}
function getInverseDragDist(_a, isBefore) {
  var datas = _a.datas,
      distX = _a.distX,
      distY = _a.distY;
  var beforeMatrix = datas.beforeMatrix,
      matrix = datas.matrix,
      is3d = datas.is3d,
      startDragBeforeDist = datas.startDragBeforeDist,
      startDragDist = datas.startDragDist,
      absoluteOrigin = datas.absoluteOrigin;
  var n = is3d ? 4 : 3;
  return minus(calculate(isBefore ? beforeMatrix : matrix, plus(isBefore ? startDragBeforeDist : startDragDist, [distX, distY]), n), absoluteOrigin);
}
function calculateTransformOrigin(transformOrigin, width, height, prevWidth, prevHeight, prevOrigin) {
  if (prevWidth === void 0) {
    prevWidth = width;
  }

  if (prevHeight === void 0) {
    prevHeight = height;
  }

  if (prevOrigin === void 0) {
    prevOrigin = [0, 0];
  }

  if (!transformOrigin) {
    return prevOrigin;
  }

  return transformOrigin.map(function (pos, i) {
    var _a = splitUnit(pos),
        value = _a.value,
        unit = _a.unit;

    var prevSize = i ? prevHeight : prevWidth;
    var size = i ? height : width;

    if (pos === "%" || isNaN(value)) {
      // no value but %
      var measureRatio = prevSize ? prevOrigin[i] / prevSize : 0;
      return size * measureRatio;
    } else if (unit !== "%") {
      return value;
    }

    return size * value / 100;
  });
}
function getPosIndexesByDirection(direction) {
  var indexes = [];

  if (direction[1] >= 0) {
    if (direction[0] >= 0) {
      indexes.push(3);
    }

    if (direction[0] <= 0) {
      indexes.push(2);
    }
  }

  if (direction[1] <= 0) {
    if (direction[0] >= 0) {
      indexes.push(1);
    }

    if (direction[0] <= 0) {
      indexes.push(0);
    }
  }

  return indexes;
}
function getPosesByDirection(poses, direction) {
  /*
  [-1, -1](pos1)       [0, -1](pos1,pos2)       [1, -1](pos2)
  [-1, 0](pos1, pos3)                           [1, 0](pos2, pos4)
  [-1, 1](pos3)        [0, 1](pos3, pos4)       [1, 1](pos4)
  */
  return getPosIndexesByDirection(direction).map(function (index) {
    return poses[index];
  });
}
function getPosByDirection(poses, direction) {
  /*
  [-1, -1](pos1)       [0, -1](pos1,pos2)       [1, -1](pos2)
  [-1, 0](pos1, pos3)                           [1, 0](pos2, pos4)
  [-1, 1](pos3)        [0, 1](pos3, pos4)       [1, 1](pos4)
  */
  var nextPoses = getPosesByDirection(poses, direction);
  return [average(nextPoses.map(function (pos) {
    return pos[0];
  })), average(nextPoses.map(function (pos) {
    return pos[1];
  }))];
}
function getPosByReverseDirection(poses, direction) {
  /*
  [-1, -1](pos4)       [0, -1](pos3,pos4)       [1, -1](pos3)
  [-1, 0](pos2, pos4)                           [1, 0](pos3, pos1)
  [-1, 1](pos2)        [0, 1](pos1, pos2)       [1, 1](pos1)
  */
  return getPosByDirection(poses, direction.map(function (dir) {
    return -dir;
  }));
}

function getDist(startPos, matrix, width, height, n, fixedDirection) {
  var poses = calculatePoses(matrix, width, height, n);
  var fixedPos = getPosByDirection(poses, fixedDirection);
  var distX = startPos[0] - fixedPos[0];
  var distY = startPos[1] - fixedPos[1];
  return [distX, distY];
}

function getNextMatrix(offsetMatrix, targetMatrix, origin, n) {
  return multiply(offsetMatrix, getAbsoluteMatrix(targetMatrix, n, origin), n);
}
function getNextTransformMatrix(state, datas, transform) {
  var transformOrigin = state.transformOrigin,
      offsetMatrix = state.offsetMatrix,
      is3d = state.is3d;
  var beforeTransform = datas.beforeTransform,
      afterTransform = datas.afterTransform;
  var n = is3d ? 4 : 3;
  var targetTransform = parseMat([transform]);
  return getNextMatrix(offsetMatrix, convertDimension(multiply(multiply(beforeTransform, targetTransform, 4), afterTransform, 4), 4, n), transformOrigin, n);
}
function scaleMatrix(state, scale) {
  var transformOrigin = state.transformOrigin,
      offsetMatrix = state.offsetMatrix,
      is3d = state.is3d,
      targetMatrix = state.targetMatrix;
  var n = is3d ? 4 : 3;
  return getNextMatrix(offsetMatrix, multiply(targetMatrix, createScaleMatrix(scale, n), n), transformOrigin, n);
}
function fillTransformStartEvent(e) {
  var originalDatas = e.originalDatas.beforeRenderable;
  return {
    setTransform: function (transform, index) {
      if (index === void 0) {
        index = -1;
      }

      originalDatas.startTransforms = isArray(transform) ? transform : splitSpace(transform);
      setTransformIndex(e, index);
    },
    setTransformIndex: function (index) {
      setTransformIndex(e, index);
    }
  };
}
function setDefaultTransformIndex(e) {
  setTransformIndex(e, -1);
}
function setTransformIndex(e, index) {
  var originalDatas = e.originalDatas.beforeRenderable;
  var datas = e.datas;
  datas.transformIndex = index;

  if (index === -1) {
    return;
  }

  var transform = originalDatas.startTransforms[index];

  if (!transform) {
    return;
  }

  var info = parse([transform]);
  datas.startValue = info[0].functionValue;
}
function fillOriginalTransform(e, transform) {
  var originalDatas = e.originalDatas.beforeRenderable;
  originalDatas.nextTransforms = splitSpace(transform);
}
function fillTransformEvent(moveable, nextTransform, delta, isPinch, e) {
  fillOriginalTransform(e, nextTransform);
  return {
    transform: nextTransform,
    drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, delta, isPinch, false))
  };
}
function getTranslateDist(moveable, transform, fixedDirection, fixedPosition, datas) {
  var state = moveable.state;
  var left = state.left,
      top = state.top;
  var groupable = moveable.props.groupable;
  var nextMatrix = getNextTransformMatrix(moveable.state, datas, transform);
  var groupLeft = groupable ? left : 0;
  var groupTop = groupable ? top : 0;
  var nextFixedPosition = getDirectionOffset(moveable, fixedDirection, nextMatrix);
  var dist = minus(fixedPosition, nextFixedPosition);
  return minus(dist, [groupLeft, groupTop]);
}
function getScaleDist(moveable, scaleDist, fixedDirection, fixedPosition, datas) {
  return getTranslateDist(moveable, "scale(" + scaleDist.join(", ") + ")", fixedDirection, fixedPosition, datas);
}
function getOriginDirection(moveable) {
  var _a = moveable.state,
      width = _a.width,
      height = _a.height,
      transformOrigin = _a.transformOrigin;
  return [-1 + transformOrigin[0] / (width / 2), -1 + transformOrigin[1] / (height / 2)];
}
function getDirectionOffset(moveable, direction, nextMatrix) {
  if (nextMatrix === void 0) {
    nextMatrix = moveable.state.allMatrix;
  }

  var _a = moveable.state,
      width = _a.width,
      height = _a.height,
      is3d = _a.is3d;
  var n = is3d ? 4 : 3;
  var nextFixedOffset = [width / 2 * (1 + direction[0]), height / 2 * (1 + direction[1])];
  return calculatePosition(nextMatrix, nextFixedOffset, n);
}
function getRotateDist(moveable, rotateDist, fixedPosition, datas) {
  var fixedDirection = getOriginDirection(moveable);
  return getTranslateDist(moveable, "rotate(" + rotateDist + "deg)", fixedDirection, fixedPosition, datas);
}
function getResizeDist(moveable, width, height, fixedDirection, fixedPosition, transformOrigin) {
  var groupable = moveable.props.groupable;
  var _a = moveable.state,
      prevOrigin = _a.transformOrigin,
      targetMatrix = _a.targetMatrix,
      offsetMatrix = _a.offsetMatrix,
      is3d = _a.is3d,
      prevWidth = _a.width,
      prevHeight = _a.height,
      left = _a.left,
      top = _a.top;
  var n = is3d ? 4 : 3;
  var nextOrigin = calculateTransformOrigin(transformOrigin, width, height, prevWidth, prevHeight, prevOrigin);
  var groupLeft = groupable ? left : 0;
  var groupTop = groupable ? top : 0;
  var nextMatrix = getNextMatrix(offsetMatrix, targetMatrix, nextOrigin, n);
  var dist = getDist(fixedPosition, nextMatrix, width, height, n, fixedDirection);
  return minus(dist, [groupLeft, groupTop]);
}
function getAbsolutePosition(moveable, direction) {
  return getPosByDirection(getAbsolutePosesByState(moveable.state), direction);
}

function calculateContainerPos(rootMatrix, containerRect, n) {
  var clientPos = calculatePosition(rootMatrix, [containerRect.clientLeft, containerRect.clientTop], n);
  return [containerRect.left + clientPos[0], containerRect.top + clientPos[1]];
}
function getGapGuidelines(guidelines, type, snapThreshold, index, _a, _b) {
  var start = _a[0],
      end = _a[1];
  var otherStart = _b[0],
      otherEnd = _b[1];
  var totalGuidelines = [];
  var otherIndex = index ? 0 : 1;
  var otherType = type === "vertical" ? "horizontal" : "vertical";
  var elementGuidelines = groupBy(guidelines.filter(function (_a) {
    var guidelineType = _a.type;
    return guidelineType === type;
  }), function (_a) {
    var element = _a.element;
    return element;
  }).map(function (group) {
    return group[0];
  }).filter(function (_a) {
    var pos = _a.pos,
        sizes = _a.sizes;
    return pos[otherIndex] <= otherEnd && otherStart <= pos[otherIndex] + sizes[otherIndex];
  });
  elementGuidelines.forEach(function (guideline1) {
    var elementStart = guideline1.pos[index];
    var elementEnd = elementStart + guideline1.sizes[index];
    elementGuidelines.forEach(function (guideline2) {
      var guideline2Pos = guideline2.pos,
          guideline2Sizes = guideline2.sizes,
          guideline2Element = guideline2.element,
          guidline2ClassName = guideline2.className;
      var targetStart = guideline2Pos[index];
      var targetEnd = targetStart + guideline2Sizes[index];
      var pos = 0;
      var gap = 0;
      var canSnap = true;

      if (elementEnd <= targetStart) {
        // gap -
        gap = elementEnd - targetStart;
        pos = targetEnd - gap;

        if (start < pos - snapThreshold) {
          canSnap = false;
        } // element target moveable

      } else if (targetEnd <= elementStart) {
        // gap +
        gap = elementStart - targetEnd;
        pos = targetStart - gap;

        if (end > pos + snapThreshold) {
          canSnap = false;
        } // moveable target element

      } else {
        return;
      }

      if (canSnap) {
        totalGuidelines.push({
          pos: otherType === "vertical" ? [pos, guideline2Pos[1]] : [guideline2Pos[0], pos],
          element: guideline2Element,
          sizes: guideline2Sizes,
          size: 0,
          type: otherType,
          gap: gap,
          className: guidline2ClassName,
          gapGuidelines: elementGuidelines
        });
      }

      if (elementEnd <= start && end <= targetStart) {
        // elementEnd   moveable   target
        var centerPos = (targetStart + elementEnd - (end - start)) / 2;

        if (throttle(start - (centerPos - snapThreshold), 0.1) >= 0) {
          totalGuidelines.push({
            pos: otherType === "vertical" ? [centerPos, guideline2Pos[1]] : [guideline2Pos[0], centerPos],
            className: guidline2ClassName,
            element: guideline2Element,
            sizes: guideline2Sizes,
            size: 0,
            type: otherType,
            gap: elementEnd - start,
            gapGuidelines: elementGuidelines
          });
        }
      }
    });
  });
  return totalGuidelines;
}
function addGuidelines(totalGuidelines, width, height, horizontalGuidelines, verticalGuidelines, clientLeft, clientTop) {
  if (clientLeft === void 0) {
    clientLeft = 0;
  }

  if (clientTop === void 0) {
    clientTop = 0;
  }

  horizontalGuidelines && horizontalGuidelines.forEach(function (pos) {
    totalGuidelines.push({
      type: "horizontal",
      pos: [0, throttle(pos - clientTop, 0.1)],
      size: width
    });
  });
  verticalGuidelines && verticalGuidelines.forEach(function (pos) {
    totalGuidelines.push({
      type: "vertical",
      pos: [throttle(pos - clientLeft, 0.1), 0],
      size: height
    });
  });
  return totalGuidelines;
}
function caculateElementGuidelines(moveable, values) {
  var guidelines = [];

  if (!values.length) {
    return guidelines;
  }

  var state = moveable.state;
  var snapCenter = moveable.props.snapCenter;
  var containerClientRect = state.containerClientRect,
      _a = state.targetClientRect,
      clientTop = _a.top,
      clientLeft = _a.left,
      rootMatrix = state.rootMatrix,
      is3d = state.is3d;
  var n = is3d ? 4 : 3;

  var _b = calculateContainerPos(rootMatrix, containerClientRect, n),
      containerLeft = _b[0],
      containerTop = _b[1];

  var poses = getAbsolutePosesByState(state);

  var _c = getMinMaxs(poses),
      targetLeft = _c.minX,
      targetTop = _c.minY;

  var _d = minus([targetLeft, targetTop], calculateInversePosition(rootMatrix, [clientLeft - containerLeft, clientTop - containerTop], n)).map(function (pos) {
    return roundSign(pos);
  }),
      distLeft = _d[0],
      distTop = _d[1];

  values.forEach(function (value) {
    var element = value.element,
        topValue = value.top,
        leftValue = value.left,
        rightValue = value.right,
        bottomValue = value.bottom,
        className = value.className;
    var rect = element.getBoundingClientRect();
    var left = rect.left - containerLeft;
    var top = rect.top - containerTop;
    var bottom = top + rect.height;
    var right = left + rect.width;

    var _a = calculateInversePosition(rootMatrix, [left, top], n),
        elementLeft = _a[0],
        elementTop = _a[1];

    var _b = calculateInversePosition(rootMatrix, [right, bottom], n),
        elementRight = _b[0],
        elementBottom = _b[1];

    var width = elementRight - elementLeft;
    var height = elementBottom - elementTop;
    var sizes = [width, height]; //top

    if (topValue !== false) {
      guidelines.push({
        type: "vertical",
        element: element,
        pos: [throttle(elementLeft + distLeft, 0.1), elementTop],
        size: height,
        sizes: sizes,
        className: className
      });
    } // bottom


    if (bottomValue !== false) {
      guidelines.push({
        type: "vertical",
        element: element,
        pos: [throttle(elementRight + distLeft, 0.1), elementTop],
        size: height,
        sizes: sizes,
        className: className
      });
    } // left


    if (leftValue !== false) {
      guidelines.push({
        type: "horizontal",
        element: element,
        pos: [elementLeft, throttle(elementTop + distTop, 0.1)],
        size: width,
        sizes: sizes,
        className: className
      });
    } // right


    if (rightValue !== false) {
      guidelines.push({
        type: "horizontal",
        element: element,
        pos: [elementLeft, throttle(elementBottom + distTop, 0.1)],
        size: width,
        sizes: sizes,
        className: className
      });
    }

    if (snapCenter) {
      guidelines.push({
        type: "vertical",
        element: element,
        pos: [throttle((elementLeft + elementRight) / 2 + distLeft, 0.1), elementTop],
        size: height,
        sizes: sizes,
        center: true,
        className: className
      });
      guidelines.push({
        type: "horizontal",
        element: element,
        pos: [elementLeft, throttle((elementTop + elementBottom) / 2 + distTop, 0.1)],
        size: width,
        sizes: sizes,
        center: true,
        className: className
      });
    }
  });
  return guidelines;
}
function getElementGuidelines(moveable, isRefresh, prevGuidelines) {
  if (prevGuidelines === void 0) {
    prevGuidelines = [];
  }

  var guidelines = [];
  var state = moveable.state;

  if (isRefresh && state.guidelines && state.guidelines.length) {
    return guidelines;
  }

  var _a = moveable.props.elementGuidelines,
      elementGuidelines = _a === void 0 ? [] : _a;

  if (!elementGuidelines.length) {
    return guidelines;
  }

  var prevValues = state.elementGuidelineValues || [];
  var nextValues = elementGuidelines.map(function (el) {
    if ("parentElement" in el) {
      return {
        element: el
      };
    }

    return el;
  });
  state.elementGuidelineValues = nextValues;

  var _b = diff(prevValues.map(function (v) {
    return v.element;
  }), nextValues.map(function (v) {
    return v.element;
  })),
      added = _b.added,
      removed = _b.removed;

  var removedElements = removed.map(function (index) {
    return prevValues[index].element;
  });
  var addedGuidelines = caculateElementGuidelines(moveable, added.map(function (index) {
    return nextValues[index];
  }).filter(function (value) {
    return value.refresh && isRefresh || !value.refresh && !isRefresh;
  }));
  return __spreadArrays(prevGuidelines.filter(function (guideline) {
    return removedElements.indexOf(guideline.element) === -1;
  }), addedGuidelines);
}
function getTotalGuidelines(moveable) {
  var _a = moveable.state,
      staticGuidelines = _a.staticGuidelines,
      _b = _a.containerClientRect,
      containerHeight = _b.scrollHeight,
      containerWidth = _b.scrollWidth,
      containerClientHeight = _b.clientHeight,
      containerClientWidth = _b.clientWidth,
      overflow = _b.overflow,
      clientLeft = _b.clientLeft,
      clientTop = _b.clientTop;
  var props = moveable.props;
  var _c = props.snapHorizontal,
      snapHorizontal = _c === void 0 ? true : _c,
      _d = props.snapVertical,
      snapVertical = _d === void 0 ? true : _d,
      _e = props.snapGap,
      snapGap = _e === void 0 ? true : _e,
      verticalGuidelines = props.verticalGuidelines,
      horizontalGuidelines = props.horizontalGuidelines,
      _f = props.snapThreshold,
      snapThreshold = _f === void 0 ? 5 : _f;

  var totalGuidelines = __spreadArrays(staticGuidelines, getElementGuidelines(moveable, true));

  if (snapGap) {
    var _g = getRect(getAbsolutePosesByState(moveable.state)),
        top = _g.top,
        left = _g.left,
        bottom = _g.bottom,
        right = _g.right;

    var elementGuidelines = staticGuidelines.filter(function (_a) {
      var element = _a.element;
      return element;
    });
    totalGuidelines.push.apply(totalGuidelines, __spreadArrays(getGapGuidelines(elementGuidelines, "horizontal", snapThreshold, 0, [left, right], [top, bottom]), getGapGuidelines(elementGuidelines, "vertical", snapThreshold, 1, [top, bottom], [left, right])));
  }

  addGuidelines(totalGuidelines, overflow ? containerWidth : containerClientWidth, overflow ? containerHeight : containerClientHeight, snapHorizontal && horizontalGuidelines, snapVertical && verticalGuidelines, clientLeft, clientTop);
  return totalGuidelines;
}
function checkMoveableSnapPoses(moveable, posesX, posesY, snapCenter, customSnapThreshold) {
  var props = moveable.props;
  var _a = props.snapElement,
      snapElement = _a === void 0 ? true : _a;
  var snapThreshold = selectValue(customSnapThreshold, props.snapThreshold, 5);
  return checkSnapPoses(moveable.state.guidelines, posesX, posesY, {
    snapThreshold: snapThreshold,
    snapCenter: snapCenter,
    snapElement: snapElement
  });
}
function checkSnapPoses(guidelines, posesX, posesY, options) {
  return {
    vertical: checkSnap(guidelines, "vertical", posesX, options),
    horizontal: checkSnap(guidelines, "horizontal", posesY, options)
  };
}
function checkSnapKeepRatio(moveable, startPos, endPos) {
  var endX = endPos[0],
      endY = endPos[1];
  var startX = startPos[0],
      startY = startPos[1];

  var _a = minus(endPos, startPos),
      dx = _a[0],
      dy = _a[1];

  var isBottom = dy > 0;
  var isRight = dx > 0;
  dx = getTinyDist(dx);
  dy = getTinyDist(dy);
  var verticalInfo = {
    isSnap: false,
    offset: 0,
    pos: 0
  };
  var horizontalInfo = {
    isSnap: false,
    offset: 0,
    pos: 0
  };

  if (dx === 0 && dy === 0) {
    return {
      vertical: verticalInfo,
      horizontal: horizontalInfo
    };
  }

  var _b = checkMoveableSnapPoses(moveable, dx ? [endX] : [], dy ? [endY] : []),
      verticalSnapInfo = _b.vertical,
      horizontalSnapInfo = _b.horizontal;

  verticalSnapInfo.posInfos.filter(function (_a) {
    var pos = _a.pos;
    return isRight ? pos >= startX : pos <= startX;
  });
  horizontalSnapInfo.posInfos.filter(function (_a) {
    var pos = _a.pos;
    return isBottom ? pos >= startY : pos <= startY;
  });
  verticalSnapInfo.isSnap = verticalSnapInfo.posInfos.length > 0;
  horizontalSnapInfo.isSnap = horizontalSnapInfo.posInfos.length > 0;

  var _c = getNearestSnapGuidelineInfo(verticalSnapInfo),
      isVerticalSnap = _c.isSnap,
      verticalGuideline = _c.guideline;

  var _d = getNearestSnapGuidelineInfo(horizontalSnapInfo),
      isHorizontalSnap = _d.isSnap,
      horizontalGuideline = _d.guideline;

  var horizontalPos = isHorizontalSnap ? horizontalGuideline.pos[1] : 0;
  var verticalPos = isVerticalSnap ? verticalGuideline.pos[0] : 0;

  if (dx === 0) {
    if (isHorizontalSnap) {
      horizontalInfo.isSnap = true;
      horizontalInfo.pos = horizontalGuideline.pos[1];
      horizontalInfo.offset = endY - horizontalInfo.pos;
    }
  } else if (dy === 0) {
    if (isVerticalSnap) {
      verticalInfo.isSnap = true;
      verticalInfo.pos = verticalPos;
      verticalInfo.offset = endX - verticalPos;
    }
  } else {
    // y - y1 = a * (x - x1)
    var a = dy / dx;
    var b = endPos[1] - a * endX;
    var y = 0;
    var x = 0;
    var isSnap = false;

    if (isVerticalSnap) {
      x = verticalPos;
      y = a * x + b;
      isSnap = true;
    } else if (isHorizontalSnap) {
      y = horizontalPos;
      x = (y - b) / a;
      isSnap = true;
    }

    if (isSnap) {
      verticalInfo.isSnap = true;
      verticalInfo.pos = x;
      verticalInfo.offset = endX - x;
      horizontalInfo.isSnap = true;
      horizontalInfo.pos = y;
      horizontalInfo.offset = endY - y;
    }
  }

  return {
    vertical: verticalInfo,
    horizontal: horizontalInfo
  };
}
function checkSnaps(moveable, rect, isCenter, customSnapThreshold) {
  var snapCenter = moveable.props.snapCenter;
  var isSnapCenter = snapCenter && isCenter;
  var verticalNames = ["left", "right"];
  var horizontalNames = ["top", "bottom"];

  if (isSnapCenter) {
    verticalNames.push("center");
    horizontalNames.push("middle");
  }

  verticalNames = verticalNames.filter(function (name) {
    return name in rect;
  });
  horizontalNames = horizontalNames.filter(function (name) {
    return name in rect;
  });
  return checkMoveableSnapPoses(moveable, verticalNames.map(function (name) {
    return rect[name];
  }), horizontalNames.map(function (name) {
    return rect[name];
  }), isSnapCenter, customSnapThreshold);
}
function getNearestSnapGuidelineInfo(snapInfo) {
  var isSnap = snapInfo.isSnap;

  if (!isSnap) {
    return {
      isSnap: false,
      offset: 0,
      dist: -1,
      pos: 0,
      guideline: null
    };
  }

  var posInfo = snapInfo.posInfos[0];
  var guidelineInfo = posInfo.guidelineInfos[0];
  var offset = guidelineInfo.offset;
  var dist = guidelineInfo.dist;
  var guideline = guidelineInfo.guideline;
  return {
    isSnap: isSnap,
    offset: offset,
    dist: dist,
    pos: posInfo.pos,
    guideline: guideline
  };
}

function checkSnap(guidelines, targetType, targetPoses, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.snapThreshold,
      snapThreshold = _c === void 0 ? 5 : _c,
      snapElement = _b.snapElement,
      snapCenter = _b.snapCenter;

  if (!guidelines || !guidelines.length) {
    return {
      isSnap: false,
      index: -1,
      posInfos: []
    };
  }

  var isVertical = targetType === "vertical";
  var posType = isVertical ? 0 : 1;
  var snapPosInfos = targetPoses.map(function (targetPos, index) {
    var guidelineInfos = guidelines.map(function (guideline) {
      var pos = guideline.pos;
      var offset = targetPos - pos[posType];
      return {
        offset: offset,
        dist: Math.abs(offset),
        guideline: guideline
      };
    }).filter(function (_a) {
      var guideline = _a.guideline,
          dist = _a.dist;
      var type = guideline.type,
          center = guideline.center,
          element = guideline.element;

      if (!snapElement && element || !snapCenter && center || type !== targetType || dist > snapThreshold) {
        return false;
      }

      return true;
    }).sort(function (a, b) {
      return a.dist - b.dist;
    });
    return {
      pos: targetPos,
      index: index,
      guidelineInfos: guidelineInfos
    };
  }).filter(function (snapPosInfo) {
    return snapPosInfo.guidelineInfos.length > 0;
  }).sort(function (a, b) {
    return a.guidelineInfos[0].dist - b.guidelineInfos[0].dist;
  });
  var isSnap = snapPosInfos.length > 0;
  return {
    isSnap: isSnap,
    index: isSnap ? snapPosInfos[0].index : -1,
    posInfos: snapPosInfos
  };
}

function getSnapInfosByDirection(moveable, poses, snapDirection) {
  var nextPoses = [];

  if (snapDirection[0] && snapDirection[1]) {
    nextPoses = [snapDirection, [-snapDirection[0], snapDirection[1]], [snapDirection[0], -snapDirection[1]]].map(function (direction) {
      return getPosByDirection(poses, direction);
    });
  } else if (!snapDirection[0] && !snapDirection[1]) {
    var alignPoses = [poses[0], poses[1], poses[3], poses[2], poses[0]];

    for (var i = 0; i < 4; ++i) {
      nextPoses.push(alignPoses[i]);
      nextPoses.push([(alignPoses[i][0] + alignPoses[i + 1][0]) / 2, (alignPoses[i][1] + alignPoses[i + 1][1]) / 2]);
    }
  } else {
    if (moveable.props.keepRatio) {
      nextPoses = [[-1, -1], [-1, 1], [1, -1], [1, 1], snapDirection].map(function (dir) {
        return getPosByDirection(poses, dir);
      });
    } else {
      nextPoses = getPosesByDirection(poses, snapDirection);

      if (nextPoses.length > 1) {
        nextPoses.push([(nextPoses[0][0] + nextPoses[1][0]) / 2, (nextPoses[0][1] + nextPoses[1][1]) / 2]);
      }
    }
  }

  return checkMoveableSnapPoses(moveable, nextPoses.map(function (pos) {
    return pos[0];
  }), nextPoses.map(function (pos) {
    return pos[1];
  }), true, 1);
}
function checkSnapBoundPriority(a, b) {
  var aDist = Math.abs(a.offset);
  var bDist = Math.abs(b.offset);

  if (a.isBound && b.isBound) {
    return bDist - aDist;
  } else if (a.isBound) {
    return -1;
  } else if (b.isBound) {
    return 1;
  } else if (a.isSnap && b.isSnap) {
    return bDist - aDist;
  } else if (a.isSnap) {
    return -1;
  } else if (b.isSnap) {
    return 1;
  } else if (aDist < TINY_NUM) {
    return 1;
  } else if (bDist < TINY_NUM) {
    return -1;
  }

  return aDist - bDist;
}
function getNearOffsetInfo(offsets, index) {
  return offsets.slice().sort(function (a, b) {
    var aSign = a.sign[index];
    var bSign = b.sign[index];
    var aOffset = a.offset[index];
    var bOffset = b.offset[index]; // -1 The positions of a and b do not change.
    // 1 The positions of a and b are reversed.

    if (!aSign) {
      return 1;
    } else if (!bSign) {
      return -1;
    }

    return checkSnapBoundPriority({
      isBound: a.isBound,
      isSnap: a.isSnap,
      offset: aOffset
    }, {
      isBound: b.isBound,
      isSnap: b.isSnap,
      offset: bOffset
    });
  })[0];
}

function isStartLine(dot, line) {
  // l    o     => true
  // o    l    => false
  var cx = average([line[0][0], line[1][0]]);
  var cy = average([line[0][1], line[1][1]]);
  return {
    vertical: cx <= dot[0],
    horizontal: cy <= dot[1]
  };
}

function hitTestLine(dot, _a) {
  var pos1 = _a[0],
      pos2 = _a[1];
  var dx = pos2[0] - pos1[0];
  var dy = pos2[1] - pos1[1];

  if (Math.abs(dx) < TINY_NUM) {
    dx = 0;
  }

  if (Math.abs(dy) < TINY_NUM) {
    dy = 0;
  }

  var test1;
  var test2;

  if (!dx) {
    test1 = pos1[0];
    test2 = dot[0];
  } else if (!dy) {
    test1 = pos1[1];
    test2 = dot[1];
  } else {
    var a = dy / dx; // y = a * (x - pos1) + pos1

    test1 = a * (dot[0] - pos1[0]) + pos1[1];
    test2 = dot[1];
  }

  return test1 - test2;
}

function isSameStartLine(dots, line, error) {
  if (error === void 0) {
    error = TINY_NUM;
  }

  var centerSign = hitTestLine(dots[0], line) <= 0;
  return dots.slice(1).every(function (dot) {
    var value = hitTestLine(dot, line);
    var sign = value <= 0;
    return sign === centerSign || Math.abs(value) <= error;
  });
}

function checkInnerBoundDot(pos, start, end, isStart, threshold) {
  if (threshold === void 0) {
    threshold = 0;
  }

  if (isStart && start - threshold <= pos || !isStart && pos <= end + threshold) {
    // false 402 565 602 => 37 ([0, 37])
    // true 400 524.9712603540036 600 => 124 ([124, 0])
    // true 400 410 600 => 10 ([10, 0])
    return {
      isBound: true,
      offset: isStart ? start - pos : end - pos
    };
  }

  return {
    isBound: false,
    offset: 0
  };
}

function checkInnerBound(moveable, line, center) {
  var bounds = moveable.props.innerBounds;

  if (!bounds) {
    return {
      isAllBound: false,
      isBound: false,
      isVerticalBound: false,
      isHorizontalBound: false,
      offset: [0, 0]
    };
  }

  var left = bounds.left,
      top = bounds.top,
      width = bounds.width,
      height = bounds.height;
  var leftLine = [[left, top], [left, top + height]];
  var topLine = [[left, top], [left + width, top]];
  var rightLine = [[left + width, top], [left + width, top + height]];
  var bottomLine = [[left, top + height], [left + width, top + height]];

  var _a = isStartLine(center, line),
      isHorizontalStart = _a.horizontal,
      isVerticalStart = _a.vertical;

  if (isSameStartLine([center, [left, top], [left + width, top], [left, top + height], [left + width, top + height]], line)) {
    return {
      isAllBound: false,
      isBound: false,
      isVerticalBound: false,
      isHorizontalBound: false,
      offset: [0, 0]
    };
  } // test vertical


  var topBoundInfo = checkLineBoundCollision(line, topLine, isVerticalStart);
  var bottomBoundInfo = checkLineBoundCollision(line, bottomLine, isVerticalStart); // test horizontal

  var leftBoundInfo = checkLineBoundCollision(line, leftLine, isHorizontalStart);
  var rightBoundInfo = checkLineBoundCollision(line, rightLine, isHorizontalStart);
  var isAllVerticalBound = topBoundInfo.isBound && bottomBoundInfo.isBound;
  var isVerticalBound = topBoundInfo.isBound || bottomBoundInfo.isBound;
  var isAllHorizontalBound = leftBoundInfo.isBound && rightBoundInfo.isBound;
  var isHorizontalBound = leftBoundInfo.isBound || rightBoundInfo.isBound;
  var verticalOffset = maxOffset(topBoundInfo.offset, bottomBoundInfo.offset);
  var horizontalOffset = maxOffset(leftBoundInfo.offset, rightBoundInfo.offset);
  var offset = [0, 0];
  var isBound = false;
  var isAllBound = false;

  if (Math.abs(horizontalOffset) < Math.abs(verticalOffset)) {
    offset = [verticalOffset, 0];
    isBound = isVerticalBound;
    isAllBound = isAllVerticalBound;
  } else {
    offset = [0, horizontalOffset];
    isBound = isHorizontalBound;
    isAllBound = isAllHorizontalBound;
  }

  return {
    isAllBound: isAllBound,
    isVerticalBound: isVerticalBound,
    isHorizontalBound: isHorizontalBound,
    isBound: isBound,
    offset: offset
  };
}

function checkLineBoundCollision(line, boundLine, isStart, threshold, isRender) {
  var dot1 = line[0];
  var dot2 = line[1];
  var boundDot1 = boundLine[0];
  var boundDot2 = boundLine[1];
  var dy1 = getTinyDist(dot2[1] - dot1[1]);
  var dx1 = getTinyDist(dot2[0] - dot1[0]);
  var dy2 = getTinyDist(boundDot2[1] - boundDot1[1]);
  var dx2 = getTinyDist(boundDot2[0] - boundDot1[0]); // dx2 or dy2 is zero

  if (!dx2) {
    // vertical
    if (isRender && !dy1) {
      // 90deg
      return {
        isBound: false,
        offset: 0
      };
    } else if (dx1) {
      // const y = dy1 ? dy1 / dx1 * (boundDot1[0] - dot1[0]) + dot1[1] : dot1[1];
      var y = dy1 / dx1 * (boundDot1[0] - dot1[0]) + dot1[1]; // boundDot1[1] <= y  <= boundDot2[1]

      return checkInnerBoundDot(y, boundDot1[1], boundDot2[1], isStart, threshold);
    } else {
      var offset = boundDot1[0] - dot1[0];
      var isBound = Math.abs(offset) <= (threshold || 0);
      return {
        isBound: isBound,
        offset: isBound ? offset : 0
      };
    }
  } else if (!dy2) {
    // horizontal
    if (isRender && !dx1) {
      // 90deg
      return {
        isBound: false,
        offset: 0
      };
    } else if (dy1) {
      // y = a * (x - x1) + y1
      // x = (y - y1) / a + x1
      // const a = dy1 / dx1;
      // const x = dx1 ? (boundDot1[1] - dot1[1]) / a + dot1[0] : dot1[0];
      var x = (boundDot1[1] - dot1[1]) / (dy1 / dx1) + dot1[0]; // boundDot1[0] <= x && x <= boundDot2[0]

      return checkInnerBoundDot(x, boundDot1[0], boundDot2[0], isStart, threshold);
    } else {
      var offset = boundDot1[1] - dot1[1];
      var isBound = Math.abs(offset) <= (threshold || 0);
      return {
        isBound: isBound,
        offset: isBound ? offset : 0
      };
    }
  }

  return {
    isBound: false,
    offset: 0
  };
}

function getInnerBoundInfo(moveable, lines, center, datas) {
  return lines.map(function (_a) {
    var multiple = _a[0],
        pos1 = _a[1],
        pos2 = _a[2];

    var _b = checkInnerBound(moveable, [pos1, pos2], center),
        isBound = _b.isBound,
        offset = _b.offset,
        isVerticalBound = _b.isVerticalBound,
        isHorizontalBound = _b.isHorizontalBound;

    var sizeOffset = getDragDist({
      datas: datas,
      distX: offset[0],
      distY: offset[1]
    }).map(function (size, i) {
      return size * (multiple[i] ? 2 / multiple[i] : 0);
    });
    return {
      sign: multiple,
      isBound: isBound,
      isVerticalBound: isVerticalBound,
      isHorizontalBound: isHorizontalBound,
      isSnap: false,
      offset: sizeOffset
    };
  });
}
function getInnerBoundDragInfo(moveable, poses, datas) {
  var _a;

  var lines = getCheckInnerBoundLines(poses, [0, 0], false).map(function (_a) {
    var sign = _a[0],
        pos1 = _a[1],
        pos2 = _a[2];
    return [sign.map(function (dir) {
      return Math.abs(dir) * 2;
    }), pos1, pos2];
  });
  var innerBoundInfo = getInnerBoundInfo(moveable, lines, getPosByDirection(poses, [0, 0]), datas);
  var widthOffsetInfo = getNearOffsetInfo(innerBoundInfo, 0);
  var heightOffsetInfo = getNearOffsetInfo(innerBoundInfo, 1);
  var verticalOffset = 0;
  var horizontalOffset = 0;
  var isVerticalBound = widthOffsetInfo.isVerticalBound || heightOffsetInfo.isVerticalBound;
  var isHorizontalBound = widthOffsetInfo.isHorizontalBound || heightOffsetInfo.isHorizontalBound;

  if (isVerticalBound || isHorizontalBound) {
    _a = getInverseDragDist({
      datas: datas,
      distX: -widthOffsetInfo.offset[0],
      distY: -heightOffsetInfo.offset[1]
    }), verticalOffset = _a[0], horizontalOffset = _a[1];
  }

  return {
    vertical: {
      isBound: isVerticalBound,
      offset: verticalOffset
    },
    horizontal: {
      isBound: isHorizontalBound,
      offset: horizontalOffset
    }
  };
}
function getCheckSnapLineDirections(direction, keepRatio) {
  var lineDirections = [];
  var x = direction[0];
  var y = direction[1];

  if (x && y) {
    lineDirections.push([[0, y * 2], direction, [-x, y]], [[x * 2, 0], direction, [x, -y]]);
  } else if (x) {
    // vertcal
    lineDirections.push([[x * 2, 0], [x, 1], [x, -1]]);

    if (keepRatio) {
      lineDirections.push([[0, -1], [x, -1], [-x, -1]], [[0, 1], [x, 1], [-x, 1]]);
    }
  } else if (y) {
    // horizontal
    lineDirections.push([[0, y * 2], [1, y], [-1, y]]);

    if (keepRatio) {
      lineDirections.push([[-1, 0], [-1, y], [-1, -y]], [[1, 0], [1, y], [1, -y]]);
    }
  } else {
    // [0, 0] to all direction
    lineDirections.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]);
  }

  return lineDirections;
}
function getCheckInnerBoundLines(poses, direction, keepRatio) {
  return getCheckSnapLineDirections(direction, keepRatio).map(function (_a) {
    var sign = _a[0],
        dir1 = _a[1],
        dir2 = _a[2];
    return [sign, getPosByDirection(poses, dir1), getPosByDirection(poses, dir2)];
  });
}

function isBoundRotate(relativePoses, boundDots, center, rad) {
  var nextPoses = rad ? relativePoses.map(function (pos) {
    return rotate(pos, rad);
  }) : relativePoses;

  var dots = __spreadArrays([center], boundDots);

  return [[nextPoses[0], nextPoses[1]], [nextPoses[1], nextPoses[3]], [nextPoses[3], nextPoses[2]], [nextPoses[2], nextPoses[0]]].some(function (line) {
    return !isSameStartLine(dots, line);
  });
}

function getDistPointLine(_a) {
  // x = 0, y = 0
  // d = (ax + by + c) / root(a2 + b2)
  var pos1 = _a[0],
      pos2 = _a[1];
  var dx = pos2[0] - pos1[0];
  var dy = pos2[1] - pos1[1];

  if (!dx) {
    return Math.abs(pos1[0]);
  }

  if (!dy) {
    return Math.abs(pos1[1]);
  } // y - y1 = a(x - x1)
  // 0 = ax -y + -a * x1 + y1


  var a = dy / dx;
  return Math.abs((-a * pos1[0] + pos1[1]) / Math.sqrt(Math.pow(a, 2) + 1));
}

function solveReverseLine(_a) {
  var pos1 = _a[0],
      pos2 = _a[1];
  var dx = pos2[0] - pos1[0];
  var dy = pos2[1] - pos1[1];

  if (!dx) {
    return [pos1[0], 0];
  }

  if (!dy) {
    return [0, pos1[1]];
  }

  var a = dy / dx; // y - y1 = a (x  - x1)
  // y = ax - a * x1 + y1

  var b = -a * pos1[0] + pos1[1]; // y = ax + b = -1/a x
  // x = -b / (a + 1 / a)
  // y = b / (1 + 1 / a^2)

  return [-b / (a + 1 / a), b / (a * a + 1)];
}

function checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin, rotation) {
  var bounds = moveable.props.innerBounds;
  var rad = rotation * Math.PI / 180;

  if (!bounds) {
    return [];
  }

  var left = bounds.left,
      top = bounds.top,
      width = bounds.width,
      height = bounds.height;
  var relativeLeft = left - origin[0];
  var relativeRight = left + width - origin[0];
  var relativeTop = top - origin[1];
  var relativeBottom = top + height - origin[1];
  var dots = [[relativeLeft, relativeTop], [relativeRight, relativeTop], [relativeLeft, relativeBottom], [relativeRight, relativeBottom]];
  var center = getPosByDirection(nextPoses, [0, 0]);

  if (!isBoundRotate(nextPoses, dots, center, 0)) {
    return [];
  }

  var result = [];
  var dotInfos = dots.map(function (dot) {
    return [getDistSize(dot), getRad([0, 0], dot)];
  });
  [[nextPoses[0], nextPoses[1]], [nextPoses[1], nextPoses[3]], [nextPoses[3], nextPoses[2]], [nextPoses[2], nextPoses[0]]].forEach(function (line) {
    var lineRad = getRad([0, 0], solveReverseLine(line));
    var lineDist = getDistPointLine(line);
    result.push.apply(result, dotInfos.filter(function (_a) {
      var dotDist = _a[0];
      return dotDist && lineDist <= dotDist;
    }).map(function (_a) {
      var dotDist = _a[0],
          dotRad = _a[1];
      var distRad = Math.acos(dotDist ? lineDist / dotDist : 0);
      var nextRad1 = dotRad + distRad;
      var nextRad2 = dotRad - distRad;
      return [rad + nextRad1 - lineRad, rad + nextRad2 - lineRad];
    }).reduce(function (prev, cur) {
      prev.push.apply(prev, cur);
      return prev;
    }, []).filter(function (nextRad) {
      return !isBoundRotate(prevPoses, dots, center, nextRad);
    }).map(function (nextRad) {
      return throttle(nextRad * 180 / Math.PI, TINY_NUM);
    }));
  });
  return result;
}
function checkInnerBoundPoses(moveable) {
  var innerBounds = moveable.props.innerBounds;

  if (!innerBounds) {
    return {
      vertical: [],
      horizontal: []
    };
  }

  var _a = moveable.getRect(),
      pos1 = _a.pos1,
      pos2 = _a.pos2,
      pos3 = _a.pos3,
      pos4 = _a.pos4;

  var poses = [pos1, pos2, pos3, pos4];
  var center = getPosByDirection(poses, [0, 0]);
  var left = innerBounds.left,
      top = innerBounds.top,
      width = innerBounds.width,
      height = innerBounds.height;
  var leftLine = [[left, top], [left, top + height]];
  var topLine = [[left, top], [left + width, top]];
  var rightLine = [[left + width, top], [left + width, top + height]];
  var bottomLine = [[left, top + height], [left + width, top + height]];
  var lines = [[pos1, pos2], [pos2, pos4], [pos4, pos3], [pos3, pos1]];
  var horizontalPoses = [];
  var verticalPoses = [];
  var boundMap = {
    top: false,
    bottom: false,
    left: false,
    right: false
  };
  lines.forEach(function (line) {
    var _a = isStartLine(center, line),
        isHorizontalStart = _a.horizontal,
        isVerticalStart = _a.vertical; // test vertical


    var topBoundInfo = checkLineBoundCollision(line, topLine, isVerticalStart, 1, true);
    var bottomBoundInfo = checkLineBoundCollision(line, bottomLine, isVerticalStart, 1, true); // test horizontal

    var leftBoundInfo = checkLineBoundCollision(line, leftLine, isHorizontalStart, 1, true);
    var rightBoundInfo = checkLineBoundCollision(line, rightLine, isHorizontalStart, 1, true);

    if (topBoundInfo.isBound && !boundMap.top) {
      horizontalPoses.push(top);
      boundMap.top = true;
    }

    if (bottomBoundInfo.isBound && !boundMap.bottom) {
      horizontalPoses.push(top + height);
      boundMap.bottom = true;
    }

    if (leftBoundInfo.isBound && !boundMap.left) {
      verticalPoses.push(left);
      boundMap.left = true;
    }

    if (rightBoundInfo.isBound && !boundMap.right) {
      verticalPoses.push(left + width);
      boundMap.right = true;
    }
  });
  return {
    horizontal: horizontalPoses,
    vertical: verticalPoses
  };
}

function checkBoundPoses(bounds, verticalPoses, horizontalPoses) {
  var _a = bounds || {},
      _b = _a.left,
      left = _b === void 0 ? -Infinity : _b,
      _c = _a.top,
      top = _c === void 0 ? -Infinity : _c,
      _d = _a.right,
      right = _d === void 0 ? Infinity : _d,
      _e = _a.bottom,
      bottom = _e === void 0 ? Infinity : _e;

  var nextBounds = {
    left: left,
    top: top,
    right: right,
    bottom: bottom
  };
  return {
    vertical: checkBounds(nextBounds, verticalPoses, true),
    horizontal: checkBounds(nextBounds, horizontalPoses, false)
  };
}
function checkBoundKeepRatio(moveable, startPos, endPos) {
  var _a = moveable.props.bounds || {},
      _b = _a.left,
      left = _b === void 0 ? -Infinity : _b,
      _c = _a.top,
      top = _c === void 0 ? -Infinity : _c,
      _d = _a.right,
      right = _d === void 0 ? Infinity : _d,
      _e = _a.bottom,
      bottom = _e === void 0 ? Infinity : _e;

  var endX = endPos[0],
      endY = endPos[1];

  var _f = minus(endPos, startPos),
      dx = _f[0],
      dy = _f[1];

  if (Math.abs(dx) < TINY_NUM) {
    dx = 0;
  }

  if (Math.abs(dy) < TINY_NUM) {
    dy = 0;
  }

  var isBottom = dy > 0;
  var isRight = dx > 0;
  var verticalInfo = {
    isBound: false,
    offset: 0,
    pos: 0
  };
  var horizontalInfo = {
    isBound: false,
    offset: 0,
    pos: 0
  };

  if (dx === 0 && dy === 0) {
    return {
      vertical: verticalInfo,
      horizontal: horizontalInfo
    };
  } else if (dx === 0) {
    if (isBottom) {
      if (bottom < endY) {
        horizontalInfo.pos = bottom;
        horizontalInfo.offset = endY - bottom;
      }
    } else {
      if (top > endY) {
        horizontalInfo.pos = top;
        horizontalInfo.offset = endY - top;
      }
    }
  } else if (dy === 0) {
    if (isRight) {
      if (right < endX) {
        verticalInfo.pos = right;
        verticalInfo.offset = endX - right;
      }
    } else {
      if (left > endX) {
        verticalInfo.pos = left;
        verticalInfo.offset = endX - left;
      }
    }
  } else {
    // y - y1 = a * (x - x1)
    var a = dy / dx;
    var b = endPos[1] - a * endX;
    var y = 0;
    var x = 0;
    var isBound = false;

    if (isRight && right <= endX) {
      y = a * right + b;
      x = right;
      isBound = true;
    } else if (!isRight && endX <= left) {
      y = a * left + b;
      x = left;
      isBound = true;
    }

    if (isBound) {
      if (y < top || y > bottom) {
        isBound = false;
      }
    }

    if (!isBound) {
      if (isBottom && bottom <= endY) {
        y = bottom;
        x = (y - b) / a;
        isBound = true;
      } else if (!isBottom && endY <= top) {
        y = top;
        x = (y - b) / a;
        isBound = true;
      }
    }

    if (isBound) {
      verticalInfo.isBound = true;
      verticalInfo.pos = x;
      verticalInfo.offset = endX - x;
      horizontalInfo.isBound = true;
      horizontalInfo.pos = y;
      horizontalInfo.offset = endY - y;
    }
  }

  return {
    vertical: verticalInfo,
    horizontal: horizontalInfo
  };
}

function checkBounds(bounds, poses, isVertical) {
  // 0   [100 - 200]  300
  var startBoundPos = bounds[isVertical ? "left" : "top"];
  var endBoundPos = bounds[isVertical ? "right" : "bottom"]; // 450

  var minPos = Math.min.apply(Math, poses);
  var maxPos = Math.max.apply(Math, poses);
  var boundInfos = [];

  if (startBoundPos + 1 > minPos) {
    boundInfos.push({
      isBound: true,
      offset: minPos - startBoundPos,
      pos: startBoundPos
    });
  }

  if (endBoundPos - 1 < maxPos) {
    boundInfos.push({
      isBound: true,
      offset: maxPos - endBoundPos,
      pos: endBoundPos
    });
  }

  if (!boundInfos.length) {
    boundInfos.push({
      isBound: false,
      offset: 0,
      pos: 0
    });
  }

  return boundInfos.sort(function (a, b) {
    return Math.abs(b.offset) - Math.abs(a.offset);
  });
}

function isBoundRotate$1(relativePoses, boundRect, rad) {
  var nextPoses = rad ? relativePoses.map(function (pos) {
    return rotate(pos, rad);
  }) : relativePoses;
  return nextPoses.some(function (pos) {
    return pos[0] < boundRect.left && Math.abs(pos[0] - boundRect.left) > 0.1 || pos[0] > boundRect.right && Math.abs(pos[0] - boundRect.right) > 0.1 || pos[1] < boundRect.top && Math.abs(pos[1] - boundRect.top) > 0.1 || pos[1] > boundRect.bottom && Math.abs(pos[1] - boundRect.bottom) > 0.1;
  });
}
function boundRotate(vec, boundPos, index) {
  var r = getDistSize(vec);
  var nextPos = Math.sqrt(r * r - boundPos * boundPos) || 0;
  return [nextPos, -nextPos].sort(function (a, b) {
    return Math.abs(a - vec[index ? 0 : 1]) - Math.abs(b - vec[index ? 0 : 1]);
  }).map(function (pos) {
    return getRad([0, 0], index ? [pos, boundPos] : [boundPos, pos]);
  });
}
function checkRotateBounds(moveable, prevPoses, nextPoses, origin, rotation) {
  var bounds = moveable.props.bounds;
  var rad = rotation * Math.PI / 180;

  if (!bounds) {
    return [];
  }

  var _a = bounds.left,
      left = _a === void 0 ? -Infinity : _a,
      _b = bounds.top,
      top = _b === void 0 ? -Infinity : _b,
      _c = bounds.right,
      right = _c === void 0 ? Infinity : _c,
      _d = bounds.bottom,
      bottom = _d === void 0 ? Infinity : _d;
  var relativeLeft = left - origin[0];
  var relativeRight = right - origin[0];
  var relativeTop = top - origin[1];
  var relativeBottom = bottom - origin[1];
  var boundRect = {
    left: relativeLeft,
    top: relativeTop,
    right: relativeRight,
    bottom: relativeBottom
  };

  if (!isBoundRotate$1(nextPoses, boundRect, 0)) {
    return [];
  }

  var result = [];
  [[relativeLeft, 0], [relativeRight, 0], [relativeTop, 1], [relativeBottom, 1]].forEach(function (_a) {
    var boundPos = _a[0],
        index = _a[1];
    nextPoses.forEach(function (nextPos) {
      var relativeRad1 = getRad([0, 0], nextPos);
      result.push.apply(result, boundRotate(nextPos, boundPos, index).map(function (relativeRad2) {
        return rad + relativeRad2 - relativeRad1;
      }).filter(function (nextRad) {
        return !isBoundRotate$1(prevPoses, boundRect, nextRad);
      }).map(function (nextRad) {
        return throttle(nextRad * 180 / Math.PI, TINY_NUM);
      }));
    });
  });
  return result;
}

var DIRECTION_NAMES = {
  horizontal: ["left", "top", "width", "Y", "X"],
  vertical: ["top", "left", "height", "X", "Y"]
};
function snapStart(moveable) {
  var state = moveable.state;

  if (state.guidelines && state.guidelines.length) {
    return;
  }

  state.elementGuidelineValues = [];
  state.staticGuidelines = getElementGuidelines(moveable, false);
  state.guidelines = getTotalGuidelines(moveable);
  state.enableSnap = true;
}
function hasGuidelines(moveable, ableName) {
  var _a = moveable.props,
      snappable = _a.snappable,
      bounds = _a.bounds,
      innerBounds = _a.innerBounds,
      verticalGuidelines = _a.verticalGuidelines,
      horizontalGuidelines = _a.horizontalGuidelines,
      _b = moveable.state,
      guidelines = _b.guidelines,
      enableSnap = _b.enableSnap;

  if (!snappable || !enableSnap || ableName && snappable !== true && snappable.indexOf(ableName) < 0) {
    return false;
  }

  if (bounds || innerBounds || guidelines && guidelines.length || verticalGuidelines && verticalGuidelines.length || horizontalGuidelines && horizontalGuidelines.length) {
    return true;
  }

  return false;
}

function solveNextOffset(pos1, pos2, offset, isVertical, datas) {
  var sizeOffset = solveEquation(pos1, pos2, offset, isVertical);

  if (!sizeOffset) {
    return [0, 0];
  }

  var _a = getDragDist({
    datas: datas,
    distX: sizeOffset[0],
    distY: sizeOffset[1]
  }),
      widthOffset = _a[0],
      heightOffset = _a[1];

  return [widthOffset, heightOffset];
}

function getNextFixedPoses(matrix, width, height, fixedPos, direction, is3d) {
  var nextPoses = calculatePoses(matrix, width, height, is3d ? 4 : 3);
  var nextPos = getPosByReverseDirection(nextPoses, direction);
  return getAbsolutePoses(nextPoses, minus(fixedPos, nextPos));
}

function getSnapBoundOffset(boundInfo, snapInfo) {
  if (boundInfo.isBound) {
    return boundInfo.offset;
  } else if (snapInfo.isSnap) {
    return snapInfo.offset;
  }

  return 0;
}

function getSnapBound(boundInfo, snapInfo) {
  if (boundInfo.isBound) {
    return boundInfo.offset;
  } else if (snapInfo.isSnap) {
    return getNearestSnapGuidelineInfo(snapInfo).offset;
  }

  return 0;
}

function checkSnapBoundsKeepRatio(moveable, startPos, endPos, isRequest) {
  var _a = checkBoundKeepRatio(moveable, startPos, endPos),
      horizontalBoundInfo = _a.horizontal,
      verticalBoundInfo = _a.vertical;

  var _b = isRequest ? {
    horizontal: {
      isSnap: false
    },
    vertical: {
      isSnap: false
    }
  } : checkSnapKeepRatio(moveable, startPos, endPos),
      horizontalSnapInfo = _b.horizontal,
      verticalSnapInfo = _b.vertical;

  var horizontalOffset = getSnapBoundOffset(horizontalBoundInfo, horizontalSnapInfo);
  var verticalOffset = getSnapBoundOffset(verticalBoundInfo, verticalSnapInfo);
  var horizontalDist = Math.abs(horizontalOffset);
  var verticalDist = Math.abs(verticalOffset);
  return {
    horizontal: {
      isBound: horizontalBoundInfo.isBound,
      isSnap: horizontalSnapInfo.isSnap,
      offset: horizontalOffset,
      dist: horizontalDist
    },
    vertical: {
      isBound: verticalBoundInfo.isBound,
      isSnap: verticalSnapInfo.isSnap,
      offset: verticalOffset,
      dist: verticalDist
    }
  };
}
function checkMoveableSnapBounds(moveable, isRequest, poses, boundPoses) {
  if (boundPoses === void 0) {
    boundPoses = poses;
  }

  var _a = checkBoundPoses(moveable.props.bounds, boundPoses.map(function (pos) {
    return pos[0];
  }), boundPoses.map(function (pos) {
    return pos[1];
  })),
      horizontalBoundInfos = _a.horizontal,
      verticalBoundInfos = _a.vertical;

  var _b = isRequest ? {
    horizontal: {
      isSnap: false,
      index: -1
    },
    vertical: {
      isSnap: false,
      index: -1
    }
  } : checkMoveableSnapPoses(moveable, poses.map(function (pos) {
    return pos[0];
  }), poses.map(function (pos) {
    return pos[1];
  }), moveable.props.snapCenter),
      horizontalSnapInfo = _b.horizontal,
      verticalSnapInfo = _b.vertical;

  var horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
  var verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
  var horizontalDist = Math.abs(horizontalOffset);
  var verticalDist = Math.abs(verticalOffset);
  return {
    horizontal: {
      isBound: horizontalBoundInfos[0].isBound,
      isSnap: horizontalSnapInfo.isSnap,
      snapIndex: horizontalSnapInfo.index,
      offset: horizontalOffset,
      dist: horizontalDist,
      bounds: horizontalBoundInfos,
      snap: horizontalSnapInfo
    },
    vertical: {
      isBound: verticalBoundInfos[0].isBound,
      isSnap: verticalSnapInfo.isSnap,
      snapIndex: verticalSnapInfo.index,
      offset: verticalOffset,
      dist: verticalDist,
      bounds: verticalBoundInfos,
      snap: verticalSnapInfo
    }
  };
}
function checkSnapBounds(guideines, bounds, posesX, posesY, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = checkBoundPoses(bounds, posesX, posesY),
      horizontalBoundInfos = _a.horizontal,
      verticalBoundInfos = _a.vertical;

  var _b = options.isRequest ? {
    horizontal: {
      isSnap: false,
      index: -1
    },
    vertical: {
      isSnap: false,
      index: -1
    }
  } : checkSnapPoses(guideines, posesX, posesY, options),
      horizontalSnapInfo = _b.horizontal,
      verticalSnapInfo = _b.vertical;

  var horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
  var verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
  var horizontalDist = Math.abs(horizontalOffset);
  var verticalDist = Math.abs(verticalOffset);
  return {
    horizontal: {
      isBound: horizontalBoundInfos[0].isBound,
      isSnap: horizontalSnapInfo.isSnap,
      snapIndex: horizontalSnapInfo.index,
      offset: horizontalOffset,
      dist: horizontalDist,
      bounds: horizontalBoundInfos,
      snap: horizontalSnapInfo
    },
    vertical: {
      isBound: verticalBoundInfos[0].isBound,
      isSnap: verticalSnapInfo.isSnap,
      snapIndex: verticalSnapInfo.index,
      offset: verticalOffset,
      dist: verticalDist,
      bounds: verticalBoundInfos,
      snap: verticalSnapInfo
    }
  };
}
function normalized(value) {
  return value ? value / Math.abs(value) : 0;
}
function checkMaxBounds(moveable, poses, direction, fixedPosition, datas) {
  var fixedDirection = [-direction[0], -direction[1]];
  var _a = moveable.state,
      width = _a.width,
      height = _a.height;
  var bounds = moveable.props.bounds;
  var maxWidth = Infinity;
  var maxHeight = Infinity;

  if (bounds) {
    var directions = [[direction[0], -direction[1]], [-direction[0], direction[1]]];
    var _b = bounds.left,
        left_1 = _b === void 0 ? -Infinity : _b,
        _c = bounds.top,
        top_1 = _c === void 0 ? -Infinity : _c,
        _d = bounds.right,
        right_1 = _d === void 0 ? Infinity : _d,
        _e = bounds.bottom,
        bottom_1 = _e === void 0 ? Infinity : _e;
    directions.forEach(function (otherDirection) {
      var isCheckVertical = otherDirection[0] !== fixedDirection[0];
      var isCheckHorizontal = otherDirection[1] !== fixedDirection[1];
      var otherPos = getPosByDirection(poses, otherDirection);
      var verticalDirection = normalized(otherDirection[1] - fixedDirection[1]);
      var horizontalDirection = normalized(otherDirection[0] - fixedDirection[0]);
      var deg = getRad(fixedPosition, otherPos) * 360 / Math.PI;

      if (isCheckHorizontal) {
        var nextOtherPos = otherPos.slice();

        if (Math.abs(deg - 360) < 2 || Math.abs(deg - 180) < 2) {
          nextOtherPos[1] = fixedPosition[1];
        }

        var _a = solveNextOffset(fixedPosition, nextOtherPos, (fixedPosition[1] < otherPos[1] ? bottom_1 : top_1) - otherPos[1], false, datas),
            heightOffset = _a[1];

        if (!isNaN(heightOffset)) {
          maxHeight = height + verticalDirection * heightOffset;
        }
      }

      if (isCheckVertical) {
        var nextOtherPos = otherPos.slice();

        if (Math.abs(deg - 90) < 2 || Math.abs(deg - 270) < 2) {
          nextOtherPos[0] = fixedPosition[0];
        }

        var widthOffset = solveNextOffset(fixedPosition, nextOtherPos, (fixedPosition[0] < otherPos[0] ? right_1 : left_1) - otherPos[0], true, datas)[0];

        if (!isNaN(widthOffset)) {
          maxWidth = width + horizontalDirection * widthOffset;
        }
      }
    });
  }

  return {
    maxWidth: maxWidth,
    maxHeight: maxHeight
  };
}

function checkSnapRightLine(startPos, endPos, snapBoundInfo, keepRatio) {
  var rad = getRad(startPos, endPos) / Math.PI * 180;
  var _a = snapBoundInfo.vertical,
      isVerticalBound = _a.isBound,
      isVerticalSnap = _a.isSnap,
      verticalDist = _a.dist,
      _b = snapBoundInfo.horizontal,
      isHorizontalBound = _b.isBound,
      isHorizontalSnap = _b.isSnap,
      horizontalDist = _b.dist;
  var rad180 = rad % 180;
  var isHorizontalLine = rad180 < 3 || rad180 > 177;
  var isVerticalLine = rad180 > 87 && rad180 < 93;

  if (horizontalDist < verticalDist) {
    if (isVerticalBound || isVerticalSnap && !isVerticalLine && (!keepRatio || !isHorizontalLine)) {
      return "vertical";
    }
  }

  if (isHorizontalBound || isHorizontalSnap && !isHorizontalLine && (!keepRatio || !isVerticalLine)) {
    return "horizontal";
  }

  return "";
}

function getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas) {
  return directions.map(function (_a) {
    var startDirection = _a[0],
        endDirection = _a[1];
    var otherStartPos = getPosByDirection(poses, startDirection);
    var otherEndPos = getPosByDirection(poses, endDirection);
    var snapBoundInfo = keepRatio ? checkSnapBoundsKeepRatio(moveable, otherStartPos, otherEndPos, isRequest) : checkMoveableSnapBounds(moveable, isRequest, [otherEndPos]);
    var _b = snapBoundInfo.horizontal,
        // dist: otherHorizontalDist,
    otherHorizontalOffset = _b.offset,
        isOtherHorizontalBound = _b.isBound,
        isOtherHorizontalSnap = _b.isSnap,
        _c = snapBoundInfo.vertical,
        // dist: otherVerticalDist,
    otherVerticalOffset = _c.offset,
        isOtherVerticalBound = _c.isBound,
        isOtherVerticalSnap = _c.isSnap;
    var multiple = minus(endDirection, startDirection);

    if (!otherVerticalOffset && !otherHorizontalOffset) {
      return {
        isBound: isOtherVerticalBound || isOtherHorizontalBound,
        isSnap: isOtherVerticalSnap || isOtherHorizontalSnap,
        sign: multiple,
        offset: [0, 0]
      };
    }

    var snapLine = checkSnapRightLine(otherStartPos, otherEndPos, snapBoundInfo, keepRatio);

    if (!snapLine) {
      return {
        sign: multiple,
        isBound: false,
        isSnap: false,
        offset: [0, 0]
      };
    }

    var isVertical = snapLine === "vertical";
    var sizeOffset = solveNextOffset(otherStartPos, otherEndPos, -(isVertical ? otherVerticalOffset : otherHorizontalOffset), isVertical, datas).map(function (size, i) {
      return size * (multiple[i] ? 2 / multiple[i] : 0);
    });
    return {
      sign: multiple,
      isBound: isVertical ? isOtherVerticalBound : isOtherHorizontalBound,
      isSnap: isVertical ? isOtherVerticalSnap : isOtherHorizontalSnap,
      offset: sizeOffset
    };
  });
}

function getCheckSnapDirections(direction, keepRatio) {
  var directions = [];
  var fixedDirection = [-direction[0], -direction[1]];

  if (direction[0] && direction[1]) {
    directions.push([fixedDirection, [direction[0], -direction[1]]], [fixedDirection, [-direction[0], direction[1]]]);

    if (keepRatio) {
      // pass two direction condition
      directions.push([fixedDirection, direction]);
    }
  } else if (direction[0]) {
    // vertcal
    if (keepRatio) {
      directions.push([fixedDirection, [fixedDirection[0], -1]], [fixedDirection, [fixedDirection[0], 1]], [fixedDirection, [direction[0], -1]], [fixedDirection, direction], [fixedDirection, [direction[0], 1]]);
    } else {
      directions.push([[fixedDirection[0], -1], [direction[0], -1]], [[fixedDirection[0], 0], [direction[0], 0]], [[fixedDirection[0], 1], [direction[0], 1]]);
    }
  } else if (direction[1]) {
    // horizontal
    if (keepRatio) {
      directions.push([fixedDirection, [-1, fixedDirection[1]]], [fixedDirection, [1, fixedDirection[1]]], [fixedDirection, [-1, direction[1]]], [fixedDirection, [1, direction[1]]], [fixedDirection, direction]);
    } else {
      directions.push([[-1, fixedDirection[1]], [-1, direction[1]]], [[0, fixedDirection[1]], [0, direction[1]]], [[1, fixedDirection[1]], [1, direction[1]]]);
    }
  } else {
    // [0, 0] to all direction
    directions.push([fixedDirection, [1, 0]], [fixedDirection, [-1, 0]], [fixedDirection, [0, -1]], [fixedDirection, [0, 1]], [[1, 0], [1, -1]], [[1, 0], [1, 1]], [[0, 1], [1, 1]], [[0, 1], [-1, 1]], [[-1, 0], [-1, -1]], [[-1, 0], [-1, 1]], [[0, -1], [1, -1]], [[0, -1], [-1, -1]]);
  }

  return directions;
}
function getSizeOffsetInfo(moveable, poses, direction, keepRatio, isRequest, datas) {
  var directions = getCheckSnapDirections(direction, keepRatio);
  var lines = getCheckInnerBoundLines(poses, direction, keepRatio);

  var offsets = __spreadArrays(getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas), getInnerBoundInfo(moveable, lines, getPosByDirection(poses, [0, 0]), datas));

  var widthOffsetInfo = getNearOffsetInfo(offsets, 0);
  var heightOffsetInfo = getNearOffsetInfo(offsets, 1);
  return {
    width: {
      isBound: widthOffsetInfo.isBound,
      offset: widthOffsetInfo.offset[0]
    },
    height: {
      isBound: heightOffsetInfo.isBound,
      offset: heightOffsetInfo.offset[1]
    }
  };
}
function recheckSizeByTwoDirection(moveable, poses, width, height, maxWidth, maxHeight, direction, isRequest, datas) {
  var snapPos = getPosByDirection(poses, direction);

  var _a = checkMoveableSnapBounds(moveable, isRequest, [snapPos]),
      horizontalOffset = _a.horizontal.offset,
      verticalOffset = _a.vertical.offset;

  if (verticalOffset || horizontalOffset) {
    var _b = getDragDist({
      datas: datas,
      distX: -verticalOffset,
      distY: -horizontalOffset
    }),
        nextWidthOffset = _b[0],
        nextHeightOffset = _b[1];

    var nextWidth = Math.min(maxWidth || Infinity, width + direction[0] * nextWidthOffset);
    var nextHeight = Math.min(maxHeight || Infinity, height + direction[1] * nextHeightOffset);
    return [nextWidth - width, nextHeight - height];
  }

  return [0, 0];
}
function checkSizeDist(moveable, getNextPoses, width, height, direction, fixedPosition, isRequest, datas) {
  var poses = getAbsolutePosesByState(moveable.state);
  var keepRatio = moveable.props.keepRatio;
  var widthOffset = 0;
  var heightOffset = 0;

  for (var i = 0; i < 2; ++i) {
    var nextPoses = getNextPoses(widthOffset, heightOffset);

    var _a = getSizeOffsetInfo(moveable, nextPoses, direction, keepRatio, isRequest, datas),
        widthOffsetInfo = _a.width,
        heightOffsetInfo = _a.height;

    var isWidthBound = widthOffsetInfo.isBound;
    var isHeightBound = heightOffsetInfo.isBound;
    var nextWidthOffset = widthOffsetInfo.offset;
    var nextHeightOffset = heightOffsetInfo.offset;

    if (i === 1) {
      if (!isWidthBound) {
        nextWidthOffset = 0;
      }

      if (!isHeightBound) {
        nextHeightOffset = 0;
      }
    }

    if (i === 0 && isRequest && !isWidthBound && !isHeightBound) {
      return [0, 0];
    }

    if (keepRatio) {
      var widthDist = Math.abs(nextWidthOffset) * (width ? 1 / width : 1);
      var heightDist = Math.abs(nextHeightOffset) * (height ? 1 / height : 1);
      var isGetWidthOffset = isWidthBound && isHeightBound ? widthDist < heightDist : isHeightBound || !isWidthBound && widthDist < heightDist;

      if (isGetWidthOffset) {
        // width : height = ? : heightOffset
        nextWidthOffset = width * nextHeightOffset / height;
      } else {
        // width : height = widthOffset : ?
        nextHeightOffset = height * nextWidthOffset / width;
      }
    }

    widthOffset += nextWidthOffset;
    heightOffset += nextHeightOffset;
  }

  if (direction[0] && direction[1]) {
    var _b = checkMaxBounds(moveable, poses, direction, fixedPosition, datas),
        maxWidth = _b.maxWidth,
        maxHeight = _b.maxHeight;

    var _c = recheckSizeByTwoDirection(moveable, getNextPoses(widthOffset, heightOffset), width + widthOffset, height + heightOffset, maxWidth, maxHeight, direction, isRequest, datas),
        nextWidthOffset = _c[0],
        nextHeightOffset = _c[1];

    widthOffset += nextWidthOffset;
    heightOffset += nextHeightOffset;
  }

  return [widthOffset, heightOffset];
}
function checkSnapRotate(moveable, rect, origin, rotation) {
  if (!hasGuidelines(moveable, "rotatable")) {
    return rotation;
  }

  var pos1 = rect.pos1,
      pos2 = rect.pos2,
      pos3 = rect.pos3,
      pos4 = rect.pos4;
  var rad = rotation * Math.PI / 180;
  var prevPoses = [pos1, pos2, pos3, pos4].map(function (pos) {
    return minus(pos, origin);
  });
  var nextPoses = prevPoses.map(function (pos) {
    return rotate(pos, rad);
  });

  var result = __spreadArrays(checkRotateBounds(moveable, prevPoses, nextPoses, origin, rotation), checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin, rotation));

  result.sort(function (a, b) {
    return Math.abs(a - rotation) - Math.abs(b - rotation);
  });

  if (result.length) {
    return result[0];
  } else {
    return rotation;
  }
}
function checkSnapSize(moveable, width, height, direction, fixedPosition, isRequest, datas) {
  if (!hasGuidelines(moveable, "resizable")) {
    return [0, 0];
  }

  var _a = moveable.state,
      allMatrix = _a.allMatrix,
      is3d = _a.is3d;
  return checkSizeDist(moveable, function (widthOffset, heightOffset) {
    return getNextFixedPoses(allMatrix, width + widthOffset, height + heightOffset, fixedPosition, direction, is3d);
  }, width, height, direction, fixedPosition, isRequest, datas);
}
function checkSnapScale(moveable, scale, direction, isRequest, datas) {
  var width = datas.width,
      height = datas.height,
      fixedPosition = datas.fixedPosition;

  if (!hasGuidelines(moveable, "scalable")) {
    return [0, 0];
  }

  var is3d = datas.is3d;
  var sizeDist = checkSizeDist(moveable, function (widthOffset, heightOffset) {
    return getNextFixedPoses(scaleMatrix(datas, plus(scale, [widthOffset / width, heightOffset / height])), width, height, fixedPosition, direction, is3d);
  }, width, height, direction, fixedPosition, isRequest, datas);
  return [sizeDist[0] / width, sizeDist[1] / height];
}
function solveEquation(pos1, pos2, snapOffset, isVertical) {
  var dx = pos2[0] - pos1[0];
  var dy = pos2[1] - pos1[1];

  if (Math.abs(dx) < TINY_NUM) {
    dx = 0;
  }

  if (Math.abs(dy) < TINY_NUM) {
    dy = 0;
  }

  if (!dx) {
    // y = 0 * x + b
    // only horizontal
    if (!isVertical) {
      return [0, snapOffset];
    }

    return [0, 0];
  }

  if (!dy) {
    // only vertical
    if (isVertical) {
      return [snapOffset, 0];
    }

    return [0, 0];
  } // y = ax + b


  var a = dy / dx;
  var b = pos1[1] - a * pos1[0];

  if (isVertical) {
    // y = a * x + b
    var y = a * (pos2[0] + snapOffset) + b;
    return [snapOffset, y - pos2[1]];
  } else {
    // x = (y - b) / a
    var x = (pos2[1] + snapOffset - b) / a;
    return [x - pos2[0], snapOffset];
  }
}
function startCheckSnapDrag(moveable, datas) {
  datas.absolutePoses = getAbsolutePosesByState(moveable.state);
}
function checkThrottleDragRotate(throttleDragRotate, _a, _b, _c, _d) {
  var distX = _a[0],
      distY = _a[1];
  var isVerticalBound = _b[0],
      isHorizontalBound = _b[1];
  var isVerticalSnap = _c[0],
      isHorizontalSnap = _c[1];
  var verticalOffset = _d[0],
      horizontalOffset = _d[1];
  var offsetX = -verticalOffset;
  var offsetY = -horizontalOffset;

  if (throttleDragRotate && distX && distY) {
    offsetX = 0;
    offsetY = 0;
    var adjustPoses = [];

    if (isVerticalBound && isHorizontalBound) {
      adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
    } else if (isVerticalBound) {
      adjustPoses.push([verticalOffset, 0]);
    } else if (isHorizontalBound) {
      adjustPoses.push([0, horizontalOffset]);
    } else if (isVerticalSnap && isHorizontalSnap) {
      adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
    } else if (isVerticalSnap) {
      adjustPoses.push([verticalOffset, 0]);
    } else if (isHorizontalSnap) {
      adjustPoses.push([0, horizontalOffset]);
    }

    if (adjustPoses.length) {
      adjustPoses.sort(function (a, b) {
        return getDistSize(minus([distX, distY], a)) - getDistSize(minus([distX, distY], b));
      });
      var adjustPos = adjustPoses[0];

      if (adjustPos[0] && Math.abs(distX) > TINY_NUM) {
        offsetX = -adjustPos[0];
        offsetY = distY * Math.abs(distX + offsetX) / Math.abs(distX) - distY;
      } else if (adjustPos[1] && Math.abs(distY) > TINY_NUM) {
        var prevDistY = distY;
        offsetY = -adjustPos[1];
        offsetX = distX * Math.abs(distY + offsetY) / Math.abs(prevDistY) - distX;
      }

      if (throttleDragRotate && isHorizontalBound && isVerticalBound) {
        if (Math.abs(offsetX) > TINY_NUM && Math.abs(offsetX) < Math.abs(verticalOffset)) {
          var scale = Math.abs(verticalOffset) / Math.abs(offsetX);
          offsetX *= scale;
          offsetY *= scale;
        } else if (Math.abs(offsetY) > TINY_NUM && Math.abs(offsetY) < Math.abs(horizontalOffset)) {
          var scale = Math.abs(horizontalOffset) / Math.abs(offsetY);
          offsetX *= scale;
          offsetY *= scale;
        } else {
          offsetX = maxOffset(-verticalOffset, offsetX);
          offsetY = maxOffset(-horizontalOffset, offsetY);
        }
      }
    }
  } else {
    offsetX = distX || isVerticalBound ? -verticalOffset : 0;
    offsetY = distY || isHorizontalBound ? -horizontalOffset : 0;
  }

  return [offsetX, offsetY];
}
function checkSnapDrag(moveable, distX, distY, throttleDragRotate, isRequest, datas) {
  if (!hasGuidelines(moveable, "draggable")) {
    return [{
      isSnap: false,
      isBound: false,
      offset: 0
    }, {
      isSnap: false,
      isBound: false,
      offset: 0
    }];
  }

  var poses = getAbsolutePoses(datas.absolutePoses, [distX, distY]);

  var _a = getRect(poses),
      left = _a.left,
      right = _a.right,
      top = _a.top,
      bottom = _a.bottom;

  var snapCenter = moveable.props.snapCenter;
  var snapPoses = [[left, top], [right, top], [left, bottom], [right, bottom]];

  if (snapCenter) {
    snapPoses.push([(left + right) / 2, (top + bottom) / 2]);
  }

  var _b = checkMoveableSnapBounds(moveable, isRequest, snapPoses, poses),
      verticalSnapBoundInfo = _b.vertical,
      horizontalSnapBoundInfo = _b.horizontal;

  var _c = getInnerBoundDragInfo(moveable, poses, datas),
      verticalInnerBoundInfo = _c.vertical,
      horizontalInnerBoundInfo = _c.horizontal;

  var isVerticalSnap = verticalSnapBoundInfo.isSnap;
  var isHorizontalSnap = horizontalSnapBoundInfo.isSnap;
  var isVerticalBound = verticalSnapBoundInfo.isBound || verticalInnerBoundInfo.isBound;
  var isHorizontalBound = horizontalSnapBoundInfo.isBound || horizontalInnerBoundInfo.isBound;
  var verticalOffset = maxOffset(verticalSnapBoundInfo.offset, verticalInnerBoundInfo.offset);
  var horizontalOffset = maxOffset(horizontalSnapBoundInfo.offset, horizontalInnerBoundInfo.offset);

  var _d = checkThrottleDragRotate(throttleDragRotate, [distX, distY], [isVerticalBound, isHorizontalBound], [isVerticalSnap, isHorizontalSnap], [verticalOffset, horizontalOffset]),
      offsetX = _d[0],
      offsetY = _d[1];

  return [{
    isBound: isVerticalBound,
    isSnap: isVerticalSnap,
    offset: offsetX
  }, {
    isBound: isHorizontalBound,
    isSnap: isHorizontalSnap,
    offset: offsetY
  }];
}

function getSnapGuidelines(posInfos) {
  var guidelines = [];
  posInfos.forEach(function (posInfo) {
    posInfo.guidelineInfos.forEach(function (_a) {
      var guideline = _a.guideline;

      if (guidelines.indexOf(guideline) > -1) {
        return;
      }

      guidelines.push(guideline);
    });
  });
  return guidelines;
}

function getElementGuidelineDist(elementPos, elementSize, targetPos, targetSize) {
  // relativePos < 0  => element(l)  ---  (r)target
  // relativePos > 0  => target(l)   ---  (r)element
  var relativePos = elementPos - targetPos;
  var startPos = relativePos < 0 ? relativePos + elementSize : targetSize;
  var endPos = relativePos < 0 ? 0 : relativePos;
  var size = endPos - startPos;
  return {
    size: size,
    pos: startPos
  };
}

function groupByElementGuidelines(guidelines, clientPos, size, index) {
  var groupInfos = [];
  var group = groupBy(guidelines.filter(function (_a) {
    var element = _a.element,
        gap = _a.gap;
    return element && !gap;
  }), function (_a) {
    var element = _a.element,
        pos = _a.pos;
    var elementPos = pos[index];
    var sign = Math.min(0, elementPos - clientPos) < 0 ? -1 : 1;
    var groupKey = sign + "_" + pos[index ? 0 : 1];
    var groupInfo = find(groupInfos, function (_a) {
      var groupElement = _a[0],
          groupPos = _a[1];
      return element === groupElement && elementPos === groupPos;
    });

    if (groupInfo) {
      return groupInfo[2];
    }

    groupInfos.push([element, elementPos, groupKey]);
    return groupKey;
  });
  group.forEach(function (elementGuidelines) {
    elementGuidelines.sort(function (a, b) {
      var result = getElementGuidelineDist(a.pos[index], a.size, clientPos, size).size - getElementGuidelineDist(b.pos[index], a.size, clientPos, size).size;
      return result || a.pos[index ? 0 : 1] - b.pos[index ? 0 : 1];
    });
  });
  return group;
}

function renderElementGroup(moveable, direction, groups, minPos, clientPos, clientSize, targetPos, snapThreshold, snapDigit, index, snapDistFormat, React) {
  var _a = moveable.props,
      zoom = _a.zoom,
      _b = _a.isDisplaySnapDigit,
      isDisplaySnapDigit = _b === void 0 ? true : _b;
  var _c = DIRECTION_NAMES[direction],
      posName1 = _c[0],
      posName2 = _c[1],
      sizeName = _c[2],
      scaleDirection = _c[4];
  return flat(groups.map(function (elementGuidelines, i) {
    var isFirstRenderSize = true;
    return elementGuidelines.map(function (_a, j) {
      var _b;

      var pos = _a.pos,
          size = _a.size;

      var _c = getElementGuidelineDist(pos[index], size, clientPos, clientSize),
          linePos = _c.pos,
          lineSize = _c.size;

      if (lineSize < snapThreshold) {
        return null;
      }

      var isRenderSize = isFirstRenderSize;
      isFirstRenderSize = false;
      var snapSize = isDisplaySnapDigit && isRenderSize ? parseFloat(lineSize.toFixed(snapDigit)) : 0;
      return React.createElement("div", {
        key: direction + "LinkGuideline" + i + "-" + j,
        className: prefix("guideline-group", direction),
        style: (_b = {}, _b[posName1] = minPos + linePos + "px", _b[posName2] = -targetPos + pos[index ? 0 : 1] + "px", _b[sizeName] = lineSize + "px", _b)
      }, renderInnerGuideline({
        direction: direction,
        classNames: [prefix("dashed")],
        size: "100%",
        posValue: [0, 0],
        sizeValue: lineSize,
        zoom: zoom
      }, React), React.createElement("div", {
        className: prefix("size-value"),
        style: {
          transform: "translate" + scaleDirection + "(-50%) scale(" + zoom + ")"
        }
      }, snapSize > 0 ? snapDistFormat(snapSize) : ""));
    });
  }));
}

function renderSnapPoses(moveable, direction, snapPoses, minPos, targetPos, size, index, React) {
  var zoom = moveable.props.zoom;
  return snapPoses.map(function (_a, i) {
    var type = _a.type,
        pos = _a.pos;
    var renderPos = [0, 0];
    renderPos[index] = minPos;
    renderPos[index ? 0 : 1] = -targetPos + pos;
    return renderInnerGuideline({
      key: direction + "TargetGuideline" + i,
      classNames: [prefix("target", "bold", type)],
      posValue: renderPos,
      sizeValue: size,
      zoom: zoom,
      direction: direction
    }, React);
  });
}

function renderGuidelines(moveable, direction, guidelines, targetPos, React) {
  var zoom = moveable.props.zoom;
  return guidelines.map(function (guideline, i) {
    var pos = guideline.pos,
        size = guideline.size,
        element = guideline.element;
    var renderPos = [-targetPos[0] + pos[0], -targetPos[1] + pos[1]];
    return renderInnerGuideline({
      key: direction + "Guideline" + i,
      classNames: element ? [prefix("bold")] : [],
      direction: direction,
      posValue: renderPos,
      sizeValue: size,
      zoom: zoom
    }, React);
  });
}

function getGapGuidelinesToStart(guidelines, index, targetPos, targetSizes, guidelinePos, gap, otherPos) {
  var absGap = Math.abs(gap);
  var start = guidelinePos[index] + (gap > 0 ? targetSizes[0] : 0);
  return guidelines.filter(function (_a) {
    var gapPos = _a.pos;
    return gapPos[index] <= targetPos[index];
  }).sort(function (_a, _b) {
    var aPos = _a.pos;
    var bPos = _b.pos;
    return bPos[index] - aPos[index];
  }).filter(function (_a) {
    var gapPos = _a.pos,
        gapSizes = _a.sizes;
    var nextPos = gapPos[index];

    if (throttle(nextPos + gapSizes[index], 0.0001) === throttle(start - absGap, 0.0001)) {
      start = nextPos;
      return true;
    }

    return false;
  }).map(function (gapGuideline) {
    var renderPos = -targetPos[index] + gapGuideline.pos[index] + gapGuideline.sizes[index];
    return __assign(__assign({}, gapGuideline), {
      gap: gap,
      renderPos: index ? [otherPos, renderPos] : [renderPos, otherPos]
    });
  });
}

function getGapGuidelinesToEnd(guidelines, index, targetPos, targetSizes, guidelinePos, gap, otherPos) {
  var absGap = Math.abs(gap);
  var start = guidelinePos[index] + (gap < 0 ? targetSizes[index] : 0);
  return guidelines.filter(function (_a) {
    var gapPos = _a.pos;
    return gapPos[index] > targetPos[index];
  }).sort(function (_a, _b) {
    var aPos = _a.pos;
    var bPos = _b.pos;
    return aPos[index] - bPos[index];
  }).filter(function (_a) {
    var gapPos = _a.pos,
        gapSizes = _a.sizes;
    var nextPos = gapPos[index];

    if (throttle(nextPos, 0.0001) === throttle(start + absGap, 0.0001)) {
      start = nextPos + gapSizes[index];
      return true;
    }

    return false;
  }).map(function (gapGuideline) {
    var renderPos = -targetPos[index] + gapGuideline.pos[index] - absGap;
    return __assign(__assign({}, gapGuideline), {
      gap: gap,
      renderPos: index ? [otherPos, renderPos] : [renderPos, otherPos]
    });
  });
}

function getGapGuidelines$1(guidelines, type, targetPos, targetSizes) {
  var elementGuidelines = guidelines.filter(function (_a) {
    var element = _a.element,
        gap = _a.gap,
        guidelineType = _a.type;
    return element && gap && guidelineType === type;
  });

  var _a = type === "vertical" ? [0, 1] : [1, 0],
      index = _a[0],
      otherIndex = _a[1];

  return flat(elementGuidelines.map(function (guideline) {
    var pos = guideline.pos;
    var gap = guideline.gap;
    var gapGuidelines = guideline.gapGuidelines;
    var sizes = guideline.sizes;
    var offset = minOffset(pos[otherIndex] + sizes[otherIndex] - targetPos[otherIndex], pos[otherIndex] - targetPos[otherIndex] - targetSizes[otherIndex]);
    var minSize = Math.min(sizes[otherIndex], targetSizes[otherIndex]);

    if (offset > 0 && offset > minSize) {
      offset = (offset - minSize / 2) * 2;
    } else if (offset < 0 && offset < -minSize) {
      offset = (offset + minSize / 2) * 2;
    }

    var otherPos = (offset > 0 ? 0 : targetSizes[otherIndex]) + offset / 2;
    return __spreadArrays(getGapGuidelinesToStart(gapGuidelines, index, targetPos, targetSizes, pos, gap, otherPos), getGapGuidelinesToEnd(gapGuidelines, index, targetPos, targetSizes, pos, gap, otherPos));
  }));
}

function renderGapGuidelines(moveable, direction, gapGuidelines, snapDistFormat, React) {
  var _a = moveable.props,
      _b = _a.snapDigit,
      snapDigit = _b === void 0 ? 0 : _b,
      _c = _a.isDisplaySnapDigit,
      isDisplaySnapDigit = _c === void 0 ? true : _c,
      zoom = _a.zoom;
  var scaleDirection = direction === "horizontal" ? "X" : "Y";
  var sizeName = direction === "horizontal" ? "width" : "height";
  return gapGuidelines.map(function (_a, i) {
    var _b;

    var renderPos = _a.renderPos,
        gap = _a.gap,
        className = _a.className;
    var absGap = Math.abs(gap);
    var snapSize = isDisplaySnapDigit ? parseFloat(absGap.toFixed(snapDigit)) : 0;
    return React.createElement("div", {
      key: direction + "GapGuideline" + i,
      className: prefix("guideline-group", direction),
      style: (_b = {
        left: renderPos[0] + "px",
        top: renderPos[1] + "px"
      }, _b[sizeName] = absGap + "px", _b)
    }, renderInnerGuideline({
      direction: direction,
      classNames: [prefix("gap"), className],
      size: "100%",
      posValue: [0, 0],
      sizeValue: absGap,
      zoom: zoom
    }, React), React.createElement("div", {
      className: prefix("size-value", "gap"),
      style: {
        transform: "translate" + scaleDirection + "(-50%) scale(" + zoom + ")"
      }
    }, snapSize > 0 ? snapDistFormat(snapSize) : ""));
  });
}

function addBoundGuidelines(moveable, verticalPoses, horizontalPoses, verticalSnapPoses, horizontalSnapPoses, externalBounds) {
  var _a = checkBoundPoses(externalBounds || moveable.props.bounds, verticalPoses, horizontalPoses),
      verticalBoundInfos = _a.vertical,
      horizontalBoundInfos = _a.horizontal;

  verticalBoundInfos.forEach(function (info) {
    if (info.isBound) {
      verticalSnapPoses.push({
        type: "bounds",
        pos: info.pos
      });
    }
  });
  horizontalBoundInfos.forEach(function (info) {
    if (info.isBound) {
      horizontalSnapPoses.push({
        type: "bounds",
        pos: info.pos
      });
    }
  });

  var _b = checkInnerBoundPoses(moveable),
      verticalInnerBoundPoses = _b.vertical,
      horizontalInnerBoundPoses = _b.horizontal;

  verticalInnerBoundPoses.forEach(function (innerPos) {
    if (findIndex(verticalSnapPoses, function (_a) {
      var type = _a.type,
          pos = _a.pos;
      return type === "bounds" && pos === innerPos;
    }) >= 0) {
      return;
    }

    verticalSnapPoses.push({
      type: "bounds",
      pos: innerPos
    });
  });
  horizontalInnerBoundPoses.forEach(function (innerPos) {
    if (findIndex(horizontalSnapPoses, function (_a) {
      var type = _a.type,
          pos = _a.pos;
      return type === "bounds" && pos === innerPos;
    }) >= 0) {
      return;
    }

    horizontalSnapPoses.push({
      type: "bounds",
      pos: innerPos
    });
  });
}
/**
 * @namespace Moveable.Snappable
 * @description Whether or not target can be snapped to the guideline. (default: false)
 * @sort 2
 */


var Snappable = {
  name: "snappable",
  props: {
    snappable: [Boolean, Array],
    snapCenter: Boolean,
    snapHorizontal: Boolean,
    snapVertical: Boolean,
    snapElement: Boolean,
    snapGap: Boolean,
    isDisplaySnapDigit: Boolean,
    snapDigit: Number,
    snapThreshold: Number,
    horizontalGuidelines: Array,
    verticalGuidelines: Array,
    elementGuidelines: Array,
    bounds: Object,
    innerBounds: Object,
    snapDistFormat: Function
  },
  events: {
    onSnap: "snap"
  },
  css: [":host {\n    --bounds-color: #d66;\n}\n.guideline {\n    pointer-events: none;\n    z-index: 2;\n}\n.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}\n.guideline-group {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.guideline-group .size-value {\n    position: absolute;\n    color: #f55;\n    font-size: 12px;\n    font-weight: bold;\n}\n.guideline-group.horizontal .size-value {\n    transform-origin: 50% 100%;\n    transform: translateX(-50%);\n    left: 50%;\n    bottom: 5px;\n}\n.guideline-group.vertical .size-value {\n    transform-origin: 0% 50%;\n    top: 50%;\n    transform: translateY(-50%);\n    left: 5px;\n}\n.guideline.gap {\n    background: #f55;\n}\n.size-value.gap {\n    color: #f55;\n}\n"],
  render: function (moveable, React) {
    var _a = moveable.state,
        targetTop = _a.top,
        targetLeft = _a.left,
        pos1 = _a.pos1,
        pos2 = _a.pos2,
        pos3 = _a.pos3,
        pos4 = _a.pos4,
        snapRenderInfo = _a.snapRenderInfo,
        targetClientRect = _a.targetClientRect,
        containerClientRect = _a.containerClientRect,
        is3d = _a.is3d,
        rootMatrix = _a.rootMatrix;

    if (!snapRenderInfo || !hasGuidelines(moveable, "")) {
      return [];
    }

    var n = is3d ? 4 : 3;
    var minLeft = Math.min(pos1[0], pos2[0], pos3[0], pos4[0]);
    var minTop = Math.min(pos1[1], pos2[1], pos3[1], pos4[1]);
    var containerPos = calculateContainerPos(rootMatrix, containerClientRect, n);

    var _b = calculateInversePosition(rootMatrix, [targetClientRect.left - containerPos[0], targetClientRect.top - containerPos[1]], n),
        clientLeft = _b[0],
        clientTop = _b[1];

    var _c = moveable.props,
        _d = _c.snapThreshold,
        snapThreshold = _d === void 0 ? 5 : _d,
        _e = _c.snapDigit,
        snapDigit = _e === void 0 ? 0 : _e,
        _f = _c.snapDistFormat,
        snapDistFormat = _f === void 0 ? function (v) {
      return v;
    } : _f;
    var externalPoses = snapRenderInfo.externalPoses || [];
    var poses = getAbsolutePosesByState(moveable.state);
    var verticalSnapPoses = [];
    var horizontalSnapPoses = [];
    var verticalGuidelines = [];
    var horizontalGuidelines = [];
    var snapInfos = [];

    var _g = getRect(poses),
        width = _g.width,
        height = _g.height,
        top = _g.top,
        left = _g.left,
        bottom = _g.bottom,
        right = _g.right;

    var hasExternalPoses = externalPoses.length > 0;
    var externalRect = hasExternalPoses ? getRect(externalPoses) : {};

    if (!snapRenderInfo.request) {
      if (snapRenderInfo.direction) {
        snapInfos.push(getSnapInfosByDirection(moveable, poses, snapRenderInfo.direction));
      }

      if (snapRenderInfo.snap) {
        var rect = getRect(poses);

        if (snapRenderInfo.center) {
          rect.middle = (rect.top + rect.bottom) / 2;
          rect.center = (rect.left + rect.right) / 2;
        }

        snapInfos.push(checkSnaps(moveable, rect, true, 1));
      }

      if (hasExternalPoses) {
        if (snapRenderInfo.center) {
          externalRect.middle = (externalRect.top + externalRect.bottom) / 2;
          externalRect.center = (externalRect.left + externalRect.right) / 2;
        }

        snapInfos.push(checkSnaps(moveable, externalRect, true, 1));
      }

      snapInfos.forEach(function (snapInfo) {
        var verticalPosInfos = snapInfo.vertical.posInfos,
            horizontalPosInfos = snapInfo.horizontal.posInfos;
        verticalSnapPoses.push.apply(verticalSnapPoses, verticalPosInfos.map(function (posInfo) {
          return {
            type: "snap",
            pos: posInfo.pos
          };
        }));
        horizontalSnapPoses.push.apply(horizontalSnapPoses, horizontalPosInfos.map(function (posInfo) {
          return {
            type: "snap",
            pos: posInfo.pos
          };
        }));
        verticalGuidelines.push.apply(verticalGuidelines, getSnapGuidelines(verticalPosInfos));
        horizontalGuidelines.push.apply(horizontalGuidelines, getSnapGuidelines(horizontalPosInfos));
      });
    }

    addBoundGuidelines(moveable, [left, right], [top, bottom], verticalSnapPoses, horizontalSnapPoses);

    if (hasExternalPoses) {
      addBoundGuidelines(moveable, [externalRect.left, externalRect.right], [externalRect.top, externalRect.bottom], verticalSnapPoses, horizontalSnapPoses, snapRenderInfo.externalBounds);
    }

    var elementHorizontalGroup = groupByElementGuidelines(horizontalGuidelines, clientLeft, width, 0);
    var elementVerticalGroup = groupByElementGuidelines(verticalGuidelines, clientTop, height, 1);
    var gapHorizontalGuidelines = getGapGuidelines$1(verticalGuidelines, "vertical", [targetLeft, targetTop], [width, height]);
    var gapVerticalGuidelines = getGapGuidelines$1(horizontalGuidelines, "horizontal", [targetLeft, targetTop], [width, height]);

    var allGuidelines = __spreadArrays(verticalGuidelines, horizontalGuidelines);

    triggerEvent(moveable, "onSnap", {
      guidelines: allGuidelines.filter(function (_a) {
        var element = _a.element;
        return !element;
      }),
      elements: groupBy(allGuidelines.filter(function (_a) {
        var element = _a.element;
        return element;
      }), function (_a) {
        var element = _a.element;
        return element;
      }),
      gaps: __spreadArrays(gapVerticalGuidelines, gapHorizontalGuidelines)
    }, true);
    return __spreadArrays(renderGapGuidelines(moveable, "vertical", gapVerticalGuidelines, snapDistFormat, React), renderGapGuidelines(moveable, "horizontal", gapHorizontalGuidelines, snapDistFormat, React), renderElementGroup(moveable, "horizontal", elementHorizontalGroup, minLeft, clientLeft, width, targetTop, snapThreshold, snapDigit, 0, snapDistFormat, React), renderElementGroup(moveable, "vertical", elementVerticalGroup, minTop, clientTop, height, targetLeft, snapThreshold, snapDigit, 1, snapDistFormat, React), renderSnapPoses(moveable, "horizontal", horizontalSnapPoses, minLeft, targetTop, width, 0, React), renderSnapPoses(moveable, "vertical", verticalSnapPoses, minTop, targetLeft, height, 1, React), renderGuidelines(moveable, "horizontal", horizontalGuidelines, [targetLeft, targetTop], React), renderGuidelines(moveable, "vertical", verticalGuidelines, [targetLeft, targetTop], React));
  },
  dragStart: function (moveable, e) {
    moveable.state.snapRenderInfo = {
      request: e.isRequest,
      snap: true,
      center: true
    };
    snapStart(moveable);
  },
  drag: function (moveable) {
    var state = moveable.state;
    state.staticGuidelines = getElementGuidelines(moveable, false, state.staticGuidelines);
    state.guidelines = getTotalGuidelines(moveable);
  },
  pinchStart: function (moveable) {
    this.unset(moveable);
  },
  dragEnd: function (moveable) {
    this.unset(moveable);
  },
  dragControlCondition: function (e, moveable) {
    if (directionCondition(e) || dragControlCondition(e, moveable)) {
      return true;
    }

    if (!e.isRequest && e.inputEvent) {
      return hasClass(e.inputEvent.target, prefix("snap-control"));
    }
  },
  dragControlStart: function (moveable) {
    moveable.state.snapRenderInfo = null;
    snapStart(moveable);
  },
  dragControl: function (moveable) {
    this.drag(moveable);
  },
  dragControlEnd: function (moveable) {
    this.unset(moveable);
  },
  dragGroupStart: function (moveable, e) {
    this.dragStart(moveable, e);
  },
  dragGroup: function (moveable) {
    this.drag(moveable);
  },
  dragGroupEnd: function (moveable) {
    this.unset(moveable);
  },
  dragGroupControlStart: function (moveable) {
    moveable.state.snapRenderInfo = null;
    snapStart(moveable);
  },
  dragGroupControl: function (moveable) {
    this.drag(moveable);
  },
  dragGroupControlEnd: function (moveable) {
    this.unset(moveable);
  },
  unset: function (moveable) {
    var state = moveable.state;
    state.enableSnap = false;
    state.staticGuidelines = [];
    state.guidelines = [];
    state.snapRenderInfo = null;
  }
};
/**
 * Whether or not target can be snapped to the guideline. (default: false)
 * @name Moveable.Snappable#snappable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.snappable = true;
 */

/**
 * When you drag, make the snap in the center of the target. (default: false)
 * @name Moveable.Snappable#snapCenter
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   snappable: true,
 * });
 *
 * moveable.snapCenter = true;
 */

/**
 * When you drag, make the snap in the vertical guidelines. (default: true)
 * @name Moveable.Snappable#snapVertical
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   snappable: true,
 *   snapVertical: true,
 *   snapHorizontal: true,
 *   snapElement: true,
 * });
 *
 * moveable.snapVertical = false;
 */

/**
 * When you drag, make the snap in the horizontal guidelines. (default: true)
 * @name Moveable.Snappable#snapHorizontal
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   snappable: true,
 *   snapVertical: true,
 *   snapHorizontal: true,
 *   snapElement: true,
 * });
 *
 * moveable.snapHorizontal = false;
 */

/**
 * When you drag, make the gap snap in the element guidelines. (default: true)
 * @name Moveable.Snappable#snapGap
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   snappable: true,
 *   snapVertical: true,
 *   snapHorizontal: true,
 *   snapElement: true,
 *   snapGap: true,
 * });
 *
 * moveable.snapGap = false;
 */

/**
 * When you drag, make the snap in the element guidelines. (default: true)
 * @name Moveable.Snappable#snapElement
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   snappable: true,
 *   snapVertical: true,
 *   snapHorizontal: true,
 *   snapElement: true,
 * });
 *
 * moveable.snapElement = false;
 */

/**
 * Distance value that can snap to guidelines. (default: 5)
 * @name Moveable.Snappable#snapThreshold
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.snapThreshold = 5;
 */

/**
 * Add guidelines in the horizontal direction. (default: [])
 * @name Moveable.Snappable#horizontalGuidelines
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.horizontalGuidelines = [100, 200, 500];
 */

/**
 * Add guidelines in the vertical direction. (default: [])
 * @name Moveable.Snappable#verticalGuidelines
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.verticalGuidelines = [100, 200, 500];
 */

/**
 * Add guidelines for the element. (default: [])
 * @name Moveable.Snappable#elementGuidelines
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.elementGuidelines = [
 *   document.querySelector(".element"),
 * ];
 */

/**
 * You can set up boundaries. (default: null)
 * @name Moveable.Snappable#bounds
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.bounds = { left: 0, right: 1000, top: 0, bottom: 1000};
 */

/**
 * You can set up inner boundaries. (default: null)
 * @name Moveable.Snappable#innerBounds
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.innerBounds = { left: 500, top: 500, width: 100, height: 100};
 */

/**
 * snap distance digits (default: 0)
 * @name Moveable.Snappable#snapDigit
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.snapDigit = 0
 */

/**
 * Whether to show snap distance (default: true)
 * @name Moveable.Snappable#isDisplaySnapDigit
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.isDisplaySnapDigit = true;
 */

/**
 * You can set the text format of the distance shown in the guidelines. (default: self)
 * @name Moveable.Snappable#snapDistFormat
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *  snappable: true,
 *  snapDistFormat: v => v,
 * });
 * moveable.snapDistFormat = v => `${v}px`;
 */

/**
 * When you drag or dragControl, the `snap` event is called.
 * @memberof Moveable.Snappable
 * @event snap
 * @param {Moveable.Snappable.OnSnap} - Parameters for the `snap` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     snappable: true
 * });
 * moveable.on("snap", e => {
 *     console.log("onSnap", e);
 * });
 */

/**
 * @namespace Draggable
 * @memberof Moveable
 * @description Draggable refers to the ability to drag and move targets.
 */

var Draggable = {
  name: "draggable",
  props: {
    draggable: Boolean,
    throttleDrag: Number,
    throttleDragRotate: Number,
    startDragRotate: Number,
    edgeDraggable: Boolean
  },
  events: {
    onDragStart: "dragStart",
    onDrag: "drag",
    onDragEnd: "dragEnd",
    onDragGroupStart: "dragGroupStart",
    onDragGroup: "dragGroup",
    onDragGroupEnd: "dragGroupEnd"
  },
  render: function (moveable, React) {
    var _a = moveable.props,
        throttleDragRotate = _a.throttleDragRotate,
        zoom = _a.zoom;
    var _b = moveable.state,
        dragInfo = _b.dragInfo,
        beforeOrigin = _b.beforeOrigin;

    if (!throttleDragRotate || !dragInfo) {
      return [];
    }

    var dist = dragInfo.dist;

    if (!dist[0] && !dist[1]) {
      return [];
    }

    var width = getDistSize(dist);
    var rad = getRad(dist, [0, 0]);
    return [React.createElement("div", {
      className: prefix("line", "horizontal", "dragline", "dashed"),
      key: "dragRotateGuideline",
      style: {
        width: width + "px",
        transform: "translate(" + beforeOrigin[0] + "px, " + beforeOrigin[1] + "px) rotate(" + rad + "rad) scaleY(" + zoom + ")"
      }
    })];
  },
  dragStart: function (moveable, e) {
    var datas = e.datas,
        parentEvent = e.parentEvent,
        parentGesto = e.parentGesto;
    var state = moveable.state;
    var target = state.target,
        gesto = state.gesto;

    if (gesto) {
      return false;
    }

    state.gesto = parentGesto || moveable.targetGesto;
    var style = window.getComputedStyle(target);
    datas.datas = {};
    datas.left = parseFloat(style.left || "") || 0;
    datas.top = parseFloat(style.top || "") || 0;
    datas.bottom = parseFloat(style.bottom || "") || 0;
    datas.right = parseFloat(style.right || "") || 0;
    datas.startValue = [0, 0];
    setDragStart(moveable, e);
    setDefaultTransformIndex(e);
    startCheckSnapDrag(moveable, datas);
    datas.prevDist = [0, 0];
    datas.prevBeforeDist = [0, 0];
    datas.isDrag = false;
    var params = fillParams(moveable, e, __assign({
      set: function (translate) {
        datas.startValue = translate;
      }
    }, fillTransformStartEvent(e)));
    var result = parentEvent || triggerEvent(moveable, "onDragStart", params);

    if (result !== false) {
      datas.isDrag = true;
      moveable.state.dragInfo = {
        startRect: moveable.getRect(),
        dist: [0, 0]
      };
    } else {
      state.gesto = null;
      datas.isPinch = false;
    }

    return datas.isDrag ? params : false;
  },
  drag: function (moveable, e) {
    resolveTransformEvent(e, "translate");
    var datas = e.datas,
        parentEvent = e.parentEvent,
        parentFlag = e.parentFlag,
        isPinch = e.isPinch,
        isRequest = e.isRequest;
    var distX = e.distX,
        distY = e.distY;
    var isDrag = datas.isDrag,
        prevDist = datas.prevDist,
        prevBeforeDist = datas.prevBeforeDist,
        startValue = datas.startValue;

    if (!isDrag) {
      return;
    }

    var props = moveable.props;
    var parentMoveable = props.parentMoveable;
    var throttleDrag = parentEvent ? 0 : props.throttleDrag || 0;
    var throttleDragRotate = parentEvent ? 0 : props.throttleDragRotate || 0;
    var isSnap = false;
    var dragRotateRad = 0;

    if (!parentEvent && throttleDragRotate > 0 && (distX || distY)) {
      var startDragRotate = props.startDragRotate || 0;
      var deg = throttle(startDragRotate + getRad([0, 0], [distX, distY]) * 180 / Math.PI, throttleDragRotate) - startDragRotate;
      var ry = distY * Math.abs(Math.cos((deg - 90) / 180 * Math.PI));
      var rx = distX * Math.abs(Math.cos(deg / 180 * Math.PI));
      var r = getDistSize([rx, ry]);
      dragRotateRad = deg * Math.PI / 180;
      distX = r * Math.cos(dragRotateRad);
      distY = r * Math.sin(dragRotateRad);
    }

    if (!isPinch && !parentEvent && !parentFlag && (!throttleDragRotate || distX || distY)) {
      var _a = checkSnapDrag(moveable, distX, distY, throttleDragRotate, isRequest, datas),
          verticalInfo = _a[0],
          horizontalInfo = _a[1];

      var isVerticalSnap = verticalInfo.isSnap,
          isVerticalBound = verticalInfo.isBound,
          verticalOffset = verticalInfo.offset;
      var isHorizontalSnap = horizontalInfo.isSnap,
          isHorizontalBound = horizontalInfo.isBound,
          horizontalOffset = horizontalInfo.offset;
      isSnap = isVerticalSnap || isHorizontalSnap || isVerticalBound || isHorizontalBound;
      distX += verticalOffset;
      distY += horizontalOffset;
    }

    datas.passDeltaX = distX - (datas.passDistX || 0);
    datas.passDeltaY = distY - (datas.passDistY || 0);
    datas.passDistX = distX;
    datas.passDistY = distY;
    var beforeTranslate = plus(getBeforeDragDist({
      datas: datas,
      distX: distX,
      distY: distY
    }), startValue);
    var translate = plus(getTransformDist({
      datas: datas,
      distX: distX,
      distY: distY
    }), startValue);

    if (!throttleDragRotate && !isSnap) {
      throttleArray(translate, throttleDrag);
      throttleArray(beforeTranslate, throttleDrag);
    }

    var beforeDist = minus(beforeTranslate, startValue);
    var dist = minus(translate, startValue);
    var delta = minus(dist, prevDist);
    var beforeDelta = minus(beforeDist, prevBeforeDist);
    datas.prevDist = dist;
    datas.prevBeforeDist = beforeDist;
    var left = datas.left + beforeDist[0];
    var top = datas.top + beforeDist[1];
    var right = datas.right - beforeDist[0];
    var bottom = datas.bottom - beforeDist[1];
    var nextTransform = convertTransformFormat(datas, "translate(" + translate[0] + "px, " + translate[1] + "px)", "translate(" + dist[0] + "px, " + dist[1] + "px)");
    moveable.state.dragInfo.dist = parentEvent ? [0, 0] : dist;

    if (!parentEvent && !parentMoveable && delta.every(function (num) {
      return !num;
    }) && beforeDelta.some(function (num) {
      return !num;
    })) {
      return;
    }

    var _b = moveable.state,
        width = _b.width,
        height = _b.height;
    var params = fillParams(moveable, e, {
      transform: nextTransform,
      dist: dist,
      delta: delta,
      translate: translate,
      beforeDist: beforeDist,
      beforeDelta: beforeDelta,
      beforeTranslate: beforeTranslate,
      left: left,
      top: top,
      right: right,
      bottom: bottom,
      width: width,
      height: height,
      isPinch: isPinch
    });
    !parentEvent && triggerEvent(moveable, "onDrag", params);
    return params;
  },
  dragEnd: function (moveable, e) {
    var parentEvent = e.parentEvent,
        datas = e.datas,
        isDrag = e.isDrag;
    moveable.state.gesto = null;
    moveable.state.dragInfo = null;

    if (!datas.isDrag) {
      return;
    }

    datas.isDrag = false;
    !parentEvent && triggerEvent(moveable, "onDragEnd", fillEndParams(moveable, e, {}));
    return isDrag;
  },
  dragGroupStart: function (moveable, e) {
    var datas = e.datas,
        clientX = e.clientX,
        clientY = e.clientY;
    var params = this.dragStart(moveable, e);

    if (!params) {
      return false;
    }

    var events = triggerChildGesto(moveable, this, "dragStart", [clientX || 0, clientY || 0], e, false);

    var nextParams = __assign(__assign({}, params), {
      targets: moveable.props.targets,
      events: events
    });

    var result = triggerEvent(moveable, "onDragGroupStart", nextParams);
    datas.isDrag = result !== false;
    return datas.isDrag ? params : false;
  },
  dragGroup: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isDrag) {
      return;
    }

    var params = this.drag(moveable, e);
    var _a = e.datas,
        passDeltaX = _a.passDeltaX,
        passDeltaY = _a.passDeltaY;
    var events = triggerChildGesto(moveable, this, "drag", [passDeltaX, passDeltaY], e, false);

    if (!params) {
      return;
    }

    var nextParams = __assign({
      targets: moveable.props.targets,
      events: events
    }, params);

    triggerEvent(moveable, "onDragGroup", nextParams);
    return nextParams;
  },
  dragGroupEnd: function (moveable, e) {
    var isDrag = e.isDrag,
        datas = e.datas;

    if (!datas.isDrag) {
      return;
    }

    this.dragEnd(moveable, e);
    triggerChildGesto(moveable, this, "dragEnd", [0, 0], e, false);
    triggerEvent(moveable, "onDragGroupEnd", fillEndParams(moveable, e, {
      targets: moveable.props.targets
    }));
    return isDrag;
  },

  /**
   * @method Moveable.Draggable#request
   * @param {object} [e] - the draggable's request parameter
   * @param {number} [e.x] - x position
   * @param {number} [e.y] - y position
   * @param {number} [e.deltaX] - X number to move
   * @param {number} [e.deltaY] - Y number to move
   * @return {Moveable.Requester} Moveable Requester
   * @example
    * // Instantly Request (requestStart - request - requestEnd)
   * // Use Relative Value
   * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
   * // Use Absolute Value
   * moveable.request("draggable", { x: 200, y: 100 }, true);
   *
   * // requestStart
   * const requester = moveable.request("draggable");
   *
   * // request
   * // Use Relative Value
   * requester.request({ deltaX: 10, deltaY: 10 });
   * requester.request({ deltaX: 10, deltaY: 10 });
   * requester.request({ deltaX: 10, deltaY: 10 });
   * // Use Absolute Value
   * moveable.request("draggable", { x: 200, y: 100 });
   * moveable.request("draggable", { x: 220, y: 100 });
   * moveable.request("draggable", { x: 240, y: 100 });
   *
   * // requestEnd
   * requester.requestEnd();
   */
  request: function (moveable) {
    var datas = {};
    var rect = moveable.getRect();
    var distX = 0;
    var distY = 0;
    return {
      isControl: false,
      requestStart: function () {
        return {
          datas: datas
        };
      },
      request: function (e) {
        if ("x" in e) {
          distX = e.x - rect.left;
        } else if ("deltaX" in e) {
          distX += e.deltaX;
        }

        if ("y" in e) {
          distY = e.y - rect.top;
        } else if ("deltaY" in e) {
          distY += e.deltaY;
        }

        return {
          datas: datas,
          distX: distX,
          distY: distY
        };
      },
      requestEnd: function () {
        return {
          datas: datas,
          isDrag: true
        };
      }
    };
  },
  unset: function (moveable) {
    moveable.state.dragInfo = null;
  }
};
/**
 * Whether or not target can be dragged. (default: false)
 * @name Moveable.Draggable#draggable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.draggable = true;
 */

/**
 * throttle of x, y when drag.
 * @name Moveable.Draggable#throttleDrag
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.throttleDrag = 1;
 */

/**
* throttle of angle of x, y when drag.
* @name Moveable.Draggable#throttleDragRotate
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body);
*
* moveable.throttleDragRotate = 45;
*/

/**
* start angle of throttleDragRotate of x, y when drag.
* @name Moveable.Draggable#startDragRotate
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body);
*
* // 45, 135, 225, 315
* moveable.throttleDragRotate = 90;
* moveable.startDragRotate = 45;
*/

/**
 * When the drag starts, the dragStart event is called.
 * @memberof Moveable.Draggable
 * @event dragStart
 * @param {Moveable.Draggable.OnDragStart} - Parameters for the dragStart event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { draggable: true });
 * moveable.on("dragStart", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When dragging, the drag event is called.
 * @memberof Moveable.Draggable
 * @event drag
 * @param {Moveable.Draggable.OnDrag} - Parameters for the drag event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { draggable: true });
 * moveable.on("drag", ({ target, transform }) => {
 *     target.style.transform = transform;
 * });
 */

/**
 * When the drag finishes, the dragEnd event is called.
 * @memberof Moveable.Draggable
 * @event dragEnd
 * @param {Moveable.Draggable.OnDragEnd} - Parameters for the dragEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { draggable: true });
 * moveable.on("dragEnd", ({ target, isDrag }) => {
 *     console.log(target, isDrag);
 * });
 */

/**
* When the group drag starts, the `dragGroupStart` event is called.
* @memberof Moveable.Draggable
* @event dragGroupStart
* @param {Moveable.Draggable.OnDragGroupStart} - Parameters for the `dragGroupStart` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     draggable: true
* });
* moveable.on("dragGroupStart", ({ targets }) => {
*     console.log("onDragGroupStart", targets);
* });
*/

/**
* When the group drag, the `dragGroup` event is called.
* @memberof Moveable.Draggable
* @event dragGroup
* @param {Moveable.Draggable.OnDragGroup} - Parameters for the `dragGroup` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     draggable: true
* });
* moveable.on("dragGroup", ({ targets, events }) => {
*     console.log("onDragGroup", targets);
*     events.forEach(ev => {
*          // drag event
*          console.log("onDrag left, top", ev.left, ev.top);
*          // ev.target!.style.left = `${ev.left}px`;
*          // ev.target!.style.top = `${ev.top}px`;
*          console.log("onDrag translate", ev.dist);
*          ev.target!.style.transform = ev.transform;)
*     });
* });
*/

/**
 * When the group drag finishes, the `dragGroupEnd` event is called.
 * @memberof Moveable.Draggable
 * @event dragGroupEnd
 * @param {Moveable.Draggable.OnDragGroupEnd} - Parameters for the `dragGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     draggable: true
 * });
 * moveable.on("dragGroupEnd", ({ targets, isDrag }) => {
 *     console.log("onDragGroupEnd", targets, isDrag);
 * });
 */

function renderControls(moveable, defaultDirections, React) {
  var _a = moveable.state,
      renderPoses = _a.renderPoses,
      radRotation = _a.rotation,
      direction = _a.direction;
  var _b = moveable.props,
      _c = _b.renderDirections,
      directions = _c === void 0 ? defaultDirections : _c,
      zoom = _b.zoom;
  var directionMap = {};

  if (!directions) {
    return [];
  }

  var sign = direction > 0 ? 1 : -1;
  var renderDirections = directions === true ? DIRECTIONS : directions;
  var degRotation = radRotation / Math.PI * 180;
  renderDirections.forEach(function (dir) {
    directionMap[dir] = true;
  });
  return renderDirections.map(function (dir) {
    var indexes = DIRECTION_INDEXES[dir];

    if (!indexes || !directionMap[dir]) {
      return null;
    }

    var directionRotation = (throttle(degRotation, 15) + sign * DIRECTION_ROTATIONS[dir] + 720) % 180;
    return React.createElement("div", {
      className: prefix("control", "direction", dir),
      "data-rotation": directionRotation,
      "data-direction": dir,
      key: "direction-" + dir,
      style: getControlTransform.apply(void 0, __spreadArrays([radRotation, zoom], indexes.map(function (index) {
        return renderPoses[index];
      })))
    });
  });
}
function renderLine(React, direction, pos1, pos2, zoom, key) {
  var classNames = [];

  for (var _i = 6; _i < arguments.length; _i++) {
    classNames[_i - 6] = arguments[_i];
  }

  var rad = getRad(pos1, pos2);
  var rotation = direction ? throttle(rad / Math.PI * 180, 15) % 180 : -1;
  return React.createElement("div", {
    key: "line" + key,
    className: prefix.apply(void 0, __spreadArrays(["line", "direction", direction], classNames)),
    "data-rotation": rotation,
    "data-line-index": key,
    "data-direction": direction,
    style: getLineStyle(pos1, pos2, zoom, rad)
  });
}
function renderAllDirections(moveable, React) {
  return renderControls(moveable, DIRECTIONS, React);
}
function renderDiagonalDirections(moveable, React) {
  return renderControls(moveable, ["nw", "ne", "sw", "se"], React);
}

/**
 * @namespace Rotatable
 * @memberof Moveable
 * @description Rotatable indicates whether the target can be rotated.
 */

function setRotateStartInfo(moveable, datas, clientX, clientY, origin, rect) {
  var n = moveable.state.is3d ? 4 : 3;
  var nextOrigin = calculatePosition(moveable.state.rootMatrix, origin, n);
  var startAbsoluteOrigin = plus([rect.left, rect.top], nextOrigin);
  datas.startAbsoluteOrigin = startAbsoluteOrigin;
  datas.prevDeg = getRad(startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180;
  datas.prevSnapDeg = datas.prevDeg;
  datas.startDeg = datas.prevDeg;
  datas.loop = 0;
}

function getParentDeg(moveable, moveableRect, datas, parentDist, direction, startValue) {
  var prevDeg = datas.prevDeg; // const absoluteDeg = startValue + parentDist;

  var dist = checkSnapRotate(moveable, moveableRect, datas.origin, parentDist);
  datas.prevDeg = dist;
  var delta = dist - prevDeg;
  return [delta, dist, startValue + dist];
}

function getDeg(moveable, moveableRect, datas, deg, direction, startValue, throttleRotate, isSnap) {
  var prevDeg = datas.prevDeg,
      prevSnapDeg = datas.prevSnapDeg,
      startDeg = datas.startDeg,
      prevLoop = datas.loop;

  if (prevDeg > deg && prevDeg > 270 && deg < 90) {
    // 360 => 0
    ++datas.loop;
  } else if (prevDeg < deg && prevDeg < 90 && deg > 270) {
    // 0 => 360
    --datas.loop;
  }

  var loop = datas.loop;
  var absolutePrevSnapDeg = prevLoop * 360 + prevSnapDeg - startDeg + startValue;
  var absoluteDeg = loop * 360 + deg - startDeg + startValue;
  datas.prevDeg = absoluteDeg - loop * 360 + startDeg - startValue;
  absoluteDeg = throttle(absoluteDeg, throttleRotate);
  var dist = direction * (absoluteDeg - startValue);

  if (isSnap) {
    dist = checkSnapRotate(moveable, moveableRect, datas.origin, dist);
    absoluteDeg = dist / direction + startValue;
  }

  datas.prevSnapDeg = absoluteDeg - loop * 360 + startDeg - startValue;
  var delta = direction * (absoluteDeg - absolutePrevSnapDeg);
  return [delta, dist, startValue + dist];
}

function getRotateInfo(moveable, moveableRect, datas, direction, clientX, clientY, startValue, throttleRotate) {
  return getDeg(moveable, moveableRect, datas, getRad(datas.startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180, direction, startValue, throttleRotate, true);
}
function getRotationPositions(rotationPosition, _a, direction) {
  var pos1 = _a[0],
      pos2 = _a[1],
      pos3 = _a[2],
      pos4 = _a[3];

  if (rotationPosition === "none") {
    return;
  }

  var _b = (rotationPosition || "top").split("-"),
      dir1 = _b[0],
      dir2 = _b[1];

  var radPoses = [pos1, pos2]; // if (scale[0] < 0) {
  //     dir1 = getReversePositionX(dir1);
  //     dir2 = getReversePositionX(dir2);
  // }
  // if (scale[1] < 0) {
  //     dir1 = getReversePositionY(dir1);
  //     dir2 = getReversePositionY(dir2);
  // }

  if (dir1 === "left") {
    radPoses = [pos3, pos1];
  } else if (dir1 === "right") {
    radPoses = [pos2, pos4];
  } else if (dir1 === "bottom") {
    radPoses = [pos4, pos3];
  }

  var pos = [(radPoses[0][0] + radPoses[1][0]) / 2, (radPoses[0][1] + radPoses[1][1]) / 2];
  var rad = getRotationRad(radPoses, direction);

  if (dir2) {
    var isStart = dir2 === "top" || dir2 === "left";
    var isReverse = dir1 === "bottom" || dir1 === "left";
    pos = radPoses[isStart && !isReverse || !isStart && isReverse ? 0 : 1];
  }

  return [pos, rad];
}
function dragControlCondition(e, moveable) {
  if (e.isRequest) {
    return e.requestAble === "rotatable";
  }

  var target = e.inputEvent.target;

  if (hasClass(target, prefix("rotation-control"))) {
    return true;
  }

  var rotationTarget = moveable.props.rotationTarget;

  if (rotationTarget) {
    return getRefTargets(rotationTarget, moveable.props.iframeSelector, true).some(function (element) {
      if (!element) {
        return false;
      }

      return target === element || target.contains(element);
    });
  }

  return false;
}
var Rotatable = {
  name: "rotatable",
  canPinch: true,
  props: {
    rotatable: Boolean,
    rotationPosition: String,
    throttleRotate: Number,
    renderDirections: Object,
    rotationTarget: Object
  },
  events: {
    onRotateStart: "rotateStart",
    onRotate: "rotate",
    onRotateEnd: "rotateEnd",
    onRotateGroupStart: "rotateGroupStart",
    onRotateGroup: "rotateGroup",
    onRotateGroupEnd: "rotateGroupEnd"
  },
  css: [".rotation {\n            position: absolute;\n            height: 40px;\n            width: 1px;\n            transform-origin: 50% 100%;\n            height: calc(40px * var(--zoom));\n            top: auto;\n            left: 0;\n            bottom: 100%;\n            will-change: transform;\n        }\n        .rotation .rotation-line {\n            display: block;\n            width: 100%;\n            height: 100%;\n            transform-origin: 50% 50%;\n        }\n        .rotation .rotation-control {\n            border-color: #4af;\n            border-color: var(--moveable-color);\n            background:#fff;\n            cursor: alias;\n        }"],
  render: function (moveable, React) {
    var _a = moveable.props,
        rotatable = _a.rotatable,
        rotationPosition = _a.rotationPosition,
        zoom = _a.zoom,
        renderDirections = _a.renderDirections;
    var _b = moveable.state,
        renderPoses = _b.renderPoses,
        direction = _b.direction;

    if (!rotatable) {
      return null;
    }

    var positions = getRotationPositions(rotationPosition, renderPoses, direction);
    var jsxs = [];

    if (positions) {
      var pos = positions[0],
          rad = positions[1];
      jsxs.push(React.createElement("div", {
        key: "rotation",
        className: prefix("rotation"),
        style: {
          // tslint:disable-next-line: max-line-length
          transform: "translate(-50%) translate(" + pos[0] + "px, " + pos[1] + "px) rotate(" + rad + "rad)"
        }
      }, React.createElement("div", {
        className: prefix("line rotation-line"),
        style: {
          transform: "scaleX(" + zoom + ")"
        }
      }), React.createElement("div", {
        className: prefix("control rotation-control"),
        style: {
          transform: "translate(0.5px) scale(" + zoom + ")"
        }
      })));
    }

    if (renderDirections) {
      jsxs.push.apply(jsxs, renderControls(moveable, [], React));
    }

    return jsxs;
  },
  dragControlCondition: dragControlCondition,
  dragControlStart: function (moveable, e) {
    var datas = e.datas,
        clientX = e.clientX,
        clientY = e.clientY,
        parentRotate = e.parentRotate,
        parentFlag = e.parentFlag,
        isPinch = e.isPinch,
        isRequest = e.isRequest;
    var _a = moveable.state,
        target = _a.target,
        left = _a.left,
        top = _a.top,
        origin = _a.origin,
        beforeOrigin = _a.beforeOrigin,
        direction = _a.direction,
        beforeDirection = _a.beforeDirection,
        targetTransform = _a.targetTransform,
        moveableClientRect = _a.moveableClientRect;

    if (!isRequest && !target) {
      return false;
    }

    var rect = moveable.getRect();
    datas.rect = rect;
    datas.transform = targetTransform;
    datas.left = left;
    datas.top = top;
    datas.fixedPosition = getDirectionOffset(moveable, getOriginDirection(moveable));
    datas.absoluteInfo = {
      origin: rect.origin,
      startValue: rect.rotation
    };
    setRotateStartInfo(moveable, datas.absoluteInfo, clientX, clientY, origin, moveableClientRect);

    if (isRequest || isPinch || parentFlag) {
      var externalRotate = parentRotate || 0;
      datas.beforeInfo = {
        origin: rect.beforeOrigin,
        prevDeg: externalRotate,
        startDeg: externalRotate,
        prevSnapDeg: externalRotate,
        loop: 0
      };
      datas.afterInfo = {
        origin: rect.origin,
        prevDeg: externalRotate,
        startDeg: externalRotate,
        prevSnapDeg: externalRotate,
        loop: 0
      };
    } else {
      datas.beforeInfo = {
        origin: rect.beforeOrigin
      };
      datas.afterInfo = {
        origin: rect.origin
      };
      setRotateStartInfo(moveable, datas.beforeInfo, clientX, clientY, beforeOrigin, moveableClientRect);
      setRotateStartInfo(moveable, datas.afterInfo, clientX, clientY, origin, moveableClientRect);
    }

    datas.direction = direction;
    datas.beforeDirection = beforeDirection;
    datas.startValue = 0;
    datas.datas = {};
    setDefaultTransformIndex(e);
    var params = fillParams(moveable, e, __assign(__assign({
      set: function (rotatation) {
        datas.startValue = rotatation * Math.PI / 180;
      }
    }, fillTransformStartEvent(e)), {
      dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
    }));
    var result = triggerEvent(moveable, "onRotateStart", params);
    datas.isRotate = result !== false;
    moveable.state.snapRenderInfo = {
      request: e.isRequest
    };
    return datas.isRotate ? params : false;
  },
  dragControl: function (moveable, e) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    var datas = e.datas,
        clientX = e.clientX,
        clientY = e.clientY,
        parentRotate = e.parentRotate,
        parentFlag = e.parentFlag,
        isPinch = e.isPinch,
        groupDelta = e.groupDelta;
    var beforeDirection = datas.beforeDirection,
        beforeInfo = datas.beforeInfo,
        afterInfo = datas.afterInfo,
        absoluteInfo = datas.absoluteInfo,
        isRotate = datas.isRotate,
        startValue = datas.startValue,
        rect = datas.rect;

    if (!isRotate) {
      return;
    }

    resolveTransformEvent(e, "rotate");
    var targetDirection = getTransformDirection(e);
    var direction = beforeDirection * targetDirection;
    var _k = moveable.props,
        _l = _k.throttleRotate,
        throttleRotate = _l === void 0 ? 0 : _l,
        parentMoveable = _k.parentMoveable;
    var delta;
    var dist;
    var rotate;
    var beforeDelta;
    var beforeDist;
    var beforeRotate;
    var absoluteDelta;
    var absoluteDist;
    var absoluteRotate;
    var startDeg = 180 / Math.PI * startValue;
    var absoluteStartDeg = absoluteInfo.startValue;

    if (!parentFlag && "parentDist" in e) {
      var parentDist = e.parentDist;
      _a = getParentDeg(moveable, rect, afterInfo, parentDist, direction, startDeg), delta = _a[0], dist = _a[1], rotate = _a[2];
      _b = getParentDeg(moveable, rect, beforeInfo, parentDist, beforeDirection, startDeg), beforeDelta = _b[0], beforeDist = _b[1], beforeRotate = _b[2];
      _c = getParentDeg(moveable, rect, absoluteInfo, parentDist, direction, absoluteStartDeg), absoluteDelta = _c[0], absoluteDist = _c[1], absoluteRotate = _c[2];
    } else if (isPinch || parentFlag) {
      _d = getDeg(moveable, rect, afterInfo, parentRotate, direction, startDeg, throttleRotate), delta = _d[0], dist = _d[1], rotate = _d[2];
      _e = getDeg(moveable, rect, beforeInfo, parentRotate, beforeDirection, startDeg, throttleRotate), beforeDelta = _e[0], beforeDist = _e[1], beforeRotate = _e[2];
      _f = getDeg(moveable, rect, absoluteInfo, parentRotate, direction, absoluteStartDeg, throttleRotate), absoluteDelta = _f[0], absoluteDist = _f[1], absoluteRotate = _f[2];
    } else {
      _g = getRotateInfo(moveable, rect, afterInfo, direction, clientX, clientY, startDeg, throttleRotate), delta = _g[0], dist = _g[1], rotate = _g[2];
      _h = getRotateInfo(moveable, rect, beforeInfo, beforeDirection, clientX, clientY, startDeg, throttleRotate), beforeDelta = _h[0], beforeDist = _h[1], beforeRotate = _h[2];
      _j = getRotateInfo(moveable, rect, absoluteInfo, direction, clientX, clientY, absoluteStartDeg, throttleRotate), absoluteDelta = _j[0], absoluteDist = _j[1], absoluteRotate = _j[2];
    }

    if (!absoluteDelta && !delta && !beforeDelta && !parentMoveable) {
      return;
    }

    var nextTransform = convertTransformFormat(datas, "rotate(" + rotate + "deg)", "rotate(" + dist + "deg)");
    var inverseDist = getRotateDist(moveable, dist, datas.fixedPosition, datas);
    var inverseDelta = minus(plus(groupDelta || [0, 0], inverseDist), datas.prevInverseDist || [0, 0]);
    datas.prevInverseDist = inverseDist;
    var params = fillParams(moveable, e, __assign({
      delta: delta,
      dist: dist,
      rotate: rotate,
      beforeDist: beforeDist,
      beforeDelta: beforeDelta,
      beforeRotate: beforeRotate,
      absoluteDist: absoluteDist,
      absoluteDelta: absoluteDelta,
      absoluteRotate: absoluteRotate,
      isPinch: !!isPinch
    }, fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e)));
    triggerEvent(moveable, "onRotate", params);
    return params;
  },
  dragControlEnd: function (moveable, e) {
    var datas = e.datas,
        isDrag = e.isDrag;

    if (!datas.isRotate) {
      return false;
    }

    datas.isRotate = false;
    triggerEvent(moveable, "onRotateEnd", fillEndParams(moveable, e, {}));
    return isDrag;
  },
  dragGroupControlCondition: dragControlCondition,
  dragGroupControlStart: function (moveable, e) {
    var datas = e.datas;
    var _a = moveable.state,
        parentLeft = _a.left,
        parentTop = _a.top,
        parentBeforeOrigin = _a.beforeOrigin;
    var params = this.dragControlStart(moveable, e);

    if (!params) {
      return false;
    }

    params.set(datas.beforeDirection * moveable.rotation);
    var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
      var _a = child.state,
          left = _a.left,
          top = _a.top,
          beforeOrigin = _a.beforeOrigin;
      var childClient = plus(minus([left, top], [parentLeft, parentTop]), minus(beforeOrigin, parentBeforeOrigin));
      ev.datas.groupClient = childClient;
      return __assign(__assign({}, ev), {
        parentRotate: 0
      });
    });

    var nextParams = __assign(__assign({}, params), {
      targets: moveable.props.targets,
      events: events
    });

    var result = triggerEvent(moveable, "onRotateGroupStart", nextParams);
    datas.isRotate = result !== false;
    return datas.isRotate ? params : false;
  },
  dragGroupControl: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isRotate) {
      return;
    }

    var params = this.dragControl(moveable, e);

    if (!params) {
      return;
    }

    var direction = datas.beforeDirection;
    var parentRotate = params.beforeDist;
    var deg = params.beforeDelta;
    var rad = deg / 180 * Math.PI;
    var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
      var _a = ev.datas.groupClient,
          prevX = _a[0],
          prevY = _a[1];

      var _b = rotate([prevX, prevY], rad * direction),
          clientX = _b[0],
          clientY = _b[1];

      var delta = [clientX - prevX, clientY - prevY];
      ev.datas.groupClient = [clientX, clientY];
      return __assign(__assign({}, ev), {
        parentRotate: parentRotate,
        groupDelta: delta
      });
    });
    moveable.rotation = direction * params.beforeRotate;

    var nextParams = __assign({
      targets: moveable.props.targets,
      events: events,
      set: function (rotation) {
        moveable.rotation = rotation;
      }
    }, params);

    triggerEvent(moveable, "onRotateGroup", nextParams);
    return nextParams;
  },
  dragGroupControlEnd: function (moveable, e) {
    var isDrag = e.isDrag,
        datas = e.datas;

    if (!datas.isRotate) {
      return;
    }

    this.dragControlEnd(moveable, e);
    triggerChildAble(moveable, this, "dragControlEnd", e);
    var nextParams = fillEndParams(moveable, e, {
      targets: moveable.props.targets
    });
    triggerEvent(moveable, "onRotateGroupEnd", nextParams);
    return isDrag;
  },

  /**
   * @method Moveable.Rotatable#request
   * @param {object} [e] - the Resizable's request parameter
   * @param {number} [e.deltaRotate=0] -  delta number of rotation
   * @param {number} [e.rotate=0] - absolute number of moveable's rotation
   * @return {Moveable.Requester} Moveable Requester
   * @example
    * // Instantly Request (requestStart - request - requestEnd)
   * moveable.request("rotatable", { deltaRotate: 10 }, true);
   *
   * * moveable.request("rotatable", { rotate: 10 }, true);
   *
   * // requestStart
   * const requester = moveable.request("rotatable");
   *
   * // request
   * requester.request({ deltaRotate: 10 });
   * requester.request({ deltaRotate: 10 });
   * requester.request({ deltaRotate: 10 });
   *
   * requester.request({ rotate: 10 });
   * requester.request({ rotate: 20 });
   * requester.request({ rotate: 30 });
   *
   * // requestEnd
   * requester.requestEnd();
   */
  request: function (moveable) {
    var datas = {};
    var distRotate = 0;
    var startRotation = moveable.getRotation();
    return {
      isControl: true,
      requestStart: function () {
        return {
          datas: datas
        };
      },
      request: function (e) {
        if ("deltaRotate" in e) {
          distRotate += e.deltaRotate;
        } else if ("rotate" in e) {
          distRotate = e.rotate - startRotation;
        }

        return {
          datas: datas,
          parentDist: distRotate
        };
      },
      requestEnd: function () {
        return {
          datas: datas,
          isDrag: true
        };
      }
    };
  }
};
/**
 * Whether or not target can be rotated. (default: false)
 * @name Moveable.Rotatable#rotatable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.rotatable = true;
 */

/**
 * You can specify the position of the rotation. (default: "top")
 * @name Moveable.Rotatable#rotationPosition
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   rotationPosition: "top",
 * });
 *
 * moveable.rotationPosition = "bottom"
 */

/**
 * throttle of angle(degree) when rotate.
 * @name Moveable.Rotatable#throttleRotate
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.throttleRotate = 1;
 */

/**
 * When the rotate starts, the rotateStart event is called.
 * @memberof Moveable.Rotatable
 * @event rotateStart
 * @param {Moveable.Rotatable.OnRotateStart} - Parameters for the rotateStart event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { rotatable: true });
 * moveable.on("rotateStart", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
* When rotating, the rotate event is called.
* @memberof Moveable.Rotatable
* @event rotate
* @param {Moveable.Rotatable.OnRotate} - Parameters for the rotate event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, { rotatable: true });
* moveable.on("rotate", ({ target, transform, dist }) => {
*     target.style.transform = transform;
* });
*/

/**
 * When the rotate finishes, the rotateEnd event is called.
 * @memberof Moveable.Rotatable
 * @event rotateEnd
 * @param {Moveable.Rotatable.OnRotateEnd} - Parameters for the rotateEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { rotatable: true });
 * moveable.on("rotateEnd", ({ target, isDrag }) => {
 *     console.log(target, isDrag);
 * });
 */

/**
 * When the group rotate starts, the `rotateGroupStart` event is called.
 * @memberof Moveable.Rotatable
 * @event rotateGroupStart
 * @param {Moveable.Rotatable.OnRotateGroupStart} - Parameters for the `rotateGroupStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     rotatable: true
 * });
 * moveable.on("rotateGroupStart", ({ targets }) => {
 *     console.log("onRotateGroupStart", targets);
 * });
 */

/**
* When the group rotate, the `rotateGroup` event is called.
* @memberof Moveable.Rotatable
* @event rotateGroup
* @param {Moveable.Rotatable.OnRotateGroup} - Parameters for the `rotateGroup` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     rotatable: true
* });
* moveable.on("rotateGroup", ({ targets, events }) => {
*     console.log("onRotateGroup", targets);
*     events.forEach(ev => {
*         const target = ev.target;
*         // ev.drag is a drag event that occurs when the group rotate.
*         const left = ev.drag.beforeDist[0];
*         const top = ev.drag.beforeDist[1];
*         const deg = ev.beforeDist;
*     });
* });
*/

/**
 * When the group rotate finishes, the `rotateGroupEnd` event is called.
 * @memberof Moveable.Rotatable
 * @event rotateGroupEnd
 * @param {Moveable.Rotatable.OnRotateGroupEnd} - Parameters for the `rotateGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     rotatable: true
 * });
 * moveable.on("rotateGroupEnd", ({ targets, isDrag }) => {
 *     console.log("onRotateGroupEnd", targets, isDrag);
 * });
 */

/**
 * @namespace Resizable
 * @memberof Moveable
 * @description Resizable indicates whether the target's width and height can be increased or decreased.
 */

var Resizable = {
  name: "resizable",
  ableGroup: "size",
  updateRect: true,
  canPinch: true,
  props: {
    resizable: Boolean,
    throttleResize: Number,
    renderDirections: Array,
    keepRatio: Boolean
  },
  events: {
    onResizeStart: "resizeStart",
    onResize: "resize",
    onResizeEnd: "resizeEnd",
    onResizeGroupStart: "resizeGroupStart",
    onResizeGroup: "resizeGroup",
    onResizeGroupEnd: "resizeGroupEnd"
  },
  render: function (moveable, React) {
    var _a = moveable.props,
        resizable = _a.resizable,
        edge = _a.edge;

    if (resizable) {
      if (edge) {
        return renderDiagonalDirections(moveable, React);
      }

      return renderAllDirections(moveable, React);
    }
  },
  dragControlCondition: directionCondition,
  dragControlStart: function (moveable, e) {
    var _a;

    var inputEvent = e.inputEvent,
        isPinch = e.isPinch,
        parentDirection = e.parentDirection,
        datas = e.datas,
        parentFlag = e.parentFlag;
    var direction = parentDirection || (isPinch ? [0, 0] : getDirection(inputEvent.target));
    var _b = moveable.state,
        target = _b.target,
        width = _b.width,
        height = _b.height;

    if (!direction || !target) {
      return false;
    }

    !isPinch && setDragStart(moveable, e);
    datas.datas = {};
    datas.direction = direction;
    datas.startOffsetWidth = width;
    datas.startOffsetHeight = height;
    datas.prevWidth = 0;
    datas.prevHeight = 0;
    _a = getCSSSize(target, moveable.props.iframeSelector), datas.startWidth = _a[0], datas.startHeight = _a[1];
    var padding = [Math.max(0, width - datas.startWidth), Math.max(0, height - datas.startHeight)];
    datas.minSize = padding;
    datas.maxSize = [Infinity, Infinity];

    if (!parentFlag) {
      var style = window.getComputedStyle(target);
      var position = style.position,
          minWidth = style.minWidth,
          minHeight = style.minHeight,
          maxWidth = style.maxWidth,
          maxHeight = style.maxHeight;
      var isParentElement = position === "static" || position === "relative";
      var container = isParentElement ? target.parentElement : target.offsetParent;
      var containerWidth = width;
      var containerHeight = height;

      if (container) {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;

        if (isParentElement) {
          var containerStyle = window.getComputedStyle(container);
          containerWidth -= parseFloat(containerStyle.paddingLeft) || 0;
          containerHeight -= parseFloat(containerStyle.paddingTop) || 0;
        }
      }

      datas.minSize = plus([convertUnitSize(minWidth, containerWidth) || 0, convertUnitSize(minHeight, containerHeight) || 0], padding);
      datas.maxSize = plus([convertUnitSize(maxWidth, containerWidth) || Infinity, convertUnitSize(maxHeight, containerHeight) || Infinity], padding);
    }

    var transformOrigin = moveable.props.transformOrigin || "% %";
    datas.transformOrigin = transformOrigin && isString(transformOrigin) ? transformOrigin.split(" ") : transformOrigin;
    datas.isWidth = !direction[0] && !direction[1] || direction[0] || !direction[1];

    function setRatio(ratio) {
      datas.ratio = ratio && isFinite(ratio) ? ratio : 0;
    }

    function setFixedDirection(fixedDirection) {
      datas.fixedDirection = fixedDirection;
      datas.fixedPosition = getAbsolutePosition(moveable, fixedDirection);
    }

    setRatio(width / height);
    setFixedDirection([-direction[0], -direction[1]]);
    var params = fillParams(moveable, e, {
      direction: direction,
      set: function (_a) {
        var startWidth = _a[0],
            startHeight = _a[1];
        datas.startWidth = startWidth;
        datas.startHeight = startHeight;
      },
      setMin: function (minSize) {
        datas.minSize = minSize;
      },
      setMax: function (maxSize) {
        datas.maxSize = [maxSize[0] || Infinity, maxSize[1] || Infinity];
      },
      setRatio: setRatio,
      setFixedDirection: setFixedDirection,
      setOrigin: function (origin) {
        datas.transformOrigin = origin;
      },
      dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
    });
    var result = triggerEvent(moveable, "onResizeStart", params);

    if (result !== false) {
      datas.isResize = true;
      moveable.state.snapRenderInfo = {
        request: e.isRequest,
        direction: direction
      };
    }

    return datas.isResize ? params : false;
  },
  dragControl: function (moveable, e) {
    var _a;

    var datas = e.datas,
        distX = e.distX,
        distY = e.distY,
        parentFlag = e.parentFlag,
        isPinch = e.isPinch,
        parentDistance = e.parentDistance,
        parentScale = e.parentScale,
        parentKeepRatio = e.parentKeepRatio,
        dragClient = e.dragClient,
        parentDist = e.parentDist,
        isRequest = e.isRequest;
    var isResize = datas.isResize,
        transformOrigin = datas.transformOrigin,
        fixedDirection = datas.fixedDirection,
        startWidth = datas.startWidth,
        startHeight = datas.startHeight,
        prevWidth = datas.prevWidth,
        prevHeight = datas.prevHeight,
        minSize = datas.minSize,
        maxSize = datas.maxSize,
        ratio = datas.ratio,
        isWidth = datas.isWidth,
        startOffsetWidth = datas.startOffsetWidth,
        startOffsetHeight = datas.startOffsetHeight;

    if (!isResize) {
      return;
    }

    var _b = moveable.props,
        _c = _b.throttleResize,
        throttleResize = _c === void 0 ? 0 : _c,
        parentMoveable = _b.parentMoveable,
        _d = _b.snapThreshold,
        snapThreshold = _d === void 0 ? 5 : _d;
    var direction = datas.direction;
    var sizeDirection = direction;
    var distWidth = 0;
    var distHeight = 0;

    if (!direction[0] && !direction[1]) {
      sizeDirection = [1, 1];
    }

    var keepRatio = ratio && (moveable.props.keepRatio || parentKeepRatio);
    var fixedPosition = dragClient;

    if (!dragClient) {
      if (!parentFlag && isPinch) {
        fixedPosition = getAbsolutePosition(moveable, [0, 0]);
      } else {
        fixedPosition = datas.fixedPosition;
      }
    }

    if (parentDist) {
      distWidth = parentDist[0];
      distHeight = parentDist[1];

      if (keepRatio) {
        if (!distWidth) {
          distWidth = distHeight * ratio;
        } else if (!distHeight) {
          distHeight = distWidth / ratio;
        }
      }
    } else if (parentScale) {
      distWidth = (parentScale[0] - 1) * startOffsetWidth;
      distHeight = (parentScale[1] - 1) * startOffsetHeight;
    } else if (isPinch) {
      if (parentDistance) {
        distWidth = parentDistance;
        distHeight = parentDistance * startOffsetHeight / startOffsetWidth;
      }
    } else {
      var dist = getDragDist({
        datas: datas,
        distX: distX,
        distY: distY
      });
      distWidth = sizeDirection[0] * dist[0];
      distHeight = sizeDirection[1] * dist[1];

      if (keepRatio && startOffsetWidth && startOffsetHeight) {
        var rad = getRad([0, 0], dist);
        var standardRad = getRad([0, 0], sizeDirection);
        var size = getDistSize([distWidth, distHeight]);
        var signSize = Math.cos(rad - standardRad) * size;

        if (!sizeDirection[0]) {
          // top, bottom
          distHeight = signSize;
          distWidth = distHeight / ratio;
        } else if (!sizeDirection[1]) {
          // left, right
          distWidth = signSize;
          distHeight = distWidth * ratio;
        } else {
          // two-way
          var startWidthSize = sizeDirection[0] * 2 * startOffsetWidth;
          var startHeightSize = sizeDirection[1] * 2 * startOffsetHeight;
          var distSize = getDistSize([startWidthSize + dist[0], startHeightSize + dist[1]]) - getDistSize([startWidthSize, startHeightSize]);
          var ratioRad = getRad([0, 0], [ratio, 1]);
          distWidth = Math.cos(ratioRad) * distSize;
          distHeight = Math.sin(ratioRad) * distSize;
        }
      } else if (!keepRatio) {
        var nextDirection = __spreadArrays(direction);

        if (!startOffsetWidth) {
          if (dist[0] < 0) {
            nextDirection[0] = -1;
          } else if (dist[0] > 0) {
            nextDirection[0] = 1;
          }
        }

        if (!startOffsetHeight) {
          if (dist[1] < 0) {
            nextDirection[1] = -1;
          } else if (dist[1] > 0) {
            nextDirection[1] = 1;
          }
        }

        direction = nextDirection;
        sizeDirection = nextDirection;
        distWidth = sizeDirection[0] * dist[0];
        distHeight = sizeDirection[1] * dist[1];
      }
    }

    var nextWidth = sizeDirection[0] || keepRatio ? Math.max(startOffsetWidth + distWidth, TINY_NUM) : startOffsetWidth;
    var nextHeight = sizeDirection[1] || keepRatio ? Math.max(startOffsetHeight + distHeight, TINY_NUM) : startOffsetHeight;

    if (keepRatio && startOffsetWidth && startOffsetHeight) {
      // startOffsetWidth : startOffsetHeight = nextWidth : nextHeight
      if (isWidth) {
        nextHeight = nextWidth / ratio;
      } else {
        nextWidth = nextHeight * ratio;
      }
    }

    var snapDist = [0, 0];

    if (!isPinch) {
      snapDist = checkSnapSize(moveable, nextWidth, nextHeight, direction, fixedPosition, isRequest, datas);
    }

    if (parentDist) {
      !parentDist[0] && (snapDist[0] = 0);
      !parentDist[1] && (snapDist[1] = 0);
    }

    if (keepRatio) {
      if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
        if (Math.abs(snapDist[0]) > Math.abs(snapDist[1])) {
          snapDist[1] = 0;
        } else {
          snapDist[0] = 0;
        }
      }

      var isNoSnap = !snapDist[0] && !snapDist[1];

      if (isNoSnap) {
        if (isWidth) {
          nextWidth = throttle(nextWidth, throttleResize);
        } else {
          nextHeight = throttle(nextHeight, throttleResize);
        }
      }

      if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
        nextWidth += snapDist[0];
        nextHeight = nextWidth / ratio;
      } else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
        nextHeight += snapDist[1];
        nextWidth = nextHeight * ratio;
      }
    } else {
      if (startOffsetWidth + distWidth < -snapThreshold) {
        snapDist[0] = 0;
      }

      if (startOffsetWidth + distHeight < -snapThreshold) {
        snapDist[1] = 0;
      }

      nextWidth += snapDist[0];
      nextHeight += snapDist[1];

      if (!snapDist[0]) {
        nextWidth = throttle(nextWidth, throttleResize);
      }

      if (!snapDist[1]) {
        nextHeight = throttle(nextHeight, throttleResize);
      }
    }

    _a = calculateBoundSize([nextWidth, nextHeight], minSize, maxSize, keepRatio), nextWidth = _a[0], nextHeight = _a[1];
    nextWidth = Math.round(nextWidth);
    nextHeight = Math.round(nextHeight);
    distWidth = nextWidth - startOffsetWidth;
    distHeight = nextHeight - startOffsetHeight;
    var delta = [distWidth - prevWidth, distHeight - prevHeight];
    datas.prevWidth = distWidth;
    datas.prevHeight = distHeight;
    var inverseDelta = getResizeDist(moveable, nextWidth, nextHeight, fixedDirection, fixedPosition, transformOrigin);

    if (!parentMoveable && delta.every(function (num) {
      return !num;
    }) && inverseDelta.every(function (num) {
      return !num;
    })) {
      return;
    }

    var params = fillParams(moveable, e, {
      width: startWidth + distWidth,
      height: startHeight + distHeight,
      offsetWidth: nextWidth,
      offsetHeight: nextHeight,
      direction: direction,
      dist: [distWidth, distHeight],
      delta: delta,
      isPinch: !!isPinch,
      drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, inverseDelta, !!isPinch, false))
    });
    triggerEvent(moveable, "onResize", params);
    return params;
  },
  dragControlAfter: function (moveable, e) {
    var datas = e.datas;
    var isResize = datas.isResize,
        startOffsetWidth = datas.startOffsetWidth,
        startOffsetHeight = datas.startOffsetHeight,
        prevWidth = datas.prevWidth,
        prevHeight = datas.prevHeight;

    if (!isResize) {
      return;
    }

    var _a = moveable.state,
        width = _a.width,
        height = _a.height;
    var errorWidth = width - (startOffsetWidth + prevWidth);
    var errorHeight = height - (startOffsetHeight + prevHeight);
    var isErrorWidth = Math.abs(errorWidth) > 3;
    var isErrorHeight = Math.abs(errorHeight) > 3;

    if (isErrorWidth) {
      datas.startWidth += errorWidth;
      datas.startOffsetWidth += errorWidth;
      datas.prevWidth += errorWidth;
    }

    if (isErrorHeight) {
      datas.startHeight += errorHeight;
      datas.startOffsetHeight += errorHeight;
      datas.prevHeight += errorHeight;
    }

    if (isErrorWidth || isErrorHeight) {
      this.dragControl(moveable, e);
      return true;
    }
  },
  dragControlEnd: function (moveable, e) {
    var datas = e.datas,
        isDrag = e.isDrag;

    if (!datas.isResize) {
      return false;
    }

    datas.isResize = false;
    var params = fillEndParams(moveable, e, {});
    triggerEvent(moveable, "onResizeEnd", params);
    return isDrag;
  },
  dragGroupControlCondition: directionCondition,
  dragGroupControlStart: function (moveable, e) {
    var datas = e.datas;
    var params = this.dragControlStart(moveable, e);

    if (!params) {
      return false;
    }

    var originalEvents = fillChildEvents(moveable, "resizable", e);

    function setDist(child, ev) {
      var fixedDirection = datas.fixedDirection;
      var fixedPosition = datas.fixedPosition;
      var pos = getAbsolutePosition(child, fixedDirection);

      var _a = calculate(createRotateMatrix(-moveable.rotation / 180 * Math.PI, 3), [pos[0] - fixedPosition[0], pos[1] - fixedPosition[1], 1], 3),
          originalX = _a[0],
          originalY = _a[1];

      ev.datas.originalX = originalX;
      ev.datas.originalY = originalY;
      return ev;
    }

    var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
      return setDist(child, ev);
    });

    var nextParams = __assign(__assign({}, params), {
      targets: moveable.props.targets,
      events: events,
      setFixedDirection: function (fixedDirection) {
        params.setFixedDirection(fixedDirection);
        events.forEach(function (ev, i) {
          ev.setFixedDirection(fixedDirection);
          setDist(moveable.moveables[i], originalEvents[i]);
        });
      }
    });

    var result = triggerEvent(moveable, "onResizeGroupStart", nextParams);
    datas.isResize = result !== false;
    return datas.isResize ? params : false;
  },
  dragGroupControl: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isResize) {
      return;
    }

    var params = this.dragControl(moveable, e);

    if (!params) {
      return;
    }

    var offsetWidth = params.offsetWidth,
        offsetHeight = params.offsetHeight,
        dist = params.dist;
    var keepRatio = moveable.props.keepRatio;
    var parentScale = [offsetWidth / (offsetWidth - dist[0]), offsetHeight / (offsetHeight - dist[1])];
    var fixedPosition = datas.fixedPosition;
    var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
      var _a = calculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [ev.datas.originalX * parentScale[0], ev.datas.originalY * parentScale[1], 1], 3),
          clientX = _a[0],
          clientY = _a[1];

      return __assign(__assign({}, ev), {
        parentDist: null,
        parentScale: parentScale,
        dragClient: plus(fixedPosition, [clientX, clientY]),
        parentKeepRatio: keepRatio
      });
    });

    var nextParams = __assign({
      targets: moveable.props.targets,
      events: events
    }, params);

    triggerEvent(moveable, "onResizeGroup", nextParams);
    return nextParams;
  },
  dragGroupControlEnd: function (moveable, e) {
    var isDrag = e.isDrag,
        datas = e.datas;

    if (!datas.isResize) {
      return;
    }

    this.dragControlEnd(moveable, e);
    triggerChildAble(moveable, this, "dragControlEnd", e);
    var nextParams = fillEndParams(moveable, e, {
      targets: moveable.props.targets
    });
    triggerEvent(moveable, "onResizeGroupEnd", nextParams);
    return isDrag;
  },

  /**
   * @method Moveable.Resizable#request
   * @param {object} [e] - the Resizable's request parameter
   * @param {number} [e.direction=[1, 1]] - Direction to resize
   * @param {number} [e.deltaWidth] - delta number of width
   * @param {number} [e.deltaHeight] - delta number of height
   * @param {number} [e.offsetWidth] - offset number of width
   * @param {number} [e.offsetHeight] - offset number of height
   * @param {number} [e.isInstant] - Whether to execute the request instantly
   * @return {Moveable.Requester} Moveable Requester
   * @example
    * // Instantly Request (requestStart - request - requestEnd)
   * // Use Relative Value
   * moveable.request("resizable", { deltaWidth: 10, deltaHeight: 10 }, true);
   *
   * // Use Absolute Value
   * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 }, true);
   *
   * // requestStart
   * const requester = moveable.request("resizable");
   *
   * // request
   * // Use Relative Value
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   *
   * // Use Absolute Value
   * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 });
   * moveable.request("resizable", { offsetWidth: 110, offsetHeight: 100 });
   * moveable.request("resizable", { offsetWidth: 120, offsetHeight: 100 });
   *
   * // requestEnd
   * requester.requestEnd();
   */
  request: function (moveable) {
    var datas = {};
    var distWidth = 0;
    var distHeight = 0;
    var rect = moveable.getRect();
    return {
      isControl: true,
      requestStart: function (e) {
        return {
          datas: datas,
          parentDirection: e.direction || [1, 1]
        };
      },
      request: function (e) {
        if ("offsetWidth" in e) {
          distWidth = e.offsetWidth - rect.offsetWidth;
        } else if ("deltaWidth" in e) {
          distWidth += e.deltaWidth;
        }

        if ("offsetHeight" in e) {
          distHeight = e.offsetHeight - rect.offsetHeight;
        } else if ("deltaHeight" in e) {
          distHeight += e.deltaHeight;
        }

        return {
          datas: datas,
          parentDist: [distWidth, distHeight]
        };
      },
      requestEnd: function () {
        return {
          datas: datas,
          isDrag: true
        };
      }
    };
  }
};
/**
 * Whether or not target can be resized. (default: false)
 * @name Moveable.Resizable#resizable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     resizable: false,
 * });
 *
 * moveable.resizable = true;
 */

/**
 * throttle of width, height when resize.
 * @name Moveable.Resizable#throttleResize
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   resizable: true,
 *   throttleResize: 0,
 * });
 *
 * moveable.throttleResize = 1;
 */

/**
 * When resize or scale, keeps a ratio of the width, height. (default: false)
 * @name Moveable.Resizable#keepRatio
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   resizable: true,
 * });
 *
 * moveable.keepRatio = true;
 */

/**
 * Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
 * @name Moveable.Resizable#renderDirections
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   resizable: true,
 *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
 * });
 *
 * moveable.renderDirections = ["nw", "ne", "sw", "se"];
 */

/**
 * When the resize starts, the resizeStart event is called.
 * @memberof Moveable.Resizable
 * @event resizeStart
 * @param {Moveable.Resizable.OnResizeStart} - Parameters for the resizeStart event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { resizable: true });
 * moveable.on("resizeStart", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When resizing, the resize event is called.
 * @memberof Moveable.Resizable
 * @event resize
 * @param {Moveable.Resizable.OnResize} - Parameters for the resize event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { resizable: true });
 * moveable.on("resize", ({ target, width, height }) => {
 *     target.style.width = `${e.width}px`;
 *     target.style.height = `${e.height}px`;
 * });
 */

/**
 * When the resize finishes, the resizeEnd event is called.
 * @memberof Moveable.Resizable
 * @event resizeEnd
 * @param {Moveable.Resizable.OnResizeEnd} - Parameters for the resizeEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { resizable: true });
 * moveable.on("resizeEnd", ({ target, isDrag }) => {
 *     console.log(target, isDrag);
 * });
 */

/**
* When the group resize starts, the `resizeGroupStart` event is called.
* @memberof Moveable.Resizable
* @event resizeGroupStart
* @param {Moveable.Resizable.OnResizeGroupStart} - Parameters for the `resizeGroupStart` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     resizable: true
* });
* moveable.on("resizeGroupStart", ({ targets }) => {
*     console.log("onResizeGroupStart", targets);
* });
*/

/**
* When the group resize, the `resizeGroup` event is called.
* @memberof Moveable.Resizable
* @event resizeGroup
* @param {Moveable.Resizable.onResizeGroup} - Parameters for the `resizeGroup` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     resizable: true
* });
* moveable.on("resizeGroup", ({ targets, events }) => {
*     console.log("onResizeGroup", targets);
*     events.forEach(ev => {
*         const offset = [
*             direction[0] < 0 ? -ev.delta[0] : 0,
*             direction[1] < 0 ? -ev.delta[1] : 0,
*         ];
*         // ev.drag is a drag event that occurs when the group resize.
*         const left = offset[0] + ev.drag.beforeDist[0];
*         const top = offset[1] + ev.drag.beforeDist[1];
*         const width = ev.width;
*         const top = ev.top;
*     });
* });
*/

/**
 * When the group resize finishes, the `resizeGroupEnd` event is called.
 * @memberof Moveable.Resizable
 * @event resizeGroupEnd
 * @param {Moveable.Resizable.OnResizeGroupEnd} - Parameters for the `resizeGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     resizable: true
 * });
 * moveable.on("resizeGroupEnd", ({ targets, isDrag }) => {
 *     console.log("onResizeGroupEnd", targets, isDrag);
 * });
 */

/**
 * @namespace Scalable
 * @memberof Moveable
 * @description Scalable indicates whether the target's x and y can be scale of transform.
 */

var Scalable = {
  name: "scalable",
  ableGroup: "size",
  canPinch: true,
  props: {
    scalable: Boolean,
    throttleScale: Number,
    renderDirections: String,
    keepRatio: Boolean
  },
  events: {
    onScaleStart: "scaleStart",
    onScale: "scale",
    onScaleEnd: "scaleEnd",
    onScaleGroupStart: "scaleGroupStart",
    onScaleGroup: "scaleGroup",
    onScaleGroupEnd: "scaleGroupEnd"
  },
  render: function (moveable, React) {
    var _a = moveable.props,
        resizable = _a.resizable,
        scalable = _a.scalable,
        edge = _a.edge;

    if (!resizable && scalable) {
      if (edge) {
        return renderDiagonalDirections(moveable, React);
      }

      return renderAllDirections(moveable, React);
    }
  },
  dragControlCondition: directionCondition,
  dragControlStart: function (moveable, e) {
    var datas = e.datas,
        isPinch = e.isPinch,
        inputEvent = e.inputEvent,
        parentDirection = e.parentDirection;
    var direction = parentDirection || (isPinch ? [0, 0] : getDirection(inputEvent.target));
    var _a = moveable.state,
        width = _a.width,
        height = _a.height,
        targetTransform = _a.targetTransform,
        target = _a.target,
        pos1 = _a.pos1,
        pos2 = _a.pos2,
        pos4 = _a.pos4;

    if (!direction || !target) {
      return false;
    }

    if (!isPinch) {
      setDragStart(moveable, e);
    }

    setDefaultTransformIndex(e);
    datas.datas = {};
    datas.transform = targetTransform;
    datas.prevDist = [1, 1];
    datas.direction = direction;
    datas.width = width;
    datas.height = height;
    datas.startValue = [1, 1];
    var isWidth = !direction[0] && !direction[1] || direction[0] || !direction[1];
    datas.isWidth = isWidth;

    function setRatio(ratio) {
      datas.ratio = ratio && isFinite(ratio) ? ratio : 0;
    }

    function setFixedDirection(fixedDirection) {
      datas.fixedDirection = fixedDirection;
      datas.fixedPosition = getAbsolutePosition(moveable, fixedDirection);
    }

    setRatio(getDist$1(pos1, pos2) / getDist$1(pos2, pos4));
    setFixedDirection([-direction[0], -direction[1]]);
    var params = fillParams(moveable, e, __assign(__assign({
      direction: direction,
      set: function (scale) {
        datas.startValue = scale;
      },
      setRatio: setRatio,
      setFixedDirection: setFixedDirection
    }, fillTransformStartEvent(e)), {
      dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
    }));
    var result = triggerEvent(moveable, "onScaleStart", params);

    if (result !== false) {
      datas.isScale = true;
      moveable.state.snapRenderInfo = {
        request: e.isRequest,
        direction: direction
      };
    }

    return datas.isScale ? params : false;
  },
  dragControl: function (moveable, e) {
    resolveTransformEvent(e, "scale");
    var datas = e.datas,
        distX = e.distX,
        distY = e.distY,
        parentScale = e.parentScale,
        parentDistance = e.parentDistance,
        parentKeepRatio = e.parentKeepRatio,
        parentFlag = e.parentFlag,
        isPinch = e.isPinch,
        dragClient = e.dragClient,
        parentDist = e.parentDist,
        isRequest = e.isRequest;
    var prevDist = datas.prevDist,
        direction = datas.direction,
        width = datas.width,
        height = datas.height,
        isScale = datas.isScale,
        startValue = datas.startValue,
        isWidth = datas.isWidth,
        ratio = datas.ratio,
        fixedDirection = datas.fixedDirection;

    if (!isScale) {
      return false;
    }

    var _a = moveable.props,
        throttleScale = _a.throttleScale,
        parentMoveable = _a.parentMoveable;
    var sizeDirection = direction;

    if (!direction[0] && !direction[1]) {
      sizeDirection = [1, 1];
    }

    var keepRatio = ratio && (moveable.props.keepRatio || parentKeepRatio);
    var state = moveable.state; // const startWidth = width * startValue[0];
    // const startHeight = height * startValue[1];

    var scaleX = 1;
    var scaleY = 1;
    var fixedPosition = dragClient;

    if (!dragClient) {
      if (!parentFlag && isPinch) {
        fixedPosition = getAbsolutePosition(moveable, [0, 0]);
      } else {
        fixedPosition = datas.fixedPosition;
      }
    }

    if (parentDist) {
      scaleX = (width + parentDist[0]) / width;
      scaleY = (height + parentDist[1]) / height;
    } else if (parentScale) {
      scaleX = parentScale[0];
      scaleY = parentScale[1];
    } else if (isPinch) {
      if (parentDistance) {
        scaleX = (width + parentDistance) / width;
        scaleY = (height + parentDistance * height / width) / height;
      }
    } else {
      var dragDist = getDragDist({
        datas: datas,
        distX: distX,
        distY: distY
      });
      var distWidth = sizeDirection[0] * dragDist[0];
      var distHeight = sizeDirection[1] * dragDist[1];

      if (keepRatio && width && height) {
        var rad = getRad([0, 0], dragDist);
        var standardRad = getRad([0, 0], sizeDirection);
        var size = getDistSize([distWidth, distHeight]);
        var signSize = Math.cos(rad - standardRad) * size;

        if (!sizeDirection[0]) {
          // top, bottom
          distHeight = signSize;
          distWidth = distHeight / ratio;
        } else if (!sizeDirection[1]) {
          // left, right
          distWidth = signSize;
          distHeight = distWidth * ratio;
        } else {
          // two-way
          distHeight = distWidth * ratio;
        }
      }

      scaleX = (width + distWidth) / width;
      scaleY = (height + distHeight) / height;
    }

    scaleX = sizeDirection[0] || keepRatio ? scaleX * startValue[0] : startValue[0];
    scaleY = sizeDirection[1] || keepRatio ? scaleY * startValue[1] : startValue[1];

    if (scaleX === 0) {
      scaleX = (prevDist[0] > 0 ? 1 : -1) * MIN_SCALE;
    }

    if (scaleY === 0) {
      scaleY = (prevDist[1] > 0 ? 1 : -1) * MIN_SCALE;
    }

    var dist = [scaleX / startValue[0], scaleY / startValue[1]];
    var scale = [scaleX, scaleY];

    if (!isPinch && moveable.props.groupable) {
      var snapRenderInfo = state.snapRenderInfo || {};
      var stateDirection = snapRenderInfo.direction;

      if (isArray(stateDirection) && (stateDirection[0] || stateDirection[1])) {
        state.snapRenderInfo = {
          direction: direction,
          request: e.isRequest
        };
      }
    }

    var snapDist = [0, 0];

    if (!isPinch) {
      snapDist = checkSnapScale(moveable, dist, direction, isRequest, datas);
    }

    if (keepRatio) {
      if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
        if (Math.abs(snapDist[0]) > Math.abs(snapDist[1])) {
          snapDist[1] = 0;
        } else {
          snapDist[0] = 0;
        }
      }

      var isNoSnap = !snapDist[0] && !snapDist[1];

      if (isNoSnap) {
        if (isWidth) {
          dist[0] = throttle(dist[0] * startValue[0], throttleScale) / startValue[0];
        } else {
          dist[1] = throttle(dist[1] * startValue[1], throttleScale) / startValue[1];
        }
      }

      if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
        dist[0] += snapDist[0];
        var snapHeight = width * dist[0] * startValue[0] / ratio;
        dist[1] = snapHeight / height / startValue[1];
      } else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
        dist[1] += snapDist[1];
        var snapWidth = height * dist[1] * startValue[1] * ratio;
        dist[0] = snapWidth / width / startValue[0];
      }
    } else {
      dist[0] += snapDist[0];
      dist[1] += snapDist[1];

      if (!snapDist[0]) {
        dist[0] = throttle(dist[0] * startValue[0], throttleScale) / startValue[0];
      }

      if (!snapDist[1]) {
        dist[1] = throttle(dist[1] * startValue[1], throttleScale) / startValue[1];
      }
    }

    if (dist[0] === 0) {
      dist[0] = (prevDist[0] > 0 ? 1 : -1) * MIN_SCALE;
    }

    if (dist[1] === 0) {
      dist[1] = (prevDist[1] > 0 ? 1 : -1) * MIN_SCALE;
    }

    var delta = [dist[0] / prevDist[0], dist[1] / prevDist[1]];
    scale = multiply2(dist, startValue);
    var inverseDist = getScaleDist(moveable, dist, fixedDirection, fixedPosition, datas);
    var inverseDelta = minus(inverseDist, datas.prevInverseDist || [0, 0]);
    datas.prevDist = dist;
    datas.prevInverseDist = inverseDist;

    if (scaleX === prevDist[0] && scaleY === prevDist[1] && inverseDelta.every(function (num) {
      return !num;
    }) && !parentMoveable) {
      return false;
    }

    var nextTransform = convertTransformFormat(datas, "scale(" + scale.join(", ") + ")", "scale(" + dist.join(", ") + ")");
    var params = fillParams(moveable, e, __assign({
      offsetWidth: width,
      offsetHeight: height,
      direction: direction,
      // beforeScale,
      // beforeDist,
      // beforeDelta,
      scale: scale,
      dist: dist,
      delta: delta,
      isPinch: !!isPinch
    }, fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e)));
    triggerEvent(moveable, "onScale", params);
    return params;
  },
  dragControlEnd: function (moveable, e) {
    var datas = e.datas,
        isDrag = e.isDrag;

    if (!datas.isScale) {
      return false;
    }

    datas.isScale = false;
    triggerEvent(moveable, "onScaleEnd", fillEndParams(moveable, e, {}));
    return isDrag;
  },
  dragGroupControlCondition: directionCondition,
  dragGroupControlStart: function (moveable, e) {
    var datas = e.datas;
    var params = this.dragControlStart(moveable, e);

    if (!params) {
      return false;
    }

    var originalEvents = fillChildEvents(moveable, "resizable", e);

    function setDist(child, ev) {
      var fixedDirection = datas.fixedDirection;
      var fixedPosition = datas.fixedPosition;
      var pos = getAbsolutePosition(child, fixedDirection);

      var _a = calculate(createRotateMatrix(-moveable.rotation / 180 * Math.PI, 3), [pos[0] - fixedPosition[0], pos[1] - fixedPosition[1], 1], 3),
          originalX = _a[0],
          originalY = _a[1];

      ev.datas.originalX = originalX;
      ev.datas.originalY = originalY;
      return ev;
    }

    datas.moveableScale = moveable.scale;
    var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
      return setDist(child, ev);
    });

    var nextParams = __assign(__assign({}, params), {
      targets: moveable.props.targets,
      events: events,
      setFixedDirection: function (fixedDirection) {
        params.setFixedDirection(fixedDirection);
        events.forEach(function (ev, i) {
          ev.setFixedDirection(fixedDirection);
          setDist(moveable.moveables[i], originalEvents[i]);
        });
      }
    });

    var result = triggerEvent(moveable, "onScaleGroupStart", nextParams);
    datas.isScale = result !== false;
    return datas.isScale ? nextParams : false;
  },
  dragGroupControl: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isScale) {
      return;
    }

    var params = this.dragControl(moveable, e);

    if (!params) {
      return;
    }

    var moveableScale = datas.moveableScale;
    moveable.scale = [params.scale[0] * moveableScale[0], params.scale[1] * moveableScale[1]];
    var keepRatio = moveable.props.keepRatio;
    var dist = params.dist,
        scale = params.scale;
    var fixedPosition = datas.fixedPosition;
    var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
      var _a = calculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [ev.datas.originalX * dist[0], ev.datas.originalY * dist[1], 1], 3),
          clientX = _a[0],
          clientY = _a[1];

      return __assign(__assign({}, ev), {
        parentDist: null,
        parentScale: scale,
        parentKeepRatio: keepRatio,
        dragClient: plus(fixedPosition, [clientX, clientY])
      });
    });

    var nextParams = __assign({
      targets: moveable.props.targets,
      events: events
    }, params);

    triggerEvent(moveable, "onScaleGroup", nextParams);
    return nextParams;
  },
  dragGroupControlEnd: function (moveable, e) {
    var isDrag = e.isDrag,
        datas = e.datas;

    if (!datas.isScale) {
      return;
    }

    this.dragControlEnd(moveable, e);
    triggerChildAble(moveable, this, "dragControlEnd", e);
    var nextParams = fillEndParams(moveable, e, {
      targets: moveable.props.targets
    });
    triggerEvent(moveable, "onScaleGroupEnd", nextParams);
    return isDrag;
  },

  /**
   * @method Moveable.Scalable#request
   * @param {object} [e] - the Resizable's request parameter
   * @param {number} [e.direction=[1, 1]] - Direction to scale
   * @param {number} [e.deltaWidth] - delta number of width
   * @param {number} [e.deltaHeight] - delta number of height
   * @return {Moveable.Requester} Moveable Requester
   * @example
    * // Instantly Request (requestStart - request - requestEnd)
   * moveable.request("scalable", { deltaWidth: 10, deltaHeight: 10 }, true);
   *
   * // requestStart
   * const requester = moveable.request("scalable");
   *
   * // request
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   * requester.request({ deltaWidth: 10, deltaHeight: 10 });
   *
   * // requestEnd
   * requester.requestEnd();
   */
  request: function () {
    var datas = {};
    var distWidth = 0;
    var distHeight = 0;
    return {
      isControl: true,
      requestStart: function (e) {
        return {
          datas: datas,
          parentDirection: e.direction || [1, 1]
        };
      },
      request: function (e) {
        distWidth += e.deltaWidth;
        distHeight += e.deltaHeight;
        return {
          datas: datas,
          parentDist: [distWidth, distHeight]
        };
      },
      requestEnd: function () {
        return {
          datas: datas,
          isDrag: true
        };
      }
    };
  }
};
/**
 * Whether or not target can scaled. (default: false)
 * @name Moveable.Scalable#scalable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.scalable = true;
 */

/**
 * throttle of scaleX, scaleY when scale.
 * @name Moveable.Scalable#throttleScale
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.throttleScale = 0.1;
 */

/**
 * Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
 * @name Moveable.Scalable#renderDirections
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     scalable: true,
 *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
 * });
 *
 * moveable.renderDirections = ["nw", "ne", "sw", "se"];
 */

/**
 * When resize or scale, keeps a ratio of the width, height. (default: false)
 * @name Moveable.Scalable#keepRatio
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     scalable: true,
 * });
 *
 * moveable.keepRatio = true;
 */

/**
 * When the scale starts, the scaleStart event is called.
 * @memberof Moveable.Scalable
 * @event scaleStart
 * @param {Moveable.Scalable.OnScaleStart} - Parameters for the scaleStart event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { scalable: true });
 * moveable.on("scaleStart", ({ target }) => {
 *     console.log(target);
 * });
 */

/**
 * When scaling, the scale event is called.
 * @memberof Moveable.Scalable
 * @event scale
 * @param {Moveable.Scalable.OnScale} - Parameters for the scale event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { scalable: true });
 * moveable.on("scale", ({ target, transform, dist }) => {
 *     target.style.transform = transform;
 * });
 */

/**
 * When the scale finishes, the scaleEnd event is called.
 * @memberof Moveable.Scalable
 * @event scaleEnd
 * @param {Moveable.Scalable.OnScaleEnd} - Parameters for the scaleEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { scalable: true });
 * moveable.on("scaleEnd", ({ target, isDrag }) => {
 *     console.log(target, isDrag);
 * });
 */

/**
* When the group scale starts, the `scaleGroupStart` event is called.
* @memberof Moveable.Scalable
* @event scaleGroupStart
* @param {Moveable.Scalable.OnScaleGroupStart} - Parameters for the `scaleGroupStart` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     scalable: true
* });
* moveable.on("scaleGroupStart", ({ targets }) => {
*     console.log("onScaleGroupStart", targets);
* });
*/

/**
* When the group scale, the `scaleGroup` event is called.
* @memberof Moveable.Scalable
* @event scaleGroup
* @param {Moveable.Scalable.OnScaleGroup} - Parameters for the `scaleGroup` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     target: [].slice.call(document.querySelectorAll(".target")),
*     scalable: true
* });
* moveable.on("scaleGroup", ({ targets, events }) => {
*     console.log("onScaleGroup", targets);
*     events.forEach(ev => {
*         const target = ev.target;
*         // ev.drag is a drag event that occurs when the group scale.
*         const left = ev.drag.beforeDist[0];
*         const top = ev.drag.beforeDist[1];
*         const scaleX = ev.scale[0];
*         const scaleY = ev.scale[1];
*     });
* });
*/

/**
 * When the group scale finishes, the `scaleGroupEnd` event is called.
 * @memberof Moveable.Scalable
 * @event scaleGroupEnd
 * @param {Moveable.Scalable.OnScaleGroupEnd} - Parameters for the `scaleGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 *     scalable: true
 * });
 * moveable.on("scaleGroupEnd", ({ targets, isDrag }) => {
 *     console.log("onScaleGroupEnd", targets, isDrag);
 * });
 */

function getMiddleLinePos(pos1, pos2) {
  return pos1.map(function (pos, i) {
    return dot(pos, pos2[i], 1, 2);
  });
}

function getTriangleRad(pos1, pos2, pos3) {
  // pos1 Rad
  var rad1 = getRad(pos1, pos2);
  var rad2 = getRad(pos1, pos3);
  var rad = rad2 - rad1;
  return rad >= 0 ? rad : rad + 2 * Math.PI;
}

function isValidPos(poses1, poses2) {
  var rad1 = getTriangleRad(poses1[0], poses1[1], poses1[2]);
  var rad2 = getTriangleRad(poses2[0], poses2[1], poses2[2]);
  var pi = Math.PI;

  if (rad1 >= pi && rad2 <= pi || rad1 <= pi && rad2 >= pi) {
    return false;
  }

  return true;
}
/**
 * @namespace Moveable.Warpable
 * @description Warpable indicates whether the target can be warped(distorted, bented).
 */


var Warpable = {
  name: "warpable",
  ableGroup: "size",
  props: {
    warpable: Boolean,
    renderDirections: Array
  },
  events: {
    onWarpStart: "warpStart",
    onWarp: "warp",
    onWarpEnd: "warpEnd"
  },
  render: function (moveable, React) {
    var _a = moveable.props,
        resizable = _a.resizable,
        scalable = _a.scalable,
        warpable = _a.warpable,
        zoom = _a.zoom;

    if (resizable || scalable || !warpable) {
      return [];
    }

    var _b = moveable.state,
        pos1 = _b.pos1,
        pos2 = _b.pos2,
        pos3 = _b.pos3,
        pos4 = _b.pos4;
    var linePosFrom1 = getMiddleLinePos(pos1, pos2);
    var linePosFrom2 = getMiddleLinePos(pos2, pos1);
    var linePosFrom3 = getMiddleLinePos(pos1, pos3);
    var linePosFrom4 = getMiddleLinePos(pos3, pos1);
    var linePosTo1 = getMiddleLinePos(pos3, pos4);
    var linePosTo2 = getMiddleLinePos(pos4, pos3);
    var linePosTo3 = getMiddleLinePos(pos2, pos4);
    var linePosTo4 = getMiddleLinePos(pos4, pos2);
    return __spreadArrays([React.createElement("div", {
      className: prefix("line"),
      key: "middeLine1",
      style: getLineStyle(linePosFrom1, linePosTo1, zoom)
    }), React.createElement("div", {
      className: prefix("line"),
      key: "middeLine2",
      style: getLineStyle(linePosFrom2, linePosTo2, zoom)
    }), React.createElement("div", {
      className: prefix("line"),
      key: "middeLine3",
      style: getLineStyle(linePosFrom3, linePosTo3, zoom)
    }), React.createElement("div", {
      className: prefix("line"),
      key: "middeLine4",
      style: getLineStyle(linePosFrom4, linePosTo4, zoom)
    })], renderAllDirections(moveable, React));
  },
  dragControlCondition: function (e) {
    if (e.isRequest) {
      return false;
    }

    return hasClass(e.inputEvent.target, prefix("direction"));
  },
  dragControlStart: function (moveable, e) {
    var datas = e.datas,
        inputEvent = e.inputEvent;
    var target = moveable.props.target;
    var inputTarget = inputEvent.target;
    var direction = getDirection(inputTarget);

    if (!direction || !target) {
      return false;
    }

    var state = moveable.state;
    var transformOrigin = state.transformOrigin,
        is3d = state.is3d,
        targetTransform = state.targetTransform,
        targetMatrix = state.targetMatrix,
        width = state.width,
        height = state.height,
        left = state.left,
        top = state.top;
    datas.datas = {};
    datas.targetTransform = targetTransform;
    datas.warpTargetMatrix = is3d ? targetMatrix : convertDimension(targetMatrix, 3, 4);
    datas.targetInverseMatrix = ignoreDimension(invert(datas.warpTargetMatrix, 4), 3, 4);
    datas.direction = direction;
    datas.left = left;
    datas.top = top;
    setDragStart(moveable, e);
    setDefaultTransformIndex(e);
    datas.poses = [[0, 0], [width, 0], [0, height], [width, height]].map(function (p) {
      return minus(p, transformOrigin);
    });
    datas.nextPoses = datas.poses.map(function (_a) {
      var x = _a[0],
          y = _a[1];
      return calculate(datas.warpTargetMatrix, [x, y, 0, 1], 4);
    });
    datas.startValue = createIdentityMatrix(4);
    datas.prevMatrix = createIdentityMatrix(4);
    datas.absolutePoses = getAbsolutePosesByState(state);
    datas.posIndexes = getPosIndexesByDirection(direction);
    state.snapRenderInfo = {
      request: e.isRequest,
      direction: direction
    };
    var params = fillParams(moveable, e, __assign({
      set: function (matrix) {
        datas.startValue = matrix;
      }
    }, fillTransformStartEvent(e)));
    var result = triggerEvent(moveable, "onWarpStart", params);

    if (result !== false) {
      datas.isWarp = true;
    }

    return datas.isWarp;
  },
  dragControl: function (moveable, e) {
    var datas = e.datas,
        isRequest = e.isRequest;
    var distX = e.distX,
        distY = e.distY;
    var targetInverseMatrix = datas.targetInverseMatrix,
        prevMatrix = datas.prevMatrix,
        isWarp = datas.isWarp,
        startValue = datas.startValue,
        poses = datas.poses,
        posIndexes = datas.posIndexes,
        absolutePoses = datas.absolutePoses;

    if (!isWarp) {
      return false;
    }

    resolveTransformEvent(e, "matrix3d");

    if (hasGuidelines(moveable, "warpable")) {
      var selectedPoses = posIndexes.map(function (index) {
        return absolutePoses[index];
      });

      if (selectedPoses.length > 1) {
        selectedPoses.push([(selectedPoses[0][0] + selectedPoses[1][0]) / 2, (selectedPoses[0][1] + selectedPoses[1][1]) / 2]);
      }

      var _a = checkMoveableSnapBounds(moveable, isRequest, selectedPoses.map(function (pos) {
        return [pos[0] + distX, pos[1] + distY];
      })),
          horizontalSnapInfo = _a.horizontal,
          verticalSnapInfo = _a.vertical;

      distY -= horizontalSnapInfo.offset;
      distX -= verticalSnapInfo.offset;
    }

    var dist = getDragDist({
      datas: datas,
      distX: distX,
      distY: distY
    }, true);
    var nextPoses = datas.nextPoses.slice();
    posIndexes.forEach(function (index) {
      nextPoses[index] = plus(nextPoses[index], dist);
    });

    if (!NEARBY_POS.every(function (nearByPoses) {
      return isValidPos(nearByPoses.map(function (i) {
        return poses[i];
      }), nearByPoses.map(function (i) {
        return nextPoses[i];
      }));
    })) {
      return false;
    }

    var h = createWarpMatrix(poses[0], poses[2], poses[1], poses[3], nextPoses[0], nextPoses[2], nextPoses[1], nextPoses[3]);

    if (!h.length) {
      return false;
    } // B * A * M


    var afterMatrix = multiply(targetInverseMatrix, h, 4); // B * M * A

    var matrix = getTransfromMatrix(datas, afterMatrix, true);
    var delta = multiply(invert(prevMatrix, 4), matrix, 4);
    datas.prevMatrix = matrix;
    var totalMatrix = multiply(startValue, matrix, 4);
    var nextTransform = convertTransformFormat(datas, "matrix3d(" + totalMatrix.join(", ") + ")", "matrix3d(" + matrix.join(", ") + ")");
    fillOriginalTransform(e, nextTransform);
    triggerEvent(moveable, "onWarp", fillParams(moveable, e, {
      delta: delta,
      matrix: totalMatrix,
      dist: matrix,
      multiply: multiply,
      transform: nextTransform
    }));
    return true;
  },
  dragControlEnd: function (moveable, e) {
    var datas = e.datas,
        isDrag = e.isDrag;

    if (!datas.isWarp) {
      return false;
    }

    datas.isWarp = false;
    triggerEvent(moveable, "onWarpEnd", fillEndParams(moveable, e, {}));
    return isDrag;
  }
};
/**
 * Whether or not target can be warped. (default: false)
 * @name Moveable.Warpable#warpable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.warpable = true;
 */

/**
* Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
* @name Moveable.Warpable#renderDirections
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     warpable: true,
*     renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
* });
*
* moveable.renderDirections = ["nw", "ne", "sw", "se"];
*/

/**
* When the warp starts, the warpStart event is called.
* @memberof Moveable.Warpable
* @event warpStart
* @param {Moveable.Warpable.OnWarpStart} - Parameters for the warpStart event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, { warpable: true });
* moveable.on("warpStart", ({ target }) => {
*     console.log(target);
* });
*/

/**
 * When warping, the warp event is called.
 * @memberof Moveable.Warpable
 * @event warp
 * @param {Moveable.Warpable.OnWarp} - Parameters for the warp event
 * @example
 * import Moveable from "moveable";
 * let matrix = [
 *  1, 0, 0, 0,
 *  0, 1, 0, 0,
 *  0, 0, 1, 0,
 *  0, 0, 0, 1,
 * ];
 * const moveable = new Moveable(document.body, { warpable: true });
 * moveable.on("warp", ({ target, transform, delta, multiply }) => {
 *    // target.style.transform = transform;
 *    matrix = multiply(matrix, delta);
 *    target.style.transform = `matrix3d(${matrix.join(",")})`;
 * });
 */

/**
 * When the warp finishes, the warpEnd event is called.
 * @memberof Moveable.Warpable
 * @event warpEnd
 * @param {Moveable.Warpable.OnWarpEnd} - Parameters for the warpEnd event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, { warpable: true });
 * moveable.on("warpEnd", ({ target, isDrag }) => {
 *     console.log(target, isDrag);
 * });
 */

var AREA_PIECES = /*#__PURE__*/prefix("area-pieces");
var AREA_PIECE = /*#__PURE__*/prefix("area-piece");
var AVOID = /*#__PURE__*/prefix("avoid");

function restoreStyle(moveable) {
  var el = moveable.areaElement;
  var _a = moveable.state,
      width = _a.width,
      height = _a.height;
  removeClass(el, AVOID);
  el.style.cssText += "left: 0px; top: 0px; width: " + width + "px; height: " + height + "px";
}

function renderPieces(React) {
  return React.createElement("div", {
    key: "area_pieces",
    className: AREA_PIECES
  }, React.createElement("div", {
    className: AREA_PIECE
  }), React.createElement("div", {
    className: AREA_PIECE
  }), React.createElement("div", {
    className: AREA_PIECE
  }), React.createElement("div", {
    className: AREA_PIECE
  }));
}

var DragArea = {
  name: "dragArea",
  props: {
    dragArea: Boolean,
    passDragArea: Boolean
  },
  events: {
    onClick: "click",
    onClickGroup: "clickGroup"
  },
  render: function (moveable, React) {
    var _a = moveable.props,
        target = _a.target,
        dragArea = _a.dragArea,
        groupable = _a.groupable,
        passDragArea = _a.passDragArea;
    var _b = moveable.state,
        width = _b.width,
        height = _b.height,
        renderPoses = _b.renderPoses;
    var className = passDragArea ? prefix("area", "pass") : prefix("area");

    if (groupable) {
      return [React.createElement("div", {
        key: "area",
        ref: ref(moveable, "areaElement"),
        className: className
      }), renderPieces(React)];
    }

    if (!target || !dragArea) {
      return [];
    }

    var h = createWarpMatrix([0, 0], [width, 0], [0, height], [width, height], renderPoses[0], renderPoses[1], renderPoses[2], renderPoses[3]);
    var transform = h.length ? makeMatrixCSS(h, true) : "none";
    return [React.createElement("div", {
      key: "area",
      ref: ref(moveable, "areaElement"),
      className: className,
      style: {
        top: "0px",
        left: "0px",
        width: width + "px",
        height: height + "px",
        transformOrigin: "0 0",
        transform: transform
      }
    }), renderPieces(React)];
  },
  dragStart: function (moveable, _a) {
    var datas = _a.datas,
        clientX = _a.clientX,
        clientY = _a.clientY,
        inputEvent = _a.inputEvent;

    if (!inputEvent) {
      return false;
    }

    datas.isDragArea = false;
    var areaElement = moveable.areaElement;
    var _b = moveable.state,
        moveableClientRect = _b.moveableClientRect,
        renderPoses = _b.renderPoses,
        rootMatrix = _b.rootMatrix,
        is3d = _b.is3d;
    var left = moveableClientRect.left,
        top = moveableClientRect.top;

    var _c = getRect(renderPoses),
        relativeLeft = _c.left,
        relativeTop = _c.top,
        width = _c.width,
        height = _c.height;

    var n = is3d ? 4 : 3;

    var _d = calculateInversePosition(rootMatrix, [clientX - left, clientY - top], n),
        posX = _d[0],
        posY = _d[1];

    posX -= relativeLeft;
    posY -= relativeTop;
    var rects = [{
      left: relativeLeft,
      top: relativeTop,
      width: width,
      height: posY - 10
    }, {
      left: relativeLeft,
      top: relativeTop,
      width: posX - 10,
      height: height
    }, {
      left: relativeLeft,
      top: relativeTop + posY + 10,
      width: width,
      height: height - posY - 10
    }, {
      left: relativeLeft + posX + 10,
      top: relativeTop,
      width: width - posX - 10,
      height: height
    }];
    var children = [].slice.call(areaElement.nextElementSibling.children);
    rects.forEach(function (rect, i) {
      children[i].style.cssText = "left: " + rect.left + "px;top: " + rect.top + "px; width: " + rect.width + "px; height: " + rect.height + "px;";
    });
    addClass(areaElement, AVOID);
    return;
  },
  drag: function (moveable, _a) {
    var datas = _a.datas,
        inputEvent = _a.inputEvent;

    if (!inputEvent) {
      return false;
    }

    if (!datas.isDragArea) {
      datas.isDragArea = true;
      restoreStyle(moveable);
    }
  },
  dragEnd: function (moveable, e) {
    var inputEvent = e.inputEvent,
        datas = e.datas;

    if (!inputEvent) {
      return false;
    }

    if (!datas.isDragArea) {
      restoreStyle(moveable);
    }
  },
  dragGroupStart: function (moveable, e) {
    return this.dragStart(moveable, e);
  },
  dragGroup: function (moveable, e) {
    return this.drag(moveable, e);
  },
  dragGroupEnd: function (moveable, e) {
    return this.dragEnd(moveable, e);
  },
  unset: function (moveable) {
    restoreStyle(moveable);
  }
};
/**
 * Add an event to the moveable area instead of the target for stopPropagation. (default: false, true in group)
 * @name Moveable#dragArea
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *  dragArea: false,
 * });
 */

/**
 * Set `pointerEvents: none;` css to pass events in dragArea. (default: false)
 * @name Moveable#passDragArea
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *  dragArea: false,
 * });
 */

var Origin = {
  name: "origin",
  props: {
    origin: Boolean
  },
  events: {},
  render: function (moveable, React) {
    var zoom = moveable.props.zoom;
    var _a = moveable.state,
        beforeOrigin = _a.beforeOrigin,
        rotation = _a.rotation;
    return [React.createElement("div", {
      className: prefix("control", "origin"),
      style: getControlTransform(rotation, zoom, beforeOrigin),
      key: "beforeOrigin"
    })];
  }
};
/**
 * Whether or not the origin controlbox will be visible or not (default: true)
 * @name Moveable#origin
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 *
 * moveable.origin = true;
 */

function getDefaultScrollPosition(e) {
  var scrollContainer = e.scrollContainer;
  return [scrollContainer.scrollLeft, scrollContainer.scrollTop];
}
/**
 * @namespace Moveable.Scrollable
 * @description Whether or not target can be scrolled to the scroll container (default: false)
 */


var Scrollable = {
  name: "scrollable",
  canPinch: true,
  props: {
    scrollable: Boolean,
    scrollContainer: Object,
    scrollThreshold: Number,
    getScrollPosition: Function
  },
  events: {
    onScroll: "scroll",
    onScrollGroup: "scrollGroup"
  },
  dragStart: function (moveable, e) {
    var props = moveable.props;
    var _a = props.scrollContainer,
        scrollContainer = _a === void 0 ? moveable.getContainer() : _a;
    var dragScroll = new DragScroll();
    var scrollContainerElement = getRefTarget(scrollContainer, moveable.props.iframeSelector, true);
    e.datas.dragScroll = dragScroll;
    var gestoName = e.isControl ? "controlGesto" : "targetGesto";
    var targets = e.targets;
    dragScroll.on("scroll", function (_a) {
      var container = _a.container,
          direction = _a.direction;
      var params = fillParams(moveable, e, {
        scrollContainer: container,
        direction: direction
      });
      var eventName = targets ? "onScrollGroup" : "onScroll";

      if (targets) {
        params.targets = targets;
      }

      triggerEvent(moveable, eventName, params);
    }).on("move", function (_a) {
      var offsetX = _a.offsetX,
          offsetY = _a.offsetY;
      moveable[gestoName].scrollBy(offsetX, offsetY, e.inputEvent, false);
    });
    dragScroll.dragStart(e, {
      container: scrollContainerElement
    });
  },
  checkScroll: function (moveable, e) {
    var dragScroll = e.datas.dragScroll;

    if (!dragScroll) {
      return;
    }

    var _a = moveable.props,
        _b = _a.scrollContainer,
        scrollContainer = _b === void 0 ? moveable.getContainer() : _b,
        _c = _a.scrollThreshold,
        scrollThreshold = _c === void 0 ? 0 : _c,
        _d = _a.getScrollPosition,
        getScrollPosition = _d === void 0 ? getDefaultScrollPosition : _d;
    dragScroll.drag(e, {
      container: scrollContainer,
      threshold: scrollThreshold,
      getScrollPosition: function (ev) {
        return getScrollPosition({
          scrollContainer: ev.container,
          direction: ev.direction
        });
      }
    });
    return true;
  },
  drag: function (moveable, e) {
    return this.checkScroll(moveable, e);
  },
  dragEnd: function (moveable, e) {
    e.datas.dragScroll.dragEnd();
    e.datas.dragScroll = null;
  },
  dragControlStart: function (moveable, e) {
    return this.dragStart(moveable, __assign(__assign({}, e), {
      isControl: true
    }));
  },
  dragControl: function (moveable, e) {
    return this.drag(moveable, e);
  },
  dragControlEnd: function (moveable, e) {
    return this.dragEnd(moveable, e);
  },
  dragGroupStart: function (moveable, e) {
    return this.dragStart(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  dragGroup: function (moveable, e) {
    return this.drag(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  dragGroupEnd: function (moveable, e) {
    return this.dragEnd(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  dragGroupControlStart: function (moveable, e) {
    return this.dragStart(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets,
      isControl: true
    }));
  },
  dragGroupContro: function (moveable, e) {
    return this.drag(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  },
  dragGroupControEnd: function (moveable, e) {
    return this.dragEnd(moveable, __assign(__assign({}, e), {
      targets: moveable.props.targets
    }));
  }
};
/**
 * Whether or not target can be scrolled to the scroll container (default: false)
 * @name Moveable.Scrollable#scrollable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   scrollable: true,
 *   scrollContainer: document.body,
 *   scrollThreshold: 0,
 *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
 * });
 *
 * moveable.scrollable = true;
 */

/**
 * The container to which scroll is applied (default: container)
 * @name Moveable.Scrollable#scrollContainer
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   scrollable: true,
 *   scrollContainer: document.body,
 *   scrollThreshold: 0,
 *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
 * });
 */

/**
 * Expand the range of the scroll check area. (default: 0)
 * @name Moveable.Scrollable#scrollThreshold
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   scrollable: true,
 *   scrollContainer: document.body,
 *   scrollThreshold: 0,
 *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
 * });
 */

/**
 * Sets a function to get the scroll position. (default: Function)
 * @name Moveable.Scrollable#getScrollPosition
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   scrollable: true,
 *   scrollContainer: document.body,
 *   scrollThreshold: 0,
 *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
 * });
 *
 */

/**
 * When the drag cursor leaves the scrollContainer, the `scroll` event occur to scroll.
 * @memberof Moveable.Scrollable
 * @event scroll
 * @param {Moveable.Scrollable.OnScroll} - Parameters for the `scroll` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: document.querySelector(".target"),
 * });
 * moveable.on("scroll", ({ scrollContainer, direction }) => {
 *   scrollContainer.scrollLeft += direction[0] * 10;
 *   scrollContainer.scrollTop += direction[1] * 10;
 * });
 */

/**
 * When the drag cursor leaves the scrollContainer, the `scrollGroup` event occur to scroll in group.
 * @memberof Moveable.Scrollable
 * @event scrollGroup
 * @param {Moveable.Scrollable.OnScrollGroup} - Parameters for the `scrollGroup` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 * });
 * moveable.on("scroll", ({ scrollContainer, direction }) => {
 *   scrollContainer.scrollLeft += direction[0] * 10;
 *   scrollContainer.scrollTop += direction[1] * 10;
 * });
 */

var Default = {
  name: "",
  props: {
    target: Object,
    dragTarget: Object,
    container: Object,
    portalContainer: Object,
    rootContainer: Object,
    zoom: Number,
    transformOrigin: Array,
    edge: Boolean,
    ables: Array,
    className: String,
    pinchThreshold: Number,
    pinchOutside: Boolean,
    triggerAblesSimultaneously: Boolean,
    checkInput: Boolean,
    cspNonce: String,
    translateZ: Number,
    props: Object
  },
  events: {}
};

var Padding = {
  name: "padding",
  props: {
    padding: Object
  },
  events: {},
  render: function (moveable, React) {
    var props = moveable.props;

    if (props.dragArea) {
      return [];
    }

    var padding = props.padding || {};
    var _a = padding.left,
        left = _a === void 0 ? 0 : _a,
        _b = padding.top,
        top = _b === void 0 ? 0 : _b,
        _c = padding.right,
        right = _c === void 0 ? 0 : _c,
        _d = padding.bottom,
        bottom = _d === void 0 ? 0 : _d;
    var _e = moveable.state,
        renderPoses = _e.renderPoses,
        pos1 = _e.pos1,
        pos2 = _e.pos2,
        pos3 = _e.pos3,
        pos4 = _e.pos4;
    var poses = [pos1, pos2, pos3, pos4];
    var paddingDirections = [];

    if (left > 0) {
      paddingDirections.push([0, 2]);
    }

    if (top > 0) {
      paddingDirections.push([0, 1]);
    }

    if (right > 0) {
      paddingDirections.push([1, 3]);
    }

    if (bottom > 0) {
      paddingDirections.push([2, 3]);
    }

    return paddingDirections.map(function (_a, i) {
      var dir1 = _a[0],
          dir2 = _a[1];
      var paddingPos1 = poses[dir1];
      var paddingPos2 = poses[dir2];
      var paddingPos3 = renderPoses[dir1];
      var paddingPos4 = renderPoses[dir2];
      var h = createWarpMatrix([0, 0], [100, 0], [0, 100], [100, 100], paddingPos1, paddingPos2, paddingPos3, paddingPos4);

      if (!h.length) {
        return undefined;
      }

      return React.createElement("div", {
        key: "padding" + i,
        className: prefix("padding"),
        style: {
          transform: makeMatrixCSS(h, true)
        }
      });
    });
  }
};
/**
 * Add padding around the target to increase the drag area. (default: null)
 * @name Moveable#padding
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *  target: document.querySelector(".target"),
 *  padding: { left: 0, top: 0, right: 0, bottom: 0 },
 * });
 * moveable.padding = { left: 10, top: 10, right: 10, bottom: 10 },
 * moveable.updateRect();
 */

var RADIUS_DIRECTIONS = ["nw", "ne", "se", "sw"];

function calculateRatio(values, size) {
  var sumSize = values[0] + values[1];
  var sumRatio = sumSize > size ? size / sumSize : 1;
  values[0] *= sumRatio;
  values[1] = size - values[1] * sumRatio;
  return values;
}

var HORIZONTAL_RADIUS_ORDER = [1, 2, 5, 6];
var VERTICAL_RADIUS_ORDER = [0, 3, 4, 7];
var HORIZONTAL_RADIUS_DIRECTIONS = [1, -1, -1, 1];
var VERTICAL_RADIUS_DIRECTIONS = [1, 1, -1, -1];
function getRadiusStyles(poses, controlPoses, isRelative, width, height, left, top, right, bottom) {
  if (left === void 0) {
    left = 0;
  }

  if (top === void 0) {
    top = 0;
  }

  if (right === void 0) {
    right = width;
  }

  if (bottom === void 0) {
    bottom = height;
  }

  var clipStyles = [];
  var isVertical = false;
  var raws = poses.map(function (pos, i) {
    var _a = controlPoses[i],
        horizontal = _a.horizontal,
        vertical = _a.vertical;

    if (vertical && !isVertical) {
      isVertical = true;
      clipStyles.push("/");
    }

    if (isVertical) {
      var rawPos = Math.max(0, vertical === 1 ? pos[1] - top : bottom - pos[1]);
      clipStyles.push(convertCSSSize(rawPos, height, isRelative));
      return rawPos;
    } else {
      var rawPos = Math.max(0, horizontal === 1 ? pos[0] - left : right - pos[0]);
      clipStyles.push(convertCSSSize(rawPos, width, isRelative));
      return rawPos;
    }
  });
  return {
    styles: clipStyles,
    raws: raws
  };
}
function getRadiusRange(controlPoses) {
  // [start, length]
  var horizontalRange = [0, 0];
  var verticalRange = [0, 0];
  var length = controlPoses.length;

  for (var i = 0; i < length; ++i) {
    var clipPose = controlPoses[i];

    if (!clipPose.sub) {
      continue;
    }

    if (clipPose.horizontal) {
      if (horizontalRange[1] === 0) {
        horizontalRange[0] = i;
      }

      horizontalRange[1] = i - horizontalRange[0] + 1;
      verticalRange[0] = i + 1;
    }

    if (clipPose.vertical) {
      if (verticalRange[1] === 0) {
        verticalRange[0] = i;
      }

      verticalRange[1] = i - verticalRange[0] + 1;
    }
  }

  return {
    horizontalRange: horizontalRange,
    verticalRange: verticalRange
  };
}
function getRadiusValues(values, width, height, left, top, minCounts) {
  var _a, _b, _c, _d;

  if (minCounts === void 0) {
    minCounts = [0, 0];
  }

  var splitIndex = values.indexOf("/");
  var splitLength = (splitIndex > -1 ? values.slice(0, splitIndex) : values).length;
  var horizontalValues = values.slice(0, splitLength);
  var verticalValues = values.slice(splitLength + 1);
  var _e = horizontalValues[0],
      nwValue = _e === void 0 ? "0px" : _e,
      _f = horizontalValues[1],
      neValue = _f === void 0 ? nwValue : _f,
      _g = horizontalValues[2],
      seValue = _g === void 0 ? nwValue : _g,
      _h = horizontalValues[3],
      swValue = _h === void 0 ? neValue : _h;
  var _j = verticalValues[0],
      wnValue = _j === void 0 ? nwValue : _j,
      _k = verticalValues[1],
      enValue = _k === void 0 ? wnValue : _k,
      _l = verticalValues[2],
      esValue = _l === void 0 ? wnValue : _l,
      _m = verticalValues[3],
      wsValue = _m === void 0 ? enValue : _m;
  var horizontalRawPoses = [nwValue, neValue, seValue, swValue].map(function (pos) {
    return convertUnitSize(pos, width);
  });
  var verticalRawPoses = [wnValue, enValue, esValue, wsValue].map(function (pos) {
    return convertUnitSize(pos, height);
  });
  var horizontalPoses = horizontalRawPoses.slice();
  var verticalPoses = verticalRawPoses.slice();
  _a = calculateRatio([horizontalPoses[0], horizontalPoses[1]], width), horizontalPoses[0] = _a[0], horizontalPoses[1] = _a[1];
  _b = calculateRatio([horizontalPoses[3], horizontalPoses[2]], width), horizontalPoses[3] = _b[0], horizontalPoses[2] = _b[1];
  _c = calculateRatio([verticalPoses[0], verticalPoses[3]], height), verticalPoses[0] = _c[0], verticalPoses[3] = _c[1];
  _d = calculateRatio([verticalPoses[1], verticalPoses[2]], height), verticalPoses[1] = _d[0], verticalPoses[2] = _d[1];
  var nextHorizontalPoses = horizontalPoses.slice(0, Math.max(minCounts[0], horizontalValues.length));
  var nextVerticalPoses = verticalPoses.slice(0, Math.max(minCounts[1], verticalValues.length));
  return __spreadArrays(nextHorizontalPoses.map(function (pos, i) {
    var direction = RADIUS_DIRECTIONS[i];
    return {
      horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
      vertical: 0,
      pos: [left + pos, top + (VERTICAL_RADIUS_DIRECTIONS[i] === -1 ? height : 0)],
      sub: true,
      raw: horizontalRawPoses[i],
      direction: direction
    };
  }), nextVerticalPoses.map(function (pos, i) {
    var direction = RADIUS_DIRECTIONS[i];
    return {
      horizontal: 0,
      vertical: VERTICAL_RADIUS_DIRECTIONS[i],
      pos: [left + (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1 ? width : 0), top + pos],
      sub: true,
      raw: verticalRawPoses[i],
      direction: direction
    };
  }));
}
function removeRadiusPos(controlPoses, poses, index, startIndex, length) {
  if (length === void 0) {
    length = poses.length;
  }

  var _a = getRadiusRange(controlPoses.slice(startIndex)),
      horizontalRange = _a.horizontalRange,
      verticalRange = _a.verticalRange;

  var radiuslIndex = index - startIndex;
  var deleteCount = 0;

  if (radiuslIndex === 0) {
    deleteCount = length;
  } else if (radiuslIndex > 0 && radiuslIndex < horizontalRange[1]) {
    deleteCount = horizontalRange[1] - radiuslIndex;
  } else if (radiuslIndex >= verticalRange[0]) {
    deleteCount = verticalRange[0] + verticalRange[1] - radiuslIndex;
  } else {
    return;
  }

  controlPoses.splice(index, deleteCount);
  poses.splice(index, deleteCount);
}
function addRadiusPos(controlPoses, poses, startIndex, horizontalIndex, verticalIndex, distX, distY, right, bottom, left, top) {
  if (left === void 0) {
    left = 0;
  }

  if (top === void 0) {
    top = 0;
  }

  var _a = getRadiusRange(controlPoses.slice(startIndex)),
      horizontalRange = _a.horizontalRange,
      verticalRange = _a.verticalRange;

  if (horizontalIndex > -1) {
    var radiusX = HORIZONTAL_RADIUS_DIRECTIONS[horizontalIndex] === 1 ? distX - left : right - distX;

    for (var i = horizontalRange[1]; i <= horizontalIndex; ++i) {
      var y = VERTICAL_RADIUS_DIRECTIONS[i] === 1 ? top : bottom;
      var x = 0;

      if (horizontalIndex === i) {
        x = distX;
      } else if (i === 0) {
        x = left + radiusX;
      } else if (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1) {
        x = right - (poses[startIndex][0] - left);
      }

      controlPoses.splice(startIndex + i, 0, {
        horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
        vertical: 0,
        pos: [x, y]
      });
      poses.splice(startIndex + i, 0, [x, y]);

      if (i === 0) {
        break;
      }
    }
  } else if (verticalIndex > -1) {
    var radiusY = VERTICAL_RADIUS_DIRECTIONS[verticalIndex] === 1 ? distY - top : bottom - distY;

    if (horizontalRange[1] === 0 && verticalRange[1] === 0) {
      var pos = [left + radiusY, top];
      controlPoses.push({
        horizontal: HORIZONTAL_RADIUS_DIRECTIONS[0],
        vertical: 0,
        pos: pos
      });
      poses.push(pos);
    }

    var startVerticalIndex = verticalRange[0];

    for (var i = verticalRange[1]; i <= verticalIndex; ++i) {
      var x = HORIZONTAL_RADIUS_DIRECTIONS[i] === 1 ? left : right;
      var y = 0;

      if (verticalIndex === i) {
        y = distY;
      } else if (i === 0) {
        y = top + radiusY;
      } else if (VERTICAL_RADIUS_DIRECTIONS[i] === 1) {
        y = poses[startIndex + startVerticalIndex][1];
      } else if (VERTICAL_RADIUS_DIRECTIONS[i] === -1) {
        y = bottom - (poses[startIndex + startVerticalIndex][1] - top);
      }

      controlPoses.push({
        horizontal: 0,
        vertical: VERTICAL_RADIUS_DIRECTIONS[i],
        pos: [x, y]
      });
      poses.push([x, y]);

      if (i === 0) {
        break;
      }
    }
  }
}
function splitRadiusPoses(controlPoses, raws) {
  if (raws === void 0) {
    raws = controlPoses.map(function (pos) {
      return pos.raw;
    });
  }

  var horizontals = controlPoses.map(function (pos, i) {
    return pos.horizontal ? raws[i] : null;
  }).filter(function (pos) {
    return pos != null;
  });
  var verticals = controlPoses.map(function (pos, i) {
    return pos.vertical ? raws[i] : null;
  }).filter(function (pos) {
    return pos != null;
  });
  return {
    horizontals: horizontals,
    verticals: verticals
  };
}

var CLIP_DIRECTIONS = [[0, -1, "n"], [1, 0, "e"]];
var CLIP_RECT_DIRECTIONS = [[-1, -1, "nw"], [0, -1, "n"], [1, -1, "ne"], [1, 0, "e"], [1, 1, "se"], [0, 1, "s"], [-1, 1, "sw"], [-1, 0, "w"]]; // 1 2 5 6 0 3 4 7
// 0 1 2 3 4 5 6 7

function getClipStyles(moveable, clipPath, poses) {
  var clipRelative = moveable.props.clipRelative;
  var _a = moveable.state,
      width = _a.width,
      height = _a.height;
  var _b = clipPath,
      clipType = _b.type,
      clipPoses = _b.poses;
  var isRect = clipType === "rect";
  var isCircle = clipType === "circle";

  if (clipType === "polygon") {
    return poses.map(function (pos) {
      return convertCSSSize(pos[0], width, clipRelative) + " " + convertCSSSize(pos[1], height, clipRelative);
    });
  } else if (isRect || clipType === "inset") {
    var top = poses[1][1];
    var right = poses[3][0];
    var left = poses[7][0];
    var bottom = poses[5][1];

    if (isRect) {
      return [top, right, bottom, left].map(function (pos) {
        return pos + "px";
      });
    }

    var clipStyles = [top, width - right, height - bottom, left].map(function (pos, i) {
      return convertCSSSize(pos, i % 2 ? width : height, clipRelative);
    });

    if (poses.length > 8) {
      var _c = minus(poses[4], poses[0]),
          subWidth = _c[0],
          subHeight = _c[1];

      clipStyles.push.apply(clipStyles, __spreadArrays(["round"], getRadiusStyles(poses.slice(8), clipPoses.slice(8), clipRelative, subWidth, subHeight, left, top, right, bottom).styles));
    }

    return clipStyles;
  } else if (isCircle || clipType === "ellipse") {
    var center = poses[0];
    var ry = convertCSSSize(Math.abs(poses[1][1] - center[1]), isCircle ? Math.sqrt((width * width + height * height) / 2) : height, clipRelative);
    var clipStyles = isCircle ? [ry] : [convertCSSSize(Math.abs(poses[2][0] - center[0]), width, clipRelative), ry];
    clipStyles.push("at", convertCSSSize(center[0], width, clipRelative), convertCSSSize(center[1], height, clipRelative));
    return clipStyles;
  }
}

function getRectPoses(top, right, bottom, left) {
  var xs = [left, (left + right) / 2, right];
  var ys = [top, (top + bottom) / 2, bottom];
  return CLIP_RECT_DIRECTIONS.map(function (_a) {
    var dirx = _a[0],
        diry = _a[1],
        dir = _a[2];
    var x = xs[dirx + 1];
    var y = ys[diry + 1];
    return {
      vertical: Math.abs(diry),
      horizontal: Math.abs(dirx),
      direction: dir,
      pos: [x, y]
    };
  });
}

function getClipPath(target, width, height, defaultClip, customClip) {
  var _a, _b, _c, _d, _e, _f, _g;

  var clipText = customClip;

  if (!clipText) {
    var style = getComputedStyle(target);
    var clipPath = style.clipPath;
    clipText = clipPath !== "none" ? clipPath : style.clip;
  }

  if (!clipText || clipText === "none" || clipText === "auto") {
    clipText = defaultClip;

    if (!clipText) {
      return;
    }
  }

  var _h = splitBracket(clipText),
      _j = _h.prefix,
      clipPrefix = _j === void 0 ? clipText : _j,
      _k = _h.value,
      value = _k === void 0 ? "" : _k;

  var isCircle = clipPrefix === "circle";
  var splitter = " ";

  if (clipPrefix === "polygon") {
    var values = splitComma(value || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
    splitter = ",";
    var poses = values.map(function (pos) {
      var _a = pos.split(" "),
          xPos = _a[0],
          yPos = _a[1];

      return {
        vertical: 1,
        horizontal: 1,
        pos: [convertUnitSize(xPos, width), convertUnitSize(yPos, height)]
      };
    });
    return {
      type: clipPrefix,
      clipText: clipText,
      poses: poses,
      splitter: splitter
    };
  } else if (isCircle || clipPrefix === "ellipse") {
    var xPos = "";
    var yPos = "";
    var radiusX_1 = 0;
    var radiusY_1 = 0;
    var values = splitSpace(value);

    if (isCircle) {
      var radius = "";
      _a = values[0], radius = _a === void 0 ? "50%" : _a, _b = values[2], xPos = _b === void 0 ? "50%" : _b, _c = values[3], yPos = _c === void 0 ? "50%" : _c;
      radiusX_1 = convertUnitSize(radius, Math.sqrt((width * width + height * height) / 2));
      radiusY_1 = radiusX_1;
    } else {
      var xRadius = "";
      var yRadius = "";
      _d = values[0], xRadius = _d === void 0 ? "50%" : _d, _e = values[1], yRadius = _e === void 0 ? "50%" : _e, _f = values[3], xPos = _f === void 0 ? "50%" : _f, _g = values[4], yPos = _g === void 0 ? "50%" : _g;
      radiusX_1 = convertUnitSize(xRadius, width);
      radiusY_1 = convertUnitSize(yRadius, height);
    }

    var centerPos_1 = [convertUnitSize(xPos, width), convertUnitSize(yPos, height)];

    var poses = __spreadArrays([{
      vertical: 1,
      horizontal: 1,
      pos: centerPos_1,
      direction: "nesw"
    }], CLIP_DIRECTIONS.slice(0, isCircle ? 1 : 2).map(function (dir) {
      return {
        vertical: Math.abs(dir[1]),
        horizontal: dir[0],
        direction: dir[2],
        sub: true,
        pos: [centerPos_1[0] + dir[0] * radiusX_1, centerPos_1[1] + dir[1] * radiusY_1]
      };
    }));

    return {
      type: clipPrefix,
      clipText: clipText,
      radiusX: radiusX_1,
      radiusY: radiusY_1,
      left: centerPos_1[0] - radiusX_1,
      top: centerPos_1[1] - radiusY_1,
      poses: poses,
      splitter: splitter
    };
  } else if (clipPrefix === "inset") {
    var values = splitSpace(value || "0 0 0 0");
    var roundIndex = values.indexOf("round");
    var rectLength = (roundIndex > -1 ? values.slice(0, roundIndex) : values).length;
    var radiusValues = values.slice(rectLength + 1);

    var _l = values.slice(0, rectLength),
        topValue = _l[0],
        _m = _l[1],
        rightValue = _m === void 0 ? topValue : _m,
        _o = _l[2],
        bottomValue = _o === void 0 ? topValue : _o,
        _p = _l[3],
        leftValue = _p === void 0 ? rightValue : _p;

    var _q = [topValue, bottomValue].map(function (pos) {
      return convertUnitSize(pos, height);
    }),
        top = _q[0],
        bottom = _q[1];

    var _r = [leftValue, rightValue].map(function (pos) {
      return convertUnitSize(pos, width);
    }),
        left = _r[0],
        right = _r[1];

    var nextRight = width - right;
    var nextBottom = height - bottom;
    var radiusPoses = getRadiusValues(radiusValues, nextRight - left, nextBottom - top, left, top);

    var poses = __spreadArrays(getRectPoses(top, nextRight, nextBottom, left), radiusPoses);

    return {
      type: "inset",
      clipText: clipText,
      poses: poses,
      top: top,
      left: left,
      right: nextRight,
      bottom: nextBottom,
      radius: radiusValues,
      splitter: splitter
    };
  } else if (clipPrefix === "rect") {
    // top right bottom left
    var values = splitComma(value || "0px, " + width + "px, " + height + "px, 0px");
    splitter = ",";

    var _s = values.map(function (pos) {
      var posValue = splitUnit(pos).value;
      return posValue;
    }),
        top = _s[0],
        right = _s[1],
        bottom = _s[2],
        left = _s[3];

    var poses = getRectPoses(top, right, bottom, left);
    return {
      type: "rect",
      clipText: clipText,
      poses: poses,
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      values: values,
      splitter: splitter
    };
  }

  return;
}

function addClipPath(moveable, e) {
  var _a = calculatePointerDist(moveable, e),
      distX = _a[0],
      distY = _a[1];

  var _b = e.datas,
      clipPath = _b.clipPath,
      index = _b.index;
  var _c = clipPath,
      clipType = _c.type,
      clipPoses = _c.poses,
      splitter = _c.splitter;
  var poses = clipPoses.map(function (pos) {
    return pos.pos;
  });

  if (clipType === "polygon") {
    poses.splice(index, 0, [distX, distY]);
  } else if (clipType === "inset") {
    var horizontalIndex = HORIZONTAL_RADIUS_ORDER.indexOf(index);
    var verticalIndex = VERTICAL_RADIUS_ORDER.indexOf(index);
    var length = clipPoses.length;
    addRadiusPos(clipPoses, poses, 8, horizontalIndex, verticalIndex, distX, distY, poses[4][0], poses[4][1], poses[0][0], poses[0][1]);

    if (length === clipPoses.length) {
      return;
    }
  } else {
    return;
  }

  var clipStyles = getClipStyles(moveable, clipPath, poses);
  triggerEvent(moveable, "onClip", fillParams(moveable, e, {
    clipEventType: "added",
    clipType: clipType,
    poses: poses,
    clipStyles: clipStyles,
    clipStyle: clipType + "(" + clipStyles.join(splitter) + ")",
    distX: 0,
    distY: 0
  }));
}

function removeClipPath(moveable, e) {
  var _a = e.datas,
      clipPath = _a.clipPath,
      index = _a.index;
  var _b = clipPath,
      clipType = _b.type,
      clipPoses = _b.poses,
      splitter = _b.splitter;
  var poses = clipPoses.map(function (pos) {
    return pos.pos;
  });
  var length = poses.length;

  if (clipType === "polygon") {
    clipPoses.splice(index, 1);
    poses.splice(index, 1);
  } else if (clipType === "inset") {
    if (index < 8) {
      return;
    }

    removeRadiusPos(clipPoses, poses, index, 8, length);

    if (length === clipPoses.length) {
      return;
    }
  } else {
    return;
  }

  var clipStyles = getClipStyles(moveable, clipPath, poses);
  triggerEvent(moveable, "onClip", fillParams(moveable, e, {
    clipEventType: "removed",
    clipType: clipType,
    poses: poses,
    clipStyles: clipStyles,
    clipStyle: clipType + "(" + clipStyles.join(splitter) + ")",
    distX: 0,
    distY: 0
  }));
}
/**
 * @namespace Moveable.Clippable
 * @description Whether to clip the target.
 */


var Clippable = {
  name: "clippable",
  props: {
    clippable: Boolean,
    defaultClipPath: String,
    customClipPath: String,
    clipRelative: Boolean,
    clipArea: Boolean,
    dragWithClip: Boolean,
    clipTargetBounds: Boolean,
    clipVerticalGuidelines: Array,
    clipHorizontalGuidelines: Array,
    clipSnapThreshold: Boolean
  },
  events: {
    onClipStart: "clipStart",
    onClip: "clip",
    onClipEnd: "clipEnd"
  },
  css: [".control.clip-control {\n    background: #6d6;\n    cursor: pointer;\n}\n.control.clip-control.clip-radius {\n    background: #d66;\n}\n.line.clip-line {\n    background: #6e6;\n    cursor: move;\n    z-index: 1;\n}\n.clip-area {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.clip-ellipse {\n    position: absolute;\n    cursor: move;\n    border: 1px solid #6d6;\n    border: var(--zoompx) solid #6d6;\n    border-radius: 50%;\n    transform-origin: 0px 0px;\n}", ":host {\n    --bounds-color: #d66;\n}", ".guideline {\n    pointer-events: none;\n    z-index: 2;\n}", ".line.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}"],
  render: function (moveable, React) {
    var _a = moveable.props,
        customClipPath = _a.customClipPath,
        defaultClipPath = _a.defaultClipPath,
        clipArea = _a.clipArea,
        zoom = _a.zoom;
    var _b = moveable.state,
        target = _b.target,
        width = _b.width,
        height = _b.height,
        allMatrix = _b.allMatrix,
        is3d = _b.is3d,
        left = _b.left,
        top = _b.top,
        pos1 = _b.pos1,
        pos2 = _b.pos2,
        pos3 = _b.pos3,
        pos4 = _b.pos4,
        clipPathState = _b.clipPathState,
        snapBoundInfos = _b.snapBoundInfos;

    if (!target) {
      return [];
    }

    var clipPath = getClipPath(target, width, height, defaultClipPath || "inset", clipPathState || customClipPath);

    if (!clipPath) {
      return [];
    }

    var n = is3d ? 4 : 3;
    var type = clipPath.type;
    var clipPoses = clipPath.poses;
    var poses = clipPoses.map(function (pos) {
      // return [x, y];
      var calculatedPos = calculatePosition(allMatrix, pos.pos, n);
      return [calculatedPos[0] - left, calculatedPos[1] - top];
    });
    var controls = [];
    var lines = [];
    var isRect = type === "rect";
    var isInset = type === "inset";
    var isPolygon = type === "polygon";

    if (isRect || isInset || isPolygon) {
      var linePoses_1 = isInset ? poses.slice(0, 8) : poses;
      lines = linePoses_1.map(function (to, i) {
        var from = i === 0 ? linePoses_1[linePoses_1.length - 1] : linePoses_1[i - 1];
        var rad = getRad(from, to);
        var dist = getDiagonalSize(from, to);
        return React.createElement("div", {
          key: "clipLine" + i,
          className: prefix("line", "clip-line", "snap-control"),
          "data-clip-index": i,
          style: {
            width: dist + "px",
            transform: "translate(" + from[0] + "px, " + from[1] + "px) rotate(" + rad + "rad) scaleY(" + zoom + ")"
          }
        });
      });
    }

    controls = poses.map(function (pos, i) {
      return React.createElement("div", {
        key: "clipControl" + i,
        className: prefix("control", "clip-control", "snap-control"),
        "data-clip-index": i,
        style: {
          transform: "translate(" + pos[0] + "px, " + pos[1] + "px) scale(" + zoom + ")"
        }
      });
    });

    if (isInset) {
      controls.push.apply(controls, poses.slice(8).map(function (pos, i) {
        return React.createElement("div", {
          key: "clipRadiusControl" + i,
          className: prefix("control", "clip-control", "clip-radius", "snap-control"),
          "data-clip-index": 8 + i,
          style: {
            transform: "translate(" + pos[0] + "px, " + pos[1] + "px) scale(" + zoom + ")"
          }
        });
      }));
    }

    if (type === "circle" || type === "ellipse") {
      var clipLeft = clipPath.left,
          clipTop = clipPath.top,
          radiusX = clipPath.radiusX,
          radiusY = clipPath.radiusY;

      var _c = minus(calculatePosition(allMatrix, [clipLeft, clipTop], n), calculatePosition(allMatrix, [0, 0], n)),
          distLeft = _c[0],
          distTop = _c[1];

      var ellipseClipPath = "none";

      if (!clipArea) {
        var piece = Math.max(10, radiusX / 5, radiusY / 5);
        var areaPoses = [];

        for (var i = 0; i <= piece; ++i) {
          var rad = Math.PI * 2 / piece * i;
          areaPoses.push([radiusX + (radiusX - zoom) * Math.cos(rad), radiusY + (radiusY - zoom) * Math.sin(rad)]);
        }

        areaPoses.push([radiusX, -2]);
        areaPoses.push([-2, -2]);
        areaPoses.push([-2, radiusY * 2 + 2]);
        areaPoses.push([radiusX * 2 + 2, radiusY * 2 + 2]);
        areaPoses.push([radiusX * 2 + 2, -2]);
        areaPoses.push([radiusX, -2]);
        ellipseClipPath = "polygon(" + areaPoses.map(function (pos) {
          return pos[0] + "px " + pos[1] + "px";
        }).join(", ") + ")";
      }

      controls.push(React.createElement("div", {
        key: "clipEllipse",
        className: prefix("clip-ellipse", "snap-control"),
        style: {
          width: radiusX * 2 + "px",
          height: radiusY * 2 + "px",
          clipPath: ellipseClipPath,
          transform: "translate(" + (-left + distLeft) + "px, " + (-top + distTop) + "px) " + makeMatrixCSS(allMatrix)
        }
      }));
    }

    if (clipArea) {
      var _d = getRect(__spreadArrays([pos1, pos2, pos3, pos4], poses)),
          allWidth = _d.width,
          allHeight = _d.height,
          allLeft_1 = _d.left,
          allTop_1 = _d.top;

      if (isPolygon || isRect || isInset) {
        var areaPoses = isInset ? poses.slice(0, 8) : poses;
        controls.push(React.createElement("div", {
          key: "clipArea",
          className: prefix("clip-area", "snap-control"),
          style: {
            width: allWidth + "px",
            height: allHeight + "px",
            transform: "translate(" + allLeft_1 + "px, " + allTop_1 + "px)",
            clipPath: "polygon(" + areaPoses.map(function (pos) {
              return pos[0] - allLeft_1 + "px " + (pos[1] - allTop_1) + "px";
            }).join(", ") + ")"
          }
        }));
      }
    }

    if (snapBoundInfos) {
      ["vertical", "horizontal"].forEach(function (directionType) {
        var info = snapBoundInfos[directionType];
        var isHorizontal = directionType === "horizontal";

        if (info.isSnap) {
          lines.push.apply(lines, info.snap.posInfos.map(function (_a, i) {
            var pos = _a.pos;
            var snapPos1 = minus(calculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]);
            var snapPos2 = minus(calculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]);
            return renderLine(React, "", snapPos1, snapPos2, zoom, "clip" + directionType + "snap" + i, "guideline");
          }));
        }

        if (info.isBound) {
          lines.push.apply(lines, info.bounds.map(function (_a, i) {
            var pos = _a.pos;
            var snapPos1 = minus(calculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]);
            var snapPos2 = minus(calculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]);
            return renderLine(React, "", snapPos1, snapPos2, zoom, "clip" + directionType + "bounds" + i, "guideline", "bounds", "bold");
          }));
        }
      });
    }

    return __spreadArrays(controls, lines);
  },
  dragControlCondition: function (e) {
    return e.inputEvent && (e.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
  },
  dragStart: function (moveable, e) {
    var props = moveable.props;
    var _a = props.dragWithClip,
        dragWithClip = _a === void 0 ? true : _a;

    if (dragWithClip) {
      return false;
    }

    return this.dragControlStart(moveable, e);
  },
  drag: function (moveable, e) {
    return this.dragControl(moveable, e);
  },
  dragEnd: function (moveable, e) {
    return this.dragControlEnd(moveable, e);
  },
  dragControlStart: function (moveable, e) {
    var state = moveable.state;
    var _a = moveable.props,
        defaultClipPath = _a.defaultClipPath,
        customClipPath = _a.customClipPath;
    var target = state.target,
        width = state.width,
        height = state.height;
    var inputTarget = e.inputEvent ? e.inputEvent.target : null;
    var className = inputTarget ? inputTarget.getAttribute("class") : "";
    var datas = e.datas;
    var clipPath = getClipPath(target, width, height, defaultClipPath || "inset", customClipPath);

    if (!clipPath) {
      return false;
    }

    var clipText = clipPath.clipText,
        type = clipPath.type,
        poses = clipPath.poses;
    var result = triggerEvent(moveable, "onClipStart", fillParams(moveable, e, {
      clipType: type,
      clipStyle: clipText,
      poses: poses.map(function (pos) {
        return pos.pos;
      })
    }));

    if (result === false) {
      datas.isClipStart = false;
      return false;
    }

    datas.isControl = className.indexOf("clip-control") > -1;
    datas.isLine = className.indexOf("clip-line") > -1;
    datas.isArea = className.indexOf("clip-area") > -1 || className.indexOf("clip-ellipse") > -1;
    datas.index = inputTarget ? parseInt(inputTarget.getAttribute("data-clip-index"), 10) : -1;
    datas.clipPath = clipPath;
    datas.isClipStart = true;
    state.clipPathState = clipText;
    setDragStart(moveable, e);
    return true;
  },
  dragControl: function (moveable, e) {
    var datas = e.datas,
        originalDatas = e.originalDatas;

    if (!datas.isClipStart) {
      return false;
    }

    var draggableData = originalDatas && originalDatas.draggable || {};
    var _a = datas,
        isControl = _a.isControl,
        isLine = _a.isLine,
        isArea = _a.isArea,
        index = _a.index,
        clipPath = _a.clipPath;

    if (!clipPath) {
      return false;
    }

    var _b = draggableData.isDrag ? draggableData.prevDist : getDragDist(e),
        distX = _b[0],
        distY = _b[1];

    var props = moveable.props;
    var state = moveable.state;
    var width = state.width,
        height = state.height;
    var isDragWithTarget = !isArea && !isControl && !isLine;
    var clipType = clipPath.type,
        clipPoses = clipPath.poses,
        splitter = clipPath.splitter;
    var poses = clipPoses.map(function (pos) {
      return pos.pos;
    });

    if (isDragWithTarget) {
      distX = -distX;
      distY = -distY;
    }

    var isAll = !isControl || clipPoses[index].direction === "nesw";
    var isRect = clipType === "inset" || clipType === "rect";
    var dists = clipPoses.map(function () {
      return [0, 0];
    });

    if (isControl && !isAll) {
      var _c = clipPoses[index],
          horizontal = _c.horizontal,
          vertical = _c.vertical;
      var dist = [distX * Math.abs(horizontal), distY * Math.abs(vertical)];
      dists = moveControlPos(clipPoses, index, dist, isRect);
    } else if (isAll) {
      dists = poses.map(function () {
        return [distX, distY];
      });
    }

    var nextPoses = poses.map(function (pos, i) {
      return plus(pos, dists[i]);
    });

    var guidePoses = __spreadArrays(nextPoses);

    state.snapBoundInfos = null;
    var isCircle = clipPath.type === "circle";
    var isEllipse = clipPath.type === "ellipse";

    if (isCircle || isEllipse) {
      var guideRect = getRect(nextPoses);
      var ry = Math.abs(guideRect.bottom - guideRect.top);
      var rx = Math.abs(isEllipse ? guideRect.right - guideRect.left : ry);
      var bottom = nextPoses[0][1] + ry;
      var left = nextPoses[0][0] - rx;
      var right = nextPoses[0][0] + rx; // right

      if (isCircle) {
        guidePoses.push([right, guideRect.bottom]);
        dists.push([1, 0]);
      } // bottom


      guidePoses.push([guideRect.left, bottom]);
      dists.push([0, 1]); // left

      guidePoses.push([left, guideRect.bottom]);
      dists.push([1, 0]);
    }

    var guidelines = addGuidelines([], width, height, (props.clipHorizontalGuidelines || []).map(function (v) {
      return convertUnitSize("" + v, height);
    }), (props.clipVerticalGuidelines || []).map(function (v) {
      return convertUnitSize("" + v, width);
    }));
    var guideXPoses = [];
    var guideYPoses = [];

    if (isCircle || isEllipse) {
      guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
      guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
    } else if (isRect) {
      var rectPoses = [guidePoses[0], guidePoses[2], guidePoses[4], guidePoses[6]];
      var rectDists_1 = [dists[0], dists[2], dists[4], dists[6]];
      guideXPoses = rectPoses.filter(function (_, i) {
        return rectDists_1[i][0];
      }).map(function (pos) {
        return pos[0];
      });
      guideYPoses = rectPoses.filter(function (_, i) {
        return rectDists_1[i][1];
      }).map(function (pos) {
        return pos[1];
      });
    } else {
      guideXPoses = guidePoses.filter(function (_, i) {
        return dists[i][0];
      }).map(function (pos) {
        return pos[0];
      });
      guideYPoses = guidePoses.filter(function (_, i) {
        return dists[i][1];
      }).map(function (pos) {
        return pos[1];
      });
    }

    var _loop_1 = function (i) {
      var _a = checkSnapBounds(guidelines, props.clipTargetBounds && {
        left: 0,
        top: 0,
        right: width,
        bottom: height
      }, guideXPoses, guideYPoses, {
        snapThreshold: 5
      }),
          horizontalSnapInfo = _a.horizontal,
          verticalSnapInfo = _a.vertical;

      var snapOffsetY = horizontalSnapInfo.offset;
      var snapOffsetX = verticalSnapInfo.offset;

      if ((isEllipse || isCircle) && dists[0][0] === 0 && dists[0][1] === 0) {
        var guideRect = getRect(nextPoses);
        var cy = guideRect.bottom - guideRect.top;
        var cx = isEllipse ? guideRect.right - guideRect.left : cy;
        var distSnapX = verticalSnapInfo.isBound ? Math.abs(snapOffsetX) : verticalSnapInfo.snapIndex === 0 ? -snapOffsetX : snapOffsetX;
        var distSnapY = horizontalSnapInfo.isBound ? Math.abs(snapOffsetY) : horizontalSnapInfo.snapIndex === 0 ? -snapOffsetY : snapOffsetY;
        cx -= distSnapX;
        cy -= distSnapY;

        if (isCircle) {
          cy = checkSnapBoundPriority(verticalSnapInfo, horizontalSnapInfo) > 0 ? cy : cx;
          cx = cy;
        }

        var center = guidePoses[0];
        guidePoses[1][1] = center[1] - cy;
        guidePoses[2][0] = center[0] + cx;
        guidePoses[3][1] = center[1] + cy;
        guidePoses[4][0] = center[0] - cx;
      } else {
        guidePoses.forEach(function (pos, j) {
          var dist = dists[j];

          if (dist[0]) {
            pos[0] -= snapOffsetX;
          }

          if (dist[1]) {
            pos[1] -= snapOffsetY;
          }
        });
        return "break";
      }
    };

    for (var i = 0; i < 2; ++i) {
      var state_1 = _loop_1();

      if (state_1 === "break") break;
    }

    var nextClipStyles = getClipStyles(moveable, clipPath, nextPoses);
    var clipStyle = clipType + "(" + nextClipStyles.join(splitter) + ")";
    state.clipPathState = clipStyle;

    if (isCircle || isEllipse) {
      guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
      guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
    } else if (isRect) {
      var rectPoses = [guidePoses[0], guidePoses[2], guidePoses[4], guidePoses[6]];
      guideXPoses = rectPoses.map(function (pos) {
        return pos[0];
      });
      guideYPoses = rectPoses.map(function (pos) {
        return pos[1];
      });
    } else {
      guideXPoses = guidePoses.map(function (pos) {
        return pos[0];
      });
      guideYPoses = guidePoses.map(function (pos) {
        return pos[1];
      });
    }

    state.snapBoundInfos = checkSnapBounds(guidelines, props.clipTargetBounds && {
      left: 0,
      top: 0,
      right: width,
      bottom: height
    }, guideXPoses, guideYPoses, {
      snapThreshold: 1
    });
    triggerEvent(moveable, "onClip", fillParams(moveable, e, {
      clipEventType: "changed",
      clipType: clipType,
      poses: nextPoses,
      clipStyle: clipStyle,
      clipStyles: nextClipStyles,
      distX: distX,
      distY: distY
    }));
    return true;
  },
  dragControlEnd: function (moveable, e) {
    this.unset(moveable);
    var isDrag = e.isDrag,
        datas = e.datas,
        isDouble = e.isDouble;
    var isLine = datas.isLine,
        isClipStart = datas.isClipStart,
        isControl = datas.isControl;

    if (!isClipStart) {
      return false;
    }

    triggerEvent(moveable, "onClipEnd", fillEndParams(moveable, e, {}));

    if (isDouble) {
      if (isControl) {
        removeClipPath(moveable, e);
      } else if (isLine) {
        // add
        addClipPath(moveable, e);
      }
    }

    return isDouble || isDrag;
  },
  unset: function (moveable) {
    moveable.state.clipPathState = "";
    moveable.state.snapBoundInfos = null;
  }
};
/**
 * Whether to clip the target. (default: false)
 * @name Moveable.Clippable#clippable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 *  If clippath is not set, the default value can be set. (defaultClipPath < style < customClipPath < dragging clipPath)
 * @name Moveable.Clippable#defaultClipPath
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * % Can be used instead of the absolute px (`rect` not possible) (default: false)
 * @name Moveable.Clippable#clipRelative
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * You can force the custom clipPath. (defaultClipPath < style < customClipPath < dragging clipPath)
 * @name Moveable.Clippable#customClipPath
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * When dragging the target, the clip also moves. (default: true)
 * @name Moveable.Clippable#dragWithClip
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * You can drag the clip by setting clipArea. (default: false)
 * @name Moveable.Clippable#clipArea
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
* Whether the clip is bound to the target. (default: false)
* @name Moveable.Clippable#clipTargetBounds
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     clippable: true,
*     defaultClipPath: "inset",
*     customClipPath: "",
*     clipRelative: false,
*     clipArea: false,
*     dragWithClip: true,
*     clipTargetBounds: true,
* });
* moveable.on("clipStart", e => {
*     console.log(e);
* }).on("clip", e => {
*     if (e.clipType === "rect") {
*         e.target.style.clip = e.clipStyle;
*     } else {
*         e.target.style.clipPath = e.clipStyle;
*     }
* }).on("clipEnd", e => {
*     console.log(e);
* });
*/

/**
* Add clip guidelines in the vertical direction. (default: [])
* @name Moveable.Clippable#clipVerticalGuidelines
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     clippable: true,
*     defaultClipPath: "inset",
*     customClipPath: "",
*     clipRelative: false,
*     clipArea: false,
*     dragWithClip: true,
*     clipVerticalGuidelines: [0, 100, 200],
*     clipHorizontalGuidelines: [0, 100, 200],
*     clipSnapThreshold: 5,
* });
*/

/**
* Add clip guidelines in the horizontal direction. (default: [])
* @name Moveable.Clippable#clipHorizontalGuidelines
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     clippable: true,
*     defaultClipPath: "inset",
*     customClipPath: "",
*     clipRelative: false,
*     clipArea: false,
*     dragWithClip: true,
*     clipVerticalGuidelines: [0, 100, 200],
*     clipHorizontalGuidelines: [0, 100, 200],
*     clipSnapThreshold: 5,
* });
*/

/**
* istance value that can snap to clip guidelines. (default: 5)
* @name Moveable.Clippable#clipSnapThreshold
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     clippable: true,
*     defaultClipPath: "inset",
*     customClipPath: "",
*     clipRelative: false,
*     clipArea: false,
*     dragWithClip: true,
*     clipVerticalGuidelines: [0, 100, 200],
*     clipHorizontalGuidelines: [0, 100, 200],
*     clipSnapThreshold: 5,
* });
*/

/**
 * When drag start the clip area or controls, the `clipStart` event is called.
 * @memberof Moveable.Clippable
 * @event clipStart
 * @param {Moveable.Clippable.OnClipStart} - Parameters for the `clipStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * When drag the clip area or controls, the `clip` event is called.
 * @memberof Moveable.Clippable
 * @event clip
 * @param {Moveable.Clippable.OnClip} - Parameters for the `clip` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * When drag end the clip area or controls, the `clipEnd` event is called.
 * @memberof Moveable.Clippable
 * @event clipEnd
 * @param {Moveable.Clippable.OnClipEnd} - Parameters for the `clipEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     clippable: true,
 *     defaultClipPath: "inset",
 *     customClipPath: "",
 *     clipRelative: false,
 *     clipArea: false,
 *     dragWithClip: true,
 * });
 * moveable.on("clipStart", e => {
 *     console.log(e);
 * }).on("clip", e => {
 *     if (e.clipType === "rect") {
 *         e.target.style.clip = e.clipStyle;
 *     } else {
 *         e.target.style.clipPath = e.clipStyle;
 *     }
 * }).on("clipEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * @namespace OriginDraggable
 * @memberof Moveable
 * @description Whether to drag origin (default: false)
 */

var OriginDraggable = {
  name: "originDraggable",
  props: {
    originDraggable: Boolean,
    originRelative: Boolean
  },
  events: {
    onDragOriginStart: "dragOriginStart",
    onDragOrigin: "dragOrigin",
    onDragOriginEnd: "dragOriginEnd"
  },
  css: [":host[data-able-origindraggable] .control.origin {\n    pointer-events: auto;\n}"],
  dragControlCondition: function (e) {
    if (e.isRequest) {
      return e.requestAble === "originDraggable";
    }

    return hasClass(e.inputEvent.target, prefix("origin"));
  },
  dragControlStart: function (moveable, e) {
    var datas = e.datas;
    setDragStart(moveable, e);
    var params = fillParams(moveable, e, {
      dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
    });
    var result = triggerEvent(moveable, "onDragOriginStart", params);
    datas.startOrigin = moveable.state.transformOrigin;
    datas.startTargetOrigin = moveable.state.targetOrigin;
    datas.prevOrigin = [0, 0];
    datas.isDragOrigin = true;

    if (result === false) {
      datas.isDragOrigin = false;
      return false;
    }

    return params;
  },
  dragControl: function (moveable, e) {
    var datas = e.datas,
        isPinch = e.isPinch,
        isRequest = e.isRequest;

    if (!datas.isDragOrigin) {
      return false;
    }

    var _a = getDragDist(e),
        distX = _a[0],
        distY = _a[1];

    var state = moveable.state;
    var width = state.width,
        height = state.height,
        offsetMatrix = state.offsetMatrix,
        targetMatrix = state.targetMatrix,
        is3d = state.is3d;
    var _b = moveable.props.originRelative,
        originRelative = _b === void 0 ? true : _b;
    var n = is3d ? 4 : 3;
    var dist = [distX, distY];

    if (isRequest) {
      var distOrigin = e.distOrigin;

      if (distOrigin[0] || distOrigin[1]) {
        dist = distOrigin;
      }
    }

    var origin = plus(datas.startOrigin, dist);
    var targetOrigin = plus(datas.startTargetOrigin, dist);
    var delta = minus(dist, datas.prevOrigin);
    var nextMatrix = getNextMatrix(offsetMatrix, targetMatrix, origin, n);
    var rect = moveable.getRect();
    var nextRect = getRect(calculatePoses(nextMatrix, width, height, n));
    var dragDelta = [rect.left - nextRect.left, rect.top - nextRect.top];
    datas.prevOrigin = dist;
    var transformOrigin = [convertCSSSize(targetOrigin[0], width, originRelative), convertCSSSize(targetOrigin[1], height, originRelative)].join(" ");
    var params = fillParams(moveable, e, {
      width: width,
      height: height,
      origin: origin,
      dist: dist,
      delta: delta,
      transformOrigin: transformOrigin,
      drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, dragDelta, !!isPinch, false))
    });
    triggerEvent(moveable, "onDragOrigin", params);
    return params;
  },
  dragControlEnd: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isDragOrigin) {
      return false;
    }

    triggerEvent(moveable, "onDragOriginEnd", fillEndParams(moveable, e, {}));
    return true;
  },
  dragGroupControlCondition: function (e) {
    return this.dragControlCondition(e);
  },
  dragGroupControlStart: function (moveable, e) {
    var params = this.dragControlStart(moveable, e);

    if (!params) {
      return false;
    }

    return true;
  },
  dragGroupControl: function (moveable, e) {
    var params = this.dragControl(moveable, e);

    if (!params) {
      return false;
    }

    moveable.transformOrigin = params.transformOrigin;
    return true;
  },

  /**
  * @method Moveable.OriginDraggable#request
  * @param {object} e - the OriginDraggable's request parameter
  * @param {number} [e.x] - x position
  * @param {number} [e.y] - y position
  * @param {number} [e.deltaX] - x number to move
  * @param {number} [e.deltaY] - y number to move
  * @param {array} [e.deltaOrigin] - left, top number to move transform-origin
  * @param {array} [e.origin] - transform-origin position
  * @param {number} [e.isInstant] - Whether to execute the request instantly
  * @return {Moveable.Requester} Moveable Requester
  * @example
   * // Instantly Request (requestStart - request - requestEnd)
  * // Use Relative Value
  * moveable.request("originDraggable", { deltaX: 10, deltaY: 10 }, true);
  * // Use Absolute Value
  * moveable.request("originDraggable", { x: 200, y: 100 }, true);
  * // Use Transform Value
  * moveable.request("originDraggable", { deltaOrigin: [10, 0] }, true);
  * moveable.request("originDraggable", { origin: [100, 0] }, true);
  * // requestStart
  * const requester = moveable.request("originDraggable");
  *
  * // request
  * // Use Relative Value
  * requester.request({ deltaX: 10, deltaY: 10 });
  * requester.request({ deltaX: 10, deltaY: 10 });
  * requester.request({ deltaX: 10, deltaY: 10 });
  * // Use Absolute Value
  * moveable.request("originDraggable", { x: 200, y: 100 });
  * moveable.request("originDraggable", { x: 220, y: 100 });
  * moveable.request("originDraggable", { x: 240, y: 100 });
  *
  * // requestEnd
  * requester.requestEnd();
  */
  request: function (moveable) {
    var datas = {};
    var rect = moveable.getRect();
    var distX = 0;
    var distY = 0;
    var transformOrigin = rect.transformOrigin;
    var distOrigin = [0, 0];
    return {
      isControl: true,
      requestStart: function () {
        return {
          datas: datas
        };
      },
      request: function (e) {
        if ("deltaOrigin" in e) {
          distOrigin[0] += e.deltaOrigin[0];
          distOrigin[1] += e.deltaOrigin[1];
        } else if ("origin" in e) {
          distOrigin[0] = e.origin[0] - transformOrigin[0];
          distOrigin[1] = e.origin[1] - transformOrigin[1];
        } else {
          if ("x" in e) {
            distX = e.x - rect.left;
          } else if ("deltaX" in e) {
            distX += e.deltaX;
          }

          if ("y" in e) {
            distY = e.y - rect.top;
          } else if ("deltaY" in e) {
            distY += e.deltaY;
          }
        }

        return {
          datas: datas,
          distX: distX,
          distY: distY,
          distOrigin: distOrigin
        };
      },
      requestEnd: function () {
        return {
          datas: datas,
          isDrag: true
        };
      }
    };
  }
};
/**
 * Whether to drag origin (default: false)
 * @name Moveable.OriginDraggable#originDraggable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     originDraggable: true,
 * });
 * let translate = [0, 0];
 * moveable.on("dragOriginStart", e => {
 *     e.dragStart && e.dragStart.set(translate);
 * }).on("dragOrigin", e => {
 *     translate = e.drag.beforeTranslate;
 *     e.target.style.cssText
 *         = `transform-origin: ${e.transformOrigin};`
 *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
 * }).on("dragOriginEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * % Can be used instead of the absolute px (default: true)
 * @name Moveable.OriginDraggable#originRelative
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     originDraggable: true,
 *     originRelative: false,
 * });
 * moveable.originRelative = true;
 */

/**
* When drag start the origin, the `dragOriginStart` event is called.
* @memberof Moveable.OriginDraggable
* @event dragOriginStart
* @param {Moveable.OriginDraggable.OnDragOriginStart} - Parameters for the `dragOriginStart` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     originDraggable: true,
* });
* let translate = [0, 0];
* moveable.on("dragOriginStart", e => {
*     e.dragStart && e.dragStart.set(translate);
* }).on("dragOrigin", e => {
*     translate = e.drag.beforeTranslate;
*     e.target.style.cssText
*         = `transform-origin: ${e.transformOrigin};`
*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
* }).on("dragOriginEnd", e => {
*     console.log(e);
* });
*/

/**
* When drag the origin, the `dragOrigin` event is called.
* @memberof Moveable.OriginDraggable
* @event dragOrigin
* @param {Moveable.OriginDraggable.OnDragOrigin} - Parameters for the `dragOrigin` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     originDraggable: true,
* });
* let translate = [0, 0];
* moveable.on("dragOriginStart", e => {
*     e.dragStart && e.dragStart.set(translate);
* }).on("dragOrigin", e => {
*     translate = e.drag.beforeTranslate;
*     e.target.style.cssText
*         = `transform-origin: ${e.transformOrigin};`
*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
* }).on("dragOriginEnd", e => {
*     console.log(e);
* });
*/

/**
* When drag end the origin, the `dragOriginEnd` event is called.
* @memberof Moveable.OriginDraggable
* @event dragOriginEnd
* @param {Moveable.OriginDraggable.OnDragOriginEnd} - Parameters for the `dragOriginEnd` event
* @example
* import Moveable from "moveable";
*
* const moveable = new Moveable(document.body, {
*     originDraggable: true,
* });
* let translate = [0, 0];
* moveable.on("dragOriginStart", e => {
*     e.dragStart && e.dragStart.set(translate);
* }).on("dragOrigin", e => {
*     translate = e.drag.beforeTranslate;
*     e.target.style.cssText
*         = `transform-origin: ${e.transformOrigin};`
*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
* }).on("dragOriginEnd", e => {
*     console.log(e);
* });
*/

function addBorderRadius(controlPoses, poses, lineIndex, distX, distY, width, height) {
  var _a = splitRadiusPoses(controlPoses),
      horizontals = _a.horizontals,
      verticals = _a.verticals;

  var horizontalsLength = horizontals.length;
  var verticalsLength = verticals.length; // lineIndex
  // 0 top
  // 1 right
  // 2 left
  // 3 bottom
  // 0 top - left
  // 1 top - right
  // 2 bottom - right
  // 3 bottom - left
  // 0 left - top
  // 1 right - top
  // 2 right - bottom
  // 3 left - bottom

  var horizontalIndex = -1;
  var verticalIndex = -1;

  if (lineIndex === 0) {
    if (horizontalsLength === 0) {
      horizontalIndex = 0;
    } else if (horizontalsLength === 1) {
      horizontalIndex = 1;
    }
  } else if (lineIndex === 3) {
    if (horizontalsLength <= 2) {
      horizontalIndex = 2;
    } else if (horizontalsLength <= 3) {
      horizontalIndex = 3;
    }
  }

  if (lineIndex === 2) {
    if (verticalsLength === 0) {
      verticalIndex = 0;
    } else if (verticalsLength < 4) {
      verticalIndex = 3;
    }
  } else if (lineIndex === 1) {
    if (verticalsLength <= 1) {
      verticalIndex = 1;
    } else if (verticalsLength <= 2) {
      verticalIndex = 2;
    }
  }

  addRadiusPos(controlPoses, poses, 0, horizontalIndex, verticalIndex, distX, distY, width, height);
}

function getBorderRadius(target, width, height, minCounts, state) {
  if (minCounts === void 0) {
    minCounts = [0, 0];
  }

  var borderRadius;
  var values = [];

  if (!state) {
    var style = window.getComputedStyle(target);
    borderRadius = style && style.borderRadius || "";
  } else {
    borderRadius = state;
  }

  if (!borderRadius || !state && borderRadius === "0px") {
    values = [];
  } else {
    values = splitSpace(borderRadius);
  }

  return getRadiusValues(values, width, height, 0, 0, minCounts);
}

function triggerRoundEvent(moveable, e, dist, delta, controlPoses, nextPoses) {
  var state = moveable.state;
  var width = state.width,
      height = state.height;

  var _a = getRadiusStyles(nextPoses, controlPoses, moveable.props.roundRelative, width, height),
      raws = _a.raws,
      styles = _a.styles;

  var _b = splitRadiusPoses(controlPoses, raws),
      horizontals = _b.horizontals,
      verticals = _b.verticals;

  var borderRadius = styles.join(" ");
  state.borderRadiusState = borderRadius;
  triggerEvent(moveable, "onRound", fillParams(moveable, e, {
    horizontals: horizontals,
    verticals: verticals,
    borderRadius: borderRadius,
    width: width,
    height: height,
    delta: delta,
    dist: dist
  }));
}
/**
 * @namespace Moveable.Roundable
 * @description Whether to show and drag or double click border-radius
 */


var Roundable = {
  name: "roundable",
  props: {
    roundable: Boolean,
    roundRelative: Boolean,
    minRoundControls: Array,
    maxRoundControls: Array,
    roundClickable: Boolean
  },
  events: {
    onRoundStart: "roundStart",
    onRound: "round",
    onRoundEnd: "roundEnd"
  },
  css: [".control.border-radius {\n    background: #d66;\n    cursor: pointer;\n}", ":host[data-able-roundable] .line.direction {\n    cursor: pointer;\n}"],
  render: function (moveable, React) {
    var _a = moveable.state,
        target = _a.target,
        width = _a.width,
        height = _a.height,
        allMatrix = _a.allMatrix,
        is3d = _a.is3d,
        left = _a.left,
        top = _a.top,
        borderRadiusState = _a.borderRadiusState;
    var _b = moveable.props,
        _c = _b.minRoundControls,
        minRoundControls = _c === void 0 ? [0, 0] : _c,
        _d = _b.maxRoundControls,
        maxRoundControls = _d === void 0 ? [4, 4] : _d,
        zoom = _b.zoom;

    if (!target) {
      return null;
    }

    var n = is3d ? 4 : 3;
    var radiusValues = getBorderRadius(target, width, height, minRoundControls, borderRadiusState);

    if (!radiusValues) {
      return null;
    }

    var verticalCount = 0;
    var horizontalCount = 0;
    return radiusValues.map(function (v, i) {
      horizontalCount += Math.abs(v.horizontal);
      verticalCount += Math.abs(v.vertical);
      var pos = minus(calculatePosition(allMatrix, v.pos, n), [left, top]);
      var isDisplay = v.vertical ? verticalCount <= maxRoundControls[1] : horizontalCount <= maxRoundControls[0];
      return React.createElement("div", {
        key: "borderRadiusControl" + i,
        className: prefix("control", "border-radius"),
        "data-radius-index": i,
        style: {
          display: isDisplay ? "block" : "none",
          transform: "translate(" + pos[0] + "px, " + pos[1] + "px) scale(" + zoom + ")"
        }
      });
    });
  },
  dragControlCondition: function (e) {
    if (!e.inputEvent || e.isRequest) {
      return false;
    }

    var className = e.inputEvent.target.getAttribute("class") || "";
    return className.indexOf("border-radius") > -1 || className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
  },
  dragControlStart: function (moveable, e) {
    var inputEvent = e.inputEvent,
        datas = e.datas;
    var inputTarget = inputEvent.target;
    var className = inputTarget.getAttribute("class") || "";
    var isControl = className.indexOf("border-radius") > -1;
    var isLine = className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
    var controlIndex = isControl ? parseInt(inputTarget.getAttribute("data-radius-index"), 10) : -1;
    var lineIndex = isLine ? parseInt(inputTarget.getAttribute("data-line-index"), 10) : -1;

    if (!isControl && !isLine) {
      return false;
    }

    var result = triggerEvent(moveable, "onRoundStart", fillParams(moveable, e, {}));

    if (result === false) {
      return false;
    }

    datas.lineIndex = lineIndex;
    datas.controlIndex = controlIndex;
    datas.isControl = isControl;
    datas.isLine = isLine;
    setDragStart(moveable, e);
    var _a = moveable.props,
        roundRelative = _a.roundRelative,
        _b = _a.minRoundControls,
        minRoundControls = _b === void 0 ? [0, 0] : _b;
    var state = moveable.state;
    var target = state.target,
        width = state.width,
        height = state.height;
    datas.isRound = true;
    datas.prevDist = [0, 0];
    var controlPoses = getBorderRadius(target, width, height, minRoundControls) || [];
    datas.controlPoses = controlPoses;
    state.borderRadiusState = getRadiusStyles(controlPoses.map(function (pos) {
      return pos.pos;
    }), controlPoses, roundRelative, width, height).styles.join(" ");
    return true;
  },
  dragControl: function (moveable, e) {
    var datas = e.datas;

    if (!datas.isRound || !datas.isControl || !datas.controlPoses.length) {
      return false;
    }

    var index = datas.controlIndex;
    var controlPoses = datas.controlPoses;

    var _a = getDragDist(e),
        distX = _a[0],
        distY = _a[1];

    var dist = [distX, distY];
    var delta = minus(dist, datas.prevDist);
    var _b = moveable.props.maxRoundControls,
        maxRoundControls = _b === void 0 ? [4, 4] : _b;
    var _c = moveable.state,
        width = _c.width,
        height = _c.height;
    var selectedControlPose = controlPoses[index];
    var selectedVertical = selectedControlPose.vertical;
    var selectedHorizontal = selectedControlPose.horizontal; // 0: [0, 1, 2, 3] maxCount === 1
    // 0: [0, 2] maxCount === 2
    // 1: [1, 3] maxCount === 2
    // 0: [0] maxCount === 3
    // 1: [1, 3] maxCount === 3

    var dists = controlPoses.map(function (pose) {
      var horizontal = pose.horizontal,
          vertical = pose.vertical;
      var poseDist = [horizontal * selectedHorizontal * dist[0], vertical * selectedVertical * dist[1]];

      if (horizontal) {
        if (maxRoundControls[0] === 1) {
          return poseDist;
        } else if (maxRoundControls[0] < 4 && horizontal !== selectedHorizontal) {
          return poseDist;
        }
      } else if (maxRoundControls[1] === 0) {
        poseDist[1] = vertical * selectedHorizontal * dist[0] / width * height;
        return poseDist;
      } else if (selectedVertical) {
        if (maxRoundControls[1] === 1) {
          return poseDist;
        } else if (maxRoundControls[1] < 4 && vertical !== selectedVertical) {
          return poseDist;
        }
      }

      return [0, 0];
    });
    dists[index] = dist;
    var nextPoses = controlPoses.map(function (pos, i) {
      return plus(pos.pos, dists[i]);
    });
    datas.prevDist = [distX, distY];
    triggerRoundEvent(moveable, e, dist, delta, controlPoses, nextPoses);
    return true;
  },
  dragControlEnd: function (moveable, e) {
    var state = moveable.state;
    state.borderRadiusState = "";
    var datas = e.datas,
        isDouble = e.isDouble;

    if (!datas.isRound) {
      return false;
    }

    var width = state.width,
        height = state.height;
    var isControl = datas.isControl,
        controlIndex = datas.controlIndex,
        isLine = datas.isLine,
        lineIndex = datas.lineIndex;
    var controlPoses = datas.controlPoses;
    var poses = controlPoses.map(function (pos) {
      return pos.pos;
    });
    var length = poses.length;
    var _a = moveable.props.roundClickable,
        roundClickable = _a === void 0 ? true : _a;

    if (isDouble && roundClickable) {
      if (isControl) {
        removeRadiusPos(controlPoses, poses, controlIndex, 0);
      } else if (isLine) {
        var _b = calculatePointerDist(moveable, e),
            distX = _b[0],
            distY = _b[1];

        addBorderRadius(controlPoses, poses, lineIndex, distX, distY, width, height);
      }

      if (length !== controlPoses.length) {
        triggerRoundEvent(moveable, e, [0, 0], [0, 0], controlPoses, poses);
      }

      triggerEvent(moveable, "onRoundEnd", fillEndParams(moveable, e, {}));
    }

    state.borderRadiusState = "";
    return true;
  },
  unset: function (moveable) {
    moveable.state.borderRadiusState = "";
  }
};
/**
 * Whether to show and drag or double click border-radius, (default: false)
 * @name Moveable.Roundable#roundable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 * });
 * moveable.on("roundStart", e => {
 *     console.log(e);
 * }).on("round", e => {
 *     e.target.style.borderRadius = e.borderRadius;
 * }).on("roundEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * % Can be used instead of the absolute px
 * @name Moveable.Roundable#roundRelative
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 * });
 * moveable.on("roundStart", e => {
 *     console.log(e);
 * }).on("round", e => {
 *     e.target.style.borderRadius = e.borderRadius;
 * }).on("roundEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * Minimum number of round controls. It moves in proportion by control. [horizontal, vertical] (default: [0, 0])
 * @name Moveable.Roundable#minRoundControls
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 *     minRoundControls: [0, 0],
 * });
 * moveable.maxRoundControls = [1, 0];
 */

/**
 * Maximum number of round controls. It moves in proportion by control. [horizontal, vertical] (default: [4, 4])
 * @name Moveable.Roundable#maxRoundControls
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 *     maxRoundControls: [4, 4],
 * });
 * moveable.maxRoundControls = [1, 0];
 */

/**
 * @property - Whether you can add/delete round controls by double-clicking a line or control. (default: true)
 * @name Moveable.Roundable#roundClickable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 *     roundClickable: true,
 * });
 * moveable.roundClickable = false;
 */

/**
 * When drag start the clip area or controls, the `roundStart` event is called.
 * @memberof Moveable.Roundable
 * @event roundStart
 * @param {Moveable.Roundable.OnRoundStart} - Parameters for the `roundStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 * });
 * moveable.on("roundStart", e => {
 *     console.log(e);
 * }).on("round", e => {
 *     e.target.style.borderRadius = e.borderRadius;
 * }).on("roundEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * When drag or double click the border area or controls, the `round` event is called.
 * @memberof Moveable.Roundable
 * @event round
 * @param {Moveable.Roundable.OnRound} - Parameters for the `round` event
 * @example
  * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 * });
 * moveable.on("roundStart", e => {
 *     console.log(e);
 * }).on("round", e => {
 *     e.target.style.borderRadius = e.borderRadius;
 * }).on("roundEnd", e => {
 *     console.log(e);
 * });
 */

/**
 * When drag end the border area or controls, the `roundEnd` event is called.
 * @memberof Moveable.Roundable
 * @event roundEnd
 * @param {Moveable.Roundable.onRoundEnd} - Parameters for the `roundEnd` event
 * @example
  * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     roundable: true,
 *     roundRelative: false,
 * });
 * moveable.on("roundStart", e => {
 *     console.log(e);
 * }).on("round", e => {
 *     e.target.style.borderRadius = e.borderRadius;
 * }).on("roundEnd", e => {
 *     console.log(e);
 * });
 */

var BeforeRenderable = {
  isPinch: true,
  name: "beforeRenderable",
  props: {},
  events: {
    onBeforeRenderStart: "beforeRenderStart",
    onBeforeRender: "beforeRender",
    onBeforeRenderEnd: "beforeRenderEnd",
    onBeforeRenderGroupStart: "beforeRenderGroupStart",
    onBeforeRenderGroup: "beforeRenderGroup",
    onBeforeRenderGroupEnd: "beforeRenderGroupEnd"
  },
  setTransform: function (moveable, e) {
    var _a = moveable.state,
        is3d = _a.is3d,
        targetMatrix = _a.targetMatrix;
    var cssMatrix = is3d ? "matrix3d(" + targetMatrix.join(",") + ")" : "matrix(" + convertMatrixtoCSS(targetMatrix, true) + ")";
    e.datas.startTransforms = [cssMatrix];
  },
  resetTransform: function (moveable, e) {
    e.datas.nextTransforms = e.datas.startTransforms;
    e.datas.nextTransformAppendedIndexes = [];
  },
  fillDragStartParams: function (moveable, e) {
    return fillParams(moveable, e, {
      setTransform: function (transform) {
        e.datas.startTransforms = isArray(transform) ? transform : splitSpace(transform);
      },
      isPinch: !!e.isPinch
    });
  },
  fillDragParams: function (moveable, e) {
    return fillParams(moveable, e, {
      isPinch: !!e.isPinch
    });
  },
  dragStart: function (moveable, e) {
    this.setTransform(moveable, e);
    triggerEvent(moveable, "onBeforeRenderStart", this.fillDragStartParams(moveable, e));
  },
  drag: function (moveable, e) {
    this.resetTransform(moveable, e);
    triggerEvent(moveable, "onBeforeRender", fillParams(moveable, e, {
      isPinch: !!e.isPinch
    }));
  },
  dragEnd: function (moveable, e) {
    triggerEvent(moveable, "onBeforeRenderEnd", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      isDrag: e.isDrag
    }));
  },
  dragGroupStart: function (moveable, e) {
    var _this = this;

    this.dragStart(moveable, e);
    var events = fillChildEvents(moveable, "beforeRenderable", e);
    var moveables = moveable.moveables;
    var params = events.map(function (childEvent, i) {
      var childMoveable = moveables[i];

      _this.setTransform(childMoveable, childEvent);

      return _this.fillDragStartParams(childMoveable, childEvent);
    });
    triggerEvent(moveable, "onBeforeRenderGroupStart", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      targets: moveable.props.targets,
      setTransform: function () {},
      events: params
    }));
  },
  dragGroup: function (moveable, e) {
    var _this = this;

    this.drag(moveable, e);
    var events = fillChildEvents(moveable, "beforeRenderable", e);
    var moveables = moveable.moveables;
    var params = events.map(function (childEvent, i) {
      var childMoveable = moveables[i];

      _this.resetTransform(childMoveable, childEvent);

      return _this.fillDragParams(childMoveable, childEvent);
    });
    triggerEvent(moveable, "onBeforeRenderGroup", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      targets: moveable.props.targets,
      events: params
    }));
  },
  dragGroupEnd: function (moveable, e) {
    this.dragEnd(moveable, e);
    triggerEvent(moveable, "onBeforeRenderGroupEnd", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      isDrag: e.isDrag,
      targets: moveable.props.targets
    }));
  },
  dragControlStart: function (moveable, e) {
    return this.dragStart(moveable, e);
  },
  dragControl: function (moveable, e) {
    return this.drag(moveable, e);
  },
  dragControlEnd: function (moveable, e) {
    return this.dragEnd(moveable, e);
  },
  dragGroupControlStart: function (moveable, e) {
    return this.dragGroupStart(moveable, e);
  },
  dragGroupControl: function (moveable, e) {
    return this.dragGroup(moveable, e);
  },
  dragGroupControlEnd: function (moveable, e) {
    return this.dragGroupEnd(moveable, e);
  }
};

var Renderable = {
  name: "Renderable",
  props: {},
  events: {
    onRenderStart: "renderStart",
    onRender: "render",
    onRenderEnd: "renderEnd",
    onRenderGroupStart: "renderGroupStart",
    onRenderGroup: "renderGroup",
    onRenderGroupEnd: "renderGroupEnd"
  },
  dragStart: function (moveable, e) {
    triggerEvent(moveable, "onRenderStart", fillParams(moveable, e, {
      isPinch: !!e.isPinch
    }));
  },
  drag: function (moveable, e) {
    triggerEvent(moveable, "onRender", fillParams(moveable, e, {
      isPinch: !!e.isPinch
    }));
  },
  dragEnd: function (moveable, e) {
    triggerEvent(moveable, "onRenderEnd", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      isDrag: e.isDrag
    }));
  },
  dragGroupStart: function (moveable, e) {
    triggerEvent(moveable, "onRenderGroupStart", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      targets: moveable.props.targets
    }));
  },
  dragGroup: function (moveable, e) {
    triggerEvent(moveable, "onRenderGroup", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      targets: moveable.props.targets
    }));
  },
  dragGroupEnd: function (moveable, e) {
    triggerEvent(moveable, "onRenderGroupEnd", fillParams(moveable, e, {
      isPinch: !!e.isPinch,
      isDrag: e.isDrag,
      targets: moveable.props.targets
    }));
  },
  dragControlStart: function (moveable, e) {
    return this.dragStart(moveable, e);
  },
  dragControl: function (moveable, e) {
    return this.drag(moveable, e);
  },
  dragControlEnd: function (moveable, e) {
    return this.dragEnd(moveable, e);
  },
  dragGroupControlStart: function (moveable, e) {
    return this.dragGroupStart(moveable, e);
  },
  dragGroupControl: function (moveable, e) {
    return this.dragGroup(moveable, e);
  },
  dragGroupControlEnd: function (moveable, e) {
    return this.dragGroupEnd(moveable, e);
  }
};

function triggerAble(moveable, ableType, eventOperation, eventAffix, eventType, e, requestInstant, iframeSelector) {
  var isStart = eventType === "Start";
  var target = moveable.state.target;
  var isRequest = e.isRequest;

  if (!target || isStart && eventAffix.indexOf("Control") > -1 && !isRequest && moveable.areaElement === e.inputEvent.target) {
    return false;
  }

  var eventName = "" + eventOperation + eventAffix + eventType;
  var conditionName = "" + eventOperation + eventAffix + "Condition";
  var isEnd = eventType === "End";
  var isAfter = eventType.indexOf("After") > -1;
  var isFirstStart = isStart && (!moveable.targetGesto || !moveable.controlGesto || !moveable.targetGesto.isFlag() || !moveable.controlGesto.isFlag());

  if (isFirstStart) {
    moveable.updateRect(eventType, true, false);
  }

  if (eventType === "" && !isAfter && !isRequest) {
    convertDragDist(moveable.state, e);
  }

  var isGroup = eventAffix.indexOf("Group") > -1;

  var ables = __spreadArrays([BeforeRenderable], moveable[ableType].slice(), [Renderable]);

  if (isRequest) {
    var requestAble_1 = e.requestAble;

    if (!ables.some(function (able) {
      return able.name === requestAble_1;
    })) {
      ables.push.apply(ables, moveable.props.ables.filter(function (able) {
        return able.name === requestAble_1;
      }));
    }
  }

  if (!ables.length) {
    return false;
  }

  var events = ables.filter(function (able) {
    return able[eventName];
  });
  var datas = e.datas;

  if (isFirstStart) {
    events.forEach(function (able) {
      able.unset && able.unset(moveable);
    });
  }

  var inputEvent = e.inputEvent;
  var inputTarget;

  if (isEnd && inputEvent) {
    var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
    var contentDocument = iframe ? iframe.contentDocument : document;
    inputTarget = contentDocument.elementFromPoint(e.clientX, e.clientY) || inputEvent.target;
  }

  var results = events.filter(function (able) {
    var ableName = able.name;
    var nextDatas = datas[ableName] || (datas[ableName] = {});

    if (isStart) {
      nextDatas.isEventStart = !able[conditionName] || able[conditionName](e, moveable);
    }

    if (nextDatas.isEventStart) {
      return able[eventName](moveable, __assign(__assign({}, e), {
        datas: nextDatas,
        originalDatas: datas,
        inputTarget: inputTarget
      }));
    }

    return false;
  });
  var isUpdate = results.length;
  var isForceEnd = isStart && events.length && !isUpdate;

  if (isEnd || isForceEnd) {
    moveable.state.gesto = null;

    if (moveable.moveables) {
      moveable.moveables.forEach(function (childMoveable) {
        childMoveable.state.gesto = null;
      });
    }
  }

  if (isFirstStart && isForceEnd) {
    events.forEach(function (able) {
      able.unset && able.unset(moveable);
    });
  }

  if (moveable.isUnmounted || isForceEnd) {
    return false;
  }

  if (!isStart && isUpdate && !requestInstant || isEnd) {
    if (results.some(function (able) {
      return able.updateRect;
    }) && !isGroup) {
      moveable.updateRect(eventType, false, false);
    } else {
      moveable.updateRect(eventType, true, false);
    }

    moveable.forceUpdate();
  }

  if (!isStart && !isEnd && !isAfter && isUpdate && !requestInstant) {
    triggerAble(moveable, ableType, eventOperation, eventAffix, eventType + "After", e, false, iframeSelector);
  }

  return true;
}
function getTargetAbleGesto(moveable, moveableTarget, eventAffix) {
  var controlBox = moveable.controlBox.getElement();
  var targets = [];
  targets.push(controlBox);

  if (!moveable.props.dragArea || moveable.props.dragTarget) {
    targets.push(moveableTarget);
  }

  var startFunc = function (e) {
    var eventTarget = e.inputEvent.target;
    var areaElement = moveable.areaElement;
    return eventTarget === areaElement || !moveable.isMoveableElement(eventTarget) || hasClass(eventTarget, "moveable-area") || hasClass(eventTarget, "moveable-padding");
  };

  return getAbleGesto(moveable, targets, "targetAbles", eventAffix, {
    dragStart: startFunc,
    pinchStart: startFunc
  }, moveable.props.iframeSelector);
}
function getAbleGesto(moveable, target, ableType, eventAffix, conditionFunctions, iframeSelector) {
  if (conditionFunctions === void 0) {
    conditionFunctions = {};
  }

  var iframe = iframeSelector ? document.querySelector(iframeSelector) : null;
  var contentWindow = iframe ? iframe.contentWindow : window;
  var _a = moveable.props,
      pinchOutside = _a.pinchOutside,
      pinchThreshold = _a.pinchThreshold;
  var options = {
    container: contentWindow,
    preventDefault: false,
    pinchThreshold: pinchThreshold,
    pinchOutside: pinchOutside,
    iframeSelector: iframeSelector
  };
  var gesto = new Gesto(target, options);
  ["drag", "pinch"].forEach(function (eventOperation) {
    ["Start", "", "End"].forEach(function (eventType) {
      gesto.on("" + eventOperation + eventType, function (e) {
        var eventName = e.eventType;

        if (conditionFunctions[eventName] && !conditionFunctions[eventName](e)) {
          e.stop();
          return;
        }

        var result = triggerAble(moveable, ableType, eventOperation, eventAffix, eventType, e, false, iframeSelector);

        if (!result) {
          e.stop();
        }
      });
    });
  });
  return gesto;
}

var EventManager = function () {
  function EventManager(target, moveable, eventName) {
    var _this = this;

    this.target = target;
    this.moveable = moveable;
    this.eventName = eventName;
    this.ables = [];

    this.onEvent = function (e) {
      var eventName = _this.eventName;
      var moveable = _this.moveable;

      _this.ables.forEach(function (able) {
        able[eventName]({
          inputEvent: e
        }, moveable);
      });
    };

    this.target.addEventListener(this.eventName.toLowerCase(), this.onEvent);
  }

  var __proto = EventManager.prototype;

  __proto.setAbles = function (ables) {
    this.ables = ables;
  };

  __proto.destroy = function () {
    this.target.removeEventListener(this.eventName.toLowerCase(), this.onEvent);
    this.target = null;
    this.moveable = null;
  };

  return EventManager;
}();

var MoveableManager = function (_super) {
  __extends(MoveableManager, _super);

  function MoveableManager() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = __assign({
      container: null,
      target: null,
      gesto: null,
      renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]]
    }, getTargetInfo(_this.props.iframeSelector));
    _this.enabledAbles = [];
    _this.targetAbles = [];
    _this.controlAbles = [];
    _this.rotation = 0;
    _this.scale = [1, 1];
    _this.isUnmounted = false;
    _this.events = {
      "mouseEnter": null,
      "mouseLeave": null
    };
    return _this;
  }

  var __proto = MoveableManager.prototype;

  __proto.render = function () {
    var props = this.props;
    var state = this.state;
    var edge = props.edge,
        parentPosition = props.parentPosition,
        className = props.className,
        propsTarget = props.target,
        zoom = props.zoom,
        cspNonce = props.cspNonce,
        translateZ = props.translateZ,
        ControlBoxElement = props.cssStyled,
        portalContainer = props.portalContainer;
    this.checkUpdate();
    this.updateRenderPoses();

    var _a = parentPosition || {
      left: 0,
      top: 0
    },
        parentLeft = _a.left,
        parentTop = _a.top;

    var left = state.left,
        top = state.top,
        stateTarget = state.target,
        direction = state.direction,
        renderPoses = state.renderPoses;
    var groupTargets = props.targets;
    var isDisplay = (groupTargets && groupTargets.length || propsTarget) && stateTarget;
    var isDragging = this.isDragging();
    var ableAttributes = {};
    var Renderer = {
      createElement: createElement
    };
    this.getEnabledAbles().forEach(function (able) {
      ableAttributes["data-able-" + able.name.toLowerCase()] = true;
    });
    return createElement(ControlBoxElement, __assign({
      cspNonce: cspNonce,
      ref: ref(this, "controlBox"),
      className: prefix("control-box", direction === -1 ? "reverse" : "", isDragging ? "dragging" : "") + " " + className
    }, ableAttributes, {
      portalContainer: portalContainer,
      style: {
        "position": "absolute",
        "display": isDisplay ? "block" : "none",
        "transform": "translate3d(" + (left - parentLeft) + "px, " + (top - parentTop) + "px, " + translateZ + ")",
        "--zoom": zoom,
        "--zoompx": zoom + "px"
      }
    }), this.renderAbles(), renderLine(Renderer, edge ? "n" : "", renderPoses[0], renderPoses[1], zoom, 0), renderLine(Renderer, edge ? "e" : "", renderPoses[1], renderPoses[3], zoom, 1), renderLine(Renderer, edge ? "w" : "", renderPoses[0], renderPoses[2], zoom, 2), renderLine(Renderer, edge ? "s" : "", renderPoses[2], renderPoses[3], zoom, 3));
  };

  __proto.componentDidMount = function () {
    this.controlBox.getElement();
    var props = this.props;
    var parentMoveable = props.parentMoveable,
        container = props.container,
        wrapperMoveable = props.wrapperMoveable;
    this.updateEvent(props);
    this.updateNativeEvents(props);

    if (!container && !parentMoveable && !wrapperMoveable) {
      this.updateRect("", false, true);
    }

    this.updateCheckInput();
  };

  __proto.componentDidUpdate = function (prevProps) {
    this.updateNativeEvents(prevProps);
    this.updateEvent(prevProps);
    this.updateCheckInput();
  };

  __proto.componentWillUnmount = function () {
    this.isUnmounted = true;
    unset(this, "targetGesto");
    unset(this, "controlGesto");
    var events = this.events;

    for (var name in events) {
      var manager = events[name];
      manager && manager.destroy();
    }
  };

  __proto.getContainer = function () {
    var _a = this.props,
        parentMoveable = _a.parentMoveable,
        wrapperMoveable = _a.wrapperMoveable,
        container = _a.container;
    return container || wrapperMoveable && wrapperMoveable.getContainer() || parentMoveable && parentMoveable.getContainer() || this.controlBox.getElement().parentElement;
  };
  /**
   * Check if the target is an element included in the moveable.
   * @method Moveable#isMoveableElement
   * @param - the target
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * window.addEventListener("click", e => {
   *     if (!moveable.isMoveableElement(e.target)) {
   *         moveable.target = e.target;
   *     }
   * });
   */


  __proto.isMoveableElement = function (target) {
    return target && (target.getAttribute("class") || "").indexOf(PREFIX) > -1;
  };
  /**
   * You can drag start the Moveable through the external `MouseEvent`or `TouchEvent`. (Angular: ngDragStart)
   * @method Moveable#dragStart
   * @param - external `MouseEvent`or `TouchEvent`
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * document.body.addEventListener("mousedown", e => {
   *     if (!moveable.isMoveableElement(e.target)) {
   *          moveable.dragStart(e);
   *     }
   * });
   */


  __proto.dragStart = function (e) {
    if (this.targetGesto) {
      this.targetGesto.triggerDragStart(e);
    }

    return this;
  };
  /**
   * Hit test an element or rect on a moveable target.
   * @method Moveable#hitTest
   * @param - element or rect to test
   * @return - Get hit test rate (rate > 0 is hitted)
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * document.body.addEventListener("mousedown", e => {
   *     if (moveable.hitTest(e.target) > 0) {
   *          console.log("hiited");
   *     }
   * });
   */


  __proto.hitTest = function (el) {
    var _a = this.state,
        target = _a.target,
        pos1 = _a.pos1,
        pos2 = _a.pos2,
        pos3 = _a.pos3,
        pos4 = _a.pos4,
        targetClientRect = _a.targetClientRect;

    if (!target) {
      return 0;
    }

    var rect;

    if (el instanceof Element) {
      var clientRect = el.getBoundingClientRect();
      rect = {
        left: clientRect.left,
        top: clientRect.top,
        width: clientRect.width,
        height: clientRect.height
      };
    } else {
      rect = __assign({
        width: 0,
        height: 0
      }, el);
    }

    var rectLeft = rect.left,
        rectTop = rect.top,
        rectWidth = rect.width,
        rectHeight = rect.height;
    var points = fitPoints([pos1, pos2, pos4, pos3], targetClientRect);
    var size = getOverlapSize(points, [[rectLeft, rectTop], [rectLeft + rectWidth, rectTop], [rectLeft + rectWidth, rectTop + rectHeight], [rectLeft, rectTop + rectHeight]]);
    var totalSize = getAreaSize(points);

    if (!size || !totalSize) {
      return 0;
    }

    return Math.min(100, size / totalSize * 100);
  };
  /**
   * Whether the coordinates are inside Moveable
   * @method Moveable#isInside
   * @param - x coordinate
   * @param - y coordinate
   * @return - True if the coordinate is in moveable or false
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * document.body.addEventListener("mousedown", e => {
   *     if (moveable.isInside(e.clientX, e.clientY)) {
   *          console.log("inside");
   *     }
   * });
   */


  __proto.isInside = function (clientX, clientY) {
    var _a = this.state,
        target = _a.target,
        pos1 = _a.pos1,
        pos2 = _a.pos2,
        pos3 = _a.pos3,
        pos4 = _a.pos4,
        targetClientRect = _a.targetClientRect;

    if (!target) {
      return false;
    }

    return isInside([clientX, clientY], fitPoints([pos1, pos2, pos4, pos3], targetClientRect));
  };
  /**
   * If the width, height, left, and top of all elements change, update the shape of the moveable.
   * @method Moveable#updateRect
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * window.addEventListener("resize", e => {
   *     moveable.updateRect();
   * });
   */


  __proto.updateRect = function (type, isTarget, isSetState) {
    if (isSetState === void 0) {
      isSetState = true;
    }

    var props = this.props;
    var parentMoveable = props.parentMoveable;
    var state = this.state;
    var target = state.target || this.props.target;
    var container = this.getContainer();
    var rootContainer = parentMoveable ? parentMoveable.props.rootContainer : props.rootContainer;
    this.updateState(getTargetInfo(this.props.iframeSelector, this.controlBox && this.controlBox.getElement(), target, container, container, rootContainer || container), parentMoveable ? false : isSetState);
  };

  __proto.isTargetChanged = function (prevProps, useDragArea) {
    var props = this.props;
    var target = props.dragTarget || props.target;
    var prevTarget = prevProps.dragTarget || prevProps.target;
    var dragArea = props.dragArea;
    var prevDragArea = prevProps.dragArea;
    var isTargetChanged = !dragArea && prevTarget !== target;
    return isTargetChanged || (useDragArea || dragArea) && prevDragArea !== dragArea;
  };

  __proto.updateNativeEvents = function (prevProps) {
    var _this = this;

    var props = this.props;
    var target = props.dragArea ? this.areaElement : this.state.target;
    var events = this.events;
    var eventKeys = getKeys(events);

    if (this.isTargetChanged(prevProps)) {
      for (var eventName in events) {
        var manager = events[eventName];
        manager && manager.destroy();
        events[eventName] = null;
      }
    }

    if (!target) {
      return;
    }

    var enabledAbles = this.enabledAbles;
    eventKeys.forEach(function (eventName) {
      var ables = filterAbles(enabledAbles, [eventName]);
      var hasAbles = ables.length > 0;
      var manager = events[eventName];

      if (!hasAbles) {
        if (manager) {
          manager.destroy();
          events[eventName] = null;
        }

        return;
      }

      if (!manager) {
        manager = new EventManager(target, _this, eventName);
        events[eventName] = manager;
      }

      manager.setAbles(ables);
    });
  };

  __proto.updateEvent = function (prevProps) {
    var controlBoxElement = this.controlBox.getElement();
    var hasTargetAble = this.targetAbles.length;
    var hasControlAble = this.controlAbles.length;
    var props = this.props;
    var target = props.dragTarget || props.target;
    var isTargetChanged = this.isTargetChanged(prevProps, true);
    var isUnset = !hasTargetAble && this.targetGesto || isTargetChanged;

    if (isUnset) {
      unset(this, "targetGesto");
      this.updateState({
        gesto: null
      });
    }

    if (!hasControlAble) {
      unset(this, "controlGesto");
    }

    if (target && hasTargetAble && !this.targetGesto) {
      this.targetGesto = getTargetAbleGesto(this, target, "");
    }

    if (!this.controlGesto && hasControlAble) {
      this.controlGesto = getAbleGesto(this, controlBoxElement, "controlAbles", "Control", undefined, this.props.iframeSelector);
    }

    if (isUnset) {
      this.unsetAbles();
    }
  };
  /**
   * Check if the moveable state is being dragged.
   * @method Moveable#isDragging
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * // false
   * console.log(moveable.isDragging());
   *
   * moveable.on("drag", () => {
   *   // true
   *   console.log(moveable.isDragging());
   * });
   */


  __proto.isDragging = function () {
    return (this.targetGesto ? this.targetGesto.isFlag() : false) || (this.controlGesto ? this.controlGesto.isFlag() : false);
  };
  /**
   * If the width, height, left, and top of the only target change, update the shape of the moveable.
   * @method Moveable#updateTarget
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * moveable.updateTarget();
   */


  __proto.updateTarget = function (type) {
    this.updateRect(type, true);
  };
  /**
   * You can get the vertex information, position and offset size information of the target based on the container.
   * @method Moveable#getRect
   * @return - The Rect Info
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * const rectInfo = moveable.getRect();
   */


  __proto.getRect = function () {
    var state = this.state;
    var poses = getAbsolutePosesByState(this.state);
    var pos1 = poses[0],
        pos2 = poses[1],
        pos3 = poses[2],
        pos4 = poses[3];
    var rect = getRect(poses);
    var offsetWidth = state.width,
        offsetHeight = state.height;
    var width = rect.width,
        height = rect.height,
        left = rect.left,
        top = rect.top;
    var statePos = [state.left, state.top];
    var origin = plus(statePos, state.origin);
    var beforeOrigin = plus(statePos, state.beforeOrigin);
    var transformOrigin = state.transformOrigin;
    return {
      width: width,
      height: height,
      left: left,
      top: top,
      pos1: pos1,
      pos2: pos2,
      pos3: pos3,
      pos4: pos4,
      offsetWidth: offsetWidth,
      offsetHeight: offsetHeight,
      beforeOrigin: beforeOrigin,
      origin: origin,
      transformOrigin: transformOrigin,
      rotation: this.getRotation()
    };
  };
  /**
   * Get a manager that manages the moveable's state and props.
   * @method Moveable#getManager
   * @return - The Rect Info
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * const manager = moveable.getManager(); // real moveable class instance
   */


  __proto.getManager = function () {
    return this;
  };

  __proto.getRotation = function () {
    var _a = this.state,
        pos1 = _a.pos1,
        pos2 = _a.pos2,
        direction = _a.direction;
    return getAbsoluteRotation(pos1, pos2, direction);
  };
  /**
   * Request able through a method rather than an event.
   * At the moment of execution, requestStart is executed,
   * and then request and requestEnd can be executed through Requester.
   * @method Moveable#request
   * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Draggable.html#request|Draggable Requester}
   * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Resizable.html#request|Resizable Requester}
   * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Scalable.html#request|Scalable Requester}
   * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Rotatable.html#request|Rotatable Requester}
   * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.OriginDraggable.html#request|OriginDraggable Requester}
   * @param - ableName
   * @param - request to be able params.
   * @param - If isInstant is true, request and requestEnd are executed immediately.
   * @return - Able Requester. If there is no request in able, nothing will work.
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * // Instantly Request (requestStart - request - requestEnd)
   * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
   *
   * // Start move
   * const requester = moveable.request("draggable");
   * requester.request({ deltaX: 10, deltaY: 10 });
   * requester.request({ deltaX: 10, deltaY: 10 });
   * requester.request({ deltaX: 10, deltaY: 10 });
   * requester.requestEnd();
   */


  __proto.request = function (ableName, param, isInstant) {
    var _this = this;

    if (param === void 0) {
      param = {};
    }

    var _a = this.props,
        ables = _a.ables,
        groupable = _a.groupable;
    var requsetAble = ables.filter(function (able) {
      return able.name === ableName;
    })[0];

    if (this.isDragging() || !requsetAble || !requsetAble.request) {
      return {
        request: function () {
          return this;
        },
        requestEnd: function () {
          return this;
        }
      };
    }

    var self = this;
    var ableRequester = requsetAble.request(this);
    var requestInstant = isInstant || param.isInstant;
    var ableType = ableRequester.isControl ? "controlAbles" : "targetAbles";
    var eventAffix = "" + (groupable ? "Group" : "") + (ableRequester.isControl ? "Control" : "");
    var requester = {
      request: function (ableParam) {
        triggerAble(self, ableType, "drag", eventAffix, "", __assign(__assign({}, ableRequester.request(ableParam)), {
          requestAble: ableName,
          isRequest: true
        }), requestInstant, _this.props.iframeSelector);
        return requester;
      },
      requestEnd: function () {
        triggerAble(self, ableType, "drag", eventAffix, "End", __assign(__assign({}, ableRequester.requestEnd()), {
          requestAble: ableName,
          isRequest: true
        }), requestInstant, _this.props.iframeSelector);
        return requester;
      }
    };
    triggerAble(self, ableType, "drag", eventAffix, "Start", __assign(__assign({}, ableRequester.requestStart(param)), {
      requestAble: ableName,
      isRequest: true
    }), requestInstant, this.props.iframeSelector);
    return requestInstant ? requester.request(param).requestEnd() : requester;
  };
  /**
   * Remove the Moveable object and the events.
   * @method Moveable#destroy
   * @example
   * import Moveable from "moveable";
   *
   * const moveable = new Moveable(document.body);
   *
   * moveable.destroy();
   */


  __proto.destroy = function () {
    this.componentWillUnmount();
  };

  __proto.updateRenderPoses = function () {
    var state = this.state;
    var props = this.props;
    var originalBeforeOrigin = state.originalBeforeOrigin,
        transformOrigin = state.transformOrigin,
        allMatrix = state.allMatrix,
        is3d = state.is3d,
        pos1 = state.pos1,
        pos2 = state.pos2,
        pos3 = state.pos3,
        pos4 = state.pos4,
        stateLeft = state.left,
        stateTop = state.top;

    var _a = props.padding || {},
        _b = _a.left,
        left = _b === void 0 ? 0 : _b,
        _c = _a.top,
        top = _c === void 0 ? 0 : _c,
        _d = _a.bottom,
        bottom = _d === void 0 ? 0 : _d,
        _e = _a.right,
        right = _e === void 0 ? 0 : _e;

    var n = is3d ? 4 : 3;
    var absoluteOrigin = props.groupable ? originalBeforeOrigin : plus(originalBeforeOrigin, [stateLeft, stateTop]);
    state.renderPoses = [plus(pos1, calculatePadding(allMatrix, [-left, -top], transformOrigin, absoluteOrigin, n)), plus(pos2, calculatePadding(allMatrix, [right, -top], transformOrigin, absoluteOrigin, n)), plus(pos3, calculatePadding(allMatrix, [-left, bottom], transformOrigin, absoluteOrigin, n)), plus(pos4, calculatePadding(allMatrix, [right, bottom], transformOrigin, absoluteOrigin, n))];
  };

  __proto.checkUpdate = function () {
    var _a = this.props,
        target = _a.target,
        container = _a.container,
        parentMoveable = _a.parentMoveable;
    var _b = this.state,
        stateTarget = _b.target,
        stateContainer = _b.container;

    if (!stateTarget && !target) {
      return;
    }

    this.updateAbles();
    var isChanged = !equals(stateTarget, target) || !equals(stateContainer, container);

    if (!isChanged) {
      return;
    }

    this.updateState({
      target: target,
      container: container
    });

    if (!parentMoveable && (container || this.controlBox)) {
      this.updateRect("End", false, false);
    }
  };

  __proto.triggerEvent = function (name, e) {
    var callback = this.props[name];
    return callback && callback(e);
  };

  __proto.useCSS = function (tag, css) {
    var customStyleMap = this.props.customStyledMap;
    var key = tag + css;

    if (!customStyleMap[key]) {
      customStyleMap[key] = styled(tag, css, this.props.iframeSelector);
    }

    return customStyleMap[key];
  };

  __proto.unsetAbles = function () {
    var _this = this;

    if (this.targetAbles.filter(function (able) {
      if (able.unset) {
        able.unset(_this);
        return true;
      }

      return false;
    }).length) {
      this.forceUpdate();
    }
  };

  __proto.updateAbles = function (ables, eventAffix) {
    if (ables === void 0) {
      ables = this.props.ables;
    }

    if (eventAffix === void 0) {
      eventAffix = "";
    }

    var props = this.props;
    var triggerAblesSimultaneously = props.triggerAblesSimultaneously;
    var enabledAbles = ables.filter(function (able) {
      return able && (able.always || props[able.name]);
    });
    var dragStart = "drag" + eventAffix + "Start";
    var pinchStart = "pinch" + eventAffix + "Start";
    var dragControlStart = "drag" + eventAffix + "ControlStart";
    var targetAbles = filterAbles(enabledAbles, [dragStart, pinchStart], triggerAblesSimultaneously);
    var controlAbles = filterAbles(enabledAbles, [dragControlStart], triggerAblesSimultaneously);
    this.enabledAbles = enabledAbles;
    this.targetAbles = targetAbles;
    this.controlAbles = controlAbles;
  };

  __proto.updateState = function (nextState, isSetState) {
    if (isSetState) {
      this.setState(nextState);
    } else {
      var state = this.state;

      for (var name in nextState) {
        state[name] = nextState[name];
      }
    }
  };

  __proto.getEnabledAbles = function () {
    var props = this.props;
    var ables = props.ables;
    return ables.filter(function (able) {
      return able && props[able.name];
    });
  };

  __proto.renderAbles = function () {
    var _this = this;

    var props = this.props;
    var triggerAblesSimultaneously = props.triggerAblesSimultaneously;
    var Renderer = {
      createElement: createElement
    };
    return groupByMap(flat(filterAbles(this.getEnabledAbles(), ["render"], triggerAblesSimultaneously).map(function (_a) {
      var render = _a.render;
      return render(_this, Renderer) || [];
    })).filter(function (el) {
      return el;
    }), function (_a) {
      var key = _a.key;
      return key;
    }).map(function (group) {
      return group[0];
    });
  };

  __proto.updateCheckInput = function () {
    this.targetGesto && (this.targetGesto.options.checkInput = this.props.checkInput);
  };

  MoveableManager.defaultProps = {
    target: null,
    dragTarget: null,
    container: null,
    rootContainer: null,
    origin: true,
    edge: false,
    parentMoveable: null,
    wrapperMoveable: null,
    parentPosition: null,
    portalContainer: null,
    ables: [],
    pinchThreshold: 20,
    dragArea: false,
    passDragArea: false,
    transformOrigin: "",
    className: "",
    zoom: 1,
    iframeSelector: "",
    triggerAblesSimultaneously: false,
    padding: {},
    pinchOutside: true,
    checkInput: false,
    groupable: false,
    cspNonce: "",
    translateZ: 0,
    cssStyled: null,
    customStyledMap: {},
    props: {}
  };
  return MoveableManager;
}(PureComponent);
/**
 * The target to indicate Moveable Control Box.
 * @name Moveable#target
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 * moveable.target = document.querySelector(".target");
 */

/**
 * Zooms in the elements of a moveable. (default: 1)
 * @name Moveable#zoom
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 * moveable.zoom = 2;
 */

/**
 * Resize, Scale Events at edges
 * @name Moveable#edge
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 * moveable.edge = true;
 */

/**
 * You can specify the className of the moveable controlbox. (default: "")
 * @name Moveable#className
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *   className: "",
 * });
 *
 * moveable.className = "moveable1";
 */

/**
 * The target(s) to drag Moveable target(s) (default: target)
 * @name Moveable#dragTarget
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body);
 * moveable.target = document.querySelector(".target");
 * moveable.dragTarget = document.querySelector(".dragTarget");
 */

/**
 * `renderStart` event occurs at the first start of all events.
 * @memberof Moveable
 * @event renderStart
 * @param {Moveable.OnRenderStart} - Parameters for the `renderStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: document.querySelector(".target"),
 * });
 * moveable.on("renderStart", ({ target }) => {
 *     console.log("onRenderStart", target);
 * });
 */

/**
 * `render` event occurs before the target is drawn on the screen.
 * @memberof Moveable
 * @event render
 * @param {Moveable.OnRender} - Parameters for the `render` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: document.querySelector(".target"),
 * });
 * moveable.on("render", ({ target }) => {
 *     console.log("onRender", target);
 * });
 */

/**
 * `renderEnd` event occurs at the end of all events.
 * @memberof Moveable
 * @event renderEnd
 * @param {Moveable.OnRenderEnd} - Parameters for the `renderEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: document.querySelector(".target"),
 * });
 * moveable.on("renderEnd", ({ target }) => {
 *     console.log("onRenderEnd", target);
 * });
 */

/**
 * `renderGroupStart` event occurs at the first start of all events in group.
 * @memberof Moveable
 * @event renderGroupStart
 * @param {Moveable.OnRenderGroupStart} - Parameters for the `renderGroupStart` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 * });
 * moveable.on("renderGroupStart", ({ targets }) => {
 *     console.log("onRenderGroupStart", targets);
 * });
 */

/**
 * `renderGroup` event occurs before the target is drawn on the screen in group.
 * @memberof Moveable
 * @event renderGroup
 * @param {Moveable.OnRenderGroup} - Parameters for the `renderGroup` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 * });
 * moveable.on("renderGroup", ({ targets }) => {
 *     console.log("onRenderGroup", targets);
 * });
 */

/**
 * `renderGroupEnd` event occurs at the end of all events in group.
 * @memberof Moveable
 * @event renderGroupEnd
 * @param {Moveable.OnRenderGroupEnd} - Parameters for the `renderGroupEnd` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 * });
 * moveable.on("renderGroupEnd", ({ targets }) => {
 *     console.log("onRenderGroupEnd", targets);
 * });
 */

var Groupable = {
  name: "groupable",
  props: {
    defaultGroupRotate: Number,
    defaultGroupOrigin: String,
    groupable: Boolean
  },
  events: {},
  render: function (moveable, React) {
    var targets = moveable.props.targets || [];
    moveable.moveables = [];
    var _a = moveable.state,
        left = _a.left,
        top = _a.top;
    var position = {
      left: left,
      top: top
    };
    return targets.map(function (target, i) {
      return React.createElement(MoveableManager, {
        key: "moveable" + i,
        ref: refs(moveable, "moveables", i),
        target: target,
        origin: false,
        cssStyled: moveable.props.cssStyled,
        customStyledMap: moveable.props.customStyledMap,
        parentMoveable: moveable,
        parentPosition: position
      });
    });
  }
};

var Clickable = {
  name: "clickable",
  props: {},
  events: {
    onClick: "click",
    onClickGroup: "clickGroup"
  },
  always: true,
  dragStart: function () {},
  dragGroupStart: function (moveable, e) {
    e.datas.inputTarget = e.inputEvent && e.inputEvent.target;
  },
  dragEnd: function (moveable, e) {
    var target = moveable.state.target;
    var inputEvent = e.inputEvent;
    var inputTarget = e.inputTarget;

    if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) // External event duplicate target or dragAreaElement
    ) {
      return;
    }

    var containsTarget = target.contains(inputTarget);
    triggerEvent(moveable, "onClick", fillParams(moveable, e, {
      isDouble: e.isDouble,
      inputTarget: inputTarget,
      isTarget: target === inputTarget,
      containsTarget: containsTarget
    }));
  },
  dragGroupEnd: function (moveable, e) {
    var inputEvent = e.inputEvent;
    var inputTarget = e.inputTarget;

    if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) // External event duplicate target or dragAreaElement
    || e.datas.inputTarget === inputTarget) {
      return;
    }

    var targets = moveable.props.targets;
    var targetIndex = targets.indexOf(inputTarget);
    var isTarget = targetIndex > -1;
    var containsTarget = false;

    if (targetIndex === -1) {
      targetIndex = findIndex(targets, function (parentTarget) {
        return parentTarget.contains(inputTarget);
      });
      containsTarget = targetIndex > -1;
    }

    triggerEvent(moveable, "onClickGroup", fillParams(moveable, e, {
      isDouble: e.isDouble,
      targets: targets,
      inputTarget: inputTarget,
      targetIndex: targetIndex,
      isTarget: isTarget,
      containsTarget: containsTarget
    }));
  }
};
/**
 * When you click on the element, the `click` event is called.
 * @memberof Moveable
 * @event click
 * @param {Moveable.OnClick} - Parameters for the `click` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: document.querySelector(".target"),
 * });
 * moveable.on("click", ({ hasTarget, containsTarget, targetIndex }) => {
 *     // If you click on an element other than the target and not included in the target, index is -1.
 *     console.log("onClickGroup", target, hasTarget, containsTarget, targetIndex);
 * });
 */

/**
 * When you click on the element inside the group, the `clickGroup` event is called.
 * @memberof Moveable
 * @event clickGroup
 * @param {Moveable.OnClickGroup} - Parameters for the `clickGroup` event
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *     target: [].slice.call(document.querySelectorAll(".target")),
 * });
 * moveable.on("clickGroup", ({ inputTarget, isTarget, containsTarget, targetIndex }) => {
 *     // If you click on an element other than the target and not included in the target, index is -1.
 *     console.log("onClickGroup", inputTarget, isTarget, containsTarget, targetIndex);
 * });
 */

function getDraggableEvent(e) {
  var datas = e.originalDatas.draggable;

  if (!datas) {
    e.originalDatas.draggable = {};
    datas = e.originalDatas.draggable;
  }

  return __assign(__assign({}, e), {
    datas: datas
  });
}

var edgeDraggable = {
  name: "edgeDraggable",
  props: {
    edgeDraggable: Boolean
  },
  events: {},
  dragControlCondition: function (e, moveable) {
    if (!moveable.props.edgeDraggable || !e.inputEvent) {
      return false;
    }

    var target = e.inputEvent.target;
    return hasClass(target, prefix("direction")) && hasClass(target, prefix("line"));
  },
  dragControlStart: function (moveable, e) {
    return Draggable.dragStart(moveable, getDraggableEvent(e));
  },
  dragControl: function (moveable, e) {
    return Draggable.drag(moveable, getDraggableEvent(e));
  },
  dragControlEnd: function (moveable, e) {
    return Draggable.dragEnd(moveable, getDraggableEvent(e));
  },
  dragGroupControlCondition: function (e, moveable) {
    if (!moveable.props.edgeDraggable || !e.inputEvent) {
      return false;
    }

    var target = e.inputEvent.target;
    return hasClass(target, prefix("direction")) && hasClass(target, prefix("line"));
  },
  dragGroupControlStart: function (moveable, e) {
    return Draggable.dragGroupStart(moveable, getDraggableEvent(e));
  },
  dragGroupControl: function (moveable, e) {
    return Draggable.dragGroup(moveable, getDraggableEvent(e));
  },
  dragGroupControlEnd: function (moveable, e) {
    return Draggable.dragGroupEnd(moveable, getDraggableEvent(e));
  },
  unset: function (moveable) {
    moveable.state.dragInfo = null;
  }
};
/**
 * Whether to move by dragging the edge line (default: false)
 * @name Moveable.Draggable#edgeDraggable
 * @example
 * import Moveable from "moveable";
 *
 * const moveable = new Moveable(document.body, {
 *  draggable: true,
 *  edgeDraggable: false,
 * });
 *
 * moveable.edgeDraggable = true;
 */

var IndividualGroupable = {
  name: "individualGroupable",
  props: {
    individualGroupable: Boolean
  },
  events: {}
};

var MOVEABLE_ABLES = /*#__PURE__*/[BeforeRenderable, Default, Snappable, Pinchable, Draggable, edgeDraggable, Rotatable, Resizable, Scalable, Warpable, Scrollable, Padding, Origin, OriginDraggable, Clippable, Roundable, Groupable, IndividualGroupable, Clickable, DragArea, Renderable];
var MOVEABLE_EVENTS_PROPS_MAP = /*#__PURE__*/MOVEABLE_ABLES.reduce(function (current, able) {
  return __assign(__assign({}, current), able.events);
}, {});
var MOVEABLE_PROPS_MAP = /*#__PURE__*/MOVEABLE_ABLES.reduce(function (current, able) {
  return __assign(__assign({}, current), able.props);
}, {});
var MOVEABLE_EVENTS_MAP = /*#__PURE__*/invertObject(MOVEABLE_EVENTS_PROPS_MAP);
var MOVEABLE_EVENTS = Object.keys(MOVEABLE_EVENTS_MAP);
var MOVEABLE_PROPS = Object.keys(MOVEABLE_PROPS_MAP);

function getMaxPos(poses, index) {
  return Math.max.apply(Math, poses.map(function (_a) {
    var pos1 = _a[0],
        pos2 = _a[1],
        pos3 = _a[2],
        pos4 = _a[3];
    return Math.max(pos1[index], pos2[index], pos3[index], pos4[index]);
  }));
}

function getMinPos(poses, index) {
  return Math.min.apply(Math, poses.map(function (_a) {
    var pos1 = _a[0],
        pos2 = _a[1],
        pos3 = _a[2],
        pos4 = _a[3];
    return Math.min(pos1[index], pos2[index], pos3[index], pos4[index]);
  }));
}

function getGroupRect(moveables, rotation) {
  if (!moveables.length) {
    return [0, 0, 0, 0];
  }

  var moveablePoses = moveables.map(function (_a) {
    var state = _a.state;
    return getAbsolutePosesByState(state);
  });
  var minX = MAX_NUM;
  var minY = MAX_NUM;
  var groupWidth = 0;
  var groupHeight = 0;
  var fixedRotation = throttle(rotation, TINY_NUM);

  if (fixedRotation % 90) {
    var rad_1 = fixedRotation / 180 * Math.PI;
    var a1_1 = Math.tan(rad_1);
    var a2_1 = -1 / a1_1;
    var b1MinMax_1 = [MIN_NUM, MAX_NUM];
    var b2MinMax_1 = [MIN_NUM, MAX_NUM];
    moveablePoses.forEach(function (poses) {
      poses.forEach(function (pos) {
        // ax + b = y
        // b = y - ax
        var b1 = pos[1] - a1_1 * pos[0];
        var b2 = pos[1] - a2_1 * pos[0];
        b1MinMax_1[0] = Math.max(b1MinMax_1[0], b1);
        b1MinMax_1[1] = Math.min(b1MinMax_1[1], b1);
        b2MinMax_1[0] = Math.max(b2MinMax_1[0], b2);
        b2MinMax_1[1] = Math.min(b2MinMax_1[1], b2);
      });
    });
    b1MinMax_1.forEach(function (b1) {
      // a1x + b1 = a2x + b2
      b2MinMax_1.forEach(function (b2) {
        // (a1 - a2)x = b2 - b1
        var x = (b2 - b1) / (a1_1 - a2_1);
        var y = a1_1 * x + b1;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
      });
    });
    var rotatePoses = moveablePoses.map(function (_a) {
      var pos1 = _a[0],
          pos2 = _a[1],
          pos3 = _a[2],
          pos4 = _a[3];
      return [rotate(pos1, -rad_1), rotate(pos2, -rad_1), rotate(pos3, -rad_1), rotate(pos4, -rad_1)];
    });
    groupWidth = getMaxPos(rotatePoses, 0) - getMinPos(rotatePoses, 0);
    groupHeight = getMaxPos(rotatePoses, 1) - getMinPos(rotatePoses, 1);
  } else {
    minX = getMinPos(moveablePoses, 0);
    minY = getMinPos(moveablePoses, 1);
    groupWidth = getMaxPos(moveablePoses, 0) - minX;
    groupHeight = getMaxPos(moveablePoses, 1) - minY;

    if (fixedRotation % 180) {
      var changedWidth = groupWidth;
      groupWidth = groupHeight;
      groupHeight = changedWidth;
    }
  }

  return [minX, minY, groupWidth, groupHeight];
}
/**
 * @namespace Moveable.Group
 * @description You can make targets moveable.
 */


var MoveableGroup = function (_super) {
  __extends(MoveableGroup, _super);

  function MoveableGroup() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.differ = new ChildrenDiffer();
    _this.moveables = [];
    _this.transformOrigin = "50% 50%";
    return _this;
  }

  var __proto = MoveableGroup.prototype;

  __proto.updateEvent = function (prevProps) {
    var state = this.state;
    var props = this.props;
    var prevTarget = prevProps.dragTarget || state.target;
    var nextTarget = props.dragTarget || this.areaElement;

    if (prevTarget !== nextTarget) {
      unset(this, "targetGesto");
      unset(this, "controlGesto");
      state.target = null;
    }

    if (!state.target) {
      state.target = this.areaElement;
      this.controlBox.getElement().style.display = "block";
      this.targetGesto = getTargetAbleGesto(this, nextTarget, "Group");
      this.controlGesto = getAbleGesto(this, this.controlBox.getElement(), "controlAbles", "GroupControl", {}, this.props.iframeSelector);
    }

    var isContainerChanged = !equals(prevProps.container, props.container);

    if (isContainerChanged) {
      state.container = props.container;
    }

    var _a = this.differ.update(props.targets),
        added = _a.added,
        changed = _a.changed,
        removed = _a.removed;

    if (isContainerChanged || added.length || changed.length || removed.length) {
      this.updateRect();
    }
  };

  __proto.checkUpdate = function () {
    this.updateAbles();
  };

  __proto.updateRect = function (type, isTarget, isSetState) {
    if (isSetState === void 0) {
      isSetState = true;
    }

    if (!this.controlBox) {
      return;
    }

    this.moveables.forEach(function (moveable) {
      moveable.updateRect(type, false, false);
    });
    var state = this.state;
    var props = this.props;
    var target = state.target || props.target;

    if (!isTarget || type !== "" && props.updateGroup) {
      // reset rotataion
      this.rotation = props.defaultGroupRotate;
      this.transformOrigin = props.defaultGroupOrigin || "50% 50%";
      this.scale = [1, 1];
    }

    var rotation = this.rotation;
    var scale = this.scale;

    var _a = getGroupRect(this.moveables, rotation),
        left = _a[0],
        top = _a[1],
        width = _a[2],
        height = _a[3]; // tslint:disable-next-line: max-line-length


    var transform = "rotate(" + rotation + "deg) scale(" + (scale[0] >= 0 ? 1 : -1) + ", " + (scale[1] >= 0 ? 1 : -1) + ")";
    target.style.cssText += "left:0px;top:0px; transform-origin: " + this.transformOrigin + "; width:" + width + "px; height:" + height + "px;" + ("transform:" + transform);
    state.width = width;
    state.height = height;
    var container = this.getContainer();
    var info = getTargetInfo(this.props.iframeSelector, this.controlBox.getElement(), target, this.controlBox.getElement(), this.getContainer(), this.props.rootContainer || container // state,
    );
    var pos = [info.left, info.top];

    var _b = getAbsolutePosesByState(info),
        pos1 = _b[0],
        pos2 = _b[1],
        pos3 = _b[2],
        pos4 = _b[3]; // info.left + info.pos(1 ~ 4)


    var minPos = getMinMaxs([pos1, pos2, pos3, pos4]);
    var delta = [minPos.minX, minPos.minY];
    info.pos1 = minus(pos1, delta);
    info.pos2 = minus(pos2, delta);
    info.pos3 = minus(pos3, delta);
    info.pos4 = minus(pos4, delta);
    info.left = left - info.left + delta[0];
    info.top = top - info.top + delta[1];
    info.origin = minus(plus(pos, info.origin), delta);
    info.beforeOrigin = minus(plus(pos, info.beforeOrigin), delta);
    info.originalBeforeOrigin = plus(pos, info.originalBeforeOrigin); // info.transformOrigin = minus(plus(pos, info.transformOrigin!), delta);

    var clientRect = info.targetClientRect;
    var direction = scale[0] * scale[1] > 0 ? 1 : -1;
    clientRect.top += info.top - state.top;
    clientRect.left += info.left - state.left;
    target.style.transform = "translate(" + -delta[0] + "px, " + -delta[1] + "px) " + transform;
    this.updateState(__assign(__assign({}, info), {
      direction: direction,
      beforeDirection: direction
    }), isSetState);
  };

  __proto.getRect = function () {
    return __assign(__assign({}, _super.prototype.getRect.call(this)), {
      children: this.moveables.map(function (child) {
        return child.getRect();
      })
    });
  };

  __proto.triggerEvent = function (name, e, isManager) {
    if (isManager || name.indexOf("Group") > -1) {
      return _super.prototype.triggerEvent.call(this, name, e);
    }
  };

  __proto.updateAbles = function () {
    _super.prototype.updateAbles.call(this, __spreadArrays(this.props.ables, [Groupable]), "Group");
  };

  MoveableGroup.defaultProps = __assign(__assign({}, MoveableManager.defaultProps), {
    transformOrigin: ["50%", "50%"],
    groupable: true,
    dragArea: true,
    keepRatio: true,
    targets: [],
    defaultGroupRotate: 0,
    defaultGroupOrigin: "50% 50%"
  });
  return MoveableGroup;
}(MoveableManager);

/**
 * @namespace Moveable.IndividualGroup
 * @description Create targets individually, not as a group.Create targets individually, not as a group.
 */

var MoveableIndividualGroup = function (_super) {
  __extends(MoveableIndividualGroup, _super);

  function MoveableIndividualGroup() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.moveables = [];
    return _this;
  }

  var __proto = MoveableIndividualGroup.prototype;

  __proto.render = function () {
    var _this = this;

    var _a = this.props,
        cspNonce = _a.cspNonce,
        ControlBoxElement = _a.cssStyled,
        targets = _a.targets;
    return createElement(ControlBoxElement, {
      cspNonce: cspNonce,
      ref: ref(this, "controlBox"),
      className: prefix("control-box")
    }, targets.map(function (target, i) {
      return createElement(MoveableManager, __assign({
        key: "moveable" + i,
        ref: refs(_this, "moveables", i)
      }, _this.props, {
        target: target,
        wrapperMoveable: _this
      }));
    }));
  };

  __proto.componentDidUpdate = function () {};

  __proto.updateRect = function (type, isTarget, isSetState) {
    if (isSetState === void 0) {
      isSetState = true;
    }

    this.moveables.forEach(function (moveable) {
      moveable.updateRect(type, isTarget, isSetState);
    });
  };

  __proto.getRect = function () {
    return __assign(__assign({}, _super.prototype.getRect.call(this)), {
      children: this.moveables.map(function (child) {
        return child.getRect();
      })
    });
  };

  __proto.request = function () {
    return {
      request: function () {
        return this;
      },
      requestEnd: function () {
        return this;
      }
    };
  };

  __proto.dragStart = function () {
    return this;
  };

  __proto.hitTest = function () {
    return 0;
  };

  __proto.isInside = function () {
    return false;
  };

  __proto.isDragging = function () {
    return false;
  };

  __proto.updateRenderPoses = function () {};

  __proto.updateEvent = function () {};

  __proto.checkUpdate = function () {};

  __proto.triggerEvent = function () {};

  __proto.updateAbles = function () {};

  return MoveableIndividualGroup;
}(MoveableManager);

var InitialMoveable = function (_super) {
  __extends(InitialMoveable, _super);

  function InitialMoveable() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.refTargets = [];
    _this.selectorMap = {};
    return _this;
  }

  var __proto = InitialMoveable.prototype;

  InitialMoveable.makeStyled = function (iframeSelector) {
    var cssMap = {};
    var ables = this.getTotalAbles();
    ables.forEach(function (_a) {
      var css = _a.css;

      if (!css) {
        return;
      }

      css.forEach(function (text) {
        cssMap[text] = true;
      });
    });
    var style = getKeys(cssMap).join("\n");
    this.defaultStyled[iframeSelector] = styled("div", prefixCSS(PREFIX, MOVEABLE_CSS + style), iframeSelector);
  };

  InitialMoveable.getTotalAbles = function () {
    return __spreadArrays([Default, Groupable, IndividualGroupable, DragArea], this.defaultAbles);
  };

  __proto.render = function () {
    var moveableContructor = this.constructor;

    if (!moveableContructor.defaultStyled[this.props.iframeSelector]) {
      moveableContructor.makeStyled(this.props.iframeSelector);
    }

    var _a = this.props,
        userAbles = _a.ables,
        userProps = _a.props,
        props = __rest(_a, ["ables", "props"]);

    var refTargets = getRefTargets(props.target || props.targets, this.props.iframeSelector);
    var elementTargets = getElementTargets(refTargets, this.selectorMap);
    this.refTargets = refTargets;
    var isGroup = elementTargets.length > 1;
    var totalAbles = moveableContructor.getTotalAbles();

    var ables = __spreadArrays(totalAbles, userAbles || []);

    var nextProps = __assign(__assign(__assign({}, props), userProps || {}), {
      ables: ables,
      cssStyled: moveableContructor.defaultStyled[this.props.iframeSelector],
      customStyledMap: moveableContructor.customStyledMap
    });

    if (isGroup) {
      if (props.individualGroupable) {
        return createElement(MoveableIndividualGroup, __assign({
          key: "individual-group",
          ref: ref(this, "moveable")
        }, nextProps, {
          target: null,
          targets: elementTargets
        }));
      }

      return createElement(MoveableGroup, __assign({
        key: "group",
        ref: ref(this, "moveable")
      }, nextProps, {
        target: null,
        targets: elementTargets
      }));
    } else {
      return createElement(MoveableManager, __assign({
        key: "single",
        ref: ref(this, "moveable")
      }, nextProps, {
        target: elementTargets[0]
      }));
    }
  };

  __proto.componentDidMount = function () {
    this.updateRefs();
  };

  __proto.componentDidUpdate = function () {
    this.updateRefs();
  };

  __proto.updateRefs = function (isReset) {
    var refTargets = getRefTargets(this.props.target || this.props.targets, this.props.iframeSelector);
    var isUpdate = this.refTargets.some(function (target, i) {
      var nextTarget = refTargets[i];

      if (!target && !nextTarget) {
        return false;
      } else if (target !== nextTarget) {
        return true;
      }

      return false;
    });
    var selectorMap = isReset ? {} : this.selectorMap;
    var nextSelectorMap = {};
    var iframe = this.props.iframeSelector ? document.querySelector(this.props.iframeSelector) : null;
    var contentDocument = iframe ? iframe.contentDocument : document;
    this.refTargets.forEach(function (target) {
      if (isString(target)) {
        if (!selectorMap[target]) {
          isUpdate = true;
          nextSelectorMap[target] = [].slice.call(contentDocument.querySelectorAll(target));
        } else {
          nextSelectorMap[target] = selectorMap[target];
        }
      }
    });
    this.selectorMap = nextSelectorMap;

    if (isUpdate) {
      this.forceUpdate();
    }
  };

  __proto.getManager = function () {
    return this.moveable;
  };

  InitialMoveable.defaultAbles = [];
  InitialMoveable.customStyledMap = {};
  InitialMoveable.defaultStyled = {};

  __decorate([withMethods(MOVEABLE_METHODS)], InitialMoveable.prototype, "moveable", void 0);

  return InitialMoveable;
}(PureComponent);

var Moveable = function (_super) {
  __extends(Moveable, _super);

  function Moveable() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Moveable.defaultAbles = MOVEABLE_ABLES;
  return Moveable;
}(InitialMoveable);

function makeMoveable(ables) {
  var _a;

  return _a = function (_super) {
    __extends(Moveable, _super);

    function Moveable() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    return Moveable;
  }(InitialMoveable), _a.defaultAbles = ables, _a;
}

export default Moveable;
export { Clippable, Draggable, edgeDraggable as EdgeDraggable, InitialMoveable, MOVEABLE_ABLES, MOVEABLE_EVENTS, MOVEABLE_EVENTS_MAP, MOVEABLE_EVENTS_PROPS_MAP, MOVEABLE_METHODS, MOVEABLE_PROPS, MOVEABLE_PROPS_MAP, Pinchable, Resizable, Rotatable, Roundable, Scalable, Snappable, Warpable, getElementInfo, makeMoveable };
//# sourceMappingURL=moveable.esm.js.map
