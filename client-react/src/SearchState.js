import React, { useState, useEffect } from "react";

function SearchState({ searchResult, filter, setMainPageState, setItem }) {
  return (
    <ol>
      {searchResult
        .filter(
          (item) =>
            item.brand.toLowerCase().includes(filter.brand.toLowerCase()) &&
            item.price <= filter.price
        )
        .map((item) => (
          <li
            key={item._id}
            data-id={item._id}
            onClick={(e) => {
              setMainPageState(2);
              handleClick(e, setItem);
            }}
          >
            <img src={`/images/${item.image}.jpeg`} alt="Phone" />
            {item.price}
          </li>
        ))}
    </ol>
  );
}

const handleClick = (e, setItem) => {
  const id = e.currentTarget.getAttribute("data-id");

  fetch(`/api/getPhone?id=${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => setItem(data))
    .catch((error) => console.error(error));
};

export default SearchState;
