webpackJsonp([0],{100:function(e,t,r){"use strict";function n(e,t){return new a.Stream(new u(e,t))}var a=r(0),u=function(){function e(e,t){this.diagram=e.trim(),this.errorVal=t&&t.errorValue?t.errorValue:"#",this.timeUnit=t&&t.timeUnit?t.timeUnit:20,this.values=t&&t.values?t.values:{},this.tasks=[]}return e.prototype._start=function(e){for(var t=this.diagram.length,r=0;r<t;r++){var n=this.diagram[r],a=this.timeUnit*r;switch(n){case"-":break;case"#":this.schedule({type:"error",value:this.errorVal,time:a},e);break;case"|":this.schedule({type:"complete",time:a},e);break;default:var u=this.values.hasOwnProperty(n)?this.values[n]:n;this.schedule({type:"next",value:u,time:a},e)}}},e.prototype.schedule=function(e,t){var r=setInterval(function(){switch(e.type){case"next":t._n(e.value);break;case"error":t._e(e.value);break;case"complete":t._c()}clearInterval(r)},e.time)},e.prototype._stop=function(){this.tasks.forEach(function(e){return clearInterval(e)})},e}();t.DiagramProducer=u,Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},101:function(e,t,r){e.exports=r(31)},31:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(95),a=r(10),u=r(93),i=r(92);r(16).run(n.default,{dom:a.makeDOMDriver("#app"),routes:u.makeRoutesDriver(),data:i.makeDataDriver()})},91:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r(100);t.operators=["map","mapTo","filter","take","drop","last","startWith","endWhen","fold","replaceError","flatten","compose","remember","debug","imitate"];var n=function(e,t){return Array.apply(null,Array(e)).map(String.prototype.valueOf,t).join("")+"|"},a=n(100,"-"),u=(n(100,"a"),function(e){return(" "+e).slice(1)}),i=function(e,t,r){var n=u(r);return n.substr(0,e)+"x"+n.substr(e+1)};t.examples={map:{inputs:[{value:i(25,0,i(12,0,a)),options:{values:{a:"1",b:"2"}}}],label:"map(x => x * 10)",operate:function(e){return[e.map(function(e){return 10*parseInt(e)}).map(function(e){return e.toString()})]}}}},92:function(e,t,r){"use strict";function n(){function e(e){return new i(e)}return e}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),u=r(91),i=function(){function e(e){var t=a.Stream;e.addListener({next:function(){},error:function(){},complete:function(){}}),this.data$=e.map(function(e){return t.of(u.examples[e])}).flatten()}return e}();t.DataSource=i,t.makeDataDriver=n,t.default=n},93:function(e,t,r){"use strict";function n(){function e(e){return new i(e)}return e}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),u=function(){function e(){var e=this;this.start=function(t){e.stream=t,window.addEventListener("hashchange",e.handler)},this.stop=function(){window.removeEventListener("hashchange",e.handler),e.stream=null},this.stream=null,this.handler=function(t){return e.stream.next(t)}}return e}(),i=function(){function e(e){e.addListener({next:function(e){window.location.hash="/"+e},error:function(){},complete:function(){}});var t=a.Stream,r=new u,n=t.create(r).map(function(e){return e.target.location.hash.replace("#","")}).map(function(e){return(e||"").replace("/","")}).startWith(window.location.hash.replace("#","")||"");this.route$=n}return e}();t.RoutesSource=i,t.makeRoutesDriver=n,t.default=n},94:function(e,t,r){"use strict";function n(e){return{name$:e.dom.select(".field").events("input").map(function(e){return e.target.value}).startWith("")}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},95:function(e,t,r){"use strict";function n(e){var t=o.Stream;e.routes.route$.addListener({next:function(e){return console.log("route: "+e)},error:function(){},complete:function(){}}),e.data.data$.addListener({next:function(e){return console.log(e)},error:function(){},complete:function(){}});var r=u.default(a.default(e)),n=i.default(r),s=t.of("map");return{dom:n,routes:s,data:s}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(94),u=r(96),i=r(97),o=r(0);t.default=n},96:function(e,t,r){"use strict";function n(e){var t=a.Stream,r=[{data:"2",time:1},{data:"3",time:10},{data:"5",time:15},{data:"7",time:20},{data:"11",time:25},{data:"13",time:30}];return{marbles$:t.of(r)}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0);t.default=n},97:function(e,t,r){"use strict";function n(e){return i.div(".marble",{style:{"z-index":e.time,left:"calc("+e.time+"% - 32px)"}},[i.span([e.data])])}function a(e){u.Stream;return e.marbles$.map(function(e){return i.div("#root",[i.div("#container",[i.div(".stream",e.map(n))])])})}Object.defineProperty(t,"__esModule",{value:!0});var u=r(0),i=r(10);t.default=a}},[101]);