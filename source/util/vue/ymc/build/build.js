webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(16);//加载公共样式
	
	var Vue = __webpack_require__(27);
	var VueRouter = __webpack_require__(95);
	
	
	Vue.use(VueRouter);
	var App = Vue.extend(__webpack_require__(128));
	var router = new VueRouter(
		{
		  hashbang: false,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
		  //abstract:true,  //地址栏不会有变化
		  //以下设置需要服务端设置
		  history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
		  saveScrollPosition: false
		}
	);
	
	__webpack_require__(159)(router);
	
	
	
	router.start(App,'#app');
	


/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
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
	  directives: __webpack_require__(43),
	  elementDirectives: __webpack_require__(78),
	  filters: __webpack_require__(81),
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
	 * Mixin internal instance methods
	 */
	
	extend(p, __webpack_require__(83))
	extend(p, __webpack_require__(84))
	extend(p, __webpack_require__(85))
	extend(p, __webpack_require__(88))
	extend(p, __webpack_require__(90))
	
	/**
	 * Mixin public API methods
	 */
	
	extend(p, __webpack_require__(91))
	extend(p, __webpack_require__(92))
	extend(p, __webpack_require__(93))
	extend(p, __webpack_require__(94))
	
	Vue.version = '1.0.0-rc.1'
	module.exports = _.Vue = Vue


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var lang = __webpack_require__(29)
	var extend = lang.extend
	
	extend(exports, lang)
	extend(exports, __webpack_require__(30))
	extend(exports, __webpack_require__(31))
	extend(exports, __webpack_require__(37))
	extend(exports, __webpack_require__(38))
	extend(exports, __webpack_require__(39))


