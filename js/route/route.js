// 定义路由
define(['modules/app'], function (app) {
	// 获取hash，并根据hash的值改变app的view属性
	// 定义解析路由方法
	function route () {
		// 获取hash
		var hash = location.hash;
		// 去除#  #home => home
		hash = hash.slice(1);
		// #/list => /list => list
		hash = hash.replace(/^\//, '');
		// list/tye/1  =>  ['list', 'type', '1']
		hash = hash.split('/');
		// 定义配置，定义哪些是可以用的
		var map = {
			home: true,
			list: true,
			product: true
		}
		// hash第一个成员（hash[0]）,如果在配置中，我们可以正常渲染，否则，要渲染到首页
		if (map[hash[0]]) {
			// 更改视图组件
			app.view = hash[0];
		// 否则进入默认页面 home
		} else {
			app.view = 'home';
		}
		// 将query保留
		app.query = hash.slice(1);

	}

	// hash的改变要触发hashchange
	window.addEventListener('hashchange', route)
	
	// 将route暴漏出来
	return route
})