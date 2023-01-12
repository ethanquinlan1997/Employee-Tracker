// imports
const inquirer = require("inquirer");
// const mysql = require("mysql2");
require("console.table");
const db = require("./db/dbConnection");

function employeeList() {
  inquirer
    .prompt({
      type: "list",
      name: "answer",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employees",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "View All Employees",
        "Quit",
      ],
    })
    .then(function (userChoice) {
      if (userChoice.answer === "View All Employees") {
        viewAllEmployees();
      }
      if (userChoice.answer === "View All Roles") {
        viewAllRoles();
      }
      if (userChoice.answer === "View All Departments") {
        viewAllDepartments();
      }
      if (userChoice.answer === "Add Department") {
        addDepartment();
      }
      if (userChoice.answer === "Add Role") {
        addRole();
      }
      if (userChoice.answer === "Add Employees") {
        addEmployee();
      }
      if (userChoice.answer === "Update Employee Role") {
        updateEpmloyeeRole();
      }
      if (userChoice.answer === "Quit") {
        console.log("Good Bye!");
        return;
      }
    });
}

function addEmployee() {
  console.log("Add an Employee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter first Name.",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter Last Name.",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employees role?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter Manager ID.",
      },
    ])
    .then(function (userChoice) {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      db.query(
        sql,
        [
          userChoice.first_name,
          userChoice.last_name,
          userChoice.role_id,
          userChoice.manager_id,
        ],
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          employeeList();
        }
      );
    });
}

function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;

  db.query(sql, function (err, results) {
    console.table(results);
    employeeList();
  });
}

function updateEpmloyeeRole() {
  console.log("Update Employee Role");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "employees",
        message: "Enter Employee ID.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter Updated Role ID.",
      },
    ])
    .then(function (userChoice) {
      const sql = `UPDATE employees SET role_id=? WHERE id=?`;
      db.query(
        sql,
        [userChoice.role_id, userChoice.id],
        function (err, results) {
          console.table(results);
          employeeList();
        }
      );
    });
}
function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  console.log("View All Roles");
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    employeeList();
  });
}

function addRole() {
  console.log("Add Roles");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter in title name.",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter in salary.",
      },
      {
        type: "input",
        name: "name",
        message: "What department id to you want to use?",
      },
    ])
    .then(function (userChoice) {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)`;

      db.query(
        sql,
        [userChoice.title, userChoice.salary, userChoice.department_id],
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log("Added new role to the database");
          employeeList();
        }
      );
    });
}

function addDepartment() {
  console.log("Add a Department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Please enter in a department",
      },
    ])
    .then(function (userChoice) {
      const sql = `INSERT INTO departments (departments_name) VALUES(?)`;

      db.query(sql, [userChoice.name], function (err, results) {
        console.table(results);
        console.log("Added Service to Database!");
        employeeList();
      });
    });
}

function viewAllDepartments() {
  const sql = `SELECT * FROM departments`;

  db.query(sql, function (err, results) {
    console.table(results);
    employeeList();
  });
}



employeeList();
