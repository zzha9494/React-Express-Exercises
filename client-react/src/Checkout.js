import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart, mainPageState, searchResult, filter, item } = state;

  const [newCart, setNewCart] = useState(
    Object.fromEntries(
      Object.entries(cart).filter(([key, value]) => value.quantity !== 0)
    )
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.keys(newCart).forEach((_id) => {
      const { price, quantity } = newCart[_id];
      total += price * quantity;
    });
    setTotalPrice(total);
  }, [newCart]);

  const deleteItem = (_id) => {
    const updatedCart = { ...newCart };
    delete updatedCart[_id];
    setNewCart(updatedCart);
  };

  const updateItem = (_id, quantity) => {
    if (quantity == 0) {
      deleteItem(_id);
    } else {
      const updatedCart = { ...newCart };
      updatedCart[_id].quantity = quantity;
      setNewCart(updatedCart);
    }
  };

  return (
    <>
      <h1>Checkout Page</h1>

      <button
        onClick={(e) => {
          navigate("/", {
            state: {
              preCart: newCart,
              preMainPageState: mainPageState,
              preSearchResult: searchResult,
              preFilter: filter,
              preItem: item,
            },
          });
        }}
      >
        Back
      </button>

      <br />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(newCart).map((_id) => (
            <tr key={_id}>
              <td>{newCart[_id].title}</td>
              <td>{newCart[_id].price}</td>
              <td>{newCart[_id].quantity}</td>
              <td>
                <button
                  onClick={() => {
                    let quantity = prompt("Please update the quantity:", 1);
                    quantity = parseInt(quantity.trim());
                    if (quantity >= 0 && quantity <= newCart[_id].stock) {
                      updateItem(_id, quantity);
                    } else {
                      alert("Invalid! Check the available stock!");
                    }
                  }}
                >
                  Modify
                </button>
              </td>
              <td>
                <button onClick={() => deleteItem(_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <p>Total Price: {totalPrice}</p>

      <button
        onClick={() => {
          console.log(newCart);
        }}
      >
        Confirm
      </button>
    </>
  );
}

export default Checkout;
