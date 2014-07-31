!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t,n){var o=e.docs[t];o?n(F(e,o)):e.options.getFile?e.options.getFile(t,n):n(null)}function n(e,t,n){for(var o in e.docs){var i=e.docs[o];if(i.doc==t)return i}if(!n)for(var r=0;;++r)if(o="[doc"+(r||"")+"]",!e.docs[o]){n=o;break}return e.addDoc(n,t)}function o(t,o){return"string"==typeof o?t.docs[o]:(o instanceof e&&(o=o.getDoc()),o instanceof e.Doc?n(t,o):void 0)}function i(e,t,o){var i=n(e,t),a=e.cachedArgHints;a&&a.doc==t&&R(a.start,o.to)<=0&&(e.cachedArgHints=null);var s=i.changed;null==s&&(i.changed=s={from:o.from.line,to:o.from.line});var c=o.from.line+(o.text.length-1);o.from.line<s.to&&(s.to=s.to-(o.to.line-c)),c>=s.to&&(s.to=c+1),s.from>o.from.line&&(s.from=o.from.line),t.lineCount()>L&&o.to-s.from>100&&setTimeout(function(){i.changed&&i.changed.to-i.changed.from>100&&r(e,i)},200)}function r(e,t){e.server.request({files:[{type:"full",name:t.name,text:F(e,t)}]},function(e){e?window.console.error(e):t.changed=null})}function a(t,n,o){t.request(n,{type:"completions",types:!0,docs:!0,urls:!0},function(i,r){if(i)return H(t,n,i);var a=[],c="",l=r.start,u=r.end;'["'==n.getRange(M(l.line,l.ch-2),l)&&'"]'!=n.getRange(u,M(u.line,u.ch+2))&&(c='"]');for(var f=0;f<r.completions.length;++f){var d=r.completions[f],p=s(d.type);r.guess&&(p+=" "+j+"guess"),a.push({text:d.name+c,displayText:d.name,className:p,data:d})}var h={from:l,to:u,list:a},g=null;e.on(h,"close",function(){D(g)}),e.on(h,"update",function(){D(g)}),e.on(h,"select",function(e,n){D(g);var o=t.options.completionTip?t.options.completionTip(e.data):e.data.doc;o&&(g=k(n.parentNode.getBoundingClientRect().right+window.pageXOffset,n.getBoundingClientRect().top+window.pageYOffset,o),g.className+=" "+j+"hint-doc")}),o(h)})}function s(e){var t;return t="?"==e?"unknown":"number"==e||"string"==e||"bool"==e?e:/^fn\(/.test(e)?"fn":/^\[/.test(e)?"array":"object",j+"completion "+j+"completion-"+t}function c(e,t,n){e.request(t,"type",function(n,o){if(n)return H(e,t,n);if(e.options.typeTip)var i=e.options.typeTip(o);else{var i=w("span",null,w("strong",null,o.type||"not found"));o.doc&&i.appendChild(document.createTextNode(" \u2014 "+o.doc)),o.url&&(i.appendChild(document.createTextNode(" ")),i.appendChild(w("a",null,"[docs]")).href=o.url)}A(t,i)},n)}function l(t,n){if(S(t),!n.somethingSelected()){var o=n.getTokenAt(n.getCursor()).state,i=e.innerMode(n.getMode(),o);if("javascript"==i.mode.name){var r=i.state.lexical;if("call"==r.info){for(var a,s=r.pos||0,c=n.getOption("tabSize"),l=n.getCursor().line,d=Math.max(0,l-9),p=!1;l>=d;--l){for(var h=n.getLine(l),g=0,m=0;;){var v=h.indexOf("	",m);if(-1==v)break;g+=c-(v+g)%c-1,m=v+1}if(a=r.column-g,"("==h.charAt(a)){p=!0;break}}if(p){var y=M(l,a),C=t.cachedArgHints;return C&&C.doc==n.getDoc()&&0==R(y,C.start)?u(t,n,s):void t.request(n,{type:"type",preferFunction:!0,end:y},function(e,o){!e&&o.type&&/^fn\(/.test(o.type)&&(t.cachedArgHints={start:m,type:f(o.type),name:o.exprName||o.name||"fn",guess:o.guess,doc:n.getDoc()},u(t,n,s))})}}}}}function u(e,t,n){S(e);for(var o=e.cachedArgHints,i=o.type,r=w("span",o.guess?j+"fhint-guess":null,w("span",j+"fname",o.name),"("),a=0;a<i.args.length;++a){a&&r.appendChild(document.createTextNode(", "));var s=i.args[a];r.appendChild(w("span",j+"farg"+(a==n?" "+j+"farg-current":""),s.name||"?")),"?"!=s.type&&(r.appendChild(document.createTextNode(":\xa0")),r.appendChild(w("span",j+"type",s.type)))}r.appendChild(document.createTextNode(i.rettype?") ->\xa0":")")),i.rettype&&r.appendChild(w("span",j+"type",i.rettype));var c=t.cursorCoords(null,"page");e.activeArgHints=k(c.right+1,c.bottom,r)}function f(e){function t(t){for(var n=0,i=o;;){var r=e.charAt(o);if(t.test(r)&&!n)return e.slice(i,o);/[{\[\(]/.test(r)?++n:/[}\]\)]/.test(r)&&--n,++o}}var n=[],o=3;if(")"!=e.charAt(o))for(;;){var i=e.slice(o).match(/^([^, \(\[\{]+): /);if(i&&(o+=i[0].length,i=i[1]),n.push({name:i,type:t(/[\),]/)}),")"==e.charAt(o))break;o+=2}var r=e.slice(o).match(/^\) -> (.*)$/);return{args:n,rettype:r&&r[1]}}function d(e,t){function o(o){var i={type:"definition",variable:o||null},r=n(e,t.getDoc());e.server.request(x(e,r,i),function(n,o){if(n)return H(e,t,n);if(!o.file&&o.url)return void window.open(o.url);if(o.file){var i,a=e.docs[o.file];if(a&&(i=g(a.doc,o)))return e.jumpStack.push({file:r.name,start:t.getCursor("from"),end:t.getCursor("to")}),void h(e,r,a,i.start,i.end)}H(e,t,"Could not find a definition.")})}m(t)?o():T(t,"Jump to variable",function(e){e&&o(e)})}function p(e,t){var o=e.jumpStack.pop(),i=o&&e.docs[o.file];i&&h(e,n(e,t.getDoc()),i,o.start,o.end)}function h(e,t,n,o,i){n.doc.setSelection(o,i),t!=n&&e.options.switchToDoc&&(S(e),e.options.switchToDoc(n.name,n.doc))}function g(e,t){for(var n=t.context.slice(0,t.contextOffset).split("\n"),o=t.start.line-(n.length-1),i=M(o,(1==n.length?t.start.ch:e.getLine(o).length)-n[0].length),r=e.getLine(o).slice(i.ch),a=o+1;a<e.lineCount()&&r.length<t.context.length;++a)r+="\n"+e.getLine(a);if(r.slice(0,t.context.length)==t.context)return t;for(var s,c=e.getSearchCursor(t.context,0,!1),l=1/0;c.findNext();){var u=c.from(),f=1e4*Math.abs(u.line-i.line);f||(f=Math.abs(u.ch-i.ch)),l>f&&(s=u,l=f)}if(!s)return null;if(1==n.length?s.ch+=n[0].length:s=M(s.line+(n.length-1),n[n.length-1].length),t.start.line==t.end.line)var d=M(s.line,s.ch+(t.end.ch-t.start.ch));else var d=M(s.line+(t.end.line-t.start.line),t.end.ch);return{start:s,end:d}}function m(e){var t=e.getCursor("end"),n=e.getTokenAt(t);return n.start<t.ch&&("comment"==n.type||"string"==n.type)?!1:/\w/.test(e.getLine(t.line).slice(Math.max(t.ch-1,0),t.ch+1))}function v(e,t){var n=t.getTokenAt(t.getCursor());return/\w/.test(n.string)?void T(t,"New name for "+n.string,function(n){e.request(t,{type:"rename",newName:n,fullDocs:!0},function(n,o){return n?H(e,t,n):void C(e,o.changes)})}):H(e,t,"Not at a variable")}function y(e,t){var o=n(e,t.doc).name;e.request(t,{type:"refs"},function(n,i){if(n)return H(e,t,n);for(var r=[],a=0,s=0;s<i.refs.length;s++){var c=i.refs[s];c.file==o&&(r.push({anchor:c.start,head:c.end}),R(a,c.start)>=0&&R(a,c.end)<=0&&(a=r.length-1))}t.setSelections(r,a)})}function C(e,t){for(var n=Object.create(null),o=0;o<t.length;++o){var i=t[o];(n[i.file]||(n[i.file]=[])).push(i)}for(var r in n){var a=e.docs[r],s=n[r];if(a){s.sort(function(e,t){return R(t.start,e.start)});for(var c="*rename"+ ++O,o=0;o<s.length;++o){var i=s[o];a.doc.replaceRange(i.text,i.start,i.end,c)}}}}function x(e,t,n,o){var i=[],r=0,a=!n.fullDocs;a||delete n.fullDocs,"string"==typeof n&&(n={type:n}),n.lineCharPositions=!0,null==n.end&&(n.end=o||t.doc.getCursor("end"),t.doc.somethingSelected()&&(n.start=t.doc.getCursor("start")));var s=n.start||n.end;if(t.changed)if(t.doc.lineCount()>L&&a!==!1&&t.changed.to-t.changed.from<100&&t.changed.from<=s.line&&t.changed.to>n.end.line){i.push(b(t,s,n.end)),n.file="#0";var r=i[0].offsetLines;null!=n.start&&(n.start=M(n.start.line- -r,n.start.ch)),n.end=M(n.end.line-r,n.end.ch)}else i.push({type:"full",name:t.name,text:F(e,t)}),n.file=t.name,t.changed=null;else n.file=t.name;for(var c in e.docs){var l=e.docs[c];l.changed&&l!=t&&(i.push({type:"full",name:l.name,text:F(e,l)}),l.changed=null)}return{query:n,files:i}}function b(t,n,o){for(var i,r=t.doc,a=null,s=null,c=4,l=n.line-1,u=Math.max(0,l-50);l>=u;--l){var f=r.getLine(l),d=f.search(/\bfunction\b/);if(!(0>d)){var p=e.countColumn(f,null,c);null!=a&&p>=a||(a=p,s=l)}}null==s&&(s=u);var h=Math.min(r.lastLine(),o.line+20);if(null==a||a==e.countColumn(r.getLine(n.line),null,c))i=h;else for(i=o.line+1;h>i;++i){var p=e.countColumn(r.getLine(i),null,c);if(a>=p)break}var g=M(s,0);return{type:"part",name:t.name,offsetLines:g.line,text:r.getRange(g,M(i,0))}}function w(e,t){var n=document.createElement(e);t&&(n.className=t);for(var o=2;o<arguments.length;++o){var i=arguments[o];"string"==typeof i&&(i=document.createTextNode(i)),n.appendChild(i)}return n}function T(e,t,n){e.openDialog?e.openDialog(t+": <input type=text>",n):n(prompt(t,""))}function A(e,t){function n(){i.parentNode&&(e.off("cursorActivity",n),N(i))}var o=e.cursorCoords(),i=k(o.right+1,o.bottom,t);setTimeout(n,1700),e.on("cursorActivity",n)}function k(e,t,n){var o=w("div",j+"tooltip",n);return o.style.left=e+"px",o.style.top=t+"px",document.body.appendChild(o),o}function D(e){var t=e&&e.parentNode;t&&t.removeChild(e)}function N(e){e.style.opacity="0",setTimeout(function(){D(e)},1100)}function H(e,t,n){e.options.showError?e.options.showError(t,n):A(t,String(n))}function S(e){e.activeArgHints&&(D(e.activeArgHints),e.activeArgHints=null)}function F(e,t){var n=t.doc.getValue();return e.options.fileFilter&&(n=e.options.fileFilter(n,t.name,t.doc)),n}function q(e){function n(e,t){t&&(e.id=++i,r[i]=t),o.postMessage(e)}var o=new Worker(e.options.workerScript);o.postMessage({type:"init",defs:e.options.defs,plugins:e.options.plugins,scripts:e.options.workerDeps});var i=0,r={};o.onmessage=function(o){var i=o.data;"getFile"==i.type?t(e,i.name,function(e,t){n({type:"getFile",err:String(e),text:t,id:i.id})}):"debug"==i.type?window.console.log(i.message):i.id&&r[i.id]&&(r[i.id](i.err,i.body),delete r[i.id])},o.onerror=function(e){for(var t in r)r[t](e);r={}},this.addFile=function(e,t){n({type:"add",name:e,text:t})},this.delFile=function(e){n({type:"del",name:e})},this.request=function(e,t){n({type:"req",body:e},t)}}e.TernServer=function(e){var n=this;this.options=e||{};var o=this.options.plugins||(this.options.plugins={});o.doc_comment||(o.doc_comment=!0),this.server=this.options.useWorker?new q(this):new tern.Server({getFile:function(e,o){return t(n,e,o)},async:!0,defs:this.options.defs||[],plugins:o}),this.docs=Object.create(null),this.trackChange=function(e,t){i(n,e,t)},this.cachedArgHints=null,this.activeArgHints=null,this.jumpStack=[],this.getHint=function(e,t){return a(n,e,t)},this.getHint.async=!0},e.TernServer.prototype={addDoc:function(t,n){var o={doc:n,name:t,changed:null};return this.server.addFile(t,F(this,o)),e.on(n,"change",this.trackChange),this.docs[t]=o},delDoc:function(t){var n=o(this,t);n&&(e.off(n.doc,"change",this.trackChange),delete this.docs[n.name],this.server.delFile(n.name))},hideDoc:function(e){S(this);var t=o(this,e);t&&t.changed&&r(this,t)},complete:function(e){e.showHint({hint:this.getHint})},showType:function(e,t){c(this,e,t)},updateArgHints:function(e){l(this,e)},jumpToDef:function(e){d(this,e)},jumpBack:function(e){p(this,e)},rename:function(e){v(this,e)},selectName:function(e){y(this,e)},request:function(e,t,o,i){var r=this,a=n(this,e.getDoc()),s=x(this,a,t,i);this.server.request(s,function(e,n){!e&&r.options.responseFilter&&(n=r.options.responseFilter(a,t,s,e,n)),o(e,n)})}};var M=e.Pos,j="CodeMirror-Tern-",L=250,O=0,R=e.cmpPos});