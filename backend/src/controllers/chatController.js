import {createChatQuery, getDmChatIdByFriendIdQuery, addChatParticipantByIdQuery, deleteChatByIdQuery, getllChatsQuery, removeUserFromChatQuery, addUserToChatQuery} from "../models/chatModel.js"
import { normalizeFriendship } from '../lib/utils.js';
// v4 is the most commonly used random UUID
import { v4 as uuidv4 } from "uuid";

export const createChat = async (req, res) => {
    try{
        const {name, isGroup} = req.body;

        const ownerUserId = req.user.userId;
        const chatUuid = uuidv4();

        const chat = await createChatQuery(chatUuid, name, isGroup, ownerUserId);
        //need to add the creator as a participant to his own chat lol
        await addChatParticipantByIdQuery(ownerUserId ,chatUuid);

        return res.status(200).json(chat);
    }
    catch(error){
        console.error("Error Adding Chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getDmChatIdByFriend = async (req, res) => {
    console.log("get ChatId by Friend to get their messages");

    try{
        const userId = req.user.userId;
        const friendId = req.params.friendId;
        const normal = normalizeFriendship(userId, friendId);

        //test user
        //const userId = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        const chatId = await getDmChatIdByFriendIdQuery(normal.user_id, normal.friend_id);
        return res.status(200).json({ chatId });
    }
    catch(error){
        console.error("Error GettingDM ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO: is this add participants to an existing Chat, or creating just a new chat? InviteToCHat is already adding single user to chat
export const addParticipantsToChat = async (req, res) => {
    try{
        const {uuid, name, isGroup, participants_ids} = req.params;

        

        const userId = req.user.userId;
        const username = req.user.username;
        uuid = uuidv4();
        name = "Chat Name 1";
        // const temp_participant_ids = ['817db6e4-2f8a-4827-b29a-4a6d9ef97ae9'];
        // const temp_isGroup = false;
        //const chat = createChatQuery(uuid, name, isGroup, userId);
        const chat = createChatQuery(uuid, name, isGroup, userId);
        for(const participant_id of participants_ids){
            const chatPartic = addChatParticipantByIdQuery(participant_id, uuid);
        }

        // const temp_userId = '605065e1-818c-4001-8ad1-76c1a8f27e08';
        // const temp_uuid = uuidv4();
        // const temp_name = "Chat Name 1";
        // const temp_participant_ids = ['817db6e4-2f8a-4827-b29a-4a6d9ef97ae9'];
        // const temp_isGroup = false;

        //const chat = createChatQuery(temp_uuid, temp_name, temp_isGroup, temp_userId);
        
        for(const participant_id of temp_participant_ids){
            const parti_id = participant_id;        
            const chatPartic = addChatParticipantByIdQuery(parti_id, temp_uuid);
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
        const userId = req.user.userId;
        //const userId = req.userId;
        console.log(userId);
        const result = await getllChatsQuery(userId);
        return res.status(200).json(result);
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
        const {chatId, userId} = req.params;
        await addUserToChatQuery(userId, chatId);
        const temp_user = "817db6e4-2f8a-4827-b29a-4a6d9ef97ae9"
        
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

        await removeUserFromChatQuery(userId, chatId);
        return res.status(200).json({ message: "Kick From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}