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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index */ \"./src/lib/index.ts\");\n\nconst {\n  render\n} = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact;\n/** @jsx Didact.createElement */\nconst element = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"div\", {\n  id: \"foo\"\n}, _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"a\", null, \"bar\"), _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"b\", null, \"12312\"));\nconsole.log(element);\nconst container = document.getElementById(\"root\");\nrender(element, container);\n\n//# sourceURL=webpack://write/./src/index.tsx?");

/***/ }),

/***/ "./src/lib/createElement.ts":
/*!**********************************!*\
  !*** ./src/lib/createElement.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"createTextElement\": () => (/* binding */ createTextElement)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/lib/types.ts\");\n\nconst createTextElement = text => {\n  return {\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n};\nconst createElement = (type, props, ...children) => {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child => typeof child === \"object\" ? child : createTextElement(child))\n    }\n  };\n};\n\n//# sourceURL=webpack://write/./src/lib/createElement.ts?");

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Didact\": () => (/* binding */ Didact)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/lib/createElement.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/lib/render.ts\");\n/* harmony import */ var _wookLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wookLoop */ \"./src/lib/wookLoop.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ \"./src/lib/types.ts\");\n\n\n\n\nrequestIdleCallback(_wookLoop__WEBPACK_IMPORTED_MODULE_2__.workLoop);\nconst Didact = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  createTextElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createTextElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_1__.render\n};\n\n//# sourceURL=webpack://write/./src/lib/index.ts?");

/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDom\": () => (/* binding */ createDom),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workStore */ \"./src/lib/workStore.ts\");\n\n\n\n// 这个地方ts里面的dom类型还不是很清楚。\nconst createDom = fiber => {\n  const dom = fiber.type === \"TEXT_ELEMENT\" ? document.createTextNode(fiber.props.nodeValue.toString()) : document.createElement(fiber.type);\n  const isProperty = key => key !== \"children\";\n  Object.keys(fiber.props).filter(isProperty).forEach(name => {\n    // fix me\n    dom[name] = fiber.props[name];\n  });\n  return dom;\n};\nconst render = (element, container) => {\n  // render 只有在 在每一次re-render中只执行一次，在这一次中我们去绑定 alternate 这个属性。\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current = {\n    type: \"div\",\n    dom: container,\n    // 这里保存着 目前在 dom 上已经 commit 上去的 root，其中这个 alternate 的属性来自于 上次 commit 之后保存的 value。\n    alternate: _workStore__WEBPACK_IMPORTED_MODULE_0__.currentRoot.current,\n    props: {\n      children: [element]\n    }\n  };\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.nextUnitOfWork.current = _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current;\n};\n\n//# sourceURL=webpack://write/./src/lib/render.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"workLoop\": () => (/* binding */ workLoop)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/lib/render.ts\");\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workStore */ \"./src/lib/workStore.ts\");\n\n\nfunction workLoop(deadline) {\n  let shouldYield = false;\n  while (_workStore__WEBPACK_IMPORTED_MODULE_1__.nextUnitOfWork.current && !shouldYield) {\n    _workStore__WEBPACK_IMPORTED_MODULE_1__.nextUnitOfWork.current = performUnitOfWork(_workStore__WEBPACK_IMPORTED_MODULE_1__.nextUnitOfWork.current);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n  if (!_workStore__WEBPACK_IMPORTED_MODULE_1__.nextUnitOfWork.current && _workStore__WEBPACK_IMPORTED_MODULE_1__.WipRoot.current) {\n    commitRoot();\n  }\n  // 上面是 render 的过程，我们建立的 fiber tree 下面我会把 fiber tree commit 到 真实的 dom 上去\n  requestIdleCallback(workLoop);\n}\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = (0,_render__WEBPACK_IMPORTED_MODULE_0__.createDom)(fiber);\n  }\n  // if (fiber.parent) {\n  //   // 因为是一个深度优先遍历的过程，所以说如果遍历到子的时候，那么父亲一定被首先指定了dom\n  //   fiber.parent.dom!.appendChild(fiber.dom);\n  // }\n  // 关闭在 performUnitOfWork 阶段的 dom 操作。\n  const elements = fiber.props.children;\n  let index = 0;\n  let prevSibling;\n  // 这个时候说明 elements 是由长度的，不是TextFiber\n  while (index < elements.length) {\n    const element = elements[index];\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: undefined\n    };\n    if (index === 0) {\n      fiber.child = newFiber;\n    } else {\n      prevSibling.sibling = newFiber;\n    }\n    prevSibling = newFiber;\n    index++;\n  }\n  // 核心的递归的逻辑在这里，对于每一次 requestIdleCallback 在 performUnitOfWork 阶段会进行该 fiber 节点的修改，就是fiber节点创建出来，其中包含了创建他的所有子节点，并将子节点的 sibling 联系建立起来，以及parent属性建立起来。\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n  let nextFiber = fiber;\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n    nextFiber = nextFiber.parent;\n  }\n\n  // 当有子节点的时候，我们去把下一个 unitWork 设置为 sibling ，当没有子节点的时候，我们将其设置为他的parent。然后去便利该parent 的 sibling 然后再去parent 的 parent直到结束。\n}\n\n// while (nextUnitOfWork) {\n//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);\n// }\n// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。\n\nfunction commitRoot() {\n  // console.log(\"WipRoot.current\", WipRoot.current);\n  // console.log(\"nextUnitOfWork.current\", nextUnitOfWork.current);\n  commitWork(_workStore__WEBPACK_IMPORTED_MODULE_1__.WipRoot.current.child);\n  // 当 commit 阶段结束之后， 我们将目前构建的那个 fiber tree 交给 currentRoot 这个就很好理解了，就是两个 tree 了，再次 render 的时候还是在 WipRoot中调用。\n  _workStore__WEBPACK_IMPORTED_MODULE_1__.currentRoot.current = _workStore__WEBPACK_IMPORTED_MODULE_1__.WipRoot.current;\n  _workStore__WEBPACK_IMPORTED_MODULE_1__.WipRoot.current = undefined;\n  console.log(_workStore__WEBPACK_IMPORTED_MODULE_1__.currentRoot.current);\n}\n// 在执行完所有的 rerender 之后，我们会去进行 commit 工作，但是在这个阶段，我们还是同步的过程，该过程同样也是 dfs 的过程。\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n  const domParent = fiber.parent.dom;\n  domParent.appendChild(fiber.dom);\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\n//# sourceURL=webpack://write/./src/lib/wookLoop.ts?");

/***/ }),

/***/ "./src/lib/workStore.ts":
/*!******************************!*\
  !*** ./src/lib/workStore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WipRoot\": () => (/* binding */ WipRoot),\n/* harmony export */   \"currentRoot\": () => (/* binding */ currentRoot),\n/* harmony export */   \"nextUnitOfWork\": () => (/* binding */ nextUnitOfWork)\n/* harmony export */ });\n// 存储当前需要处理的 unit\nlet nextUnitOfWork = {\n  current: undefined\n};\nlet WipRoot = {\n  current: undefined\n};\nlet currentRoot = {\n  current: undefined\n};\n\n//# sourceURL=webpack://write/./src/lib/workStore.ts?");

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