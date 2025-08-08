import pool from '../lib/db.js';

export const createUserProfileQuery = async (username, hashedPassword) => {
    const query = `
        INSERT INTO "Users" (username, password) 
        VALUES ($1, $2) 
        RETURNING *
    `;
  const result = await pool.query(query, [username, hashedPassword]);
  return result.rows;
}

export const getUserProfileByIdQuery = async (userId) => {
    const query = `
        SELECT * 
        FROM "Users" 
        WHERE id = $1
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export const getUserProfileByUsernameQuery = async (username) => {
    const query = `
        SELECT * 
        FROM "Users" 
        WHERE username = $1
    `;
  const result = await pool.query(query, [username]);
  return result.rows;
}

