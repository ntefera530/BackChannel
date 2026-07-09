import api from './api';


export const getGroupChats = async () => {
    try {
        const response = await api.get("api/v1/chats/group-chats");
        return response;
    } catch (err) {
        console.error("Error fetching group chats:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get group chats' };
    }
}

export const getDirectMessages = async () => {
    try {
        const response = await api.get("api/v1/chats/direct-messages");
        return response;
    } catch (err) {
        console.error("Error fetching direct messages:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get dirrect messages' };
    }
}

export const getChatMessages = async (chatId, limit, offset) => {
    try {
        const response = await api.get(`/api/v1/chats/${chatId}/messages`, {
            params: {limit, offset},
        });
        return response;
    } catch (err) {
        console.error("Error fetching chat messages:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get Chat Messages' };
    }
}

export const getChatParticipants = async (chatId) => {
    try {
        const response = await api.get(`/api/v1/chats/${chatId}/participants`);
        return response;
    } catch (err) {
        console.error("Error fetching participants:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to get Chat Participants' };
    }
}


export const createGroupChat = async (title, participants, expiresAt) => {
    try {
        const response = await api.post("/api/v1/chats/group-chats", {
            title,
            participants,
            expiresAt 
        });
        return response;
    } catch (err) {
        console.error("Error creating group chat:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to create group chat' };
    }
}

export const createDirectMessage = async (user2, expiresAt) => {
    try {
        const response = await api.post("/api/v1/chats/direct-messages", {
            user2,
            expiresAt 
        });
        return response;
    } catch (err) {
        console.error("Error creating direct messages:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to create direct messages' };
    }
}

export const addUserToGroupChat= async (chatId, userId) => {
    try {
        const response = await api.post(`/api/v1/chats/${chatId}/participants/${userId}`);
        return response;
    } catch (err) {
        console.error("Error adding user to Group Chat:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to Add User' };
    }
}

export const addUsersToGroupChat= async (chatId, participants) => {
    try {
        const response = await api.post(`/api/v1/chats/${chatId}/participants`, {
            participants
        });
        return response;
    } catch (err) {
        console.error("Error adding user to Group Chat:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to add User' };
    }
}

export const deleteGroupChat = async (chatId) => {
    try {
        const response = await api.delete(`/api/v1/chats/group-chats/${chatId}`);
        return response;
    } catch (err) {
        console.error("Error deleting group chat:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to delete Direct Message' };
    }
}

export const deleteDirectMessage = async (chatId) => {
    try {
        const response = await api.delete(`/api/v1/chats/direct-messages/${chatId}`);
        return response;
    } catch (err) {
        console.error("Error deleting direct message:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to delete Direct Message' };
    }
}

export const leaveGroupChat = async (chatId) => {
    try {
        const response = await api.delete(`/api/v1/chats/${chatId}/participants/me/`);
        return response;
    } catch (err) {
        console.error("Error deleting direct message:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to leave group chat' };
    }
}

export const kickUserFromGroupChat = async (chatId, userId) => {
    try {
        const response = await api.delete(`/api/v1/chats/${chatId}/participants/${userId}`);
        return response;
    } catch (err) {
        console.error("Error removing user:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to kick user' };
    }
}

export const deleteUserChatMessages = async (chatId) => {
    try {
        const response = await api.delete(`/api/v1/chats/${chatId}/messages/me`);
        return response;
    } catch (err) {
        console.error("Error deleting user chat messages:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to delete chat messages' };
    }
}

export const deleteChatMessage = async (chatId, messageId) => {
    try {
        const response = await api.delete(`/api/v1/chats/${chatId}/messages/${messageId}`);
        return response;
    } catch (err) {
        console.error("Error deleting user chat messages:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to delete chat messages' };
    }
}

