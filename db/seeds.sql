-- USE tracker_db; 

INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Law');

INSERT INTO roles 
    (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

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
   