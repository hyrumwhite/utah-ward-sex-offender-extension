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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content-scripts/offender.finder.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content-scripts/offender.finder.js":
/*!************************************************!*\
  !*** ./src/content-scripts/offender.finder.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let unitno;\r\nlet navContainerId = 'wardOrStakeUnitNav';\r\nlet listContainerId = 'middleScrollerColumn';\r\n\r\nconst renderOffenderList = list => {\r\n  let ul = document.createElement('ul');\r\n  ul.className = 'list';\r\n  for (let item of list) {\r\n    console.log(item);\r\n  }\r\n};\r\nasync function getOffenderList(memberElements) {\r\n  chrome.storage.sync.get(null, items => {\r\n    let listContainer = document.querySelector(`#${listContainerId}`);\r\n    if (!items.zipcode) {\r\n      // return (listContainer.innerHTML =\r\n      //   '<span style=\"margin:.5rem; position: relative; top:.5rem;\">Missing required location information. Please click the extension icon on your browser, enter your info, and click the \"Sex Offenders\" option again.</span>');\r\n    }\r\n    // listContainer.innerHTML =\r\n    //   '<span style=\"margin:.5rem; position: relative; top:.5rem;\">Loading Offenders...</span>';\r\n    console.log('LOADING');\r\n    chrome.runtime.sendMessage({ greeting: 'hello' }, async function(response) {\r\n      console.log('LOADED');\r\n      let offenderTable = response;\r\n      let div = document.createElement('div');\r\n      div.innerHTML = offenderTable;\r\n      let offenders = [];\r\n      let cells = div.querySelectorAll('tbody td:nth-child(5)');\r\n      let imageCells = div.querySelectorAll('tbody td:nth-child(2)');\r\n      for (let [index, cell] of cells.entries()) {\r\n        let image = imageCells[index].querySelector('img');\r\n        offenders.push({\r\n          name: cell.textContent.toLowerCase().trim(),\r\n          imageUrl: image ? image.src : ''\r\n        });\r\n      }\r\n      let offendersList = offenders;\r\n      let parsedOffenders = [];\r\n      for (let { name, imageUrl } of offendersList) {\r\n        let [firstName, lastName] = name.split(' ');\r\n        parsedOffenders.push({ firstName, lastName, imageUrl });\r\n      }\r\n      let letters = document.querySelectorAll('[class*=\"Listing__Header\"]');\r\n      letters.forEach(letter => (letter.style.display = 'none'));\r\n      for (let element of memberElements) {\r\n        let hasMatch = false;\r\n        for (let { firstName, lastName, imageUrl } of parsedOffenders) {\r\n          let memberNames = element.textContent.toLowerCase();\r\n          hasMatch =\r\n            memberNames.includes(firstName) && memberNames.includes(lastName);\r\n          if (hasMatch) {\r\n            console.log({ memberNames, firstName, lastName });\r\n            break;\r\n          }\r\n        }\r\n        console.log({ hasMatch });\r\n        if (!hasMatch) {\r\n          element.parentElement.style.display = 'none';\r\n        }\r\n      }\r\n      console.log('LOADED');\r\n    });\r\n  });\r\n}\r\n\r\nlet showingOffenders = false;\r\n\r\nfunction showOffenders() {\r\n  let toggle = document.querySelector('#offenders-toggle');\r\n  toggle.textContent = 'Remove offender filter';\r\n  let wardMemberElements = document.querySelectorAll(\r\n    '[class*=\"ListingEntry__HouseholdEntry\"]'\r\n  );\r\n  getOffenderList(wardMemberElements);\r\n}\r\n\r\nfunction hideOffenders() {\r\n  let toggle = document.querySelector('#offenders-toggle');\r\n  toggle.textContent = 'Show sex offenders';\r\n}\r\n\r\nfunction offendersFilter() {\r\n  showingOffenders = !showingOffenders;\r\n  showingOffenders ? showOffenders() : hideOffenders();\r\n}\r\n\r\nfunction insertOffenderOption(categoryDiv) {\r\n  let offenderToggle = document.createElement('span');\r\n  offenderToggle.id = 'offenders-toggle';\r\n  offenderToggle.textContent = 'Show sex offenders';\r\n  offenderToggle.style.cssText = `\r\n    color: rgb(1, 182, 209);\r\n    cursor: pointer;\r\n    float: right;\r\n  `;\r\n  offenderToggle.addEventListener('click', offendersFilter);\r\n  categoryDiv.appendChild(offenderToggle);\r\n}\r\nvar interval = window.setInterval(() => {\r\n  let element = document.querySelector(`[class*=\"directory__TypeFilter\"]`);\r\n  if (element) {\r\n    insertOffenderOption(element);\r\n    window.clearInterval(interval);\r\n  }\r\n}, 500);\r\nconsole.log('CHANGE DETECTED');\r\n\n\n//# sourceURL=webpack:///./src/content-scripts/offender.finder.js?");

/***/ })

/******/ });