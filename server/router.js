var readFile = require("fs").readFile; // nodejs已有的原始模块
function _readFile(path, cb){
	readFile(path, "utf-8", function(err, file){
		cb(err ? "读取页面失败" : file);
	});
}
function getCode(length){
	var num = parseInt(Math.random() * Math.pow(10, length)) + "";
	return num/*.padStart(length, num)*/;
}
var oTel = {};
// 模块化导出
module.exports = function(router){
	// 同步表单页面
	router.route("/syncForm")
		.get(function(req, res){
			// console.log(req.headers/*来自浏览器的请求头*/);
			// 如果服务器代码出错，会自动返回500左右的状态码和报错信息，如执行：console.log(asdf/*变量未声明*/);
			// res.status(200)/*设置此次请求的http状态码*/.send("首页");
			_readFile("./syncForm.html", res.end.bind(res));
		});
	//异步表单页面
	router.route("/asyncForm")
		.get(function(req, res){
			_readFile("./asyncForm.html", res.end.bind(res));
		});
	//基础请求
	router.route("/upload")
		//请求的get接口
		.get(function(req, res){
			var query = req.query;
			res.send(["您的用户名为：", query.user].join(""));
		})
		//请求的post接口
		.post(function(req, res){
			var body = req.body;
				res.end(["您的用户名为：", body.user].join(""));
		});
	//注册
	router.route("/signUp")
		//注册页面
		.get(function(req, res){
			_readFile("./signUp.html", res.end.bind(res));
		})
		//注册的post接口
		.post(function(req, res){
			var body = req.body;
			if(oTel[body.tel] === body.code){
				return res.send("注册成功");
			}
			res.send("注册失败");
		});
	//验证码
	router.route("/code")
		//验证码的get接口
		.get(function(req, res){
			var code = getCode(6);
			oTel[req.query.tel] = code;
			res.send(code);
		});
	return router;
};