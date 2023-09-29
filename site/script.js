window.onload = () => {
    document.getElementById("btn").onclick = async () => {
        console.log("adasf");
        console.log("test");
        await login();
    };
};


async function login() {
    let url = "http://localhost:8001"

    console.log("login");
    
    const username = document.getElementById("username-field").value;
    const password = document.getElementById("pass-field").value;
    
    url += `/login?login=${username}&password=${password}`;

    const result = await getResponse(url);

    console.log(result);
    await loadMainPage();

    if (result === "ok") {
        await loadMainPage();
    } else console.log("end!");
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
}
