(window["webpackJsonpreact-antd-admin"]=window["webpackJsonpreact-antd-admin"]||[]).push([[21],{214:function(e,t,n){"use strict";var a=function(e){};e.exports=function(e,t,n,r,i,o,c,s){if(a(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,i,o,c,s],d=0;(l=new Error(t.replace(/%s/g,function(){return u[d++]}))).name="Invariant Violation"}throw l.framesToPop=1,l}}},257:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return a})},818:function(e,t,n){},819:function(e,t,n){e.exports=n.p+"static/media/header1.67c21850.png"},820:function(e,t,n){e.exports=n.p+"static/media/header2.992b6972.png"},890:function(e,t,n){"use strict";n.r(t);n(129);var a,r=n(91),i=(n(348),n(390)),o=n(257),c=n(24),s=n.n(c),l=n(41),u=n(78),d=n(79),m=n(80),h=n(81),p=n(82),f=n(0),v=n.n(f),b=(n(409),n(32)),y=(n(54),n(87)),g=n(410),w=n.n(g),E=n(411),S=(n(818),n(98)),O=n(23);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var L=Object(y.b)(function(e){return{user:e.user,websocket:e.websocket,chatList:e.chatList,onlineList:e.onlineList}},function(e){return Object(O.b)({initChatList:b.g,initWebsocket:b.h},e)})(a=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={editorState:w.a.createEditorState(null),userList:[]},n.getUserList=Object(l.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(S.b)();case 2:return t=e.sent,e.next=5,n.setState({userList:t.data||[]});case 5:n.handleUserList();case 6:case"end":return e.stop()}},e)})),n.handleUserList=function(){var e=n.state.userList,t=n.props.onlineList,a=[],r=[],i=[],c=!0,s=!1,l=void 0;try{for(var u,d=function(){var e=u.value,n=t.find(function(t){return t.id===e.id}),c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach(function(t){Object(o.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e,{online:!!n});e.isAdmin?a.push(c):n?r.push(c):i.push(c)},m=e[Symbol.iterator]();!(c=(u=m.next()).done);c=!0)d()}catch(h){s=!0,l=h}finally{try{c||null==m.return||m.return()}finally{if(s)throw l}}n.setState({userList:a.concat(r,i)})},n.handleEditorChange=function(e){n.setState({editorState:e})},n.handleKeyCommand=function(e){return"split-block"===e?(n.onSend(),"handled"):"not-handled"},n.onSend=function(){var e=n.state.editorState,t=e.toHTML(),a=n.props.websocket;return e.isEmpty()?i.a.warning("\u8bf7\u5148\u8f93\u5165\u804a\u5929\u5185\u5bb9"):(console.log(a),1!==a.readyState?(n.props.initWebsocket(n.props.user),i.a.warning("\u6d88\u606f\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u53d1\u9001")):(a.send(JSON.stringify({content:t})),void n.setState({editorState:E.ContentUtils.clear(n.state.editorState)})))},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.websocket),this.props.websocket&&1!==this.props.websocket.readyState&&this.props.initWebsocket(this.props.user),this.getUserList()}},{key:"render",value:function(){var e=this,t=this.state,a=t.editorState,i=(t.userList,this.props),o=i.chatList,c=i.user;i.onlineList;return v.a.createElement("div",{className:"chat-container",ref:function(t){return e.chatContainer=t}},v.a.createElement("div",{className:"chat-box",ref:function(t){return e.chatBox=t}},v.a.createElement("div",{className:"chat-header",onMouseDown:this.onMouseDown,onMouseMove:this.onMouseMove,ref:function(t){return e.chatHeader=t}},v.a.createElement("div",{className:"header-left"},v.a.createElement("img",{src:n(819),alt:""})),v.a.createElement("div",{className:"header-center"},v.a.createElement("img",{src:n(820),alt:""})),v.a.createElement("div",{className:"header-right"},v.a.createElement(r.a,{src:c.avatar}))),v.a.createElement("div",{className:"chat-body"},v.a.createElement("div",{className:"main"},v.a.createElement("div",{className:"chat-list",ref:function(t){return e.chatListDom=t}},o&&o.map(function(t,n){return v.a.createElement("div",{key:t.id,className:"chat-item"},(0===n||t.createTime-o[n-1].createTime>18e4)&&v.a.createElement("div",{className:"time"},e.handleTime(t.createTime)),v.a.createElement("div",{className:"chat-item-info ".concat(c.id===t.userId?"chat-right":"")},v.a.createElement("div",null,v.a.createElement(r.a,{src:t.userAvatar})),v.a.createElement("div",{className:"chat-main"},v.a.createElement("div",{className:"username"},t.username),v.a.createElement("div",{className:"chat-content",dangerouslySetInnerHTML:{__html:t.content}}))))})),v.a.createElement("div",{className:"chat-editor-wrapper"},v.a.createElement(w.a,{draftProps:{handleKeyCommand:this.handleKeyCommand},value:a,onChange:this.handleEditorChange,contentStyle:k.contentStyle,controlBarStyle:k.controlBarStyle,controls:["emoji","italic","text-color","separator","separator"]}))))))}}]),t}(v.a.Component))||a,k={contentStyle:{height:100,paddingBottom:0,transform:"translateY(-15px)",fontSize:14},controlBarStyle:{boxShadow:"none"},center:{display:"flex",justifyContent:"center",alignItems:"center"}};t.default=L}}]);