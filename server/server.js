// var express = require("express"), // 引入express框架的依赖
// 	app = express(); // 通过框架自执行，生成一个服务器
// app.get/*针对浏览器请求的发送方法类型*/("/asdf"/*路径、路由地址*/, function(req/*浏览器的请求对象*/, res/*服务器的响应对象*/){ // 当浏览器访问第一个参数的路径时，执行此回调函数
// 	res.send/*响应对象的send方法可以传输信息给浏览器*/("<h1>哈哈</h1>"/*显示在body里的innerHTML*/);
// });
// app.listen/*服务器监听端口用以被浏览器访问*/(2333/*端口号*/);

// nodejs已有的原始模块不需要再执行npm install 包名的方式去下载
// var http = require("http"), // nodejs已有的原始模块
var urlencoded = require("body-parser").urlencoded; // 非nodejs已有的原始模块需要执行npm install 包名的方式自动去npm上下载
// console.log(http.STATUS_CODES/*http的所有状态码，100左右表示即时通讯，200左右表示请求成功，300左右表示页面可能存在重定向，400左右表示浏览器可能发送了一些错误的请求，500左右表示服务器挂掉*/);
var express = require("express"),
	app = express();
app.use(urlencoded({
		extended : 1
	})/*此中间件将所有来自浏览器的请求中表单里的内容转换至req.body属性中方便获取*/)
	// express框架中自带的Router属性专做路由
	.use(require("./router")(express.Router()))
	.listen(2333, function(){
		console.log("Server started on port 2333");
	});