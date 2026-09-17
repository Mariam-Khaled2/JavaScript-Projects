const emailInput = document.getElementById("email");
const subscribeButton = document.getElementById("subscribe-btn");
const successPopup = document.getElementById("success-popup");
const closePopup = document.getElementById("close-popup");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const numberInput = document.getElementById("number");
const bookButton = document.getElementById("book-btn");
const reservationPopup = document.getElementById("reservation-popup");
const closeReservationPopup = document.getElementById("close-reservation-popup");


subscribeButton.addEventListener("click", function() {
    if (emailInput.value === "") {
        alert("Please enter your email.");
    } else {
        successPopup.style.display = "flex";
    }
});

closePopup.addEventListener("click", function() {
    successPopup.style.display = "none";
});


bookButton.addEventListener("click", function () {
    if (nameInput.value === "") {
        alert("Please enter your name.");
    } else if (phoneInput.value === "") {
        alert("Please enter your number.");
    } else if (dateInput.value === "") {
        alert("Please enter your date.");
    } else if (timeInput.value === "") {
        alert("Please enter your time.");
    } else if (numberInput.value === "") {
        alert("Please enter number of people.");
    } else {
        document.getElementById("reservation-details").textContent =
            "Thank you, " + nameInput.value + ". Your table is reserved for " + numberInput.value + " people on " + dateInput.value + " at " + timeInput.value + ".";
        reservationPopup.style.display = "flex";
    }
});

closeReservationPopup.addEventListener("click", function () {
    reservationPopup.style.display = "none";
});