/***/ },
/* 29 */
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
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/
	exports.isLiteral = function (exp) {
	  return literalValueRE.test(exp)
	}
	
	/**
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
	    : str
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
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var config = __webpack_require__(33)
	
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
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 */
	
	exports.attr = function (node, attr) {
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	exports.getBindAttr = function (node, name) {
	  var val = exports.attr(node, ':' + name)
	  if (val === null) {
	    val = exports.attr(node, 'v-bind:' + name)
	  }
	  return val
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
	 * - v-for
	 * - component
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
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
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
	 * Interpolation delimiters. Changing these would trigger
	 * the text parser to re-compile the regular expressions.
	 *
	 * @type {Array<String>}
	 */
	
	var delimiters = ['{{', '}}']
	var unsafeDelimiters = ['{{{', '}}}']
	var textParser = __webpack_require__(34)
	
	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
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


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(35)
	var config = __webpack_require__(33)
	var dirParser = __webpack_require__(36)
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
	  var match, index, html, value, first, oneTime
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
	    value = oneTime
	      ? value.slice(1)
	      : value
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
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
	 * @return {String}
	 */
	
	exports.tokensToExp = function (tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token)
	    }).join('+')
	  } else {
	    return formatToken(tokens[0], true)
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	function formatToken (token, single) {
	  return token.tag
	    ? inlineFilters(token.value, single)
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
	    var dir = dirParser.parse(exp)
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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Cache = __webpack_require__(35)
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
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: arg,
	      dynamic: false
	    }
	  } else {
	    var stripped = _.stripQuotes(arg)
	    var dynamic = stripped === arg
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    }
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
	  dir = {}
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var config = __webpack_require__(33)
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
	  return assets[id] || assets[camelizedId] || assets[pascalizedId]
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	exports.commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/
	exports.checkComponent = function (el, options) {
	  var tag = el.tagName.toLowerCase()
	  var hasAttrs = el.hasAttributes()
	  if (!exports.commonTagRE.test(tag) && tag !== 'component') {
	    if (_.resolveAsset(options, 'components', tag)) {
	      return { id: tag }
	    } else {
	      var is = hasAttrs && getIsBinding(el)
	      if (is) {
	        return is
	      } else if (process.env.NODE_ENV !== 'production') {
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
	    return getIsBinding(el)
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */
	
	function getIsBinding (el) {
	  // dynamic syntax
	  var exp = _.attr(el, 'is')
	  if (exp != null) {
	    return { id: exp }
	  } else {
	    exp = _.getBindAttr(el, 'is')
	    if (exp != null) {
	      return { id: exp, dynamic: true }
	    }
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	exports.initProp = function (vm, prop, value) {
	  if (exports.assertProp(prop, value)) {
	    var key = prop.path
	    vm[key] = vm._data[key] = value
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Enable debug utilities.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	
	  var config = __webpack_require__(33)
	  var hasConsole = typeof console !== 'undefined'
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var config = __webpack_require__(33)
	
	/**
	 * Expose useful internals
	 */
	
	exports.util = _
	exports.config = config
	exports.set = _.set
	exports.delete = _.delete
	exports.nextTick = _.nextTick
	
	/**
	 * The following are exposed for advanced usage / plugins
	 */
	
	exports.compiler = __webpack_require__(41)
	exports.FragmentFactory = __webpack_require__(48)
	exports.internalDirectives = __webpack_require__(63)
	exports.parsers = {
	  path: __webpack_require__(71),
	  text: __webpack_require__(34),
	  template: __webpack_require__(46),
	  directive: __webpack_require__(36),
	  expression: __webpack_require__(70)
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

	var _ = __webpack_require__(28)
	
	_.extend(exports, __webpack_require__(42))
	_.extend(exports, __webpack_require__(77))


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var publicDirectives = __webpack_require__(43)
	var internalDirectives = __webpack_require__(63)
	var compileProps = __webpack_require__(76)
	var textParser = __webpack_require__(34)
	var dirParser = __webpack_require__(36)
	var templateParser = __webpack_require__(46)
	var resolveAsset = _.resolveAsset
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/
	var onRE = /^v-on:|^@/
	var argRE = /:(.*)$/
	var modifierRE = /\.[^\.]+/g
	var transitionRE = /^(v-bind:|:)?transition$/
	
	// terminal directives
	var terminalDirectives = [
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
	  a = a.descriptor.def.priority || 0
	  b = b.descriptor.def.priority || 0
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
	 * @return {Function}
	 */
	
	exports.compileRoot = function (el, options) {
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
	      if (containerAttrs) {
	        contextLinkFn = compileDirectives(containerAttrs, options)
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
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && node.data.trim()) {
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
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = textParser.parse(el.value)
	    if (tokens) {
	      el.setAttribute(':value', textParser.tokensToExp(tokens))
	      el.value = ''
	    }
	  }
	  var linkFn
	  var hasAttrs = el.hasAttributes()
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options)
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options)
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options)
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
	    if (token.descriptor) return
	    var parsed = dirParser.parse(token.value)
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    }
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
	          vm._bindDir(token.descriptor, node, host, scope)
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
	 * @return {Function|undefined}
	 */
	
	function checkComponent (el, options) {
	  var component = _.checkComponent(el, options)
	  if (component) {
	    var descriptor = {
	      name: 'component',
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    }
	    var componentLinkFn = function (vm, el, host, scope, frag) {
	      vm._bindDir(descriptor, el, host, scope, frag)
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
	  if (_.attr(el, 'v-pre') !== null) {
	    return skip
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip
	    }
	  }
	  var value, dirName
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i]
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
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
	  var parsed = dirParser.parse(value)
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  }
	  var fn = function terminalNodeLinkFn (vm, el, host, scope, frag) {
	    vm._bindDir(descriptor, el, host, scope, frag)
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
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens
	  while (i--) {
	    attr = attrs[i]
	    name = rawName = attr.name
	    value = rawValue = attr.value
	    tokens = textParser.parse(value)
	    // reset arg
	    arg = null
	    // check modifiers
	    modifiers = parseModifiers(name)
	    name = name.replace(modifierRE, '')
	
	    // attribute interpolations
	    if (tokens) {
	      value = textParser.tokensToExp(tokens)
	      arg = name
	      pushDir('bind', publicDirectives.bind, true)
	    } else
	
	    // special attribute: transition
	    if (transitionRE.test(name)) {
	      modifiers.literal = !bindRE.test(name)
	      pushDir('transition', internalDirectives.transition)
	    } else
	
	    // event handlers
	    if (onRE.test(name)) {
	      arg = name.replace(onRE, '')
	      pushDir('on', publicDirectives.on)
	    } else
	
	    // attribute bindings
	    if (bindRE.test(name)) {
	      dirName = name.replace(bindRE, '')
	      if (dirName === 'style' || dirName === 'class') {
	        pushDir(dirName, internalDirectives[dirName])
	      } else {
	        arg = dirName
	        pushDir('bind', publicDirectives.bind)
	      }
	    } else
	
	    // normal directives
	    if (name.indexOf('v-') === 0) {
	      // check arg
	      arg = (arg = name.match(argRE)) && arg[1]
	      if (arg) {
	        name = name.replace(argRE, '')
	      }
	      // extract directive name
	      dirName = name.slice(2)
	
	      // skip v-else (when used with v-show)
	      if (dirName === 'else') {
	        continue
	      }
	
	      dirDef = resolveAsset(options, 'directives', dirName)
	
	      if (process.env.NODE_ENV !== 'production') {
	        _.assertAsset(dirDef, 'directive', dirName)
	      }
	
	      if (dirDef) {
	        if (_.isLiteral(value)) {
	          value = _.stripQuotes(value)
	          modifiers.literal = true
	        }
	        pushDir(dirName, dirDef)
	      }
	    }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */
	
	  function pushDir (dirName, def, interp) {
	    var parsed = dirParser.parse(value)
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    })
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs)
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
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag)
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// text & html
	exports.text = __webpack_require__(44)
	exports.html = __webpack_require__(45)
	
	// logic control
	exports['for'] = __webpack_require__(47)
	exports['if'] = __webpack_require__(51)
	exports.show = __webpack_require__(52)
	
	// two-way binding
	exports.model = __webpack_require__(53)
	
	// event handling
	exports.on = __webpack_require__(58)
	
	// attributes
	exports.bind = __webpack_require__(59)
	
	// ref & el
	exports.el = __webpack_require__(60)
	exports.ref = __webpack_require__(61)
	
	// cloak
	exports.cloak = __webpack_require__(62)


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var templateParser = __webpack_require__(46)
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Cache = __webpack_require__(35)
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var FragmentFactory = __webpack_require__(48)
	var isObject = _.isObject
	var uid = 0
	
	module.exports = {
	
	  priority: 2000,
	
	  bind: function () {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      this.alias = inMatch[1]
	      this.expression = inMatch[2]
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
	
	    // check ref
	    this.ref = _.findRef(this.el)
	
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
	        frag.destroy()
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
	    scope.$refs = {}
	    scope.$els = {}
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
	    var hash = (this._scope || this.vm).$refs
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
	        frag.remove()
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.remove()
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
	      (this._scope || this.vm).$refs[this.ref] = null
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
	      'Duplicate value found in v-for="' + this.descriptor.raw + '": ' +
	      JSON.stringify(value) + '. Use track-by="$index" if ' +
	      'you are expecting duplicate values.'
	    )
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var compiler = __webpack_require__(41)
	var templateParser = __webpack_require__(46)
	var Fragment = __webpack_require__(49)
	var Cache = __webpack_require__(35)
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var transition = __webpack_require__(50)
	
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
	
	/**
	 * Destroy the fragment.
	 */
	
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
	 */
	
	function singleRemove () {
	  var shouldCallRemove = _.inDoc(this.node)
	  transition.remove(this.node, this.vm)
	  this.inserted = false
	  if (shouldCallRemove) {
	    this.callHook(detach)
	  }
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} trans
	 */
	
	function multiBefore (target, trans) {
	  _.before(this.node, target)
	  var nodes = this.nodes
	  var vm = this.vm
	  var method = trans !== false
	    ? transition.before
	    : _.before
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    method(nodes[i], target, vm)
	  }
	  _.before(this.end, target)
	  this.inserted = true
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove () {
	  var shouldCallRemove = _.inDoc(this.node)
	  var parent = this.node.parentNode
	  var node = this.node.nextSibling
	  var nodes = this.nodes = []
	  var vm = this.vm
	  var next
	  while (node !== this.end) {
	    nodes.push(node)
	    next = node.nextSibling
	    transition.remove(node, vm)
	    node = next
	  }
	  parent.removeChild(this.node)
	  parent.removeChild(this.end)
	  this.inserted = false
	  if (shouldCallRemove) {
	    this.callHook(detach)
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var FragmentFactory = __webpack_require__(48)
	
	module.exports = {
	
	  priority: 2000,
	
	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling
	      if (next && _.attr(next, 'v-else') !== null) {
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
	      this.elseFrag.remove()
	      this.elseFrag.destroy()
	      this.elseFrag = null
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag)
	    this.frag.before(this.anchor)
	  },
	
	  remove: function () {
	    if (this.frag) {
	      this.frag.remove()
	      this.frag.destroy()
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var transition = __webpack_require__(50)
	
	module.exports = {
	
	  bind: function () {
	    // check else block
	    var next = this.el.nextElementSibling
	    if (next && _.attr(next, 'v-else') !== null) {
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	
	var handlers = {
	  text: __webpack_require__(54),
	  radio: __webpack_require__(55),
	  select: __webpack_require__(56),
	  checkbox: __webpack_require__(57)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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
	      this.afterBind = this.listener
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	    var number = this.param('number') != null
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value
	      }
	      var val = el.value
	      if (number) {
	        val = _.toNumber(val)
	      }
	      return val
	    }
	
	    this.listener = function () {
	      self.set(self.getValue())
	    }
	    this.on('change', this.listener)
	
	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },
	
	  update: function (value) {
	    this.el.checked = _.looseEqual(value, this.getValue())
	  }
	}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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
	
	    this.number = this.param('number') != null
	    var multiple = this.multiple = el.hasAttribute('multiple')
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple)
	      value = self.number
	        ? _.isArray(value)
	          ? value.map(_.toNumber)
	          : _.toNumber(value)
	        : value
	      self.set(value)
	    }
	    this.on('change', this.listener)
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true)
	    if ((multiple && initValue.length) ||
	        (!multiple && initValue !== null)) {
	      this.afterBind = this.listener
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate)
	  },
	
	  update: function (value) {
	    var el = this.el
	    el.selectedIndex = -1
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
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate)
	  }
	}
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue (el, multi, init) {
	  var res = multi ? [] : null
	  var op, val, selected
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i]
	    selected = init
	      ? op.hasAttribute('selected')
	      : op.selected
	    if (selected) {
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


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
	module.exports = {
	
	  bind: function () {
	    var self = this
	    var el = this.el
	    var number = this.param('number') != null
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value')
	        ? el._value
	        : number
	          ? _.toNumber(el.value)
	          : el.value
	    }
	
	    function getBooleanValue () {
	      var val = el.checked
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue
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
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = _.looseEqual(value, el._trueValue)
	      } else {
	        el.checked = !!value
	      }
	    }
	  }
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	
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
	
	  bind: function () {
	    var attr = this.arg
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr)) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          attr + '="' + this.descriptor.raw + '": ' +
	          'attribute interpolation is not allowed in Vue.js ' +
	          'directives and special attributes.'
	        )
	        this.el.removeAttribute(attr)
	        this.invalid = true
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": '
	        // warn src
	        if (attr === 'src') {
	          _.warn(
	            raw + 'interpolation in "src" attribute will cause ' +
	            'a 404 request. Use v-bind:src instead.'
	          )
	        }
	
	        // warn style
	        if (attr === 'style') {
	          _.warn(
	            raw + 'interpolation in "style" attribtue will cause ' +
	            'the attribtue to be discarded in Internet Explorer. ' +
	            'Use v-bind:style instead.'
	          )
	        }
	      }
	    }
	  },
	
	  update: function (value) {
	    if (this.invalid) {
	      return
	    }
	    var attr = this.arg
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
	module.exports = {
	
	  priority: 1500,
	
	  bind: function () {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return
	    }
	    var id = this.id = _.camelize(this.arg)
	    var refs = (this._scope || this.vm).$els
	    if (refs.hasOwnProperty(id)) {
	      refs[id] = this.el
	    } else {
	      _.defineReactive(refs, id, this.el)
	    }
	  },
	
	  unbind: function () {
	    var refs = (this._scope || this.vm).$els
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null
	    }
	  }
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.NODE_ENV !== 'production') {
	  module.exports = {
	    bind: function () {
	      __webpack_require__(28).warn(
	        'v-ref:' + this.arg + ' must be used on a child ' +
	        'component. Found on <' + this.el.tagName.toLowerCase() + '>.'
	      )
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = {
	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak')
	    })
	  }
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.style = __webpack_require__(64)
	exports['class'] = __webpack_require__(65)
	exports.component = __webpack_require__(66)
	exports.prop = __webpack_require__(67)
	exports.transition = __webpack_require__(73)


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var camelPrefixes = ['Webkit', 'Moz', 'ms']
	var importantRE = /!important;?$/
	var camelRE = /([a-z])([A-Z])/g
	var testEl = null
	var propCache = {}
	
	module.exports = {
	
	  deep: true,
	
	  update: function (value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value
	    } else if (_.isArray(value)) {
	      this.objectHandler(value.reduce(_.extend, {}))
	    } else {
	      this.objectHandler(value)
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var addClass = _.addClass
	var removeClass = _.removeClass
	
	module.exports = {
	
	  update: function (value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value))
	    } else if (_.isPlainObject(value)) {
	      this.handleObject(value)
	    } else if (_.isArray(value)) {
	      this.handleArray(value)
	    } else {
	      this.cleanup()
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
	    this.prevKeys = value
	  },
	
	  cleanup: function (value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length
	      while (i--) {
	        var key = this.prevKeys[i]
	        if (!value || !contains(value, key)) {
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var templateParser = __webpack_require__(46)
	
	module.exports = {
	
	  priority: 1500,
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function () {
	    if (!this.el.__vue__) {
	      // check keep-alive options.
	      // If yes, instead of destroying the active vm when
	      // hiding (v-if) or switching (dynamic literal) it,
	      // we simply remove it from the DOM and save it in a
	      // cache object, with its constructor id as the key.
	      this.keepAlive = this.param('keep-alive') != null
	
	      // check ref
	      this.ref = _.findRef(this.el)
	      var refs = (this._scope || this.vm).$refs
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
	      // check dynamic component params
	        // create a ref anchor
	      this.anchor = _.createAnchor('v-component')
	      _.replace(this.el, this.anchor)
	      this.transMode = this.param('transition-mode')
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression)
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'cannot mount component "' + this.expression + '" ' +
	        'on already mounted element: ' + this.el
	      )
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function (value) {
	    if (!this.literal) {
	      this.setComponent(value)
	    }
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
	      var self = this
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb)
	      })
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
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function (cb) {
	    // actual mount
	    this.unbuild(true)
	    var self = this
	    var activateHook = this.Component.options.activate
	    var cached = this.getCached()
	    var newComponent = this.build()
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent
	      activateHook.call(newComponent, function () {
	        self.waitingFor = null
	        self.transition(newComponent, cb)
	      })
	    } else {
	      this.transition(newComponent, cb)
	    }
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
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
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
	        // if this is inside an inline v-for, the scope
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
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        _.extend(options, extraOptions)
	      }
	      var child = new this.Component(options)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// NOTE: the prop internal directive is compiled and linked
	// during _initScope(), before the created hook is called.
	// The purpose is to make the initial prop values available
	// inside `created` hooks and `data` functions.
	
	var _ = __webpack_require__(28)
	var Watcher = __webpack_require__(68)
	var bindingModes = __webpack_require__(33)._propBindingModes
	
	module.exports = {
	
	  bind: function () {
	
	    var child = this.vm
	    var parent = child._context
	    // passed in from compiler directly
	    var prop = this.descriptor.prop
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
	        // v-for scope if present
	        scope: this._scope
	      }
	    )
	
	    // set the child initial value.
	    _.initProp(child, prop, parentWatcher.value)
	
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var config = __webpack_require__(33)
	var Dep = __webpack_require__(69)
	var expParser = __webpack_require__(70)
	var batcher = __webpack_require__(72)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var Path = __webpack_require__(71)
	var Cache = __webpack_require__(35)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var Cache = __webpack_require__(35)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var config = __webpack_require__(33)
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Transition = __webpack_require__(74)
	
	module.exports = {
	
	  priority: 1000,
	
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var queue = __webpack_require__(75)
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var dirParser = __webpack_require__(36)
	var propDef = __webpack_require__(67)
	var propBindingModes = __webpack_require__(33)._propBindingModes
	
	// regexes
	var identRE = __webpack_require__(71).identRE
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	module.exports = function compileProps (el, propOptions) {
	  var props = []
	  var i = propOptions.length
	  var options, name, attr, value, path, parsed, prop
	  while (i--) {
	    options = propOptions[i]
	    name = options.name
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      _.warn('Do not use $data as prop.')
	      continue
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = _.camelize(name)
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop key: "' + name + '". Prop keys ' +
	        'must be valid identifiers.'
	      )
	      continue
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY
	    }
	
	    // first check literal version
	    attr = _.hyphenate(name)
	    value = prop.raw = _.attr(el, attr)
	    if (value === null) {
	      // then check dynamic version
	      if ((value = _.getBindAttr(el, attr)) === null) {
	        if ((value = _.getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY
	        } else if ((value = _.getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME
	        }
	      }
	      prop.raw = value
	      if (value !== null) {
	        parsed = dirParser.parse(value)
	        value = parsed.expression
	        prop.filters = parsed.filters
	        // check binding type
	        if (_.isLiteral(value)) {
	          // for expressions containing literal numbers and
	          // booleans, there's no need to setup a prop binding,
	          // so we can optimize them as a one-time set.
	          prop.optimizedLiteral = true
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
	        prop.parentPath = value
	
	        // warn required two-way
	        if (
	          process.env.NODE_ENV !== 'production' &&
	          options.twoWay &&
	          prop.mode !== propBindingModes.TWO_WAY
	        ) {
	          _.warn(
	            'Prop "' + name + '" expects a two-way binding type.'
	          )
	        }
	
	      } else if (options.required) {
	        // warn missing required
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Missing required prop: ' + name
	        )
	      }
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
	    var prop, path, options, value, raw
	    while (i--) {
	      prop = props[i]
	      raw = prop.raw
	      path = prop.path
	      options = prop.options
	      vm._props[path] = prop
	      if (raw === null) {
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
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope) // el, host, scope
	          }
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Cannot bind dynamic prop on a root instance' +
	            ' with no parent: ' + prop.name + '="' +
	            raw + '"'
	          )
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        raw = _.stripQuotes(raw)
	        value = _.toBoolean(_.toNumber(raw))
	        _.initProp(vm, prop, value)
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === ''
	          ? true
	          : raw
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var templateParser = __webpack_require__(46)
	var specialCharRE = /[^\w\-:\.]/
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
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
	        tag === 'component' ||
	        _.resolveAsset(options, 'components', tag) ||
	        replacer.hasAttribute('is') ||
	        replacer.hasAttribute(':is') ||
	        replacer.hasAttribute('v-bind:is') ||
	        // element directive
	        _.resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports.slot = __webpack_require__(79)
	exports.partial = __webpack_require__(80)


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var templateParser = __webpack_require__(46)
	
	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.
	
	module.exports = {
	
	  priority: 1750,
	
	  bind: function () {
	    var host = this.vm
	    var raw = host.$options._content
	    var content
	    if (!raw) {
	      this.fallback()
	      return
	    }
	    var context = host._context
	    var slotName = this.param('name')
	    if (!slotName) {
	      // Default content
	      var self = this
	      var compileDefaultContent = function () {
	        self.compile(
	          extractFragment(raw.childNodes, raw, true),
	          context,
	          host
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
	      var selector = '[slot="' + slotName + '"]'
	      var nodes = raw.querySelectorAll(selector)
	      if (nodes.length) {
	        content = extractFragment(nodes, raw)
	        if (content.hasChildNodes()) {
	          this.compile(content, context, host)
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
	        !node.hasAttribute('v-if') &&
	        !node.hasAttribute('v-for')) {
	      node = templateParser.parse(node)
	    }
	    node = templateParser.clone(node)
	    frag.appendChild(node)
	  }
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var FragmentFactory = __webpack_require__(48)
	var vIf = __webpack_require__(51)
	var Watcher = __webpack_require__(68)
	
	module.exports = {
	
	  priority: 1750,
	
	  bind: function () {
	    var el = this.el
	    this.anchor = _.createAnchor('v-partial')
	    _.replace(el, this.anchor)
	    var id = el.getAttribute('name')
	    if (id != null) {
	      // static partial
	      this.insert(id)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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
	 * Debounce a handler function.
	 *
	 * @param {Function} handler
	 * @param {Number} delay = 300
	 * @return {Function}
	 */
	
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
	
	_.extend(exports, __webpack_require__(82))


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Path = __webpack_require__(71)
	var toArray = __webpack_require__(47)._postProcess
	
	/**
	 * Filter filter for arrays
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
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	exports.orderBy = function (arr, sortKey, reverse) {
	  arr = toArray(arr)
	  if (!sortKey) {
	    return arr
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


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(28).mergeOptions
	
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
	  this.$refs = {}       // child vm references
	  this.$els = {}        // element references
	  this._watchers = []   // all watchers as an array
	  this._directives = [] // all directives
	
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
	  // if this is inside an inline v-for, the scope
	  // will be the intermediate scope created for this
	  // repeat fragment. this is used for linking props
	  // and container directives.
	  this._scope = options._scope
	
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
	
	  // set ref
	  if (options._ref) {
	    (this._scope || this._context).$refs[options._ref] = this
	  }
	
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var compiler = __webpack_require__(41)
	var Observer = __webpack_require__(86)
	var Dep = __webpack_require__(69)
	var Watcher = __webpack_require__(68)
	
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
	    // props must be linked in proper scope if inside v-for
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
	  for (var i = 0, l = this._watchers.length; i < l; i++) {
	    this._watchers[i].update(true) // shallow updates
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
	 * instance since they might be passed down as a prop to
	 * child components.
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Dep = __webpack_require__(69)
	var arrayMethods = __webpack_require__(87)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	
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
	    var augment = _.hasProto
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
	 * Add an owner vm, so that when $set/$delete mutations
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Directive = __webpack_require__(89)
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
	  var rootLinker = compiler.compileRoot(el, options)
	
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
	
	exports._bindDir = function (descriptor, node, host, scope, frag) {
	  this._directives.push(
	    new Directive(descriptor, this, node, host, scope, frag)
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
	  // unregister ref
	  var ref = this.$options._ref
	  if (ref) {
	    var scope = this._scope || this._context
	    if (scope.$refs[ref] === this) {
	      scope.$refs[ref] = null
	    }
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	var Watcher = __webpack_require__(68)
	var expParser = __webpack_require__(70)
	function noop () {}
	
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
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	
	function Directive (descriptor, vm, el, host, scope, frag) {
	  this.vm = vm
	  this.el = el
	  // copy descriptor properties
	  this.descriptor = descriptor
	  this.name = descriptor.name
	  this.expression = descriptor.expression
	  this.arg = descriptor.arg
	  this.modifiers = descriptor.modifiers
	  this.filters = descriptor.filters
	  this.literal = this.modifiers && this.modifiers.literal
	  // private
	  this._locked = false
	  this._bound = false
	  this._listeners = null
	  // link context
	  this._host = host
	  this._scope = scope
	  this._frag = frag
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name
	  var descriptor = this.descriptor
	
	  // remove attribute
	  if (
	    (name !== 'cloak' || this.vm._isCompiled) &&
	    this.el && this.el.removeAttribute
	  ) {
	    var attr = descriptor.attr || ('v-' + name)
	    this.el.removeAttribute(attr)
	  }
	
	  // copy def properties
	  var def = descriptor.def
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }
	
	  // initial bind
	  if (this.bind) {
	    this.bind()
	  }
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw)
	  } else if (
	    this.expression &&
	    (this.update || this.twoWay) &&
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
	      this.expression,
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
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind()
	    } else if (this.update) {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
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
	  var param = _.attr(this.el, name)
	  if (param != null) {
	    param = (this._scope || this.vm).$interpolate(param)
	  } else {
	    param = _.getBindAttr(this.el, name)
	    if (param != null) {
	      param = (this._scope || this.vm).$eval(param)
	      process.env.NODE_ENV !== 'production' && _.log(
	        'You are using bind- syntax on "' + name + '", which ' +
	        'is a directive param. It will be evaluated only once.'
	      )
	    }
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
	
	module.exports = Directive
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var Watcher = __webpack_require__(68)
	var Path = __webpack_require__(71)
	var textParser = __webpack_require__(34)
	var dirParser = __webpack_require__(36)
	var expParser = __webpack_require__(70)
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
	    parsed = dirParser.parse(expOrFn)
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
	    var dir = dirParser.parse(text)
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


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	var transition = __webpack_require__(50)
	
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(28)
	
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


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(28)
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(96)['default'];
	
	var _interopRequireDefault = __webpack_require__(97)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _override = __webpack_require__(102);
	
	var _override2 = _interopRequireDefault(_override);
	
	var _routeRecognizer = __webpack_require__(99);
	
	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);
	
	var _route = __webpack_require__(103);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _transition = __webpack_require__(113);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	var _directivesView = __webpack_require__(123);
	
	var _directivesView2 = _interopRequireDefault(_directivesView);
	
	var _directivesLink = __webpack_require__(124);
	
	var _directivesLink2 = _interopRequireDefault(_directivesLink);
	
	var _historyAbstract = __webpack_require__(125);
	
	var _historyAbstract2 = _interopRequireDefault(_historyAbstract);
	
	var _historyHash = __webpack_require__(126);
	
	var _historyHash2 = _interopRequireDefault(_historyHash);
	
	var _historyHtml5 = __webpack_require__(127);
	
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
/* 96 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(97)['default'];
	
	exports.__esModule = true;
	exports.warn = warn;
	exports.resolvePath = resolvePath;
	exports.isPromise = isPromise;
	exports.getRouteConfig = getRouteConfig;
	exports.resolveAsyncComponent = resolveAsyncComponent;
	exports.mapParams = mapParams;
	
	var _routeRecognizer = __webpack_require__(99);
	
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
/* 99 */
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
	    if ("function" === 'function' && __webpack_require__(101)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = $$route$recognizer$$default;
	    } else if (typeof this !== 'undefined') {
	      this['RouteRecognizer'] = $$route$recognizer$$default;
	    }
	}).call(this);
	
	//# sourceMappingURL=route-recognizer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(100)(module)))

/***/ },
/* 100 */
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
/* 101 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 102 */
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _classCallCheck = __webpack_require__(96)["default"];
	
	var _Object$freeze = __webpack_require__(104)["default"];
	
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	module.exports = __webpack_require__(111).Object.freeze;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(107);
	
	__webpack_require__(108)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(109)
	    , fn   = (__webpack_require__(111).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(112)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(110)
	  , core      = __webpack_require__(111)
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
/* 110 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 111 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(96)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
	var _pipeline = __webpack_require__(114);
	
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(115)['default'];
	
	var _Object$create = __webpack_require__(120)['default'];
	
	exports.__esModule = true;
	exports.canReuse = canReuse;
	exports.canDeactivate = canDeactivate;
	exports.canActivate = canActivate;
	exports.deactivate = deactivate;
	exports.activate = activate;
	exports.reuse = reuse;
	
	var _util = __webpack_require__(98);
	
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(117);
	module.exports = __webpack_require__(111).Object.keys;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(118);
	
	__webpack_require__(108)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(119);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(122);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 122 */
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
	var _pipeline = __webpack_require__(114);
	
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(96)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(96)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(96)['default'];
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(98);
	
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(129)
	module.exports = __webpack_require__(131)
	module.exports.template = __webpack_require__(158)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
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
/* 129 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 130 */,
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(132);
	__webpack_require__(137);
	
	module.exports = {
	    data: function() {
	      return {
	        isIndex         : false,//是否是首页
	        vvv             : '参数',        //用于 传参
	        header          : '',
	        showLoading1    : false,         //加载中先禁用掉
	        showLoading     : false,         //加载中...  提示
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
	        modalbody       : "可以通过在组件中调用 this.$parent.modalbody='' 来修改这里的内容"
	      };
	    },
	    components:{
	      modal:__webpack_require__(143),
	      asidebar:__webpack_require__(148),
	      loading :__webpack_require__(153)
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
	      //底部菜单
	      awesomeSheetHanlder:function(){
	        //this.as[(this.showAwesomeSheet = !this.showAwesomeSheet) ? 'show':'hide']();
	      },
	      goback:function(){
	        window.history.back();
	      }
	    },
	    ready:function(){
	      //this.$set('as',new AwesomeSheet({ touchDismiss: false }));
	    }
	}

/***/ },
/* 132 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(144)
	module.exports = __webpack_require__(146)
	module.exports.template = __webpack_require__(147)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
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
/* 144 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 145 */,
/* 146 */
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
					this.$parent.modalbody = e.target.value;
				}
			}
		}

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-mask\" v-if=\"show\" transition=\"modal\" transition-mode=\"out-in\">\r\n\t\t\t<div class=\"modal-wrapper\" v-el:overlay @click.stop=\"modelclick\" >\r\n\t\t\t\t<div class=\"modal-container\">\r\n\t\t\t\t\t<div class=\"modal-header\">\r\n\t\t\t\t\t\t<span class=\"modal-close\" @click=\"show=false\"></span>\r\n\t\t\t\t\t\t<slot name=\"header\">\r\n\t\t\t\t\t\tdefault header\r\n\t\t\t\t\t\t</slot>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"modal-body\">\r\n\t\t\t\t\t\t<slot name=\"body\">\r\n\t\t\t\t\t\tdefault body\r\n\t\t\t\t\t\t</slot>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"modal-footer\">\r\n\t\t\t\t\t\t<slot name=\"footer\">\r\n\t\t\t\t\t\t\t试试在input里面输入一些文字\r\n\t\t\t\t\t\t\t<input type=\"text\" v-el:inp @keyup=\"modalkeyup\">\r\n\t\t\t\t\t\t\t<button class=\"modal-default-button\" @click=\"confirmCallback\">\r\n\t\t\t\t\t\t\t\tOK\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t\t<button class=\"modal-default-button\" v-on:click=\"cancelCallback\">\r\n\t\t\t\t\t\t\t\tCancel\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t</slot>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>";

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(149)
	module.exports = __webpack_require__(151)
	module.exports.template = __webpack_require__(152)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
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
/* 149 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 150 */,
/* 151 */
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
	      },
	      sideDirection:function(){
	        //设置方向的时候顺便把样式也设置一下
	
	
	      },
	      styleWidth:function(){
	        //如果不是左右方向，可以无视宽度
	        if(this.placement.replace(/(left|right|\s)/g,'')){
	          return '100%';
	        }
	        return this.width + 'px';
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
/* 152 */
/***/ function(module, exports) {

	module.exports = "<!-- <div class=\"aside_components_mask\" v-if=\"show\" transition=\"modal\" @click.stop=\"show=false\"></div>\r\n  <div class=\"aside\"\r\n    :style=\"{width : width ? width+'px' : ''}\"\r\n    :class=\"placement\"\r\n    v-if=\"show\"\r\n    :transition=\"slideTransition\">\r\n    <div class=\"aside-dialog\">\r\n      <div class=\"aside-content\">\r\n        <div class=\"aside-header\">\r\n          <button type=\"button\" class=\"close\" @click='close'><span>&times;</span></button> <- 在aside中定义的close事件\r\n          <h4 class=\"aside-title\">{{header}}</h4>\r\n\r\n\r\n    <dl>\r\n      <dt>props参数：</dt>\r\n      <dt>width:{{width}} </dt>\r\n      <dt>placement:{{placement}}</dt>\r\n      <dt>header:{{header}}</dt>\r\n    </dl>\r\n    <pre>\r\n        </div>\r\n        <div class=\"aside-body\">\r\n          <slot name=\"body\">\r\n            default body\r\n          </slot>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div> -->\r\n<div class=\"aside_components_mask\" v-if=\"show\" transition=\"modal\" @click.stop=\"show=false\"></div>\r\n<div class=\"aside\"\r\n    :style=\"{width : width ? width+'px' : ''}\"\r\n    :class=\"placement\"\r\n    v-if=\"show\"\r\n    :transition=\"slideTransition\"\r\n>\r\n<slot name=\"body\">\r\n  default body\r\n</slot>\r\n</div>";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(154)
	module.exports = __webpack_require__(156)
	module.exports.template = __webpack_require__(157)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./loading.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./loading.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./loading.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./loading.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./loading.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 154 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 155 */,
/* 156 */
/***/ function(module, exports) {

	module.exports = {
			props: ['showloading']
		}

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-mask\" v-if=\"showloading\" transition=\"modal\" transition-mode=\"out-in\">\r\n<div class='uiload' v-if=\"showloading\">\r\n\t<div class='uiloadicon'>\r\n\t\t<span class='ui-loading'>\r\n\t\t\t<i class='t1'></i><i class='t2'></i><i class='t3'></i>\r\n\t\t</span>\r\n\t\t<span>加载中...</span>\r\n\t</div>\r\n</div>\r\n</template>";

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = "<div class=\"app\">\r\n\r\n<header id=\"indexpage\" class=\"hd\" v-if=\"isIndex\">\r\n  <h1 class=\"pagetitle\">\r\n    <span @click=\"showTopAside=true\"><span>上海</span><i class=\"i3 i3-1\"></i></span>\r\n    <a class=\"iclick iclick1 nav-left js-back\" @click=\"showLeftAside=true\"></a>\r\n    <a class=\"iclick iclick2 nav-right js-right\" href=\"javascript:void(0);\"></a>\r\n  </h1>\r\n</header>\r\n<header class=\"hd\" v-if=\"!isIndex\">\r\n      <h1 class=\"pagetitle\">\r\n          {{header}}\r\n          <a  class=\"ico1 ico_share nav-right\">share</a>\r\n          <a  @click=\"goback\" class=\"ico1 ico_arrow-left nav-left\">back</a>\r\n      </h1>\r\n</header>\r\n  <asidebar v-ref:asideL  :show.sync=\"showLeftAside\"  :placement.sync=\"left\" :width.sync=\"125\" >\r\n\r\n<div  slot=\"body\" class=\"left_menu left_menu_cur\">\r\n<ul>\r\n  <li style=\"padding: 12px\">\r\n  <span class=\"loginN\">\r\n      <a style=\"display: inline\" href=\"page/_login.html\">登录</a>\r\n       / <a style=\"display: inline\" href=\"page/_reg.html\">注册</a>\r\n  </span>\r\n  <span class=\"loginY\" style=\"display: none;\">你好<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAA8CAYAAAAwoHcgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNUI5RkVFQ0ZEMkExMUU0QkMwQzlGMzNFMkRDOTk3RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNUI5RkVFREZEMkExMUU0QkMwQzlGMzNFMkRDOTk3RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QjlGRUVBRkQyQTExRTRCQzBDOUYzM0UyREM5OTdGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM1QjlGRUVCRkQyQTExRTRCQzBDOUYzM0UyREM5OTdGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/n2TpwAAA1VJREFUeNrsmtuLTVEcx9cxqGMwkzk1HqRxyyUjUi4hhweXhlxKPFBEwoOSKB78BeJBCRGSSMjkWmi2GvdLkqEJiXGJqBEzjWEc35/9OxnH3vuMOWuvvY75/erTmtm/3VnnfPbaa6/LjqVSKSXxZ3QSBSJFpIgUkSJSRIpIESn5E51z/QDHcTIP9QLD+O868BKENmxOJpP2ScmICeAiiLf2BqaBbyE4KcRFod/QBDlfbbx9YmBvhpBfFxOs1CyjKzgDvoB6kgI550HcNimjwRCf3HzNUjaDioxjM8AW26SUB+T6aW6Rq3xyy2yTUhSQa9FYTxko9cmV4hbqaZOU4oBcg8Z6SrLku9gkpVtArl5jPd2z5JtsklJoqKUUZRm3NHREKUH1fLKtoy22QEqjbVKaA3Jv86lF6pRyPyBXbWgu99E2KfvAB4/jN8EFjfU8D8jds03KOzAFnGM59P9+MBP80FgPTThfexz/DnbZOEt+6DEn0R3Umc4Fh1rNtei2WYPH8QMbpZiKO8pds+nPg8ZaCGm2dT3FZNDC1bMwFplkOVKkiBSRIlJEivlo9yPZcZzZKJaDz+AguNShpUBIAYoT6vfS32LlLhofiPLH4HsNohJjlydRtJS4+nstdDeoAbcjkJFAcRJM4v9pVj4dchpN9ileEzzaoDoO+hgW0gPF2bQQjolgnNGOlq/AY49UX+Vuk5oSQ0IqwRiPXEEUT58Vyns/ZwDfQuNDFkIXoJqXK7yixrgUtJZrKDb6pHtzi1kf0qRzAbgLRvjkd+D7vYlknIKKt6HY6ZOmPmYruAWmapIxHJwGx0DC55xTYF3Ug7e1PE7xi1HgMrgBlqjsm1leT8gKHgLQItKsgHPpnIW4WDlt0+po2i08RnkPNgScN5ahHbwqcF25a6ovlLt0mX5/hVpAGRgKJjOJNnyP7VR/rkIoYrm+m5/xJtMisIefCqaCNsBWQ8YRW+c+R/m+rzQkhPqPcp1CwpoQ0jtutLCcVO7Kfhjvu1Xx58+DkDprJoRtiCvMYLAUzOF+or1BP55axGHucO2bJf9D1IJNTAkP7kjUSC4HcpkO6nBpX+cVeMpPravgkdK7fxReR/s/hiwyiRSRIlJEikgRKSJFpIiU/I6fAgwAWoa5ny1IpuEAAAAASUVORK5CYII=\" style=\"width:30px;vertical-align:middle;\"></span>\r\n  </li>\r\n  <li><a href=\"index.html\" class=\"leftico_btn home_btn active\">首页</a></li>\r\n  <li><a href=\"page/myBuyCar.html\" class=\"leftico_btn plan_btn\">购车方案</a></li>\r\n  <li><a href=\"page/orderTrack.html\" class=\"leftico_btn order_btn\">订单跟踪</a></li>\r\n  <li><a href=\"page/user-info.html\" class=\"leftico_btn customer_btn\">个人中心</a></li>\r\n  <li><a href=\"page/helpIndex.html\" class=\"leftico_btn help_btn\">用户帮助</a></li>\r\n  <li style=\"display: none;\" class=\"changeR\"><a href=\"javascript:;\">更换账号</a></li>\r\n</ul>\r\n</div>\r\n    </div>\r\n  </asidebar>\r\n  <asidebar v-ref:asideT  :show.sync=\"showTopAside\"  :placement.sync=\"top\" >\r\n    <div class=\"citylist\"   slot=\"body\" @click=\"showTopAside=false\">\r\n            <div class=\"hd\">\r\n                <h2 class=\"pagetitle\">\r\n                    <span>选择车辆交付城市</span>\r\n                    <a class=\"iclick iclick3\"></a>\r\n                </h2>\r\n            </div>\r\n            <div id=\"listCity\">         <ul class=\"cityname clearfix\">                              <li class=\"city-on\" data_id=\"7d04e3a1-ee87-431c-9aa7-ac245014c51a\"><span>上海市</span></li>                              <li data_id=\"32ed1176-5960-4749-a034-d07dbe314ca6\" class=\"\"><span>苏州市</span></li>                              <li data_id=\"950c8ea4-103e-48c3-834b-88e3c2abc402\" class=\"\"><span>无锡市</span></li>                              <li data_id=\"6f15ab2f-4132-4a31-9e95-ee7920d39290\" class=\"\"><span>扬州市</span></li>                              <li data_id=\"a8fefdfa-1ff5-4b99-8493-6aea6d522597\" class=\"\"><span>杭州市</span></li>                              <li data_id=\"6f14e5e3-bcf1-4e56-b844-51f83f90b7b7\" class=\"\"><span>南京市</span></li>                              <li data_id=\"6d46f05c-5059-4ec7-8aa7-cd9229244cbd\" class=\"\"><span>宁波市</span></li>                              <li data_id=\"551c7d77-ebfc-47cd-bcfa-bc888187a82d\" class=\"\"><span>盐城市</span></li>                              <li data_id=\"74c98897-6588-4e2b-9edf-1de7aa18bef9\" class=\"\"><span>徐州市</span></li>                              <li data_id=\"d4107a05-c17e-47c1-af35-c3eb19956306\" class=\"\"><span>合肥市</span></li>                              <li data_id=\"5c90ed55-a88b-4ce9-8709-50750346ba69\" class=\"\"><span>南昌市</span></li>                              <li data_id=\"9420aade-7fcb-47b3-bac1-ea204d253a40\" class=\"\"><span>北京市</span></li>                              <li data_id=\"8071d483-4845-474f-ba0f-703885dc0886\" class=\"\"><span>济南市</span></li>                              <li data_id=\"bcaa135c-d1ad-415d-8d43-e6fed4ec545e\" class=\"\"><span>青岛市</span></li>                              <li data_id=\"325ec6fe-92c2-488c-8194-35dd0d301491\" class=\"\"><span>郑州市</span></li>                              <li data_id=\"f2da9bf7-27dc-4f84-a776-b99d2dad71f5\" class=\"\"><span>武汉市</span></li>                              <li data_id=\"631afada-1f81-4af4-b6fd-b45af91145d3\" class=\"\"><span>诸城市</span></li>                      </ul>     </div>\r\n    </div>\r\n  </asidebar>\r\n\r\n\r\n    <!-- <p v-if=\"authenticating\" style=\"color:red\">Authenticating...</p>\r\n    <h1 v-text=\"header\">App Header</h1>\r\n    <nav>\r\n    <a v-link=\"{ name: 'my_views' }\">my-views</a>\r\n    <a v-link=\"{ name: 'my_views_detail', params: { viewId:vvv } }\">  my-views >>> viewId:123</a>\r\n    <a v-link=\"{ name: 'about' }\">about</a>\r\n    <a v-link=\"{ path: '/forbidden' }\">forbidden</a>\r\n    <a v-link=\"{ path: '/nofound' }\">404</a>\r\n    <a v-link=\"{ path: '/modal_view' }\">含有弹窗的页面</a>\r\n    <a v-link=\"{ name: 'select_view' }\">含有select的页面</a>\r\n    <a v-link=\"{ name: 'radio_view' }\">含有radio的页面</a>\r\n    <button @click=\"showModal = !showModal\">Show Modal</button>\r\n    <button @click=\"showLeftAside = true\">Show Aside left</button>\r\n    <button @click=\"showRightAside = true\">Show Aside right</button>\r\n    <button @click=\"showTopAside = true\">Show Aside top</button>\r\n    <button @click=\"showBottomAside = true\">Show Aside bottom</button>\r\n    </nav> -->\r\n\r\n    <router-view id=\"main\" class=\"view mainautow mainhd \" keep-alive transition=\"fade\" transition-mode=\"out-in\"></router-view>\r\n    <loading :showloading.sync=\"showLoading1\"></loading>\r\n\r\n\r\n\r\n\r\n    <modal :show.sync=\"showModal\" v-ref:index-modal > <!--此种写法详情 https://github.com/yyx990803/vue/issues/1325 搜 Shorthands -->\r\n      <!--\r\n\r\n        你可以添加自定义的内容\r\n        比如：可以通过\r\n\r\n          <h3 slot=\"body\">自定义内容</h3>\r\n\r\n        然后在组件模板（modal.vue）中\r\n        ···                                          ···\r\n        <div class=\"modal-body\">                     <div class=\"modal-body\">\r\n          <slot name=\"body\">\r\n            default body           最终会生成 =>        <h3 slot=\"body\">自定义内容</h3>\r\n          </slot>\r\n        </div>                                       </div>\r\n        ···                                          ···\r\n\r\n        如果不定义 <h3 slot=\"body\">自定义内容</h3> ，那么就是\r\n        ···\r\n        <div class=\"modal-body\">\r\n            default body\r\n        </div>\r\n        ···\r\n\r\n      -->\r\n\r\n      <h3 slot=\"body\"><span v-text=\"modalbody\"></span></h3>\r\n      <h3 slot=\"header\">内容</h3>\r\n    </modal>\r\n\r\n  </div>";

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(router){
		router.map({
			'/':{
				name:'home',
				component: __webpack_require__(160)
			},
			// not found handler
		    '*': {
		      component: __webpack_require__(165)
		    },
			'/product_detail_view/:carId': {
				name:'product_detail_view',
				component: __webpack_require__(170)
			},
			'/my_buy_car/:carId': {
				name:'my_buy_car_view',
				component: __webpack_require__(184)
			},
			'/book1/:carId': {
				name:'book1_view',
				component: __webpack_require__(191)
			},
			'/book2/:carId': {
				name:'book2_view',
				component: __webpack_require__(196)
			},
			'/book3/:carId': {
				name:'book3_view',
				component: __webpack_require__(201)
			},
			'/book4/:carId': {
				name:'book4_view',
				component: __webpack_require__(206)
			},
			'/checkout/:shoppingCarId': {
				name:'checkout_view',
				component: __webpack_require__(211)
			},
			'/pay_success/':{
				name:'pay_success_view',
				component: __webpack_require__(218)
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
			//如果是中止，这里可以判断用户登录
			console.log(transition.to.path);
			if(transition.to.path!=='/'){
				router.app.isIndex = false;
			}
			if(transition.to.path === '/forbidden'){
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
	
		router.afterEach(function(transition){
			setTimeout(function(){
				window.scrollTo(0,0);
			},180);
		});
	
	}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(161)
	module.exports.template = __webpack_require__(162)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
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
/* 161 */
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
				this.$root.$set('isIndex',true);
				transition.next();
			}
		},
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\r\n      <div v-link=\"{ name: 'product_detail_view', params:{carId:'df38ad93-a7d4-43ed-8b4a-abe638be4b2c'} }\" style=\"position:fixed;top:0;left:0;right:0;bottom:0;background:red;z-index: 1;opacity: 0;\"></div>\r\n        <div class=\"main_cnt\" >\r\n\r\n            <div class=\"car_logo_outer_wrap\">\r\n                <div class=\"car_logo_outer\">\r\n                    <div class=\"btm-hd\">热门品牌<a href=\"page/brandList.html\" class=\"btm-hd-more\">更多 &gt;</a></div>\r\n                    <ul class=\"car_logo_wrap clearfix\">                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=f1081335-9341-4a8c-844c-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/171346171872.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/171346171872.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=b39740fe-4a3c-4050-8ec4-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/201505145311.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/201505145311.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=d76f2674-e1f5-4462-9438-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/201503529815.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/201503529815.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=79593743-ae0d-412e-9d99-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/171343075498.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/171343075498.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=8e13baa4-8ad2-4664-ab33-a4ed00ecd301&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/201502071323.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/201502071323.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=87c054fe-d3ea-4e6d-ba4c-a4ed00ecd303&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/201503221852.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/201503221852.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=23f8cd30-22c2-4102-b043-a4f700e46843&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/171351352365.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/171351352365.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=26e1e2cc-7847-4f9d-a800-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201509/091026325232.jpg\" src=\"http://img.yaomaiche.com/upload/image/original/201509/091026325232.jpg\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=aa4576dd-113e-428a-bef5-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/201514327424.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/201514327424.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>                      <li class=\"car_logo\">                 <a href=\"page/car-series-list.html?carBrandId=525d2826-3ca4-43ac-9e5f-a4ed00ecd300&amp;isAll=false\" class=\"wh100\">                     <img attrsrc=\"/upload/image/original/201508/171345239098.png\" src=\"http://img.yaomaiche.com/upload/image/original/201508/171345239098.png\" title=\"\" class=\"attrSrc\">                 </a>             </li>              </ul>\r\n                </div>\r\n            </div>\r\n            <div class=\"car_list hotCar\">\r\n                <div class=\"btm-hd\">热销车型</div>\r\n                <div class=\"hotCarCon\">         <div class=\"car_prod1\">             <a href=\"page/product.html?id=df38ad93-a7d4-43ed-8b4a-abe638be4b2c\" class=\"wh100 loHref\" lid=\"df38ad93-a7d4-43ed-8b4a-abe638be4b2c\">                 <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/f9e0eb84-a7e6-4d72-85fb-ffa20907e302.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/f9e0eb84-a7e6-4d72-85fb-ffa20907e302.png);\"></div>                 <div class=\"car_info\">                     <h2 class=\"car_name\">起亚K3</h2>                     <p class=\"car_intro ellips\">【test】【test】2015款 1.6L 自动GLS 暗樱红 米色【3082】</p>                     <div class=\"price_wrap tr\">                         <del>指导价：<em data-price=\"priWan\">10.00万</em></del>                         <p>要买车价：<span class=\"price\" data-price=\"priWan\">9.80万</span></p>                     </div>                 </div>             </a>         </div>         <div class=\"car_prod2_wrap\">             <ul>                                                                                                     <li>                              <a href=\"page/product.html?id=97ae9e26-971f-4561-b180-c28705df9ae8\" class=\"wh100 loHref\" lid=\"97ae9e26-971f-4561-b180-c28705df9ae8\">                                  <div class=\"car_prod2 clearfix\">                                     <div class=\"car_img fl\" atrimg=\"/upload/image/original/carGoods/03c1276c-f091-4e1d-81d3-674fde891d97.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/03c1276c-f091-4e1d-81d3-674fde891d97.png);\"></div>                                     <div class=\"car_info fl abs_size\">                                         <h2 class=\"car_name\">起亚K3</h2>                                         <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 檀木黑 米色【3084】</p>                                         <div class=\"price_wrap\">                                             <del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                             <p>要买车价：<span class=\"price\" data-price=\"priWan\">9.80万</span></p>                                         </div>                                     </div>                                 </div>                             </a>                         </li>                                                                                    <li>                              <a href=\"page/product.html?id=010707e0-8d85-44ab-85db-bbb802f40b93\" class=\"wh100 loHref\" lid=\"010707e0-8d85-44ab-85db-bbb802f40b93\">                                  <div class=\"car_prod2 clearfix\">                                     <div class=\"car_img fl\" atrimg=\"/upload/image/original/carGoods/b0d5d053-af29-4476-830f-d2c078dae50a.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/b0d5d053-af29-4476-830f-d2c078dae50a.png);\"></div>                                     <div class=\"car_info fl abs_size\">                                         <h2 class=\"car_name\">起亚K3</h2>                                         <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 冰海蓝 米色【3083】</p>                                         <div class=\"price_wrap\">                                             <del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                             <p>要买车价：<span class=\"price\" data-price=\"priWan\">9.80万</span></p>                                         </div>                                     </div>                                 </div>                             </a>                         </li>                                                                                    <li>                              <a href=\"page/product.html?id=03764279-d763-4391-ab10-a51e0134a344\" class=\"wh100 loHref\" lid=\"03764279-d763-4391-ab10-a51e0134a344\">                                  <div class=\"car_prod2 clearfix\">                                     <div class=\"car_img fl\" atrimg=\"/upload/image/original/201510/091623533576.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/201510/091623533576.png);\"></div>                                     <div class=\"car_info fl abs_size\">                                         <h2 class=\"car_name\">北京40</h2>                                         <p class=\"car_intro\">北京40 2014款 2.4L 手动征途版</p>                                         <div class=\"price_wrap\">                                             <del>指导价：<em data-price=\"priWan\">0.00万</em></del>                                             <p>要买车价：<span class=\"price\" data-price=\"priWan\">0.00万</span></p>                                         </div>                                     </div>                                 </div>                             </a>                         </li>                                                   </ul>         </div>     </div>\r\n            </div>\r\n            <div class=\"car_list newCar\">\r\n                <div class=\"btm-hd\">最新上架</div>\r\n                <div class=\"newCarCon\">     <div class=\"car_prod1\">         <a href=\"page/product.html?id=f34aabec-3241-48b8-afa6-22c1908accfb\" class=\"wh100 loHref\" lid=\"f34aabec-3241-48b8-afa6-22c1908accfb\">             <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/e94a3d7e-a77c-4263-80c4-248a66b37223.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/e94a3d7e-a77c-4263-80c4-248a66b37223.png);\"></div>             <div class=\"car_info\">                 <h2 class=\"car_name\">起亚K3</h2>                 <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 冰海蓝 黑色【3076】</p>                 <div class=\"price_wrap tr\">                     <del>指导价：<em data-price=\"priWan\">10.00万</em></del>                     <p>要买车价：<span class=\"price\" data-price=\"priWan\">9.80万</span></p>                 </div>             </div>         </a>     </div>     <div class=\"car_prod3_wrap\">         <ul class=\"car_prod3 clearfix\">                                                                              <li>                     <a href=\"page/product.html?id=31d020ca-1e1d-470e-8dcc-2b91e6824694\" class=\"wh100 loHref\" lid=\"31d020ca-1e1d-470e-8dcc-2b91e6824694\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/4c4a1150-a06e-4801-925f-ddf18ec3d07b.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/4c4a1150-a06e-4801-925f-ddf18ec3d07b.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 暗樱红 黑色【3077】</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">10.89万</em></del>                                 <span class=\"price\" data-price=\"priWan\">10.68万</span></p>                             </div>                         </div>                     </a>                 </li>                                                                <li>                     <a href=\"page/product.html?id=8e13ce82-9e63-4cdb-a54d-39bf17c9e743\" class=\"wh100 loHref\" lid=\"8e13ce82-9e63-4cdb-a54d-39bf17c9e743\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/a83ca2c2-7696-46aa-a3f3-21c6eaa4a0a2.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/a83ca2c2-7696-46aa-a3f3-21c6eaa4a0a2.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 钻石银 米色【3078】</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                 <span class=\"price\" data-price=\"priWan\">9.80万</span></p>                             </div>                         </div>                     </a>                 </li>                                                                <li>                     <a href=\"page/product.html?id=b5cd3818-c16d-4386-8b69-5de377a4088c\" class=\"wh100 loHref\" lid=\"b5cd3818-c16d-4386-8b69-5de377a4088c\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/02d18c02-5d96-4305-b2c9-e6b3c9e6952d.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/02d18c02-5d96-4305-b2c9-e6b3c9e6952d.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 檀木黑 黑色【3079】</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                 <span class=\"price\" data-price=\"priWan\">9.80万</span></p>                             </div>                         </div>                     </a>                 </li>                                                                <li>                     <a href=\"page/product.html?id=4e2ef1e1-d44d-49e2-ad8c-66e17f05cda1\" class=\"wh100 loHref\" lid=\"4e2ef1e1-d44d-49e2-ad8c-66e17f05cda1\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/88be411f-0d69-4ea1-bc14-20b757321692.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/88be411f-0d69-4ea1-bc14-20b757321692.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 汉玉白 黑色【3080】</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                 <span class=\"price\" data-price=\"priWan\">9.80万</span></p>                             </div>                         </div>                     </a>                 </li>                                                                <li>                     <a href=\"page/product.html?id=d28b54dc-f2c7-49be-8beb-92069cb639fb\" class=\"wh100 loHref\" lid=\"d28b54dc-f2c7-49be-8beb-92069cb639fb\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/carGoods/aa758fc9-b834-490b-9dba-735f6d193ec8.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/aa758fc9-b834-490b-9dba-735f6d193ec8.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">【test】【test】2015款 1.6L 自动GLS 钻石银 黑色【3081】</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">10.00万</em></del>                                 <span class=\"price\" data-price=\"priWan\">9.80万</span></p>                             </div>                         </div>                     </a>                 </li>                                                                <li>                     <a href=\"page/product.html?id=03764279-d763-4391-ab10-a51e0134a344\" class=\"wh100 loHref\" lid=\"03764279-d763-4391-ab10-a51e0134a344\">                         <div class=\"car_img\" atrimg=\"/upload/image/original/201510/091623533576.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/201510/091623533576.png);\"></div>                         <div class=\"car_info\">                             <p class=\"car_intro\">北京40 2014款 2.4L 手动征途版</p>                             <div class=\"price_wrap\">                                 <p><del>指导价：<em data-price=\"priWan\">0.00万</em></del>                                 <span class=\"price\" data-price=\"priWan\">0.00万</span></p>                             </div>                         </div>                     </a>                 </li>                                       </ul>     </div>     </div>\r\n            </div>\r\n            <!-- <div style=\"line-height:45px;text-align:right;\">\r\n                <a href=\"http://old.yaomaiche.com/lastversion\" style=\"border-bottom: 1px solid black;margin-right:20px;\">怀念旧版？请点我</a>\r\n            </div> -->\r\n            <div class=\"buy-note\">\r\n                <div class=\"btm-hd\">购车笔记</div>\r\n                <ul>\r\n                    <li>\r\n                        <a href=\"page/common02.html\">\r\n                            <img width=\"100%\" alt=\"\" src=\"" + __webpack_require__(163) + "\">\r\n                        </a>\r\n                    </li>\r\n                     <li>\r\n                        <a href=\"page/common03.html\">\r\n                            <img width=\"100%\" alt=\"\" src=\"" + __webpack_require__(164) + "\">\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"we-promise\">\r\n                <div class=\"btm-hd\">我们的承诺</div>\r\n                <ul class=\"clearfix\">\r\n                    <li>\r\n                        <i class=\"i3 i3-promise i3-promise1\"></i>\r\n                        <span>自控车源</span>\r\n                    </li>\r\n                    <li>\r\n                        <i class=\"i3 i3-promise i3-promise2\"></i>\r\n                        <span>自营门店</span>\r\n                    </li>\r\n                    <li>\r\n                        <i class=\"i3 i3-promise i3-promise3\"></i>\r\n                        <span>自信车价</span>\r\n                    </li>\r\n                    <li>\r\n                        <i class=\"i3 i3-promise i3-promise4\"></i>\r\n                        <span>自在体验</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <footer class=\"btm-footer\">\r\n                <span class=\"btm-logo\"><i class=\"i3 i3-logo\"></i></span>\r\n            </footer>\r\n        </div>\r\n</div>";

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1ee732d88eb1a6e8d1e18144607e7812.jpg"

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2f538b1b8acaef0a1156097730b50b12.jpg"

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(166)
	module.exports = __webpack_require__(168)
	module.exports.template = __webpack_require__(169)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
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
/* 166 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 167 */,
/* 168 */
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
/* 169 */
/***/ function(module, exports) {

	module.exports = "<p>404</p>";

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(171)
	module.exports = __webpack_require__(173)
	module.exports.template = __webpack_require__(182)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./product_detail.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./product_detail.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./product_detail.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./product_detail.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./product_detail.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 171 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 172 */,
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(174);
		module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'车辆详情',
					msg:'这里返回数据',
					carId:'df38ad93-a7d4-43ed-8b4a-abe638be4b2c'
				}
			},
			//这里才是route的生存周期
			route:{
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				}
			},
			ready:function(){
				//事件绑定
				document.body.addEventListener('click',this.hideWrap,false);
			},
			destroyed:function(){
				//移除事件
				document.body.removeEventListener('click',this.hideWrap,false);
				console.log('组件销毁-移除事件绑定');
			}
		}

/***/ },
/* 174 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div style=\"padding-top:51px;\">\r\n        <div class=\"proBaseInfo\">             <div class=\"sliderImg\">                 <div class=\"proImg\" atrimg=\"/upload/image/original/carGoods/f9e0eb84-a7e6-4d72-85fb-ffa20907e302.png\" style=\"background-image: url(http://img.yaomaiche.com/upload/image/original/carGoods/f9e0eb84-a7e6-4d72-85fb-ffa20907e302.png);\"></div>                 <div class=\"attention\">243</div>                 <span class=\"ptx\">此图片仅供参考</span>             </div>             <ul>                 <li>                     <h1>【test】【test】2015款 1.6L 自动GLS 暗樱红 米色【3082】</h1></li>                 <li>                     <div class=\"proPrice\">                         <span class=\"priceoff\"><b>¥<i>9.80</i></b>&nbsp;万元<em>直降2000元</em></span>                         <span>厂商指导价：<em><i>10.00</i>万元</em></span>                     </div>                 </li>                 <li style=\"display:none\">                     <div class=\"proExt\">null</div>                 </li>                 <li>                     <div class=\"protip clearfix\">                         <div class=\"fl tips\">支持30天无理由退车</div>                         <div class=\"fr proID\"><span>商品编号：</span>CN_TEST_3082</div>                     </div>                 </li>             </ul>             <input id=\"shareUrl\" data-url=\"\" type=\"hidden\">             <input id=\"shareText\" data-txt=\"【test】【test】2015款 1.6L 自动GLS 暗樱红 米色【3082】\" type=\"hidden\">             <input id=\"shareImg\" data-img=\"/upload/image/original/carGoods/f9e0eb84-a7e6-4d72-85fb-ffa20907e302.png\" type=\"hidden\">          </div>\r\n        <div class=\"detailList mt10\">             <div class=\"arrow item_arr-down clearfix\">                 <h3>外观颜色</h3>                 <p class=\"op\"><i style=\"background-color:#860114\"></i>                 <em>暗樱红</em></p>             </div>             <div class=\"chioceC chioceC-O none\">                 <ul class=\"clearfix\">                                              <li class=\"select\">                             <span cgid=\"df38ad93-a7d4-43ed-8b4a-abe638be4b2c\">                                 <i style=\"background-color:#860114\"></i><em>暗樱红</em>                             </span>                         </li>                                              <li class=\"\">                             <span cgid=\"9e4e6316-c0e8-4eea-909f-020f0df55e79\">                                 <i style=\"background-color:#F0F0F0\"></i><em>汉玉白</em>                             </span>                         </li>                                              <li class=\"\">                             <span cgid=\"abc704a4-fa3b-448e-b565-041fe6393729\">                                 <i style=\"background-color:#FEFEFE\"></i><em>透明白</em>                             </span>                         </li>                                              <li class=\"\">                             <span cgid=\"8e13ce82-9e63-4cdb-a54d-39bf17c9e743\">                                 <i style=\"background-color:#BFBFBF\"></i><em>钻石银</em>                             </span>                         </li>                                              <li class=\"\">                             <span cgid=\"010707e0-8d85-44ab-85db-bbb802f40b93\">                                 <i style=\"background-color:#536C84\"></i><em>冰海蓝</em>                             </span>                         </li>                                              <li class=\"\">                             <span cgid=\"97ae9e26-971f-4561-b180-c28705df9ae8\">                                 <i style=\"background-color:#1A1A1A\"></i><em>檀木黑</em>                             </span>                         </li>                                      </ul>             </div>             <div class=\"arrow item_arr-down clearfix\">                 <h3>内饰颜色</h3>                 <p class=\"ip\"><i style=\"background-color:#b6aa9c\"></i>                 <em>米色</em></p>             </div>             <div class=\"chioceC chioceC-I none\">                 <ul class=\"clearfix\">                                           <li class=\"select\">                         <span cgid=\"df38ad93-a7d4-43ed-8b4a-abe638be4b2c\">                             <i style=\"background-color:#b6aa9c\"></i><em>米色</em>                         </span>                      </li>                                           <li class=\"\">                         <span cgid=\"31d020ca-1e1d-470e-8dcc-2b91e6824694\">                             <i style=\"background-color:#000000\"></i><em>黑色</em>                         </span>                      </li>                                      </ul>             </div>             <div class=\"arrow clearfix item_arr-right\">                 <h3>线下交付中心</h3>                 <p class=\"add\">上海博大店</p>             </div>             <div class=\"chioceC chioceC-add none\">                 <ul class=\"clearfix\">                                              <li class=\"select\"><span storeid=\"50f17477-981d-4099-a73d-87942ef51397\">上海博大店</span></li>                                      </ul>             </div>              <div class=\"itemNone disabled carSource\">                 <span class=\"ico1 ico_arrow-right\"></span>                 <div class=\"clearfix\">                     <h3>车源地</h3>                     <p>(<span class=\"cor_red\">售罄</span>)</p>                 </div>                 <span class=\"fs12\">预计运输时间<em class=\"cor_red\"> 3 </em>个工作日，我们将在2小时内联系您</span>             </div>             <div style=\"display:none\" class=\"itemNone car-freight\">                 <div class=\"clearfix\">                     <h3>异地运输费</h3>                     <p>¥0.00</p>                 </div>             </div>             <input id=\"zStoreId\" data-txt=\"50f17477-981d-4099-a73d-87942ef51397\" type=\"hidden\">             <input id=\"zCgId\" data-txt=\"df38ad93-a7d4-43ed-8b4a-abe638be4b2c\" type=\"hidden\">         </div>\r\n        <div class=\"comment mt10 none\">\r\n            <a href=\"#\" class=\"blockA\">\r\n            <div class=\"comment-t item_arr-right\">用户评论</div>\r\n            <div class=\"comment-b\">\r\n                <ul>\r\n                    <li>\r\n                        <div class=\"cominfo\">\r\n                            <b>沛迷的Tonny</b>\r\n                            <span class=\"fr\">10分钟前</span>\r\n                        </div>\r\n                        <div class=\"comtext\">这个汽车性能很好，落地后建议增加行车记录仪，升级下仪表\r\n        盘，能看胎压的......</div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            </a>\r\n        </div>\r\n        <div class=\"proDesc\">\r\n            <div class=\"tab tabA abs_size clearfix\" trigger=\"click\">\r\n                <a href=\"javascript:void(0)\" class=\"current\" rel=\"0\"><span>参数配置</span></a>\r\n                <a href=\"javascript:void(0)\" rel=\"1\"><span>购车流程</span></a>\r\n            </div>\r\n            <div class=\"tabc attr\">             <table>                                      <tbody><tr>                         <th colspan=\"2\">                             <h3>基础信息</h3>                         </th>                     </tr>                                              <tr>                             <td>品牌</td>                             <td>起亚</td>                         </tr>                                               <tr>                             <td>车系</td>                             <td>起亚K3</td>                         </tr>                                               <tr>                             <td>车款名称</td>                             <td>起亚K3 2015款 1.6L 自动GLS</td>                         </tr>                                               <tr>                             <td>保修政策</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>发动机</td>                             <td>1.6L 128马力 L4</td>                         </tr>                                               <tr>                             <td>排量(L)</td>                             <td>1.6</td>                         </tr>                                               <tr>                             <td>动力类型</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>变速箱</td>                             <td>6挡手自一体</td>                         </tr>                                               <tr>                             <td>长*宽*高(mm)</td>                             <td>4600*1780*1445</td>                         </tr>                                               <tr>                             <td>车身结构</td>                             <td>4门5座三厢车</td>                         </tr>                                               <tr>                             <td>上市年份</td>                             <td>2015款</td>                         </tr>                                               <tr>                             <td>最高车速(km/h)</td>                             <td>190</td>                         </tr>                                               <tr>                             <td>官方0-100km/h加速(s)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>实测0-100km/h加速(s)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>实测100-0km/h制动(m)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>市区工况油耗(L/100km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>市郊工况油耗(L/100km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>综合工况油耗(L/100km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>网友油耗(L/100km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>实测油耗(L/100km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>工信部综合油耗(L/100km)</td>                             <td>6.3</td>                         </tr>                                               <tr>                             <td>实测离地间隙(mm)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>整车质保</td>                             <td>三年或10万公里</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>车身</h3>                         </th>                     </tr>                                              <tr>                             <td>长度(mm)</td>                             <td>4600</td>                         </tr>                                               <tr>                             <td>宽度(mm)</td>                             <td>1780</td>                         </tr>                                               <tr>                             <td>高度(mm)</td>                             <td>1445</td>                         </tr>                                               <tr>                             <td>轴距(mm)</td>                             <td>2700</td>                         </tr>                                               <tr>                             <td>前轮距(mm)</td>                             <td>1555</td>                         </tr>                                               <tr>                             <td>后轮距(mm)</td>                             <td>1568</td>                         </tr>                                               <tr>                             <td>最小离地间隙(mm)</td>                             <td>150</td>                         </tr>                                               <tr>                             <td>接近角(°)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>离去角(°)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>整备质量(kg)</td>                             <td>1280</td>                         </tr>                                               <tr>                             <td>满载质量(kg)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车身结构</td>                             <td>4门5座三厢车</td>                         </tr>                                               <tr>                             <td>车门数(个)</td>                             <td>4</td>                         </tr>                                               <tr>                             <td>座位数(个)</td>                             <td>5</td>                         </tr>                                               <tr>                             <td>油箱容积(L)</td>                             <td>50</td>                         </tr>                                               <tr>                             <td>行李厢容积(L)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>行李厢盖开合方式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>行李厢打开方式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车顶型式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车篷型式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后导流尾翼</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>运动包围</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>发动机</h3>                         </th>                     </tr>                                              <tr>                             <td>发动机型号</td>                             <td>1.6γ</td>                         </tr>                                               <tr>                             <td>发动机位置</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>进气形式</td>                             <td>自然吸气</td>                         </tr>                                               <tr>                             <td>气缸排列形式</td>                             <td>L</td>                         </tr>                                               <tr>                             <td>气缸数(个)</td>                             <td>4</td>                         </tr>                                               <tr>                             <td>每缸气门数(个)</td>                             <td>4</td>                         </tr>                                               <tr>                             <td>气门结构</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>压缩比</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>配气机构</td>                             <td>DOHC</td>                         </tr>                                               <tr>                             <td>缸径(mm)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>行程(mm)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>最大马力(Ps)</td>                             <td>128</td>                         </tr>                                               <tr>                             <td>最大功率(kW)</td>                             <td>93.8</td>                         </tr>                                               <tr>                             <td>最大功率转速(rpm)</td>                             <td>6300</td>                         </tr>                                               <tr>                             <td>最大扭矩(N·m)</td>                             <td>156</td>                         </tr>                                               <tr>                             <td>最大扭矩转速(rpm)</td>                             <td>4850</td>                         </tr>                                               <tr>                             <td>发动机特有技术</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>燃料形式</td>                             <td>汽油</td>                         </tr>                                               <tr>                             <td>燃油标号</td>                             <td>93号(京92号)</td>                         </tr>                                               <tr>                             <td>供油方式</td>                             <td>多点电喷</td>                         </tr>                                               <tr>                             <td>燃油箱容积(L)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>缸盖材料</td>                             <td>铝</td>                         </tr>                                               <tr>                             <td>缸体材料</td>                             <td>铝</td>                         </tr>                                               <tr>                             <td>环保标准</td>                             <td>国IV(国V)</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>电动机</h3>                         </th>                     </tr>                                              <tr>                             <td>电动机总功率(kW)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电动机总扭矩(N·m)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前电动机最大功率(kW)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前电动机最大扭矩(N·m)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后电动机最大功率(kW)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后电动机最大扭矩(N·m)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电池支持最高续航里程(km)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电池容量(kWh)</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>变速箱</h3>                         </th>                     </tr>                                              <tr>                             <td>简称</td>                             <td>6挡手自一体</td>                         </tr>                                               <tr>                             <td>挡位个数</td>                             <td>6</td>                         </tr>                                               <tr>                             <td>变速箱类型</td>                             <td>自动变速箱(AT)</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>底盘转向</h3>                         </th>                     </tr>                                              <tr>                             <td>驱动方式</td>                             <td>前置前驱</td>                         </tr>                                               <tr>                             <td>四驱形式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>中央差速器结构</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前悬架类型</td>                             <td>麦弗逊式独立悬架</td>                         </tr>                                               <tr>                             <td>后悬架类型</td>                             <td>扭力梁式非独立悬架</td>                         </tr>                                               <tr>                             <td>助力类型</td>                             <td>电动助力</td>                         </tr>                                               <tr>                             <td>车体结构</td>                             <td>承载式</td>                         </tr>                                               <tr>                             <td>空气悬挂</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>可调悬挂</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前悬挂类型</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后悬挂类型</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>中央差速器锁</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>车轮制动</h3>                         </th>                     </tr>                                              <tr>                             <td>前制动器类型</td>                             <td>通风盘式</td>                         </tr>                                               <tr>                             <td>后制动器类型</td>                             <td>盘式</td>                         </tr>                                               <tr>                             <td>驻车制动类型</td>                             <td>手刹</td>                         </tr>                                               <tr>                             <td>前轮胎规格</td>                             <td>205/55 R16</td>                         </tr>                                               <tr>                             <td>后轮胎规格</td>                             <td>205/55 R16</td>                         </tr>                                               <tr>                             <td>备胎规格</td>                             <td>非全尺寸</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>安全装备</h3>                         </th>                     </tr>                                              <tr>                             <td>主/副驾驶座安全气囊</td>                             <td>主●/副●</td>                         </tr>                                               <tr>                             <td>前/后排侧气囊</td>                             <td>前●/后-</td>                         </tr>                                               <tr>                             <td>前/后排头部气囊(气帘)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>膝部气囊</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>胎压监测装置</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>零胎压继续行驶</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>安全带未系提示</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>安全带限力功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>安全带预收紧功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前安全带调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排安全带</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排中间三点式安全带</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>ISOFIX儿童座椅接口</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>LATCH儿童座椅接口</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>发动机电子防盗</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>车内中控锁</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>中控门锁</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>儿童锁</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>遥控钥匙</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>无钥匙启动系统</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>无钥匙进入系统</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>防盗报警器</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>发动机防盗锁止</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>操控配置</h3>                         </th>                     </tr>                                              <tr>                             <td>ABS防抱死</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>制动力分配(EBD/CBC等)</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>刹车辅助(EBA/BAS/BA等)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>牵引力控制(ASR/TCS/TRC等)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车身稳定控制(ESC/ESP/DSC等)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>随速助力转向调节(EPS)</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>上坡辅助</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>自动驻车</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>并线辅助</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车道偏离预警系统</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>陡坡缓降</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>可变悬架</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>空气悬架</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>可变转向比</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前桥限滑差速器/差速锁</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>中央差速器锁止功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后桥限滑差速器/差速锁</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>外部配置</h3>                         </th>                     </tr>                                              <tr>                             <td>开门方式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电动天窗</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>全景天窗</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>防紫外线/隔热玻璃</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电动窗防夹功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>天窗开合方式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>天窗型式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>天窗最大开启程度</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>运动外观套件</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>铝合金轮圈</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>电动吸合门</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>侧滑门</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电动后备厢</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>内部配置</h3>                         </th>                     </tr>                                              <tr>                             <td>真皮方向盘</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>方向盘调节</td>                             <td>上下+前后调节</td>                         </tr>                                               <tr>                             <td>方向盘电动调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>多功能方向盘</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>方向盘记忆</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>方向盘换挡</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>方向盘加热</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>泊车辅助</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>自动泊车入位</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>定速巡航</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>自适应巡航</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前/后驻车雷达</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>倒车视频影像</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>全景摄像头</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>行车电脑显示屏</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>HUD抬头数字显示</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>盲点检测</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>座椅配置</h3>                         </th>                     </tr>                                              <tr>                             <td>真皮/仿皮座椅</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>运动风格座椅</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>座椅高低调节</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>腰部支撑调节</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>肩部支撑调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>驾驶座电动调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>副驾驶座电动调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>第二排靠背角度调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>第二排座椅移动</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排座椅电动调节</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>电动座椅记忆</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>前排座椅加热</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排座椅加热</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前/后排座椅通风</td>                             <td>前○/后-</td>                         </tr>                                               <tr>                             <td>前/后排座椅按摩</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排座椅放倒方式</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>第三排座椅</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前/后中央扶手</td>                             <td>前●/后●</td>                         </tr>                                               <tr>                             <td>后排杯架</td>                             <td>●</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>多媒体配置</h3>                         </th>                     </tr>                                              <tr>                             <td>GPS导航系统</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>语音控制系统</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>定位互动服务</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>中控台彩色大屏</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>内置硬盘</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>蓝牙/车载电话</td>                             <td>○</td>                         </tr>                                               <tr>                             <td>车载电视</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排液晶屏</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>外接音源接口(AUX/USB/iPod等)</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>CD支持MP3/WMA</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>单碟CD：</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>虚拟多碟CD：</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>多碟CD：</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>单碟DVD：</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>多碟DVD：</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>多媒体系统</td>                             <td>单碟CD</td>                         </tr>                                               <tr>                             <td>扬声器品牌</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>扬声器数量</td>                             <td>6-7喇叭</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>灯光配置</h3>                         </th>                     </tr>                                              <tr>                             <td>氙气大灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>LED大灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>激光大灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>日间行车灯</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>前大灯自动开闭</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前大灯延时关闭</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>转向辅助灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>转向头灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前照灯照射范围调整</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>会车前灯防眩目功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>前雾灯</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>后雾灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>随动转向大灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>大灯高度可调</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>大灯清洗装置</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车内氛围灯</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车厢前阅读灯</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>玻璃/后视镜</h3>                         </th>                     </tr>                                              <tr>                             <td>前/后电动车窗</td>                             <td>前●/后●</td>                         </tr>                                               <tr>                             <td>车窗防夹手功能</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>防紫外线/隔热玻璃</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后视镜电动调节</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>后视镜加热</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>内/外后视镜自动防眩目</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后视镜电动折叠</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后视镜记忆</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后风挡遮阳帘</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排侧遮阳帘</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后排侧隐私玻璃</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>遮阳板化妆镜</td>                             <td>●</td>                         </tr>                                               <tr>                             <td>后雨刷</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>感应雨刷</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>空调/冰箱</h3>                         </th>                     </tr>                                              <tr>                             <td>空调控制方式</td>                             <td>手动●</td>                         </tr>                                               <tr>                             <td>后排独立空调</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>后座出风口</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>温度分区控制</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车内空气调节/花粉过滤</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>车载冰箱</td>                             <td>-</td>                         </tr>                                                            <tr>                         <th colspan=\"2\">                             <h3>高科技配置</h3>                         </th>                     </tr>                                              <tr>                             <td>主动刹车/主动安全系统</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>整体主动转向系统</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>夜视系统</td>                             <td>-</td>                         </tr>                                               <tr>                             <td>中控液晶屏分屏显示</td>                             <td>-</td>                         </tr>                                                    </tbody></table>         </div>\r\n            <div class=\"tabc\" style=\"display:none\">\r\n                <div class=\"carProcess\">\r\n                      <dl class=\"list\">\r\n                        <dt><span>1</span>线上购车</dt>\r\n                        <dd>选择车型<em>&gt;</em>添加购车方案<em>&gt;</em>下单预定</dd>\r\n                        <dd><span></span></dd>\r\n                        <dt><span>2</span>到店面签</dt>\r\n                        <dd>资料审查<em>&gt;</em>面签预约<em>&gt;</em>线下面签<em>&gt;</em>资料收取</dd>\r\n                        <dd><span></span></dd>\r\n                        <dt><span>3</span>验车付款</dt>\r\n                        <dd>车贷通过<em>&gt;</em>到车确认<em>&gt;</em>验车付款<em>&gt;</em>牌证服务</dd>\r\n                        <dd><span></span></dd>\r\n                        <dt><span>4</span>交车服务</dt>\r\n                        <dd>到店交车<em>&gt;</em>资料交付<em>&gt;</em>庆贺仪式</dd>\r\n                    </dl>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"proAction abs_size clearfix\">\r\n            <a v-link=\"{name:'my_buy_car_view' , params : { carId : $route.params.carId } }\" class=\"btn btn-primary\" href=\"javascript:;\">购车试算</a>\r\n        </div>\r\n        <div id=\"shareDiv\" class=\"bdsharebuttonbox shareDiv bdshare-button-style0-16\" data-tag=\"share\" data-bd-bind=\"1445420734651\">\r\n            <h3>分享到：</h3>\r\n            <ul class=\"flex\">\r\n                <li class=\"flex-item\"><a class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\">新浪微博</a></li>\r\n                <li class=\"flex-item\"><a class=\"bds_tqq\" data-cmd=\"tqq\" title=\"分享到腾讯微博\">腾讯微博</a></li>\r\n            </ul>\r\n        </div>\r\n        <div id=\"shareOver\" style=\"display:none;\">\r\n            <img width=\"100%\" src=\"" + __webpack_require__(183) + "\">\r\n        </div>\r\n    </div>";

/***/ },
/* 183 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAAFeAQMAAADqgWR2AAAAA3NCSVQICAjb4U/gAAAABlBMVEX///////9VfPVsAAAAAnRSTlP/AOW3MEoAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAALvUlEQVR4nO3czY7buhUAYDkuolkMwnQ3C8PMRV9gLrqZAoNRgBRd9hkSZNFlA9zNLNyRHV9cpZsMui+QR6mmDuosijuPMDRcYLY0sgiDMGTPoUhJ9tgeUTRw08IGYmn085niOaT+E+ngTx79fxi3OzAmOzCyHRhxuCF3YAgSbsx2YExouPFTuKH64YY8TYINPgg3ZiINNiY83CDhhqRMhxoizdsbP1+YAdMf2hvvT1IcTPRf2xv5cYKDWP+6vXH1BA1JQ4xJl8I3T9Vv2xu38Tv4nmn5sr2hyCV8j7X8U4BBp/BNtLgNMH6FBUj0YtrekL+fm2GI8Z/nV2Y4v25vsIVJUD29bG/MF2/M8DrAWLBeisPLd+0N8b6f4JAGGPIPZ2iohAYYfzRrBxmqR7E2ZZq0N/RpDw8ahAoxjt6isQgy/mYSNMwYmQY7V2mAcW2MaZAx/YTfl7Kl8dEYZpQWU/yNBfQ95vA4wOAYDNMFFVFpY8hBao2iNtoY6kRbQ+i2RrFvw8+ivTF2I/P2RrYDY7o60sJwP68v2xuuKl2KtTE+F+leplgbQ5iTuCrF2hgyzazV3lApMcOyXtoYp9QMy/i06YOKA0tbKy2Nx8WgzFdf4x38GxWjJMQoGp2ibQ1aFqBMMU/jK65oC1CmmKchcEVZFKBMMU/D9KW8KECZYp6G6UtnxXiZYr7G99XKZVfkG5ffaLd/KnsgbyOuRmlbo8xvF50WBmFuzJxhtzEUyd2qvJrqmR/kR2fM2hqCPHLGpJrqZ7C3xTG2rteupzH7cOYMUk31M24/XFijavnesf23K0fV8r2Nn3t2XVGb6GlcH9mRRW2irzG0I7XQehtXdqQWWm/D9Ty10PoYn9EoDhtqOwYvQ2I1Xrs/0laGwFbmOq96aH3K8ey2Mmb1OR5GPK2Memg9DHPdxBn10PrEhZJil42femi9ykG1vrHjSTtDPqpWrHXIXoZ4/0M5zpfmNDcWrGqrS6H1MOa8Sqzp0pzmxu2sSvClsPjENi93j0stzsv48cKtutTivIxHF24TlsPik2P9064dXQ6LT44lvZd2dLI8xyPH0jdf7OhyWHwM/caOrYTFw/hc9um1QyBPQ09dVa6EpamB3fnU7RdWwtLUwNXnrpVkKzObGZ9w9blbdyUsDY0Z9qNzu66krYwFrs7tusudWGND4Oo8Kf5YDUtDw2SE64Imq3ObGeqMVn+shqWpcVoZq5neOD8eV/FczfTGxui6HL1TpU2NcWWsZnpjI6v2BneqtGlsSWmo1UxvbNDpjRtNWhuXrj+2Z7f+hibULXe3Spsab2lux8Z3ZzY03id2ZE2VNjXY07QYWVOlTQ2e23XXVGnjPllY42rNzIZGefgSr5nZ1LDpsa5KmxrSGm6T2hjKbsPdht/ccJuwrkqbGh07XFelTQ17Knhn9+Rj2HpYl2G+54T5+qlexppG62uszTBPY22GeRps/WQvY311eBkbqsPL2FAdXsaG6vAyNlSHj7GpOnyMTdXhdS62cUZzo7tphsc50Kbq8DDc4WmIsbE6mhtqY3U0NwQNN1gabow2z2pqyLV7Fj+DJeHGcMs8z312a+PjuhMOT2NzhjY3hmm4cRhuqPK6/C9spDTYkN+Mcbl9gb3xyxh6b+yN/wXj3Tdi0M3HUY2N/vaFGhm9XRj4uMU3YBypi2212tAYdLYs0NQ4DjfOV279tDFOgo1huJGOdCfYmOhusKF1tgNDizt3GVoYjAYbn/ONp5XNyxFv7lSbGrWr4+0NGmAIasMaYLBuuJF3wo2M2Y4wIC6X4jTYoKoXbrjTqADjnTudo+2NS3e1IMDI3DXcAKO8kp20N9x1j+VHPvwMd2UtxHBn+iGGu8RfvELQ0rD39LZ07Pcb8x0Yix0Y9haQ3LzE/YYtgNi8xP2GDWqYQcMNmyBhRtH5LDYv0MCY7sCY7MCY78yYb16ggbHYmbF5V9nE+LwDo8iuLeeWjY3Nh2PNjrX19guoTY+ltnTJjQxcfcshbqNrjlRvuPnb3DA3bdfe/PUwhlEUBZ4TwjJRtCW0jQwORhJo3PfZG3tjb+yNvbE39sbe2Bt7Y2/sjVBDbr81Bx9K7zPESbJ9AfWIBBvy0Bo01fpTbUZxqQFP8fkrmOVez1h3zu8MdZC4Cxzm5WvCchzgOSljujLqD01d2qmyZ+sDT/mKM1gznfAItfVG8Yo3Pk+2ZIjKMM9lHkYwdWKer7wykydm42hsvU9fNXcGVJgxhlHqHvZHA85nO7B23cBH0BTNrDHJB9EdA8+iZ+bK8diQEQVpAF96NCoMgs99xniFfIw/cl4Yian0wjBbbs6DxzNj4N89/HuE6M2Y4RLxQ3x+dGSMDpRpLOBX2PPCGB2kznjdQeMVjPEDY6KRjc0jed2DFIwhLjqI0cCH/KHSwciKuDCsFD0EI4+xbmT00hnx2FxVfg1LEA1f7GiQZPhbsNpshsYIFsdydM0G4Q3jbP4OA45FnE6xIrKP+Hrmv6JUUfw9JqwBC3z8iEYEa+riiV0VYV3pjEMVziNTMG2MET5+Kjt4PeWAQPWjId0FDTCGKeveFrFVxXo3Q2Ii7Az6Uwcfg+fAUHUYowFxZhg9a+Qpo2NnGJqb2EZH1pAUJ8OCRItj1e9aY+iaKxgiZb2uzbHuxBCmfjruOpJMcAtzBTUhnkrasUYUVwYs9CSu5ylU7D/g+4V7al6cYLm4AJlHgyQH44JCkMmSgZdqnIEbiv9vFGOPnWEiJER0kbAISp3O8gtYY7xkcCglZ+YxgDE0JtbFpsLK7RVFLQnIChbxlFMWoaEfdar6SHDpohIgj2LNB/g/nvCoUxomAOL8VcI6HP+XPmOog6iKyxnWDi+uGw3xB2RijPIdRBtE8TTlz5h6SKwRVUZ0hmtz01gFSqIwOuUz3ua1hmuYiW0yigk7GMRLhoz6GEVjCHMxjQ+M8aJ8m0omXbwPI2DjshwKjblOoHjHlUGPhvDjBPKYmQ3iF/iqG2fldTVx0sGIYQdw+E/4qVlhdFlpHFLMS5HIBP7CCIiz0xXjeQd7HEgI9fhhpK0hyMwZalA3npmiS0gQXl3fE0+xb5RQRhk9JKWRXJV1KhP+AA3oCxmZyFTL/vkrapLGfnj+HazII6xWhME4JZrTJaNP8RvzYwKlUb1jKBjvlG8OcuyZwchgIoZolg+egEEmdUOgwZyhD59g4n4nXJKxP8PSjD8ewy4BDegLoTwsHtcNhkZeGn/HyH+ZDd1FU5bA0ky8uNJFPRfGrJvVDSi6PIlKg0VFR182buxfGGwCaOo5gZUGHaKvRvGqge1FUTRkkfaR66eg88nQmDDNUuwB8yPM04l7BAKN32FcJJZfGmMYVd2z+byOYzTGPP1iGnEuziG2mXsUA41jExfT2NBQpgCqKobOuqZ/ySD6sgfGRJynGfTcSwY0Kom/WjNEVQwdDykaMRi8R+bWIKJmPFlgXNLCEFRFZ31Mse9Lg+TU7MPhp4andFIYivJafXRML6+SKRrAxaoPGRSXb/0pCrt9+Qz2C0RGAzDGxkhYLS5dMLi8gLSTyQSK/VX1oTOr3hyUFLZcdGFLCOtA6HT24dVfMpWyqi9UXfaA8POzOIdGg02bK/PwW2Uk0MmKLrSFmMUKciXLXwmI9tWwMgjrE35Cu2gMH8BmXNBR3RAJ7IsFHgxAOBXsi9CA7ejal/uwX6czRUSPdFjK0yEkDz8zbzFWRnoVFbvAa5biEAw4mFCxTRCzb5hpIvvxiCd8EMHOB9IF21+1LXoyTOxeHqwYqgUNSURcMxiRpJNDFwIJD93lI4ovd9TexsygrXEoAB5/QoUR9kJBDVHZWTIUGTJJMbEymEYxfao7gyqGXb6ydz8iPPY0RqqLbqowIFtIznWCCT/Vk4jKJUNCXpiDCTRgDhUv4VhVaLvLLQxB9CXe6VGm/cNxllo2zNGPjMrOQP5Q3LJnlTGHhW7qW5/qZSPVGEZ+5/ygeCfPGJ+W59x8NYOlO6WB97Tu/Xwzxn8Bjng5snC7jagAAAAASUVORK5CYII="

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(185)
	module.exports = __webpack_require__(187)
	module.exports.template = __webpack_require__(190)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_buy_car.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_buy_car.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_buy_car.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./my_buy_car.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./my_buy_car.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 185 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 186 */,
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(188);
		module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					msg:'这里返回数据',
					title:'我的购车方案'
				}
			},
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
	                    this.$root.showLoading = true;
	                    transition.next();
						setTimeout(function(){
							_this.$root.showLoading = false;
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//this.$root.showLoading = false;
			},
			destroyed:function(){
				//移除事件
				document.body.removeEventListener('click',this.hideWrap,false);
				console.log('组件销毁-移除事件绑定');
			}
		}

/***/ },
/* 188 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 189 */,
/* 190 */
/***/ function(module, exports) {

	module.exports = "<div >\r\n<ul class=\"mybuycar_list\">\r\n    <li itemid=\"09f7ff5c-22c6-4e9d-8119-a53700e12e01\" cargoodid=\"97ae9e26-971f-4561-b180-c28705df9ae8\">\r\n        <div class=\"edit_panel\"> <a href=\"javascript:;\" class=\"mybuy_btnz del_btn\">删除</a>\r\n        </div>\r\n        <div class=\"inner\">\r\n            <div class=\"title\"> <a href=\"javascript:;\" class=\"fr shareicon\" data-shareurl=\"http://www.qq.com\" data-sharetext=\"【test】【test】2015款 1.6L 自动GLS 檀木黑 米色【3084】\" data-shartimg=\"/upload/image/original/carGoods/03c1276c-f091-4e1d-81d3-674fde891d97.png\">share</a>  <span>[上海市]</span>【test】【test】2015款\r\n                1.6L 自动GLS 檀木黑 米色【3084】</div>\r\n            <div class=\"p0_5\">\r\n                <div class=\"myflex clearfix\">\r\n                    <div class=\"flex-item box1\">\r\n                        <a v-link=\"{name:'book1_view',params:{carId:$route.params.carId}}\" class=\"wh100 loHref1\" lid=\"\">\r\n                            <p class=\"box_title fs14\">贷款方案 中国建设银行</p>\r\n                            <p>首付30% 1年 4.00%</p>\r\n                            <p>(金融服务费暂免)</p>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"flex-item box2\" > <i class=\"ico ico-hot\"></i>\r\n                        <a v-link=\"{name:'book2_view',params:{carId:$route.params.carId}}\" class=\"wh100 loHref2\" lid=\"\">\r\n                            <p class=\"box_title fs14\">精品套餐</p>\r\n                            <p><strong>智惠之选</strong>\r\n                            </p>\r\n                            <p>¥3,288.00</p>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n                <div class=\"car_price clearfix\">\r\n                    <div class=\"fr\">\r\n                        <p>车价：<span>¥98,000.00</span>\r\n                        </p>\r\n                        <p>购置税：¥43,859.61</p>\r\n                        <p>(需另行缴纳)</p>\r\n                    </div>\r\n                </div>\r\n                <div class=\"myflex clearfix\">\r\n                    <div class=\"flex-item box3\"> <i class=\"ico ico-hot\"></i>\r\n                        <a  v-link=\"{name:'book3_view',params:{carId:$route.params.carId}}\" class=\"wh100 loHref3\" lid=\"\">\r\n                            <p class=\"box_title fs14\">车险套餐 太平洋</p>\r\n                            <p>大众智选</p>\r\n                            <p>¥4,580.89</p>\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"flex-item box4\" >\r\n                        <a v-link=\"{name:'book4_view',params:{carId:$route.params.carId}}\" class=\"wh100 loHref4\" lid=\"\">\r\n                            <p class=\"box_title fs14\">尊享服务</p>\r\n                            <p class=\"ellips\">要买车服务费</p>\r\n                            <p>¥1,130.00</p>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n                <div class=\"clearfix pro_img_panel\" atrimg=\"/upload/image/original/carGoods/03c1276c-f091-4e1d-81d3-674fde891d97.png\" style=\"background-image: url(http://img.test.yaomaiche.com/upload/image/original/carGoods/03c1276c-f091-4e1d-81d3-674fde891d97.png);\">\r\n                    <a v-link=\"{name:'product_detail_view',params:{ carId:$route.params.carId } }\" ></a>\r\n                </div>\r\n            </div>\r\n            <div class=\"bottom_panel\">\r\n                <p style=\"display:none\">异地运输费：¥<span>0.00</span>\r\n                </p>\r\n                <div class=\"allPrice\"> <a class=\"fr mybuy_btnz payBtn\" v-link=\"{name:'checkout_view',params:{shoppingCarId:$route.params.carId}}\">支付定金</a>  <span class=\"col_price clearfix\">                             总价约：<span class=\"price\">¥150,858.50</span> </span> <span>(购置税另行缴纳)</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </li>\r\n</ul>\r\n<!-- 分享内容 -->\r\n<div id=\"shareDiv\" class=\"bdsharebuttonbox shareDiv bdshare-button-style0-16\" data-tag=\"share\" data-bd-bind=\"1445425322489\">\r\n     <h3>分享到：</h3>\r\n\r\n    <ul class=\"flex\">\r\n        <li class=\"flex-item\"><a class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\">新浪微博</a>\r\n        </li>\r\n        <li class=\"flex-item\"><a class=\"bds_tqq\" data-cmd=\"tqq\" title=\"分享到腾讯微博\">腾讯微博</a>\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"mybuycar_addnew\"></div>\r\n\r\n</div>";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(192)
	module.exports = __webpack_require__(194)
	module.exports.template = __webpack_require__(195)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book1.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book1.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book1.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book1.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book1.vue")
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
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					msg:'这里返回数据',
					title:'购车付款方式'
				}
			},
	        methods:{
	            submitBook1:function(){
	                var _this = this;
	                _this.$root.showLoading = true;
	                setTimeout(function(){
	                    _this.$route.router.go({name:'my_buy_car_view',params:{carId:_this.$route.params.carId}});
	                    _this.$root.showLoading = false;
	                },600);
	            }
	        },
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				},
				data: function(transition) {
					var _this = this;
	                    this.$root.showLoading = true;
	                    transition.next();
						setTimeout(function(){
							_this.$root.showLoading = false;
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//this.$root.showLoading = false;
			}
		}

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = "<div >\r\n        <div class=\"main_cnt\">\r\n            <input id=\"price\" type=\"hidden\" value=\"236300\">\r\n            <div class=\"item item_arr-up clearfix\">\r\n                <div class=\"item_left\">付款方式</div>\r\n                <div class=\"item_right\"><span class=\"txt1\">贷款购买</span></div>\r\n            </div>\r\n            <div id=\"payOption\" class=\"option_wrap clearfix\">\r\n                <div class=\"option option_col2\">\r\n                    <span>全额购买</span>\r\n                </div>\r\n                <!-- <div class=\"option option_col2 option-on\"> -->\r\n                <div class=\"option option_col2 option-on\">\r\n                    <span>贷款购买</span>\r\n                </div>\r\n            </div>\r\n            <div id=\"loanInfoWrap\">\r\n                <div class=\"item item_arr-up clearfix\">\r\n                    <div class=\"item_left\">银行选择</div>\r\n                    <div class=\"item_right\"><span class=\"txt1\">中国建设银行</span></div>\r\n                </div>\r\n                <div id=\"bankOption\" class=\"option_wrap option_wrap1 clearfix\">                      <div data-type=\"bankName\" class=\"option option_col2 option-on\" title=\"中国建设银行\">                 <img src=\"http://image.yaomaiche.com/mkt/Original/2015/0717/e2a966f5-d218-4f2d-bf01-1686df0bfd04.jpg\" class=\"logo_bank\">             </div>                      <div data-type=\"bankName\" class=\"option option_col2\" title=\"南京银行\">                 <img src=\"http://image.yaomaiche.com/mkt/Original/2015/0717/0752ef09-3481-4311-93bd-d328af223328.jpg\" class=\"logo_bank\">             </div>                      <div data-type=\"bankName\" class=\"option option_col2\" title=\"中国银行\">                 <img src=\"http://image.yaomaiche.com/mkt/Original/2015/0720/2a65b4b9-10bf-4d30-b74b-93cf5fff8de9.jpg\" class=\"logo_bank\">             </div>                      <div data-type=\"bankName\" class=\"option option_col2\" title=\"浦发银行\">                 <img src=\"http://image.yaomaiche.com/mkt/Original/2015/0810/78db197a-4bc3-432c-bc0f-1eee012ea29d.png\" class=\"logo_bank\">             </div>              </div>\r\n                <div class=\"item item_arr-up clearfix\">\r\n                    <div class=\"item_left\">首付比例</div>\r\n                    <div class=\"item_right\"><span class=\"txt1\">30%</span></div>\r\n                </div>\r\n                <div id=\"payRatioOption\" class=\"option_wrap clearfix\">                      <div data-type=\"payMent\" data-value=\"30\" class=\"option option_col3 option-on\">                 <span>30%</span>             </div>                      <div data-type=\"payMent\" data-value=\"40\" class=\"option option_col3\">                 <span>40%</span>             </div>                      <div data-type=\"payMent\" data-value=\"50\" class=\"option option_col3\">                 <span>50%</span>             </div>                      <div data-type=\"payMent\" data-value=\"60\" class=\"option option_col3\">                 <span>60%</span>             </div>                      <div data-type=\"payMent\" data-value=\"70\" class=\"option option_col3\">                 <span>70%</span>             </div>                      <div data-type=\"payMent\" data-value=\"80\" class=\"option option_col3\">                 <span>80%</span>             </div>              </div>\r\n                <div class=\"item item_arr-up clearfix\">\r\n                    <div class=\"item_left\">按揭期限及利率</div>\r\n                    <div class=\"item_right\"><span class=\"txt1\">一年4%</span></div>\r\n                </div>\r\n                <div id=\"interestOption\" class=\"option_wrap clearfix\">                      <div data-type=\"mortgage\" data-is-def=\"true\" data-value=\"{&quot;financeProductSysNo&quot;:1,&quot;productSysId&quot;:1,&quot;downPaymentRate&quot;:0.3,&quot;loanTerm&quot;:12,&quot;interestRate&quot;:0.04,&quot;productDescription&quot;:&quot;一年4%&quot;,&quot;isDefault&quot;:true,&quot;txt&quot;:&quot;144期4%&quot;}\" class=\"option option_col3 option-on\">                 <span>一年4%</span>             </div>                      <div data-type=\"mortgage\" data-is-def=\"false\" data-value=\"{&quot;financeProductSysNo&quot;:2,&quot;productSysId&quot;:2,&quot;downPaymentRate&quot;:0.3,&quot;loanTerm&quot;:24,&quot;interestRate&quot;:0.08,&quot;productDescription&quot;:&quot;两年8%&quot;,&quot;isDefault&quot;:false,&quot;txt&quot;:&quot;288期8%&quot;}\" class=\"option option_col3\">                 <span>两年8%</span>             </div>                      <div data-type=\"mortgage\" data-is-def=\"false\" data-value=\"{&quot;financeProductSysNo&quot;:3,&quot;productSysId&quot;:3,&quot;downPaymentRate&quot;:0.3,&quot;loanTerm&quot;:36,&quot;interestRate&quot;:0.12,&quot;productDescription&quot;:&quot;三年12%&quot;,&quot;isDefault&quot;:false,&quot;txt&quot;:&quot;432期12%&quot;}\" class=\"option option_col3\">                 <span>三年12%</span>             </div>              </div>\r\n                <div class=\"item item_arr-up clearfix\">\r\n                    <div class=\"item_left\">金融服务费</div>\r\n                    <div class=\"item_right\"><span class=\"txt1 fs14\">(限时免费)<del>¥</del><del id=\"serviceFee\">1,372.00</del></span></div>\r\n                </div>\r\n                <div id=\"serviceFeeDesc\" class=\"item_detail\">贷款业务暂免收取金融服务费，为贷款金额的2%。</div>\r\n                <div class=\"item item_arr-up clearfix\">\r\n                    <div class=\"item_left\">贷款银行介绍</div>\r\n                    <div class=\"item_right\"><span id=\"bkdesc\">中国建设银行</span></div>\r\n                </div>\r\n                <div id=\"bankDesc\" class=\"item_detail\"><div class=\"bankinfo\">\r\n<p>1、在本市有常住户口；或非本市常住户口的在本市拥有本人名下房产；或还款能力充足。</p>\r\n<p>2、有正当的职业和合法稳定的收入，月收入须为月还款额两倍（可加亲属），能够提供建行认可的收入证明。</p>\r\n<p>3、首付比例30%起，购车分期额度最高可达50万，最长分36期还款。</p>\r\n<p>4、手续费一次性收取，高效便捷。</p>\r\n<p>5、具有良好的信用记录和还款意愿。</p>\r\n<p>6、需要购买覆盖贷款期限的车损险，保险受益人为建设银行。</p>\r\n</div></div>\r\n                <div class=\"item_detail\">\r\n                    <h3>备注：</h3>\r\n                    <ul>\r\n                        <li>上述金融机构，若资产/收入不足，可提供亲属的收入房产证明补充。</li>\r\n                        <li>申请所需基础资料包括身份证、结婚证、户口本、房产证（如需）、收入证明/工资流水等。</li>\r\n                        <li>车险须按照银行等金融机构各自的要求进行承保，详见各贷款银行介绍。</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"fixbtm abs_size clearfix\" style=\"z-index:5;\">\r\n            <div class=\"btn_save\" @click=\"submitBook1\">确认贷款方案</div>\r\n            <p class=\"accessory_sum accessory_sum-left\">中国建设银行: 30% 一年4%</p>\r\n        </div>\r\n    </div>";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(197)
	module.exports = __webpack_require__(199)
	module.exports.template = __webpack_require__(200)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book2.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book2.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book2.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book2.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book2.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 197 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 198 */,
/* 199 */
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					msg:'这里返回数据',
					title:'我的精品方案'
				}
			},
	        methods:{
	            submitBook2:function(){
	                var _this = this;
	
	                setTimeout(function(){
	                    _this.$route.router.go({name:'my_buy_car_view',params:{carId:_this.$route.params.carId}});
	                   _this.$root.showLoading = false;
	                },800);
	            }
	        },
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					//console.log('active');
					console.log('2-activate');
	                this.$root.$set('header',this.title);
					transition.next();
					//此方法结束后，api会调用afterActivate 方法
					//在aftefActivate中 会给组件添加  属性 并设置为true
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
	                    this.$root.showLoading = true;
						setTimeout(function(){
							_this.$root.showLoading = false;
							transition.next();
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
	            //this.$root.showLoading = false;
			},
			destroyed:function(){
	
			}
		}

/***/ },
/* 200 */
/***/ function(module, exports) {

	module.exports = "<div >\r\n    <div class=\"main_cnt\">\r\n        <div class=\"item item_arr-down clearfix\" data-iselect=\"false\" data-price=\"3288\" data-id=\"228dd1a4-6846-40de-ae1a-1b02778cf78e\">\r\n            <div class=\"item_left\"><i class=\"ico_checkbox\"></i>智惠之选</div>\r\n            <div class=\"item_right\"><span class=\"txt1\">¥3288</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"pak_info\" style=\"display: none;\">\r\n            <p class=\"pak_slogan\">经济实惠</p>\r\n            <ul class=\"pak_prod\">\r\n                <li class=\"prod_item\" data-price=\"299\" data-id=\"6ed31f67-e9f8-4dce-bc6f-cd7ba67fb820\" data-code=\"P36_1\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/a7a06e07-e9f2-442d-beb6-42cb5a9454f6.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">环保无味丝圈脚垫</h2>\r\n                        <p class=\"prod_desc ellips_line2\">德盾环保无味丝圈脚垫</p>\r\n                        <p class=\"prod_price\">¥299</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"2490\" data-id=\"97f47c57-1e96-4aba-b7bb-3f5158528d07\" data-code=\"P1_7\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/3c1bf5cb-71a7-4c91-9ead-2ba5a3464ada.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">3M太阳膜组合——田园风光+瑞丽冰酷</h2>\r\n                        <p class=\"prod_desc ellips_line2\">已包含施工费</p>\r\n                        <p class=\"prod_price\">¥2490</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"499\" data-id=\"3dee2c9d-0a73-462c-8dac-43d709d5e3b4\" data-code=\"P2_2\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/597cf3f3-0d3b-4c14-9056-83c8f74329a0.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">PAPAGO New P1W行车记录仪(送8G卡)</h2>\r\n                        <p class=\"prod_desc ellips_line2\">行车记录仪第一品牌中最经典的明星产品，1080P真高清真广角，夜视再增强</p>\r\n                        <p class=\"prod_price\">¥499</p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"item item_arr-down clearfix\" data-iselect=\"false\" data-price=\"1988\" data-id=\"8c86697a-0f36-430d-9d37-3218117d3051\">\r\n            <div class=\"item_left\"><i class=\"ico_checkbox\"></i>实惠之选</div>\r\n            <div class=\"item_right\"><span class=\"txt1\">¥1988</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"pak_info\" style=\"display: none;\">\r\n            <p class=\"pak_slogan\">经济实惠</p>\r\n            <ul class=\"pak_prod\">\r\n                <li class=\"prod_item\" data-price=\"1290\" data-id=\"23aaae8e-72c8-4a0a-a3b0-63f9252f133b\" data-code=\"P1_6\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/c2c107d2-1a69-431e-806d-6679fd0fc6ca.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">3M太阳膜组合(1080)——璀璨风光+黑衣骑士</h2>\r\n                        <p class=\"prod_desc ellips_line2\">已包含施工费</p>\r\n                        <p class=\"prod_price\">¥1290</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"399\" data-id=\"15898a7c-3f60-473a-9297-bf307aaceb34\" data-code=\"P2_1\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/df7adc73-1634-4353-89b8-3eab23efee1d.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">PAPAGO 115行车记录仪(送8G卡)</h2>\r\n                        <p class=\"prod_desc ellips_line2\">行车记录仪第一品牌中性价比最高的产品，使用安霸A7芯片，小身材高性能</p>\r\n                        <p class=\"prod_price\">¥399</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"299\" data-id=\"6ed31f67-e9f8-4dce-bc6f-cd7ba67fb820\" data-code=\"P36_1\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/a7a06e07-e9f2-442d-beb6-42cb5a9454f6.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">环保无味丝圈脚垫</h2>\r\n                        <p class=\"prod_desc ellips_line2\">德盾环保无味丝圈脚垫</p>\r\n                        <p class=\"prod_price\">¥299</p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"item item_arr-up clearfix\" data-iselect=\"true\" data-price=\"1897\" data-id=\"7223247a-583f-424b-b1aa-a5340119bfa2\">\r\n            <div class=\"item_left\"><i class=\"ico_checkbox ico_checkbox-on\"></i>test</div>\r\n            <div class=\"item_right\"><span class=\"txt1\">¥1897</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"pak_info\">\r\n            <ul class=\"pak_prod\">\r\n                <li class=\"prod_item\" data-price=\"899\" data-id=\"7d8a3527-0227-4ba8-ae64-0aeb672a7c97\" data-code=\"null\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/3acefb54-4dc4-4dc2-8b38-017964527806.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">peg太阳膜</h2>\r\n                        <p class=\"prod_desc ellips_line2\">世界汽车窗膜协会品牌，品质过硬。此款组合为性价比之王。在炎炎夏日为您抵挡烈日酷暑。</p>\r\n                        <p class=\"prod_price\">¥899</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"998\" data-id=\"72a4d726-8965-4754-af1e-886542c46882\" data-code=\"null\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/904d842c-665f-49db-bf87-33e82f9dce8e.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">惠尔顿Welldon 酷睿宝(祈福苹果)</h2>\r\n                        <p class=\"prod_desc ellips_line2\">(祈福苹果，适合9个月-12岁) 安全承诺品牌，专注儿童座椅12年，内置ISOFIX接口</p>\r\n                        <p class=\"prod_price\">¥998</p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"item item_arr-down clearfix\" data-iselect=\"false\" data-price=\"2138\" data-id=\"d152fa89-ebbd-434e-b864-d46b91856b86\">\r\n            <div class=\"item_left\"><i class=\"ico_checkbox\"></i>实惠之选</div>\r\n            <div class=\"item_right\"><span class=\"txt1\">¥2138</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"pak_info\" style=\"display: none;\">\r\n            <p class=\"pak_slogan\">经济实惠</p>\r\n            <ul class=\"pak_prod\">\r\n                <li class=\"prod_item\" data-price=\"1440\" data-id=\"9a63030a-5dc3-41aa-808f-2fce51509f5b\" data-code=\"P1_9\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/861f1162-9c7f-48f3-8e63-03106ce4859b.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">3M太阳膜组合——璀璨风光+黑衣骑士(适用SUV或MPV)</h2>\r\n                        <p class=\"prod_desc ellips_line2\">已包含施工费</p>\r\n                        <p class=\"prod_price\">¥1440</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"399\" data-id=\"15898a7c-3f60-473a-9297-bf307aaceb34\" data-code=\"P2_1\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/df7adc73-1634-4353-89b8-3eab23efee1d.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">PAPAGO 115行车记录仪(送8G卡)</h2>\r\n                        <p class=\"prod_desc ellips_line2\">行车记录仪第一品牌中性价比最高的产品，使用安霸A7芯片，小身材高性能</p>\r\n                        <p class=\"prod_price\">¥399</p>\r\n                    </div>\r\n                </li>\r\n                <li class=\"prod_item\" data-price=\"299\" data-id=\"6ed31f67-e9f8-4dce-bc6f-cd7ba67fb820\" data-code=\"P36_1\">\r\n                    <div class=\"prod_item-main item_arr-right\">\r\n                        <img src=\"http://img.yaomaiche.com/upload/image/original/carGoods/a7a06e07-e9f2-442d-beb6-42cb5a9454f6.jpg\" class=\"prod_pic\">\r\n                         <h2 class=\"prod_name ellips\">环保无味丝圈脚垫</h2>\r\n                        <p class=\"prod_desc ellips_line2\">德盾环保无味丝圈脚垫</p>\r\n                        <p class=\"prod_price\">¥299</p>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <a href=\"javascript:;\" data-id=\"8c54bc45-64d2-4ec0-8960-a53801422ae1\" target=\"_self\" class=\"addCustomize\"> <i class=\"ico_add\"></i>自选精品</a>\r\n        <p class=\"ico_txt\"></p>\r\n        <p class=\"txt_note cor_gray\">备注：联合促销期间至少随车购买一种精品套餐。</p>\r\n    </div>\r\n    <div class=\"fixbtm abs_size clearfix\" style=\"z-index:5;\">\r\n        <div class=\"btn_save\" @click=\"submitBook2\">确认精品方案</div>\r\n        <p class=\"accessory_sum accessory_sum-left\">小计<span id=\"totalPrice\" data-price=\"0\" class=\"price cor_red\">¥1897</span>\r\n        </p>\r\n    </div>\r\n</div>";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(202)
	module.exports = __webpack_require__(204)
	module.exports.template = __webpack_require__(205)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book3.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book3.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book3.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book3.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book3.vue")
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
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'我的车险套餐',
					msg:'这里返回数据'
				}
			},
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
	
						setTimeout(function(){
							//在 transition.next({a:1}) 之前
							//这里 _this. 是 true  因为此时获取
							transition.next({a:1}); //这里必须要设置一个值 不能是 transition.next();
							//这里 _this. 就是false了。  vue-router.js :2250 左右
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//this.$root.showLoading = false;
			}
		}

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n        <div class=\"main_cnt\">\r\n            <div class=\"item_wrap\">\r\n                <div class=\"item item_col1 item_arr-up clearfix showHide\">\r\n                    <div class=\"item_left\">保险公司</div>\r\n                    <div class=\"item_right\"><span id=\"supplierName\" class=\"txt1\">太平洋</span></div>\r\n                </div>\r\n                <div id=\"supplier\" class=\"ins_list\">                      <div class=\"item item3 item_arr-right clearfix\">                 <div insurance-company-sys-no=\"1\" class=\"item_left  option-on \" data-txt=\"太平洋\">                 <!--<i class=\"iins   iins3  \"></i>-->                     <i class=\"iins\"><img src=\"http://image.yaomaiche.com/mkt/Original/2015/0702/0a1ea6ed-513c-4f27-97f8-1a037ed321f1.jpg\" style=\"width:100%;height:100%;\"></i>                 </div>                 <div class=\"item_right data-detail\" insurance-company-sys-no=\"1\"><p class=\"txt1 ellips_line2\">  理赔便捷灵活，十项免费增值服务，最懂你的车险  </p></div>             </div>                      <div class=\"item item3 item_arr-right clearfix\">                 <div insurance-company-sys-no=\"4\" class=\"item_left \" data-txt=\"大地\">                 <!--<i class=\"iins  iins2   \"></i>-->                     <i class=\"iins\"><img src=\"http://image.yaomaiche.com/mkt/Original/2015/0702/7d926295-0d59-41e9-879e-81ffb5722ba1.jpg\" style=\"width:100%;height:100%;\"></i>                 </div>                 <div class=\"item_right data-detail\" insurance-company-sys-no=\"4\"><p class=\"txt1 ellips_line2\">  省心、开心、贴心、放心、安心、顺心，理想车险服务  </p></div>             </div>                      <div class=\"item item3 item_arr-right clearfix\">                 <div insurance-company-sys-no=\"2\" class=\"item_left \" data-txt=\"平安\">                 <!--<i class=\"iins   \"></i>-->                     <i class=\"iins\"><img src=\"http://image.yaomaiche.com/mkt/Original/2015/0702/79293b18-bf54-43a1-8100-57b0a84ff0a2.png\" style=\"width:100%;height:100%;\"></i>                 </div>                 <div class=\"item_right data-detail\" insurance-company-sys-no=\"2\"><p class=\"txt1 ellips_line2\">  快、易、免，服务多，三年获“顾客最满意保险公司”  </p></div>             </div>                      <div class=\"item item3 item_arr-right clearfix\">                 <div insurance-company-sys-no=\"3\" class=\"item_left \" data-txt=\"人保\">                 <!--<i class=\"iins   \"></i>-->                     <i class=\"iins\"><img src=\"http://image.yaomaiche.com/mkt/Original/2015/0702/9ddd4e1f-c226-4145-bc21-d365651735ba.jpg\" style=\"width:100%;height:100%;\"></i>                 </div>                 <div class=\"item_right data-detail\" insurance-company-sys-no=\"3\"><p class=\"txt1 ellips_line2\">  快、易、多、安、好，理赔快，老牌保险值得信赖  </p></div>             </div>              </div>\r\n            </div>\r\n            <div class=\"item_wrap\">\r\n                <div class=\"item item_col1 item_arr-up clearfix showHide\">\r\n                    <div class=\"item_left\">保险方案</div>\r\n                    <div class=\"item_right\"><span id=\"insurProdName\" class=\"txt1\">大众智选</span></div>\r\n                </div>\r\n                <div class=\"item_detail_wrap\">\r\n                    <ul class=\"ui_tab-wrap clearfix\">                  <li data-txt=\"大众智选\" class=\"ui_tab-on\">大众智选</li>                  <li data-txt=\"“菜鸟”装备\" class=\"\">“菜鸟”装备</li>              <li data-txt=\"个性主张\" class=\"\">个性主张</li></ul>\r\n                    <div id=\"package_list\"><div class=\"package_dtl\" style=\"\">     <div class=\"item_detail\">         <p class=\"desc\">中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。\r\n适用人群：老司机、神车手、路况良好享有者</p>               </div>     <div class=\"item item4 clearfix\">         <div class=\"item_left\">         <p>商业险</p></div>         <div class=\"item_right\"><span class=\"txt1 sy-total\">¥3,999.82</span></div>     </div>              <div isbuysdew=\"true\" sysno=\"1\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>机动车车辆损失险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div sdewamount=\"336.88\" amount=\"2245.8428\" class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                            <i isforced=\"true\" class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"2582.72\">¥2,245.84</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥336.88</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                •车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br>\r\n                •您不小心撞了别人车辆，自己的车子受损；<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"2\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>第三者责任险 <small>50万</small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i isforced=\"true\" class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"1417.1\">¥1,232.26</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥184.84</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"50万\" sdewamount=\"184.84\" amount=\"1232.2591\" class=\"option-on\">50万</li>                                                                                    <li default-level=\"50万\" sdewamount=\"240.77\" amount=\"1605.1048\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">100万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                      <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                •您不小心撞坏了别人的车<br>\r\n                •您不小心撞到别人造成伤亡<br>\r\n                •交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br>\r\n                •保障越高越好，建议至少选择50-100万的保障额度。<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>          <div class=\"item_title btn_item1 none-bdtop\" sys-no=\"5\"> <i class=\"ico_add\"></i>&nbsp;修改方案 </div></div><div class=\"package_dtl\" style=\"display:none\">     <div class=\"item_detail\">         <p class=\"desc\">中高度保障，增加对车主和乘客的保障，具备严重交通意外的赔付能力（100万）。适用人群：新手上路、“女”司机、本本族</p>               </div>     <div class=\"item item4 clearfix\">         <div class=\"item_left\">         <p>商业险</p></div>         <div class=\"item_right\"><span class=\"txt1 sy-total\">¥0.00</span></div>     </div>              <div isbuysdew=\"true\" sysno=\"1\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>机动车车辆损失险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div sdewamount=\"336.88\" amount=\"2245.8428\" class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                            <i isforced=\"true\" class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"2582.72\">¥2,245.84</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥336.88</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                •车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br>\r\n                •您不小心撞了别人车辆，自己的车子受损；<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"2\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>第三者责任险 <small>50万</small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i isforced=\"true\" class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"1417.1\">¥1,232.26</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥184.84</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"50万\" sdewamount=\"184.84\" amount=\"1232.2591\" class=\"option-on\">50万</li>                                                                                    <li default-level=\"50万\" sdewamount=\"240.77\" amount=\"1605.1048\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">100万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                      <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                •您不小心撞坏了别人的车<br>\r\n                •您不小心撞到别人造成伤亡<br>\r\n                •交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br>\r\n                •保障越高越好，建议至少选择50-100万的保障额度。<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"4\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>车身划痕损失险 <small>2千</small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"373.66\">¥324.92</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥48.74</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"2千\" sdewamount=\"48.74\" amount=\"324.92\" class=\"option-on\">2千</li>                                                                                    <li default-level=\"2千\" sdewamount=\"69.45\" amount=\"463.011\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">5千</li>                                                                                    <li default-level=\"2千\" sdewamount=\"92.6\" amount=\"617.348\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">1万</li>                                                                                    <li default-level=\"2千\" sdewamount=\"138.9\" amount=\"926.022\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">2万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"6\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>司机座位责任险 <small>1万</small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"39.24\">¥34.12</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥5.12</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"5万\" sdewamount=\"5.12\" amount=\"34.1166\" class=\"option-on\">1万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"10.23\" amount=\"68.2332\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">2万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"15.35\" amount=\"102.3498\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">3万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"20.47\" amount=\"136.4664\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">4万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"25.59\" amount=\"170.583\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">5万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                      <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"7\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>乘客座位责任险 <small>1万</small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2  ico_checkbox2-on\" style=\"display: none;\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"100.89\">¥87.73</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥13.16</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"5万\" sdewamount=\"13.16\" amount=\"87.7284\" class=\"option-on\">1万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"26.32\" amount=\"175.4568\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">2万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"39.48\" amount=\"263.1852\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">3万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"52.64\" amount=\"350.9136\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">4万</li>                                                                                    <li default-level=\"5万\" sdewamount=\"65.8\" amount=\"438.642\" class=\"disable\" style=\"color: rgb(200, 200, 200);\">5万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>          <div class=\"item_title btn_item1 none-bdtop\" sys-no=\"9\"> <i class=\"ico_add\"></i>&nbsp;修改方案 </div></div><div class=\"package_dtl\" style=\"display:none\">     <div class=\"item_detail\">         <p class=\"desc\" style=\"display:none\"></p>                  <p>独具个性的我，喜欢自己来装备我的专属车险方案。我的爱车我做主！</p>               </div>     <div class=\"item item4 clearfix\">         <div class=\"item_left\">         <p>商业险</p></div>         <div class=\"item_right\"><span class=\"txt1 sy-total\">¥0.00</span></div>     </div>              <div isbuysdew=\"true\" sysno=\"1\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>机动车车辆损失险 <small></small></p>                                      <p style=\"padding-right:10px;color:#999;font-size:15px;\">(95%的人会选择)</p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div sdewamount=\"336.88\" amount=\"2245.8428\" class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                            <i isforced=\"true\" class=\"ico_checkbox2 ico_checkbox2-disabled\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"2582.72\">¥2,245.84</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥336.88</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                •车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br>\r\n                •您不小心撞了别人车辆，自己的车子受损；<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"true\" sysno=\"2\" isdefault=\"true\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>第三者责任险 <small>50万</small></p>                                      <p style=\"padding-right:10px;color:#999;font-size:15px;\">(99%的人会选择)</p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt  switch_box-on1\"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i isforced=\"true\" class=\"ico_checkbox2 ico_checkbox2-disabled\"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display: inline-block; color: rgb(0, 0, 0);\" data-price=\"1417.1\">¥1,232.26</span>                 <br>                  <span class=\"txt11\" style=\"display: inline-block; color: rgb(0, 0, 0);\">¥184.84</span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"50万\" sdewamount=\"184.84\" amount=\"1232.2591\" class=\"option-on\">50万</li>                                                                                    <li default-level=\"50万\" sdewamount=\"240.77\" amount=\"1605.1048\" class=\"\">100万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                      <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                •您不小心撞坏了别人的车<br>\r\n                •您不小心撞到别人造成伤亡<br>\r\n                •交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br>\r\n                •保障越高越好，建议至少选择50-100万的保障额度。<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"3\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>全车盗抢险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div sdewamount=\"122.09\" amount=\"610.4555\" class=\"switch_box switch_box-txt \"><div class=\"switch_scroll\"></div>不计免赔</div>                                                            <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥610.46                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  inline-block ;color:#c8c8c8;\">                                              ¥122.09                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"6\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>司机座位责任险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt \"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥34.12                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  inline-block ;color:#c8c8c8;\">                                              ¥5.12                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"\" sdewamount=\"5.12\" amount=\"34.1166\">1万</li>                                                                                    <li default-level=\"\" sdewamount=\"10.23\" amount=\"68.2332\">2万</li>                                                                                    <li default-level=\"\" sdewamount=\"15.35\" amount=\"102.3498\">3万</li>                                                                                    <li default-level=\"\" sdewamount=\"20.47\" amount=\"136.4664\">4万</li>                                                                                    <li default-level=\"\" sdewamount=\"25.59\" amount=\"170.583\">5万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                      <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"7\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>乘客座位责任险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt \"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥87.73                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  inline-block ;color:#c8c8c8;\">                                              ¥13.16                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"\" sdewamount=\"13.16\" amount=\"87.7284\">1万</li>                                                                                    <li default-level=\"\" sdewamount=\"26.32\" amount=\"175.4568\">2万</li>                                                                                    <li default-level=\"\" sdewamount=\"39.48\" amount=\"263.1852\">3万</li>                                                                                    <li default-level=\"\" sdewamount=\"52.64\" amount=\"350.9136\">4万</li>                                                                                    <li default-level=\"\" sdewamount=\"65.8\" amount=\"438.642\">5万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"4\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>车身划痕损失险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div class=\"switch_box switch_box-txt \"><div class=\"switch_scroll\"></div>不计免赔</div>                                                         <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥324.92                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  inline-block ;color:#c8c8c8;\">                                              ¥48.74                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                                   <h3 class=\"item_unfold-title\">额度：</h3>                                  <ul class=\"option_list\">                                                               <li default-level=\"\" sdewamount=\"48.74\" amount=\"324.92\">2千</li>                                                                                    <li default-level=\"\" sdewamount=\"69.45\" amount=\"463.011\">5千</li>                                                                                    <li default-level=\"\" sdewamount=\"92.6\" amount=\"617.348\">1万</li>                                                                                    <li default-level=\"\" sdewamount=\"138.9\" amount=\"926.022\">2万</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"5\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>玻璃单独破碎险 <small></small></p>                                                    <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥237.72                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  none ;color:#c8c8c8;\">                                              ¥0.00                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                                               <ul class=\"option_list\">                                      <!--玻璃免赔的时候要用level字段-->                         <li default-level=\"\" sdewamount=\"0\" amount=\"237.7222\">国产玻璃</li>                                                           <!--玻璃免赔的时候要用level字段-->                         <li default-level=\"\" sdewamount=\"0\" amount=\"387.8625\">进口玻璃</li>                                                       </ul>                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">                     <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                •高速路上行驶被飞石击碎车窗、挡风玻璃；<br>\r\n                •车辆停放被高空坠物砸坏车窗、挡风玻璃。<br>\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                •车辆经常停在露天停车场；<br>\r\n                •车辆停放区域治安不好。<br>\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>                 </div>                          </div>              <div isbuysdew=\"false\" sysno=\"8\" isdefault=\"false\" class=\"item item_multi item_col2 item_arr-right clearfix\">             <div class=\"item_left item_left-ico\">                 <p>车辆自燃损失险 <small></small></p>                                                   <!--不是玻璃破碎险的时候才有-->                     <!--sdewAmount amount  不计免赔 选中-->                     <!--amount  不计免赔 不选中-->                                                   <div sdewamount=\"22.52\" amount=\"150.1403\" class=\"switch_box switch_box-txt \"><div class=\"switch_scroll\"></div>不计免赔</div>                                                            <i class=\"ico_checkbox2 \"></i>              </div>             <div class=\"item_right\">                 <span class=\"txt1\" style=\"display:inline-block;color:#c8c8c8;\">                                             ¥150.14                                      </span>                 <br>                  <span class=\"txt11\" style=\"display:  inline-block ;color:#c8c8c8;\">                                              ¥22.52                                      </span>              </div>             <div class=\"item_area-click\"></div>         </div>         <!--保险说明，购买指数-->              <div class=\"item_unfold\" style=\"display: none;\">                           <!--保险范畴字段-->                               <div class=\"popdesc\" style=\"display: none;\">\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>                 </div>                          </div>          </div></div>\r\n                    <div class=\"item_wrap\">\r\n                        <div class=\"item item4 clearfix\" id=\"jqx\" data-price=\"950\">\r\n                            <div class=\"item_left\">交强险</div>\r\n                            <div class=\"item_right\"><span class=\"txt1\">¥950.00</span></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item_wrap\">\r\n                        <div class=\"item item4 clearfix\" id=\"ccx\" data-price=\"90\">\r\n                            <div class=\"item_left\">车船税</div>\r\n                            <div class=\"item_right\"><span class=\"txt1\">¥90.00</span></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"item_detail\">\r\n                    <h3>注意事项</h3>\r\n                    <ul style=\"margin-left:2em;\">\r\n                        <li>此保费为按照费率表预估，最终保费已保单为准。</li>\r\n                        <li> 车险保单是办理按揭车贷、上牌的必要材料。为避免让您的购车过程变得劳心费神，“要买车”建议您与新车一起购买车险套餐产品。</li>\r\n                        <li>车贷用户如因金融机构要求需增加车辆商业保险期限，可在线下交付中心办理时追加购买。</li>\r\n                        <li>为确保客户可以在交付完成后顺利提车，至少随车购买基本商业险（车损险+三者险）和交强险（含车船税）。</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"fixbtm abs_size clearfix\" style=\"z-index:5;\">\r\n            <div class=\"btn_save\">确认保险方案</div>\r\n            <p class=\"accessory_sum accessory_sum-left\">总计<span id=\"allTotal\" class=\"price cor_red\" total-price=\"5039.82\">¥5,039.82</span></p>\r\n        </div>\r\n        <div id=\"insurance-detail\" style=\"margin-top:10px;\"></div>\r\n    </div>";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(207)
	module.exports = __webpack_require__(209)
	module.exports.template = __webpack_require__(210)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book4.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book4.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book4.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./book4.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./book4.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 207 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 208 */,
