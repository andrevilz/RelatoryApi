const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const filePath = path.join(__dirname, '../data/database.xlsx');

// Função para carregar ou criar a planilha
const loadWorkbook = () => {
    if (!fs.existsSync(filePath)) {
        console.log('Arquivo não encontrado. Criando novo arquivo Excel...');
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, filePath);
        console.log('Arquivo Excel criado em:', filePath);
    } else {
        console.log('Arquivo Excel encontrado:', filePath);
    }
    return XLSX.readFile(filePath);
};

// Função para adicionar um registro
const addData = (record) => {
    const workbook = loadWorkbook();
    const worksheet = workbook.Sheets['Data'];
    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push(record);

    const newWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets['Data'] = newWorksheet;
    XLSX.writeFile(workbook, filePath);
};

// Função para buscar relatórios por intervalo de datas
const getReportsByDateRange = (startDate, endDate) => {
    const workbook = loadWorkbook();
    const worksheet = workbook.Sheets['Data'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data.filter(record => {
        const [startDay, startMonth, startYear] = startDate.split('/');
        const [endDay, endMonth, endYear] = endDate.split('/');
        
        const start = new Date(`${startYear}-${startMonth}-${startDay}`);
        const end = new Date(`${endYear}-${endMonth}-${endDay}`);

        const [dia, mes, ano] = record.date.split('/');
        const recordDate = new Date(`${ano}-${mes}-${dia}`);

        return recordDate >= start && recordDate <= end;
    });
};

// Função para buscar relatórios por nome de usuário
const getReportsByUser = (userName) => {
    const workbook = loadWorkbook();
    const worksheet = workbook.Sheets['Data'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data.filter(record => 
        record.name && record.name.trim().toLowerCase() === userName.trim().toLowerCase()
    );
};

// Função para buscar relatórios por nome de usuário e intervalo de datas
const getReportsByUserAndDateRange = (userName, startDate, endDate) => {
    const reportsByUser = getReportsByUser(userName);
    const start = new Date(startDate);  // Garantir que a data de início seja um objeto Date
    const end = new Date(endDate);  // Garantir que a data de fim seja um objeto Date

    return reportsByUser.filter(record => {
        const [dia, mes, ano] = record.date.split('/');  // Converter a data no formato DD/MM/YYYY
        const recordDate = new Date(`${ano}-${mes}-${dia}`);  // Criar objeto Date

        // Verificar se a data do relatório está dentro do intervalo
        return recordDate >= start && recordDate <= end;
    });
};


// Função para obter todos os relatórios
const getAllReports = () => {
    const workbook = loadWorkbook();
    const worksheet = workbook.Sheets['Data'];
    return XLSX.utils.sheet_to_json(worksheet);
};

module.exports = {
    addData,
    getReportsByDateRange,
    getAllReports,
    getReportsByUser,
    getReportsByUserAndDateRange,
};
