const users = JSON.parse(localStorage.getItem("users"));

if (users == null) {
  let init = [];
  localStorage.setItem("users", JSON.stringify(init));
}

const Login = JSON.parse(localStorage.getItem("Login"));

if(Login == null){
  localStorage.setItem("Login", JSON.stringify("false"));
}
