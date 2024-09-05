/*
loginOperations.js
Hannah Robertson
7/21/24
Control login, set password
*/

//url to API/lambda implementation to get our information in the right format
var loginUrl = 'https://0uylrrpo6i.execute-api.us-east-1.amazonaws.com/Stage1/login';

async function login() {
  let uname = document.getElementById("username").value;
  let pword = document.getElementById("password").value;

  if (uname === "" || pword === "") {
    return;
  }

  pwd_encode = encode(uname, pword)

  //get information from modal
  var data = {};
  data.username = uname;
  data.password = pwd_encode;

  //send request
  let response = await sendRequest("POST", data, loginUrl);

  let resJson = await JSON.parse(response);
  console.log(resJson)
  console.log(resJson['token'])

  if (resJson['status'] == "Invalid") {
    document.getElementById("errorText").style.display = "block";
  }
  else if (resJson['status'] == "Setup") {
    document.getElementById("loginModal").style.display = "none";
    openModal('setupModal')
    document.getElementById("setup_username").value = uname;
  }
  else if (resJson['status'] == "Login") {
    localStorage.setItem('coopToken', resJson['token'])
    localStorage.setItem('username', uname)
    window.location.href = "cooperation_portal.html";
  }
}

async function setInformation() {
  let uname = document.getElementById("setup_username").value;
  let pword = document.getElementById("setup_password").value;
  let confirm_pword = document.getElementById("confirm_password").value;
  let seq_ques = document.getElementById("security_question").value;
  let seq_ans = document.getElementById("security_question_answer").value;

  if (pword !== confirm_pword) {
    document.getElementById("errorPass").style.display = "block";
    return;
  }

  if (seq_ans == seq_ques) {
    document.getElementById("errorSeq").style.display = "block";
    return;
  }

  pwd_encode = encode(uname, pword)

  //get information from modal
  var data = {};
  data.username = uname;
  data.password = pwd_encode;
  data.security_question = seq_ques;
  data.security_answer = seq_ans;

  //send request
  let response = await sendRequest("PATCH", data, loginUrl + "/setup");

  let resJson = await JSON.parse(response);

  console.log(resJson['status'])

  if (resJson['status'] == "Invalid") {
    error = document.getElementById("errorText");
    error.style.display = "block";
  }

  else if (resJson['status'] == "Valid") {
    document.getElementById("setupModal").style.display = "none";
    document.getElementById("loginModal").style.display = "block";
  }
}

//Function to encode a message with a given key
function encode(key, message) {
  var output = ""

  for (i = 0; i < message.length; i++) {
    mNum = message.charCodeAt(i)
    kNum = key.charCodeAt(i % key.length)
    scramble = Math.floor(Math.random() * 255);
    mScramble = (mNum + scramble) % 255;
    kScramble = (kNum + scramble) % 255;
    mCode = String.fromCharCode(mScramble);
    kCode = String.fromCharCode(kScramble);
    output = output + kCode + mCode;
  }

  return output;
}

//Function to decode a message with a given key
function decode(key, message) {
  var output = ""

  for (i = 0; i < message.length; i = i + 2) {
    kNum = message.charCodeAt(i)
    mNum = message.charCodeAt(i + 1)
    kRef = key.charCodeAt((i / 2) % key.length)
    scramble = kNum - kRef;
    mScramble = (mNum - scramble + 255) % 255;
    mCode = String.fromCharCode(mScramble);
    output = output + mCode;
  }

  return output;
}