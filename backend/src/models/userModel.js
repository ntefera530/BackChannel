import pool from '../lib/db.js';

export const getUserIdByUsernameQuery = async (username) => {
    const query = `
        Select id 
        FROM "Users" 
        WHERE username = $1
    `;
  const result = await pool.query(query, [username]);
  return result.rows;
}

export const deleteUserProfileQuery = async (userId) => {
    const query = `
        DELETE FROM "Users" 
        WHERE id = $1
    `;
  const result = await pool.query(query, [userId]);
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
  //console.log(result.rows[0])
  return result.rows[0];
}

export const updateUsernameQuery = async (userId, newUsername) => {
    const query = `
        UPDATE "Users"  
        SET username = $1
        WHERE id = $2
    `;
  const result = await pool.query(query, [newUsername, userId]);
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