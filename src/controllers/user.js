const User = require('../models/user');

exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  User.create({ name, email })
    .then(result => {
      res.status(201).json({ user: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'Internal Server Error' });
    });
};
