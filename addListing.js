var apiUrl = 'https://2oaas6jaua.execute-api.us-east-1.amazonaws.com/Stage1/';
var data = {};

var postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

function postListing() {
  var modal = document.getElementById("addModal");
  modal.style.display = "none";

  data.title = document.getElementById('title').value;
  data.user = "default"
  data.ingredients = document.getElementById('ingredients').value;
  data.fulltext = document.getElementById('ingredients').value.concat("\n\n", document.getElementById('steps').value);
  data.operation = "addListing"

  postOptions['body'] = JSON.stringify(data)

  fetch(postUrl, postOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      returnable = JSON.stringify(data, null, 2);
      location.reload()
    })
    .catch(error => {
      console.error

        ('Error:', error);
    });
}