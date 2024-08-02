
function toggleMenu() {
    let dropDown = document.getElementById("header_drop_down");
    if (dropDown.style.display = "none" || dropDown.style.display == '') {
        dropDown.style.display = "block"
    }
    else {
        dropDown.style.display = "none"
    }
}

function hideAllPhotos() {
    all_photos = document.getElementsByClassName("full_image")
    for (let i = 0; i < all_photos.length; i++) {
        all_photos[i].style.display = "none"
    }
}

function showImage(element) {
    hideAllPhotos()
    photo = document.getElementById(element.id + "_large");
    photo.style.display = "block"
}

function hideImage(element) {
    if (window.screen.width > 600) {
        photo = document.getElementById(element.id);
        photo.style.display = "none"
    }
}

const SLIDE_NUM = 15;
function nextSlide() {
    currentElement = document.getElementsByClassName('full_image_show')[0]
    currentNum = parseInt(currentElement.name);
    nextNum = (currentNum + 1) % SLIDE_NUM;
    nextElement = document.getElementsByName(nextNum)[0]
    currentElement.classList.remove("full_image_show");
    currentElement.classList.add("full_image_hide")
    nextElement.classList.add("full_image_show");
    nextElement.classList.remove("full_image_hide")
}

function prevSlide() {
    currentElement = document.getElementsByClassName('full_image_show')[0]
    currentNum = parseInt(currentElement.name);
    nextNum = (currentNum - 1 + SLIDE_NUM) % SLIDE_NUM;
    nextElement = document.getElementsByName(nextNum)[0]
    currentElement.classList.remove("full_image_show");
    currentElement.classList.add("full_image_hide")
    nextElement.classList.add("full_image_show");
    nextElement.classList.remove("full_image_hide")
}

function sendEmail() {
    console.log("sending")
    emailjs.sendForm('service_8r8dc1k', '#contact_form', 'template_poy4uku')
      .then(() => {
        console.log('SUCCESS!');
      }, (error) => {
        console.log('FAILED...', error);
      });
  }