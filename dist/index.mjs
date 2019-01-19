"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e,t=(function(e,t){var n;n=function(){var e,t=!1,n=function(e){if(e){var t,n=Object.keys(e),o=n.length;for(t=0;t<o;t++)this[n[t]]=e[n[t]]}};n.prototype={toString:function(){return JSON.stringify(this)},setValue:function(e,t){return this[e]=t,this}};var o=function(e){var t=[];return"#text"!==e.nodeName&&"#comment"!==e.nodeName&&(t.push(e.nodeName),e.attributes&&(e.attributes.class&&t.push(e.nodeName+"."+e.attributes.class.replace(/ /g,".")),e.attributes.id&&t.push(e.nodeName+"#"+e.attributes.id))),t},s=function(e){var t,n,s,i,r,a,l,u={},c={},d=e.length;for(a=0;a<d;a++)for(t=(n=e[a]).length,s=o(n),l=0;l<t;l++)(r=(i=s[l])in u)||i in c?r&&(delete u[i],c[i]=!0):u[i]=!0;return u},i=function(e,t){var n,o,i=s(e),r=s(t),a={},l=Object.keys(i),u=l.length;for(o=0;o<u;o++)r[n=l[o]]&&(a[n]=!0);return a},r=function(e){return delete e.outerDone,delete e.innerDone,delete e.valueDone,!e.childNodes||e.childNodes.every(r)},a=function(e,t){var n,o;if(!["nodeName","value","checked","selected","data"].every(function(n){return e[n]===t[n]}))return!1;if(Boolean(e.attributes)!==Boolean(t.attributes))return!1;if(Boolean(e.childNodes)!==Boolean(t.childNodes))return!1;if(e.attributes){if(n=Object.keys(e.attributes),o=Object.keys(t.attributes),n.length!==o.length)return!1;if(!n.every(function(n){return e.attributes[n]===t.attributes[n]}))return!1}if(e.childNodes){if(e.childNodes.length!==t.childNodes.length)return!1;if(!e.childNodes.every(function(e,n){return a(e,t.childNodes[n])}))return!1}return!0},l=function(e,t,n,o,s){var r,a,u;if(!e||!t)return!1;if(e.nodeName!==t.nodeName)return!1;if("#text"===e.nodeName)return!!s||e.data===t.data;if(e.nodeName in n)return!0;if(e.attributes&&t.attributes){if(e.attributes.id){if(e.attributes.id!==t.attributes.id)return!1;if(e.nodeName+"#"+e.attributes.id in n)return!0}if(e.attributes.class&&e.attributes.class===t.attributes.class)if(e.nodeName+"."+e.attributes.class.replace(/ /g,".")in n)return!0}return!!o||(a=e.childNodes?e.childNodes.slice().reverse():[],u=t.childNodes?t.childNodes.slice().reverse():[],a.length===u.length&&(s?a.every(function(e,t){return e.nodeName===u[t].nodeName}):(r=i(a,u),a.every(function(e,t){return l(e,u[t],r,!0,!0)}))))},u=function(e){return JSON.parse(JSON.stringify(e))},c=function(e,t,n,s){var r,a,u,c=0,d=[],h=e.length,f=t.length,p=Array.apply(null,new Array(h+1)).map(function(){return[]}),m=i(e,t),V=h===f;for(V&&e.some(function(e,n){var s=o(e),i=o(t[n]);return s.length!==i.length?(V=!1,!0):(s.some(function(e,t){if(e!==i[t])return V=!1,!0}),!V||void 0)}),r=0;r<h;r++)for(u=e[r],a=0;a<f;a++)n[r]||s[a]||!l(u,t[a],m,V)?p[r+1][a+1]=0:(p[r+1][a+1]=p[r][a]?p[r][a]+1:1,p[r+1][a+1]>=c&&(c=p[r+1][a+1],d=[r+1,a+1]));return 0!==c&&{oldValue:d[0]-c,newValue:d[1]-c,length:c}},d=function(e,t){return Array.apply(null,new Array(e)).map(function(){return t})};function h(e,t,n){var o=e[t];e[t]=e[n],e[n]=o}var f=function(){this.list=[]};f.prototype={list:!1,add:function(e){this.list.push.apply(this.list,e)},forEach:function(e){var t,n=this.list.length;for(t=0;t<n;t++)e(this.list[t])}};var p=function(e){var t,n,o={debug:!1,diffcap:10,maxDepth:!1,maxChildCount:50,maxChildDiffCount:3,valueDiffing:!0,textDiff:function(){arguments[0].data=arguments[3]},preVirtualDiffApply:function(){},postVirtualDiffApply:function(){},preDiffApply:function(){},postDiffApply:function(){},filterOuterDiff:null,compress:!1};for(t in void 0===e&&(e={}),o)this[t]=void 0===e[t]?o[t]:e[t];var s={addAttribute:"addAttribute",modifyAttribute:"modifyAttribute",removeAttribute:"removeAttribute",modifyTextElement:"modifyTextElement",relocateGroup:"relocateGroup",removeElement:"removeElement",addElement:"addElement",removeTextElement:"removeTextElement",addTextElement:"addTextElement",replaceElement:"replaceElement",modifyValue:"modifyValue",modifyChecked:"modifyChecked",modifySelected:"modifySelected",modifyComment:"modifyComment",action:"action",route:"route",oldValue:"oldValue",newValue:"newValue",element:"element",group:"group",from:"from",to:"to",name:"name",value:"value",data:"data",attributes:"attributes",nodeName:"nodeName",childNodes:"childNodes",checked:"checked",selected:"selected"};if(this.compress)for(t in n=0,this._const={},s)this._const[t]=n,n++;else this._const=s};return p.Diff=n,p.prototype={diff:function(t,n){var o=this.nodeToObj(t),s=this.nodeToObj(n);return e=0,this.debug&&(this.t1Orig=this.nodeToObj(t),this.t2Orig=this.nodeToObj(n)),this.tracker=new f,this.findDiffs(o,s)},findDiffs:function(n,o){var s;do{if(this.debug&&(e+=1)>this.diffcap)throw window.diffError=[this.t1Orig,this.t2Orig],new Error("surpassed diffcap:"+JSON.stringify(this.t1Orig)+" -> "+JSON.stringify(this.t2Orig));0===(s=this.findNextDiff(n,o,[])).length&&(a(n,o)||(t?(console.error("Could not find remaining diffs!"),console.log({t1:n,t2:o})):(t=!0,r(n),s=this.findNextDiff(n,o,[])))),s.length>0&&(t=!1,this.tracker.add(s),this.applyVirtual(n,s))}while(s.length>0);return this.tracker.list},findNextDiff:function(e,t,n){var o,s;if(this.maxDepth&&n.length>this.maxDepth)return[];if(!e.outerDone){if(o=this.findOuterDiff(e,t,n),this.filterOuterDiff&&(s=this.filterOuterDiff(e,t,o))&&(o=s),o.length>0)return e.outerDone=!0,o;e.outerDone=!0}if(!e.innerDone){if((o=this.findInnerDiff(e,t,n)).length>0)return o;e.innerDone=!0}if(this.valueDiffing&&!e.valueDone){if((o=this.findValueDiff(e,t,n)).length>0)return e.valueDone=!0,o;e.valueDone=!0}return[]},findOuterDiff:function(e,t,o){var s,i,r,l,c,d,h=this,f=[];if(e.nodeName!==t.nodeName)return[(new n).setValue(h._const.action,h._const.replaceElement).setValue(h._const.oldValue,u(e)).setValue(h._const.newValue,u(t)).setValue(h._const.route,o)];if(o.length&&this.maxChildCount&&e.childNodes&&t.childNodes&&e.childNodes.length>this.maxChildCount&&t.childNodes.length>this.maxChildCount){for(var p=e.childNodes.length<t.childNodes.length?e.childNodes.length:t.childNodes.length,m=0,V=0;m<this.maxChildDiffCount&&V<p;)a(e.childNodes[V],t.childNodes[V])||m++,V++;if(m===this.maxChildDiffCount)return[(new n).setValue(h._const.action,h._const.replaceElement).setValue(h._const.oldValue,u(e)).setValue(h._const.newValue,u(t)).setValue(h._const.route,o)]}if(e.data!==t.data)return"#text"===e.nodeName?[(new n).setValue(h._const.action,h._const.modifyTextElement).setValue(h._const.route,o).setValue(h._const.oldValue,e.data).setValue(h._const.newValue,t.data)]:[(new n).setValue(h._const.action,h._const.modifyComment).setValue(h._const.route,o).setValue(h._const.oldValue,e.data).setValue(h._const.newValue,t.data)];for(i=e.attributes?Object.keys(e.attributes).sort():[],r=t.attributes?Object.keys(t.attributes).sort():[],l=i.length,d=0;d<l;d++)-1===(c=r.indexOf(s=i[d]))?f.push((new n).setValue(h._const.action,h._const.removeAttribute).setValue(h._const.route,o).setValue(h._const.name,s).setValue(h._const.value,e.attributes[s])):(r.splice(c,1),e.attributes[s]!==t.attributes[s]&&f.push((new n).setValue(h._const.action,h._const.modifyAttribute).setValue(h._const.route,o).setValue(h._const.name,s).setValue(h._const.oldValue,e.attributes[s]).setValue(h._const.newValue,t.attributes[s])));for(l=r.length,d=0;d<l;d++)s=r[d],f.push((new n).setValue(h._const.action,h._const.addAttribute).setValue(h._const.route,o).setValue(h._const.name,s).setValue(h._const.value,t.attributes[s]));return f},nodeToObj:function(e){var t,n,o,s,i={};if(i.nodeName=e.nodeName,"#text"===i.nodeName||"#comment"===i.nodeName)i.data=e.data;else{if(e.attributes&&e.attributes.length>0)for(i.attributes={},n=(t=Array.prototype.slice.call(e.attributes)).length,s=0;s<n;s++)i.attributes[(o=t[s]).name]=o.value;if("TEXTAREA"===i.nodeName)i.value=e.value;else if(e.childNodes&&e.childNodes.length>0)for(i.childNodes=[],n=(t=Array.prototype.slice.call(e.childNodes)).length,s=0;s<n;s++)i.childNodes.push(this.nodeToObj(t[s]));this.valueDiffing&&(void 0!==e.checked&&e.type&&-1!==["radio","checkbox"].indexOf(e.type.toLowerCase())?i.checked=e.checked:void 0!==e.value&&(i.value=e.value),void 0!==e.selected&&(i.selected=e.selected))}return i},objToNode:function(e,t){var n,o,s,i,r,a;if("#text"===e.nodeName)n=document.createTextNode(e.data);else if("#comment"===e.nodeName)n=document.createComment(e.data);else{if("svg"===e.nodeName||t?(n=document.createElementNS("http://www.w3.org/2000/svg",e.nodeName),t=!0):n=document.createElement(e.nodeName),e.attributes)for(r=(s=Object.keys(e.attributes)).length,a=0;a<r;a++)n.setAttribute(o=s[a],e.attributes[o]);if(e.childNodes)for(r=(i=e.childNodes).length,a=0;a<r;a++)n.appendChild(this.objToNode(i[a],t));this.valueDiffing&&(e.value&&(n.value=e.value),e.checked&&(n.checked=e.checked),e.selected&&(n.selected=e.selected))}return n},findInnerDiff:function(e,t,o){var s,i,r,a,l,h=e.subsets&&e.subsetsAge--?e.subsets:e.childNodes&&t.childNodes?function(e,t){for(var n,o,s,i=e.childNodes?e.childNodes:[],r=t.childNodes?t.childNodes:[],a=d(i.length,!1),l=d(r.length,!1),u=[],h=!0,f=function(){return arguments[1]},p=function(e){a[h.oldValue+e]=!0,l[h.newValue+e]=!0};h;)if(h=c(i,r,a,l))for(u.push(h),n=(o=Array.apply(null,new Array(h.length)).map(f)).length,s=0;s<n;s++)p(o[s]);return e.subsets=u,e.subsetsAge=100,u}(e,t):[],f=e.childNodes?e.childNodes:[],p=t.childNodes?t.childNodes:[],m=[],V=0,_=this;if(h.length>0&&(m=this.attemptGroupRelocation(e,t,h,o)).length>0)return m;for(i=Math.max(f.length,p.length),f.length!==p.length&&(s=!0),l=0;l<i;l+=1)r=f[l],a=p[l],s&&(r&&!a?"#text"===r.nodeName?(m.push((new n).setValue(_._const.action,_._const.removeTextElement).setValue(_._const.route,o.concat(V)).setValue(_._const.value,r.data)),V-=1):(m.push((new n).setValue(_._const.action,_._const.removeElement).setValue(_._const.route,o.concat(V)).setValue(_._const.element,u(r))),V-=1):a&&!r&&m.push("#text"===a.nodeName?(new n).setValue(_._const.action,_._const.addTextElement).setValue(_._const.route,o.concat(V)).setValue(_._const.value,a.data):(new n).setValue(_._const.action,_._const.addElement).setValue(_._const.route,o.concat(V)).setValue(_._const.element,u(a)))),r&&a&&(m=m.concat(this.findNextDiff(r,a,o.concat(V)))),V+=1;return e.innerDone=!0,m},attemptGroupRelocation:function(e,t,o,s){var i,r,a,c,h,f,p,m,V,_=this,v=function(e,t,n){var o,s,i,r,a,l=e.childNodes?d(e.childNodes.length,!0):[],u=t.childNodes?d(t.childNodes.length,!0):[],c=0,h=n.length;for(o=0;o<h;o++){for(i=(a=n[o]).oldValue+a.length,r=a.newValue+a.length,s=a.oldValue;s<i;s+=1)l[s]=c;for(s=a.newValue;s<r;s+=1)u[s]=c;c+=1}return{gaps1:l,gaps2:u}}(e,t,o),g=v.gaps1,b=v.gaps2,y=Math.min(g.length,b.length),N=[];for(m=0,p=0;m<y;p+=1,m+=1)if(!0===g[m])if("#text"===(c=e.childNodes[p]).nodeName){if("#text"===t.childNodes[m].nodeName&&c.data!==t.childNodes[m].data){for(f=p;e.childNodes.length>f+1&&"#text"===e.childNodes[f+1].nodeName;)if(t.childNodes[m].data===e.childNodes[f+=1].data){h=!0;break}if(!h)return N.push((new n).setValue(_._const.action,_._const.modifyTextElement).setValue(_._const.route,s.concat(m)).setValue(_._const.oldValue,c.data).setValue(_._const.newValue,t.childNodes[m].data)),N}N.push((new n).setValue(_._const.action,_._const.removeTextElement).setValue(_._const.route,s.concat(m)).setValue(_._const.value,c.data)),g.splice(m,1),y=Math.min(g.length,b.length),m-=1}else N.push((new n).setValue(_._const.action,_._const.removeElement).setValue(_._const.route,s.concat(m)).setValue(_._const.element,u(c))),g.splice(m,1),y=Math.min(g.length,b.length),m-=1;else if(!0===b[m])"#text"===(c=t.childNodes[m]).nodeName?(N.push((new n).setValue(_._const.action,_._const.addTextElement).setValue(_._const.route,s.concat(m)).setValue(_._const.value,c.data)),g.splice(m,0,!0),y=Math.min(g.length,b.length),p-=1):(N.push((new n).setValue(_._const.action,_._const.addElement).setValue(_._const.route,s.concat(m)).setValue(_._const.element,u(c))),g.splice(m,0,!0),y=Math.min(g.length,b.length),p-=1);else if(g[m]!==b[m]){if(N.length>0)return N;if(a=o[g[m]],(r=Math.min(a.newValue,e.childNodes.length-a.length))!==a.oldValue){for(i=!1,V=0;V<a.length;V+=1)l(e.childNodes[r+V],e.childNodes[a.oldValue+V],[],!1,!0)||(i=!0);if(i)return[(new n).setValue(_._const.action,_._const.relocateGroup).setValue("groupLength",a.length).setValue(_._const.from,a.oldValue).setValue(_._const.to,r).setValue(_._const.route,s)]}}return N},findValueDiff:function(e,t,o){var s=[],i=this;return e.selected!==t.selected&&s.push((new n).setValue(i._const.action,i._const.modifySelected).setValue(i._const.oldValue,e.selected).setValue(i._const.newValue,t.selected).setValue(i._const.route,o)),(e.value||t.value)&&e.value!==t.value&&"OPTION"!==e.nodeName&&s.push((new n).setValue(i._const.action,i._const.modifyValue).setValue(i._const.oldValue,e.value||"").setValue(i._const.newValue,t.value||"").setValue(i._const.route,o)),e.checked!==t.checked&&s.push((new n).setValue(i._const.action,i._const.modifyChecked).setValue(i._const.oldValue,e.checked).setValue(i._const.newValue,t.checked).setValue(i._const.route,o)),s},applyVirtual:function(e,t){var n,o=t.length;if(0===o)return!0;for(n=0;n<o;n++)this.applyVirtualDiff(e,t[n]);return!0},getFromVirtualRoute:function(e,t){var n,o,s=e;for(t=t.slice();t.length>0;){if(!s.childNodes)return!1;o=t.splice(0,1)[0],n=s,s=s.childNodes[o]}return{node:s,parentNode:n,nodeIndex:o}},applyVirtualDiff:function(e,t){var n,o,s,i,r,a,l,c=this.getFromVirtualRoute(e,t[this._const.route]),d=c.node,h=c.parentNode,f=c.nodeIndex,p=[],m=this,V={diff:t,node:d};if(this.preVirtualDiffApply(V))return!0;switch(t[this._const.action]){case this._const.addAttribute:d.attributes||(d.attributes={}),d.attributes[t[this._const.name]]=t[this._const.value],"checked"===t[this._const.name]?d.checked=!0:"selected"===t[this._const.name]?d.selected=!0:"INPUT"===d.nodeName&&"value"===t[this._const.name]&&(d.value=t[this._const.value]);break;case this._const.modifyAttribute:d.attributes[t[this._const.name]]=t[this._const.newValue];break;case this._const.removeAttribute:delete d.attributes[t[this._const.name]],0===Object.keys(d.attributes).length&&delete d.attributes,"checked"===t[this._const.name]?d.checked=!1:"selected"===t[this._const.name]?delete d.selected:"INPUT"===d.nodeName&&"value"===t[this._const.name]&&delete d.value;break;case this._const.modifyTextElement:d.data=t[this._const.newValue];break;case this._const.modifyValue:d.value=t[this._const.newValue];break;case this._const.modifyComment:d.data=t[this._const.newValue];break;case this._const.modifyChecked:d.checked=t[this._const.newValue];break;case this._const.modifySelected:d.selected=t[this._const.newValue];break;case this._const.replaceElement:(o=u(t[this._const.newValue])).outerDone=!0,o.innerDone=!0,o.valueDone=!0,h.childNodes[f]=o;break;case this._const.relocateGroup:for(r=(s=d.childNodes.splice(t[this._const.from],t.groupLength).reverse()).length,l=0;l<r;l++)d.childNodes.splice(t[m._const.to],0,s[l]);d.subsets&&d.subsets.forEach(function(e){t[m._const.from]<t[m._const.to]&&e.oldValue<=t[m._const.to]&&e.oldValue>t[m._const.from]?(e.oldValue-=t.groupLength,(n=e.oldValue+e.length-t[m._const.to])>0&&(p.push({oldValue:t[m._const.to]+t.groupLength,newValue:e.newValue+e.length-n,length:n}),e.length-=n)):t[m._const.from]>t[m._const.to]&&e.oldValue>t[m._const.to]&&e.oldValue<t[m._const.from]?(e.oldValue+=t.groupLength,(n=e.oldValue+e.length-t[m._const.to])>0&&(p.push({oldValue:t[m._const.to]+t.groupLength,newValue:e.newValue+e.length-n,length:n}),e.length-=n)):e.oldValue===t[m._const.from]&&(e.oldValue=t[m._const.to])});break;case this._const.removeElement:h.childNodes.splice(f,1),h.subsets&&h.subsets.forEach(function(e){e.oldValue>f?e.oldValue-=1:e.oldValue===f?e.delete=!0:e.oldValue<f&&e.oldValue+e.length>f&&(e.oldValue+e.length-1===f?e.length--:(p.push({newValue:e.newValue+f-e.oldValue,oldValue:f,length:e.length-f+e.oldValue-1}),e.length=f-e.oldValue))}),d=h;break;case this._const.addElement:i=t[this._const.route].slice(),a=i.splice(i.length-1,1)[0],d=this.getFromVirtualRoute(e,i).node,(o=u(t[this._const.element])).outerDone=!0,o.innerDone=!0,o.valueDone=!0,d.childNodes||(d.childNodes=[]),a>=d.childNodes.length?d.childNodes.push(o):d.childNodes.splice(a,0,o),d.subsets&&d.subsets.forEach(function(e){e.oldValue>=a?e.oldValue+=1:e.oldValue<a&&e.oldValue+e.length>a&&(p.push({newValue:e.newValue+e.length-(n=e.oldValue+e.length-a),oldValue:a+1,length:n}),e.length-=n)});break;case this._const.removeTextElement:h.childNodes.splice(f,1),"TEXTAREA"===h.nodeName&&delete h.value,h.subsets&&h.subsets.forEach(function(e){e.oldValue>f?e.oldValue-=1:e.oldValue===f?e.delete=!0:e.oldValue<f&&e.oldValue+e.length>f&&(e.oldValue+e.length-1===f?e.length--:(p.push({newValue:e.newValue+f-e.oldValue,oldValue:f,length:e.length-f+e.oldValue-1}),e.length=f-e.oldValue))}),d=h;break;case this._const.addTextElement:i=t[this._const.route].slice(),a=i.splice(i.length-1,1)[0],(o={}).nodeName="#text",o.data=t[this._const.value],(d=this.getFromVirtualRoute(e,i).node).childNodes||(d.childNodes=[]),a>=d.childNodes.length?d.childNodes.push(o):d.childNodes.splice(a,0,o),"TEXTAREA"===d.nodeName&&(d.value=t[this._const.newValue]),d.subsets&&d.subsets.forEach(function(e){e.oldValue>=a&&(e.oldValue+=1),e.oldValue<a&&e.oldValue+e.length>a&&(p.push({newValue:e.newValue+e.length-(n=e.oldValue+e.length-a),oldValue:a+1,length:n}),e.length-=n)});break;default:console.log("unknown action")}d.subsets&&(d.subsets=d.subsets.filter(function(e){return!e.delete&&e.oldValue!==e.newValue}),p.length&&(d.subsets=d.subsets.concat(p))),V.newNode=o,this.postVirtualDiffApply(V)},apply:function(e,t){var n,o=t.length;if(0===o)return!0;for(n=0;n<o;n++)if(!this.applyDiff(e,t[n]))return!1;return!0},getFromRoute:function(e,t){t=t.slice();for(var n,o=e;t.length>0;){if(!o.childNodes)return!1;n=t.splice(0,1)[0],o=o.childNodes[n]}return o},applyDiff:function(e,t){var n,o,s,i,r,a,l,u=this.getFromRoute(e,t[this._const.route]),c=this,d={diff:t,node:u};if(this.preDiffApply(d))return!0;switch(t[this._const.action]){case this._const.addAttribute:if(!u||!u.setAttribute)return!1;u.setAttribute(t[this._const.name],t[this._const.value]);break;case this._const.modifyAttribute:if(!u||!u.setAttribute)return!1;u.setAttribute(t[this._const.name],t[this._const.newValue]),"value"===t[this._const.name]&&"INPUT"===u.nodeName&&u.value!==t[this._const.oldValue]&&(u.value=t[this._const.oldValue]);break;case this._const.removeAttribute:if(!u||!u.removeAttribute)return!1;u.removeAttribute(t[this._const.name]);break;case this._const.modifyTextElement:if(!u||3!==u.nodeType)return!1;this.textDiff(u,u.data,t[this._const.oldValue],t[this._const.newValue]);break;case this._const.modifyValue:if(!u||void 0===u.value)return!1;u.value=t[this._const.newValue];break;case this._const.modifyComment:if(!u||void 0===u.data)return!1;this.textDiff(u,u.data,t[this._const.oldValue],t[this._const.newValue]);break;case this._const.modifyChecked:if(!u||void 0===u.checked)return!1;u.checked=t[this._const.newValue];break;case this._const.modifySelected:if(!u||void 0===u.selected)return!1;u.selected=t[this._const.newValue];break;case this._const.replaceElement:u.parentNode.replaceChild(this.objToNode(t[this._const.newValue],"http://www.w3.org/2000/svg"===u.namespaceURI),u);break;case this._const.relocateGroup:for(r=(i=Array.apply(null,new Array(t.groupLength)).map(function(){return u.removeChild(u.childNodes[t[c._const.from]])})).length,a=0;a<r;a++)0===a&&(o=u.childNodes[t[c._const.to]]),u.insertBefore(i[a],o||null);break;case this._const.removeElement:u.parentNode.removeChild(u);break;case this._const.addElement:l=(s=t[this._const.route].slice()).splice(s.length-1,1)[0],(u=this.getFromRoute(e,s)).insertBefore(this.objToNode(t[this._const.element],"http://www.w3.org/2000/svg"===u.namespaceURI),u.childNodes[l]||null);break;case this._const.removeTextElement:if(!u||3!==u.nodeType)return!1;u.parentNode.removeChild(u);break;case this._const.addTextElement:if(l=(s=t[this._const.route].slice()).splice(s.length-1,1)[0],n=document.createTextNode(t[this._const.value]),!(u=this.getFromRoute(e,s))||!u.childNodes)return!1;u.insertBefore(n,u.childNodes[l]||null);break;default:console.log("unknown action")}return d.newNode=n,this.postDiffApply(d),!0},undo:function(e,t){var n,o=t.length;for(t=t.slice(),o||(t=[t]),t.reverse(),n=0;n<o;n++)this.undoDiff(e,t[n])},undoDiff:function(e,t){switch(t[this._const.action]){case this._const.addAttribute:t[this._const.action]=this._const.removeAttribute,this.applyDiff(e,t);break;case this._const.modifyAttribute:h(t,this._const.oldValue,this._const.newValue),this.applyDiff(e,t);break;case this._const.removeAttribute:t[this._const.action]=this._const.addAttribute,this.applyDiff(e,t);break;case this._const.modifyTextElement:case this._const.modifyValue:case this._const.modifyComment:case this._const.modifyChecked:case this._const.modifySelected:case this._const.replaceElement:h(t,this._const.oldValue,this._const.newValue),this.applyDiff(e,t);break;case this._const.relocateGroup:h(t,this._const.from,this._const.to),this.applyDiff(e,t);break;case this._const.removeElement:t[this._const.action]=this._const.addElement,this.applyDiff(e,t);break;case this._const.addElement:t[this._const.action]=this._const.removeElement,this.applyDiff(e,t);break;case this._const.removeTextElement:t[this._const.action]=this._const.addTextElement,this.applyDiff(e,t);break;case this._const.addTextElement:t[this._const.action]=this._const.removeTextElement,this.applyDiff(e,t);break;default:console.log("unknown action")}}},p},e.exports?t=e.exports=n():t.diffDOM=n()}(e={exports:{}},e.exports),e.exports);function n(e){return function(e){return"[object Object]"===Object.prototype.toString.call(e)}(e)?JSON.stringify(function(e){return Object.keys(e).sort().reduce(function(t,n){var o;return Object.assign({},t,((o={})[n]=e[n],o))},{})}(function(e){return Object.entries(e).reduce(function(e,t){var n,o=t[1];return"function"==typeof o?e:Object.assign({},e,((n={})[t[0]]=o,n))},{})}(e))):JSON.stringify(e)}function o(e,t){return e.reduce(function(e,o,s){var i=n(o),r=t.findIndex(function(e){return n(e)===i});if(r>-1)return e.concat([[s,r]])},[])}var s=function(){return/^<([a-z]+)([^>]*?)(\/?>|(>([\s\S]*?)<\/\1>))$/i};function i(e){if("jQuery"in window)return $(e)[0];var t,n,o=(t=e.trim(),(n=t.match(s()))?{tag:n[1],attributes:n[2]||"",innerHTML:n[5]||""}:null);if(!o)throw new Error("source: "+e+"; Not a valid element! check render()");var i=document.createElement(o.tag);i.innerHTML=o.innerHTML;var r=o.attributes;if(r){var a={};r.trim().replace(/([a-zA-Z]+)=([^'"]+|(['"])([^'"]+)\3)/g,function(e,t,n){return a[t]=n.replace(/['"]/g,""),e}),Object.entries(a).forEach(function(e){i.setAttribute(e[0],e[1])})}return i}function r(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];var s=Array.isArray(t)?t.concat(n):[t].concat(n);if("jQuery"in window)$(e).replaceWith(s);else{var i=e.parentElement;if(i){if(!s.length)throw new Error("Need to provide new DOM!");for(var r=e,a=s.length-1;a>=0;a--){var l=s[a];i.insertBefore(l,r),r=l}i.removeChild(e)}}}function a(e,t){return void 0===t&&(t=document),"jQuery"in window?$(t).find(e)[0]:t.querySelector(e)}var l,u={activeComponent:null,componentArray:[],stateList:[],effectList:[],components:function(){return{}},makeState:function(){return u.stateList.reduce(function(e,t,n){var o;return Object.assign({},e,((o={})[n]=t,o))},{})},clear:function(){u.stateList=[],u.effectList=[],u.components=function(){return{}}}},c=new t({preVirtualDiffApply:function(e){},preDiffApply:function(e){if("modifyValue"===e.diff.action)return!0}}),d=(l=function(e){return!(e[1]instanceof f)},function(e){return Object.entries(e).reduce(function(t,n){var o,s=n[0],i=n[1];return l([s,i],e)?Object.assign(t,((o={})[s]=i,o)):t},{})}),h=function(e){return e instanceof f?e:new f({fnComponent:e}).init()},f=function(e){void 0===e&&(e={}),this.parent=null,this.props={},this.lastRenderSnapshot="",this.lastComponentsSnapshot={},this.mounted=!1,this.preRenderResult="",this.propsFunc=function(){return{}},this.renderOption=e,this.initProps(e.props)};function p(e,t){return new t({el:e}).init()}function m(e){var t=u.activeComponent,n=u.stateList,o=n.length,s=[function(){return t&&!!t.state?t.state[o]:e},function(e){var n;t&&t.setState(((n={})[o]=e,n))}];return n.push(e),s}f.prototype.init=function(){return this.preRenderForFunction(),this.lastComponentsSnapshot=this.safeComponents(),this.update(),this.lastRenderSnapshot=this.render(),this},f.prototype.components=function(){return{}},f.prototype.didMount=function(){},f.prototype.didUpdate=function(){},f.prototype.willUnMount=function(){},f.prototype.shouldUpdate=function(){},f.prototype.render=function(e,t){return void 0===e&&(e=this.props),void 0===t&&(t=this.state),this.renderOption.fnComponent?(u.clear(),u.activeComponent=this,this.mounted?this.renderOption.fnComponent():this.preRenderResult):"<div></div>"},f.prototype.setState=function(e){var t,n=this;if(!(t="function"==typeof e?e(Object.assign({},this.state)):e))throw new Error("invalid state!");if("function"==typeof e)return this.state=t,this.update();var o=Object.entries(t).reduce(function(e,t){var o,s=t[0],i=t[1];if(!(s in n.state))return e;var r=i!==n.state[s];return{newState:Object.assign(e.newState,(o={},o[s]=i,o)),hasChanged:e.hasChanged||r}},{hasChanged:!1,newState:this.state});o.hasChanged&&(this.state=o.newState,this.update())},f.prototype.updateSelf=function(){if(this.shouldUpdateSelf()){var e=this.renderOption.el,t=this.ref,n=this.render();if(this.lastRenderSnapshot=n,n&&n.trim()){var o=i(n);if(t)return this.hasChildren()&&this.replaceSlotWithChild(this.lastComponentsSnapshot,o,!1),void this.patch(o);this.ref=o,!!e&&"string"==typeof e&&(a(e).appendChild(this.ref),this.mounted||this.mount())}}},f.prototype.update=function(){this.props=this.propsFunc(),this.updateChildren(),this.updateSelf()},f.prototype.updateChildren=function(){var e=this,t=this.safeComponents();if(this.hasChildren(t)){var s=this.lastComponentsSnapshot;Object.entries(t).forEach(function(t){var l=t[0],u=t[1],c=s[l];if(Array.isArray(u)&&Array.isArray(c)){u.forEach(function(t){return e.initChild(t)});var h=c.length,f=u.length,p=function e(t,s,i){void 0===i&&(i=0);var r=t.length,a=s.length;if(r===a)return t.reduce(function(e,t,o){var r=s[o];return"function"==typeof t&&"function"==typeof r?e:n(t)!==n(r)?e.concat([{index:o+i,oldValue:t,newValue:r,type:"E"}]):e},[]);if(r>a){if(0===a)return t.map(function(e,t){return{index:t+i,oldValue:e,newValue:void 0,type:"D"}});var l=o(t,s);return l.length===a?t.reduce(function(e,t,n){return l.some(function(e){return e[0]===n})?e:{index:n+i,oldValue:t,newValue:void 0,type:"D"}},[]):e(t.slice(0,a),s).concat(e(t.slice(a),[],a))}if(0===r)return s.map(function(e,t){return{index:t+i,oldValue:void 0,newValue:e,type:"A"}});var u=o(t,s);return u.length===r?s.reduce(function(e,t,n){return u.some(function(e){return e[1]===n})?e:e.concat([{index:n+i,oldValue:void 0,newValue:t,type:"A"}])},[]):e(t,s.slice(0,r)).concat(e([],s.slice(r),r))}(c.map(function(e){return e.props}).map(d),u.map(function(e){return e.props}).map(d)).reduce(function(e,t){return"E"===t.type&&e.update.push(t),"D"===t.type&&e.del.push(t),"A"===t.type&&e.add.push(t),e},{update:[],add:[],del:[]}),m=p.add,V=p.del;if(p.update.forEach(function(e){var t=e.index,n=c[t];n.propsFunc=u[t].propsFunc,n.update()}),m.length&&m.length===f+h){var _=a(l,e.ref);_&&r(_,u.map(function(e){return e.ref})),u.forEach(function(e){return e.mount()}),e.lastComponentsSnapshot[l]=u}else{var v=c.map(function(e){return e.ref});m.forEach(function(t,n){var o=t.index,s=u[o];o<h?(!function(e,t){if("jQuery"in window)$(t).insertBefore(e);else{var n=e.parentElement;n&&n.insertBefore(t,e)}}(v[o],s.ref),e.lastComponentsSnapshot[l].splice(o+n,0,s)):(!function(e,t){if("jQuery"in window)$(t).insertAfter(e);else{var n=e.parentElement;if(n){var o=e.nextElementSibling;o?n.insertBefore(t,o):n.appendChild(t)}}}(o===h?c[h-1].ref:u[o-1].ref,s.ref),e.lastComponentsSnapshot[l][o]=s);s.mount()})}var g=V.length===h;V.forEach(function(t,n){var o=t.index,s=c[o];if(e.lastComponentsSnapshot[l].splice(o-n,1),s.willUnMount(),g&&o===h-1)return r(s.ref,i(l));!function(e){if("jQuery"in window)$(e).remove();else{var t=e.parentElement;t&&t.removeChild(e)}}(s.ref)})}else Array.isArray(u)||Array.isArray(c)||(c.propsFunc=u.propsFunc,c.update())})}},f.prototype.hasChildren=function(e){return void 0===e&&(e=this.lastComponentsSnapshot),Object.keys(e).length>0},f.prototype.safeComponents=function(){return Object.entries(this.components()).reduce(function(e,t){var n=t[0],o=t[1];return e[n]=Array.isArray(o)?o.map(h):h(o),e},{})},f.prototype.initChild=function(e){e.parent=this},f.prototype.preRenderForFunction=function(){if(this.renderOption.fnComponent&&"function"==typeof this.renderOption.fnComponent&&(u.clear(),u.activeComponent=this,this.preRenderResult=this.renderOption.fnComponent(),this.state=u.makeState(),u.effectList.length)){var e=u.effectList.pop(),t=e[0],n=e[1];"function"==typeof t&&(this.didMount=t),"function"==typeof n&&(this.willUnMount=n)}},f.prototype.replaceSlotWithChild=function(e,t,n){var o=this;void 0===t&&(t=this.ref),void 0===n&&(n=!0),Object.entries(e).forEach(function(e){var s=e[0],l=e[1],u=null;if(Array.isArray(l)?l.length&&(l.forEach(function(e){return o.initChild(e)}),u=l.map(function(e){return n?e.ref:i(e.ref.outerHTML)})):(o.initChild(l),l.ref&&(u=n?l.ref:i(l.ref.outerHTML))),u){var c=a(s,t);c&&r(c,u)}n&&(Array.isArray(l)?l.forEach(function(e){e.ref&&e.mount()}):l.ref&&l.mount())})},f.prototype.shouldUpdateSelf=function(){var e=this.shouldUpdate();return"boolean"==typeof e?e:this.render()!==this.lastRenderSnapshot},f.prototype.initProps=function(e){e&&("function"==typeof e?(this.propsFunc=e,this.props=e()):(this.props=e,this.propsFunc=function(){return e}))},f.prototype.updateChain=function(){this.didUpdate(),this.parent&&this.parent instanceof f&&this.parent.updateChain()},f.prototype.register=function(){this.replaceSlotWithChild(this.lastComponentsSnapshot)},f.prototype.mount=function(){this.register(),this.didMount(),this.mounted=!0},f.prototype.patch=function(e){var t=c.diff(this.ref,e);c.apply(this.ref,t),this.updateChain()};var V=function(){};function _(e){var t=u.activeComponent,n=V;u.effectList.push([function(){n=e(t.ref)},function(){"function"==typeof n&&n()}])}var v=function(e){u.activeComponent&&(u.activeComponent.components=e)};export{f as Component,p as render,m as useState,_ as useEffect,v as register};
//# sourceMappingURL=index.mjs.map
