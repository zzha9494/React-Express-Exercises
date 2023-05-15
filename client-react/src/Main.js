import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import HomeState from "./HomeState";
import SearchState from "./SearchState";
import ItemState from "./ItemState";

function Main() {
  const { state } = useLocation();
  const { preCart, preMainPageState, preSearchResult, preFilter, preItem } =
    state ?? {};

  const [mainPageState, setMainPageState] = useState(
    preMainPageState ? preMainPageState : 0
  );
  const [searchResult, setSearchResult] = useState(
    preSearchResult ? preSearchResult : []
  );
  const [filter, setFilter] = useState(
    preFilter ? preFilter : { brand: "", price: Infinity }
  );
  const [item, setItem] = useState(preItem ? preItem : {});
  const [cart, setCart] = useState(preCart ? preCart : {});

  // useEffect(() => console.log(item), [item]);

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
        setCart={setCart}
        item={item}
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
        <ItemState
          mainPageState={mainPageState}
          setMainPageState={setMainPageState}
          item={item}
          cart={cart}
          setCart={setCart}
          searchResult={searchResult}
          filter={filter}
        />
      )}
    </>
  );
}

export default Main;
