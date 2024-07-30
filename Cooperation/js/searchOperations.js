/*
searchOperations.js
Hannah Robertson
7/19/24
The functions to search the database via API calls
*/

//url to API/lambda implementation to get our information in the right format
var apiUrl = 'https://t7uhnuoyk5.execute-api.us-east-1.amazonaws.com/Stage1/search/';

//retrieves all the listings from the API and creates a datatable. 
async function searchListings() {
  var searchterm = $("#search_input").val();

  requestUrl = apiUrl + searchterm;

  return await fetch(requestUrl)
  .then((response) => response.json())
  .then((json) => buildTable(json));
}

//gives the same effect to hitting enter as hitting the button
function handle(e){
    if(e.keyCode === 13){
      searchListings();
    }
	return false;
}

function buildTable(list) {
  //clear out any old search results
  var temps = document.querySelectorAll(".tempTr");
  console.log(temps)
    for (var i = 0; i < temps.length; i++) {
      temps[(temps.length - i - 1)].remove();
    }

  console.log(list)
  list.forEach((element) => createRow(element));
}

function createRow(array) {
  let newTr = document.createElement("tr")
  newTr.classList = "tempTr";
  for (let i = 0; i < 3; i++) {
    let newTd = document.createElement("td")
    newTd.innerText = array[i];
    newTr.appendChild(newTd)
  }
  newTr.onclick = function() {
    viewFull(this);
  };
  document.getElementById("listingsTable").appendChild(newTr);
}

function viewFull(tableRow) {
  var address = tableRow.childNodes[0].innerHTML;
  var num = tableRow.childNodes[1].innerHTML;
  var price = tableRow.childNodes[2].innerHTML;

  document.getElementById("mod_address").innerText = '\t' + address;
  document.getElementById("mod_ar_num").innerText = '\t' +num;
  document.getElementById("mod_payment").innerText = '\t' +price;
  
  document.getElementById("priceModal").style.display = "block";
}

function closeModal() {
  document.getElementById("priceModal").style.display = "none";
}