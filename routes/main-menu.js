var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main-menu', { title: 'AliceBlue Menu' });
});

module.exports = router;
