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

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Garnett", 1),
       ("Kobe", "Bryant", 2),
       ("Dwyane", "Wade", 3),
       ("Lebron", "James", 3),
       ("Devin", "Booker", 4),
       ("Kevin", "Durant", 4),
       ("Allen", "Iverson", 5),
       ("Steph", "Curry", 5);


