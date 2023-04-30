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

  // TODO
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setSOSlist(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ol>
      {SOSlist.map((item) => (
        <li>
          <img src={`../public/images/${item.image}.jpeg`} alt="Phone" />
          {item.price}
        </li>
      ))}
    </ol>
  );
}

function BestSellers() {
  const [BSlist, setBSlist] = useState([]);

  // TODO
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setBSlist(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ol>
      {BSlist.map((item) => (
        <li>
          <img src={`../public/images/${item.image}.jpeg`} alt="Phone" />
          {item.price}
        </li>
      ))}
    </ol>
  );
}

export default HomeState;
