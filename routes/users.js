var express = require('express');
var router = express.Router();
var User = require('../models/m_user');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/login', (req, res, next) => {
  req.session.isAuth = true;
  res.render('login', {
    title: 'Login | FESA'
  })
})

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register | FESA'
  })
})

/* POST users listing */
router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    let message = [];

    let user_email = await User.findOne({email});
    if (user_email) {
      message.push(`Account with email ${email} is already exist`)
      return res.render('register', {
        message: message[0]
      })
    }

    let user_username = await User.findOne({username});
    if (user_username) {
      message.push(`Account with username ${username} is already exist`);
      return res.render('register', {
        message: message[0]
      })
    }

    let user = await User.findOne({email});
    if (message.length == 0 && !user) {
      const hashedPw = await bcrypt.hash(password, 12);

      user = new User({
      username,
      email,
      password: hashedPw
      })

      await user.save();
      res.render('login', {
      message: "Account successfully created"
      });
    }
  } catch (err) {
    return res.render('register', {
      message: err
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    message = []

    if (!user) {
      req.session.isAuth = false;
      message.push(`${username} does not exist`)
      return res.render('login', {
        message: message[0]
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.session.isAuth = false;
      message.push(`Your credentials doesn't seems right`)
      return res.render('login', {
        message: message[0]
      })
    }

    if (message.length == 0) {
      req.session.isAuth = true;
      req.session.username = username;
      return res.redirect('/');
    }
  } catch (err) {
    return res.render('register', {
      message: err
    })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error')
    }
  })
  res.redirect('/');
})

module.exports = router;
