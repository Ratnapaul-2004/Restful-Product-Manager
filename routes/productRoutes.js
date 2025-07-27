const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Use multer to upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({storage});

//Create product
router.get('/new', (req, res) => {
  res.render('addProduct');
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imagePath = req.file ? req.file.filename : '';
    await Product.create({ name, price, image: imagePath });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('listProducts', {
    products,
    username: req.user.username
  });
});

//Get a product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const imagePath = path.join(__dirname, '../public/uploads', product.image);
    const imageExists = product.image && fs.existsSync(imagePath);
    res.render('viewProduct', { product, imageExists });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
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

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('Product not found');

    // Delete old image if new one is uploaded

      if (req.file) {
        if (product.image && product.image.trim() !== '') {
          const oldImagePath = path.join(__dirname, '../public/uploads', product.image);

          // Make sure it's a file, not the uploads folder
          if (fs.existsSync(oldImagePath) && fs.lstatSync(oldImagePath).isFile()) {
            fs.unlinkSync(oldImagePath);
          }
        }
        product.image = req.file.filename;
      }

      product.name = name;
      product.price = price;
      await product.save();
      res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//Delete a product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;