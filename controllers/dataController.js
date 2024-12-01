const {
    addData,
    getReportsByDateRange,
    getAllReports,
    getReportsByUser,
    getReportsByUserAndDateRange,
} = require('../models/dataModel');

// Função para adicionar dados
const handleAddData = (req, res) => {
    const { name, value, codigoFiscal } = req.body;

    if (!name || !value || !codigoFiscal) {
        return res.status(400).json({ message: 'Nome, valor e código fiscal são obrigatórios.' });
    }

    try {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const date = `${dia}/${mes}/${ano}`;

        const hora = String(data.getHours()).padStart(2, '0') + ':' + String(data.getMinutes()).padStart(2, '0');
        const record = { name, value, date, hora, codigoFiscal };

        addData(record);
        res.status(201).json({ message: 'Registro adicionado com sucesso!', record });
    } catch (error) {
        console.error('Erro ao adicionar registro:', error);
        res.status(500).json({ message: 'Erro ao adicionar registro.' });
    }
};

// Função para buscar relatórios por intervalo de datas
const handleGetReportsByDateRange = (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
    }

    try {
        const data = getReportsByDateRange(startDate, endDate);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao recuperar relatórios por data:', error);
        res.status(500).json({ message: 'Erro ao recuperar relatórios por data.' });
    }
};

// Função para buscar relatórios por nome de usuário
const handleGetReportsByUser = (req, res) => {
    const { userName } = req.query;

    if (!userName) {
        return res.status(400).json({ message: 'Nome de usuário é obrigatório.' });
    }

    try {
        const data = getReportsByUser(userName);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao recuperar relatórios por usuário:', error);
        res.status(500).json({ message: 'Erro ao recuperar relatórios por usuário.' });
    }
};

// Função para buscar relatórios por nome de usuário e intervalo de datas
const handleGetReportsByUserAndDateRange = (req, res) => {
    const { userName, startDate, endDate } = req.query;

    if (!userName || !startDate || !endDate) {
        return res.status(400).json({ message: 'Nome de usuário, data de início e data de fim são obrigatórios.' });
    }

    try {
        const data = getReportsByUserAndDateRange(userName, startDate, endDate);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao recuperar relatórios por usuário e data:', error);
        res.status(500).json({ message: 'Erro ao recuperar relatórios por usuário e data.' });
    }
};


// Função para obter todos os relatórios
const handleGetAllReports = (req, res) => {
    try {
        const data = getAllReports();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao recuperar relatórios:', error);
        res.status(500).json({ message: 'Erro ao recuperar relatórios.' });
    }
};

module.exports = {
    handleAddData,
    handleGetReportsByDateRange,
    handleGetAllReports,
    handleGetReportsByUser,
    handleGetReportsByUserAndDateRange,
};
