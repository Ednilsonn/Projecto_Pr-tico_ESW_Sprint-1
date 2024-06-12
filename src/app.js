require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const logarRoutes = require('./routes/logar');
const errorController = require('./controllers/error');
const addUser = require('./middleware/addUser'); // Importando o middleware

const { Product, User, Cart, CartItem } = require('./models/associations');

const app = express();

app.use(bodyParser.json());

// Adicionando o middleware para garantir que o usuário esteja disponível
app.use(addUser);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);
app.use(logarRoutes);

app.use(errorController.get404);

module.exports = app;
