const axios = require('axios');
const moment = require('moment');

// Replace with your actual API token
const apiToken = 'your-API-token-here';
const apiUrl = 'https://api.monday.com/v2';

// Setting the headers for the API request
const headers = {
    'Authorization': apiToken,
    'Content-Type': 'application/json'
};

// Define your start and end dates for filtering
const startDate = moment('2024-01-01T00:00:00Z'); // Start date for filtering
const endDate = moment('2024-12-31T23:59:59Z'); // End date for filtering

// Making a POST request to the Monday.com API
axios.post(apiUrl, {
    // GraphQL query to fetch items' names and creation dates
    query: `query { 
                boards { 
                    items { 
                        name, 
                        created_at, 
                        column_values(ids: ["date"]) { 
                            id,
                            value 
                        } 
                    } 
                } 
            }`
}, { headers })
    .then(response => {
        const boards = response.data.data.boards;
        let itemsWithinDateRange = [];

        // Iterating through each board and its items
        boards.forEach(board => {
            board.items.forEach(item => {
                const createdAt = moment(item.created_at);
                // Filtering items created between the specified dates
                if (createdAt.isBetween(startDate, endDate, undefined, '[]')) {
                    const itemData = {
                        name: item.name,
                        created_at: item.created_at, // Using created_at
                        date: item.column_values[0] ? item.column_values[0].value : 'No date' // Value of the 'date' column
                    };

                    itemsWithinDateRange.push(itemData);
                }
            });
        });

        // Logging the filtered items
        console.log('Orders created between the specified dates:', itemsWithinDateRange);
    })
    .catch(error => {
        // Error handling
        console.error('Error:', error);
    });
