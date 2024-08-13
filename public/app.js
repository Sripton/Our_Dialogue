/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Pages_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pages/Navbar */ \"./src/components/Pages/Navbar/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n\nfunction App() {\n  // const [isMobileDevice, setIsMobileDevice] = useState(false);\n  // const [isArrowActive, setIsArrowActive] = useState(false);\n  // const isMobile = {\n  //   Android: function () {\n  //     return navigator.userAgent.match(/Android/i);\n  //   },\n  //   Blackberry: function () {\n  //     return navigator.userAgent.match(/Blackberry/i);\n  //   },\n  //   IOS: function () {\n  //     return navigator.userAgent.match(/iPhone|iPad|iPod/i);\n  //   },\n  //   Opera: function () {\n  //     return navigator.userAgent.match(/Opera Mini/i);\n  //   },\n  //   Windows: function () {\n  //     return navigator.userAgent.match(/IEMobile/i);\n  //   },\n  //   any: function () {\n  //     return (\n  //       isMobile.Android() ||\n  //       isMobile.Blackberry() ||\n  //       isMobile.IOS() ||\n  //       isMobile.Opera() ||\n  //       isMobile.Windows()\n  //     );\n  //   },\n  // };\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState2 = _slicedToArray(_useState, 2),\n    isMobileDevice = _useState2[0],\n    setIsMobileDevice = _useState2[1];\n  var isMobile = {\n    Android: function Android() {\n      return navigator.userAgent.match(/Android/gi);\n    },\n    Blackberry: function Blackberry() {\n      return navigator.userAgent.match(/Blackberry/gi);\n    },\n    IOS: function IOS() {\n      return navigator.userAgent.match(/iPhone|iPad|iPod/gi);\n    },\n    Opera: function Opera() {\n      return navigator.userAgent.match(/Opera Mini/gi);\n    },\n    Windows: function Windows() {\n      return navigator.userAgent.match(/IEMobile/gi);\n    },\n    any: function any() {\n      return isMobile.Android() || isMobile.Blackberry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows();\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    var mobileDevice = isMobile.any();\n    setIsMobileDevice(mobileDevice);\n    if (mobileDevice) {\n      document.body.classList.add(\"_touch\");\n      document.body.classList.remove(\"_pc\");\n    } else {\n      document.body.classList.add(\"_pc\");\n      document.body.classList.remove(\"_touch\");\n    }\n    return function () {\n      document.body.classList.remove(\"_touch\");\n      document.body.classList.remove(\"_pc\");\n    };\n  }, []);\n  // useEffect(() => {\n  //   const mobileDevide = isMobile.any();\n  //   setIsMobileDevice(mobileDevide);\n  //   if (mobileDevide) {\n  //     document.body.classList.add(\"_touch\");\n  //     document.body.classList.remove(\"_pc\");\n  //   } else {\n  //     document.body.classList.remove(\"_touch\");\n  //     document.body.classList.add(\"_pc\");\n  //   }\n  //   return () => {\n  //     document.body.classList.remove(\"_touch\");\n  //     document.body.classList.remove(\"_pc\");\n  //   };\n  // }, []);\n\n  // const handleArrowClick = () => {\n  //   setIsArrowActive(!isArrowActive);\n  // };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Route, {\n    path: \"/\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Pages_Navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null)\n  })));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBQSxDQUFBQSx1REFBQSxxQkFDRUEsMERBQUEsQ0FBQ0ssb0RBQU0scUJBQ0xMLDBEQUFBLENBQUNJLG1EQUFLO0lBQUMwQixJQUFJLEVBQUMsR0FBRztJQUFDQyxPQUFPLGVBQUUvQiwwREFBQSxDQUFDRyxxREFBTSxNQUFFO0VBQUUsQ0FBRSxDQUNoQyxDQUNSLENBQUM7QUFFUCIsInNvdXJjZXMiOlsid2VicGFjazovL291cl9kaWFsb2d1ZS8uL3NyYy9jb21wb25lbnRzL0FwcC5qc3g/YzU4YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi9QYWdlcy9OYXZiYXJcIjtcbmltcG9ydCB7IFJvdXRlLCBSb3V0ZXMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICAvLyBjb25zdCBbaXNNb2JpbGVEZXZpY2UsIHNldElzTW9iaWxlRGV2aWNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgLy8gY29uc3QgW2lzQXJyb3dBY3RpdmUsIHNldElzQXJyb3dBY3RpdmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAvLyBjb25zdCBpc01vYmlsZSA9IHtcbiAgLy8gICBBbmRyb2lkOiBmdW5jdGlvbiAoKSB7XG4gIC8vICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcbiAgLy8gICB9LFxuICAvLyAgIEJsYWNrYmVycnk6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja2JlcnJ5L2kpO1xuICAvLyAgIH0sXG4gIC8vICAgSU9TOiBmdW5jdGlvbiAoKSB7XG4gIC8vICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKTtcbiAgLy8gICB9LFxuICAvLyAgIE9wZXJhOiBmdW5jdGlvbiAoKSB7XG4gIC8vICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKTtcbiAgLy8gICB9LFxuICAvLyAgIFdpbmRvd3M6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZS9pKTtcbiAgLy8gICB9LFxuICAvLyAgIGFueTogZnVuY3Rpb24gKCkge1xuICAvLyAgICAgcmV0dXJuIChcbiAgLy8gICAgICAgaXNNb2JpbGUuQW5kcm9pZCgpIHx8XG4gIC8vICAgICAgIGlzTW9iaWxlLkJsYWNrYmVycnkoKSB8fFxuICAvLyAgICAgICBpc01vYmlsZS5JT1MoKSB8fFxuICAvLyAgICAgICBpc01vYmlsZS5PcGVyYSgpIHx8XG4gIC8vICAgICAgIGlzTW9iaWxlLldpbmRvd3MoKVxuICAvLyAgICAgKTtcbiAgLy8gICB9LFxuICAvLyB9O1xuICBjb25zdCBbaXNNb2JpbGVEZXZpY2UsIHNldElzTW9iaWxlRGV2aWNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBpc01vYmlsZSA9IHtcbiAgICBBbmRyb2lkOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9naSk7XG4gICAgfSxcbiAgICBCbGFja2JlcnJ5OiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tiZXJyeS9naSk7XG4gICAgfSxcbiAgICBJT1M6ICgpID0+IHtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2dpKTtcbiAgICB9LFxuICAgIE9wZXJhOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9naSk7XG4gICAgfSxcbiAgICBXaW5kb3dzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvZ2kpO1xuICAgIH0sXG4gICAgYW55OiAoKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpc01vYmlsZS5BbmRyb2lkKCkgfHxcbiAgICAgICAgaXNNb2JpbGUuQmxhY2tiZXJyeSgpIHx8XG4gICAgICAgIGlzTW9iaWxlLklPUygpIHx8XG4gICAgICAgIGlzTW9iaWxlLk9wZXJhKCkgfHxcbiAgICAgICAgaXNNb2JpbGUuV2luZG93cygpXG4gICAgICApO1xuICAgIH0sXG4gIH07XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbW9iaWxlRGV2aWNlID0gaXNNb2JpbGUuYW55KCk7XG4gICAgc2V0SXNNb2JpbGVEZXZpY2UobW9iaWxlRGV2aWNlKTtcbiAgICBpZiAobW9iaWxlRGV2aWNlKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfdG91Y2hcIik7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfcGNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9wY1wiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl90b3VjaFwiKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl90b3VjaFwiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9wY1wiKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIC8vIHVzZUVmZmVjdCgoKSA9PiB7XG4gIC8vICAgY29uc3QgbW9iaWxlRGV2aWRlID0gaXNNb2JpbGUuYW55KCk7XG4gIC8vICAgc2V0SXNNb2JpbGVEZXZpY2UobW9iaWxlRGV2aWRlKTtcbiAgLy8gICBpZiAobW9iaWxlRGV2aWRlKSB7XG4gIC8vICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJfdG91Y2hcIik7XG4gIC8vICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJfcGNcIik7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl90b3VjaFwiKTtcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIl9wY1wiKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuICgpID0+IHtcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl90b3VjaFwiKTtcbiAgLy8gICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIl9wY1wiKTtcbiAgLy8gICB9O1xuICAvLyB9LCBbXSk7XG5cbiAgLy8gY29uc3QgaGFuZGxlQXJyb3dDbGljayA9ICgpID0+IHtcbiAgLy8gICBzZXRJc0Fycm93QWN0aXZlKCFpc0Fycm93QWN0aXZlKTtcbiAgLy8gfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Um91dGVzPlxuICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TmF2YmFyIC8+fSAvPlxuICAgICAgPC9Sb3V0ZXM+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk5hdmJhciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwiaXNNb2JpbGVEZXZpY2UiLCJzZXRJc01vYmlsZURldmljZSIsImlzTW9iaWxlIiwiQW5kcm9pZCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiQmxhY2tiZXJyeSIsIklPUyIsIk9wZXJhIiwiV2luZG93cyIsImFueSIsIm1vYmlsZURldmljZSIsImRvY3VtZW50IiwiYm9keSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsInBhdGgiLCJlbGVtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/App.jsx\n");

