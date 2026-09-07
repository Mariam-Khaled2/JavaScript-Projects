const form = document.getElementById("contactForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";

    const span = formControl.querySelector("span");
    span.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control";
}

form.addEventListener("submit", function(e) {

   let isValid = true;

    if(username.value.trim() === "") {
      showError(username, "Username is required");
      isValid = false;
    } else {
        showSuccess(username);
    }

if(email.value.trim() === "") {
    showError(email, "Email is required");
          isValid = false;
} else {
    showSuccess(email);
}


if(phone.value.trim() === "") {
    showError(phone, "Phone is required");
          isValid = false;
}else if (phone.value.trim().length !== 11) {
  showError(phone, "Enter a valid number with 11 number");
}
else {
    showSuccess(phone);
}

if(message.value.trim() === "") {
    showError(message, "message is required");
          isValid = false;
} else {
    showSuccess(message);
}

 if(isValid === false)
  e.preventDefault();
});
