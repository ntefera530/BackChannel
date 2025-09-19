import pool from '../lib/db.js';

export const getMessagesQuery = async (chatId, limit, offset) => {
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

export const deleteMessageQuery = async (chatId, userId, messageId) => {
    const query = `
        DELETE FROM "Messages" 
        WHERE id = $1 
        AND chat_id = $2 
        AND sender_id = $3 
    `;
  const result = await pool.query(query, [messageId, chatId, userId]);
  return result.rows;
}

export const deleteAllMessagesQuery = async (userId, chatId) => {
    const query = `
        DELETE FROM "Messags" 
        WHERE chat_id = $1 
        AND sender_id = $2
    `;
  const result = await pool.query(query, [chatId, userId]);
  return result.rows;
}

export const saveMessagesQuery = async (userId, chatId) => {
    const query = `
        INSERT INTO "Messages" (id, sender_id, chat_id, content, expire_by)
        VALUES ($1, $2, $3, $4, $5)
    `;
  const result = await pool.query(query, [id, sender_id, chat_id, content, expire_by]);
  return result.rows;
}

export const cleanupExpiredMessagesQuery = async () => {
    const query = `
        DELETE FROM "Messages" 
        WHERE expires_at <= NOW()
    `;
  const result = await pool.query(query, []);
  return result.rows;
}

