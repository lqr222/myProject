/** banner **/
var focus = document.querySelector('.focus');
var ri = document.querySelector('.focus-r');
var le = document.querySelector('.focus-l');
var ul = document.querySelector('.focus-fa');
var ol = document.querySelector('.focus-nav');
var moveWidth = focus.offsetWidth;

// 左右箭头隐藏,自动播放控制
focus.addEventListener('mouseover', function () {
	le.style.display = 'block';
	ri.style.display = 'block';
	clearInterval(timer);
	timer = null;
})

focus.addEventListener('mouseout', function () {
	le.style.display = 'none';
	ri.style.display = 'none';
	timer = setInterval(function () {
		ri.click();
	}, 4000)

})


//循环添加li，并添加索引index
for (var i = 0; i < ul.children.length; i++) {
	var lis = document.createElement('li');
	lis.setAttribute('index', i);
	ol.appendChild(lis);

	//li点击事件，排他思想
	lis.addEventListener('click', function () {
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		this.className = 'adorn';

		//小圆点点击移动
		var index = this.getAttribute('index');
		num = index;
		circle = index;
		animate(ul, -index * moveWidth);
	})
}
ol.children[0].className = 'adorn';


//右箭头实现无缝滚动 num控制右箭头 circle控制左箭头 flag节流阀
var pic = ul.children[0].cloneNode(true);
ul.appendChild(pic);
var num = 0;
var circle = 0;
var flag = true;
ri.addEventListener('click', function () {
	if (flag) {
		flag = false;
		if (num == ul.children.length - 1) {
			ul.style.left = 0;
			num = 0;
		}
		num++;
		animate(ul, -num * moveWidth, function () {
			flag = true;
		});

		//小圆圈变化
		circle++;
		if (circle == ol.children.length) {
			circle = 0;
		}
		circleChange();
	}
})


//左箭头实现，原理等同右箭头改部分值
le.addEventListener('click', function () {
	if (flag) {
		flag = false;
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -(ul.children.length - 1) * moveWidth + 'px';

		}
		num--;
		animate(ul, -num * moveWidth, function () {
			flag = true;
		});

		//小圆圈变化
		circle--;
		if (circle < 0) {
			circle = ol.children.length - 1;
		}
		circleChange();
	}
})


//定义自动播放函数
var timer = setInterval(function () {
	ri.click();
}, 4000)


//小圆圈排他思想函数
function circleChange() {
	for (let i = 0; i < ol.children.length; i++) {
		ol.children[i].className = '';
	}
	ol.children[circle].className = 'adorn';
}


//定义动画函数
function animate(obj, target, callback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var step = (target - obj.offsetLeft) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (obj.offsetLeft == target) {
			clearInterval(obj.timer);
			callback && callback();
		}
		obj.style.left = obj.offsetLeft + step + 'px';
	}, 15);
}

/** 倒计时 **/


var hour = document.getElementById("_h");
var min = document.getElementById("_m");
var sec = document.getElementById("_s");
var str = "2020-9-8 23:55:00";//设置截止时间 
var endDate = +new Date(str);

//递归每秒调用countTime方法，显示动态时间效果
countDown();
var times = setInterval(countDown, 1000);
function countDown() {
	//获取当前时间  
	var newTime = +new Date();
	//时间差  
	var leftTimes = endDate - newTime;
	var leftTime = leftTimes / 1000;
	if (leftTimes >= 0) {
		//定义变量 h,m,s保存倒计时的时间
		var h, m, s;
		h = Math.floor(leftTime / 60 / 60 % 24);
		h = h < 10 ? "0" + h : h;
		m = Math.floor(leftTime / 60 % 60);
		m = m < 10 ? "0" + m : m;
		s = Math.floor(leftTime % 60);
		s = s < 10 ? "0" + s : s;
		//将倒计时赋值到div中   
		hour.innerHTML = h;
		min.innerHTML = m;
		sec.innerHTML = s;
	} else {
		clearInterval(times);
	}
}

//闪购
// var shangouCon = document.getElementById('shangouCon');
// var lisWidth = shangouCon.children.length * (shangouCon.children[0].clientWidth + 14);
// var childs = shangouCon.children[0].cloneNode(true);
// shangouCon.appendChild(childs);

// animates(shangouCon, lisWidth);


// /** tab **/
// var houseElectricalTitle = document.getElementById("houseElectricalTitle").getElementsByTagName("li");
// var houseElectricalDiv = document.getElementById("houseElectricalDiv").getElementsByClassName("wiring_right_con");
// var tabLen = houseElectricalTitle.length;
// for (var i = 0; i < tabLen; i++) {
// 	houseElectricalTitle[i].index = i;
// 	houseElectricalTitle[i].onmouseover = function () {
// 		var num = parseInt(this.index);
// 		for (var j = 0; j < tabLen; j++) {
// 			houseElectricalTitle[j].className = "";
// 			houseElectricalDiv[j].className = "wiring_right_con hide";
// 		}
// 		houseElectricalTitle[num].className = "active";
// 		houseElectricalDiv[num].className = "wiring_right_con show";
// 	}
// }

// function animates(obj, target, callback) {
// 	clearInterval(obj.timer);
// 	obj.timer = setInterval(function () {
// 		if (obj.offsetLeft >= target) {
// 			clearInterval(obj.timer);
// 			// btn.disabled = 'trun';
// 			callback && callback();
// 		}
// 		obj.style.left = obj.offsetLeft + 2 + 'px';
// 	}, 30);
// }