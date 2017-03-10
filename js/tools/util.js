// 定义工具方法
define([], function () {
	var Util = {
		/**
		 * 异步请求方法
		 * @url 	请求地址
		 * @fn 		请求的回调函数
		 **/ 
		ajax: function (url, fn) {
			// 创建xhr对象
			var xhr = new XMLHttpRequest();
			// 监听事件
			xhr.onreadystatechange = function () {
				// 监听readystate
				if (xhr.readyState === 4) {
					// 请求状态码
					if (xhr.status === 200) {
						// 将数据转化成json
						var data = JSON.parse(xhr.responseText)
						// 执行回调函数
						fn && fn(data)
					}
				}
			}
			// 打开请求
			xhr.open('GET', url, true);
			// 发送数据
			xhr.send(null);
		},
		/**
		 * 获取模板内容方法
		 * @id 		模板容器的id
		 ***/
		tpl: function (id) {
			// 根据id获取内容
			return document.getElementById(id).innerHTML;
		}
	}

	// 测试
	// Util.ajax('data/home.json', function (res) {
	// 	console.log(res)
	// })
	// var tpl = Util.tpl('tpl_home')
	// console.log(tpl)
	// 作为接口暴漏出来
	return Util
})