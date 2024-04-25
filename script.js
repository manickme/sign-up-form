const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const createAcctBtn = document.querySelector(".form-submit > button");
const form = document.querySelector("form");
const input = document.querySelectorAll("input");

const firstNameError = document.querySelector("#first-name + span.error");
const lastNameError = document.querySelector("#last-name + span.error");
const emailError = document.querySelector("#email + span.error");
const passwordError = document.querySelector("#password + span.error");

let submitCount = 0;

function showFirstNameError() {
  if (firstName.validity.valueMissing) {
    firstNameError.textContent = `*Please enter your first name`;
  } else if (firstName.validity.tooShort) {
    firstNameError.textContent = `*Must be at least ${firstName.minLength} characters`;
  } else if (firstName.validity.tooLong) {
    firstNameError.textContent = `*Must be at most ${firstName.maxLength} characters`;
  }
}

function showLastNameError() {
  if (lastName.validity.valueMissing) {
    lastNameError.textContent = `*Please enter your last name`;
  } else if (lastName.validity.tooShort) {
    lastNameError.textContent = `*Must be at least ${lastName.minLength} characters`;
  } else if (lastName.validity.tooLong) {
    lastNameError.textContent = `*Must be at most ${lastName.maxLength} characters`;
  }
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "*Please enter an email address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "*Input must be an email address";
  }
}

function showPasswordError() {
  const specialCharRegex = new RegExp("[!@#$%^&*_=+-]");
  const uppercaseCharRegex = new RegExp("[A-Z]");
  const lowercaseCharRegex = new RegExp("[a-z]");
  const digitCharRegex = new RegExp("[0-9]");

  if (password.validity.valueMissing) {
    passwordError.textContent = "*Please enter a password";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `*Password must be at least ${password.minLength} characters`;
  } else if (password.validity.tooLong) {
    passwordError.textContent = `*Password must be at most ${password.maxLength} characters`;
  } else if (!uppercaseCharRegex.test(password.value)) {
    passwordError.textContent =
      "*Password must contain at least 1 uppercase character";
  } else if (!lowercaseCharRegex.test(password.value)) {
    passwordError.textContent =
      "*Password must contain at least 1 lowercase character";
  } else if (!digitCharRegex.test(password.value)) {
    passwordError.textContent = "*Password must contain at least 1 digit";
  } else if (!specialCharRegex.test(password.value)) {
    passwordError.textContent =
      "*Password must contain at least 1 special character";
  } else if (password.value !== confirmPassword.value) {
    passwordError.textContent = "Passwords do  not match";
  }
}

firstName.addEventListener("input", () => {
  if (firstName.validity.valid) {
    emailError.textContent = "";
  } else if (submitCount > 0) {
    // Only show error after first submission attempt
    showFirstNameError();
  }
});

lastName.addEventListener("input", () => {
  if (lastName.validity.valid) {
    emailError.textContent = "";
  }
  if (submitCount > 0) {
    // Only show error after first submission attempt
    showLastNameError();
  }
});

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
  } else if (submitCount > 0) {
    // Only show error after first submission attempt
    showEmailError();
  }
});

password.addEventListener("input", () => {
  if (password.validity.valid) {
    passwordError.textContent = "";
  } else if (submitCount > 0) {
    // Only show error after first submission attempt
    showPasswordError();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitCount += 1;

  for (let node of Array.from(input)) {
    // Setting outline color and size for valid vs invalid inputs
    // when submitting form
    if (!node.validity.valid) {
      node.style.setProperty("--clr-outline", "#c65251");
      node.style.setProperty("--sz-outline", "2px");
    } else {
      node.style.setProperty("--clr-outline", "#5daec5");
      node.style.setProperty("--sz-outline", "0px");
    }
  }

  showFirstNameError();
  showLastNameError();
  showEmailError();
  showPasswordError();
});
