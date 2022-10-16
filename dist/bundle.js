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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index */ \"./src/lib/index.ts\");\n\nconst {\n  render\n} = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact;\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(\"h1\", null, \"Hi \", props.name);\n}\nconst element = _lib_index__WEBPACK_IMPORTED_MODULE_0__.Didact.createElement(App, {\n  name: \"foo\"\n});\nconsole.log(\"element : \", element);\nconst container = document.getElementById(\"root\");\nrender(element, container);\n\n//# sourceURL=webpack://write/./src/index.tsx?");

/***/ }),

/***/ "./src/lib/commit/commitRoot.ts":
/*!**************************************!*\
  !*** ./src/lib/commit/commitRoot.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commitRoot\": () => (/* binding */ commitRoot)\n/* harmony export */ });\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../workStore */ \"./src/lib/workStore.ts\");\n/* harmony import */ var _commitWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commitWork */ \"./src/lib/commit/commitWork.ts\");\n\n\n\n// while (nextUnitOfWork) {\n//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);\n// }\n// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。\nfunction commitRoot() {\n  // 首先将 各个 deletions 执行了\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.deletions.current.forEach(_commitWork__WEBPACK_IMPORTED_MODULE_1__.commitWork);\n  (0,_commitWork__WEBPACK_IMPORTED_MODULE_1__.commitWork)(_workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current.child);\n  // 当 commit 阶段结束之后， 我们将目前构建的那个 fiber tree 交给 currentRoot 这个就很好理解了，就是两个 tree 了，再次 render 的时候还是在 WipRoot中调用。\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.currentRoot.current = _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current;\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current = undefined;\n}\n\n//# sourceURL=webpack://write/./src/lib/commit/commitRoot.ts?");

/***/ }),

/***/ "./src/lib/commit/commitWork.ts":
/*!**************************************!*\
  !*** ./src/lib/commit/commitWork.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commitWork\": () => (/* binding */ commitWork)\n/* harmony export */ });\n// 在执行完所有的 rerender 之后，我们会去进行 commit 工作，但是在这个阶段，我们还是同步的过程，该过程同样也是 dfs 的过程。\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n  let domParentFiber = fiber.parent;\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent;\n  }\n  const domParent = domParentFiber.dom;\n  handleEffectTags(fiber, domParent);\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\nfunction handleEffectTags(fiber, domParent) {\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === \"UPDATE\" && fiber.dom != null) {\n    updateDom(fiber.dom, fiber.alternate.props, fiber.props);\n  } else if (fiber.effectTag === \"DELETION\") {\n    commitDeletion(fiber, domParent);\n  }\n}\nconst isProperty = key => key !== \"children\";\nconst isNew = (prev, next) => key => prev[key] !== next[key];\nconst isGone = (prev, next) => key => !(key in next);\nconst isEvent = key => key.startsWith(\"on\");\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {\n    dom[name] = \"\";\n  });\n  // Set new or changed properties\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  });\n  // Add event listeners\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom);\n  } else {\n    commitDeletion(fiber.child, domParent);\n  }\n}\n\n//# sourceURL=webpack://write/./src/lib/commit/commitWork.ts?");

/***/ }),

/***/ "./src/lib/commit/index.ts":
/*!*********************************!*\
  !*** ./src/lib/commit/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commitRoot\": () => (/* reexport safe */ _commitRoot__WEBPACK_IMPORTED_MODULE_0__.commitRoot)\n/* harmony export */ });\n/* harmony import */ var _commitRoot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commitRoot */ \"./src/lib/commit/commitRoot.ts\");\n\n\n//# sourceURL=webpack://write/./src/lib/commit/index.ts?");

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Didact\": () => (/* binding */ Didact)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/lib/render/index.ts\");\n/* harmony import */ var _workLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workLoop */ \"./src/lib/workLoop/index.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/lib/types.ts\");\n\n\n\nrequestIdleCallback(_workLoop__WEBPACK_IMPORTED_MODULE_1__.workLoop);\nconst Didact = {\n  createElement: _render__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_0__.render\n};\n\n//# sourceURL=webpack://write/./src/lib/index.ts?");

/***/ }),

/***/ "./src/lib/render/createElement.ts":
/*!*****************************************!*\
  !*** ./src/lib/render/createElement.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"createTextElement\": () => (/* binding */ createTextElement)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"./src/lib/types.ts\");\n\nconst createTextElement = text => {\n  return {\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n};\nconst createElement = (type, props, ...children) => {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child => typeof child === \"object\" ? child : createTextElement(child))\n    }\n  };\n};\n\n//# sourceURL=webpack://write/./src/lib/render/createElement.ts?");

