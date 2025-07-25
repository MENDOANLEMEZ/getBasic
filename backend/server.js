const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.get('/products', (req, res) => {
  const dataPath = path.join(__dirname, 'products.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseErr) {
      console.error('Error parsing products.json:', parseErr);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
