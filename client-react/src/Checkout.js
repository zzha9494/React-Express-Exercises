import React, { useState } from "react";
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

  const deleteItem = (_id) => {
    const updatedCart = { ...newCart };
    delete updatedCart[_id];
    setNewCart(updatedCart);
  };

  return (
    <>
      <h1>Checkout Page</h1>

      <button
        onClick={() => {
          console.log(newCart);
        }}
      >
        test
      </button>

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
                <button>Modify</button>
              </td>
              <td>
                <button onClick={() => deleteItem(_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Checkout;
