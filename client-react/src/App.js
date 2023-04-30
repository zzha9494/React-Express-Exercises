import React, { useState } from "react";
import TopBar from "./TopBar";
import HomeState from "./HomeState";
import SearchState from "./SearchState";
import ItemState from "./ItemState";

function App() {
  // const [data, setData] = useState([]);

  //   useEffect(() => {
  //   fetch('/api/data')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error(error));
  // }, []);

  // return (
  //   <div>
  //     {data.map(item => <p key={item.id}>{item.name}</p>)}
  //   </div>
  // );

  // 0: Home state, 1: Search state 2: Item state
  const [homePageState, setHomePageState] = useState(0);

  return (
    <>
      <TopBar
        homePageState={homePageState}
        setHomePageState={setHomePageState}
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
