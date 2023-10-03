export async function calc(a, b) {
    console.log("fetch /calc");

    const result = await getResponse(`http://localhost:8001/calc?a=${a}&b=${b}`, {
        method: "GET",
    });

    console.log(result);
    return result;
}

export async function makeTask(params)
{
    const result = await getResponse(`http://localhost:8001/tasks`, {
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
    const result = await getResponse(`http://localhost:8001/tasks?username=${username}`, {
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
