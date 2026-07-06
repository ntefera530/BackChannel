import * as chatRepo from "../models/chatModel.js"
import * as messageRepo from "../models/messageModel.js"
import * as userRepo from "../models/userModel.js"

import { normalizeFriendship } from '../lib/utils.js';
import { v4 as uuidv4 } from "uuid"; //v4 is the most commonly used random UUID
import {signUrl} from "./uploadController.js"

import pool from "../lib/db.js";

const MAX_GROUP_SIZE = 25;


































// ---------------------------------------------------------------- OLD --------------------------------

export const addParticipantsToGroupChat = async (req, res) => {
    console.log("Add Participants To Chat");

    try{
        const {chatId} = req.params;
        const {participants} = req.body;

        if (!Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({ message: "No participants provided" });
        }

        const currentCount = await chatRepo.getChatParticipantsCountQuery(chatId);
        const newParticipants = new Set(participants);

        if (currentCount + newParticipants.size > MAX_GROUP_SIZE) {
            return res.status(400).json({
                message: `Group chats are limited to ${MAX_GROUP_SIZE} members. This chat has ${currentCount}, cannot add ${newParticipants.size} more.`
            });
        }

        await chatRepo.addAllChatParticipantByIdQuery(participants, chatId);
        return res.status(200).json({ message: "Chat Participants Added" });
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//_____________________________________________________________________________________________________________________________________________________________
export const getAllChats = async (req, res) => {
    console.log("Get All Chat <---")

    try{
        const userId = req.user.userId;
        const {type} = req.query; // 'direct' or 'group' or undefined for all

        if(type === 'direct') {
            const directMessages = await chatRepo.getDirectMessagesQuery(userId);
            return res.status(200).json(directMessages);
        }
        else if(type === 'group') {
            const groupChats = await chatRepo.getGroupChatsQuery(userId);
            return res.status(200).json(groupChats);
        }
        const allMessages = await chatRepo.getAllChatsQuery(userId);
        //console.log(allMessages);
        return res.status(200).json(allMessages);
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Updated
export const getMessagesByChatId = async (req, res) => {
    console.log("get Messages");

    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const messages = await messageRepo.getMessagesByChatIdQuery(chatId, limit, offset);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getParticipantsByChatId = async (req, res) => {
    console.log("get Participants");

    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        if (!(await assertIsParticipant(chatId, userId, res))) return;
        const participants = await chatRepo.getChatParticipantsQuery(chatId);

        //sign urls for each participant's profile picture
        // for(let i = 0; i < participants.length; i++){
        //     const key = participants[i].profile_picture_url;
        //     participants[i].profile_picture_url = await signUrl(key);
        // }

        const signedParticipants = await Promise.all(
            participants.map(async (participant) => ({
                ...participant,
                profile_picture_url: await signUrl(participant.profile_picture_url),
            }))
        );
  
        return res.status(200).json({ participants: signedParticipants });
    }
    catch(error){
        console.error("Error Getting Participants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//---------------------------------------------------------------------------------------

export const createGroupChat = async (req, res) => {
    console.log("CreateGroupChat");

    const client = await pool.connect(); // Get a client from the pool
    try{
        const {type} = req.query;
        const {title, participants, expiresAt} = req.body;
        const owner = req.user.userId;

        const isGroupChat = type === 'group' ? true : false;
        const groupChatUuid = uuidv4();

        await client.query('BEGIN');
        const groupChat = await chatRepo.createGroupChatQuery(groupChatUuid, title, isGroupChat, owner, expiresAt);

        //Adds owner as a participant in their own chat
        const participantIds = Array.from(new Set([...(participants || []), owner]));
        
        await chatRepo.addAllChatParticipantByIdQuery(participantIds, groupChatUuid);
        await client.query('COMMIT');

        return res.status(200).json(groupChat);
    }
    catch(error){
        await client.query('ROLLBACK');
        console.error("Error Creating Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    finally {
        client.release(); // Release the client back to the pool
    }
}

//TODO
export const createDirectMessage = async (req, res) => {
    console.log("CreateDirectMessage");
    const client = await pool.connect(); // Get a client from the pool
    try{
        const {type} = req.query;
        const user1 = req.user.userId;
        const {title, user2, expiresAt} = req.body;
        

        const isDM = type === 'direct' ? true : false;
        const dmUuid = uuidv4();

        await client.query('BEGIN');
        const directMessage = await chatRepo.createDirectMessageQuery(dmUuid, user1, user2, null, expiresAt);

        
        await chatRepo.addAllChatParticipantByIdQuery(participantIds, groupChatUuid);
        await client.query('COMMIT');

        return res.status(200).json(directMessage);
    }
    catch(error){
        await client.query('ROLLBACK');
        console.error("Error Creating Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    finally {
        client.release(); // Release the client back to the pool
    }
    return res.status(200).json({ message: "Direct Message Created" });
}


//---------------------------------------------------------------------------------------

export const leaveGroupChat = async (req, res) => {
    console.log("Leave Group Chat")
    try{
        const userId = req.user.userId;
        const {chatId } = req.params;
        const deleteMessages = req.query.deleteMessages === 'true';

        const chatOwner = await chatRepo.getChatOwnerByIdQuery(chatId);

        if(!chatOwner || chatOwner.length === 0 || chatOwner[0].owner === null){
            return res.status(403).json({ message: "Cannot Leave DMs" });
        }

        
        const chatOwnerId = chatOwner[0].owner;
        if(currentUserId === chatOwnerId){
            return res.status(403).json({ message: "Owners cannot leave thier group chats" });
        }

        //TODO - wrap in a transaction
        await chatRepo.removeChatParticipantByIdQuery(chatId, userId);

        if(deleteMessages){     
            await messageRepo.deleteUserMessagesByChatIdQuery(chatId, userId);
        }

        return res.status(200).json({ message: "Left group" });
    }
    catch(error){
        //Todo - Rollback transaction if needed
        console.error("Error Leaving Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const kickUserFromGroupChat = async (req, res) => {
    console.log("Kick From Group")

    try{
        const {chatId} = req.params;
        const participants = req.body.participants;

        const result = await chatRepo.removeParticipantsFromChatQuery(participants, chatId);

        console.log(result)
        return res.status(200).json({ message: "Kicked From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Updated
export const deleteGroupChat = async (req, res) => {
    console.log("Delete Group Chat")

    try{
        const {chatId} = req.params;

        await chatRepo.deleteChatByIdQuery(chatId);

        return res.status(200).json({ message: "Group Chat Deleted" });
    }
    catch(error){
        console.error("Error Deleting Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

//Updated
export const deleteDirectMessage = async (req, res) => {
    console.log("Delete Direct Message")

    try{
        const {chatId} = req.params;

        await chatRepo.deleteChatByIdQuery(chatId);

        return res.status(200).json({ message: "Direct Message Deleted" });
    }
    catch(error){
        console.error("Error Deleting Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
    return res.status(200).json({ message: "Direct Message Deleted" });
}

export const deleteUserSelectedMessage = async (req, res) => {
    console.log("Delete Selected  Message");

    try{
        const {messages} = req.body;
        const { messageId } = req.params;

        await messageRepo.deleteSelectedMessagesByIdQuery(messages);

        return res.status(200).json({ message: "Delete Message" });
    }
    catch(error){
        console.error("Error Delete Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Updated
export const deleteUserMessagesByChatId = async (req, res) => {
    console.log("Delete All Messages IN Chat");

    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const messages = await messageRepo.deleteUserMessagesByChatIdQuery(chatId, userId);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Deleting User Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

