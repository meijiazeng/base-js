//  获取样式函数
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];				
	}
}


// 运动函数
function startMove(obj, attr, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var cur=0;
		if(attr=='opacity')
		{
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			//  因为透明度是小于1，所以当取整的时候，就会等于没有透明度 所要乘以100.比较保险
		}
		else
		{
			cur=parseInt(getStyle(obj,attr));
		}
		var speed=(iTarget-cur)/6;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur==iTarget)
		{
			clearInterval(obj.timer);
		}
		else
		{
			if(attr=='opacity')
			//  透明度就会应用这个
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
				document.getElementById('txt1').value=obj.style.opacity;
			}
			else
			//   其他的就会应用这个 透明度就不会有px
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
	}, 30);
}

//  （函数）虎丘到你要选择的那个选择器
function getByClass(oParent, sClass)
{
	var aEle = oParent.getElementsByTagName('*');
	var aResult=[];
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

// 函数----Begin-----
window.onload=function()
{
	var oDiv = document.getElementById('playimages');
	var oBtnPrev = getByClass(oDiv, 'prev')[0];
	var oBtnNext = getByClass(oDiv, 'next')[0];
	var oMarkLeft = getByClass(oDiv, 'mark_left')[0];
	var oMarkRight = getByClass(oDiv, 'mark_right')[0];
	
	var oDivSmall=getByClass(oDiv, 'small_pic')[0];
	var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
	var aLiSmall=oDivSmall.getElementsByTagName('li');
	
	var oUlBig=getByClass(oDiv, 'big_pic')[0];
	var aLiBig=oUlBig.getElementsByTagName('li');
	
	var nowZIndex=2;
	var now=0;
	
//	oUlSmall.style.width=aLiSmall.length*aLiSmall[0].offsetWidth+'px';
	//  设置下边的ul宽度为  li的宽度乘上li个数
	
	//  左右按钮-----Begin------
	oBtnPrev.onmouseover=oMarkLeft.onmouseover=function()
	{
		startMove(oBtnPrev, 'opacity', 100);
	}
	oBtnPrev.onmouseout=oMarkLeft.onmouseout=function()
	{
		startMove(oBtnPrev, 'opacity', 0);
	}
	oBtnNext.onmouseover=oMarkRight.onmouseover=function()
	{
		startMove(oBtnNext, 'opacity', 100);
	}
	oBtnNext.onmouseout=oMarkRight.onmouseout=function()
	{
		startMove(oBtnNext, 'opacity', 0);
	}
	//  左右按钮-----End------
	
	
	// 大图切换----Begin------
	for(var i=0;i<aLiSmall.length;i++)
	{
		aLiSmall[i].index=i;
		aLiSmall[i].onclick=function()
		{
			if(this.index==now)return;
			now=this.index;
			//  设置图片重复 如果是相同的就切换下一张 避免重复
			// 原理就是  如果当前的now是0 点击一下就会变成1，那么当now跟你的index一样 图片就不会再进行变换
			tab();
		}
		aLiSmall[i].onmouseover=function()  
		{
			startMove(this, 'opacity', 100);
			// 移进的透明度
		}
		aLiSmall[i].onmouseout=function()
		{
			if(this.index!=now)
			// 判断一下如果不是当前所选的      那么就会把透明度设置回半透明
			{
				startMove(this, 'opacity', 60);
			}
		}
	}
	// 大图切换----End------
	
	// 按钮---Begin---
	
	function tab()
	{
		aLiBig[now].style.zIndex=nowZIndex++;
			//   给大图片加上层级  那么只要点击你要的那张图片 那张图片的层级会自加 然后就会显示在最上面一层
			
			for(var i=0;i<aLiSmall.length;i++)
			{
				startMove(aLiSmall[i], 'opacity', 60)
				 先默认的所有的透明度设置为半透明
			}
			startMove(aLiSmall[now], 'opacity', 100);
//			//  当前的把透明度设置为100
//			
			aLiBig[now].style.height=0;
			startMove(aLiBig[now],  'height', 320);
			//  设置大图片从上面往下面刷下来  就是先把图片的高度获取设置为0 然后运动的时候就把高度设置为原始高度，
			//那么图片自然会从上面往下面刷下来
			
			if(now==0)
			{
				startMove(oUlSmall, 'left', 0)
			}
			// 如果当前是第一张照片的话  那么就把他的的左边距重置为0  就是跟第二张照片的左边距一样   为了防止当前选择为第一张照片的时候  左边会空出一个li的宽度
			else if(now==aLiSmall.length-1)
			{
				startMove(oUlSmall, 'left', -(now-2)*aLiSmall[0].offsetWidth);
			}
			// 如果当前是第一张照片的话  那么就把他的的左边距设置为跟前面的li一样的左边距   为了防止当前选择为第一张照片的时候  左右边会空出一个li的宽度
			
			else
			{
				startMove(oUlSmall, 'left', -(now-1)*aLiSmall[0].offsetWidth);	
			}
//			原理：当选择第一第二张图片的时候，ul的left依然是0  但当选择第三张图片的时候 第三张图片就要移动到中间的位置  那么相应的就是ul要向左边移动一个li的位置
//			0---0   1---0  2---(-1)  3---(-2)    4---(-3)以此类推  第一个数字是第几张图片 第二个数字是相应向左边移动的li个数 ,（li个数乘上宽度==左边距)
//			所以得出规律    -(当前的图片减去1)*li的宽度（随便一个li宽度都行，因为宽度都是一样的）
			
	}
	
	
	oBtnPrev.onclick=function()
	{
		now--;
		if(now==-1)
		{
			now=aLiSmall.length-1;
		}
		tab();
	}
	//   如果左边滚动过一张     就让li的宽度减去1
	oBtnNext.onclick=function()
	{
		now++;
		if(now==aLiSmall.length)
		{
			now=0;
		}
		tab();
		// 当图片已经到了这个宽度尽头的时候，就让左边距重置为0
	}
		
	//  给div设置一个定时器 让他自动播放
	var timer=setInterval(oBtnNext.onclick, 2000);
	oDiv.onmouseover=function()
	{
		clearInterval(timer);
	}
	oDiv.onmouseout=function()
	{
		timer=setInterval(oBtnNext.onclick, 2000);
	}
		
	
	// 按钮---End-----
}

	
	


			
			