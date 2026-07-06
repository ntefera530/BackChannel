import * as chatRepo from '../models/chatModel.js';

export const requireParticipant = async (req, res, next) => {
    const chatId = req.params.chatId;
    const userId = req.user.userId;

    const isParticipant = await chatRepo.isUserParticipantInChat(chatId, userId);
    if (!isParticipant) {
        return res.status(403).json({ message: "You are not a participant in this chat" });
    }
    next();
}

export const requireOwner = async (req, res, next) => {
    const chatId = req.params.chatId;
    const userId = req.user.userId;

    const isChatOwner = await chatRepo.isUserChatOwnerQuery(chatId, userId);
    if (!isChatOwner) {
        return res.status(403).json({ message: "You are not the owner of this chat" });
    }
    next();
}