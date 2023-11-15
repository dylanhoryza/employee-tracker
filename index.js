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
  db.query(`SELECT
  employee.id AS employee_id,
  employee.first_name,
  employee.last_name,
  role.title AS role_title,
  role.salary,
  department.name AS department_name,
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM
  employee
JOIN
  role ON employee.role_id = role.id
JOIN
  department ON role.department_id = department.id
LEFT JOIN 
employee as manager ON employee.manager_id = manager.id OR employee.manager_id = null;`, function (err, results){
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
const addRole = async () => {
 const [departments] = await db.promise().query('SELECT * FROM department');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
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
        name: 'salary',
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
        name: 'department_id',
        message: 'Select the department for this role:',
        choices: departments.map(({id, name})=> {
          return {
            name,
            value: id
          }
        })
      }
    ])
    .then((answers) => {
      const { title, salary, department_id } = answers;
      
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

      db.query(query, [title, salary, department_id], function (err, result) {
        if (err) throw err;

        console.log(`Role '${title}' added successfully.`);
        startApp(); 
      });
    });
};

// Function to add a new employee

const addEmployee = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');
  const [role] = await db.promise().query('SELECT * FROM role');
  inquirer
    .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter the first name of the employee.",
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter a valid first name.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee.',
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter a valid last name.';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'role_id',
      action: 'action',
      message: 'Select the role for this employee.',
      choices: role.map(({id, title})=> {
        return {
          id,
          value: title
        }
      })
    },
    {
      type: 'list',
      name: 'manager_id', 
      action: 'action',
      message: 'Select the manager for this employee.',
      choices: employee.map(({id, first_name, last_name})=> {
        return {
          id,
          value: first_name + ' ' + last_name
        }
      })
    }
  ])    
  .then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;
    const selectedRole = role.find((role) => role.title === 'Hiring Manager' || 'Accountant' || 'Junior Developer' || 'Senior Developer' || 'Sales Associate' || 'Sales Manager' || 'Lawyer' || 'Claims Manager');
    const selectedEmployee = employee.find((employee) => employee.first_name + ' ' + employee.last_name === 'Kevin Garnett' || 'Kobe Bryant' || 'Dwyane Wade' || 'Lebron James' || 'Devin Booker' || 'Kevin Durant' || 'Allen Iverson' || 'Steph Curry');
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

    db.query(query, [first_name, last_name, selectedRole.id, selectedEmployee.id], function (err, result) {
      if (err) throw err;

      console.log(`Employee '${first_name} + ' ' + ${last_name}' added successfully.`);
      startApp(); 
    });
  });
};

//Function to update an employee role
const updateEmployee = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');
  const [role] = await db.promise().query('SELECT * FROM role');
  inquirer
    .prompt([
    {
      type: 'list',
      name: 'employee_id',
      action: 'action',
      message: 'Select an employee to update their role.',
      choices: employee.map(({id, first_name, last_name})=> {
        return {
          id,
          value: first_name + ' ' + last_name
        }
      })
    },
    {
      type: 'list',
      name: 'role_id',
      action: 'action',
      message: 'Select a new role to assign to the employee.',
      choices: role.map(({id, title})=> {
        return {
          id,
          value: title
        }
      })
    },
  ]).then((answers) => {
    const { employee_id, role_id} = answers;
    const selectedRole = role.find((role) => role.title === 'Hiring Manager' || 'Accountant' || 'Junior Developer' || 'Senior Developer' || 'Sales Associate' || 'Sales Manager' || 'Lawyer' || 'Claims Manager');
    const selectedEmployee = employee.find((employee) => employee.first_name + ' ' + employee.last_name === 'Kevin Garnett' || 'Kobe Bryant' || 'Dwyane Wade' || 'Lebron James' || 'Devin Booker' || 'Kevin Durant' || 'Allen Iverson' || 'Steph Curry');

    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    
    db.query(query, [selectedRole.id, selectedEmployee.id], function (err, result) {
      if (err) throw err;

      console.log(`Employee '${selectedEmployee}' updated successfully.`);
      startApp(); 
    });

  })
}

// Function to exit out of the app
const exitApp = () => {
  console.log('Exiting the application.');
  db.end();
};
