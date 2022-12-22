
const { prompt } = require("inquirer");
const db = require("./db/connection");

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
}

start();
