var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chute', { title: 'Jogo do Chute' });
});

module.exports = router;