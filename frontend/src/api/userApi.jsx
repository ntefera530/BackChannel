import api from './api';

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