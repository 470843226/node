var fs = require("fs"/*文件系统，nodejs内部的依赖模块*/);
// 异步创建文件夹
fs.mkdir("./a", function(err/*如果创建文件夹失败，则通过此参数显示错误信息，如果创建成功，则返回null*/){
	console.log(err);
});
// 同步创建文件夹
try{
	fs.mkdirSync("./a"); //尽量少使用同步的api操作，因为它会阻塞js代码的向下执行
}catch(e){
	console.log(e);
}
// 异步往一个文件的最后书写内容，如果没有这个文件，则创建文件，再书写
fs.appendFile("./b/a.txt"/*文件的路径*/, "666"/*文件的内容*/, function(err/*但凡是nodejs和文件系统相关的回调函数，第一个参数都是错误信息*/){
	err && console.log(err);
});
// 同步往一个文件的最后书写内容，如果没有这个文件，则创建文件，再书写
try{
	fs.appendFileSync("./a/b.txt", "233");
}catch(e){
	console.log(e);
}
// 异步创建或覆盖一个文件
fs.writeFile("./a/b.txt", "666", function(err){
	err && console.log(err);
});
// 异步读取一个文件中的内容
fs.readFile("./a/b.txt", "utf-8"/*文件的编码*/, function(err, data/*如果没有第二个编码参数，则data会返回文件的二进制数据流，需要进行toString()才能转成字符串*/){
	console.log(err, data);
});
// 异步删除文件夹
fs.rmdir("../server/c", function(err){
	console.log(err);
});
// 异步删除文件
fs.unlink("./a/a.txt", function(err){
	console.log(err);
});
// 异步查看文件的相关信息
fs.stat("../server/server.js", function(err, data){
	console.log(err, data);
});
// 异步获取文件夹中的文件列表
fs.readdir("../server", function(err, files){
	console.log(err, files);
});