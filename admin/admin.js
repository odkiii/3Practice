const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(bodyParser.json());

const productsPath = path.join(__dirname, '../server/products.json');

// Маршрут для получения всех товаров
app.get('/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    res.json(products);
});

// Маршрут для получения товара по ID
app.get('/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

// Маршрут для добавления товара
app.post('/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.json(newProduct);
});

// Маршрут для обновления товара
app.put('/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

// Маршрут для удаления товара
app.delete('/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
        res.json(deletedProduct);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Admin server running at http://localhost:${port}`);
});