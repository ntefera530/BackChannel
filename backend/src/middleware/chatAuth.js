import * as chatRepo from '../models/chatModel.js';
import * as messageRepo from '../models/messageModel.js';

export const requireChatParticipant = async (req, res, next) => {
    const chatId = req.params.chatId;
    const userId = req.user.userId;

    const isParticipant = await chatRepo.isUserChatParticipant(chatId, userId);
    if (!isParticipant) {
        return res.status(403).json({ message: "You are not a participant in this chat" });
    }
    next();
}

export const requireChatOwner = async (req, res, next) => {
    const chatId = req.params.chatId;
    const userId = req.user.userId;

    const isChatOwner = await chatRepo.isUserChatOwner(chatId, userId);
    if (!isChatOwner) {
        return res.status(403).json({ message: "You are not the owner of this chat" });
    }
    next();
}
export const requireMessageOwner = async (req, res, next) => {  
    const messageId = req.params.messageId;
    const userId = req.user.userId;

    const isMessageOwner = await messageRepo.isUserMessageOwner(messageId, userId);
    if (!isMessageOwner) {
        return res.status(403).json({ message: "You are not the sender of this message" });
    }
    next();
}