let url = "http://localhost:8001";

window.onload = () => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && getInput()) {
            login();
        }
    });
};

function getInput() {
    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    if (!username || !password) return false;
    // need??
    return true;
}

async function login() {
    console.log("login");

    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    url += `/login?login=${username}&password=${password}`;

    const result = await getResponse(url);
    console.log(result);

    if (result === "ok") {
        await loadMainPage();
    } else console.log("end!");
}

async function calc() {
    console.log("calc");

    const result = await getResponse("http://localhost:8001/calc?a=30&b=40", {
        method: "GET",
    });
    console.log(result);
}

async function getResponse(url) {
    console.log(url);

    let response = await fetch(url);
    console.log(response);

    let text;
    if (response.ok) {
        text = await response.text();
        return text;
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

async function loadMainPage() {
    console.log("loadMainPage()");
    document.body.innerHTML = "";

    let calcForm = document.createElement("form");
    calcForm.setAttribute("id", "calc-form");

    let updateBtn = document.createElement("input");
    updateBtn.setAttribute("type", "button");
    updateBtn.setAttribute("id", "update-btn");
    updateBtn.setAttribute("value", "Обновить");
    calcForm.appendChild(updateBtn);

    let addBtn = document.createElement("input");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("id", "add-btn");
    addBtn.setAttribute("value", "Добавить");
    calcForm.appendChild(addBtn);

    //test btn
    let testBtn = document.createElement("input");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("id", "test-btn");
    addBtn.setAttribute("value", "Test Calc");
    calcForm.appendChild(testBtn); 

    let table = document.createElement("table");
    table.setAttribute("id", "tasks");
    calcForm.appendChild(table);

    document.body.appendChild(calcForm);

    //test btn
    document.getElementById("test-btn").onclick = () => {
        calc();
    };
}
