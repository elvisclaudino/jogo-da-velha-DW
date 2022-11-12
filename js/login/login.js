const form = {
  username: document.querySelector("#username"),
  password: document.querySelector("password"),
};

let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();
  const login = "http://localhost:3033/login";

  fetch(login, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.username.value,
      password: form.password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // code here //
      if (data.error) {
        alert("Error Password or Username"); /*displays error message*/
      } else {
        window.open(
          "target.html"
        ); /*opens the target page while Id & password matches*/
      }
    })
    .catch((err) => {
      console.log(err);
    });
});