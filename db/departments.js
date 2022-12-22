const db = require("./connection");
const inquirer = require("inquirer");
async function viewAllDepartments() {
   try{ 
    const departments = 
     await db.query("SELECT * FROM department")
        return departments
    } catch (err){
    console.log(err)
    }
}

module.exports = {viewAllDepartments};