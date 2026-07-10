import pool from '../lib/db.js';


export const getUserSettings = async (userId, db = pool) => {
  const query = `
      SELECT delete_timer_seconds 
      FROM "Users" 
      WHERE id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows[0];
}
 
export const getProfilePictureUrl = async (userId, db = pool) => {
  const query = `
      SELECT profile_picture_url 
      FROM "Users" 
      WHERE id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows[0];
}

export const updateUserSettings = async (userId, delete_time_seconds, db = pool) => {
  const query = `
      UPDATE "Users"  
      SET delete_timer_seconds = $2
      WHERE id = $1
  `;
  const result = await db.query(query, [userId, delete_time_seconds]);
  return result.rows[0];
}

export const updateUsername = async (userId, username, db = pool) => {
  const query = `
      UPDATE "Users"  
      SET username = $2
      WHERE id = $1
  `;
  const result = await db.query(query, [userId, username]);
  return result.rows[0];
}

export const updatePassword = async (userId, password, db = pool) => {
  const query = `
      UPDATE "Users"  
      SET password = $2
      WHERE id = $1
  `;
  const result = await db.query(query, [userId, password]);
  return result.rows[0];
}

export const updateProfilePictureUrl = async (userId, profilePictureUrl, db = pool) => {
  const query = `
      UPDATE "Users"  
      SET profile_picture_url = $2
      WHERE id = $1
  `;
  const result = await db.query(query, [userId, profilePictureUrl]);
  return result.rows[0];
}

export const updateBio = async (userId, bio, db = pool) => {
  const query = `
      UPDATE "Users"  
      SET bio = $2
      WHERE id = $1
  `;
  const result = await db.query(query, [userId, bio]);
  return result.rows[0];
}

export const deleteUserAccount = async (userId, db = pool) => {
  const query = `
      DELETE FROM "Users" 
      WHERE id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows;  
}


export const deleteAllMessagesFromUser = async (userId, db = pool) => {
  const query = `
      DELETE FROM "Messages" 
      WHERE sender_id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows;  
}

export const getUserProfileByUsername = async (username, db = pool) => {
  const query = `
      SELECT id, username, password, bio, profile_picture_url 
      FROM "Users" 
      WHERE username = $1
  `;
  const result = await db.query(query, [username]);
  return result.rows[0];
} 

export const getUserProfileById = async (userId, db = pool) => {
  const query = `
      SELECT id, username, password, bio, profile_picture_url 
      FROM "Users" 
      WHERE id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows[0];
}

export const createUserProfile = async (username, hashedPassword, db = pool) => {
  const query = `
      INSERT INTO "Users" (username, password) 
      VALUES ($1, $2) 
      RETURNING *
  `;
  const result = await db.query(query, [username, hashedPassword]);
  return result.rows;
} 

export const getUserIdFromUsername = async (username, db = pool) => {
  const query = `
      SELECT id 
      FROM "Users" 
      WHERE username = $1
  `;
  const result = await db.query(query, [username]);
  return result.rows[0]; 
}