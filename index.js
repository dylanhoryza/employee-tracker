const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'dog123',
    database: 'employees_db'
  },
  console.log('Connected to employees_db database.')
);