!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports["vue-js-grid"] = factory() : root["vue-js-grid"] = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "/dist/", __webpack_require__(__webpack_require__.s = 6);
    }([ function(module, exports) {
        module.exports = function() {
            var list = [];
            return list.toString = function() {
                for (var result = [], i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, function(module, exports) {
        module.exports = function(rawScriptExports, compiledTemplate, scopeId, cssModules) {
            var esModule, scriptExports = rawScriptExports = rawScriptExports || {}, type = typeof rawScriptExports.default;
            "object" !== type && "function" !== type || (esModule = rawScriptExports, scriptExports = rawScriptExports.default);
            var options = "function" == typeof scriptExports ? scriptExports.options : scriptExports;
            if (compiledTemplate && (options.render = compiledTemplate.render, options.staticRenderFns = compiledTemplate.staticRenderFns), 
            scopeId && (options._scopeId = scopeId), cssModules) {
                var computed = Object.create(options.computed || null);
                Object.keys(cssModules).forEach(function(key) {
                    var module = cssModules[key];
                    computed[key] = function() {
                        return module;
                    };
                }), options.computed = computed;
            }
            return {
                esModule: esModule,
                exports: scriptExports,
                options: options
            };
        };
    }, function(module, exports, __webpack_require__) {
        function addStylesToDom(styles) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j]));
                    domStyle.parts.length > item.parts.length && (domStyle.parts.length = item.parts.length);
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j]));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function createStyleElement() {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", head.appendChild(styleElement), styleElement;
        }
        function addStyle(obj) {
            var update, remove, styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');
            if (styleElement) {
                if (isProduction) return noop;
                styleElement.parentNode.removeChild(styleElement);
            }
            if (isOldIE) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement()), update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), 
                remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else styleElement = createStyleElement(), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                styleElement.parentNode.removeChild(styleElement);
            };
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
            if (media && styleElement.setAttribute("media", media), sourceMap && (css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */", 
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), 
            styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        var hasDocument = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !hasDocument) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var listToStyles = __webpack_require__(15), stylesInDom = {}, head = hasDocument && (document.head || document.getElementsByTagName("head")[0]), singletonElement = null, singletonCounter = 0, isProduction = !1, noop = function() {}, isOldIE = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        module.exports = function(parentId, list, _isProduction) {
            isProduction = _isProduction;
            var styles = listToStyles(parentId, list);
            return addStylesToDom(styles), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                newList ? (styles = listToStyles(parentId, newList), addStylesToDom(styles)) : styles = [];
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(13);
        var Component = __webpack_require__(1)(__webpack_require__(4), __webpack_require__(11), null, null);
        module.exports = Component.exports;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _window_size = __webpack_require__(7), _window_size2 = _interopRequireDefault(_window_size), _GridItem = __webpack_require__(10), _GridItem2 = _interopRequireDefault(_GridItem);
        exports.default = {
            name: "Grid",
            mixins: [ _window_size2.default ],
            components: {
                GridItem: _GridItem2.default
            },
            props: {
                items: {
                    type: Array,
                    default: function() {
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
                    default: !1
                },
                dragDelay: {
                    type: Number,
                    default: 0
                },
                sortable: {
                    type: Boolean,
                    default: !1
                },
                center: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    list: []
                };
            },
            watch: {
                items: {
                    handler: function() {
                        var nextItems = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                        this.list = nextItems.map(function(item, index) {
                            return {
                                item: item,
                                index: index,
                                sort: index
                            };
                        });
                    },
                    immediate: !0
                }
            },
            computed: {
                height: function() {
                    return Math.ceil(this.items.length / this.rowCount) * this.cellHeight;
                },
                style: function() {
                    return {
                        height: this.height + "px"
                    };
                },
                rowCount: function() {
                    return Math.floor(this.windowWidth / this.cellWidth);
                },
                rowShift: function() {
                    if (this.center) {
                        var contentWidth = this.items.length * this.cellWidth, rowShift = contentWidth < this.windowWidth ? (this.windowWidth - contentWidth) / 2 : this.windowWidth % this.cellWidth / 2;
                        return Math.floor(rowShift);
                    }
                    return 0;
                }
            },
            methods: {
                wrapEvent: function() {
                    var other = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return _extends({
                        datetime: Date.now(),
                        items: this.getListClone()
                    }, other);
                },
                getListClone: function() {
                    return this.list.slice(0).sort(function(a, b) {
                        return a.sort - b.sort;
                    });
                },
                removeItem: function(_ref) {
                    var index = _ref.index, removeItem = this.list.find(function(v) {
                        return v.index === index;
                    }), removeItemSort = removeItem.sort;
                    this.list = this.list.filter(function(v) {
                        return v.index !== index;
                    }).map(function(v) {
                        var sort = v.sort > removeItemSort ? v.sort - 1 : v.sort;
                        return _extends({}, v, {
                            sort: sort
                        });
                    }), this.$emit("remove", this.wrapEvent({
                        index: index
                    }));
                },
                onDragStart: function(event) {
                    this.$emit("dragstart", this.wrapEvent(event));
                },
                onDragEnd: function(event) {
                    this.$emit("dragend", this.wrapEvent(event));
                },
                click: function(event) {
                    this.$emit("click", this.wrapEvent(event));
                },
                onDrag: function(event) {
                    this.sortable && this.sortList(event.index, event.gridPosition), this.$emit("drag", this.wrapEvent({
                        event: event
                    }));
                },
                sortList: function(itemIndex, gridPosition) {
                    var targetItem = this.list.find(function(item) {
                        return item.index === itemIndex;
                    }), targetItemSort = targetItem.sort;
                    gridPosition = Math.max(gridPosition, 0), gridPosition = Math.min(gridPosition, this.list.length - 1), 
                    targetItemSort !== gridPosition && (this.list = this.list.map(function(item) {
                        if (item.index === targetItem.index) return _extends({}, item, {
                            sort: gridPosition
                        });
                        var sort = item.sort;
                        return targetItemSort > gridPosition && sort <= targetItemSort && sort >= gridPosition ? _extends({}, item, {
                            sort: sort + 1
                        }) : targetItemSort < gridPosition && sort >= targetItemSort && sort <= gridPosition ? _extends({}, item, {
                            sort: sort - 1
                        }) : item;
                    }), this.$emit("sort", this.wrapEvent()));
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        exports.default = {
            name: "GridItem",
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
            data: function() {
                return {
                    animate: !0,
                    dragging: !1,
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
            mounted: function() {
                var _this = this;
                this.$refs.self.addEventListener("transitionend", function(event) {
                    _this.dragging || (_this.zIndex = 1);
                }, !1);
            },
            computed: {
                className: function() {
                    return [ "v-grid-item-wrapper", {
                        "v-grid-item-animate": this.animate,
                        "v-grid-item-dragging": this.dragging
                    } ];
                },
                style: function() {
                    var zIndex = this.zIndex, cellWidth = this.cellWidth, cellHeight = this.cellHeight, top = this.top;
                    return {
                        zIndex: zIndex,
                        width: cellWidth + "px",
                        height: cellHeight + "px",
                        transform: "translate3d(" + this.left + "px, " + top + "px, 0)"
                    };
                },
                left: function() {
                    return this.dragging ? this.shiftX : this.rowShift + this.sort % this.rowCount * this.cellWidth;
                },
                top: function() {
                    return this.dragging ? this.shiftY : Math.floor(this.sort / this.rowCount) * this.cellHeight;
                }
            },
            methods: {
                wrapEvent: function(event) {
                    return {
                        event: event,
                        index: this.index,
                        sort: this.sort
                    };
                },
                dragStart: function(event) {
                    var e = event.touches ? event.touches[0] : event;
                    this.zIndex = 2, this.shiftX = this.shiftStartX = this.left, this.shiftY = this.shiftStartY = this.top, 
                    this.mouseMoveStartX = e.pageX, this.mouseMoveStartY = e.pageY, this.animate = !1, 
                    this.dragging = !0, document.addEventListener("mousemove", this.documentMouseMove), 
                    document.addEventListener("touchmove", this.documentMouseMove), this.$emit("dragstart", this.wrapEvent(event));
                },
                drag: function(event) {
                    var e = event.touches ? event.touches[0] : event, distanceX = e.pageX - this.mouseMoveStartX, distanceY = e.pageY - this.mouseMoveStartY;
                    this.shiftX = distanceX + this.shiftStartX, this.shiftY = distanceY + this.shiftStartY;
                    var gridX = Math.round(this.shiftX / this.cellWidth), gridY = Math.round(this.shiftY / this.cellHeight);
                    gridX = Math.min(gridX, this.rowCount - 1), gridY = Math.max(gridY, 0);
                    var gridPosition = gridX + gridY * this.rowCount, $event = {
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
                    this.$emit("drag", $event);
                },
                mousedown: function(event) {
                    var _this2 = this;
                    this.draggable && (this.timer = setTimeout(function() {
                        _this2.dragStart(event);
                    }, this.dragDelay), document.addEventListener("mouseup", this.documentMouseUp), 
                    document.addEventListener("touchend", this.documentMouseUp));
                },
                documentMouseMove: function(event) {
                    this.draggable && this.dragging && this.drag(event);
                },
                documentMouseUp: function(event) {
                    this.timer && (clearTimeout(this.timer), this.timer = null);
                    var dx = this.shiftStartX - this.shiftX, dy = this.shiftStartY - this.shiftY, distance = Math.sqrt(dx * dx + dy * dy);
                    this.animate = !0, this.dragging = !1, this.mouseMoveStartX = 0, this.mouseMoveStartY = 0, 
                    this.shiftStartX = 0, this.shiftStartY = 0, document.removeEventListener("mousemove", this.documentMouseMove), 
                    document.removeEventListener("touchmove", this.documentMouseMove), document.removeEventListener("mouseup", this.documentMouseUp), 
                    document.removeEventListener("touchend", this.documentMouseUp);
                    var $event = this.wrapEvent(event);
                    distance < 4 && this.$emit("click", $event), this.$emit("dragend", $event);
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _Grid = __webpack_require__(3), _Grid2 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_Grid);
        exports.default = {
            install: function(Vue) {
                Vue.component("Grid", _Grid2.default);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = {
            data: function() {
                return {
                    windowHeight: 0,
                    windowWidth: 0
                };
            },
            created: function() {
                window.addEventListener("resize", this.getWindowSize), this.getWindowSize();
            },
            beforeDestroy: function() {
                window.removeEventListener("resize", this.getWindowSize);
            },
            methods: {
                getWindowSize: function() {
                    this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth;
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(0)(), exports.push([ module.i, "\nbody {\n  margin: 0;\n  padding: 0;\n}\n.v-grid {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n", "" ]);
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(0)(), exports.push([ module.i, "\n.v-grid-item-wrapper {\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  user-select: none;\n  transform: translate3d(0px, 0px, 0px);\n  z-index: 1;\n}\n.v-grid-item-wrapper.v-grid-item-animate {\n    transition: transform 800ms ease;\n}\n", "" ]);
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(14);
        var Component = __webpack_require__(1)(__webpack_require__(5), __webpack_require__(12), null, null);
        module.exports = Component.exports;
    }, function(module, exports) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
                return _c("div", {
                    staticClass: "v-grid",
                    style: _vm.style
                }, _vm._l(_vm.list, function(v) {
                    return _c("GridItem", {
                        key: v.index,
                        attrs: {
                            index: v.index,
                            sort: v.sort,
                            draggable: _vm.draggable,
                            "drag-delay": _vm.dragDelay,
                            "row-count": _vm.rowCount,
                            "cell-width": _vm.cellWidth,
                            "cell-height": _vm.cellHeight,
                            "window-width": _vm.windowWidth,
                            "row-shift": _vm.rowShift
                        },
                        on: {
                            dragstart: _vm.onDragStart,
                            dragend: _vm.onDragEnd,
                            drag: _vm.onDrag,
                            click: _vm.click
                        }
                    }, [ _vm._t("cell", null, {
                        item: v.item,
                        index: v.index,
                        sort: v.sort,
                        remove: function() {
                            _vm.removeItem(v);
                        }
                    }) ], 2);
                }));
            },
            staticRenderFns: []
        };
    }, function(module, exports) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement;
                return (_vm._self._c || _h)("div", {
                    ref: "self",
                    class: _vm.className,
                    style: _vm.style,
                    on: {
                        mousedown: _vm.mousedown,
                        touchstart: _vm.mousedown
                    }
                }, [ _vm._t("default") ], 2);
            },
            staticRenderFns: []
        };
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(8);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("0a97df14", content, !0);
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(9);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("4be927ea", content, !0);
    }, function(module, exports) {
        module.exports = function(parentId, list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    id: parentId + ":" + i,
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        };
    } ]);
});