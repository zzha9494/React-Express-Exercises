import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function handleSubmit(e, setSearchResult) {
  e.preventDefault();

  const data = new URLSearchParams(new FormData(e.target));

  // TODO: get result from database
  fetch("/api/data", { method: e.target.method, body: data })
    .then((response) => response.json())
    .then((data) => setSearchResult(data))
    .catch((error) => console.error(error));
}

function TopBar({
  mainPageState,
  setMainPageState,
  searchResult,
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
          setMainPageState(1);
        }}
      >
        <label>
          Phone Title: <input name="title" defaultValue="Phone" />
        </label>

        <button type="submit">Search</button>
      </form>

      {mainPageState !== 1 ? null : (
        <>
          <label>
            Result Brand:
            <select
              value={filter.brand}
              onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
            >
              <option value="">All</option>
              {[...new Set(searchResult.map((item) => item.brand))].map(
                (item) => (
                  <option value={item}>{item}</option>
                )
              )}
            </select>
          </label>

          <label>
            Price Range:
            <input
              type="range"
              value={filter.price}
              min="0"
              max={
                Math.ceil(
                  Math.max.apply(
                    null,
                    searchResult.map((item) => item.price)
                  ) / 10
                ) * 10
              }
              step="50"
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            />
            Max: {filter.price === Infinity ? "Any" : filter.price}
          </label>
        </>
      )}

      <br />

      <Link to={"/checkout"}>
        <button
          onClick={() => {
            console.log("Redirect to Checkout page.");
          }}
        >
          Checkout
        </button>
      </Link>

      {!login ? (
        <Link to={"/login"}>
          <button
            onClick={() => {
              setLogin(!login);
            }}
          >
            Sign-in
          </button>
        </Link>
      ) : (
        <button
          onClick={() => {
            setLogin(!login);
          }}
        >
          Sign-out
        </button>
      )}

      {login ? (
        <Link to={"/profile"}>
          <button
            onClick={() => {
              console.log("Redirect to Profile page.");
            }}
          >
            Profile
          </button>
        </Link>
      ) : null}

      {/* // test button for switch login status, to be delete */}
      <button
        onClick={() => {
          setLogin(!login);
        }}
      >
        Switch login status
      </button>
      {/* // test button for switch login status, to be delete */}
    </>
  );
}

export default TopBar;
