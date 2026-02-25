import * as chatRepo from "../models/chatModel.js"
import * as messageRepo from "../models/messageModel.js"
import * as userRepo from "../models/userModel.js"

import { normalizeFriendship } from '../lib/utils.js';
import { v4 as uuidv4 } from "uuid"; //v4 is the most commonly used random UUID
import {signUrl} from "./uploadController.js"

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
        //const userId = req.user.userId;
        const {chatId} = req.params;

        const participants = await chatRepo.getChatParticipantsQuery(chatId);

        //sign urls for each participant's profile picture
        for(let i = 0; i < participants.length; i++){
            const key = participants[i].profile_picture_url;
            participants[i].profile_picture_url = await signUrl(key);
        }
  
        return res.status(200).json({ participants });
    }
    catch(error){
        console.error("Error Getting Participants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//---------------------------------------------------------------------------------------

export const createChat = async (req, res) => {
    console.log("CreateGroupChat");
    try{
        const {type} = req.query;
        const {title, participants, expiresAt, owner} = req.body;

        const isGroupChat = type === 'group' ? true : false;
        const groupChatUuid = uuidv4();

        const groupChat = await chatRepo.createGroupChatQuery(groupChatUuid, title, isGroupChat, owner, expiresAt);

        //Adds owner as a participant in their own chat
        await chatRepo.addAllChatParticipantByIdQuery(participants, groupChatUuid);

        return res.status(200).json(groupChat);
    }
    catch(error){
        console.error("Error Creating Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addParticipantsToChat = async (req, res) => {
    console.log("Add Participants To Chat");

    try{
        const {chatId} = req.params;
        const {participants} = req.body;
        await chatRepo.addAllChatParticipantByIdQuery(participants, chatId);

        return res.status(200).json({ message: "Chat Participants Added" });
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//---------------------------------------------------------------------------------------

export const leaveGroupChat = async (req, res) => {
    console.log("Leave Group Chat")
    try{
        const currentUserId = req.userId;
        const {chatId} = req.params;

        const chatOwner = await chatRepo.getChatOwnerByIdQuery(chatId);
        if(!chatOwner){
            return res.status(403).json({ message: "Cannot Leave DMs" });
        }

        const chatOwnerId = chatOwner[0].owner;
        if(currentUserId === chatOwnerId){
            return res.status(403).json({ message: "Owners cannot leave thier group chats" });
        }

        await chatRepo.removeChatParticipantByIdQuery(chatId, currentUserId);
        return res.status(200).json({ message: "Left group" });
    }
    catch(error){
        console.error("Error Leaving Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const kickUsersFromGroupChat = async (req, res) => {
    console.log("Kick From Group")

    try{
        const {chatId} = req.params;
        const currentUserId = req.user.userId;
        const participants = req.body.participants;

        const chatOwner = await chatRepo.getChatOwnerByIdQuery(chatId);        
        const chatOwnerId = chatOwner[0].owner;

        if(currentUserId !== chatOwnerId){
            return res.status(403).json({ message: "Only the owner can kick users from the group chat" });
        }

        const result = await chatRepo.removeParticipantsFromChatQuery(participants, chatId);

        console.log(result)
        return res.status(200).json({ message: "Kicked From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteGroupChat = async (req, res) => {
    console.log("Delete Group Chat")

    try{
        const currentUserId = req.user.userId;
        const {chatId} = req.params;

        const chatOwner = await chatRepo.getChatOwnerByIdQuery(chatId);
        if(!chatOwner){
            return res.status(403).json({ message: "Cannot Delete DMs" });
        }

        const chatOwnerId = chatOwner[0].owner;

        if(currentUserId !== chatOwnerId){
            return res.status(403).json({ message: "Only the owner can delete the group chat" });
        }

        await chatRepo.deleteChatByIdQuery(chatId);

        return res.status(200).json({ message: "Chat Deleted" });
    }
    catch(error){
        console.error("Error Deleting Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const deletSelectedMessages = async (req, res) => {
    console.log("Delete Selected  Message");

    try{
        const {messages} = req.body.messages;
        await messageRepo.deleteSelectedMessagesByIdQuery(message);

        return res.status(200).json({ message: "Delete Message" });
    }
    catch(error){
        console.error("Error Delete Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const  deleteMessagesByChatId = async (req, res) => {
    console.log("Delete Messages");

    try{
        const {chatId} = req.params;

        const messages = await messageRepo.deleteMessagesByChatIdQuery(chatId);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const  deleteUserMessagesByChatId = async (req, res) => {
    console.log("Delete All Messages IN Chat");

    try{
        const userId = req.user.userId;
        const {chatId} = req.params;

        const messages = await messageRepo.deleteUserMessagesByChatIdQuery(chatId, userId);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}