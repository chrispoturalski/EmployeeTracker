const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllEmployees() {
    try{ 
     const employees = 
      await db.query("SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id")
         return employees
     } catch (err){
     console.log(err)
     }
 }
 
 module.exports = {viewAllEmployees};