(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["progress"] = factory();
	else
		root["CoCreate"] = root["CoCreate"] || {}, root["CoCreate"]["progress"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "../CoCreate-components/CoCreate-progress/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CoCreate-components/CoCreate-progress/src/index.js":
/*!*************************************************************!*\
  !*** ../CoCreate-components/CoCreate-progress/src/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar CoCreateProgress = {\n  selector: \".progress-wrapper\",\n  mainObjects: [],\n  init: function () {\n    this.initElement();\n    this.initEvent();\n  },\n  initElement: function (container) {\n    const main_container = container ? container : document;\n    let elements = main_container.querySelectorAll(this.selector);\n\n    let _this = this;\n\n    elements.forEach(el => {\n      let filter = CoCreate.filter.setFilter(el, 'data-progress_id', 'progress');\n      if (!filter) return;\n      let obj = {\n        el: el,\n        filter: filter,\n        id: el.getAttribute('data-progress_id')\n      };\n\n      _this.mainObjects.push(obj);\n\n      _this.fetchProgess(el);\n    });\n  },\n  initEvent: function () {\n    let _this = this;\n\n    CoCreate.socket.listen('readDocumentList', function (data) {\n      if (data.metadata == \"progress-total\") {\n        _this.renderProgress(data, true);\n      } else if (data.metadata == \"progress-value\") {\n        _this.renderProgress(data, false);\n      }\n    });\n  },\n\n  renderProgress(data, isTotal) {\n    //.\n    if (!data) return;\n    const element_id = data.element;\n\n    if (!element_id) {\n      return;\n    }\n\n    const result_count = data['data'].length;\n\n    let _this = this;\n\n    let elements = [];\n    let selector = isTotal ? '.progressTotal' : '.progressValue';\n    selector = selector + `[data-progress_id=\"${element_id}\"]`;\n    elements = document.querySelectorAll(selector);\n    elements.forEach(el => {\n      el.textContent = result_count;\n    }); //. set progressbar\n\n    elements = document.querySelectorAll(`.progressbar[data-progress_id=\"${element_id}\"]`);\n    elements.forEach(el => {\n      if (el.tagName === \"PROGRESS\") {\n        if (isTotal) {\n          el.setAttribute('max', result_count);\n        } else {\n          el.setAttribute('value', result_count);\n        }\n      } else {\n        if (isTotal) {\n          el.setAttribute('data-total', result_count);\n        } else {\n          el.setAttribute('data-value', result_count);\n        }\n\n        _this.renderBar(el);\n      }\n    });\n  },\n\n  renderBar: function (el) {\n    const total = Number(el.getAttribute('data-total'));\n    const value = Number(el.getAttribute('data-value'));\n\n    if (!total || !value || total === 0) {\n      return;\n    }\n\n    const percent = value / total * 100;\n    el.innerHTML = `<div style=\"width: ${percent}%\"></div>`;\n  },\n  fetchProgess: function (el) {\n    let select_obj = null;\n\n    let _id = el.getAttribute('data-progress_id');\n\n    this.mainObjects.forEach(item => {\n      if (item.id == _id) {\n        select_obj = item;\n      }\n    });\n    if (!select_obj) return;\n    let filter = select_obj.filter;\n    console.log(filter);\n    let totalFilter = CoCreate.filter.makeFetchOptions(filter);\n    let valueFilter = CoCreate.filter.makeFetchOptions(filter);\n    let progressName = el.getAttribute('data-progress_name');\n    let progressValue = el.getAttribute('data-progress_value');\n    let valueOperator = el.getAttribute('data-progress_operator') || \"contain\";\n    totalFilter['metadata'] = 'progress-total';\n    valueFilter['metadata'] = 'progress-value';\n    let val_filter = [].concat(valueFilter['operator']['filters']);\n    val_filter.push({\n      name: progressName,\n      value: [progressValue],\n      operator: valueOperator\n    });\n    valueFilter['operator']['filters'] = val_filter;\n    CoCreate.crud.readDocumentList(totalFilter);\n    CoCreate.crud.readDocumentList(valueFilter);\n  }\n};\nCoCreateProgress.init();\nvar _default = CoCreateProgress;\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS5wcm9ncmVzcy8uLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXByb2dyZXNzL3NyYy9pbmRleC5qcz83ZmRmIl0sIm5hbWVzIjpbIkNvQ3JlYXRlUHJvZ3Jlc3MiLCJzZWxlY3RvciIsIm1haW5PYmplY3RzIiwiaW5pdCIsImluaXRFbGVtZW50IiwiaW5pdEV2ZW50IiwiY29udGFpbmVyIiwibWFpbl9jb250YWluZXIiLCJkb2N1bWVudCIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsIl90aGlzIiwiZm9yRWFjaCIsImVsIiwiZmlsdGVyIiwiQ29DcmVhdGUiLCJzZXRGaWx0ZXIiLCJvYmoiLCJpZCIsImdldEF0dHJpYnV0ZSIsInB1c2giLCJmZXRjaFByb2dlc3MiLCJzb2NrZXQiLCJsaXN0ZW4iLCJkYXRhIiwibWV0YWRhdGEiLCJyZW5kZXJQcm9ncmVzcyIsImlzVG90YWwiLCJlbGVtZW50X2lkIiwiZWxlbWVudCIsInJlc3VsdF9jb3VudCIsImxlbmd0aCIsInRleHRDb250ZW50IiwidGFnTmFtZSIsInNldEF0dHJpYnV0ZSIsInJlbmRlckJhciIsInRvdGFsIiwiTnVtYmVyIiwidmFsdWUiLCJwZXJjZW50IiwiaW5uZXJIVE1MIiwic2VsZWN0X29iaiIsIl9pZCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwidG90YWxGaWx0ZXIiLCJtYWtlRmV0Y2hPcHRpb25zIiwidmFsdWVGaWx0ZXIiLCJwcm9ncmVzc05hbWUiLCJwcm9ncmVzc1ZhbHVlIiwidmFsdWVPcGVyYXRvciIsInZhbF9maWx0ZXIiLCJjb25jYXQiLCJuYW1lIiwib3BlcmF0b3IiLCJjcnVkIiwicmVhZERvY3VtZW50TGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSUEsZ0JBQWdCLEdBQUc7QUFFdEJDLFVBQVEsRUFBRSxtQkFGWTtBQUl0QkMsYUFBVyxFQUFFLEVBSlM7QUFNdEJDLE1BQUksRUFBRSxZQUFXO0FBQ2hCLFNB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QVIsQ0FBWS9CLE1BQVo7QUFDQSxRQUFJZ0MsV0FBVyxHQUFHL0IsUUFBUSxDQUFDRCxNQUFULENBQWdCaUMsZ0JBQWhCLENBQWlDakMsTUFBakMsQ0FBbEI7QUFDQSxRQUFJa0MsV0FBVyxHQUFHakMsUUFBUSxDQUFDRCxNQUFULENBQWdCaUMsZ0JBQWhCLENBQWlDakMsTUFBakMsQ0FBbEI7QUFFQSxRQUFJbUMsWUFBWSxHQUFHcEMsRUFBRSxDQUFDTSxZQUFILENBQWdCLG9CQUFoQixDQUFuQjtBQUNBLFFBQUkrQixhQUFhLEdBQUdyQyxFQUFFLENBQUNNLFlBQUgsQ0FBZ0IscUJBQWhCLENBQXBCO0FBRUEsUUFBSWdDLGFBQWEsR0FBR3RDLEVBQUUsQ0FBQ00sWUFBSCxDQUFnQix3QkFBaEIsS0FBNkMsU0FBakU7QUFFQTJCLGVBQVcsQ0FBQyxVQUFELENBQVgsR0FBMEIsZ0JBQTFCO0FBQ0FFLGVBQVcsQ0FBQyxVQUFELENBQVgsR0FBMEIsZ0JBQTFCO0FBRUEsUUFBSUksVUFBVSxHQUFHLEdBQUdDLE1BQUgsQ0FBVUwsV0FBVyxDQUFDLFVBQUQsQ0FBWCxDQUF3QixTQUF4QixDQUFWLENBQWpCO0FBQ0FJLGNBQVUsQ0FBQ2hDLElBQVgsQ0FBZ0I7QUFBQ2tDLFVBQUksRUFBRUwsWUFBUDtBQUFxQlgsV0FBSyxFQUFFLENBQUNZLGFBQUQsQ0FBNUI7QUFBNkNLLGNBQVEsRUFBRUo7QUFBdkQsS0FBaEI7QUFDQUgsZUFBVyxDQUFDLFVBQUQsQ0FBWCxDQUF3QixTQUF4QixJQUFxQ0ksVUFBckM7QUFFQXJDLFlBQVEsQ0FBQ3lDLElBQVQsQ0FBY0MsZ0JBQWQsQ0FBK0JYLFdBQS9CO0FBQ0EvQixZQUFRLENBQUN5QyxJQUFULENBQWNDLGdCQUFkLENBQStCVCxXQUEvQjtBQUNBO0FBaklxQixDQUF2QjtBQW9JQWhELGdCQUFnQixDQUFDRyxJQUFqQjtlQUVlSCxnQiIsImZpbGUiOiIuLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXByb2dyZXNzL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb0NyZWF0ZVByb2dyZXNzID0ge1xuXHRcblx0c2VsZWN0b3I6IFwiLnByb2dyZXNzLXdyYXBwZXJcIixcblx0XG5cdG1haW5PYmplY3RzOiBbXSxcblx0XG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuaW5pdEVsZW1lbnQoKVxuXHRcdHRoaXMuaW5pdEV2ZW50KClcblx0fSxcblx0XG5cdGluaXRFbGVtZW50OiBmdW5jdGlvbihjb250YWluZXIpIHtcblx0XHRjb25zdCBtYWluX2NvbnRhaW5lciA9IGNvbnRhaW5lciA/IGNvbnRhaW5lciA6IGRvY3VtZW50O1xuXHRcdFxuXHRcdGxldCBlbGVtZW50cyA9IG1haW5fY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XG5cdFx0bGV0IF90aGlzID0gdGhpcztcblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0bGV0IGZpbHRlciA9IENvQ3JlYXRlLmZpbHRlci5zZXRGaWx0ZXIoZWwsICdkYXRhLXByb2dyZXNzX2lkJywgJ3Byb2dyZXNzJylcblx0XHRcdFxuXHRcdFx0aWYgKCFmaWx0ZXIpIHJldHVybjtcblx0XHRcdFxuXHRcdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0ZWw6IGVsLFxuXHRcdFx0XHRmaWx0ZXI6IGZpbHRlcixcblx0XHRcdFx0aWQ6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc19pZCcpXG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5tYWluT2JqZWN0cy5wdXNoKG9iaik7XG5cdFx0XHRfdGhpcy5mZXRjaFByb2dlc3MoZWwpXG5cblx0XHR9KVxuXHR9LFxuXHRcblx0aW5pdEV2ZW50OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdENvQ3JlYXRlLnNvY2tldC5saXN0ZW4oJ3JlYWREb2N1bWVudExpc3QnLCBmdW5jdGlvbihkYXRhKSB7XG5cblx0XHRcdGlmIChkYXRhLm1ldGFkYXRhID09IFwicHJvZ3Jlc3MtdG90YWxcIikge1xuXHRcdFx0XHRfdGhpcy5yZW5kZXJQcm9ncmVzcyhkYXRhLCB0cnVlKTtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YS5tZXRhZGF0YSA9PSBcInByb2dyZXNzLXZhbHVlXCIpIHtcblx0XHRcdFx0X3RoaXMucmVuZGVyUHJvZ3Jlc3MoZGF0YSwgZmFsc2UpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblx0XG5cdHJlbmRlclByb2dyZXNzKGRhdGEsIGlzVG90YWwpIHtcblx0XHQvLy5cblx0XHRpZiAoIWRhdGEpIHJldHVybjtcblx0XHRjb25zdCBlbGVtZW50X2lkID0gZGF0YS5lbGVtZW50O1xuXHRcdGlmICghZWxlbWVudF9pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF9jb3VudCA9IGRhdGFbJ2RhdGEnXS5sZW5ndGhcblx0XHRsZXQgX3RoaXMgPSB0aGlzO1x0XHRcblx0XHRsZXQgZWxlbWVudHMgPSBbXTtcblx0XHRsZXQgc2VsZWN0b3IgID0gaXNUb3RhbCA/ICcucHJvZ3Jlc3NUb3RhbCcgOiAnLnByb2dyZXNzVmFsdWUnO1xuXHRcdHNlbGVjdG9yID0gc2VsZWN0b3IgKyBgW2RhdGEtcHJvZ3Jlc3NfaWQ9XCIke2VsZW1lbnRfaWR9XCJdYDtcblx0XHRcblx0XHRlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0ZWwudGV4dENvbnRlbnQgPSByZXN1bHRfY291bnQ7XG5cdFx0fSlcblx0XHRcblx0XHQvLy4gc2V0IHByb2dyZXNzYmFyXG5cdFx0XG5cdFx0ZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvZ3Jlc3NiYXJbZGF0YS1wcm9ncmVzc19pZD1cIiR7ZWxlbWVudF9pZH1cIl1gKVxuXHRcdFxuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRcblx0XHRcdGlmIChlbC50YWdOYW1lID09PSBcIlBST0dSRVNTXCIpIHtcblx0XHRcdFx0aWYgKGlzVG90YWwpIHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ21heCcsIHJlc3VsdF9jb3VudCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJlc3VsdF9jb3VudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpc1RvdGFsKSB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRvdGFsJywgcmVzdWx0X2NvdW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnLCByZXN1bHRfY291bnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aGlzLnJlbmRlckJhcihlbClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXHRcblx0cmVuZGVyQmFyOiBmdW5jdGlvbihlbCkge1xuXHRcdGNvbnN0IHRvdGFsID0gTnVtYmVyKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b3RhbCcpKTtcblx0XHRjb25zdCB2YWx1ZSA9IE51bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSk7XG5cdFx0XG5cdFx0aWYgKCF0b3RhbCB8fCAhdmFsdWUgfHwgdG90YWwgPT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3QgcGVyY2VudCA9ICh2YWx1ZSAvIHRvdGFsKSAqIDEwMDtcblx0XHRlbC5pbm5lckhUTUwgPSBgPGRpdiBzdHlsZT1cIndpZHRoOiAke3BlcmNlbnR9JVwiPjwvZGl2PmA7XG5cdH0sXG5cdFxuXHRmZXRjaFByb2dlc3M6IGZ1bmN0aW9uKGVsKSB7XG5cdFx0bGV0IHNlbGVjdF9vYmogPSBudWxsXG5cdFx0bGV0IF9pZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc19pZCcpXG5cdFx0XG5cdFx0dGhpcy5tYWluT2JqZWN0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRpZiAoaXRlbS5pZCA9PSBfaWQpIHtcblx0XHRcdFx0c2VsZWN0X29iaiA9IGl0ZW07XG5cdFx0XHR9XG5cdFx0fSlcblx0XHRpZiAoIXNlbGVjdF9vYmopIHJldHVybjtcblx0XHRcblx0XHRsZXQgZmlsdGVyID0gc2VsZWN0X29iai5maWx0ZXI7XG5cdFx0Y29uc29sZS5sb2coZmlsdGVyKVxuXHRcdGxldCB0b3RhbEZpbHRlciA9IENvQ3JlYXRlLmZpbHRlci5tYWtlRmV0Y2hPcHRpb25zKGZpbHRlcik7XG5cdFx0bGV0IHZhbHVlRmlsdGVyID0gQ29DcmVhdGUuZmlsdGVyLm1ha2VGZXRjaE9wdGlvbnMoZmlsdGVyKVxuXG5cdFx0bGV0IHByb2dyZXNzTmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc19uYW1lJylcblx0XHRsZXQgcHJvZ3Jlc3NWYWx1ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc192YWx1ZScpXG5cdFx0XG5cdFx0bGV0IHZhbHVlT3BlcmF0b3IgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3Nfb3BlcmF0b3InKSB8fCBcImNvbnRhaW5cIlxuXHRcdFxuXHRcdHRvdGFsRmlsdGVyWydtZXRhZGF0YSddID0gJ3Byb2dyZXNzLXRvdGFsJztcblx0XHR2YWx1ZUZpbHRlclsnbWV0YWRhdGEnXSA9ICdwcm9ncmVzcy12YWx1ZSdcblx0XHRcblx0XHRsZXQgdmFsX2ZpbHRlciA9IFtdLmNvbmNhdCh2YWx1ZUZpbHRlclsnb3BlcmF0b3InXVsnZmlsdGVycyddKTtcblx0XHR2YWxfZmlsdGVyLnB1c2goe25hbWU6IHByb2dyZXNzTmFtZSwgdmFsdWU6IFtwcm9ncmVzc1ZhbHVlXSwgb3BlcmF0b3I6IHZhbHVlT3BlcmF0b3J9KTtcblx0XHR2YWx1ZUZpbHRlclsnb3BlcmF0b3InXVsnZmlsdGVycyddID0gdmFsX2ZpbHRlcjtcblxuXHRcdENvQ3JlYXRlLmNydWQucmVhZERvY3VtZW50TGlzdCh0b3RhbEZpbHRlcilcblx0XHRDb0NyZWF0ZS5jcnVkLnJlYWREb2N1bWVudExpc3QodmFsdWVGaWx0ZXIpXG5cdH1cbn1cblxuQ29DcmVhdGVQcm9ncmVzcy5pbml0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvQ3JlYXRlUHJvZ3Jlc3M7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../CoCreate-components/CoCreate-progress/src/index.js\n");

/***/ })

/******/ })["default"];
});