/***/ }),

/***/ "./src/lib/render/index.ts":
/*!*********************************!*\
  !*** ./src/lib/render/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* reexport safe */ _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement),\n/* harmony export */   \"performUnitOfWork\": () => (/* reexport safe */ _performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__.performUnitOfWork),\n/* harmony export */   \"render\": () => (/* reexport safe */ _render__WEBPACK_IMPORTED_MODULE_2__.render)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./src/lib/render/createElement.ts\");\n/* harmony import */ var _performUnitOfWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./performUnitOfWork */ \"./src/lib/render/performUnitOfWork.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ \"./src/lib/render/render.ts\");\n\n\n\n\n//# sourceURL=webpack://write/./src/lib/render/index.ts?");

/***/ }),

/***/ "./src/lib/render/performUnitOfWork.ts":
/*!*********************************************!*\
  !*** ./src/lib/render/performUnitOfWork.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"performUnitOfWork\": () => (/* binding */ performUnitOfWork)\n/* harmony export */ });\n/* harmony import */ var _reconcileChildren__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reconcileChildren */ \"./src/lib/render/reconcileChildren.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/lib/render/render.ts\");\n\n\nfunction performUnitOfWork(fiber) {\n  // 当引入 funciton component 的时候，主要有两个区别\n  // 1. the fiber from a function component doesn’t have a DOM node\n  // 2. the children come from running the function instead of getting them directly from the props\n  const isFunctionComponent = fiber.type instanceof Function;\n  if (isFunctionComponent) {\n    // function component\n    updateFunctionComponent(fiber);\n  } else {\n    updateHostComponent(fiber);\n  }\n  if (fiber.child) {\n    return fiber.child;\n  }\n  let nextFiber = fiber;\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n    nextFiber = nextFiber.parent;\n  }\n  // 当有子节点的时候，我们去把下一个 unitWork 设置为 sibling ，当没有子节点的时候，我们将其设置为他的parent。然后去便利该parent 的 sibling 然后再去parent 的 parent直到结束。\n}\n\nfunction updateFunctionComponent(fiber) {\n  // 对于 Function Component，在 render 的时候，会执行一次。\n  const children = [fiber.type(fiber.props)];\n  (0,_reconcileChildren__WEBPACK_IMPORTED_MODULE_0__.reconcileChildren)(fiber, children);\n}\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = (0,_render__WEBPACK_IMPORTED_MODULE_1__.createDom)(fiber);\n  }\n  (0,_reconcileChildren__WEBPACK_IMPORTED_MODULE_0__.reconcileChildren)(fiber, fiber.props.children);\n}\n\n//# sourceURL=webpack://write/./src/lib/render/performUnitOfWork.ts?");

/***/ }),

/***/ "./src/lib/render/reconcileChildren.ts":
/*!*********************************************!*\
  !*** ./src/lib/render/reconcileChildren.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reconcileChildren\": () => (/* binding */ reconcileChildren)\n/* harmony export */ });\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../workStore */ \"./src/lib/workStore.ts\");\n\n\n// react 的调和函数\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0;\n  let prevSibling = undefined;\n  // 要知道，在第一次渲染的时候，是没有 alternate 的\n  let oldFiber = wipFiber.alternate?.child;\n  while (index < elements.length || oldFiber != null) {\n    const element = elements[index];\n    let newFiber;\n    // 现在我们已经拿到了之前的 oldFiberNode 和 我们新的 fiberNode 这个时候，我们需要进行对比。\n    const sameType = oldFiber && element && element.type == oldFiber.type;\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\"\n      };\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: undefined,\n        parent: wipFiber,\n        alternate: undefined,\n        effectTag: \"PLACEMENT\"\n      };\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      _workStore__WEBPACK_IMPORTED_MODULE_0__.deletions.current.push(oldFiber);\n    }\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else {\n      prevSibling.sibling = newFiber;\n    }\n    prevSibling = newFiber;\n    index++;\n  }\n  // 核心的递归的逻辑在这里，对于每一次 requestIdleCallback 在 performUnitOfWork 阶段会进行该 fiber 节点的修改，就是fiber节点创建出来，其中包含了创建他的所有子节点，并将子节点的 sibling 联系建立起来，以及parent属性建立起来。\n}\n\n//# sourceURL=webpack://write/./src/lib/render/reconcileChildren.ts?");

/***/ }),

