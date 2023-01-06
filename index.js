
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require("./db/departments");
const { viewAllEmployees, addAnEmployee, updateEmployee } = require("./db/employees");
const { viewAllRoles, addARole } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt ([
        {
            type: "list",
            name: "choice",
            message: "What do you need to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees", 
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an Employee role",
                "Exit"
            ]
        }
    ])

    switch (choice) {
        case "View all departments":
            const departments = await viewAllDepartments()
            console.table(departments)
            break;
        
        case "View all roles":
            const roles = await viewAllRoles()
            console.table(roles)
            break;
        
        case "View all employees":
            const employees = await viewAllEmployees()
            console.table(employees)
            break;
        
        case "Add a department":
            const addADepartment = await addDepartment()
            console.table(addADepartment)
            break;
        
        case "Add a role":
            const addRole = await addARole()
            console.table(addRole)
            break;
        case "Add an employee":
            const addEmployee = await addAnEmployee()
            console.table(addEmployee)
            break;
        case "Update an Employee role":
            const updatedEmployee = await updateEmployee()
            console.table(updatedEmployee)
            break;
    }
}

start();
