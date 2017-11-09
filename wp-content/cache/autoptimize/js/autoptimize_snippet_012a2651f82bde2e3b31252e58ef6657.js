!function(){var t=!1;window.JQClass=function(){},JQClass.classes={},JQClass.extend=function e(i){function n(){!t&&this._init&&this._init.apply(this,arguments)}var s=this.prototype;t=!0;var o=new this;t=!1;for(var a in i)o[a]="function"==typeof i[a]&&"function"==typeof s[a]?function(t,e){return function(){var i=this._super;this._super=function(e){return s[t].apply(this,e||[])};var n=e.apply(this,arguments);return this._super=i,n}}(a,i[a]):i[a];return n.prototype=o,n.prototype.constructor=n,n.extend=e,n}}(),function($){function camelCase(t){return t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var t=camelCase(this.name);$[t]=this,$.fn[t]=function(e){var i=Array.prototype.slice.call(arguments,1);return $[t]._isNotChained(e,i)?$[t][e].apply($[t],[this[0]].concat(i)):this.each(function(){if("string"==typeof e){if("_"===e[0]||!$[t][e])throw"Unknown method: "+e;$[t][e].apply($[t],[this].concat(i))}else $[t]._attach(this,e)})}},setDefaults:function(t){$.extend(this.defaultOptions,t||{})},_isNotChained:function(t,e){return"option"===t&&(0===e.length||1===e.length&&"string"==typeof e[0])?!0:$.inArray(t,this._getters)>-1},_attach:function(t,e){if(t=$(t),!t.hasClass(this._getMarker())){t.addClass(this._getMarker()),e=$.extend({},this.defaultOptions,this._getMetadata(t),e||{});var i=$.extend({name:this.name,elem:t,options:e},this._instSettings(t,e));t.data(this.name,i),this._postAttach(t,i),this.option(t,e)}},_instSettings:function(t,e){return{}},_postAttach:function(t,e){},_getMetadata:function(elem){try{var data=elem.data(this.name.toLowerCase())||"";data=data.replace(/'/g,'"'),data=data.replace(/([a-zA-Z0-9]+):/g,function(t,e,i){var n=data.substring(0,i).match(/"/g);return n&&n.length%2!==0?e+":":'"'+e+'":'}),data=$.parseJSON("{"+data+"}");for(var name in data){var value=data[name];"string"==typeof value&&value.match(/^new Date\((.*)\)$/)&&(data[name]=eval(value))}return data}catch(e){return{}}},_getInst:function(t){return $(t).data(this.name)||{}},option:function(t,e,i){t=$(t);var n=t.data(this.name);if(!e||"string"==typeof e&&null==i){var s=(n||{}).options;return s&&e?s[e]:s}if(t.hasClass(this._getMarker())){var s=e||{};"string"==typeof e&&(s={},s[e]=i),this._optionsChanged(t,n,s),$.extend(n.options,s)}},_optionsChanged:function(t,e,i){},destroy:function(t){t=$(t),t.hasClass(this._getMarker())&&(this._preDestroy(t,this._getInst(t)),t.removeData(this.name).removeClass(this._getMarker()))},_preDestroy:function(t,e){}}),$.JQPlugin={createPlugin:function(t,e){"object"==typeof t&&(e=t,t="JQPlugin"),t=camelCase(t);var i=camelCase(e.name);JQClass.classes[i]=JQClass.classes[t].extend(e),new JQClass.classes[i]}}}(jQuery),function(t){var e="countdown",i=0,n=1,s=2,o=3,a=4,r=5,l=6;t.JQPlugin.createPlugin({name:e,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_getters:["getTimes"],_rtlClass:e+"-rtl",_sectionClass:e+"-section",_amountClass:e+"-amount",_periodClass:e+"-period",_rowClass:e+"-row",_holdingClass:e+"-holding",_showClass:e+"-show",_descrClass:e+"-descr",_timerElems:[],_init:function(){function e(t){var r=1e12>t?s?performance.now()+performance.timing.navigationStart:n():t||n();r-a>=1e3&&(i._updateElems(),a=r),o(e)}var i=this;this._super(),this._serverSyncs=[];var n="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},s=window.performance&&"function"==typeof window.performance.now,o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,a=0;!o||t.noRequestAnimationFrame?(t.noRequestAnimationFrame=null,setInterval(function(){i._updateElems()},980)):(a=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||n(),o(e))},UTCDate:function(t,e,i,n,s,o,a,r){"object"==typeof e&&e.constructor==Date&&(r=e.getMilliseconds(),a=e.getSeconds(),o=e.getMinutes(),s=e.getHours(),n=e.getDate(),i=e.getMonth(),e=e.getFullYear());var l=new Date;return l.setUTCFullYear(e),l.setUTCDate(1),l.setUTCMonth(i||0),l.setUTCDate(n||1),l.setUTCHours(s||0),l.setUTCMinutes((o||0)-(Math.abs(t)<30?60*t:t)),l.setUTCSeconds(a||0),l.setUTCMilliseconds(r||0),l},periodsToSeconds:function(t){return 31557600*t[0]+2629800*t[1]+604800*t[2]+86400*t[3]+3600*t[4]+60*t[5]+t[6]},resync:function(){var e=this;t("."+this._getMarker()).each(function(){var i=t.data(this,e.name);if(i.options.serverSync){for(var n=null,s=0;s<e._serverSyncs.length;s++)if(e._serverSyncs[s][0]==i.options.serverSync){n=e._serverSyncs[s];break}if(null==n[2]){var o=t.isFunction(i.options.serverSync)?i.options.serverSync.apply(this,[]):null;n[2]=(o?(new Date).getTime()-o.getTime():0)-n[1]}i._since&&i._since.setMilliseconds(i._since.getMilliseconds()+n[2]),i._until.setMilliseconds(i._until.getMilliseconds()+n[2])}});for(var i=0;i<e._serverSyncs.length;i++)null!=e._serverSyncs[i][2]&&(e._serverSyncs[i][1]+=e._serverSyncs[i][2],delete e._serverSyncs[i][2])},_instSettings:function(t,e){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(t){this._hasElem(t)||this._timerElems.push(t)},_hasElem:function(e){return t.inArray(e,this._timerElems)>-1},_removeElem:function(e){this._timerElems=t.map(this._timerElems,function(t){return t==e?null:t})},_updateElems:function(){for(var t=this._timerElems.length-1;t>=0;t--)this._updateCountdown(this._timerElems[t])},_optionsChanged:function(e,i,n){n.layout&&(n.layout=n.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(i.options,n);var s=i.options.timezone!=n.timezone;t.extend(i.options,n),this._adjustSettings(e,i,null!=n.until||null!=n.since||s);var o=new Date;(i._since&&i._since<o||i._until&&i._until>o)&&this._addElem(e[0]),this._updateCountdown(e,i)},_updateCountdown:function(e,i){if(e=e.jquery?e:t(e),i=i||this._getInst(e)){if(e.html(this._generateHTML(i)).toggleClass(this._rtlClass,i.options.isRTL),t.isFunction(i.options.onTick)){var n="lap"!=i._hold?i._periods:this._calculatePeriods(i,i._show,i.options.significant,new Date);(1==i.options.tickInterval||this.periodsToSeconds(n)%i.options.tickInterval==0)&&i.options.onTick.apply(e[0],[n])}var s="pause"!=i._hold&&(i._since?i._now.getTime()<i._since.getTime():i._now.getTime()>=i._until.getTime());if(s&&!i._expiring){if(i._expiring=!0,this._hasElem(e[0])||i.options.alwaysExpire){if(this._removeElem(e[0]),t.isFunction(i.options.onExpiry)&&i.options.onExpiry.apply(e[0],[]),i.options.expiryText){var o=i.options.layout;i.options.layout=i.options.expiryText,this._updateCountdown(e[0],i),i.options.layout=o}i.options.expiryUrl&&(window.location=i.options.expiryUrl)}i._expiring=!1}else"pause"==i._hold&&this._removeElem(e[0])}},_resetExtraLabels:function(t,e){for(var i in e)i.match(/[Ll]abels[02-9]|compactLabels1/)&&(t[i]=e[i]);for(var i in t)i.match(/[Ll]abels[02-9]|compactLabels1/)&&"undefined"==typeof e[i]&&(t[i]=null)},_adjustSettings:function(e,i,n){for(var s=null,o=0;o<this._serverSyncs.length;o++)if(this._serverSyncs[o][0]==i.options.serverSync){s=this._serverSyncs[o][1];break}if(null!=s)var a=i.options.serverSync?s:0,r=new Date;else{var l=t.isFunction(i.options.serverSync)?i.options.serverSync.apply(e[0],[]):null,r=new Date,a=l?r.getTime()-l.getTime():0;this._serverSyncs.push([i.options.serverSync,a])}var p=i.options.timezone;p=null==p?-r.getTimezoneOffset():p,(n||!n&&null==i._until&&null==i._since)&&(i._since=i.options.since,null!=i._since&&(i._since=this.UTCDate(p,this._determineTime(i._since,null)),i._since&&a&&i._since.setMilliseconds(i._since.getMilliseconds()+a)),i._until=this.UTCDate(p,this._determineTime(i.options.until,r)),a&&i._until.setMilliseconds(i._until.getMilliseconds()+a)),i._show=this._determineShow(i)},_preDestroy:function(t,e){this._removeElem(t[0]),t.empty()},pause:function(t){this._hold(t,"pause")},lap:function(t){this._hold(t,"lap")},resume:function(t){this._hold(t,null)},toggle:function(e){var i=t.data(e,this.name)||{};this[i._hold?"resume":"pause"](e)},toggleLap:function(e){var i=t.data(e,this.name)||{};this[i._hold?"resume":"lap"](e)},_hold:function(e,i){var n=t.data(e,this.name);if(n){if("pause"==n._hold&&!i){n._periods=n._savePeriods;var s=n._since?"-":"+";n[n._since?"_since":"_until"]=this._determineTime(s+n._periods[0]+"y"+s+n._periods[1]+"o"+s+n._periods[2]+"w"+s+n._periods[3]+"d"+s+n._periods[4]+"h"+s+n._periods[5]+"m"+s+n._periods[6]+"s"),this._addElem(e)}n._hold=i,n._savePeriods="pause"==i?n._periods:null,t.data(e,this.name,n),this._updateCountdown(e,n)}},getTimes:function(e){var i=t.data(e,this.name);return i?"pause"==i._hold?i._savePeriods:i._hold?this._calculatePeriods(i,i._show,i.options.significant,new Date):i._periods:null},_determineTime:function(t,e){var i=this,n=function(t){var e=new Date;return e.setTime(e.getTime()+1e3*t),e},s=function(t){t=t.toLowerCase();for(var e=new Date,n=e.getFullYear(),s=e.getMonth(),o=e.getDate(),a=e.getHours(),r=e.getMinutes(),l=e.getSeconds(),p=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,_=p.exec(t);_;){switch(_[2]||"s"){case"s":l+=parseInt(_[1],10);break;case"m":r+=parseInt(_[1],10);break;case"h":a+=parseInt(_[1],10);break;case"d":o+=parseInt(_[1],10);break;case"w":o+=7*parseInt(_[1],10);break;case"o":s+=parseInt(_[1],10),o=Math.min(o,i._getDaysInMonth(n,s));break;case"y":n+=parseInt(_[1],10),o=Math.min(o,i._getDaysInMonth(n,s))}_=p.exec(t)}return new Date(n,s,o,a,r,l,0)},o=null==t?e:"string"==typeof t?s(t):"number"==typeof t?n(t):t;return o&&o.setMilliseconds(0),o},_getDaysInMonth:function(t,e){return 32-new Date(t,e,32).getDate()},_normalLabels:function(t){return t},_generateHTML:function(e){var p=this;e._periods=e._hold?e._periods:this._calculatePeriods(e,e._show,e.options.significant,new Date);for(var _=!1,c=0,u=e.options.significant,h=t.extend({},e._show),d=i;l>=d;d++)_|="?"==e._show[d]&&e._periods[d]>0,h[d]="?"!=e._show[d]||_?e._show[d]:null,c+=h[d]?1:0,u-=e._periods[d]>0?1:0;for(var m=[!1,!1,!1,!1,!1,!1,!1],d=l;d>=i;d--)e._show[d]&&(e._periods[d]?m[d]=!0:(m[d]=u>0,u--));var g=e.options.compact?e.options.compactLabels:e.options.labels,f=e.options.whichLabels||this._normalLabels,w=function(t){var i=e.options["compactLabels"+f(e._periods[t])];return h[t]?p._translateDigits(e,e._periods[t])+(i?i[t]:g[t])+" ":""},y=e.options.padZeroes?2:1,v=function(t){var i=e.options["labels"+f(e._periods[t])];return!e.options.significant&&h[t]||e.options.significant&&m[t]?'<span class="'+p._sectionClass+'"><span class="'+p._amountClass+'">'+p._minDigits(e,e._periods[t],y)+'</span><span class="'+p._periodClass+'">'+(i?i[t]:g[t])+"</span></span>":""};return e.options.layout?this._buildLayout(e,h,e.options.layout,e.options.compact,e.options.significant,m):(e.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(e._hold?" "+this._holdingClass:"")+'">'+w(i)+w(n)+w(s)+w(o)+(h[a]?this._minDigits(e,e._periods[a],2):"")+(h[r]?(h[a]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[r],2):"")+(h[l]?(h[a]||h[r]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[l],2):""):'<span class="'+this._rowClass+" "+this._showClass+(e.options.significant||c)+(e._hold?" "+this._holdingClass:"")+'">'+v(i)+v(n)+v(s)+v(o)+v(a)+v(r)+v(l))+"</span>"+(e.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+e.options.description+"</span>":"")},_buildLayout:function(e,p,_,c,u,h){for(var d=e.options[c?"compactLabels":"labels"],m=e.options.whichLabels||this._normalLabels,g=function(t){return(e.options[(c?"compactLabels":"labels")+m(e._periods[t])]||d)[t]},f=function(t,i){return e.options.digits[Math.floor(t/i)%10]},w={desc:e.options.description,sep:e.options.timeSeparator,yl:g(i),yn:this._minDigits(e,e._periods[i],1),ynn:this._minDigits(e,e._periods[i],2),ynnn:this._minDigits(e,e._periods[i],3),y1:f(e._periods[i],1),y10:f(e._periods[i],10),y100:f(e._periods[i],100),y1000:f(e._periods[i],1e3),ol:g(n),on:this._minDigits(e,e._periods[n],1),onn:this._minDigits(e,e._periods[n],2),onnn:this._minDigits(e,e._periods[n],3),o1:f(e._periods[n],1),o10:f(e._periods[n],10),o100:f(e._periods[n],100),o1000:f(e._periods[n],1e3),wl:g(s),wn:this._minDigits(e,e._periods[s],1),wnn:this._minDigits(e,e._periods[s],2),wnnn:this._minDigits(e,e._periods[s],3),w1:f(e._periods[s],1),w10:f(e._periods[s],10),w100:f(e._periods[s],100),w1000:f(e._periods[s],1e3),dl:g(o),dn:this._minDigits(e,e._periods[o],1),dnn:this._minDigits(e,e._periods[o],2),dnnn:this._minDigits(e,e._periods[o],3),d1:f(e._periods[o],1),d10:f(e._periods[o],10),d100:f(e._periods[o],100),d1000:f(e._periods[o],1e3),hl:g(a),hn:this._minDigits(e,e._periods[a],1),hnn:this._minDigits(e,e._periods[a],2),hnnn:this._minDigits(e,e._periods[a],3),h1:f(e._periods[a],1),h10:f(e._periods[a],10),h100:f(e._periods[a],100),h1000:f(e._periods[a],1e3),ml:g(r),mn:this._minDigits(e,e._periods[r],1),mnn:this._minDigits(e,e._periods[r],2),mnnn:this._minDigits(e,e._periods[r],3),m1:f(e._periods[r],1),m10:f(e._periods[r],10),m100:f(e._periods[r],100),m1000:f(e._periods[r],1e3),sl:g(l),sn:this._minDigits(e,e._periods[l],1),snn:this._minDigits(e,e._periods[l],2),snnn:this._minDigits(e,e._periods[l],3),s1:f(e._periods[l],1),s10:f(e._periods[l],10),s100:f(e._periods[l],100),s1000:f(e._periods[l],1e3)},y=_,v=i;l>=v;v++){var D="yowdhms".charAt(v),C=new RegExp("\\{"+D+"<\\}([\\s\\S]*)\\{"+D+">\\}","g");y=y.replace(C,!u&&p[v]||u&&h[v]?"$1":"")}return t.each(w,function(t,e){var i=new RegExp("\\{"+t+"\\}","g");y=y.replace(i,e)}),y},_minDigits:function(t,e,i){return e=""+e,e.length>=i?this._translateDigits(t,e):(e="0000000000"+e,this._translateDigits(t,e.substr(e.length-i)))},_translateDigits:function(t,e){return(""+e).replace(/[0-9]/g,function(e){return t.options.digits[e]})},_determineShow:function(t){var e=t.options.format,p=[];return p[i]=e.match("y")?"?":e.match("Y")?"!":null,p[n]=e.match("o")?"?":e.match("O")?"!":null,p[s]=e.match("w")?"?":e.match("W")?"!":null,p[o]=e.match("d")?"?":e.match("D")?"!":null,p[a]=e.match("h")?"?":e.match("H")?"!":null,p[r]=e.match("m")?"?":e.match("M")?"!":null,p[l]=e.match("s")?"?":e.match("S")?"!":null,p},_calculatePeriods:function(t,e,p,_){t._now=_,t._now.setMilliseconds(0);var c=new Date(t._now.getTime());t._since?_.getTime()<t._since.getTime()?t._now=_=c:_=t._since:(c.setTime(t._until.getTime()),_.getTime()>t._until.getTime()&&(t._now=_=c));var u=[0,0,0,0,0,0,0];if(e[i]||e[n]){var h=this._getDaysInMonth(_.getFullYear(),_.getMonth()),d=this._getDaysInMonth(c.getFullYear(),c.getMonth()),m=c.getDate()==_.getDate()||c.getDate()>=Math.min(h,d)&&_.getDate()>=Math.min(h,d),g=function(t){return 60*(60*t.getHours()+t.getMinutes())+t.getSeconds()},f=Math.max(0,12*(c.getFullYear()-_.getFullYear())+c.getMonth()-_.getMonth()+(c.getDate()<_.getDate()&&!m||m&&g(c)<g(_)?-1:0));u[i]=e[i]?Math.floor(f/12):0,u[n]=e[n]?f-12*u[i]:0,_=new Date(_.getTime());var w=_.getDate()==h,y=this._getDaysInMonth(_.getFullYear()+u[i],_.getMonth()+u[n]);_.getDate()>y&&_.setDate(y),_.setFullYear(_.getFullYear()+u[i]),_.setMonth(_.getMonth()+u[n]),w&&_.setDate(y)}var v=Math.floor((c.getTime()-_.getTime())/1e3),D=function(t,i){u[t]=e[t]?Math.floor(v/i):0,v-=u[t]*i};if(D(s,604800),D(o,86400),D(a,3600),D(r,60),D(l,1),v>0&&!t._since)for(var C=[1,12,4.3482,7,24,60,60],M=l,T=1,S=l;S>=i;S--)e[S]&&(u[M]>=T&&(u[M]=0,v=1),v>0&&(u[S]++,v=0,M=S,T=1)),T*=C[S];if(p)for(var S=i;l>=S;S++)p&&u[S]?p--:p||(u[S]=0);return u}})}(jQuery);