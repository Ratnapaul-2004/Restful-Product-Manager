const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Get Register
router.get('/register', (req, res) => {
  const error = req.query.error;
  res.render('register', {error});
});

// Post Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/login?error=Already reistered. Please login');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.redirect('/login?message=Registration successful. Please login');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get Login
router.get('/login', (req, res) => {
  const error = req.query.error;
  const message = req.query.message;
  res.render('login', {error, message});
});

// Post Login
router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(!user) {
    console.log('User not found');
    return res.redirect('/register?error=1');
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.redirect('/register?error=1');

  const token = jwt.sign({
      userId: user._id,
      username: user.username
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '1h'
    }
  );
  res.cookie('token', token, { httpOnly: true });
  console.log('JWT Token: ', {token});
  res.redirect('/products');
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;