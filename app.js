const express = require('express');
const cookieParser = require('cookie-parser');
const dataRoutes = require('./routes/dataRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Rotas
app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
