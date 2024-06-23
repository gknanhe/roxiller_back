# Roxiler Assignment Frontend

This project provides a frontend dashboard for managing product transactions. It utilizes the backend APIs created for fetching transaction data, statistics, and bar chart information.

> ## Checkout the Website [Web Application](https://roxiller-back.onrender.com/api)

## Features

- **Transactions Management**: Handle and store transactions.
- **Statistics**: Fetch and calculate statistics based on transactions.
- **Charts**: Provide data for bar and pie charts.

## Prerequisites

- Node.js (>=14.x)
- MongoDB

## Getting Started

### Clone the Repository

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository

## Install Dependencies

      bash
      npm install

## Environment Variables

Create a .env file in the root directory and add the following variables:

    PORT=8000
    MONGO_URI=mongodb://localhost:27017/yourdbname

### Run the Server

        ```bash
          npm start
    The server will run on http://localhost:8000.

### API Endpoints

Get All Transactions

          ```bash
    GET /api/all_transactions

#### Query Parameters:

month: (optional) Filter transactions by month.
page: (optional) Pagination - specify page number.
limit: (optional) Pagination - specify number of items per page.
search: (optional) Search transactions by title or description.

#### Get Statistics

    bash
    GET /api/statistics

Query Parameters:

month: (optional) Filter statistics by month.
Get Bar Chart Data

      bash
    GET /api/bar

Query Parameters:

month: (optional) Filter data by month.

#### Get Pie Chart Data

    bash
    GET /api/pie

Query Parameters:

month: (optional) Filter data by month.
