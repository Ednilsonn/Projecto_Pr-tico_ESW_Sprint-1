const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUser);

module.exports = router;
