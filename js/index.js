let sections = document.querySelectorAll("section")
let navlinks = document.querySelectorAll("header nav a")
let contactForm = document.querySelector('.contact-container')
let emailContact = document.getElementById("email-contact")
let nameContact = document.getElementById("name-contact")
let message = document.getElementById("message")
let submitBtn = document.getElementById("submit-btn")

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })

    let header = document.querySelector('header')

    header.classList.toggle('sticky', window.scrollY > 100)

    navbar.classList.remove('active')
}

const HamburgerMenuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector(".navbar")

HamburgerMenuIcon.addEventListener('click', function () {
    navbar.classList.toggle('active')
});

function openPDF() {
    window.open('../Pranay_Mishra_Resume.pdf', '_blank');
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!message.value) {
        let failureCard = document.querySelector(".failed");
        let failureCardText = document.querySelector(".failed p");
        failureCardText.textContent = "Please write message!"
        failureCard.style.display = "block";
        submitBtn.disabled = true;
        setTimeout(() => {
            failureCard.style.display = "none";
            submitBtn.disabled = false;
        }, 5000)
        return
    } else {
        let payload = {
            name: nameContact.value,
            email: emailContact.value,
            message: message.value
        }
        submitBtn.innerHTML = `<div class="loader"></div>`

        fetch('https://portfolio-1xro.onrender.com/send-email', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            if (res.status === 200) {
                let successCard = document.querySelector(".success");
                let successCardText = document.querySelector(".success p");
                successCardText.textContent = "Mail send successfully!"
                successCard.style.display = "block";
                submitBtn.disabled = true;
                submitBtn.innerText = "submit"
                setTimeout(() => {
                    successCard.style.display = "none";
                    submitBtn.disabled = false;
                }, 5000)
            } else if (res.status === 429) {
                let failureCard = document.querySelector(".failed");
                let failureCardText = document.querySelector(".failed p");
                failureCardText.textContent = "Exceeded the limit!"
                failureCard.style.display = "block";
                submitBtn.disabled = true;
                submitBtn.innerText = "submit"
                setTimeout(() => {
                    failureCard.style.display = "none";
                    submitBtn.disabled = false;
                }, 5000)
            }
        }).catch((err) => {
            let failureCard = document.querySelector(".failed");
            let failureCardText = document.querySelector(".failed p");
            failureCardText.textContent = "Internal server error!"
            failureCard.style.display = "block";
            submitBtn.disabled = true;
            submitBtn.innerText = "submit"
            setTimeout(() => {
                failureCard.style.display = "none";
                submitBtn.disabled = false;
            }, 5000)
        })
    }
})


