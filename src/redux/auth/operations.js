import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchContacts } from '../contacts/operations'; 

const API_URL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/signup`, userData);
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Registration failed. Please try again.',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, thunkAPI }) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, credentials);
      localStorage.setItem('token', data.token); 
      setAuthHeader(data.token); 

      console.log('Login success: dispatching fetchContacts...');
      dispatch(fetchContacts()); 

      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Authorization error. Check your details and try again',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(token);

    const response = await axios.post(`${API_URL}/users/logout`);

    if (response.status === 200) {
      console.log('Logout successful:', response.data);
    }

    localStorage.removeItem('token');
    clearAuthHeader();

    return {};
  } catch (error) {
    console.error("Logout failed:", error.response ? error.response.data : error.message);
    
    iziToast.error({
      title: 'Error',
      message: error.response ? error.response.data : error.message,
    });

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('token');
    
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      setAuthHeader(token);

      const { data } = await axios.get(`${API_URL}/users/current`);

      dispatch(fetchContacts());
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to refresh user information.',
      });
      return rejectWithValue(error.message);
    }
  }
);











