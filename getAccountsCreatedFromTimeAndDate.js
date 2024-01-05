// Before running this script, execute the following command in your terminal: npm install moment
// This script retrieves all users created between two specified dates.
// You can adjust 'startDate' and 'endDate' to the desired dates for filtering.
const axios = require('axios');
const moment = require('moment');

let data = JSON.stringify({
    "query": "query {users (limit:50) {created_at email account { name id}}}"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.monday.com/v2',
    headers: {
        'Authorization': 'your-API-token-here',
        'Content-Type': 'application/json',
    },
    data: data
};

// Define start and end dates for the range
const startDate = moment('2023-01-01T00:00:00Z');
const endDate = moment('2023-12-31T23:59:59Z');

axios.request(config)
    .then((response) => {
        const users = response.data.data.users;
        const filteredUsers = users.filter(user => {
            const userCreationDate = moment(user.created_at);
            // '[]' includes start and end dates in the range
            return userCreationDate.isBetween(startDate, endDate, undefined, '[]');
        });

        console.log('Users created between January 2023 and December 2023:', filteredUsers);
    })
    .catch((error) => {
        console.log(error);
    });
