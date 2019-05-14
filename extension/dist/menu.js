/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/menu/menu.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/debounce.js":
/*!*****************************!*\
  !*** ./src/lib/debounce.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return debounce; });\n/**\r\n * \r\n * @param {function} func function to debounce\r\n * @param {number} wait wait in ms\r\n * @param {*} immediate \r\n */\r\nfunction debounce(func, wait = 1000) {\r\n  let timerId;\r\n\r\n  return (...args) => {\r\n    if (timerId) {\r\n      clearTimeout(timerId);\r\n    }\r\n\r\n    timerId = setTimeout(() => {\r\n      func(...args);\r\n      timerId = null;\r\n    }, wait);\r\n  };\r\n}\n\n//# sourceURL=webpack:///./src/lib/debounce.js?");

/***/ }),

/***/ "./src/menu/menu.js":
/*!**************************!*\
  !*** ./src/menu/menu.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_debounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/debounce.js */ \"./src/lib/debounce.js\");\n\r\n\r\n// reload data into page\r\nchrome.storage.sync.get(null, items => {\r\n  for (let key in items) {\r\n    const element = document.getElementById(key);\r\n\r\n    if (!element) {\r\n      return;\r\n    }\r\n\r\n    element.value = items[key];\r\n  }\r\n});\r\n\r\n// save values when updated\r\nconst save = Object(_lib_debounce_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(({ target }) => {\r\n  const id = target.id;\r\n  const value = target.value;\r\n\r\n  chrome.storage.sync.set({ [id] : value }, () => {\r\n    console.log(`\"${id}\" is set to \"${value}\"`);\r\n  });\r\n}, 400);\r\n\r\ndocument.querySelectorAll(\"input, select\").forEach(input => {\r\n  input.addEventListener(\"input\", save);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/menu/menu.js?");

/***/ })

/******/ });