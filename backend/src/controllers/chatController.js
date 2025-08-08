import {createChatQuery, addChatParticipantByIdQuery, deleteChatByIdQuery, getllChatsQuery, removeUserFromChatQuery, addUserToChatQuery} from "../models/chatModel.js"

export const createChat = async (req, res) => {
    try{
        const {uuid, name, isGroup, participants_id} = req.params;

        const userId = req.userId;

        const chat = createChatQuery(uuid, name, isGroup, userId);
        for(const participant_id of participants_id){
            const chatPartic = addChatParticipantByIdQuery(participant_id, uuid);
        }
        
        return res.status(200).json({ message: "Chat Added" });
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteChat = async (req, res) => {
    try{
        const {owner, chatId} = req.params;
        const userId = req.userId;

        if(userId !== owner){
            res.status(400).json({ message: "You are not the owner of the Chat Group" });
        }
        deleteChatByIdQuery(chatId);

        return res.status(200).json({ message: "Chat Deleted" });
    }
    catch(error){
        console.error("Error Deleting Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const getAllChats = async (req, res) => {
    console.log("Get Chat")

    try{

        //const userId = req.userId;
        getllChatsQuery(userId);
        return res.status(200).json({ message: "Got Group - Change THis" });
    }
    catch(error){
        console.error("Error Getting Chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const leaveChat = async (req, res) => {
    try{
        const userId = req.userId;
        const {chatId} = req.params;

        removeUserFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Leave Group - Change THis" });
    }
    catch(error){
        console.error("Error Leave Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const inviteToChat = async (req, res) => {
    console.log("Invite To Group")
    
    try{
        //const {chatId, userId} = req.params;
        addUserToChatQuery(userId, chatId);
        return res.status(200).json({ message: "Invite To Group" });
    }
    catch(error){
        console.error("Error Invite To Groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const kickFromChat = async (req, res) => {
    console.log("Kick From Group")

    try{
        const {chatId, userId} = req.params;

        removeUserFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Kick From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}