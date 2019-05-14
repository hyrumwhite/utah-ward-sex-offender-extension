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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/fetch.offenders.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/fetch.offenders.js":
/*!*******************************************!*\
  !*** ./src/background/fetch.offenders.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let date = new Date();\r\ndate.setDate(date.getDate() + 1);\r\ndate = date.getTime() / 1000;\r\n\r\nchrome.runtime.onMessage.addListener((message, sender, reply) => {\r\n  chrome.cookies.set(\r\n    {\r\n      url: 'http://www.icrimewatch.net/',\r\n      domain: '.icrimewatch.net',\r\n      expirationDate: date,\r\n      httpOnly: false,\r\n      name: 'accepted_license',\r\n      path: '/',\r\n      sameSite: 'no_restriction',\r\n      secure: false,\r\n      storeId: '0',\r\n      value: 'NTQ0Mzg%3D'\r\n    },\r\n    err => {\r\n      var xhttp = new XMLHttpRequest();\r\n      xhttp.onreadystatechange = function() {\r\n        if (this.readyState == 4 && this.status == 200) {\r\n          console.log(this.responseText);\r\n          let offenderTableIndex = this.responseText.search(\r\n            /<table.*bgcolor=\"#CCCCCC\"/g\r\n          );\r\n          let offenderTableEndIndex =\r\n            this.responseText.indexOf('</table>', offenderTableIndex) +\r\n            '</table>'.length;\r\n          let offenderTableString = this.responseText.slice(\r\n            offenderTableIndex,\r\n            offenderTableEndIndex\r\n          );\r\n          reply(offenderTableString);\r\n        }\r\n      };\r\n      chrome.storage.sync.get(null, items => {\r\n        let { city, streetAddress, state, zipcode, searchRadius } = items;\r\n        city = city.replace(' ', '+');\r\n        streetAddress = streetAddress.replace(' ', '+');\r\n        state = state.replace(' ', '+');\r\n        let urlPrefix = `http://www.icrimewatch.net/results.php?AgencyID=54438&whichaddr=home_addr%7Ctemp_addr&SubmitAddrSearch=1`;\r\n        let url = `${urlPrefix}&AddrStreet=${streetAddress}&AddrCity=${city}&AddrState=${state}&AddrZip=${zipcode}&AddrZipPlus=&excludeIncarcerated=&radius=${searchRadius}`;\r\n        xhttp.open('GET', url, true);\r\n        xhttp.send();\r\n      });\r\n    }\r\n  );\r\n  return true;\r\n});\r\n\n\n//# sourceURL=webpack:///./src/background/fetch.offenders.js?");

/***/ })

/******/ });