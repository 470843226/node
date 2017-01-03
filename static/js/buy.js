var filterSetting = [
	{
		title : "里程",
		options : [
			{
				name : "1万公里以内",
				value : 1
			},
			{
				name : "3万公里以内",
				value : 3
			},
			{
				name : "5万公里以内",
				value : 5
			},
			{
				name : "8万公里以内",
				value : 8
			}
		]
	},
	{
		title : "变速箱",
		options : [
			{
				name : "MT-手动",
				value : 1
			},
			{
				name : "AT-自动",
				value : 2
			}
		]
	},
	{
		title : "排量",
		options : [
			{
				name : "1.0L以下",
				value : "1.0"
			},
			{
				name : "1.1L-1.6L",
				value : "1.1"
			},
			{
				name : "1.6L-2.0L",
				value : "1.6"
			},
			{
				name : "2.0L-2.5L",
				value : "2.0"
			},
			{
				name : "2.5L-3.0L",
				value : "2.5"
			},
			{
				name : "3.0L-4.0L",
				value : "3.0"
			},
			{
				name : "4.0L以上",
				value : "4.0"
			}
		]
	},
	{
		title : "排放标准",
		options : [
			{
				name : "国二及以上",
				value : 1
			},
			{
				name : "国三及以上",
				value : 2
			},
			{
				name : "国四及以上",
				value : 3
			}
		]
	},
	{
		title : "国别",
		options : [
			{
				name : "德国",
				value : "101"
			},
			{
				name : "日本",
				value : "308"
			},
			{
				name : "美国",
				value : "123"
			},
			{
				name : "韩国",
				value : "212"
			},
			{
				name : "中国",
				value : "095"
			}
		]
	},
	{
		title : "价格",
		options : [
			{
				name : "5万元以下",
				value : "0-5"
			},
			{
				name : "5-10万元间",
				value : "5-10"
			},
			{
				name : "10-20万元间",
				value : "10-20"
			},
			{
				name : "20-50万元间",
				value : "20-50"
			},
			{
				name : "50万元以上",
				value : "50-5000"
			}
		]
	}
];
function createBox(option){
	var box = document.createElement("div");
	box.className = "box";
	box.style.backgroundImage = "url(" + option.url + ")";
	//  数组的拼接速度快于字符串拼接

	box.innerHTML = [
		"<div class=\"detail\">",
		"<a href=\"",
		option.id,
		"\">", 
		option.title,
		"</a>",
		"<p class=\"price\">",
		"￥",
		option.price,
		"万</p>",
		"<p class=\"content\">",
		function(){
			var date = new Date(option.lisenceTime);
			return [
				date.getFullYear(),
				"/",
				date.getMonth() + 1
			].join("");
		}(),
		"上牌 | ",
		option.kilometer,
		"万公里 | ",
		option.province,
		"</p>",
		"<div class=\"mark\">",
		"<em>",
		["商家", "实名"][option.isPersonal],
		"认证</em>",
		"</div>",
		"</div>",
		["", "<i class=\"sold\">已售</i>"][option.isSold],
	].join("");
	return box;
}
function CarSaler(type, salers){
	var _this = this;
	this.carData = [];
	if(type === "filter"){
		var filterFragment = document.createDocumentFragment(),
		//解耦
			filterFunc = [
				function(item, value){
					return item.kilometer < value;
				},,,,,
				function(item, value){
					var a = value.split("-");
					return +item.price > a[0] && +item.price < a[1];
				}
			];
		filterSetting.forEach(function(item, index){
			//  给每个 item 添加了一个 "filterFunc" 属性
			item.filterFunc = filterFunc[index];
			filterFragment.appendChild(createSelect(item));
		});
		document.getElementById("bottom").appendChild(filterFragment);
		function createSelect(option){
			var container = document.createElement("div"),
				title = document.createElement("h2"),
				select = document.createElement("div"),
				placeholder = document.createElement("span"),
				icon = document.createElement("i"),
				ul = function(){
					var ul = document.createElement("ul");
					option.options.forEach(function(item){
						var li = document.createElement("li");
						li.innerText = item.name;
						li.onclick = function(){
							_this.dispatch(_this.carData.filter(function(_item){
								return option.filterFunc(_item, item.value);
							}));
							placeholder.innerText = item.name;
						};
						ul.appendChild(li);
					});
					var _default = document.createElement("li");
					_default.innerText = "不限";
					_default.onclick = function(){
						_this.dispatch(_this.carData);
						placeholder.innerText = "请选择" + option.title;
					};
					ul.appendChild(_default);
					return ul;
				}(),
				status = 0;
			container.className = "row";
			placeholder.innerText = "请选择" + option.title;
			icon.className = "icon2 down";
			select.onclick = function(){
				select.className = ["select ", ["normal", "current"][status]].join("");
				status ^= 1;    
			};
			title.innerText = option.title;
			select.className = "select normal";
			select.appendChild(placeholder);
			select.appendChild(icon);
			select.appendChild(ul);
			container.appendChild(title);
			container.appendChild(select);
			return container;
		}
	}else if(type === "ajax"){
		ajax({
			url : "/getCars",
			success : function(data){
				var data = data.data;
				salers.forEach(function(item){
					item.sync(data);
				});
				this.dispatch(data);
			}.bind(this)
		});
	}
}
CarSaler.prototype.dispatch = function(data){
	this.subscribor.update(data);
};
CarSaler.prototype.sync = function(saler){
	saler.carData = this.carData;
};
function CarBuyer(){}
CarBuyer.prototype.update = function(){
	var container = document.getElementById("cars");
	return function(data){
		//  清空 div ，保证我们后续添加的内容不是累加而是覆盖
		container.innerText = "";
		//  创建了一个文档碎片
		var carFragment = document.createDocumentFragment();
		data.forEach(function(item){
			carFragment.appendChild(createBox(item));
		});
		container.appendChild(carFragment);
	};
}();
CarBuyer.prototype.subscribe = function(carSaler){
	carSaler.subscribor = this;
};
var createSaler = function(){
	var salers = [];
	return function(type){
		var saler = new CarSaler(type, salers);
		salers.push(saler);
		return saler;
	};
}();
var salerA = createSaler("filter");
var salerB = createSaler("ajax");
var buyer = new CarBuyer;
buyer.subscribe(salerA);
buyer.subscribe(salerB);