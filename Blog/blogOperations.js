const blogURL = "https://kde1rmcvd5.execute-api.us-east-1.amazonaws.com/Stage1/blog";

async function loadPosts() {
    response = await sendRequest()
    content = document.getElementById("content")

    for (let i = 0; i < response.length; i++) {
        newDiv = document.createElement("div");

        newH = document.createElement("h2");
        newH.innerText = response[i]['title']
        newDiv.appendChild(newH)

        body = document.createElement("div");
        body.innerHTML = response[i]['content']
        newDiv.appendChild(body)

        content.appendChild(newDiv)
    }
}

var requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

//send a specified request and return json response
async function sendRequest() {
    const response = await fetch(blogURL, requestOptions)
    const json = await response.json()
    return json;
}
