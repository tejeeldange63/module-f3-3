let welcome = document.getElementById("welcome");

let masterData = JSON.parse(localStorage.getItem("users"));
let data = JSON.parse(localStorage.getItem("currentUser"));

let correctName = data[0].username;
let email = data[0].email;

displayinfo(correctName, email);

function changePassword() {
  pwd = document.getElementById("OldPassword").value;
  let newpwd1 = document.getElementById("NewPassword").value;
  let confirmnewpwd = document.getElementById("confirmNewPassword").value;
  let validPass =
    masterData.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) => data.email.toLowerCase() == email && data.pass == pwd
    );
  console.log(validPass);

  if (!validPass) {
    alert("Incorrect password");
  } else {
    if (newpwd1 == confirmnewpwd) {
      objIndex = masterData.findIndex((obj) => obj.pass == pwd);
      masterData[objIndex].pass = confirmnewpwd;
      console.log(masterData);
      localStorage.setItem("users", JSON.stringify(masterData));
      let data = JSON.parse(localStorage.getItem("currentUser"));
      data[0].pass = confirmnewpwd;
    }
  }
}

function logout() {
  window.location.href = "/index.html";
  localStorage.removeItem("currentUser");
}

function displayinfo(name, email) {
  console.log(name, email);
  welcome.innerHTML = `<p>Welcome Back ${name}</p> <p>Your Email ID : ${email}</p>`;
}
