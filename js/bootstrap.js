require(['route/route'], function (route) {
	// 通常在window load事件中触发，但是在使用require执行要比window load事件玩
	// 所以我们可以直接执行route方法
	route()
})