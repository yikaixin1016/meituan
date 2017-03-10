// 定义vue实例化对象模块
define(['modules/home/home', 'modules/list/list', 'modules/product/product', 'tools/util'], function (HomeComponent, ListComponent, ProductComponent, Util) {
	// 我们要引入这些组件类，并将这些组件注册到页面中
	// 注册这些组件
	Vue.component('home', HomeComponent);
	Vue.component('list', ListComponent);
	Vue.component('product', ProductComponent);
	// 实例化vue对象
	var app = new Vue({
		el: '#app',
		data: {
			msg: '爱创课堂',
			view: 'product',
			// 保留hash的数据
			query: [],
			// 搜索框绑定的数据
			searchKey: '',
			myKey: ''
		},
		// 定义回调函数
		methods: {
			goSearch: function () {
				// 改变路由
				this.myKey = this.searchKey;
				// location.hash = '#/list/search/' + this.searchKey
				// console.log(this.mykey)
			},
			// 点击返回按钮
			goBack: function () {
				// 返回上一个页面
				history.go(-1)
			}
		}
	})

	// 将app作为接口暴漏出来
	return app;
})