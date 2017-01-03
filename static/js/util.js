//数组forEach方法补丁
Array.prototype.forEach = function(callback){
	var a = 0,
		len = this.length;
	while(a < len){
		callback(this[a], a++, this);
	}
};
//数组map方法补丁
Array.prototype.map = function(callback){
	var a = 0,
		len = this.length,
		result = [];
	while(a < len){
		result.push(callback(this[a], a++, this));
	}
	return result;
};
//数组filter方法补丁
Array.prototype.filter = function(callback){
	var a = -1,
		len = this.length,
		result = [];
	while(++a < len){
		callback(this[a], a, this) && result.push(this[a]);
	}
	return result;
};
// 封装ajax方法
function ajax(option){
	var xhr = new XMLHttpRequest,
		type = option.type || "get",
		url = option.url,
		data = option.data,
		dataType = option.dataType || "json",
		success = option.success,
		error = option.error,
		isGet = +(type === "get");
	// 将对象字面量转换为location.search形式的查询字符串
	function serialize(obj){
		var i,
			arr = []
		for(i in obj){
			arr.push(["&", i, "=", obj[i]].join(""));
		}
		return arr.join("").slice(1);
	}
	xhr.onreadystatechange = function(){
		var responseText;
		if(xhr.readyState === 4){
			responseText = xhr.responseText;
			if(xhr.status >= 200 && xhr.status < 300){
				typeof success === "function" && success.call(option, dataType === "json" ? eval(["(", responseText, ")"].join("")) : responseText);
			}else{
				typeof error === "function" && error.call(option, responseText);
			}
		}
	};
	xhr.open(type, [url, ["", ["?", serialize(data)].join("")][isGet]].join(""), option.async === undefined ? 1 : option.async);
	type === "post" && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send([serialize(data), null][isGet]);
}