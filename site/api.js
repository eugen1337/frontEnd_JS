export async function calc() {
    console.log("fetch /calc");

    const result = await getResponse("http://localhost:8001/calc?a=30&b=40", {
        method: "GET",
    });

    console.log(result);
}

// export async function handleTask() {
//     console.log("fetch /calc");

//     const result = await getResponse("http://localhost:8001/calc?a=30&b=40", {
//         method: "GET",
//     });

//     console.log(result);
// }

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
