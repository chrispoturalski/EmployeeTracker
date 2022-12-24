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

async function addDepartment() {
    try {
        const departments = await viewAllDepartments();
        const {
            name,
        } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What department would you like to add?"
            }
        ])
        await db.query(`INSERT into department (name) VALUES ("${name}")`)
        const addADepartment = await viewAllDepartments();
        return addADepartment
    } catch (err) {
        console.log(err)
    }
}

module.exports = {viewAllDepartments, addDepartment};