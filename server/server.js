const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'));
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});