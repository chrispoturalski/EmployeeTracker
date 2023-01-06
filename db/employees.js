const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
  try {
    const employees = await db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id"
    );
    return employees;
  } catch (err) {
    console.log(err);
  }
}

async function addAnEmployee() {
  try {
    const employees = await viewAllEmployees();
    const roles = await viewAllRoles();
    const { 
        first_name, 
        last_name, 
        role, 
        manager 
    } = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role",
        choices: roles.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
      {
        type: "list",
        name: "manager",
        message: "What is the manager id for the employee?",
        choices: [
          ...employees.map((employee) => {
            return {
              value: employee.id,
              name: `${employee.first_name} ${employee.last_name}`,
            };
          }),
          {
            value: null,
            name: "none",
          },
        ],
      },
    ]);
    await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role}", "${manager}")`
    );
    const addAnEmployee = await viewAllEmployees();
    return addAnEmployee;
  } catch (err) {
    console.log(err);
  }
}

async function updateEmployee() {
    try {
        const employees = await viewAllEmployees();
        const roles = await viewAllRoles();
        const { 
            employee,
            newRole
        } = await inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you want to update",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id
                    }
                })
            },
            {
                type: "list",
                name: "newRole",
                message: "Select the new role for this employee",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    }
                })
            }
        ]);
        await db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`);
        const employeeUpdate = await viewAllEmployees();
        return await employeeUpdate;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addAnEmployee, updateEmployee };
