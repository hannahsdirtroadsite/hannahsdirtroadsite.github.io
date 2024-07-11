var apiUrl = 'https://2oaas6jaua.execute-api.us-east-1.amazonaws.com/Stage1/';
var data = {};
const listingBtnHtml = '<button onclick="getFullListing([id])">[title]</button>'

async function getAllListings() {
  myUrl = apiUrl.concat('listings/default')
  titles = await await (await fetch(myUrl)).json();
  start = document.getElementById('controlBtns');
  for (i = 0; i < titles.length; i++) {
    console.log(titles[i])
    start.innerHTML = start.innerHTML + listingBtnHtml.replace('[id]', (i + 1) + "").replace('[title]', titles[i]['Title']);
  }
}

async function getFullListing(id) {

  myUrl = apiUrl.concat('listings/default/', id);
  listing = await await (await fetch(myUrl)).json();

  openModal('fullModal');
  document.getElementById('titleText').textContent = listing['Title']
  document.getElementById('listingText').textContent = listing['Fulllisting']
  document.getElementById('ingredientsText').textContent = listing['Ingredients']

  var addToList = document.getElementById("addToListBtn");
  addToList.onclick = function() {
    itemExists("list")
    localStorage.setItem("list", localStorage.getItem("list") + "\n" + document.getElementById("ingredientsText").innerHTML);
  }
}
