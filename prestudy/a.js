var a = 1,
	b = 2,
	c = [a, b];
if(1){
	console.log(1);
}
console.log(1 + c.join(""));
while(a){
	a = 0;
	console.log(a);
}
function f(a, b){
	return a * b;
}
console.log(f(2, 3));
function Ctor(){
	this.a = 233;
}
console.log(new Ctor);
try{
	console.log(window);
	console.log(location.href);
	console.log(document.createElement("div"));
}catch(e){
	console.log(e);
}
setTimeout(function(){
	console.log(2333);
}, 2000);
// js的基础语法在node.js环境下也能够使用，因为它们同属javascript
// 但是属于浏览器这个宿主的所有对象不能在服务器上使用，因为js运行在服务器上时，宿主变成了服务器，所以又能使用服务器所固有的对象

// 获取当前执行的文件的路径
console.log(__filename);

// 获取当前执行的文件所属文件夹的路径
console.log(__dirname);

// 获取全局对象
// console.log(global);

// require(""/*依赖的模块名称*/);
console.log(require);
console.log(module);
var moduleB = require("./b"),
	test = require("./b").test;
console.log(moduleB, typeof moduleB, moduleB.test, test);
var moduleC = require("./c"),
	name = moduleC.apply({
		name : 666
	});
console.log(name);
console.log(require("express"/*node_modules文件夹中的子文件的文件名*/));
console.log(require("qs"));