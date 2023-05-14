import React, { useState } from "react";

function submitLogin(e) {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(e.target));

  fetch("/api/login", { method: e.target.method, body: data })
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          alert(data.token);
        });
      } else {
        res.json().then((data) => {
          alert(data.message);
        });
      }
    })
    .catch((error) => console.error(error));
}

function submitSignup(e) {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(e.target));

  fetch("/api/signup", { method: e.target.method, body: data })
    .then((res) => {
      if (res.status == 201) {
        res.json().then((data) => {
          alert(data.message);
        });
      } else {
        res.json().then((data) => {
          alert(data.message);
        });
      }
    })
    .catch((error) => console.error(error));
}

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setShowLogin(!showLogin);
        }}
      >
        {!showLogin ? "Go to Log in" : "Go to Sign up"}
      </button>

      <br />

      {showLogin ? (
        <form
          method="post"
          onSubmit={(e) => {
            submitLogin(e);
          }}
        >
          <label>
            Email: <input name="email" defaultValue="" />
          </label>

          <label>
            Password: <input name="password" defaultValue="" />
          </label>

          <button type="submit">Log in</button>
        </form>
      ) : (
        <form
          method="post"
          onSubmit={(e) => {
            submitSignup(e);
          }}
        >
          <label>
            Firstname: <input name="firstname" defaultValue="" />
          </label>

          <label>
            Lastname: <input name="lastname" defaultValue="" />
          </label>

          <label>
            Email: <input name="email" defaultValue="" />
          </label>

          <label>
            Password: <input name="password" defaultValue="" />
          </label>

          <button type="submit">Sign up</button>
        </form>
      )}
    </>
  );
}

export default Login;
