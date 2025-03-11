const express = require('express');
const { fetchProducts, fetchProductByID, addToCart } = require('../controllers/product.controller');
 
const router = express.Router();
 
router.get('/products', fetchProducts);
router.get('/product/:id', fetchProductByID); 
router.post('/cart', addToCart); 
module.exports = router;