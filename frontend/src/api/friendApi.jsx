import api from './api';

export const getFriends = async () => {
  try {
    const response = await api.get("/api/v1/friends/me");
    return response;  
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to get friends';
    console.log("ERROR getting friends");
    return { success: false, error: errorMessage };
  }
};

export const addFriend = async (friendUsername) => {

    try {
        const response = await api.post(`/api/v1/friends/me`, { friendUsername });
        return response;
    } catch (err) {
        console.error("Error fetching friends:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to add friend' };
    }
}

export const deleteFriend = async (friendUsername) => {
    try {
        const response = await api.delete(`/api/v1/friends/me`, { friendUsername });
        return response;
    } catch (err) {
        console.error("Error deleting friend:", err);
        return { success: false, error: err.response?.data?.message || 'Failed to delete friend' };
    }
}
