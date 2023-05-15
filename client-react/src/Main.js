import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import HomeState from "./HomeState";
import SearchState from "./SearchState";
import ItemState from "./ItemState";

function Main() {
  const [mainPageState, setMainPageState] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [filter, setFilter] = useState({ brand: "", price: Infinity });
  const [item, setItem] = useState({});
  const [cart, setCart] = useState(["test this is a cart"]);

  useEffect(() => console.log(item), [item]);

  return (
    <>
      <TopBar
        mainPageState={mainPageState}
        setMainPageState={setMainPageState}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        filter={filter}
        setFilter={setFilter}
        cart={cart}
      />
      <br />
      {mainPageState === 0 ? (
        <HomeState />
      ) : mainPageState === 1 ? (
        <SearchState
          searchResult={searchResult}
          filter={filter}
          setMainPageState={setMainPageState}
          setItem={setItem}
        />
      ) : (
        <ItemState setMainPageState={setMainPageState} item={item} />
      )}
    </>
  );
}

export default Main;
