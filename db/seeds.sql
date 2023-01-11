USE tracker_db; 

INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles 
    (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 3),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 7),
    ('Account Manager', 160000, 5),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 6);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES 
    ('Ethan', 'Quinlan', 1, NULL),
    ('John', 'Doe', 2, 1),
    ('Mike', 'Chan', 3, 4),
    ('Ashley', 'Rodriguez', 4, 3),
    ('Kevin', 'Tupik', 5, NULL),
    ('Kunal', 'Singh', 6, 5),
    ('Malia', 'Brown', 7, 2),
   