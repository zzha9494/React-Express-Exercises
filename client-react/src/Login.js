import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mainPageState, searchResult, filter, item } = state ?? {};

  const submitLogin = (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(e.target));

    fetch("/api/login", { method: e.target.method, body: data })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            localStorage.setItem("token", data.token);
            alert(data.message);
            navigate("/", {
              state: {
                preMainPageState: mainPageState,
                preSearchResult: searchResult,
                preFilter: filter,
                preItem: item,
              },
            });
          });
        } else {
          res.json().then((data) => {
            alert(data.message);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const submitSignup = (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(e.target));

    fetch("/api/signup", { method: e.target.method, body: data })
      .then((res) => {
        if (res.status == 201) {
          res.json().then((data) => {
            localStorage.setItem("token", data.token);
            alert(data.message);
            navigate("/", {
              state: {
                preMainPageState: mainPageState,
                preSearchResult: searchResult,
                preFilter: filter,
                preItem: item,
              },
            });
          });
        } else {
          res.json().then((data) => {
            alert(data.message);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return localStorage.getItem("token") ? (
    <h1>Please log out first</h1>
  ) : (
    <>
      <button
        onClick={() => {
          setShowLogin(!showLogin);
          setShowReset(false);
        }}
      >
        {!showLogin ? "Go to Log in" : "Go to Sign up"}
      </button>

      <br />

      {showLogin && (
        <form method="post" onSubmit={(e) => submitLogin(e)}>
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
      )}

      {!showLogin && !showReset && (
        <>
          <form method="post" onSubmit={(e) => submitSignup(e)}>
            <label>
              Firstname:
              <input
                name="firstname"
                pattern="[A-Za-z]{1,}"
                size="30"
                required
              />
            </label>

            <label>
              Lastname:
              <input
                name="lastname"
                pattern="[A-Za-z]{1,}"
                size="30"
                required
              />
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

          <br />

          <button onClick={() => setShowReset(!showReset)}>
            Reset password
          </button>
        </>
      )}

      {showReset && (
        <>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: reset password
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

            <button type="submit">Reset</button>
          </form>

          <br />

          <button onClick={() => setShowReset(!showReset)}>Back</button>
        </>
      )}
    </>
  );
}

export default Login;
