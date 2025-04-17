const Pool = require('pg').Pool;

export const pool = new Pool ({
    user: 'root',
    password:'',
    host:'localhost',
    port:'5432',
    database: 'gestion_project'
})
