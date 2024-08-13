function toggleMenu() {
    let dropDown = document.getElementById("header_drop_down");
    if (dropDown.style.display == "none" || dropDown.style.display == '') {
        dropDown.style.display = "block"
    }
    else {
        dropDown.style.display = "none"
    }
}

function changeMap(element) {
    thumbs = document.getElementsByClassName("select_img")[0]
    thumbs.classList.remove("select_img")
    element.classList.add("select_img")

    //list of all elements currently being shown
    const elsList = document.querySelectorAll(".show_me")
    for (const element of elsList) {
        toggleElements(element)
    }

    //show new elements
    toggleElements(document.getElementById(element.id + "_header"))
    toggleElements(document.getElementById(element.id + "_large"))
    toggleElements(document.getElementById(element.id + "_key"))
    toggleElements(document.getElementById(element.id + "_source"))
}

function toggleElements(element) {
    element.classList.toggle("show_me")
    element.classList.toggle("hide_me")
}

window.onload = function () {
    document.getElementById('contact_form').addEventListener('submit', function (event) {

        event.preventDefault();

        let fields = ['user_name', 'user_email']
    
        for (let i = 0; i < 2; i++) {
            let field = document.getElementById(fields[i]);

            if (field.value == '') {
                field.style.border = "thick solid #bb2024";
                field.placeholder = "required field"
                console.log('invalid ' + fields[i] + " element.")
                return;
            }
        }

        emailjs.sendForm('service_8r8dc1k', 'template_poy4uku', this)
            .then(() => {
                console.log('send SUCCESS!');
                alert("Email Sent!")
                window.location.reload();
            }, (error) => {
                console.log('send FAILED...', error);
                alert("Send failed, please try again later. ")
            });
    });
}
