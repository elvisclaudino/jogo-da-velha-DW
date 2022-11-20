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
    if (response.status = 200) {
      const {username,wins,defeats} = response.data.data;
      localStorage.setItem('username', username);
      localStorage.setItem('wins', wins);
      localStorage.setItem('defeats', defeats);
      window.location.href = 'home.html'
    }
    else{

    }
  })
  .catch(function (error) {
    console.log(error);
  });
  
});
