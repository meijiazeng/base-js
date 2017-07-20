window.onload=function()
{
	var oDiv = document.getElementById('div1');
	var oUi = oDiv.getElementsByTagName('ul')[0];
	var aLi = oUi.getElementsByTagName('li');
	var speed = 2;
	
	oUi.innerHTML=oUi.innerHTML+oUi.innerHTML;
	oUi.style.width=aLi[0].offsetWidth*aLi.length+'px';
	function move()
	{
		if(oUi.offsetLeft<-oUi.offsetWidth/2)
		// 当向左边滚动的时候，滚动了一半内容，马上把内容扯回
		{
			oUi.style.left='0';
		}
		if(oUi.offsetLeft>0)
		//  当向右边滚动的时候，滚动到了一半内容，马上扯回
		{
			oUi.style.left=-oUi.offsetWidth/2+'px';
		}
		// 设置一个滚动
		oUi.style.left=oUi.offsetLeft+speed+'px';
	};
	// 定时器设置多长时间滚动图片
	
	var timer = setInterval(move,30);
	// 当鼠标停留在滚动的图片时候，滚动暂停，清除定时滚动
	oDiv.onmouseover=function()
	{
		clearInterval(timer);
	};
	//  当鼠标离开图片后，开启定时器，（因为定时器关闭后，必须重新打开）
	oDiv.onmouseout=function()
	{
		timer = setInterval(move,30);
	};
	// 向左滚动，使用负数
	document.getElementsByTagName('a')[0].onclick
	=function()
	{
		speed=-2;
	}
	// 向右滚动，使用正数
	document.getElementsByTagName('a')[1].onclick
	=function()
	{
		speed=2;
	}
}
