import express from "express"

import dotenv from "dotenv"

import pool from './DB/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

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

// async function getUsers() {
//   try {
//     const result = await pool.query('SELECT * FROM Users');
//     console.log(result.rows); // [{ id: 1, username: 'alice', ...}, ...]
//   } catch (err) {
//     console.error('Database error:', err);
//   } finally {
//     await pool.end(); // Close connection when done
//   }
// }

// getUsers();

app.listen(PORT, () => {
    console.log("Server is Listening on port: " + PORT)
});