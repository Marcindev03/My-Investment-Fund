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

const investmentsCurrenciesLinksSQL = fs
  .readFileSync(
    path.resolve(__dirname, "entities", "investments_currency_links.sql")
  )
  .toString();

const entitiesQueries = [investmentsSQL, operationsSQL, currenciesSQL];
const relationQueries = [investmentsCurrenciesLinksSQL];

const app = async () => {
  await pool.query(clearTablesSQL);

  await Promise.all(
    entitiesQueries.map(async (query) => await pool.query(query))
  );

  await Promise.all(
    relationQueries.map(async (query) => await pool.query(query))
  );
};

app();
