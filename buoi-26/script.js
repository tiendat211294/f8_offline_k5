//Ẩn-hiện menu
var btn = document.querySelector(".btn");
var loginMenu = document.querySelector(".login-menu");
var overlay = document.querySelector(".overlay");
var closeKeys = document.querySelectorAll(".close-key");
overlay.addEventListener("click", function () {
  loginMenu.classList.add("close");
});
btn.addEventListener("click", function () {
  loginMenu.classList.remove("close");
});
for (let i = 0; i < closeKeys.length; i++) {
  closeKeys[i].addEventListener("click", function () {
    loginMenu.classList.add("close");
  });
}

//Ẩn-hiện tab
var loginTab = document.querySelector(".login");
var registerTab = document.querySelector(".register");
var loginTabBtn = document.querySelectorAll(".login-tab-btn");
var registerTabBtn = document.querySelectorAll(".register-tab-btn");
var inputs = document.getElementsByTagName("input");
loginTabBtn[1].addEventListener("click", function () {
  registerTab.style.display = "none";
  loginTab.style.display = "flex";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    alerts[i].innerText = "";
    inputs[i].style = "";
  }
});
registerTabBtn[0].addEventListener("click", function () {
  loginTab.style.display = "none";
  registerTab.style.display = "flex";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    alerts[i].innerText = "";
    inputs[i].style = "";
  }
});

//Ẩn-hiện password
var passes = document.querySelectorAll(".pass");
var eyes = document.querySelectorAll(".eye");
for (let i = 0; i < eyes.length; i++) {
  eyes[i].addEventListener("click", function () {
    var check = eyes[i].innerHTML;
    if (check === '<i class="fa-regular fa-eye-slash"></i>') {
      eyes[i].innerHTML = '<i class="fa-regular fa-eye"></i>';
      passes[i].type = "password";
    } else {
      eyes[i].innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      passes[i].type = "text";
    }
  });
}

//Hiện lỗi nhập liệu
var alerts = document.querySelectorAll(".alert");
for (let i = 0; i < inputs.length; i++) {
  function findError() {
    if (!inputs[i].value) {
      alerts[i].innerText = "Vui lòng nhập thông tin";
      inputs[i].style = "border-color: red";
    } else if (
      inputs[i].classList.contains("email-input") &&
      !inputs[i].value.includes("@")
    ) {
      alerts[i].innerText = "Vui lòng nhập đúng định dạng email";
      inputs[i].style = "border-color: red";
    }
  }
  inputs[i].addEventListener("blur", findError);
  inputs[i].addEventListener("input", function () {
    inputs[i].style = "";
    alerts[i].innerText = "";
  });
  loginTab.addEventListener("submit", function (event) {
    if (!alerts[i].innerText) {
      event.preventDefault();
    }
    findError();
  });
  registerTab.addEventListener("submit", function (event) {
    if (!alerts[i].innerText) {
      event.preventDefault();
    }
    findError();
  });
}
