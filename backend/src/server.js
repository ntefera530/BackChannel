import express from "express"

import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv"

import pool from './DB/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

(async () => {
  try {
    const res = await pool.query('SELECT current_database()');
    console.log('Connected! Time:', res.rows[0]);

    const user = await pool.query('SELECT * FROM "Users"');
    console.log('Users:', user.rows);

  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    await pool.end();
  }
})();


app.listen(PORT, () => {
    console.log("Server is Listening on port: " + PORT)
});