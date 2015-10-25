/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   王景亮
 * Date:     2013-12-16
 * Description: 倒计时相关
 * History: //修改记录
 * <author>		<time>			<desc>     
 */

		//倒计时
		var countDown=function(param){
			if(!param)return;
			var _obj=param.obj;
			var _speed=param.speed||1000;//倒计时速度 1秒一次
			var _wait=param.wait||40; //到计时长
			var _callback=param.callback||'';//回调
			var _txt=param.txt||'';		//文本	

			var down=function(){
				if(_wait>0){
					var t=_wait--;					
					_obj.text(t+_txt);
					
				}else{
					clearInterval(set);
					_callback.call(this,_obj);
					_wait=param.wait;
				}				
			}
			var init=function(){						
				set=window.setInterval(down,_speed);
			}
			return init();
		}