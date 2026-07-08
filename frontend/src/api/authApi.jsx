import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', {username,password});
    return response;  
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Login failed';
    return { success: false, error: errorMessage };
  } 
};

export const signup = async (username, password) => {
  try {
    const response = await api.post('/api/v1/auth/signup', {username,password});

    return response; 

  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Signup failed';
    return { success: false, error: errorMessage };
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/v1/auth/logout');    
    return response;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Logout failed';
    return { success: false, error: errorMessage };
  }
};

export const checkAuth = async () => {
  try{
    const response = await api.post('/api/v1/auth/me'); 
    return response;
  }
  catch(error){
    const errorMessage = error.response?.data?.message || 'Check auth failed';
    return { success: false, error: errorMessage }; 
  }
};
