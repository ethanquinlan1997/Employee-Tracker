// imports
const mysql = require("mysql2");
const inquirer = require('inquirer');


// Create Connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: require("dotenv").config(),
//   database: "employee_tracker",
// });

// connection.connect();

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
    .then((answer) => {
      switch (answer.choices) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Roles":
          addRoles();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "View All Employees":
          viewAllEmployees();
          break;

        case "Quit":
          connection.end();
          console.log("See you later!");
          break;
      }
    });
}

function viewAllEmployees() {
  const sql =
    'Select emp.id as EmployeeID, concat(emp.first_name,"  ",emp.last_name ) as EmployeeName , ro.title as Job_tittle, ro.salary as Salary,dept.name as Department_Name,concat(emp2.first_name,"  ",emp2.last_name) as ManagerName from employee_tracker.employee as emp left join employee_tracker.employee as emp2 on emp2.id=emp.manager_id left join employee_tracker.Role as ro on emp.role_id=ro.id left join employee_tracker.department as dept on dept.id = ro.department_id';
  connection.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    employeeList();
  });
}

async function addEmployee() {
  const managers = await selectManager();

  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: await selectRole(),
      },
      {
        name: "manager",
        type: "list",
        message: "Whats their managers name?",
        choices: managers,
      },
    ])
    .then(function (res) {
      let roleId = res.role;
      let managerId = res.manager;

      console.log({ managerId });
      connection.query(
        "INSERT INTO Employee SET ?",
        {
          first_name: res.firstname,
          last_name: res.lastname,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          runList();
        }
      );
    });
}

function updateEmployeeRole() {
  connection
    .promise()
    .query("SELECT *  FROM employee")
    .then((res) => {
      return res[0].map((employee) => {
        return {
          name: employee.first_name,
          value: employee.id,
        };
      });
    })
    .then(async (employeeList) => {
      return inquirer.prompt([
        {
          type: "list",
          name: "employeeListId",
          choices: employeeList,
          message: "Please select the employee you want to update a role:.",
        },
        {
          type: "list",
          name: "roleId",
          choices: await selectRole(),
          message: "Please select the role.",
        },
      ]);
    })
    .then((answer) => {
      console.log(answer);
      return connection.promise().query(
        "UPDATE employee SET  role_id = ? WHERE id = ?",

        [answer.roleId, answer.employeeListId]
      );
    })
    .then((res) => {
      console.log(res);
      console.log("Updated Manager Successfully");
      employeeList();
    })

    .catch((err) => {
      throw err;
    });
}

function viewAllRoles() {
  connection.query(
    "select ro.title as Role_title, ro.salary as Salary , dept.name as DepartmentName from Role ro left join department as dept on dept.id = ro.department_id",
    (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
     employeeList();
    }
  );
}

function addRoles() {


  // query all the depts
  connection
    .promise()
    .query("SELECT * FROM Department")
    .then((res) => {
      // make the choice dept arr
      return res[0].map((dept) => {
        return {
          name: dept.name,
          value: dept.id,
        };
      });
    })
    .then((departments) => {
      return inquirer.prompt([
        {
          type: "input",
          name: "roles",
          message: "Please enter in a role:",
        },

        {
          type: "input",
          name: "salary",
          message: "Please enter in a salary:",
        },

        {
          type: "list",
          name: "departments",
          choices: departments,
          message: "Please select a department.",
        },
      ]);
    })

    .then((answer) => {
      console.log(answer);
      return connection
        .promise()
        .query("INSERT INTO role SET ?", {
          title: answer.roles,
          salary: answer.salary,
          department_id: answer.departments,
        });
    })
    .then((res) => {
      console.log("Added new role");
      runList();
    })
    .catch((err) => {
      throw err;
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM Department", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    employeeList();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please add a department name:",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO department SET?",
        { name: answer.department },
        (err, res) => {
          if (err) throw err;
          console.log("Added new department");
          employeeList();
        }
      );
    });
}

function viewAllEmployees() {
  const sql =
    'Select emp.id as EmployeeID, concat(emp.first_name,"  ",emp.last_name ) as EmployeeName , ro.title as Job_tittle, ro.salary as Salary,department.name as Department_Name,concat(emp2.first_name,"  ",emp2.last_name) as ManagerName from employee_tracker.employee as emp left join employee_tracker.employee as emp2 on emp2.id=emp.manager_id left join employee_tracker.Role as ro on emp.role_id=ro.id left join employee_tracker.department as dept on dept.id = ro.department_id';
  connection.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
   employeeList();
  });
}

employeeList();
