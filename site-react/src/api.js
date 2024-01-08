const baseUrl = "http://localhost:8080/my-app-1.0/v1";

export async function login({ username, password }) {
    console.log("fetch /login");

    const result = await getResponse(
        `${baseUrl}/login?login=${username}&password=${password}`,
        {
            method: "GET",
        }
    );

    console.log(result);
    return result;
}

export async function register({ username, password }) {
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

export async function calc({ token, id, value1, value2 }) {
    console.log("fetch /calc");

    const result = await getResponse(
        `${baseUrl}/calc?id=${id}&a=${value1}&b=${value2}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log(result);
    return result;
}

export async function createTask({ token, username, value1, value2 }) {
    const params = { login: username, value1: value1, value2: value2 };
    const result = await getResponse(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
    });

    return result;
}

export async function getTasks({ token }) {
    const result = await getResponse(`${baseUrl}/tasks`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return result;
}

export async function getResponse(url, params) {
    let response = await fetch(url, params);

    let text;
    if (response.ok) {
        text = await response.text();
        return text;
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

export async function deleteTask({ token, id }) {
    const result = await getResponse(`${baseUrl}/tasks?id=${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return result;
}
