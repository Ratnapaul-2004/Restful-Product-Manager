const express = require('express');
const router = express.Router();
const Product = require('../models/product');


//Create product
router.get('/new', (req, res) => {
  res.render('addProduct');
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.redirect('/products');
});

//Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('listProducts', {products});
});

//Get a product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).json({message: 'Product not found'});
  res.render('viewProduct', {product});
});

router.post('/', async (req, res) => {
  const {name, price} = req.body;
  await Product.create({name, price});
  res.redirect('/products');
});

//Update a product
router.get('/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).send('Product not found');
  res.render('editProduct', {product});
});

router.put('/:id', async (req, res) => {
  const {name, price} = req.body;
  await Product.findByIdAndUpdate(req.params.id, {name, price});
  res.redirect('/products');
});

//Delete a product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});


module.exports = router;