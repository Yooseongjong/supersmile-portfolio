"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/nanoevents";
exports.ids = ["vendor-chunks/nanoevents"];
exports.modules = {

/***/ "(ssr)/./node_modules/nanoevents/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoevents/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createNanoEvents: () => (/* binding */ createNanoEvents)\n/* harmony export */ });\nlet createNanoEvents = ()=>({\n        emit (event, ...args) {\n            for(let callbacks = this.events[event] || [], i = 0, length = callbacks.length; i < length; i++){\n                callbacks[i](...args);\n            }\n        },\n        events: {},\n        on (event, cb) {\n            ;\n            (this.events[event] ||= []).push(cb);\n            return ()=>{\n                this.events[event] = this.events[event]?.filter((i)=>cb !== i);\n            };\n        }\n    });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbmFub2V2ZW50cy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBSUEsbUJBQW1CLElBQU87UUFDbkNDLE1BQUtDLEtBQUssRUFBRSxHQUFHQyxJQUFJO1lBQ2pCLElBQ0UsSUFBSUMsWUFBWSxJQUFJLENBQUNDLE1BQU0sQ0FBQ0gsTUFBTSxJQUFJLEVBQUUsRUFDdENJLElBQUksR0FDSkMsU0FBU0gsVUFBVUcsTUFBTSxFQUMzQkQsSUFBSUMsUUFDSkQsSUFDQTtnQkFDQUYsU0FBUyxDQUFDRSxFQUFFLElBQUlIO1lBQ2xCO1FBQ0Y7UUFDQUUsUUFBUSxDQUFDO1FBQ1RHLElBQUdOLEtBQUssRUFBRU8sRUFBRTs7WUFDUixLQUFJLENBQUNKLE1BQU0sQ0FBQ0gsTUFBTSxLQUFLLEVBQUUsRUFBRVEsSUFBSSxDQUFDRDtZQUNsQyxPQUFPO2dCQUNMLElBQUksQ0FBQ0osTUFBTSxDQUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDRyxNQUFNLENBQUNILE1BQU0sRUFBRVMsT0FBT0wsQ0FBQUEsSUFBS0csT0FBT0g7WUFDOUQ7UUFDRjtJQUNGLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXBlcnNtaWxlLWNyZWF0aXZlLy4vbm9kZV9tb2R1bGVzL25hbm9ldmVudHMvaW5kZXguanM/YzVmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbGV0IGNyZWF0ZU5hbm9FdmVudHMgPSAoKSA9PiAoe1xuICBlbWl0KGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgZm9yIChcbiAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLmV2ZW50c1tldmVudF0gfHwgW10sXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoO1xuICAgICAgaSA8IGxlbmd0aDtcbiAgICAgIGkrK1xuICAgICkge1xuICAgICAgY2FsbGJhY2tzW2ldKC4uLmFyZ3MpXG4gICAgfVxuICB9LFxuICBldmVudHM6IHt9LFxuICBvbihldmVudCwgY2IpIHtcbiAgICA7KHRoaXMuZXZlbnRzW2V2ZW50XSB8fD0gW10pLnB1c2goY2IpXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IHRoaXMuZXZlbnRzW2V2ZW50XT8uZmlsdGVyKGkgPT4gY2IgIT09IGkpXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbImNyZWF0ZU5hbm9FdmVudHMiLCJlbWl0IiwiZXZlbnQiLCJhcmdzIiwiY2FsbGJhY2tzIiwiZXZlbnRzIiwiaSIsImxlbmd0aCIsIm9uIiwiY2IiLCJwdXNoIiwiZmlsdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/nanoevents/index.js\n");

/***/ })

};
;