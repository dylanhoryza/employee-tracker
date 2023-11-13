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

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
  startApp();
});

const startApp = () => {
  inquirer
    .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
      'View all departments', 
      'View all roles', 
      'View all employees', 
      'Add a department', 
      'Add a role', 
      'Add an employee', 
      'Update an employee',
      'Exit App'
    ]}
  ]).then((answers) => {
    switch (answers.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee':
        updateEmployee();
        break;
      case 'Exit App':
        exitApp();
        break;
    }
  })
};


const viewAllDepartments = () => {
  db.query('SELECT * FROM department', function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};

const viewAllRoles = () => {
  db.query('SELECT * FROM role', function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};