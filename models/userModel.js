const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const filePath = path.join(__dirname, '../data/database.xlsx');

// Carrega ou cria o arquivo Excel
const loadWorkbook = () => {
    if (!fs.existsSync(filePath)) {
        console.log('Arquivo não encontrado. Criando novo arquivo Excel...');
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User');
        XLSX.writeFile(workbook, filePath);
        console.log('Arquivo Excel criado em:', filePath);
    }
    return XLSX.readFile(filePath);
};

// Manipula a aba "Data"
const loadDataSheet = () => {
    const workbook = loadWorkbook();
    return workbook.Sheets['Data'];
};

// Adiciona um registro à aba "Data"
const addUser = (user) => {
    const workbook = loadWorkbook(); // Carrega ou cria a planilha
    const worksheet = workbook.Sheets['User'];
    const data = XLSX.utils.sheet_to_json(worksheet); // Lê os dados existentes

    data.push(user); // Adiciona o novo usuário

    const newWorksheet = XLSX.utils.json_to_sheet(data); // Converte os dados atualizados para worksheet
    workbook.Sheets['User'] = newWorksheet; // Atualiza a planilha

    XLSX.writeFile(workbook, filePath); // Salva o arquivo atualizado
};

// Recupera dados da última semana
const getWeeklyData = () => {
    const worksheet = loadDataSheet();
    const data = XLSX.utils.sheet_to_json(worksheet);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return data.filter(record => new Date(record.date) > oneWeekAgo);
};

const listUsers = () => {
    const workbook = loadWorkbook(); // Carrega a planilha
    const worksheet = workbook.Sheets['User'];
    const users = XLSX.utils.sheet_to_json(worksheet); // Lê os dados de usuários

    console.log('Usuários carregados:', users);  // Log para depuração

    return users; // Retorna os dados dos usuários
};

module.exports = { addUser, getWeeklyData, listUsers };
