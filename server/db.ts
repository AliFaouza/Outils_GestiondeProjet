const Pool = require('pg').Pool;

export const pool = new Pool ({
    user: 'postgres',
    password:'300811',
    host:'localhost',
    port:'5432',
    database: 'gestion_project'
})
