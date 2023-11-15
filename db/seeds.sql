INSERT INTO department(name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Web Development"),
       ("Sales"),
       ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Accountant", 100000, 1),
       ("Hiring Manager", 70000, 2),
       ("Senior Developer", 120000, 3),
       ("Junior Developer", 80000, 3),
       ("Sales Manager", 75000, 4),
       ("Sales Associate", 60000, 4),
       ("Lawyer", 200000, 5),
       ("Claims Manager", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Garnett", 1, null),
       ("Kobe", "Bryant", 2, 1),
       ("Lebron", "James", 3, null),
       ("Dwyane", "Wade", 4, 3),
       ("Devin", "Booker", 5, null),
       ("Kevin", "Durant", 6, 5),
       ("Allen", "Iverson", 7, null),
       ("Steph", "Curry", 8, 7);


