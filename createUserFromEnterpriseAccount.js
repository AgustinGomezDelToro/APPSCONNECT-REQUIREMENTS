// Before running this script, execute the following command in your terminal: npm install axios
// This script creates a new user in monday.com from an enterprise account
const axios = require('axios');

const apiToken = 'your-API-token-here'; // Replace with your actual API token
const apiURL = 'https://company.monday.com/scim/v2/Users'; // Make sure to use the correct URL

const userData = {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    userName: "employee@company.com",
    name: {
        givenName: "Test",
        familyName: "User"
    },
    emails: [{
        primary: true,
        value: "employee@company.com",
        type: "work"
    }],
    displayName: "Test User",
    locale: "es",
    timezone: "Europe/Brussels",
    title: "Full-Stack Engineer",
    addresses: [{
        type: "work",
        primary: true,
        value: "21B Baker St., London"
    }],
    externalId: "00ujl29u0le5T6Aj10h7", // you can use the externalId of the user for your integration with SAP B1
    active: true
};

// Performing a POST request to create a new user
axios.post(apiURL, userData, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
    }
})
    .then(response => {
        console.log('User successfully created:', response.data);
    })
    .catch(error => {
        console.error('Error creating the user:', error);
    });
