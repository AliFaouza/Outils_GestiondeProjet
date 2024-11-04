"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var Pool = require('pg').Pool;
exports.pool = new Pool({
    user: 'postgres',
    password: '300811',
    host: 'localhost',
    port: '5432',
    database: 'gestion_project'
});
