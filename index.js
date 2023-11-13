const inquirer = require('inquirer');
const mysql = require('mysql2');

// mysql connection
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

// Intitalize App with inqurier prompt
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

// Function to view the department table
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};
// Function to view the role table
const viewAllRoles = () => {
  db.query(`SELECT role.id, role.title, role.salary, department.name as department_name
  FROM role
  JOIN department ON role.department_id = department.id`, function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};
// Function to view the employee table
const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', function (err, results){
    if (err) throw err;
    console.table(results);
    startApp();
  })
};
// Function to add a new department to the department table
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid department name.';
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const { name } = answers;

      const query = 'INSERT INTO department (name) VALUES (?)';

      db.query(query, [name], function (err, result) {
        if (err) throw err;

        console.log(`Department '${name}' added successfully.`);
        startApp(); 
      });
    });
};

// Function to add a new role to the role table
const addRole = () => {
 
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the role:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid department name.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the salary for this role?',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid department name.';
          }
          return true;
        },
      },
      {
        type: 'list',
        action: 'action',
        message: 'Select the department for this role:',
        choices: 'SELECT (name) FROM department'
      }
    ])
    .then((answers) => {
      const { name } = answers;

      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

      db.query(query, [name], function (err, result) {
        if (err) throw err;

        console.log(`Role '${name}' added successfully.`);
        startApp(); 
      });
    });
};

// Function to exit out of the app
const exitApp = () => {
  console.log('Exiting the application.');
  db.end();
};
