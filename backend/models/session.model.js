import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    c_id: {
        type: String,
        required: true,
    },
    c_name: {
        type: String,
        required: true,
    },
    anonymous_id: {
        type: String,
        required: true,
    },
    session_id: {
        type: String,
        required: true,
        unique: true,
    },
    session_link: {
        type: String,
        required: true,
        unique: true,
    },
    slot: {
        type: String, // e.g. "10:30 AM - 11:00 AM"
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    short_note: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
export default Session;