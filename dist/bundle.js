/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index */ \"./src/lib/index.ts\");\n\nconst {\n  render\n} = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact;\n/** @jsx Didact.createElement */\nconst element = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"div\", {\n  id: \"foo\"\n}, _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"a\", null, \"bar\"), _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"b\", null));\nconsole.log(element);\nconst container = document.getElementById(\"root\");\nrender(element, container);\n\n//# sourceURL=webpack://write/./src/index.tsx?");

/***/ }),

/***/ "./src/lib/createElement.ts":
/*!**********************************!*\
  !*** ./src/lib/createElement.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"createTextElement\": () => (/* binding */ createTextElement)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/lib/types.ts\");\n\nconst createTextElement = text => {\n  return {\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: null\n    }\n  };\n};\nconst createElement = (type, props, ...children) => {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child => typeof child === \"object\" ? child : createTextElement(child))\n    }\n  };\n};\n\n//# sourceURL=webpack://write/./src/lib/createElement.ts?");

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Didact\": () => (/* binding */ Didact)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/lib/createElement.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/lib/render.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/lib/types.ts\");\n\n\n\n// requestIdleCallback(workLoop);\n\nconst Didact = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  createTextElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createTextElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_1__.render\n};\n\n//# sourceURL=webpack://write/./src/lib/index.ts?");

/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDom\": () => (/* binding */ createDom),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _wookLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wookLoop */ \"./src/lib/wookLoop.ts\");\n\n\n// 这个地方ts里面的dom类型还不是很清楚。\nconst createDom = fiber => {\n  const dom = fiber.type === \"TEXT_ELEMENT\" ? document.createTextNode(fiber.props.nodeValue.toString()) : document.createElement(fiber.type);\n  const isProperty = key => key !== \"children\";\n  Object.keys(fiber.props).filter(isProperty).forEach(name => {\n    // fix me\n    dom[name] = fiber.props[name];\n  });\n  if (fiber.type === \"TEXT_ELEMENT\") {\n    dom.appendChild(dom);\n    return dom;\n  }\n  fiber.props.children.forEach(child => render(child, dom));\n  return dom;\n};\nconst render = (element, container) => {\n  _wookLoop__WEBPACK_IMPORTED_MODULE_0__.nextUnitOfWork.current = {\n    dom: container,\n    props: {\n      children: [element]\n    }\n  };\n};\n\n//# sourceURL=webpack://write/./src/lib/render.ts?");

/***/ }),

/***/ "./src/lib/types.ts":
/*!**************************!*\
  !*** ./src/lib/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://write/./src/lib/types.ts?");

/***/ }),

/***/ "./src/lib/wookLoop.ts":
/*!*****************************!*\
  !*** ./src/lib/wookLoop.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nextUnitOfWork\": () => (/* binding */ nextUnitOfWork),\n/* harmony export */   \"workLoop\": () => (/* binding */ workLoop)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/lib/render.ts\");\n\n// 存储当前需要处理的 unit\nlet nextUnitOfWork = {\n  current: null\n};\nfunction workLoop(deadline) {\n  let shouldYield = false;\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork.current = performUnitOfWork(nextUnitOfWork);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n  requestIdleCallback(workLoop);\n}\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = (0,_render__WEBPACK_IMPORTED_MODULE_0__.createDom)(fiber);\n  }\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom);\n  }\n}\n\n// while (nextUnitOfWork) {\n//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);\n// }\n// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。\n\n//# sourceURL=webpack://write/./src/lib/wookLoop.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.tsx");
/******/ 	
/******/ })()
;