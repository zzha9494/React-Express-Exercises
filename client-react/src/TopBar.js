import React, { useState, useEffect } from "react";

function handleSubmit(e, setSearchResult) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // TODO: get result from database
  fetch("/api/data", { method: form.method, body: formData })
    .then((response) => response.json())
    .then((data) => setSearchResult(data))
    .catch((error) => console.error(error));
}

function TopBar({
  homePageState,
  setHomePageState,
  setSearchResult,
  filter,
  setFilter,
}) {
  const [login, setLogin] = useState(false);

  useEffect(() => console.log(login ? "log in!" : "log out!"), [login]);

  return (
    <>
      <h1>Old Phone Deals</h1>

      <form
        method="post"
        onSubmit={(e) => {
          handleSubmit(e, setSearchResult);
          setHomePageState(1);
        }}
      >
        <label>
          Phone Title: <input name="title" defaultValue="Phone" />
        </label>

        <button type="submit">Search</button>
      </form>

      {homePageState !== 1 ? null : (
        <>
          <label>
            Result Brand:
            <select
              value={filter.brand}
              onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
            >
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
            </select>
          </label>

          <label>
            Price Range:
            <input
              type="range"
              value={filter.price}
              min="0"
              max="100"
              step="10"
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            />
            Max: {filter.price}
          </label>
        </>
      )}

      <br />

      <button
        onClick={() => {
          console.log("Redirect to Checkout page.");
        }}
      >
        checkout
      </button>

      <button
        onClick={() => {
          setLogin(!login);
        }}
      >
        {!login ? "Sign-in" : "signout"}
      </button>

      {login ? (
        <button
          onClick={() => {
            console.log("Redirect to Profile page");
          }}
        >
          Profile
        </button>
      ) : null}
    </>
  );
}

export default TopBar;
