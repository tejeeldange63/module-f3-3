let welcome = document.getElementById("welcome");

function signup() {
  let firstname = document.querySelector("#firstname").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let repassword = document.querySelector("#repassword").value;

  var users = JSON.parse(localStorage.getItem("users") || "[]");

  let exist =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) => data.email.toLowerCase() == email.toLowerCase()
    );

  if (firstname != "" && email != "" && password != "") {
    if (password === repassword) {
      var user = {
        email: email,
        pass: password,
        username: firstname,
      };
      if (!exist) {
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "login.html";
      } else {
        alert(" Email already registered please login");
      }
    } else {
      alert(" Password not match ");
    }
  } else {
    alert(" Please Enter Required deat ");
  }
}

function login() {
  let email = document.getElementById("loginEmail").value,
    pwd = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  var currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");

  if (email != "" && pwd != "") {
    let exist =
      users.length &&
      JSON.parse(localStorage.getItem("users")).some(
        (data) => data.email.toLowerCase() == email && data.pass == pwd
      );
    if (!exist) {
      alert("Incorrect login");
    } else {
      let data = JSON.parse(localStorage.getItem("users"));
      let correctUserData = data.find((usr) => usr.email === email);

      let token = generateToken();
      let User = {
        email: correctUserData.email,
        pass: pwd,
        username: correctUserData.username,
        token: token,
      };
      currentUser.push(User);

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      window.location.href = "dashboard.html";
    }
  } else {
    alert("<== Please Enter Required ==>");
  }
}

function generateToken() {
  let capital_digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let small_digit = "abcdefghijklmnopqrstuvwxyz";
  let number = "0123456789";
  let special = "!@#$%^&*()_+";

  let characters = capital_digit + small_digit + number + special;

  let token = "";
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * characters.length);
    token = token + characters[random];
  }
  return token;
}

function displayinfo(name, email) {
  welcome.innerHTML = `<p>Welcome Back ${name}</p> <p>Your Email ID : ${email}</p>`;
}
