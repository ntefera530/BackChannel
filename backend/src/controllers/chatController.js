import * as chatRepo from "../models/chatModel.js"
import * as messageRepo from "../models/messageModel.js"
import * as userRepo from "../models/userModel.js"

import { normalizeFriendship } from '../lib/utils.js';
import { v4 as uuidv4 } from "uuid"; //v4 is the most commonly used random UUID
import {signUrl} from "./uploadController.js"

import { withTransaction } from "../lib/db.js";

const MAX_GROUP_SIZE = 25;

export const getGroupChatsForUser = async (req, res) => {
    try{
        const userId = req.user.userId;

        const groupChats = await chatRepo.getGroupChatsForUser(userId);
        return res.status(200).json(groupChats);
    } catch(error){
        console.error("Error Getting Group Chats For User:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getDirectMessagesForUser = async (req, res) => {
    try{
        const userId = req.user.userId;
        
        const directMessages = await chatRepo.getDirectMessagesForUser(userId);
        return res.status(200).json(directMessages);
    } catch(error){
        console.error("Error Getting Direct Messages for User:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getChatMessages = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const messages = await messageRepo.getChatMessages(chatId, limit, offset);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Chat Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getChatParticipants = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const participants = await chatRepo.getChatParticipants(chatId);

        //TODO: get participant profile pictures and sign the urls
  
        return res.status(200).json({participants});
    }
    catch(error){
        console.error("Error Getting Chat Participants:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
}

export const createGroupChat = async (req, res) => {
    try{
        const ownerId = req.user.userId;
        const chatId = uuidv4();
        const {title, participants, expiresAt} = req.body;

        const groupChat = await withTransaction(async (client) => {

            //TODO - add groupChat picture URL
            const createdChat = await chatRepo.createGroupChat(chatId, ownerId, title, expiresAt, client);
 
            //TODO - check if participants are friends with owner before adding them to group chat          
            const participantIds = Array.from(new Set([...(participants || []), ownerId]));
            await chatRepo.addChatParticipants(chatId, participantIds, client);

            return createdChat;
        });

        return res.status(201).json(groupChat);
    }
    catch(error){
        console.error("Error Creating Group Chat: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createDirectMessage = async (req, res) => {
    try{
        const chatId = uuidv4();
        const user1 = req.user.userId;
        const {user2, expiresAt} = req.body;

        const directMessage = await withTransaction(async (client) => {
            const createdChat = await chatRepo.createDirectMessage(chatId, expiresAt, client);
            await chatRepo.addChatParticipant(chatId, user1, client);
            await chatRepo.addChatParticipant(chatId, user2, client);

            return createdChat;
        });

        return res.status(201).json(directMessage);
    }
    catch(error){
        console.error("Error Creating Direct Message: ", error);
        res.status(500).json({ message: "Internal server error" });
    }

}



export const addUserToGroupChat = async (req, res) => {
    try{
        const {chatId, userId} = req.params;

        const addedUser = await chatRepo.addChatParticipant(chatId, userId);
        if (addedUser.length === 0) {
            return res.status(409).json({ message: "User is already a participant of this chat" });
        }

        return res.status(201).json({ message: "User Added To Group Chat" });
    }
    catch(error){
        console.error("Error Adding User To Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addUsersToGroupChat = async (req, res) => {
    try{
        const {chatId} = req.params;
        const {participants} = req.body;

        if (!Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({ message: "No participants provided" });
        }

        const currentCount = await chatRepo.getChatParticipantsCount(chatId);
        const newParticipants = new Set(participants);

        if (currentCount + newParticipants.size > MAX_GROUP_SIZE) {
            return res.status(400).json({message: `Group chats are limited to ${MAX_GROUP_SIZE} members.`});
        }

        const addedUsers = await chatRepo.addChatParticipants(chatId, participants);

        return res.status(201).json({
            message: "Users Added To Group Chat",
            addedCount: addedUsers.length,
            requestedCount: newParticipants.size
        });
    } catch(error){
        console.error("Error Adding Users To Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteDirectMessage = async (req, res) => {
    try{
        const {chatId} = req.params;
        //TODO - Do i need seperate deletion logic for DMs and Group Chats?
        await chatRepo.deleteChat(chatId);
        return res.status(200).json({ message: "Direct Message Deleted" });
    }
    catch(error){
        console.error("Error Deleting Direct Message:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
}

export const deleteGroupChat = async (req, res) => {
    try{
        const {chatId} = req.params;
        //TODO - Do i need seperate deletion logic for DMs and Group Chats?
        await chatRepo.deleteChat(chatId);
        return res.status(200).json({ message: "Group Chat Deleted" });
    }
    catch(error){
        console.error("Error Deleting Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const leaveGroupChat = async (req, res) => {  
    try{
        const userId = req.user.userId;
        const {chatId} = req.params;
        const deleteMessages = req.query.deleteMessages === 'true';

        const owner = await chatRepo.getChatOwner(chatId);

        if (owner === null) {
            return res.status(403).json({ message: "Direct messages cannot be left, only deleted." });
        }

        if(owner === userId){
            return res.status(403).json({ message: "Owners cannot leave their own group chat. Transfer ownership first." });
        }


        const removedUser = await withTransaction(async (client) => {
            const user = await chatRepo.removeChatParticipant(chatId, userId, client);

            //User can choose to persist or delete their messages from chat as they leave 
            if(deleteMessages){
                await messageRepo.deleteUserChatMessages(chatId, userId, client);
            }

            return user;
        });

        if (removedUser.length === 0) {
            return res.status(404).json({ message: "User is not a participant of this chat" });
        }

        return res.status(200).json({ message: "User Left group" });
    }
    catch(error){
        console.error("Error Leaving Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const kickUserFromGroupChat  = async (req, res) => {
    try{
        const {chatId, userId} = req.params;

        const removedUser = await withTransaction(async (client) => {
            const user = await chatRepo.removeChatParticipant(chatId, userId, client);
            
            //Kicked User messages get deleted
            await messageRepo.deleteUserChatMessages(chatId, userId, client);

            return user;
        });

        if (removedUser.length === 0) {
            return res.status(404).json({ message: "User is not a participant of this chat" });
        }

        return res.status(200).json({ message: "Kicked From Group" });
    }
    catch(error){
        console.error("Error Kicking From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUserChatMessages = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const deletedMessages = await messageRepo.deleteUserChatMessages(chatId, userId);

        if (deletedMessages.length === 0) {
            return res.status(200).json({ message: "No Messges To Delete" });
        }
        return res.status(200).json({ message: "User Messages Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteChatMessage = async (req, res) => {
    try{
        const {chatId, messageId} = req.params;

        const deletedMessages = await messageRepo.deleteChatMessage(chatId, messageId);
        if (deletedMessages.length === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.status(200).json({ message: "Message Deleted" });
    } catch(error){
        console.error("Error Deleting Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}