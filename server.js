// imports
const inquirer = require('inquirer');
const mysql = require("mysql2");
require("console.table");
const db = require("./db/dbConnection");



function employeeList() {
   inquirer
   .prompt({
      type: 'list',
      name: 'employee list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employees',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'View All Employees',
        'Quit',
      ]
    })
    .then(function(userChoice){
      if (userChoice.title==="View All Employees"){
          viewAllEmployees()
      }
      if (userChoice.title==="View All Roles"){
          viewAllRoles()
      }
      if (userChoice.title==="View All Departments"){
         viewAllDepartments()
      }
      if (userChoice.title==="Add department"){
          addDepartment()
      }
      if (userChoice.title==="Add role"){
          addRole()
      }
      if (userChoice.title==="Add employee"){
          addEmployee()
      }
      if (userChoice.title==="Update Employee Role"){
          updateEpmloyeeRole()
      }
      if (userChoice.title==="Quit"){
          console.log("Good Bye!")
          return;
      }
  });
}

function viewAllEmployees(){
  const sql = `SELECT * FROM employee`

  db.query(sql, function(err, results){
      console.table(results)
      employeeList()
  })
}

function addEmployee() {
  console.log("Add an Employee")
  inquirer.prompt([
      {
          type: "input",
          name: "first_name",
          message: "Enter first Name."
      },
      {
          type: "input",
          name: "last_name",
          message: "Enter Last Name."
      },
      {
          type: "input",
          name: "role_id",
          message: "Enter Role ID."
      },
      {
          type: "input",
          name: "manager_id",
          message: "Enter Manager ID."
      }

  ])
  .then(function(userChoice){
      const sql= `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
      db.query(sql, [userChoice.first_name, userChoice.last_name, userChoice.role_id, userChoice.manager_id], function(err, results){
          if (err) {
              console.log(err)
          }
          console.log("Employee added to database.")
          employeeList()
      })
  })
}
function updateEpmloyeeRole(){
  console.log("Update Employee Role")
  return inquirer.prompt([
      {
          type: "input",
          name: "employee",
          message: "Enter Employee ID."
      },
      {
          type: "input",
          name: "role_id",
          message: "Enter Updated Role ID."
      }
  ])
  .then(function(userChoice){
      const sql= `UPDATE employee SET role_id=? WHERE id=?`
      db.query(sql,[userChoice.role_id, userChoice.id], function(err, results){
          console.log("Role updated.")
          employeeList()
      })
  })
}
function viewAllRoles() {
  const sql = `SELECT * FROM role`
  console.log("View All Roles")
  db.query(sql, function(err, results){
      if (err) {
          console.log(err)
      }
      console.table(results)
      employeeList()
  })
}

function addRole(){
  console.log("Add Role")
  inquirer.prompt([
      {
          type: "input",
          name: "title",
          message: "Enter in title name."
      },
      {
          type: "input",
          name: "salary",
          message: "Enter in salary."
      },
      {
          type: "input",
          name: "department_id",
          message: "Enter in department_id."
      },
  ])
  .then(function(userChoice) {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`

      db.query(sql, [userChoice.title,userChoice.salary,userChoice.department_id], function(err, results){
          if (err) {
              console.log(err)
          }
          console.log("Role added to DB.")
          employeeList()
      })
  })

}

function addDepartment() {
  console.log("Add a Department")
  inquirer.prompt([
      {
          type: "input",
          name: "department_name",
          message: "Please enter in a department"
      }
  ])
  .then(function(userChoice){
      const sql = `INSERT INTO department (name) VALUES(?)`

      db.query(sql,[userChoice.Dept_name], function(err, results) {
          console.log("Department added to DB")
          employeeList()
      })
  })
}

function viewAllDepartments(){
  const sql = `SELECT * FROM department`

  db.query(sql, function(err, results){
      console.table(results)
      employeeList()
  })
  
}

function viewAllEmployees(){
  const sql = `SELECT * FROM employee`

  db.query(sql, function(err, results){
      console.table(results)
      employeeList()
  })
}

employeeList();