/***/ }),

/***/ "./src/components/Pages/Navbar/Navbar.jsx":
/*!************************************************!*\
  !*** ./src/components/Pages/Navbar/Navbar.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navbar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Navbar(_ref) {\n  var isArrowActive = _ref.isArrowActive,\n    handleArrowClick = _ref.handleArrowClick;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"wrapper\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"header\", {\n    className: \"header\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"header__container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"#\",\n    className: \"header__logo\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"header__menu menu\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"menu__icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"nav\", {\n    className: \"menu__body\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", {\n    className: \"menu__list\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__link\"\n  }, \"\\u041F\\u0435\\u0440\\u0432\\u044B\\u0439 \\u043F\\u0443\\u043D\\u043A\\u0442\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__link\"\n  }, \"\\u0412\\u0442\\u043E\\u0440\\u043E\\u0439 \\u043F\\u0443\\u043D\\u043A\\u0442\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__link\"\n  }, \"\\u0422\\u0440\\u0435\\u0442\\u0438\\u0439 \\u043F\\u0443\\u043D\\u043A\\u0442\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"menu__arrow\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", {\n    className: \"menu__sub-list\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__sub-link\"\n  }, \"1 \\u043F\\u043E\\u0434\\u043F\\u0443\\u043D\\u043A\\u0442 3-\\u0433\\u043E \\u043C\\u0435\\u043D\\u044E\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__sub-link\"\n  }, \"2 \\u043F\\u043E\\u0434\\u043F\\u0443\\u043D\\u043A\\u0442 3-\\u0433\\u043E \\u043C\\u0435\\u043D\\u044E\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__sub-link\"\n  }, \"3 \\u043F\\u043E\\u0434\\u043F\\u0443\\u043D\\u043A\\u0442 3-\\u0433\\u043E \\u043C\\u0435\\u043D\\u044E\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__link\"\n  }, \"\\u0427\\u0435\\u0442\\u0432\\u0435\\u0440\\u0442\\u044B\\u0439 \\u043F\\u0443\\u043D\\u043A\\u0442\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    className: \"menu__link\"\n  }, \"\\u0412\\u0445\\u043E\\u0434\"))))))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9QYWdlcy9OYXZiYXIvTmF2YmFyLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEI7QUFFWCxTQUFTQyxNQUFNQSxDQUFBQyxJQUFBLEVBQXNDO0VBQUEsSUFBbkNDLGFBQWEsR0FBQUQsSUFBQSxDQUFiQyxhQUFhO0lBQUVDLGdCQUFnQixHQUFBRixJQUFBLENBQWhCRSxnQkFBZ0I7RUFDOUQsb0JBQ0VKLDBEQUFBO0lBQUtNLFNBQVMsRUFBQztFQUFTLGdCQUN0Qk4sMERBQUE7SUFBUU0sU0FBUyxFQUFDO0VBQVEsZ0JBQ3hCTiwwREFBQTtJQUFLTSxTQUFTLEVBQUM7RUFBbUIsZ0JBQ2hDTiwwREFBQTtJQUFHTyxJQUFJLEVBQUMsR0FBRztJQUFDRCxTQUFTLEVBQUM7RUFBYyxDQUFJLENBQUMsZUFFekNOLDBEQUFBO0lBQUtNLFNBQVMsRUFBQztFQUFtQixnQkFDaENOLDBEQUFBO0lBQUtNLFNBQVMsRUFBQztFQUFZLGdCQUN6Qk4sMERBQUEsYUFBWSxDQUNULENBQUMsZUFDTkEsMERBQUE7SUFBS00sU0FBUyxFQUFDO0VBQVksZ0JBQ3pCTiwwREFBQTtJQUFJTSxTQUFTLEVBQUM7RUFBWSxnQkFDeEJOLDBEQUFBLDBCQUNFQSwwREFBQTtJQUFHTSxTQUFTLEVBQUM7RUFBWSxHQUFDLHFFQUFlLENBQ3ZDLENBQUMsZUFDTE4sMERBQUEsMEJBQ0VBLDBEQUFBO0lBQUdNLFNBQVMsRUFBQztFQUFZLEdBQUMscUVBQWUsQ0FDdkMsQ0FBQyxlQUNMTiwwREFBQSwwQkFDRUEsMERBQUE7SUFBR00sU0FBUyxFQUFDO0VBQVksR0FBQyxxRUFBZSxDQUFDLGVBQzFDTiwwREFBQTtJQUFNTSxTQUFTLEVBQUM7RUFBYSxDQUFPLENBQUMsZUFDckNOLDBEQUFBO0lBQUlNLFNBQVMsRUFBQztFQUFnQixnQkFDNUJOLDBEQUFBLDBCQUNFQSwwREFBQTtJQUFHTSxTQUFTLEVBQUM7RUFBZ0IsR0FBQyw0RkFBdUIsQ0FDbkQsQ0FBQyxlQUNMTiwwREFBQSwwQkFDRUEsMERBQUE7SUFBR00sU0FBUyxFQUFDO0VBQWdCLEdBQUMsNEZBQXVCLENBQ25ELENBQUMsZUFDTE4sMERBQUEsMEJBQ0VBLDBEQUFBO0lBQUdNLFNBQVMsRUFBQztFQUFnQixHQUFDLDRGQUF1QixDQUNuRCxDQUNGLENBQ0YsQ0FBQyxlQUNMTiwwREFBQSwwQkFDRUEsMERBQUE7SUFBR00sU0FBUyxFQUFDO0VBQVksR0FBQyx1RkFBa0IsQ0FDMUMsQ0FBQyxlQUNMTiwwREFBQSwwQkFDRUEsMERBQUE7SUFBR00sU0FBUyxFQUFDO0VBQVksR0FBQywwQkFBTyxDQUMvQixDQUNGLENBQ0QsQ0FDRixDQUNGLENBQ0MsQ0FDTCxDQUFDO0FBRVYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdXJfZGlhbG9ndWUvLi9zcmMvY29tcG9uZW50cy9QYWdlcy9OYXZiYXIvTmF2YmFyLmpzeD81NDEzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2YmFyKHsgaXNBcnJvd0FjdGl2ZSwgaGFuZGxlQXJyb3dDbGljayB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl9fY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJoZWFkZXJfX2xvZ29cIj48L2E+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl9fbWVudSBtZW51XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVfX2ljb25cIj5cbiAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm1lbnVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm1lbnVfX2xpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJtZW51X19saW5rXCI+0J/QtdGA0LLRi9C5INC/0YPQvdC60YI8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJtZW51X19saW5rXCI+0JLRgtC+0YDQvtC5INC/0YPQvdC60YI8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJtZW51X19saW5rXCI+0KLRgNC10YLQuNC5INC/0YPQvdC60YI8L2E+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtZW51X19hcnJvd1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtZW51X19zdWItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVudV9fc3ViLWxpbmtcIj4xINC/0L7QtNC/0YPQvdC60YIgMy3Qs9C+INC80LXQvdGOPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVudV9fc3ViLWxpbmtcIj4yINC/0L7QtNC/0YPQvdC60YIgMy3Qs9C+INC80LXQvdGOPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVudV9fc3ViLWxpbmtcIj4zINC/0L7QtNC/0YPQvdC60YIgMy3Qs9C+INC80LXQvdGOPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm1lbnVfX2xpbmtcIj7Qp9C10YLQstC10YDRgtGL0Lkg0L/Rg9C90LrRgjwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm1lbnVfX2xpbmtcIj7QktGF0L7QtDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJOYXZiYXIiLCJfcmVmIiwiaXNBcnJvd0FjdGl2ZSIsImhhbmRsZUFycm93Q2xpY2siLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaHJlZiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Pages/Navbar/Navbar.jsx\n");

/***/ }),

