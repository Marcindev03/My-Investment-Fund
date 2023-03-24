import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const clearTablesSQL = fs
  .readFileSync(path.resolve(__dirname, "entities", "tables.sql"))
  .toString();

const investmentsSQL = fs
  .readFileSync(path.resolve(__dirname, "entities", "investments.sql"))
  .toString();

const operationsSQL = fs
  .readFileSync(path.resolve(__dirname, "entities", "operations.sql"))
  .toString();

const currenciesSQL = fs
  .readFileSync(path.resolve(__dirname, "entities", "currencies.sql"))
  .toString();

const app = async () => {
  await pool.query(clearTablesSQL);

  pool.query(investmentsSQL);
  pool.query(operationsSQL);
  pool.query(currenciesSQL);
};

app();
