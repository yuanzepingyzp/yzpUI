/*公共方法*/
var publicMath={
  isOnelement:function(event,x,y,width,height){
    var eventCoord=publicMath.fixCompatibility(event);
    if(eventCoord[0]>x&&eventCoord[0]<x+width&&eventCoord[1]>y&&eventCoord[1]<eventCoord[1]+height){
      return true;
    }else{
      return false;
    }
  },
  fixCompatibility:function(event){
    if(event.offsetX){
      return [event.offsetX,event.offsetY];
    }else{
      return [event.layerX,event.layerY];
    }
  }
}


var yzpUI=angular.module("app",[])
/*
  yzpButton组件;
  接口
    content:String定义按钮内文字;
    yzp-style:String定义按钮样式;
*/
.directive("yzpButton",function(){
  return{
    scope:{
      content:'@',
      yzpStyle:'@'
    },
    restrict:'E',
    transclude:true,
    template:'<span><button class="yzpButton {{yzpStyle}}" ng-click="isShow=!isShow">{{content}}</button><ng-transclude ng-show="isShow"></ng-transclude></span>',
    replace:true
  }
})
/*
  yzpInput组件;
  接口
    placeholder:String定义input placeholder;
    yzp-style:String定义输入框样式;
*/
.directive("yzpInput",function(){
  return{
    scope:{
      placeholder:'@',
      yzpStyle:'@',
      yzpValue:'='
    },
    restrict:'E',
    template:'<div class="inputWrap"><input class="yzpInput {{yzpStyle}}" placeholder={{placeholder}} type={{type}} ng-model="yzpValue"></input><i class="icon-remove" ng-click="clear()"></i><ng-transclude ng-if="yzpValue"></ng-transclude></div>',
    replace:true,
    transclude:true,
    link:function(scope){
      scope.clear=function(){
        scope.yzpValue="";
      }
    }
  }
})
.directive("yzpDatalist",function(){
  return{
    scope:{
      list:'='
    },
    replace:true,
    template:'<ul class="yzpDatalist"><li ng-repeat="data in list">{{data}}</li></ul>'
  }
})
/*
  yzpNumber组件;
  接口
    yzpValue:String定义input placeholder;
    max:String定义输入框样式;
    min:定义下限;
    yzpStyle:定义样式
*/
.directive("yzpNumber",function(){
  return{
    scope:{
      yzpValue:'=',
      max:'@',
      min:'@',
      yzpStyle:'@'
    },
    template:'<div class="yzpNumber"><button ng-click=subtract() class="{{yzpStyle}}"><i class="icon-minus-sign"></i></button><input ng-model="yzpValue" class="{{yzpStyle}}"></input><button ng-click=plus() yzp-longpress=plus() class="{{yzpStyle}}"><i class="icon-plus-sign"></i></button><span ng-show=isError>{{tips}}<i class=" icon-exclamation-sign"></i></span></div>',
    replace:true,
    link:function(scope){
      scope.subtract=function(){
          scope.yzpValue--;
      }
      scope.plus=function(){
          scope.yzpValue++;
      }
      scope.$watch("yzpValue",function(){
        if(scope.yzpValue/1<=scope.min){
          scope.tips="已经是最小值";
          scope.isError=true;
          scope.yzpValue=scope.min;
        }else if(scope.yzpValue/1>=scope.max){
          scope.tips="已经是最大值";
          scope.isError=true;
          scope.yzpValue=scope.max;
        }else if(isNaN(scope.yzpValue/1)){
          scope.tips="请输入数字";
          scope.isError=true;
        }else{
          scope.tips="";
          scope.isError=false;
        }
      })
    }
  }
})
/*
  yzpCheckbox组件;
  接口
    checked:Boolean定义组件状态;
    type:String定义组件类型
    yzp-style:String定义按钮样式;
*/
.directive("yzpCheckbox",function(){
  return{
    scope:{
      checked:'=',
      type:'@',
      yzpStyle:'@'
    },
    restrict:'E',
    template:'<button class="yzp{{type}} {{yzpStyle}}" ng-click="toggleCheck()"><i ng-class="iconClass"></i></button>',
    replace:true,
    link:function(scope){
      var icon=(scope.type=="Checkbox")?('icon-check icon-2x'):('icon-ok-sign icon-2x');
      var iconempty=(scope.type=="Checkbox")?('icon-check-empty icon-2x'):('icon-circle-blank icon-2x')
      scope.$watch("checked",function(){
        if(scope.checked){
          scope.iconClass=icon;
        }else{
          scope.iconClass=iconempty;
        }
      });
      scope.toggleCheck=function(){
        scope.checked=!scope.checked;
      }
    }
  }
})
/*
  yzpRadio组件(单选);
  接口
    label:String定义单选信息；
    radioList:Array定义单选项目数组
    checkedIndex:Number定义单选项目的下标;
    yzp-style:String定义按钮样式;
*/
.directive("yzpRadio",function(){
  return{
    scope:{
      label:'@',
      radioList:'=',
      checkedIndex:'@',
      yzpStyle:'@'
    },
    replace:true,
    restrict:'E',
    template:'<div class="yzpRadiobuttons"><h4>{{label}}</h4><span ng-repeat="item in radioList"><label>{{item}}</label><yzp-checkbox type="Radio" yzp-style={{yzpStyle}} checked="status[$index]" ng-click="toggleRadio($index)"></yzp-checkbox></span></div>',
    link:function(scope){
      scope.status=[];
      for(var i=0;i<scope.radioList.length;i++){
        scope.status.push(0);
        scope.status[scope.checkedIndex]=1;
      }
      scope.toggleRadio=function($index){
        scope.status=[];
        for(var i=0;i<scope.radioList.length;i++){
          scope.status.push(0);
          scope.status[$index]=1;
        }
      }
    }
  }
})
/*
  yzpCheckbutton组件(多选);
  接口
    label:String定义单选信息；
    checkbuttonList:Array定义多选项目数组
    checkedIndex:Array定义被选中项目的下标;
    yzp-style:String定义按钮样式;
*/
.directive("yzpCheckbutton",function(){
  return{
    scope:{
      label:'@',
      checkbuttonList:'=',
      checkedIndex:'=',
      yzpStyle:'@',
    },
    restrict:'E',
    replace:true,
    template:'<div class="yzpCheckbuttons"><h4>{{label}}</h4><span ng-repeat="item in checkbuttonList"><lable>{{item}}</label><yzp-checkbox type="Checkbox" yzp-style={{yzpStyle}} checked="status[$index]"></yzp-checkbox></span></div>',
    link:function(scope){
      scope.status=[];
      for(var i=0;i<scope.checkbuttonList.length;i++){
        scope.status.push(0);
      }
      for(var j=0;j<scope.checkedIndex.length;j++){
        scope.status[scope.checkedIndex[j]]=1;
      }
    }
  }
})
/*
  yzpSelect组件;
  接口
    selectList:Array定义选中框的选项；
    yzp-model:String绑定选中的值;
    placeholder:String定义选中框的placeholder;
    yzp-style:String定义按钮样式;
*/
.directive("yzpSelect",function(){
	return{
		scope:{
			selectList:'=',
			yzpModel:'=',
			placeholder:'@',
      yzpStyle:'@'
		},
		restrict:'E',
    replace:'true',
		template:'<div class="yzpSelect"><div style="position:relative;height:100%;"><i class="icon-caret-down icon-large"></i><input class="yzpInput {{yzpStyle}}" ng-click=toggleSelect() ng-model="yzpModel" placeholder={{placeholder}} readOnly></input><div><select-ul ng-if="isShow" ng-init="isShow=false"></select-ul></div>',
		link:function(scope){
      scope.$watch("selectList",function(){
        scope.selectList.unshift(scope.placeholder);
      });
			scope.toggleSelect=function(){
				scope.isShow=!scope.isShow;
			};
		}
	}
})
.directive("selectUl",function(){
	return{
		restrict:'E',
		replace:'true',
		template:'<ul ng-mouseleave=toggleSelect()><li ng-repeat="item in selectList" ng-click="selected(item)">{{item}}</li></ul>',
		link:function(scope){
			scope.selected=function(item){
				scope.$parent.yzpModel=item;
				scope.toggleSelect();
			}
		}
	}
})
/*
  yzpDropmenu组件;
  接口
    content:String定义按钮内容;
    dropmenuList:Array定义菜单列表;
    yzp-actions:Array定义列表点击事件;
    yzp-style:String定义按钮样式;
*/
.directive('yzpDropmenu',function(){
	return{
		scope:{
			content:'@',
			dropmenuList:'=',
      yzpActions:'=',
      yzpStyle:'@'
		},
		template:'<span class="yzpDropmenu"><button ng-click="toggleList()" class="yzpButton {{yzpStyle}}">{{content}}</button><drop-list></drop-list></span>',
    replace:true,
		link:function(scope){
			scope.toggleList=function(){
				scope.isShow=!scope.isShow;
			}
		}

	}
})
.directive('dropList',function(){
	return{
    replace:true,
		template:'<ul ng-if="isShow" ng-mouseleave="toggleList()"><li ng-repeat="x in dropmenuList" ng-click=action($index)>{{x}}</li></ul>',
    link:function(scope){
      scope.action=function(index){
          eval(scope.yzpActions[index]);
      }
    }
	}
})
/*
  yzpDatepicker组件;
  接口
    month:Number定义月份;
    year:Number定义年份;
    day:Number定义日期;
    placeholder:String定义时间控件的placeholder；
    yzp-style:String定义按钮样式;
*/
.directive("yzpDatepicker",function(){
	return{
		scope:{
			month:'@',
			year:'@',
			day:'@',
			placeholder:'@',
      yzpStyle:'@'
		},
		restrict:'E',
    replace:true,
		template:'<div class="yzpDatepickerwrap"><div style="position:relative;height:100%;"><i class="icon-calendar"></i><input type="text" ng-click=isFocus() ng-model="time" placeholder={{placeholder}} readOnly class="yzpInput {{yzpStyle}}"></div><date-picker ng-if="isShow" ng-mouseleave=isBlur()></date-picker></div>',
		link:function(scope){
			scope.isFocus=function(){
				scope.isShow=!scope.isShow;
			}
			scope.isBlur=function(){
				scope.isShow=false;
			}
		}
	}
})
.directive("datePicker",function(){
	return{
		restrict:'E',
    replace:true,
		template:'<div class="yzpDatepicker"><picker-head></picker-head><picker-body></picker-body></div>'
	}
})
.directive("pickerHead",function(){
	return{
		restrict:'E',
    replace:true,
		template:'<div class="pickerHead"><h3>请选择日期</h3><button ng-click=prevYear()><<</button><button ng-click=prevMonth()><</button> <span ng-bind="year" readOnly></span><span>年</span><span ng-bind="month" readOnly></span><span>月</span> <button ng-click=nextMonth()>></button><button ng-click=nextYear()>>></button></div>',
		replace:'true',
		link:function(scope){
			scope.prevYear=function(){
					scope.year--;
			}
			scope.nextYear=function(){
				scope.year++;
			}
			scope.prevMonth=function(){
				if(scope.month>1){
					scope.month--;
				}else{
					scope.month=12;
				}
			}
			scope.nextMonth=function(){
				if(scope.month<12){
					scope.month++;
				}else{
					scope.month=1;
				}

			}
		}
	}
})
.directive("pickerBody",function($filter){
	return{
		restrict:'E',
    replace:true,
		template:'<div class="pickerBody"><button ng-repeat="day in days" ng-click=setDay(day)>{{day}}</button></div>',
		link:function(scope){
			scope.setDay=function(day){
				scope.day=day;
				scope.$parent.time=scope.year+'年'+scope.month+'月'+scope.day+'日';
			}
			scope.days=[];
			scope.$watch('month',function(){
				scope.days=$filter('detectmonth')(scope.month,scope.year);
			});
			scope.$watch('year',function(){
				scope.days=$filter('detectmonth')(scope.month,scope.year);
			});
		}
	}
})
.filter("detectmonth",function(){
	return function(month,year){
		var smallMonth=[1,4,6,9,11];
		var x=month/1;
		var output=[];
		if(smallMonth.indexOf(x)>=0){
			for(var i=1;i<=30;i++){
				output.push(i);
			}
		}else if(x===2){
			if((year%4===0&&year%100!==0)||(year%400===0)){
				for(var i=1;i<=29;i++){
				output.push(i);
				}
			}else{
				for(var i=1;i<=28;i++){
				output.push(i);
				}
			}

		}else{
			for(var i=1;i<=31;i++){
				output.push(i);
			}
		}
	return output;
	}
})
/*
  yzpDragbox组件;
  接口
    yzpTitle:String定义拖动框title;
    yzpSrc:String定义iframe地址;
    x:Number定义拖动框x坐标;
    y:Number定义拖动框y坐标；
    width:Number定义拖动框宽度;
    height:Number定义拖动框高度;
    isShow:Boolean定义状态;
*/
.directive("yzpDragbox",function(){
	return{
		scope:{
			yzpTitle:'@',
			yzpSrc:'@',
			x:'@',
			y:'@',
			isShow:'=',
			width:'@',
			height:'@'
		},
		restrict:'E',
    replace:true,
		template:'<div ng-show="isShow" class="masking"><section class="yzpDragbox" style="width:{{width}};height:{{height}};{{position}}"><header yzp-drag=move() class="metaphor">{{yzpTitle}} <span ng-click="hide();">X</span></header><iframe ng-src={{yzpSrc}} scrolling="no"></iframe></section></div>',
		link:function(scope,$elm){
      scope.hide=function($event){
              scope.isShow=false;
      }
			scope.move=function(){
        var eventCoord=publicMath.fixCompatibility(scope.yzpDrag.mousedownEvent);
				scope.x=scope.yzpDrag.mousemoveEvent.clientX-eventCoord[0];
				scope.y=scope.yzpDrag.mousemoveEvent.clientY-eventCoord[1];
				if(scope.x<0){
					scope.x=0;
				}
				if(scope.y<0){
					scope.y=0;
				}
			};
			scope.$watch("x",function(){
				scope.position="top:"+scope.y+"px;left:"+scope.x+"px;";
			});
			scope.$watch("y",function(){
				scope.position="top:"+scope.y+"px;left:"+scope.x+"px;";
			});
		}
	}
})
.directive("yzpDrag",function(){
	return{
		restrict:'A',
		link:function($scope,$elm,$attrs){
			$scope.yzpDrag={};
			$elm.bind("mousedown",function(event){
				$scope.yzpDrag.onDrag=true;
				$scope.yzpDrag.mousedownEvent=event;
			});
			$elm.bind("mousemove",function(event){
				if($scope.yzpDrag.onDrag){
					$scope.yzpDrag.mousemoveEvent=event;
					$scope.$apply(function(){
						$scope.$eval($attrs.yzpDrag);
					})
				}
			});
			$elm.bind("mouseup",function(event){
        $scope.yzpDrag.mouseupEvent=event;
				$scope.yzpDrag.onDrag=false;
			})
		}
	}
})
/*
  yzpPageturn组件;
  接口
    pageNum:Number定义当前页码;
    pageMaxnum:Number定义最大页码;
    showNum:Number定义要显示的页码数;
    yzpStyle：String定义组件样式；
*/
.directive("yzpPageturn",function($filter){
  return{
    scope:{
      pageNum:'=',
      pageMaxnum:'=',
      showNum:'=',
      yzpStyle:'@'
    },
    restrict:'E',
    replace:true,
    template:'<div class="yzpPageturn"><button class="{{yzpStyle}}" ng-click="turnTofirst()"><<</button><button ng-click="prev()" class="{{yzpStyle}}"><</button><ul><li><button class="{{yzpStyle}}" style="background:#82878f;border:1px solid #82878f;color:white;">{{pageNum+x}}</button></li><li ng-repeat="x in showNumlist" ng-click="setFirst(x)"><button class="{{yzpStyle}}">{{pageNum+x}}</button></li><ul><button ng-click="next()" class="{{yzpStyle}}">></button><button class="{{yzpStyle}}" ng-click="turnTolast()">>></button></div>',
    link:function(scope){
      scope.$watch("pageNum",function(){
        var showNum=$filter('getshownum')(scope.pageNum,scope.pageMaxnum,scope.showNum);
        scope.showNumlist=[];
        for(var i=1;i<showNum;i++){
          scope.showNumlist.push(i);
        }
      })
      scope.next=function(){
        if(scope.pageNum<scope.pageMaxnum){
          scope.pageNum++;
        }
      }
      scope.prev=function(){
        if(scope.pageNum>1)
          scope.pageNum--;
      }
      scope.setFirst=function(x){
          scope.pageNum=scope.pageNum+x;
      }
      scope.turnTofirst=function(){
          scope.pageNum=1;
      }
      scope.turnTolast=function(){
          scope.pageNum=scope.pageMaxnum;
      }
    }
  }
})
.filter("getshownum",function(){
  return function(pageNum,pageMaxnum,showNum){
    if(pageNum+showNum-1>pageMaxnum){
      return pageMaxnum-pageNum+1;
    }
    return showNum;
  }
})
/*
  yzpAlert组件;
  接口
    alertInfor:String定义提示信息;
    result:Boolean 定义用户交互结果;
*/
.directive("yzpAlert",function(){
  return{
    scope:{
      alertInfor:'@',
      result:'='
    },
    replace:true,
    template:'<div ng-if="isShow" class="masking"><alert-box></alert-box></div>',
    link:function(scope,elm){
      scope.isShow=true;
    }
  }
})
.directive("alertBox",function(){
  return{
    template:'<div class="yzpAlert"><h2>{{alertInfor}}</h2><button class="yzpButton small bigRadius yzpCancel" ng-click="cancel()">取消</button><button class="yzpButton small bigRadius yzpConfirm" ng-click="confirm()">确定</button></div>',
    replace:true,
    transclude:true,
    link:function(scope){
      scope.alertInfor=scope.$parent.alertInfor;
      scope.confirm=function(){
        scope.$parent.result=true;
        scope.$parent.isShow=false;
      }
      scope.cancel=function(){
        scope.$parent.result=false;
        scope.$parent.isShow=false;
      }
    }
  }
})
/*
  yzpLoad组件;
  接口
    speed:Nuber定义加载动画速度;
    yzpId:String定义canvasID;
*/
.directive("yzpLoad",function($timeout){
	return{
		scope:{
			speed:'@',
			yzpId:'@'
		},
		restrict:'E',
		template:'<div class="masking"><canvas id={{yzpId}} style="position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;"></canvas></div>',
		replace:true,
		link:function(scope){
			$timeout(function(){new yzpLoading(scope.yzpId,scope.speed);},100);
      function yzpLoading(id,speed){
      	var canvas,context;

      	this.width=100;
      	this.height=100;
      	this.color="rgb(100,200,200)";
      	this.id=id;
      	this.angle=0;
      	this.r=this.width/3;
      	this.speed=speed;
      	this.clear=function(){
      		context.beginPath();
      		context.clearRect(this.width/2-this.r-5,this.height/2-this.r-5,2*this.r+10,2*this.r+10)
      	}
      	this.render=function(){
      		context.beginPath();
      		context.arc(this.width/2,this.height/2,this.r,0,this.angle);
      		context.lineWidth=5;
      		context.strokeStyle=this.color;
      		context.stroke();
      		context.beginPath();
      		context.font="bold 14px 微软雅黑";
      		context.fillStyle='white';
      		context.fillText("加载中",this.width/2-20,this.height/2+5);
      	};
      	this.loading=function(){
      		this.clear();
      		var This=this;
      		if(this.angle<2*Math.PI){
      			this.angle=this.angle+Math.PI/180*this.speed;
      		}else{
      			this.angle=0;
      		}

      		this.render();
      		loadAnimation=window.requestAnimationFrame(function(){This.loading()});
      	};
      	this.init=(function(This){
      		canvas=document.getElementById(This.id);
      		context=canvas.getContext("2d");
      		canvas.width=This.width;
      		canvas.height=This.height;
      		canvas.style.backgroundColor="rgb(100,100,100)";
      		canvas.style.borderRadius="5px";
      		This.loading();
      	})(this);
      }

		}
	}
})

