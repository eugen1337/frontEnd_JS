const baseUrl = "http://localhost:80/api/v1";

export async function login(username, password) {
    console.log("fetch /login");

    const result = await getResponse(`${baseUrl}/login?login=${username}&password=${password}`, {
        method: "GET",
    });

    console.log(result);
    return result;
}

export async function register(username, password) {

    console.log("fetch /register");
    let data = { login: username, password: password };

    const result = await getResponse(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log(result);
    return result;
}

export async function calc(a, b) {
    console.log("fetch /calc");

    const result = await getResponse(`${baseUrl}/calc?a=${a}&b=${b}`, {
        method: "GET",
    });

    console.log(result);
    return result;
}

export async function createTask(params)
{
    const result = await getResponse(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    return result;
}

export async function getTasks(username)
{
    const result = await getResponse(`${baseUrl}/tasks?login=${username}`, {
        method: "GET",
    });

    return result;
}


export async function getResponse(url, params) {
    console.log(url);

    let response = await fetch(url, params);
    console.log(response);

    let text;
    if (response.ok) {
        text = await response.text();
        return text;
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

export async function deleteTask(params)
{
    const result = await getResponse(`${baseUrl}/tasks/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    return result;
}