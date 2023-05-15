import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { cart, mainPageState, searchResult, filter } = state;
  console.log(cart);
  return (
    <>
      <h1>Checkout Page</h1>

      <button
        onClick={(e) => {
          navigate("/", {
            state: {
              preCart: cart,
              preMainPageState: mainPageState,
              preSearchResult: searchResult,
              preFilter: filter,
            },
          });
        }}
      >
        Back
      </button>

      <button>empty cart</button>

      <br />
      <br />
      <br />

      <table className="">
        <th>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Update item</th>
            <th>Remove item</th>
            <th>Total Price</th>
          </tr>
        </th>

        {/* {cart.map((item, key) => {
          // const totalPrice = item.price * item.quanity;
          return (
            <tr>
              <td>Iphone 13 pro max</td>
              <td>2500</td>
              <td>2</td>
              <td> </td>
              <td>
                <button className="" onclick="removeItemfromCart()">
                  {" "}
                  modify
                </button>
              </td>
              <td>
                <button className="" onclick="removeItemfromCart()">
                  {" "}
                  Remove
                </button>
              </td>
            </tr>
          );
        })} */}
        <tr>
          <td colSpan="2">Total Price</td>
          {/* <td colSpan="2">{totalCartPrice}</td> */}
        </tr>
      </table>
    </>
  );
}

export default Checkout;

// const Checkout = () => {
//   const {state} = useLocation();
//   const { id, color } = state;
//   // const cart = [
//   //   {
//   //     name: "Samsung",
//   //     price: 199.99,
//   //   },
//   //   {
//   //     name: "Iphone",
//   //     price: 199.99,
//   //   },
//   // ];

// return (
//   <div>
//     <nav className="">
//       <script src="index.js"></script>
//       <h1>Checkout Page</h1>
//       <button id="backbutton" onclick="goToPreviousPage()">
//         back
//       </button>
//       <button
//         id="emptycartbutton"
//         onclick={() => {
//           console.log(color);
//         }}
//       >
//         empty cart
//       </button>
//       <br />
//       <br />
//       <br />
//       <div>
//         <table className="">
//           <th>
//             {" "}
//             <tr>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Update item</th>
//               <th>Remove item</th>
//               <th>Total Price</th>
//             </tr>
//           </th>

//           {/* {cart.map((item, key) => {
//               // const totalPrice = item.price * item.quanity;
//               return (
//                 <tr>
//                   <td>Iphone 13 pro max</td>
//                   <td>2500</td>
//                   <td>2</td>
//                   <td> </td>
//                   <td>
//                     <button className="" onclick="removeItemfromCart()">
//                       {" "}
//                       modify
//                     </button>
//                   </td>
//                   <td>
//                     <button className="" onclick="removeItemfromCart()">
//                       {" "}
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })} */}
//           <tr>
//             <td colSpan="2">Total Price</td>
//             {/* <td colSpan="2">{totalCartPrice}</td> */}
//           </tr>
//         </table>
//       </div>

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <button className="" onclick="checkoutToProceedPayment()">
//         payment
//       </button>
//     </nav>
//   </div>
// );

// //   <div>
// //     <img
// //     src={image}
// //     />

// //     <div>
// //       <p>

// //       </p>

// //     </div>
// //   </div>
// // )
// // };
