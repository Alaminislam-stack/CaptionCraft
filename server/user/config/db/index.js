import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectDB;