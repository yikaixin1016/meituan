// 定义列表页组件
define(['tools/util'], function (Util) {
	// 定义列表组件
	var ListComponent = Vue.extend({
		// 获取属性变量
		props: ['key'],
		template: Util.tpl('tpl_list'),
		data: function () {
			return {
				type: [
					{value: '价格排序', key: 'price'},
					{value: '销量排序', key: 'sales'},
					{value: '好评排序', key: 'evaluate'},
					{value: '优惠排序', key: 'discount'}
				],
				// 展示的产品
				list: [],
				// 缓存没有展示的商品
				other: [],
				// 搜索关键字
				// searchKey: ''
			}
		},
		// 定义回调函数
		methods: {
			loadMore: function () {
				// 将other内容追加给list，并清空other
				this.list = [].concat(this.list, this.other);
				// 清空other
				this.other = [];
			},
			/**
			 * 点击类别按钮，要对商品排序
			 * @key 	属性名称
			 **/ 
			changeType: function (key) {
				// 如果是优惠要特殊处理，原价-现价
				if (key === 'discount') {
					this.list = this.list.sort(function (a, b) {
						// 原价-现价
						var aDiscount = a.orignPrice - a.price;
						var bDiscount = b.orignPrice - b.price;
						// 如果正序
						return aDiscount - bDiscount;
					})

				// 根据key的属性名称进行排序
				} else {
					this.list = this.list.sort(function (a, b) {
						// 正序
						// 对a[key]和b[key]进行排序
						// return a[key] - b[key]
						// 倒序
						return b[key] - a[key]
					})
				}
			}
		},
		// 请求数据
		created: function () {
			// 缓存实例化对象
			var me = this;
			// 在组件内部可以通过$parent访问他的父组件，父组件中有个query数据，我们可以访问
			var query = me.$parent.query;
			// 定义请求的query
			var str = '';
			// 根据query的设置请求的query
			if (query[0] && query[1]) {
				// ['type', 1] => ?type=1
				str += '?' + query[0] + '=' + query[1]
			}
			// console.log(query)
			Util.ajax('data/list.json' + str, function (res) {
				// 保存请求返回的数据
				if (res && res.errno === 0) {
					// 缓存数据
					me.list = res.data.slice(0, 3);
					me.other = res.data.slice(3);
				}
			})
			// /list/search/1 => ['search', 1]
			// 如果query[0]等于search 我们保留query[1],否则删除
			// if (query[0] === 'search') {
			// 	me.searchKey = query[1]
			// } else {
			// 	me.searchKey = '';
			// }
			// console.log(me.searchKey)
		}

	})

	// 将组件作为接口暴漏
	return ListComponent;
})