//定义星星的x/y坐标的最大值和最小值
var top = 0;
var bottom = 0;
var left = 0;
var right = 0;
			
		//		定义星星最大和最小宽度
var img_width_max = 70;
var img_width_min = 10;
  		//		获取满天星
function get(){		
			
	//			获取星星在可视区域内的最大的宽度和高度
right = window.innerWidth - img_width_max;
		// 减去图片后的宽度 高度
bottom = window.innerHeight - img_width_max;
					
	//	定时器
setInterval("start()",1000);
					
	}
			// 随机输出星星
	function start(){
	//	创建一个img节点
	var oImg = document.createElement("img");
					
	//	在body中增加img标签
	document.body.appendChild(oImg);
					
	//	为img节点增加src属性 并且赋值
	oImg.src="xing.gif";
					
	//	随机获取星星的宽度
	var width =getRandom(img_width_max,img_width_min);
					
	//	随机获取星星在可视区域的x 和 y 坐标
	var x = getRandom(left,right);
	var y = getRandom(top,bottom);
					
	//	为星星设计css样式
	var str = "position:absolute;width:"+width+"px;top:"+y+"px;left:"+x+"px;";
			
	oImg.setAttribute("style",str);
			
	oImg.onclick=function(){
		document.body.removeChild(this);
	}
	// 添加按下后消失星星的按钮事件
}
				
function getRandom(max1,min1){
	return Math.floor(Math.random()*(max1-min1)+min1);
	//返回指定值之间的随机数。返回的值不低于（并且可能相等）min，并且小于（但不等于）max。
}
get();
start();


		

