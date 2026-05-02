import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },
    email: {
    type: String,
    unique: true,
    sparse: true,   // IMPORTANT
    lowercase: true,
    trim: true,
    },
        phone: {
            type: String,
            unique: true,
            sparse: true,
        },

        authProvider: {
            type: String,
            enum: ['email', 'phone'],
            default: 'email'
        },
    
    password: {
  type: String,
  required: function () {
    return this.authProvider === "email" || this.hasPassword;
  },
  minlength: [6, 'Password must be at least 6 characters long']
},

    hasPassword: {
    type: Boolean,
    default: false
    },
    role:{
        type: String,
        enum: ['user', 'maid','admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // FIELD FOR OTP
  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  }
},
        {timestamps: true}
);

export default mongoose.model('User', userSchema);
