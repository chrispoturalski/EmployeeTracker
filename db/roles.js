const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try{ 
     const roles = 
      await db.query("SELECT * FROM role")
         return roles
     } catch (err){
     console.log(err)
     }
 }
 
async function addARole(){
    try {
        const departments = await viewAllDepartments();
        const {
            title,
            salary,
            department_id
        
        } = await inquirer.prompt ([
            {
                type: "input",
                name: "title",
                message: "What is the new role title?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this new role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does this new role belong to?",
                choices: departments.map(department => {
                    return {
                        value: department.id,
                        name: department.name
                    };
                }),
            }
        ])
        await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const addRole = await viewAllRoles()
        return addRole
    } catch (err) {
        console.log (err)
    }
}

 module.exports = {viewAllRoles, addARole};