!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t){for(var r=0,i=e.length;i>r;++r)t(e[r])}function r(e,t){if(!Array.prototype.indexOf){for(var r=e.length;r--;)if(e[r]===t)return!0;return!1}return-1!=e.indexOf(t)}function i(t,r,i){var n=t.getCursor(),s=i(t,n),a=s;if(/^[\w$_]*$/.test(s.string)||(s=a={start:n.ch,end:n.ch,string:"",state:s.state,className:":"==s.string?"python-type":null}),!l)var l=[];l.push(a);var p=o(s,l);return p=p.sort(),{list:p,from:e.Pos(n.line,s.start),to:e.Pos(n.line,s.end)}}function n(e){return i(e,l,function(e,t){return e.getTokenAt(t)})}function o(e,i){function n(e){0!=e.lastIndexOf(p,0)||r(s,e)||s.push(e)}function o(){t(c,n),t(f,n),t(a,n),t(l,n)}var s=[],p=e.string;if(i){var u,d=i.pop();for("variable"==d.type?u=d.string:"variable-3"==d.type&&(u=":"+d.string);null!=u&&i.length;)u=u[i.pop().string];null!=u&&o(u)}return s}e.registerHelper("hint","python",n);var s="and del from not while as elif global or with assert else if pass yieldbreak except import print class exec in raise continue finally is return def for lambda try",a=s.split(" "),l=s.toUpperCase().split(" "),p="abs divmod input open staticmethod all enumerate int ord str any eval isinstance pow sum basestring execfile issubclass print superbin file iter property tuple bool filter len range typebytearray float list raw_input unichr callable format locals reduce unicodechr frozenset long reload vars classmethod getattr map repr xrangecmp globals max reversed zip compile hasattr memoryview round __import__complex hash min set apply delattr help next setattr bufferdict hex object slice coerce dir id oct sorted intern ",c=p.split(" ").join("() ").split(" "),f=p.toUpperCase().split(" ").join("() ").split(" ")});