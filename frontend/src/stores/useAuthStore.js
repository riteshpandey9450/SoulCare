import {create} from 'zustand';
import axios from '../lib/axios';
import {toast} from 'react-hot-toast'

export const useAuthStore = create((set, get) => ({
    allCounsellors: [],
    user: null,
    isSigningUp: false,
    isAddingCounsellor: false,

    signup: async (formData) => {
        set({isSigningUp: true});
        try {
            const response = await axios.post('/auth/signup', formData);
            set({user: response.data.user, isSigningUp: false});
            toast.success('Registration successful.....');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
        finally {
            set({isSigningUp: false});
        }
    },

    login: async (formData) => {
        try {
            const response = await axios.post('/auth/login', formData);
            set({user: response.data});
            toast.success('Login successful!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    },

    logout: async () => {
        try {
            await axios.post('/auth/logout');
            set({user: null});
            toast.success('Logout successful!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    },

    getMe: async () => {
        try {
            const response = await axios.get('/auth/getme');
            set({user: response.data});
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    },

    addCounsellor: async (formData) => {
        set({isAddingCounsellor: true});
        try {
            const response = await axios.post('/auth/addcounsellor', formData);
            toast.success('Counsellor added successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add counsellor');
        }finally {
            set({isAddingCounsellor: false});
        }
    },

    getAllCounsellors: async () => {
        try {
            const response = await axios.get('/auth/getallcounsellors');
            set({allCounsellors: response.data || []});
        } catch (error) {
            console.error('Failed to fetch counsellors:', error);
            return [];
        }
    },

    deleteCounsellor: async (_id) => {
    try {
        await axios.delete(`/auth/deletecounsellor`, {
        data: { _id }   
        });
        toast.success('Counsellor deleted successfully!');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete counsellor');
    }
    },

}));