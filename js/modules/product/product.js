// 定义产品组件
define(['tools/util'], function (Util) {
	// 定义组件类
	var ProductComponent = Vue.extend({
		template: Util.tpl('tpl_product'),
		data: function () {
			return {
				data: {}
			}
		},
		// 请求数据
		created: function () {
			// 缓存this
			var me = this;
			// 获取query
			var query = me.$parent.query;
			// 定义请求的query
			var str = '';
			if (query[0]) {
				// ?id=2
				str = '?id=' + query[0]
			}
			// 请求数据
			Util.ajax('data/product.json' + str, function (res) {
				// 如果请求成功保存数据
				if (res && res.errno === 0) {
					// 缓存数据
					me.data = res.data;
				}
			})
		}
	})

	// 暴漏接口
	return ProductComponent;
})