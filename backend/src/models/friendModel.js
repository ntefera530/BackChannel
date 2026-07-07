import pool from '../lib/db.js';

export const isFriend = async (userId, friendId, db = pool) => {
    const query = `
        SELECT 1 FROM "Friendships"  
        WHERE user_id = $1 
        AND friend_id = $2
    `;
  const result = await db.query(query, [userId, friendId]);
  return result.rows.length > 0;
}

export const getAllFriends = async (userId, db = pool) => {
    const query = `
        SELECT u.id, u.username, u.bio, u.profile_picture_url
        FROM "Users" u
        JOIN "Friendships" f ON (
            (f.user_id = $1 AND u.id =f.friend_id)
            OR
            (f.friend_id = $1 AND u.id = f.user_id)
        );
    `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

export const addFriend = async (userId, friendId, db = pool) => {
    const query = `
        INSERT INTO "Friendships" (user_id, friend_id) 
        VALUES ($1, $2)
        ON CONFLICT (user_id, friend_id) DO NOTHING
        RETURNING *
    `;
    const result = await db.query(query, [userId, friendId]);
    return result.rows;
}

export const deleteFriend = async (userId, friendId, db = pool) => {
    const query = `
        DELETE FROM "Friendships"  
        WHERE user_id = $1 
        AND friend_id = $2
        RETURNING *
    `;
  const result = await db.query(query, [userId, friendId]);
  return result.rows;
}



