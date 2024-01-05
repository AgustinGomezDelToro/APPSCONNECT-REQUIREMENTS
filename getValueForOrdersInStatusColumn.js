const axios = require('axios');
const moment = require('moment');

// Replace with your actual API token
const apiToken = 'your_API_token_here';
const apiUrl = 'https://api.monday.com/v2';

// Setting the headers for the API request
const headers = {
    'Authorization': apiToken,
    'Content-Type': 'application/json'
};

// Define your start and end dates for filtering
const sinceDate = moment('2024-01-01T00:00:00Z');
const endDate = moment('2024-12-31T23:59:59Z');

// Making a POST request to the Monday.com API
axios.post(apiUrl, {
    // GraphQL query to fetch items from boards with specific column values
    query: `query { 
                boards { 
                    items { 
                        name, 
                        updated_at,
                        column_values(ids: ["date", "project_owner", "project_status"]) { 
                            id,
                            value 
                        } 
                    } 
                } 
            }`
}, { headers })
    .then(response => {
        const boards = response.data.data.boards;
        let updatedItems = [];

        // Iterating through each board and its items
        boards.forEach(board => {
            board.items.forEach(item => {
                const updatedAt = moment(item.updated_at);
                // Filtering items updated between the specified dates
                if (updatedAt.isBetween(sinceDate, endDate, undefined, '[]')) {
                    const itemData = {
                        name: item.name,
                        updated_at: item.updated_at,
                        // Default values for date, project_owner, and project_status
                        date: 'No date',
                        project_owner: 'No owner',
                        project_status: 'No status'
                    };

                    // Extracting values from specific columns based on their IDs
                    item.column_values.forEach(column => {
                        switch(column.id) {
                            case 'date':
                                itemData.date = column.value;
                                break;
                            case 'project_owner':
                                itemData.project_owner = column.value;
                                break;
                            case 'project_status':
                                itemData.project_status = column.value;
                                break;
                        }
                    });

                    // Adding the filtered item data to the array
                    updatedItems.push(itemData);
                }
            });
        });

        // Logging the filtered items
        console.log('Items updated between the specified dates:', updatedItems);
    })
    .catch(error => {
        // Error handling
        console.error('Error:', error);
    });
