const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { getErrorData } = require('../utils/errorHandler');

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Cadastro' });
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const errorData = getErrorData('missing_fields', 'register');
    return res.status(400).render('error', errorData);
  }

  if (!email.includes('@') || !email.includes('.')) {
    const errorData = getErrorData('invalid_email', 'register');
    return res.status(400).render('error', errorData);
  }

  if (password.length < 6) {
    const errorData = getErrorData('short_password', 'register');
    return res.status(400).render('error', errorData);
  }

  try {
    await User.register(username, email, password);
    res.redirect('/auth/login');
  } catch (err) {
    let errorData;
    if (err.message.includes('já existe') || err.message.includes('already exists')) {
      errorData = getErrorData('user_exists', 'register');
    } else {
      errorData = getErrorData(500, 'register');
      errorData.errorMessage = `Erro ao cadastrar usuário: ${err.message}`;
    }
    res.status(500).render('error', errorData);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const errorData = getErrorData('missing_fields', 'login');
    return res.status(400).render('error', errorData);
  }

  try {
    const result = await User.login(username, password);

    if (result.success) {
      req.session.loggedIn = true;
      req.session.username = result.user.username;
      res.redirect('/home');
    } else {
      const errorData = getErrorData('invalid_credentials', 'login');
      res.status(401).render('error', errorData);
    }
  } catch (err) {
    const errorData = getErrorData(500, 'login');
    errorData.errorMessage = `Erro no login: ${err.message}`;
    res.status(500).render('error', errorData);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;