var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// supostamente corrige stylesheet?
// causando crash 
//app.use(express.static('../public/stylesheets/stylesheet'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AliceBlue' });
});

module.exports = router;
