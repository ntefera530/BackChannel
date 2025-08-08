import pool from '../lib/db.js';

export const deleteUserProfile = async (userId) => {
    const query = `
        DELETE FROM "Users" 
        WHERE user_id = $1
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export const getUserProfile = async (userId) => {
    const query = `
        SELECT * 
        FROM "Users" 
        WHERE id = $1
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export const updateUsername = async (userId, newUsername) => {
    const query = `
        UPDATE "Users"  
        SET username = $1
        WHERE user_id = $2
    `;
  const result = await pool.query(query, [newUsername, userId]);
  return result.rows;
}

export const updateProfilePicture = async (userId, profilePictureUrl, ) => {
    const query = `
        UPDATE "Users"  
        SET profile_picture_url = $1
        WHERE user_id = $2
    `;
  const result = await pool.query(query, [profilePictureUrl, userId]);
  return result.rows;
}