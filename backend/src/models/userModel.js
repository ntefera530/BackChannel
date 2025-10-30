import pool from '../lib/db.js';

// ------------------------------------- GET -------------------------------------------------------------------------------------

export const getUserProfileByUsernameQuery = async (username) => {
    const query = `
        SELECT * 
        FROM "Users" 
        WHERE username = $1
    `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
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

export const getUserIdByUsernameQuery = async (username) => {
    const query = `
        Select id 
        FROM "Users" 
        WHERE username = $1
    `;
  const result = await pool.query(query, [username]);
  return result.rows;
}

export const getAllMessagesQuery = async (userId, limit, offset) => {
    const query = `
        SELECT *
        FROM "Messages" 
        WHERE user_id = $1 
        LIMIT $2 
        OFFSET $3
    `;
  const result = await pool.query(query, [userId, limit, offset]);
  return result.rows;
}

// ------------------------------------- Update -------------------------------------------------------------------------------------

export const updateUsernameQuery = async (userId, newUsername) => {
    const query = `
        UPDATE "Users"  
        SET username = $1
        WHERE id = $2
    `;
  const result = await pool.query(query, [newUsername, userId]);
  return result.rows;
}

export const updatePasswordQuery = async (userId, newPassword) => {
    const query = `
        UPDATE "Users"  
        SET password = $1
        WHERE id = $2
    `;
  const result = await pool.query(query, [newPassword, userId]);
  return result.rows;
}


export const updateProfilePictureQuery = async (userId, profilePictureUrl, ) => {
    const query = `
        UPDATE "Users"  
        SET profile_picture_url = $1
        WHERE id = $2
    `;
  const result = await pool.query(query, [profilePictureUrl, userId]);
  return result.rows;
}


// ------------------------------------- Delete -------------------------------------------------------------------------------------

export const deleteUserProfileByIdQuery = async (userId) => {
    const query = `
        DELETE FROM "Users" 
        WHERE id = $1
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}









export const createUserProfileQuery = async (username, hashedPassword) => {
  const query = `
      INSERT INTO "Users" (username, password) 
      VALUES ($1, $2) 
      RETURNING *
  `;
const result = await pool.query(query, [username, hashedPassword]);
return result.rows;
}