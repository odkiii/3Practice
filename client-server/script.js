document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('products');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product';
                productCard.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Цена: ${product.price} руб.</p>
                    <p>${product.description}</p>
                    <p>Категории: ${product.categories.join(', ')}</p>
                `;
                productsContainer.appendChild(productCard);
            });
        });
});