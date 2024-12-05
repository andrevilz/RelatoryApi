const { addUser, listUsers } = require('../models/userModel');

const handleAddUser = (req, res) => {
    const { name, password, access } = req.body;

    if (!name || !password || access === undefined) {
        return res.status(400).json({ message: 'Nome, senha e accesso são obrigatórios.' });
    }

    try {
        const user = { name, password, access };
        addUser(user); 
        res.status(201).json({ message: 'Usuário adicionado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ message: 'Erro ao adicionar usuário.' });
    }
};

const handleLogin = (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
    }

    try {
        const users = listUsers();
        const user = users.find(u => u.name === name && u.password === password);

        if (!user) {
            return res.status(401).json({ message: '    Credenciais inválidas.' });
        }

        res.cookie('user', JSON.stringify({
            name: user.name,    
            access: user.access
        }), {
            httpOnly: true,      
            maxAge: 30 * 60 * 1000 
        });

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: { id: user.id, name: user.name, access: user.access }
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro ao realizar login.' });
    }
};

    const handleGetUsers = (req, res) => {
        try {
            const users = listUsers(); 
            res.status(200).json(users); 
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ message: 'Erro ao listar usuários.' });
        }
    };

module.exports = { handleAddUser, handleLogin, handleGetUsers };
