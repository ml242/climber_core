window.CodeMirror={},function(){"use strict";function t(t){return t.split(/\r?\n|\r/)}function r(t){this.pos=this.start=0,this.string=t,this.lineStart=0}r.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(t){var r=this.string.charAt(this.pos);if("string"==typeof t)var e=r==t;else var e=r&&(t.test?t.test(r):t(r));return e?(++this.pos,r):void 0},eatWhile:function(t){for(var r=this.pos;this.eat(t););return this.pos>r},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skipToEnd:function(){this.pos=this.string.length},skipTo:function(t){var r=this.string.indexOf(t,this.pos);return r>-1?(this.pos=r,!0):void 0},backUp:function(t){this.pos-=t},column:function(){return this.start-this.lineStart},indentation:function(){return 0},match:function(t,r,e){if("string"!=typeof t){var n=this.string.slice(this.pos).match(t);return n&&n.index>0?null:(n&&r!==!1&&(this.pos+=n[0].length),n)}var i=function(t){return e?t.toLowerCase():t},o=this.string.substr(this.pos,t.length);return i(o)==i(t)?(r!==!1&&(this.pos+=t.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(t,r){this.lineStart+=t;try{return r()}finally{this.lineStart-=t}}},CodeMirror.StringStream=r,CodeMirror.startState=function(t,r,e){return t.startState?t.startState(r,e):!0};var e=CodeMirror.modes={},n=CodeMirror.mimeModes={};CodeMirror.defineMode=function(t,r){e[t]=r},CodeMirror.defineMIME=function(t,r){n[t]=r},CodeMirror.resolveMode=function(t){return"string"==typeof t&&n.hasOwnProperty(t)?t=n[t]:t&&"string"==typeof t.name&&n.hasOwnProperty(t.name)&&(t=n[t.name]),"string"==typeof t?{name:t}:t||{name:"null"}},CodeMirror.getMode=function(t,r){r=CodeMirror.resolveMode(r);var n=e[r.name];if(!n)throw new Error("Unknown mode: "+r);return n(t,r)},CodeMirror.registerHelper=CodeMirror.registerGlobalHelper=Math.min,CodeMirror.defineMode("null",function(){return{token:function(t){t.skipToEnd()}}}),CodeMirror.defineMIME("text/plain","null"),CodeMirror.runMode=function(r,e,n,i){var o=CodeMirror.getMode({indentUnit:2},e);if(1==n.nodeType){var s=i&&i.tabSize||4,a=n,h=0;a.innerHTML="",n=function(t,r){if("\n"==t)return a.appendChild(document.createElement("br")),void(h=0);for(var e="",n=0;;){var i=t.indexOf("	",n);if(-1==i){e+=t.slice(n),h+=t.length-n;break}h+=i-n,e+=t.slice(n,i);var o=s-h%s;h+=o;for(var u=0;o>u;++u)e+=" ";n=i+1}if(r){var d=a.appendChild(document.createElement("span"));d.className="cm-"+r.replace(/ +/g," cm-"),d.appendChild(document.createTextNode(e))}else a.appendChild(document.createTextNode(e))}}for(var u=t(r),d=i&&i.state||CodeMirror.startState(o),c=0,p=u.length;p>c;++c){c&&n("\n");var f=new CodeMirror.StringStream(u[c]);for(!f.string&&o.blankLine&&o.blankLine(d);!f.eol();){var l=o.token(f,d);n(f.current(),l,c,f.start,d),f.start=f.pos}}}}();