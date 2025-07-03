const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const url = 'mongodb://localhost:27017';
const dbName = 'coffee-shop';

module.exports = class User {
  static async register(username, email, password) {
    const conn = await MongoClient.connect(url);
    const db = conn.db(dbName);

    const existingUser = await db.collection('users').findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      await conn.close();
      throw new Error('Usuário ou email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({username, email, password: hashedPassword});

    await conn.close();
    return result;
  }

  static async login(username, password) {
    const conn = await MongoClient.connect(url);
    const db = conn.db(dbName);
    const user = await db.collection('users').findOne({ username });
    await conn.close();

    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  }
};
