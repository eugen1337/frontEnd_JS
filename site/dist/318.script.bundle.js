"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[318],{318:(e,t,o)=>{o.r(t),o.d(t,{calc:()=>c,createTask:()=>l,deleteTask:()=>u,getResponse:()=>r,getTasks:()=>i,login:()=>s,register:()=>a});const n="http://localhost:80/api/v1";async function s(e,t){console.log("fetch /login");const o=await r(`${n}/login?login=${e}&password=${t}`,{method:"GET"});return console.log(o),o}async function a(e,t){console.log("fetch /register");let o={login:e,password:t};const s=await r(`${n}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});return console.log(s),s}async function c(e,t){console.log("fetch /calc");const o=await r(`${n}/calc?a=${e}&b=${t}`,{method:"GET"});return console.log(o),o}async function l({username:e,value1:t,value2:o}){const s={login:e,value1:t,value2:o};return await r(`${n}/tasks`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}async function i({username:e}){return await r(`${n}/tasks?login=${e}`,{method:"GET"})}async function r(e,t){console.log(e);let o,n=await fetch(e,t);if(console.log(n),n.ok)return o=await n.text(),o;console.log("Ошибка HTTP: "+n.status)}async function u(e){return await r(`${n}/tasks/delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}}}]);