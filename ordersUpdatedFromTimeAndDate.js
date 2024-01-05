// Before running this script, execute the following command in your terminal: npm install moment
const axios = require('axios');
const moment = require('moment');


const apiToken = 'your_API_token_here'; // Replace with your actual API token
const apiUrl = 'https://api.monday.com/v2';
const headers = {
    'Authorization': apiToken,
    'Content-Type': 'application/json'
};

const startDate = moment('2024-01-05T13:45:04Z'); // Start date for filtering
const endDate = moment('2024-01-05T13:46:05Z'); // End date for filtering

axios.post(apiUrl, {
    query: 'query { boards { items { name, updated_at } } }' // Adjust this query as needed
}, { headers })
    .then(response => {
        const boards = response.data.data.boards;
        let updatedItems = [];

        boards.forEach(board => {
            board.items.forEach(item => {
                const updatedAt = moment(item.updated_at);
                // Filter items updated within the specified date range
                if (updatedAt.isBetween(startDate, endDate, undefined, '[]')) {
                    updatedItems.push(item);
                }
            });
        });

        console.log('Orders updated within the specified date range: ', updatedItems);
    })
    .catch(error => {
        console.error('Error:', error);
    });
