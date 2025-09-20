import * as chatRepo from "../models/chatModel.js"
import { normalizeFriendship } from '../lib/utils.js';
import { v4 as uuidv4 } from "uuid"; //v4 is the most commonly used random UUID

// 1. Create group chat
export const createGroupChat = async (req, res) => {
    console.log("CreateGroupChat");
    try{
        const isGroupChat = true;
        const ownerUserId = req.user.userId;
        const {groupChatTitle, groupChatParticipantsArray} = req.body;
        const groupChatUuid = uuidv4();

        const groupChat = await chatRepo.createChatQuery(groupChatUuid, groupChatTitle, isGroupChat, ownerUserId);

        //Adds owner as a participant in their own chat
        groupChatParticipantsArray.push(ownerUserId);
        await chatRepo.addAllChatParticipantByIdQuery(groupChatParticipantsArray, groupChatUuid);

        return res.status(200).json(groupChat);
    }
    catch(error){
        console.error("Error Creating Group Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 2. Create direct message chat
export const createDirectMessage = async (req, res) => {
    console.log("CreateDirectMessage");
    try{
        const isGroupChat = false;

        //Does a DM need an owner?
        const ownerUserId = req.user.userId;
        const {groupChatTitle, groupChatParticipantsArray} = req.body;
        const groupChatUuid = uuidv4();

        const groupChat = await createGroupChatQuery(groupChatUuid, groupChatTitle, isGroupChat, ownerUserId);

        //Adds owner as a participant in their own chat
        groupChatParticipantsArray.push(ownerUserId);
        await chatRepo.addAllChatParticipantByIdQuery(groupChatParticipantsArray, groupChatUuid);

        return res.status(200).json(groupChat);
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// 3. AddChatParticipantByIdQuery - TODO do I need an invitation system?
export const addParticipantsToChat = async (req, res) => {
    console.log("Add Participants To Chat");

    try{
        const {groupChatUuid} = req.params;
        const {groupChatParticipantsArray} = req.body;
        await chatRepo.addAllChatParticipantByIdQuery(groupChatParticipantsArray, groupChatUuid);

        return res.status(200).json({ message: "Chat Participants Added" });
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 4. Leave Group Chat (Non-owner)
export const leaveGroupChat = async (req, res) => {
    console.log("Leave Group Chat")
    try{
        const userId = req.userId;
        const {chatId} = req.params;

        await chatRepo.removeParticipantsFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Left group" });
    }
    catch(error){
        console.error("Error Leaving Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 5. Kick User From Group Chat (Owner only)
export const kickUserFromGroupChat = async (req, res) => {
    console.log("Kick From Group")

    try{
        const {chatId, userId} = req.params;
        const currentUserId = req.user.userId;
        const chatOwnerId = await chatRepo.getChatOwnerByIdQuery(chatId);

        if(currentUserId !== chatOwnerId){
            return res.status(403).json({ message: "Only the owner can kick users from the group chat" });
        }

        await chatRepo.removeParticipantsFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Kicked From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 6. Delete Group Chat (Owner only)
export const deleteGroupChat = async (req, res) => {
    console.log("Delete Group Chat")

    try{
        const currentUserId = req.user.userId;
        const {chatId} = req.params;
        const chatOwnerId = await chatRepo.getChatOwnerByIdQuery(chatId);

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

// 7. Delete Direct Message Chat (Owner only)
export const deleteDirectMessageChat = async (req, res) => {
    console.log("Delete Direct Message Chat")

    try{
        const currentUserId = req.user.userId;
        const {chatId} = req.params;
        const chatOwnerId = await getChatOwnerByIdQuery(chatId);

        //TODO do DMs have owners?
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

// 8. Get All Chats - DMs and Group Chats
export const getAllChats = async (req, res) => {
    console.log("Get Chat")

    try{
        const userId = req.user.userId;

        const result = await chatRepo.getAllChatsQuery(userId);
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 9. Get all Direct Message Chats
export const getAllDirectMessages = async (req, res) => {
    console.log("Get Chat")

    try{
        const userId = req.user.userId;
        //const userId = req.userId;
        console.log(userId);
        const result = await chatRepo.getllChatsQuery(userId);
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 10. Get all Group Chats
export const getAllGroupChats = async (req, res) => {
    console.log("Get Chat")

    try{
        const userId = req.user.userId;
        //const userId = req.userId;
        console.log(userId);
        const result = await chatRepo.getllChatsQuery(userId);
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 11. Get Direct Message Chat ID by Friend ID
export const getDmChatIdByFriend = async (req, res) => {
    console.log("get ChatId by Friend to get their messages");

    try{
        const userId = req.user.userId;
        const friendId = req.params.friendId;
        const normal = normalizeFriendship(userId, friendId);

        const chatId = await chatRepo.getDmChatIdByFriendIdQuery(normal.user_id, normal.friend_id);
        return res.status(200).json({ chatId });
    }
    catch(error){
        console.error("Error GettingDM ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// 11. Invite A User to Group Chat
export const inviteToGroupChat = async (req, res) => {
    console.log("Invite To Group")
    
    try{
        const {chatId, userId} = req.params;
        await chatRepo.addUserToChatQuery(userId, chatId);
        const temp_user = "817db6e4-2f8a-4827-b29a-4a6d9ef97ae9"
        
        return res.status(200).json({ message: "Invite To Group" });
    }
    catch(error){
        console.error("Error Invite To Groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

