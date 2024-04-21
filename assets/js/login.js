const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const emailInputHelp = document.getElementById("emailInputHelp");
const passwordInputHelp = document.getElementById("passwordInputHelp");

window.addEventListener("load", () => {
  if (!localStorage.getItem("userStorage")) {
    let userData = [
      {
        userId : 1,
        userName: "Webmaster",
        userEmail: "webmaster@hotmail.com",
        userPassword: "Webmaster@2024",
        isActive: false
      }
    ];

    localStorage.setItem("userStorage", JSON.stringify(userData));
  }

  else {
    const userData = JSON.parse(localStorage.getItem("userStorage"));

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].isActive === true) {
        window.location.href = "./store-list.html";
      }
    }
  }
});

let userData = JSON.parse(localStorage.getItem("userStorage"));

for (let i = 0; i < userData.length; i++){
  if (userData[i].isActive === true){
    window.location.href = "dashboard.html";
  }
}

const restoreDefault = () => {
  emailInputHelp.innerText = "";
  emailInputHelp.classList.add("hidden");
  emailInput.style.border = "1px var(--light-gray-color) solid";
  emailInput.style.outline = "none";
  passwordInputHelp.innerText = "";
  passwordInputHelp.classList.add("hidden");
  passwordInput.style.border = "1px var(--light-gray-color) solid";
  passwordInput.style.outline = "none";
}

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  restoreDefault();
  let emailRegularExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let isError = false;

  if (!emailRegularExpression.test(emailInput.value)) {
    emailInputHelp.innerText = "Veuillez saisir une adresse email valide.";
    emailInputHelp.classList.remove("hidden");
    emailInput.style.border = "1px solid var(--red-color)";
    emailInput.style.outline = "4px solid var(--error-outline-red-color)";
    isError = true;
  }

  if (passwordInput.value.length < 8) {
    passwordInputHelp.innerText = "Veuillez saisir un mot de passe valide.";
    passwordInputHelp.classList.remove("hidden");
    passwordInput.style.border = "1px solid var(--red-color)";
    passwordInput.style.outline = "4px solid var(--error-outline-red-color)";
    isError = true;
  }

  if (!isError) {
    const userData = JSON.parse(localStorage.getItem("userStorage"));
    let isError = true;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userEmail === emailInput.value) {
        isError = false;

        if (userData[i].userPassword === passwordInput.value) {
          userData[i].isActive = true;
          localStorage.setItem("userStorage", JSON.stringify(userData));
          window.location.href = "./store-list.html";
          return;
        } 
        
        else {
          passwordInputHelp.innerText = "Mot de passe ou adresse email incorrect, essayez à nouveau.";
          passwordInputHelp.classList.remove("hidden");
          passwordInput.style.border = "1px solid var(--red-color)";
          passwordInput.style.outline = "4px solid var(--error-outline-red-color)";
          return;
        }
      }
    }

    if (isError) {
      emailInputHelp.innerText = "Aucun compte n'a été trouvé.";
      emailInputHelp.classList.remove("hidden");
      emailInput.style.border = "1px solid var(--red-color)";
      emailInput.style.outline = "4px solid var(--error-outline-red-color)";
    }
  }
});
