import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'task_tracker',
password: 'root',
port: 5432,
});