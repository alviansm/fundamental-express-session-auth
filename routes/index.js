var express = require('express');
var router = express.Router();
var {isAuth} = require('../utils/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard | FESA',
    username: req.session.username
  });
});

router.get('/user-only', isAuth, (req, res) => {
  res.render('userOnly')
})

module.exports = router;
