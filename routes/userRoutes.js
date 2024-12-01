const express = require('express');
const { handleAddUser, handleLogin, handleGetUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/add', handleAddUser);
router.post('/login', handleLogin);

// Nova rota para obter todos os usuários
router.get('/users', handleGetUsers);

module.exports = router;
