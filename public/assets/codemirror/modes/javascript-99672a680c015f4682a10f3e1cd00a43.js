!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){function n(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function a(e,t,r){return pt=e,vt=r,t}function i(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=o(r),t.tokenize(e,t);if("."==r&&e.match(/^\d+(?:[eE][+\-]?\d+)?/))return a("number","number");if("."==r&&e.match(".."))return a("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return a(r);if("="==r&&e.eat(">"))return a("=>","operator");if("0"==r&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),a("number","number");if(/\d/.test(r))return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),a("number","number");if("/"==r)return e.eat("*")?(t.tokenize=c,c(e,t)):e.eat("/")?(e.skipToEnd(),a("comment","comment")):"operator"==t.lastType||"keyword c"==t.lastType||"sof"==t.lastType||/^[\[{}\(,;:]$/.test(t.lastType)?(n(e),e.eatWhile(/[gimy]/),a("regexp","string-2")):(e.eatWhile(gt),a("operator","operator",e.current()));if("`"==r)return t.tokenize=u,u(e,t);if("#"==r)return e.skipToEnd(),a("error","error");if(gt.test(r))return e.eatWhile(gt),a("operator","operator",e.current());e.eatWhile(/[\w\$_]/);var i=e.current(),l=ht.propertyIsEnumerable(i)&&ht[i];return l&&"."!=t.lastType?a(l.type,l.style,i):a("variable","variable",i)}function o(e){return function(t,r){var n,o=!1;if(bt&&"@"==t.peek()&&t.match(wt))return r.tokenize=i,a("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||o);)o=!o&&"\\"==n;return o||(r.tokenize=i),a("string","string")}}function c(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=i;break}n="*"==r}return a("comment","comment")}function u(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=i;break}n=!n&&"\\"==r}return a("quasi","string-2",e.current())}function l(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(0>r)){for(var n=0,a=!1,i=r-1;i>=0;--i){var o=e.string.charAt(i),c=jt.indexOf(o);if(c>=0&&3>c){if(!n){++i;break}if(0==--n)break}else if(c>=3&&6>c)++n;else if(/[$\w]/.test(o))a=!0;else if(a&&!n){++i;break}}a&&!n&&(t.fatArrowAt=i)}}function s(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function f(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(var r=n.vars;r;r=r.next)if(r.name==t)return!0}function d(e,t,r,n,a){var i=e.cc;for(Vt.state=e,Vt.stream=a,Vt.marked=null,Vt.cc=i,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){var o=i.length?i.pop():kt?w:g;if(o(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return Vt.marked?Vt.marked:"variable"==r&&f(e,n)?"variable-2":t}}}function p(){for(var e=arguments.length-1;e>=0;e--)Vt.cc.push(arguments[e])}function v(){return p.apply(null,arguments),!0}function m(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}var n=Vt.state;if(n.context){if(Vt.marked="def",t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;r.globalVars&&(n.globalVars={name:e,next:n.globalVars})}}function y(){Vt.state.context={prev:Vt.state.context,vars:Vt.state.localVars},Vt.state.localVars=Et}function b(){Vt.state.localVars=Vt.state.context.vars,Vt.state.context=Vt.state.context.prev}function k(e,t){var r=function(){var r=Vt.state,n=r.indented;"stat"==r.lexical.type&&(n=r.lexical.indented),r.lexical=new s(n,Vt.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function x(){var e=Vt.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function h(e){function t(r){return r==e?v():";"==e?p():v(t)}return t}function g(e,t){return"var"==e?v(k("vardef",t.length),D,h(";"),x):"keyword a"==e?v(k("form"),w,g,x):"keyword b"==e?v(k("form"),g,x):"{"==e?v(k("}"),U,x):";"==e?v():"if"==e?("else"==Vt.state.lexical.info&&Vt.state.cc[Vt.state.cc.length-1]==x&&Vt.state.cc.pop()(),v(k("form"),w,g,x,L)):"function"==e?v(et):"for"==e?v(k("form"),Q,g,x):"variable"==e?v(k("stat"),$):"switch"==e?v(k("form"),w,k("}","switch"),h("{"),U,x,x):"case"==e?v(w,h(":")):"default"==e?v(h(":")):"catch"==e?v(k("form"),y,h("("),tt,h(")"),g,x,b):"module"==e?v(k("form"),y,it,b,x):"class"==e?v(k("form"),rt,at,x):"export"==e?v(k("form"),ot,x):"import"==e?v(k("form"),ct,x):p(k("stat"),w,h(";"),x)}function w(e){return M(e,!1)}function j(e){return M(e,!0)}function M(e,t){if(Vt.state.fatArrowAt==Vt.stream.start){var r=t?O:C;if("("==e)return v(y,k(")"),N(F,")"),x,h("=>"),r,b);if("variable"==e)return p(y,F,h("=>"),r,b)}var n=t?T:z;return Mt.hasOwnProperty(e)?v(n):"function"==e?v(et,n):"keyword c"==e?v(t?E:V):"("==e?v(k(")"),V,dt,h(")"),x,n):"operator"==e||"spread"==e?v(t?j:w):"["==e?v(k("]"),st,x,n):"{"==e?H(P,"}",null,n):"quasi"==e?p(I,n):v()}function V(e){return e.match(/[;\}\)\],]/)?p():p(w)}function E(e){return e.match(/[;\}\)\],]/)?p():p(j)}function z(e,t){return","==e?v(w):T(e,t,!1)}function T(e,t,r){var n=0==r?z:T,a=0==r?w:j;return"=>"==t?v(y,r?O:C,b):"operator"==e?/\+\+|--/.test(t)?v(n):"?"==t?v(w,h(":"),a):v(a):"quasi"==e?p(I,n):";"!=e?"("==e?H(j,")","call",n):"."==e?v(q,n):"["==e?v(k("]"),V,h("]"),x,n):void 0:void 0}function I(e,t){return"quasi"!=e?p():"${"!=t.slice(t.length-2)?v(I):v(w,A)}function A(e){return"}"==e?(Vt.marked="string-2",Vt.state.tokenize=u,v(I)):void 0}function C(e){return l(Vt.stream,Vt.state),p("{"==e?g:w)}function O(e){return l(Vt.stream,Vt.state),p("{"==e?g:j)}function $(e){return":"==e?v(x,g):p(z,h(";"),x)}function q(e){return"variable"==e?(Vt.marked="property",v()):void 0}function P(e,t){if("variable"==e){if(Vt.marked="property","get"==t||"set"==t)return v(W)}else if("number"==e||"string"==e)Vt.marked=bt?"property":e+" property";else if("["==e)return v(w,h("]"),S);return Mt.hasOwnProperty(e)?v(S):void 0}function W(e){return"variable"!=e?p(S):(Vt.marked="property",v(et))}function S(e){return":"==e?v(j):"("==e?p(et):void 0}function N(e,t){function r(n){if(","==n){var a=Vt.state.lexical;return"call"==a.info&&(a.pos=(a.pos||0)+1),v(e,r)}return n==t?v():v(h(t))}return function(n){return n==t?v():p(e,r)}}function H(e,t,r){for(var n=3;n<arguments.length;n++)Vt.cc.push(arguments[n]);return v(k(t,r),N(e,t),x)}function U(e){return"}"==e?v():p(g,U)}function _(e){return xt&&":"==e?v(B):void 0}function B(e){return"variable"==e?(Vt.marked="variable-3",v()):void 0}function D(){return p(F,_,J,K)}function F(e,t){return"variable"==e?(m(t),v()):"["==e?H(F,"]"):"{"==e?H(G,"}"):void 0}function G(e,t){return"variable"!=e||Vt.stream.match(/^\s*:/,!1)?("variable"==e&&(Vt.marked="property"),v(h(":"),F,J)):(m(t),v(J))}function J(e,t){return"="==t?v(j):void 0}function K(e){return","==e?v(D):void 0}function L(e,t){return"keyword b"==e&&"else"==t?v(k("form","else"),g,x):void 0}function Q(e){return"("==e?v(k(")"),R,h(")"),x):void 0}function R(e){return"var"==e?v(D,h(";"),Y):";"==e?v(Y):"variable"==e?v(X):p(w,h(";"),Y)}function X(e,t){return"in"==t||"of"==t?(Vt.marked="keyword",v(w)):v(z,Y)}function Y(e,t){return";"==e?v(Z):"in"==t||"of"==t?(Vt.marked="keyword",v(w)):p(w,h(";"),Z)}function Z(e){")"!=e&&v(w)}function et(e,t){return"*"==t?(Vt.marked="keyword",v(et)):"variable"==e?(m(t),v(et)):"("==e?v(y,k(")"),N(tt,")"),x,g,b):void 0}function tt(e){return"spread"==e?v(tt):p(F,_)}function rt(e,t){return"variable"==e?(m(t),v(nt)):void 0}function nt(e,t){return"extends"==t?v(w):void 0}function at(e){return"{"==e?H(P,"}"):void 0}function it(e,t){return"string"==e?v(g):"variable"==e?(m(t),v(lt)):void 0}function ot(e,t){return"*"==t?(Vt.marked="keyword",v(lt,h(";"))):"default"==t?(Vt.marked="keyword",v(w,h(";"))):p(g)}function ct(e){return"string"==e?v():p(ut,lt)}function ut(e,t){return"{"==e?H(ut,"}"):("variable"==e&&m(t),v())}function lt(e,t){return"from"==t?(Vt.marked="keyword",v(w)):void 0}function st(e){return"]"==e?v():p(j,ft)}function ft(e){return"for"==e?p(dt,h("]")):","==e?v(N(j,"]")):p(N(j,"]"))}function dt(e){return"for"==e?v(Q,dt):"if"==e?v(w,dt):void 0}var pt,vt,mt=t.indentUnit,yt=r.statementIndent,bt=r.jsonld,kt=r.json||bt,xt=r.typescript,ht=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("operator"),i={type:"atom",style:"atom"},o={"if":e("if"),"while":t,"with":t,"else":r,"do":r,"try":r,"finally":r,"return":n,"break":n,"continue":n,"new":n,"delete":n,"throw":n,"debugger":n,"var":e("var"),"const":e("var"),let:e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":a,"typeof":a,"instanceof":a,"true":i,"false":i,"null":i,undefined:i,NaN:i,Infinity:i,"this":e("this"),module:e("module"),"class":e("class"),"super":e("atom"),"yield":n,"export":e("export"),"import":e("import"),"extends":n};if(xt){var c={type:"variable",style:"variable-3"},u={"interface":e("interface"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),string:c,number:c,bool:c,any:c};for(var l in u)o[l]=u[l]}return o}(),gt=/[+\-*&%=<>!?|~^]/,wt=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,jt="([{}])",Mt={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},Vt={state:null,column:null,marked:null,cc:null},Et={name:"this",next:{name:"arguments"}};return x.lex=!0,{startState:function(e){var t={tokenize:i,lastType:"sof",cc:[],lexical:new s((e||0)-mt,0,"block",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),l(e,t)),t.tokenize!=c&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==pt?r:(t.lastType="operator"!=pt||"++"!=vt&&"--"!=vt?pt:"incdec",d(t,r,pt,vt,e))},indent:function(t,n){if(t.tokenize==c)return e.Pass;if(t.tokenize!=i)return 0;var a=n&&n.charAt(0),o=t.lexical;if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var l=t.cc[u];if(l==x)o=o.prev;else if(l!=L)break}"stat"==o.type&&"}"==a&&(o=o.prev),yt&&")"==o.type&&"stat"==o.prev.type&&(o=o.prev);var s=o.type,f=a==s;return"vardef"==s?o.indented+("operator"==t.lastType||","==t.lastType?o.info+1:0):"form"==s&&"{"==a?o.indented:"form"==s?o.indented+mt:"stat"==s?o.indented+("operator"==t.lastType||","==t.lastType?yt||mt:0):"switch"!=o.info||f||0==r.doubleIndentSwitch?o.align?o.column+(f?0:1):o.indented+(f?0:mt):o.indented+(/^(?:case|default)\b/.test(n)?mt:2*mt)},electricChars:":{}",blockCommentStart:kt?null:"/*",blockCommentEnd:kt?null:"*/",lineComment:kt?null:"//",fold:"brace",helperType:kt?"json":"javascript",jsonldMode:bt,jsonMode:kt}}),e.registerHelper("wordChars","javascript",/[\\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});