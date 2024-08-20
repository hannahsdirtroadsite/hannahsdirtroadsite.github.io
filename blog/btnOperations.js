const blogURL = "https://kde1rmcvd5.execute-api.us-east-1.amazonaws.com/Stage1/blog";

var requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

//send a specified request and return json response
async function sendRequest() {
    tags = getTags()

    search = document.getElementById('search_input').value
    const response = await fetch(blogURL + "?labels=" + tags + "&search=" + search, requestOptions)
    const json = await response.json()
    return json;
}

//adds a filter tag to the system
async function filterTag(tag) {
    let tags = getTags()
    localStorage.setItem("tags", tags + tag.innerText + ",")

    loadPosts()
}

//removes a filter tag from the system
function unfilterTag(tag) {
    let tags = getTags();
    tags = tags.replace(tag.id + ',', '');

    localStorage.setItem("tags", tags);
    loadPosts()
}

//gives the same effect to hitting enter as hitting the submit button
function handle(e) {
    if (e.keyCode === 13) {
        loadPosts();
    }
    return false;
}

function prevPage() {
    let currPg = document.getElementById('pageSelect').value

    if (currPg - 1 >= 0 && document.getElementById('prev').classList.contains('valid_arrow')) {
        document.getElementById('pageSelect').value = currPg - 1
        changePage();
    }
}

function nextPage() {
    let currPg = document.getElementById('pageSelect').value;
    let nextPg = parseInt(currPg) + 1
    
    if (document.getElementById('opt' + nextPg) !== null && document.getElementById('next').classList.contains('valid_arrow')) {
        document.getElementById('pageSelect').value = nextPg
        changePage();
    }
}

function changePage() {
    pages = document.getElementsByClassName('page_content')
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none'
    }

    destination = parseInt(document.getElementById('pageSelect').value);
    document.getElementById('content' + destination).style.display = 'block'

    console.log('opt' + destination, 'opt' + (destination + 1), document.getElementById('opt' + (destination + 1)))
    
    prev = document.getElementById('prev')
    if (destination - 1 === 0) {
        prev.classList.add('invalid_arrow')
        prev.classList.remove('valid_arrow')
    }
    else {
        prev.classList.remove('invalid_arrow')
        prev.classList.add('valid_arrow')
    }
    next = document.getElementById('next')
    if (document.getElementById('opt' + (destination + 1)) === null) {
        next.classList.remove('valid_arrow')
        next.classList.add('invalid_arrow')
    }
    else {
        next.classList.remove('invalid_arrow')
        next.classList.add('valid_arrow')
    }

    scroll(0, 0)
}

function getTags() {
    try {
        tags = localStorage.getItem("tags")
    }
    catch (error) {
        return ''
    }
    
    if (tags == null || tags == undefined || tags == '' || tags == ',') {
        return ''
    }
    else {
        return tags
    }
}