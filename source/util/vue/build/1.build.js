webpackJsonp([1,2],{

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(151)
	module.exports = __webpack_require__(153)
	module.exports.template = __webpack_require__(154)
	if (false) {
	(function () {
	var hotAPI = require("/Users/vingo/vue/vue-vueRoute-webpack/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./splitting.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./splitting.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./splitting.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./splitting.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./splitting.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(152);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/cssnext-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./splitting.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/cssnext-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./splitting.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports
	
	
	// module
	exports.push([module.id, ".splitting{\n\t\tcolor:#f60;\n\t}", "", {"version":3,"sources":["/./src/views/splitting.vue"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX","file":"splitting.vue","sourcesContent":[".splitting{\n\t\tcolor:#f60;\n\t}"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 153:
/***/ function(module, exports) {

	module.exports = {
			//props: ['父组建传的值'],
			data:function(){
				console.log('1-1这里是组建的data,在route的 canActivate之后调用');
				return {
					title:'按需加载',
					msg:'这里返回数据'
				}
			},
			ready:function(){
				this.$root.$set('splittingView',{data:this.$data});
			}
		}

/***/ },

/***/ 154:
/***/ function(module, exports) {

	module.exports = "<div class=\"splitting\">\n\t按需加载的页面 {{msg}}\n\t<pre>\n      app.vue 中 ，先请求内容，再配置路由，再跳转\n      //按需加载\n      splitting:function(){\n        //加载完毕后添加到map中\n        var _this = this;\n\n        require.ensure(['./views/splitting.vue'], function(require) {\n          var splitting = require('./views/splitting.vue');\n\n          //配置路由\n          _this.$route.router.map({\n            '/splitting_view':{\n              name:'splitting',\n              component: splitting\n            }\n          });\n\n          //跳转\n          _this.$route.router.go({name:'splitting'});\n        });\n      }\n\t</pre>\n</div>";

/***/ }

});
//# sourceMappingURL=1.build.js.map