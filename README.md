# CoffeeShop_ES45B
Este projeto consiste em uma aplicação web simples de autenticação com cadastro e login de usuários. Ele foi desenvolvido como parte de um trabalho da disciplina de Programação Web Back-End (ES45B) da UTFPR.

---

## 🎯 Objetivos

- Criar um sistema de login funcional com Express
- Utilizar o padrão **MVC**
- Implementar **sessions e cookies**
- Proteger páginas que exigem autenticação
- Realizar **validação de dados**
- Utilizar o **MongoDB** como banco de dados
- Criar um layout estilizado com **Handlebars** e **CSS customizado**

---

## 📁 Estrutura de Pastas

```
coffee-shop/
├── app.js
├── bin/
│   └── www
├── model/
│   └── User.js
├── public/
│    └── css/
│       ├── login.css
│       ├── landing.css
│       ├── style.css
│       └── error.css
├── routes/
│   └── auth.js
├── views/
│   ├── login.hbs
│   ├── register.hbs
│   ├── home.hbs
│   └── error.hbs
└── package.json
```

---

## ⚙️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Express-Session**
- **Cookie-Parser**
- **MongoDB (MongoDB Compass)**
- **bcrypt** (para hashing de senhas)
- **Handlebars (hbs)**
- **CSS puro**

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/coffee-shop.git
cd coffee-shop
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o MongoDB

Verifique se o MongoDB está rodando localmente (padrão: `mongodb://localhost:27017`).

### 4. Rodar o servidor

```bash
npm start
```

O app ficará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 👥 Funcionalidades

- ✅ Cadastro de usuário com validação
- ✅ Hash de senha com bcrypt
- ✅ Login e autenticação com sessão
- ✅ Página protegida acessível apenas após login
- ✅ Logout com destruição da sessão
- ✅ Armazenamento de sessões via cookie
- ✅ Exibição do cookie via DevTools
- ✅ Design responsivo e estilizado com tema “Café”

---

## 🔐 Banco de Dados

- Banco: `coffee-shop`
- Coleção: `users`
- Campos: `username`, `email`, `password` (hash)

---

## 👩‍🏫 Professora : Monique Emídio de Oliveira 

Este projeto foi desenvolvido com base nas orientações da professora da disciplina, utilizando os slides:

1. Introdução ao Roteamento
2. Gerando o primeiro projeto
3. Express Generator
4. Padrão MVC com método GET
5. Sessions e Cookies

---

## 📝 Autores

Henrique Nogarini RA:2102374
Vinicius Campeão RA:2465396
Vinicius Masao RA:2209705
UTFPR - Engenharia de Software