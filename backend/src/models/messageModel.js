import pool from '../lib/db.js';

export const getMessagesByChatIdQuery = async (chatId, limit, offset) => {
    const query = `
        SELECT *
        FROM "Messages" 
        WHERE chat_id = $1 
    `;
  const result = await pool.query(query, [chatId]);
  return result.rows;
}

// export const getMessagesByChatIdQuery = async (chatId, limit, offset) => {
//     const query = `
//         SELECT *
//         FROM "Messages" 
//         WHERE chat_id = $1 
//         ORDER BY sent_at DESC 
//         LIMIT $2 
//         OFFSET $3
//     `;
//   const result = await pool.query(query, [chatId, limit, offset]);
//   return result.rows;
// }

export const deleteSelectedMessagesByIdQuery = async (messages) => {

  if (!messagesIds || messagesIds.length === 0) {
    return []; // Nothing to delete
  }

  const postgreSQLArray = messages.map((_, i) => `$${i + 1}`).join(', ');

  const query = `
    DELETE FROM "Messages" 
    WHERE id IN (${postgreSQLArray})
    RETURNING *;
  `;
  const result = await pool.query(query, [...messages]);
  return result.rows;
}

export const deleteAllMessageQuery = async (userId) => {
  const query = `
    DELETE FROM "Messages" 
    WHERE sender_id = $1 
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export const saveMessagesQuery = async (messageId, senderId, chatId, content, expireBy) => {
    const query = `
        INSERT INTO "Messages" (id, sender_id, chat_id, content, expire_by)
        VALUES ($1, $2, $3, $4, $5)
    `;
  const result = await pool.query(query, [messageId, senderId, chatId, content, expireBy]);
  return result.rows;
}

export const cleanupExpiredMessagesQuery = async () => {
    const query = `
        DELETE FROM "Messages" 
        WHERE expire_by <= NOW()
    `;
  const result = await pool.query(query, []);
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

export const deleteMessagesByChatIdQuery = async (chatId) => {
    const query = `
        DELETE FROM "Messags" 
        WHERE chat_id = $1 
    `;
  const result = await pool.query(query, [chatId]);
  return result.rows;
}

export const deleteUserMessagesByChatIdQuery = async (chatId, userId) => {
    const query = `
        DELETE FROM "Messags" 
        WHERE chat_id = $1
        AND sender_id = $2
    `;
  const result = await pool.query(query, [chatId,userId]);
  return result.rows;
}
