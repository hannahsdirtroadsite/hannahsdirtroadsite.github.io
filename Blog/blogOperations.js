const blogURL = "https://kde1rmcvd5.execute-api.us-east-1.amazonaws.com/Stage1/blog";

async function loadPosts() {
    response = await sendRequest()
    content = document.getElementById("content")

    for (let i = 0; i < response.length; i++) {
        newDiv = document.createElement("div");
        newDiv.classList.add("entry_div")

        newH = document.createElement("h2");
        newH.innerText = response[i]['title']
        newDiv.appendChild(newH)

        date = document.createElement('h3')
        updated = new Date(response[i]['updated'])
        date.innerText = updated.toDateString()
        newDiv.appendChild(date)

        auth = document.createElement('h3')
        authro = response[i]['author']['displayName']
        auth.innerText = authro
        newDiv.appendChild(auth)
        
        body = document.createElement("div");
        body.innerHTML = response[i]['content'].replaceAll('<span class="blog_post_text">', '').replaceAll('</span>', '').replaceAll('&nbsp;', '')
        newDiv.appendChild(body)

        tagDiv = document.createElement("div");
        tagDiv.classList.add("tags_div")
        for (let j = 0; j < response[i]['labels'].length; j++) {
            tag = document.createElement("a");
            tag.innerText = response[i]['labels'][j]
            tag.href = 'TODO_URL' + "/" + response[i]['labels'][j]
            tagDiv.appendChild(tag)
            if (j < response[i]['labels'].length - 1) {
                comma = document.createElement("span");
                comma.innerText = ', '
                tagDiv.appendChild(comma)
            }
        }
        newDiv.appendChild(tagDiv)

        content.appendChild(newDiv)

        if (i < response.length - 1) {
            newImg = document.createElement("img");
            newImg.classList.add("line_break_photo")
            newImg.src = "../resources/DRRE_line_break_" + i % 4 + ".jpg"
            content.appendChild(newImg)
        }
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
