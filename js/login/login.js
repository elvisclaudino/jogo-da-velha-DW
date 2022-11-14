const form = {
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  submit: document.querySelector("#loginForm"),
};

let button = form.submit.addEventListener("submit", (e) => {
  e.preventDefault();

  axios.post('http://localhost:3033/users/login', {
    username: form.username.value,
    password: form.password.value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
});
