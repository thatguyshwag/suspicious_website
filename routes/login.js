// routes/login.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Route for the login page
router.get('/', (req, res) => {
  res.render('login');
});

// Handle login form submissions
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const usersCollection = req.mongoClient.db('db').collection('col');

  try {
    // Check if user exists in the database
    const user = await usersCollection.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Successful login
      // Redirect to the main menu page
      res.redirect('/menu');
    } else {
      // Invalid credentials
      res.send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).send('Error checking user');
  }
});

module.exports = router;
