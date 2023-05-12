import React from "react";

function handleSubmit(e) {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(e.target));

  fetch("/api/login", { method: e.target.method, body: data })
    .then((res) => {
      if (res.msg == "ok") {
        alert("OK");
        // set user id here
      } else {
        alert("wrong password");
      }
    })
    .catch((error) => console.error(error));
}

function Login() {
  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Email: <input name="email" defaultValue="" />
        </label>

        <label>
          Password: <input name="password" defaultValue="" />
        </label>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
