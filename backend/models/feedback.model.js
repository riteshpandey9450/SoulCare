import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    c_id:{
        type: String,
        required: true,
    },
    anonymous_id:{
        type: String,
        required: true,
    },
    student_name:{
        type: String,
        required: true,
    },
    councellor_name:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        enum: ['improved', 'needs-support', 'stable'],
        default: 'stable',
    },
    problems:{
        type: String,
        required: true,
    },
    recommendations:{
        type: String,
        required: true,
    },
});


const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;