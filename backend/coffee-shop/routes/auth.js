const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Página de login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Página de cadastro
router.get('/register', (req, res) => {
  res.render('register', { title: 'Cadastro' });
});

// Processar cadastro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validação de campos
  if (!username || !email || !password) {
    return res.status(400).send('Preencha todos os campos. <a href="/auth/register">Voltar</a>');
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).send('Email inválido. <a href="/auth/register">Voltar</a>');
  }

  if (password.length < 6) {
    return res.status(400).send('A senha deve ter no mínimo 6 caracteres. <a href="/auth/register">Voltar</a>');
  }

  try {
    await User.register(username, email, password);
    res.redirect('/auth/login');
  } catch (err) {
    res.status(500).send(`Erro ao cadastrar usuário: ${err.message} <a href="/auth/register">Voltar</a>`);
  }
});

// Processar login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Preencha todos os campos. <a href="/auth/login">Voltar</a>');
  }

  try {
    const authenticated = await User.login(username, password);

    if (authenticated) {
      req.session.loggedIn = true;
      res.redirect('/home');
    } else {
      res.status(401).send('Usuário ou senha inválidos. <a href="/auth/login">Tentar novamente</a>');
    }
  } catch (err) {
    res.status(500).send(`Erro no login: ${err.message} <a href="/auth/login">Voltar</a>`);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;