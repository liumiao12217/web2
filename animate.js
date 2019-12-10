

/*首先引入animate.js库，它可以辅助实现一些简单的动画效果，变换的主要是以px为单位的样式，以及opacity

animate（添加动画效果的DOM元素，目标样式js对象结构）*/ 
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			console.log(cur);
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

	var container=document.getElementById("container");
    var navList=document.getElementsByTagName("li");
    var contain=document.getElementById("contain");
    var left=document.getElementById("left");
    var right=document.getElementById("right");
    var head=document.getElementById("head");
    var roll=document.getElementById("roll");
    var index=1;
    var timer;
    var isMoving=false;
    function getStyle(obj,style) {  
		if(obj.currentStyle) 
		{  
		    return obj.currentStyle[style];  
		} 
		else 
		{  
		    return getComputedStyle(obj)[style];  
		}  
	}

    //循环滚动通知
    window.onload=function(){
        var time=setInterval(function(){
            var distance=parseInt(getStyle(roll,"left"));
            roll.style.left=distance-4+"px";
            if(distance<=-400){
                roll.style.left=distance+1600+"px";
            }
        },60)
    }

    //鼠标划上时清除定时器
    container.onmouseover=function(){
        animate(left,{opacity:50});
        animate(right,{opacity:50});
        clearInterval(timer);
    }

    //鼠标划出加上定时执行器
    container.onmouseout=function(){
        animate(left,{opacity:0})
        animate(right,{opacity:0})
        timer=setInterval(right.onclick,3000);
    }

    //按钮点击切换图片
    for(var i=0;i<navList.length;++i){
        navList[i].index=i;
        navList[i].onclick=function(){
            index=this.index+1;
            navAlter();
            animate(contain,{left:-1200*index});
        }
    }

    //点击右箭头时，切换下一个照片
    right.onclick=function(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index++;
        navAlter();
        animate(contain,{left:-1200*index},function(){
            if(index===6){
                contain.style.left="-1200px";
                index=1; 
            }
            isMoving=false;
        });
    }
    //点击左箭头时，切换到上一个照片
    left.onclick=function(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index--;
        navAlter();
        animate(contain,{left:-1200*index},function(){
            if(index===0){
                contain.style.left="-6000px";
                index=5;
            }
            isMoving=false;
        });
    }
    
     //按钮换颜色的事件
     function navAlter(){
        for(var i=0;i<navList.length;++i){
            navList[i].className="";
        }
        if(index>5){
            navList[0].className="change";
        }else if(index===0){
            navList[4].className="change";
        }else{
            navList[index-1].className="change";
        }
    }
    timer=setInterval(right.onclick,3000);


