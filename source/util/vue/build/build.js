webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(22);//加载公共样式
	
	var Vue = __webpack_require__(26);
	var VueRouter = __webpack_require__(98);
	
	
	Vue.use(VueRouter);
	var App = Vue.extend(__webpack_require__(131));
	var router = new VueRouter(
		{
		  hashbang: false,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
		  //abstract:true,  //地址栏不会有变化
		  //以下设置需要服务端设置
		  //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
		  //saveScrollPosition: false
		  linkActiveClass:'custom-active-class' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
		}
	);
	
	__webpack_require__(156)(router);
	
	
	
	router.start(App,'#app');
	window.router = router;
	


/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports) {

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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var extend = _.extend
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefiexed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue (options) {
	  this._init(options)
	}
	
	/**
	 * Mixin global API
	 */
	
	extend(Vue, __webpack_require__(40))
	
	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */
	
	Vue.options = {
	  replace: true,
	  directives: __webpack_require__(57),
	  elementDirectives: __webpack_require__(79),
	  filters: __webpack_require__(82),
	  transitions: {},
	  components: {},
	  partials: {}
	}
	
	/**
	 * Build up the prototype
	 */
	
	var p = Vue.prototype
	
	/**
	 * $data has a setter which does a bunch of
	 * teardown/setup work
	 */
	
	Object.defineProperty(p, '$data', {
	  get: function () {
	    return this._data
	  },
	  set: function (newData) {
	    if (newData !== this._data) {
	      this._setData(newData)
	    }
	  }
	})
	
	/**
	 * 1.0.0-alpha for 0.12 compat
	 */
	
	Object.defineProperty(p, '$els', {
	  get: function () {
	    return this.$$
	  }
	})
	
	Object.defineProperty(p, '$refs', {
	  get: function () {
	    return this.$
	  }
	})
	
	/**
	 * Mixin internal instance methods
	 */
	
	extend(p, __webpack_require__(84))
	extend(p, __webpack_require__(85))
	extend(p, __webpack_require__(86))
	extend(p, __webpack_require__(90))
	extend(p, __webpack_require__(92))
	
	/**
	 * Mixin public API methods
	 */
	
	extend(p, __webpack_require__(93))
	extend(p, __webpack_require__(94))
	extend(p, __webpack_require__(95))
	extend(p, __webpack_require__(96))
	extend(p, __webpack_require__(97))
	
	Vue.version = '1.0.0-rc.2-migration'
	module.exports = _.Vue = Vue


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var lang = __webpack_require__(28)
	var extend = lang.extend
	
	extend(exports, lang)
	extend(exports, __webpack_require__(29))
	extend(exports, __webpack_require__(30))
	extend(exports, __webpack_require__(36))
	extend(exports, __webpack_require__(37))
	extend(exports, __webpack_require__(38))


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	exports.set = function set (obj, key, val) {
	  if (obj.hasOwnProperty(key)) {
	    obj[key] = val
	    return
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val)
	    return
	  }
	  var ob = obj.__ob__
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  ob.convert(key, val)
	  ob.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._proxy(key)
	      vm._digest()
	    }
	  }
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	exports.delete = function (obj, key) {
	  if (!obj.hasOwnProperty(key)) {
	    return
	  }
	  delete obj[key]
	  var ob = obj.__ob__
	  if (!ob) {
	    return
	  }
	  ob.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._unproxy(key)
	      vm._digest()
	    }
	  }
	}
	
	/*
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	exports.isReserved = function (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	exports.toString = function (value) {
	  return value == null
	    ? ''
	    : value.toString()
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	exports.toNumber = function (value) {
	  if (typeof value !== 'string') {
	    return value
	  } else {
	    var parsed = Number(value)
	    return isNaN(parsed)
	      ? value
	      : parsed
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	exports.toBoolean = function (value) {
	  return value === 'true'
	    ? true
	    : value === 'false'
	      ? false
	      : value
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	exports.stripQuotes = function (str) {
	  var a = str.charCodeAt(0)
	  var b = str.charCodeAt(str.length - 1)
	  return a === b && (a === 0x22 || a === 0x27)
	    ? str.slice(1, -1)
	    : false
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	exports.camelize = function (str) {
	  return str.replace(/-(\w)/g, toUpper)
	}
	
	function toUpper (_, c) {
	  return c ? c.toUpperCase() : ''
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	exports.hyphenate = function (str) {
	  return str
	    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
	    .toLowerCase()
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g
	exports.classify = function (str) {
	  return str.replace(classifyRE, toUpper)
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	exports.bind = function (fn, ctx) {
	  return function (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	exports.toArray = function (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	exports.extend = function (to, from) {
	  var keys = Object.keys(from)
	  var i = keys.length
	  while (i--) {
	    to[keys[i]] = from[keys[i]]
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	exports.isObject = function (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	exports.isPlainObject = function (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	exports.isArray = Array.isArray
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	exports.define = function (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	exports.debounce = function (func, wait) {
	  var timeout, args, context, timestamp, result
	  var later = function () {
	    var last = Date.now() - timestamp
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last)
	    } else {
	      timeout = null
	      result = func.apply(context, args)
	      if (!timeout) context = args = null
	    }
	  }
	  return function () {
	    context = this
	    args = arguments
	    timestamp = Date.now()
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    return result
	  }
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	exports.indexOf = function (arr, obj) {
	  var i = arr.length
	  while (i--) {
	    if (arr[i] === obj) return i
	  }
	  return -1
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	exports.cancellable = function (fn) {
	  var cb = function () {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments)
	    }
	  }
	  cb.cancel = function () {
	    cb.cancelled = true
	  }
	  return cb
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	exports.looseEqual = function (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    exports.isObject(a) && exports.isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	// can we use __proto__?
	exports.hasProto = '__proto__' in {}
	
	// Browser environment sniffing
	var inBrowser = exports.inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'
	
	exports.isIE9 =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0
	
	exports.isAndroid =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('android') > 0
	
	// Transition property/event sniffing
	if (inBrowser && !exports.isIE9) {
	  var isWebkitTrans =
	    window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  var isWebkitAnim =
	    window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  exports.transitionProp = isWebkitTrans
	    ? 'WebkitTransition'
	    : 'transition'
	  exports.transitionEndEvent = isWebkitTrans
	    ? 'webkitTransitionEnd'
	    : 'transitionend'
	  exports.animationProp = isWebkitAnim
	    ? 'WebkitAnimation'
	    : 'animation'
	  exports.animationEndEvent = isWebkitAnim
	    ? 'webkitAnimationEnd'
	    : 'animationend'
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	exports.nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks = []
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(counter)
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = counter
	    }
	  } else {
	    timerFunc = setTimeout
	  }
	  return function (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (pending) return
	    pending = true
	    timerFunc(nextTickHandler, 0)
	  }
	})()


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	exports.query = function (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Cannot find element: ' + selector
	      )
	    }
	  }
	  return el
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed byy doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	exports.inDoc = function (node) {
	  var doc = document.documentElement
	  var parent = node && node.parentNode
	  return doc === node ||
	    doc === parent ||
	    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
	}
	
	/**
	 * Extract an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 * @return {String|null}
	 */
	
	exports.attr = function (node, attr) {
	  attr = config.prefix + attr
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}
	
	/**
	 * Get an attribute with colon or bind- prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	exports.getBindAttr = function (node, name) {
	  var attr = ':' + name
	  var val = node.getAttribute(attr)
	  if (val === null) {
	    attr = config.prefix + 'bind:' + name
	    val = node.getAttribute(attr)
	  }
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}
	
	var refRE = /^v-ref:/
	exports.findRef = function (node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name
	      if (refRE.test(name)) {
	        node.removeAttribute(name)
	        return _.camelize(name.replace(refRE, ''))
	      }
	    }
	  }
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	exports.before = function (el, target) {
	  target.parentNode.insertBefore(el, target)
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	exports.after = function (el, target) {
	  if (target.nextSibling) {
	    exports.before(el, target.nextSibling)
	  } else {
	    target.parentNode.appendChild(el)
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	exports.remove = function (el) {
	  el.parentNode.removeChild(el)
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	exports.prepend = function (el, target) {
	  if (target.firstChild) {
	    exports.before(el, target.firstChild)
	  } else {
	    target.appendChild(el)
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	exports.replace = function (target, el) {
	  var parent = target.parentNode
	  if (parent) {
	    parent.replaceChild(el, target)
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	exports.on = function (el, event, cb) {
	  el.addEventListener(event, cb)
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	exports.off = function (el, event, cb) {
	  el.removeEventListener(event, cb)
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */
	
	exports.addClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.add(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */
	
	exports.removeClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	  if (!el.className) {
	    el.removeAttribute('class')
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */
	
	exports.extractContent = function (el, asFragment) {
	  var child
	  var rawContent
	  /* istanbul ignore if */
	  if (
	    exports.isTemplate(el) &&
	    el.content instanceof DocumentFragment
	  ) {
	    el = el.content
	  }
	  if (el.hasChildNodes()) {
	    exports.trimNode(el)
	    rawContent = asFragment
	      ? document.createDocumentFragment()
	      : document.createElement('div')
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	    /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child)
	    }
	  }
	  return rawContent
	}
	
	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	exports.trimNode = function (node) {
	  trim(node, node.firstChild)
	  trim(node, node.lastChild)
	}
	
	function trim (parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node)
	  }
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	exports.isTemplate = function (el) {
	  return el.tagName &&
	    el.tagName.toLowerCase() === 'template'
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - component
	 * - repeat
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	exports.createAnchor = function (content, persist) {
	  return config.debug
	    ? document.createComment(content)
	    : document.createTextNode(persist ? ' ' : '')
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 31 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = {
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Strict mode.
	   * Disables asset lookup in the view parent chain.
	   */
	
	  strict: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether allow observer to alter data objects'
	   * __proto__.
	   *
	   * @type {Boolean}
	   */
	
	  proto: true,
	
	  /**
	   * Whether to parse mustache tags in templates.
	   *
	   * @type {Boolean}
	   */
	
	  interpolate: true,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: [
	    'component',
	    'directive',
	    'elementDirective',
	    'filter',
	    'transition',
	    'partial'
	  ],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}
	
	/**
	 * The prefix to look for when parsing directives.
	 *
	 * @type {String}
	 */
	
	var prefix = 'v-'
	Object.defineProperty(module.exports, 'prefix', {
	  get: function () {
	    return prefix
	  },
	  set: function (val) {
	    prefix = val
	    if (process.env.NODE_ENV !== 'production') {
	      __webpack_require__(27).deprecation.PREFIX()
	    }
	  }
	})
	
	/**
	 * Interpolation delimiters. Changing these would trigger
	 * the text parser to re-compile the regular expressions.
	 *
	 * @type {Array<String>}
	 */
	
	var delimiters = ['{{', '}}']
	var unsafeDelimiters = ['{{{', '}}}']
	var textParser = __webpack_require__(33)
	
	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
	    var unsafeOpen = val[0].charAt(0) + val[0]
	    var unsafeClose = val[1] + val[1].slice(-1)
	    unsafeDelimiters = [unsafeOpen, unsafeClose]
	    if (process.env.NODE_ENV !== 'production') {
	      __webpack_require__(27).log(
	        'Interpolation delimiters for unsafe HTML will ' +
	        'need to be configured separately as ' +
	        'Vue.config.unsafeDelimiters in 1.0.0.'
	      )
	    }
	    textParser.compileRegex()
	  }
	})
	
	Object.defineProperty(module.exports, 'unsafeDelimiters', {
	  get: function () {
	    return unsafeDelimiters
	  },
	  set: function (val) {
	    unsafeDelimiters = val
	    textParser.compileRegex()
	  }
	})
	
	var proto = true
	Object.defineProperty(module.exports, 'proto', {
	  get: function () {
	    return proto
	  },
	  set: function (val) {
	    if (process.env.NODE_ENV !== 'production') {
	      __webpack_require__(27).deprecation.PROTO()
	    }
	    proto = val
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(34)
	var config = __webpack_require__(32)
	var dirParser = __webpack_require__(35)
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
	var cache, tagRE, htmlRE
	
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex (str) {
	  return str.replace(regexEscapeRE, '\\$&')
	}
	
	exports.compileRegex = function () {
	  var open = escapeRegex(config.delimiters[0])
	  var close = escapeRegex(config.delimiters[1])
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0])
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1])
	  tagRE = new RegExp(
	    unsafeOpen + '(.+?)' + unsafeClose + '|' +
	    open + '(.+?)' + close,
	    'g'
	  )
	  htmlRE = new RegExp(
	    '^' + unsafeOpen + '.*' + unsafeClose + '$'
	  )
	  // reset cache
	  cache = new Cache(1000)
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	exports.parse = function (text) {
	  if (!cache) {
	    exports.compileRegex()
	  }
	  var hit = cache.get(text)
	  if (hit) {
	    return hit
	  }
	  text = text.replace(/\n/g, '')
	  if (!tagRE.test(text)) {
	    return null
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index, html, value, first, oneTime, twoWay
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	  /* eslint-enable no-cond-assign */
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      })
	    }
	    // tag token
	    html = htmlRE.test(match[0])
	    value = html ? match[1] : match[2]
	    first = value.charCodeAt(0)
	    oneTime = first === 42 // *
	    twoWay = first === 38 || first === 64 // & or @
	    value = oneTime || twoWay
	      ? value.slice(1)
	      : value
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime,
	      twoWay: twoWay
	    })
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    })
	  }
	  cache.put(text, tokens)
	  return tokens
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */
	
	exports.tokensToExp = function (tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm)
	    }).join('+')
	  } else {
	    return formatToken(tokens[0], vm, true)
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	function formatToken (token, vm, single) {
	  return token.tag
	    ? vm && token.oneTime
	      ? '"' + vm.$eval(token.value) + '"'
	      : inlineFilters(token.value, single)
	    : '"' + token.value + '"'
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE = /[^|]\|[^|]/
	function inlineFilters (exp, single) {
	  if (!filterRE.test(exp)) {
	    return single
	      ? exp
	      : '(' + exp + ')'
	  } else {
	    var dir = dirParser.parse(exp)[0]
	    if (!dir.filters) {
	      return '(' + exp + ')'
	    } else {
	      return 'this._applyFilters(' +
	        dir.expression + // value
	        ',null,' +       // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'        // write?
	    }
	  }
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * A doubly linked list-based Least Recently Used (LRU)
	 * cache. Will keep most recently used items while
	 * discarding least recently used items when its limit is
	 * reached. This is a bare-bone version of
	 * Rasmus Andersson's js-lru:
	 *
	 *   https://github.com/rsms/js-lru
	 *
	 * @param {Number} limit
	 * @constructor
	 */
	
	function Cache (limit) {
	  this.size = 0
	  this.limit = limit
	  this.head = this.tail = undefined
	  this._keymap = Object.create(null)
	}
	
	var p = Cache.prototype
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  }
	  this._keymap[key] = entry
	  if (this.tail) {
	    this.tail.newer = entry
	    entry.older = this.tail
	  } else {
	    this.head = entry
	  }
	  this.tail = entry
	  if (this.size === this.limit) {
	    return this.shift()
	  } else {
	    this.size++
	  }
	}
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head
	  if (entry) {
	    this.head = this.head.newer
	    this.head.older = undefined
	    entry.newer = entry.older = undefined
	    this._keymap[entry.key] = undefined
	  }
	  return entry
	}
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key]
	  if (entry === undefined) return
	  if (entry === this.tail) {
	    return returnEntry
	      ? entry
	      : entry.value
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer
	    }
	    entry.newer.older = entry.older // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer // C. --> E
	  }
	  entry.newer = undefined // D --x
	  entry.older = this.tail // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry // E. <-- D
	  }
	  this.tail = entry
	  return returnEntry
	    ? entry
	    : entry.value
	}
	
	module.exports = Cache


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Cache = __webpack_require__(34)
	var cache = new Cache(1000)
	var argRE = /^[^\{\?]+$|^'[^']*'$|^"[^"]*"$/
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g
	var reservedArgRE = /^in$|^-?\d+/
	
	/**
	 * Parser state
	 */
	
	var str
	var c, i, l
	var inSingle
	var inDouble
	var curly
	var square
	var paren
	var begin
	var argIndex
	var dirs
	var dir
	var lastFilterIndex
	var arg
	
	/**
	 * Push a directive object into the result Array
	 */
	
	function pushDir () {
	  dir.raw = str.slice(begin, i).trim()
	  if (dir.expression === undefined) {
	    dir.expression = str.slice(argIndex, i).trim()
	  } else if (lastFilterIndex !== begin) {
	    pushFilter()
	  }
	  if (i === 0 || dir.expression) {
	    dirs.push(dir)
	  }
	}
	
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg)
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg (arg) {
	  var stripped = reservedArgRE.test(arg)
	    ? arg
	    : _.stripQuotes(arg)
	  var dynamic = stripped === false
	  return {
	    value: dynamic ? arg : stripped,
	    dynamic: dynamic
	  }
	}
	
	/**
	 * Parse a directive string into an Array of AST-like
	 * objects representing directives.
	 *
	 * Example:
	 *
	 * "click: a = a + 1 | uppercase" will yield:
	 * {
	 *   arg: 'click',
	 *   expression: 'a = a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Array<Object>}
	 */
	
	exports.parse = function (s) {
	
	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }
	
	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = begin = argIndex = 0
	  lastFilterIndex = 0
	  dirs = []
	  dir = {}
	  arg = null
	
	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x2C && // comma
	      !paren && !curly && !square
	    ) {
	      // reached the end of a directive
	      pushDir()
	      // reset & skip the comma
	      dir = {}
	      begin = argIndex = lastFilterIndex = i + 1
	    } else if (
	      c === 0x3A && // colon
	      !dir.expression &&
	      !dir.arg
	    ) {
	      // argument
	      arg = str.slice(begin, i).trim()
	      // test for valid argument here
	      // since we may have caught stuff like first half of
	      // an object literal or a ternary expression.
	      if (argRE.test(arg)) {
	        argIndex = i + 1
	        dir.arg = _.stripQuotes(arg) || arg
	
	        if (process.env.NODE_ENV !== 'production') {
	          _.deprecation.DIR_ARGS(str)
	        }
	
	      }
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(argIndex, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }
	
	  if (i === 0 || begin !== i) {
	    pushDir()
	  }
	
	  cache.put(s, dirs)
	
	  if (process.env.NODE_ENV !== 'production' && dirs.length > 1) {
	    _.deprecation.MULTI_CLAUSES()
	  }
	
	  return dirs
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var extend = _.extend
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null)
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!to.hasOwnProperty(key)) {
	      _.set(to, key, fromVal)
	    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.'
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'The "el" option should be a function ' +
	      'that returns a per-instance value in component ' +
	      'definitions.'
	    )
	    return
	  }
	  var ret = childVal || parentVal
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function'
	    ? ret.call(vm)
	    : ret
	}
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init =
	strats.created =
	strats.ready =
	strats.attached =
	strats.detached =
	strats.beforeCompile =
	strats.compiled =
	strats.beforeDestroy =
	strats.destroyed =
	strats.props = function (parentVal, childVal) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : _.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	/**
	 * 0.11 deprecation warning
	 */
	
	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && _.warn(
	    '"paramAttributes" option has been deprecated in 0.12. ' +
	    'Use "props" instead.'
	  )
	}
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal)
	  return childVal
	    ? extend(res, guardArrayAssets(childVal))
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch =
	strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !_.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}
	
	/**
	 * Other object hashes.
	 */
	
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = Object.create(parentVal)
	  extend(ret, childVal)
	  return ret
	}
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents (options) {
	  if (options.components) {
	    var components = options.components =
	      guardArrayAssets(options.components)
	    var def
	    var ids = Object.keys(components)
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i]
	      if (_.commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Do not use built-in HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (_.isPlainObject(def)) {
	        def.name = def.name || key
	        components[key] = _.Vue.extend(def)
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps (options) {
	  var props = options.props
	  if (_.isPlainObject(props)) {
	    options.props = Object.keys(props).map(function (key) {
	      var val = props[key]
	      if (!_.isPlainObject(val)) {
	        val = { type: val }
	      }
	      val.name = key
	      return val
	    })
	  } else if (_.isArray(props)) {
	    options.props = props.map(function (prop) {
	      return typeof prop === 'string'
	        ? { name: prop }
	        : prop
	    })
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets (assets) {
	  if (_.isArray(assets)) {
	    var res = {}
	    var i = assets.length
	    var asset
	    while (i--) {
	      asset = assets[i]
	      var id = asset.name || (asset.options && asset.options.name)
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Array-syntax assets must provide a "name" field.'
	        )
	      } else {
	        res[id] = asset
	      }
	    }
	    return res
	  }
	  return assets
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	exports.mergeOptions = function merge (parent, child, vm) {
	
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.inherit && !child._repeat) {
	      _.deprecation.INHERIT()
	    }
	  }
	
	  guardComponents(child)
	  guardProps(child)
	  var options = {}
	  var key
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = merge(parent, child.mixins[i], vm)
	    }
	  }
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!(parent.hasOwnProperty(key))) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */
	
	exports.resolveAsset = function resolve (options, type, id) {
	  var camelizedId = _.camelize(id)
	  var pascalizedId = camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)
	  var assets = options[type]
	  var asset = assets[id] || assets[camelizedId] || assets[pascalizedId]
	
	  // for deprecation check
	  var localAsset = asset
	
	  while (
	    !asset &&
	    options.parent &&
	    (!config.strict || options._repeat)
	  ) {
	    options = (options._context || options.parent).$options
	    assets = options[type]
	    asset = assets[id] || assets[camelizedId] || assets[pascalizedId]
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    if (asset && !localAsset && !config.strict) {
	      _.deprecation.STRICT_MODE(type, id)
	    }
	  }
	
	  return asset
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {String|undefined}
	 */
	
	exports.commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/
	exports.checkComponent = function (el, options, hasAttrs) {
	  var tag = el.tagName.toLowerCase()
	  if (!exports.commonTagRE.test(tag) && tag !== 'component') {
	    if (_.resolveAsset(options, 'components', tag)) {
	      // custom element component
	      return tag
	    } else {
	      var exp = hasAttrs && checkComponentAttribute(el)
	      /* istanbul ignore if */
	      if (exp) return exp
	      if (process.env.NODE_ENV !== 'production') {
	        if (
	          tag.indexOf('-') > -1 ||
	          (
	            /HTMLUnknownElement/.test(el.toString()) &&
	            // Chrome returns unknown for several HTML5 elements.
	            // https://code.google.com/p/chromium/issues/detail?id=540526
	            !/^(data|time|rtc|rb)$/.test(tag)
	          )
	        ) {
	          _.warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly?'
	          )
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return checkComponentAttribute(el)
	  }
	}
	
	/**
	 * Check possible component denoting attributes, e.g.
	 * is, v-bind:is and v-component.
	 *
	 * @param {Elemnent} el
	 * @return {String|null}
	 */
	
	function checkComponentAttribute (el) {
	  var exp
	  /* eslint-disable no-cond-assign */
	  if (exp = _.attr(el, 'component')) {
	  /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.V_COMPONENT()
	    }
	    return exp
	  }
	  // dynamic syntax
	  exp = el.getAttribute('is')
	  if (exp != null) {
	    if (process.env.NODE_ENV !== 'production' && /{{.*}}/.test(exp)) {
	      _.deprecation.BIND_IS()
	    }
	    el.removeAttribute('is')
	  } else {
	    exp = _.getBindAttr(el, 'is')
	    if (exp != null) {
	      // leverage literal dynamic for now.
	      // TODO: make this cleaner
	      exp = '{{' + exp + '}}'
	    }
	  }
	  return exp
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 * The vm may have inherit:true so we need to make sure
	 * we don't accidentally overwrite parent value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	exports.initProp = function (vm, prop, value) {
	  if (exports.assertProp(prop, value)) {
	    var key = prop.path
	    if (key in vm) {
	      _.define(vm, key, value, true)
	    } else {
	      vm[key] = value
	    }
	    vm._data[key] = value
	  }
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	exports.assertProp = function (prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true
	  }
	  var options = prop.options
	  var type = options.type
	  var valid = true
	  var expectedType
	  if (type) {
	    if (type === String) {
	      expectedType = 'string'
	      valid = typeof value === expectedType
	    } else if (type === Number) {
	      expectedType = 'number'
	      valid = typeof value === 'number'
	    } else if (type === Boolean) {
	      expectedType = 'boolean'
	      valid = typeof value === 'boolean'
	    } else if (type === Function) {
	      expectedType = 'function'
	      valid = typeof value === 'function'
	    } else if (type === Object) {
	      expectedType = 'object'
	      valid = _.isPlainObject(value)
	    } else if (type === Array) {
	      expectedType = 'array'
	      valid = _.isArray(value)
	    } else {
	      valid = value instanceof type
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid prop: type check failed for ' +
	      prop.path + '="' + prop.raw + '".' +
	      ' Expected ' + formatType(expectedType) +
	      ', got ' + formatValue(value) + '.'
	    )
	    return false
	  }
	  var validator = options.validator
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop: custom validator check failed for ' +
	        prop.path + '="' + prop.raw + '"'
	      )
	      return false
	    }
	  }
	  return true
	}
	
	function formatType (val) {
	  return val
	    ? val.charAt(0).toUpperCase() + val.slice(1)
	    : 'custom type'
	}
	
	function formatValue (val) {
	  return Object.prototype.toString.call(val).slice(8, -1)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Enable debug utilities.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	
	  var config = __webpack_require__(32)
	  var hasConsole = typeof console !== 'undefined'
	
	  /**
	   * Load deprecation warning functions
	   */
	
	  exports.deprecations = __webpack_require__(39)
	
	  /**
	   * Log a message.
	   *
	   * @param {String} msg
	   */
	
	  exports.log = function (msg) {
	    if (hasConsole && config.debug) {
	      console.log('[Vue info]: ' + msg)
	    }
	  }
	
	  /**
	   * We've got a problem here.
	   *
	   * @param {String} msg
	   */
	
	  exports.warn = function (msg, e) {
	    if (hasConsole && (!config.silent || config.debug)) {
	      console.warn('[Vue warn]: ' + msg)
	      /* istanbul ignore if */
	      if (config.debug) {
	        console.warn((e || new Error('Warning Stack Trace')).stack)
	      }
	    }
	  }
	
	  /**
	   * Assert asset exists
	   */
	
	  exports.assertAsset = function (val, type, id) {
	    if (!val) {
	      exports.warn('Failed to resolve ' + type + ': ' + id)
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.NODE_ENV !== 'production') {
	
	  var _ = __webpack_require__(27)
	  var warn = function (msg) {
	    _.warn('{DEPRECATION} ' + msg)
	  }
	
	  var newBindingSyntaxLink = ' See https://github.com/vuejs/vue/issues/1325 for details.'
	
	  _.deprecation = {
	
	    REPEAT: function () {
	      warn(
	        'v-repeat will be deprecated in favor of v-for in 1.0.0. ' +
	        'See https://github.com/vuejs/vue/issues/1200 for details.'
	      )
	    },
	
	    ADD: function () {
	      warn(
	        '$add() will be deprecated in 1.0.0. Use $set() instead. ' +
	        'See https://github.com/vuejs/vue/issues/1171 for details.'
	      )
	    },
	
	    SET: function () {
	      warn(
	        '$set() on plain objects will be deperecated in 1.0.0. ' +
	        'Use `Vue.set(obj, key, value)` instead.'
	      )
	    },
	
	    DELETE: function () {
	      warn(
	        '$delete() on plain objects will be deperecated in 1.0.0. ' +
	        'Use `Vue.delete(obj, key)` instead.'
	      )
	    },
	
	    WAIT_FOR: function () {
	      warn(
	        '"wait-for" will be deprecated in 1.0.0. Use `activate` hook instead. ' +
	        'See https://github.com/vuejs/vue/issues/1169 for details.'
	      )
	    },
	
	    STRICT_MODE: function (type, id) {
	      warn(
	        'Falling through to parent when resolving ' + type + ' with id "' + id +
	        '". Strict mode will be the default in 1.0.0. ' +
	        'See https://github.com/vuejs/vue/issues/1170 for details.'
	      )
	    },
	
	    CONTENT: function () {
	      warn(
	        '<content> insertion points will be deprecated in in 1.0.0. in favor of <slot>. ' +
	        'See https://github.com/vuejs/vue/issues/1167 for details.'
	      )
	    },
	
	    DATA_AS_PROP: function () {
	      warn(
	        '$data will no longer be usable as a prop in 1.0.0. ' +
	        'See https://github.com/vuejs/vue/issues/1198 for details.'
	      )
	    },
	
	    INHERIT: function () {
	      warn(
	        'The "inherit" option will be deprecated in 1.0.0. ' +
	        'See https://github.com/vuejs/vue/issues/1198 for details.'
	      )
	    },
	
	    DIR_ARGS: function (exp) {
	      warn(
	        exp + ': Directive arguments will be moved into the attribute name in 1.0.0 - ' +
	        'use v-dirname:arg="expression" syntax instead.' + newBindingSyntaxLink
	      )
	    },
	
	    MULTI_CLAUSES: function () {
	      warn(
	        'Directives will no longer support multiple clause syntax in 1.0.0.' +
	        newBindingSyntaxLink
	      )
	    },
	
	    V_TRANSITION: function () {
	      warn(
	        'v-transition will no longer be a directive in 1.0.0; It will become a ' +
	        'special attribute without the prefix. Use "transition" instead.'
	      )
	    },
	
	    V_REF: function () {
	      warn(
	        'v-ref will no longer take an attribute value in 1.0.0. Use "v-ref:id" syntax ' +
	        'instead. Also, refs will be registered under vm.$refs instead of vm.$. ' +
	        'See https://github.com/vuejs/vue/issues/1292 for more details.'
	      )
	    },
	
	    V_EL: function () {
	      warn(
	        'v-el will no longer take an attribute value in 1.0.0. Use "v-el:id" syntax ' +
	        'instead. Also, nodes will be registered under vm.$els instead of vm.$$. ' +
	        'See https://github.com/vuejs/vue/issues/1292 for more details.'
	      )
	    },
	
	    V_ATTR: function () {
	      warn(
	        'v-attr will be renamed to v-bind in 1.0.0. Also, use v-bind:attr="expression" ' +
	        'syntax instead.' + newBindingSyntaxLink
	      )
	    },
	
	    V_CLASS: function () {
	      warn(
	        'v-class will be deprecated in 1.0.0. Use v-bind:class or just :class instead.' +
	        newBindingSyntaxLink
	      )
	    },
	
	    V_STYLE: function () {
	      warn(
	        'v-style will be deprecated in 1.0.0. Use v-bind:style or just :style instead.' +
	        newBindingSyntaxLink
	      )
	    },
	
	    ATTR_ONETIME: function (name, value) {
	      warn(
	        name + '="' + value + '": One-time interpolations inside attributes will ' +
	        'no longer be supported in 1.0.0.'
	      )
	    },
	
	    ATTR_INVALID: function (name) {
	      warn(
	        'Mustache interpolation found in vue-specific attribute "' + name + '": ' +
	        'attribute interpolation will be limited to native attributes only ' +
	        'in 1.0.0. Use v-bind for vue directives and props.'
	      )
	    },
	
	    PROPS: function (attr, value) {
	      warn(
	        'Prop ' + attr + '="' + value + '": props no longer use mustache tags ' +
	        'to indicate a dynamic binding. Use the "v-bind:prop-name" or the colon ' +
	        'shorthand instead.' + newBindingSyntaxLink
	      )
	    },
	
	    DATA_PROPS: function (attr, value) {
	      warn(
	        'Prop ' + attr + '="' + value + '": props will no longer support the ' +
	        '"data-" prefix in 1.0.0.' + newBindingSyntaxLink
	      )
	    },
	
	    PROP_CASTING: function (attr, value) {
	      warn(
	        'Prop ' + attr + '="' + value + '": literal props will no longer be ' +
	        'auto-casted into booleans/numbers in 1.0.0 - they will all be treated ' +
	        'as literal strings. Use "v-bind" or the colon shorthand for ' +
	        'boolean/number literals instead.'
	      )
	    },
	
	    BIND_IS: function () {
	      warn(
	        '<component is="{{view}}"> syntax will be deprecated in 1.0.0. Use ' +
	        '<component v-bind:is="view"> or <component :is="view"> instead.'
	      )
	    },
	
	    PARTIAL_NAME: function (id) {
	      warn(
	        '<partial name="' + id + '">: mustache interpolations inside attributes ' +
	        'will only be allowed in native attributes in 1.0.0. ' +
	        'Use v-bind:name="expression" or just :name="expression" instead.'
	      )
	    },
	
	    REF_IN_CHILD: function () {
	      warn(
	        'v-ref can no longer be used on a component root in its own ' +
	        'template in 1.0.0. Use it in the parent template instead.'
	      )
	    },
	
	    KEY_FILTER: function () {
	      warn(
	        'The "key" filter will be deprecated in 1.0.0. Use the new ' +
	        'v-on:keyup.key="handler" syntax instead.'
	      )
	    },
	
	    PROPAGATION: function (event) {
	      warn(
	        'No need to return false in handler for event "' + event + '": events ' +
	        'no longer propagate beyond the first triggered handler unless the ' +
	        'handler explicitly returns true. See https://github.com/vuejs/vue/issues/1175 ' +
	        'for more details.'
	      )
	    },
	
	    MODEL_EXP: function (exp) {
	      warn(
	        'Params "exp", "true-exp" and "false-exp" for v-model will be deprecated in 1.0.0. ' +
	        'Use "v-bind:value", "v-bind:true-value" and "v-bind:false-value" instead.'
	      )
	    },
	
	    SELECT_OPTIONS: function () {
	      warn(
	        'The "options" param for <select v-model> will be deprecated in 1.0.0. ' +
	        'Use v-for to render the options. See https://github.com/vuejs/vue/issues/1229 ' +
	        'for more details.'
	      )
	    },
	
	    INTERPOLATE: function () {
	      /* istanbul ignore next */
	      warn(
	        'The global "interpolate" config will be deprecated in 1.0.0. Use "v-pre" ' +
	        'on elements that should be skipped by the template compiler.'
	      )
	    },
	
	    LITERAL: function () {
	      warn(
	        'It is no longer necessary to declare literal directives in 1.0.0. Just ' +
	        'add the ".literal" modifier at the end (v-dir.literal="string") to ' +
	        'pass a literal value.'
	      )
	    },
	
	    PREFIX: function () {
	      warn(
	        'The "prefix" global config will be deprecated in 1.0.0. All directives ' +
	        'will consistently use the v- prefix.'
	      )
	    },
	
	    V_COMPONENT: function () {
	      warn(
	        'v-component will be deprecated in 1.0.0. Use "is" attribute instead. ' +
	        'See https://github.com/vuejs/vue/issues/1278 for more details.'
	      )
	    },
	
	    ADD_CHILD: function () {
	      warn(
	        'vm.$addChild() will be deprecated in 1.0.0. Use the `parent` option ' +
	        'instead. (Note the `parent` option does not work with `inherit: true`)'
	      )
	    },
	
	    ORDER_BY_REVERSE: function () {
	      warn(
	        'The "orderBy" filter\'s reverse argument is expected to be a number in 1.0.0. ' +
	        'A number smaller than 0 indicates the output should be in descending order.'
	      )
	    },
	
	    PROTO: function () {
	      warn(
	        'The "proto" global config will be deprecated in 1.0.0.'
	      )
	    }
	
	  }
	
	  // ensure warning get warned only once
	  var warned = {}
	  Object.keys(_.deprecation).forEach(function (key) {
	    var fn = _.deprecation[key]
	    _.deprecation[key] = function () {
	      if (!warned[key]) {
	        warned[key] = true
	        fn.apply(null, arguments)
	      }
	    }
	  })
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	
	/**
	 * Expose useful internals
	 */
	
	exports.util = _
	exports.config = config
	exports.set = _.set
	exports.delete = _.delete
	exports.nextTick = _.nextTick
	exports.compiler = __webpack_require__(41)
	exports.FragmentFactory = __webpack_require__(54)
	
	exports.parsers = {
	  path: __webpack_require__(49),
	  text: __webpack_require__(33),
	  template: __webpack_require__(51),
	  directive: __webpack_require__(35),
	  expression: __webpack_require__(48)
	}
	
	/**
	 * Each instance constructor, including Vue, has a unique
	 * cid. This enables us to create wrapped "child
	 * constructors" for prototypal inheritance and cache them.
	 */
	
	exports.cid = 0
	var cid = 1
	
	/**
	 * Class inheritance
	 *
	 * @param {Object} extendOptions
	 */
	
	exports.extend = function (extendOptions) {
	  extendOptions = extendOptions || {}
	  var Super = this
	  var isFirstExtend = Super.cid === 0
	  if (isFirstExtend && extendOptions._Ctor) {
	    return extendOptions._Ctor
	  }
	  var name = extendOptions.name || Super.options.name
	  var Sub = createClass(name || 'VueComponent')
	  Sub.prototype = Object.create(Super.prototype)
	  Sub.prototype.constructor = Sub
	  Sub.cid = cid++
	  Sub.options = _.mergeOptions(
	    Super.options,
	    extendOptions
	  )
	  Sub['super'] = Super
	  // allow further extension
	  Sub.extend = Super.extend
	  // create asset registers, so extended classes
	  // can have their private assets too.
	  config._assetTypes.forEach(function (type) {
	    Sub[type] = Super[type]
	  })
	  // enable recursive self-lookup
	  if (name) {
	    Sub.options.components[name] = Sub
	  }
	  // cache constructor
	  if (isFirstExtend) {
	    extendOptions._Ctor = Sub
	  }
	  return Sub
	}
	
	/**
	 * A function that returns a sub-class constructor with the
	 * given name. This gives us much nicer output when
	 * logging instances in the console.
	 *
	 * @param {String} name
	 * @return {Function}
	 */
	
	function createClass (name) {
	  return new Function(
	    'return function ' + _.classify(name) +
	    ' (options) { this._init(options) }'
	  )()
	}
	
	/**
	 * Plugin system
	 *
	 * @param {Object} plugin
	 */
	
	exports.use = function (plugin) {
	  /* istanbul ignore if */
	  if (plugin.installed) {
	    return
	  }
	  // additional parameters
	  var args = _.toArray(arguments, 1)
	  args.unshift(this)
	  if (typeof plugin.install === 'function') {
	    plugin.install.apply(plugin, args)
	  } else {
	    plugin.apply(null, args)
	  }
	  plugin.installed = true
	  return this
	}
	
	/**
	 * Apply a global mixin by merging it into the default
	 * options.
	 */
	
	exports.mixin = function (mixin) {
	  var Vue = _.Vue
	  Vue.options = _.mergeOptions(Vue.options, mixin)
	}
	
	/**
	 * Create asset registration methods with the following
	 * signature:
	 *
	 * @param {String} id
	 * @param {*} definition
	 */
	
	config._assetTypes.forEach(function (type) {
	  exports[type] = function (id, definition) {
	    if (!definition) {
	      return this.options[type + 's'][id]
	    } else {
	      if (
	        type === 'component' &&
	        _.isPlainObject(definition)
	      ) {
	        definition.name = id
	        definition = _.Vue.extend(definition)
	      }
	      this.options[type + 's'][id] = definition
	      return definition
	    }
	  }
	})


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	
	_.extend(exports, __webpack_require__(42))
	_.extend(exports, __webpack_require__(53))


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var compileProps = __webpack_require__(43)
	var config = __webpack_require__(32)
	var textParser = __webpack_require__(33)
	var dirParser = __webpack_require__(35)
	var newDirParser = __webpack_require__(44)
	var templateParser = __webpack_require__(51)
	var resolveAsset = _.resolveAsset
	var componentDef = __webpack_require__(52)
	
	// special binding prefixes
	var bindRE = /^:|^v-bind:/
	var onRE = /^@/
	var argRE = /:(.*)$/
	var literalRE = /\.literal$/
	
	// terminal directives
	var terminalDirectives = [
	  'repeat',
	  'for',
	  'if'
	]
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	exports.compile = function (el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent
	    ? compileNode(el, options)
	    : null
	  // link function for the childNodes
	  var childLinkFn =
	    !(nodeLinkFn && nodeLinkFn.terminal) &&
	    el.tagName !== 'SCRIPT' &&
	    el.hasChildNodes()
	      ? compileNodeList(el.childNodes, options)
	      : null
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn (vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = _.toArray(el.childNodes)
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer () {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag)
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag)
	    }, vm)
	    return makeUnlinkFn(vm, dirs)
	  }
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture (linker, vm) {
	  var originalDirCount = vm._directives.length
	  linker()
	  var dirs = vm._directives.slice(originalDirCount)
	  dirs.sort(directiveComparator)
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind()
	  }
	  return dirs
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator (a, b) {
	  a = a._def.priority || 0
	  b = b._def.priority || 0
	  return a > b ? -1 : a === b ? 0 : 1
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn (vm, dirs, context, contextDirs) {
	  return function unlink (destroying) {
	    teardownDirs(vm, dirs, destroying)
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs)
	    }
	  }
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs (vm, dirs, destroying) {
	  var i = dirs.length
	  while (i--) {
	    dirs[i]._teardown()
	    if (!destroying) {
	      vm._directives.$remove(dirs[i])
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	exports.compileAndLinkProps = function (vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props)
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope)
	  }, vm)
	  return makeUnlinkFn(vm, propDirs)
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	exports.compileRoot = function (el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs
	  var replacerAttrs = options._replacerAttrs
	  var contextLinkFn, replacerLinkFn
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions)
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options)
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options)
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    containerAttrs.forEach(function (attr) {
	      if (attr.name.indexOf('v-') === 0 || attr.name === 'transition') {
	        _.warn(
	          attr.name + ' is ignored on component ' +
	          '<' + options.el.tagName.toLowerCase() + '> because ' +
	          'the component is a fragment instance: ' +
	          'http://vuejs.org/guide/components.html#Fragment_Instance'
	        )
	      }
	    })
	  }
	
	  return function rootLinkFn (vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context
	    var contextDirs
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope)
	      }, context)
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el)
	    }, vm)
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs)
	  }
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode (node, options) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production' && !config.interpolate) {
	    _.deprecation.INTERPOLATE()
	  }
	
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && config.interpolate && node.data.trim()) {
	    return compileTextNode(node, options)
	  } else {
	    return null
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement (el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as a v-attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = textParser.parse(el.value)
	    if (tokens) {
	      el.setAttribute(':value', textParser.tokensToExp(tokens))
	      el.value = ''
	    }
	  }
	  var linkFn
	  var hasAttrs = el.hasAttributes()
	  // check terminal directives (repeat & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options)
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options)
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options, hasAttrs)
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options)
	  }
	  return linkFn
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode (node, options) {
	  var tokens = textParser.parse(node.data)
	  if (!tokens) {
	    return null
	  }
	  var frag = document.createDocumentFragment()
	  var el, token
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i]
	    el = token.tag
	      ? processTextToken(token, options)
	      : document.createTextNode(token.value)
	    frag.appendChild(el)
	  }
	  return makeTextNodeLinkFn(tokens, frag, options)
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken (token, options) {
	  var el
	  if (token.oneTime) {
	    el = document.createTextNode(token.value)
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html')
	      setTokenType('html')
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ')
	      setTokenType('text')
	    }
	  }
	  function setTokenType (type) {
	    token.type = type
	    token.def = resolveAsset(options, 'directives', type)
	    token.descriptor = dirParser.parse(token.value)[0]
	  }
	  return el
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn (tokens, frag) {
	  return function textNodeLinkFn (vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true)
	    var childNodes = _.toArray(fragClone.childNodes)
	    var token, value, node
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i]
	      value = token.value
	      if (token.tag) {
	        node = childNodes[i]
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value)
	          if (token.html) {
	            _.replace(node, templateParser.parse(value, true))
	          } else {
	            node.data = value
	          }
	        } else {
	          vm._bindDir(token.type, node,
	                      token.descriptor, token.def, host, scope)
	        }
	      }
	    }
	    _.replace(el, fragClone)
	  }
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList (nodeList, options) {
	  var linkFns = []
	  var nodeLinkFn, childLinkFn, node
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i]
	    nodeLinkFn = compileNode(node, options)
	    childLinkFn =
	      !(nodeLinkFn && nodeLinkFn.terminal) &&
	      node.tagName !== 'SCRIPT' &&
	      node.hasChildNodes()
	        ? compileNodeList(node.childNodes, options)
	        : null
	    linkFns.push(nodeLinkFn, childLinkFn)
	  }
	  return linkFns.length
	    ? makeChildLinkFn(linkFns)
	    : null
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn (linkFns) {
	  return function childLinkFn (vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n]
	      nodeLinkFn = linkFns[i++]
	      childrenLinkFn = linkFns[i++]
	      // cache childNodes before linking parent, fix #657
	      var childNodes = _.toArray(node.childNodes)
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag)
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag)
	      }
	    }
	  }
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives (el, options) {
	  var tag = el.tagName.toLowerCase()
	  if (_.commonTagRE.test(tag)) return
	  var def = resolveAsset(options, 'elementDirectives', tag)
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def)
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Boolean} hasAttrs
	 * @return {Function|undefined}
	 */
	
	function checkComponent (el, options, hasAttrs) {
	  var componentId = _.checkComponent(el, options, hasAttrs)
	  if (componentId) {
	    var componentLinkFn = function (vm, el, host, scope, frag) {
	      vm._bindDir('component', el, {
	        expression: componentId
	      }, componentDef, host, scope, frag)
	    }
	    componentLinkFn.terminal = true
	    return componentLinkFn
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives (el, options) {
	  // skip v-pre
	  if (_.attr(el, 'pre') !== null) {
	    return skip
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute(config.prefix + 'else')) {
	    var prev = el.previousElementSibling
	    if (prev && prev.hasAttribute(config.prefix + 'if')) {
	      return skip
	    }
	  }
	  var value, dirName
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i]
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute(config.prefix + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options)
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}
	
	function skip () {}
	skip.terminal = true
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn (el, dirName, value, options, def) {
	  var descriptor = dirParser.parse(value)[0]
	  // no need to call resolveAsset since terminal directives
	  // are always internal
	  def = def || options.directives[dirName]
	  var fn = function terminalNodeLinkFn (vm, el, host, scope, frag) {
	    vm._bindDir(dirName, el, descriptor, def, host, scope, frag)
	  }
	  fn.terminal = true
	  return fn
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives (attrs, options) {
	  var i = attrs.length
	  var dirs = []
	  var attr, name, value, dir, dirName, dirDef, isLiteral, arg
	  while (i--) {
	    attr = attrs[i]
	    name = attr.name
	    value = attr.value
	
	    // special case for transition
	    if (
	      name === 'transition' ||
	      name === ':transition' ||
	      name === (config.prefix + 'bind:transition')
	    ) {
	      dirs.push({
	        name: 'transition',
	        arg: bindRE.test(name),
	        descriptors: [newDirParser.parse(value)],
	        def: options.directives.transition
	      })
	    } else
	
	    // event handlers
	    if (onRE.test(name)) {
	      dirs.push({
	        name: 'on',
	        arg: name.replace(onRE, ''),
	        descriptors: [newDirParser.parse(value)],
	        def: options.directives.on
	      })
	    } else
	
	    // attribute bindings
	    if (bindRE.test(name)) {
	      var attributeName = name.replace(bindRE, '')
	      if (attributeName === 'style' || attributeName === 'class') {
	        dirName = attributeName
	        arg = undefined
	      } else {
	        dirName = 'attr'
	        arg = attributeName
	      }
	      dirs.push({
	        name: dirName,
	        arg: arg,
	        descriptors: [newDirParser.parse(value)],
	        def: options.directives[dirName]
	      })
	    } else
	
	    // Core directive
	    if (name.indexOf(config.prefix) === 0) {
	      // check literal
	      if (literalRE.test(name)) {
	        isLiteral = true
	        name = name.replace(literalRE, '')
	      } else {
	        isLiteral = false
	      }
	      // check argument
	      arg = (arg = name.match(argRE)) && arg[1]
	      // extract directive name
	      dirName = name
	        .slice(config.prefix.length)
	        .replace(argRE, '')
	
	      // skip v-else (when used with v-show)
	      if (dirName === 'else') {
	        continue
	      }
	
	      dirDef = resolveAsset(options, 'directives', dirName)
	      if (process.env.NODE_ENV !== 'production') {
	        _.assertAsset(dirDef, 'directive', dirName)
	
	        // deprecations
	        if (dirName === 'transition') {
	          _.deprecation.V_TRANSITION()
	        } else if (dirName === 'attr') {
	          _.deprecation.V_ATTR()
	        } else if (dirName === 'class') {
	          _.deprecation.V_CLASS()
	        } else if (dirName === 'style') {
	          _.deprecation.V_STYLE()
	        }
	
	      }
	      if (dirDef) {
	        dirs.push({
	          name: dirName,
	          descriptors: dirParser.parse(value),
	          def: dirDef,
	          arg: arg,
	          literal: isLiteral
	        })
	      }
	    } else
	
	    // TODO: remove this in 1.0.0
	    if (config.interpolate) {
	      dir = collectAttrDirective(name, value, options)
	      if (dir) {
	        dirs.push(dir)
	      }
	    }
	  }
	  // sort by priority, LOW to HIGH
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs)
	  }
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn (directives) {
	  return function nodeLinkFn (vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length
	    var dir, j, k
	    while (i--) {
	      dir = directives[i]
	      if (dir._link) {
	        // custom link fn
	        dir._link(vm, el, scope)
	      } else {
	        // TODO: no need for loop here in 1.0.0
	        // also, we can just pass in the dir object to _bindDir,
	        // which is going to be much simpler.
	        k = dir.descriptors.length
	        for (j = 0; j < k; j++) {
	          vm._bindDir(dir.name, el,
	            dir.descriptors[j], dir.def, host, scope, frag, dir.arg, dir.literal)
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Check an attribute for potential dynamic bindings,
	 * and return a directive object.
	 *
	 * Special case: class interpolations are translated into
	 * v-class instead v-attr, so that it can work with user
	 * provided v-class bindings.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Object}
	 */
	
	function collectAttrDirective (name, value, options) {
	  var tokens = textParser.parse(value)
	  var isClass = name === 'class'
	  if (tokens) {
	    var dirName = isClass ? 'class' : 'attr'
	    var def = options.directives[dirName]
	    var i = tokens.length
	    var allOneTime = true
	    while (i--) {
	      var token = tokens[i]
	      if (token.tag && !token.oneTime) {
	        allOneTime = false
	      } else if (token.tag) {
	        process.env.NODE_ENV !== 'production' &&
	        _.deprecation.ATTR_ONETIME(name, value)
	      }
	    }
	    var linker
	    if (allOneTime) {
	      linker = function (vm, el, scope) {
	        el.setAttribute(name, (scope || vm).$interpolate(value))
	      }
	    } else {
	      linker = function (vm, el, scope) {
	        var exp = textParser.tokensToExp(tokens, (scope || vm))
	
	        // silence the argument deprecation warning
	        var silent = config.silent
	        config.silent = true
	        var desc = isClass
	          ? dirParser.parse(exp)[0]
	          : dirParser.parse(name + ':' + exp)[0]
	        config.silent = silent
	
	        if (isClass) {
	          desc._rawClass = value
	        }
	        vm._bindDir(dirName, el, desc, def, undefined, scope)
	      }
	    }
	    return {
	      def: def,
	      _link: linker
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var dirParser = __webpack_require__(44)
	var textParser = __webpack_require__(33)
	var propDef = __webpack_require__(45)
	var propBindingModes = __webpack_require__(32)._propBindingModes
	
	// regexes
	var identRE = __webpack_require__(49).identRE
	var dataAttrRE = /^data-/
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/
	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	// TODO: 1.0.0 we can just loop through el.attributes and
	// check for prop- prefixes.
	
	module.exports = function compileProps (el, propOptions) {
	  var props = []
	  var i = propOptions.length
	  var options, name, attr, value, path, prop, literal, single, parsed
	  while (i--) {
	    options = propOptions[i]
	    name = options.name
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (name === '$data') {
	        _.deprecation.DATA_AS_PROP()
	      }
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = _.camelize(name.replace(dataAttrRE, ''))
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop key: "' + name + '". Prop keys ' +
	        'must be valid identifiers.'
	      )
	      continue
	    }
	    attr = _.hyphenate(name)
	    value = el.getAttribute(attr)
	
	    if (value === null) {
	      value = el.getAttribute('data-' + attr)
	      if (value !== null) {
	        attr = 'data-' + attr
	        if (process.env.NODE_ENV !== 'production') {
	          _.deprecation.DATA_PROPS(attr, value)
	        }
	      }
	    }
	
	    // create a prop descriptor
	    prop = {
	      name: name,
	      raw: value,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY
	    }
	    if (value !== null) {
	      // important so that this doesn't get compiled
	      // again as a normal attribute binding
	      el.removeAttribute(attr)
	      var tokens = textParser.parse(value)
	      if (tokens) {
	
	        if (process.env.NODE_ENV !== 'production') {
	          _.deprecation.PROPS(attr, value)
	        }
	
	        prop.dynamic = true
	        prop.parentPath = textParser.tokensToExp(tokens)
	        // check prop binding type.
	        single = tokens.length === 1
	        literal = literalValueRE.test(prop.parentPath)
	        // one time: {{* prop}}
	        if (literal || (single && tokens[0].oneTime)) {
	          prop.mode = propBindingModes.ONE_TIME
	        } else if (
	          !literal &&
	          (single && tokens[0].twoWay)
	        ) {
	          if (settablePathRE.test(prop.parentPath)) {
	            prop.mode = propBindingModes.TWO_WAY
	          } else {
	            process.env.NODE_ENV !== 'production' && _.warn(
	              'Cannot bind two-way prop with non-settable ' +
	              'parent path: ' + prop.parentPath
	            )
	          }
	        }
	      }
	    } else {
	      // new syntax, check binding type
	      if ((value = _.getBindAttr(el, attr)) === null) {
	        if ((value = _.getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY
	        } else if ((value = _.getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME
	        }
	      }
	      prop.raw = value
	      if (value !== null) {
	        // mark it so we know this is a bind
	        prop.bindSyntax = true
	        parsed = dirParser.parse(value)
	        value = parsed.expression
	        prop.filters = parsed.filters
	        // check literal
	        if (literalValueRE.test(value)) {
	          prop.raw = _.stripQuotes(value) || value
	        } else {
	          prop.dynamic = true
	          // check non-settable path for two-way bindings
	          if (process.env.NODE_ENV !== 'production' &&
	              prop.mode === propBindingModes.TWO_WAY &&
	              !settablePathRE.test(value)) {
	            prop.mode = propBindingModes.ONE_WAY
	            _.warn(
	              'Cannot bind two-way prop with non-settable ' +
	              'parent path: ' + value
	            )
	          }
	        }
	      }
	      prop.parentPath = value
	    }
	
	    // warn required two-way
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      value !== null &&
	      options.twoWay &&
	      prop.mode !== propBindingModes.TWO_WAY
	    ) {
	      _.warn(
	        'Prop "' + name + '" expects a two-way binding type.'
	      )
	    }
	
	    // warn missing required
	    if (value === null && options.required) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Missing required prop: ' + name
	      )
	    }
	
	    // push prop
	    props.push(prop)
	  }
	  return makePropsLinkFn(props)
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn (props) {
	  return function propsLinkFn (vm, scope) {
	    // store resolved props info
	    vm._props = {}
	    var i = props.length
	    var prop, path, options, value
	    while (i--) {
	      prop = props[i]
	      path = prop.path
	      vm._props[path] = prop
	      options = prop.options
	      if (prop.raw === null) {
	        // initialize absent prop
	        _.initProp(vm, prop, getDefault(vm, options))
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath)
	            _.initProp(vm, prop, value)
	          } else {
	            // dynamic binding
	            vm._bindDir('prop', null, prop, propDef, null, scope)
	          }
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Cannot bind dynamic prop on a root instance' +
	            ' with no parent: ' + prop.name + '="' +
	            prop.raw + '"'
	          )
	        }
	      } else {
	        // literal, cast it and just set once
	        var raw = prop.raw
	        if (options.type === Boolean && raw === '') {
	          value = true
	        } else if (raw.trim()) {
	          value = _.toBoolean(_.toNumber(raw))
	          if (process.env.NODE_ENV !== 'production' &&
	              !prop.bindSyntax &&
	              value !== raw) {
	            _.deprecation.PROP_CASTING(prop.name, prop.raw)
	          }
	        } else {
	          value = raw
	        }
	        _.initProp(vm, prop, value)
	      }
	    }
	  }
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */
	
	function getDefault (vm, options) {
	  // no default, return undefined
	  if (!options.hasOwnProperty('default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean
	      ? false
	      : undefined
	  }
	  var def = options.default
	  // warn against non-factory defaults for Object & Array
	  if (_.isObject(def)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Object/Array as default prop values will be shared ' +
	      'across multiple instances. Use a factory function ' +
	      'to return the default value instead.'
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function
	    ? def.call(vm)
	    : def
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var Cache = __webpack_require__(34)
	var cache = new Cache(1000)
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g
	var reservedArgRE = /^in$|^-?\d+/
	
	/**
	 * Parser state
	 */
	
	var str, dir
	var c, i, l, lastFilterIndex
	var inSingle, inDouble, curly, square, paren
	
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg)
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg (arg) {
	  var stripped = reservedArgRE.test(arg)
	    ? arg
	    : _.stripQuotes(arg)
	  var dynamic = stripped === false
	  return {
	    value: dynamic ? arg : stripped,
	    dynamic: dynamic
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */
	
	exports.parse = function (s) {
	
	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }
	
	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = 0
	  lastFilterIndex = 0
	  dir = { raw: s }
	
	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(0, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim()
	  } else if (lastFilterIndex !== 0) {
	    pushFilter()
	  }
	
	  cache.put(s, dir)
	  return dir
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// NOTE: the prop internal directive is compiled and linked
	// during _initScope(), before the created hook is called.
	// The purpose is to make the initial prop values available
	// inside `created` hooks and `data` functions.
	
	var _ = __webpack_require__(27)
	var Watcher = __webpack_require__(46)
	var bindingModes = __webpack_require__(32)._propBindingModes
	
	module.exports = {
	
	  bind: function () {
	
	    var child = this.vm
	    var parent = child._context
	    // passed in from compiler directly
	    var prop = this._descriptor
	    var childKey = prop.path
	    var parentKey = prop.parentPath
	    var twoWay = prop.mode === bindingModes.TWO_WAY
	
	    var parentWatcher = this.parentWatcher = new Watcher(
	      parent,
	      parentKey,
	      function (val) {
	        if (_.assertProp(prop, val)) {
	          child[childKey] = val
	        }
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // repeat scope if present
	        scope: this._scope
	      }
	    )
	
	    // set the child initial value.
	    var value = parentWatcher.value
	    if (childKey === '$data') {
	      child._data = value
	    } else {
	      _.initProp(child, prop, value)
	    }
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(
	          child,
	          childKey,
	          function (val) {
	            parentWatcher.set(val)
	          }
	        )
	      })
	    }
	  },
	
	  unbind: function () {
	    this.parentWatcher.teardown()
	    if (this.childWatcher) {
	      this.childWatcher.teardown()
	    }
	  }
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var Dep = __webpack_require__(47)
	var expParser = __webpack_require__(48)
	var batcher = __webpack_require__(50)
	var uid = 0
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher (vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    _.extend(this, options)
	  }
	  var isFn = typeof expOrFn === 'function'
	  this.vm = vm
	  vm._watchers.push(this)
	  this.expression = isFn ? expOrFn.toString() : expOrFn
	  this.cb = cb
	  this.id = ++uid // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = Object.create(null)
	  this.newDeps = null
	  this.prevError = null // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn
	    this.setter = undefined
	  } else {
	    var res = expParser.parse(expOrFn, this.twoWay)
	    this.getter = res.get
	    this.setter = res.set
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false
	}
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep
	    if (!this.deps[id]) {
	      this.deps[id] = dep
	      dep.addSub(this)
	    }
	  }
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet()
	  var scope = this.scope || this.vm
	  var value
	  try {
	    value = this.getter.call(scope, scope)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating expression "' +
	        this.expression + '". ' +
	        (config.debug
	          ? ''
	          : 'Turn on debug mode to see stack trace.'
	        ), e
	      )
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value)
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false)
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value)
	  }
	  this.afterGet()
	  return value
	}
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm
	  if (this.filters) {
	    value = scope._applyFilters(
	      value, this.value, this.filters, true)
	  }
	  try {
	    this.setter.call(scope, scope, value)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating setter "' +
	        this.expression + '"', e
	      )
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using two-way binding on ' +
	        'a v-for alias, and the v-for has filters. ' +
	        'This will not work properly. Either remove the ' +
	        'filters or use an array of objects and bind to ' +
	        'object properties instead.'
	      )
	      return
	    }
	    if (scope.$key) { // original is an object
	      forContext.rawValue[scope.$key] = value
	    } else {
	      forContext.rawValue.$set(scope.$index, value)
	    }
	  }
	}
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this
	  this.newDeps = Object.create(null)
	}
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null
	  var ids = Object.keys(this.deps)
	  var i = ids.length
	  while (i--) {
	    var id = ids[i]
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this)
	    }
	  }
	  this.deps = this.newDeps
	}
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync || !config.async) {
	    this.run()
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued
	      ? shallow
	        ? this.shallow
	        : false
	      : !!shallow
	    this.queued = true
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace')
	    }
	    batcher.push(this)
	  }
	}
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get()
	    if (
	      value !== this.value ||
	      // Deep watchers and Array watchers should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      ((_.isArray(value) || this.deep) && !this.shallow)
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          config.debug && prevError) {
	        this.prevError = null
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          _.nextTick(function () {
	            throw prevError
	          }, 0)
	          throw e
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	    this.queued = this.shallow = false
	  }
	}
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target
	  this.value = this.get()
	  this.dirty = false
	  Dep.target = current
	}
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps)
	  var i = depIds.length
	  while (i--) {
	    this.deps[depIds[i]].depend()
	  }
	}
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this)
	    }
	    var depIds = Object.keys(this.deps)
	    var i = depIds.length
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this)
	    }
	    this.active = false
	    this.vm = this.cb = this.value = null
	  }
	}
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {Object} obj
	 */
	
	function traverse (obj) {
	  var key, val, i
	  for (key in obj) {
	    val = obj[key]
	    if (_.isArray(val)) {
	      i = val.length
	      while (i--) traverse(val[i])
	    } else if (_.isObject(val)) {
	      traverse(val)
	    }
	  }
	}
	
	module.exports = Watcher
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var uid = 0
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	function Dep () {
	  this.id = uid++
	  this.subs = []
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub)
	}
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub)
	}
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this)
	}
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs)
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	}
	
	module.exports = Dep


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Path = __webpack_require__(49)
	var Cache = __webpack_require__(34)
	var expressionCache = new Cache(1000)
	
	var allowedKeywords =
	  'Math,Date,this,true,false,null,undefined,Infinity,NaN,' +
	  'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' +
	  'encodeURIComponent,parseInt,parseFloat'
	var allowedKeywordsRE =
	  new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)')
	
	// keywords that don't make sense inside expressions
	var improperKeywords =
	  'break,case,class,catch,const,continue,debugger,default,' +
	  'delete,do,else,export,extends,finally,for,function,if,' +
	  'import,in,instanceof,let,return,super,switch,throw,try,' +
	  'var,while,with,yield,enum,await,implements,package,' +
	  'proctected,static,interface,private,public'
	var improperKeywordsRE =
	  new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)')
	
	var wsRE = /\s/g
	var newlineRE = /\n/g
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g
	var restoreRE = /"(\d+)"/g
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
	var booleanLiteralRE = /^(true|false)$/
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = []
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save (str, isString) {
	  var i = saved.length
	  saved[i] = isString
	    ? str.replace(newlineRE, '\\n')
	    : str
	  return '"' + i + '"'
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite (raw) {
	  var c = raw.charAt(0)
	  var path = raw.slice(1)
	  if (allowedKeywordsRE.test(path)) {
	    return raw
	  } else {
	    path = path.indexOf('"') > -1
	      ? path.replace(restoreRE, restore)
	      : path
	    return c + 'scope.' + path
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore (str, i) {
	  return saved[i]
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function compileExpFns (exp, needSet) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Avoid using reserved keywords in expression: ' + exp
	    )
	  }
	  // reset state
	  saved.length = 0
	  // save strings and object literal keys
	  var body = exp
	    .replace(saveRE, save)
	    .replace(wsRE, '')
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body)
	    .replace(pathReplaceRE, rewrite)
	    .replace(restoreRE, restore)
	  var getter = makeGetter(body)
	  if (getter) {
	    return {
	      get: getter,
	      body: body,
	      set: needSet
	        ? makeSetter(body)
	        : null
	    }
	  }
	}
	
	/**
	 * Compile getter setters for a simple path.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compilePathFns (exp) {
	  var getter, path
	  if (exp.indexOf('[') < 0) {
	    // really simple path
	    path = exp.split('.')
	    path.raw = exp
	    getter = Path.compileGetter(path)
	  } else {
	    // do the real parsing
	    path = Path.parse(exp)
	    getter = path.get
	  }
	  return {
	    get: getter,
	    // always generate setter for simple paths
	    set: function (obj, val) {
	      Path.set(obj, path, val)
	    }
	  }
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetter (body) {
	  try {
	    return new Function('scope', 'return ' + body + ';')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid expression. ' +
	      'Generated function body: ' + body
	    )
	  }
	}
	
	/**
	 * Build a setter function.
	 *
	 * This is only needed in rare situations like "a[b]" where
	 * a settable path requires dynamic evaluation.
	 *
	 * This setter function may throw error when called if the
	 * expression body is not a valid left-hand expression in
	 * assignment.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeSetter (body) {
	  try {
	    return new Function('scope', 'value', body + '=value;')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid setter function body: ' + body
	    )
	  }
	}
	
	/**
	 * Check for setter existence on a cache hit.
	 *
	 * @param {Function} hit
	 */
	
	function checkSetter (hit) {
	  if (!hit.set) {
	    hit.set = makeSetter(hit.body)
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	exports.parse = function (exp, needSet) {
	  exp = exp.trim()
	  // try cache
	  var hit = expressionCache.get(exp)
	  if (hit) {
	    if (needSet) {
	      checkSetter(hit)
	    }
	    return hit
	  }
	  // we do a simple path check to optimize for them.
	  // the check fails valid paths with unusal whitespaces,
	  // but that's too rare and we don't care.
	  // also skip boolean literals and paths that start with
	  // global "Math"
	  var res = exports.isSimplePath(exp)
	    ? compilePathFns(exp)
	    : compileExpFns(exp, needSet)
	  expressionCache.put(exp, res)
	  return res
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	exports.isSimplePath = function (exp) {
	  return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.'
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Cache = __webpack_require__(34)
	var pathCache = new Cache(1000)
	var identRE = exports.identRE = /^[$_a-zA-Z]+[\w$]*$/
	
	// actions
	var APPEND = 0
	var PUSH = 1
	
	// states
	var BEFORE_PATH = 0
	var IN_PATH = 1
	var BEFORE_IDENT = 2
	var IN_IDENT = 3
	var BEFORE_ELEMENT = 4
	var AFTER_ZERO = 5
	var IN_INDEX = 6
	var IN_SINGLE_QUOTE = 7
	var IN_DOUBLE_QUOTE = 8
	var IN_SUB_PATH = 9
	var AFTER_ELEMENT = 10
	var AFTER_PATH = 11
	var ERROR = 12
	
	var pathStateMachine = []
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	}
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [BEFORE_ELEMENT, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	}
	
	pathStateMachine[BEFORE_ELEMENT] = {
	  'ws': [BEFORE_ELEMENT],
	  '0': [AFTER_ZERO, APPEND],
	  'number': [IN_INDEX, APPEND],
	  "'": [IN_SINGLE_QUOTE, APPEND, ''],
	  '"': [IN_DOUBLE_QUOTE, APPEND, ''],
	  'ident': [IN_SUB_PATH, APPEND, '*']
	}
	
	pathStateMachine[AFTER_ZERO] = {
	  'ws': [AFTER_ELEMENT, PUSH],
	  ']': [IN_PATH, PUSH]
	}
	
	pathStateMachine[IN_INDEX] = {
	  '0': [IN_INDEX, APPEND],
	  'number': [IN_INDEX, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	}
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	}
	
	pathStateMachine[IN_SUB_PATH] = {
	  'ident': [IN_SUB_PATH, APPEND],
	  '0': [IN_SUB_PATH, APPEND],
	  'number': [IN_SUB_PATH, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}
	
	pathStateMachine[AFTER_ELEMENT] = {
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType (ch) {
	  if (ch === undefined) {
	    return 'eof'
	  }
	
	  var code = ch.charCodeAt(0)
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30: // 0
	      return ch
	
	    case 0x5F: // _
	    case 0x24: // $
	      return 'ident'
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0:  // No-break space
	    case 0xFEFF:  // Byte Order Mark
	    case 0x2028:  // Line Separator
	    case 0x2029:  // Paragraph Separator
	      return 'ws'
	  }
	
	  // a-z, A-Z
	  if (
	    (code >= 0x61 && code <= 0x7A) ||
	    (code >= 0x41 && code <= 0x5A)
	  ) {
	    return 'ident'
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number'
	  }
	
	  return 'else'
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath (path) {
	  var keys = []
	  var index = -1
	  var mode = BEFORE_PATH
	  var c, newChar, key, type, transition, action, typeMap
	
	  var actions = []
	  actions[PUSH] = function () {
	    if (key === undefined) {
	      return
	    }
	    keys.push(key)
	    key = undefined
	  }
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar
	    } else {
	      key += newChar
	    }
	  }
	
	  function maybeUnescapeQuote () {
	    var nextChar = path[index + 1]
	    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
	        (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
	      index++
	      newChar = nextChar
	      actions[APPEND]()
	      return true
	    }
	  }
	
	  while (mode != null) {
	    index++
	    c = path[index]
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue
	    }
	
	    type = getPathCharType(c)
	    typeMap = pathStateMachine[mode]
	    transition = typeMap[type] || typeMap['else'] || ERROR
	
	    if (transition === ERROR) {
	      return // parse error
	    }
	
	    mode = transition[0]
	    action = actions[transition[1]]
	    if (action) {
	      newChar = transition[2]
	      newChar = newChar === undefined
	        ? c
	        : newChar === '*'
	          ? newChar + c
	          : newChar
	      action()
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path
	      return keys
	    }
	  }
	}
	
	/**
	 * Format a accessor segment based on its type.
	 *
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function formatAccessor (key) {
	  if (identRE.test(key)) { // identifier
	    return '.' + key
	  } else if (+key === key >>> 0) { // bracket index
	    return '[' + key + ']'
	  } else if (key.charAt(0) === '*') {
	    return '[o' + formatAccessor(key.slice(1)) + ']'
	  } else { // bracket string
	    return '["' + key.replace(/"/g, '\\"') + '"]'
	  }
	}
	
	/**
	 * Compiles a getter function with a fixed path.
	 * The fixed path getter supresses errors.
	 *
	 * @param {Array} path
	 * @return {Function}
	 */
	
	exports.compileGetter = function (path) {
	  var body = 'return o' + path.map(formatAccessor).join('')
	  return new Function('o', body)
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	exports.parse = function (path) {
	  var hit = pathCache.get(path)
	  if (!hit) {
	    hit = parsePath(path)
	    if (hit) {
	      hit.get = exports.compileGetter(hit)
	      pathCache.put(path, hit)
	    }
	  }
	  return hit
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	exports.get = function (obj, path) {
	  path = exports.parse(path)
	  if (path) {
	    return path.get(obj)
	  }
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    _.warn(
	      'You are setting a non-existent path "' + path.raw + '" ' +
	      'on a vm instance. Consider pre-initializing the property ' +
	      'with the "data" option for more reliable reactivity ' +
	      'and better performance.'
	    )
	  }
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	exports.set = function (obj, path, val) {
	  var original = obj
	  if (typeof path === 'string') {
	    path = exports.parse(path)
	  }
	  if (!path || !_.isObject(obj)) {
	    return false
	  }
	  var last, key
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj
	    key = path[i]
	    if (key.charAt(0) === '*') {
	      key = original[key.slice(1)]
	    }
	    if (i < l - 1) {
	      obj = obj[key]
	      if (!_.isObject(obj)) {
	        obj = {}
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(last, key, obj)
	      }
	    } else {
	      if (_.isArray(obj)) {
	        obj.$set(key, val)
	      } else if (key in obj) {
	        obj[key] = val
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(obj, key, val)
	      }
	    }
	  }
	  return true
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = []
	var userQueue = []
	var has = {}
	var circular = {}
	var waiting = false
	var internalQueueDepleted = false
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState () {
	  queue = []
	  userQueue = []
	  has = {}
	  circular = {}
	  waiting = internalQueueDepleted = false
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue () {
	  runBatcherQueue(queue)
	  internalQueueDepleted = true
	  runBatcherQueue(userQueue)
	  resetBatcherState()
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue (queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i]
	    var id = watcher.id
	    has[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1)
	        _.warn(
	          'You may have an infinite update loop for watcher ' +
	          'with expression: ' + watcher.expression
	        )
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	exports.push = function (watcher) {
	  var id = watcher.id
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run()
	      return
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue
	    has[id] = q.length
	    q.push(watcher)
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      _.nextTick(flushBatcherQueue)
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var Cache = __webpack_require__(34)
	var templateCache = new Cache(1000)
	var idSelectorCache = new Cache(1000)
	
	var map = {
	  _default: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [
	    2,
	    '<table><tbody></tbody><colgroup>',
	    '</colgroup></table>'
	  ]
	}
	
	map.td =
	map.th = [
	  3,
	  '<table><tbody><tr>',
	  '</tr></tbody></table>'
	]
	
	map.option =
	map.optgroup = [
	  1,
	  '<select multiple="multiple">',
	  '</select>'
	]
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>']
	
	map.g =
	map.defs =
	map.symbol =
	map.use =
	map.image =
	map.text =
	map.circle =
	map.ellipse =
	map.line =
	map.path =
	map.polygon =
	map.polyline =
	map.rect = [
	  1,
	  '<svg ' +
	    'xmlns="http://www.w3.org/2000/svg" ' +
	    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
	    'xmlns:ev="http://www.w3.org/2001/xml-events"' +
	    'version="1.1">',
	  '</svg>'
	]
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate (node) {
	  return _.isTemplate(node) &&
	    node.content instanceof DocumentFragment
	}
	
	var tagRE = /<([\w:]+)/
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment (templateString) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString)
	  if (hit) {
	    return hit
	  }
	
	  var frag = document.createDocumentFragment()
	  var tagMatch = templateString.match(tagRE)
	  var entityMatch = entityRE.test(templateString)
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(
	      document.createTextNode(templateString)
	    )
	  } else {
	
	    var tag = tagMatch && tagMatch[1]
	    var wrap = map[tag] || map._default
	    var depth = wrap[0]
	    var prefix = wrap[1]
	    var suffix = wrap[2]
	    var node = document.createElement('div')
	
	    node.innerHTML = prefix + templateString.trim() + suffix
	    while (depth--) {
	      node = node.lastChild
	    }
	
	    var child
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	    /* eslint-enable no-cond-assign */
	      frag.appendChild(child)
	    }
	  }
	
	  templateCache.put(templateString, frag)
	  return frag
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment (node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    _.trimNode(node.content)
	    return node.content
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent)
	  }
	  // normal node, clone it to avoid mutating the original
	  var clone = exports.clone(node)
	  var frag = document.createDocumentFragment()
	  var child
	  /* eslint-disable no-cond-assign */
	  while (child = clone.firstChild) {
	  /* eslint-enable no-cond-assign */
	    frag.appendChild(child)
	  }
	  _.trimNode(frag)
	  return frag
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/show_bug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var a = document.createElement('div')
	    a.innerHTML = '<template>1</template>'
	    return !a.cloneNode(true).firstChild.innerHTML
	  } else {
	    return false
	  }
	})()
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var t = document.createElement('textarea')
	    t.placeholder = 't'
	    return t.cloneNode(true).value === 't'
	  } else {
	    return false
	  }
	})()
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	exports.clone = function (node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode()
	  }
	  var res = node.cloneNode(true)
	  var i, original, cloned
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var clone = res
	    if (isRealTemplate(node)) {
	      node = node.content
	      clone = res.content
	    }
	    original = node.querySelectorAll('template')
	    if (original.length) {
	      cloned = clone.querySelectorAll('template')
	      i = cloned.length
	      while (i--) {
	        cloned[i].parentNode.replaceChild(
	          exports.clone(original[i]),
	          cloned[i]
	        )
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value
	    } else {
	      original = node.querySelectorAll('textarea')
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea')
	        i = cloned.length
	        while (i--) {
	          cloned[i].value = original[i].value
	        }
	      }
	    }
	  }
	  return res
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *    Possible values include:
	 *    - DocumentFragment object
	 *    - Node object of type Template
	 *    - id selector: '#some-template-id'
	 *    - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} clone
	 * @param {Boolean} noSelector
	 * @return {DocumentFragment|undefined}
	 */
	
	exports.parse = function (template, clone, noSelector) {
	  var node, frag
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    _.trimNode(template)
	    return clone
	      ? exports.clone(template)
	      : template
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!noSelector && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template)
	      if (!frag) {
	        node = document.getElementById(template.slice(1))
	        if (node) {
	          frag = nodeToFragment(node)
	          // save selector to cache
	          idSelectorCache.put(template, frag)
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template)
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template)
	  }
	
	  return frag && clone
	    ? exports.clone(frag)
	    : frag
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var templateParser = __webpack_require__(51)
	
	module.exports = {
	
	  isLiteral: true,
	  priority: 1500,
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   v-component="comp"
	   *
	   * - dynamic:
	   *   v-component="{{currentView}}"
	   */
	
	  bind: function () {
	    if (!this.el.__vue__) {
	      // check keep-alive options.
	      // If yes, instead of destroying the active vm when
	      // hiding (v-if) or switching (dynamic literal) it,
	      // we simply remove it from the DOM and save it in a
	      // cache object, with its constructor id as the key.
	      this.keepAlive = this.param('keep-alive') != null
	      // wait for event before insertion
	      this.waitForEvent = this.param('wait-for')
	
	      if (process.env.NODE_ENV !== 'production') {
	        if (this.waitForEvent) {
	          _.deprecation.WAIT_FOR()
	        }
	      }
	
	      // check ref
	      // TODO: only check ref in 1.0.0
	      var ref = this.param(config.prefix + 'ref')
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && ref) {
	        _.deprecation.V_REF()
	      }
	      this.ref = ref || _.findRef(this.el)
	      var refs = (this._scope || this.vm).$
	      if (this.ref && !refs.hasOwnProperty(this.ref)) {
	        _.defineReactive(refs, this.ref, null)
	      }
	
	      if (this.keepAlive) {
	        this.cache = {}
	      }
	      // check inline-template
	      if (this.param('inline-template') !== null) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = _.extractContent(this.el, true)
	      }
	      // component resolution related state
	      this.pendingComponentCb =
	      this.Component = null
	      // transition related state
	      this.pendingRemovals = 0
	      this.pendingRemovalCb = null
	      // if static, build right now.
	      if (!this._isDynamicLiteral) {
	        this.resolveComponent(this.expression, _.bind(this.initStatic, this))
	      } else {
	        // check dynamic component params
	        // create a ref anchor
	        this.anchor = _.createAnchor('v-component')
	        _.replace(this.el, this.anchor)
	        this.transMode = this.param('transition-mode')
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'cannot mount component "' + this.expression + '" ' +
	        'on already mounted element: ' + this.el
	      )
	    }
	  },
	
	  /**
	   * Initialize a static component.
	   */
	
	  initStatic: function () {
	    // wait-for
	    var anchor = this.el
	    var options
	    var waitFor = this.waitForEvent
	    var activateHook = this.Component.options.activate
	    if (waitFor) {
	      options = {
	        created: function () {
	          this.$once(waitFor, insert)
	        }
	      }
	    }
	    var child = this.childVM = this.build(options)
	    if (!this.waitForEvent) {
	      if (activateHook) {
	        activateHook.call(child, insert)
	      } else {
	        child.$before(anchor)
	        _.remove(anchor)
	      }
	    }
	    function insert () {
	      // TODO: no need to fallback to this in 1.0.0
	      // once wait-for is removed
	      (child || this).$before(anchor)
	      _.remove(anchor)
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. v-component="{{view}}"
	   */
	
	  update: function (value) {
	    this.setComponent(value)
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function (value, cb) {
	    this.invalidatePending()
	    if (!value) {
	      // just remove current
	      this.unbuild(true)
	      this.remove(this.childVM, cb)
	      this.childVM = null
	    } else {
	      this.resolveComponent(value, _.bind(function () {
	        this.unbuild(true)
	        var options
	        var self = this
	        var waitFor = this.waitForEvent
	        var activateHook = this.Component.options.activate
	        if (waitFor) {
	          options = {
	            created: function () {
	              this.$once(waitFor, insert)
	            }
	          }
	        }
	        var cached = this.getCached()
	        var newComponent = this.build(options)
	        if ((!waitFor && !activateHook) || cached) {
	          this.transition(newComponent, cb)
	        } else {
	          this.waitingFor = newComponent
	          if (activateHook) {
	            activateHook.call(newComponent, insert)
	          }
	        }
	
	        function insert () {
	          self.waitingFor = null
	          // TODO: no need to fallback to this in 1.0.0
	          // once wait-for is removed
	          self.transition((newComponent || this), cb)
	        }
	      }, this))
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */
	
	  resolveComponent: function (id, cb) {
	    var self = this
	    this.pendingComponentCb = _.cancellable(function (Component) {
	      self.Component = Component
	      cb()
	    })
	    this.vm._resolveComponent(id, this.pendingComponentCb)
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function () {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel()
	      this.pendingComponentCb = null
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function (extraOptions) {
	    var cached = this.getCached()
	    if (cached) {
	      return cached
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        el: templateParser.clone(this.el),
	        template: this.inlineTemplate,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-repeat, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      }
	      // extra options
	      if (extraOptions) {
	        _.extend(options, extraOptions)
	      }
	      var parent = this._host || this.vm
	      var child = parent._addChild(options, this.Component)
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          this.el.hasAttribute('transition') &&
	          child._isFragment) {
	        _.warn(
	          'Transitions will not work on a fragment instance. ' +
	          'Template: ' + child.$options.template
	        )
	      }
	      return child
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function () {
	    return this.keepAlive && this.cache[this.Component.cid]
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function (defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy()
	      this.waitingFor = null
	    }
	    var child = this.childVM
	    if (!child || this.keepAlive) {
	      return
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer)
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function (child, cb) {
	    var keepAlive = this.keepAlive
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++
	      this.pendingRemovalCb = cb
	      var self = this
	      child.$remove(function () {
	        self.pendingRemovals--
	        if (!keepAlive) child._cleanup()
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb()
	          self.pendingRemovalCb = null
	        }
	      })
	    } else if (cb) {
	      cb()
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function (target, cb) {
	    var self = this
	    var current = this.childVM
	    this.childVM = target
	    switch (self.transMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb)
	        })
	        break
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb)
	        })
	        break
	      default:
	        self.remove(current)
	        target.$before(self.anchor, cb)
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function () {
	    this.invalidatePending()
	    // Do not defer cleanup when unbinding
	    this.unbuild()
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy()
	      }
	      this.cache = null
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var templateParser = __webpack_require__(51)
	var specialCharRE = /[#@\*\$\.]/
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-repeat.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	exports.transclude = function (el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el)
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (_.isTemplate(el)) {
	    el = templateParser.parse(el)
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>'
	    }
	    if (options.template) {
	      options._content = _.extractContent(el)
	      el = transcludeTemplate(el, options)
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    _.prepend(_.createAnchor('v-start', true), el)
	    el.appendChild(_.createAnchor('v-end', true))
	  }
	  return el
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate (el, options) {
	  var template = options.template
	  var frag = templateParser.parse(template, true)
	  if (frag) {
	    var replacer = frag.firstChild
	    var tag = replacer.tagName && replacer.tagName.toLowerCase()
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'You are mounting an instance with a template to ' +
	          '<body>. This will replace <body> entirely. You ' +
	          'should probably use `replace: false` here.'
	        )
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        _.resolveAsset(options, 'components', tag) ||
	        // element directive
	        _.resolveAsset(options, 'elementDirectives', tag) ||
	        // attribue based fragment cases
	        isFragment(replacer)
	      ) {
	        return frag
	      } else {
	        options._replacerAttrs = extractAttrs(replacer)
	        mergeAttrs(el, replacer)
	        return replacer
	      }
	    } else {
	      el.appendChild(frag)
	      return el
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid template option: ' + template
	    )
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs (el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return _.toArray(el.attributes)
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs (from, to) {
	  var attrs = from.attributes
	  var i = attrs.length
	  var name, value
	  while (i--) {
	    name = attrs[i].name
	    value = attrs[i].value
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value)
	    } else if (name === 'class') {
	      value = to.getAttribute(name) + ' ' + value
	      to.setAttribute(name, value)
	    }
	  }
	}
	
	/**
	 * Check if a replacer element needs to force the instance
	 * into fragment mode.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isFragment (el) {
	  return el.hasAttributes() && (
	    // alternative component syntax
	    el.hasAttribute('is') ||
	    el.hasAttribute(':is') ||
	    el.hasAttribute(config.prefix + 'bind:is') ||
	    el.hasAttribute(config.prefix + 'component') ||
	    // repeat block
	    el.hasAttribute(config.prefix + 'repeat') ||
	    // for block
	    el.hasAttribute(config.prefix + 'for') ||
	    // if block
	    el.hasAttribute(config.prefix + 'if')
	  )
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var compiler = __webpack_require__(41)
	var templateParser = __webpack_require__(51)
	var Fragment = __webpack_require__(55)
	var Cache = __webpack_require__(34)
	var linkerCache = new Cache(5000)
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	
	function FragmentFactory (vm, el) {
	  this.vm = vm
	  var template
	  var isString = typeof el === 'string'
	  if (isString || _.isTemplate(el)) {
	    template = templateParser.parse(el, true)
	  } else {
	    template = document.createDocumentFragment()
	    template.appendChild(el)
	  }
	  this.template = template
	  // linker can be cached, but only for components
	  var linker
	  var cid = vm.constructor.cid
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML)
	    linker = linkerCache.get(cacheId)
	    if (!linker) {
	      linker = compiler.compile(template, vm.$options, true)
	      linkerCache.put(cacheId, linker)
	    }
	  } else {
	    linker = compiler.compile(template, vm.$options, true)
	  }
	  this.linker = linker
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = templateParser.clone(this.template)
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag)
	}
	
	module.exports = FragmentFactory


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var transition = __webpack_require__(56)
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	
	function Fragment (linker, vm, frag, host, scope, parentFrag) {
	  this.children = []
	  this.childFrags = []
	  this.vm = vm
	  this.scope = scope
	  this.inserted = false
	  this.parentFrag = parentFrag
	  if (parentFrag) {
	    parentFrag.childFrags.push(this)
	  }
	  this.unlink = linker(vm, frag, host, scope, this)
	  var single = this.single = frag.childNodes.length === 1
	  if (single) {
	    this.node = frag.childNodes[0]
	    this.before = singleBefore
	    this.remove = singleRemove
	  } else {
	    this.node = _.createAnchor('fragment-start')
	    this.end = _.createAnchor('fragment-end')
	    this.nodes = _.toArray(frag.childNodes)
	    this.before = multiBefore
	    this.remove = multiRemove
	  }
	  this.node.__vfrag__ = this
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i])
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook)
	  }
	}
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this)
	  }
	  this.unlink()
	}
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} trans
	 */
	
	function singleBefore (target, trans) {
	  var method = trans !== false
	    ? transition.before
	    : _.before
	  method(this.node, target, this.vm)
	  this.inserted = true
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 *
	 * @param {Boolean} [destroy]
	 */
	
	function singleRemove (destroy) {
	  var shouldCallRemove = _.inDoc(this.node)
	  var self = this
	  transition.remove(this.node, this.vm, function () {
	    self.inserted = false
	    if (shouldCallRemove) {
	      self.callHook(detach)
	    }
	    if (destroy) {
	      self.destroy()
	    }
	  })
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 */
	
	function multiBefore (target) {
	  _.before(this.node, target)
	  var nodes = this.nodes
	  var vm = this.vm
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    _.before(nodes[i], target, vm)
	  }
	  _.before(this.end, target)
	  this.inserted = true
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 *
	 * @param {Boolean} [destroy]
	 */
	
	function multiRemove (destroy) {
	  var shouldCallRemove = _.inDoc(this.node)
	  var parent = this.node.parentNode
	  var node = this.node.nextSibling
	  var nodes = this.nodes = []
	  var vm = this.vm
	  var next
	  while (node !== this.end) {
	    nodes.push(node)
	    next = node.nextSibling
	    parent.removeChild(node, vm)
	    node = next
	  }
	  parent.removeChild(this.node)
	  parent.removeChild(this.end)
	  this.inserted = false
	  if (shouldCallRemove) {
	    this.callHook(detach)
	  }
	  if (destroy) {
	    this.destroy()
	  }
	}
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach (child) {
	  if (!child._isAttached) {
	    child._callHook('attached')
	  }
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach (child) {
	  if (child._isAttached) {
	    child._callHook('detached')
	  }
	}
	
	module.exports = Fragment


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	exports.append = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	exports.before = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    _.before(el, target)
	  }, vm, cb)
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	exports.remove = function (el, vm, cb) {
	  apply(el, -1, function () {
	    _.remove(el)
	  }, vm, cb)
	}
	
	/**
	 * Remove by appending to another parent with transition.
	 * This is only used in block operations.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	exports.removeThenAppend = function (el, target, vm, cb) {
	  apply(el, -1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	var apply = exports.apply = function (el, direction, op, vm, cb) {
	  var transition = el.__v_trans
	  if (
	    !transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    (!transition.hooks && !_.transitionEndEvent) ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    (vm.$parent && !vm.$parent._isCompiled)
	  ) {
	    op()
	    if (cb) cb()
	    return
	  }
	  var action = direction > 0 ? 'enter' : 'leave'
	  transition[action](op, cb)
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// TODO: only expose core in 1.0.0
	
	// manipulation directives
	exports.text = __webpack_require__(58)
	exports.html = __webpack_require__(59)
	exports.attr = __webpack_require__(60)
	exports.show = __webpack_require__(61)
	exports['class'] = __webpack_require__(62)
	exports.el = __webpack_require__(63)
	exports.ref = __webpack_require__(64)
	exports.cloak = __webpack_require__(65)
	exports.style = __webpack_require__(66)
	exports.transition = __webpack_require__(67)
	
	// event listener directives
	exports.on = __webpack_require__(70)
	exports.model = __webpack_require__(71)
	
	// logic control directives
	exports.repeat = __webpack_require__(76)
	exports['for'] = __webpack_require__(77)
	exports['if'] = __webpack_require__(78)
	
	// internal directives that should not be used directly
	// but we still want to expose them for advanced usage.
	exports._component = __webpack_require__(52)
	exports._prop = __webpack_require__(45)
	
	// 1.0.0 compat
	exports.bind = exports.attr


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	
	module.exports = {
	
	  bind: function () {
	    this.attr = this.el.nodeType === 3
	      ? 'data'
	      : 'textContent'
	  },
	
	  update: function (value) {
	    this.el[this.attr] = _.toString(value)
	  }
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var templateParser = __webpack_require__(51)
	
	module.exports = {
	
	  bind: function () {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = []
	      // replace the placeholder with proper anchor
	      this.anchor = _.createAnchor('v-html')
	      _.replace(this.el, this.anchor)
	    }
	  },
	
	  update: function (value) {
	    value = _.toString(value)
	    if (this.nodes) {
	      this.swap(value)
	    } else {
	      this.el.innerHTML = value
	    }
	  },
	
	  swap: function (value) {
	    // remove old nodes
	    var i = this.nodes.length
	    while (i--) {
	      _.remove(this.nodes[i])
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = templateParser.parse(value, true, true)
	    // save a reference to these nodes so we can remove later
	    this.nodes = _.toArray(frag.childNodes)
	    _.before(frag, this.anchor)
	  }
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	var xlinkRE = /^xlink:/
	
	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	}
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	}
	
	// check for attribtues that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/
	
	module.exports = {
	
	  priority: 850,
	
	  update: function (value) {
	    if (this.arg) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (disallowedInterpAttrRE.test(this.arg)) {
	          _.deprecation.ATTR_INVALID(this.arg)
	        }
	      }
	      this.setAttr(this.arg, value)
	    } else if (typeof value === 'object') {
	      // TODO no longer need to support object in 1.0.0
	      this.objectHandler(value)
	    }
	  },
	
	  objectHandler: function (value) {
	    // cache object attrs so that only changed attrs
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var attr, val
	    for (attr in cache) {
	      if (!(attr in value)) {
	        this.setAttr(attr, null)
	        delete cache[attr]
	      }
	    }
	    for (attr in value) {
	      val = value[attr]
	      if (val !== cache[attr]) {
	        cache[attr] = val
	        this.setAttr(attr, val)
	      }
	    }
	  },
	
	  setAttr: function (attr, value) {
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = value
	    }
	    // set model props
	    var modelProp = modelProps[attr]
	    if (modelProp) {
	      this.el[modelProp] = value
	      // update v-model if present
	      var model = this.el.__v_model
	      if (model) {
	        model.listener()
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr)
	      return
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value)
	      } else {
	        this.el.setAttribute(attr, value)
	      }
	    } else {
	      this.el.removeAttribute(attr)
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var transition = __webpack_require__(56)
	
	module.exports = {
	
	  bind: function () {
	    // check else block
	    var next = this.el.nextElementSibling
	    if (next && _.attr(next, 'else') !== null) {
	      this.elseEl = next
	    }
	  },
	
	  update: function (value) {
	    var el = this.el
	    transition.apply(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none'
	    }, this.vm)
	    var elseEl = this.elseEl
	    if (elseEl) {
	      transition.apply(elseEl, value ? -1 : 1, function () {
	        elseEl.style.display = value ? 'none' : ''
	      }, this.vm)
	    }
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var addClass = _.addClass
	var removeClass = _.removeClass
	
	module.exports = {
	
	  // TODO: remove unnecessary logic in 1.0.0
	
	  bind: function () {
	    // interpolations like class="{{abc}}" are converted
	    // to v-class, and we need to remove the raw,
	    // uninterpolated className at binding time.
	    var raw = this._descriptor._rawClass
	    if (raw) {
	      this.prevKeys = raw.trim().split(/\s+/)
	    }
	  },
	
	  update: function (value) {
	    if (this.arg) {
	      // single toggle
	      if (value) {
	        addClass(this.el, this.arg)
	      } else {
	        removeClass(this.el, this.arg)
	      }
	    } else {
	      if (value && typeof value === 'string') {
	        this.handleObject(stringToObject(value))
	      } else if (_.isPlainObject(value)) {
	        this.handleObject(value)
	      } else if (_.isArray(value)) {
	        this.handleArray(value)
	      } else {
	        this.cleanup()
	      }
	    }
	  },
	
	  handleObject: function (value) {
	    this.cleanup(value)
	    var keys = this.prevKeys = Object.keys(value)
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i]
	      if (value[key]) {
	        addClass(this.el, key)
	      } else {
	        removeClass(this.el, key)
	      }
	    }
	  },
	
	  handleArray: function (value) {
	    this.cleanup(value)
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i])
	      }
	    }
	    this.prevKeys = value.slice()
	  },
	
	  cleanup: function (value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length
	      while (i--) {
	        var key = this.prevKeys[i]
	        if (key && (!value || !contains(value, key))) {
	          removeClass(this.el, key)
	        }
	      }
	    }
	  }
	}
	
	function stringToObject (value) {
	  var res = {}
	  var keys = value.trim().split(/\s+/)
	  var i = keys.length
	  while (i--) {
	    res[keys[i]] = true
	  }
	  return res
	}
	
	function contains (value, key) {
	  return _.isArray(value)
	    ? value.indexOf(key) > -1
	    : value.hasOwnProperty(key)
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	module.exports = {
	
	  isLiteral: true,
	  priority: 1500,
	
	  bind: function () {
	    var id = this.arg
	      ? _.camelize(this.arg)
	      : this.expression
	    if (process.env.NODE_ENV !== 'production' &&
	        !this.arg && id) {
	      _.deprecation.V_EL()
	    }
	    if (!this._isDynamicLiteral) {
	      this.update(id)
	    }
	  },
	
	  update: function (id) {
	    if (this.id) {
	      this.unbind()
	    }
	    this.id = id
	    var refs = (this._scope || this.vm).$$
	    if (refs.hasOwnProperty(id)) {
	      refs[id] = this.el
	    } else {
	      _.defineReactive(refs, id, this.el)
	    }
	  },
	
	  unbind: function () {
	    var refs = (this._scope || this.vm).$$
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	module.exports = {
	
	  isLiteral: true,
	
	  bind: function () {
	    var vm = this.el.__vue__
	    if (!vm) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-ref should only be used on a component root element.'
	      )
	      return
	    }
	    // If we get here, it means this is a `v-ref` on a
	    // child, because parent scope `v-ref` is stripped in
	    // `v-component` already.
	    var ref = this.arg || this.expression
	    var context = this.vm._scope || this.vm._context
	    context.$[ref] = this.vm
	
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.REF_IN_CHILD()
	    }
	  },
	
	  unbind: function () {
	    var ref = this.expression
	    var context = this.vm._scope || this.vm._context
	    if (context.$[ref] === this.vm) {
	      context.$[ref] = null
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(32)
	
	module.exports = {
	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute(config.prefix + 'cloak')
	    })
	  }
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var camelPrefixes = ['Webkit', 'Moz', 'ms']
	var importantRE = /!important;?$/
	var camelRE = /([a-z])([A-Z])/g
	var testEl = null
	var propCache = {}
	
	module.exports = {
	
	  deep: true,
	
	  update: function (value) {
	    if (this.arg) {
	      this.setProp(this.arg, value)
	    } else {
	      if (typeof value === 'string') {
	        this.el.style.cssText = value
	      } else if (_.isArray(value)) {
	        this.objectHandler(value.reduce(_.extend, {}))
	      } else {
	        this.objectHandler(value)
	      }
	    }
	  },
	
	  objectHandler: function (value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var prop, val
	    for (prop in cache) {
	      if (!(prop in value)) {
	        this.setProp(prop, null)
	        delete cache[prop]
	      }
	    }
	    for (prop in value) {
	      val = value[prop]
	      if (val !== cache[prop]) {
	        cache[prop] = val
	        this.setProp(prop, val)
	      }
	    }
	  },
	
	  setProp: function (prop, value) {
	    prop = normalize(prop)
	    if (!prop) return // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += ''
	    if (value) {
	      var isImportant = importantRE.test(value)
	        ? 'important'
	        : ''
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim()
	      }
	      this.el.style.setProperty(prop, value, isImportant)
	    } else {
	      this.el.style.removeProperty(prop)
	    }
	  }
	}
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize (prop) {
	  if (propCache[prop]) {
	    return propCache[prop]
	  }
	  var res = prefix(prop)
	  propCache[prop] = propCache[res] = res
	  return res
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix (prop) {
	  prop = prop.replace(camelRE, '$1-$2').toLowerCase()
	  var camel = _.camelize(prop)
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
	  if (!testEl) {
	    testEl = document.createElement('div')
	  }
	  if (camel in testEl.style) {
	    return prop
	  }
	  var i = prefixes.length
	  var prefixed
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop
	    }
	  }
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// TODO: remove in 1.0.0
	
	var _ = __webpack_require__(27)
	var Transition = __webpack_require__(68)
	
	module.exports = {
	
	  priority: 1000,
	  isLiteral: true,
	
	  bind: function () {
	    if (!this._isDynamicLiteral && !this.arg) {
	      this.update(this.expression)
	    } else if (this.arg) {
	      this._isDynamicLiteral = true
	    }
	  },
	
	  update: function (id, oldId) {
	    var el = this.el
	    // resolve on owner vm
	    var hooks = _.resolveAsset(this.vm.$options, 'transitions', id)
	    id = id || 'v'
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm)
	    if (oldId) {
	      _.removeClass(el, oldId + '-transition')
	    }
	    _.addClass(el, id + '-transition')
	  }
	}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var queue = __webpack_require__(69)
	var addClass = _.addClass
	var removeClass = _.removeClass
	var transitionEndEvent = _.transitionEndEvent
	var animationEndEvent = _.animationEndEvent
	var transDurationProp = _.transitionProp + 'Duration'
	var animDurationProp = _.animationProp + 'Duration'
	
	var TYPE_TRANSITION = 1
	var TYPE_ANIMATION = 2
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	
	function Transition (el, id, hooks, vm) {
	  this.id = id
	  this.el = el
	  this.enterClass = id + '-enter'
	  this.leaveClass = id + '-leave'
	  this.hooks = hooks
	  this.vm = vm
	  // async state
	  this.pendingCssEvent =
	  this.pendingCssCb =
	  this.cancel =
	  this.pendingJsCb =
	  this.op =
	  this.cb = null
	  this.justEntered = false
	  this.entered = this.left = false
	  this.typeCache = {}
	  // bind
	  var self = this
	  ;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone']
	    .forEach(function (m) {
	      self[m] = _.bind(self[m], self)
	    })
	}
	
	var p = Transition.prototype
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p.enter = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeEnter')
	  this.cb = cb
	  addClass(this.el, this.enterClass)
	  op()
	  this.entered = false
	  this.callHookWithCb('enter')
	  if (this.entered) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled
	  queue.push(this.enterNextTick)
	}
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p.enterNextTick = function () {
	
	  // Importnatn hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true
	  var self = this
	  setTimeout(function () {
	    self.justEntered = false
	  }, 17)
	
	  var enterDone = this.enterDone
	  var type = this.getCssTransitionType(this.enterClass)
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass)
	      this.setupCssCb(transitionEndEvent, enterDone)
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone)
	    } else {
	      enterDone()
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass)
	  }
	}
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p.enterDone = function () {
	  this.entered = true
	  this.cancel = this.pendingJsCb = null
	  removeClass(this.el, this.enterClass)
	  this.callHook('afterEnter')
	  if (this.cb) this.cb()
	}
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p.leave = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeLeave')
	  this.op = op
	  this.cb = cb
	  addClass(this.el, this.leaveClass)
	  this.left = false
	  this.callHookWithCb('leave')
	  if (this.left) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone()
	    } else {
	      queue.push(this.leaveNextTick)
	    }
	  }
	}
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass)
	  if (type) {
	    var event = type === TYPE_TRANSITION
	      ? transitionEndEvent
	      : animationEndEvent
	    this.setupCssCb(event, this.leaveDone)
	  } else {
	    this.leaveDone()
	  }
	}
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p.leaveDone = function () {
	  this.left = true
	  this.cancel = this.pendingJsCb = null
	  this.op()
	  removeClass(this.el, this.leaveClass)
	  this.callHook('afterLeave')
	  if (this.cb) this.cb()
	  this.op = null
	}
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p.cancelPending = function () {
	  this.op = this.cb = null
	  var hasPending = false
	  if (this.pendingCssCb) {
	    hasPending = true
	    _.off(this.el, this.pendingCssEvent, this.pendingCssCb)
	    this.pendingCssEvent = this.pendingCssCb = null
	  }
	  if (this.pendingJsCb) {
	    hasPending = true
	    this.pendingJsCb.cancel()
	    this.pendingJsCb = null
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass)
	    removeClass(this.el, this.leaveClass)
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el)
	    this.cancel = null
	  }
	}
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el)
	  }
	}
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type]
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = _.cancellable(this[type + 'Done'])
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb)
	  }
	}
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (
	    !transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    (this.hooks && this.hooks.css === false) ||
	    // element is hidden
	    isHidden(this.el)
	  ) {
	    return
	  }
	  var type = this.typeCache[className]
	  if (type) return type
	  var inlineStyles = this.el.style
	  var computedStyles = window.getComputedStyle(this.el)
	  var transDuration =
	    inlineStyles[transDurationProp] ||
	    computedStyles[transDurationProp]
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION
	  } else {
	    var animDuration =
	      inlineStyles[animDurationProp] ||
	      computedStyles[animDurationProp]
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type
	  }
	  return type
	}
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event
	  var self = this
	  var el = this.el
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      _.off(el, event, onEnd)
	      self.pendingCssEvent = self.pendingCssCb = null
	      if (!self.pendingJsCb && cb) {
	        cb()
	      }
	    }
	  }
	  _.on(el, event, onEnd)
	}
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden (el) {
	  return !(
	    el.offsetWidth &&
	    el.offsetHeight &&
	    el.getClientRects().length
	  )
	}
	
	module.exports = Transition


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var queue = []
	var queued = false
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	exports.push = function (job) {
	  queue.push(job)
	  if (!queued) {
	    queued = true
	    _.nextTick(flush)
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush () {
	  // Force layout
	  var f = document.documentElement.offsetHeight
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]()
	  }
	  queue = []
	  queued = false
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f
	}


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	}
	
	function keyFilter (handler, keys) {
	  var codes = keys.map(function (key) {
	    var code = keyCodes[key]
	    if (!code) {
	      code = parseInt(key, 10)
	    }
	    return code
	  })
	  return function keyHandler (e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e)
	    }
	  }
	}
	
	function stopFilter (handler) {
	  return function stopHandler (e) {
	    e.stopPropagation()
	    return handler.call(this, e)
	  }
	}
	
	function preventFilter (handler) {
	  return function preventHandler (e) {
	    e.preventDefault()
	    return handler.call(this, e)
	  }
	}
	
	module.exports = {
	
	  acceptStatement: true,
	  priority: 700,
	
	  bind: function () {
	    // warn old usage
	    if (process.env.NODE_ENV !== 'production') {
	      if (this.filters) {
	        var hasKeyFilter = this.filters.some(function (f) {
	          return f.name === 'key'
	        })
	        if (hasKeyFilter) {
	          _.deprecation.KEY_FILTER()
	        }
	      }
	    }
	
	    // deal with iframes
	    if (
	      this.el.tagName === 'IFRAME' &&
	      this.arg !== 'load'
	    ) {
	      var self = this
	      this.iframeBind = function () {
	        _.on(self.el.contentWindow, self.arg, self.handler)
	      }
	      this.on('load', this.iframeBind)
	    }
	  },
	
	  update: function (handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this._descriptor.raw) {
	      handler = function () {}
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-on:' + this.arg + '="' +
	        this.expression + '" expects a function value, ' +
	        'got ' + handler
	      )
	      return
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler)
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler)
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers)
	      .filter(function (key) {
	        return key !== 'stop' && key !== 'prevent'
	      })
	    if (keys.length) {
	      handler = keyFilter(handler, keys)
	    }
	
	    this.reset()
	    var scope = this._scope || this.vm
	    this.handler = function (e) {
	      scope.$event = e
	      var res = handler(e)
	      scope.$event = null
	      return res
	    }
	    if (this.iframeBind) {
	      this.iframeBind()
	    } else {
	      _.on(this.el, this.arg, this.handler)
	    }
	  },
	
	  reset: function () {
	    var el = this.iframeBind
	      ? this.el.contentWindow
	      : this.el
	    if (this.handler) {
	      _.off(el, this.arg, this.handler)
	    }
	  },
	
	  unbind: function () {
	    this.reset()
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	var handlers = {
	  text: __webpack_require__(72),
	  radio: __webpack_require__(73),
	  select: __webpack_require__(74),
	  checkbox: __webpack_require__(75)
	}
	
	module.exports = {
	
	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   *     - TODO: more types may be supplied as a plugin
	   */
	
	  bind: function () {
	    // friendly warning...
	    this.checkFilters()
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using a read-only filter with ' +
	        'v-model. You might want to use a two-way filter ' +
	        'to ensure correct behavior.'
	      )
	    }
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-model does not support element type: ' + tag
	      )
	      return
	    }
	    el.__v_model = this
	    handler.bind.call(this)
	    this.update = handler.update
	    this._unbind = handler.unbind
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function () {
	    var filters = this.filters
	    if (!filters) return
	    var i = filters.length
	    while (i--) {
	      var filter = _.resolveAsset(this.vm.$options, 'filters', filters[i].name)
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true
	      }
	      if (filter.write) {
	        this.hasWrite = true
	      }
	    }
	  },
	
	  unbind: function () {
	    this.el.__v_model = null
	    this._unbind && this._unbind()
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	    var isRange = el.type === 'range'
	
	    // check params
	    // - lazy: update model on "change" instead of "input"
	    var lazy = this.param('lazy') != null
	    // - number: cast value into number when updating model.
	    var number = this.param('number') != null
	    // - debounce: debounce the input listener
	    var debounce = parseInt(this.param('debounce'), 10)
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false
	    if (!_.isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true
	      })
	      this.on('compositionend', function () {
	        composing = false
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener()
	        }
	      })
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true
	      })
	      this.on('blur', function () {
	        self.focused = false
	        self.listener()
	      })
	    }
	
	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return
	      var val = number || isRange
	        ? _.toNumber(el.value)
	        : el.value
	      self.set(val)
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      _.nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value)
	        }
	      })
	    }
	    if (debounce) {
	      this.listener = _.debounce(this.listener, debounce)
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function'
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener)
	      if (!lazy) {
	        jQuery(el).on('input', this.listener)
	      }
	    } else {
	      this.on('change', this.listener)
	      if (!lazy) {
	        this.on('input', this.listener)
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && _.isIE9) {
	      this.on('cut', function () {
	        _.nextTick(self.listener)
	      })
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener()
	        }
	      })
	    }
	
	    // set initial value if present
	    if (
	      el.hasAttribute('value') ||
	      (el.tagName === 'TEXTAREA' && el.value.trim())
	    ) {
	      this._initValue = number
	        ? _.toNumber(el.value)
	        : el.value
	    }
	  },
	
	  update: function (value) {
	    this.el.value = _.toString(value)
	  },
	
	  unbind: function () {
	    var el = this.el
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener)
	      jQuery(el).off('input', this.listener)
	    }
	  }
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	    var number = this.param('number') != null
	    var expression = this.param('exp')
	    var scope = this._scope || this.vm
	
	    if (process.env.NODE_ENV !== 'production' && expression) {
	      _.deprecation.MODEL_EXP(this.expression)
	    }
	
	    this.getValue = function () {
	      // value overwrite via bind-value
	      if (el.hasOwnProperty('_value')) {
	        return el._value
	      }
	      var val = el.value
	      if (number) {
	        val = _.toNumber(val)
	      } else if (expression !== null) {
	        val = scope.$eval(expression)
	      }
	      return val
	    }
	
	    this.listener = function () {
	      self.set(self.getValue())
	    }
	    this.on('change', this.listener)
	
	    if (el.checked) {
	      this._initValue = this.getValue()
	    }
	  },
	
	  update: function (value) {
	    this.el.checked = _.looseEqual(value, this.getValue())
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Watcher = __webpack_require__(46)
	var dirParser = __webpack_require__(35)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get())
	      }
	    }
	
	    // check options param
	    var optionsParam = this.param('options')
	    if (optionsParam) {
	      initOptions.call(this, optionsParam)
	      if (process.env.NODE_ENV !== 'production') {
	        _.deprecation.SELECT_OPTIONS()
	      }
	    }
	    this.number = this.param('number') != null
	    this.multiple = el.hasAttribute('multiple')
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, self.multiple)
	      value = self.number
	        ? _.isArray(value)
	          ? value.map(_.toNumber)
	          : _.toNumber(value)
	        : value
	      self.set(value)
	    }
	    this.on('change', this.listener)
	
	    // check initial value (inline selected attribute)
	    checkInitialValue.call(this)
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate)
	  },
	
	  update: function (value) {
	    var el = this.el
	    el.selectedIndex = -1
	    if (value == null) {
	      if (this.defaultOption) {
	        this.defaultOption.selected = true
	      }
	      return
	    }
	    var multi = this.multiple && _.isArray(value)
	    var options = el.options
	    var i = options.length
	    var op, val
	    while (i--) {
	      op = options[i]
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      /* eslint-disable eqeqeq */
	      op.selected = multi
	        ? indexOf(value, val) > -1
	        : _.looseEqual(value, val)
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function () {
	    this.vm.$off('hook:attached', this.forceUpdate)
	    if (this.optionWatcher) {
	      this.optionWatcher.teardown()
	    }
	  }
	}
	
	/**
	 * Initialize the option list from the param.
	 *
	 * @param {String} expression
	 */
	
	function initOptions (expression) {
	  var self = this
	  var el = self.el
	  var defaultOption = self.defaultOption = self.el.options[0]
	  var descriptor = dirParser.parse(expression)[0]
	  function optionUpdateWatcher (value) {
	    if (_.isArray(value)) {
	      // clear old options.
	      // cannot reset innerHTML here because IE family get
	      // confused during compilation.
	      var i = el.options.length
	      while (i--) {
	        var option = el.options[i]
	        if (option !== defaultOption) {
	          var parentNode = option.parentNode
	          if (parentNode === el) {
	            parentNode.removeChild(option)
	          } else {
	            el.removeChild(parentNode)
	            i = el.options.length
	          }
	        }
	      }
	      buildOptions(el, value)
	      self.forceUpdate()
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid options value for v-model: ' + value
	      )
	    }
	  }
	  this.optionWatcher = new Watcher(
	    this.vm,
	    descriptor.expression,
	    optionUpdateWatcher,
	    {
	      deep: true,
	      filters: descriptor.filters
	    }
	  )
	  // update with initial value
	  optionUpdateWatcher(this.optionWatcher.value)
	}
	
	/**
	 * Build up option elements. IE9 doesn't create options
	 * when setting innerHTML on <select> elements, so we have
	 * to use DOM API here.
	 *
	 * @param {Element} parent - a <select> or an <optgroup>
	 * @param {Array} options
	 */
	
	function buildOptions (parent, options) {
	  var op, el
	  for (var i = 0, l = options.length; i < l; i++) {
	    op = options[i]
	    if (!op.options) {
	      el = document.createElement('option')
	      if (typeof op === 'string' || typeof op === 'number') {
	        el.text = el.value = op
	      } else {
	        if (op.value != null && !_.isObject(op.value)) {
	          el.value = op.value
	        }
	        // object values gets serialized when set as value,
	        // so we store the raw value as a different property
	        el._value = op.value
	        el.text = op.text || ''
	        if (op.disabled) {
	          el.disabled = true
	        }
	      }
	    } else {
	      el = document.createElement('optgroup')
	      el.label = op.label
	      buildOptions(el, op.options)
	    }
	    parent.appendChild(el)
	  }
	}
	
	/**
	 * Check the initial value for selected options.
	 */
	
	function checkInitialValue () {
	  var initValue
	  var options = this.el.options
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (options[i].hasAttribute('selected')) {
	      if (this.multiple) {
	        (initValue || (initValue = []))
	          .push(options[i].value)
	      } else {
	        initValue = options[i].value
	      }
	    }
	  }
	  if (typeof initValue !== 'undefined') {
	    this._initValue = this.number
	      ? _.toNumber(initValue)
	      : initValue
	  }
	}
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @return {Array|*}
	 */
	
	function getValue (el, multi) {
	  var res = multi ? [] : null
	  var op, val
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i]
	    if (op.selected) {
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      if (multi) {
	        res.push(val)
	      } else {
	        return val
	      }
	    }
	  }
	  return res
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf (arr, val) {
	  var i = arr.length
	  while (i--) {
	    if (_.looseEqual(arr[i], val)) {
	      return i
	    }
	  }
	  return -1
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	    var trueExp = this.param('true-exp')
	    var falseExp = this.param('false-exp')
	    var number = this.param('number') != null
	    var scope = this._scope || this.vm
	
	    if (process.env.NODE_ENV !== 'production' && (trueExp || falseExp)) {
	      _.deprecation.MODEL_EXP(this.expression)
	    }
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value')
	        ? el._value
	        : number
	          ? _.toNumber(el.value)
	          : el.value
	    }
	
	    this.matchValue = function (value) {
	      if (el.hasOwnProperty('_trueValue')) {
	        return _.looseEqual(value, el._trueValue)
	      } else if (trueExp !== null) {
	        return _.looseEqual(value, scope.$eval(trueExp))
	      } else {
	        return !!value
	      }
	    }
	
	    function getBooleanValue () {
	      var val = el.checked
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue
	      }
	      if (val && trueExp !== null) {
	        val = scope.$eval(trueExp)
	      }
	      if (!val && falseExp !== null) {
	        val = scope.$eval(falseExp)
	      }
	      return val
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value
	      if (_.isArray(model)) {
	        var val = self.getValue()
	        if (el.checked) {
	          if (_.indexOf(model, val) < 0) {
	            model.push(val)
	          }
	        } else {
	          model.$remove(val)
	        }
	      } else {
	        self.set(getBooleanValue())
	      }
	    }
	    this.on('change', this.listener)
	
	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },
	
	  update: function (value) {
	    var el = this.el
	    if (_.isArray(value)) {
	      el.checked = _.indexOf(value, this.getValue()) > -1
	    } else {
	      el.checked = this.matchValue(value)
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var isObject = _.isObject
	var isPlainObject = _.isPlainObject
	var textParser = __webpack_require__(33)
	var expParser = __webpack_require__(48)
	var templateParser = __webpack_require__(51)
	var compiler = __webpack_require__(41)
	var uid = 0
	
	// async component resolution states
	var UNRESOLVED = 0
	var PENDING = 1
	var RESOLVED = 2
	var ABORTED = 3
	
	module.exports = {
	
	  /**
	   * Setup.
	   */
	
	  bind: function () {
	
	    // some helpful tips...
	    /* istanbul ignore if */
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      this.el.tagName === 'OPTION' &&
	      this.el.parentNode && this.el.parentNode.__v_model
	    ) {
	      _.warn(
	        'Don\'t use v-repeat for v-model options; ' +
	        'use the `options` param instead: ' +
	        'http://vuejs.org/guide/forms.html#Dynamic_Select_Options'
	      )
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.REPEAT()
	    }
	
	    // support for item in array syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      this.arg = inMatch[1]
	      this._watcherExp = inMatch[2]
	    }
	    // uid as a cache identifier
	    this.id = '__v_repeat_' + (++uid)
	
	    // setup anchor nodes
	    this.start = _.createAnchor('v-repeat-start')
	    this.end = _.createAnchor('v-repeat-end')
	    _.replace(this.el, this.end)
	    _.before(this.start, this.end)
	
	    // check if this is a block repeat
	    this.template = _.isTemplate(this.el)
	      ? templateParser.parse(this.el, true)
	      : this.el
	
	    // check for trackby param
	    this.idKey = this.param('track-by')
	    // check for transition stagger
	    var stagger = +this.param('stagger')
	    this.enterStagger = +this.param('enter-stagger') || stagger
	    this.leaveStagger = +this.param('leave-stagger') || stagger
	
	    // check for v-ref/v-el
	    this.refId = this.param(config.prefix + 'ref')
	    this.elID = this.param(config.prefix + 'el')
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (this.refId) _.deprecation.V_REF()
	      if (this.elID) _.deprecation.V_EL()
	    }
	    this.refId = this.refId || _.findRef(this.el)
	
	    // check other directives that need to be handled
	    // at v-repeat level
	    this.checkIf()
	    this.checkComponent()
	
	    // create cache object
	    this.cache = Object.create(null)
	  },
	
	  /**
	   * Warn against v-if usage.
	   */
	
	  checkIf: function () {
	    if (_.attr(this.el, 'if') !== null) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Don\'t use v-if with v-repeat. ' +
	        'Use v-show or the "filterBy" filter instead.'
	      )
	    }
	  },
	
	  /**
	   * Check the component constructor to use for repeated
	   * instances. If static we resolve it now, otherwise it
	   * needs to be resolved at build time with actual data.
	   */
	
	  checkComponent: function () {
	    this.componentState = UNRESOLVED
	    var options = this.vm.$options
	    var id = _.checkComponent(this.el, options, this.el.hasAttributes())
	    if (!id) {
	      // default constructor
	      this.Component = _.Vue
	      // inline repeats should inherit
	      this.inline = true
	      // important: transclude with no options, just
	      // to ensure block start and block end
	      this.template = compiler.transclude(this.template)
	      var copy = _.extend({}, options)
	      copy._asComponent = false
	      this._linkFn = compiler.compile(this.template, copy)
	    } else {
	      this.Component = null
	      this.asComponent = true
	      // check inline-template
	      if (this.param('inline-template') !== null) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = _.extractContent(this.el, true)
	      }
	      var tokens = textParser.parse(id)
	      if (tokens) {
	        // dynamic component to be resolved later
	        var componentExp = textParser.tokensToExp(tokens)
	        this.componentGetter = expParser.parse(componentExp).get
	      } else {
	        // static
	        this.componentId = id
	        this.pendingData = null
	      }
	    }
	  },
	
	  resolveComponent: function () {
	    this.componentState = PENDING
	    this.vm._resolveComponent(this.componentId, _.bind(function (Component) {
	      if (this.componentState === ABORTED) {
	        return
	      }
	      this.Component = Component
	      this.componentState = RESOLVED
	      this.realUpdate(this.pendingData)
	      this.pendingData = null
	    }, this))
	  },
	
	  /**
	   * Resolve a dynamic component to use for an instance.
	   * The tricky part here is that there could be dynamic
	   * components depending on instance data.
	   *
	   * @param {Object} data
	   * @param {Object} meta
	   * @return {Function}
	   */
	
	  resolveDynamicComponent: function (data, meta) {
	    // create a temporary context object and copy data
	    // and meta properties onto it.
	    // use _.define to avoid accidentally overwriting scope
	    // properties.
	    var context = Object.create(this.vm)
	    var key
	    for (key in data) {
	      _.define(context, key, data[key])
	    }
	    for (key in meta) {
	      _.define(context, key, meta[key])
	    }
	    var id = this.componentGetter.call(context, context)
	    var Component = _.resolveAsset(this.vm.$options, 'components', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(Component, 'component', id)
	    }
	    if (!Component.options) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Async resolution is not supported for v-repeat ' +
	        '+ dynamic component. (component: ' + id + ')'
	      )
	      return _.Vue
	    }
	    return Component
	  },
	
	  /**
	   * Update.
	   * This is called whenever the Array mutates. If we have
	   * a component, we might need to wait for it to resolve
	   * asynchronously.
	   *
	   * @param {Array|Number|String} data
	   */
	
	  update: function (data) {
	    if (process.env.NODE_ENV !== 'production' && !_.isArray(data)) {
	      _.warn(
	        'v-repeat pre-converts Objects into Arrays, and ' +
	        'v-repeat filters should always return Arrays.'
	      )
	    }
	    if (this.componentId) {
	      var state = this.componentState
	      if (state === UNRESOLVED) {
	        this.pendingData = data
	        // once resolved, it will call realUpdate
	        this.resolveComponent()
	      } else if (state === PENDING) {
	        this.pendingData = data
	      } else if (state === RESOLVED) {
	        this.realUpdate(data)
	      }
	    } else {
	      this.realUpdate(data)
	    }
	  },
	
	  /**
	   * The real update that actually modifies the DOM.
	   *
	   * @param {Array|Number|String} data
	   */
	
	  realUpdate: function (data) {
	    this.vms = this.diff(data, this.vms)
	    // update v-ref
	    if (this.refId) {
	      this.vm.$[this.refId] = this.converted
	        ? toRefObject(this.vms)
	        : this.vms
	    }
	    if (this.elID) {
	      this.vm.$$[this.elID] = this.vms.map(function (vm) {
	        return vm.$el
	      })
	    }
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   * @param {Array} oldVms
	   * @return {Array}
	   */
	
	  diff: function (data, oldVms) {
	    var idKey = this.idKey
	    var converted = this.converted
	    var start = this.start
	    var end = this.end
	    var inDoc = _.inDoc(start)
	    var alias = this.arg
	    var init = !oldVms
	    var vms = new Array(data.length)
	    var obj, raw, vm, i, l, primitive
	    // First pass, go through the new Array and fill up
	    // the new vms array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      obj = data[i]
	      raw = converted ? obj.$value : obj
	      primitive = !isObject(raw)
	      vm = !init && this.getVm(raw, i, converted ? obj.$key : null)
	      if (vm) { // reusable instance
	
	        if (process.env.NODE_ENV !== 'production' && vm._reused) {
	          _.warn(
	            'Duplicate objects found in v-repeat="' + this.expression + '": ' +
	            JSON.stringify(raw)
	          )
	        }
	
	        vm._reused = true
	        vm.$index = i // update $index
	        // update data for track-by or object repeat,
	        // since in these two cases the data is replaced
	        // rather than mutated.
	        if (idKey || converted || primitive) {
	          if (alias) {
	            vm[alias] = raw
	          } else if (_.isPlainObject(raw)) {
	            vm.$data = raw
	          } else {
	            vm.$value = raw
	          }
	        }
	      } else { // new instance
	        vm = this.build(obj, i, true)
	        vm._reused = false
	      }
	      vms[i] = vm
	      // insert if this is first run
	      if (init) {
	        vm.$before(end)
	      }
	    }
	    // if this is the first run, we're done.
	    if (init) {
	      return vms
	    }
	    // Second pass, go through the old vm instances and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0
	    var totalRemoved = oldVms.length - vms.length
	    for (i = 0, l = oldVms.length; i < l; i++) {
	      vm = oldVms[i]
	      if (!vm._reused) {
	        this.uncacheVm(vm)
	        vm.$destroy(false, true) // defer cleanup until removal
	        this.remove(vm, removalIndex++, totalRemoved, inDoc)
	      }
	    }
	    // final pass, move/insert new instances into the
	    // right place.
	    var targetPrev, prevEl, currentPrev
	    var insertionIndex = 0
	    for (i = 0, l = vms.length; i < l; i++) {
	      vm = vms[i]
	      // this is the vm that we should be after
	      targetPrev = vms[i - 1]
	      prevEl = targetPrev
	        ? targetPrev._staggerCb
	          ? targetPrev._staggerAnchor
	          : targetPrev._fragmentEnd || targetPrev.$el
	        : start
	      if (vm._reused && !vm._staggerCb) {
	        currentPrev = findPrevVm(vm, start, this.id)
	        if (currentPrev !== targetPrev) {
	          this.move(vm, prevEl)
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(vm, insertionIndex++, prevEl, inDoc)
	      }
	      vm._reused = false
	    }
	    return vms
	  },
	
	  /**
	   * Build a new instance and cache it.
	   *
	   * @param {Object} data
	   * @param {Number} index
	   * @param {Boolean} needCache
	   */
	
	  build: function (data, index, needCache) {
	    var meta = { $index: index }
	    if (this.converted) {
	      meta.$key = data.$key
	    }
	    var raw = this.converted ? data.$value : data
	    var alias = this.arg
	    if (alias) {
	      data = {}
	      data[alias] = raw
	    } else if (!isPlainObject(raw)) {
	      // non-object values
	      data = {}
	      meta.$value = raw
	    } else {
	      // default
	      data = raw
	    }
	    // resolve constructor
	    var Component = this.Component || this.resolveDynamicComponent(data, meta)
	    var parent = this._host || this.vm
	    var vm = parent._addChild({
	      el: templateParser.clone(this.template),
	      data: data,
	      inherit: this.inline,
	      template: this.inlineTemplate,
	      // repeater meta, e.g. $index, $key
	      _meta: meta,
	      // mark this as an inline-repeat instance
	      _repeat: this.inline,
	      // is this a component?
	      _asComponent: this.asComponent,
	      // linker cachable if no inline-template
	      _linkerCachable: !this.inlineTemplate && Component !== _.Vue,
	      // pre-compiled linker for simple repeats
	      _linkFn: this._linkFn,
	      // identifier, shows that this vm belongs to this collection
	      _repeatId: this.id,
	      // transclusion content owner
	      _context: this.vm,
	      // cotnext fragment
	      _frag: this._frag
	    }, Component)
	    // cache instance
	    if (needCache) {
	      this.cacheVm(raw, vm, index, this.converted ? meta.$key : null)
	    }
	    // sync back changes for two-way bindings of primitive values
	    var dir = this
	    if (this.rawType === 'object' && isPrimitive(raw)) {
	      vm.$watch(alias || '$value', function (val) {
	        if (dir.filters) {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'You seem to be mutating the $value reference of ' +
	            'a v-repeat instance (likely through v-model) ' +
	            'and filtering the v-repeat at the same time. ' +
	            'This will not work properly with an Array of ' +
	            'primitive values. Please use an Array of ' +
	            'Objects instead.'
	          )
	        }
	        dir._withLock(function () {
	          if (dir.converted) {
	            dir.rawValue[vm.$key] = val
	          } else {
	            dir.rawValue.$set(vm.$index, val)
	          }
	        })
	      })
	    }
	    return vm
	  },
	
	  /**
	   * Unbind, teardown everything
	   */
	
	  unbind: function () {
	    this.componentState = ABORTED
	    if (this.refId) {
	      this.vm.$[this.refId] = null
	    }
	    if (this.vms) {
	      var i = this.vms.length
	      var vm
	      while (i--) {
	        vm = this.vms[i]
	        this.uncacheVm(vm)
	        vm.$destroy()
	      }
	    }
	  },
	
	  /**
	   * Cache a vm instance based on its data.
	   *
	   * If the data is an object, we save the vm's reference on
	   * the data object as a hidden property. Otherwise we
	   * cache them in an object and for each primitive value
	   * there is an array in case there are duplicates.
	   *
	   * @param {Object} data
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheVm: function (data, vm, index, key) {
	    var idKey = this.idKey
	    var cache = this.cache
	    var primitive = !isObject(data)
	    var id
	    if (key || idKey || primitive) {
	      id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      if (!cache[id]) {
	        cache[id] = vm
	      } else if (!primitive && idKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Duplicate objects with the same track-by key in v-repeat: ' + id
	        )
	      }
	    } else {
	      id = this.id
	      if (data.hasOwnProperty(id)) {
	        if (data[id] === null) {
	          data[id] = vm
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Duplicate objects found in v-repeat="' + this.expression + '": ' +
	            JSON.stringify(data)
	          )
	        }
	      } else {
	        _.define(data, id, vm)
	      }
	    }
	    vm._raw = data
	  },
	
	  /**
	   * Try to get a cached instance from a piece of data.
	   *
	   * @param {Object} data
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Vue|undefined}
	   */
	
	  getVm: function (data, index, key) {
	    var idKey = this.idKey
	    var primitive = !isObject(data)
	    if (key || idKey || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      return this.cache[id]
	    } else {
	      return data[this.id]
	    }
	  },
	
	  /**
	   * Delete a cached vm instance.
	   *
	   * @param {Vue} vm
	   */
	
	  uncacheVm: function (vm) {
	    var data = vm._raw
	    var idKey = this.idKey
	    var index = vm.$index
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = vm.hasOwnProperty('$key') && vm.$key
	    var primitive = !isObject(data)
	    if (idKey || key || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      this.cache[id] = null
	    } else {
	      data[this.id] = null
	      vm._raw = null
	    }
	  },
	
	  /**
	   * Insert an instance.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDoc
	   */
	
	  insert: function (vm, index, prevEl, inDoc) {
	    if (vm._staggerCb) {
	      vm._staggerCb.cancel()
	      vm._staggerCb = null
	    }
	    var staggerAmount = this.getStagger(vm, index, null, 'enter')
	    if (inDoc && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = vm._staggerAnchor
	      if (!anchor) {
	        anchor = vm._staggerAnchor = _.createAnchor('stagger-anchor')
	        anchor.__vue__ = vm
	      }
	      _.after(anchor, prevEl)
	      var op = vm._staggerCb = _.cancellable(function () {
	        vm._staggerCb = null
	        vm.$before(anchor)
	        _.remove(anchor)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      vm.$after(prevEl)
	    }
	  },
	
	  /**
	   * Move an already inserted instance.
	   *
	   * @param {Vue} vm
	   * @param {Node} prevEl
	   */
	
	  move: function (vm, prevEl) {
	    vm.$after(prevEl, null, false)
	  },
	
	  /**
	   * Remove an instance.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {Boolean} inDoc
	   */
	
	  remove: function (vm, index, total, inDoc) {
	    if (vm._staggerCb) {
	      vm._staggerCb.cancel()
	      vm._staggerCb = null
	      // it's not possible for the same vm to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this vm is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return
	    }
	    var staggerAmount = this.getStagger(vm, index, total, 'leave')
	    if (inDoc && staggerAmount) {
	      var op = vm._staggerCb = _.cancellable(function () {
	        vm._staggerCb = null
	        remove()
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      remove()
	    }
	    function remove () {
	      vm.$remove(function () {
	        vm._cleanup()
	      })
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {String} type
	   * @param {Number} total
	   */
	
	  getStagger: function (vm, index, total, type) {
	    type = type + 'Stagger'
	    var trans = vm.$el.__v_trans
	    var hooks = trans && trans.hooks
	    var hook = hooks && (hooks[type] || hooks.stagger)
	    return hook
	      ? hook.call(vm, index, total)
	      : index * this[type]
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters, and convert non-Array objects to arrays.
	   *
	   * This function will be bound to this directive instance
	   * and passed into the watcher.
	   *
	   * @param {*} value
	   * @return {Array}
	   * @private
	   */
	
	  _preProcess: function (value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value
	    var type = this.rawType = typeof value
	    if (!isPlainObject(value)) {
	      this.converted = false
	      if (type === 'number') {
	        value = range(value)
	      } else if (type === 'string') {
	        value = _.toArray(value)
	      }
	      return value || []
	    } else {
	      // convert plain object to array.
	      var keys = Object.keys(value)
	      var i = keys.length
	      var res = new Array(i)
	      var key
	      while (i--) {
	        key = keys[i]
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        }
	      }
	      this.converted = true
	      return res
	    }
	  }
	}
	
	/**
	 * Helper to find the previous element that is an instance
	 * root node. This is necessary because a destroyed vm's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its __vue__ reference
	 * should have been removed so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return vm that is bound to this v-repeat. (see #929)
	 *
	 * @param {Vue} vm
	 * @param {Comment|Text} anchor
	 * @return {Vue}
	 */
	
	function findPrevVm (vm, anchor, id) {
	  var el = vm.$el.previousSibling
	  /* istanbul ignore if */
	  if (!el) return
	  while (
	    (!el.__vue__ || el.__vue__.$options._repeatId !== id) &&
	    el !== anchor
	  ) {
	    el = el.previousSibling
	  }
	  return el.__vue__
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}
	
	/**
	 * Convert a vms array to an object ref for v-ref on an
	 * Object value.
	 *
	 * @param {Array} vms
	 * @return {Object}
	 */
	
	function toRefObject (vms) {
	  var ref = {}
	  for (var i = 0, l = vms.length; i < l; i++) {
	    ref[vms[i].$key] = vms[i]
	  }
	  return ref
	}
	
	/**
	 * Check if a value is a primitive one:
	 * String, Number, Boolean, null or undefined.
	 *
	 * @param {*} value
	 * @return {Boolean}
	 */
	
	function isPrimitive (value) {
	  var type = typeof value
	  return value == null ||
	    type === 'string' ||
	    type === 'number' ||
	    type === 'boolean'
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var FragmentFactory = __webpack_require__(54)
	var isObject = _.isObject
	var uid = 0
	
	module.exports = {
	
	  priority: 2000,
	
	  bind: function () {
	    // determine alias
	    this.alias = this.arg
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/)
	      if (itMatch) {
	        this.iterator = itMatch[1].trim()
	        this.alias = itMatch[2].trim()
	      } else {
	        this.alias = inMatch[1].trim()
	      }
	      this._watcherExp = inMatch[2]
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Alias is required in v-for.'
	      )
	      return
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + (++uid)
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName
	    this.isOption =
	      (tag === 'OPTION' || tag === 'OPTGROUP') &&
	      this.el.parentNode.tagName === 'SELECT'
	
	    // setup anchor nodes
	    this.start = _.createAnchor('v-for-start')
	    this.end = _.createAnchor('v-for-end')
	    _.replace(this.el, this.end)
	    _.before(this.start, this.end)
	
	    // check for trackby param
	    this.idKey = this.param('track-by')
	
	    // TODO: only check ref in 1.0.0
	    // check v-ref
	    var ref = this.param(config.prefix + 'ref')
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && ref) {
	      _.deprecation.V_REF()
	    }
	    this.ref = ref || _.findRef(this.el)
	
	    // check for transition stagger
	    var stagger = +this.param('stagger')
	    this.enterStagger = +this.param('enter-stagger') || stagger
	    this.leaveStagger = +this.param('leave-stagger') || stagger
	
	    // cache
	    this.cache = Object.create(null)
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el)
	  },
	
	  update: function (data) {
	    this.diff(data)
	    this.updateRef()
	    this.updateModel()
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function (data) {
	    // check if the Array was converted from an Object
	    var item = data[0]
	    var convertedFromObject = this.fromObject =
	      isObject(item) &&
	      item.hasOwnProperty('$key') &&
	      item.hasOwnProperty('$value')
	
	    var idKey = this.idKey
	    var oldFrags = this.frags
	    var frags = this.frags = new Array(data.length)
	    var alias = this.alias
	    var iterator = this.iterator
	    var start = this.start
	    var end = this.end
	    var inDoc = _.inDoc(start)
	    var init = !oldFrags
	    var i, l, frag, key, value, primitive
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i]
	      key = convertedFromObject ? item.$key : null
	      value = convertedFromObject ? item.$value : item
	      primitive = !isObject(value)
	      frag = !init && this.getCachedFrag(value, i, key)
	      if (frag) { // reusable fragment
	        frag.reused = true
	        // update $index
	        frag.scope.$index = i
	        // update $key
	        if (key) {
	          frag.scope.$key = key
	          if (iterator) {
	            frag.scope[iterator] = key
	          }
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (idKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value
	        }
	      } else { // new isntance
	        frag = this.create(value, alias, i, key)
	        frag.fresh = !init
	      }
	      frags[i] = frag
	      if (init) {
	        frag.before(end)
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0
	    var totalRemoved = oldFrags.length - frags.length
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i]
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag)
	        this.remove(frag, removalIndex++, totalRemoved, inDoc)
	      }
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev
	    var insertionIndex = 0
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i]
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1]
	      prevEl = targetPrev
	        ? targetPrev.staggerCb
	          ? targetPrev.staggerAnchor
	          : targetPrev.end || targetPrev.node
	        : start
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id)
	        if (currentPrev !== targetPrev) {
	          this.move(frag, prevEl)
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDoc)
	      }
	      frag.reused = frag.fresh = false
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function (value, alias, index, key) {
	    var host = this._host
	    // create iteration scope
	    var parentScope = this._scope || this.vm
	    var scope = Object.create(parentScope)
	    // ref holder for the scope
	    scope.$ = {}
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope
	    // for two-way binding on alias
	    scope.$forContext = this
	    // define scope properties
	    _.defineReactive(scope, alias, value)
	    _.defineReactive(scope, '$index', index)
	    if (key) {
	      _.defineReactive(scope, '$key', key)
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      _.define(scope, '$key', null)
	    }
	    if (this.iterator) {
	      _.defineReactive(scope, this.iterator, key || index)
	    }
	    var frag = this.factory.create(host, scope, this._frag)
	    frag.forId = this.id
	    this.cacheFrag(value, frag, index, key)
	    return frag
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function () {
	    var ref = this.ref
	    if (!ref) return
	    var hash = (this._scope || this.vm).$
	    var refs
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag)
	    } else {
	      refs = {}
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag)
	      })
	    }
	    if (!hash.hasOwnProperty(ref)) {
	      _.defineReactive(hash, ref, refs)
	    } else {
	      hash[ref] = refs
	    }
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function () {
	    if (this.isOption) {
	      var parent = this.start.parentNode
	      var model = parent && parent.__v_model
	      if (model) {
	        model.forceUpdate()
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDoc
	   */
	
	  insert: function (frag, index, prevEl, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter')
	    if (inDoc && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor
	      if (!anchor) {
	        anchor = frag.staggerAnchor = _.createAnchor('stagger-anchor')
	        anchor.__vfrag__ = frag
	      }
	      _.after(anchor, prevEl)
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.before(anchor)
	        _.remove(anchor)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.before(prevEl.nextSibling)
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDoc
	   */
	
	  remove: function (frag, index, total, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave')
	    if (inDoc && staggerAmount) {
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.remove(true)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.remove(true)
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function (frag, prevEl) {
	    frag.before(prevEl.nextSibling, false)
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function (value, frag, index, key) {
	    var idKey = this.idKey
	    var cache = this.cache
	    var primitive = !isObject(value)
	    var id
	    if (key || idKey || primitive) {
	      id = idKey
	        ? idKey === '$index'
	          ? index
	          : value[idKey]
	        : (key || value)
	      if (!cache[id]) {
	        cache[id] = frag
	      } else if (idKey !== '$index') {
	        process.env.NODE_ENV !== 'production' &&
	        this.warnDuplicate(value)
	      }
	    } else {
	      id = this.id
	      if (value.hasOwnProperty(id)) {
	        if (value[id] === null) {
	          value[id] = frag
	        } else {
	          process.env.NODE_ENV !== 'production' &&
	          this.warnDuplicate(value)
	        }
	      } else {
	        _.define(value, id, frag)
	      }
	    }
	    frag.raw = value
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function (value, index, key) {
	    var idKey = this.idKey
	    var primitive = !isObject(value)
	    var frag
	    if (key || idKey || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : value[idKey]
	        : (key || value)
	      frag = this.cache[id]
	    } else {
	      frag = value[this.id]
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' &&
	      this.warnDuplicate(value)
	    }
	    return frag
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function (frag) {
	    var value = frag.raw
	    var idKey = this.idKey
	    var scope = frag.scope
	    var index = scope.$index
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = scope.hasOwnProperty('$key') && scope.$key
	    var primitive = !isObject(value)
	    if (idKey || key || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : value[idKey]
	        : (key || value)
	      this.cache[id] = null
	    } else {
	      value[this.id] = null
	      frag.raw = null
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function (frag, index, total, type) {
	    type = type + 'Stagger'
	    var trans = frag.node.__v_trans
	    var hooks = trans && trans.hooks
	    var hook = hooks && (hooks[type] || hooks.stagger)
	    return hook
	      ? hook.call(frag, index, total)
	      : index * this[type]
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function (value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value
	    return value
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function (value) {
	    if (_.isArray(value)) {
	      return value
	    } else if (_.isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value)
	      var i = keys.length
	      var res = new Array(i)
	      var key
	      while (i--) {
	        key = keys[i]
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        }
	      }
	      return res
	    } else {
	      var type = typeof value
	      if (type === 'number') {
	        value = range(value)
	      } else if (type === 'string') {
	        value = _.toArray(value)
	      }
	      return value || []
	    }
	  },
	
	  unbind: function () {
	    if (this.ref) {
	      (this._scope || this.vm).$[this.ref] = null
	    }
	    if (this.frags) {
	      var i = this.frags.length
	      var frag
	      while (i--) {
	        frag = this.frags[i]
	        this.deleteCachedFrag(frag)
	        frag.destroy()
	      }
	    }
	  }
	}
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag (frag, anchor, id) {
	  var el = frag.node.previousSibling
	  /* istanbul ignore if */
	  if (!el) return
	  frag = el.__vfrag__
	  while (
	    (!frag || frag.forId !== id || !frag.inserted) &&
	    el !== anchor
	  ) {
	    el = el.previousSibling
	    /* istanbul ignore if */
	    if (!el) return
	    frag = el.__vfrag__
	  }
	  return frag
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag (frag) {
	  return frag.node.__vue__ || frag.node.nextSibling.__vue__
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  module.exports.warnDuplicate = function (value) {
	    _.warn(
	      'Duplicate value found in v-for="' + this._descriptor.raw + '": ' +
	      JSON.stringify(value) + '. Use track-by="$index" if ' +
	      'you are expecting duplicate values.'
	    )
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var FragmentFactory = __webpack_require__(54)
	
	module.exports = {
	
	  priority: 2000,
	
	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling
	      if (next && _.attr(next, 'else') !== null) {
	        _.remove(next)
	        this.elseFactory = new FragmentFactory(this.vm, next)
	      }
	      // check main block
	      this.anchor = _.createAnchor('v-if')
	      _.replace(el, this.anchor)
	      this.factory = new FragmentFactory(this.vm, el)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-if="' + this.expression + '" cannot be ' +
	        'used on an instance root element.'
	      )
	      this.invalid = true
	    }
	  },
	
	  update: function (value) {
	    if (this.invalid) return
	    if (value) {
	      if (!this.frag) {
	        this.insert()
	      }
	    } else {
	      this.remove()
	    }
	  },
	
	  insert: function () {
	    if (this.elseFrag) {
	      this.elseFrag.remove(true)
	      this.elseFrag = null
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag)
	    this.frag.before(this.anchor)
	  },
	
	  remove: function () {
	    if (this.frag) {
	      this.frag.remove(true)
	      this.frag = null
	    }
	    if (this.elseFactory) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag)
	      this.elseFrag.before(this.anchor)
	    }
	  },
	
	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports.slot = exports.content = __webpack_require__(80)
	exports.partial = __webpack_require__(81)


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var templateParser = __webpack_require__(51)
	
	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.
	
	module.exports = {
	
	  priority: 1750,
	
	  bind: function () {
	
	    this.isSlot = this.el.tagName === 'SLOT'
	    if (process.env.NODE_ENV !== 'production' && !this.isSlot) {
	      _.deprecation.CONTENT()
	    }
	
	    var vm = this.vm
	    var host = vm
	    // we need find the content context, which is the
	    // closest non-inline-repeater instance.
	    while (host.$options._repeat) {
	      host = host.$parent
	    }
	    var raw = host.$options._content
	    var content
	    if (!raw) {
	      this.fallback()
	      return
	    }
	
	    var context = host._context
	    var selector = this.isSlot
	      ? this.param('name')
	      : this.param('select')
	
	    if (!selector) {
	      // Default content
	      var self = this
	      var compileDefaultContent = function () {
	        self.compile(
	          extractFragment(raw.childNodes, raw, true),
	          context,
	          vm
	        )
	      }
	      if (!host._isCompiled) {
	        // defer until the end of instance compilation,
	        // because the default outlet must wait until all
	        // other possible outlets with selectors have picked
	        // out their contents.
	        host.$once('hook:compiled', compileDefaultContent)
	      } else {
	        compileDefaultContent()
	      }
	    } else {
	      // select content
	      if (this.isSlot) {
	        selector = '[slot="' + selector + '"]'
	      }
	      var nodes = raw.querySelectorAll(selector)
	      if (nodes.length) {
	        content = extractFragment(nodes, raw)
	        if (content.hasChildNodes()) {
	          this.compile(content, context, vm)
	        } else {
	          this.fallback()
	        }
	      } else {
	        this.fallback()
	      }
	    }
	  },
	
	  fallback: function () {
	    this.compile(_.extractContent(this.el, true), this.vm)
	  },
	
	  compile: function (content, context, host) {
	    if (content && context) {
	      var scope = host
	        ? host._scope
	        : this._scope
	      this.unlink = context.$compile(
	        content, host, scope, this._frag
	      )
	    }
	    if (content) {
	      _.replace(this.el, content)
	    } else {
	      _.remove(this.el)
	    }
	  },
	
	  unbind: function () {
	    if (this.unlink) {
	      this.unlink()
	    }
	  }
	}
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */
	
	function extractFragment (nodes, parent, main) {
	  var frag = document.createDocumentFragment()
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i]
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node)
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true
	      append(node)
	    }
	  }
	  return frag
	
	  function append (node) {
	    if (_.isTemplate(node) &&
	        !hasDirecitve(node, 'if') &&
	        !hasDirecitve(node, 'for') &&
	        !hasDirecitve(node, 'repeat')) {
	      node = templateParser.parse(node)
	    }
	    node = templateParser.clone(node)
	    frag.appendChild(node)
	  }
	}
	
	/**
	 * Check if there is a flow control directive on a template
	 * element that is a slot.
	 *
	 * @param {Node} node
	 * @param {String} dir
	 */
	
	function hasDirecitve (node, dir) {
	  return node.hasAttribute(config.prefix + dir)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var textParser = __webpack_require__(33)
	var FragmentFactory = __webpack_require__(54)
	var vIf = __webpack_require__(78)
	var Watcher = __webpack_require__(46)
	
	module.exports = {
	
	  priority: 1750,
	
	  bind: function () {
	    var el = this.el
	    this.anchor = _.createAnchor('v-partial')
	    _.replace(el, this.anchor)
	    var id = el.getAttribute('name')
	    if (id != null) {
	      var tokens = textParser.parse(id)
	      if (tokens) {
	        // dynamic partial
	        this.setupDynamic(textParser.tokensToExp(tokens))
	        if (process.env.NODE_ENV !== 'production') {
	          _.deprecation.PARTIAL_NAME(id)
	        }
	      } else {
	        // static partial
	        this.insert(id)
	      }
	    } else {
	      id = _.getBindAttr(el, 'name')
	      if (id) {
	        this.setupDynamic(id)
	      }
	    }
	  },
	
	  setupDynamic: function (exp) {
	    var self = this
	    var onNameChange = function (value) {
	      vIf.remove.call(self)
	      if (value) {
	        self.insert(value)
	      }
	    }
	    this.nameWatcher = new Watcher(this.vm, exp, onNameChange, {
	      scope: this._scope
	    })
	    onNameChange(this.nameWatcher.value)
	  },
	
	  insert: function (id) {
	    var partial = _.resolveAsset(this.vm.$options, 'partials', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(partial, 'partial', id)
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial)
	      vIf.insert.call(this)
	    }
	  },
	
	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	    if (this.nameWatcher) {
	      this.nameWatcher.teardown()
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	
	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */
	
	exports.json = {
	  read: function (value, indent) {
	    return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	  },
	  write: function (value) {
	    try {
	      return JSON.parse(value)
	    } catch (e) {
	      return value
	    }
	  }
	}
	
	/**
	 * 'abc' => 'Abc'
	 */
	
	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}
	
	/**
	 * 'abc' => 'ABC'
	 */
	
	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}
	
	/**
	 * 'AbC' => 'abc'
	 */
	
	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}
	
	/**
	 * 12345 => $12,345.00
	 *
	 * @param {String} sign
	 */
	
	var digitsRE = /(\d{3})(?=\d)/g
	exports.currency = function (value, currency) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  currency = currency != null ? currency : '$'
	  var stringified = Math.abs(value).toFixed(2)
	  var _int = stringified.slice(0, -3)
	  var i = _int.length % 3
	  var head = i > 0
	    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
	    : ''
	  var _float = stringified.slice(-3)
	  var sign = value < 0 ? '-' : ''
	  return currency + sign + head +
	    _int.slice(i).replace(digitsRE, '$1,') +
	    _float
	}
	
	/**
	 * 'item' => 'items'
	 *
	 * @params
	 *  an array of strings corresponding to
	 *  the single, double, triple ... forms of the word to
	 *  be pluralized. When the number to be pluralized
	 *  exceeds the length of the args, it will use the last
	 *  entry in the array.
	 *
	 *  e.g. ['single', 'double', 'triple', 'multiple']
	 */
	
	exports.pluralize = function (value) {
	  var args = _.toArray(arguments, 1)
	  return args.length > 1
	    ? (args[value % 10 - 1] || args[args.length - 1])
	    : (args[0] + (value === 1 ? '' : 's'))
	}
	
	/**
	 * A special filter that takes a handler function,
	 * wraps it so it only gets triggered on specific
	 * keypresses. v-on only.
	 *
	 * @param {String} key
	 */
	
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	}
	
	exports.key = function (handler, key) {
	  if (!handler) return
	  var code = keyCodes[key]
	  if (!code) {
	    code = parseInt(key, 10)
	  }
	  return function (e) {
	    if (e.keyCode === code) {
	      return handler.call(this, e)
	    }
	  }
	}
	
	// expose keycode hash
	exports.key.keyCodes = keyCodes
	
	exports.debounce = function (handler, delay) {
	  if (!handler) return
	  if (!delay) {
	    delay = 300
	  }
	  return _.debounce(handler, delay)
	}
	
	/**
	 * Install special array filters
	 */
	
	_.extend(exports, __webpack_require__(83))


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Path = __webpack_require__(49)
	var toArray = __webpack_require__(77)._postProcess
	
	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} searchKey
	 * @param {String} [delimiter]
	 * @param {String} dataKey
	 */
	
	exports.filterBy = function (arr, search, delimiter /* ...dataKeys */) {
	  arr = toArray(arr)
	  if (search == null) {
	    return arr
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search)
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase()
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2
	  // extract and flatten keys
	  var keys = _.toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur)
	  }, [])
	  var res = []
	  var item, key, val, j
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i]
	    val = (item && item.$value) || item
	    j = keys.length
	    if (j) {
	      while (j--) {
	        key = keys[j]
	        if ((key === '$key' && contains(item.$key, search)) ||
	            contains(Path.get(val, key), search)) {
	          res.push(item)
	        }
	      }
	    } else {
	      if (contains(item, search)) {
	        res.push(item)
	      }
	    }
	  }
	  return res
	}
	
	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	exports.orderBy = function (arr, sortKey, reverse) {
	  arr = toArray(arr)
	  if (!sortKey) {
	    return arr
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (arguments.length > 2 && typeof reverse !== 'number') {
	      _.deprecation.ORDER_BY_REVERSE()
	    }
	  }
	  var order = (reverse && reverse < 0) ? -1 : 1
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (_.isObject(a) && '$value' in a) a = a.$value
	      if (_.isObject(b) && '$value' in b) b = b.$value
	    }
	    a = _.isObject(a) ? Path.get(a, sortKey) : a
	    b = _.isObject(b) ? Path.get(b, sortKey) : b
	    return a === b ? 0 : a > b ? order : -order
	  })
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains (val, search) {
	  var i
	  if (_.isPlainObject(val)) {
	    var keys = Object.keys(val)
	    i = keys.length
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true
	      }
	    }
	  } else if (_.isArray(val)) {
	    i = val.length
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(27).mergeOptions
	
	/**
	 * The main init sequence. This is called for every
	 * instance, including ones that are created from extended
	 * constructors.
	 *
	 * @param {Object} options - this options object should be
	 *                           the result of merging class
	 *                           options and the options passed
	 *                           in to the constructor.
	 */
	
	exports._init = function (options) {
	
	  options = options || {}
	
	  this.$el = null
	  this.$parent = options.parent
	  this.$root = this.$parent
	    ? this.$parent.$root
	    : this
	  this.$children = []
	  this.$ = {}           // child vm references
	  this.$$ = {}          // element references
	  this._watchers = []   // all watchers as an array
	  this._directives = [] // all directives
	  this._childCtors = {} // inherit:true constructors
	
	  // a flag to avoid this being observed
	  this._isVue = true
	
	  // events bookkeeping
	  this._events = {}            // registered callbacks
	  this._eventsCount = {}       // for $broadcast optimization
	  this._shouldPropagate = false // for event propagation
	
	  // fragment instance properties
	  this._isFragment = false
	  this._fragmentStart =    // @type {CommentNode}
	  this._fragmentEnd = null // @type {CommentNode}
	
	  // lifecycle state
	  this._isCompiled =
	  this._isDestroyed =
	  this._isReady =
	  this._isAttached =
	  this._isBeingDestroyed = false
	  this._unlinkFn = null
	
	  // context:
	  // if this is a transcluded component, context
	  // will be the common parent vm of this instance
	  // and its host.
	  this._context = options._context || this.$parent
	
	  // scope:
	  // if this is inside an inline v-repeat, the scope
	  // will be the intermediate scope created for this
	  // repeat fragment. this is used for linking props
	  // and container directives.
	  this._scope = options._scope
	
	  // set ref
	  if (options._ref) {
	    (this._scope || this._context).$[options._ref] = this
	  }
	
	  // fragment:
	  // if this instance is compiled inside a Fragment, it
	  // needs to reigster itself as a child of that fragment
	  // for attach/detach to work properly.
	  this._frag = options._frag
	  if (this._frag) {
	    this._frag.children.push(this)
	  }
	
	  // push self into parent / transclusion host
	  if (this.$parent) {
	    this.$parent.$children.push(this)
	  }
	
	  // props used in v-repeat diffing
	  this._reused = false
	  this._staggerOp = null
	
	  // merge options.
	  options = this.$options = mergeOptions(
	    this.constructor.options,
	    options,
	    this
	  )
	
	  // initialize data as empty object.
	  // it will be filled up in _initScope().
	  this._data = {}
	
	  // call init hook
	  this._callHook('init')
	
	  // initialize data observation and scope inheritance.
	  this._initState()
	
	  // setup event system and option events.
	  this._initEvents()
	
	  // call created hook
	  this._callHook('created')
	
	  // if `el` option is passed, start compilation.
	  if (options.el) {
	    this.$mount(options.el)
	  }
	}


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var inDoc = _.inDoc
	var eventRE = /^v-on:|^@/
	
	/**
	 * Setup the instance's option events & watchers.
	 * If the value is a string, we pull it from the
	 * instance's methods by name.
	 */
	
	exports._initEvents = function () {
	  var options = this.$options
	  if (options._asComponent) {
	    registerComponentEvents(this, options.el)
	  }
	  registerCallbacks(this, '$on', options.events)
	  registerCallbacks(this, '$watch', options.watch)
	}
	
	/**
	 * Register v-on events on a child component
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 */
	
	function registerComponentEvents (vm, el) {
	  var attrs = el.attributes
	  var name, handler
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    name = attrs[i].name
	    if (eventRE.test(name)) {
	      name = name.replace(eventRE, '')
	      handler = (vm._scope || vm._context).$eval(attrs[i].value, true)
	      vm.$on(name.replace(eventRE), handler)
	    }
	  }
	}
	
	/**
	 * Register callbacks for option events and watchers.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {Object} hash
	 */
	
	function registerCallbacks (vm, action, hash) {
	  if (!hash) return
	  var handlers, key, i, j
	  for (key in hash) {
	    handlers = hash[key]
	    if (_.isArray(handlers)) {
	      for (i = 0, j = handlers.length; i < j; i++) {
	        register(vm, action, key, handlers[i])
	      }
	    } else {
	      register(vm, action, key, handlers)
	    }
	  }
	}
	
	/**
	 * Helper to register an event/watch callback.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {String} key
	 * @param {Function|String|Object} handler
	 * @param {Object} [options]
	 */
	
	function register (vm, action, key, handler, options) {
	  var type = typeof handler
	  if (type === 'function') {
	    vm[action](key, handler, options)
	  } else if (type === 'string') {
	    var methods = vm.$options.methods
	    var method = methods && methods[handler]
	    if (method) {
	      vm[action](key, method, options)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Unknown method: "' + handler + '" when ' +
	        'registering callback for ' + action +
	        ': "' + key + '".'
	      )
	    }
	  } else if (handler && type === 'object') {
	    register(vm, action, key, handler.handler, handler)
	  }
	}
	
	/**
	 * Setup recursive attached/detached calls
	 */
	
	exports._initDOMHooks = function () {
	  this.$on('hook:attached', onAttached)
	  this.$on('hook:detached', onDetached)
	}
	
	/**
	 * Callback to recursively call attached hook on children
	 */
	
	function onAttached () {
	  if (!this._isAttached) {
	    this._isAttached = true
	    this.$children.forEach(callAttach)
	  }
	}
	
	/**
	 * Iterator to call attached hook
	 *
	 * @param {Vue} child
	 */
	
	function callAttach (child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached')
	  }
	}
	
	/**
	 * Callback to recursively call detached hook on children
	 */
	
	function onDetached () {
	  if (this._isAttached) {
	    this._isAttached = false
	    this.$children.forEach(callDetach)
	  }
	}
	
	/**
	 * Iterator to call detached hook
	 *
	 * @param {Vue} child
	 */
	
	function callDetach (child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached')
	  }
	}
	
	/**
	 * Trigger all handlers for a hook
	 *
	 * @param {String} hook
	 */
	
	exports._callHook = function (hook) {
	  var handlers = this.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(this)
	    }
	  }
	  this.$emit('hook:' + hook)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var compiler = __webpack_require__(41)
	var Observer = __webpack_require__(87)
	var Dep = __webpack_require__(47)
	var Watcher = __webpack_require__(46)
	
	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */
	
	exports._initState = function () {
	  this._initProps()
	  this._initMeta()
	  this._initMethods()
	  this._initData()
	  this._initComputed()
	}
	
	/**
	 * Initialize props.
	 */
	
	exports._initProps = function () {
	  var options = this.$options
	  var el = options.el
	  var props = options.props
	  if (props && !el) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Props will not be compiled if no `el` option is ' +
	      'provided at instantiation.'
	    )
	  }
	  // make sure to convert string selectors into element now
	  el = options.el = _.query(el)
	  this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-repeat
	    ? compiler.compileAndLinkProps(this, el, props, this._scope)
	    : null
	}
	
	/**
	 * Initialize the data.
	 */
	
	exports._initData = function () {
	  var propsData = this._data
	  var optionsDataFn = this.$options.data
	  var optionsData = optionsDataFn && optionsDataFn()
	  if (optionsData) {
	    this._data = optionsData
	    for (var prop in propsData) {
	      if (process.env.NODE_ENV !== 'production' &&
	          optionsData.hasOwnProperty(prop)) {
	        _.warn(
	          'Data field "' + prop + '" is already defined ' +
	          'as a prop. Use prop default value instead.'
	        )
	      }
	      if (this._props[prop].raw !== null ||
	          !optionsData.hasOwnProperty(prop)) {
	        _.set(optionsData, prop, propsData[prop])
	      }
	    }
	  }
	  var data = this._data
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var i, key
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    this._proxy(key)
	  }
	  // observe data
	  Observer.create(data, this)
	}
	
	/**
	 * Swap the isntance's $data. Called in $data's setter.
	 *
	 * @param {Object} newData
	 */
	
	exports._setData = function (newData) {
	  newData = newData || {}
	  var oldData = this._data
	  this._data = newData
	  var keys, key, i
	  // copy props.
	  // this should only happen during a v-repeat of component
	  // that also happens to have compiled props.
	  var props = this.$options.props
	  if (props) {
	    i = props.length
	    while (i--) {
	      key = props[i].name
	      if (key !== '$data' && !newData.hasOwnProperty(key)) {
	        newData.$set(key, oldData[key])
	      }
	    }
	  }
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!(key in newData)) {
	      this._unproxy(key)
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!this.hasOwnProperty(key)) {
	      // new property
	      this._proxy(key)
	    }
	  }
	  oldData.__ob__.removeVm(this)
	  Observer.create(newData, this)
	  this._digest()
	}
	
	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */
	
	exports._proxy = function (key) {
	  if (!_.isReserved(key)) {
	    // need to store ref to self here
	    // because these getter/setters might
	    // be called by child scopes via
	    // prototype inheritance.
	    var self = this
	    Object.defineProperty(self, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return self._data[key]
	      },
	      set: function proxySetter (val) {
	        self._data[key] = val
	      }
	    })
	  }
	}
	
	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */
	
	exports._unproxy = function (key) {
	  if (!_.isReserved(key)) {
	    delete this[key]
	  }
	}
	
	/**
	 * Force update on every watcher in scope.
	 */
	
	exports._digest = function () {
	  var i = this._watchers.length
	  while (i--) {
	    this._watchers[i].update(true) // shallow updates
	  }
	  var children = this.$children
	  i = children.length
	  while (i--) {
	    var child = children[i]
	    if (child.$options.inherit) {
	      child._digest()
	    }
	  }
	}
	
	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */
	
	function noop () {}
	exports._initComputed = function () {
	  var computed = this.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      var def = {
	        enumerable: true,
	        configurable: true
	      }
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, this)
	        def.set = noop
	      } else {
	        def.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, this)
	            : _.bind(userDef.get, this)
	          : noop
	        def.set = userDef.set
	          ? _.bind(userDef.set, this)
	          : noop
	      }
	      Object.defineProperty(this, key, def)
	    }
	  }
	}
	
	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, null, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}
	
	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be called by children
	 * inheriting them.
	 */
	
	exports._initMethods = function () {
	  var methods = this.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this)
	    }
	  }
	}
	
	/**
	 * Initialize meta information like $index, $key & $value.
	 */
	
	exports._initMeta = function () {
	  var metas = this.$options._meta
	  if (metas) {
	    for (var key in metas) {
	      _.defineReactive(this, key, metas[key])
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var Dep = __webpack_require__(47)
	var arrayMethods = __webpack_require__(88)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	__webpack_require__(89)
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  _.define(value, '__ob__', this)
	  if (_.isArray(value)) {
	    var augment = config.proto && _.hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	}
	
	// Static methods
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	Observer.create = function (value, vm) {
	  if (!value || typeof value !== 'object') {
	    return
	  }
	  var ob
	  if (
	    value.hasOwnProperty('__ob__') &&
	    value.__ob__ instanceof Observer
	  ) {
	    ob = value.__ob__
	  } else if (
	    (_.isArray(value) || _.isPlainObject(value)) &&
	    !Object.isFrozen(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  if (ob && vm) {
	    ob.addVm(vm)
	  }
	  return ob
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj)
	  var i = keys.length
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]])
	  }
	}
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  var i = items.length
	  while (i--) {
	    var ob = Observer.create(items[i])
	    if (ob) {
	      (ob.parents || (ob.parents = [])).push(this)
	    }
	  }
	}
	
	/**
	 * Remove self from the parent list of removed objects.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.unobserveArray = function (items) {
	  var i = items.length
	  while (i--) {
	    var ob = items[i] && items[i].__ob__
	    if (ob) {
	      ob.parents.$remove(this)
	    }
	  }
	}
	
	/**
	 * Notify self dependency, and also parent Array dependency
	 * if any.
	 */
	
	Observer.prototype.notify = function () {
	  this.dep.notify()
	  var parents = this.parents
	  if (parents) {
	    var i = parents.length
	    while (i--) {
	      parents[i].notify()
	    }
	  }
	}
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val)
	}
	
	/**
	 * Add an owner vm, so that when $add/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm)
	}
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm)
	}
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment (target, src) {
	  target.__proto__ = src
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment (target, src, keys) {
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    _.define(target, key, src[key])
	  }
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive (obj, key, val) {
	  var dep = new Dep()
	  var childOb = Observer.create(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function metaGetter () {
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	      }
	      return val
	    },
	    set: function metaSetter (newVal) {
	      if (newVal === val) return
	      val = newVal
	      childOb = Observer.create(newVal)
	      dep.notify()
	    }
	  })
	}
	
	// Attach to the util object so it can be used elsewhere.
	_.defineReactive = defineReactive
	
	module.exports = Observer


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  _.define(arrayMethods, method, function mutator () {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted, removed
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        removed = result
	        break
	      case 'pop':
	      case 'shift':
	        removed = [result]
	        break
	    }
	    if (inserted) ob.observeArray(inserted)
	    if (removed) ob.unobserveArray(removed)
	    // notify change
	    ob.notify()
	    return result
	  })
	})
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	_.define(
	  arrayProto,
	  '$set',
	  function $set (index, val) {
	    if (index >= this.length) {
	      this.length = index + 1
	    }
	    return this.splice(index, 1, val)[0]
	  }
	)
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	_.define(
	  arrayProto,
	  '$remove',
	  function $remove (item) {
	    /* istanbul ignore if */
	    if (!this.length) return
	    var index = _.indexOf(this, item)
	    if (index > -1) {
	      return this.splice(index, 1)
	    }
	  }
	)
	
	module.exports = arrayMethods


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var objProto = Object.prototype
	
	/**
	 * $add deprecation warning
	 */
	
	_.define(
	  objProto,
	  '$add',
	  function (key, val) {
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.ADD()
	    }
	    if (!this.hasOwnProperty(key)) {
	      _.set(this, key, val)
	    }
	  }
	)
	
	/**
	 * Set a property on an observed object, calling add to
	 * ensure the property is observed.
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	_.define(
	  objProto,
	  '$set',
	  function $set (key, val) {
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.SET()
	    }
	    _.set(this, key, val)
	  }
	)
	
	/**
	 * Deletes a property from an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @public
	 */
	
	_.define(
	  objProto,
	  '$delete',
	  function $delete (key) {
	    if (process.env.NODE_ENV !== 'production') {
	      _.deprecation.DELETE()
	    }
	    _.delete(this, key)
	  }
	)
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var Directive = __webpack_require__(91)
	var compiler = __webpack_require__(41)
	
	/**
	 * Transclude, compile and link element.
	 *
	 * If a pre-compiled linker is available, that means the
	 * passed in element will be pre-transcluded and compiled
	 * as well - all we need to do is to call the linker.
	 *
	 * Otherwise we need to call transclude/compile/link here.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */
	
	exports._compile = function (el) {
	  var options = this.$options
	  if (options._linkFn) {
	    // pre-transcluded with linker, just use it
	    this._initElement(el)
	    this._unlinkFn = options._linkFn(this, el)
	  } else {
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el
	    el = compiler.transclude(el, options)
	    this._initElement(el)
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options
	    var rootLinker = compiler.compileRoot(el, options, contextOptions)
	
	    // compile and link the rest
	    var contentLinkFn
	    var ctor = this.constructor
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compiler.compile(el, options)
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope)
	    var contentUnlinkFn = contentLinkFn
	      ? contentLinkFn(this, el)
	      : compiler.compile(el, options)(this, el)
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn()
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true)
	    }
	
	    // finally replace original
	    if (options.replace) {
	      _.replace(original, el)
	    }
	  }
	  return el
	}
	
	/**
	 * Initialize instance element. Called in the public
	 * $mount() method.
	 *
	 * @param {Element} el
	 */
	
	exports._initElement = function (el) {
	  if (el instanceof DocumentFragment) {
	    this._isFragment = true
	    this.$el = this._fragmentStart = el.firstChild
	    this._fragmentEnd = el.lastChild
	    // set persisted text anchors to empty
	    if (this._fragmentStart.nodeType === 3) {
	      this._fragmentStart.data = this._fragmentEnd.data = ''
	    }
	    this._blockFragment = el
	  } else {
	    this.$el = el
	  }
	  this.$el.__vue__ = this
	  this._callHook('beforeCompile')
	}
	
	/**
	 * Create and bind a directive to an element.
	 *
	 * @param {String} name - directive name
	 * @param {Node} node   - target node
	 * @param {Object} desc - parsed directive descriptor
	 * @param {Object} def  - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 */
	
	exports._bindDir = function (name, node, desc, def, host, scope, frag, arg, literal) {
	  this._directives.push(
	    new Directive(name, node, this, desc, def, host, scope, frag, arg, literal)
	  )
	}
	
	/**
	 * Teardown an instance, unobserves the data, unbind all the
	 * directives, turn off all the event listeners, etc.
	 *
	 * @param {Boolean} remove - whether to remove the DOM node.
	 * @param {Boolean} deferCleanup - if true, defer cleanup to
	 *                                 be called later
	 */
	
	exports._destroy = function (remove, deferCleanup) {
	  if (this._isBeingDestroyed) {
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  var i
	  // remove self from parent. only necessary
	  // if parent is not being destroyed as well.
	  var parent = this.$parent
	  if (parent && !parent._isBeingDestroyed) {
	    parent.$children.$remove(this)
	    // unregister ref
	    var ref = this.$options._ref
	    if (ref) {
	      var scope = this._scope || this._context
	      if (scope.$refs[ref] === this) {
	        scope.$refs[ref] = null
	      }
	    }
	  }
	  // remove self from owner fragment
	  if (this._frag) {
	    this._frag.children.$remove(this)
	  }
	  // destroy all children.
	  i = this.$children.length
	  while (i--) {
	    this.$children[i].$destroy()
	  }
	  // teardown props
	  if (this._propsUnlinkFn) {
	    this._propsUnlinkFn()
	  }
	  // teardown all directives. this also tearsdown all
	  // directive-owned watchers.
	  if (this._unlinkFn) {
	    this._unlinkFn()
	  }
	  i = this._watchers.length
	  while (i--) {
	    this._watchers[i].teardown()
	  }
	  // remove reference to self on $el
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove DOM element
	  var self = this
	  if (remove && this.$el) {
	    this.$remove(function () {
	      self._cleanup()
	    })
	  } else if (!deferCleanup) {
	    this._cleanup()
	  }
	}
	
	/**
	 * Clean up to ensure garbage collection.
	 * This is called after the leave transition if there
	 * is any.
	 */
	
	exports._cleanup = function () {
	  // remove reference from data ob
	  // frozen object may not have observer.
	  if (this._data.__ob__) {
	    this._data.__ob__.removeVm(this)
	  }
	  // Clean up references to private properties and other
	  // instances. preserve reference to _data so that proxy
	  // accessors still work. The only potential side effect
	  // here is that mutating the instance after it's destroyed
	  // may affect the state of other components that are still
	  // observing the same object, but that seems to be a
	  // reasonable responsibility for the user rather than
	  // always throwing an error on them.
	  this.$el =
	  this.$parent =
	  this.$root =
	  this.$children =
	  this._watchers =
	  this._context =
	  this._scope =
	  this._directives = null
	  // call the last hook...
	  this._isDestroyed = true
	  this._callHook('destroyed')
	  // turn off all instance listeners.
	  this.$off()
	}


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var config = __webpack_require__(32)
	var Watcher = __webpack_require__(46)
	var textParser = __webpack_require__(33)
	var expParser = __webpack_require__(48)
	function noop () {}
	
	var modifierRE = /\.[^\.]+/g
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} expression
	 *                 - {String} [arg]
	 *                 - {Array<Object>} [filters]
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	
	// TODO: 1.0.0 cleanup the arguments
	
	function Directive (name, el, vm, descriptor, def, host, scope, frag, arg, literal) {
	  // public
	  this.name = name
	  this.el = el
	  this.vm = vm
	  // copy descriptor props
	  this.expression = descriptor.expression
	  this.arg = arg || descriptor.arg
	
	  // patch: modifiers
	  if (typeof this.arg === 'string') {
	    this.modifiers = parseModifiers(this.arg)
	    this.arg = this.arg.replace(modifierRE, '')
	  }
	
	  this.filters = descriptor.filters
	  // private
	  this._def = def
	  this._descriptor = descriptor
	  this._locked = false
	  this._bound = false
	  this._listeners = null
	  // link context
	  this._host = host
	  this._scope = scope
	  this._frag = frag
	  // literal
	  this._literal = literal
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var def = this._def
	  var name = this.name
	  if (
	    (name !== 'cloak' || this.vm._isCompiled) &&
	    this.el && this.el.removeAttribute
	  ) {
	    this.el.removeAttribute(config.prefix + this.name)
	    // 1.0.0: remove bind/on
	    // TODO simplify this
	    if (name === 'attr') {
	      removeBindAttr(this.el, this.arg)
	    } else if (name === 'class' || name === 'style') {
	      removeBindAttr(this.el, name)
	    } else if (name === 'on') {
	      this.el.removeAttribute('on-' + this.arg)
	    } else if (name === 'transition') {
	      if (this.arg) {
	        removeBindAttr(this.el, name)
	      } else {
	        this.el.removeAttribute(name)
	      }
	    } else if (name === 'el') {
	      this.el.removeAttribute('$$.' + this.expression)
	    }
	  }
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }
	  this._watcherExp = this.expression
	  this._checkDynamicLiteral()
	  if (this.bind) {
	    this.bind()
	  }
	  if (this._literal) {
	    this.update && this.update(this.expression)
	  } else if (
	    (this._watcherExp || this.modifiers) &&
	    (this.update || this.twoWay) &&
	    (!this.isLiteral || this._isDynamicLiteral) &&
	    !this._checkStatement()
	  ) {
	    // wrapped updater for context
	    var dir = this
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal)
	        }
	      }
	    } else {
	      this._update = noop
	    }
	    var preProcess = this._preProcess
	      ? _.bind(this._preProcess, this)
	      : null
	    var postProcess = this._postProcess
	      ? _.bind(this._postProcess, this)
	      : null
	    var watcher = this._watcher = new Watcher(
	      this.vm,
	      this._watcherExp,
	      this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      }
	    )
	    if (this.afterBind) {
	      this.afterBind()
	    } else if (this._initValue != null) {
	      watcher.set(this._initValue)
	    } else if (this.update) {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}
	
	/**
	 * check if this is a dynamic literal binding.
	 *
	 * e.g. v-component="{{currentView}}"
	 */
	
	// TODO: we shouldn't need this in 1.0.0.
	Directive.prototype._checkDynamicLiteral = function () {
	  var expression = this.expression
	  if (expression && this.isLiteral) {
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (this.name !== 'el' &&
	          this.name !== 'ref' &&
	          this.name !== 'transition' &&
	          this.name !== 'component') {
	        _.deprecation.LITERAL()
	      }
	    }
	
	    var tokens = textParser.parse(expression)
	    if (tokens) {
	      var exp = textParser.tokensToExp(tokens)
	      this.expression = this.vm.$get(exp)
	      this._watcherExp = exp
	      this._isDynamicLiteral = true
	    }
	  }
	}
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. v-on="click: a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression
	  if (
	    expression && this.acceptStatement &&
	    !expParser.isSimplePath(expression)
	  ) {
	    var fn = expParser.parse(expression).get
	    var scope = this._scope || this.vm
	    var handler = function () {
	      fn.call(scope, scope)
	    }
	    if (this.filters) {
	      handler = this.vm._applyFilters(handler, null, this.filters)
	    }
	    this.update(handler)
	    return true
	  }
	}
	
	/**
	 * Check for an attribute directive param, e.g. lazy
	 *
	 * @param {String} name
	 * @return {String}
	 */
	
	Directive.prototype.param = function (name) {
	  var param = this.el.getAttribute(name)
	  if (param != null) {
	    this.el.removeAttribute(name)
	    param = (this._scope || this.vm).$interpolate(param)
	  }
	  return param
	}
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value)
	    })
	  } else if (process.env.NODE_ENV !== 'production') {
	    _.warn(
	      'Directive.set() can only be used inside twoWay' +
	      'directives.'
	    )
	  }
	}
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this
	  self._locked = true
	  fn.call(self)
	  _.nextTick(function () {
	    self._locked = false
	  })
	}
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	
	Directive.prototype.on = function (event, handler) {
	  _.on(this.el, event, handler)
	  ;(this._listeners || (this._listeners = []))
	    .push([event, handler])
	}
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false
	    if (this.unbind) {
	      this.unbind()
	    }
	    if (this._watcher) {
	      this._watcher.teardown()
	    }
	    var listeners = this._listeners
	    if (listeners) {
	      for (var i = 0; i < listeners.length; i++) {
	        _.off(this.el, listeners[i][0], listeners[i][1])
	      }
	    }
	    this.vm = this.el =
	    this._watcher = this._listeners = null
	  }
	}
	
	/**
	 * Check if the colon prefixed form exists before attempting
	 * to remove it. This is necessary because IE will remove
	 * the unprefixed attribute if the prefixed version is not
	 * present.
	 *
	 * @param {Element} el
	 * @param {String} name
	 */
	
	function removeBindAttr (el, name) {
	  var attr = ':' + name
	  if (el.hasAttribute(attr)) {
	    el.removeAttribute(attr)
	  }
	  attr = config.prefix + 'bind:' + name
	  if (el.hasAttribute(attr)) {
	    el.removeAttribute(attr)
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers (name) {
	  var res = Object.create(null)
	  var match = name.match(modifierRE)
	  if (match) {
	    var i = match.length
	    while (i--) {
	      res[match[i].slice(1)] = true
	    }
	  }
	  return res
	}
	
	module.exports = Directive
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	/**
	 * Apply a list of filter (descriptors) to a value.
	 * Using plain for loops here because this will be called in
	 * the getter of any watcher with filters so it is very
	 * performance sensitive.
	 *
	 * @param {*} value
	 * @param {*} [oldValue]
	 * @param {Array} filters
	 * @param {Boolean} write
	 * @return {*}
	 */
	
	exports._applyFilters = function (value, oldValue, filters, write) {
	  var filter, fn, args, arg, offset, i, l, j, k
	  for (i = 0, l = filters.length; i < l; i++) {
	    filter = filters[i]
	    fn = _.resolveAsset(this.$options, 'filters', filter.name)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(fn, 'filter', filter.name)
	    }
	    if (!fn) continue
	    fn = write ? fn.write : (fn.read || fn)
	    if (typeof fn !== 'function') continue
	    args = write ? [value, oldValue] : [value]
	    offset = write ? 2 : 1
	    if (filter.args) {
	      for (j = 0, k = filter.args.length; j < k; j++) {
	        arg = filter.args[j]
	        args[j + offset] = arg.dynamic
	          ? this.$get(arg.value)
	          : arg.value
	      }
	    }
	    value = fn.apply(this, args)
	  }
	  return value
	}
	
	/**
	 * Resolve a component, depending on whether the component
	 * is defined normally or using an async factory function.
	 * Resolves synchronously if already resolved, otherwise
	 * resolves asynchronously and caches the resolved
	 * constructor on the factory.
	 *
	 * @param {String} id
	 * @param {Function} cb
	 */
	
	exports._resolveComponent = function (id, cb) {
	  var factory = _.resolveAsset(this.$options, 'components', id)
	  if (process.env.NODE_ENV !== 'production') {
	    _.assertAsset(factory, 'component', id)
	  }
	  if (!factory) {
	    return
	  }
	  // async component factory
	  if (!factory.options) {
	    if (factory.resolved) {
	      // cached
	      cb(factory.resolved)
	    } else if (factory.requested) {
	      // pool callbacks
	      factory.pendingCallbacks.push(cb)
	    } else {
	      factory.requested = true
	      var cbs = factory.pendingCallbacks = [cb]
	      factory(function resolve (res) {
	        if (_.isPlainObject(res)) {
	          res = _.Vue.extend(res)
	        }
	        // cache resolved
	        factory.resolved = res
	        // invoke callbacks
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }, function reject (reason) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Failed to resolve async component: ' + id + '. ' +
	          (reason ? '\nReason: ' + reason : '')
	        )
	      })
	    }
	  } else {
	    // normal component
	    cb(factory)
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var Watcher = __webpack_require__(46)
	var Path = __webpack_require__(49)
	var textParser = __webpack_require__(33)
	var dirParser = __webpack_require__(35)
	var expParser = __webpack_require__(48)
	var filterRE = /[^|]\|[^|]/
	
	/**
	 * Get the value from an expression on this vm.
	 *
	 * @param {String} exp
	 * @param {Boolean} [asStatement]
	 * @return {*}
	 */
	
	exports.$get = function (exp, asStatement) {
	  var res = expParser.parse(exp)
	  if (res) {
	    if (asStatement && !expParser.isSimplePath(exp)) {
	      var self = this
	      return function statementHandler () {
	        res.get.call(self, self)
	      }
	    } else {
	      try {
	        return res.get.call(this, this)
	      } catch (e) {}
	    }
	  }
	}
	
	/**
	 * Set the value from an expression on this vm.
	 * The expression must be a valid left-hand
	 * expression in an assignment.
	 *
	 * @param {String} exp
	 * @param {*} val
	 */
	
	exports.$set = function (exp, val) {
	  var res = expParser.parse(exp, true)
	  if (res && res.set) {
	    res.set.call(this, this, val)
	  }
	}
	
	/**
	 * Add a property on the VM (deorecated)
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	exports.$add = function (key, val) {
	  this._data.$set(key, val)
	  if (process.env.NODE_ENV !== 'production') {
	    __webpack_require__(27).deprecation.ADD()
	  }
	}
	
	/**
	 * Delete a property on the VM
	 *
	 * @param {String} key
	 */
	
	exports.$delete = function (key) {
	  _.delete(this._data, key)
	}
	
	/**
	 * Watch an expression, trigger callback when its
	 * value changes.
	 *
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} [options]
	 *                 - {Boolean} deep
	 *                 - {Boolean} immediate
	 * @return {Function} - unwatchFn
	 */
	
	exports.$watch = function (expOrFn, cb, options) {
	  var vm = this
	  var parsed
	  if (typeof expOrFn === 'string') {
	    parsed = dirParser.parse(expOrFn)[0]
	    expOrFn = parsed.expression
	  }
	  var watcher = new Watcher(vm, expOrFn, cb, {
	    deep: options && options.deep,
	    filters: parsed && parsed.filters
	  })
	  if (options && options.immediate) {
	    cb.call(vm, watcher.value)
	  }
	  return function unwatchFn () {
	    watcher.teardown()
	  }
	}
	
	/**
	 * Evaluate a text directive, including filters.
	 *
	 * @param {String} text
	 * @param {Boolean} [asStatement]
	 * @return {String}
	 */
	
	exports.$eval = function (text, asStatement) {
	  // check for filters.
	  if (filterRE.test(text)) {
	    var dir = dirParser.parse(text)[0]
	    // the filter regex check might give false positive
	    // for pipes inside strings, so it's possible that
	    // we don't get any filters here
	    var val = this.$get(dir.expression, asStatement)
	    return dir.filters
	      ? this._applyFilters(val, null, dir.filters)
	      : val
	  } else {
	    // no filter
	    return this.$get(text, asStatement)
	  }
	}
	
	/**
	 * Interpolate a piece of template text.
	 *
	 * @param {String} text
	 * @return {String}
	 */
	
	exports.$interpolate = function (text) {
	  var tokens = textParser.parse(text)
	  var vm = this
	  if (tokens) {
	    if (tokens.length === 1) {
	      return vm.$eval(tokens[0].value) + ''
	    } else {
	      return tokens.map(function (token) {
	        return token.tag
	          ? vm.$eval(token.value)
	          : token.value
	      }).join('')
	    }
	  } else {
	    return text
	  }
	}
	
	/**
	 * Log instance data as a plain JS object
	 * so that it is easier to inspect in console.
	 * This method assumes console is available.
	 *
	 * @param {String} [path]
	 */
	
	exports.$log = function (path) {
	  var data = path
	    ? Path.get(this._data, path)
	    : this._data
	  if (data) {
	    data = clean(data)
	  }
	  // include computed fields
	  if (!path) {
	    for (var key in this.$options.computed) {
	      data[key] = clean(this[key])
	    }
	  }
	  console.log(data)
	}
	
	/**
	 * "clean" a getter/setter converted object into a plain
	 * object copy.
	 *
	 * @param {Object} - obj
	 * @return {Object}
	 */
	
	function clean (obj) {
	  return JSON.parse(JSON.stringify(obj))
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27)
	var transition = __webpack_require__(56)
	
	/**
	 * Convenience on-instance nextTick. The callback is
	 * auto-bound to the instance, and this avoids component
	 * modules having to rely on the global Vue.
	 *
	 * @param {Function} fn
	 */
	
	exports.$nextTick = function (fn) {
	  _.nextTick(fn, this)
	}
	
	/**
	 * Append instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */
	
	exports.$appendTo = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    append, transition.append
	  )
	}
	
	/**
	 * Prepend instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */
	
	exports.$prependTo = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.hasChildNodes()) {
	    this.$before(target.firstChild, cb, withTransition)
	  } else {
	    this.$appendTo(target, cb, withTransition)
	  }
	  return this
	}
	
	/**
	 * Insert instance before target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */
	
	exports.$before = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    before, transition.before
	  )
	}
	
	/**
	 * Insert instance after target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */
	
	exports.$after = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.nextSibling) {
	    this.$before(target.nextSibling, cb, withTransition)
	  } else {
	    this.$appendTo(target.parentNode, cb, withTransition)
	  }
	  return this
	}
	
	/**
	 * Remove instance from DOM
	 *
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */
	
	exports.$remove = function (cb, withTransition) {
	  if (!this.$el.parentNode) {
	    return cb && cb()
	  }
	  var inDoc = this._isAttached && _.inDoc(this.$el)
	  // if we are not in document, no need to check
	  // for transitions
	  if (!inDoc) withTransition = false
	  var op
	  var self = this
	  var realCb = function () {
	    if (inDoc) self._callHook('detached')
	    if (cb) cb()
	  }
	  if (
	    this._isFragment &&
	    !this._blockFragment.hasChildNodes()
	  ) {
	    op = withTransition === false
	      ? append
	      : transition.removeThenAppend
	    blockOp(this, this._blockFragment, op, realCb)
	  } else {
	    op = withTransition === false
	      ? remove
	      : transition.remove
	    op(this.$el, this, realCb)
	  }
	  return this
	}
	
	/**
	 * Shared DOM insertion function.
	 *
	 * @param {Vue} vm
	 * @param {Element} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition]
	 * @param {Function} op1 - op for non-transition insert
	 * @param {Function} op2 - op for transition insert
	 * @return vm
	 */
	
	function insert (vm, target, cb, withTransition, op1, op2) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	    ? op1
	    : op2
	  var shouldCallHook =
	    !targetIsDetached &&
	    !vm._isAttached &&
	    !_.inDoc(vm.$el)
	  if (vm._isFragment) {
	    blockOp(vm, target, op, cb)
	  } else {
	    op(vm.$el, target, vm, cb)
	  }
	  if (shouldCallHook) {
	    vm._callHook('attached')
	  }
	  return vm
	}
	
	/**
	 * Execute a transition operation on a fragment instance,
	 * iterating through all its block nodes.
	 *
	 * @param {Vue} vm
	 * @param {Node} target
	 * @param {Function} op
	 * @param {Function} cb
	 */
	
	function blockOp (vm, target, op, cb) {
	  var current = vm._fragmentStart
	  var end = vm._fragmentEnd
	  var next
	  while (next !== end) {
	    next = current.nextSibling
	    op(current, target, vm)
	    current = next
	  }
	  op(end, target, vm, cb)
	}
	
	/**
	 * Check for selectors
	 *
	 * @param {String|Element} el
	 */
	
	function query (el) {
	  return typeof el === 'string'
	    ? document.querySelector(el)
	    : el
	}
	
	/**
	 * Append operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */
	
	function append (el, target, vm, cb) {
	  target.appendChild(el)
	  if (cb) cb()
	}
	
	/**
	 * InsertBefore operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */
	
	function before (el, target, vm, cb) {
	  _.before(el, target)
	  if (cb) cb()
	}
	
	/**
	 * Remove operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */
	
	function remove (el, vm, cb) {
	  _.remove(el)
	  if (cb) cb()
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */
	
	exports.$on = function (event, fn) {
	  (this._events[event] || (this._events[event] = []))
	    .push(fn)
	  modifyListenerCount(this, event, 1)
	  return this
	}
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */
	
	exports.$once = function (event, fn) {
	  var self = this
	  function on () {
	    self.$off(event, on)
	    fn.apply(this, arguments)
	  }
	  on.fn = fn
	  this.$on(event, on)
	  return this
	}
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */
	
	exports.$off = function (event, fn) {
	  var cbs
	  // all
	  if (!arguments.length) {
	    if (this.$parent) {
	      for (event in this._events) {
	        cbs = this._events[event]
	        if (cbs) {
	          modifyListenerCount(this, event, -cbs.length)
	        }
	      }
	    }
	    this._events = {}
	    return this
	  }
	  // specific event
	  cbs = this._events[event]
	  if (!cbs) {
	    return this
	  }
	  if (arguments.length === 1) {
	    modifyListenerCount(this, event, -cbs.length)
	    this._events[event] = null
	    return this
	  }
	  // specific handler
	  var cb
	  var i = cbs.length
	  while (i--) {
	    cb = cbs[i]
	    if (cb === fn || cb.fn === fn) {
	      modifyListenerCount(this, event, -1)
	      cbs.splice(i, 1)
	      break
	    }
	  }
	  return this
	}
	
	/**
	 * Trigger an event on self.
	 *
	 * @param {String} event
	 */
	
	exports.$emit = function (event) {
	  var cbs = this._events[event]
	  this._shouldPropagate = !cbs
	  if (cbs) {
	    cbs = cbs.length > 1
	      ? _.toArray(cbs)
	      : cbs
	    var args = _.toArray(arguments, 1)
	    for (var i = 0, l = cbs.length; i < l; i++) {
	      var res = cbs[i].apply(this, args)
	      if (res === true) {
	        this._shouldPropagate = true
	      }
	      if (process.env.NODE_ENV !== 'production' && res === false) {
	        _.deprecation.PROPAGATION(event)
	      }
	    }
	  }
	  return this
	}
	
	/**
	 * Recursively broadcast an event to all children instances.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */
	
	exports.$broadcast = function (event) {
	  // if no child has registered for this event,
	  // then there's no need to broadcast.
	  if (!this._eventsCount[event]) return
	  var children = this.$children
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    child.$emit.apply(child, arguments)
	    if (child._shouldPropagate) {
	      child.$broadcast.apply(child, arguments)
	    }
	  }
	  return this
	}
	
	/**
	 * Recursively propagate an event up the parent chain.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */
	
	exports.$dispatch = function () {
	  this.$emit.apply(this, arguments)
	  var parent = this.$parent
	  while (parent) {
	    parent.$emit.apply(parent, arguments)
	    parent = parent._shouldPropagate
	      ? parent.$parent
	      : null
	  }
	  return this
	}
	
	/**
	 * Modify the listener counts on all parents.
	 * This bookkeeping allows $broadcast to return early when
	 * no child has listened to a certain event.
	 *
	 * @param {Vue} vm
	 * @param {String} event
	 * @param {Number} count
	 */
	
	var hookRE = /^hook:/
	function modifyListenerCount (vm, event, count) {
	  var parent = vm.$parent
	  // hooks do not get broadcasted so no need
	  // to do bookkeeping for them
	  if (!parent || !count || hookRE.test(event)) return
	  while (parent) {
	    parent._eventsCount[event] =
	      (parent._eventsCount[event] || 0) + count
	    parent = parent.$parent
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	
	/**
	 * Create a child instance that prototypally inherits
	 * data on parent. To achieve that we create an intermediate
	 * constructor with its prototype pointing to parent.
	 *
	 * @param {Object} opts
	 * @param {Function} [BaseCtor]
	 * @return {Vue}
	 * @public
	 */
	
	exports.$addChild = function () {
	  if (process.env.NODE_ENV !== 'production') {
	    _.deprecation.ADD_CHILD()
	  }
	  return this._addChild.apply(this, arguments)
	}
	
	exports._addChild = function (opts, BaseCtor) {
	  BaseCtor = BaseCtor || _.Vue
	  opts = opts || {}
	  var ChildVue
	  var parent = this
	  // transclusion context
	  var context = opts._context || parent
	  var inherit = opts.inherit !== undefined
	    ? opts.inherit
	    : BaseCtor.options.inherit
	  if (inherit) {
	    var ctors = context._childCtors
	    ChildVue = ctors[BaseCtor.cid]
	    if (!ChildVue) {
	      var optionName = BaseCtor.options.name
	      var className = optionName
	        ? _.classify(optionName)
	        : 'VueComponent'
	      ChildVue = new Function(
	        'return function ' + className + ' (options) {' +
	        'this.constructor = ' + className + ';' +
	        'this._init(options) }'
	      )()
	      ChildVue.options = BaseCtor.options
	      ChildVue.linker = BaseCtor.linker
	      ChildVue.prototype = context
	      ctors[BaseCtor.cid] = ChildVue
	    }
	  } else {
	    ChildVue = BaseCtor
	  }
	  opts.parent = parent
	  var child = new ChildVue(opts)
	  return child
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(27)
	var compiler = __webpack_require__(41)
	
	/**
	 * Set instance target element and kick off the compilation
	 * process. The passed in `el` can be a selector string, an
	 * existing Element, or a DocumentFragment (for block
	 * instances).
	 *
	 * @param {Element|DocumentFragment|string} el
	 * @public
	 */
	
	exports.$mount = function (el) {
	  if (this._isCompiled) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      '$mount() should be called only once.'
	    )
	    return
	  }
	  el = _.query(el)
	  if (!el) {
	    el = document.createElement('div')
	  }
	  this._compile(el)
	  this._isCompiled = true
	  this._callHook('compiled')
	  this._initDOMHooks()
	  if (_.inDoc(this.$el)) {
	    this._callHook('attached')
	    ready.call(this)
	  } else {
	    this.$once('hook:attached', ready)
	  }
	  return this
	}
	
	/**
	 * Mark an instance as ready.
	 */
	
	function ready () {
	  this._isAttached = true
	  this._isReady = true
	  this._callHook('ready')
	}
	
	/**
	 * Teardown the instance, simply delegate to the internal
	 * _destroy.
	 */
	
	exports.$destroy = function (remove, deferCleanup) {
	  this._destroy(remove, deferCleanup)
	}
	
	/**
	 * Partially compile a piece of DOM and return a
	 * decompile function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Vue} [host]
	 * @return {Function}
	 */
	
	exports.$compile = function (el, host, scope, frag) {
	  return compiler.compile(el, this.$options, true)(
	    this, el, host, scope, frag
	  )
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(99)['default'];
	
	var _interopRequireDefault = __webpack_require__(100)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _override = __webpack_require__(105);
	
	var _override2 = _interopRequireDefault(_override);
	
	var _routeRecognizer = __webpack_require__(102);
	
	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);
	
	var _route = __webpack_require__(106);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _transition = __webpack_require__(116);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	var _directivesView = __webpack_require__(126);
	
	var _directivesView2 = _interopRequireDefault(_directivesView);
	
	var _directivesLink = __webpack_require__(127);
	
	var _directivesLink2 = _interopRequireDefault(_directivesLink);
	
	var _historyAbstract = __webpack_require__(128);
	
	var _historyAbstract2 = _interopRequireDefault(_historyAbstract);
	
	var _historyHash = __webpack_require__(129);
	
	var _historyHash2 = _interopRequireDefault(_historyHash);
	
	var _historyHtml5 = __webpack_require__(130);
	
	var _historyHtml52 = _interopRequireDefault(_historyHtml5);
	
	var historyBackends = {
	  abstract: _historyAbstract2['default'],
	  hash: _historyHash2['default'],
	  html5: _historyHtml52['default']
	};
	
	// late bind during install
	var Vue = undefined;
	
	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */
	
	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	
	    _classCallCheck(this, Router);
	
	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }
	
	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];
	
	    // route recognizer
	    this._recognizer = new _routeRecognizer2['default']();
	    this._guardRecognizer = new _routeRecognizer2['default']();
	
	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];
	
	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;
	
	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;
	
	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;
	
	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }
	
	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */
	
	  // API ===================================================
	
	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */
	
	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };
	
	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */
	
	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };
	
	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };
	
	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };
	
	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };
	
	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };
	
	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */
	
	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };
	
	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */
	
	  Router.prototype.replace = function replace(path) {
	    this.go({ path: path, replace: true });
	  };
	
	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */
	
	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      _util.warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	    }
	    this.history.start();
	  };
	
	  /**
	   * Stop listening to route changes.
	   */
	
	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };
	
	  // Internal methods ======================================
	
	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */
	
	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };
	
	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */
	
	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };
	
	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */
	
	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };
	
	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */
	
	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };
	
	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */
	
	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;
	
	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = _util.mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };
	
	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */
	
	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };
	
	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;
	
	    if (this._checkGuard(path)) {
	      return;
	    }
	
	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;
	
	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }
	
	    // construct new route and transition context
	    var route = new _route2['default'](path, this);
	    var transition = new _transition2['default'](this, route, currentRoute);
	
	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;
	
	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }
	
	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };
	
	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }
	
	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }
	
	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };
	
	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */
	
	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };
	
	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };
	
	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */
	
	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        return path.path;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };
	
	  return Router;
	})();
	
	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    _util.warn('invalid component for route "' + path + '".');
	  }
	}
	
	/* Installation */
	
	Router.installed = false;
	
	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */
	
	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    _util.warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  _override2['default'](Vue);
	  _directivesView2['default'](Vue);
	  _directivesLink2['default'](Vue);
	  _util2['default'].Vue = Vue;
	  Router.installed = true;
	};
	
	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}
	
	exports['default'] = Router;
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(100)['default'];
	
	exports.__esModule = true;
	exports.warn = warn;
	exports.resolvePath = resolvePath;
	exports.isPromise = isPromise;
	exports.getRouteConfig = getRouteConfig;
	exports.resolveAsyncComponent = resolveAsyncComponent;
	exports.mapParams = mapParams;
	
	var _routeRecognizer = __webpack_require__(102);
	
	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);
	
	var genQuery = _routeRecognizer2['default'].prototype.generateQueryString;
	
	// export default for holding the Vue reference
	var _exports = {};
	exports['default'] = _exports;
	
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */
	
	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!_exports.Vue || _exports.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}
	
	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */
	
	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}
	
	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */
	
	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}
	
	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */
	
	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}
	
	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */
	
	var resolver = undefined;
	
	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: _exports.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}
	
	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */
	
	function mapParams(path, params, query) {
	  if (params === undefined) params = {};
	
	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	    "use strict";
	    function $$route$recognizer$dsl$$Target(path, matcher, delegate) {
	      this.path = path;
	      this.matcher = matcher;
	      this.delegate = delegate;
	    }
	
	    $$route$recognizer$dsl$$Target.prototype = {
	      to: function(target, callback) {
	        var delegate = this.delegate;
	
	        if (delegate && delegate.willAddRoute) {
	          target = delegate.willAddRoute(this.matcher.target, target);
	        }
	
	        this.matcher.add(this.path, target);
	
	        if (callback) {
	          if (callback.length === 0) { throw new Error("You must have an argument in the function passed to `to`"); }
	          this.matcher.addChild(this.path, target, callback, this.delegate);
	        }
	        return this;
	      }
	    };
	
	    function $$route$recognizer$dsl$$Matcher(target) {
	      this.routes = {};
	      this.children = {};
	      this.target = target;
	    }
	
	    $$route$recognizer$dsl$$Matcher.prototype = {
	      add: function(path, handler) {
	        this.routes[path] = handler;
	      },
	
	      addChild: function(path, target, callback, delegate) {
	        var matcher = new $$route$recognizer$dsl$$Matcher(target);
	        this.children[path] = matcher;
	
	        var match = $$route$recognizer$dsl$$generateMatch(path, matcher, delegate);
	
	        if (delegate && delegate.contextEntered) {
	          delegate.contextEntered(target, match);
	        }
	
	        callback(match);
	      }
	    };
	
	    function $$route$recognizer$dsl$$generateMatch(startingPath, matcher, delegate) {
	      return function(path, nestedCallback) {
	        var fullPath = startingPath + path;
	
	        if (nestedCallback) {
	          nestedCallback($$route$recognizer$dsl$$generateMatch(fullPath, matcher, delegate));
	        } else {
	          return new $$route$recognizer$dsl$$Target(startingPath + path, matcher, delegate);
	        }
	      };
	    }
	
	    function $$route$recognizer$dsl$$addRoute(routeArray, path, handler) {
	      var len = 0;
	      for (var i=0, l=routeArray.length; i<l; i++) {
	        len += routeArray[i].path.length;
	      }
	
	      path = path.substr(len);
	      var route = { path: path, handler: handler };
	      routeArray.push(route);
	    }
	
	    function $$route$recognizer$dsl$$eachRoute(baseRoute, matcher, callback, binding) {
	      var routes = matcher.routes;
	
	      for (var path in routes) {
	        if (routes.hasOwnProperty(path)) {
	          var routeArray = baseRoute.slice();
	          $$route$recognizer$dsl$$addRoute(routeArray, path, routes[path]);
	
	          if (matcher.children[path]) {
	            $$route$recognizer$dsl$$eachRoute(routeArray, matcher.children[path], callback, binding);
	          } else {
	            callback.call(binding, routeArray);
	          }
	        }
	      }
	    }
	
	    var $$route$recognizer$dsl$$default = function(callback, addRouteCallback) {
	      var matcher = new $$route$recognizer$dsl$$Matcher();
	
	      callback($$route$recognizer$dsl$$generateMatch("", matcher, this.delegate));
	
	      $$route$recognizer$dsl$$eachRoute([], matcher, function(route) {
	        if (addRouteCallback) { addRouteCallback(this, route); }
	        else { this.add(route); }
	      }, this);
	    };
	
	    var $$route$recognizer$$specials = [
	      '/', '.', '*', '+', '?', '|',
	      '(', ')', '[', ']', '{', '}', '\\'
	    ];
	
	    var $$route$recognizer$$escapeRegex = new RegExp('(\\' + $$route$recognizer$$specials.join('|\\') + ')', 'g');
	
	    function $$route$recognizer$$isArray(test) {
	      return Object.prototype.toString.call(test) === "[object Array]";
	    }
	
	    // A Segment represents a segment in the original route description.
	    // Each Segment type provides an `eachChar` and `regex` method.
	    //
	    // The `eachChar` method invokes the callback with one or more character
	    // specifications. A character specification consumes one or more input
	    // characters.
	    //
	    // The `regex` method returns a regex fragment for the segment. If the
	    // segment is a dynamic of star segment, the regex fragment also includes
	    // a capture.
	    //
	    // A character specification contains:
	    //
	    // * `validChars`: a String with a list of all valid characters, or
	    // * `invalidChars`: a String with a list of all invalid characters
	    // * `repeat`: true if the character specification can repeat
	
	    function $$route$recognizer$$StaticSegment(string) { this.string = string; }
	    $$route$recognizer$$StaticSegment.prototype = {
	      eachChar: function(callback) {
	        var string = this.string, ch;
	
	        for (var i=0, l=string.length; i<l; i++) {
	          ch = string.charAt(i);
	          callback({ validChars: ch });
	        }
	      },
	
	      regex: function() {
	        return this.string.replace($$route$recognizer$$escapeRegex, '\\$1');
	      },
	
	      generate: function() {
	        return this.string;
	      }
	    };
	
	    function $$route$recognizer$$DynamicSegment(name) { this.name = name; }
	    $$route$recognizer$$DynamicSegment.prototype = {
	      eachChar: function(callback) {
	        callback({ invalidChars: "/", repeat: true });
	      },
	
	      regex: function() {
	        return "([^/]+)";
	      },
	
	      generate: function(params) {
	        return params[this.name];
	      }
	    };
	
	    function $$route$recognizer$$StarSegment(name) { this.name = name; }
	    $$route$recognizer$$StarSegment.prototype = {
	      eachChar: function(callback) {
	        callback({ invalidChars: "", repeat: true });
	      },
	
	      regex: function() {
	        return "(.+)";
	      },
	
	      generate: function(params) {
	        return params[this.name];
	      }
	    };
	
	    function $$route$recognizer$$EpsilonSegment() {}
	    $$route$recognizer$$EpsilonSegment.prototype = {
	      eachChar: function() {},
	      regex: function() { return ""; },
	      generate: function() { return ""; }
	    };
	
	    function $$route$recognizer$$parse(route, names, specificity) {
	      // normalize route as not starting with a "/". Recognition will
	      // also normalize.
	      if (route.charAt(0) === "/") { route = route.substr(1); }
	
	      var segments = route.split("/"), results = [];
	
	      // A routes has specificity determined by the order that its different segments
	      // appear in. This system mirrors how the magnitude of numbers written as strings
	      // works.
	      // Consider a number written as: "abc". An example would be "200". Any other number written
	      // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	      // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	      // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	      // leading symbol, "1".
	      // The rule is that symbols to the left carry more weight than symbols to the right
	      // when a number is written out as a string. In the above strings, the leading digit
	      // represents how many 100's are in the number, and it carries more weight than the middle
	      // number which represents how many 10's are in the number.
	      // This system of number magnitude works well for route specificity, too. A route written as
	      // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	      // `x`, irrespective of the other parts.
	      // Because of this similarity, we assign each type of segment a number value written as a
	      // string. We can find the specificity of compound routes by concatenating these strings
	      // together, from left to right. After we have looped through all of the segments,
	      // we convert the string to a number.
	      specificity.val = '';
	
	      for (var i=0, l=segments.length; i<l; i++) {
	        var segment = segments[i], match;
	
	        if (match = segment.match(/^:([^\/]+)$/)) {
	          results.push(new $$route$recognizer$$DynamicSegment(match[1]));
	          names.push(match[1]);
	          specificity.val += '3';
	        } else if (match = segment.match(/^\*([^\/]+)$/)) {
	          results.push(new $$route$recognizer$$StarSegment(match[1]));
	          specificity.val += '2';
	          names.push(match[1]);
	        } else if(segment === "") {
	          results.push(new $$route$recognizer$$EpsilonSegment());
	          specificity.val += '1';
	        } else {
	          results.push(new $$route$recognizer$$StaticSegment(segment));
	          specificity.val += '4';
	        }
	      }
	
	      specificity.val = +specificity.val;
	
	      return results;
	    }
	
	    // A State has a character specification and (`charSpec`) and a list of possible
	    // subsequent states (`nextStates`).
	    //
	    // If a State is an accepting state, it will also have several additional
	    // properties:
	    //
	    // * `regex`: A regular expression that is used to extract parameters from paths
	    //   that reached this accepting state.
	    // * `handlers`: Information on how to convert the list of captures into calls
	    //   to registered handlers with the specified parameters
	    // * `types`: How many static, dynamic or star segments in this route. Used to
	    //   decide which route to use if multiple registered routes match a path.
	    //
	    // Currently, State is implemented naively by looping over `nextStates` and
	    // comparing a character specification against a character. A more efficient
	    // implementation would use a hash of keys pointing at one or more next states.
	
	    function $$route$recognizer$$State(charSpec) {
	      this.charSpec = charSpec;
	      this.nextStates = [];
	    }
	
	    $$route$recognizer$$State.prototype = {
	      get: function(charSpec) {
	        var nextStates = this.nextStates;
	
	        for (var i=0, l=nextStates.length; i<l; i++) {
	          var child = nextStates[i];
	
	          var isEqual = child.charSpec.validChars === charSpec.validChars;
	          isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	          if (isEqual) { return child; }
	        }
	      },
	
	      put: function(charSpec) {
	        var state;
	
	        // If the character specification already exists in a child of the current
	        // state, just return that state.
	        if (state = this.get(charSpec)) { return state; }
	
	        // Make a new state for the character spec
	        state = new $$route$recognizer$$State(charSpec);
	
	        // Insert the new state as a child of the current state
	        this.nextStates.push(state);
	
	        // If this character specification repeats, insert the new state as a child
	        // of itself. Note that this will not trigger an infinite loop because each
	        // transition during recognition consumes a character.
	        if (charSpec.repeat) {
	          state.nextStates.push(state);
	        }
	
	        // Return the new state
	        return state;
	      },
	
	      // Find a list of child states matching the next character
	      match: function(ch) {
	        // DEBUG "Processing `" + ch + "`:"
	        var nextStates = this.nextStates,
	            child, charSpec, chars;
	
	        // DEBUG "  " + debugState(this)
	        var returned = [];
	
	        for (var i=0, l=nextStates.length; i<l; i++) {
	          child = nextStates[i];
	
	          charSpec = child.charSpec;
	
	          if (typeof (chars = charSpec.validChars) !== 'undefined') {
	            if (chars.indexOf(ch) !== -1) { returned.push(child); }
	          } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	            if (chars.indexOf(ch) === -1) { returned.push(child); }
	          }
	        }
	
	        return returned;
	      }
	
	      /** IF DEBUG
	      , debug: function() {
	        var charSpec = this.charSpec,
	            debug = "[",
	            chars = charSpec.validChars || charSpec.invalidChars;
	
	        if (charSpec.invalidChars) { debug += "^"; }
	        debug += chars;
	        debug += "]";
	
	        if (charSpec.repeat) { debug += "+"; }
	
	        return debug;
	      }
	      END IF **/
	    };
	
	    /** IF DEBUG
	    function debug(log) {
	      console.log(log);
	    }
	
	    function debugState(state) {
	      return state.nextStates.map(function(n) {
	        if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	        return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	      }).join(", ")
	    }
	    END IF **/
	
	    // Sort the routes by specificity
	    function $$route$recognizer$$sortSolutions(states) {
	      return states.sort(function(a, b) {
	        return b.specificity.val - a.specificity.val;
	      });
	    }
	
	    function $$route$recognizer$$recognizeChar(states, ch) {
	      var nextStates = [];
	
	      for (var i=0, l=states.length; i<l; i++) {
	        var state = states[i];
	
	        nextStates = nextStates.concat(state.match(ch));
	      }
	
	      return nextStates;
	    }
	
	    var $$route$recognizer$$oCreate = Object.create || function(proto) {
	      function F() {}
	      F.prototype = proto;
	      return new F();
	    };
	
	    function $$route$recognizer$$RecognizeResults(queryParams) {
	      this.queryParams = queryParams || {};
	    }
	    $$route$recognizer$$RecognizeResults.prototype = $$route$recognizer$$oCreate({
	      splice: Array.prototype.splice,
	      slice:  Array.prototype.slice,
	      push:   Array.prototype.push,
	      length: 0,
	      queryParams: null
	    });
	
	    function $$route$recognizer$$findHandler(state, path, queryParams) {
	      var handlers = state.handlers, regex = state.regex;
	      var captures = path.match(regex), currentCapture = 1;
	      var result = new $$route$recognizer$$RecognizeResults(queryParams);
	
	      for (var i=0, l=handlers.length; i<l; i++) {
	        var handler = handlers[i], names = handler.names, params = {};
	
	        for (var j=0, m=names.length; j<m; j++) {
	          params[names[j]] = captures[currentCapture++];
	        }
	
	        result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	      }
	
	      return result;
	    }
	
	    function $$route$recognizer$$addSegment(currentState, segment) {
	      segment.eachChar(function(ch) {
	        var state;
	
	        currentState = currentState.put(ch);
	      });
	
	      return currentState;
	    }
	
	    function $$route$recognizer$$decodeQueryParamPart(part) {
	      // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	      part = part.replace(/\+/gm, '%20');
	      return decodeURIComponent(part);
	    }
	
	    // The main interface
	
	    var $$route$recognizer$$RouteRecognizer = function() {
	      this.rootState = new $$route$recognizer$$State();
	      this.names = {};
	    };
	
	
	    $$route$recognizer$$RouteRecognizer.prototype = {
	      add: function(routes, options) {
	        var currentState = this.rootState, regex = "^",
	            specificity = {},
	            handlers = [], allSegments = [], name;
	
	        var isEmpty = true;
	
	        for (var i=0, l=routes.length; i<l; i++) {
	          var route = routes[i], names = [];
	
	          var segments = $$route$recognizer$$parse(route.path, names, specificity);
	
	          allSegments = allSegments.concat(segments);
	
	          for (var j=0, m=segments.length; j<m; j++) {
	            var segment = segments[j];
	
	            if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
	
	            isEmpty = false;
	
	            // Add a "/" for the new segment
	            currentState = currentState.put({ validChars: "/" });
	            regex += "/";
	
	            // Add a representation of the segment to the NFA and regex
	            currentState = $$route$recognizer$$addSegment(currentState, segment);
	            regex += segment.regex();
	          }
	
	          var handler = { handler: route.handler, names: names };
	          handlers.push(handler);
	        }
	
	        if (isEmpty) {
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";
	        }
	
	        currentState.handlers = handlers;
	        currentState.regex = new RegExp(regex + "$");
	        currentState.specificity = specificity;
	
	        if (name = options && options.as) {
	          this.names[name] = {
	            segments: allSegments,
	            handlers: handlers
	          };
	        }
	      },
	
	      handlersFor: function(name) {
	        var route = this.names[name], result = [];
	        if (!route) { throw new Error("There is no route named " + name); }
	
	        for (var i=0, l=route.handlers.length; i<l; i++) {
	          result.push(route.handlers[i]);
	        }
	
	        return result;
	      },
	
	      hasRoute: function(name) {
	        return !!this.names[name];
	      },
	
	      generate: function(name, params) {
	        var route = this.names[name], output = "";
	        if (!route) { throw new Error("There is no route named " + name); }
	
	        var segments = route.segments;
	
	        for (var i=0, l=segments.length; i<l; i++) {
	          var segment = segments[i];
	
	          if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
	
	          output += "/";
	          output += segment.generate(params);
	        }
	
	        if (output.charAt(0) !== '/') { output = '/' + output; }
	
	        if (params && params.queryParams) {
	          output += this.generateQueryString(params.queryParams, route.handlers);
	        }
	
	        return output;
	      },
	
	      generateQueryString: function(params, handlers) {
	        var pairs = [];
	        var keys = [];
	        for(var key in params) {
	          if (params.hasOwnProperty(key)) {
	            keys.push(key);
	          }
	        }
	        keys.sort();
	        for (var i = 0, len = keys.length; i < len; i++) {
	          key = keys[i];
	          var value = params[key];
	          if (value == null) {
	            continue;
	          }
	          var pair = encodeURIComponent(key);
	          if ($$route$recognizer$$isArray(value)) {
	            for (var j = 0, l = value.length; j < l; j++) {
	              var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	              pairs.push(arrayPair);
	            }
	          } else {
	            pair += "=" + encodeURIComponent(value);
	            pairs.push(pair);
	          }
	        }
	
	        if (pairs.length === 0) { return ''; }
	
	        return "?" + pairs.join("&");
	      },
	
	      parseQueryString: function(queryString) {
	        var pairs = queryString.split("&"), queryParams = {};
	        for(var i=0; i < pairs.length; i++) {
	          var pair      = pairs[i].split('='),
	              key       = $$route$recognizer$$decodeQueryParamPart(pair[0]),
	              keyLength = key.length,
	              isArray = false,
	              value;
	          if (pair.length === 1) {
	            value = 'true';
	          } else {
	            //Handle arrays
	            if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
	              isArray = true;
	              key = key.slice(0, keyLength - 2);
	              if(!queryParams[key]) {
	                queryParams[key] = [];
	              }
	            }
	            value = pair[1] ? $$route$recognizer$$decodeQueryParamPart(pair[1]) : '';
	          }
	          if (isArray) {
	            queryParams[key].push(value);
	          } else {
	            queryParams[key] = value;
	          }
	        }
	        return queryParams;
	      },
	
	      recognize: function(path) {
	        var states = [ this.rootState ],
	            pathLen, i, l, queryStart, queryParams = {},
	            isSlashDropped = false;
	
	        queryStart = path.indexOf('?');
	        if (queryStart !== -1) {
	          var queryString = path.substr(queryStart + 1, path.length);
	          path = path.substr(0, queryStart);
	          queryParams = this.parseQueryString(queryString);
	        }
	
	        path = decodeURI(path);
	
	        // DEBUG GROUP path
	
	        if (path.charAt(0) !== "/") { path = "/" + path; }
	
	        pathLen = path.length;
	        if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	          path = path.substr(0, pathLen - 1);
	          isSlashDropped = true;
	        }
	
	        for (i=0, l=path.length; i<l; i++) {
	          states = $$route$recognizer$$recognizeChar(states, path.charAt(i));
	          if (!states.length) { break; }
	        }
	
	        // END DEBUG GROUP
	
	        var solutions = [];
	        for (i=0, l=states.length; i<l; i++) {
	          if (states[i].handlers) { solutions.push(states[i]); }
	        }
	
	        states = $$route$recognizer$$sortSolutions(solutions);
	
	        var state = solutions[0];
	
	        if (state && state.handlers) {
	          // if a trailing slash was dropped and a star segment is the last segment
	          // specified, put the trailing slash back
	          if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	            path = path + "/";
	          }
	          return $$route$recognizer$$findHandler(state, path, queryParams);
	        }
	      }
	    };
	
	    $$route$recognizer$$RouteRecognizer.prototype.map = $$route$recognizer$dsl$$default;
	
	    $$route$recognizer$$RouteRecognizer.VERSION = '0.1.9';
	
	    var $$route$recognizer$$default = $$route$recognizer$$RouteRecognizer;
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(104)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = $$route$recognizer$$default;
	    } else if (typeof this !== 'undefined') {
	      this['RouteRecognizer'] = $$route$recognizer$$default;
	    }
	}).call(this);
	
	//# sourceMappingURL=route-recognizer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)(module)))

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (Vue) {
	
	  var _ = Vue.util;
	
	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };
	
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };
	
	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	};
	
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _classCallCheck = __webpack_require__(99)["default"];
	
	var _Object$freeze = __webpack_require__(107)["default"];
	
	exports.__esModule = true;
	var internalKeysRE = /^(component|subRoutes)$/;
	
	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */
	
	var Route = function Route(path, router) {
	  var _this = this;
	
	  _classCallCheck(this, Route);
	
	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  _Object$freeze(this);
	};
	
	exports["default"] = Route;
	module.exports = exports["default"];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	module.exports = __webpack_require__(114).Object.freeze;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(110);
	
	__webpack_require__(111)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 110 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(112)
	    , fn   = (__webpack_require__(114).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(115)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(113)
	  , core      = __webpack_require__(114)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 113 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 114 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(99)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var _pipeline = __webpack_require__(117);
	
	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */
	
	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    _classCallCheck(this, RouteTransition);
	
	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;
	
	    // start by determine the queues
	
	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;
	
	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }
	
	  /**
	   * Abort current transition and return to previous location.
	   */
	
	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };
	
	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */
	
	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = _util.mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = this.to.params;
	        path.query = this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };
	
	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;
	
	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!_pipeline.canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }
	
	    // 2. Validation phase
	    transition.runQueue(daq, _pipeline.canDeactivate, function () {
	      transition.runQueue(aq, _pipeline.canActivate, function () {
	        transition.runQueue(daq, _pipeline.deactivate, function () {
	          // 3. Activation phase
	
	          // Update router current route
	          transition.router._onTransitionValidated(transition);
	
	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            _pipeline.reuse(view, transition);
	          });
	
	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            _pipeline.activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };
	
	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };
	
	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */
	
	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;
	
	    var transition = this;
	    var nextCalled = false;
	
	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };
	
	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        _util.warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };
	
	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        _util.warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };
	
	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };
	
	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }
	
	    // handle boolean/promise return values
	    var resIsPromise = _util.isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };
	
	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */
	
	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;
	
	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };
	
	  return RouteTransition;
	})();
	
	exports['default'] = RouteTransition;
	
	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(118)['default'];
	
	var _Object$create = __webpack_require__(123)['default'];
	
	exports.__esModule = true;
	exports.canReuse = canReuse;
	exports.canDeactivate = canDeactivate;
	exports.canActivate = canActivate;
	exports.deactivate = deactivate;
	exports.activate = activate;
	exports.reuse = reuse;
	
	var _util = __webpack_require__(101);
	
	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */
	
	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = _util.getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}
	
	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = _util.getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}
	
	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canActivate(handler, transition, next) {
	  _util.resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = _util.getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}
	
	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = _util.getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}
	
	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */
	
	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }
	
	  var Component = view.Component = handler.component;
	  var activateHook = _util.getRouteConfig(Component, 'activate');
	  var dataHook = _util.getRouteConfig(Component, 'data');
	  var waitForData = _util.getRouteConfig(Component, 'waitForData');
	
	  view.depth = depth;
	  view.activated = false;
	
	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);
	
	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }
	
	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }
	
	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };
	
	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };
	
	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };
	
	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}
	
	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */
	
	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = _util.getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}
	
	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */
	
	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          _Object$keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, _Object$create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      _Object$keys(data).forEach(function (key) {
	        var val = data[key];
	        if (_util.isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120);
	module.exports = __webpack_require__(114).Object.keys;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(121);
	
	__webpack_require__(111)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(122);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(125);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var _pipeline = __webpack_require__(117);
	
	exports['default'] = function (Vue) {
	
	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);
	
	  // with some overrides
	  _.extend(viewDef, {
	
	    _isRouterView: true,
	
	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        _util.warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);
	
	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);
	
	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }
	
	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        _pipeline.activate(this, transition, depth);
	      }
	    },
	
	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });
	
	  Vue.elementDirective('router-view', viewDef);
	};
	
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	// install v-link, which provides navigation support for
	// HTML5 history mode
	
	exports['default'] = function (Vue) {
	
	  var _ = Vue.util;
	
	  Vue.directive('link', {
	
	    bind: function bind() {
	      var _this = this;
	
	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        _util.warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;
	
	        var target = _this.target;
	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el || el.tagName !== 'A' || !el.href) return;
	          if (sameOrigin(el)) {
	            e.preventDefault();
	            router.go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },
	
	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },
	
	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var dest = this.path;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });
	
	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	};
	
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(99)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	
	    _classCallCheck(this, AbstractHistory);
	
	    this.onChange = onChange;
	    this.currentPath = '/';
	  }
	
	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };
	
	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };
	
	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };
	
	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : _util.resolvePath(this.currentPath, path, append);
	  };
	
	  return AbstractHistory;
	})();
	
	exports['default'] = AbstractHistory;
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(99)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	
	    _classCallCheck(this, HashHistory);
	
	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }
	
	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      var pathToMatch = decodeURI(path.replace(/^#!?/, '') + location.search);
	      self.onChange(pathToMatch);
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };
	
	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };
	
	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };
	
	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + _util.resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };
	
	  return HashHistory;
	})();
	
	exports['default'] = HashHistory;
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(99)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(101);
	
	var hashRE = /#.*$/;
	
	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	
	    _classCallCheck(this, HTML5History);
	
	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }
	
	  HTML5History.prototype.start = function start() {
	    var _this = this;
	
	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };
	
	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };
	
	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };
	
	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : _util.resolvePath(this.base || location.pathname, path, append);
	  };
	
	  return HTML5History;
	})();
	
	exports['default'] = HTML5History;
	module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(132)
	module.exports = __webpack_require__(134)
	module.exports.template = __webpack_require__(155)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue","-!vue-html!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue"], function () {
	var newOptions = require("-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue")
	var newTemplate = require("-!vue-html!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 132 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 133 */,
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    data: function() {
	      return {
	        vvv             : '参数',        //用于 传参
	        header          : '首页',
	        showModal       : false,         //用于 modal
	        authenticating  : false,         //用于 forbidden
	        showAside       : false,         //用于 aside
	        right           : 'right',       //用于 aside
	        left            : 'left',        //用于 aside
	        top             : 'top',         //用于 aside
	        bottom          : 'bottom',      //用于 aside
	        showRightAside  : false,         //用于 asideaside 方向
	        showLeftAside   : false,         //用于 asideaside 方向
	        showTopAside    : false,         //用于 asideaside 方向
	        showBottomAside : false,         //用于 asideaside 方向
	        asideLeftTit    : 'left-title',  //用于 aside
	        asideRightTit   : 'right-title', //用于 aside
	        asideTopTit     : 'right-title', //用于 aside
	        asideBottomTit  : 'right-title', //用于 aside
	        title           : 'title',       //用于 aside
	        asidewidth      : 350,           //用于 aside
	        toast           : {content:'正在加载。。。'},         //用于 toast
	        modalbody       : "可以通过在组件中调用 this.$parent.modalbody='' 来修改这里的内容",
	        myViewsData     : null, //列表页
	        myViewDetail    : null, //详情页
	        modalView       : null, //弹窗页
	        splittingView   : null, //按需加载
	        routeList       : []    //访问周期中所访问了那些路径,在route.js中设置
	      };
	    },
	    components:{
	      modal:__webpack_require__(135),
	      asidebar:__webpack_require__(140),
	      toast:__webpack_require__(145)
	    },
	    created:function(){
	
	    },
	    //组件事件通信
	    //子组件可以通过 this.$dispatch('confirmCallback',this); 来触发父组件events中声明的事件
	    events:{
	      confirmCallback:function(child){
	        //设置元素的值
	        //child.$els.inp.$set('value','1');
	        console.log(child);
	        //获取dom元素  child.$els.inp
	        console.log(child.$els.inp.value);
	        console.log('confirmCallback');
	        console.log('1秒钟后跳转到 my-views');
	        setTimeout(function(){
	           this.$root.$route.router.go('/my_views');
	           child.show = false;
	        }.bind(this),1000);
	
	        //debugger;
	      },
	      cancelCallback:function(child){
	        console.log('modal-cancelCallback');
	      }
	    },
	    methods:{
	      nonBreaking:function(){
	        console.log('nonBreaking');
	      },
	      showToast:function(){
	        //直接设置，默认2.5秒后自动消失
	        this.toast.content = 'toast  2.5s...';
	        //如果同时设置多个，则只会显示最后一个
	        // this.toast.content = 'toast  2.6s...';
	        // this.toast.content = 'toast  2.7s...';
	        // this.toast.content = 'toast  2.8s...';
	      },
	      //自定义时长
	      customShowToast:function(){
	        this.toast = { content : '自定义时长4s...', timer : 4000};
	      },
	      //按需加载
	      splitting:function(){
	        //加载完毕后添加到map中
	        var _this = this;
	        __webpack_require__.e/* nsure */(1, function(require) {
	          var splitting = __webpack_require__(150);
	          _this.$route.router.map({
	            '/splitting_view':{
	              name:'splitting',
	              component: splitting
	            }
	          });
	
	          //加载完毕后再跳转
	          _this.$route.router.go({name:'splitting'});
	
	        });
	
	        //如果使用bundle-loader  会报错
	        // var load = require("bundle!./views/splitting.vue");
	        // load(function(file){
	        //   _this.$route.router.map({
	        //     '/splitting_view':{
	        //     name:'splitting',
	        //     component: splitting
	        //     }
	        //   });
	        //   //加载完毕后再跳转
	        //   _this.$route.router.go({name:'splitting'});
	        // });
	
	      }
	    },
	    ready:function(){
	      //this.$set('as',new AwesomeSheet({ touchDismiss: false }));
	    }
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(136)
	module.exports = __webpack_require__(138)
	module.exports.template = __webpack_require__(139)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./modal.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./modal.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 136 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 137 */,
/* 138 */
/***/ function(module, exports) {

	module.exports = {
			props: {
				show:{
					require:true,
					type:Boolean
				},
				// cancelCallback1: {
				// 	type: Function,
				// 	default: function(){}
				// },
				// confirmCallback1: {
				// 	type: Function,
				// 	default: function(){}
				// }
			},
			methods:{
				cancelCallback:function(){
					this.show = false;
					this.$dispatch('cancelCallback',this);
				},
				confirmCallback: function(){
					//this.show = false;
					this.$dispatch('confirmCallback',this);
				},
				keyupcallback:function(){
					console.log('duang~');
				},
				modelclick:function(e){
					console.log(e.target);
					console.log(this.$els.overlay);
					//因为想实现只点击背景层隐藏modal
					//处理由于冒泡，点击了里面的内容，也导致overlayer隐藏的问题
					if( e.target === this.$els.overlay ){
						//点击遮罩层，隐藏modal
						this.show = false;
					}
					console.log('modelclick');
				},
				modalkeyup:function(e){
					this.$root.modalbody = e.target.value;
				}
			}
		}

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-mask\" v-if=\"show\" transition=\"modal\" transition-mode=\"out-in\">\n\t\t\t<div class=\"modal-wrapper\" v-el:overlay @click.stop=\"modelclick\" >\n\t\t\t\t<div class=\"modal-container\">\n\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t<span class=\"modal-close\" @click=\"show=false\"></span>\n\t\t\t\t\t\t<slot name=\"header\">\n\t\t\t\t\t\tdefault header\n\t\t\t\t\t\t</slot>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t<slot name=\"body\">\n\t\t\t\t\t\tdefault body\n\t\t\t\t\t\t</slot>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t<slot name=\"footer\">\n\t\t\t\t\t\t\t试试在input里面输入一些文字\n\t\t\t\t\t\t\t<input type=\"text\" v-el:inp @keyup=\"modalkeyup\">\n\t\t\t\t\t\t\t<button class=\"modal-default-button\" @click=\"confirmCallback\">\n\t\t\t\t\t\t\t\tOK\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button class=\"modal-default-button\" v-on:click=\"cancelCallback\">\n\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</slot>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>";

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(141)
	module.exports = __webpack_require__(143)
	module.exports.template = __webpack_require__(144)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./aside.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./aside.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./aside.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./aside.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./aside.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 141 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 142 */,
/* 143 */
/***/ function(module, exports) {

	module.exports = {
			props: {
	      show: {
	        type: Boolean,
	        require: true
	      },
	      placement: {
	        type: String
	      },
	      header: {
	        type: String,
	        default:''
	      },
	      width: {
	        type: Number
	      }
	    },
	    filters:{
	      // clearwran:{
	      //   read:function(val){
	      //     return val*1;
	      //   },
	      //   write:function(val,oldVal){
	      //     return val*1;
	      //   }
	      // }
	    },
	    computed:{
	      slideTransition:function(){
	        console.log('slide' + this.placement);
	        return 'slide' + this.placement;
	      }
	    },
			methods:{
				close:function(item,index){
					this.show = false
				}
			},
			ready:function(){
	      //测试，如果在父元素绑定一个el，在这里在绑定事件
	
	      //document.body.addEventListener('click',this.hideWrap,false);
			},
	    destroyed:function(){
	      // document.body.removeEventListener('click',this.hideWrap,false);
	      // console.log('组件销毁');
	    }
		}

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "<div class=\"aside_components_mask\" v-if=\"show\" transition=\"modal\" @click.stop=\"show=false\"></div>\n  <div class=\"aside\"\n    :style=\"{width : width ? width+'px' : ''}\"\n    :class=\"placement\"\n    v-if=\"show\"\n    :transition=\"slideTransition\"> <!--这里 相当于 v-bind:transition=\"slideTransition\"  -->\n    <div class=\"aside-dialog\">\n      <div class=\"aside-content\">\n        <div class=\"aside-header\">\n          <button type=\"button\" class=\"close\" @click='close'><span>&times;</span></button> <- 在aside中定义的close事件\n          <h4 class=\"aside-title\">{{header}}</h4>\n    <dl>\n      <dt>props参数：</dt>\n      <dt>width:{{width}} </dt>\n      <dt>placement:{{placement}}</dt>\n      <dt>header:{{header}}</dt>\n    </dl>\n    <pre>\n        </div>\n        <div class=\"aside-body\">\n          <slot name=\"body\">\n            default body\n          </slot>\n        </div>\n      </div>\n    </div>\n  </div>";

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(146)
	module.exports = __webpack_require__(148)
	module.exports.template = __webpack_require__(149)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./toast.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./toast.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./toast.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./toast.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./toast.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 146 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 147 */,
/* 148 */
/***/ function(module, exports) {

	module.exports = {
			data:function(){
				return {
					show : false
				}
			},
			props: ['toast'],
			watch:{
				//当给toast设置内容的时候就显示，如果没有定义时间，那么2.5秒后渐隐
				'toast.content':function(val,oldVal){
	
					if(val == ''){
						return;
					}
	
					var _this = this;
					_this.show = true;
					setTimeout(function(){
						_this.show = false;
	
						setTimeout(function(){
							_this.toast.content = '';
							delete _this.toast.timer ;
						},310);//这里的300是动画的延迟，故意多设置10毫秒
	
					},_this.toast.timer || 2500);
				}
			},
			created:function(){
				console.log('created');
			},
			beforeCompile:function(){
				console.log('beforeCompile');
			},
			compiled:function(){
				console.log('compiled');
			},
			ready:function(){
				console.log('ready');
			},
			attached:function(){
				console.log('attached');
			},
			detached:function(){
				console.log('detached');
			},
			beforeDestroy:function(){
				console.log('beforeDestroy');
			},
			destroyed:function(){
				console.log('destroyed');
			}
		}

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<div class=\"mask_transparent\" v-if=\"show\"></div>\n\t<div class=\"toast\" transition=\"toast\" v-if=\"show\">\n\t\t<slot name=\"content\"></slot>\n\t</div>\n</div>";

/***/ },
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */
/***/ function(module, exports) {

	module.exports = "<div class=\"app\">\n\n    <p v-if=\"authenticating\" style=\"color:red\">Authenticating...</p>\n    <h1 v-text=\"header\">App Header</h1>\n    <p>当前路径: {{$route.path}}</p>\n    <nav>\n    <a v-link=\"{ name: 'home', exact: true }\">首页</a>\n    <a v-link=\"{ name: 'my_views', exact: true }\">组件生命周期</a>\n    <a v-link=\"{ name: 'my_views_detail', params: { viewId:vvv } }\">url传值</a>\n\n    <a v-link=\"{ name: 'about' }\">about</a>\n    <!-- 如果是一个不存在的页面，那么用name 属性 -->\n    <a v-link=\"{ name: 'forbidden' }\">在路由全局设置终止</a>\n    <a v-link=\"{ path: '/nofound' }\">404</a> <!--这里不能使用 具名路径-->\n    <a v-link=\"{ name: 'modal_view' }\">modal弹窗-页面</a>\n    <a v-link=\"{ name: 'select_view' }\">select</a>\n    <a v-link=\"{ name: 'radio_view' }\">radio</a>\n    <a v-link=\"{ name: 'tab_view' }\">tab选项卡</a>\n    <a v-link=\"{ name: 'slider_view' }\">slider with swiper</a>\n    <button @click=\"showModal = !showModal\">Show Modal 全局</button>\n    <button @click=\"showLeftAside = true\">Aside left</button>\n    <button @click=\"showRightAside = true\">Aside right</button>\n    <button @click=\"showTopAside = true\">Aside top</button>\n    <button @click=\"showBottomAside = true\">Aside bottom</button>\n    <button @click=\"showToast\">Toast 默认 2.5s</button>\n    <button @click=\"customShowToast\">Toast自定义时长 4s</button>\n    <button @click=\"splitting\">试试按需加载</button>\n    </nav>\n    <router-view class=\"view\" keep-alive transition=\"fade\" transition-mode=\"out-in\"></router-view>\n\n    <modal :show.sync=\"showModal\" v-ref:index-modal > <!--此种写法详情 https://github.com/yyx990803/vue/issues/1325 搜 Shorthands -->\n      <!--\n\n        你可以添加自定义的内容\n        比如：可以通过\n\n          <h3 slot=\"body\">自定义内容</h3>\n\n        然后在组件模板（modal.vue）中\n        ···                                          ···\n        <div class=\"modal-body\">                     <div class=\"modal-body\">\n          <slot name=\"body\">\n            default body           最终会生成 =>        <h3 slot=\"body\">自定义内容</h3>\n          </slot>\n        </div>                                       </div>\n        ···                                          ···\n\n        如果不定义 <h3 slot=\"body\">自定义内容</h3> ，那么就是\n        ···\n        <div class=\"modal-body\">\n            default body\n        </div>\n        ···\n\n      -->\n\n      <h3 slot=\"body\"><span v-text=\"modalbody\"></span></h3>\n      <h3 slot=\"header\">内容</h3>\n    </modal>\n\n    <!--右-->\n    <asidebar v-ref:asideR  :show.sync=\"showRightAside\"  :placement.sync=\"right\"  :header.sync=\"asideLeftTit\"  :width.sync=\"asidewidth\">\n      <div slot=\"body\">\n      <!--自定义内容-->\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium repudiandae accusantium nostrum doloribus voluptas accusamus consectetur quod inventore provident magni id sit, dolor harum totam. Odio ducimus error architecto.\n        <div class=\"aside-footer\">\n          <button type=\"button\" class=\"btn btn-default\" @click=\"showRightAside=false\">在组件声明的时候定义的close事件</button>\n        </div>\n      </div>\n    </asidebar>\n    <!--左-->\n    <asidebar v-ref:asideL  :show.sync=\"showLeftAside\"  :placement.sync=\"left\"  :header.sync=\"asideRightTit\"  :width.sync=\"asidewidth\">\n      <div slot=\"body\">\n        <!--自定义内容-->\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium repudiandae accusantium nostrum doloribus voluptas accusamus consectetur quod inventore provident magni id sit, dolor harum totam. Odio ducimus error architecto.\n        <div class=\"aside-footer\">\n          <button type=\"button\" class=\"btn btn-default\" @click=\"showLeftAside=false\">在组件声明的时候定义的close事件</button>\n        </div>\n      </div>\n    </asidebar>\n    <!--上-->\n    <asidebar v-ref:asideL  :show.sync=\"showTopAside\"  :placement.sync=\"top\"  :header.sync=\"asideTopTit\" >\n      <div slot=\"body\">\n        <!--自定义内容-->\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium repudiandae accusantium nostrum doloribus voluptas accusamus consectetur quod inventore provident magni id sit, dolor harum totam. Odio ducimus error architecto.\n        <div class=\"aside-footer\">\n          <button type=\"button\" class=\"btn btn-default\" @click=\"showTopAside=false\">在组件声明的时候定义的close事件</button>\n        </div>\n      </div>\n    </asidebar>\n    <!--下-->\n    <asidebar v-ref:asideL  :show.sync=\"showBottomAside\"  :placement.sync=\"bottom\"  :header.sync=\"asideBottomTit\" >\n      <div slot=\"body\">\n        <!--自定义内容-->\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea praesentium repudiandae accusantium nostrum doloribus voluptas accusamus consectetur quod inventore provident magni id sit, dolor harum totam. Odio ducimus error architecto.\n        <div class=\"aside-footer\">\n          <button type=\"button\" class=\"btn btn-default\" @click=\"showBottomAside=false\">在组件声明的时候定义的close事件</button>\n        </div>\n      </div>\n    </asidebar>\n\n    <p>页面状态 <pre>{{$data | json}}</pre></p>\n\n  </div>\n\n\n  <toast v-ref:toast :toast.sync=\"toast\">\n    <div slot=\"content\" >{{toast.content}}</div>\n  </toast>";

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(router){
		router.map({
			'/':{
				name:'home',
				component: __webpack_require__(157)
			},
			'/about':{
				name:'about',
				component: __webpack_require__(160)
			},
			'/my_views': {
				name:'my_views',
				component: __webpack_require__(166)
			},
			'/my_views/:viewId': {
				name:'my_views_detail',
				component: __webpack_require__(171),
				auth: true // 此页面需要用户登录
			},
			'/modal_view': {
				name:'modal_view',
				component: __webpack_require__(176)
			},
			'/select_view': {
				name:'select_view',
				component: __webpack_require__(181)
			},
			'/radio_view': {
				name:'radio_view',
				component: __webpack_require__(191)
			},
			'/tab_view': {
				name:'tab_view',
				component: __webpack_require__(201)
			},
			'/slider_view': {
				name:'slider_view',
				component: __webpack_require__(216)
			},
			'/forbidden':{
				name:'forbidden',
				component: __webpack_require__(224)
			},
			// not found handler
		    '*': {
		      component: __webpack_require__(225)
		    }
		});
	
		// router.beforeEach((transition) => {
		// if (transition.to.path === '/forbidden') {
		// 	router.app.authenticating = true
		// 	setTimeout(() => {
		//     router.app.authenticating = false
		//     alert('this route is forbidden by a global before hook')
		//     transition.abort()
		//   }, 1500)
		// } else {
		//   transition.next()
		// }
		// })
	
		router.beforeEach(function(transition){
			//可以通过在路由中的自定义字段来验证用户是否需要登陆
			if(transition.to.auth){
				console.log('通过配置路由中自定义的字段验证是否需要登陆');
			}
	
			//如果是中止，这里可以判断用户登录
			//if(transition.to.path === '/forbidden'){
			if(transition.to.name == 'forbidden'){
	
				router.app.authenticating = true
				setTimeout(function(){
					router.app.authenticating = false
					alert('此路由在全局中设置为中止');
					transition.abort();
				},1500);
			} else {
				 transition.next();
				 console.log('每次路由开始的时候beforeEach');
			}
		});
	
	
		//可以记录访问路径
		router.afterEach(function(transition){
			var routeList = router.app.routeList;
	
			routeList.$set(routeList.length, {
				name : transition.to.name,
				path : transition.to.path,
				query : transition.to.query,
				params : transition.to.params,
				timer: +new Date
			});
		});
	
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(158)
	module.exports.template = __webpack_require__(159)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./home.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./home.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = {
		data:function(){
			return {
				msg:'aboutMessage',
				title:'home'
			}
		},
		route:{
			activate:function(transition){
				this.$root.$set('header',this.title);
				transition.next();
			}
		},
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "<div>首屏</div>";

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(161)
	module.exports = __webpack_require__(164)
	module.exports.template = __webpack_require__(165)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./about.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./about.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./about.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./about.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./about.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 161 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 162 */,
/* 163 */,
/* 164 */
/***/ function(module, exports) {

	module.exports = {
		data:function(){
			return {
				msg:'aboutMessage',
				title:'about'
			}
		},
		route:{
			activate:function(transition){
				this.$root.$set('header',this.title);
				transition.next();
			}
		},
	};

/***/ },
/* 165 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <p>about-{{msg}}</p>\n  测试图片\n  <div class=\"img_holder\"></div>\n  图片下的文字\n </div>";

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(167)
	module.exports = __webpack_require__(169)
	module.exports.template = __webpack_require__(170)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_views.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_views.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 167 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 168 */,
/* 169 */
/***/ function(module, exports) {

	var lifecycle = []; //为了描述声明周期， 在 canActivate 阶段 还没有 this.lifecycle
	
		 module.exports = {
		 	//props: ['父组建传的值'],
		 	data:function(){
		 		lifecycle.push('data');
		 	 	console.log('1-1这里是组建的data,在route的 canActivate之后调用');
		 		return {
		 			msg: '各个阶段，可以查看控制台输出，message from my-views',
		 			title:'my_views',
		 			lifecycle:lifecycle
		 		}
		 	},
		 	//这里才是route的生存周期
		 	route:{
		 		//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
			 	canActivate:function(transition){
			    	//console.log('canActivate阶段，可以做一些用户验证的事情');
			    	//return authenticationService.isLoggedIn()
			    	console.log('1-canActivate');
			    	lifecycle.push('canActivate');
			    	//debugger;
			    	return true;
			    },
			    activate:function(transition){
			    	//console.log('active');
			    	console.log('2-activate');
			    	this.lifecycle.push('activate');
			    	this.$root.$set('header',this.title);
	
			    	transition.next();
			    	//此方法结束后，api会调用afterActivate 方法
			    	//在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
			    },
				data: function(transition) {
					var _this = this;
					this.lifecycle.push('route.data');
					// 说明之前请求过 则不用再请求了
					if(this.$root.myViewsData){
						this.$data = this.$root.myViewsData;
						transition.next();
						console.log('已经请求过了不再请求数据');
						return;
					}
					//将数据同步到根节点
					this.$root.myViewsData = this.$data;
	
					setTimeout(function(){
						//在 transition.next({a:1}) 之前
						//这里 _this.$loadingRouteData 是 true  因为此时获取
						transition.next({msg:'加载后的数据'});
	
					}.bind(this),3000);
	
	
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!');
					this.lifecycle = [];
					transition.next();
				}
		 	},
		 	created:function(){
				this.lifecycle.push('created');
			},
			beforeCompile:function(){
				this.lifecycle.push('beforeCompile');
			},
			compiled:function(){
				this.lifecycle.push('compiled');
			},
			ready:function(){
				this.lifecycle.push('ready');
			},
			attached:function(){
				this.lifecycle.push('attached');
			},
			detached:function(){
				this.lifecycle.push('detached');
			},
			beforeDestroy:function(){
				this.lifecycle.push('beforeDestroy');
			},
			destroyed:function(){
				this.lifecycle.push('destroyed');
			}
		 }

/***/ },
/* 170 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view\"> <!--要使用 $loadingRouteData 过渡效果的时候 不能用作片段，必须要在最外层包一层div-->\n\t<div v-if=\"$loadingRouteData\" >Loading ...这里是在data钩子切换的时候获取的$loadingRouteData的元素属性，此操作必须是在一个延迟方法中进行的</div>\n\t<div v-if=\"!$loadingRouteData\" class=\"my-views\">\n\t\t<div v-show=\"a\" >这里是data 获取完数据过渡之后获取的值 {{a}}</div>\n\t\t<h2>{{msg}}</h2>\n\t</div>\n<p>触发顺序</p>\n<pre>\n{{lifecycle | json}}\n</pre>\n<p>注意：第一次进入 和 再次进入（试着切换到其他路径，再回来） </p>\n</div>";

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(172)
	module.exports = __webpack_require__(174)
	module.exports.template = __webpack_require__(175)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views_detail.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views_detail.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_views_detail.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_views_detail.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_views_detail.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 172 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 173 */,
/* 174 */
/***/ function(module, exports) {

	module.exports = {
		 	data:function(){
		 		return {
		 			a:'',
		 			title:'详情'
		 		}
		 	},
		 	//这里才是route的生存周期
		 	route:{
				data: function(transition) {
					setTimeout(function(){
						transition.next({a:'通过' + JSON.stringify(this.$route.params) + '获取的值'});
					}.bind(this),3000);
				},
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				}
		 	}
		 }

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view-detail\"> <!--要使用 $loadingRouteData 过渡效果的时候 不能用作片段，必须要在最外层包一层div-->\n\t<p>请求参数{{$route.params | json}}</p>\n\t<div v-if=\"$loadingRouteData\">正在加载.....</div>\n\t<p v-text=\"a\"></p>\n  <a v-link=\"{ name: 'my_views_detail', params: { viewId:'123' }, exact: true }\">修改参数试试</a>\n</div>";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(177)
	module.exports = __webpack_require__(179)
	module.exports.template = __webpack_require__(180)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal_view.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal_view.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./modal_view.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./modal_view.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./modal_view.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 177 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 178 */,
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
			data:function(){
				return {
					showModal:false,
					modalbody:'含有弹窗的子页面'
				}
			},
			components:{
				modal:__webpack_require__(135)
			},
			route:{
				activate:function(transition){
					this.$root.$set('header',this.modalbody);
					transition.next();
				}
			}
		}

/***/ },
/* 180 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t  <button type=\"text\" @click = \"showModal=true\"> 显示该页面modal </button>\n\t  <modal :show.sync=\"showModal\" v-ref:index-modal> <!--此种写法详情 https://github.com/yyx990803/vue/issues/1325-->\n      <!--\n        you can use custom content here to overwrite\n        default content\n      -->\n\n      <h3 slot=\"body\"><span v-text=\"modalbody\"></span></h3>\n      <h3 slot=\"header\">含有弹窗的子页面</h3>\n    </modal>\n</div>";

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(182)
	module.exports = __webpack_require__(184)
	module.exports.template = __webpack_require__(190)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select_view.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select_view.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./select_view.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select_view.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./select_view.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 182 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 183 */,
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
			data:function(){
				return {
					items:[{text:'男',hover:false},{text:'女',hover:false}],
					title:'select模拟'
				}
			},
			components:{
				uiselect:__webpack_require__(185)
			},
			route:{
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				}
			}
		}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(186)
	module.exports = __webpack_require__(188)
	module.exports.template = __webpack_require__(189)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./select.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./select.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./select.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 186 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 187 */,
/* 188 */
/***/ function(module, exports) {

	module.exports = {
			props: ['items'],
			data:function(){
				return {
					show : false,
					ishover:false,
					chooseval:'请选择'
				}
			},
			methods:{
				mouseover:function(item,index){
					item.hover = true;
				},
				mouseout:function(item,index){
					item.hover = false;
				},
				choose:function(e){
					this.chooseval = e.target.innerHTML;
				},
	      hideWrap:function(){
	        this.show = false;
	        console.log('隐藏hideWrap');
	      }
			}
		}

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = "<div>\n<!-- div.select_components_mask 类根据堆叠关系 不用设置z-index -->\n<div class=\"select_components_mask\" v-show=\"show\" @click.stop=\"show=false\"></div>\n  <slot name=\"title\">default title</slot>\n   <div class=\"select\" @click.stop=\"show=!show\">\n    <div class=\"select-content\">{{chooseval}}</div>\n    <div class=\"select_arrow\">\n      <span></span>\n    </div>\n    <ul class=\"select_wrap\" :class=\"{ 'hide': !show }\">\n        <li v-for=\"d in items\" :class=\"{ 'hover': d.hover }\" @mouseout=\"mouseout(d,$index)\" @mouseover=\"mouseover(d,$index)\" @click=\"choose\"> {{ d.text }} </li>\n    </ul>\n  </div>\n</div>";

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t  <uiselect :items.sync=\"items\">\n\t\t<h3 slot=\"title\">性别</h3>\n      </uiselect>\n</div>";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(192)
	module.exports = __webpack_require__(194)
	module.exports.template = __webpack_require__(200)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio_view.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio_view.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radio_view.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio_view.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radio_view.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 192 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 193 */,
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
			data:function(){
				//因为在 主 vue 里面使用了 keep-alive 标识，所以再次切换到此视图的时候，还是上次切换的状态
				return {
					mutilCheckitems:[{text:'选项一',checked:false},{text:'选项二',checked:false},{text:'选项三',checked:false}],
					singleCheckitems:[{text:'选项一',checked:false},{text:'选项二',checked:false},{text:'选项三',checked:false}],
					mutilCheck:true,
					title:'radio模拟'
				}
			},
			computed:{
				singleCheck:function(){
					return false;
				}
			},
			components:{
				uiradio:__webpack_require__(195)
			},
			route:{
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				}
			}
		}

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(196)
	module.exports = __webpack_require__(198)
	module.exports.template = __webpack_require__(199)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radio.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./radio.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./radio.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 196 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 197 */,
/* 198 */
/***/ function(module, exports) {

	module.exports = {
			props: ['items','mutilCheck'],
			methods:{
				clickHandler:function(index){
					//多选
					if(this.mutilCheck){
						this.items[index].checked = !this.items[index].checked;
					} else {
						//单选
						for (var i = this.items.length - 1; i >= 0; i--) {
							this.items[i].checked = (i === index)
						};
					}
				}
			}
		}

/***/ },
/* 199 */
/***/ function(module, exports) {

	module.exports = "<slot name=\"title\"></slot>\n<div v-for=\"item in items\">\n\t<div  class=\"switch_box switch_box-txt \"\n\t\t:class=\"{'switch_box-on':item.checked}\"\n\t\t@click = \"clickHandler($index)\"\n\t>\n\t\t<div class=\"switch_scroll\"></div>\n\t</div><span v-text=\"item.text\"></span>\n\t{{item.checked}}\n</div>";

/***/ },
/* 200 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<uiradio :items.sync=\"mutilCheckitems\" :mutil-check.sync=\"mutilCheck\">\n\t<h3 slot=\"title\">多选</h3>\n\t</uiradio>\n\t<uiradio :items.sync=\"singleCheckitems\" :mutil-check.sync=\"singleCheck\">\n\t<h3 slot=\"title\">单选</h3>\n\t</uiradio>\n</div>";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(202)
	module.exports = __webpack_require__(204)
	module.exports.template = __webpack_require__(215)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab_view.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab_view.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tab_view.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab_view.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tab_view.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 202 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 203 */,
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
			data:function(){
				return {
					title:'tab选项卡',
					list:[
						{header:'one ',content:'blablablablabla...',disabled:false},
						{header:'two ',content:'bilibilibilibli...',disabled:false},
						{header:'three disabled ',content:'',disabled:true},
					]
				}
			},
			components : {
				tabs : __webpack_require__(205),
				tab  : __webpack_require__(210)
			},
			ready:function(){
				this.$root.$set('header',this.title);
			}
		}

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(206)
	module.exports = __webpack_require__(208)
	module.exports.template = __webpack_require__(209)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tabset.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tabset.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tabset.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tabset.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tabset.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 206 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 207 */,
/* 208 */
/***/ function(module, exports) {

	module.exports = {
			props: {
				effect: {
					type: String,
					default: 'fadein'
				}
			},
			data:function(){
				return {
					renderData:[],
					activeIndex: 0
				}
			},
			methods:{
				handleTablistClick:function(e,index,el){
	
					if (!this.renderData[index].disabled) this.activeIndex = index
				}
			},
			ready:function(){
	
			}
		}

/***/ },
/* 209 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tab\">\n\t<ul class=\"tab-nav\">\n\t\t<li v-for=\"(index,item) in renderData\">\n\t\t\t<a href=\"#\"\n\t\t\t@click.prevent.stop = \"handleTablistClick($event,index,this)\"\n\t\t\t:class=\"{\n\t\t\t\tactive:$index === activeIndex,\n\t\t\t\tdisabled:item.disabled\n\t\t\t}\"\n\t\t\t>{{item.header}}</a>\n\t\t</li>\n\t</ul>\n\t<slot name=\"tab-content\"></slot>\n</div>";

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(211)
	module.exports = __webpack_require__(213)
	module.exports.template = __webpack_require__(214)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tab.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./tab.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./tab.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 211 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 212 */,
/* 213 */
/***/ function(module, exports) {

	module.exports = {
			data:function(){
				return {
					show:false,
					index:0
				}
			},
			props: {
				header: {
					type: String
				},
				disabled: {
					type: Boolean,
					default: false
				}
			},
			computed:{
				show:function(){
					return this.$parent.activeIndex === this.index;
				},
				transiton:function() {
	        		return this.$parent.effect;
	      		}
			},
			created:function(){
				this.$parent.renderData.push({
					header: this.header,
					disabled: this.disabled
				});
				//因为这里每次index都是0，所以要在ready的时候设置一下它的index
				this.index = this.$parent.renderData.length - 1;
			}
		}

/***/ },
/* 214 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tab-panel\" :class=\"{hide:!show}\" v-show=\"show\" :index=\"index\" :transition=\"transiton\" >\n\t{{$index}}\n\t\t<slot name=\"tab-panel\"></slot>\n\t</div>";

/***/ },
/* 215 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<p>切换效果:渐变（默认）</p>\n\t\t<tabs>\n\t\t\t<div class=\"tab-content\" slot=\"tab-content\">\n\t\t\t\t<tab header=\"one\">\n\t\t\t\t\t<p slot=\"tab-panel\">\n\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n\t\t\t\t\ttempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n\t\t\t\t\tquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n\t\t\t\t\tconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n\t\t\t\t\tcillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n\t\t\t\t\tproident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\t\t\t\t\t</p>\n\t\t\t\t</tab>\n\t\t\t\t<tab header=\"two\">\n\t\t\t\t\t<p slot=\"tab-panel\">\n\t\t\t\t\tipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n\t\t\t\t\ttempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n\t\t\t\t\tquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n\t\t\t\t\t</p>\n\t\t\t\t</tab>\n\t\t\t\t<tab header=\"three\">\n\t\t\t\t\t<p slot=\"tab-panel\">\n\t\t\t\t\tipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n\t\t\t\t\ttempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n\t\t\t\t\tquis nostrud\n\t\t\t\t\t</p>\n\t\t\t\t</tab>\n\t\t\t</div>\n\t\t</tabs>\n\n\t\t<p>通过v-for声明，切换效果左右滑动</p>\n\t\t<tabs effect=\"fadeInRight\">\n\t\t\t<div class=\"tab-content\" slot=\"tab-content\">\n\t\t\t\t<tab v-for=\"item in list\" :header=\"item.header\" :disabled.sync=\"item.disabled\">\n\t\t\t\t<p slot=\"tab-panel\">\n\t\t\t\t{{item.content}}\n\t\t\t\t</p>\n\t\t\t\t</tab>\n\t\t\t</div>\n\t\t</tabs>\n</div>";

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(217)
	module.exports = __webpack_require__(219)
	module.exports.template = __webpack_require__(223)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./slider_view.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./slider_view.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./slider_view.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./slider_view.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./slider_view.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 217 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 218 */,
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220);
		var Swiper = __webpack_require__(222);
		//var swiper = new Swiper('.swiper-container');
		module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					msg:'这里返回数据'
				}
			},
			ready:function(){
				new Swiper(this.$el);
			}
		}

/***/ },
/* 220 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 221 */,
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Swiper 3.1.7
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2015, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: October 10, 2015
	 */
	(function () {
	    'use strict';
	    var $;
	    /*===========================
	    Swiper
	    ===========================*/
	    var Swiper = function (container, params) {
	        if (!(this instanceof Swiper)) return new Swiper(container, params);
	
	        var defaults = {
	            direction: 'horizontal',
	            touchEventsTarget: 'container',
	            initialSlide: 0,
	            speed: 300,
	            // autoplay
	            autoplay: false,
	            autoplayDisableOnInteraction: true,
	            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
	            iOSEdgeSwipeDetection: false,
	            iOSEdgeSwipeThreshold: 20,
	            // Free mode
	            freeMode: false,
	            freeModeMomentum: true,
	            freeModeMomentumRatio: 1,
	            freeModeMomentumBounce: true,
	            freeModeMomentumBounceRatio: 1,
	            freeModeSticky: false,
	            freeModeMinimumVelocity: 0.02,
	            // Set wrapper width
	            setWrapperSize: false,
	            // Virtual Translate
	            virtualTranslate: false,
	            // Effects
	            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow'
	            coverflow: {
	                rotate: 50,
	                stretch: 0,
	                depth: 100,
	                modifier: 1,
	                slideShadows : true
	            },
	            cube: {
	                slideShadows: true,
	                shadow: true,
	                shadowOffset: 20,
	                shadowScale: 0.94
	            },
	            fade: {
	                crossFade: false
	            },
	            // Parallax
	            parallax: false,
	            // Scrollbar
	            scrollbar: null,
	            scrollbarHide: true,
	            scrollbarDraggable: false,
	            scrollbarSnapOnRelease: false,
	            // Keyboard Mousewheel
	            keyboardControl: false,
	            mousewheelControl: false,
	            mousewheelReleaseOnEdges: false,
	            mousewheelInvert: false,
	            mousewheelForceToAxis: false,
	            mousewheelSensitivity: 1,
	            // Hash Navigation
	            hashnav: false,
	            // Slides grid
	            spaceBetween: 0,
	            slidesPerView: 1,
	            slidesPerColumn: 1,
	            slidesPerColumnFill: 'column',
	            slidesPerGroup: 1,
	            centeredSlides: false,
	            slidesOffsetBefore: 0, // in px
	            slidesOffsetAfter: 0, // in px
	            // Round length
	            roundLengths: false,
	            // Touches
	            touchRatio: 1,
	            touchAngle: 45,
	            simulateTouch: true,
	            shortSwipes: true,
	            longSwipes: true,
	            longSwipesRatio: 0.5,
	            longSwipesMs: 300,
	            followFinger: true,
	            onlyExternal: false,
	            threshold: 0,
	            touchMoveStopPropagation: true,
	            // Pagination
	            pagination: null,
	            paginationElement: 'span',
	            paginationClickable: false,
	            paginationHide: false,
	            paginationBulletRender: null,
	            // Resistance
	            resistance: true,
	            resistanceRatio: 0.85,
	            // Next/prev buttons
	            nextButton: null,
	            prevButton: null,
	            // Progress
	            watchSlidesProgress: false,
	            watchSlidesVisibility: false,
	            // Cursor
	            grabCursor: false,
	            // Clicks
	            preventClicks: true,
	            preventClicksPropagation: true,
	            slideToClickedSlide: false,
	            // Lazy Loading
	            lazyLoading: false,
	            lazyLoadingInPrevNext: false,
	            lazyLoadingOnTransitionStart: false,
	            // Images
	            preloadImages: true,
	            updateOnImagesReady: true,
	            // loop
	            loop: false,
	            loopAdditionalSlides: 0,
	            loopedSlides: null,
	            // Control
	            control: undefined,
	            controlInverse: false,
	            controlBy: 'slide', //or 'container'
	            // Swiping/no swiping
	            allowSwipeToPrev: true,
	            allowSwipeToNext: true,
	            swipeHandler: null, //'.swipe-handler',
	            noSwiping: true,
	            noSwipingClass: 'swiper-no-swiping',
	            // NS
	            slideClass: 'swiper-slide',
	            slideActiveClass: 'swiper-slide-active',
	            slideVisibleClass: 'swiper-slide-visible',
	            slideDuplicateClass: 'swiper-slide-duplicate',
	            slideNextClass: 'swiper-slide-next',
	            slidePrevClass: 'swiper-slide-prev',
	            wrapperClass: 'swiper-wrapper',
	            bulletClass: 'swiper-pagination-bullet',
	            bulletActiveClass: 'swiper-pagination-bullet-active',
	            buttonDisabledClass: 'swiper-button-disabled',
	            paginationHiddenClass: 'swiper-pagination-hidden',
	            // Observer
	            observer: false,
	            observeParents: false,
	            // Accessibility
	            a11y: false,
	            prevSlideMessage: 'Previous slide',
	            nextSlideMessage: 'Next slide',
	            firstSlideMessage: 'This is the first slide',
	            lastSlideMessage: 'This is the last slide',
	            paginationBulletMessage: 'Go to slide {{index}}',
	            // Callbacks
	            runCallbacksOnInit: true
	            /*
	            Callbacks:
	            onInit: function (swiper)
	            onDestroy: function (swiper)
	            onClick: function (swiper, e)
	            onTap: function (swiper, e)
	            onDoubleTap: function (swiper, e)
	            onSliderMove: function (swiper, e)
	            onSlideChangeStart: function (swiper)
	            onSlideChangeEnd: function (swiper)
	            onTransitionStart: function (swiper)
	            onTransitionEnd: function (swiper)
	            onImagesReady: function (swiper)
	            onProgress: function (swiper, progress)
	            onTouchStart: function (swiper, e)
	            onTouchMove: function (swiper, e)
	            onTouchMoveOpposite: function (swiper, e)
	            onTouchEnd: function (swiper, e)
	            onReachBeginning: function (swiper)
	            onReachEnd: function (swiper)
	            onSetTransition: function (swiper, duration)
	            onSetTranslate: function (swiper, translate)
	            onAutoplayStart: function (swiper)
	            onAutoplayStop: function (swiper),
	            onLazyImageLoad: function (swiper, slide, image)
	            onLazyImageReady: function (swiper, slide, image)
	            */
	        
	        };
	        var initialVirtualTranslate = params && params.virtualTranslate;
	        
	        params = params || {};
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	            else if (typeof params[def] === 'object') {
	                for (var deepDef in defaults[def]) {
	                    if (typeof params[def][deepDef] === 'undefined') {
	                        params[def][deepDef] = defaults[def][deepDef];
	                    }
	                }
	            }
	        }
	        
	        // Swiper
	        var s = this;
	        
	        // Params
	        s.params = params;
	        
	        // Classname
	        s.classNames = [];
	        /*=========================
	          Dom Library and plugins
	          ===========================*/
	        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
	            $ = Dom7;
	        }  
	        if (typeof $ === 'undefined') {
	            if (typeof Dom7 === 'undefined') {
	                $ = window.Dom7 || window.Zepto || window.jQuery;
	            }
	            else {
	                $ = Dom7;
	            }
	            if (!$) return;
	        }
	        // Export it to Swiper instance
	        s.$ = $;
	        
	        /*=========================
	          Preparation - Define Container, Wrapper and Pagination
	          ===========================*/
	        s.container = $(container);
	        if (s.container.length === 0) return;
	        if (s.container.length > 1) {
	            s.container.each(function () {
	                new Swiper(this, params);
	            });
	            return;
	        }
	        
	        // Save instance in container HTML Element and in data
	        s.container[0].swiper = s;
	        s.container.data('swiper', s);
	        
	        s.classNames.push('swiper-container-' + s.params.direction);
	        
	        if (s.params.freeMode) {
	            s.classNames.push('swiper-container-free-mode');
	        }
	        if (!s.support.flexbox) {
	            s.classNames.push('swiper-container-no-flexbox');
	            s.params.slidesPerColumn = 1;
	        }
	        // Enable slides progress when required
	        if (s.params.parallax || s.params.watchSlidesVisibility) {
	            s.params.watchSlidesProgress = true;
	        }
	        // Coverflow / 3D
	        if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
	            if (s.support.transforms3d) {
	                s.params.watchSlidesProgress = true;
	                s.classNames.push('swiper-container-3d');
	            }
	            else {
	                s.params.effect = 'slide';
	            }
	        }
	        if (s.params.effect !== 'slide') {
	            s.classNames.push('swiper-container-' + s.params.effect);
	        }
	        if (s.params.effect === 'cube') {
	            s.params.resistanceRatio = 0;
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.centeredSlides = false;
	            s.params.spaceBetween = 0;
	            s.params.virtualTranslate = true;
	            s.params.setWrapperSize = false;
	        }
	        if (s.params.effect === 'fade') {
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.watchSlidesProgress = true;
	            s.params.spaceBetween = 0;
	            if (typeof initialVirtualTranslate === 'undefined') {
	                s.params.virtualTranslate = true;
	            }
	        }
	        
	        // Grab Cursor
	        if (s.params.grabCursor && s.support.touch) {
	            s.params.grabCursor = false;
	        }
	        
	        // Wrapper
	        s.wrapper = s.container.children('.' + s.params.wrapperClass);
	        
	        // Pagination
	        if (s.params.pagination) {
	            s.paginationContainer = $(s.params.pagination);
	            if (s.params.paginationClickable) {
	                s.paginationContainer.addClass('swiper-pagination-clickable');
	            }
	        }
	        
	        // Is Horizontal
	        function isH() {
	            return s.params.direction === 'horizontal';
	        }
	        
	        // RTL
	        s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
	        if (s.rtl) {
	            s.classNames.push('swiper-container-rtl');
	        }
	        
	        // Wrong RTL support
	        if (s.rtl) {
	            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
	        }
	        
	        // Columns
	        if (s.params.slidesPerColumn > 1) {
	            s.classNames.push('swiper-container-multirow');
	        }
	        
	        // Check for Android
	        if (s.device.android) {
	            s.classNames.push('swiper-container-android');
	        }
	        
	        // Add classes
	        s.container.addClass(s.classNames.join(' '));
	        
	        // Translate
	        s.translate = 0;
	        
	        // Progress
	        s.progress = 0;
	        
	        // Velocity
	        s.velocity = 0;
	        
	        /*=========================
	          Locks, unlocks
	          ===========================*/
	        s.lockSwipeToNext = function () {
	            s.params.allowSwipeToNext = false;
	        };
	        s.lockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = false;
	        };
	        s.lockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
	        };
	        s.unlockSwipeToNext = function () {
	            s.params.allowSwipeToNext = true;
	        };
	        s.unlockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = true;
	        };
	        s.unlockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
	        };
	        
	        /*=========================
	          Round helper
	          ===========================*/
	        function round(a) {
	            return Math.floor(a);
	        }  
	        /*=========================
	          Set grab cursor
	          ===========================*/
	        if (s.params.grabCursor) {
	            s.container[0].style.cursor = 'move';
	            s.container[0].style.cursor = '-webkit-grab';
	            s.container[0].style.cursor = '-moz-grab';
	            s.container[0].style.cursor = 'grab';
	        }
	        /*=========================
	          Update on Images Ready
	          ===========================*/
	        s.imagesToLoad = [];
	        s.imagesLoaded = 0;
	        
	        s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
	            var image;
	            function onReady () {
	                if (callback) callback();
	            }
	            if (!imgElement.complete || !checkForComplete) {
	                if (src) {
	                    image = new window.Image();
	                    image.onload = onReady;
	                    image.onerror = onReady;
	                    if (srcset) {
	                        image.srcset = srcset;
	                    }
	                    if (src) {
	                        image.src = src;
	                    }
	                } else {
	                    onReady();
	                }
	        
	            } else {//image already loaded...
	                onReady();
	            }
	        };
	        s.preloadImages = function () {
	            s.imagesToLoad = s.container.find('img');
	            function _onReady() {
	                if (typeof s === 'undefined' || s === null) return;
	                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
	                if (s.imagesLoaded === s.imagesToLoad.length) {
	                    if (s.params.updateOnImagesReady) s.update();
	                    s.emit('onImagesReady', s);
	                }
	            }
	            for (var i = 0; i < s.imagesToLoad.length; i++) {
	                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
	            }
	        };
	        
	        /*=========================
	          Autoplay
	          ===========================*/
	        s.autoplayTimeoutId = undefined;
	        s.autoplaying = false;
	        s.autoplayPaused = false;
	        function autoplay() {
	            s.autoplayTimeoutId = setTimeout(function () {
	                if (s.params.loop) {
	                    s.fixLoop();
	                    s._slideNext();
	                }
	                else {
	                    if (!s.isEnd) {
	                        s._slideNext();
	                    }
	                    else {
	                        if (!params.autoplayStopOnLast) {
	                            s._slideTo(0);
	                        }
	                        else {
	                            s.stopAutoplay();
	                        }
	                    }
	                }
	            }, s.params.autoplay);
	        }
	        s.startAutoplay = function () {
	            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
	            if (!s.params.autoplay) return false;
	            if (s.autoplaying) return false;
	            s.autoplaying = true;
	            s.emit('onAutoplayStart', s);
	            autoplay();
	        };
	        s.stopAutoplay = function (internal) {
	            if (!s.autoplayTimeoutId) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplaying = false;
	            s.autoplayTimeoutId = undefined;
	            s.emit('onAutoplayStop', s);
	        };
	        s.pauseAutoplay = function (speed) {
	            if (s.autoplayPaused) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplayPaused = true;
	            if (speed === 0) {
	                s.autoplayPaused = false;
	                autoplay();
	            }
	            else {
	                s.wrapper.transitionEnd(function () {
	                    if (!s) return;
	                    s.autoplayPaused = false;
	                    if (!s.autoplaying) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        autoplay();
	                    }
	                });
	            }
	        };
	        /*=========================
	          Min/Max Translate
	          ===========================*/
	        s.minTranslate = function () {
	            return (-s.snapGrid[0]);
	        };
	        s.maxTranslate = function () {
	            return (-s.snapGrid[s.snapGrid.length - 1]);
	        };
	        /*=========================
	          Slider/slides sizes
	          ===========================*/
	        s.updateContainerSize = function () {
	            var width, height;
	            if (typeof s.params.width !== 'undefined') {
	                width = s.params.width;
	            }
	            else {
	                width = s.container[0].clientWidth;
	            }
	            if (typeof s.params.height !== 'undefined') {
	                height = s.params.height;
	            }
	            else {
	                height = s.container[0].clientHeight;
	            }
	            if (width === 0 && isH() || height === 0 && !isH()) {
	                return;
	            }
	            
	            //Subtract paddings
	            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
	            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
	            
	            // Store values
	            s.width = width;
	            s.height = height;
	            s.size = isH() ? s.width : s.height;
	        };
	        
	        s.updateSlidesSize = function () {
	            s.slides = s.wrapper.children('.' + s.params.slideClass);
	            s.snapGrid = [];
	            s.slidesGrid = [];
	            s.slidesSizesGrid = [];
	        
	            var spaceBetween = s.params.spaceBetween,
	                slidePosition = -s.params.slidesOffsetBefore,
	                i,
	                prevSlideSize = 0,
	                index = 0;
	            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
	            }
	        
	            s.virtualSize = -spaceBetween;
	            // reset margins
	            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
	            else s.slides.css({marginRight: '', marginBottom: ''});
	        
	            var slidesNumberEvenToRows;
	            if (s.params.slidesPerColumn > 1) {
	                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
	                    slidesNumberEvenToRows = s.slides.length;
	                }
	                else {
	                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
	                }
	                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
	                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
	                }
	            }
	        
	            // Calc slides
	            var slideSize;
	            var slidesPerColumn = s.params.slidesPerColumn;
	            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
	            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
	            for (i = 0; i < s.slides.length; i++) {
	                slideSize = 0;
	                var slide = s.slides.eq(i);
	                if (s.params.slidesPerColumn > 1) {
	                    // Set slides order
	                    var newSlideOrderIndex;
	                    var column, row;
	                    if (s.params.slidesPerColumnFill === 'column') {
	                        column = Math.floor(i / slidesPerColumn);
	                        row = i - column * slidesPerColumn;
	                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
	                            if (++row >= slidesPerColumn) {
	                                row = 0;
	                                column++;
	                            }
	                        }
	                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
	                        slide
	                            .css({
	                                '-webkit-box-ordinal-group': newSlideOrderIndex,
	                                '-moz-box-ordinal-group': newSlideOrderIndex,
	                                '-ms-flex-order': newSlideOrderIndex,
	                                '-webkit-order': newSlideOrderIndex,
	                                'order': newSlideOrderIndex
	                            });
	                    }
	                    else {
	                        row = Math.floor(i / slidesPerRow);
	                        column = i - row * slidesPerRow;
	                    }
	                    slide
	                        .css({
	                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
	                        })
	                        .attr('data-swiper-column', column)
	                        .attr('data-swiper-row', row);
	        
	                }
	                if (slide.css('display') === 'none') continue;
	                if (s.params.slidesPerView === 'auto') {
	                    slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	                }
	                else {
	                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	        
	                    if (isH()) {
	                        s.slides[i].style.width = slideSize + 'px';
	                    }
	                    else {
	                        s.slides[i].style.height = slideSize + 'px';
	                    }
	                }
	                s.slides[i].swiperSlideSize = slideSize;
	                s.slidesSizesGrid.push(slideSize);
	        
	        
	                if (s.params.centeredSlides) {
	                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
	                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
	                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                }
	                else {
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                    slidePosition = slidePosition + slideSize + spaceBetween;
	                }
	        
	                s.virtualSize += slideSize + spaceBetween;
	        
	                prevSlideSize = slideSize;
	        
	                index ++;
	            }
	            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
	            var newSlidesGrid;
	        
	            if (
	                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	            if (!s.support.flexbox || s.params.setWrapperSize) {
	                if (isH()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	        
	            if (s.params.slidesPerColumn > 1) {
	                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
	                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                if (s.params.centeredSlides) {
	                    newSlidesGrid = [];
	                    for (i = 0; i < s.snapGrid.length; i++) {
	                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                    s.snapGrid = newSlidesGrid;
	                }
	            }
	        
	            // Remove last grid elements depending on width
	            if (!s.params.centeredSlides) {
	                newSlidesGrid = [];
	                for (i = 0; i < s.snapGrid.length; i++) {
	                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
	                        newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                }
	                s.snapGrid = newSlidesGrid;
	                if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
	                    s.snapGrid.push(s.virtualSize - s.size);
	                }
	            }
	            if (s.snapGrid.length === 0) s.snapGrid = [0];
	        
	            if (s.params.spaceBetween !== 0) {
	                if (isH()) {
	                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
	                    else s.slides.css({marginRight: spaceBetween + 'px'});
	                }
	                else s.slides.css({marginBottom: spaceBetween + 'px'});
	            }
	            if (s.params.watchSlidesProgress) {
	                s.updateSlidesOffset();
	            }
	        };
	        s.updateSlidesOffset = function () {
	            for (var i = 0; i < s.slides.length; i++) {
	                s.slides[i].swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
	            }
	        };
	        
	        /*=========================
	          Slider/slides progress
	          ===========================*/
	        s.updateSlidesProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            if (s.slides.length === 0) return;
	            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
	        
	            var offsetCenter = -translate;
	            if (s.rtl) offsetCenter = translate;
	        
	            // Visible Slides
	            var containerBox = s.container[0].getBoundingClientRect();
	            var sideBefore = isH() ? 'left' : 'top';
	            var sideAfter = isH() ? 'right' : 'bottom';
	            s.slides.removeClass(s.params.slideVisibleClass);
	            for (var i = 0; i < s.slides.length; i++) {
	                var slide = s.slides[i];
	                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
	                if (s.params.watchSlidesVisibility) {
	                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
	                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
	                    var isVisible =
	                        (slideBefore >= 0 && slideBefore < s.size) ||
	                        (slideAfter > 0 && slideAfter <= s.size) ||
	                        (slideBefore <= 0 && slideAfter >= s.size);
	                    if (isVisible) {
	                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
	                    }
	                }
	                slide.progress = s.rtl ? -slideProgress : slideProgress;
	            }
	        };
	        s.updateProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            var translatesDiff = s.maxTranslate() - s.minTranslate();
	            if (translatesDiff === 0) {
	                s.progress = 0;
	                s.isBeginning = s.isEnd = true;
	            }
	            else {
	                s.progress = (translate - s.minTranslate()) / (translatesDiff);
	                s.isBeginning = s.progress <= 0;
	                s.isEnd = s.progress >= 1;
	            }
	            if (s.isBeginning) s.emit('onReachBeginning', s);
	            if (s.isEnd) s.emit('onReachEnd', s);
	        
	            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
	            s.emit('onProgress', s, s.progress);
	        };
	        s.updateActiveIndex = function () {
	            var translate = s.rtl ? s.translate : -s.translate;
	            var newActiveIndex, i, snapIndex;
	            for (i = 0; i < s.slidesGrid.length; i ++) {
	                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
	                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
	                        newActiveIndex = i;
	                    }
	                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
	                        newActiveIndex = i + 1;
	                    }
	                }
	                else {
	                    if (translate >= s.slidesGrid[i]) {
	                        newActiveIndex = i;
	                    }
	                }
	            }
	            // Normalize slideIndex
	            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
	            // for (i = 0; i < s.slidesGrid.length; i++) {
	                // if (- translate >= s.slidesGrid[i]) {
	                    // newActiveIndex = i;
	                // }
	            // }
	            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
	            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
	        
	            if (newActiveIndex === s.activeIndex) {
	                return;
	            }
	            s.snapIndex = snapIndex;
	            s.previousIndex = s.activeIndex;
	            s.activeIndex = newActiveIndex;
	            s.updateClasses();
	        };
	        
	        /*=========================
	          Classes
	          ===========================*/
	        s.updateClasses = function () {
	            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
	            var activeSlide = s.slides.eq(s.activeIndex);
	            // Active classes
	            activeSlide.addClass(s.params.slideActiveClass);
	            activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
	            activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
	        
	            // Pagination
	            if (s.bullets && s.bullets.length > 0) {
	                s.bullets.removeClass(s.params.bulletActiveClass);
	                var bulletIndex;
	                if (s.params.loop) {
	                    bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup;
	                    if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
	                        bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
	                    }
	                    if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length;
	                }
	                else {
	                    if (typeof s.snapIndex !== 'undefined') {
	                        bulletIndex = s.snapIndex;
	                    }
	                    else {
	                        bulletIndex = s.activeIndex || 0;
	                    }
	                }
	                if (s.paginationContainer.length > 1) {
	                    s.bullets.each(function () {
	                        if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass);
	                    });
	                }
	                else {
	                    s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass);
	                }
	            }
	        
	            // Next/active buttons
	            if (!s.params.loop) {
	                if (s.params.prevButton) {
	                    if (s.isBeginning) {
	                        $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton));
	                    }
	                    else {
	                        $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton));
	                    }
	                }
	                if (s.params.nextButton) {
	                    if (s.isEnd) {
	                        $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton));
	                    }
	                    else {
	                        $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton));
	                    }
	                }
	            }
	        };
	        
	        /*=========================
	          Pagination
	          ===========================*/
	        s.updatePagination = function () {
	            if (!s.params.pagination) return;
	            if (s.paginationContainer && s.paginationContainer.length > 0) {
	                var bulletsHTML = '';
	                var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	                for (var i = 0; i < numberOfBullets; i++) {
	                    if (s.params.paginationBulletRender) {
	                        bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
	                    }
	                    else {
	                        bulletsHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
	                    }
	                }
	                s.paginationContainer.html(bulletsHTML);
	                s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
	                if (s.params.paginationClickable && s.params.a11y && s.a11y) {
	                    s.a11y.initPagination();
	                }
	            }
	        };
	        /*=========================
	          Common update method
	          ===========================*/
	        s.update = function (updateTranslate) {
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updateProgress();
	            s.updatePagination();
	            s.updateClasses();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            function forceSetTranslate() {
	                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	            }
	            if (updateTranslate) {
	                var translated, newTranslate;
	                if (s.controller && s.controller.spline) {
	                    s.controller.spline = undefined;
	                }
	                if (s.params.freeMode) {
	                    forceSetTranslate();
	                }
	                else {
	                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
	                    }
	                    else {
	                        translated = s.slideTo(s.activeIndex, 0, false, true);
	                    }
	                    if (!translated) {
	                        forceSetTranslate();
	                    }
	                }
	        
	            }
	        };
	        
	        /*=========================
	          Resize Handler
	          ===========================*/
	        s.onResize = function (forceUpdatePagination) {
	            // Disable locks on resize
	            var allowSwipeToPrev = s.params.allowSwipeToPrev;
	            var allowSwipeToNext = s.params.allowSwipeToNext;
	            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
	        
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            if (s.controller && s.controller.spline) {
	                s.controller.spline = undefined;
	            }
	            if (s.params.freeMode) {
	                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	            }
	            else {
	                s.updateClasses();
	                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                    s.slideTo(s.slides.length - 1, 0, false, true);
	                }
	                else {
	                    s.slideTo(s.activeIndex, 0, false, true);
	                }
	            }
	            // Return locks after resize
	            s.params.allowSwipeToPrev = allowSwipeToPrev;
	            s.params.allowSwipeToNext = allowSwipeToNext;
	        };
	        
	        /*=========================
	          Events
	          ===========================*/
	        
	        //Define Touch Events
	        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
	        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
	        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	        s.touchEvents = {
	            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
	            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
	            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
	        };
	        
	        
	        // WP8 Touch Events Fix
	        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
	            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
	        }
	        
	        // Attach/detach events
	        s.initEvents = function (detach) {
	            var actionDom = detach ? 'off' : 'on';
	            var action = detach ? 'removeEventListener' : 'addEventListener';
	            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
	            var target = s.support.touch ? touchEventsTarget : document;
	        
	            var moveCapture = s.params.nested ? true : false;
	        
	            //Touch Events
	            if (s.browser.ie) {
	                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                target[action](s.touchEvents.end, s.onTouchEnd, false);
	            }
	            else {
	                if (s.support.touch) {
	                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
	                }
	                if (params.simulateTouch && !s.device.ios && !s.device.android) {
	                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
	                    document[action]('mousemove', s.onTouchMove, moveCapture);
	                    document[action]('mouseup', s.onTouchEnd, false);
	                }
	            }
	            window[action]('resize', s.onResize);
	        
	            // Next, Prev, Index
	            if (s.params.nextButton) {
	                $(s.params.nextButton)[actionDom]('click', s.onClickNext);
	                if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.prevButton) {
	                $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
	                if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.pagination && s.params.paginationClickable) {
	                $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
	                if (s.params.a11y && s.a11y) $(s.paginationContainer)[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
	            }
	        
	            // Prevent Links Clicks
	            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
	        };
	        s.attachEvents = function (detach) {
	            s.initEvents();
	        };
	        s.detachEvents = function () {
	            s.initEvents(true);
	        };
	        
	        /*=========================
	          Handle Clicks
	          ===========================*/
	        // Prevent Clicks
	        s.allowClick = true;
	        s.preventClicks = function (e) {
	            if (!s.allowClick) {
	                if (s.params.preventClicks) e.preventDefault();
	                if (s.params.preventClicksPropagation && s.animating) {
	                    e.stopPropagation();
	                    e.stopImmediatePropagation();
	                }
	            }
	        };
	        // Clicks
	        s.onClickNext = function (e) {
	            e.preventDefault();
	            if (s.isEnd && !s.params.loop) return;
	            s.slideNext();
	        };
	        s.onClickPrev = function (e) {
	            e.preventDefault();
	            if (s.isBeginning && !s.params.loop) return;
	            s.slidePrev();
	        };
	        s.onClickIndex = function (e) {
	            e.preventDefault();
	            var index = $(this).index() * s.params.slidesPerGroup;
	            if (s.params.loop) index = index + s.loopedSlides;
	            s.slideTo(index);
	        };
	        
	        /*=========================
	          Handle Touches
	          ===========================*/
	        function findElementInEvent(e, selector) {
	            var el = $(e.target);
	            if (!el.is(selector)) {
	                if (typeof selector === 'string') {
	                    el = el.parents(selector);
	                }
	                else if (selector.nodeType) {
	                    var found;
	                    el.parents().each(function (index, _el) {
	                        if (_el === selector) found = selector;
	                    });
	                    if (!found) return undefined;
	                    else return selector;
	                }
	            }
	            if (el.length === 0) {
	                return undefined;
	            }
	            return el[0];
	        }
	        s.updateClickedSlide = function (e) {
	            var slide = findElementInEvent(e, '.' + s.params.slideClass);
	            var slideFound = false;
	            if (slide) {
	                for (var i = 0; i < s.slides.length; i++) {
	                    if (s.slides[i] === slide) slideFound = true;
	                }
	            }
	        
	            if (slide && slideFound) {
	                s.clickedSlide = slide;
	                s.clickedIndex = $(slide).index();
	            }
	            else {
	                s.clickedSlide = undefined;
	                s.clickedIndex = undefined;
	                return;
	            }
	            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
	                var slideToIndex = s.clickedIndex,
	                    realIndex,
	                    duplicatedSlides;
	                if (s.params.loop) {
	                    if (s.animating) return;
	                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
	                    if (s.params.centeredSlides) {
	                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                    else {
	                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                        
	                }
	                else {
	                    s.slideTo(slideToIndex);
	                }
	            }
	        };
	        
	        var isTouched,
	            isMoved,
	            touchStartTime,
	            isScrolling,
	            currentTranslate,
	            startTranslate,
	            allowThresholdMove,
	            // Form elements to match
	            formElements = 'input, select, textarea, button',
	            // Last click time
	            lastClickTime = Date.now(), clickTimeout,
	            //Velocities
	            velocities = [],
	            allowMomentumBounce;
	        
	        // Animating Flag
	        s.animating = false;
	        
	        // Touches information
	        s.touches = {
	            startX: 0,
	            startY: 0,
	            currentX: 0,
	            currentY: 0,
	            diff: 0
	        };
	        
	        // Touch handlers
	        var isTouchEvent, startMoving;
	        s.onTouchStart = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            isTouchEvent = e.type === 'touchstart';
	            if (!isTouchEvent && 'which' in e && e.which === 3) return;
	            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
	                s.allowClick = true;
	                return;
	            }
	            if (s.params.swipeHandler) {
	                if (!findElementInEvent(e, s.params.swipeHandler)) return;
	            }
	        
	            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	            
	            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
	                return;
	            }
	        
	            isTouched = true;
	            isMoved = false;
	            isScrolling = undefined;
	            startMoving = undefined;
	            s.touches.startX = startX;
	            s.touches.startY = startY;
	            touchStartTime = Date.now();
	            s.allowClick = true;
	            s.updateContainerSize();
	            s.swipeDirection = undefined;
	            if (s.params.threshold > 0) allowThresholdMove = false;
	            if (e.type !== 'touchstart') {
	                var preventDefault = true;
	                if ($(e.target).is(formElements)) preventDefault = false;
	                if (document.activeElement && $(document.activeElement).is(formElements)) {
	                    document.activeElement.blur();
	                }
	                if (preventDefault) {
	                    e.preventDefault();
	                }
	            }
	            s.emit('onTouchStart', s, e);
	        };
	        
	        s.onTouchMove = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            if (isTouchEvent && e.type === 'mousemove') return;
	            if (e.preventedByNestedSwiper) return;
	            if (s.params.onlyExternal) {
	                // isMoved = true;
	                s.allowClick = false;
	                if (isTouched) {
	                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                    touchStartTime = Date.now();
	                }
	                return;
	            }
	            if (isTouchEvent && document.activeElement) {
	                if (e.target === document.activeElement && $(e.target).is(formElements)) {
	                    isMoved = true;
	                    s.allowClick = false;
	                    return;
	                }
	            }
	        
	            s.emit('onTouchMove', s, e);
	        
	            if (e.targetTouches && e.targetTouches.length > 1) return;
	        
	            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	        
	            if (typeof isScrolling === 'undefined') {
	                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
	                isScrolling = isH() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
	            }
	            if (isScrolling) {
	                s.emit('onTouchMoveOpposite', s, e);
	            }
	            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
	                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
	                    startMoving = true;
	                }
	            }
	            if (!isTouched) return;
	            if (isScrolling)  {
	                isTouched = false;
	                return;
	            }
	            if (!startMoving && s.browser.ieTouch) {
	                return;
	            }
	            s.allowClick = false;
	            s.emit('onSliderMove', s, e);
	            e.preventDefault();
	            if (s.params.touchMoveStopPropagation && !s.params.nested) {
	                e.stopPropagation();
	            }
	        
	            if (!isMoved) {
	                if (params.loop) {
	                    s.fixLoop();
	                }
	                startTranslate = s.getWrapperTranslate();
	                s.setWrapperTransition(0);
	                if (s.animating) {
	                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
	                }
	                if (s.params.autoplay && s.autoplaying) {
	                    if (s.params.autoplayDisableOnInteraction) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        s.pauseAutoplay();
	                    }
	                }
	                allowMomentumBounce = false;
	                //Grab Cursor
	                if (s.params.grabCursor) {
	                    s.container[0].style.cursor = 'move';
	                    s.container[0].style.cursor = '-webkit-grabbing';
	                    s.container[0].style.cursor = '-moz-grabbin';
	                    s.container[0].style.cursor = 'grabbing';
	                }
	            }
	            isMoved = true;
	        
	            var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	            
	            diff = diff * s.params.touchRatio;
	            if (s.rtl) diff = -diff;
	        
	            s.swipeDirection = diff > 0 ? 'prev' : 'next';
	            currentTranslate = diff + startTranslate;
	        
	            var disableParentSwiper = true;
	            if ((diff > 0 && currentTranslate > s.minTranslate())) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
	            }
	            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
	            }
	        
	            if (disableParentSwiper) {
	                e.preventedByNestedSwiper = true;
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
	                currentTranslate = startTranslate;
	            }
	            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
	                currentTranslate = startTranslate;
	            }
	        
	            if (!s.params.followFinger) return;
	        
	            // Threshold
	            if (s.params.threshold > 0) {
	                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
	                    if (!allowThresholdMove) {
	                        allowThresholdMove = true;
	                        s.touches.startX = s.touches.currentX;
	                        s.touches.startY = s.touches.currentY;
	                        currentTranslate = startTranslate;
	                        s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	                        return;
	                    }
	                }
	                else {
	                    currentTranslate = startTranslate;
	                    return;
	                }
	            }
	            // Update active index in free mode
	            if (s.params.freeMode || s.params.watchSlidesProgress) {
	                s.updateActiveIndex();
	            }
	            if (s.params.freeMode) {
	                //Velocity
	                if (velocities.length === 0) {
	                    velocities.push({
	                        position: s.touches[isH() ? 'startX' : 'startY'],
	                        time: touchStartTime
	                    });
	                }
	                velocities.push({
	                    position: s.touches[isH() ? 'currentX' : 'currentY'],
	                    time: (new window.Date()).getTime()
	                });
	            }
	            // Update progress
	            s.updateProgress(currentTranslate);
	            // Update translate
	            s.setWrapperTranslate(currentTranslate);
	        };
	        s.onTouchEnd = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            s.emit('onTouchEnd', s, e);
	            if (!isTouched) return;
	            //Return Grab Cursor
	            if (s.params.grabCursor && isMoved && isTouched) {
	                s.container[0].style.cursor = 'move';
	                s.container[0].style.cursor = '-webkit-grab';
	                s.container[0].style.cursor = '-moz-grab';
	                s.container[0].style.cursor = 'grab';
	            }
	        
	            // Time diff
	            var touchEndTime = Date.now();
	            var timeDiff = touchEndTime - touchStartTime;
	        
	            // Tap, doubleTap, Click
	            if (s.allowClick) {
	                s.updateClickedSlide(e);
	                s.emit('onTap', s, e);
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    clickTimeout = setTimeout(function () {
	                        if (!s) return;
	                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
	                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
	                        }
	                        s.emit('onClick', s, e);
	                    }, 300);
	        
	                }
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    s.emit('onDoubleTap', s, e);
	                }
	            }
	        
	            lastClickTime = Date.now();
	            setTimeout(function () {
	                if (s) s.allowClick = true;
	            }, 0);
	        
	            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
	                isTouched = isMoved = false;
	                return;
	            }
	            isTouched = isMoved = false;
	        
	            var currentPos;
	            if (s.params.followFinger) {
	                currentPos = s.rtl ? s.translate : -s.translate;
	            }
	            else {
	                currentPos = -currentTranslate;
	            }
	            if (s.params.freeMode) {
	                if (currentPos < -s.minTranslate()) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                else if (currentPos > -s.maxTranslate()) {
	                    if (s.slides.length < s.snapGrid.length) {
	                        s.slideTo(s.snapGrid.length - 1);
	                    }
	                    else {
	                        s.slideTo(s.slides.length - 1);
	                    }
	                    return;
	                }
	        
	                if (s.params.freeModeMomentum) {
	                    if (velocities.length > 1) {
	                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
	        
	                        var distance = lastMoveEvent.position - velocityEvent.position;
	                        var time = lastMoveEvent.time - velocityEvent.time;
	                        s.velocity = distance / time;
	                        s.velocity = s.velocity / 2;
	                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
	                            s.velocity = 0;
	                        }
	                        // this implies that the user stopped moving a finger then released.
	                        // There would be no events with distance zero, so the last event is stale.
	                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
	                            s.velocity = 0;
	                        }
	                    } else {
	                        s.velocity = 0;
	                    }
	        
	                    velocities.length = 0;
	                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
	                    var momentumDistance = s.velocity * momentumDuration;
	        
	                    var newPosition = s.translate + momentumDistance;
	                    if (s.rtl) newPosition = - newPosition;
	                    var doBounce = false;
	                    var afterBouncePosition;
	                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
	                    if (newPosition < s.maxTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition + s.maxTranslate() < -bounceAmount) {
	                                newPosition = s.maxTranslate() - bounceAmount;
	                            }
	                            afterBouncePosition = s.maxTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.maxTranslate();
	                        }
	                    }
	                    else if (newPosition > s.minTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition - s.minTranslate() > bounceAmount) {
	                                newPosition = s.minTranslate() + bounceAmount;
	                            }
	                            afterBouncePosition = s.minTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.minTranslate();
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        var j = 0,
	                            nextSlide;
	                        for (j = 0; j < s.snapGrid.length; j += 1) {
	                            if (s.snapGrid[j] > -newPosition) {
	                                nextSlide = j;
	                                break;
	                            }
	        
	                        }
	                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
	                            newPosition = s.snapGrid[nextSlide];
	                        } else {
	                            newPosition = s.snapGrid[nextSlide - 1];
	                        }
	                        if (!s.rtl) newPosition = - newPosition;
	                    }
	                    //Fix duration
	                    if (s.velocity !== 0) {
	                        if (s.rtl) {
	                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
	                        }
	                        else {
	                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        s.slideReset();
	                        return;
	                    }
	        
	                    if (s.params.freeModeMomentumBounce && doBounce) {
	                        s.updateProgress(afterBouncePosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        s.animating = true;
	                        s.wrapper.transitionEnd(function () {
	                            if (!s || !allowMomentumBounce) return;
	                            s.emit('onMomentumBounce', s);
	        
	                            s.setWrapperTransition(s.params.speed);
	                            s.setWrapperTranslate(afterBouncePosition);
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        });
	                    } else if (s.velocity) {
	                        s.updateProgress(newPosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        if (!s.animating) {
	                            s.animating = true;
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        }
	        
	                    } else {
	                        s.updateProgress(newPosition);
	                    }
	        
	                    s.updateActiveIndex();
	                }
	                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
	                    s.updateProgress();
	                    s.updateActiveIndex();
	                }
	                return;
	            }
	        
	            // Find current slide
	            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
	            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
	                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
	                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
	                    }
	                }
	                else {
	                    if (currentPos >= s.slidesGrid[i]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
	                    }
	                }
	            }
	        
	            // Find current slide size
	            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
	        
	            if (timeDiff > s.params.longSwipesMs) {
	                // Long touches
	                if (!s.params.longSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	                }
	            }
	            else {
	                // Short swipes
	                if (!s.params.shortSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    s.slideTo(stopIndex + s.params.slidesPerGroup);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    s.slideTo(stopIndex);
	                }
	            }
	        };
	        /*=========================
	          Transitions
	          ===========================*/
	        s._slideTo = function (slideIndex, speed) {
	            return s.slideTo(slideIndex, speed, true, true);
	        };
	        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (typeof slideIndex === 'undefined') slideIndex = 0;
	            if (slideIndex < 0) slideIndex = 0;
	            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
	            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
	        
	            var translate = - s.snapGrid[s.snapIndex];
	        
	            // Stop autoplay
	            if (s.params.autoplay && s.autoplaying) {
	                if (internal || !s.params.autoplayDisableOnInteraction) {
	                    s.pauseAutoplay(speed);
	                }
	                else {
	                    s.stopAutoplay();
	                }
	            }
	            // Update progress
	            s.updateProgress(translate);
	        
	            // Normalize slideIndex
	            for (var i = 0; i < s.slidesGrid.length; i++) {
	                if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
	                    slideIndex = i;
	                }
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
	                if ((s.activeIndex || 0) !== slideIndex ) return false;
	            }
	        
	            // Update Index
	            if (typeof speed === 'undefined') speed = s.params.speed;
	            s.previousIndex = s.activeIndex || 0;
	            s.activeIndex = slideIndex;
	        
	            if (translate === s.translate) {
	                s.updateClasses();
	                return false;
	            }
	            s.updateClasses();
	            s.onTransitionStart(runCallbacks);
	            var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
	            if (speed === 0) {
	                s.setWrapperTransition(0);
	                s.setWrapperTranslate(translate);
	                s.onTransitionEnd(runCallbacks);
	            }
	            else {
	                s.setWrapperTransition(speed);
	                s.setWrapperTranslate(translate);
	                if (!s.animating) {
	                    s.animating = true;
	                    s.wrapper.transitionEnd(function () {
	                        if (!s) return;
	                        s.onTransitionEnd(runCallbacks);
	                    });
	                }
	        
	            }
	        
	            return true;
	        };
	        
	        s.onTransitionStart = function (runCallbacks) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.lazy) s.lazy.onTransitionStart();
	            if (runCallbacks) {
	                s.emit('onTransitionStart', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeStart', s);
	                }
	            }
	        };
	        s.onTransitionEnd = function (runCallbacks) {
	            s.animating = false;
	            s.setWrapperTransition(0);
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.lazy) s.lazy.onTransitionEnd();
	            if (runCallbacks) {
	                s.emit('onTransitionEnd', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeEnd', s);
	                }
	            }
	            if (s.params.hashnav && s.hashnav) {
	                s.hashnav.setHash();
	            }
	        
	        };
	        s.slideNext = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	        };
	        s._slideNext = function (speed) {
	            return s.slideNext(true, speed, true);
	        };
	        s.slidePrev = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	        };
	        s._slidePrev = function (speed) {
	            return s.slidePrev(true, speed, true);
	        };
	        s.slideReset = function (runCallbacks, speed, internal) {
	            return s.slideTo(s.activeIndex, speed, runCallbacks);
	        };
	        
	        /*=========================
	          Translate/transition helpers
	          ===========================*/
	        s.setWrapperTransition = function (duration, byController) {
	            s.wrapper.transition(duration);
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTransition(duration);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTransition(duration);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTransition(duration);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTransition(duration, byController);
	            }
	            s.emit('onSetTransition', s, duration);
	        };
	        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
	            var x = 0, y = 0, z = 0;
	            if (isH()) {
	                x = s.rtl ? -translate : translate;
	            }
	            else {
	                y = translate;
	            }
	        
	            if (s.params.roundLengths) {
	                x = round(x);
	                y = round(y);
	            }
	        
	            if (!s.params.virtualTranslate) {
	                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
	                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
	            }
	        
	            s.translate = isH() ? x : y;
	        
	            if (updateActiveIndex) s.updateActiveIndex();
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTranslate(s.translate);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTranslate(s.translate);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTranslate(s.translate);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTranslate(s.translate, byController);
	            }
	            s.emit('onSetTranslate', s, s.translate);
	        };
	        
	        s.getTranslate = function (el, axis) {
	            var matrix, curTransform, curStyle, transformMatrix;
	        
	            // automatic axis detection
	            if (typeof axis === 'undefined') {
	                axis = 'x';
	            }
	        
	            if (s.params.virtualTranslate) {
	                return s.rtl ? -s.translate : s.translate;
	            }
	        
	            curStyle = window.getComputedStyle(el, null);
	            if (window.WebKitCSSMatrix) {
	                curTransform = curStyle.transform || curStyle.webkitTransform;
	                if (curTransform.split(',').length > 6) {
	                    curTransform = curTransform.split(', ').map(function(a){
	                        return a.replace(',','.');
	                    }).join(', ');
	                }
	                // Some old versions of Webkit choke when 'none' is passed; pass
	                // empty string instead in this case
	                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	            }
	            else {
	                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	                matrix = transformMatrix.toString().split(',');
	            }
	        
	            if (axis === 'x') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m41;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[12]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[4]);
	            }
	            if (axis === 'y') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m42;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[13]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[5]);
	            }
	            if (s.rtl && curTransform) curTransform = -curTransform;
	            return curTransform || 0;
	        };
	        s.getWrapperTranslate = function (axis) {
	            if (typeof axis === 'undefined') {
	                axis = isH() ? 'x' : 'y';
	            }
	            return s.getTranslate(s.wrapper[0], axis);
	        };
	        
	        /*=========================
	          Observer
	          ===========================*/
	        s.observers = [];
	        function initObserver(target, options) {
	            options = options || {};
	            // create an observer instance
	            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
	            var observer = new ObserverFunc(function (mutations) {
	                mutations.forEach(function (mutation) {
	                    s.onResize(true);
	                    s.emit('onObserverUpdate', s, mutation);
	                });
	            });
	        
	            observer.observe(target, {
	                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
	                childList: typeof options.childList === 'undefined' ? true : options.childList,
	                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
	            });
	        
	            s.observers.push(observer);
	        }
	        s.initObservers = function () {
	            if (s.params.observeParents) {
	                var containerParents = s.container.parents();
	                for (var i = 0; i < containerParents.length; i++) {
	                    initObserver(containerParents[i]);
	                }
	            }
	        
	            // Observe container
	            initObserver(s.container[0], {childList: false});
	        
	            // Observe wrapper
	            initObserver(s.wrapper[0], {attributes: false});
	        };
	        s.disconnectObservers = function () {
	            for (var i = 0; i < s.observers.length; i++) {
	                s.observers[i].disconnect();
	            }
	            s.observers = [];
	        };
	        /*=========================
	          Loop
	          ===========================*/
	        // Create looped slides
	        s.createLoop = function () {
	            // Remove duplicated slides
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	        
	            var slides = s.wrapper.children('.' + s.params.slideClass);
	        
	            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
	        
	            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
	            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
	            if (s.loopedSlides > slides.length) {
	                s.loopedSlides = slides.length;
	            }
	        
	            var prependSlides = [], appendSlides = [], i;
	            slides.each(function (index, el) {
	                var slide = $(this);
	                if (index < s.loopedSlides) appendSlides.push(el);
	                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
	                slide.attr('data-swiper-slide-index', index);
	            });
	            for (i = 0; i < appendSlides.length; i++) {
	                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	            for (i = prependSlides.length - 1; i >= 0; i--) {
	                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	        };
	        s.destroyLoop = function () {
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	            s.slides.removeAttr('data-swiper-slide-index');
	        };
	        s.fixLoop = function () {
	            var newIndex;
	            //Fix For Negative Oversliding
	            if (s.activeIndex < s.loopedSlides) {
	                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	            //Fix For Positive Oversliding
	            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
	                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	        };
	        /*=========================
	          Append/Prepend/Remove Slides
	          ===========================*/
	        s.appendSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.append(slides[i]);
	                }
	            }
	            else {
	                s.wrapper.append(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	        };
	        s.prependSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            var newActiveIndex = s.activeIndex + 1;
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.prepend(slides[i]);
	                }
	                newActiveIndex = s.activeIndex + slides.length;
	            }
	            else {
	                s.wrapper.prepend(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            s.slideTo(newActiveIndex, 0, false);
	        };
	        s.removeSlide = function (slidesIndexes) {
	            if (s.params.loop) {
	                s.destroyLoop();
	                s.slides = s.wrapper.children('.' + s.params.slideClass);
	            }
	            var newActiveIndex = s.activeIndex,
	                indexToRemove;
	            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
	                for (var i = 0; i < slidesIndexes.length; i++) {
	                    indexToRemove = slidesIndexes[i];
	                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                    if (indexToRemove < newActiveIndex) newActiveIndex--;
	                }
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	            else {
	                indexToRemove = slidesIndexes;
	                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                if (indexToRemove < newActiveIndex) newActiveIndex--;
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	        
	            if (s.params.loop) {
	                s.createLoop();
	            }
	        
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            if (s.params.loop) {
	                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
	            }
	            else {
	                s.slideTo(newActiveIndex, 0, false);
	            }
	        
	        };
	        s.removeAllSlides = function () {
	            var slidesIndexes = [];
	            for (var i = 0; i < s.slides.length; i++) {
	                slidesIndexes.push(i);
	            }
	            s.removeSlide(slidesIndexes);
	        };
	        
	
	        /*=========================
	          Effects
	          ===========================*/
	        s.effects = {
	            fade: {
	                setTranslate: function () {
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var offset = slide[0].swiperSlideOffset;
	                        var tx = -offset;
	                        if (!s.params.virtualTranslate) tx = tx - s.translate;
	                        var ty = 0;
	                        if (!isH()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	                        var slideOpacity = s.params.fade.crossFade ?
	                                Math.max(1 - Math.abs(slide[0].progress), 0) :
	                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
	                        slide
	                            .css({
	                                opacity: slideOpacity
	                            })
	                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
	        
	                    }
	        
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration);
	                    if (s.params.virtualTranslate && duration !== 0) {
	                        var eventTriggered = false;
	                        s.slides.transitionEnd(function () {
	                            if (eventTriggered) return;
	                            if (!s) return;
	                            eventTriggered = true;
	                            s.animating = false;
	                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                            for (var i = 0; i < triggerEvents.length; i++) {
	                                s.wrapper.trigger(triggerEvents[i]);
	                            }
	                        });
	                    }
	                }
	            },
	            cube: {
	                setTranslate: function () {
	                    var wrapperRotate = 0, cubeShadow;
	                    if (s.params.cube.shadow) {
	                        if (isH()) {
	                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.wrapper.append(cubeShadow);
	                            }
	                            cubeShadow.css({height: s.width + 'px'});
	                        }
	                        else {
	                            cubeShadow = s.container.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.container.append(cubeShadow);
	                            }
	                        }
	                    }
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideAngle = i * 90;
	                        var round = Math.floor(slideAngle / 360);
	                        if (s.rtl) {
	                            slideAngle = -slideAngle;
	                            round = Math.floor(-slideAngle / 360);
	                        }
	                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                        var tx = 0, ty = 0, tz = 0;
	                        if (i % 4 === 0) {
	                            tx = - round * 4 * s.size;
	                            tz = 0;
	                        }
	                        else if ((i - 1) % 4 === 0) {
	                            tx = 0;
	                            tz = - round * 4 * s.size;
	                        }
	                        else if ((i - 2) % 4 === 0) {
	                            tx = s.size + round * 4 * s.size;
	                            tz = s.size;
	                        }
	                        else if ((i - 3) % 4 === 0) {
	                            tx = - s.size;
	                            tz = 3 * s.size + s.size * 4 * round;
	                        }
	                        if (s.rtl) {
	                            tx = -tx;
	                        }
	                        
	                        if (!isH()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	                        
	                        var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
	                        if (progress <= 1 && progress > -1) {
	                            wrapperRotate = i * 90 + progress * 90;
	                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
	                        }
	                        slide.transform(transform);
	                        if (s.params.cube.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            var shadowOpacity = slide[0].progress;
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress;
	                        }
	                    }
	                    s.wrapper.css({
	                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
	                    });
	                        
	                    if (s.params.cube.shadow) {
	                        if (isH()) {
	                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
	                        }
	                        else {
	                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
	                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
	                            var scale1 = s.params.cube.shadowScale,
	                                scale2 = s.params.cube.shadowScale / multiplier,
	                                offset = s.params.cube.shadowOffset;
	                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
	                        }
	                    }
	                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
	                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate : 0) + 'deg)');
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                    if (s.params.cube.shadow && !isH()) {
	                        s.container.find('.swiper-cube-shadow').transition(duration);
	                    }
	                }
	            },
	            coverflow: {
	                setTranslate: function () {
	                    var transform = s.translate;
	                    var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
	                    var rotate = isH() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
	                    var translate = s.params.coverflow.depth;
	                    //Each slide offset from center
	                    for (var i = 0, length = s.slides.length; i < length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideSize = s.slidesSizesGrid[i];
	                        var slideOffset = slide[0].swiperSlideOffset;
	                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
	        
	                        var rotateY = isH() ? rotate * offsetMultiplier : 0;
	                        var rotateX = isH() ? 0 : rotate * offsetMultiplier;
	                        // var rotateZ = 0
	                        var translateZ = -translate * Math.abs(offsetMultiplier);
	        
	                        var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
	                        var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
	        
	                        //Fix for ultra small values
	                        if (Math.abs(translateX) < 0.001) translateX = 0;
	                        if (Math.abs(translateY) < 0.001) translateY = 0;
	                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
	                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
	                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
	        
	                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
	        
	                        slide.transform(slideTransform);
	                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
	                        if (s.params.coverflow.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
	                        }
	                    }
	        
	                    //Set correct perspective for IE10
	                    if (s.browser.ie) {
	                        var ws = s.wrapper[0].style;
	                        ws.perspectiveOrigin = center + 'px 50%';
	                    }
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                }
	            }
	        };
	
	        /*=========================
	          Images Lazy Loading
	          ===========================*/
	        s.lazy = {
	            initialImageLoaded: false,
	            loadImageInSlide: function (index, loadInDuplicate) {
	                if (typeof index === 'undefined') return;
	                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
	                if (s.slides.length === 0) return;
	                
	                var slide = s.slides.eq(index);
	                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
	                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
	                    img = img.add(slide[0]);
	                }
	                if (img.length === 0) return;
	        
	                img.each(function () {
	                    var _img = $(this);
	                    _img.addClass('swiper-lazy-loading');
	                    var background = _img.attr('data-background');
	                    var src = _img.attr('data-src'),
	                        srcset = _img.attr('data-srcset');
	                    s.loadImage(_img[0], (src || background), srcset, false, function () {
	                        if (background) {
	                            _img.css('background-image', 'url(' + background + ')');
	                            _img.removeAttr('data-background');
	                        }
	                        else {
	                            if (srcset) {
	                                _img.attr('srcset', srcset);
	                                _img.removeAttr('data-srcset');    
	                            }
	                            if (src) {
	                                _img.attr('src', src);    
	                                _img.removeAttr('data-src');
	                            }
	                            
	                        }
	                            
	                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
	                        slide.find('.swiper-lazy-preloader, .preloader').remove();
	                        if (s.params.loop && loadInDuplicate) {
	                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
	                            if (slide.hasClass(s.params.slideDuplicateClass)) {
	                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
	                                s.lazy.loadImageInSlide(originalSlide.index(), false);
	                            }
	                            else {
	                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
	                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
	                            }
	                        }
	                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
	                    });
	                    
	                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
	                });
	                    
	            },
	            load: function () {
	                var i;
	                if (s.params.watchSlidesVisibility) {
	                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
	                        s.lazy.loadImageInSlide($(this).index());
	                    });
	                }
	                else {
	                    if (s.params.slidesPerView > 1) {
	                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        s.lazy.loadImageInSlide(s.activeIndex);    
	                    }
	                }
	                if (s.params.lazyLoadingInPrevNext) {
	                    if (s.params.slidesPerView > 1) {
	                        // Next Slides
	                        for (i = s.activeIndex + s.params.slidesPerView; i < s.activeIndex + s.params.slidesPerView + s.params.slidesPerView; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                        // Prev Slides
	                        for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
	                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
	        
	                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
	                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
	                    }
	                }
	            },
	            onTransitionStart: function () {
	                if (s.params.lazyLoading) {
	                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
	                        s.lazy.load();
	                    }
	                }
	            },
	            onTransitionEnd: function () {
	                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
	                    s.lazy.load();
	                }
	            }
	        };
	        
	
	        /*=========================
	          Scrollbar
	          ===========================*/
	        s.scrollbar = {
	            isTouched: false,
	            setDragPosition: function (e) {
	                var sb = s.scrollbar;
	                var x = 0, y = 0;
	                var translate;
	                var pointerPosition = isH() ? 
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
	                var position = (pointerPosition) - sb.track.offset()[isH() ? 'left' : 'top'] - sb.dragSize / 2;
	                var positionMin = -s.minTranslate() * sb.moveDivider;
	                var positionMax = -s.maxTranslate() * sb.moveDivider;
	                if (position < positionMin) {
	                    position = positionMin;
	                }
	                else if (position > positionMax) {
	                    position = positionMax;
	                }
	                position = -position / sb.moveDivider;
	                s.updateProgress(position);
	                s.setWrapperTranslate(position, true);
	            },
	            dragStart: function (e) {
	                var sb = s.scrollbar;
	                sb.isTouched = true;
	                e.preventDefault();
	                e.stopPropagation();
	        
	                sb.setDragPosition(e);
	                clearTimeout(sb.dragTimeout);
	        
	                sb.track.transition(0);
	                if (s.params.scrollbarHide) {
	                    sb.track.css('opacity', 1);
	                }
	                s.wrapper.transition(100);
	                sb.drag.transition(100);
	                s.emit('onScrollbarDragStart', s);
	            },
	            dragMove: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                if (e.preventDefault) e.preventDefault();
	                else e.returnValue = false;
	                sb.setDragPosition(e);
	                s.wrapper.transition(0);
	                sb.track.transition(0);
	                sb.drag.transition(0);
	                s.emit('onScrollbarDragMove', s);
	            },
	            dragEnd: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                sb.isTouched = false;
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.dragTimeout);
	                    sb.dragTimeout = setTimeout(function () {
	                        sb.track.css('opacity', 0);
	                        sb.track.transition(400);
	                    }, 1000);
	        
	                }
	                s.emit('onScrollbarDragEnd', s);
	                if (s.params.scrollbarSnapOnRelease) {
	                    s.slideReset();
	                }
	            },
	            enableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).on(s.touchEvents.start, sb.dragStart);
	                $(target).on(s.touchEvents.move, sb.dragMove);
	                $(target).on(s.touchEvents.end, sb.dragEnd);
	            },
	            disableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).off(s.touchEvents.start, sb.dragStart);
	                $(target).off(s.touchEvents.move, sb.dragMove);
	                $(target).off(s.touchEvents.end, sb.dragEnd);
	            },
	            set: function () {
	                if (!s.params.scrollbar) return;
	                var sb = s.scrollbar;
	                sb.track = $(s.params.scrollbar);
	                sb.drag = sb.track.find('.swiper-scrollbar-drag');
	                if (sb.drag.length === 0) {
	                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
	                    sb.track.append(sb.drag);
	                }
	                sb.drag[0].style.width = '';
	                sb.drag[0].style.height = '';
	                sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
	                
	                sb.divider = s.size / s.virtualSize;
	                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
	                sb.dragSize = sb.trackSize * sb.divider;
	        
	                if (isH()) {
	                    sb.drag[0].style.width = sb.dragSize + 'px';
	                }
	                else {
	                    sb.drag[0].style.height = sb.dragSize + 'px';
	                }
	        
	                if (sb.divider >= 1) {
	                    sb.track[0].style.display = 'none';
	                }
	                else {
	                    sb.track[0].style.display = '';
	                }
	                if (s.params.scrollbarHide) {
	                    sb.track[0].style.opacity = 0;
	                }
	            },
	            setTranslate: function () {
	                if (!s.params.scrollbar) return;
	                var diff;
	                var sb = s.scrollbar;
	                var translate = s.translate || 0;
	                var newPos;
	                
	                var newSize = sb.dragSize;
	                newPos = (sb.trackSize - sb.dragSize) * s.progress;
	                if (s.rtl && isH()) {
	                    newPos = -newPos;
	                    if (newPos > 0) {
	                        newSize = sb.dragSize - newPos;
	                        newPos = 0;
	                    }
	                    else if (-newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize + newPos;
	                    }
	                }
	                else {
	                    if (newPos < 0) {
	                        newSize = sb.dragSize + newPos;
	                        newPos = 0;
	                    }
	                    else if (newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize - newPos;
	                    }
	                }
	                if (isH()) {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateX(' + (newPos) + 'px)');   
	                    }
	                    sb.drag[0].style.width = newSize + 'px';
	                }
	                else {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateY(' + (newPos) + 'px)');   
	                    }
	                    sb.drag[0].style.height = newSize + 'px';
	                }
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.timeout);
	                    sb.track[0].style.opacity = 1;
	                    sb.timeout = setTimeout(function () {
	                        sb.track[0].style.opacity = 0;
	                        sb.track.transition(400);
	                    }, 1000);
	                }
	            },
	            setTransition: function (duration) {
	                if (!s.params.scrollbar) return;
	                s.scrollbar.drag.transition(duration);
	            }
	        };
	
	        /*=========================
	          Controller
	          ===========================*/
	        s.controller = {
	            LinearSpline: function (x, y) {
	                this.x = x;
	                this.y = y;
	                this.lastIndex = x.length - 1;
	                // Given an x value (x2), return the expected y2 value:
	                // (x1,y1) is the known point before given value,
	                // (x3,y3) is the known point after given value.
	                var i1, i3;
	                var l = this.x.length;
	        
	                this.interpolate = function (x2) {
	                    if (!x2) return 0;
	        
	                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
	                    i3 = binarySearch(this.x, x2);
	                    i1 = i3 - 1;
	        
	                    // We have our indexes i1 & i3, so we can calculate already:
	                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
	                };
	        
	                var binarySearch = (function() {
	                    var maxIndex, minIndex, guess;
	                    return function(array, val) {
	                        minIndex = -1;
	                        maxIndex = array.length;
	                        while (maxIndex - minIndex > 1)
	                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
	                                minIndex = guess;
	                            } else {
	                                maxIndex = guess;
	                            }
	                        return maxIndex;
	                    };
	                })();
	            },
	            //xxx: for now i will just save one spline function to to 
	            getInterpolateFunction: function(c){
	                if(!s.controller.spline) s.controller.spline = s.params.loop ? 
	                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
	                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
	            },
	            setTranslate: function (translate, byController) {
	               var controlled = s.params.control;
	               var multiplier, controlledTranslate;
	               function setControlledTranslate(c) {
	                    // this will create an Interpolate function based on the snapGrids
	                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
	                    // it makes sense to create this only once and recall it for the interpolation
	                    // the function does a lot of value caching for performance 
	                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
	                    if (s.params.controlBy === 'slide') {
	                        s.controller.getInterpolateFunction(c);
	                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
	                        // but it did not work out
	                        controlledTranslate = -s.controller.spline.interpolate(-translate);
	                    }
	                        
	                    if(!controlledTranslate || s.params.controlBy === 'container'){
	                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
	                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
	                    }
	                   
	                    if (s.params.controlInverse) {
	                        controlledTranslate = c.maxTranslate() - controlledTranslate;
	                    }
	                    c.updateProgress(controlledTranslate);
	                    c.setWrapperTranslate(controlledTranslate, false, s);
	                    c.updateActiveIndex();
	               }
	               if (s.isArray(controlled)) {
	                   for (var i = 0; i < controlled.length; i++) {
	                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                           setControlledTranslate(controlled[i]);
	                       }
	                   }
	               }
	               else if (controlled instanceof Swiper && byController !== controlled) {
	        
	                   setControlledTranslate(controlled);
	               }
	            },
	            setTransition: function (duration, byController) {
	                var controlled = s.params.control;
	                var i;
	                function setControlledTransition(c) {
	                    c.setWrapperTransition(duration, s);
	                    if (duration !== 0) {
	                        c.onTransitionStart();
	                        c.wrapper.transitionEnd(function(){
	                            if (!controlled) return;
	                            if (c.params.loop && s.params.controlBy === 'slide') {
	                                c.fixLoop();
	                            }
	                            c.onTransitionEnd();
	                            
	                        });
	                    }
	                }
	                if (s.isArray(controlled)) {
	                    for (i = 0; i < controlled.length; i++) {
	                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                            setControlledTransition(controlled[i]);
	                        }
	                    }
	                }
	                else if (controlled instanceof Swiper && byController !== controlled) {
	                    setControlledTransition(controlled);
	                }
	            }
	        };
	
	        /*=========================
	          Hash Navigation
	          ===========================*/
	        s.hashnav = {
	            init: function () {
	                if (!s.params.hashnav) return;
	                s.hashnav.initialized = true;
	                var hash = document.location.hash.replace('#', '');
	                if (!hash) return;
	                var speed = 0;
	                for (var i = 0, length = s.slides.length; i < length; i++) {
	                    var slide = s.slides.eq(i);
	                    var slideHash = slide.attr('data-hash');
	                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
	                        var index = slide.index();
	                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
	                    }
	                }
	            },
	            setHash: function () {
	                if (!s.hashnav.initialized || !s.params.hashnav) return;
	                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
	            }
	        };
	
	        /*=========================
	          Keyboard Control
	          ===========================*/
	        function handleKeyboard(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var kc = e.keyCode || e.charCode;
	            // Directions locks
	            if (!s.params.allowSwipeToNext && (isH() && kc === 39 || !isH() && kc === 40)) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && (isH() && kc === 37 || !isH() && kc === 38)) {
	                return false;
	            }
	            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
	                return;
	            }
	            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
	                return;
	            }
	            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
	                var inView = false;
	                //Check that swiper should be inside of visible area of window
	                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
	                    return;
	                }
	                var windowScroll = {
	                    left: window.pageXOffset,
	                    top: window.pageYOffset
	                };
	                var windowWidth = window.innerWidth;
	                var windowHeight = window.innerHeight;
	                var swiperOffset = s.container.offset();
	                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
	                var swiperCoord = [
	                    [swiperOffset.left, swiperOffset.top],
	                    [swiperOffset.left + s.width, swiperOffset.top],
	                    [swiperOffset.left, swiperOffset.top + s.height],
	                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
	                ];
	                for (var i = 0; i < swiperCoord.length; i++) {
	                    var point = swiperCoord[i];
	                    if (
	                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
	                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
	                    ) {
	                        inView = true;
	                    }
	        
	                }
	                if (!inView) return;
	            }
	            if (isH()) {
	                if (kc === 37 || kc === 39) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
	                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
	            }
	            else {
	                if (kc === 38 || kc === 40) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if (kc === 40) s.slideNext();
	                if (kc === 38) s.slidePrev();
	            }
	        }
	        s.disableKeyboardControl = function () {
	            $(document).off('keydown', handleKeyboard);
	        };
	        s.enableKeyboardControl = function () {
	            $(document).on('keydown', handleKeyboard);
	        };
	        
	
	        /*=========================
	          Mousewheel Control
	          ===========================*/
	        s.mousewheel = {
	            event: false,
	            lastScrollTime: (new window.Date()).getTime()
	        };
	        if (s.params.mousewheelControl) {
	            try {
	                new window.WheelEvent('wheel');
	                s.mousewheel.event = 'wheel';
	            } catch (e) {}
	        
	            if (!s.mousewheel.event && document.onmousewheel !== undefined) {
	                s.mousewheel.event = 'mousewheel';
	            }
	            if (!s.mousewheel.event) {
	                s.mousewheel.event = 'DOMMouseScroll';
	            }
	        }
	        function handleMousewheel(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var we = s.mousewheel.event;
	            var delta = 0;
	            //Opera & IE
	            if (e.detail) delta = -e.detail;
	            //WebKits
	            else if (we === 'mousewheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (isH()) {
	                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = e.wheelDelta;
	                }
	            }
	            //Old FireFox
	            else if (we === 'DOMMouseScroll') delta = -e.detail;
	            //New FireFox
	            else if (we === 'wheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (isH()) {
	                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX : - e.deltaY;
	                }
	            }
	        
	            if (s.params.mousewheelInvert) delta = -delta;
	        
	            if (!s.params.freeMode) {
	                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
	                    if (delta < 0) {
	                        if ((!s.isEnd || s.params.loop) && !s.animating) s.slideNext();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                    else {
	                        if ((!s.isBeginning || s.params.loop) && !s.animating) s.slidePrev();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                }
	                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
	        
	            }
	            else {
	                //Freemode or scrollContainer:
	                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
	        
	                if (position > s.minTranslate()) {
	                    position = s.minTranslate();
	                }
	                if (position < s.maxTranslate()) position = s.maxTranslate();
	        
	                s.setWrapperTransition(0);
	                s.setWrapperTranslate(position);
	                s.updateProgress();
	                s.updateActiveIndex();
	        
	                if (s.params.freeModeSticky) {
	                    clearTimeout(s.mousewheel.timeout);
	                    s.mousewheel.timeout = setTimeout(function () {
	                        s.slideReset();
	                    }, 300);
	                }
	        
	                // Return page scroll on edge positions
	                if (position === 0 || position === s.maxTranslate()) return;
	            }
	            if (s.params.autoplay) s.stopAutoplay();
	        
	            if (e.preventDefault) e.preventDefault();
	            else e.returnValue = false;
	            return false;
	        }
	        s.disableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.off(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	        
	        s.enableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.on(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	
	        /*=========================
	          Parallax
	          ===========================*/
	        function setParallaxTransform(el, progress) {
	            el = $(el);
	            var p, pX, pY;
	            
	            p = el.attr('data-swiper-parallax') || '0';
	            pX = el.attr('data-swiper-parallax-x');
	            pY = el.attr('data-swiper-parallax-y');
	            if (pX || pY) {
	                pX = pX || '0';
	                pY = pY || '0';
	            }
	            else {
	                if (isH()) {
	                    pX = p;
	                    pY = '0';
	                }
	                else {
	                    pY = p;
	                    pX = '0';
	                }
	            }
	            if ((pX).indexOf('%') >= 0) {
	                pX = parseInt(pX, 10) * progress + '%';
	            }
	            else {
	                pX = pX * progress + 'px' ;
	            }
	            if ((pY).indexOf('%') >= 0) {
	                pY = parseInt(pY, 10) * progress + '%';
	            }
	            else {
	                pY = pY * progress + 'px' ;
	            }
	            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
	        }   
	        s.parallax = {
	            setTranslate: function () {
	                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    setParallaxTransform(this, s.progress);
	                    
	                });
	                s.slides.each(function () {
	                    var slide = $(this);
	                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
	                        setParallaxTransform(this, progress);
	                    });
	                });
	            },
	            setTransition: function (duration) {
	                if (typeof duration === 'undefined') duration = s.params.speed;
	                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    var el = $(this);
	                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
	                    if (duration === 0) parallaxDuration = 0;
	                    el.transition(parallaxDuration);
	                });
	            }
	        };
	        
	
	        /*=========================
	          Plugins API. Collect all and init all plugins
	          ===========================*/
	        s._plugins = [];
	        for (var plugin in s.plugins) {
	            var p = s.plugins[plugin](s, s.params[plugin]);
	            if (p) s._plugins.push(p);
	        }
	        // Method to call all plugins event/method
	        s.callPlugins = function (eventName) {
	            for (var i = 0; i < s._plugins.length; i++) {
	                if (eventName in s._plugins[i]) {
	                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	        };
	
	        /*=========================
	          Events/Callbacks/Plugins Emitter
	          ===========================*/
	        function normalizeEventName (eventName) {
	            if (eventName.indexOf('on') !== 0) {
	                if (eventName[0] !== eventName[0].toUpperCase()) {
	                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
	                }
	                else {
	                    eventName = 'on' + eventName;
	                }
	            }
	            return eventName;
	        }
	        s.emitterEventListeners = {
	        
	        };
	        s.emit = function (eventName) {
	            // Trigger callbacks
	            if (s.params[eventName]) {
	                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	            var i;
	            // Trigger events
	            if (s.emitterEventListeners[eventName]) {
	                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	            // Trigger plugins
	            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        };
	        s.on = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
	            s.emitterEventListeners[eventName].push(handler);
	            return s;
	        };
	        s.off = function (eventName, handler) {
	            var i;
	            eventName = normalizeEventName(eventName);
	            if (typeof handler === 'undefined') {
	                // Remove all handlers for such event
	                s.emitterEventListeners[eventName] = [];
	                return s;
	            }
	            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
	            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
	            }
	            return s;
	        };
	        s.once = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            var _handler = function () {
	                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
	                s.off(eventName, _handler);
	            };
	            s.on(eventName, _handler);
	            return s;
	        };
	
	        // Accessibility tools
	        s.a11y = {
	            makeFocusable: function ($el) {
	                $el.attr('tabIndex', '0');
	                return $el;
	            },
	            addRole: function ($el, role) {
	                $el.attr('role', role);
	                return $el;
	            },
	        
	            addLabel: function ($el, label) {
	                $el.attr('aria-label', label);
	                return $el;
	            },
	        
	            disable: function ($el) {
	                $el.attr('aria-disabled', true);
	                return $el;
	            },
	        
	            enable: function ($el) {
	                $el.attr('aria-disabled', false);
	                return $el;
	            },
	        
	            onEnterKey: function (event) {
	                if (event.keyCode !== 13) return;
	                if ($(event.target).is(s.params.nextButton)) {
	                    s.onClickNext(event);
	                    if (s.isEnd) {
	                        s.a11y.notify(s.params.lastSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.nextSlideMessage);
	                    }
	                }
	                else if ($(event.target).is(s.params.prevButton)) {
	                    s.onClickPrev(event);
	                    if (s.isBeginning) {
	                        s.a11y.notify(s.params.firstSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.prevSlideMessage);
	                    }
	                }
	                if ($(event.target).is('.' + s.params.bulletClass)) {
	                    $(event.target)[0].click();
	                }
	            },
	        
	            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
	        
	            notify: function (message) {
	                var notification = s.a11y.liveRegion;
	                if (notification.length === 0) return;
	                notification.html('');
	                notification.html(message);
	            },
	            init: function () {
	                // Setup accessibility
	                if (s.params.nextButton) {
	                    var nextButton = $(s.params.nextButton);
	                    s.a11y.makeFocusable(nextButton);
	                    s.a11y.addRole(nextButton, 'button');
	                    s.a11y.addLabel(nextButton, s.params.nextSlideMessage);
	                }
	                if (s.params.prevButton) {
	                    var prevButton = $(s.params.prevButton);
	                    s.a11y.makeFocusable(prevButton);
	                    s.a11y.addRole(prevButton, 'button');
	                    s.a11y.addLabel(prevButton, s.params.prevSlideMessage);
	                }
	        
	                $(s.container).append(s.a11y.liveRegion);
	            },
	            initPagination: function () {
	                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
	                    s.bullets.each(function () {
	                        var bullet = $(this);
	                        s.a11y.makeFocusable(bullet);
	                        s.a11y.addRole(bullet, 'button');
	                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
	                    });
	                }
	            },
	            destroy: function () {
	                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
	            }
	        };
	        
	
	        /*=========================
	          Init/Destroy
	          ===========================*/
	        s.init = function () {
	            if (s.params.loop) s.createLoop();
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.enableDraggable();
	                }
	            }
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                if (!s.params.loop) s.updateProgress();
	                s.effects[s.params.effect].setTranslate();
	            }
	            if (s.params.loop) {
	                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
	            }
	            else {
	                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
	                if (s.params.initialSlide === 0) {
	                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
	                    if (s.lazy && s.params.lazyLoading) {
	                        s.lazy.load();
	                        s.lazy.initialImageLoaded = true;
	                    }
	                }
	            }
	            s.attachEvents();
	            if (s.params.observer && s.support.observer) {
	                s.initObservers();
	            }
	            if (s.params.preloadImages && !s.params.lazyLoading) {
	                s.preloadImages();
	            }
	            if (s.params.autoplay) {
	                s.startAutoplay();
	            }
	            if (s.params.keyboardControl) {
	                if (s.enableKeyboardControl) s.enableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.enableMousewheelControl) s.enableMousewheelControl();
	            }
	            if (s.params.hashnav) {
	                if (s.hashnav) s.hashnav.init();
	            }
	            if (s.params.a11y && s.a11y) s.a11y.init();
	            s.emit('onInit', s);
	        };
	        
	        // Cleanup dynamic styles
	        s.cleanupStyles = function () {
	            // Container
	            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
	        
	            // Wrapper
	            s.wrapper.removeAttr('style');
	        
	            // Slides
	            if (s.slides && s.slides.length) {
	                s.slides
	                    .removeClass([
	                      s.params.slideVisibleClass,
	                      s.params.slideActiveClass,
	                      s.params.slideNextClass,
	                      s.params.slidePrevClass
	                    ].join(' '))
	                    .removeAttr('style')
	                    .removeAttr('data-swiper-column')
	                    .removeAttr('data-swiper-row');
	            }
	        
	            // Pagination/Bullets
	            if (s.paginationContainer && s.paginationContainer.length) {
	                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
	            }
	            if (s.bullets && s.bullets.length) {
	                s.bullets.removeClass(s.params.bulletActiveClass);
	            }
	        
	            // Buttons
	            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	        
	            // Scrollbar
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
	                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
	            }
	        };
	        
	        // Destroy
	        s.destroy = function (deleteInstance, cleanupStyles) {
	            // Detach evebts
	            s.detachEvents();
	            // Stop autoplay
	            s.stopAutoplay();
	            // Disable draggable
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.disableDraggable();
	                }
	            }
	            // Destroy loop
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            // Cleanup styles
	            if (cleanupStyles) {
	                s.cleanupStyles();
	            }
	            // Disconnect observer
	            s.disconnectObservers();
	            // Disable keyboard/mousewheel
	            if (s.params.keyboardControl) {
	                if (s.disableKeyboardControl) s.disableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.disableMousewheelControl) s.disableMousewheelControl();
	            }
	            // Disable a11y
	            if (s.params.a11y && s.a11y) s.a11y.destroy();
	            // Destroy callback
	            s.emit('onDestroy');
	            // Delete instance
	            if (deleteInstance !== false) s = null;
	        };
	        
	        s.init();
	        
	
	    
	        // Return swiper instance
	        return s;
	    };
	    
	
	    /*==================================================
	        Prototype
	    ====================================================*/
	    Swiper.prototype = {
	        isSafari: (function () {
	            var ua = navigator.userAgent.toLowerCase();
	            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
	        })(),
	        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
	        isArray: function (arr) {
	            return Object.prototype.toString.apply(arr) === '[object Array]';
	        },
	        /*==================================================
	        Browser
	        ====================================================*/
	        browser: {
	            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
	        },
	        /*==================================================
	        Devices
	        ====================================================*/
	        device: (function () {
	            var ua = navigator.userAgent;
	            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	            return {
	                ios: ipad || iphone || ipod,
	                android: android
	            };
	        })(),
	        /*==================================================
	        Feature Detection
	        ====================================================*/
	        support: {
	            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	            })(),
	    
	            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	                var div = document.createElement('div').style;
	                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	            })(),
	    
	            flexbox: (function () {
	                var div = document.createElement('div').style;
	                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
	                for (var i = 0; i < styles.length; i++) {
	                    if (styles[i] in div) return true;
	                }
	            })(),
	    
	            observer: (function () {
	                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
	            })()
	        },
	        /*==================================================
	        Plugins
	        ====================================================*/
	        plugins: {}
	    };
	    
	
	    /*===========================
	    Dom7 Library
	    ===========================*/
	    var Dom7 = (function () {
	        var Dom7 = function (arr) {
	            var _this = this, i = 0;
	            // Create array-like object
	            for (i = 0; i < arr.length; i++) {
	                _this[i] = arr[i];
	            }
	            _this.length = arr.length;
	            // Return collection with methods
	            return this;
	        };
	        var $ = function (selector, context) {
	            var arr = [], i = 0;
	            if (selector && !context) {
	                if (selector instanceof Dom7) {
	                    return selector;
	                }
	            }
	            if (selector) {
	                // String
	                if (typeof selector === 'string') {
	                    var els, tempParent, html = selector.trim();
	                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
	                        var toCreate = 'div';
	                        if (html.indexOf('<li') === 0) toCreate = 'ul';
	                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
	                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
	                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
	                        if (html.indexOf('<option') === 0) toCreate = 'select';
	                        tempParent = document.createElement(toCreate);
	                        tempParent.innerHTML = selector;
	                        for (i = 0; i < tempParent.childNodes.length; i++) {
	                            arr.push(tempParent.childNodes[i]);
	                        }
	                    }
	                    else {
	                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
	                            // Pure ID selector
	                            els = [document.getElementById(selector.split('#')[1])];
	                        }
	                        else {
	                            // Other selectors
	                            els = (context || document).querySelectorAll(selector);
	                        }
	                        for (i = 0; i < els.length; i++) {
	                            if (els[i]) arr.push(els[i]);
	                        }
	                    }
	                }
	                // Node/element
	                else if (selector.nodeType || selector === window || selector === document) {
	                    arr.push(selector);
	                }
	                //Array of elements or instance of Dom
	                else if (selector.length > 0 && selector[0].nodeType) {
	                    for (i = 0; i < selector.length; i++) {
	                        arr.push(selector[i]);
	                    }
	                }
	            }
	            return new Dom7(arr);
	        };
	        Dom7.prototype = {
	            // Classes and attriutes
	            addClass: function (className) {
	                if (typeof className === 'undefined') {
	                    return this;
	                }
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.add(classes[i]);
	                    }
	                }
	                return this;
	            },
	            removeClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.remove(classes[i]);
	                    }
	                }
	                return this;
	            },
	            hasClass: function (className) {
	                if (!this[0]) return false;
	                else return this[0].classList.contains(className);
	            },
	            toggleClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.toggle(classes[i]);
	                    }
	                }
	                return this;
	            },
	            attr: function (attrs, value) {
	                if (arguments.length === 1 && typeof attrs === 'string') {
	                    // Get attr
	                    if (this[0]) return this[0].getAttribute(attrs);
	                    else return undefined;
	                }
	                else {
	                    // Set attrs
	                    for (var i = 0; i < this.length; i++) {
	                        if (arguments.length === 2) {
	                            // String
	                            this[i].setAttribute(attrs, value);
	                        }
	                        else {
	                            // Object
	                            for (var attrName in attrs) {
	                                this[i][attrName] = attrs[attrName];
	                                this[i].setAttribute(attrName, attrs[attrName]);
	                            }
	                        }
	                    }
	                    return this;
	                }
	            },
	            removeAttr: function (attr) {
	                for (var i = 0; i < this.length; i++) {
	                    this[i].removeAttribute(attr);
	                }
	                return this;
	            },
	            data: function (key, value) {
	                if (typeof value === 'undefined') {
	                    // Get value
	                    if (this[0]) {
	                        var dataKey = this[0].getAttribute('data-' + key);
	                        if (dataKey) return dataKey;
	                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
	                        else return undefined;
	                    }
	                    else return undefined;
	                }
	                else {
	                    // Set value
	                    for (var i = 0; i < this.length; i++) {
	                        var el = this[i];
	                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
	                        el.dom7ElementDataStorage[key] = value;
	                    }
	                    return this;
	                }
	            },
	            // Transforms
	            transform : function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            },
	            transition: function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            },
	            //Events
	            on: function (eventName, targetSelector, listener, capture) {
	                function handleLiveEvent(e) {
	                    var target = e.target;
	                    if ($(target).is(targetSelector)) listener.call(target, e);
	                    else {
	                        var parents = $(target).parents();
	                        for (var k = 0; k < parents.length; k++) {
	                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
	                        }
	                    }
	                }
	                var events = eventName.split(' ');
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof targetSelector === 'function' || targetSelector === false) {
	                        // Usual events
	                        if (typeof targetSelector === 'function') {
	                            listener = arguments[1];
	                            capture = arguments[2] || false;
	                        }
	                        for (j = 0; j < events.length; j++) {
	                            this[i].addEventListener(events[j], listener, capture);
	                        }
	                    }
	                    else {
	                        //Live events
	                        for (j = 0; j < events.length; j++) {
	                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
	                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
	                            this[i].addEventListener(events[j], handleLiveEvent, capture);
	                        }
	                    }
	                }
	    
	                return this;
	            },
	            off: function (eventName, targetSelector, listener, capture) {
	                var events = eventName.split(' ');
	                for (var i = 0; i < events.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        if (typeof targetSelector === 'function' || targetSelector === false) {
	                            // Usual events
	                            if (typeof targetSelector === 'function') {
	                                listener = arguments[1];
	                                capture = arguments[2] || false;
	                            }
	                            this[j].removeEventListener(events[i], listener, capture);
	                        }
	                        else {
	                            // Live event
	                            if (this[j].dom7LiveListeners) {
	                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
	                                    if (this[j].dom7LiveListeners[k].listener === listener) {
	                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                return this;
	            },
	            once: function (eventName, targetSelector, listener, capture) {
	                var dom = this;
	                if (typeof targetSelector === 'function') {
	                    targetSelector = false;
	                    listener = arguments[1];
	                    capture = arguments[2];
	                }
	                function proxy(e) {
	                    listener(e);
	                    dom.off(eventName, targetSelector, proxy, capture);
	                }
	                dom.on(eventName, targetSelector, proxy, capture);
	            },
	            trigger: function (eventName, eventData) {
	                for (var i = 0; i < this.length; i++) {
	                    var evt;
	                    try {
	                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
	                    }
	                    catch (e) {
	                        evt = document.createEvent('Event');
	                        evt.initEvent(eventName, true, true);
	                        evt.detail = eventData;
	                    }
	                    this[i].dispatchEvent(evt);
	                }
	                return this;
	            },
	            transitionEnd: function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            },
	            // Sizing/Styles
	            width: function () {
	                if (this[0] === window) {
	                    return window.innerWidth;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('width'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerWidth: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
	                    else
	                        return this[0].offsetWidth;
	                }
	                else return null;
	            },
	            height: function () {
	                if (this[0] === window) {
	                    return window.innerHeight;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('height'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerHeight: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
	                    else
	                        return this[0].offsetHeight;
	                }
	                else return null;
	            },
	            offset: function () {
	                if (this.length > 0) {
	                    var el = this[0];
	                    var box = el.getBoundingClientRect();
	                    var body = document.body;
	                    var clientTop  = el.clientTop  || body.clientTop  || 0;
	                    var clientLeft = el.clientLeft || body.clientLeft || 0;
	                    var scrollTop  = window.pageYOffset || el.scrollTop;
	                    var scrollLeft = window.pageXOffset || el.scrollLeft;
	                    return {
	                        top: box.top  + scrollTop  - clientTop,
	                        left: box.left + scrollLeft - clientLeft
	                    };
	                }
	                else {
	                    return null;
	                }
	            },
	            css: function (props, value) {
	                var i;
	                if (arguments.length === 1) {
	                    if (typeof props === 'string') {
	                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
	                    }
	                    else {
	                        for (i = 0; i < this.length; i++) {
	                            for (var prop in props) {
	                                this[i].style[prop] = props[prop];
	                            }
	                        }
	                        return this;
	                    }
	                }
	                if (arguments.length === 2 && typeof props === 'string') {
	                    for (i = 0; i < this.length; i++) {
	                        this[i].style[props] = value;
	                    }
	                    return this;
	                }
	                return this;
	            },
	    
	            //Dom manipulation
	            each: function (callback) {
	                for (var i = 0; i < this.length; i++) {
	                    callback.call(this[i], i, this[i]);
	                }
	                return this;
	            },
	            html: function (html) {
	                if (typeof html === 'undefined') {
	                    return this[0] ? this[0].innerHTML : undefined;
	                }
	                else {
	                    for (var i = 0; i < this.length; i++) {
	                        this[i].innerHTML = html;
	                    }
	                    return this;
	                }
	            },
	            is: function (selector) {
	                if (!this[0]) return false;
	                var compareWith, i;
	                if (typeof selector === 'string') {
	                    var el = this[0];
	                    if (el === document) return selector === document;
	                    if (el === window) return selector === window;
	    
	                    if (el.matches) return el.matches(selector);
	                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
	                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
	                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
	                    else {
	                        compareWith = $(selector);
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                }
	                else if (selector === document) return this[0] === document;
	                else if (selector === window) return this[0] === window;
	                else {
	                    if (selector.nodeType || selector instanceof Dom7) {
	                        compareWith = selector.nodeType ? [selector] : selector;
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                    return false;
	                }
	    
	            },
	            index: function () {
	                if (this[0]) {
	                    var child = this[0];
	                    var i = 0;
	                    while ((child = child.previousSibling) !== null) {
	                        if (child.nodeType === 1) i++;
	                    }
	                    return i;
	                }
	                else return undefined;
	            },
	            eq: function (index) {
	                if (typeof index === 'undefined') return this;
	                var length = this.length;
	                var returnIndex;
	                if (index > length - 1) {
	                    return new Dom7([]);
	                }
	                if (index < 0) {
	                    returnIndex = length + index;
	                    if (returnIndex < 0) return new Dom7([]);
	                    else return new Dom7([this[returnIndex]]);
	                }
	                return new Dom7([this[index]]);
	            },
	            append: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        while (tempDiv.firstChild) {
	                            this[i].appendChild(tempDiv.firstChild);
	                        }
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].appendChild(newChild[j]);
	                        }
	                    }
	                    else {
	                        this[i].appendChild(newChild);
	                    }
	                }
	                return this;
	            },
	            prepend: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
	                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
	                        }
	                        // this[i].insertAdjacentHTML('afterbegin', newChild);
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
	                        }
	                    }
	                    else {
	                        this[i].insertBefore(newChild, this[i].childNodes[0]);
	                    }
	                }
	                return this;
	            },
	            insertBefore: function (selector) {
	                var before = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (before.length === 1) {
	                        before[0].parentNode.insertBefore(this[i], before[0]);
	                    }
	                    else if (before.length > 1) {
	                        for (var j = 0; j < before.length; j++) {
	                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
	                        }
	                    }
	                }
	            },
	            insertAfter: function (selector) {
	                var after = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (after.length === 1) {
	                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
	                    }
	                    else if (after.length > 1) {
	                        for (var j = 0; j < after.length; j++) {
	                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
	                        }
	                    }
	                }
	            },
	            next: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            nextAll: function (selector) {
	                var nextEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.nextElementSibling) {
	                    var next = el.nextElementSibling;
	                    if (selector) {
	                        if($(next).is(selector)) nextEls.push(next);
	                    }
	                    else nextEls.push(next);
	                    el = next;
	                }
	                return new Dom7(nextEls);
	            },
	            prev: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            prevAll: function (selector) {
	                var prevEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.previousElementSibling) {
	                    var prev = el.previousElementSibling;
	                    if (selector) {
	                        if($(prev).is(selector)) prevEls.push(prev);
	                    }
	                    else prevEls.push(prev);
	                    el = prev;
	                }
	                return new Dom7(prevEls);
	            },
	            parent: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    if (selector) {
	                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
	                    }
	                    else {
	                        parents.push(this[i].parentNode);
	                    }
	                }
	                return $($.unique(parents));
	            },
	            parents: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    var parent = this[i].parentNode;
	                    while (parent) {
	                        if (selector) {
	                            if ($(parent).is(selector)) parents.push(parent);
	                        }
	                        else {
	                            parents.push(parent);
	                        }
	                        parent = parent.parentNode;
	                    }
	                }
	                return $($.unique(parents));
	            },
	            find : function (selector) {
	                var foundElements = [];
	                for (var i = 0; i < this.length; i++) {
	                    var found = this[i].querySelectorAll(selector);
	                    for (var j = 0; j < found.length; j++) {
	                        foundElements.push(found[j]);
	                    }
	                }
	                return new Dom7(foundElements);
	            },
	            children: function (selector) {
	                var children = [];
	                for (var i = 0; i < this.length; i++) {
	                    var childNodes = this[i].childNodes;
	    
	                    for (var j = 0; j < childNodes.length; j++) {
	                        if (!selector) {
	                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
	                        }
	                        else {
	                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
	                        }
	                    }
	                }
	                return new Dom7($.unique(children));
	            },
	            remove: function () {
	                for (var i = 0; i < this.length; i++) {
	                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
	                }
	                return this;
	            },
	            add: function () {
	                var dom = this;
	                var i, j;
	                for (i = 0; i < arguments.length; i++) {
	                    var toAdd = $(arguments[i]);
	                    for (j = 0; j < toAdd.length; j++) {
	                        dom[dom.length] = toAdd[j];
	                        dom.length++;
	                    }
	                }
	                return dom;
	            }
	        };
	        $.fn = Dom7.prototype;
	        $.unique = function (arr) {
	            var unique = [];
	            for (var i = 0; i < arr.length; i++) {
	                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
	            }
	            return unique;
	        };
	    
	        return $;
	    })();
	    
	
	    /*===========================
	     Get Dom libraries
	     ===========================*/
	    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
	    for (var i = 0; i < swiperDomPlugins.length; i++) {
	    	if (window[swiperDomPlugins[i]]) {
	    		addLibraryPlugin(window[swiperDomPlugins[i]]);
	    	}
	    }
	    // Required DOM Plugins
	    var domLib;
	    if (typeof Dom7 === 'undefined') {
	    	domLib = window.Dom7 || window.Zepto || window.jQuery;
	    }
	    else {
	    	domLib = Dom7;
	    }
	
	    /*===========================
	    Add .swiper plugin from Dom libraries
	    ===========================*/
	    function addLibraryPlugin(lib) {
	        lib.fn.swiper = function (params) {
	            var firstInstance;
	            lib(this).each(function () {
	                var s = new Swiper(this, params);
	                if (!firstInstance) firstInstance = s;
	            });
	            return firstInstance;
	        };
	    }
	    
	    if (domLib) {
	        if (!('transitionEnd' in domLib.fn)) {
	            domLib.fn.transitionEnd = function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            };
	        }
	        if (!('transform' in domLib.fn)) {
	            domLib.fn.transform = function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            };
	        }
	        if (!('transition' in domLib.fn)) {
	            domLib.fn.transition = function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            };
	        }
	    }
	
	    window.Swiper = Swiper;
	})();
	/*===========================
	Swiper AMD Export
	===========================*/
	if (true)
	{
	    module.exports = window.Swiper;
	}
	else if (typeof define === 'function' && define.amd) {
	    define([], function () {
	        'use strict';
	        return window.Swiper;
	    });
	}

/***/ },
/* 223 */
/***/ function(module, exports) {

	module.exports = "<div class=\"swiper-container\" v-el:swper>\n    <div class=\"swiper-wrapper\">\n        <div class=\"swiper-slide\">Slide 1</div>\n        <div class=\"swiper-slide\">Slide 2</div>\n        <div class=\"swiper-slide\">Slide 3</div>\n        <div class=\"swiper-slide\">Slide 4</div>\n        <div class=\"swiper-slide\">Slide 5</div>\n        <div class=\"swiper-slide\">Slide 6</div>\n        <div class=\"swiper-slide\">Slide 7</div>\n        <div class=\"swiper-slide\">Slide 8</div>\n        <div class=\"swiper-slide\">Slide 9</div>\n        <div class=\"swiper-slide\">Slide 10</div>\n    </div>\n</div>";

/***/ },
/* 224 */
/***/ function(module, exports) {



/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(226)
	module.exports = __webpack_require__(228)
	module.exports.template = __webpack_require__(229)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./not_found.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./not_found.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./not_found.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./not_found.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./not_found.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 226 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 227 */,
/* 228 */
/***/ function(module, exports) {

	module.exports = {
		data:function(){
			return {
				title:'404'
			}
		},
		route:{
			activate:function(transition){
				this.$root.$set('header',this.title);
				transition.next();
			}
		},
	};

/***/ },
/* 229 */
/***/ function(module, exports) {

	module.exports = "<p>404</p>";

/***/ }
]);
//# sourceMappingURL=build.js.map