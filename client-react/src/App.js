import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import HomeState from "./HomeState";
import SearchState from "./SearchState";
import ItemState from "./ItemState";

function App() {
  const [homePageState, setHomePageState] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [filter, setFilter] = useState({ brand: "", price: 50 });

  useEffect(() => console.log(filter), [filter]);

  return (
    <>
      <TopBar
        homePageState={homePageState}
        setHomePageState={setHomePageState}
        setSearchResult={setSearchResult}
        filter={filter}
        setFilter={setFilter}
      />
      <br />
      {homePageState === 0 ? (
        <HomeState />
      ) : homePageState === 1 ? (
        <SearchState />
      ) : (
        <ItemState />
      )}
    </>
  );
}

export default App;
