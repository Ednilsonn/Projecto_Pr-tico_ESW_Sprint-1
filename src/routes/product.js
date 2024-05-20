const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

// Lista de produtos
router.get('/products', productController.getProducts);

// Detalhes de um produto
router.get('/products/:productId', productController.getProductById);

// Cria um produto
router.post('/products', productController.createProduct);

// Atualiza um produto
router.put('/products/:productId', productController.updateProduct);

// Deleta um produto
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