/***/ "./src/lib/render/render.ts":
/*!**********************************!*\
  !*** ./src/lib/render/render.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDom\": () => (/* binding */ createDom),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../workStore */ \"./src/lib/workStore.ts\");\n\n\n\n// 这个地方ts里面的dom类型还不是很清楚。\nconst createDom = fiber => {\n  const dom = fiber.type === \"TEXT_ELEMENT\" ? document.createTextNode(fiber.props.nodeValue.toString()) : document.createElement(fiber.type);\n  const isProperty = key => key !== \"children\";\n  Object.keys(fiber.props).filter(isProperty).forEach(name => {\n    // fix me\n    dom[name] = fiber.props[name];\n  });\n  return dom;\n};\nconst render = (element, container) => {\n  // render 只有在 在每一次re-render中只执行一次，在这一次中我们去绑定 alternate 这个属性。\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current = {\n    type: \"div\",\n    dom: container,\n    // 这里保存着 目前在 dom 上已经 commit 上去的 root，其中这个 alternate 的属性来自于 上次 commit 之后保存的 value。\n    alternate: _workStore__WEBPACK_IMPORTED_MODULE_0__.currentRoot.current,\n    props: {\n      children: [element]\n    }\n  };\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.deletions.current = [];\n  _workStore__WEBPACK_IMPORTED_MODULE_0__.nextUnitOfWork.current = _workStore__WEBPACK_IMPORTED_MODULE_0__.WipRoot.current;\n};\n\n//# sourceURL=webpack://write/./src/lib/render/render.ts?");

/***/ }),

/***/ "./src/lib/types.ts":
/*!**************************!*\
  !*** ./src/lib/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://write/./src/lib/types.ts?");

/***/ }),

/***/ "./src/lib/workLoop/index.ts":
/*!***********************************!*\
  !*** ./src/lib/workLoop/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"workLoop\": () => (/* reexport safe */ _wookLoop__WEBPACK_IMPORTED_MODULE_0__.workLoop)\n/* harmony export */ });\n/* harmony import */ var _wookLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wookLoop */ \"./src/lib/workLoop/wookLoop.ts\");\n\n\n//# sourceURL=webpack://write/./src/lib/workLoop/index.ts?");

/***/ }),

/***/ "./src/lib/workLoop/wookLoop.ts":
/*!**************************************!*\
  !*** ./src/lib/workLoop/wookLoop.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"workLoop\": () => (/* binding */ workLoop)\n/* harmony export */ });\n/* harmony import */ var _commit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commit */ \"./src/lib/commit/index.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../render */ \"./src/lib/render/index.ts\");\n/* harmony import */ var _workStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../workStore */ \"./src/lib/workStore.ts\");\n\n\n\n\n// workLoop 一直在循环。\nfunction workLoop(deadline) {\n  let shouldYield = false;\n  while (_workStore__WEBPACK_IMPORTED_MODULE_2__.nextUnitOfWork.current && !shouldYield) {\n    _workStore__WEBPACK_IMPORTED_MODULE_2__.nextUnitOfWork.current = (0,_render__WEBPACK_IMPORTED_MODULE_1__.performUnitOfWork)(_workStore__WEBPACK_IMPORTED_MODULE_2__.nextUnitOfWork.current);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n  if (!_workStore__WEBPACK_IMPORTED_MODULE_2__.nextUnitOfWork.current && _workStore__WEBPACK_IMPORTED_MODULE_2__.WipRoot.current) {\n    (0,_commit__WEBPACK_IMPORTED_MODULE_0__.commitRoot)();\n  }\n  // 上面是 render 的过程，我们建立的 fiber tree 下面我会把 fiber tree commit 到 真实的 dom 上去\n  requestIdleCallback(workLoop);\n}\n\n//# sourceURL=webpack://write/./src/lib/workLoop/wookLoop.ts?");

/***/ }),

/***/ "./src/lib/workStore.ts":
/*!******************************!*\
  !*** ./src/lib/workStore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WipRoot\": () => (/* binding */ WipRoot),\n/* harmony export */   \"currentRoot\": () => (/* binding */ currentRoot),\n/* harmony export */   \"deletions\": () => (/* binding */ deletions),\n/* harmony export */   \"nextUnitOfWork\": () => (/* binding */ nextUnitOfWork)\n/* harmony export */ });\n// 存储当前需要处理的 unit\nlet nextUnitOfWork = {\n  current: undefined\n};\nlet WipRoot = {\n  current: undefined\n};\nlet currentRoot = {\n  current: undefined\n};\nlet deletions = {\n  current: []\n};\n\n//# sourceURL=webpack://write/./src/lib/workStore.ts?");

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