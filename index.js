document.addEventListener('readystatechange',
	function(){
		if(document.readyState === 'complete'){

//音量
		//audio对象的属性方法和事件
		var audio = document.querySelector('audio');
		var btnplay = document.querySelector('#btnplay');
		btnplay.onclick =function(){
			if(audio.paused){
				audio.play();
				
			}else{
				audio.pause();
			}	
		}
		audio.onplay =function(){
			btnplay.classList.remove('play_bt');
			btnplay.classList.add('pause_bt');
			
		}
		audio.onpause =function(){
			btnplay.classList.remove('pause_bt');
			btnplay.classList.add('play_bt');
			
		}
		//属性
		//src 歌曲的地址 改掉src回去加载另一首歌
		//paused 布尔值  如果audio处于暂停状态 true
		//ended 布尔值   如果audio播放完毕 true
		//currentTime    歌曲的播放进度
		//duration       歌曲的总播放时长
		//volume         设置音量

		//方法
		//play() pause()

		//事件
		//ontimeupdata onplay onpause


/*		btnPlayway.onclick=function(){
			divselect.style.display='block';
		}
		setbofangmoshi.*/



		
		var spanvolume = document.querySelector('#spanvolume');
		var spanvolumeop = document.querySelector('#spanvolumeop');
		var mute = document.querySelector('#spanmute');
		

		mute.onclick=(function(){
			var oldvolume;
			return function(){
				if(audio.volume!=0){
					oldvolume=audio.volume;
					audio.volume=0;
				}else{
					audio.volume=oldvolume;
				}
			}
		})()
		spanvolume.onclick=function(ev){
			var v= ev.offsetX/this.offsetWidth;
			audio.volume=v;
		}
		audio.onvolumechange=function(){
			if(audio.volume===0){
				mute.classList.remove('volume_icon');
				mute.classList.add('volume_mute');
			}else{
				mute.classList.remove('volume_mute');
				mute.classList.add('volume_icon');
			}
			var r=spanvolume.offsetWidth*audio.volume - spanvolumeop.offsetWidth/2;
			spanvolumeop.style.left=r +'px';
			spanvolumebar.style.width=r+'px';
		}

		spanvolumeop.onclick=function(ev){
			ev.stopPropagation();
		}
//播放进度
		var playerbar= document.querySelector('.player_bar');
		
		audio.ontimeupdate=function(){
			var l=this.currentTime/this.duration*spanplayer_bgbar.offsetWidth-spanprogress_op.offsetWidth/2;

			spanprogress_op.style.left=l+'px';
			spanplaybar.style.width=l+'px';
		}

		playerbar.onclick=function(ev){
			audio.currentTime = ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;	
		}
		
		spanprogress_op.onclick=function(ev){
			ev.stopPropagation();
		}
		spanprogress_op.onmouseover=function(ev){
			ev.stopPropagation();
		}



		// 公共函数
		var tips = document.querySelector('.time_show');
		var time;
		var zhuanhuan=function(time){

			var minutes=parseInt(time/60);
			var second=parseInt(time-minutes*60);
			
			if(minutes<10&&second<10){
				return '0'+minutes+':'+'0'+second;
			}
			if(minutes<10&&second>=10){
				return '0'+minutes+':'+second;
			}
			if(minutes>=10&&second<10){
				return minutes+':'+'0'+second;
			}
			if(minutes>=10&&second>=10){
				return minutes+':'+second;
			}
		}
		playerbar.onmouseover=function(ev){
			tips.style.display="block";
			tips.style.left=ev.offsetX-tips.offsetWidth/2+'px';
			time_show.innerHTML=zhuanhuan(time);
		}
		playerbar.onmousemove=function(ev){
			tips.style.left=ev.offsetX-tips.offsetWidth/2+'px';
			var time=ev.offsetX/this.offsetWidth*audio.duration;
			time_show.innerHTML=zhuanhuan(time);

		}
		playerbar.onmouseout=function(){
			tips.style.display="none";
		}
		




	    var divsonglist=document.querySelector('#divsonglist');
	    var yinyueku=[
	    {name:'我们不该这样的',src:'001.mp3',geshou:'张赫宣',duration:'03:46'},
	    {name:'爱你的宿命',src:'002.mp3',geshou:'the One',duration:'05:44'},
	    {name:'爱',src:'003.mp3',geshou:'A-lin',duration:'04:13'},
	    {name:'001',src:'001.mp3',geshou:'1',duration:'03:46'},
	    {name:'002',src:'002.mp3',geshou:'2',duration:'05:44'},
	    {name:'003',src:'003.mp3',geshou:'3',duration:'04:13'},
	    ];
    	
    	var currentsongindex;
    	var LIEBIAO = 3,SHUNXU = 2,SUIJI = 4,DANQU = 1;
    	var currentbofangmoshi=LIEBIAO;

	var createList = function(){
        var el='';
        for(var i=0;i < yinyueku.length;i++){
        	var ac=(i == currentsongindex)?'play_current':'';
            el += '<li mid="j'+i+'" class="'+ac+'"> <strong class="music_name" title="'+yinyueku[i].name+
            '">'+yinyueku[i].name+'</strong> <strong class="singer_name">'+yinyueku[i].geshou+
            '</strong> <strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span> 我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
        	}
        divsonglist.firstElementChild.innerHTML = el;
    	
    	spansongnum1.innerHTML = '<span>' +yinyueku.length +'</span>';//红框字

    	var lis = divsonglist.firstElementChild.children;
	    for(var i = 0;i<lis.length;i++){
	        lis[i].index=i;
	        lis[i].onclick=function(){
	            audio.src = yinyueku[this.index].src;
	            currentsongindex=this.index;
	            audio.play();
	            onsongchange();
	        }
	    //歌曲滑上效果开始    
	        lis[i].onmouseover=function(){
	            this.classList.add('play_hover')
	        }
	        lis[i].onmouseout=function(){
	            this.classList.remove('play_hover')
	        } 
	    }

    	//删除
    	var dels = document.querySelectorAll('.btn_del');
    	    for(var i = 0;i < dels.length;i++){
    	        dels[i].index=i;
    	        dels[i].onclick = function(e){
    	          e.stopPropagation();          
    	          var newarr=[];
    	          for(var i=0;i<yinyueku.length;i++){
    	            if(yinyueku[this.index]!=yinyueku[i]){
    	             newarr.push(yinyueku[i]);
    	         	}
    	    	  }
    		     yinyueku=newarr;

    		     if(this.index == currentsongindex){
    		        if(currentsongindex == yinyueku.length){//如果是最后一首歌，不播放
    		            audio.src='';
    		            uireset();//默认样式
    		        }else{
    		           audio.src=yinyueku[currentsongindex].src;
    		            audio.play();
    		            onsongchange();
    		        }
    		    }	    
    		    if(this.index<currentsongindex){currentsongindex -= 1};

    	    	createList();    	         	
    	    }

    	}
     }
	 createList();	
    	
	    
//清空列表
	clear_list.onclick = function(){
    yinyueku=[];
    createList();
    uireset();
}
var uireset=function(){
    document.querySelector('.music_name').innerHTML = '<span>听我想听的歌</span>';
    document.querySelector('.singer_name').innerHTML = '<span>QQ音乐</span>';
    ptime.innerHTML = '';
    document.querySelector('.music_op').style.display="none";
    audio.src='';
    spanprogress_op.style.left='0';
    spanplaybar.style.width='0';
}   

//循环模式
var btnPlayway=document.querySelector('#btnPlayway');
var divselect=document.querySelector('#divselect');
btnPlayway.onclick=function(){
    divselect.style.display="block";
}
setbofangmoshi=function(num){
    divselect.style.display="none";
    currentbofangmoshi=num;
    var data={
        1:'cycle_single_bt',
        2:'ordered_bt',
        3:'cycle_bt',
        4:'unordered_bt',
        6:'单曲播放',
        7:'顺序播放',
        8:'列表播放',
        9:'随机播放'
    }
    btnPlayway.className=data[num];
    btnPlayway.title=data[num+5]
}         

//切歌
	var nextSong = function(){
        if(currentsongindex == undefined) return;
        currentsongindex += 1;
        currentsongindex = (currentsongindex==yinyueku.length)?0:currentsongindex;
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange()
    }
    var prevSong = function(){
        if(currentsongindex == undefined) return;
        currentsongindex -= 1;
        currentsongindex = (currentsongindex== -1)?yinyueku.length-1:currentsongindex;
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange();
    }
    document.querySelector('.next_bt').onclick=nextSong;
    document.querySelector('.prev_bt').onclick=prevSong;
    

    var onsongchange=function(){
    	var lis = divsonglist.firstElementChild.children;
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('play_current')
        }
            lis[currentsongindex].classList.add('play_current')
            var lv =yinyueku[currentsongindex];
            document.querySelector('.music_name').innerHTML=lv.name;
            document.querySelector('.singer_name').innerHTML=lv.geshou;
            document.querySelector('.music_op').style.display='block';
            document.querySelector('#ptime').innerHTML=lv.duration;
     }








	}
},false)