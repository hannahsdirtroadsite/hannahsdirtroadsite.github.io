const blogURL = "https://kde1rmcvd5.execute-api.us-east-1.amazonaws.com/Stage1/blog";

async function loadPosts() {
    scroll(0, 0)
    displaySelectedTags();

    content = document.getElementById("content")
    loading = document.createElement("h2")
    loading.innerHTML = 'Loading Blog'
    content.appendChild(loading)

    response = await sendRequest()
    content.innerHTML = '';

    for (let i = 0; i < response.length; i++) {
        let newDiv = newBlogPost(response[i])

        content.appendChild(newDiv)

        if (i < response.length - 1) {
            newImg = document.createElement("img");
            newImg.classList.add("line_break_photo")
            newImg.src = "../resources/DRRE_line_break_" + i % 4 + ".jpg"
            content.appendChild(newImg)
        }
    }
}

function displaySelectedTags() {
    let tags = localStorage.getItem("tags");
    let tagDiv = document.getElementById('active_tags_div');
    tagDiv.innerHTML = '<h2 class="active_tags_label">Currently Filtering By:</h2>'
    if (tags == null || tags == undefined || tags == '' || tags == ',') {
        tagDiv.style.visibility = "hidden"
        localStorage.setItem("tags", '');
        return;
    }
    tagDiv.style.visibility = "visible"
    tagsList = tags.split(',')

    for (let i = 0; i < tagsList.length - 1; i++) {
        tag = document.createElement("button");
        tag.classList.add('active_tag_button')
        tag.innerText = tagsList[i] + ' ☒';
        tag.id = tagsList[i];
        tag.addEventListener('click', function (e) {
            unfilterTag(this)
        });
        tagDiv.appendChild(tag)
    }
}

//format a json response into a legible blog post
function newBlogPost(entry) {
    newDiv = document.createElement("div");
    newDiv.classList.add("entry_div")

    newH = document.createElement("h2");
    newH.innerText = entry['title']
    newDiv.appendChild(newH)

    date = document.createElement('h3')
    updated = new Date(entry['updated'])
    date.innerText = updated.toDateString()
    newDiv.appendChild(date)

    auth = document.createElement('h3')
    authro = entry['author']['displayName']
    auth.innerText = authro
    newDiv.appendChild(auth)

    body = document.createElement("div");
    body.innerHTML = entry['content'].replaceAll('<span class="blog_post_text">', '').replaceAll('</span>', '').replaceAll('&nbsp;', '')
    newDiv.appendChild(body)

    tagDiv = document.createElement("div");
    tagDiv.classList.add("tags_div")
    for (let j = 0; j < entry['labels'].length; j++) {
        tag = document.createElement("button");
        tag.classList.add('tag_button')
        tag.innerText = entry['labels'][j]
        tag.addEventListener('click', function (e) {
            filterTag(this)
        });
        tagDiv.appendChild(tag)
    }
    newDiv.appendChild(tagDiv)

    return newDiv;
}

async function filterTag(tag) {
    tags = localStorage.getItem("tags")
    localStorage.setItem("tags", tags + tag.innerText + ",")

    loadPosts()
}

function unfilterTag(tag) {
    tags = localStorage.getItem("tags");
    tags = tags.replace(tag.id + ',', '');

    localStorage.setItem("tags", tags);
    loadPosts()
}

//gives the same effect to hitting enter as hitting the button
function handle(e) {
    if (e.keyCode === 13) {
        loadPosts();
    }
    return false;
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
    tags = localStorage.getItem("tags")
    search = document.getElementById('search_input').value
    const response = await fetch(blogURL + "?labels=" + tags + "&search=" + search, requestOptions)
    const json = await response.json()
    return json;
}
