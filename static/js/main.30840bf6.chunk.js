(this.webpackJsonpkta=this.webpackJsonpkta||[]).push([[0],{10:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return j})),n.d(t,"d",(function(){return d})),n.d(t,"a",(function(){return b}));var c=n(23),r=n(6),a=n.n(r),s=n(11),i=n(7),u=n(2),o=function(){var e=Object(s.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.dbService.collection("relationship").doc().set({requestorId:t,receiverId:n,requestedAt:Date.now()});case 2:console.log(t);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),j=function(){var e=Object(s.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.dbService.collection("relationship").where("requestorId","==",t).where("receiverId","==",n).get();case 2:e.sent.docs[0].ref.delete();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),d=function(){var e=Object(s.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.dbService.doc("profile/".concat(t.userId)).set(Object(c.a)(Object(c.a)({},t),{},{revisedAt:Date.now()}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=Object(u.createContext)({})},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return x})),n.d(t,"c",(function(){return g}));var c=n(5),r=n(7).dbService,a=n(2),s=a.useState,i=a.useEffect,u=function(e,t){var n=s(!1),a=Object(c.a)(n,2),u=a[0],o=a[1],j=s(!1),d=Object(c.a)(j,2),b=d[0],l=d[1];return i((function(){return e===t&&l(!0),r.collection("relationship").where("requestorId","==",e).where("receiverId","==",t).onSnapshot((function(e){o(!e.empty)}))}),[e,t]),[u,b]},o=n(6),j=n.n(o),d=n(11),b=n(1),l=n(28).default,f=n(7).dbService,p=n(2),h=p.useState,O=p.useEffect,x=function(e){var t=h([]),n=Object(c.a)(t,2),r=n[0],a=n[1];return O((function(){e&&function(){var t=Object(d.a)(j.a.mark((function t(){var n,c,r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.collection("relationship").where("requestorId","==",e).get();case 2:return n=t.sent,c=n.docs.map((function(e){return f.doc("profile/".concat(e.data().receiverId)).get()})),t.next=6,Promise.all(c);case 6:r=t.sent,a(r.map((function(e){return Object(b.jsx)(l,{otherData:e.data()},e.data().userId)})));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[e]),r},v=n(28),m=n(2).useState,g=function(){var e=m([]),t=Object(c.a)(e,2),n=t[0],r=t[1];return[n,function(e){r(e.map((function(e){return Object(b.jsx)(v.default,{otherData:e.data()},e.data().userId)})))}]}},25:function(e,t,n){"use strict";var c=n(5),r=n(1),a=n(19),s=n(2),i=n(10);n(46);t.a=function(e){var t=e.otherId,n=Object(s.useContext)(i.a),u=Object(a.a)(n.userId,t),o=Object(c.a)(u,2),j=o[0];return o[1]?Object(r.jsx)("button",{className:"friendbutton",children:"it's you!"}):Object(r.jsx)("button",{onClick:function(){j?Object(i.b)(n.userId,t):Object(i.c)(n.userId,t)},className:"friendbutton",children:j?"delete friend":"add friend"})}},28:function(e,t,n){"use strict";n.r(t);var c=n(1),r=(n(2),n(17)),a=n(25);n(47);t.default=function(e){var t=e.otherData;return Object(c.jsxs)("li",{className:"smallprofile",children:[Object(c.jsx)("p",{children:t.userName}),Object(c.jsx)("p",{children:t.unit}),Object(c.jsx)(r.b,{to:"/profile/".concat(t.userId),children:"see profile"}),Object(c.jsx)(a.a,{otherId:t.userId})]})}},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(2),a=n.n(r),s=n(32),i=n.n(s),u=n(5),o=n(7),j=n(10),d=n(23),b=n(17),l=n(8),f=n(6),p=n.n(f),h=n(11),O=(n(45),function(){var e=new o.firebaseInstance.auth.GoogleAuthProvider,t=function(){var t=Object(h.a)(p.a.mark((function t(){var n,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.authService.signInWithPopup(e);case 2:return n=t.sent,t.next=5,o.dbService.doc("profile/".concat(n.user.uid)).get();case 5:t.sent.exists||(c={userId:n.user.uid,userName:n.user.displayName,unit:""},Object(j.d)(c));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.jsxs)("div",{className:"auth",children:[Object(c.jsx)("p",{children:"Sign in"}),Object(c.jsx)("button",{onClick:t,children:"Google"})]})}),x=n(19),v=(n(52),function(){var e=Object(r.useState)(""),t=Object(u.a)(e,2),n=t[0],a=t[1],s=Object(x.c)(),i=Object(u.a)(s,2),j=i[0],d=i[1],b=function(){var e=Object(h.a)(p.a.mark((function e(t){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,o.dbService.collection("profile").where("userName","==",n).get();case 3:c=e.sent,d(c.docs);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(c.jsxs)("div",{className:"home",children:[Object(c.jsx)("p",{children:"are you looking for someone?"}),Object(c.jsxs)("form",{onSubmit:b,className:"searchForm",children:[Object(c.jsx)("input",{type:"text",placeholder:"type name here...",onChange:function(e){var t=e.target.value;a(t)}}),Object(c.jsx)("input",{type:"submit",value:"search"})]}),Object(c.jsx)("ul",{className:"usersfoundlist",children:j})]})}),m=(n(53),function(e){var t=e.setIsLoggedIn,n=Object(r.useContext)(j.a),a=Object(l.g)();return Object(c.jsx)("nav",{className:"navigation",children:Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:Object(c.jsx)(b.b,{to:"/",children:"Home"})}),Object(c.jsx)("li",{children:Object(c.jsx)(b.b,{to:"/myprofile",children:null===n||void 0===n?void 0:n.userName})}),Object(c.jsx)("li",{children:Object(c.jsx)(b.b,{to:"/openchat",children:"Openchat"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{onClick:function(){o.authService.signOut(),t(!1),a.push("/")},children:"Sign out"})})]})})}),g=function(){var e=Object(r.useContext)(j.a),t=Object(r.useState)(e.userName),n=Object(u.a)(t,2),a=n[0],s=n[1],i=Object(r.useState)(e.unit),d=Object(u.a)(i,2),b=d[0],l=d[1],f=function(e){var t=e.target,n=t.name,c=t.value;"name"===n?s(c):"unit"===n&&l(c)},O=function(){var t=Object(h.a)(p.a.mark((function t(n){var c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),c={userId:e.userId,userName:a,unit:b},Object(j.d)(c);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){return o.dbService.doc("profile/".concat(e.userId)).onSnapshot((function(e){var t;l(null===(t=e.data())||void 0===t?void 0:t.unit)}))}),[e]),Object(c.jsxs)("form",{onSubmit:O,children:[Object(c.jsx)("input",{type:"text",name:"name",placeholder:"name",value:a,onChange:f}),Object(c.jsx)("input",{type:"text",placeholder:"unit that you belong to",name:"unit",value:b||"",onChange:f}),Object(c.jsx)("input",{type:"submit",value:"update profile"})]})},I=(n(54),function(){var e=Object(r.useContext)(j.a),t=Object(x.b)(e.userId);return Object(c.jsxs)("div",{className:"myprofile",children:[Object(c.jsx)("p",{children:"my profile"}),Object(c.jsx)(g,{}),Object(c.jsx)("p",{children:"friends"}),Object(c.jsx)("ul",{className:"friendslist",children:t})]})}),S=n(25),w=(n(55),function(e){var t=e.match,n=Object(r.useState)(null),a=Object(u.a)(n,2),s=a[0],i=a[1];Object(r.useEffect)((function(){(function(){var e=Object(h.a)(p.a.mark((function e(){var n,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.dbService.doc("profile/".concat(t.params.userId)).get();case 2:n=e.sent,c=n.data(),i(c);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t]);var j=Object(x.b)(null===s||void 0===s?void 0:s.userId);return Object(c.jsxs)("div",{className:"otherprofile",children:[Object(c.jsxs)("p",{children:[null===s||void 0===s?void 0:s.userName,"'s profile"]}),Object(c.jsxs)("p",{children:["unit : ",null===s||void 0===s?void 0:s.unit]}),Object(c.jsx)("p",{children:"list of friends"}),s?Object(c.jsx)("ul",{className:"friendslist",children:j}):Object(c.jsx)("p",{children:"loading"}),s&&Object(c.jsx)(S.a,{otherId:s.userId})]})}),y=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{children:"Page Not Found"}),Object(c.jsx)(b.b,{to:"/",children:"home"})]})},k=(n(56),function(){return Object(c.jsxs)("div",{className:"footer",children:[Object(c.jsx)("p",{children:"SGT Park"}),Object(c.jsxs)("p",{children:["Do you have any ideas for kta? Go to"," ",Object(c.jsx)("a",{href:"https://github.com/ParkChangSun/kta",children:"Github"})]})]})}),N=function(){var e=Object(r.useContext)(j.a),t=Object(r.useState)(""),n=Object(u.a)(t,2),a=n[0],s=n[1],i=Object(r.useState)([]),d=Object(u.a)(i,2),b=d[0],l=d[1],f=function(){var t=Object(h.a)(p.a.mark((function t(n){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,o.dbService.collection("chat").doc().set({timestamp:Date.now(),userId:e.userId,data:a});case 3:s("");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){return o.dbService.collection("chat").onSnapshot((function(e){l(e.docs.map((function(e,t){return Object(c.jsx)("li",{children:e.data().data},t)})))}))}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("ul",{className:b,children:b}),Object(c.jsxs)("form",{onSubmit:f,children:[Object(c.jsx)("input",{type:"text",value:a,onChange:function(e){var t=e.target.value;s(t)}}),Object(c.jsx)("input",{type:"submit",value:"chat"})]})]})},C=function(e){var t=e.isLoggedIn,n=e.setIsLoggedIn;return Object(c.jsxs)(b.a,{basename:"/kta",children:[t&&Object(c.jsx)(m,{setIsLoggedIn:n}),t?Object(c.jsxs)(l.d,{children:[Object(c.jsx)(l.b,{exact:!0,path:"/",children:Object(c.jsx)(v,{})}),Object(c.jsx)(l.b,{path:"/myprofile",children:Object(c.jsx)(I,{})}),Object(c.jsx)(l.b,{path:"/profile/:userId",render:function(e){return Object(c.jsx)(w,Object(d.a)({},e))}}),Object(c.jsx)(l.b,{path:"/openchat",children:Object(c.jsx)(N,{})}),Object(c.jsx)(l.b,{component:y})]}):Object(c.jsxs)(l.d,{children:[Object(c.jsx)(l.b,{exact:!0,path:"/",children:Object(c.jsx)(O,{})}),Object(c.jsx)(l.a,{from:"*",to:"/"})]}),Object(c.jsx)(k,{})]})},D=function(){return Object(c.jsx)("p",{children:"Loading..."})};var E=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(null),i=Object(u.a)(s,2),d=i[0],b=i[1],l=Object(r.useState)(!1),f=Object(u.a)(l,2),p=f[0],h=f[1],O=Object(r.useState)(null),x=Object(u.a)(O,2),v=x[0],m=x[1];return Object(r.useEffect)((function(){o.authService.onAuthStateChanged((function(e){e?(m(e.uid),h(!0)):m("")}))}),[]),Object(r.useEffect)((function(){if(""!==v)return o.dbService.doc("profile/".concat(v)).onSnapshot((function(e){b(e.data()),a(!0)}));console.log("userid is null"),a(!0)}),[v]),Object(c.jsx)(j.a.Provider,{value:d,children:n?Object(c.jsx)(C,{isLoggedIn:p,setIsLoggedIn:h}):Object(c.jsx)(D,{})})};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root"))},7:function(e,t,n){"use strict";n.r(t),n.d(t,"firebaseInstance",(function(){return r})),n.d(t,"authService",(function(){return a})),n.d(t,"dbService",(function(){return s})),n.d(t,"storageService",(function(){return i}));var c=n(21);n(39),n(41),n(58);c.a.initializeApp({apiKey:"AIzaSyC6I6OeQ0ByUaSJC2Ccsw7zxlbIGVPK0Uc",authDomain:"kta-backend.firebaseapp.com",databaseURL:"https://kta-backend.firebaseio.com",projectId:"kta-backend",storageBucket:"kta-backend.appspot.com",messagingSenderId:"775346930766",appId:"1:775346930766:web:174452c5fa046bd6be6f1f"});var r=c.a,a=c.a.auth(),s=c.a.firestore(),i=c.a.storage()}},[[57,1,2]]]);
//# sourceMappingURL=main.30840bf6.chunk.js.map