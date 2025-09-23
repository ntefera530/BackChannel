import pool from '../lib/db.js';

// 1. Create Chat -- is_Group = true for group chat, false for DM
export const createGroupChatQuery = async (uuid, name, isGroup, userId, expiresOn) => {
  const query = `
      INSERT INTO "Chats" (id, name, is_group_chat, owner, expires_on) 
      VALUES ($1, $2, $3, $4, $5)
  `;
  const result = await pool.query(query, [uuid, name, isGroup, userId, expiresOn]);
  return result.rows;
}

export const createDirectMessageQuery = async (directMessageUuid, isGroupChat) => {
  const query = `
      INSERT INTO "Chats" (id, is_group_chat) 
      VALUES ($1, $2)
  `;
  const result = await pool.query(query, [directMessageUuid, isGroupChat]);
  return result.rows;
}

// 2. Add Participants to Chat
export const addAllChatParticipantByIdQuery = async (participantsIdArray, chatId) => {
  const query = `
      INSERT INTO "Chat Participants" (user_id, chat_id)
      SELECT uuid, $2
      FROM unnest(COALESCE($1::uuid[], ARRAY[]::uuid[])) AS uuid;    
  `;
  const result = await pool.query(query, [participantsIdArray, chatId]);
  return result.rows;
}


export const removeParticipantsFromChatQuery = async (participants, chatId) => {
  if (!participants || participants.length === 0) {
    return []; // Nothing to delete
  }

 // Dynamically create placeholders for each participant UUID
  const postgreSQLArray = participants.map((_, i) => `$${i + 1}`).join(', ');

  // The chatId will be the last placeholder
  const chatIdPlaceholder = `$${participants.length + 1}`;

  const query = `
    DELETE FROM "Chat Participants"
    WHERE chat_id = ${chatIdPlaceholder}
    AND user_id IN (${postgreSQLArray})
    RETURNING *;
  `;

  
  const result = await pool.query(query, [...participants, chatId]);
  return result.rows;
}

export const removeChatParticipantByIdQuery = async (chatId, userId) => {
  const query = `
    DELETE FROM "Chat Participants"
    WHERE chat_id = $1
    AND user_id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [chatId, userId]);
  return result.rows;
}

// 4. Remove All Participants from Chat (Except Owner) - TODO THIS DOESNT WORK
export const deleteChatParticipantsQuery = async (chatId, ownerId) => {
  const query = `
      DELETE FROM "Chat Participants" 
      WHERE id = $1
      AND owner_id != (SELECT owner_id FROM "Chats" WHERE id = $2)
  `;
  
  const result = await pool.query(query, [chatId, ownerId]);
  return result.rows;
}

// 5. Delete Chat (owner only)
export const deleteChatByIdQuery = async (chatId,) => {
  const query = `
    DELETE FROM "Chats" 
    WHERE id = $1
  `;
  
  const result = await pool.query(query, [chatId]);
  return result.rows;
}

// 6. Delete ALl Chats
export const deleteALlChatsQuery = async (userId) => {
  const query = `
      DELETE FROM "Chats" 
      WHERE owner_id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

// 7. Get all Chats for User
export const getAllChatsQuery = async (userId) => {
  const query = `
      SELECT *
      FROM "Chats" c JOIN "Chat Participants" chp 
      ON (chp.user_id = $1 AND c.id = chp.chat_id);
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

// 8. Get Direct Message for User - TODO THIS DOESNT WORK
export const getDirectMessagesQuery = async (userId) => {
  const query = `
      SELECT *
      FROM "Chats" c JOIN "Chat Participants" chp 
      ON (chp.user_id = $1 AND c.id = chp.chat_id AND c.is_group_chat = false);
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

// 9. Get Direct Message for User - TODO THIS DOESNT WORK
export const getGroupChatsQuery = async (userId) => {
  const query = `
      SELECT *
      FROM "Chats" c JOIN "Chat Participants" chp 
      ON (chp.user_id = $1 AND c.id = chp.chat_id AND c.is_group_chat = true);
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

// 10. Get Chat Owner by Chat Id
export const getChatOwnerByIdQuery = async (chatId) => {
  const query = `
    SELECT owner
    FROM "Chats"
    WHERE id = $1
  `;
  const result = await pool.query(query, [chatId]);
  return result.rows;
}

// 11. Get Chat Participants by Chat Id
export const getChatParticipantsQuery = async (chatId) => {
    const query = `
        SELECT user_id FROM
        FROM "Chat Participants"
        WHERE chat_id = $1
    `;
  const result = await pool.query(query, [chat_id]);
  return result.rows;
}

// 12. Get Direct Message Id by Friend Id
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
