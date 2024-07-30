/*
resetOperations.js
Hannah Robertson
7/21/24
Account recovery operations
*/

//url to API/lambda implementation to get our information in the right format
var loginUrl = 'https://0uylrrpo6i.execute-api.us-east-1.amazonaws.com/Stage1/login';

function recoverEmail() {
  document.getElementById("loginModal").style.display = "none";
  openModal("recoverEmailModal");
}

async function getSecurityQuestion() {
  let uname = document.getElementById("recovery_username").value;

  if (uname === "") {
    return;
  }

  data = {}
  data['username'] = uname;

  //send request
  let response = await sendRequest("POST", data, loginUrl + "/recover/email");
  let resJson = await JSON.parse(response);

  if (resJson['status'] == "Invalid") {
    error = document.getElementById("recoveryErrorText");
    error.style.display = "block";
  }

  else if (resJson['status'] == "Valid") {
    document.getElementById("recoverEmailModal").style.display = "none";
    openModal("recoveryQuestionModal");
    document.getElementById("recovery_question_username").value = uname;
    document.getElementById("recovery_security_question").value = resJson['security_question'];
  }
}

async function resetPasswordSecurityQuestion() {
  let uname = document.getElementById("recovery_question_username").value;
  let answer = document.getElementById("recovery_security_question_answer").value;

  if (uname === "") {
    return;
  }

  data = {}
  data['username'] = uname;
  data['answer'] = answer;

  //get information from modal
  var data = {};
  data.username = uname;
  data.answer = answer;

  //send request
  let response = await sendRequest("POST", data, loginUrl + "/recover/answer");

  let resJson = await JSON.parse(response);

  if (resJson['status'] == "Invalid") {
    error = document.getElementById("errorText");
    error.style.display = "block";
  }

  else if (resJson['status'] == "Valid") {
    document.getElementById("recoveryQuestionModal").style.display = "none";
    openModal("setupModal");
    document.getElementById("setup_username").value = uname;
  }  
}