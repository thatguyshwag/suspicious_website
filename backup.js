const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// middleware para que o login rode
// Middleware to set the MongoDB client on the request object
app.use((req, res, next) => {
  req.mongoClient = client;
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');


app.use('/', indexRouter);

app.use('/login', loginRouter);
app.user('/register', loginRouter);

  

// MongoDB connection URI
const uri = 'mongodb+srv://fabio:neto@website.fqbxlki.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// supostamente vai corrigir o stylesheet nao ser importado -> 16.12
// 7:48 pm até então não corrigiu nada 
// 8:00 finalmente funciona
app.use(express.static('public'));


// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

//

// Define a route for the user registration page
app.get('/create-user', (req, res) => {
  res.sendFile(__dirname + '/createUser.html'); // Change this line to match your HTML file path
});

// Handle form submissions
app.post('/create-user', (req, res) => {
  const userData = {
    name: req.body.name,
    password: req.body.password
  };

  // Insert the user data into MongoDB
  const collection = client.db('db').collection('col');
  collection.insertOne(userData, (err, result) => {
    if (err) {
      console.error('Error inserting user data:', err);
      res.status(500).send('Error inserting user data');
    } else {
      console.log('User created successfully:', result.ops[0]);
      res.send('User created successfully');
    }
  });
});



const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Gracefully handle server shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully');
  server.close(() => {
    console.log('Server closed');
    client.close(); // Close the MongoDB connection
    process.exit(0);
  });
});

