import api from './api';

export const getDeletionSettings = async () => {
  try{
    const response = await api.get('/api/v1/users/me/deletion-settings');
    return response;
  }
  catch(error){
    console.log('Error getting user settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to get user settings' };
  }
}

export const getUserProfile = async (userId) => {
  try{
    const response = await api.get(`/api/v1/users/${userId}`);
    return response;
  }
  catch(error){
    console.log('Error getting user settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to get user settings' };
  }
}

export const updateDeletionSettings = async (newDeleteTimeSetting) => {
  try{
    const response = await api.put('/api/v1/users/me/deletion-settings', {
      deleteTimerSeconds: newDeleteTimerSeconds
    });
    return response;
  }
  catch(error){
    console.log('Error updating deletion settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update deletion settings' };
  }
}

export const updateUsername = async (username) => {
  try{
    const response = await api.put('/api/v1/users/me/username', {
      username
    });
    return response;
  }
  catch(error){
    console.log('Error updating username: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update username' };
  }
}

export const updatePassword = async (newPassword, oldPassword) => {
  try{
    const response = await api.put('/api/v1/users/me/password', {
      oldPassword,
      newPassword
    });
    return response;
  }
  catch(error){
    console.log('Error updating password: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update password' };
  }
}

export const updateProfilePictureUrl = async (newImageUrl) => {
  try{
    const response = await api.put('/api/v1/users/me/profile-picture', {
      newImageUrl
    });
    return response;
  }
  catch(error){
    console.log('Error updating profile picture: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update profile pic' };
  }
}

export const updateBio = async (bio) => {
  try{
    const response = await api.put('/api/v1/users/me/bio', {
      bio
    });
    return response;
  }
  catch(error){
    console.log('Error updating bio: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update bio' };
  }
}


export const deleteAccount = async () => {
  try{
    const response = await api.delete('/api/v1/users/me');
    return response;
  }
  catch(error){
    console.log('Error deleting account: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to delete account' };
  }
}

export const deleteAllMessagesFromUser = async () => {
  try{
    const response = await api.delete('/api/v1/users/me/messages');
    return response;
  }
  catch(error){
    console.log('Error deleting messages: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to delete messages' };
  }
}



export const getUserSettings = async () => {
  try{
    const response = await api.get('/api/v1/users/me/settings');
    return response;
  }
  catch(error){
    console.log('Error getting user settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to get user settings' };
  }
}

export const updateUserSettings = async (newDeleteTimerSeconds) => {
  try{
    const response = await api.put('/api/v1/users/me/settings', {
      deleteTimerSeconds: newDeleteTimerSeconds
    });
    return response;
  }
  catch(error){
    console.log('Error updating user settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update user settings' };
  }
} 