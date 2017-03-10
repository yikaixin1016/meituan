// 创建home组件
define(['tools/util', 'filter/filter'], function (Util) {
	// 定义组件
	var HomeComponent = Vue.extend({
		// template: '<h1>home{{demo}}</h1>',
		template: Util.tpl('tpl_home'),
		// 组件跟vue实例化对象很相似，
		// data: {
		// 	demo: 'hello'
		// }
		data: function () {
			// 返回值是输出的数据
			return  {
				type: [
					{id: 1, title: '美食', url: '01.png'},
					{id: 2, title: '电影', url: '02.png'},
					{id: 3, title: '酒店', url: '03.png'},
					{id: 4, title: '休闲娱乐', url: '04.png'},
					{id: 5, title: '外卖', url: '05.png'},
					{id: 6, title: 'KTV', url: '06.png'},
					{id: 7, title: '周边游', url: '07.png'},
					{id: 8, title: '丽人', url: '08.png'},
					{id: 9, title: '小吃快餐', url: '09.png'},
					{id: 10, title: '火车票', url: '10.png'}
				],
				// 广告数据
				ad: [],
				// 列表数据
				list: []
			}
		},
		created: function () {
			// console.log(arguments)
			// console.log(this)
			// 缓存this
			var me = this;
			// 请求数据
			Util.ajax('data/home.json', function (res) {
				// console.log(res)
				// 我们要将返回的数据保存在vue实例化对象中，来渲染模板
				if (res && res.errno === 0) {
					// 保存数据有两种方式
					me.ad = res.data.ad;
					// me.list = res.data.list;
					// 通过$set方法可以为组件实例化对象绑定数据
					me.$set('list', res.data.list)
					// console.log(me)
				}
			})
		}
	})

	// 将组件作为接口暴漏
	return HomeComponent;
})