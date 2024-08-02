/*
pageOperations.js
Hannah Robertson
7/19/24
Functions to fill the cooperation_portal page with a datatable
And to operate the buttons
*/


//url to API/lambda implementation to get our information in the right format
const tableSource = 'https://2oaas6jaua.execute-api.us-east-1.amazonaws.com/Stage1/table';
const tokenAuth = 'https://0uylrrpo6i.execute-api.us-east-1.amazonaws.com/Stage1/login/token';

//retrieves all the listings from the API and creates a datatable. 
async function getAllListings() {
  checkToken();

  let table = new DataTable('#listingsTable', {
    ajax: {
      url: tableSource,
      dataSrc: {
        data: 'results',
        draw: 'request',
        recordsTotal: 'total',
        recordsFiltered: 'filtered'
      }
    },
    columnDefs: [

      {
        target: 4,
        visible: false
      },
      {
        target: 6,
        visible: false
      }
    ]
  });


  //when clicked, the table rows should produce a modal with more complete/legible information on the individual record.
  $('#listingsTable tbody').on('click', 'tr', function () {
    let data = table.row(this).data();
    if (data !== undefined) {
      openModal('modModal');
      $("#mod_id").val(data[0])
      $("#mod_address").val(data[1])
      $("#mod_mls_num").val(data[2])
      $("#mod_payment").val(data[3])
      $("#mod_status").val(data[4])
      $("#mod_last_mod").val(data[5])
      $("#mod_change_log").html("<summary>Change Log</summary>" + data[6].replace('\n', '<br>'))
    }
  });
}

//method to post a new listing
async function postListing() {
  var modal = document.getElementById("addModal");
  modal.style.display = "none";

  //get info from modal
  var data = {};
  data.address = document.getElementById('add_address').value;
  data.mls_num = document.getElementById('add_mls_num').value;
  data.payment = document.getElementById('add_payment').value;
  
  checkToken()
  data.token = localStorage.getItem('coopToken');
  data.username = localStorage.getItem('username')

  await sendRequest("POST", data, tableSource)

  window.location.reload()
}
  
//method to put a modified listing
async function putListing() {
  var modal = document.getElementById("modModal");
  modal.style.display = "none";

  //get information from modal
  var data = {};
  data.id = document.getElementById("mod_id").value;
  data.address = document.getElementById('mod_address').value;
  data.mls_num = document.getElementById('mod_mls_num').value;
  data.payment = document.getElementById('mod_payment').value;

  checkToken()
  data.token = localStorage.getItem('coopToken');
  data.username = localStorage.getItem('username')

  //send request
  await sendRequest("PUT", data, tableSource);

  window.location.reload()
}

//method to request an address entry be deleted/marked inactive
async function deleteListing() {
  var modal = document.getElementById("modModal");
  modal.style.display = "none";

  //confirmation pop up- it's a pain to un-delete something.
  let address = document.getElementById("mod_address").value;
  confirm("Are you sure you want to delete this listing for address " + address + "?")

  //Id of data to be deleted
  var data = {};
  data.id = document.getElementById("mod_id").value;

  checkToken()
  data.token = localStorage.getItem('coopToken');
  data.username = localStorage.getItem('username')

  //send delete request
  await sendRequest("PATCH", data, tableSource);

  window.location.reload()
}

async function checkToken() {
  let token = localStorage.getItem('coopToken');
  let username = localStorage.getItem('username')

  if (token !== undefined && token !== null && username !== undefined && username !== null) {
    await authenticateToken(username, token);
  }
  else {
    console.log('redirect')
    window.location.href = "login_portal.html";
  }
}

async function authenticateToken(username, token) {
  var data = {};
  data.token = token;
  data.username = username;

  //send request
  let response = await sendRequest("POST", data, tokenAuth);

  let resJson = await JSON.parse(response);
  console.log(resJson)

  if (resJson['status'] == "Invalid") {
    window.location.href = "login_portal.html";
  }

  else if (resJson['status'] == "Login") {
    console.log('auth token')
    console.log(String.fromCharCode(resJson['token']));
    localStorage.setItem('coopToken', resJson['token']);
  }
}

function logout() {
  localStorage.clear();
  window.location.href="../";
}