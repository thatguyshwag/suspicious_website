// routes/register.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Route for the registration page
router.get('/', (req, res) => {
  res.render('register');
});

// Handle registration form submissions
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const usersCollection = req.mongoClient.db('db').collection('col');

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save the user with the hashed password
    await usersCollection.insertOne({ name, password: hashedPassword });

    // Redirect to the login page or main menu page
    res.redirect('/login'); // or '/main-menu' if you want to redirect automatically after registration
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

module.exports = router;
