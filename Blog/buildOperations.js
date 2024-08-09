//loads the posts from json to html
async function loadPosts() {
    scroll(0, 0)
    displaySelectedTags();

    content = document.getElementById("content")

    loading = document.createElement("h2")
    loading.innerHTML = 'Loading Blog'
    content.appendChild(loading)

    postsPer = document.getElementById('postPerPage').value;

    response = await sendRequest()
    content.innerHTML = '';

    pages = document.getElementById("pagination")
    pages.style.display = 'none';
    pageSel = document.getElementById("pageSelect")
    pageSel.innerHTML = '<option value="1" id="opt1">1</option>'

    console.log(response.length)
    for (let i = 0; i < response.length; i++) {
        pageNum = Math.floor(i / postsPer) + 1
        let currDiv = document.getElementById('content' + pageNum)
        if (currDiv == undefined) {
            currDiv = document.createElement('div')
            currDiv.id = 'content' + pageNum
            currDiv.classList.add('page_content')

            if (pageNum > 1) {
                currDiv.style.display = 'none'
                pages.style.display = 'block';

                newOpt = document.createElement('option')
                newOpt.value = pageNum;
                newOpt.innerText = pageNum;
                newOpt.id = 'opt' + pageNum
                pageSel.appendChild(newOpt)
            }
            content.appendChild(currDiv)
        }
        let entryDiv = newBlogPost(response[i])

        currDiv.appendChild(entryDiv)

        if (i % postsPer < 4) {
            newImg = document.createElement("img");
            newImg.classList.add("line_break_photo")
            newImg.src = "../resources/DRRE_line_break_" + i % 4 + ".jpg"
            currDiv.appendChild(newImg)
        }
    }
}

//the function that builds the div of currently selected tags, or hides it in case there are no selected tags
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