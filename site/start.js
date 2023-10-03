const baseUrl = "http://localhost:8001";
let username;

window.onload = () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            login();
        }
    });
    document
        .getElementById("login-btn")
        .addEventListener("click", () => login());

    document
        .getElementById("register-btn")
        .addEventListener("click", () => register());
};

async function register() {
    username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    let url = baseUrl + `/login`;

    let date = username + "&" + password;

    const result = await (
        await import("./api.js")
    ).getResponse(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(date),
    });

    console.log(result);

    if (result === "ok") {
        await loadMainPage();
    } else console.log("register is error");
}

async function login() {
    username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    let url = baseUrl + `/login?login=${username}&password=${password}`;

    const result = await (
        await import("./api.js")
    ).getResponse(url, { method: "GET" });

    console.log(result);

    if (result === "ok") {
        await loadMainPage();
    } else console.log("login is error");
}

async function loadMainPage() {
    console.log("loadMainPage()");
    document.title = "Tasks";
    document.body.innerHTML = "";

    let form = document.createElement("form");
    form.setAttribute("id", "tasks-form");

    let addBtn = document.createElement("input");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("id", "add_but");
    addBtn.setAttribute("value", "Добавить задачу");

    let value1 = document.createElement("input");
    value1.setAttribute("type", "text");
    value1.setAttribute("id", "value1");
    value1.setAttribute("placeholder", "a");

    let value2 = document.createElement("input");
    value2.setAttribute("type", "text");
    value2.setAttribute("id", "value2");
    value2.setAttribute("placeholder", "b");

    form.appendChild(addBtn);
    form.appendChild(value1);
    form.appendChild(value2);

    let table = document.createElement("table");
    table.setAttribute("id", "tasks");
    table.setAttribute("border", "1 px grey");
    form.appendChild(table);

    document.body.appendChild(form);

    showTasksHeader(table);

    // showTasks()
    if (showTasks(username)) console.log("tasks is exist");

    document.getElementById("add_but").onclick = () => {
        makeTask(table);
    };
}

function showTasksHeader(table) {
    let header = document.createElement("tr");
    header.setAttribute("id", "tasks-header");
    const titles = ["id", "a", "b", "result", "status", "actions"];

    titles.map((item) => {
        let td = document.createElement("td");
        td.innerHTML = item;
        header.appendChild(td);
    });

    table.appendChild(header);
}

async function showTasks(table) {
    const tasks = await (await import("./api.js")).getTasks(username);

    if (tasks == "null") return false;

    Array.from(table.rows).forEach((row) => {
        if (row.getAttribute("id") != "tasks-header") row.remove();
    });

    if (taskStr != "EMPTY") {
        const tasks = JSON.parse(taskStr);

        tasks.forEach((task) => {
            let tr = document.createElement("tr");
            task.forEach((taskElem) => {
                let td = document.createElement("td");
                td.innerHTML = taskElem;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    initControlButton(table);
}

async function makeTask(table) {
    let url = baseUrl + "/tasks";

    const a = document.getElementById("value1").value;
    const b = document.getElementById("value2").value;

    // let name = prompt("name of task");
    // console.log(JSON.stringify(name));

    let params = username + "&" + a + "&" + b;
    const id = await (await import("./api.js")).makeTask(params);

    // if (result !== "ok") {
    //     console.log("no task resp");
    //     return "pupupu";
    // }

    console.log(id);

    let tr = document.createElement("tr");

    let td_id = document.createElement("td");
    td_id.innerHTML = id;
    tr.appendChild(td_id);

    let td1 = document.createElement("td");
    td1.innerHTML = a;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.innerHTML = b;
    tr.appendChild(td2);

    let status = document.createElement("td");
    status.innerHTML = "proceed";
    status.setAttribute("id", "status" + id);
    tr.appendChild(status);

    let result = document.createElement("td");
    result.innerHTML = "wait";
    result.setAttribute("id", "result" + id);
    tr.appendChild(result);

    let wrapper = document.createElement("div");
    let form = document.createElement("form");

    let td = document.createElement("td");

    const actions = ["result", "delete"];

    td.appendChild(makeTaskAction(actions[0], a, b, id));
    tr.setAttribute("id", id);
    tr.appendChild(td);

    // for (action of actions) {
    //     form.appendChild(makeTaskAction(action));
    // }
    table.appendChild(tr);

    wrapper.appendChild(form);

    table.appendChild(wrapper);
}

function makeTaskAction(actionName, a, b, id) {
    const div = document.createElement("div");
    div.setAttribute("class", "action-box");

    const but = document.createElement("input");
    but.setAttribute("type", "button");
    but.setAttribute("class", "task-action");
    but.setAttribute("value", actionName);

    but.addEventListener("click", async () => {
        const calcResult = await (await import("./api.js")).calc(a, b);
        let res = document.getElementById("result" + id);
        res.innerHTML = calcResult;
        let status = document.getElementById("status" + id);
        status.innerHTML = "ready";
    });

    div.appendChild(but);

    return div;
}
