import {
	$http,$http1
} from './index.js'
// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}

// 封装uni挂载发送的请求
uni.$http = $http
$http.baseUrl = 'http://www.haorui.xyz:8085'
// $http.baseUrl = 'http://127.0.0.1:8085'

$http.beforeRequest = function(options) {
	var header = {
		token:uni.getStorageSync('tokenCode') //读取本地保存好的上一次cookie
	};
	console.log(header.token)
	options.header = header
	uni.showLoading({
		title: '加载中...'
	})
}
$http.afterRequest = function() {
	uni.hideLoading()
}


uni.$http1 = $http1
$http1.baseUrl = 'https://restapi.amap.com'
// $http.baseUrl = 'http://127.0.0.1:8085'

$http1.beforeRequest = function(options) {
	var header = {
		key:"522362faac2c295b7777e2e1f77cdfa6"
	};
	console.log(header.token)
	options.header = header
	uni.showLoading({
		title: '加载中...'
	})
}
$http1.afterRequest = function() {
	uni.hideLoading()
}
