import Router from "./router.js";
import "./pages/login-page/component.js";
import "./pages/tasks-page/component.js";

(async () => {
    const router = new Router();

    router.setStartPage(document.createElement("login-page"));

    router.addPage("login", document.createElement("login-page"));
    router.addPage("tasks", document.createElement("tasks-page"));

    await router.showPage("start");
})();

// const baseUrl = "http://localhost:80/api/v1";
// let username;

// window.onload = () => {
//     document.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//             login();
//         }
//     });
//     document
//         .getElementById("login-btn")
//         .addEventListener("click", () => login());

//     document
//         .getElementById("register-btn")
//         .addEventListener("click", () => register());
// };

// async function register() {
//     username = document.getElementById("login").value;
//     const password = document.getElementById("password").value;

//     let url = baseUrl + `/login`;

//     let data = { login: login, password: password };

//     const result = await (
//         await import("./api.js")
//     ).getResponse(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });

//     console.log(result);

//     if (result === "ok") {
//         await loadMainPage();
//     } else console.log("register is error");
// }

// async function login() {
//     username = document.getElementById("login").value;
//     const password = document.getElementById("password").value;

//     let url = baseUrl + `/login?login=${username}&password=${password}`;

//     const result = await (
//         await import("./api.js")
//     ).getResponse(url, { method: "GET" });

//     console.log(result);

//     if (result == "ok") {
//         await loadMainPage();
//     } else {
//         console.log("login is error");
//     }
// }

// async function loadMainPage() {
//     console.log("loadMainPage()");
//     document.title = "Tasks";
//     document.body.innerHTML = "";

//     let form = document.createElement("form");
//     form.setAttribute("id", "tasks-form");

//     let addBtn = document.createElement("input");
//     addBtn.setAttribute("type", "button");
//     addBtn.setAttribute("id", "add_but");
//     addBtn.setAttribute("value", "Добавить задачу");

//     let getBtn = document.createElement("input");
//     getBtn.setAttribute("type", "button");
//     getBtn.setAttribute("id", "get_but");
//     getBtn.setAttribute("value", "Получить задачи");

//     let value1 = document.createElement("input");
//     value1.setAttribute("type", "text");
//     value1.setAttribute("id", "value1");
//     value1.setAttribute("placeholder", "a");

//     let value2 = document.createElement("input");
//     value2.setAttribute("type", "text");
//     value2.setAttribute("id", "value2");
//     value2.setAttribute("placeholder", "b");

//     form.appendChild(getBtn);
//     form.appendChild(addBtn);
//     form.appendChild(value1);
//     form.appendChild(value2);

//     let table = document.createElement("table");
//     table.setAttribute("id", "tasks");
//     table.setAttribute("border", "1 px grey");
//     form.appendChild(table);

//     document.body.appendChild(form);

//     showTasksHeader(table);

//     if (showTasks(username)) console.log("tasks is exist");

//     document.getElementById("add_but").onclick = () => {
//         createTask(table);
//     };

//     getBtn.addEventListener("click", () => showTasks(table));
// }

// function showTasksHeader(table) {
//     let header = document.createElement("tr");
//     header.setAttribute("id", "tasks-header");
//     const titles = ["id", "a", "b", "result", "status", "actions"];

//     titles.map((item) => {
//         let td = document.createElement("td");
//         td.innerHTML = item;
//         header.appendChild(td);
//     });

//     table.appendChild(header);
// }

// async function showTasks(table) {
//     const tasksStr = await (await import("./api.js")).getTasks(username);
//     console.log(tasksStr);
//     console.log(table);

//     const tasks = JSON.parse(tasksStr);
//     if (tasks == "null") return false;

//     for (i in tasks["docs"]) {
//         val = tasks["docs"][i];
//         let id = val["id"]

//         console.log(val);
//         let tr = document.createElement("tr");
//         const table = document.getElementById("tasks");

//         tr.setAttribute("id", "task" + id);
//         for (i in val) {
//             let td = document.createElement("td");
//             td.setAttribute("id", i + id);
//             console.log(i + id)
//             td.innerHTML = val[i];
//             tr.appendChild(td);
//         }

//         let a = val["value1"]
//         let b = val["value2"]

//         let td = document.createElement("td");

//         const div = document.createElement("div");
//         div.setAttribute("class", "action-box");

//         const but = document.createElement("input");
//         but.setAttribute("type", "button");
//         but.setAttribute("class", "task-action");
//         but.setAttribute("value", "delete");

//         but.addEventListener("click", async () => {
//             let params = {
//                 text: id,
//             };
//             const res = await (await import("./api.js")).deleteTask(params);
//             console.log(res);
//             document.getElementById("task" + id).innerHTML = "";
//         });

//         div.appendChild(but);

//         td.appendChild(div);
//         tr.appendChild(td);

//         td.appendChild(createTaskAction("result", a, b, id));
//         tr.appendChild(td);

//         table.appendChild(tr);
//     }
// }

// async function createTask(table) {
//     let url = baseUrl + "/tasks";

//     const a = document.getElementById("value1").value;
//     const b = document.getElementById("value2").value;

//     let params = { login: username, value1: a, value2: b };
//     const id = await (await import("./api.js")).createTask(params);
//     console.log(id);

//     let tr = document.createElement("tr");
//     tr.setAttribute("id", "task" + id);

//     let td_id = document.createElement("td");
//     td_id.innerHTML = id;
//     tr.appendChild(td_id);

//     let td1 = document.createElement("td");
//     td1.innerHTML = a;
//     tr.appendChild(td1);

//     let td2 = document.createElement("td");
//     td2.innerHTML = b;
//     tr.appendChild(td2);

//     let status = document.createElement("td");
//     status.innerHTML = "proceed";
//     status.setAttribute("id", "status" + id);
//     tr.appendChild(status);

//     let result = document.createElement("td");
//     result.innerHTML = "wait";
//     result.setAttribute("id", "result" + id);
//     tr.appendChild(result);

//     let wrapper = document.createElement("div");
//     let form = document.createElement("form");

//     let td = document.createElement("td");

//     const div = document.createElement("div");
//     div.setAttribute("class", "action-box");

//     const but = document.createElement("input");
//     but.setAttribute("type", "button");
//     but.setAttribute("class", "task-action");
//     but.setAttribute("value", "delete");

//     but.addEventListener("click", async () => {
//         let params = {
//             text: id,
//         };
//         const res = await (await import("./api.js")).deleteTask(params);
//         console.log(res);
//         document.getElementById("task" + id).innerHTML = "";
//     });

//     div.appendChild(but);

//     td.appendChild(div);
//     tr.appendChild(td);

//     td.appendChild(createTaskAction("result", a, b, id));
//     tr.appendChild(td);

//     table.appendChild(tr);

//     wrapper.appendChild(form);

//     table.appendChild(wrapper);
// }

// function createTaskAction(actionName, a, b, id) {
//     const div = document.createElement("div");
//     div.setAttribute("class", "action-box");

//     const but = document.createElement("input");
//     but.setAttribute("type", "button");
//     but.setAttribute("class", "task-action");
//     but.setAttribute("value", actionName);

//     but.addEventListener("click", async () => {
//         const calcResult = await (await import("./api.js")).calc(a, b);
//         let res = document.getElementById("result" + id);
//         res.innerHTML = calcResult;
//         let status = document.getElementById("status" + id);
//         status.innerHTML = "ready";
//     });

//     div.appendChild(but);

//     return div;
// }
