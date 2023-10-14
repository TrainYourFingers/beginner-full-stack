const Pool = require("pg").Pool;
const dotenv = require("dotenv")

dotenv.config();

const pool = new Pool({
  user: "postgres",
  password: process.env.PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE,
});

module.exports = pool;
