import React, { useState, useEffect } from "react";

function SearchState({ searchResult, filter }) {
  return (
    <ol>
      {searchResult
        .filter(
          (item) =>
            item.brand.toLowerCase().includes(filter.brand.toLowerCase()) &&
            item.price <= filter.price
        )
        .map((item) => (
          <li>
            <img src={`../public/images/${item.image}.jpeg`} alt="Phone" />
            {item.price}
          </li>
        ))}
    </ol>
  );
  // return ("this is search");
}

export default SearchState;
