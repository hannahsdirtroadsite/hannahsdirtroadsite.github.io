/*
apiOperations.js
Hannah Robertson
7/19/24
The functions to perform API calls with correct methods and data
*/

var requestOptions = {
  method: 'TODO',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};


//send a specified request and return json response
async function sendRequest(method, data, url) {
  requestOptions['method'] = method
  requestOptions['body'] = JSON.stringify(data)

  const response = await fetch(url, requestOptions)
  const json = await response.json()
  return json;
}


//Function to open a modal specified by its id in string format, used for both the newmodal and modmodal.
async function openModal(modalID) {
  //displays modal of choice
  var modal = document.getElementById(modalID);
  modal.style.display = "block";

  //clear any data lingering in inputs and textareas
  var list = document.getElementById(modalID).getElementsByTagName('input');
  for (var i = 0; i < list.length; i++) {
      list[i].value = ""; 
  }

  var list = document.getElementById(modalID).getElementsByTagName('textarea');
  for (var i = 0; i < list.length; i++) {
      list[i].value = ""; 
  }

  var list = document.getElementById(modalID).getElementsByTagName('text');
  for (var i = 0; i < list.length; i++) {
      list[i].style.display = "none"; 
  }

  try {
    // Get the <span> element that closes the modal
    var span = document.getElementById("close-" + modalID);
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      console.log('close ' + modalID)
      modal.style.display = "none";
      document.getElementById("mod_change_log").open = false;
      console.log(modalID + ' closed')
    }
  } catch (exceptionVar) {
    var span = 'no span element found';
  }
  
}