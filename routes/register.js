// routes/register.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Route for displaying the registration form
// obviamente não ia rodar sem um get.. incrivel
router.get('/', (req, res) => {
  res.render('register'); 
});

// Handle registration form submissions
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const usersCollection = req.mongoClient.db('db').collection('col');

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // esse hash vai deixar mais seguro

    // Save the user with the hashed password
    await usersCollection.insertOne({ name, password: hashedPassword });

    // Redirect to the login page or main menu page
    res.redirect('/login'); // tbm podia ser o main menu
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

module.exports = router;
