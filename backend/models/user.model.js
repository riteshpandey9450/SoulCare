import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    // Define common field for all users
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        sparse: true,   // important!
        unique: true, 
    },
    role:{
        type: String,
        enum: ['student', 'counsellor', 'admin'],
        default: 'student',
    },
    profileUrl:{
        type: String,
    },

    // Student-specific fields
    Anonymous:{
        type: String,
    },
    roolNo: {
        type: Number,
        sparse: true,   // important!
        unique: true,   // still unique, but only when the field exists
    },

    stream:{
        type: String,
    },
    academicYear:{
        type: String,
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        default: '1st Year',
    },
    

    // Counsellor-specific fields
    c_id:{
        type: String,
        unique: true,
    },
    about:{
        type: String,
    },
    experience:{
        type: Number,
    },
    specialization:{
        type: String,
    },
    qualification:{
        type: String,
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
