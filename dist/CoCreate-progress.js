(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoCreateProgress"] = factory();
	else
		root["CoCreateProgress"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./CoCreate-components/CoCreate-progress/src/CoCreate-progress.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CoCreate-components/CoCreate-progress/src/CoCreate-progress.js":
/*!************************************************************************!*\
  !*** ./CoCreate-components/CoCreate-progress/src/CoCreate-progress.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar CoCreateProgress = {\n  selector: \".progress-wrapper\",\n  mainObjects: [],\n  init: function init() {\n    this.initElement();\n    this.initEvent();\n  },\n  initElement: function initElement(container) {\n    var main_container = container ? container : document;\n    var elements = main_container.querySelectorAll(this.selector);\n\n    var _this = this;\n\n    elements.forEach(function (el) {\n      var filter = CoCreateFilter.setFilter(el, 'data-progress_id', 'progress');\n      if (!filter) return;\n      var obj = {\n        el: el,\n        filter: filter,\n        id: el.getAttribute('data-progress_id')\n      };\n\n      _this.mainObjects.push(obj);\n\n      _this.fetchProgess(el);\n    });\n  },\n  initEvent: function initEvent() {\n    var _this = this;\n\n    CoCreateSocket.listen('readDocumentList', function (data) {\n      if (data.metadata == \"progress-total\") {\n        _this.renderProgress(data, true);\n      } else if (data.metadata == \"progress-value\") {\n        _this.renderProgress(data, false);\n      }\n    });\n  },\n  renderProgress: function renderProgress(data, isTotal) {\n    //.\n    if (!data) return;\n    var element_id = data.element;\n\n    if (!element_id) {\n      return;\n    }\n\n    var result_count = data['data'].length;\n\n    var _this = this;\n\n    var elements = [];\n    var selector = isTotal ? '.progressTotal' : '.progressValue';\n    selector = selector + \"[data-progress_id=\\\"\".concat(element_id, \"\\\"]\");\n    elements = document.querySelectorAll(selector);\n    elements.forEach(function (el) {\n      el.textContent = result_count;\n    }); //. set progressbar\n\n    elements = document.querySelectorAll(\".progressbar[data-progress_id=\\\"\".concat(element_id, \"\\\"]\"));\n    elements.forEach(function (el) {\n      if (el.tagName === \"PROGRESS\") {\n        if (isTotal) {\n          el.setAttribute('max', result_count);\n        } else {\n          el.setAttribute('value', result_count);\n        }\n      } else {\n        if (isTotal) {\n          el.setAttribute('data-total', result_count);\n        } else {\n          el.setAttribute('data-value', result_count);\n        }\n\n        _this.renderBar(el);\n      }\n    });\n  },\n  renderBar: function renderBar(el) {\n    var total = Number(el.getAttribute('data-total'));\n    var value = Number(el.getAttribute('data-value'));\n\n    if (!total || !value || total === 0) {\n      return;\n    }\n\n    var percent = value / total * 100;\n    el.innerHTML = \"<div style=\\\"width: \".concat(percent, \"%\\\"></div>\");\n  },\n  fetchProgess: function fetchProgess(el) {\n    var select_obj = null;\n\n    var _id = el.getAttribute('data-progress_id');\n\n    this.mainObjects.forEach(function (item) {\n      if (item.id == _id) {\n        select_obj = item;\n      }\n    });\n    if (!select_obj) return;\n    var filter = select_obj.filter;\n    console.log(filter);\n    var totalFilter = CoCreateFilter.makeFetchOptions(filter);\n    var valueFilter = CoCreateFilter.makeFetchOptions(filter);\n    var progressName = el.getAttribute('data-progress_name');\n    var progressValue = el.getAttribute('data-progress_value');\n    var valueOperator = el.getAttribute('data-progress_operator') || \"contain\";\n    totalFilter['metadata'] = 'progress-total';\n    valueFilter['metadata'] = 'progress-value';\n    var val_filter = [].concat(valueFilter['operator']['filters']);\n    val_filter.push({\n      name: progressName,\n      value: [progressValue],\n      operator: valueOperator\n    });\n    valueFilter['operator']['filters'] = val_filter;\n    CoCreate.readDocumentList(totalFilter);\n    CoCreate.readDocumentList(valueFilter);\n  }\n};\nCoCreateProgress.init();\n/* harmony default export */ __webpack_exports__[\"default\"] = (CoCreateProgress);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZVByb2dyZXNzLy4vQ29DcmVhdGUtY29tcG9uZW50cy9Db0NyZWF0ZS1wcm9ncmVzcy9zcmMvQ29DcmVhdGUtcHJvZ3Jlc3MuanM/ZTBiYyJdLCJuYW1lcyI6WyJDb0NyZWF0ZVByb2dyZXNzIiwic2VsZWN0b3IiLCJtYWluT2JqZWN0cyIsImluaXQiLCJpbml0RWxlbWVudCIsImluaXRFdmVudCIsImNvbnRhaW5lciIsIm1haW5fY29udGFpbmVyIiwiZG9jdW1lbnQiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfdGhpcyIsImZvckVhY2giLCJlbCIsImZpbHRlciIsIkNvQ3JlYXRlRmlsdGVyIiwic2V0RmlsdGVyIiwib2JqIiwiaWQiLCJnZXRBdHRyaWJ1dGUiLCJwdXNoIiwiZmV0Y2hQcm9nZXNzIiwiQ29DcmVhdGVTb2NrZXQiLCJsaXN0ZW4iLCJkYXRhIiwibWV0YWRhdGEiLCJyZW5kZXJQcm9ncmVzcyIsImlzVG90YWwiLCJlbGVtZW50X2lkIiwiZWxlbWVudCIsInJlc3VsdF9jb3VudCIsImxlbmd0aCIsInRleHRDb250ZW50IiwidGFnTmFtZSIsInNldEF0dHJpYnV0ZSIsInJlbmRlckJhciIsInRvdGFsIiwiTnVtYmVyIiwidmFsdWUiLCJwZXJjZW50IiwiaW5uZXJIVE1MIiwic2VsZWN0X29iaiIsIl9pZCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwidG90YWxGaWx0ZXIiLCJtYWtlRmV0Y2hPcHRpb25zIiwidmFsdWVGaWx0ZXIiLCJwcm9ncmVzc05hbWUiLCJwcm9ncmVzc1ZhbHVlIiwidmFsdWVPcGVyYXRvciIsInZhbF9maWx0ZXIiLCJjb25jYXQiLCJuYW1lIiwib3BlcmF0b3IiLCJDb0NyZWF0ZSIsInJlYWREb2N1bWVudExpc3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBSUEsZ0JBQWdCLEdBQUc7QUFFdEJDLFVBQVEsRUFBRSxtQkFGWTtBQUl0QkMsYUFBVyxFQUFFLEVBSlM7QUFN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QUNDLEdBQVIsQ0FBWS9CLE1BQVo7QUFDQSxRQUFJZ0MsV0FBVyxHQUFHL0IsY0FBYyxDQUFDZ0MsZ0JBQWYsQ0FBZ0NqQyxNQUFoQyxDQUFsQjtBQUNBLFFBQUlrQyxXQUFXLEdBQUdqQyxjQUFjLENBQUNnQyxnQkFBZixDQUFnQ2pDLE1BQWhDLENBQWxCO0FBRUEsUUFBSW1DLFlBQVksR0FBR3BDLEVBQUUsQ0FBQ00sWUFBSCxDQUFnQixvQkFBaEIsQ0FBbkI7QUFDQSxRQUFJK0IsYUFBYSxHQUFHckMsRUFBRSxDQUFDTSxZQUFILENBQWdCLHFCQUFoQixDQUFwQjtBQUVBLFFBQUlnQyxhQUFhLEdBQUd0QyxFQUFFLENBQUNNLFlBQUgsQ0FBZ0Isd0JBQWhCLEtBQTZDLFNBQWpFO0FBRUEyQixlQUFXLENBQUMsVUFBRCxDQUFYLEdBQTBCLGdCQUExQjtBQUNBRSxlQUFXLENBQUMsVUFBRCxDQUFYLEdBQTBCLGdCQUExQjtBQUVBLFFBQUlJLFVBQVUsR0FBRyxHQUFHQyxNQUFILENBQVVMLFdBQVcsQ0FBQyxVQUFELENBQVgsQ0FBd0IsU0FBeEIsQ0FBVixDQUFqQjtBQUNBSSxjQUFVLENBQUNoQyxJQUFYLENBQWdCO0FBQUNrQyxVQUFJLEVBQUVMLFlBQVA7QUFBcUJYLFdBQUssRUFBRSxDQUFDWSxhQUFELENBQTVCO0FBQTZDSyxjQUFRLEVBQUVKO0FBQXZELEtBQWhCO0FBQ0FILGVBQVcsQ0FBQyxVQUFELENBQVgsQ0FBd0IsU0FBeEIsSUFBcUNJLFVBQXJDO0FBRUFJLFlBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJYLFdBQTFCO0FBQ0FVLFlBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJULFdBQTFCO0FBQ0E7QUFqSXFCLENBQXZCO0FBb0lBaEQsZ0JBQWdCLENBQUNHLElBQWpCO0FBRWVILCtFQUFmIiwiZmlsZSI6Ii4vQ29DcmVhdGUtY29tcG9uZW50cy9Db0NyZWF0ZS1wcm9ncmVzcy9zcmMvQ29DcmVhdGUtcHJvZ3Jlc3MuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29DcmVhdGVQcm9ncmVzcyA9IHtcblx0XG5cdHNlbGVjdG9yOiBcIi5wcm9ncmVzcy13cmFwcGVyXCIsXG5cdFxuXHRtYWluT2JqZWN0czogW10sXG5cdFxuXHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmluaXRFbGVtZW50KClcblx0XHR0aGlzLmluaXRFdmVudCgpXG5cdH0sXG5cdFxuXHRpbml0RWxlbWVudDogZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0Y29uc3QgbWFpbl9jb250YWluZXIgPSBjb250YWluZXIgPyBjb250YWluZXIgOiBkb2N1bWVudDtcblx0XHRcblx0XHRsZXQgZWxlbWVudHMgPSBtYWluX2NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpO1xuXHRcdGxldCBfdGhpcyA9IHRoaXM7XG5cdFx0ZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdGxldCBmaWx0ZXIgPSBDb0NyZWF0ZUZpbHRlci5zZXRGaWx0ZXIoZWwsICdkYXRhLXByb2dyZXNzX2lkJywgJ3Byb2dyZXNzJylcblx0XHRcdFxuXHRcdFx0aWYgKCFmaWx0ZXIpIHJldHVybjtcblx0XHRcdFxuXHRcdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0ZWw6IGVsLFxuXHRcdFx0XHRmaWx0ZXI6IGZpbHRlcixcblx0XHRcdFx0aWQ6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc19pZCcpXG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5tYWluT2JqZWN0cy5wdXNoKG9iaik7XG5cdFx0XHRfdGhpcy5mZXRjaFByb2dlc3MoZWwpXG5cblx0XHR9KVxuXHR9LFxuXHRcblx0aW5pdEV2ZW50OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdENvQ3JlYXRlU29ja2V0Lmxpc3RlbigncmVhZERvY3VtZW50TGlzdCcsIGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0aWYgKGRhdGEubWV0YWRhdGEgPT0gXCJwcm9ncmVzcy10b3RhbFwiKSB7XG5cdFx0XHRcdF90aGlzLnJlbmRlclByb2dyZXNzKGRhdGEsIHRydWUpO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhLm1ldGFkYXRhID09IFwicHJvZ3Jlc3MtdmFsdWVcIikge1xuXHRcdFx0XHRfdGhpcy5yZW5kZXJQcm9ncmVzcyhkYXRhLCBmYWxzZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXHRcblx0cmVuZGVyUHJvZ3Jlc3MoZGF0YSwgaXNUb3RhbCkge1xuXHRcdC8vLlxuXHRcdGlmICghZGF0YSkgcmV0dXJuO1xuXHRcdGNvbnN0IGVsZW1lbnRfaWQgPSBkYXRhLmVsZW1lbnQ7XG5cdFx0aWYgKCFlbGVtZW50X2lkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X2NvdW50ID0gZGF0YVsnZGF0YSddLmxlbmd0aFxuXHRcdGxldCBfdGhpcyA9IHRoaXM7XHRcdFxuXHRcdGxldCBlbGVtZW50cyA9IFtdO1xuXHRcdGxldCBzZWxlY3RvciAgPSBpc1RvdGFsID8gJy5wcm9ncmVzc1RvdGFsJyA6ICcucHJvZ3Jlc3NWYWx1ZSc7XG5cdFx0c2VsZWN0b3IgPSBzZWxlY3RvciArIGBbZGF0YS1wcm9ncmVzc19pZD1cIiR7ZWxlbWVudF9pZH1cIl1gO1xuXHRcdFxuXHRcdGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcblxuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRlbC50ZXh0Q29udGVudCA9IHJlc3VsdF9jb3VudDtcblx0XHR9KVxuXHRcdFxuXHRcdC8vLiBzZXQgcHJvZ3Jlc3NiYXJcblx0XHRcblx0XHRlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9ncmVzc2JhcltkYXRhLXByb2dyZXNzX2lkPVwiJHtlbGVtZW50X2lkfVwiXWApXG5cdFx0XG5cdFx0ZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT09IFwiUFJPR1JFU1NcIikge1xuXHRcdFx0XHRpZiAoaXNUb3RhbCkge1xuXHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnbWF4JywgcmVzdWx0X2NvdW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcmVzdWx0X2NvdW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGlzVG90YWwpIHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG90YWwnLCByZXN1bHRfY291bnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIHJlc3VsdF9jb3VudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3RoaXMucmVuZGVyQmFyKGVsKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cdFxuXHRyZW5kZXJCYXI6IGZ1bmN0aW9uKGVsKSB7XG5cdFx0Y29uc3QgdG90YWwgPSBOdW1iZXIoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvdGFsJykpO1xuXHRcdGNvbnN0IHZhbHVlID0gTnVtYmVyKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcblx0XHRcblx0XHRpZiAoIXRvdGFsIHx8ICF2YWx1ZSB8fCB0b3RhbCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRjb25zdCBwZXJjZW50ID0gKHZhbHVlIC8gdG90YWwpICogMTAwO1xuXHRcdGVsLmlubmVySFRNTCA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6ICR7cGVyY2VudH0lXCI+PC9kaXY+YDtcblx0fSxcblx0XG5cdGZldGNoUHJvZ2VzczogZnVuY3Rpb24oZWwpIHtcblx0XHRsZXQgc2VsZWN0X29iaiA9IG51bGxcblx0XHRsZXQgX2lkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzX2lkJylcblx0XHRcblx0XHR0aGlzLm1haW5PYmplY3RzLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdGlmIChpdGVtLmlkID09IF9pZCkge1xuXHRcdFx0XHRzZWxlY3Rfb2JqID0gaXRlbTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdGlmICghc2VsZWN0X29iaikgcmV0dXJuO1xuXHRcdFxuXHRcdGxldCBmaWx0ZXIgPSBzZWxlY3Rfb2JqLmZpbHRlcjtcblx0XHRjb25zb2xlLmxvZyhmaWx0ZXIpXG5cdFx0bGV0IHRvdGFsRmlsdGVyID0gQ29DcmVhdGVGaWx0ZXIubWFrZUZldGNoT3B0aW9ucyhmaWx0ZXIpO1xuXHRcdGxldCB2YWx1ZUZpbHRlciA9IENvQ3JlYXRlRmlsdGVyLm1ha2VGZXRjaE9wdGlvbnMoZmlsdGVyKVxuXG5cdFx0bGV0IHByb2dyZXNzTmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc19uYW1lJylcblx0XHRsZXQgcHJvZ3Jlc3NWYWx1ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzc192YWx1ZScpXG5cdFx0XG5cdFx0bGV0IHZhbHVlT3BlcmF0b3IgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3Nfb3BlcmF0b3InKSB8fCBcImNvbnRhaW5cIlxuXHRcdFxuXHRcdHRvdGFsRmlsdGVyWydtZXRhZGF0YSddID0gJ3Byb2dyZXNzLXRvdGFsJztcblx0XHR2YWx1ZUZpbHRlclsnbWV0YWRhdGEnXSA9ICdwcm9ncmVzcy12YWx1ZSdcblx0XHRcblx0XHRsZXQgdmFsX2ZpbHRlciA9IFtdLmNvbmNhdCh2YWx1ZUZpbHRlclsnb3BlcmF0b3InXVsnZmlsdGVycyddKTtcblx0XHR2YWxfZmlsdGVyLnB1c2goe25hbWU6IHByb2dyZXNzTmFtZSwgdmFsdWU6IFtwcm9ncmVzc1ZhbHVlXSwgb3BlcmF0b3I6IHZhbHVlT3BlcmF0b3J9KTtcblx0XHR2YWx1ZUZpbHRlclsnb3BlcmF0b3InXVsnZmlsdGVycyddID0gdmFsX2ZpbHRlcjtcblxuXHRcdENvQ3JlYXRlLnJlYWREb2N1bWVudExpc3QodG90YWxGaWx0ZXIpXG5cdFx0Q29DcmVhdGUucmVhZERvY3VtZW50TGlzdCh2YWx1ZUZpbHRlcilcblx0fVxufVxuXG5Db0NyZWF0ZVByb2dyZXNzLmluaXQoKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29DcmVhdGVQcm9ncmVzcztcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./CoCreate-components/CoCreate-progress/src/CoCreate-progress.js\n");

/***/ })

/******/ })["default"];
});