import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    console.log('Fetching contacts...'); 
    const { data } = await axios.get(`${API_URL}/contacts`);
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const { data } = await axios.post(`${API_URL}/contacts`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      await axios.delete(`${API_URL}/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); 

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contactData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const { data } = await axios.patch(
        `${API_URL}/contacts/${contactData.id}`,
        { name: contactData.name, number: contactData.number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);








