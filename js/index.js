let sections = document.querySelectorAll("section")
let navlinks = document.querySelectorAll("header nav a")
let contactForm = document.querySelector('.contact-container')
let emailContact = document.getElementById("email-contact")
let nameContact = document.getElementById("name-contact")
let message = document.getElementById("message")

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
GitHubCalendar(".calendar", "THEPRANAYMISHRA");
GitHubCalendar(".calendar", "THEPRANAYMISHRA", { responsive: true });

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (message.length <= 5) {
        return alert("Please write message in message box")
    } else {
        let payload = {
            name: nameContact.value,
            email: emailContact.value,
            message: message.value
        }
        fetch('https://portfolio-1xro.onrender.com/send-email', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            if (res.status === 200) {
                alert("Contact details are sent successfully")
            } else if (res.status === 429) {
                alert("You have exceeded the limit of sending emails per day.")
            }
        }).catch((err) => {
            alert('Internal server error')
            console.log(err)
        })
    }
})


