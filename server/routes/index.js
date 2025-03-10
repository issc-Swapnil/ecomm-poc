const express = require('express');
const { fetchProducts, fetchProductByID } = require('../controllers/product.controller');
 
const router = express.Router();
 
router.get('/products', fetchProducts);
router.get('/product/:id', fetchProductByID); 
module.exports = router;