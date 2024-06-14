// Carrega variáveis de ambiente de um arquivo .env para process.env
require('dotenv').config();

// Importa o módulo Express
const express = require('express');

// Importa o módulo body-parser para processar requisições JSON
const bodyParser = require('body-parser');

// Importa a configuração do banco de dados Sequelize
const sequelize = require('./util/database');

// Importa rotas definidas em outros arquivos
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');

// Importa o controlador de erros
const errorController = require('./controllers/error');

// Importa um middleware para adicionar um usuário ao request
const addUser = require('./middleware/addUser'); 

// Importa os modelos e suas associações
const { Product, User, Cart, CartItem } = require('./models/associations');

// Cria uma instância do aplicativo Express
const app = express();

// Configura o body-parser para processar JSON
app.use(bodyParser.json());

// Usa o middleware para garantir que o usuário esteja disponível em todas as requisições
app.use(addUser);

// Define rotas para diferentes caminhos da aplicação
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);

// Configura o controlador para tratar erros 404 (página não encontrada)
app.use(errorController.get404);

// Sincroniza o banco de dados e inicializa o servidor
sequelize
  .sync()  // Sincroniza os modelos com o banco de dados
  .then(result => {
    // Procura um usuário com a primary key 1
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // Se o usuário não existir, cria um novo usuário Admin
      return User.create({ name: 'Admin', email: 'admin@example.com' });
    }
    // Se o usuário já existir, retorna o usuário encontrado
    return user;
  })
  .then(user => {
    // Cria um carrinho para o usuário
    return user.createCart();
  })
  .then(cart => {
    // Inicia o servidor na porta definida nas variáveis de ambiente ou na porta 3000
    app.listen(process.env.PORT || 3001);
  })
  .catch(err => {
    // Loga qualquer erro que ocorrer
    console.log(err);
  });

// Exporta a instância do aplicativo para uso em outros módulos
module.exports = app;
