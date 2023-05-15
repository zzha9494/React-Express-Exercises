import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function submitLogin(e, navigate) {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(e.target));

  fetch("/api/login", { method: e.target.method, body: data })
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          // alert(jwt_decode(data.token).userId);
          localStorage.setItem("token", data.token);
          alert(data.message);
          navigate("/");
        });
      } else {
        res.json().then((data) => {
          alert(data.message);
        });
      }
    })
    .catch((error) => console.error(error));
}

function submitSignup(e, navigate) {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(e.target));

  fetch("/api/signup", { method: e.target.method, body: data })
    .then((res) => {
      if (res.status == 201) {
        res.json().then((data) => {
          localStorage.setItem("token", data.token);
          alert(data.message);
          navigate("/");
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
  const navigate = useNavigate();

  return localStorage.getItem("token") ? (
    <h1>Please log out first</h1>
  ) : (
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
            submitLogin(e, navigate);
          }}
        >
          <label>
            Email
            <input
              type="email"
              name="email"
              pattern="([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"
              size="30"
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
              size="30"
              required
            />
          </label>

          <button type="submit">Log in</button>
        </form>
      ) : (
        <form
          method="post"
          onSubmit={(e) => {
            submitSignup(e, navigate);
          }}
        >
          <label>
            Firstname:
            <input name="firstname" pattern="[A-Za-z]{1,}" size="30" required />
          </label>

          <label>
            Lastname:
            <input name="lastname" pattern="[A-Za-z]{1,}" size="30" required />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              pattern="([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"
              size="30"
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$"
              size="30"
              required
            />
          </label>

          <button type="submit">Sign up</button>
        </form>
      )}
    </>
  );
}

export default Login;
