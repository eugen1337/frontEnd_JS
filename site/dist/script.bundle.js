(()=>{"use strict";var t,e,s={},a={};function n(t){var e=a[t];if(void 0!==e)return e.exports;var i=a[t]={exports:{}};return s[t](i,i.exports,n),i.exports}n.m=s,n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.f={},n.e=t=>Promise.all(Object.keys(n.f).reduce(((e,s)=>(n.f[s](t,e),e)),[])),n.u=t=>t+".script.bundle.js",n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="site:",n.l=(s,a,i,r)=>{if(t[s])t[s].push(a);else{var o,u;if(void 0!==i)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var l=d[c];if(l.getAttribute("src")==s||l.getAttribute("data-webpack")==e+i){o=l;break}}o||(u=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",e+i),o.src=s),t[s]=[a];var h=(e,a)=>{o.onerror=o.onload=null,clearTimeout(p);var n=t[s];if(delete t[s],o.parentNode&&o.parentNode.removeChild(o),n&&n.forEach((t=>t(a))),e)return e(a)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=h.bind(null,o.onerror),o.onload=h.bind(null,o.onload),u&&document.head.appendChild(o)}},n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var a=s.length-1;a>-1&&!t;)t=s[a--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),(()=>{var t={179:0};n.f.j=(e,s)=>{var a=n.o(t,e)?t[e]:void 0;if(0!==a)if(a)s.push(a[2]);else{var i=new Promise(((s,n)=>a=t[e]=[s,n]));s.push(a[2]=i);var r=n.p+n.u(e),o=new Error;n.l(r,(s=>{if(n.o(t,e)&&(0!==(a=t[e])&&(t[e]=void 0),a)){var i=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.src;o.message="Loading chunk "+e+" failed.\n("+i+": "+r+")",o.name="ChunkLoadError",o.type=i,o.request=r,a[1](o)}}),"chunk-"+e,e)}};var e=(e,s)=>{var a,i,[r,o,u]=s,d=0;if(r.some((e=>0!==t[e]))){for(a in o)n.o(o,a)&&(n.m[a]=o[a]);u&&u(n)}for(e&&e(s);d<r.length;d++)i=r[d],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0},s=self.webpackChunksite=self.webpackChunksite||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();class i{static instance=null;constructor(){if(this.routes={},i.instance)return i.instance;i.instance=this}addPage(t,e){this.routes[t]=e}setStartPage(t){this.routes.start=t}async showPage(t){document.body.innerHTML="",document.body.appendChild(this.routes[t])}}class r{static instance=null;constructor(){if(this.noquery=["username","password"],this.subscribers={},this.states={login:{status:"BAD"},tasks:{},calculation:"",username:"",password:""},this.methods={tasks:{name:"getTasks",params:["token"]},login:{name:"login",params:["username","password"]},register:{name:"register",params:["username","password"]},calculation:{name:"calc",params:["token","id","value1","value2"]},create:{name:"createTask",params:["token","username","value1","value2"]},delete:{name:"deleteTask",params:["token","id"]}},r.instance)return r.instance;r.instance=this}emit(t){const e=this.states[t];this.subscribers[t]&&this.subscribers[t].forEach((s=>s(t,e)))}async subscribe(t,e,s=!1){return this.subscribers[t]||(this.subscribers[t]=[]),this.subscribers[t].includes(e)||this.subscribers[t].push(e),s&&!this.noquery.includes(t)&&await this.query(t),e}unsubscribe(t){for(let e in this.subscribers){const s=this.subscribers[e].indexOf(t);if(-1!==s)return this.subscribers[e].splice(s,1),!0}return!1}async query(t){const e=this.methods[t].name,s=this.methods[t].params,a=this.getStates(s),i=await(await n.e(965).then(n.bind(n,965)))[e](a);console.log(i),this.updateState(t,i)}getState(t){switch(t){case"token":return this.states.login.token;case"username":return this.states.username;case"password":return this.states.password;case"logged":return"BAD"!==this.states.login.status;case"id":return this.states.tasks.id;case"value1":return this.states.tasks.value1;case"value2":return this.states.tasks.value2;case"tasks":return this.states.tasks.list;case"calc":return this.states.calculation}}getStates(t){let e={};return t.forEach((t=>{e[t]=this.getState(t)})),e}updateState(t,e){let s="";switch(t){case"username":this.states.username=e,s="username";break;case"password":this.states.password=e,s="password";break;case"id":this.states.tasks.id=e;break;case"value1":this.states.tasks.value1=e;break;case"value2":this.states.tasks.value2=e;break;case"login":case"register":this.states.login.token=e,this.states.login.status=this.states.login.token?"OK":"BAD",s="login";break;case"tasks":"EMPTY"===e?(this.states.tasks.list="",this.states.tasks.status="EMPTY"):(this.states.tasks.list=JSON.parse(e).docs,this.states.tasks.status="OK",s="tasks");break;case"calculation":this.states.calculation=e,s="calculation";case"delete":case"create":this.query("tasks")}""!==s&&this.emit(s)}}class o extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.subscriptions=[],this.username="",this.passwd="",this.manager=new r,this.router=new i}async connectedCallback(){this.subscriptions.push(await this.manager.subscribe("login",this.checkState.bind(this))),this.render()}disconnectedCallback(){this.username="",this.passwd="",this.unsubscribe()}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}render(){this.shadow.innerHTML=`\n    <div class="wrapper">\n        <h2>Registration</h2>\n        <form action="#">\n        <div class="input-box">\n            <input id="login" type="text" placeholder="login" value="${this.username}" required>\n        </div>\n        <div class="input-box">\n            <input id="password" type="password" placeholder="password" required>\n        </div>\n        <div class="but-box">\n            <input id="login-btn" type="button" value="login">\n        </div>\n        <div class="but-box">\n            <input id="register-btn" type="button" value="register">\n        </div>\n        </form>\n    </div>\n    \n    <style>\n    .wrapper {\n        margin: 0 auto;\n        position: relative;\n        max-width: 430px;\n        width: 100%;\n        background: #cca3ff;\n        padding: 34px;\n        border-radius: 6px;\n        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n    }\n    .wrapper h2 {\n        position: relative;\n        font-size: 22px;\n        font-weight: 600;\n        color: #333;\n        text-align: center;\n    }\n    .wrapper form {\n        margin-top: 30px;\n    }\n    .wrapper form .input-box {\n        height: 52px;\n        margin: 18px 0;\n    }\n    form .input-box input {\n        height: 100%;\n        width: 100%;\n        outline: none;\n        padding: 0 15px;\n        font-size: 17px;\n        font-weight: 400;\n        color: #333;\n        border: 1.5px solid #c7bebe;\n        border-bottom-width: 2.5px;\n        border-radius: 6px;\n        transition: all 0.3s ease;\n    }\n    .input-box input:focus,\n    .input-box input:valid {\n        border-color: #4070f4;\n    }\n    form .policy {\n        display: flex;\n        align-items: center;\n    }\n    form h3 {\n        color: #707070;\n        font-size: 14px;\n        font-weight: 500;\n        margin-left: 10px;\n    }\n    .input-box.button input {\n        color: #fff;\n        letter-spacing: 1px;\n        border: none;\n        background: #4070f4;\n        cursor: pointer;\n    }\n    .input-box.button input:hover {\n        background: #0e4bf1;\n    }\n    .but-box {\n        text-align:center;\n        padding: 4px;\n    }\n    </style>\n    \n    `,this.initEvents()}initEvents(){this.shadow.getElementById("login").addEventListener("change",(t=>{this.username=t.target.value,this.manager.updateState("username",this.username)})),this.shadow.getElementById("password").addEventListener("change",(t=>{this.passwd=t.target.value,this.manager.updateState("password",this.passwd)})),this.shadow.getElementById("login-btn").addEventListener("click",(()=>{this.manager.query("login")})),this.shadow.getElementById("register-btn").addEventListener("click",(()=>{this.manager.query("register")}))}checkState(t,e){"login"===t&&("OK"===e.status?(this.username=e.username,this.router.showPage("tasks")):console.log("Неправильный логин и/или пароль!"))}unsubscribe(){this.subscriptions.forEach((t=>{this.manager.unsubscribe(t)}))}}customElements.define("login-window",o);class u extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}disconnectedCallback(){}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}render(){this.shadow.innerHTML="\n    <login-window></login-window>\n    ",this.rendered=!0}}customElements.define("login-page",u);class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.manager=new r,this.router=new i,this.username=this.manager.getState("username")}connectedCallback(){this.render()}disconnectedCallback(){}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}render(){this.shadow.innerHTML=`\n    <div>\n    <span>user ${this.username}</span>\n    <input id="back-but" type="button" value="Выйти">\n    </div>\n    <style>\n        div {\n            text-align: right;\n        }\n    </style>\n    `,this.shadow.getElementById("back-but").addEventListener("click",(()=>{this.manager.updateState("username",""),this.manager.updateState("passwd",""),this.router.showPage("login")}))}}customElements.define("logout-button",d);class c extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.tasks=[],this.subscriptions=[],this.manager=new r}async connectedCallback(){this.renderHeader(),this.shadow.getElementById("update-btn").addEventListener("click",(()=>{this.manager.query("tasks")})),this.shadow.getElementById("add-btn").addEventListener("click",(()=>{this.createTask()})),this.subscriptions.push(await this.manager.subscribe("tasks",this.checkState.bind(this))),this.subscriptions.push(await this.manager.subscribe("calculation",this.checkState.bind(this)))}unsubscribe(){this.subscriptions.forEach((t=>{this.manager.unsubscribe(t)}))}disconnectedCallback(){this.unsubscribe()}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}renderHeader(){this.shadow.innerHTML='\n    <input type="button" value="Обновить" id="update-btn"></br>\n        <input type="button" value="Добавить" id="add-btn">\n        <input type="text" id="value1" placeholder="a">\n        <input type="text" id="value2" placeholder="b">\n    <table id="tasks-table"></table>\n    <style>  \n        input {\n            margin:5px;\n        } \n        </style>\n    \n    <style>\n        table {\n            margin:5px;\n            border: 2px solid grey;\n            text-align: center;\n            background-color: lightgray;\n        }  \n        input {\n            margin:5px;\n        } \n    </style>\n    ';let t=document.createElement("tr");t.setAttribute("id","tasks-header"),["id","a","b","result","status","actions"].map((e=>{let s=document.createElement("td");s.innerHTML=e,t.appendChild(s)})),this.shadow.getElementById("tasks-table").appendChild(t)}renderTasks(){let t=this.shadow.getElementById("tasks-table");Array.from(t.querySelectorAll("tr:not(#tasks-header)")).forEach((t=>{t.remove()})),console.log(this.tasks),this.tasks.forEach((e=>{const s=e.id;let a=document.createElement("tr");a.setAttribute("id",`task${e.id}`),["id","value1","value2","result","status"].forEach((t=>{let s=document.createElement("td");s.innerHTML=e[t],s.setAttribute("class",`task-${t.toLowerCase()}`),s.setAttribute("id",`${t}${e.id}`),a.appendChild(s)}));const n=document.createElement("input");n.setAttribute("type","button"),n.setAttribute("class","task-action"),n.setAttribute("value","delete"),n.addEventListener("click",(async()=>{this.manager.updateState("id",e.id),this.manager.query("delete"),this.shadow.getElementById("task"+e.id).innerHTML=""})),a.appendChild(n);const i=document.createElement("input");i.setAttribute("type","button"),i.setAttribute("class","task-action"),i.setAttribute("value","result"),i.addEventListener("click",(async()=>{this.manager.updateState("id",e.id),this.manager.updateState("value1",e.value1),this.manager.updateState("value2",e.value2),this.manager.query("calculation"),this.shadow.getElementById("result"+s).innerHTML=this.manager.getState("calculation"),this.shadow.getElementById("status"+s).innerHTML="ready"})),a.appendChild(i),t.appendChild(a)}))}async createTask(){let t=this.shadow.getElementById("tasks-table");const e=this.shadow.getElementById("value1").value,s=this.shadow.getElementById("value2").value;this.manager.updateState("value1",e),this.manager.updateState("value2",s),await this.manager.query("create");const a=["id","value1","value2","result","status"],n=[this.manager.getState("id"),this.manager.getState("value1"),this.manager.getState("value2"),"proceed","wait"];let i=document.createElement("tr");i.setAttribute("id",`task${this.manager.getState("id")}`);for(let t in a){let e=document.createElement("td");e.innerHTML=n[t],e.setAttribute("id",a[t]+n[0]),i.appendChild(e)}const r=document.createElement("input");r.setAttribute("type","button"),r.setAttribute("class","task-action"),r.setAttribute("value","delete"),r.addEventListener("click",(async()=>{this.manager.updateState("id",task.id),this.manager.query("delete"),this.shadow.getElementById("task"+task.id).innerHTML=""})),i.appendChild(r);const o=document.createElement("input");o.setAttribute("type","button"),o.setAttribute("class","task-action"),o.setAttribute("value","result"),o.addEventListener("click",(async()=>{this.manager.updateState("id",task.id),this.manager.updateState("value1",task.value1),this.manager.updateState("value2",task.value2),this.manager.query("calculation"),this.shadow.getElementById("result"+id).innerHTML=this.manager.getState("calculation"),this.shadow.getElementById("status"+id).innerHTML="ready"})),i.appendChild(o),t.appendChild(i)}checkState(t,e){switch(t){case"tasks":console.log(e.list),this.tasks=e.list,this.renderTasks();break;case"calculation":if("OK"===e.status){const t=this.manager.getState("id");this.changeControlButton(t)}}}}customElements.define("task-table",c);class l extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.status={},this.statusStr="",this.tasks=[],this.subscriptions=[],this.manager=new r}async connectedCallback(){this.render(),this.subscriptions.push(await this.manager.subscribe("tasks",this.checkState.bind(this),!0))}disconnectedCallback(){this.unsubscribe()}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}render(){this.shadow.innerHTML=`\n    <fieldset>\n        <span>Количество задач: ${this.status.count}</span>\n    </fieldset>\n    \n    <style>\n        fieldset {\n            display: grid;\n            position:fixed;\n            left:0px;\n            bottom:0px;\n            height: 100px;\n            width:100%;\n            background:#999;\n        }\n    </style>\n    `}checkState(t,e){switch(t){case"tasks":case"tasks":this.tasks=e.list,this.updateTasks()}}updateTasks(){this.status={count:this.tasks.length,waiting:0,processing:0,processed:0},this.tasks.forEach((t=>{const e=t.status.toLowerCase();this.status[e]++})),this.render()}unsubscribe(){this.subscriptions.forEach((t=>{this.manager.unsubscribe(t)}))}}customElements.define("task-status",l);class h extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}disconnectedCallback(){}static get observedAttributes(){return[]}attributeChangedCallback(t,e,s){}render(){this.shadow.innerHTML="\n    <logout-button></logout-button>\n    \n    <task-table></task-table>\n    <task-status>\n    "}}customElements.define("tasks-page",h),(async()=>{const t=new i;t.setStartPage(document.createElement("login-page")),t.addPage("login",document.createElement("login-page")),t.addPage("tasks",document.createElement("tasks-page")),await t.showPage("start")})()})();