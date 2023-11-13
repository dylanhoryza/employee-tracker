
SELECT role.id, role.title, role.salary, department.name as department_name
FROM role
JOIN department ON role.department_id = department.id;

SELECT
  employee.id AS employee_id,
  employee.first_name,
  employee.last_name,
  role.title AS role_title,
  role.salary,
  department.name AS department_name
FROM
  employee
JOIN
  role ON employee.role_id = role.id
JOIN
  department ON role.department_id = department.id;

