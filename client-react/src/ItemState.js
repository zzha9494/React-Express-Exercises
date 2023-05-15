import React from "react";
import { useNavigate } from "react-router-dom";

function ItemState({
  mainPageState,
  setMainPageState,
  item,
  cart,
  setCart,
  searchResult,
  filter,
}) {
  const navigate = useNavigate();

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
        <li>
          Seller:
          {item.seller && `${item.seller.firstname} ${item.seller.lastname}`}
        </li>

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

      <button
        onClick={() => {
          if (!localStorage.getItem("token")) {
            alert("Please login first.");
            navigate("/login", {
              state: {
                mainPageState,
                searchResult,
                filter,
                item,
              },
            });
          } else {
            let quantity = prompt("Please update the quantity:", 1);
            quantity = parseInt(quantity.trim());
            if (quantity >= 0 && quantity <= item.stock) {
              setCart({
                ...cart,
                [item._id]: {
                  title: item.title,
                  price: item.price,
                  quantity: quantity,
                  stock: item.stock,
                },
              });
            } else {
              alert("Invalid! Check the available stock!");
            }
          }
        }}
      >
        Add/Update quantity
      </button>

      <p>Added quantity: </p>

      <label>
        Comments: <input name="comments" />
      </label>
    </>
  );
}

export default ItemState;