/***/ "./src/components/Pages/Navbar/index.js":
/*!**********************************************!*\
  !*** ./src/components/Pages/Navbar/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Navbar__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar */ "./src/components/Pages/Navbar/Navbar.jsx");


/***/ }),

/***/ "./src/components/index.jsx":
/*!**********************************!*\
  !*** ./src/components/index.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ \"./src/components/App.jsx\");\n\n\n\n\nreact_dom_client__WEBPACK_IMPORTED_MODULE_1__.hydrateRoot(document.getElementById(\"root\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], window.initState)));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9pbmRleC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBQ29CO0FBQ0c7QUFDekI7QUFFeEJDLHlEQUEwQixDQUN4QkksUUFBUSxDQUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQy9CTiwwREFBQSxDQUFDRSwyREFBYSxxQkFDWkYsMERBQUEsQ0FBQ0csNENBQUcsRUFBS0ssTUFBTSxDQUFDQyxTQUFZLENBQ2YsQ0FDakIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL291cl9kaWFsb2d1ZS8uL3NyYy9jb21wb25lbnRzL2luZGV4LmpzeD80ZTIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTUNsaWVudCBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcFwiO1xuXG5SZWFjdERPTUNsaWVudC5oeWRyYXRlUm9vdChcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLFxuICA8QnJvd3NlclJvdXRlcj5cbiAgICA8QXBwIHsuLi53aW5kb3cuaW5pdFN0YXRlfSAvPlxuICA8L0Jyb3dzZXJSb3V0ZXI+XG4pO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET01DbGllbnQiLCJCcm93c2VyUm91dGVyIiwiQXBwIiwiaHlkcmF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImluaXRTdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/index.jsx\n");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = this["webpackChunkour_dialogue"] = this["webpackChunkour_dialogue"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/components/index.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;