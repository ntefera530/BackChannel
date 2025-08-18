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

    const query2 = `
        SELECT u.id, u.username, u.bio, u.profile_picture_url
        FROM "Users" u
        JOIN "Friendships" f ON (
            (f.user_id = $1 AND u.id =f.friend_id)
            OR
            (f.friend_id = $1 AND u.id = f.user_id)
        );
    `;
  const result = await pool.query(query2, [userId]);
  return result.rows;
}