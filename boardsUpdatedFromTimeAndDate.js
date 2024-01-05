// Before running this script, execute the following command in your terminal: npm install moment
const axios = require('axios');
const moment = require('moment');
const apiToken = 'your-API-token-here'; // Replace with your actual API token
const apiUrl = 'https://api.monday.com/v2';
const headers = {
    'Authorization': apiToken,
    'Content-Type': 'application/json'
};

const sinceDate = moment('2023-01-01T00:00:00Z'); // Coloca aquí la fecha deseada

axios.post(apiUrl, {
    query: 'query { boards { items { name, updated_at } } }' // Ajusta esta consulta según tus necesidades
}, { headers })
    .then(response => {
        const boards = response.data.data.boards;
        let updatedItems = [];

        boards.forEach(board => {
            board.items.forEach(item => {
                const updatedAt = moment(item.updated_at);
                if (updatedAt.isSameOrAfter(sinceDate)) {
                    updatedItems.push(item);
                }
            });
        });

        console.log('Items updated since the specified date:', updatedItems);
    })
    .catch(error => {
        console.error('Error:', error);
    });
