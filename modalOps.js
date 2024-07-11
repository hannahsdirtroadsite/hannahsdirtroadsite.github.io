
async function openModal(modalName) {
  var modal = document.getElementById(modalName);
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementById("close-" + modalName);
  console.log(span)
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    console.log('close ' + modalName)
    modal.style.display = "none";
    console.log(modalName + ' closed')
  }
}