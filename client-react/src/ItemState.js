import React, { useState, useEffect } from "react";

function ItemState({ setMainPageState, item }) {
  return (
    <>
      <button
        onClick={() => {
          setMainPageState(1);
        }}
      >
        Back
      </button>

      <ul>
        <li>Title: {item.title}</li>
        <li>Brand: {item.brand}</li>
        <li>
          Image: <img src={`/images/${item.image}.jpeg`} alt="Phone" />
        </li>
        <li>Stock: {item.stock}</li>
        <li>Seller: {item.seller}</li>
        <li>Price: {item.price}</li>
        <li>
          {!item.reviews ? (
            "No reviews"
          ) : (
            <>
              reviews:
              <ol>
                {item.reviews.map((review) => (
                  <li>{review.comment}</li>
                ))}
              </ol>
            </>
          )}
        </li>
      </ul>

      <button>Add</button>

      <p>Added quantity: </p>

      <label>
        Comments: <input name="comments" />
      </label>
    </>
  );
}

export default ItemState;
