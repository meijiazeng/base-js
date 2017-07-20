window.onload=function(){
	// 先定义数组 var[1,2,3...]
		var arr=[
			'你是不是一月',
			'你几时山二月',
			'你是不是三月',
			'你几时山四月',
			'你是不是五月',
			'你几时山六月',
		];
		//   getElementsByTagName 获取一组元素
		var oDiv = document.getElementById('tab');
		var oLi = oDiv.getElementsByTagName('li');
		var aDiv =oDiv.getElementsByTagName('div') [0];    
//		后使用数组arr[0]
		
		for(var i=0;i<oLi.length;i++)
		{
			oLi[i].index=i;
			oLi[i].onmouseover=function()
		{
				for(var i=0;i<oLi.length;i++){
				oLi[i].className=' ';
			}
			this.className='active';
			aDiv.innerHTML='<h3>'+(this.index+1)+'月活动</h3><p>'+arr[this.index]+'</p>';
			//innerHTMl 设置显示的的内容
		}
	}
}
