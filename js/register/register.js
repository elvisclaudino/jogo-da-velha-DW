const form = {
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  confirmPassword: document.querySelector("#confirmPassword"),
  submit: document.querySelector("#registerForm"),
};

let button = form.submit.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = "http://localhost:3033/users";

  axios.post('http://localhost:3033/users', {
    username: form.username.value,
    password: form.password.value
  })
  .then(function (response) {
    window.location.replace("login.html");
  })
  .catch(function (error) {
    console.log(error);
    alert(error);
  });
  
});
