//function to connect postgresql database
import pkg from 'pg'; // Import the pg package for PostgreSQL
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

    const pool = new Pool({
    user: process.env.PGUSER,       // usually 'postgres'
    host: process.env.PGHOST,       // usually 'localhost'
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432, // usually 5432
    });

export default pool;