/*
  yzpRange组件;
  接口
    startRange:Number定义范围下限;
    endRange:Number定义范围上限;
    yzpValue:Numer定义选定值;
    length:Number定义选择条长度;
*/
.directive("yzpRange",function($timeout,$interval){
	return{
		scope:{
      startRange:'@',
      endRange:'@',
      yzpValue:'=',
      yzpId:'@',
			length:'@',
      width:'@',
      precision:'@'
		},
		template:'<div style="height:{{width}}px"  class="yzpRange"><canvas id="{{yzpId}}" height={{width}} width={{length}} style="float:left;"></canvas><span style="height:{{width}}px;line-height:{{width}}px;">{{yzpValue}}</span></div>',
		replace:true,
		link:function(scope){
      var yzpRangecanvas;
      var colorBarlength=scope.yzpValue/(scope.endRange-scope.startRange)*scope.length;
			$timeout(function(){
        yzpRangecanvas=new yzpcanvasRange(scope.yzpId,30,colorBarlength);
      },0);
      $interval(function(){
        scope.yzpValue=(yzpRangecanvas.length/scope.length*(scope.endRange-scope.startRange)).toFixed(scope.precision);
      },100);
      /*拖动条类(构造函数)*/
        function yzpcanvasRange(id,height,length){
          var canvas=document.getElementById(id);
          var context=canvas.getContext("2d");

          this.id=id;
          this.height=height;
          this.length=length;
          this.color="rgb(100,200,200)";
          this.isDrag=false;
          this.moveSpeed=5;
          this.render=function(){
            context.beginPath();
            context.moveTo(0,this.height/2);
            context.lineTo(this.length,this.height/2);
            context.lineWidth=this.height;
            context.strokeStyle=this.color;
            context.stroke();
            context.beginPath();
            context.arc(this.length-this.height/2,this.height/2,this.height/3,0,2*Math.PI);
            context.strokeStyle="white";
            context.lineWidth=5;
            context.stroke();
          };
          this.drag=function(event){
            context.beginPath();
            context.clearRect(0,0,this.length,this.height);
            this.length=event.layerX;
            this.render();
          };
          this.moveTo=function(){
            var This=this;
            context.beginPath();
            context.clearRect(0,0,this.length+1,this.height+1);
            this.length=this.length+(this.targetX-this.length)/this.moveSpeed;
            this.render();
            if(this.length!=this.targetX){
              moveAnimation=window.requestAnimationFrame(function(){
                This.moveTo();
              });
            }
          };
          this.eventListener=function(){
            var This=this;
            canvas.addEventListener("mousedown",function(event){
              This.isDrag=true;
            });
            canvas.addEventListener("mousemove",function(event){
              window.cancelAnimationFrame(window.moveAnimation);
              if(This.isDrag){
                This.drag(event);
              }
            });
            canvas.addEventListener("mouseup",function(event){
              This.targetX=event.layerX;
              This.moveTo(event);
              This.isDrag=false;
            });
            canvas.addEventListener("mouseleave",function(){
              This.isDrag=false;
            })
          };
          this.init=(function(This){
            This.render();
            This.eventListener();
          })(this)
        }
		}
	}
})
/*
  yzpFile组件;
  接口
    label:String组件label;
*/
.directive("yzpFile",function(){
  return{
    scope:{
      label:'@'
    },
    replace:true,
    template:'<div class="yzpFile"><label>{{label}}</label><span><input type="file"></input><i class=" icon-upload-alt icon-large" ></i></span></div>'
  }
})
/*
  yzpColorpicker组件;
  接口
    label:String组件label;
    yzpValue:String定义选定颜色;
*/
.directive("yzpColorpicker",function(){
  return{
    scope:{
      label:'@',
      yzpValue:'@'
    },
    replace:true,
    template:'<div class="yzpColorpicker"><label>{{label}}</label><button ng-click=showColorbox()>{{yzpValue}}&nbsp;<i class="icon-th-large icon-large" style="color:{{yzpValue}}"></i></button><yzp-colorbox yzp-id="canvas" yzp-value="yzpValue" is-show=isShow></yzp-colorbox></div>',
    link:function(scope){
      scope.showColorbox=function(){
        scope.isShow=true;
      }
    }
  }
})
.directive("yzpColorbox",function($timeout,$filter){
  return{
    scope:{
      yzpValue:'=',
      yzpId:'@',
      isShow:'='
    },
    replace:true,
    template:'<div class="masking"  ng-show="isShow"><div class="yzpColorbox" ng-click="detectValue()"><canvas id="{{yzpId}}" width=600 height=500></canvas><br><label>R:</label><input ng-model=R type="number"><label>G:</label><input ng-model=G type="number"></input><label>B:</label><input ng-model=B type="number"></input><label>HEX:</label><input ng-model=yzpValue|getHEX:R:G:B></input><i style="float:left;margin-top:20px;color:rgb(100,200,200);font-weight:900;font-size:20px;">yzpUI</i><button ng-click="notShow()"><i class="icon-ok icon-large"></i></button></div><div>',
    link:function(scope){
      scope.notShow=function(){
        scope.isShow=false;
      }
      var colorBox;
      scope.$watch("yzpValue",function(){
        colorBox=null;
        scope.yzpValue=$filter("toRgb")(scope.yzpValue);
        scope.R=scope.yzpValue.match(/\d+/g)[0]/1;
        scope.G=scope.yzpValue.match(/\d+/g)[1]/1;
        scope.B=scope.yzpValue.match(/\d+/g)[2]/1;
        colorBox=new yzpChromatic(500,scope.yzpId,scope.yzpValue);
      })
      scope.detectValue=function(){
        scope.yzpValue=colorBox.colorBar.selectedColor.color;
      }
      scope.$watch("R",function(){
        scope.yzpValue="rgb("+(scope.R||0)+","+(scope.G||0)+","+(scope.B||0)+")";

      });
      scope.$watch("G",function(){
        scope.yzpValue="rgb("+(scope.R||0)+","+(scope.G||0)+","+(scope.B||0)+")";
      })
      scope.$watch("B",function(){
        scope.yzpValue="rgb("+(scope.R||0)+","+(scope.G||0)+","+(scope.B||0)+")";
      })

      function yzpChromatic(r,id,value){
        var colorSquare,colorBar,selectedColor;
        this.value=value;
        this.init=(function(This){
          This.colorBar=new colorBox(r,id,This.value);
        })(this);
        function colorBox(r,id,value){
          this.value=value;
          this.render=function(){
            colorSquare=new colorSquare(r,id);
            this.colorSquare=colorSquare;
            colorBar=new colorBar(canvas,this.value);
            this.colorBar=colorBar;
            selectedColor=new selectedColor(canvas,this.value);
            this.selectedColor=selectedColor;
          }
          this.init=(function(This){
            This.render();
          })(this)
        }
        function colorSquare(r,id){
          var canvas=document.getElementById(id);
          var context=canvas.getContext("2d");
          this.width=r;
          this.height=r;
          this.x=0;
          this.y=0;
          this.eventListener=function(){
            var This=this;
            canvas.addEventListener("mousemove",function(event) {
              if(publicMath.isOnelement(event,This.x,This.y,This.width,This.height)){
                canvas.style.cursor="crosshair";
              }else{
                canvas.style.cursor="auto";
              }
            });
            canvas.addEventListener("click",function(event){
              var eventCoord=publicMath.fixCompatibility(event);
              var x=eventCoord[0];
              var y=eventCoord[1];
              var colorData=context.getImageData(x,y,1,1).data;
              if(publicMath.isOnelement(event,This.x,This.y,This.width,This.height)){
                This.value="rgb("+colorData[0]+","+colorData[1]+","+colorData[2]+")";
                selectedColor.changeColor(This.value);
                colorBar.changeTone(This.value);
              }
            })
          };
          this.render=function(){
            context.beginPath();
            context.rect(this.x,this.y,this.width,this.height);
            var gradient=context.createLinearGradient(0,0,500,500);
            gradient.addColorStop(0,"rgb(255,100,100)");
            gradient.addColorStop(0.4,"rgb(100,100,255)");
            gradient.addColorStop(0.8,"rgb(100,255,100)");
            gradient.addColorStop(1,"rgb(255,100,100)");
            context.fillStyle=gradient;
            context.fill();
          }
          this.init=(function(This){
            This.render();
            This.eventListener();
          })(this);
        }

        function colorBar(canvas,value){
          var context=canvas.getContext("2d");
          this.width=50;
          this.height=450
          this.x=510;
          this.y=0;
          this.tone=value;
          this.render=function(){
            context.beginPath();
            context.rect(this.x,this.y,this.width,this.height);
            var gradient=context.createLinearGradient(this.x,this.y,this.x,this.y+this.height);
            gradient.addColorStop(0,"rgb(0,0,0)");
            gradient.addColorStop(0.5,this.tone);
            gradient.addColorStop(1,"rgb(255,255,255)");
            context.fillStyle=gradient;
            context.fill();
          };
          this.changeTone=function(color){
            this.tone=color;
            this.render();
          };
          this.eventListener=function(){
            var This=this;
            canvas.addEventListener("click",function(event){
              if(publicMath.isOnelement(event,This.x,This.y,This.width,This.height)){
                var eventCoord=publicMath.fixCompatibility(event);
                var x=eventCoord[0];
                var y=eventCoord[1];
                var colorData=context.getImageData(x,y,1,1).data;
                This.value="rgb("+colorData[0]+","+colorData[1]+","+colorData[2]+")";
                selectedColor.changeColor(This.value);
              }
            })
          }
          this.init=(function(This){
            This.render();
            This.eventListener();
          })(this)
        }
        function selectedColor(canvas,color){
          var context=canvas.getContext("2d");
          this.width=50;
          this.height=50
          this.x=510;
          this.y=450;
          this.color=color;
          this.render=function(){
            context.beginPath();
            context.rect(this.x,this.y,this.width,this.height);
            context.fillStyle=this.color;
            context.fill();
          };
          this.changeColor=function(color){
            this.color=color;
            this.render();
          };
          this.init=(function(This){
            This.render();
          })(this);
        }
      }

    }
  }
})
.filter("toRgb",function(){
  return function(input){
    if(input.match(/#/)){
      var R=parseInt(input.substr(1,2),16);
      var G=parseInt(input.substr(3,2),16);
      var B=parseInt(input.substr(5,2),16);

      return "rgb("+R+","+G+","+B+")";
    }else{
      return input;
    }
  }
})
.filter("getHEX",function(){
  return function(input,r,g,b){
    if(input.match(/rgb/)){
      var first=r.toString(16);
      var second=g.toString(16);
      var third=b.toString(16);
      return '#'+first+second+third;
    }
  }
})
.directive("yzpBar",function($timeout){
  return{
    scope:{
      yzpId:'@',
      data:'=',
      serial:'=',
      color:'@'
    },
    template:'<canvas id="{{yzpId}}"></canvas>',
    replace:true,
    link:function(scope){
      $timeout(function(){
        new YzpBar(scope.yzpId,scope.data,scope.serial,scope.color);
      },0);
      var tool={
      	getStartlist:function(data,origin,xend){
      		var startList=[];
      		var inteval=(xend[0]-origin[0]-30)/data.length;
      		for(var i=0;i<data.length;i++){
      			var current=[];
      			current[0]=origin[0]+inteval*(i+1);
      			current[1]=origin[1];
      			startList.push(current);
      		}
      		return startList;
      	},
      	getEndlist:function(startcoord,data,k){
      		var endcoord=[];
      		endcoord[0]=startcoord[0];
      		endcoord[1]=startcoord[1]-data*k;
      		return endcoord;
      	},
      	getMax:function(data){
      		var max=data[0];
      		for(var i=0;i<data.length;i++){
      			if(data[i]>max){
      				max=data[i];
      			}else{
      				continue;
      			}
      		}
      		return max;
      	},
      	getCanvassize:function(id){
      		var canvas=document.getElementById(id);
      		var width=canvas.offsetWidth;
      		var height=canvas.offsetHeight;
      		return [width,height];
      	},
      	ismouseover:function(event,start,end,width){
      		if(Math.abs(event.clientY-(start[1]+end[1])/2)<(start[1]-end[1])&&Math.abs(event.clientX-start[0])<width){
      			return true;
      		}
      	}
      }

      function YzpBar(id,data,dataname,color){
      	var canvas=document.getElementById(id);
      	var context=canvas.getContext("2d");

      	this.data=data;
      	this.dataname=dataname;
      	this.color=color;
      	this.axis={
      		origin:[50,tool.getCanvassize(id)[1]-50],
      		yend:[50,50],
      		xend:[tool.getCanvassize(id)[0]-50,tool.getCanvassize(id)[1]-50]
      	};
      	this.k=(function(This){
      		return (This.axis.origin[1]-This.axis.yend[1])/tool.getMax(This.data);
      	})(this);
      	this.render=function(){
      		var maxData=tool.getMax(this.data);
      		new Axis(context,this.axis.origin,this.axis.xend,this.axis.yend,maxData);
      		var startList=tool.getStartlist(this.data,this.axis.origin,this.axis.xend);
      		for(var i=0;i<this.data.length;i++){
      			var endcoord=tool.getEndlist(startList[i],this.data[i],this.k);
      			new Bar(context,startList[i],endcoord,this.data[i],this.dataname[i],this.axis.origin);
      		}
      	};
      	this.init=(function(This){
      		This.render();
      	})(this);
      };
      function Bar(context,start,end,data,dataname,axisorigin){
      	var canvas=document.getElementById("canvas");

      	this.context=context;
      	this.start=start;
      	this.end=end;
      	this.data=data;
      	this.dataname=dataname;
      	this.width=30;
      	this.color="rgb(100,200,200)";
      	this.axisorigin=axisorigin;
      	this.render=function(){
      		drawMath.line(this.context,this.start,this.end,this.width,this.color);
      		drawMath.text(context,this.dataname,this.start[0]-this.width/2,this.start[1]+20,"rgb(100,200,200)");
      	};
      	this.eventListener=function(){
      		var This=this;
      		canvas.addEventListener('mousemove',function(event){
      			if(tool.ismouseover(event,This.start,This.end,This.width)){
      				This.showInfor(event);
      			}else{
      				This.hideInfor();
      			}
      		});
      	};
      	this.showInfor=function(event){
      		id=this.dataname+"inforbox";
      		if(document.getElementById(id)){
      			canvas.parentNode.removeChild(document.getElementById(id));
      		}
      		var div=document.createElement("div");
      		div.setAttribute("id",id);
      		div.innerHTML="<div style='position:absolute;width:100px;height:50px;background-color:rgba(10,10,10,0.5);text-align:center;line-height:50px;color:white;top:"+(this.start[1]+this.end[1])/2+"px;left:"+(this.start[0]+this.width)+"px;'>"+this.dataname+":"+this.data+"</div>";
      		canvas.parentNode.appendChild(div);
      	};
      	this.hideInfor=function(){
      		id=this.dataname+"inforbox";
      		if(document.getElementById(id)){
      			canvas.parentNode.removeChild(document.getElementById(id));
      		}
      	};
      	this.init=(function(This){
      		This.render();
      		This.eventListener();
      	})(this);
      };

      function Axis(context,origin,xend,yend,maxData){
      	this.maxData=maxData;
      	this.context=context;
      	this.color="rgb(200,200,200)";
      	this.width=1;
      	this.xend=xend;
      	this.origin=origin;
      	this.yend=yend;
      	this.render=function(){
      		var step=maxData/20;
      		var interval=(this.origin[1]-this.yend[1])/20;
      		drawMath.line(this.context,this.origin,this.xend,this.width,this.color);
      		drawMath.line(this.context,this.origin,this.yend,this.width,this.color);
      		for(var i=0;i<20;i++){
      			var start=[this.origin[0],this.origin[1]-i*interval];
      			var end=[this.origin[0]+10,this.origin[1]-i*interval];
      			drawMath.text(this.context,i*step,start[0]-30,start[1]);
      			drawMath.line(this.context,start,end,this.width,this.color);
      		}
      	};
      	this.init=(function(This){
      		This.render();
      	})(this);
      }
      var drawMath={
      	line:function(context,start,end,width,color){
      		context.beginPath();
      		context.moveTo(start[0],start[1]);
      		context.lineTo(end[0],end[1]);
      		context.lineWidth=width;
      		context.strokeStyle=color;
      		context.stroke();
      	},
      	text:function(context,content,x,y,color){
      		context.beginPath();
      		context.font="Regular 10px 微软雅黑";
      		context.strokeStyle=color;
      		context.lineWidth=1;
      		context.strokeText(content,x,y);
      	}
      }
    }
  }
})
