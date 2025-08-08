import pool from '../lib/db.js';

export const getMessages = async (chatId, limit, offset) => {
    const query = `
        SELECT *
        FROM "Messages" 
        WHERE chat_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2 
        OFFSET $3
    `;
  const result = await pool.query(query, [chatId, limit, offset]);
  return result.rows;
}

export const deleteMessage = async (chatId, userId, messageId) => {
    const query = `
        DELETE FROM "Messages" 
        WHERE id = $1 
        AND chat_id = $2 
        AND sender_id = $3 
    `;
  const result = await pool.query(query, [messageId, chatId, userId]);
  return result.rows;
}

export const deleteAllMessages = async (userId, chatId) => {
    const query = `
        DELETE FROM "Messags" 
        WHERE chat_id = $1 
        AND sender_id = $2
    `;
  const result = await pool.query(query, [chatId, userId]);
  return result.rows;
}
