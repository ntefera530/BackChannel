import pool from '../lib/db.js';

export const createGroupChatQuery = async (groupChatUuid, groupChatTitle, isGroup, ownerUserId) => {
  const query = `
    INSERT INTO "Chats" (id, name, is_group_chat, owner) 
    VALUES ($1, $2, $3, $4)
  `;
  const result = await pool.query(query, [groupChatUuid, groupChatTitle, isGroup, ownerUserId]);
  return result.rows;
}

export const createDirectMessageQuery = async (groupChatUuid, groupChatTitle, isGroup, ownerUserId) => {
  const query = `
    INSERT INTO "Chats" (id, name, is_group_chat, owner) 
    VALUES ($1, $2, $3, $4)
  `;
  const result = await pool.query(query, [groupChatUuid, groupChatTitle, isGroup, ownerUserId]);
  return result.rows;
}

export const createChatQuery = async (uuid, name, isGroup, userId) => {
    const query = `
        INSERT INTO "Chats" (id, name, is_group_chat, owner) 
        VALUES ($1, $2, $3, $4)
    `;
  const result = await pool.query(query, [uuid, name, isGroup, userId]);
  return result.rows;
}

export const getDmChatIdByFriendIdQuery = async (userId, friendId) => {
    const query = `
        SELECT c.id
        From "Chats" c JOIN " 
        WHERE user_id = $1 
        AND friend_id = $2
        AND is_group_chat = false
    `;
  const result = await pool.query(query, [userId, friendId]);
  return result.rows;
}

export const addChatParticipantByIdQuery = async (participantsIdArray, chatId) => {
    const query = `
        INSERT INTO "Chat Participants" (user_id, chat_id)
        VALUES ($1, $2)      
    `;

    console.log(participant_id, chatId);
  const result = await pool.query(query, [participant_id, chatId]);
  return result.rows;
}

export const addAllChatParticipantByIdQuery = async (participantsIdArray, chatId) => {
  const query = `
      INSERT INTO "Chat Participants" (user_id, chat_id)
      SELECT uuid, $2
      FROM unnest(COALESCE($1::uuid[], ARRAY[]::uuid[])) AS uuid;    
  `;
  const result = await pool.query(query, [participantsIdArray, chatId]);
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

export const getAllChatsQuery = async (userId) => {
    const query = `
        SELECT c.id, c.name, c.owner
        FROM "Chats" c JOIN "Chat Participants" chp 
        ON (chp.user_id = $1 AND c.id = chp.chat_id);
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

export const getChatParticipantsQuery = async (chatId) => {
    const query = `
        SELECT user_id FROM
        FROM "Chat Participants"
        WHERE chat_id = $1
    `;
  const result = await pool.query(query, [chat_id]);
  return result.rows;
}
