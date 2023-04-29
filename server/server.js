const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client-react/build')));

app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  res.json(data);
});

app.listen(8000, () => console.log('Server is running on port 8000'));