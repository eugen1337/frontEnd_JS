const baseUrl = "http://localhost:8001";

window.onload = () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && getInput()) {
            login();
        }
    });
};

function getInput() {
    // need??
    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    if (!username || !password) return false;

    return true;
}

async function login() {
    console.log("login()");

    const username = document.getElementById("login").value;
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

    // let calcForm = document.createElement("form");
    // calcForm.setAttribute("id", "calc-form");

    let addBtn = document.createElement("input");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("id", "add_but");
    addBtn.setAttribute("value", "Добавить задачу");

    document.body.appendChild(addBtn);

    document.getElementById("add_but").onclick = () => {
        makeTask();
    };

    // //test btn
    // let testBtn = document.createElement("input");
    // addBtn.setAttribute("type", "button");
    // addBtn.setAttribute("id", "test-btn");
    // addBtn.setAttribute("value", "Test Calc");
    // calcForm.appendChild(testBtn);

    // let table = document.createElement("table");
    // table.setAttribute("id", "tasks");
    // calcForm.appendChild(table);

    //test btn
}

async function makeTask() {
    let url = baseUrl + "/tasks";

    let name = prompt("name of task");
    console.log(JSON.stringify(name))

    const result = await (
        await import("./api.js")
    ).getResponse(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    });
    
    if (result !== "ok") {
        return;
    } 

    let wrapper = document.createElement("div");

    let title = document.createElement("h2");
    title.innerHTML = name;

    let form = document.createElement("form");

    const actions = ["start", "result", "stop", "delete"];

    for (action of actions) {
        form.appendChild(makeTaskAction(action));
    }

    wrapper.appendChild(title);
    wrapper.appendChild(form);

    // let table = document.createElement("table");
    // table.setAttribute("id", "tasks");
    // calcForm.appendChild(table);

    document.body.appendChild(form);
}

function makeTaskAction(actionName) {
    const div = document.createElement("div");
    div.setAttribute("class", "action-box");

    const but = document.createElement("input");
    but.setAttribute("type", "button");
    but.setAttribute("class", "task-action");
    but.setAttribute("value", actionName);

    div.appendChild(but);

    return div;
}
