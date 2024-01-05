# APPSCONNECT-REQUIREMENTS

This repository contains scripts and resources to assist with implementing various functionalities using the Monday.com API, tailored specifically for APPSCONNECT.

## Installation

Before running the scripts in this repository, you need to install the necessary dependencies. Please run the following commands in your terminal:

```bash
npm install axios
npm install moment


````


## Detailed File Descriptions
This repository contains several scripts, each designed to address specific requirements related to the Monday.com platform. Below is a detailed explanation of what each file does:


#### createUserFromEnterpriseAccount.js
- **Purpose**:  
  This script is used for creating a user within a Monday.com account using the SCIM provisioning API, which is available only for enterprise accounts.

- **Use Case**:  
  Ideal for enterprise users who need to programmatically add users to their Monday.com environment.

#### getAccountsCreatedFromTimeAndDate.js
- **Purpose**:  
  Fetches account information based on their creation date. This script demonstrates how to filter data using NodeJS and GraphQL.

- **Use Case**:  
  Useful for obtaining accounts created within a specific time frame.

#### getOrdersCreatedFromTimeAndDate.js
- **Purpose**:  
  Similar to `getAccountsCreatedFromTimeAndDate.js`, but specifically focused on order data. It filters orders based on their creation dates.
- **Use Case**:  
  Beneficial for users needing a historical view of orders within a certain date range.

#### ordersUpdatedFromTimeAndDate.js
- **Purpose**:  
  Filters orders and other items based on the dates and times they were updated.
- **Use Case**:  
  Helpful for users who need to track changes or updates to orders over a specific period.

#### getValueForOrdersInStatusColumn.js
- **Purpose**:  
  Implements a filter based on the status of columns in orders. This is particularly useful for more complex scenarios where filtering by status changes is required.
- **Use Case**:  
  Ideal for managing and tracking order statuses and identifying changes over time.
