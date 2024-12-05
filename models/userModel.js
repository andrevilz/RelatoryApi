const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const filePath = path.join(__dirname, '../data/database.xlsx');

const loadWorkbook = () => {
    if (!fs.existsSync(filePath)) {
        // console.log('Arquivo não encontrado. Criando novo arquivo Excel...');
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User');
        XLSX.writeFile(workbook, filePath);
        // console.log('Arquivo Excel criado em:', filePath);
    }
    return XLSX.readFile(filePath);
};

const loadDataSheet = () => {
    const workbook = loadWorkbook();
    return workbook.Sheets['Data'];
};

const addUser = (user) => {
    const workbook = loadWorkbook(); 
    const worksheet = workbook.Sheets['User'];
    const data = XLSX.utils.sheet_to_json(worksheet); 

    data.push(user);

    const newWorksheet = XLSX.utils.json_to_sheet(data); 
    workbook.Sheets['User'] = newWorksheet; 
    XLSX.writeFile(workbook, filePath); 
};

const getWeeklyData = () => {
    const worksheet = loadDataSheet();
    const data = XLSX.utils.sheet_to_json(worksheet);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return data.filter(record => new Date(record.date) > oneWeekAgo);
};

const listUsers = () => {
    const workbook = loadWorkbook(); 
    const worksheet = workbook.Sheets['User'];
    const users = XLSX.utils.sheet_to_json(worksheet);

    // console.log('Usuários carregados:', users);  

    return users; 
};

module.exports = { addUser, getWeeklyData, listUsers };
