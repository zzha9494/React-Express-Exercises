import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function searchByTitle(e, setSearchResult) {
  e.preventDefault();
  const title = e.target.elements.title.value;

  const sanitizeTitle = (title) => {
    let sanitizedTitle = title.trim().toLowerCase();
    sanitizedTitle = sanitizedTitle.replace(/<[^>]+>/g, "");
    return sanitizedTitle;
  };

  fetch(`/api/searchByTitle?title=${sanitizeTitle(title)}`, {
    method: e.target.method,
  })
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
  cart,
}) {
  const [login, setLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const navigate = useNavigate();

  return (
    <>
      <h1>Old Phone Deals</h1>

      <form
        method="get"
        onSubmit={(e) => {
          searchByTitle(e, setSearchResult);
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

      <button
        onClick={(e) => {
          navigate("/checkout", { state: { cart } });
        }}
      >
        Checkout
      </button>

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
            localStorage.removeItem("token");
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
    </>
  );
}

export default TopBar;
