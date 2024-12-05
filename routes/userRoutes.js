const express = require('express');
const { handleAddUser, handleLogin, handleGetUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/add', handleAddUser);
router.post('/login', handleLogin);

router.get('/users', handleGetUsers);

module.exports = router;
