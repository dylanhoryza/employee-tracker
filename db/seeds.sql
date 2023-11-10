INSERT INTO department(name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Web Development"),
       ("Sales"),
       ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Accountant", 100000, 1),
       ("Hiring Manager", 70000, 2),
       ("Junior Developer", 80000, 3),
       ("Senior Developer", 120000, 3),
       ("Sales Associate", 60000, 4),
       ("Sales Manager", 75000, 4),
       ("Lawyer", 200000, 5),
       ("Claims Manager", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Garnett", 1, null),
       ("Kobe", "Bryant", 2, null),
       ("Dwyane", "Wade", 3, 4),
       ("Lebron", "James", 3, null),
       ("Devin", "Booker", 4, 6),
       ("Kevin", "Durant", 4, null),
       ("Allen", "Iverson", 5, null),
       ("Steph", "Curry", 5, 7);


