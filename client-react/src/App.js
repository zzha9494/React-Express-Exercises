import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import HomeState from "./HomeState";
import SearchState from "./SearchState";
import ItemState from "./ItemState";

function App() {
  const [homePageState, setHomePageState] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [filter, setFilter] = useState({ brand: "", price: Infinity });

  useEffect(() => console.log(filter), [filter]);

  return (
    <>
      <TopBar
        homePageState={homePageState}
        setHomePageState={setHomePageState}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        filter={filter}
        setFilter={setFilter}
      />
      <br />
      {homePageState === 0 ? (
        <HomeState />
      ) : homePageState === 1 ? (
        <SearchState searchResult={searchResult} filter={filter} />
      ) : (
        <ItemState />
      )}
    </>
  );
}

export default App;
