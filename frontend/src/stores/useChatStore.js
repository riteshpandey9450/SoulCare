import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8000'; 

export const useChatStore = create((set, get) => ({
	sessionId: null,
	messages: [], 
	isLoading: false,
	intent: null,
	bookingOffered: false,

	startSession: () => {
		const sessionId = 'session_' + Math.random().toString(36).slice(2) + '_' + Date.now();
		set({ sessionId, messages: [], intent: "safe", bookingOffered: false });
		return sessionId;
	},

	sendMessage: async (userText) => {
		const { sessionId, messages, bookingOffered } = get();
		if (!sessionId) {
			toast.error('Session not initialized.');
			return;
		}
		set({ isLoading: true });
		try {
			const res = await axios.post(`${API_URL}/generate`, {
				message: userText,
				session_id: sessionId,
				booking_offered: bookingOffered,
			});
			const { response, intent, booking_offered } = res.data;
			set(state => ({
				messages: [
					...state.messages,
					{ sender: 'user', text: userText, timestamp: new Date() },
					{ sender: 'bot', text: response, timestamp: new Date() },
				],
				intent,
				bookingOffered: booking_offered,
				isLoading: false,
			}));
		} catch (err) {
			toast.error('Failed to get response from server.');
			set({ isLoading: false });
		}
	},

	quitSession: async () => {
		const { sessionId } = get();
		if (!sessionId) return;
		set({ isLoading: true });
		try {
			const res = await axios.post(`${API_URL}/quit`, {
				session_id: sessionId,
			});
			set({ isLoading: false });
			return res.data.summary;
		} catch (err) {
			toast.error('Failed to get session summary.');
			set({ isLoading: false });
			return null;
		}
	},

	resetChat: () => {
		set({ sessionId: null, messages: [], intent: null, bookingOffered: false, isLoading: false });
	},
}));