import * as chatRepo from "../models/chatModel.js"
import { normalizeFriendship } from '../lib/utils.js';
import { v4 as uuidv4 } from "uuid"; //v4 is the most commonly used random UUID


// 1.
export const getAllChats = async (req, res) => {
    console.log("Get All Chat")

    try{
        const userId = req.user.userId;
        const {chatType} = req.query; // 'direct' or 'group' or undefined for all

        if(chatType === 'direct') {
            const directMessages = await chatRepo.getDirectMessagesQuery(userId);
            return res.status(200).json(directMessages);
        }
        else if(chatType === 'group') {
            const groupChats = await chatRepo.getGroupChatsQuery(userId);
            return res.status(200).json(groupChats);
        }
        const result = await chatRepo.getAllChatsQuery(userId);
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
 
// 3.
export const createChat = async (req, res) => {
    console.log("CreateGroupChat");
    try{
        const ownerUserId = req.user.userId;
        const {chatType} = req.query;
        const {groupChatTitle, groupChatParticipantsArray, expiresAt} = req.body;

        const isGroupChat = chatType === 'group' ? true : false;
        const groupChatUuid = uuidv4();

        const groupChat = await chatRepo.createGroupChatQuery(groupChatUuid, groupChatTitle, isGroupChat, ownerUserId, expiresAt);

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

// 4.
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

// 5. 
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

//6. Leave Group Chat (Non-owner)
export const leaveGroupChat = async (req, res) => {
    console.log("Leave Group Chat")
    try{
        const userId = req.userId;
        const {chatId, groupChatParticipantsArray} = req.params;

        await chatRepo.removeParticipantsFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Left group" });
    }
    catch(error){
        console.error("Error Leaving Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 7. Kick User From Group Chat (Owner only)
export const kickUsersFromGroupChat = async (req, res) => {
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

