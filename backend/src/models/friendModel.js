import pool from '../lib/db.js';

export const addFriendQuery = async (userId, friendId) => {
    const query = `
        INSERT INTO "Friendships" (user_id, friend_id) 
        VALUES ($1, $2)
    `;
  const result = await pool.query(query, [userId, friendId]);
  return result.rows;
}

export const deleteFriendQuery = async (userId, friendId) => {
    const query = `
        DELETE FROM "Friendships"  
        WHERE user_id = $1 
        AND friend_id = $2
    `;
  const result = await pool.query(query, [userId, friendId]);
  return result.rows;
}

export const getAllFriendsQuery = async (userId) => {
    const query = `
        SELECT 
            CASE WHEN user_id = $1 
                THEN friend_id 
            ELSE user_id 
            END 
        AS friend_id 
        FROM "Friendships" 
        WHERE user_id = $1 
        OR friend_id = $1;
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}