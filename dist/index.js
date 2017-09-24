(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-js-grid"] = factory();
	else
		root["vue-js-grid"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(13)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(11),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _window_size = __webpack_require__(7);

var _window_size2 = _interopRequireDefault(_window_size);

var _GridItem = __webpack_require__(10);

var _GridItem2 = _interopRequireDefault(_GridItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Grid',
  mixins: [_window_size2.default],
  components: { GridItem: _GridItem2.default },
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cellWidth: {
      type: Number,
      default: 80
    },
    cellHeight: {
      type: Number,
      default: 80
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragDelay: {
      type: Number,
      default: 0
    },
    sortable: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      list: []
    };
  },

  watch: {
    items: {
      handler: function handler() {
        var nextItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.list = nextItems.map(function (item) {
          return {
            item: item,
            index: item.index,
            sort: item.index
          };
        });
      },
      immediate: true
    }
  },
  computed: {
    height: function height() {
      return Math.ceil(this.items.length / this.rowCount) * this.cellHeight;
    },
    style: function style() {
      return {
        height: this.height + 'px'
      };
    },
    rowCount: function rowCount() {
      return Math.floor(this.windowWidth / this.cellWidth);
    },
    rowShift: function rowShift() {
      if (this.center) {
        var contentWidth = this.items.length * this.cellWidth;
        var rowShift = contentWidth < this.windowWidth ? (this.windowWidth - contentWidth) / 2 : this.windowWidth % this.cellWidth / 2;

        return Math.floor(rowShift);
      }

      return 0;
    }
  },
  methods: {
    wrapEvent: function wrapEvent() {
      var other = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({
        items: this.getListClone()
      }, other);
    },
    getListClone: function getListClone() {
      return this.list.slice(0).sort(function (a, b) {
        return a.sort - b.sort;
      }).map(function (v) {
        return _extends({}, v.item);
      });
    },
    removeItem: function removeItem(_ref) {
      var index = _ref.index;

      var removeItem = this.list.find(function (v) {
        return v.index === index;
      });
      var removeItemSort = removeItem.sort;

      this.list = this.list.filter(function (v) {
        return v.index !== index;
      }).map(function (v) {
        var sort = v.sort > removeItemSort ? v.sort - 1 : v.sort;

        return _extends({}, v, { sort: sort });
      });

      this.$emit('remove', this.wrapEvent({ index: index }));
    },
    onDragStart: function onDragStart(event) {
      this.$emit('dragstart', this.wrapEvent(event));
    },
    onDragEnd: function onDragEnd(event) {
      this.$emit('dragend', this.wrapEvent(event));
    },
    click: function click(event) {
      this.$emit('click', this.wrapEvent(event));
    },
    onDrag: function onDrag(event) {
      if (this.sortable) {
        this.sortList(event.index, event.gridPosition);
      }

      this.$emit('drag', this.wrapEvent({ event: event }));
    },
    sortList: function sortList(itemIndex, gridPosition) {
      var targetItem = this.list.find(function (item) {
        return item.index === itemIndex;
      });
      var targetItemSort = targetItem.sort;

      gridPosition = Math.max(gridPosition, 0);

      gridPosition = Math.min(gridPosition, this.list.length - 1);

      if (targetItemSort !== gridPosition) {
        this.list = this.list.map(function (item) {
          if (item.index === targetItem.index) {
            return _extends({}, item, {
              sort: gridPosition
            });
          }

          var sort = item.sort;


          if (targetItemSort > gridPosition) {
            if (sort <= targetItemSort && sort >= gridPosition) {
              return _extends({}, item, {
                sort: sort + 1
              });
            }
          }

          if (targetItemSort < gridPosition) {
            if (sort >= targetItemSort && sort <= gridPosition) {
              return _extends({}, item, {
                sort: sort - 1
              });
            }
          }

          return item;
        });

        this.$emit('sort', this.wrapEvent());
      }
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var CLICK_PIXEL_DISTANCE = 2;

exports.default = {
  name: 'GridItem',
  props: {
    index: {
      type: Number
    },
    sort: {
      type: Number
    },
    cellWidth: {
      type: Number
    },
    cellHeight: {
      type: Number
    },
    rowCount: {
      type: Number
    },
    rowShift: {
      type: Number,
      default: 0
    },
    draggable: {
      type: Boolean
    },
    dragDelay: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      animate: true,
      dragging: false,

      shiftStartX: 0,
      shiftStartY: 0,

      mouseMoveStartX: 0,
      mouseMoveStartY: 0,

      shiftX: 0,
      shiftY: 0,

      timer: null,

      zIndex: 1
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$refs.self.addEventListener('transitionend', function (event) {
      if (!_this.dragging) {
        _this.zIndex = 1;
      }
    }, false);
  },

  computed: {
    className: function className() {
      var animate = this.animate,
          dragging = this.dragging;


      return ['v-grid-item-wrapper', {
        'v-grid-item-animate': animate,
        'v-grid-item-dragging': dragging
      }];
    },
    style: function style() {
      var zIndex = this.zIndex,
          cellWidth = this.cellWidth,
          cellHeight = this.cellHeight,
          top = this.top,
          left = this.left;


      return {
        zIndex: zIndex,
        width: cellWidth + 'px',
        height: cellHeight + 'px',
        transform: 'translate3d(' + left + 'px, ' + top + 'px, 0)'
      };
    },
    left: function left() {
      return this.dragging ? this.shiftX : this.rowShift + this.sort % this.rowCount * this.cellWidth;
    },
    top: function top() {
      return this.dragging ? this.shiftY : Math.floor(this.sort / this.rowCount) * this.cellHeight;
    }
  },
  methods: {
    wrapEvent: function wrapEvent(event) {
      var index = this.index,
          sort = this.sort;

      return { event: event, index: index, sort: sort };
    },
    dragStart: function dragStart(event) {
      this.zIndex = 2;

      this.shiftX = this.shiftStartX = this.left;
      this.shiftY = this.shiftStartY = this.top;

      this.mouseMoveStartX = event.pageX;
      this.mouseMoveStartY = event.pageY;

      this.animate = false;
      this.dragging = true;

      document.addEventListener('mousemove', this.documentMouseMove);

      this.$emit('dragstart', this.wrapEvent(event));
    },
    drag: function drag(event) {
      var distanceX = event.pageX - this.mouseMoveStartX;
      var distanceY = event.pageY - this.mouseMoveStartY;

      this.shiftX = distanceX + this.shiftStartX;
      this.shiftY = distanceY + this.shiftStartY;

      var gridX = Math.round(this.shiftX / this.cellWidth);
      var gridY = Math.round(this.shiftY / this.cellHeight);

      gridX = Math.min(gridX, this.rowCount - 1);
      gridY = Math.max(gridY, 0);

      var gridPosition = gridX + gridY * this.rowCount;

      var $event = {
        event: event,
        distanceX: distanceX,
        distanceY: distanceY,
        positionX: this.shiftX,
        positionY: this.shiftY,
        index: this.index,
        gridX: gridX,
        gridY: gridY,
        gridPosition: gridPosition
      };

      this.$emit('drag', $event);
    },
    mousedown: function mousedown(event) {
      var _this2 = this;

      if (this.draggable) {
        this.timer = setTimeout(function () {
          _this2.dragStart(event);
        }, this.dragDelay);

        document.addEventListener('mouseup', this.documentMouseUp);
      }
    },
    documentMouseMove: function documentMouseMove(event) {
      if (this.draggable && this.dragging) {
        this.drag(event);
      }
    },
    documentMouseUp: function documentMouseUp(event) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      var dx = this.shiftStartX - this.shiftX;
      var dy = this.shiftStartY - this.shiftY;

      var distance = Math.sqrt(dx * dx + dy * dy);

      this.animate = true;
      this.dragging = false;
      this.mouseMoveStartX = 0;
      this.mouseMoveStartY = 0;
      this.shiftStartX = 0;
      this.shiftStartY = 0;

      document.removeEventListener('mousemove', this.documentMouseMove);
      document.removeEventListener('mouseup', this.documentMouseUp);

      var $event = this.wrapEvent(event);

      if (distance < CLICK_PIXEL_DISTANCE) {
        this.$emit('click', $event);
      }

      this.$emit('dragend', $event);
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Grid = __webpack_require__(3);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    Vue.component('Grid', _Grid2.default);
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      windowHeight: 0,
      windowWidth: 0
    };
  },
  created: function created() {
    window.addEventListener('resize', this.getWindowSize);
    this.getWindowSize();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },


  methods: {
    getWindowSize: function getWindowSize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "body{margin:0;padding:0}.v-grid{display:block;position:relative;width:100%}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-grid-item-wrapper{display:block;position:absolute;box-sizing:border-box;left:0;top:0;user-select:none;transform:translateZ(0);z-index:1}.v-grid-item-wrapper.v-grid-item-animate{transition:transform .8s ease}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(14)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(12),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-grid",
    style: (_vm.style)
  }, _vm._l((_vm.list), function(v) {
    return _c('GridItem', {
      key: v.index,
      attrs: {
        "index": v.index,
        "sort": v.sort,
        "draggable": _vm.draggable,
        "drag-delay": _vm.dragDelay,
        "row-count": _vm.rowCount,
        "cell-width": _vm.cellWidth,
        "cell-height": _vm.cellHeight,
        "window-width": _vm.windowWidth,
        "row-shift": _vm.rowShift
      },
      on: {
        "dragstart": _vm.onDragStart,
        "dragend": _vm.onDragEnd,
        "drag": _vm.onDrag,
        "click": _vm.click
      }
    }, [_vm._t("cell", null, {
      item: v.item,
      index: v.index,
      sort: v.sort,
      remove: function () {
        _vm.removeItem(v)
      }
    })], 2)
  }))
},staticRenderFns: []}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "self",
    class: _vm.className,
    style: (_vm.style),
    on: {
      "mousedown": _vm.mousedown
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a97df14", content, true);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4be927ea", content, true);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map