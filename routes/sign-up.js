const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Express' });
});

module.exports = router;
