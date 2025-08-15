import pool from '../lib/db.js';

export const createChatQuery = async (uuid, name, isGroup, userId) => {
    const query = `
        INSERT INTO "Chats" (id, name, is_group_chat, owner) 
        VALUES ($1, $2, $3, $4)
    `;
  const result = await pool.query(query, [uuid, name, isGroup, userId]);
  return result.rows;
}

export const addChatParticipantByIdQuery = async (participant_id, chatId) => {
    const query = `
        INSERT INTO "Chat Participants" (user_id, chat_id)
        VALUES ($1, $2)      
    `;

    console.log(participant_id, chatId);
  const result = await pool.query(query, [participant_id, chatId]);
  return result.rows;
}

export const deleteChatByIdQuery = async (chatId) => {
    const query = `
        DELETE FROM "Chat Participants" 
        WHERE id = $1
    `;
    
  const result = await pool.query(query, [chatId]);
  return result.rows;
}

export const getllChatsQuery = async (userId) => {
    const query = `
        SELECT c.id 
        FROM "Chats" c , "Chat Participants" chp 
        WHERE chp.user_id == $1 
        AND c.id = chp.chat_id
    `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export const removeUserFromChatQuery = async (userId, chatId) => {
    const query = `
        DELETE FROM "Chats Participants" 
        WHERE user_id == $1 
        AND chat_id = $2', [userId, chatId]         
    `;
  const result = await pool.query(query, [userId, chatId]);
  return result.rows;
}

export const addUserToChatQuery = async (userId, chatId) => {
    const query = `
        INSERT INTO "Chat Participants" (user_id, chat_id) 
        VALUES ($1, $2)
    `;
  const result = await pool.query(query, [userId, chatId]);
  return result.rows;
}
