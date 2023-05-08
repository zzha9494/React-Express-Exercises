import React, { useState, useEffect } from "react";

function HomeState() {
  return (
    <>
      <SoldOutSoon />
      <BestSellers />
    </>
  );
}

function SoldOutSoon() {
  const [SOSlist, setSOSlist] = useState([]);

  useEffect(() => {
    fetch("/api/getSoldOutSoon")
      .then((response) => response.json())
      .then((data) => setSOSlist(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ol>
      {SOSlist.map((item) => (
        <li key={item._id}>
          <img src={`/images/${item.image}.jpeg`} alt="Phone" />
          {item.price}
        </li>
      ))}
    </ol>
  );
}

function BestSellers() {
  const [BSlist, setBSlist] = useState([]);

  useEffect(() => {
    fetch("/api/getBestSellers")
      .then((response) => response.json())
      .then((data) => setBSlist(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ol>
      {BSlist.map((item) => (
        <li key={item._id}>
          <img src={`/images/${item.image}.jpeg`} alt="Phone" />
          {item.price}
        </li>
      ))}
    </ol>
  );
}

export default HomeState;
