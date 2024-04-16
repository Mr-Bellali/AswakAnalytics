const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");

const loginForm = document.getElementById("loginForm");

window.addEventListener("load", () => {
    if (!localStorage.getItem("userStorage")) {
      let userData = [
        {
          userId : 1,
          userName: "admin",
          userEmail: "admin@hotmail.com",
          userPassword: "admin@2024",
          isActive: false
        }
      ];
  
      localStorage.setItem("userStorage", JSON.stringify(userData));
    }

    else {
        const userData = JSON.parse(localStorage.getItem("userStorage"));

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].isActive === true) {
                window.location.href = "./dashboard.html";
            }
        }
    }
});

loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    let emailRegularExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let isError = false;

    if (!emailRegularExpression.test(emailField.value)) {
        isError = true;
      }
    
      if (passwordField.value.length < 8) {
        isError = true;
      }
})