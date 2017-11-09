!function(e,t){"use strict";if(!e.fn.ionCheckRadio){String.prototype.trim||!function(){var e=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(e,"")}}();var i={},s={},r=function(t){this.group=t.content,this.type=t.type,this.$group=e(this.group),this.old=null,this.observer=null,this.init()};r.prototype={init:function(){var e=this.$group.eq(0).hasClass("icr-input");e?this.prepare():this.createHTML()},prepare:function(){var i,s,r,n=this;for(r=0;r<this.group.length;r++)i=e(this.group[r]),s=i.parent().parent(),e.data(this.group[r],"icr-parent",s),this.presetChecked(this.group[r]),this.presetDisabled(this.group[r]);this.$group.on("change",function(){n.change(this)}),this.$group.on("focus",function(){n.focus(this)}),this.$group.on("blur",function(){n.blur(this)}),t.MutationObserver&&this.setUpObserver()},setUpObserver:function(){var e,t,i=this;for(this.observer=new MutationObserver(function(t){t.forEach(function(t){e=t.target,"disabled"===t.attributeName&&i.toggle(i.getParent(e),e.disabled,"disabled")})}),t=0;t<this.group.length;t++)this.observer.observe(this.group[t],{attributes:!0})},destroy:function(){this.$group.off(),this.observer&&(this.observer.disconnect(),this.observer=null)},presetChecked:function(e){e.checked&&(this.toggle(this.getParent(e),!0,"checked"),"radio"===this.type&&(this.old=e))},presetDisabled:function(e){e.disabled&&this.toggle(this.getParent(e),!0,"disabled")},change:function(e){this.toggle(this.getParent(e),e.checked,"checked"),"radio"===this.type&&this.old&&this.old!==e&&this.toggle(this.getParent(this.old),this.old.checked,"checked"),this.old=e},focus:function(e){this.toggle(this.getParent(e),!0,"focused")},blur:function(e){this.toggle(this.getParent(e),!1,"focused")},toggle:function(e,t,i){t?e.addClass(i):e.removeClass(i)},getParent:function(t){return e.data(t,"icr-parent")},createHTML:function(){var t='<label class="icr-label">   <span class="icr-item type_{type}"></span>   <span class="icr-hidden"><input class="icr-input {class_list}" type="{type}" name="{name}" value="{value}" {disabled} {checked} /></span>   <span class="icr-text">{text}</span></label>',s=[],r=[],n=[],o=[],a=[],h=[],c=[],p=[],l=this,u=function(e){var t,i,s,r,n,o,a=e[0],h=[],c=a.childNodes;for(o=0;o<c.length;o++)h.push(c[o]);for(;h.length;){if(t=h[0],3===t.nodeType){if(i=t.nodeValue.trim())break}else if(1===t.nodeType)for(c=t.childNodes,o=0;o<c.length;o++)h.push(c[o]);Array.prototype.splice.call(h,0,1)}return s=t.parentNode.innerHTML,s.indexOf("<input")>=0&&(r=s.indexOf("<input"),s=s.slice(r),n=s.indexOf(">"),s=s.slice(n+1).trim()),s},d=function(e){var i=t.replace(/\{class_list\}/,s[e]);return i=i.replace(/\{type\}/g,r[e]),i=i.replace(/\{name\}/,n[e]),i=i.replace(/\{value\}/,o[e]),i=i.replace(/\{text\}/,a[e]),i=c[e]?i.replace(/\{disabled\}/,"disabled"):i.replace(/\{disabled\}/,""),i=h[e]?i.replace(/\{checked\}/,"checked"):i.replace(/\{checked\}/,"")};this.$group.each(function(t){var i,l,g,f=e(this),b=f.prop("className"),v=f.prop("type"),y=f.prop("name"),k=f.prop("value"),m=f.prop("checked"),x=f.prop("disabled"),$=f.prop("id");s.push(b),r.push(v),n.push(y),o.push(k),h.push(m),c.push(x),i=$?e("label[for='"+$+"']"):f.closest("label"),a.push(u(i)),g=d(t),i.after(g),l=i.next(),p.push(l[0]),f.remove(),i.remove()}),this.$group=e(p).find("input"),this.$group.each(function(e){l.group[e]=this,i[n[0]][e]=this}),this.prepare()}},e.fn.ionCheckRadio=function(){var e,n,o,a=[],h=function(e){t.console&&t.console.warn&&t.console.warn(e)};for(e=0;e<this.length;e++)n=this[e],o=n.name,"radio"!==n.type&&"checkbox"!==n.type||!o?h("Ion.CheckRadio: Some inputs have wrong type or absent name attribute!"):(i[o]={type:n.type,content:[]},a.push(n));for(e=0;e<a.length;e++)n=a[e],o=n.name,i[o].content.push(n);for(e in i)s[e]&&(s[e].destroy(),s[e]=null),s[e]=new r(i[e])}}}(jQuery,window);