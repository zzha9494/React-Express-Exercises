import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

    useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data.map(item => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

export default App;
