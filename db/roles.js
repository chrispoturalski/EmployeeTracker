const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllRoles() {
    try{ 
     const roles = 
      await db.query("SELECT * FROM role")
         return roles
     } catch (err){
     console.log(err)
     }
 }
 
 module.exports = {viewAllRoles};