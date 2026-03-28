import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role:{
        type: String,
        enum: ['user', 'maid'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
        {timestamps: true}
);

export default mongoose.model('User', userSchema);
