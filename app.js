// app.js

const express = require('express');
const bodyParser = require('body-parser'); // obrigatorio para login
const MongoClient = require('mongodb').MongoClient; 
const app = express();
const port = 3000;
app.set('view engine', 'ejs'); // rodar o ejs

// MongoDB connection URI
const uri = 'mongodb+srv://fabio:neto@website.fqbxlki.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // cada cliente é um novo mongoclient





// Middleware to set the MongoDB client on the request object
app.use((req, res, next) => {
  req.mongoClient = client;
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//não modificar os roteadores pre-existentes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var menuRouter = require('./routes/main-menu');
var gamesRouter = require('./routes/games');
var chuteRouter = require('./routes/chute');
var drawingsRouter = require('./routes/drawings');
var creditsRouter = require('./routes/creditos');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/menu', menuRouter);
app.use('/games', gamesRouter);
app.use('/chute', chuteRouter);
app.use('/drawings', drawingsRouter);
app.use('/creditos', creditsRouter);

app.use(express.static('public')); // isso serve pra que a pasta public seja usada, assim o stylesheet para de ser ignorado. 
// supostamente também vai servir para chamar imagens, algo que eu ainda irei verificar

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

// ...

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
