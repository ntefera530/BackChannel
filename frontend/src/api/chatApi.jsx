import api from './api';

export const getChats = async () => {
    try {
        const response = await api.get("api/v1/chats?type=all");
        return response;
    } catch (err) {
        console.error("Error fetching friends:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get Chats' };
    }
}

export const getChatParticipantsByChatId = async (selectedChatId) => {
    try {
        const response = await api.get(`api/v1/chats/${selectedChatId}/participants`);
        return response;
    } catch (err) {
        console.error("Error fetching participants:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get Chat Participants' };
    }
}

export const createGroupChat = async (name) => {
    try {
        const response = await api.post("api/v1/chats/me", {
            name: name,
            isGroup: true
        });
        return response;
    } catch (err) {
        console.error("Error creating group chat:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to create group chat' };
    }
}

export const getMessagesByChatId = async (selectedChatId, limit, offset) => {
    try {
        const response = await api.get(`http://localhost:5001/api/v1/chats/${selectedChatId}/messages`, {
            params: {limit, offset},
        });
        return response;
    } catch (err) {
        console.error("Error fetching friends:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get Chat Messages' };
    }
}
