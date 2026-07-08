import pool from '../lib/db.js';


export const getGroupChatsForUser = async (userId, db = pool) => {
  const query = `
      SELECT *
      FROM "Chats" c JOIN "Chat Participants" chp
      ON (chp.user_id = $1 AND c.id = chp.chat_id AND c.is_group_chat = true)
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

// export const getDirectMessagesForUser = async (userId, db = pool) => {
//   const query = `
//       SELECT c.id, chp.user_id
//       FROM "Chats" c JOIN "Chat Participants" chp
//       ON (chp.user_id = $1 AND c.id = chp.chat_id AND c.is_group_chat = false)
//   `;
//   const result = await db.query(query, [userId]);
//   return result.rows;
// }

export const getDirectMessagesForUser = async (userId, db = pool) => {
  const query = `
      SELECT
        c.id                 AS chat_id,
        chp_other.id         AS id,
        u.id                 AS other_user_id,
        u.username           AS name,
        u.profile_picture_url AS chat_picture_url
      FROM "Chats" c
      JOIN "Chat Participants" chp_self
        ON chp_self.chat_id = c.id AND chp_self.user_id = $1
      JOIN "Chat Participants" chp_other
        ON chp_other.chat_id = c.id AND chp_other.user_id != $1
      JOIN "Users" u
        ON u.id = chp_other.user_id
      WHERE c.is_group_chat = false
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

export const getChatMessages = async (chatId, limit, offset, db = pool) => {
  const query = `
      SELECT *
      FROM "Messages"
      WHERE chat_id = $1
      ORDER BY sent_at DESC
      LIMIT $2
      OFFSET $3
  `;
  const result = await db.query(query, [chatId, limit, offset]);
  return result.rows;
}

export const getChatParticipants = async (chatId, db = pool) => {
  const query = `
      SELECT u.username, u.id, u.profile_picture_url
      FROM "Users" u JOIN "Chat Participants" chp
      ON u.id = chp.user_id
      WHERE chp.chat_id = $1
  `;
  const result = await db.query(query, [chatId]);
  return result.rows;
}

export const createGroupChat = async (chatId, ownerId, title, expiresAt, db = pool) => {
  const query = `
      INSERT INTO "Chats" (id, owner, name, is_group_chat,  expires_on, chat_picture_url)
      VALUES ($1, $2, $3, true, $4, NULL)
      RETURNING *
  `;
  const result = await db.query(query, [chatId, ownerId, title, expiresAt]);
  return result.rows[0];
}

export const createDirectMessage = async (chatId, expiresAt, db = pool) => {
  const query = `
      INSERT INTO "Chats" (id, owner, is_group_chat, expires_on, chat_picture_url)
      VALUES ($1, NULL, false, $2, NULL)
      RETURNING *
  `;
  const result = await db.query(query, [chatId, expiresAt]);
  return result.rows[0];
}

export const addChatParticipants = async (chatId, participantIds, db = pool) => {
  const query = `
      INSERT INTO "Chat Participants" (chat_id, user_id)
      SELECT $1, user_id
      FROM unnest($2::uuid[]) AS user_id
      ON CONFLICT (chat_id, user_id) DO NOTHING
      RETURNING *
  `;
  const result = await db.query(query, [chatId, participantIds]);
  return result.rows;
}

export const addChatParticipant = async (chatId, userId, db = pool) => {
  const query = `
      INSERT INTO "Chat Participants" (chat_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT (chat_id, user_id) DO NOTHING
      RETURNING *
  `;
  const result = await db.query(query, [chatId, userId]);
  return result.rows;
}

export const getChatParticipantsCount = async (chatId, db = pool) => {
  const query = `
      SELECT COUNT(*) AS participant_count
      FROM "Chat Participants"
      WHERE chat_id = $1
  `;
  const result = await db.query(query, [chatId]);
  return parseInt(result.rows[0].participant_count, 10);
}

export const deleteChat = async (chatId, db = pool) => {
  const query = `
    DELETE FROM "Chats" 
    WHERE id = $1
  `;
  const result = await db.query(query, [chatId]);
  return result.rows;
}

export const removeChatParticipant = async (chatId, userId, db = pool) => {
  const query = `
    DELETE FROM "Chat Participants"
    WHERE chat_id = $1
    AND user_id = $2
    RETURNING *
  `;
  const result = await db.query(query, [chatId, userId]);
  return result.rows;
}

//Helper
export const isUserChatParticipant = async (chatId, userId, db = pool) => {
  const query = `
    SELECT 1
    FROM "Chat Participants"
    WHERE chat_id = $1 
    AND user_id = $2
  `;
  const result = await db.query(query, [chatId, userId]);
  return result.rows.length > 0;
}

export const isUserChatOwner = async (chatId, userId, db = pool) => {
  const query = `
    SELECT 1
    FROM "Chats"
    WHERE id = $1
    AND owner = $2
  `;
  const result = await db.query(query, [chatId, userId]);
  return result.rows.length > 0;
}

export const getChatOwner = async (chatId, db = pool) => {
  const query = `
    SELECT owner
    FROM "Chats"
    WHERE id = $1
  `;
  const result = await db.query(query, [chatId]);
  return result.rows[0]?.owner ?? null;
}

