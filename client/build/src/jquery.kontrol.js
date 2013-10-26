/*!jQuery Kontrol*/

/**
 * Small extensible jQuery library of new UI controls ;
 * Dial (was jQuery Knob), XY pad, Bars.
 *
 * Version: 0.9.0 (15/07/2012)
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2012 Anthony Terrien
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to vor, eskimoblood, spiffistan, FabrizioC
 */

(function(e){var t={},n=Math.max,r=Math.min;t.c={},t.c.d=e(document),t.c.t=function(e){return e.originalEvent.touches.length-1},t.o=function(){var n=this;this.o=null,this.$=null,this.i=null,this.g=null,this.v=null,this.cv=null,this.x=0,this.y=0,this.mx=0,this.my=0,this.$c=null,this.c=null,this.t=0,this.isInit=!1,this.fgColor=null,this.pColor=null,this.sH=null,this.dH=null,this.cH=null,this.eH=null,this.rH=null,this.run=function(){var t=window.devicePixelRatio||1,r=function(e,t){var r;for(r in t)n.o[r]=t[r];n.init(),n._configure()._draw()};if(this.$.data("kontroled"))return;return this.$.data("kontroled",!0),this.extend(),this.o=e.extend({min:this.$.data("min")||0,max:this.$.data("max")||100,stopper:!0,readOnly:this.$.data("readonly"),noScroll:this.$.data("noScroll"),cursor:this.$.data("cursor")===!0&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")||.35,width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inline:!1,start:null,draw:null,change:null,cancel:null,release:null},this.o),this.$.is("fieldset")?(this.v={},this.i=this.$.find("input"),this.i.each(function(t){var r=e(this);n.i[t]=r,n.v[t]=r.val(),r.bind("change",function(){var e={};e[t]=r.val(),n.val(e)})}),this.$.find("legend").remove()):(this.i=this.$,this.v=this.$.val(),this.v==""&&(this.v=this.o.min),this.$.bind("change",function(){n.val(n.$.val())})),!this.o.displayInput&&this.$.hide(),this.$c=e('<canvas width="'+this.o.width*t+'px" height="'+this.o.height*t+'px" style="width:'+this.o.width+"px;height:"+this.o.height+'px;"></canvas>'),this.c=this.$c[0].getContext("2d"),this.$.wrap(e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+'px;"></div>')).before(this.$c),this.v instanceof Object?(this.cv={},this.copy(this.v,this.cv)):this.cv=this.v,this.$.bind("configure",r).parent().bind("configure",r),this._listen()._configure()._xy().init(),this.isInit=!0,this._draw(),this},this._draw=function(){var e=!0,t=document.createElement("canvas"),r=window.devicePixelRatio||1;t.width=n.o.width*r,t.height=n.o.height*r,n.g=t.getContext("2d"),n.clear(),n.g.scale(r,r),n.dH&&(e=n.dH()),e!==!1&&n.draw(),n.c.drawImage(t,0,0),t=null},this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY,"touch");if(t==n.cv)return;if(n.cH&&n.cH(t)===!1)return;n.change(t),n._draw()};this.t=t.c.t(e);if(this.sH&&this.sH()===!1)return;return r(e),t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");if(n.rH&&n.rH(n.cv)===!1)return;n.val(n.cv)}),this},this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY,"mouse");if(t==n.cv)return;if(n.cH&&n.cH(t)===!1)return;n.change(t),n._draw()};if(this.sH&&this.sH()===!1)return;return n.mx=e.pageX,n.my=e.pageY,r(e),t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===!1)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");if(n.rH&&n.rH(n.cv)===!1)return;n.val(n.cv)}),this},this._xy=function(){var e=this.$c.offset();return this.x=e.left,this.y=e.top,this},this._listen=function(){return this.o.readOnly?this.$.attr("readonly","readonly"):(this.$c.bind("mousedown",function(e){e.preventDefault(),n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault(),n._xy()._touch(e)}),this.listen()),this},this._configure=function(){return this.o.start&&(this.sH=this.o.start),this.o.draw&&(this.dH=this.o.draw),this.o.change&&(this.cH=this.o.change),this.o.cancel&&(this.eH=this.o.cancel),this.o.release&&(this.rH=this.o.release),this.o.displayPrevious?(this.pColor=this.h2rgba(this.o.fgColor,"0.4"),this.fgColor=this.h2rgba(this.o.fgColor,"0.6")):this.fgColor=this.o.fgColor,this},this._clear=function(){this.$c[0].width=this.$c[0].width},this.listen=function(){},this.extend=function(){},this.init=function(){},this.change=function(e){},this.val=function(e){},this.xy2val=function(e,t,n){},this.draw=function(){},this.clear=function(){this._clear()},this.h2rgba=function(e,t){var n;return e=e.substring(1,7),n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)],"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"},this.copy=function(e,t){for(var n in e)t[n]=e[n]}},t.Dial=function(){t.o.call(this),this.startAngle=null,this.xy=null,this.radius=null,this.lineWidth=null,this.cursorExt=null,this.w2=null,this.PI2=2*Math.PI,this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,flatMouse:this.$.data("flatMouse"),inline:!0},this.o)},this.val=function(e){if(null==e)return this.v;this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e,this.v=this.cv,this.$.val(this.v),this._draw()},this.xy2val=function(e,t,i){var s,o;return i==="mouse"&&this.o.flatMouse?(s=(this.my-t+(e-this.mx))/this.o.height,o=~~(s*(this.o.max-this.o.min)+parseFloat(this.v)),o=n(r(o,this.o.max),this.o.min)):(s=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset,this.angleArc!=this.PI2&&s<0&&s>-0.5?s=0:s<0&&(s+=this.PI2),o=~~(.5+s*(this.o.max-this.o.min)/this.angleArc)+this.o.min),this.o.stopper&&(o=n(r(o,this.o.max),this.o.min)),o},this.listen=function(){var t=this,i=function(e){if(t.o.noScroll)return;e.preventDefault();var n=e.originalEvent,r=n.detail||n.wheelDeltaX,i=n.detail||n.wheelDeltaY,s=parseInt(t.$.val())+(r>0||i>0?1:r<0||i<0?-1:0);if(t.cH&&t.cH(s)===!1)return;t.val(s)},s,o,u=1,a={37:-1,38:1,39:1,40:-1};this.$.bind("keydown",function(i){var f=i.keyCode;f>=96&&f<=105&&(f=i.keyCode=f-48),s=parseInt(String.fromCharCode(f));if(isNaN(s)){f!==13&&f!==8&&f!==9&&f!==189&&i.preventDefault();if(e.inArray(f,[37,38,39,40])>-1){i.preventDefault();var l=parseInt(t.$.val())+a[f]*u;t.o.stopper&&(l=n(r(l,t.o.max),t.o.min)),t.change(l),t._draw(),o=window.setTimeout(function(){u*=2},30)}}}).bind("keyup",function(e){isNaN(s)?o&&(window.clearTimeout(o),o=null,u=1,t.val(t.$.val())):t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}),this.$c.bind("mousewheel DOMMouseScroll",i),this.$.bind("mousewheel DOMMouseScroll",i)},this.init=function(){if(this.v<this.o.min||this.v>this.o.max)this.v=this.o.min;this.$.val(this.v),this.w2=this.o.width/2,this.cursorExt=this.o.cursor/100,this.xy=this.w2,this.lineWidth=this.xy*this.o.thickness,this.radius=this.xy-this.lineWidth/2,this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset),this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc),this.angleOffset=this.o.angleOffset*Math.PI/180,this.angleArc=this.o.angleArc*Math.PI/180,this.startAngle=1.5*Math.PI+this.angleOffset,this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.o.width/2+4>>0)+"px",height:(this.o.width/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.o.width/3>>0)+"px","margin-left":"-"+(this.o.width*3/4+2>>0)+"px",border:0,background:"none",font:"bold "+(this.o.width/e>>0)+"px Arial","text-align":"center",color:this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})},this.change=function(e){this.cv=e,this.$.val(e)},this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)},this.draw=function(){var e=this.g,t=this.angle(this.cv),n=this.startAngle,r=n+t,i,s,o=1;e.lineWidth=this.lineWidth,this.o.cursor&&(n=r-this.cursorExt)&&(r+=this.cursorExt),e.beginPath(),e.strokeStyle=this.o.bgColor,e.arc(this.xy,this.xy,this.radius,this.endAngle,this.startAngle,!0),e.stroke(),this.o.displayPrevious&&(s=this.startAngle+this.angle(this.v),i=this.startAngle,this.o.cursor&&(i=s-this.cursorExt)&&(s+=this.cursorExt),e.beginPath(),e.strokeStyle=this.pColor,e.arc(this.xy,this.xy,this.radius,i,s,!1),e.stroke(),o=this.cv==this.v),e.beginPath(),e.strokeStyle=o?this.o.fgColor:this.fgColor,e.arc(this.xy,this.xy,this.radius,n,r,!1),e.stroke()},this.cancel=function(){this.val(this.v)}},e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n,r.$=e(this),r.run()}).parent()},t.XY=function(){t.o.call(this),this.m=[],this.p=[],this.f=[],this.s={0:1,1:-1},this.cur2=0,this.cursor=0,this.v={},this.div=null,this.extend=function(){this.o=e.extend({min:this.$.data("min")||0,max:this.$.data("max")||100,width:this.$.data("width")||200,height:this.$.data("height")||200},this.o)},this._coord=function(){this.m={0:~~(this.cur2+(this.v[0]-this.o.min)/this.f[0]),1:~~-((this.v[1]-this.o.min)/this.f[1]+this.cur2-this.o.height)},this.copy(this.m,this.p)},this.init=function(){this.cursor=this.o.cursor||30,this.cur2=this.cursor/2,this.f[0]=(this.o.max-this.o.min)/(this.o.width-this.cursor),this.f[1]=(this.o.max-this.o.min)/(this.o.height-this.cursor),this.isInit||this._coord();if(this.o.displayInput){var t=this;this.$.css({"margin-top":"-30px",border:0,font:"11px Arial"}),this.i.each(function(){e(this).css({width:t.o.width/4+"px",border:0,background:"none",color:t.o.fgColor,padding:"0px","-webkit-appearance":"none"})})}else this.$.css({width:"0px",visibility:"hidden"})},this.xy2val=function(e,t){return this.m[0]=n(this.cur2,r(e-this.x,this.o.width-this.cur2)),this.m[1]=n(this.cur2,r(t-this.y,this.o.height-this.cur2)),{0:~~(this.o.min+(this.m[0]-this.cur2)*this.f[0]),1:~~(this.o.min+(this.o.height-this.m[1]-this.cur2)*this.f[1])}},this.change=function(e){this.cv=e,this.i[0].val(this.cv[0]),this.i[1].val(this.cv[1])},this.val=function(e){if(null===e)return this.v;this.cv=e,this.copy(this.cv,this.v),this._coord(),this._draw()},this.cancel=function(){this.copy(this.v,this.cv),this.i[0].val(this.cv[0]),this.i[1].val(this.cv[1]),this.m[0]=this.p[0],this.m[1]=this.p[1],this._draw()},this.draw=function(){var e=this.g,t=1;this.o.displayPrevious&&(e.beginPath(),e.lineWidth=this.cursor,e.strokeStyle=this.pColor,e.moveTo(this.p[0],this.p[1]+this.cur2),e.lineTo(this.p[0],this.p[1]-this.cur2),e.stroke(),t=this.cv[0]==this.v[0]&&this.cv[1]==this.v[1]),e.beginPath(),e.lineWidth=this.cursor,e.strokeStyle=t?this.o.fgColor:this.fgColor,e.moveTo(this.m[0],this.m[1]+this.cur2),e.lineTo(this.m[0],this.m[1]-this.cur2),e.stroke()}},e.fn.xy=function(n){return this.each(function(){var r=new t.XY;r.$=e(this),r.o=n,r.run()}).parent()},t.Bars=function(){t.o.call(this),this.bar=null,this.mid=null,this.col=null,this.colWidth=null,this.fontSize=null,this.displayMidLine=!1,this.extend=function(){this.o=e.extend({min:this.$.data("min")||0,max:this.$.data("max")||100,width:this.$.data("width")||600,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),height:this.$.data("height")||200,fgColor:this.$.data("fgcolor")||"#87CEEB",bgColor:this.$.data("bgcolor")||"#CCCCCC",cols:this.$.data("cols")||8,spacing:this.$.data("spacing")||1},this.o),this.o.cols==1&&(this.o.spacing=0),this.colWidth=(this.o.width-this.o.spacing*this.o.cols)/this.o.cols>>0,this.o.displayInput&&(this.fontSize=n(~~(this.colWidth/3),10),this.o.height-=this.fontSize)},this.xy2val=function(e,t){var i=this.colWidth+this.o.spacing,s=n(this.o.min,r(this.o.max,-(-this.mid+(t-this.y))/this.bar))>>0,o={};return this.col=n(0,r(this.o.cols-1,(e-this.x)/i>>0)),o[this.col]=s,o},this.init=function(){this.bar=this.o.height/(this.o.max-this.o.min),this.mid=this.o.max*this.bar>>0,this.displayMidLine=this.o.cursor&&this.o.min<0;if(this.o.displayInput){var t=this;this.$.css({margin:"0px",border:0,padding:"0px"}),this.i.each(function(){e(this).css({width:t.colWidth-4+t.o.spacing+"px",border:0,background:"none",font:t.fontSize+"px Arial",color:t.o.fgColor,margin:"0px",padding:"0px","-webkit-appearance":"none","text-align":"center"})})}else this.$.css({width:"0px",visibility:"hidden"})},this.change=function(e){for(var t in e)this.cv[t]=e[t],this.i[t].val(this.cv[t])},this.val=function(e){if(null===e)return this.v;this.copy(e,this.cv),this.copy(this.cv,this.v),this.col=null,this._draw()},this.cancel=function(){this.copy(this.v,this.cv),this.col=null,this._draw()},this._bar=function(e){var t=e*(this.colWidth+this.o.spacing)+this.colWidth/2;this.displayMidLine&&(this.g.beginPath(),this.g.lineWidth=this.colWidth,this.g.strokeStyle=this.o.fgColor,this.g.moveTo(t,this.mid),this.g.lineTo(t,this.mid+1),this.g.stroke()),this.o.displayPrevious&&(this.g.beginPath(),this.g.lineWidth=this.colWidth,this.g.strokeStyle=this.cv[e]==this.v[e]?this.o.fgColor:this.pColor,this.o.cursor?this.g.lineTo(t,this.mid-(this.v[e]*this.bar>>0)+this.o.cursor/2):this.g.moveTo(t,this.mid),this.g.lineTo(t,this.mid-(this.v[e]*this.bar>>0)-this.o.cursor/2),this.g.stroke()),this.g.beginPath(),this.g.lineWidth=this.colWidth,this.g.strokeStyle=this.fgColor,this.o.cursor?this.g.lineTo(t,this.mid-(this.cv[e]*this.bar>>0)+this.o.cursor/2):this.g.moveTo(t,this.mid),this.g.lineTo(t,this.mid-(this.cv[e]*this.bar>>0)-this.o.cursor/2),this.g.stroke()},this.clear=function(){this.col?this.c.clearRect(this.col*(this.colWidth+this.o.spacing),0,this.colWidth+this.o.spacing,this.o.height):this._clear()},this.draw=function(){if(this.col)this._bar(this.col);else for(var e=0;e<this.o.cols;e++)this._bar(e)}},e.fn.bars=function(n){return this.each(function(){var r=new t.Bars;r.$=e(this),r.o=n,r.run()}).parent()}})(jQuery);