/* 209 */
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'尊享服务',
					msg:'这里返回数据'
				}
			},
			methods:{
				serviceSubmit:function(){
					var _this = this;
					_this.$root.showLoading = true;
					setTimeout(function(){
						_this.$route.router.go({name:'my_buy_car_view',params:{carId:_this.$route.params.carId}});
						_this.$root.showLoading = false;
					},2000);
				}
			},
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					//console.log('active');
					//console.log('2-activate');
					this.$root.$set('header',this.title);
					transition.next();
					//此方法结束后，api会调用afterActivate 方法
					//在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
						_this.$root.showLoading = true;
						setTimeout(function(){
							//在 transition.next({a:1}) 之前
							//这里 _this.$loadingRouteData 是 true  因为此时获取
							_this.$root.showLoading = false;
							transition.next({a:1}); //这里必须要设置一个值 不能是 transition.next();
							//这里 _this.$loadingRouteData 就是false了。  vue-router.js :2250 左右
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//this.$root.showLoading = false;
			}
		}

/***/ },
/* 210 */
/***/ function(module, exports) {

	module.exports = "<div class=\"service\">\r\n        <div class=\"main_cnt\" licenceenabled=\"true\" licenceamount=\"true\">\r\n            <div class=\"item item_arr-up clearfix\">\r\n                <div class=\"item_left\"><span id=\"ymcs\">要买车服务费</span></div>\r\n                <div class=\"item_right\"><span id=\"serviceFee\" class=\"txt1\">¥1000</span></div>\r\n            </div>\r\n            <div class=\"serv_intro\">\r\n                <p class=\"serv_info\">是否担心买车过程的验车上牌缴税等太麻烦？</p>\r\n                <p class=\"serv_info\"><strong>不怕，要买车帮你搞定！</strong></p>\r\n                <p class=\"serv_info\">要买车提供专业级的检车验车上牌缴税等一条龙服务，包括但不限于</p>\r\n                <div class=\"option_wrap service_wrap clearfix\">\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv\"></i>\r\n                        <p class=\"tc\">PDI检测</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv2\"></i>\r\n                        <p class=\"tc\">360度验车</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv3\"></i>\r\n                        <p class=\"tc\">购置税代缴</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv4\"></i>\r\n                        <p class=\"tc\">交车关怀</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv5\"></i>\r\n                        <p class=\"tc\">一对一专人<br>上牌陪同</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv6\"></i>\r\n                        <p class=\"tc\">精品施工<br>进出库检验</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv7\"></i>\r\n                        <p class=\"tc\">购车全场<br>资料托管</p>\r\n                    </div>\r\n                    <div class=\"option option_col4\">\r\n                        <i class=\"iserv iserv8\"></i>\r\n                        <p class=\"tc\">车牌号<br>六选一</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"item item_arr-up clearfix\">\r\n                <div class=\"item_left\">机动车登记费</div>\r\n                <div class=\"item_right\"><span id=\"regFee\" class=\"txt1\">¥130</span></div>\r\n            </div>\r\n            <div id=\"regFeeWrap\">\r\n                <div class=\"item item2 clearfix lisenceamount\">\r\n                    <div class=\"item_left\">已有正式牌照额度</div>\r\n                    <div class=\"item_right\">\r\n                        <div  class=\"switch_box switch_box-on\" chk=\"1\">\r\n                            <div class=\"switch_scroll\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"item item2 clearfix\">\r\n                    <div class=\"item_left formalreg\"><i class=\"ico_checkbox2 formalreg ico_checkbox2-on\"></i><span id=\"zspz\">正式牌照注册登记费</span></div>\r\n                    <div class=\"item_right\"><span id=\"formalRegFee\" class=\"txt1\">¥125</span></div>\r\n                </div>\r\n                <div class=\"item item2 clearfix linshipaizhao\">\r\n                    <div class=\"item_left tempreg\"><i class=\"ico_checkbox2 tempreg ico_checkbox2-on ico_checkbox2-disabled\"></i><span id=\"lspz\">临时牌照注册登记费</span></div>\r\n                    <div class=\"item_right\">\r\n                        <span class=\"ui_adjust\">\r\n                            <span class=\"ui_adjust_minus disabled\"></span>\r\n                            <span class=\"ui_adjust_view\">申办1次</span>\r\n                            <span class=\"ui_adjust_plus\"></span>\r\n                        </span>\r\n                        <span id=\"tempRegFee\" class=\"txt1\">¥5</span>\r\n                    </div>\r\n                </div>\r\n                <div id=\"suzhoudengjifei\" style=\"display: none;\" class=\"item item2 clearfix\">\r\n                    <div class=\"item_left formalreg\"><span id=\"suzhouTitle\"></span></div>\r\n                    <div class=\"item_right\"><span id=\"suzhouPri\"><!-- &yen;120 --></span></div>\r\n                </div>\r\n            </div>\r\n            <div>\r\n                <!-- <p class=\"accessory_sum\">小计<span id=\"totalFee\" class=\"price cor_red\">&yen;0.00</span></p> -->\r\n                <div class=\"item_detail\">\r\n                    <h3>注意事项</h3>\r\n                    <ul>\r\n                        <li>要买车服务费是要买车为每位购车者的验车、提车过程及前后提供的一系列专业服务，如果因购车者自身资质额度限制缘故导致的部分服务项无法享受，要买车会竭尽全力协助客户，但服务金额不变。</li>\r\n                        <li>如果购车者已有正式牌照上牌额度，则任选一项或多项皆可；如果购车者还没有正式牌照上牌额度，则必选一次临时牌照的申办；</li>\r\n                        <li>临时牌照每位购车者单次购车最多申办三次。</li>\r\n                        <li>若因客观原因无法代办上牌服务，牌照登记注册费将全额退还。</li>\r\n                        <li>因车管所办理流程的限制，购置税缴纳代办服务需与上正式牌照组合进行。</li>\r\n                        <li>抵押登记费：因贷款购车需办理机动车抵押登记，由车管所向抵押人收取的机动车抵押登记手续费。</li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"fixbtm abs_size clearfix\" style=\"z-index:5;\">\r\n            <div class=\"btn_save\" @click=\"serviceSubmit\">确认尊享服务方案</div>\r\n            <p class=\"accessory_sum accessory_sum-left\">小计<span id=\"totalFee\" class=\"price cor_red\">¥1130</span></p>\r\n        </div>\r\n    </div>";

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(212)
	module.exports = __webpack_require__(214)
	module.exports.template = __webpack_require__(217)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkout.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkout.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkout.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./checkout.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./checkout.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 212 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 213 */,
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(215);
		module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'订单支付',
					msg:'这里返回数据'
				}
			},
			methods:{
				paying:function(){
					var _this = this;
					_this.$root.showLoading = true;
					setTimeout(function(){
						_this.$root.showLoading = false;
						_this.$route.router.go({name:"pay_success_view"});
					},1000);
				}
			},
			//这里才是route的生存周期
			route:{
				//waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
				canActivate:function(transition){
					//console.log('canActivate阶段，可以做一些用户验证的事情');
					//return authenticationService.isLoggedIn()
					console.log('1-canActivate');
					//debugger;
					return true;
				},
				activate:function(transition){
					//console.log('active');
					//console.log('2-activate');
					this.$root.$set('header',this.title);
					transition.next();
					//此方法结束后，api会调用afterActivate 方法
					//在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
						_this.$root.showLoading = true;
						setTimeout(function(){
							_this.$root.showLoading = false;
							//在 transition.next({a:1}) 之前
							//这里 _this.$loadingRouteData 是 true  因为此时获取
							transition.next(); //这里必须要设置一个值 不能是 transition.next();
							//这里 _this.$loadingRouteData 就是false了。  vue-router.js :2250 左右
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//事件绑定
				document.body.addEventListener('click',this.hideWrap,false);
			},
			destroyed:function(){
				//移除事件
				document.body.removeEventListener('click',this.hideWrap,false);
				console.log('组件销毁-移除事件绑定');
			}
		}

/***/ },
/* 215 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 216 */,
/* 217 */
/***/ function(module, exports) {

	module.exports = "<div  >\r\n\r\n        <div class=\"clause\" style=\"display:none;\"><!--条款内容--></div><!--条款-->\r\n\r\n        <div class=\"scroll\">\r\n            <div id=\"checkoutPannel\">  <div class=\"checkout \">        <div class=\"car clearfix mt10\">             <div class=\"carImg\" style=\"background-image:url( 'http://img.yaomaiche.com/upload/image/original/carGoods/fea12ec1-7091-4871-b6fe-71c1027ad7d1.png');\">             </div>             <div class=\"name abs_size\">                 <h2>高尔夫 2015款 1.4TSI 自动舒适型 极地白 黑色</h2>                 <p>                     <!--描述--></p>             </div>         </div>         <ul class=\"scheme\">             <li class=\"title\">要买车产品</li>             <li class=\"clearfix\">汽车价格 <span><em>¥ </em>119,900</span></li>             <li class=\"clearfix\">                 购买方式<span> 中国建设银行 首付30% 12期4.00% </span>             </li>             <li class=\"item_arr-down clearfix\">                 精品价格<span> test <em>¥ </em>899.00</span>             </li>             <li class=\"openT\">                 <div class=\"ex_oper none\">                                      <dl>                             <dt>test<span>¥ 899</span></dt>                                                          <dd>                                                               peg太阳膜  <span>¥ 899</span> <br>                                                           </dd>                                                  </dl>                                  </div>             </li>         </ul>         <ul class=\"scheme mt10\">             <li class=\"title\">要买车服务</li>             <li class=\"clearfix\">要买车服务费<span><em>¥ </em>1,000.00</span></li>             <li class=\"clearfix\">金融服务费<span><em class=\"cor_red\">（限时免费）</em><em class=\"line-t\">¥ 1,678.60</em></span></li>                      </ul>        <ul class=\"scheme mt10\">             <li class=\"title question\">代收代缴</li>             <li class=\"item_arr-down clearfix\">                 车险价格<span>大众智选<em>¥</em>5,039.82</span>             </li>             <li class=\"openT\">                 <div class=\"ex_oper none\">                                      <dl>                             <dt>太平洋 车损险<span>¥ 2,582.72</span></dt>                                                  </dl>                                      <dl>                             <dt>太平洋 三责险<span>¥ 1,417.10</span></dt>                                                  </dl>                                      <dl>                             <dt>太平洋 交强险<span>¥ 950.00</span></dt>                                                  </dl>                                      <dl>                             <dt>太平洋 车船税<span>¥ 90.00</span></dt>                                                  </dl>                                  </div>             </li>         </ul>         <ul class=\"scheme\">             <li class=\"item_arr-down clearfix\">机动车登记费<span><em>¥ </em>130</span></li>             <li class=\"openT\">                 <div class=\"ex_oper none\">                                              <dl>                                 <dt class=\"lastL\">正式牌照注册登记费<span>¥ 125</span></dt>                         </dl>                                              <dl>                                 <dt class=\"lastL\">临时牌照注册登记费<span>¥ 5</span></dt>                         </dl>                                      </div>             </li>         </ul>          <ul class=\"scheme\">                          <li>购置税需另行缴纳（约）¥ 6,620.00</li>                      </ul>         <div class=\"favorable clearfix\">             <p id=\"p1\">                 <input id=\"PromotionCodeTB\" class=\"menu1\" type=\"text\" placeholder=\"请输入优惠码\" value=\"\">             </p>             <p id=\"p2\">                 <input id=\"SBPromotionCode\" class=\"menu2\" type=\"button\" value=\"提交\">             </p>         </div>         <ul class=\"scheme coupons-no\" style=\"display:none;\">            <li>优惠券名<span><em>¥ </em>-金额</span></li>         </ul>         <div class=\"price\"> 总价约：             <span><em>¥ </em>133,588.82</span>(不含购置税)         </div>         <div class=\"agree checkbox_handle\">             <span class=\"agree-item\"><i class=\"checkbox_wrap\"></i>我已阅读并同意</span>             <span><em class=\"hasRightArrow\" data-target=\"salecontract_pop\"><a id=\"agree-rule\" href=\"agreement.html?source=checkout&amp;id=5519a500-559a-4362-8442-a53900a2ef79\">《销售合同普通条款》</a></em></span>         </div>         <ul class=\"userinfo\">             <li>姓名：                 <input maxlength=\"20\" type=\"hidden\" id=\"userSysNo\" value=\"0\">                 <input type=\"text\" id=\"userName\" placeholder=\"请填写您的真实姓名\">             </li>             <li>手机号：                 <input type=\"text\" maxlength=\"13\" id=\"userPhone\" placeholder=\"请输入电话号码\" onkeydown=\"addspace(this)\" onkeyup=\"addspace(this)\">             </li>              <li class=\"last\">验证码：                 <input type=\"text\" id=\"userValidateCode\" maxlength=\"6\" placeholder=\"短信中6位数字\">                 <a id=\"getvalidatecode\" href=\"javascript:void(0)\">发送验证码</a>                 <a class=\"tipReget\"></a>             </li>         </ul>         <div class=\"txt-tip\">下单后购车者需本人携带有效证件到店验车提车，订单车辆发票的登记人信息需与验车提车人保持一致。</div>         <h1 class=\"chosePayTypeTit\">                         请选择支付方式<span>定金：<em>¥ </em><i> 0.01</i></span>                     </h1>         <div class=\"chosePayType\">             <a class=\"btnAlipay\" @click.stop.prevent=\"paying\"> </a>             <a class=\"btnWeixinpay\"   @click.stop.prevent=\"paying\"> </a>             <!-- <input id=\"schemesysno\" type=\"hidden\" value=\"67\"> -->         </div>  </div> </div>\r\n        </div>\r\n</div>";

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(219)
	module.exports = __webpack_require__(221)
	module.exports.template = __webpack_require__(222)
	if (false) {
	(function () {
	var hotAPI = require("d:\\wamp\\www\\git\\Code\\weiweiji\\vue-demo\\node_modules\\vue-loader\\node_modules\\vue-hot-reload-api\\index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./pay_success.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./pay_success.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./pay_success.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./pay_success.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./pay_success.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 219 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 220 */,
/* 221 */
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'支付成功',
					msg:'这里返回数据'
				}
			},
			//这里才是route的生存周期
			route:{
				activate:function(transition){
					this.$root.$set('header',this.title);
					transition.next();
				},
				data: function(transition) {
					var _this = this;
					console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
	
						setTimeout(function(){
							//在 transition.next({a:1}) 之前
							//这里 _this.$loadingRouteData 是 true  因为此时获取
							transition.next({a:1}); //这里必须要设置一个值 不能是 transition.next();
							//这里 _this.$loadingRouteData 就是false了。  vue-router.js :2250 左右
						},800);
				},
				deactivate: function (transition) {
					console.log('4');
					console.log('Bar 销毁!')
					transition.next()
				}
			},
			ready:function(){
				//事件绑定
				document.body.addEventListener('click',this.hideWrap,false);
			},
			destroyed:function(){
				//移除事件
				document.body.removeEventListener('click',this.hideWrap,false);
				console.log('组件销毁-移除事件绑定');
			}
		}

/***/ },
/* 222 */
/***/ function(module, exports) {

	module.exports = "<div >\r\n        <div class=\"paySuccess\">\r\n            <p class=\"mt10\">\r\n                <b>恭喜您支付成功！</b>\r\n                在未来24小时内，要买车线下交付中心客服经理，会主动与您联系。\r\n            </p>\r\n            <p class=\"mt20 fs14\">如果查看订单后续进度，请点击<a href=\"./orderTrack.html\">订单跟踪</a><br/>\r\n如有问题，您可致电<a href=\"tel:4009289099\">400-928-9099</a>咨询</p>\r\n        </div>\r\n    </div>";

/***/ }
]);
//# sourceMappingURL=build.js.map