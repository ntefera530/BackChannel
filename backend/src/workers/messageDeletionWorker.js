import { cleanupExpiredMessagesQuery } from "../models/messageModel.js"

export async function cleanupExpiredMessages() {
    const result = cleanupExpiredMessagesQuery();


    //Todo? should i send a notification thaa messages have been deleted?
    // websocket code??
}
